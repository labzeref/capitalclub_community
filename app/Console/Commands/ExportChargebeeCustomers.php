<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;

class ExportChargebeeCustomers extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:export-chargebee-customers';

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
        $existing = 0;
        $foundsUsers = 0;
        $iteration = 1;
        $notFoundUsers = 0;
        $nextOffset = null;

        while (true) {
            $response = Http::withBasicAuth($apiKey, '')
                ->get("https://{$site}.chargebee.com/api/v2/customers", [
                    "limit" => 100,
                    "offset" => $nextOffset,
                    "type[is]" => "card",
                    "status[is]" => "valid",
                    'card_status[is]'=> 'valid'
                ]);

            if (!$response->successful()) {
                dd("Api Failed", $response->json());
            }


            $customers = $response->json()['list'];

            foreach ($customers as $customer){

                $cs = $customer['customer'];
                $exist = DB::table('charge_bee_customers')->where('customer_id', $cs['id'])->first();

                $user = DB::table('users')->where('charge_bee_id', $cs['id'])->first()?->id;


                if ($user){
                    $foundsUsers++;
                } else {
                    $notFoundUsers++;
                }

                $this->output->write("\rFound users: {$foundsUsers} | Not found users: {$notFoundUsers} | Existing: {$existing}");

                if ($exist){
                    $existing++;
                    continue;
                }

                DB::table('charge_bee_customers')->insert([
                    'user_id' => $user,
                    'customer_id' => $cs['id'] ?? null,
                    'first_name' => $cs['first_name'] ?? null,
                    'last_name' => $cs['last_name'] ?? null,
                    'email' => $cs['email'] ?? null,
                    'primary_payment_source_id' => $cs['primary_payment_source_id'] ?? null,
                    'primary_payment_source_reference_id' => isset($cs['payment_method']) ? $cs['payment_method']['reference_id'] : null,
                    'primary_payment_source_gateway' =>  isset($cs['payment_method']) ? $cs['payment_method']['gateway'] : null,
                    'primary_payment_source_gateway_account_id' =>  isset($cs['payment_method']) ? $cs['payment_method']['gateway_account_id'] : null,
                    'payload' => json_encode($cs),
                    'created_at' => now(),
                    'updated_at' => now()
                ]);


            }

            if (isset($response->json()['next_offset'])) {
                $nextOffset = $response->json()['next_offset'];
            } else {
                break;
            }
        }

    }
}
