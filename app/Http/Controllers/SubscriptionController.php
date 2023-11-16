<?php

namespace App\Http\Controllers;

use App\Assets\VideoAsset;
use App\Http\Resources\Asset\CountryResource;
use App\Http\Resources\BillingAddressResource;
use App\Http\Resources\User\UserResource;
use App\Jobs\ActiveCampaign\AddTagToActiveCampaignContactJob;
use App\Jobs\CreateSubscriptionJob;
use App\Mail\UserPasswordMail;
use App\Models\Country;
use App\Models\PremiumUser;
use App\Models\RegistrationCap;
use App\Models\User;
use App\Rules\RecaptchaRule;
use App\Services\ChargeBeeService;
use ChargeBee\ChargeBee\Exceptions\APIError;
use ChargeBee\ChargeBee\Exceptions\InvalidRequestException;
use ChargeBee\ChargeBee\Exceptions\OperationFailedException;
use ChargeBee\ChargeBee\Exceptions\PaymentException;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Inertia\Response;
use Inertia\ResponseFactory;
use Torann\GeoIP\Facades\GeoIP;

class SubscriptionController extends Controller
{
    /**
     * Creating the object of chargebee service
     * all chargebee function are in this
     */
    public function __construct(private readonly ChargeBeeService $chargeBeeService)
    {
    }

    /**
     * Show the subscripotion screen
     *
     * @return RedirectResponse|Response|ResponseFactory
     */
    public function index(Request $request)
    {
        $user = _user();

        if ($user->subscribed) {
            return to_route('academy');
        }

        if (session('showComponent')) {
            $showComponent = session('showComponent');
        } else {
            $showComponent = 'billing';
        }

        $chargeBeeSite = config('chargbee.site');
        $chargeBeePublicKey = config('chargbee.public_key');
        $recaptchaKey = config('recaptcha.key');
        $videoAsset = VideoAsset::getResource();
        $countries = CountryResource::collection(Country::getWithUSFirst());

        $timeDifferenceInSeconds = _getPageRemainingSeconds();
        $countryCode = GeoIP::getLocation($request->ip())->iso_code;
        $user = new UserResource(_user()->load('billingAddress'));
        $planName = config('chargbee.plan_name');
        $price = config('chargbee.yearly_item_price');
        $showCoupon = false;
        $couponCode = null;

        $premiumUser = PremiumUser::where('email', $user->email)->whereNotNull('promo_code')->first();

        if ($premiumUser) {
            $showCoupon = true;
            $couponCode = $premiumUser->promo_code;
        }

        $invite_code = $request->session()->get('invitation_code');
        $is3DSecure = config('chargbee.3ds_secure');

        return inertia('Auth/Payment', compact([
            'price',
            'chargeBeeSite',
            'chargeBeePublicKey',
            'timeDifferenceInSeconds',
            'recaptchaKey',
            'videoAsset',
            'showComponent',
            'user',
            'countries',
            'showCoupon',
            'countryCode',
            'planName',
            'couponCode',
            'invite_code',
            'is3DSecure'
        ]));
    }

    /**
     * Create the user subscription
     *
     * @return JsonResponse
     */
    public function store(Request $request)
    {

        $startData = now()->setHour(15)->setMinute(0)->seconds(0);
        $endData = now();

        if ($startData > $endData) {
            $startData->subDay();
        }

        $total_registrations =  \Illuminate\Support\Facades\DB::table('users')
            ->where('subscribed',true)
            ->where('created_at', '>=', $startData)
            ->where('created_at', '<=', $endData)
            ->count();

        $registrationCap = \Illuminate\Support\Facades\DB::table('registration_caps')->orderBy('id','desc')->first();

        if ($registrationCap) {
            if (($registrationCap->limit - $total_registrations) <= 0){
                Auth::logout();
                return $this->sendError(__('Sold Out'),401);
            }
        }

        $request->validate([
            'recaptcha' => ['nullable', new RecaptchaRule],
        ]);

        if (empty($request->paymentIntent)) {
            return $this->sendError(__('Payment intent is missing, try again.'));
        }

        if (!$request->term_and_condition) {

            return $this->sendError(__('Please agree to our terms and conditions.'));
        }

        DB::beginTransaction();

        try {
            $user = $request->user();
            $customerId = $user->charge_bee_id;
            $paymentIntent = $request->paymentIntent;

            if (!config('chargbee.3ds_secure')) {
                $this->chargeBeeService->createPaymentSourceByChargeBeeToken(
                    $user->charge_bee_id, $request->paymentIntent
                );

                $paymentIntent = null;
            }

            [$chargeBeeSubscription, $card, $chargeBeeInvoice] = $this->chargeBeeService->createSubscriptionWithItem(
                $customerId,
                config('chargbee.yearly_item_price_id'),
                $paymentIntent,
                $request->coupon
            );

            $amount = 0;

            foreach ($chargeBeeSubscription->subscriptionItems as $chargeBeeSubscriptionItem) {
                $amount += $chargeBeeSubscriptionItem->unitPrice;
            }

            $subscription = $user->subscriptions()->create([
                'item_price_id' => $chargeBeeSubscription->subscriptionItems[0]->itemPriceId,
                'charge_bee_id' => $chargeBeeSubscription->id,
                'period_unit' => $chargeBeeSubscription->billingPeriodUnit,
                'current_term_start' => $this->formatTimestamp($chargeBeeSubscription->currentTermStart),
                'current_term_end' => $this->formatTimestamp($chargeBeeSubscription->currentTermEnd),
                'next_billing_at' => $this->formatTimestamp($chargeBeeSubscription->nextBillingAt),
                'started_at' => $this->formatTimestamp($chargeBeeSubscription->startedAt),
                'activated_at' => $this->formatTimestamp($chargeBeeSubscription->activatedAt),
                'currency_code' => $chargeBeeSubscription->currencyCode,
                'amount' => $amount,
                'last4' => $card->last4,
                'brand' => $card->cardType,
                'masked_number' => $card->maskedNumber,
                'status' => $chargeBeeSubscription->status,
            ]);

            $user->invoices()->create([
                'subscription_id' => $subscription->id,
                'charge_bee_id' => $chargeBeeInvoice->id,
                'currency_code' => $chargeBeeInvoice->currencyCode,
                'amount_paid' => $chargeBeeInvoice->amountPaid / 100,
                'total' => $chargeBeeInvoice->total / 100,
                'paid_at' => $this->formatTimestamp($chargeBeeInvoice->paidAt),
                'date' => $this->formatTimestamp($chargeBeeInvoice->date),
                'status' => $chargeBeeInvoice->status,
            ]);

            $updateData = ['subscribed' => true];

            if (config('app.check_invitation')) {
                $updateData['invitation_code'] = session('invitation_code');
            }

            $user->update($updateData);

        } catch (PaymentException $e) {
            DB::rollBack();

            if (Str::contains($e->getMessage(), 'Insufficient funds')) {
                return $this->sendError('Insufficient funds.');
            }

            if ('card[number]' == $e->getParam()) {
                return $this->sendError(__('Invalid card information.'));
            } else {

                return $this->sendError(__('Card verification failed. please contact your bank.'));
            }
        } catch (InvalidRequestException $e) {
            DB::rollBack();


            if ('coupon' == $e->getParam()) {
                if ('resource_not_found' == $e->getApiErrorCode()) {
                    return $this->sendError(__('Invalid coupon.'));
                } elseif ('resource_limit_exhausted' == $e->getApiErrorCode()) {
                    return $this->sendError(__('Coupon has expired.'));
                } elseif ('invalid_request' == $e->getApiErrorCode()) {
                    return $this->sendError(__('Coupon is not available with this plan.'));
                } else {
                    return $this->sendError(__('Invalid coupon.'));
                }
            } elseif (Str::contains($e->getParam(), 'coupon')) {
                return $this->sendError(__('Invalid coupon.'));
            } else {
                return $this->sendError(_serverErrorMessage());
            }
        } catch (OperationFailedException $e) {
            DB::rollBack();

            return $this->sendError(__('Payment service is not available please try again latter.'));
        } catch (APIError|Exception $e) {
            DB::rollBack();


            return $this->sendError(_serverErrorMessage());
        }

        DB::commit();

        AddTagToActiveCampaignContactJob::dispatch(userId: $user->id);

        $password = Str::random();

        $user->update(['password' => Hash::make($password)]);

        Mail::to($user)->send(new UserPasswordMail($user, $password));
        Auth::logoutOtherDevices($password);

        return $this->sendResponse([], __('payment process completed'));
    }

    /**
     * This function will verify the coupon code before subscription
     *
     * @return JsonResponse
     */
    public function verifyCouponCode($couponCode)
    {
        $payable = $this->getPlanNewPrice($couponCode);

        if ($payable === null) {
            return $this->sendError(__('Invalid coupon'), 404);
        }

        return $this->sendResponse($payable, "You have to pay $payable.00 dollar");
    }

    /**
     * Get the plan new price by coupon
     *
     * @param $couponCode
     * @return int|null
     */
    private function getPlanNewPrice($couponCode): ?int
    {
        $coupon = $this->chargeBeeService->getCoupon($couponCode);
        $planVal = config('chargbee.yearly_item_price');

        if ($coupon == null) {
            return null;
        }

        if ($coupon->status != 'active') {
            return null;
        }

        if ($coupon->discountType == 'percentage') {
            $percentage = $coupon->discountPercentage;

            return $planVal * (1 - ($percentage / 100));
        }

        if ($coupon->discountType == 'fixed_amount') {
            $discountAmount = $coupon->discountAmount / 100;
            return $planVal - $discountAmount;
        }

        return null;
    }

    /**
     * Creates the payment intent for initializing the chargebee inputs
     *
     * @return JsonResponse
     */
    public function paymentIntent(ChargeBeeService $chargeBeeService, $couponCode = null)
    {
        $startData = now()->setHour(15)->setMinute(0)->seconds(0);
        $endData = now();

        if ($startData > $endData) {
            $startData->subDay();
        }

        $total_registrations =  \Illuminate\Support\Facades\DB::table('users')
            ->where('subscribed',true)
            ->where('created_at', '>=', $startData)
            ->where('created_at', '<=', $endData)
            ->count();

        $registrationCap = \Illuminate\Support\Facades\DB::table('registration_caps')->orderBy('id','desc')->first();

        if ($registrationCap) {
            if (($registrationCap->limit - $total_registrations) <= 0){
                Auth::logout();
                return $this->sendError(__('Sold Out'),401);
            }
        }
        $message = '';
        $success = true;
        $price = config('chargbee.yearly_item_price');

        if ($couponCode) {
            $payable = $this->getPlanNewPrice($couponCode);

            if ($payable === null) {
                $message = "Invalid coupon.";
                $success = false;
            } else {
                $message = "You have to pay $payable.00 dollar.";
                $price = $payable;
            }
        }

        $paymentIntent = '';

        if (config('chargbee.3ds_secure')) {
            $paymentIntent = $this->chargeBeeService->createPaymentIntent(price: $price)->toJson();
        }

        $response = [
            'paymentIntent' => $paymentIntent,
            'price' => $price,
            'success' => $success
        ];

        return $this->sendResponse($response, $message);
    }

    public function status()
    {
        return $this->sendResponse(['status' => _user()->subscribed]);
    }

    /**
     * This function format the timestamps
     *
     * @return string
     */
    private function formatTimestamp(int $timestamp)
    {
        return Carbon::createFromTimestamp($timestamp)->format('Y-m-d H:i:s');
    }

    private function getUnderCapUsersCount(): int
    {
        $startData = now()->setHour(15)->setMinute(0)->seconds(0);
        $endData = now();

        if ($startData > $endData) {
            $startData->subDay();
        }

        return User::query()
            ->whereSubscribed(true)
            ->where('created_at', '>=', $startData)
            ->where('created_at', '<=', $endData)
            ->count();
    }
}
