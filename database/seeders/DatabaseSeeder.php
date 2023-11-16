<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Database\Seeders\Asset\CategorySeeder;
use Database\Seeders\Asset\CountrySeeder;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        //        $this->emptyStorageDirectory();

        $this->call([
            /**
             * Independent Asset Seeder
             */
            CountrySeeder::class,
            CategorySeeder::class,
            BadgeSeeder::class,
            instructorSeeder::class,

            /**
             * Depended Model Seeder
             */
            CourseSeeder::class,
            UserSeeder::class,
            PartnerProfileSeeder::class,
            LiveTrainingSeeder::class,
        ]);
    }

    private function emptyStorageDirectory(): void
    {
        $directory = public_path('/storage');

        if (File::isDirectory($directory)) {
            $files = File::allFiles($directory);
            $excludedFileName = '.gitignore';

            foreach ($files as $file) {
                if ($file->getFilename() !== $excludedFileName) {
                    File::delete($file->getPathname());
                }
            }

            $directories = File::directories($directory);

            foreach ($directories as $directory) {
                File::deleteDirectory($directory);
            }
        }
    }
}
