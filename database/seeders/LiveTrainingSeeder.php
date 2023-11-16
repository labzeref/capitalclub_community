<?php

namespace Database\Seeders;

use App\Models\LiveSeries;
use Illuminate\Database\Seeder;

class LiveTrainingSeeder extends Seeder
{
    public function run(): void
    {
        LiveSeries::factory(18)->hasFaqs(1)->hasLiveStreams(1)->create();
    }
}
