<?php

namespace App\Console\Commands;

use App\Jobs\UserPasswordMailJob;
use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Str;

class SendTestPassword extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:send-test-password';

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
        $user = User::where('email','akash@redoya.com')->first();
        UserPasswordMailJob::dispatch($user, Str::random())->onQueue('emails');
        $this->info('Test password sent successfully.');
    }
}
