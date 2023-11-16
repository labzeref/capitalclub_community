<?php

namespace App\Console\Commands;

use App\Services\ChargeBeeService;
use Illuminate\Console\Command;

class ChargeBeeGetPaymentIntentCommand extends Command
{
    protected $signature = 'chargebee:get-payment-intent';

    protected $description = 'Console the payment intent';

    public function handle(): void
    {
        $chargeBeeService = new ChargeBeeService();

        $paymentIntent = $chargeBeeService->createPaymentIntent();

        $this->info($paymentIntent->toJson());
    }
}
