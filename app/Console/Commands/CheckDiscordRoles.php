<?php

namespace App\Console\Commands;

use App\Models\User;
use App\Services\DiscordService;
use Illuminate\Console\Command;

class CheckDiscordRoles extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:check-discord-roles';

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
        $discord_id = $this->ask('Please enter the discord id');

        $user = User::where('discord_id',$discord_id)->first();

        if (!$user) {
            $this->error('User not found:');
            $email = $this->ask('Please enter the email');

            $user = User::where('email',$email)->first();


            $this->error('User does not found.');
            return;

        }

        $discordService = new DiscordService();
        $response = $discordService->getGuildMember(userDiscordId: $user->discord_id);

        $discordUser = $response->json();
        $roles = $discordUser['roles'] ?? [];

        dd($roles);

    }
}
