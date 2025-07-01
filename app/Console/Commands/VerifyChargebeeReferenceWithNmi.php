<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;

class VerifyChargebeeReferenceWithNmi extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:verify-chargebee-reference-with-nmi';

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

        $options = ['primary_payment_source_reference_id', 'spreedly_nmi_customer_vault_id', 'payfurl_nmi_customer_vault_id'];
        $total = 0;

        // Show the options to the user and let them choose
        $column = $this->choice(
            'Please select an option',  // Prompt message
            $options,                   // Array of options
            0                           // Default option index (optional)
        );

        // Display the selected option
        $this->info('You selected: ' . $column);

        $cus = DB::table('charge_bee_customers')->where($column, '!=', null)->orderBy('id','desc')->get();

        foreach ($cus as $c){

            $total++;
            $this->info('Total: '.$total);

            $vault_id  = $c->{$column};

            if (empty($vault_id)){
                continue;
            }

            if ($c->verified_by_nmi){
                $this->info('Already Verified');
                continue;
            }

            $exp = explode('/',$vault_id);

            if (count($exp) > 1){
                $vault_id = $exp[0];
            }else{
                $vault_id = $c->{$column};
            }

            $headers = [
                'Content-Type' => 'application/x-www-form-urlencoded',
                'Accept' => 'application/xml'
            ];

            $client = Http::withHeaders($headers)
                ->get('https://secure.nmi.com/api/query.php?security_key='.config('services.nmi.api_key').'&result_limit=100&report_type=customer_vault&customer_vault_id='.$vault_id);

            $xml = simplexml_load_string($client->body());
            $json = json_encode($xml);
            $vault = json_decode($json, true);

            if (isset($vault['customer_vault']['customer']['customer_vault_id'])){

                DB::table('charge_bee_customers')->where('id',$c->id)->update([
                    'verified_by_nmi'=>1
                ]);

                $this->info('vault: '.$vault_id.' | exists');
            }else{
                $this->error('vault: '.$vault_id.' | not exists');
            }

        }


    }
}
