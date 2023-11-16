<?php

namespace Database\Seeders;

use App\Models\PartnerProfile;
use Illuminate\Database\Seeder;

class PartnerProfileSeeder extends Seeder
{
    public function run(): void
    {
        PartnerProfile::factory(10)->create();
    }
}
