<?php

namespace App\Http\Controllers;

use App\Jobs\ActiveCampaign\RemoveTagFromActiveCampaignContactJob;
use App\Jobs\AssignStoredDiscordRolesJob;
use App\Jobs\RemoveDiscordRolesJob;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Log;

class WebhookController extends Controller
{
    /**
     * This invokes when ever a webhook called and handle the response
     * on the base of webhook event
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function __invoke(Request $request)
    {

        Log::channel('webhook')->info($request->header('php-auth-user'));
        Log::channel('webhook')->info($request->header('php-auth-pw'));
        Log::channel('webhook')->info($request->all());
        Log::channel('webhook')->info('-----------------------------------------------------------------------');

        if($request->header('php-auth-user') == config('chargbee.webhook_username') &&
            $request->header('php-auth-pw') == config('chargbee.webhook_password')){

            $payload = $request->input('content');

            switch ($request->event_type) {
                case 'customer_created':
                    $this->customerCreated((array) $payload);
                    break;
                case 'customer_deleted':
                    $this->customerDeleted((array) $payload);
                    break;
                case 'subscription_created':
                    $this->subscriptionCreated((array) $payload);
                    break;
                case 'subscription_cancelled':
                    $this->subscriptionCancelled((array) $payload);
                    break;
                case 'subscription_renewed':
                    $this->subscriptionRenewed((array) $payload);
                    break;
                default:
            }
        }else{
            return response()->json([],401);
        }
    }

    public function customerCreated(array $payload)
    {
        $user = User::where('charge_bee_id', $payload['customer']['id'])->first();
        $user?->update(['verified_by_webhook' => true]);
    }

    public function customerDeleted(array $payload)
    {
//        $user = User::where('charge_bee_id', $payload['customer']['id'])->first();
//
//        foreach ($payload['subscriptions'] as $chargeBeeSubscription) {
//            $subscription = $user?->subscriptions()->where('charge_bee_id', $chargeBeeSubscription['id'])->first();
//            $subscription?->update(['status', 'deleted']);
//        }
//
//        $user?->update(['charge_bee_id' => null]);
    }

    private function subscriptionCreated(array $payload)
    {
        $user = User::where('charge_bee_id', $payload['customer']['id'])->first();
        $subscription = $user?->subscriptions()->latest('id')->where('charge_bee_id', $payload['subscription']['id'])->first();
        $subscription?->update(['verified_by_webhook' => true]);

        AssignStoredDiscordRolesJob::dispatch(userId: $user->id);
    }

    private function subscriptionCancelled(array $payload)
    {
        $user = User::where('charge_bee_id', $payload['customer']['id'])->first();
        $user?->update(['subscribed' => false]);
        $subscription = $user?->subscriptions()->latest('id')->where('charge_bee_id', $payload['subscription']['id'])->first();

        $subscription?->update(['status' => $payload['subscription']['status']]);

        RemoveDiscordRolesJob::dispatch(userId: $user->id);
        RemoveTagFromActiveCampaignContactJob::dispatch(userId: $user->id);
    }

    private function subscriptionRenewed(array $payload)
    {
        $user = User::where('charge_bee_id', $payload['customer']['id'])->first();
        $user?->update(['subscribed' => true]);
        $subscription = $user?->subscriptions()->latest('id')->where('charge_bee_id', $payload['subscription']['id'])->first();

        $subscription?->update([
            'current_term_start' => $this->formatTimestamp($payload['subscription']['current_term_start']),
            'current_term_end' => $this->formatTimestamp($payload['subscription']['current_term_end']),
            'next_billing_at' => $this->formatTimestamp($payload['subscription']['next_billing_at']),
            'started_at' => $this->formatTimestamp($payload['subscription']['started_at']),
            'activated_at' => $this->formatTimestamp($payload['subscription']['activated_at']),
            'status' => $payload['subscription']['status'],
        ]);

        AssignStoredDiscordRolesJob::dispatch(userId: $user->id);
    }

    /**
     * This function format the timestamps
     *
     * @return string
     */
    private function formatTimestamp(int $timestamp)
    {
        return Carbon::createFromTimestamp($timestamp)->format('Y-m-d H:i:s');
    }
}
