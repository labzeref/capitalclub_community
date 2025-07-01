<?php

namespace App\Http\Controllers;

use App\Jobs\AssignStoredDiscordRolesJob;
use App\Jobs\RemoveDiscordRolesJob;
use App\Jobs\UserPasswordMailJob;
use App\Mail\UserPasswordMail;
use App\Models\CheckoutChampOrder;
use App\Models\CheckoutChampUserCard;
use App\Models\PremiumUser;
use App\Models\User;
use App\Notifications\SlackErrorNotification;
use App\Services\CheckoutChampService;
use App\Services\FirstPromoterService;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Str;

class CheckoutChampWebhookController extends Controller
{

    public function newSale(Request $request, CheckoutChampService $checkoutChampService, FirstPromoterService $firstPromoterService)
    {
        $this->logMessage("ip address : " . $request->header('CF-Connecting-IP'));
        $this->log('New Sale', $request->all());

        if (!$checkoutChampService->isIpValid($request->ip())) {
            $this->logMessage('Ip address is not valid');
            $this->logLineBreak();

            return;
        }

        $password = Str::random();

        DB::beginTransaction();

        try {

            // Create User
            $user = $checkoutChampService->createUser(
                attributes: [
                    'checkout_champ_id' => $request->customerId,
                    'country_iso' => $request->country,
                    'first_name' => $request->firstName,
                    'last_name' => $request->lastName,
                    'email' => strtolower($request->emailAddress),
                ],
                password: $password
            );

            $this->logMessage('User created in system');

            // Create shipping address data
            $checkoutChampService->createUserShippingAddress(attributes: [
                'user_id' => $user->id,
                'first_name' => $request->shipFirstName,
                'last_name' => $request->shipLastName,
                'address1' => $request->shipAddress1,
                'address2' => $request->shipAddress2,
                'city' => $request->shipCity,
                'state' => $request->shipState,
                'country' => $request->shipCountry,
                'postal_code' => $request->shipPostalCode,
            ]);

            $this->logMessage('User Shipping address created in system');

            // get fresh user
            $user = User::where('email', strtolower($request->emailAddress))->first();

            $card = null;

            if ($request->cardType && $request->cardLast4 && $request->cardYear && $request->cardMonth && $request->paySourceId) {
                //create card
                $card = CheckoutChampUserCard::updateOrCreate([
                    'user_id' => $user->id
                ], [
                    'user_id' => $user->id,
                    'type' => $request->cardType,
                    'last_4' => $request->cardLast4,
                    'expiry' => Carbon::parse($request->cardYear . '-' . $request->cardMonth)->endOfMonth()->format('Y-m-d'),
                    'pay_source_id' => $request->paySourceId,
                ]);
            }

            $this->logMessage('COC card created in system');

            // Sync product with database
            $product = $checkoutChampService->syncProduct(attributes: [
                'checkout_champ_id' => $request->productId,
                'name' => $request->productName ?? 'No name',
                'description' => $request->productDescription ?? 'No description',
                'cost' => $request->productPrice ?? 0,
            ]);

            $this->log('COC product created in system', $product);

            // Create order of user
            $checkoutChampService->createOrder(
                user: $user,
                attributes: [
                    'checkout_champ_id' => $request->clientOrderId,
                    'product_id' => $product?->id,
                    'card_id' => $card?->id ?? null,
                    'start_at' => Carbon::parse($request->dateCreated),
                    'end_at' => Carbon::parse($request->nextBillDate)->endOfDay(),
                    'amount' => $request->totalPrice,
                    'status' => $request->orderStatus,
                ]
            );

            $this->logMessage('COC order created in system');

            $user = User::where('email', strtolower($request->emailAddress))->first();

            if (!$user) {
                $this->logError('Checkout-Champs webhook failed. ---- User: ' . strtolower($request->emailAddress) . ' ----- Error: User was not created');
            }

            dispatch(new UserPasswordMailJob($user, $password));

            $this->logMessage('Password sent to user');

            if ($request->filled('tid')) {
                $response = $firstPromoterService->trackSale(data: [
                    'email' => strtolower($request->emailAddress),
                    'tid' => $request->tid,
                    'amount' => $request->totalPrice * 100, //converting into cents
                ]);

                if ($response->successful()) {
                    $this->log('First promoter sale api successfully', $response->body());
                } else {
                    $this->log('First promoter sale api fail', $response->body());
                }
            }

            $this->logLineBreak();

            AssignStoredDiscordRolesJob::dispatch($user->id);

        } catch (\Throwable $throwable) {

            DB::rollBack();

            $this->logError('Checkout-Champ webhook failed. ---- User: ' . strtolower($request->emailAddress) . ' ----- Error: ' . $throwable->getMessage());

            $this->logMessage('Fail to create data against webhook');
            $this->logLineBreak();

            throw $throwable;
        }

        DB::commit();
    }

    public function cancel(Request $request, CheckoutChampService $checkoutChampService, FirstPromoterService $firstPromoterService)
    {
        $this->logMessage("ip address : " . $request->ip());
        $this->log('Cancel', $request->all());

        if (!$checkoutChampService->isIpValid($request->ip())) {
            $this->logMessage('Ip address is not valid');
            $this->logLineBreak();

            return;
        }

        $getOrderData = $checkoutChampService->getPurchase($request->clientOrderId);
        $this->log('purchase data from api', $getOrderData->body());
        if (!$getOrderData->successful()) $this->logMessage('purchase api failed');
        $getOrderData = $getOrderData->json()['message']['data'][0];


        // Cancel the order with now
        $checkoutChampOrder = CheckoutChampOrder::where('checkout_champ_id', $request->clientOrderId)->first();

        if ($checkoutChampOrder) {

            if (isset($getOrderData['nextBill'])) {
                if ($getOrderData['nextBill'] == null) {
                    $expiry = now();
                    dispatch(new RemoveDiscordRolesJob($checkoutChampOrder->user_id));
                } else {
                    $expiry = Carbon::parse($getOrderData['nextBill']);
                }
            } else {
                $expiry = now();
                dispatch(new RemoveDiscordRolesJob($checkoutChampOrder->user_id));
            }
            $checkoutChampOrder->update(['end_at' => $expiry]);
            $checkoutChampOrder->status = 'CANCELLED';
            $checkoutChampOrder->save();
        }


        if ($request->filled('tid')) {
            $response = $firstPromoterService->cancellation(data: [
                'email' => strtolower($request->emailAddress),
            ]);

            if ($response->successful()) {
                $this->log('First promoter cancellation api successfully', $response->body());
            } else {
                $this->log('First promoter cancellation api fail', $response->body());
            }
        }
    }

    public function refund(Request $request, CheckoutChampService $checkoutChampService, FirstPromoterService $firstPromoterService)
    {
        $this->logMessage("ip address : " . $request->ip());
        $this->log('Refund', $request->all());

        if (!$checkoutChampService->isIpValid($request->ip())) {
            $this->logMessage('Ip address is not valid');
            $this->logLineBreak();

            return;
        }

        $this->logMessage('We do not use refund api');

//        $checkoutChampOrder = CheckoutChampOrder::where('checkout_champ_id', $request->clientOrderId)->first();
//
//        if ($checkoutChampOrder) {
//            $checkoutChampOrder->update(['end_at' => now()]);
//            dispatch(new RemoveDiscordRolesJob($checkoutChampOrder->user_id));
//        }
//
//        if ($request->filled('tid')) {
//            $response = $firstPromoterService->refund(data: [
//                'email' => $request->emailAddress,
//                'amount' => floatval($request->refundAmount) * 100, //converting into cents
//            ]);
//
//            if ($response->successful()) {
//                $this->log('First promoter refund api successfully', $response->body());
//            } else {
//                $this->log('First promoter refund api fail', $response->body());
//            }
//        }
    }

    public function partialRefund(Request $request, CheckoutChampService $checkoutChampService, FirstPromoterService $firstPromoterService)
    {
        $this->logMessage("ip address : " . $request->ip());
        $this->log('Partial refund', $request->all());

        if (!$checkoutChampService->isIpValid($request->ip())) {
            $this->logMessage('Ip address is not valid');
            $this->logLineBreak();

            return;
        }

        $this->logMessage('We do not use partial refund api');

//        CheckoutChampOrder::where('checkout_champ_id', $request->clientOrderId)->update(['end_at' => now()]);
//
//        if ($request->filled('tid')) {
//            $response = $firstPromoterService->refund(data: [
//                'email' => $request->emailAddress,
//                'amount' => floatval($request->refundAmount) * 100, //converting into cents
//            ]);
//
//            if ($response->successful()) {
//                $this->log('First promoter refund api successfully', $response->body());
//            } else {
//                $this->log('First promoter refund api fail', $response->body());
//            }
//        }
    }

    public function recurring(Request $request, CheckoutChampService $checkoutChampService, FirstPromoterService $firstPromoterService)
    {
        $this->logMessage("ip address : " . $request->ip());
        $this->log('Recurring', $request->all());

        if (!$checkoutChampService->isIpValid($request->ip())) {
            $this->logMessage('Ip address is not valid');
            $this->logLineBreak();

            return;
        }

        DB::beginTransaction();

        try {
            // Find user in db
            $user = User::where('email', strtolower($request->emailAddress))->first();

            if (!$user) {
                $this->logError('Checkout-Champs webhook failed. ---- User: ' . strtolower($request->emailAddress) . ' ----- Error: User was not created');
            }

            $card = null;

            if ($request->cardType && $request->cardLast4 && $request->cardYear && $request->cardMonth && $request->paySourceId) {
                //create card
                $card = CheckoutChampUserCard::updateOrCreate([
                    'user_id' => $user->id
                ], [
                    'user_id' => $user->id,
                    'type' => $request->cardType,
                    'last_4' => $request->cardLast4,
                    'expiry' => Carbon::parse($request->cardYear . '-' . $request->cardMonth)->endOfMonth()->format('Y-m-d'),
                    'pay_source_id' => $request->paySourceId,
                ]);
            }

            // Sync product with database
            $product = $checkoutChampService->syncProduct(attributes: [
                'checkout_champ_id' => $request->productId,
                'name' => $request->productName ?? 'No name',
                'description' => $request->productDescription ?? 'No description',
                'cost' => $request->productPrice ?? 0,
            ]);

            // Create order of user
            $checkoutChampService->createOrder(
                user: $user,
                attributes: [
                    'checkout_champ_id' => $request->clientOrderId,
                    'product_id' => $product?->id,
                    'card_id' => $card?->id ?? null,
                    'start_at' => Carbon::parse($request->dateCreated),
                    'end_at' => Carbon::parse($request->nextBillDate)->endOfDay(),
                    'amount' => $request->totalPrice,
                    'status' => $request->orderStatus,
                ]
            );

            try {
                $response = $firstPromoterService->trackSale(data: [
                    'email' => strtolower($request->emailAddress),
                    'amount' => $request->totalPrice * 100, //converting into cents
                ]);

                if ($response->successful()) {
                    $this->log('First promoter sale api successfully', $response->body());
                } else {
                    $this->log('First promoter sale api fail', $response->body());
                }
            } catch (\Exception $e) {

            }

            AssignStoredDiscordRolesJob::dispatch($user->id);

        } catch (\Throwable $throwable) {
            DB::rollBack();

            $this->logError('Checkout-Champ recurring webhook failed. ---- User: ' . strtolower($request->emailAddress) . ' ----- Error: ' . $throwable->getMessage());

            $this->logMessage('Fail to create data against webhook');
            $this->logLineBreak();

            throw $throwable;
        }

        DB::commit();
    }

    private function log($message, $data)
    {
        if ($message) {
            Log::channel('checkout-champ')->info($message);
        }

        if ($data) {
            Log::channel('checkout-champ')->info($data);
        }

        $this->logLineBreak();
    }

    private function logMessage($message)
    {
        Log::channel('checkout-champ')->info($message);
    }

    private function logError($message)
    {
        Log::channel('checkout-champ')->error($message);
        Notification::route('slack', config('services.slack.notifications.channel'))
            ->notify(new SlackErrorNotification($message));
    }

    private function logLineBreak()
    {
        Log::channel('checkout-champ')->info("----------------------------------------------------------------------------------------------------------");
    }
}
