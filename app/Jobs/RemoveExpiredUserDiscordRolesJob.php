<?php

namespace App\Jobs;

use App\Models\User;
use App\Services\DiscordService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class RemoveExpiredUserDiscordRolesJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private DiscordService $discordService;

    public function __construct()
    {
        $this->discordService = new DiscordService();
    }

    public function handle(): void
    {
        $users = User::where(function ($q) {
            $q->whereDoesntHave('orders', function($query) {
                $query->where('end_at', '>', now());
            })
                ->whereDoesntHave('subscriptions', function($query) {
                    $query->where('status','active')->where('next_billing_at', '>', now());
                });
        })
            ->whereNotNull('discord_id')
            ->where('life_time_membership', false)
            ->get();


        foreach ($users as $index => $user) {
            if (!$user->discord_id) {
                continue;
            }

            $response = $this->discordService->getGuildMember(userDiscordId: $user->discord_id);

            $discordUser = $response->json();

            $roles = $discordUser['roles'] ?? [];

            if (count($roles) > 0) {
                dispatch(new RemoveDiscordRolesJob($user->id))->onQueue('discord')->delay(now()->addSeconds($index * 10));
            }
        }
    }
}
