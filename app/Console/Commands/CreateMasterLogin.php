<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class CreateMasterLogin extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'CreateMasterLogin';

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
        $email = $this->ask('email');
        $signature = encrypt($email.'++=='.now()->addMinute());

        if ($this->confirm('Production?')) {

            $this->info('https://members.capital.club/master-login/'.$signature);

        } else {

            $this->info(route('master.login', ['signature' => $signature]));
        }

    }
}
