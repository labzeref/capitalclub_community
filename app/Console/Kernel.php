<?php

namespace App\Console;

use App\Jobs\CancelExpireSubscriptionJob;
use App\Jobs\RemoveExpiredUserDiscordRolesJob;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     */
    protected function schedule(Schedule $schedule): void
    {
        $schedule->job(new CancelExpireSubscriptionJob())->dailyAt('00:10');
        $schedule->job(new RemoveExpiredUserDiscordRolesJob())->dailyAt('00:10');
    }

    /**
     * Register the commands for the application.
     */
    protected function commands(): void
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
