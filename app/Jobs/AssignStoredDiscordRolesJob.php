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

        if (! $user) {
            return;
        }

        if (! $user->discord_integrated) {
            return;
        }

        if (! $user->discord_roles) {
            return;
        }

        DB::beginTransaction();

        try {
            foreach ($user->discord_roles as $role) {
                $this->discordService->addGuildMemberRole(userDiscordId: $user->discord_id, roleId: $role);
            }
        } catch (ThrowableAlias $throwable) {
            DB::rollBack();

            throw $throwable;
        }

        DB::commit();
    }
}
