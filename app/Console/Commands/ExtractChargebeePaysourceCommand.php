<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;

class ExtractChargebeePaysourceCommand extends Command
{
    protected $signature = 'extract:chargebee-paysource';

    protected $description = 'Extract Chargebee payment sources for users with subscriptions';

    public function handle(): void
    {
        $site = config('services.chargebee.site');
        $apiKey = config('services.chargebee.api_key');
        $existing = 0;
        $foundsUsers = 0;
        $notFoundUsers = 0;
        $nextOffset = null;

        while (true) {
            $response = Http::withBasicAuth($apiKey, '')
                ->get("https://{$site}.chargebee.com/api/v2/payment_sources", [
                    "limit" => 100,
                    "offset" => $nextOffset,
                ]);

            if (!$response->successful()) {
                dd("Api Failed", $response->json());
            }

            $paySources = $response->json()['list'];

            foreach ($paySources as $paySource) {
                $existingRecord = DB::table('charge_bee_pay_sources')->where('customer_id', $paySource['payment_source']['customer_id'])->first();
                $userId = DB::table('users')->where('charge_bee_id', $paySource['payment_source']['customer_id'])->first()?->id;

                if ($existingRecord) {
                    $existing++;
                }

                if ($userId) {
                    $foundsUsers++;
                } else {
                    $notFoundUsers++;
                }

                DB::table('charge_bee_pay_sources')->insert([
                    'user_id' => $userId,
                    'customer_id' => $paySource['payment_source']['customer_id'],
                    'paysource_id' => $paySource['payment_source']['id'],
                    'reference_id' => $paySource['payment_source']['reference_id'],
                    'expiry_month' => $paySource['payment_source']['card']['expiry_month'],
                    'expiry_year' => $paySource['payment_source']['card']['expiry_year'],
                    'last4' => $paySource['payment_source']['card']['last4'],
                    'gateway' => $paySource['payment_source']['gateway'],
                    'gateway_account_id' => $paySource['payment_source']['gateway_account_id'],
                    'payload' => json_encode($paySource),
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);

                $this->output->write("\rFound users: {$foundsUsers} | Not found users: {$notFoundUsers} | Existing: {$existing}");
            }

            if (isset($response->json()['next_offset'])) {
                $nextOffset = $response->json()['next_offset'];
            } else {
                break;
            }
        }

        $this->output->write("\rFound users: {$foundsUsers} | Not found users: {$notFoundUsers} | Existing: {$existing}");
    }
}
