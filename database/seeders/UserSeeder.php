<?php

namespace Database\Seeders;

use App\Models\Country;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate([
            'email' => 'student@system.com',
        ], [
            'country_iso' => Country::inRandomOrder()->value('iso'),
            'first_name' => 'System',
            'last_name' => 'Student',
            'email' => 'student@system.com',
            'about' => 'Testing user',
            'email_verified_at' => now(),
            'password' => Hash::make('zPtoKolhb91PDIH'), // password
            'remember_token' => Str::random(10),
            'subscribed' => true,
        ]);
    }
}
