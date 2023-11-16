<?php

namespace Database\Seeders;

use App\Models\PremiumUser;
use Illuminate\Database\Seeder;

class PremiumUserSeeder extends Seeder
{
    public function run(): void
    {
        $usersData = [
            [
                'glitch_id' => 2,
                'email' => 'abdulhaseeb@ownitize.com',
                'promo_code' => 'PRO#123'
            ],
            [
                'glitch_id' => 3,
                'email' => 'mahtab@ownitize.com',
                'promo_code' => 'PRO#123'
            ],
            [
                'glitch_id' => 4,
                'email' => 'arsalan@ownitize.com',
                'promo_code' => 'PRO#123'
            ],
            [
                'glitch_id' => 5,
                'email' => 'muaaz@ownitize.com',
                'promo_code' => 'PRO#123'
            ],
        ];

        foreach ($usersData as $data) {
            PremiumUser::updateOrCreate(['email' => $data['email']], $data);
        }
    }
}
