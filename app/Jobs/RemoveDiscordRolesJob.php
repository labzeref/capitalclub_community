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

class RemoveDiscordRolesJob implements ShouldQueue
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
     * Revoking all the discord rolls and store it for the next time
     * that will be assigned when he again subscribes
     *
     * @throws ThrowableAlias
     */
    public function handle(): void
    {
        $user = User::find($this->userId);

        if ($user->orders()->where('end_at','>',now())->count() > 0 || $user->life_time_membership || $user->hasActiveChargebeeSubscription()){
            return;
        }

        if (!$user->discord_id) {
            return;
        }

        DB::beginTransaction();

        try {
            $response = $this->discordService->getGuildMember(userDiscordId: $user->discord_id);

            $discordUser = $response->json();

            $roles = $discordUser['roles'] ?? [];

            if (count($roles) === 0) {
                DB::rollBack();
                return;
            }

            $user->update([
                'discord_roles' => $roles,
            ]);

            $user->update(['discord_roles' => $roles]);

            foreach ($roles as $role) {
                $response = $this->discordService->removeGuildMemberRole(userDiscordId: $user->discord_id, roleId: $role);
            }

//            dispatch(new AssignDiscordRolesJob($user->id, [config('discord.guestRoleId')]))->onQueue('discord');

        } catch (ThrowableAlias $throwable) {
            DB::rollBack();
            throw $throwable;
        }

        DB::commit();
    }
}
