<?php

namespace App\Jobs\CbToCocMigration;

use App\Models\CbToCocMigrationStripeMissingCustomer;
use App\Models\CbToCocMigrationStripeNonOrderCustomer;
use App\Models\CbToCocMigrationStripeSuccessfulCustomer;
use App\Models\CbToCocMissing;
use App\Models\CbToCocMissingOrder;
use App\Models\CbToCocSuccessfullCustomer;
use App\Models\ChargeBeeCustomer;
use App\Models\CheckoutChampUserCard;
use App\Models\User;
use App\Services\CheckoutChampService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Carbon;

class ImportStripeCustomersJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(
        private readonly User $user,
    )
    {
        $this->onQueue('migration');
    }

    public function handle(): void
    {
        $service = new CheckoutChampService();
        $user = $this->user;
        $userId = $user->id;

        if (!$user){
            $this->fail(new \Exception("User not found with id $userId"));
            return;
        }

        $customerResponse = $service->queryCustomer([
            'emailAddress' => strtolower($user->email),
            'startDate' => '10/01/2023', // format is mm/dd/yyyy
            'endDate' => '10/01/2025', // format is mm/dd/yyyy
        ]);

        if (!$customerResponse->successful() || !isset($customerResponse->json()['message']['data']) || $customerResponse->json()['result'] == 'ERROR') {
            CbToCocMissing::updateOrCreate(['user_id' => $userId]);
            $this->fail(new \Exception("$user->email did not found via CheckoutChamp api"));
            return;
        }

        if (!array_key_exists('data', $customerResponse->json()['message'])) {
            CbToCocMissing::updateOrCreate(['user_id' => $userId]);
            $this->fail(new \Exception("$user->email ".$customerResponse->json()['message']));
            return;
        }

        $customerData = $customerResponse->json()['message']['data'];

        if (count($customerData) < 1) {
            $this->fail(new \Exception("$user->email There are no users in the response"));
            return;
        }

        $customer = $customerData[0];

        $user->update(['checkout_champ_id' => $customer['customerId']]);

        $service->createUserShippingAddress(attributes: [
            'user_id' => $user->id,
            'first_name' => $customer['shipFirstName'],
            'last_name' => $customer['shipLastName'],
            'address1' => $customer['shipAddress1'],
            'address2' => $customer['shipAddress2'],
            'city' => $customer['shipCity'],
            'state' => $customer['shipState'],
            'country' => $customer['shipCountry'],
            'postal_code' => $customer['shipPostalCode'],
        ]);

        $customerId = $customer['customerId'];

        $user->refresh();

        $card = CheckoutChampUserCard::updateOrCreate([
            'user_id' => $user->id
        ], [
            'user_id' => $user->id,
            'type' => $customer['cardType'],
            'last_4' => $customer['cardLast4'],
            'expiry' => Carbon::parse($customer['cardExpiryDate'])->endOfMonth()->format('Y-m-d'),
            'pay_source_id' => $customer['paySourceId'],
        ]);

        $orderResponse = $service->queryOrders([
            'customerId' => $customer['customerId']
        ]);

        if (!$orderResponse->successful() || !isset($orderResponse->json()['message']['data']) || $orderResponse->json()['result'] == 'ERROR') {
            CbToCocMissingOrder::create([
                'user_id' => $user->id,
                'checkout_champ_customer_id' => $customerId,
            ]);
            $this->fail(new \Exception("Order api failed or did not get data $customer[customerId], $user->email"));
            return;
        }

        $orders = $orderResponse->json()['message']['data'];

        if (count($orders) < 1) {
            CbToCocMissingOrder::create([
                'user_id' => $user->id,
                'checkout_champ_customer_id' => $customerId,
            ]);
            $this->fail(new \Exception("There are no orders in the response,  $customer[customerId], $user->email"));
            return;
        }

        foreach ($orders as $order) {

            if ($order['campaignId'] != 3){
                continue;
            }
            $purchaseResponse = $service->getPurchase($order['orderId']);

            if (!$purchaseResponse->successful() || (isset($purchaseResponse->json()['result']) && $purchaseResponse->json()['result'] == 'ERROR')) {
                $this->fail(new \Exception("purchase api failed from COC, cus: $customer[customerId], email: $user->email, order: $order[orderId]"));
                return;
            }

            if ($purchaseResponse->json()['message']['data'] < 1) {
                $this->fail(new \Exception("There are no purchase in the response, cus: $customer[customerId], email: $user->email, order: $order[orderId]"));
                return;
            }

            $purchaseData = $purchaseResponse->json()['message']['data'];

            if (!array_key_exists('nextBillDate', (array)$purchaseData[0])) {
                $this->fail(new \Exception("Purchase NextBill date does not exist"));
                return;
            }

            $productData = array_values($order['items'])[0];

            $product = $service->syncProduct(attributes: [
                'checkout_champ_id' => $productData['productId'],
                'name' => $productData['name'] ?? 'No name',
                'description' => $productData['productDescription'] ?? 'No description',
                'cost' => $productData['price'] ?? 0,
            ]);

            $service->createOrder(
                user: $user,
                attributes: [
                    'checkout_champ_id' => $order['orderId'],
                    'product_id' => $product?->id,
                    'card_id' => $card?->id,
                    'start_at' => Carbon::parse($order['dateCreated']),
                    'end_at' => Carbon::parse($purchaseData[0]['nextBillDate'])->endOfDay(),
                    'amount' => $order['totalAmount'],
                    'status' => $order['orderStatus'],
                ]
            );

            CbToCocSuccessfullCustomer::create([
                'user_id' => $user->id,
                'checkout_champ_customer_id' => $customerId,
                'checkout_champ_order_id' => $order['orderId'],
                'product_id' => $productData['productId'],
                'next_bill_date' => Carbon::parse($purchaseData[0]['nextBillDate'])->endOfDay(),
                'last4' => $customer['cardLast4'],
                'amount' => $order['totalAmount'],
            ]);
        }
    }
}
