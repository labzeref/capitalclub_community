<?php

namespace App\Console\Commands;

use App\Jobs\RemoveDiscordRolesJob;
use App\Jobs\RemoveExpiredUserDiscordRolesJob;
use App\Models\User;
use App\Services\DiscordService;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redis;

class TestDB extends Command
{
    protected $signature = 'db:test';

    protected $description = 'Command description';

    public function handle(): void
    {
        $discord_id = $this->ask('discord_id');

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

        $this->output->progressStart($users->count());
        foreach ($users as $user) {
            if ($user->discord_id === $discord_id) {
                $discordService = new DiscordService;
                $response = $discordService->getGuildMember(userDiscordId: $user->discord_id);
                $discordUser = $response->json();
                $roles = $discordUser['roles'] ?? [];
                if (count($roles) > 0) {
                    dd($roles);
                }else{
                    dd('No roles found', [
                        'request'=>$discordUser,
                        'headers'=>$response->headers(),
                    ]);
                }
            }
            $this->output->progressAdvance();
        }

//

//
//        $user = $this->ask('email');
//        $user = User::where('email', $user)->first();
//        if ($user) {
//
//            $response = $discordService->getGuildMember(userDiscordId: $user->discord_id);
//            $discordUser = $response->json();
//
//            $roles = $discordUser['roles'] ?? [];
//            dd([
//                'roles' => $roles,
//            ]);
//
//        } else {
//            $this->error('User not found');
//
//            $user = $this->ask('discord_id');
//            $user = User::where('discord_id', $user)->first();
//
//            if ($user) {
//
//                $response = $discordService->getGuildMember(userDiscordId: $user->discord_id);
//                $discordUser = $response->json();
//
//                dd($discordUser);
//
//                $roles = $discordUser['roles'] ?? [];
//                dd([
//                    'roles' => $roles,
//                ]);
//            }else{
//                $this->error('User not found');
//            }
//        }
//
//        try {
//            DB::connection('pgsql::read')->getPdo();
//        } catch (\Throwable $throwable) {
//            $readingDB = false;
//        }
//
//        if ($readingDB) {
//            $this->info('Reading DB working.');
//        } else {
//            $this->error('Reading DB is not working');
//        }
//
//        $writingDB = true;
//
//        try {
//            DB::connection('pgsql::write')->getPdo();
//        } catch (\Throwable $throwable) {
//            $writingDB = false;
//        }
//
//        if ($writingDB) {
//            $this->info('Writing DB working.');
//        } else {
//            $this->error('Writing DB is not working');
//        }
    }
}
