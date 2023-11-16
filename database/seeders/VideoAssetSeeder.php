<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

class VideoAssetSeeder extends Seeder
{
    public function run(): void
    {
        $disk = Storage::disk('s3');
        $s3Directory = 'capitalclub_videos';

        $disk->putFileAs($s3Directory, storage_path('/videos/glitch.mp4'), 'glitch.mp4');

        $disk->putFileAs($s3Directory, storage_path('/videos/welcome.mp4'), 'welcome.mp4');

        $disk->putFileAs($s3Directory, storage_path('/videos/sales.mp4'), 'sales.mp4');

    }
}
