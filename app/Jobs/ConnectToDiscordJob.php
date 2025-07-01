<?php

namespace App\Jobs;

use App\Jobs\ActiveCampaign\UpdateDiscordIdActiveCampaignContactJob;
use App\Models\User;
use App\Services\DiscordService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ConnectToDiscordJob implements ShouldQueue
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
     * Getting the user discord access token the adding him to server and assign a default role
     */
    public function handle(): void
    {
        $user = User::find($this->userId);

        if (! $user) {
            return;
        }
        if ($user->discord_integrated) {
            return;
        }

        DB::beginTransaction();

        try {

            $response = $this->discordService->exchangeToken(code: $user->discord_code);

            if (! in_array($response->status(), [200, 204, 201])) {
                Log::channel('discord')->info('While exchanging token');
                Log::channel('discord')->info($user->email);
                Log::channel('discord')->info('headers', $response->headers());
                Log::channel('discord')->info($response->status());
                Log::channel('discord')->info($response->body());
                Log::channel('discord')->info('--------------------------------------------------------------');

                return;
            }

            $tokenData = $response->json();

            $user->update([
                'discord_access_token' => $tokenData['access_token'],
                'discord_refresh_token' => $tokenData['refresh_token'],
                'discord_access_token_expiry' => now()->addSeconds($tokenData['expires_in']),
                'discord_scope' => $tokenData['scope'],
            ]);

            $response = $this->discordService->getUser(accessToken: $user->getDiscordAccessToken());

            if (! in_array($response->status(), [200, 204, 201])) {
                Log::channel('discord')->info('While getting user');
                Log::channel('discord')->info($user->email);
                Log::channel('discord')->info($response->status());
                Log::channel('discord')->info($response->body());
                Log::channel('discord')->info('--------------------------------------------------------------');

                return;
            }

            $userData = $response->json();

            $user->update([
                'discord_id' => $userData['id'],
                'discord_username' => $userData['username'],
                'discord_display_name' => $userData['global_name'],
                'discord_email' => $userData['email'],
                'discord_avatar' => $userData['avatar'],
                'discord_integrated' => true,
            ]);

            $response = $this->discordService->addGuildMemberWithDefaultRole(
                userDiscordId: $user->discord_id,
                accessToken: $user->getDiscordAccessToken()
            );

            if (! in_array($response->status(), [200, 204, 201])) {
                Log::channel('discord')->info('While adding to server with role');
                Log::channel('discord')->info($user->email);
                Log::channel('discord')->info($response->status());
                Log::channel('discord')->info($response->body());
                Log::channel('discord')->info('--------------------------------------------------------------');

                return;
            }

            $response = $this->discordService->addGuildMemberRole(
                userDiscordId: $user->discord_id,
                roleId: config('discord.defaultRoleId'),
            );

            if (! in_array($response->status(), [200, 204, 201])) {
                Log::channel('discord')->info('adding default role to server');
                Log::channel('discord')->info($user->email);
                Log::channel('discord')->info($response->status());
                Log::channel('discord')->info($response->body());
                Log::channel('discord')->info('--------------------------------------------------------------');

                return;
            }

            $response = $this->discordService->updateUsername(
                userDiscordId: $user->discord_id,
                username: $user->getDiscordFormatNameId()
            );

            if (! in_array($response->status(), [200, 204, 201])) {
                Log::channel('discord')->info('While updating nick name');
                Log::channel('discord')->info($user->email);
                Log::channel('discord')->info($response->status());
                Log::channel('discord')->info($response->body());
                Log::channel('discord')->info('--------------------------------------------------------------');
            }

            try {
                $response = $this->discordService->removeGuildMemberRole(
                    userDiscordId: $user->discord_id,
                    roleId: config('discord.guestRoleId')
                );
                if (! in_array($response->status(), [204, 201])) {
                    Log::channel('discord')->info('While removing guest role');
                    Log::channel('discord')->info($user->email);
                    Log::channel('discord')->info($response->status());
                    Log::channel('discord')->info($response->body());
                    Log::channel('discord')->info('--------------------------------------------------------------');

                }

            } catch (\Throwable $throwable) {

                Log::channel('discord')->info('Removing guest roles exception');
                Log::channel('discord')->info($throwable->getMessage());
                Log::channel('discord')->info('--------------------------------------------------------------');
            }

//            UpdateDiscordIdActiveCampaignContactJob::dispatch(userId: $user->id);
        } catch (\Throwable $throwable) {

            Log::channel('discord')->info('overall roles exception');
            Log::channel('discord')->info($throwable->getMessage());
            Log::channel('discord')->info('--------------------------------------------------------------');

            DB::rollBack();
        }

        DB::commit();

    }
}
