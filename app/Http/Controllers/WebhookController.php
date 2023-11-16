<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class WebhookController extends Controller
{
    public function __invoke(Request $request)
    {
        Log::channel('webhook')->info($request->all());

        $payload = $request->input('content');

        switch ($request->event_type) {
            case 'customer_created':
                $this->customerCreated((array)$payload);
                break;
            case 'customer_deleted':
                $this->customerDeleted((array)$payload);
                break;
            case 'subscription_created':
                $this->subscriptionCreated((array)$payload);
                break;
            case 'subscription_cancelled':
                $this->subscriptionCancelled((array)$payload);
                break;
            case 'subscription_renewed':
                $this->subscriptionRenewed((array)$payload);
                break;
            case 'subscription_renewal_reminder':
                $this->subscriptionRenewalReminder((array)$payload);
                break;
            default:
        }
    }

    public function customerCreated(array $payload)
    {
        $user = User::where('charge_bee_id', $payload['customer']['id'])->first();
        $user?->update(['verified_by_webhook' => true]);
    }

    public function customerDeleted(array $payload)
    {
        $user = User::where('charge_bee_id', $payload['customer']['id'])->first();
        $user?->update(['charge_bee_id' => null]);
    }

    private function subscriptionCreated(array $payload)
    {
        $user = User::where('charge_bee_id', $payload['customer']['id'])->first();
        $subscription = $user?->subscriptions()->where('charge_bee_id', $payload['subscription']['id'])->first();
        $subscription?->update(['verified_by_webhook' => true]);
    }

    private function subscriptionCancelled(array $payload)
    {
        $user = User::where('charge_bee_id', $payload['customer']['id'])->first();
        $subscription = $user?->subscriptions()->where('charge_bee_id', $payload['subscription']['id'])->first();

        $subscription?->update(['status' => $payload['subscription']['status']]);
    }

    private function subscriptionRenewed(array $payload)
    {
        $user = User::where('charge_bee_id', $payload['customer']['id'])->first();
        $subscription = $user?->subscriptions()->where('charge_bee_id', $payload['subscription']['id'])->first();

        $subscription?->update([
            'status' => $payload['subscription']['status']
        ]);
    }

    private function subscriptionRenewalReminder(array $payload)
    {
        $user = User::where('charge_bee_id', $payload['customer']['id'])->first();
        $subscription = $user?->subscriptions()->where('charge_bee_id', $payload['subscription']['id'])->first();

        $subscription?->update([
            'status' => $payload['subscription']['status']
        ]);
    }
}
