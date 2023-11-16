<?php

namespace App\Console\Commands;

use App\Models\User;
use App\Services\ChargeBeeService;
use Illuminate\Console\Command;
use Illuminate\Support\Carbon;

class AttachChargeBeeSubscription extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'AttachChargeBeeSubscription';

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
        $email = $this->ask('user email');
        $user = User::where('email', $email)->first();
        if (!$user){
            $this->error('user does not exist');
            return;
        }

        $chargeebee_subscription_id = $this->ask('Chargebee Subscription ID');
        $chargeebee_invoice_id = $this->ask('Chargebee Invoice ID');

        $subscription = $user->subscriptions()->latest('id')->where('charge_bee_id', $chargeebee_subscription_id)->first();
        if ($subscription){
            $this->error('user already attached');
            return;
        }

        if($user->subscribed){
            $this->error('user already Subscribed');
        }

        $chargbee_service = new ChargeBeeService;
        $subscription_object = $chargbee_service->getSubscription($chargeebee_subscription_id);
        $invoice = $chargbee_service->getInvoice($chargeebee_invoice_id);

        if (!$subscription_object){
            $this->error('Subscription does not exist');
            return;
        }
        if (!$invoice){
            $this->error('Chargebee Invoice does not exist');
            return;
        }

        $customer = $subscription_object->customer();
        $invoice = $invoice->invoice();

        if ($customer->email != $user->email && $customer->id != $user->chargebee_customer_id){
            $this->error('User Does not have same email or customer id');
            return;
        }

        if ($invoice->subscriptionId != $chargeebee_subscription_id){
            $this->error('This invoice does nto belong to subscription');
        }
        if ($invoice->customerId != $customer->id){
            $this->error('This invoice does nto belong to customer');
        }

        $subscription = $subscription_object->subscription();
        $card = $subscription_object->card();

        if ($subscription->cancelledAt){

            $this->error('Subscription expired');
            return;
        }

        $amount = 0;

        foreach ($subscription->subscriptionItems as $chargeBeeSubscriptionItem) {
            $amount += $chargeBeeSubscriptionItem->unitPrice;
        }

        $user_subscription = $user->subscriptions()->create([
            'item_price_id' => $subscription->subscriptionItems[0]->itemPriceId,
            'charge_bee_id' => $subscription->id,
            'period_unit' => $subscription->billingPeriodUnit,
            'current_term_start' => $this->formatTimestamp($subscription->currentTermStart),
            'current_term_end' => $this->formatTimestamp($subscription->currentTermEnd),
            'next_billing_at' => $this->formatTimestamp($subscription->nextBillingAt),
            'started_at' => $this->formatTimestamp($subscription->startedAt),
            'activated_at' => $this->formatTimestamp($subscription->activatedAt),
            'currency_code' => $subscription->currencyCode,
            'amount' => $amount,
            'last4' => $card->last4,
            'brand' => $card->cardType,
            'masked_number' => $card->maskedNumber,
            'status' => $subscription->status,
        ]);

        $user->invoices()->create([
            'subscription_id' => $user_subscription->id,
            'charge_bee_id' => $invoice->id,
            'currency_code' => $invoice->currencyCode,
            'amount_paid' => $invoice->amountPaid / 100,
            'total' => $invoice->total / 100,
            'paid_at' => $this->formatTimestamp($invoice->paidAt),
            'date' => $this->formatTimestamp($invoice->date),
            'status' => $invoice->status,
        ]);

        $updateData = ['subscribed' => true];

        if (config('app.check_invitation')) {
            $updateData['invitation_code'] = session('invitation_code');
        }

        $user->update($updateData);


        $this->info('Subscription attached successfully');
    }

    private function formatTimestamp(int $timestamp)
    {
        return Carbon::createFromTimestamp($timestamp)->format('Y-m-d H:i:s');
    }
}
