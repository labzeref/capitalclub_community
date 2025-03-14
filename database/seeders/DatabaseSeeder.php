<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Database\Seeders\Asset\CategorySeeder;
use Database\Seeders\Asset\CountrySeeder;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            /**
             * Independent Asset Seeder
             */
            IndustrySeeder::class,
//                        VideoAssetSeeder::class,
            CountrySeeder::class,
            CategorySeeder::class,
//            BadgeSeeder::class,
            //            instructorSeeder::class,

            /**
             * Depended Model Seeder
             */
            AvatarSeeder::class,
            UserSeeder::class,
            //            LiveTrainingSeeder::class,
            CourseSeeder::class,
            // PremiumUserSeeder::class,
            // InvitationSeeder::class,
        ]);
    }
}
