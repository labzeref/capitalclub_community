<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Database\Seeders\Course2024Seeder;
use Database\Seeders\Asset\CountrySeeder;
use Database\Seeders\Asset\CategorySeeder;
use Database\Seeders\LessonUpdate2024Seeder;
use Database\Seeders\ComingSoon;
use Database\Seeders\Course2023updater;
use Database\Seeders\Marketplace\PartnerProfileSeeder;
use Database\Seeders\Marketplace\MarketPlaceCategorySeeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {

        $update_table_indexes = [
            'market_place_categories',
            'courses',
            'lessons',
            'media',
            'partner_profiles',
            'partner_profile_banners',
            'instructors',
            'live_streams'
        ];

        foreach ($update_table_indexes as $table) {
            DB::statement("SELECT setval('".$table."_id_seq', COALESCE((SELECT MAX(id)+1 FROM ".$table."), 1), false)");
        }

        $this->call([
            /**
             * Independent Asset Seeder
             */
//             IndustrySeeder::class,
            //                        VideoAssetSeeder::class,
//             CountrySeeder::class,
//             CategorySeeder::class,
            //            BadgeSeeder::class,
            //            instructorSeeder::class,

            /**
             * Depended Model Seeder
             */
//             AvatarSeeder::class,
//             UserSeeder::class,
//
//             CourseSeeder::class,
//             PremiumUserSeeder::class,


//            MarketPlaceCategorySeeder::class,
//            PartnerProfileSeeder::class,
//            Course2024Seeder::class,
//            LessonUpdate2024Seeder::class,
//            ComingSoon::class,
//            Course2023updater::class,
            LiveStreamSeeder2024::class



        ]);

        $update_table_indexes = [
            'market_place_categories',
            'courses',
            'lessons',
            'media',
            'partner_profiles',
            'partner_profile_banners',
            'instructors',
            'live_streams'
        ];

        foreach ($update_table_indexes as $table) {
            DB::statement("SELECT setval('".$table."_id_seq', COALESCE((SELECT MAX(id)+1 FROM ".$table."), 1), false)");
        }

    }
}
