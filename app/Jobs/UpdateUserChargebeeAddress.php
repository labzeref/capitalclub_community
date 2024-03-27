<?php

namespace App\Jobs;

use App\Services\ChargeBeeService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class UpdateUserChargebeeAddress implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $user;

    /**
     * Create a new job instance.
     */

    public function __construct($user){
        $this->user = $user;
    }


    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $chargeBeeService = new ChargeBeeService();
        try {
            $chargeBeeService->updateCustomerBilling($this->user);
        } catch (\Exception $e) {
            Log::error('=======================================');
            Log::error('Error: ' . $e->getMessage());
            Log::error('Error updating address on charge_bee: ' . $this->user->email);
            Log::error('=======================================');
        }
    }
}
