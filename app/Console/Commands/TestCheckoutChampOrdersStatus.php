<?php

namespace App\Console\Commands;

use App\Services\CheckoutChampService;
use Illuminate\Console\Command;

class TestCheckoutChampOrdersStatus extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:test-checkout-champ-orders-status';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $order_id = $this->ask('Order ID');

        $checkoutChampService = new CheckoutChampService();
        // Ger order data from api
        $getOrderData = $checkoutChampService->getOrder($order_id);
        if (! $getOrderData->successful()) {
            $this->error('Order api failed');
        };
        $getOrderData = $getOrderData->json()['message'];


        try {
            $getOrderData = $getOrderData['data'][0];



        } catch (\Exception $e) {
            dd($getOrderData);
        }



        $getPurchaseData = $checkoutChampService->getPurchase($order_id);
        if (! $getPurchaseData->successful()) {
            $this->error('Purchase api failed');
        };

        $getPurchaseData = $getPurchaseData->json()['message'];

        try {
            $getPurchaseData = $getPurchaseData['data'][0];


        } catch (\Exception $e) {
            dd($getPurchaseData);
        }



        dd([
//            'purchase'=>$getPurchaseData
            [
                'status'=>$getPurchaseData['status'],
                'nextBill'=> $getPurchaseData['nextBillDate'] ?? null,
            ]
            ,
//            'order'=>$getOrderData
            [
                'status'=>$getOrderData['orderStatus'],
                'nextBill'=> $getOrderData['nextBillDate'] ?? null,
            ]
            ,
        ]);

    }
}
