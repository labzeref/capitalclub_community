<?php

namespace Database\Seeders;

use App\Jobs\AddSpatieMediaJob;
use App\Models\LiveStream\LiveStream;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LiveStreamSeeder2024 extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {


        $livestreams = collect([
            collect([
                'thumbnail' => public_path('/images/livestreams/townhall-may-25/thumbnail.jpg'),
                'banner' => public_path('/images/livestreams/townhall-may-25/banner.jpg'),
                'mobileBanner' => public_path('/images/livestreams/townhall-may-25/mobile.png'),

                'instructor_id' => 1,
                'category_id' => 1,
                'title' => 'TOWNHALL',
                'description' => 'Capital Club',
                'embed_url' => 'required|numeric',
                'live_at' => Carbon::parse('2024-05-25 11:00:00'),
                'disabled'=>true,
                'time_zone' => 'EST',
                'published_at' => now(),
            ]),
            collect([
                'thumbnail' => public_path('/images/livestreams/steve-may-29/thumbnail.jpg'),
                'banner' => public_path('/images/livestreams/steve-may-29/banner.jpg'),
                'mobileBanner' => public_path('/images/livestreams/steve-may-29/mobile.png'),

                'instructor_id' => 1,
                'category_id' => 1,
                'title' => 'STEVE',
                'description' => 'Capital Club',
                'embed_url' => 'required|numeric',
                'live_at' => Carbon::parse('2024-05-29 11:00:00'),
                'disabled'=>true,
                'time_zone' => 'EST',
                'published_at' => now(),
            ]),
            collect([
                'thumbnail' => public_path('/images/livestreams/phillip-june-7/thumbnail.png'),
                'banner' => public_path('/images/livestreams/phillip-june-7/banner.png'),
                'mobileBanner' => public_path('/images/livestreams/phillip-june-7/mobile.png'),

                'instructor_id' => 1,
                'category_id' => 1,
                'title' => 'PHILIPP S.',
                'description' => 'Capital Club',
                'embed_url' => 'required|numeric',
                'live_at' => Carbon::parse('2024-06-07 11:00:00'),
                'disabled'=>true,
                'time_zone' => 'EST',
                'published_at' => now(),
            ]),
            collect([
                'thumbnail' => public_path('/images/livestreams/joshua-june-10/thumbnail.png'),
                'banner' => public_path('/images/livestreams/joshua-june-10/banner.png'),
                'mobileBanner' => public_path('/images/livestreams/joshua-june-10/mobile.png'),

                'instructor_id' => 1,
                'category_id' => 1,
                'title' => 'JOSHUA CHIN',
                'description' => 'Capital Club',
                'embed_url' => 'required|numeric',
                'live_at' => Carbon::parse('2024-06-10 11:00:00'),
                'disabled'=>true,
                'time_zone' => 'EST',
                'published_at' => now(),
            ]),
            collect([
                'thumbnail' => public_path('/images/livestreams/anthony-june-11/thumbnail.png'),
                'banner' => public_path('/images/livestreams/anthony-june-11/banner.png'),
                'mobileBanner' => public_path('/images/livestreams/anthony-june-11/mobile.png'),

                'instructor_id' => 1,
                'category_id' => 1,
                'title' => 'ANTHONY ECLIPSE',
                'description' => 'Capital Club',
                'embed_url' => 'required|numeric',
                'live_at' => Carbon::parse('2024-06-11 11:00:00'),
                'disabled'=>true,
                'time_zone' => 'EST',
                'published_at' => now(),
            ]),
//            collect([
//                'thumbnail' => public_path('/images/livestreams/townhall-june-22/thumbnail.jpg'),
//                'banner' => public_path('/images/livestreams/townhall-june-22/banner.jpg'),
//                'mobileBanner' => public_path('/images/livestreams/townhall-june-22/mobile.png'),
//
//                'instructor_id' => 1,
//                'category_id' => 1,
//                'title' => 'TOWNHALL',
//                'description' => 'Capital Club',
//                'embed_url' => 'required|numeric',
//                'live_at' => Carbon::parse('2024-06-22 11:00:00'),
//                'disabled'=>true,
//                'time_zone' => 'EST',
//                'published_at' => now(),
//            ]),

        ]);

        foreach ($livestreams as $livestream) {

            $stream = LiveStream::create($livestream->except(['thumbnail', 'banner', 'mobileBanner'])->toArray());

            AddSpatieMediaJob::dispatch(
                $livestream['thumbnail'],
                $stream,
                'thumbnail',
                'path'
            );

            AddSpatieMediaJob::dispatch(
                $livestream['banner'],
                $stream,
                'banner',
                'path'
            );

            AddSpatieMediaJob::dispatch(
                $livestream['mobileBanner'],
                $stream,
                'mobileBanner',
                'path'
            );

        }


    }
}
