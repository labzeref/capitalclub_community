<?php

namespace App\Console\Commands;

use App\Jobs\AssignStoredDiscordRolesJob;
use App\Jobs\RemoveDiscordRolesJob;
use App\Models\User;
use Illuminate\Console\Command;

class DiscordDisconnectCommand extends Command
{
    protected $signature = 'discord:disconnect';

    protected $description = 'Disconnect the discord for the user against id';

    public function handle(): void
    {
        $userId = $this->ask('Please enter the user id');

        $user = User::find($userId);

        if ($user) {
            $this->info('User founded successfully.');
        } else {
            $this->error('User does not found.');

            return;
        }

        if ($user->discord_integrated) {
            $this->info('User has discord integrated.');
        } else {
            $this->error('User does not has integrated discord.');

            return;
        }

        RemoveDiscordRolesJob::dispatchSync(userId: $userId);

        $this->info('Discord roles revoked successfully.');

        $wantToAddAgain = $this->ask('Did you want to add again ? (y/n)');

        while (! in_array($wantToAddAgain, ['y', 'n'])) {
            $wantToAddAgain = $this->ask('Did you want to add again ? (y/n)');
        }

        if ($wantToAddAgain == 'y') {
            AssignStoredDiscordRolesJob::dispatchSync(userId: $userId);

            $this->info('Add again successfully.');
        }
    }
}
