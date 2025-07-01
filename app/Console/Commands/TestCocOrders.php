<?php

namespace App\Console\Commands;

use App\Services\CheckoutChampService;
use Illuminate\Console\Command;

class TestCocOrders extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:test-coc-orders';

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
        $coc = new CheckoutChampService();

        $orderResponse = $coc->queryOrders([
            'customerId' => 6269
        ]);

        dd($orderResponse->json()['message']['data'][0]['campaignId']);
    }
}
