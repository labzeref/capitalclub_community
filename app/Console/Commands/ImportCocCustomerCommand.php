<?php

namespace App\Console\Commands;

use App\Services\CheckoutChampService;
use Illuminate\Console\Command;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ImportCocCustomerCommand extends Command
{
    protected $signature = 'import:coc-customer';

    protected $description = 'Command description';

    public function handle(): void
    {
        DB::beginTransaction();

        try {
            $email = $this->ask('Enter Email Address');
            $startDate = "01/01/2021";
            $endDate = now()->format("m/d/Y");
            $newStartDate = $this->ask("Assuming start date $startDate, leave empty to keep this date");

            if ($newStartDate) {
                $startDate = $newStartDate;
            }

            $service = new CheckoutChampService();

            $customerResponse = $service->queryCustomer([
                'emailAddress' => $email,
                'startDate' => $startDate,
                'endDate' => $endDate,
            ]);

            // Getting customer

            if (!$customerResponse->successful() || $customerResponse->json()['result'] != 'SUCCESS' || !isset($customerResponse->json()['message']['data']) || (!isset($customerResponse->json()['message']['data']) && count($customerResponse->json()['message']['data']) < 1)) {
                $this->error('No customer found, aborting');
                dump($customerResponse->json());
                return;
            }

            $customer = $customerResponse->json()['message']['data'][0];

            // Getting order

            $orderResponse = $service->queryOrders([
                'customerId' => $customer['customerId'],
            ]);

            if (!$orderResponse->successful() || $orderResponse->json()['result'] != 'SUCCESS' || !isset($orderResponse->json()['message']['data']) || (!isset($orderResponse->json()['message']['data']) && count($orderResponse->json()['message']['data']) < 1)) {
                $this->error('No Orders found, aborting');
                dump($orderResponse->json());
                return;
            }

            $orders = $orderResponse->json()['message']['data'];

            $user = $service->createUser(
                attributes: [
                    'checkout_champ_id' => $customer['customerId'],
                    'country_iso' => $customer['country'],
                    'first_name' => $customer['firstName'],
                    'last_name' => $customer['lastName'],
                    'email' => strtolower($customer['emailAddress']),
                ],
                password: Str::random()
            );

            $service->createUserShippingAddress([
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

            if (isset($customer['paySources']) && count($customer['paySources']) > 0) {
                $service->syncUserCards($user, $customer['paySources']);
            }


            foreach ($orders as $order) {

//                if ($order['campaignId'] != 16) {
//                    $this->error("for Order {$order['orderId']} Campaign ID is not 16, aborting");
//                    continue;
//                }
//                if ($order['orderStatus'] != 'COMPLETE') {
//                    $this->error("for Order {$order['orderId']} Order Status is not COMPLETE, aborting");
//                    continue;
//                }
//                if ($order['reviewStatus'] != 'APPROVED') {
//                    $this->error("for Order {$order['orderId']} Review status is not APPROVED, aborting");
//                    continue;
//                }

                $items = $order['items'];

                $purchaseData = $service->getPurchase($order['orderId']);
                $purchaseBody = $purchaseData->json();
                $purchase = $purchaseBody['message']['data'] ?? null;
                $purchase = $purchase[0] ?? null;

                dd($purchase['purchaseId']);



                if (count($items) != 1) {
                    $this->error("for Order {$order['orderId']} count is not 1, aborting");
                    continue;
                }

                $nextBillDate = null;

                foreach ($items as $item) {
                    if (isset($item['nextBillDate'])) {
                        $nextBillDate = $item['nextBillDate'];
                    }
                }

                if (!$nextBillDate){
                    $this->error("for Order {$order['orderId']} There is no next bill date, aborting");
                    continue;
                }

                // taking fist element irrespective of key
                $productId = reset($order['items'])['productId'];

                $productResponse = $service->getProduct($productId);

                if (!$productResponse->successful() || $productResponse->json()['result'] != 'SUCCESS' || !isset($productResponse->json()['message']['data']) || (!isset($productResponse->json()['message']['data']) && count($productResponse->json()['message']['data']) < 1)) {
                    $this->error('No Product found, aborting');
                    dump($productResponse->json());
                    return;
                }

                $productData = $productResponse->json()['message']['data'][0];

                $product = $service->syncProduct(attributes: [
                    'checkout_champ_id' => $productId,
                    'name' => $productData['productName'],
                    'description' => $productData['productDescription'],
                    'cost' => $productData['productCost'],
                ]);

                if ($order['cardLast4']){

                    $card = $service->getUserCardByLast4($user, $order['cardLast4']);
                }


                $service->createOrder(
                    user: $user,
                    attributes: [
                        'checkout_champ_id' => $order['clientOrderId'],
                        'product_id' => $product->id,
                        'card_id' => $card?->id ?? null,
                        'start_at' => Carbon::parse($order['dateCreated']),
                        'end_at' => Carbon::parse($nextBillDate)->endOfDay(),
                        'amount' => $order['totalAmount'],
                        'status' => $order['orderStatus'],
                    ]
                );

                $this->info("Order {$order['orderId']} imported successfully");
            }
        } catch (\Throwable $throwable) {
            DB::rollBack();

            throw $throwable;
        }

        DB::commit();
    }
}
