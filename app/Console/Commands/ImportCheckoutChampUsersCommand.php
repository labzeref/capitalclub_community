<?php

namespace App\Console\Commands;

use App\Jobs\CbToCocMigration\ImportStripeCustomersJob;
use App\Models\CbToCocMigrationStripeNonOrderCustomer;
use App\Models\ChargeBeeCustomer;
use App\Models\CheckoutChampUserCard;
use App\Models\CbToCocMigrationStripeMissingCustomer;
use App\Models\CbToCocMigrationStripeSuccessfulCustomer;
use App\Models\User;
use App\Services\CheckoutChampService;
use Illuminate\Console\Command;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ImportCheckoutChampUsersCommand extends Command
{
    protected $signature = 'import:checkout-champ-users';

    protected $description = 'This command will import users from checkout champ and store in database';

    public function handle(CheckoutChampService $service): void
    {

        $users = User::where("charge_bee_id", "!=", null)->orderBy('id')->get();

        foreach ($users as $user) {
            if ($user->subscriptions()->count() > 0) {
                ImportStripeCustomersJob::dispatch($user);
            }
        }
    }
}
