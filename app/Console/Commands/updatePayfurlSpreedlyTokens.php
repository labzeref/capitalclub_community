<?php

namespace App\Console\Commands;

use App\Models\ChargeBeeCustomer;
use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class updatePayfurlSpreedlyTokens extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:update-payfurl-spreedly-tokens';

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
        //spreedly

        DB::table('spreedly_tokens')->truncate();

        $csvFile = fopen(base_path("ChargebeeTokens/spreedly.csv"), "r");
        $firstline = true;
        while (($data = fgetcsv($csvFile, 2000, ",")) !== FALSE) {
            if (!$firstline) {

                $chargebee_id = $data[3];
                $paysource_id = $data[0];
                $nmi_customer_vault_id = explode('#',explode('\'',explode(':',$data[2])[1])[1])[0];
                $spreedly_token = $data[4];


                $user = User::where('charge_bee_id', $chargebee_id)->first();
                $chargebee_customer = ChargeBeeCustomer::where('customer_id', $chargebee_id)->first();

                if ($user) {
                    $user_id = $user->id;
                }else{
                   $this->info('User not found: '.$chargebee_id);
                   continue;
                }

                if ($chargebee_customer){
                    $chargebee_customer->update([
                        'spreedly_nmi_customer_vault_id' => $nmi_customer_vault_id
                    ]);
                }

                DB::table('spreedly_tokens')
                ->insert([
                    'user_id' => $user_id,
                    'chargeebee_customer_id' => $chargebee_id,
                    'chargebee_paysource_id' => $paysource_id,
                    'nmi_customer_vault_id' => $nmi_customer_vault_id,
                    'spreedly_token' => $spreedly_token,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
            $firstline = false;
        }

        //payfurl

        DB::table('payfurl_tokens')->truncate();

        $csvFile = fopen(base_path("ChargebeeTokens/payfurl.csv"), "r");
        $firstline = true;
        while (($data = fgetcsv($csvFile, 2000, ",")) !== FALSE) {
            if (!$firstline) {

                $chargebee_id = $data[1];
                $paysource_id = $data[4];
                $nmi_customer_vault_id = $data[5];
                $payfurl_token = $data[3];

                $user = User::where('charge_bee_id', $chargebee_id)->first();
                $chargebee_customer = ChargeBeeCustomer::where('customer_id', $chargebee_id)->first();

                if ($user) {
                    $user_id = $user->id;
                }else{
                    $this->info('User not found: '.$chargebee_id);
                    continue;
                }

                if ($chargebee_customer){
                    $chargebee_customer->update([
                        'payfurl_nmi_customer_vault_id' => $nmi_customer_vault_id
                    ]);
                }

                DB::table('payfurl_tokens')
                    ->insert([
                        'user_id' => $user_id,
                        'chargeebee_customer_id' => $chargebee_id,
                        'chargebee_paysource_id' => $paysource_id,
                        'nmi_customer_vault_id' => $nmi_customer_vault_id,
                        'payfurl_token' => $payfurl_token,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);
            }
            $firstline = false;
        }

    }
}
