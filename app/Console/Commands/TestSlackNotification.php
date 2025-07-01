<?php

namespace App\Console\Commands;

use App\Models\User;
use App\Notifications\SlackTestNotification;
use App\Services\CheckoutChampService;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Notification;

class TestSlackNotification extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:test-slack-notification';

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

        $test = 'DA86E10336';

        $checkoutChampService = new CheckoutChampService();
        // Ger order data from api
        $getOrderData = $checkoutChampService->getOrder($test);
        $getOrderData = $getOrderData->json()['message']['data'][0];

        $getPurchaseData = $checkoutChampService->getPurchase($test);
        $getPurchaseData = $getOrderData->json()['message']['data'][0];

        dd([
            'purchase'=>[
                'status'=>$getPurchaseData['status'],
                'nextBill'=>$getPurchaseData['nextBillDate']
            ],
            'order'=>[
                'status'=>$getOrderData['orderStatus'],
                'nextBill'=>$getOrderData['nextBillDate']
            ],
        ]);

//        Log::channel('slack')->error('Test Message');

//        Notification::route('slack', config('services.slack.notifications.channel'))
//            ->notify(new SlackTestNotification());

    }
}
