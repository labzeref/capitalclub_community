<?php

namespace App\Jobs;

use App\Models\User;
use App\Services\DiscordService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\DB;
use Throwable as ThrowableAlias;

class AssignStoredDiscordRolesJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private DiscordService $discordService;

    /**
     * Create the discord service object where all discord methods exists
     */
    public function __construct(private readonly int $userId)
    {
        $this->discordService = new DiscordService();
    }

    /**
     * Assign all the rolls of discord to the user that stores in database against that user
     *
     * @throws ThrowableAlias
     */
    public function handle(): void
    {
        $user = User::find($this->userId);

        if (!$user) {
            return;
        }

        if (!$user->discord_integrated) {
            return;
        }

//        if (! $user->discord_roles) {
//            return;
//        }

        DB::beginTransaction();

        try {
            $roles = $user->discord_roles ?? [];

            if ($user->orders()->where('end_at', '>', now())->count() > 0 || $user->life_time_membership || $user->hasActiveChargebeeSubscription()) {
                if ($user->subscriptions()->count() > 0 && $user->orders()->count() >= 2) {
                    if (!in_array(config('discord.recurringRoleId'), $roles)) {
                        $roles[] = config('discord.recurringRoleId');
                    }
                }

                if (!in_array(config('discord.defaultRoleId'), $roles)) {
                    $roles[] = config('discord.defaultRoleId');
                }

                foreach ($roles as $role) {
                    $this->discordService->addGuildMemberRole(userDiscordId: $user->discord_id, roleId: $role);
                }
            }
        } catch (ThrowableAlias $throwable) {
            DB::rollBack();

            throw $throwable;
        }

        DB::commit();
    }
}
