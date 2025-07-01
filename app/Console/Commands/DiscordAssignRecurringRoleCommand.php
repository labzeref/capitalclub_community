<?php

namespace App\Console\Commands;

use App\Jobs\AssignStoredDiscordRolesJob;
use App\Models\User;
use Illuminate\Console\Command;

class DiscordAssignRecurringRoleCommand extends Command
{
    protected $signature = 'discord:assign-recurring-role';

    protected $description = 'Command description';

    public function handle(): void
    {
        $users = User::query()
            ->where('discord_integrated', true)
            ->where(function ($query) {
                $query->orWhere('life_time_membership', true)
                    ->orWhereHas('orders', fn($orders) => $orders->where('end_at', '>', now()))
                    ->orWhereHas('subscriptions', fn($subscriptions) => $subscriptions->where('status', 'active')->where('next_billing_at', '>', now()));
            })
            ->get();

        foreach ($users as $key => $user) {
            AssignStoredDiscordRolesJob::dispatch($user->id)->delay(now()->addSeconds($key * 5));
        }
    }
}
