<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;

class CreateChargebeeTestToken extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:create-chargebee-test-token';

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

        $site = config('services.chargebee.site');
        $apiKey = config('services.chargebee.api_key');


        $data = [
            "customer_id" => "169m3vTsSRm6UkVf",  // Ensure this value is correct and not empty
            "gateway_account_id" => "gw_AzZN1KTrxVgby5qtY",
            "type" => "CARD",
            "reference_id" => "cus_Onvtcc2qLTVVkX",
        ];


        $response = Http::withBasicAuth($apiKey, '')
            ->asForm()
            ->post("https://{$site}.chargebee.com/api/v2/payment_sources/create_using_permanent_token", $data);

        if ($response->failed()) {
            // Debug the error response
            dd($response->json());
        }

        dd($response->json());


    }
}
