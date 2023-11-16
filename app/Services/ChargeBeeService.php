<?php

namespace App\Services;

use App\Models\User;
use ChargeBee\ChargeBee\Environment;
use ChargeBee\ChargeBee\Models\Customer;
use ChargeBee\ChargeBee\Models\Invoice;
use ChargeBee\ChargeBee\Models\PaymentIntent;
use ChargeBee\ChargeBee\Models\PaymentSource;
use ChargeBee\ChargeBee\Models\PortalSession;
use ChargeBee\ChargeBee\Models\Subscription;

class ChargeBeeService
{
    public function __construct()
    {
        Environment::configure(config('chargbee.site'), config('chargbee.api_key'));
    }

    public function createPaymentSourceByChargeBeeToken(string $customerId, string $token)
    {
        return PaymentSource::createUsingToken([
            'customerId' => $customerId,
            'tokenId' => $token,
        ])->paymentSource();
    }

    public function createPaymentSourceByPaymentIntent(string $customerId, array $paymentIntent)
    {
        return PaymentSource::createUsingPaymentIntent([
            'customerId' => $customerId,
            'replacePrimaryPaymentSource' => true,
            'paymentIntent' => [
                'id' => $paymentIntent['id'],
            ],
        ])->paymentSource();
    }

    public function createSubscriptionWithItem(string $customerId, string $itemPriceId, array $paymentIntent): array
    {
        $result = Subscription::createWithItems($customerId, [
            'subscriptionItems' => [
                [
                    'itemPriceId' => $itemPriceId,
                ],
            ],
            'invoiceImmediately' => true,
            'paymentIntent' => [
                'id' => $paymentIntent['id'],
            ],
            'replacePrimaryPaymentSource' => true,
        ]);

        return [$result->subscription(), $result->card(), $result->invoice()];
    }

    public function createCustomer(User $user): Customer
    {
        $billingAddress = $user->billingAddress;

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

    public function createPaymentIntent()
    {
        return PaymentIntent::create([
            'amount' => config('chargbee.yearly_item_price') * 100,
            'currencyCode' => 'USD',
        ])->paymentIntent();
    }

    public function downloadInvoicePdf($invoiceId)
    {
        return Invoice::pdf($invoiceId)->download();
    }

    public function createPortalSession(string $customerId, string $redirectUrl)
    {
        return PortalSession::create([
            'redirectUrl' => $redirectUrl,
            'customer' => [
                'id' => $customerId,
            ],
        ])->portalSession();
    }
}
