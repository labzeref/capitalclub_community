<?php

namespace App\Console\Commands;

use App\Jobs\UpdateUserChargebeeAddress;
use App\Models\User;
use App\Services\ChargeBeeService;
use Illuminate\Console\Command;

class UpdateUsersChargeBeeAddress extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:update-users-charge-bee-address';

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
        $users = User::where('email','andres11avellab@gmail.com')->orderBy('id')->get();




        foreach ($users as $key=>$user){
            $this->info('Updating user: ' . $user->id);


            $chargebee = new ChargeBeeService();
            $customer = $chargebee->updateCustomerBilling($user);

            dd($chargebee->getCustomer($user), $customer);

            try {
                $delayInSeconds = ($key * (60 / 470));
                dispatch(new UpdateUserChargebeeAddress($user))->delay($delayInSeconds);

            }catch (\Exception $e){
                $this->error('Error: ' . $e->getMessage());
                break;
            }

        }

    }
}
