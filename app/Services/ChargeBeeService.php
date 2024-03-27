<?php

namespace App\Services;

use App\Models\BillingAddress;
use App\Models\User;
use ChargeBee\ChargeBee\Environment;
use ChargeBee\ChargeBee\Models\Coupon;
use ChargeBee\ChargeBee\Models\CouponCode;
use ChargeBee\ChargeBee\Models\Customer;
use ChargeBee\ChargeBee\Models\Invoice;
use ChargeBee\ChargeBee\Models\PaymentIntent;
use ChargeBee\ChargeBee\Models\PaymentSource;
use ChargeBee\ChargeBee\Models\PortalSession;
use ChargeBee\ChargeBee\Models\Subscription;

class ChargeBeeService
{
    /**
     * Set the environment of chargebee
     */
    public function __construct()
    {
        Environment::configure(config('chargbee.site'), config('chargbee.api_key'));
    }

    /**
     * Create payment source by chargebee token
     *
     * @return mixed|null
     */
    public function createPaymentSourceByChargeBeeToken(string $customerId, string $token): mixed
    {
        return PaymentSource::createUsingToken([
            'customerId' => $customerId,
            'tokenId' => $token,
            'replacePrimaryPaymentSource' => true,
        ])->paymentSource();
    }

    /**
     * Create payment source by payment intent
     *
     * @return mixed|null
     */
    public function createPaymentSourceByPaymentIntent(string $customerId, array $paymentIntent): mixed
    {
        return PaymentSource::createUsingPaymentIntent([
            'customerId' => $customerId,
            'replacePrimaryPaymentSource' => true,
            'paymentIntent' => [
                'id' => $paymentIntent['id'],
            ],
        ])->paymentSource();
    }

    /**
     * Create the subscription with the item
     */
    public function createSubscriptionWithItem(
        string $customerId,
        string $itemPriceId,
        ?array $paymentIntent,
        ?string $coupon): array
    {
        $coupons = [];

        if (!$paymentIntent && config('chargbee.3ds_secure')) {
            throw new \Exception('Payment intent is required while 3d secure is on.');
        }

        if ($coupon) {
            $coupons[] = $coupon;
        }

        $payload = [
            'subscriptionItems' => [
                [
                    'itemPriceId' => $itemPriceId,
                ],
            ],
            'invoiceImmediately' => true,
            'coupon_ids' => $coupons,
        ];

        if (config('chargbee.3ds_secure')) {
            $payload = array_merge($payload, [
                'paymentIntent' => [
                    'id' => $paymentIntent['id'],
                ],
                'replacePrimaryPaymentSource' => true,
            ]);
        }

        $result = Subscription::createWithItems($customerId, $payload);

        return [$result->subscription(), $result->card(), $result->invoice()];
    }

    /**
     * Creates the customer in chargebee
     */
    public function createCustomer(User $user, ?BillingAddress $billingAddress = null): Customer
    {
        if (! $billingAddress) {
            $billingAddress = $user->billingAddress;
        }

        $response = Customer::create([
            'firstName' => $user->first_name,
            'lastName' => $user->last_name,
            'email' => $user->email,
            'locale' => 'en',
            'billingAddress' => [
                'firstName' => $user->first_name,
                'lastName' => $user->last_name,
                'line1' => $billingAddress->phone_number,
                'city' => $billingAddress->city,
                'state' => $billingAddress->state,
                'zip' => $billingAddress->zip_code,
                'country' => $billingAddress->country_iso,
            ],
        ]);

        return $response->customer();
    }

    /**
     * Update the customer in chargebee
     *
     * @return mixed|null
     */
    public function updateCustomer(User $user, ?BillingAddress $billingAddress = null): mixed
    {
        if (! $billingAddress) {
            $billingAddress = $user->billingAddress;
        }

        $response = Customer::update($user->charge_bee_id, [
            'firstName' => $user->first_name,
            'lastName' => $user->last_name,
            'email' => $user->email,
            'locale' => 'en',
            'billing_address' => [
                'firstName' => $user->first_name,
                'lastName' => $user->last_name,
                'line1' => $billingAddress->street_address,
                'phone' => $billingAddress->phone_number,
                'city' => $billingAddress->city,
                'state' => $billingAddress->state,
                'zip' => $billingAddress->zip_code,
                'country' => $billingAddress->country_iso,
            ],
        ]);

        return $response->customer();
    }

    public function getCustomer(User $user){
        return Customer::retrieve($user->charge_bee_id)->customer();
    }
    public function updateCustomerBilling(User $user, ?BillingAddress $billingAddress = null): mixed
    {
        if (! $billingAddress) {
            $billingAddress = $user->billingAddress;
        }

        $response = Customer::updateBillingInfo($user->charge_bee_id, [
            'billing_address' => [
                'firstName' => $user->first_name,
                'lastName' => $user->last_name,
                'line1' => $billingAddress->street_address,
                'phone' => $billingAddress->phone_number,
                'city' => $billingAddress->city,
                'state' => $billingAddress->state,
                'zip' => ''.$billingAddress->zip_code.'',
                'country' => $billingAddress->country_iso,
            ],
        ]);

        return $response->customer();
    }

    /**
     * Create the payment intent
     *
     * @return mixed|null
     */
    public function createPaymentIntent($price): mixed
    {
        return PaymentIntent::create([
            'amount' => $price * 100, // Converting to cents
            'currencyCode' => 'USD',
        ])->paymentIntent();
    }

    /**
     * Get the download link of invoice pdf
     *
     * @return mixed|null
     */
    public function downloadInvoicePdf($invoiceId): mixed
    {
        return Invoice::pdf($invoiceId)->download();
    }

    /**
     * Create the portal session
     *
     * @return mixed|null
     */
    public function createPortalSession(string $customerId): mixed
    {
        return PortalSession::create([
            'customer' => [
                'id' => $customerId,
            ],
        ])->portalSession();
    }

    /**
     * Get the coupon from chargebee
     *
     * @return mixed|null
     */
    public function getCoupon(string $code): mixed
    {
        try {
            $couponCode = CouponCode::retrieve($code)->couponCode();

            if($couponCode->status == 'not_redeemed'){
                return Coupon::retrieve($couponCode->couponId)->coupon();
            }

            return null;
        } catch (\Throwable $throwable) {
            return null;
        }
    }
    /**
     * retrieve subscription from chargebee
     *
     * @return mixed|null
     */

    public function getSubscription(string $subscription): mixed
    {
        try {
            return  Subscription::retrieve($subscription);
        } catch (\Throwable $throwable) {
            return null;
        }
    }
    /**
     * retrieve subscription from chargebee
     *
     * @return mixed|null
     */

    public function getInvoice(int $id): mixed
    {
        try {
            return  Invoice::retrieve($id);
        } catch (\Throwable $throwable) {
            return null;
        }
    }
}
