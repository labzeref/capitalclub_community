<?php

namespace Database\Factories;

use App\Models\Course;
use App\Models\Trailer;
use Illuminate\Database\Eloquent\Factories\Factory;

class TrailerFactory extends Factory
{
    public function definition(): array
    {
        return [
            'course_id' => Course::factory(),
            'title' => $this->faker->jobTitle,
            'vimeo_url' => $this->faker->randomElement([
                'https://player.vimeo.com/video/95871796',
                'https://player.vimeo.com/video/800523792',
                'https://player.vimeo.com/video/383566731',
                'https://player.vimeo.com/video/383566560',
                'https://player.vimeo.com/video/289846364',
                'https://player.vimeo.com/video/307230347',
                'https://player.vimeo.com/video/329780278',
                'https://player.vimeo.com/video/337768519',
                'https://player.vimeo.com/video/208840307',
                'https://player.vimeo.com/video/182807556',
                'https://player.vimeo.com/video/177397203',
                'https://player.vimeo.com/video/107505406',
                'https://player.vimeo.com/video/336108899',
            ]),
        ];
    }

    public function configure(): TrailerFactory
    {
        return $this->afterCreating(function (Trailer $trailer) {
            $trailer->addDummyMedia(public_path('/assets/img/lesson'), 'thumbnail');
        });
    }
}
