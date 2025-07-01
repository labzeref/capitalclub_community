<?php

namespace App\Http\Controllers;

use App\Models\BillingAddress;
use App\Models\CheckoutChampCard;
use App\Models\CheckoutChampShippingAddress;
use App\Models\CheckoutChampUserCard;
use App\Services\CheckoutChampService;
use Illuminate\Support\Facades\Log;

class CheckoutChampController extends Controller
{
    public function cancelOrder(CheckoutChampService $service)
    {
        return back();
        $order = _user()->orders()->latest()->first();

        if (!$order) {
            return back()->with('info', __('You dont have any order.'));
        }

        $response = $service->cancelOrder($order->checkout_champ_id);

        if ($response->successful()) {
            return back()->with('success', __('You subscription will cancel soon.'));
        }

        return back()->with('error', __('Something went wrong'));
    }

    public function renewOrder(CheckoutChampService $service)
    {
        $user = _user();
        $activeOrder = $user->orders()->where('end_at','>',now())->latest('id')->first();

        if ($activeOrder) {
            return back()->with('error', __('You still have a active subscription, you can renew it after end of term.'));
        }

        $order = $user->orders()->latest('id')->first();

        if (!$order) {
            return back()->with('error', __('You dont have any order.'));
        }

//        $checkout_champ_order_info = $service->getOrder($order->checkout_champ_id);
//        $checkout_champ_order_info = $checkout_champ_order_info->json();
//        $checkout_champ_order_info = $checkout_champ_order_info['message']['data'] ?? null;
//        $checkout_champ_order_info = $checkout_champ_order_info[0] ?? null;
//
//        if (!$checkout_champ_order_info) {
//            return back()->with('error', __('You dont have any order.'));
//        }

//        $reactivate = false;
//        $alreadyActive = false;
//
//        foreach ($checkout_champ_order_info['items'] as $item){
//            if ($item['purchaseStatus'] === 'CANCELLED'){
//                $reactivate = true;
//            }
//            break;
//        }

//        if ($checkout_champ_order_info['status'] == 'ACTIVE') {
//            return back()->with('error', __('You still have a active subscription, you can renew it after end of term.'));
//        }


        try {

            $purchaseData = $service->getPurchase($order->checkout_champ_id);
            $purchaseBody = $purchaseData->json();
            $purchase = $purchaseBody['message']['data'] ?? null;
            $purchase = $purchase[0] ?? null;

            $updateData = [
                'purchaseId' => $purchase['purchaseId'],
                'billNow'=> 1,
            ];

//            if ($reactivate){
//                $updateData['reactivate'] = 1;
//            }

            $response = $service->updatePurchase($updateData);

            $responseBody = $response->json();

            Log::channel('checkout-champ')->info('Renew Order API Response:', $responseBody);

            if ($responseBody['result'] == 'ERROR') {
                return back()->with('error', $responseBody['message'] );
            } else {
                $order->update([
                    'last_success_retry' => now(),
                ]);
                return back()->with('success', 'Your payment in process please wait...' );
            }

        } catch (\Exception $e) {
            return back()->with('error',  'Something went wrong please try again later.');
        }


//        $inActiveOrder = _user()->orders()->with(['product'])->latest('id')->first();
//        $product = $inActiveOrder->product;
//        $card = CheckoutChampUserCard::where('user_id', $user->id)->latest('id')->first();
//
//        if (!$card) {
//            return back()->with('error', __('Please add your payment method.'));
//        }
//
//        $checkoutChampShippingAddress = CheckoutChampShippingAddress::where('user_id', $user->id)->first();
//         $billingAddress = BillingAddress::where('user_id', $user->id)->first();
//
//        $data = [
//            'firstName' => $checkoutChampShippingAddress->first_name,
//            'lastName' => $checkoutChampShippingAddress->last_name,
//            'address1' => $checkoutChampShippingAddress->address1??'none',
//            'address2' => $checkoutChampShippingAddress->address2,
//            'postalCode' => $checkoutChampShippingAddress->postal_code,
//            'city' => $checkoutChampShippingAddress->city,
//            'state' => $checkoutChampShippingAddress->state,
//            'country' => $checkoutChampShippingAddress->country,
//            'emailAddress' => $user->email,
//            'phoneNumber' => $billingAddress->phone_number,
//            'billShipSame' => '1',
//            'campaignId' => config('checkout-champ.subscription_campaign_id'),
//            'paySource' => 'ACCTONFILE',
//            'customerId' => $user->checkout_champ_id,
//            'product1_id' => $product->checkout_champ_id,
//            'product1_qty' => 1,
//        ];
//
//        Log::channel('checkout-champ')->info('Renew Order Request Data:', $data);
//
//         try {
//            $response = $service->importOrder($data);
//
//            $responseBody = $response->json();
//
//            Log::channel('checkout-champ')->info('Renew Order API Response:', $responseBody);
//
//            if ($responseBody['result'] == 'ERROR') {
//                return back()->with('error', $responseBody['message'] );
//            } else {
//                return back()->with('success', 'Subscription renewed successfully' );
//            }
//
//        } catch (\Exception $e) {
//            return back()->with('error',  'Something went wrong please try again later.');
//        }
    }
}
