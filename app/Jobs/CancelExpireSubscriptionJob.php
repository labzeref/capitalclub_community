<?php

namespace App\Jobs;

use App\Models\Subscription;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class CancelExpireSubscriptionJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct()
    {
    }

    public function handle(): void
    {
        Subscription::chunk(1000, function ($subscriptions) {
            foreach ($subscriptions as $subscription) {
                if ($subscription->current_term_end < now()) {
                    $subscription->update(['status' => 'cancelled']);
                    $user = $subscription->user;

                    if ($user?->subscribed) {
                        $user->update(['subscribed' => false]);
                    }
                }
            }
        });
    }
}
