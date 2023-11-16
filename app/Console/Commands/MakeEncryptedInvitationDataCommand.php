<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Str;

class MakeEncryptedInvitationDataCommand extends Command
{
    protected $signature = 'make:encrypted-invitation-data';

    protected $description = 'This command will create encrypted invitation data for testing which will came from lander.';

    public function handle(): void
    {
        $email  = $this->ask("Please enter email");
        $email = Str::lower($email);
        $invitationCode = $this->ask("Please enter invitation code.");
        $expiry = $this->ask("Please enter expiry, it will be carbon parse.");

        $data = "$email===__$invitationCode===__$expiry";

        $this->info(route('unlock-site', encrypt($data)));
    }
}
