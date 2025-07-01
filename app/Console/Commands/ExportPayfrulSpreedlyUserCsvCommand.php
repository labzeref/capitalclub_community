<?php

namespace App\Console\Commands;

use App\Models\User;
use App\Services\CSVColumn;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class ExportPayfrulSpreedlyUserCsvCommand extends Command
{
    protected $signature = 'export:payfrul-spreedly-user-csv';

    protected $description = 'Command description';

    public function handle(): void
    {
        $options = ['payfurl_tokens', 'spreedly_tokens'];

        // Show the options to the user and let them choose
        $table = $this->choice(
            'Please select an option',  // Prompt message
            $options,                   // Array of options
            0                           // Default option index (optional)
        );

        // Display the selected option
        $this->info('You selected: ' . $table);

        $columns = [
            CSVColumn::customerId,
            CSVColumn::orderId,
            CSVColumn::dateCreated,
            CSVColumn::campaignId,
            CSVColumn::productId,
            CSVColumn::isActiveRecurring,
            CSVColumn::nextBillDate,
            CSVColumn::paySource,
            CSVColumn::cardNumber,
            CSVColumn::cardExpiryMonth,
            CSVColumn::cardExpiryYear,
            CSVColumn::achRoutingNumber,
            CSVColumn::achAccountNumber,
            CSVColumn::achAccountType,
            CSVColumn::merchantId,
            CSVColumn::merchantTxnId,
            CSVColumn::txnType,
            CSVColumn::subTotal,
            CSVColumn::shipTotal,
            CSVColumn::salesTax,
            CSVColumn::totalAmount,
            CSVColumn::responseType,
            CSVColumn::responseText,
            CSVColumn::authCode,
            CSVColumn::parentTxnId,
            CSVColumn::firstName,
            CSVColumn::lastName,
            CSVColumn::address1,
            CSVColumn::address2,
            CSVColumn::city,
            CSVColumn::state,
            CSVColumn::country,
            CSVColumn::postalCode,
            CSVColumn::phoneNumber,
            CSVColumn::homePhone,
            CSVColumn::cellPhone,
            CSVColumn::workPhone,
            CSVColumn::emailAddress,
            CSVColumn::billShipSame,
            CSVColumn::shipFirstName,
            CSVColumn::shipLastName,
            CSVColumn::shipAddress1,
            CSVColumn::shipAddress2,
            CSVColumn::shipCity,
            CSVColumn::shipState,
            CSVColumn::shipCountry,
            CSVColumn::shipPostalCode,
            CSVColumn::affId,
            CSVColumn::subAffId,
            CSVColumn::shipDate,
            CSVColumn::shipCarrier,
            CSVColumn::shipMethod,
            CSVColumn::trackingNumber,
            CSVColumn::isChargedback,
            CSVColumn::chargebackTotal,
            CSVColumn::chargebackDate,
            CSVColumn::chargebackResonCode,
            CSVColumn::externalToken,
            CSVColumn::quantity,
            CSVColumn::variantDetailId,
            CSVColumn::password,
            CSVColumn::companyName,
            CSVColumn::cancellationDate,
            CSVColumn::verifiedByNMI,
        ];

        $time = time();
        // Define the CSV filename
        $fileName = "$table-user-$time.csv";

        // Create a file pointer
        $file = fopen(storage_path("app/{$fileName}"), 'w');

        // Output headers so that the file is downloaded rather than displayed
        header('Content-Type: text/csv');
        header('Content-Disposition: attachment;filename="' . $fileName . '"');

        fputcsv($file, $columns);

        $data = DB::table($table)->get();

        foreach ($data as $item) {
            $user = User::find($item->user_id);

            if (!$user) {
                $this->info("Missing user id {$item->user_id}", );
                continue;
            }

            $subscription = $user->subscriptions->sortByDesc('id')->first();
            $customer = $user->chargebeeCustomer;
            $paySource = $customer->paySource;
            $billingAddress = $user->billingAddress;

            if (!$paySource){
                $this->error("Missing pay source for user id {$item->user_id}");
                continue;
            }

            $paySourceId = \DB::table('chargebee_txn')->where('payment_source_id', $paySource->paysource_id)->value('txn_id');

            if ($customer->spreedly_nmi_customer_vault_id) {
                $referenceId = $customer->spreedly_nmi_customer_vault_id;
            } else if ($customer->payfurl_nmi_customer_vault_id) {
                $referenceId = $customer->payfurl_nmi_customer_vault_id;
            } else {
                $referenceId = $paySource->reference_id;
                if (count(explode('/', $referenceId)) > 1) {
                    $referenceId = explode('/', $referenceId)[0];
                }
            }

            if (!$subscription){
                continue;
            }

            $row = [
                CSVColumn::customerId => $user->charge_bee_id,
                CSVColumn::orderId => $subscription->charge_bee_id,
                CSVColumn::dateCreated => $subscription->current_term_start?->format('Y-m-d h:m:s'),
                CSVColumn::campaignId => 3,
                CSVColumn::productId => 2,
                CSVColumn::isActiveRecurring => 1,
                CSVColumn::nextBillDate => $subscription->next_billing_at?->format('Y-m-d h:m:s'),
                CSVColumn::paySource => 'CREDITCARD',
                CSVColumn::cardNumber => $paySource->last4,
                CSVColumn::cardExpiryMonth => $paySource->expiry_month,
                CSVColumn::cardExpiryYear => $paySource->expiry_year,
                CSVColumn::achRoutingNumber => '',
                CSVColumn::achAccountNumber => '',
                CSVColumn::achAccountType => '',
                CSVColumn::merchantId => 4,
                CSVColumn::merchantTxnId => $paySourceId,
                CSVColumn::txnType => 'SALE',
                CSVColumn::subTotal => 369,
                CSVColumn::shipTotal => 0,
                CSVColumn::salesTax => 0,
                CSVColumn::totalAmount => 369,
                CSVColumn::responseType => 'SUCCESS',
                CSVColumn::responseText => 'Approved',
                CSVColumn::authCode => '',
                CSVColumn::parentTxnId => '',
                CSVColumn::firstName => $user->first_name,
                CSVColumn::lastName => $user->last_name,
                CSVColumn::address1 => $billingAddress->steet_address,
                CSVColumn::address2 => '',
                CSVColumn::city => $billingAddress->city,
                CSVColumn::state => $billingAddress->state,
                CSVColumn::country => $billingAddress->country_iso,
                CSVColumn::postalCode => $billingAddress->zip_code,
                CSVColumn::phoneNumber => $billingAddress->phone_number,
                CSVColumn::homePhone => '',
                CSVColumn::cellPhone => '',
                CSVColumn::workPhone => '',
                CSVColumn::emailAddress => $user->email,
                CSVColumn::billShipSame => 1,
                CSVColumn::shipFirstName => '',
                CSVColumn::shipLastName => '',
                CSVColumn::shipAddress1 => '',
                CSVColumn::shipAddress2 => '',
                CSVColumn::shipCity => '',
                CSVColumn::shipState => '',
                CSVColumn::shipCountry => '',
                CSVColumn::shipPostalCode => '',
                CSVColumn::affId => '',
                CSVColumn::subAffId => '',
                CSVColumn::shipDate => '',
                CSVColumn::shipCarrier => '',
                CSVColumn::shipMethod => '',
                CSVColumn::trackingNumber => '',
                CSVColumn::isChargedback => '',
                CSVColumn::chargebackTotal => '',
                CSVColumn::chargebackDate => '',
                CSVColumn::chargebackResonCode => '',
                CSVColumn::externalToken => $referenceId,
                CSVColumn::quantity => '',
                CSVColumn::variantDetailId => '',
                CSVColumn::password => '',
                CSVColumn::companyName => '',
                CSVColumn::cancellationDate => '',
                CSVColumn::verifiedByNMI => $customer->verified_by_nmi ? 'TRUE' : 'FALSE'
            ];

            $row = array_values($row);

            fputcsv($file, $row);
        }

        fclose($file);

        $this->info("Exported to {$fileName}");

        exit;
    }
}
