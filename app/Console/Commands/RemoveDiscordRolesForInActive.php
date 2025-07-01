<?php

namespace App\Console\Commands;

use App\Jobs\RemoveExpiredUserDiscordRolesJob;
use Illuminate\Console\Command;

class RemoveDiscordRolesForInActive extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:remove-discord-roles-for-in-active';

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
        dispatch_sync(new RemoveExpiredUserDiscordRolesJob());
    }
}
