<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Marketplace\PartnerProfile;
use App\Models\Marketplace\PromoCode;

class CopyOldPromoCodes extends Command
{
    protected $signature = 'promo:copy-old-codes';
    protected $description = 'Old promo codes from partner profile have been successfully copied to the promo code table.';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        $partnerProfiles = PartnerProfile::whereNotNull('promo_code')->where('promo_code', '!=', '')->get();
        //dd($partnerProfiles);
        foreach ($partnerProfiles as $profile) {
                    PromoCode::create([
                        'title' => 'Promo code',
                        'description' => '',
                        'profile_id' => $profile->id,
                        'promo_code' => $profile->promo_code,
                    ]);
            }

        $this->info('Old promo codes from partner profile have been successfully copied to the promo code table.');
    }
}
