<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;

class SaveChargebeeTransactionsCommand extends Command
{
    protected $signature = 'save:chargebee-transactions';

    protected $description = 'Command description';

    public function handle(): void
    {
        $site = config('services.chargebee.site');
        $apiKey = config('services.chargebee.api_key');
        $nextOffset = null;
        $skip = 0;
        $stored= 0;

        while (true) {
            $response = Http::withBasicAuth($apiKey, '')
                ->get("https://{$site}.chargebee.com/api/v2/transactions", [
                    "limit" => 100,
                    "offset" => $nextOffset,
                    "status[is]" => "success",
                    "sort_by[asc]" => "date"
                ]);

            if (!$response->successful()) {
                dd("Api Failed", $response->json());
            }

            $transactions = $response->json()['list'];

            foreach ($transactions as $transaction) {
                $existingRecord = DB::table('chargebee_txn')->where('txn_id', $transaction['transaction']['id'])->first();

                if ($existingRecord) {
                    $skip++;
                    continue;
                } else {
                    $stored++;
                }

                DB::table('chargebee_txn')->insert([
                    'txn_id' => $transaction['transaction']['id'],
                    'customer_id' => $transaction['transaction']['customer_id'] ?? null,
                    'subscription_id' => $transaction['transaction']['subscription_id'] ?? null,
                    'gateway_account_id' => $transaction['transaction']['gateway_account_id'] ?? null,
                    'payment_source_id' => $transaction['transaction']['payment_source_id'] ?? null,
                    'payment_method' => $transaction['transaction']['payment_method'] ?? null,
                    'gateway' => $transaction['transaction']['gateway'] ?? null,
                    'type' => $transaction['transaction']['type'] ?? null,
                    'date' => $transaction['transaction']['date'] ?? null,
                    'amount' => $transaction['transaction']['amount'] ?? null,
                    'id_at_gateway' => $transaction['transaction']['id_at_gateway'] ?? null,
                    'status' => $transaction['transaction']['status'] ?? null,
                    'fraud_reason' => $transaction['transaction']['fraud_reason'] ?? null,
                    'deleted' => $transaction['transaction']['deleted'] ?? null,
                    'masked_card_number' => $transaction['transaction']['masked_card_number'] ?? null,
                    'currency_code' => $transaction['transaction']['currency_code'] ?? null,
                    'base_currency_code' => $transaction['transaction']['base_currency_code'] ?? null,
                    'amount_unused' => $transaction['transaction']['amount_unused'] ?? null,
                    'payload' => json_encode($transaction),
                ]);

                $this->output->write("\rSkipped: {$skip} | Stored: {$stored}");
            }

            if (isset($response->json()['next_offset'])) {
                $nextOffset = $response->json()['next_offset'];
            } else {
                break;
            }
        }
    }
}
