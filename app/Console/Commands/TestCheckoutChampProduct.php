<?php

namespace App\Console\Commands;

use App\Services\CheckoutChampService;
use Illuminate\Console\Command;

class TestCheckoutChampProduct extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:test-checkout-champ-product';

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


        $checkoutChampService = new CheckoutChampService();
        $productResponse = $checkoutChampService->getProduct(41);

        dd($productResponse->body());

    }
}
