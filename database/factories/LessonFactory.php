<?php

namespace Database\Factories;

use App\Models\Course;
use App\Models\Lesson;
use Illuminate\Database\Eloquent\Factories\Factory;

class LessonFactory extends Factory
{
    protected $model = Lesson::class;

    public function definition(): array
    {
        return [
            'course_id' => Course::factory(),
            'title' => $this->faker->jobTitle,
            'description' => $this->faker->text(450),
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
            'duration' => null,
            'published_at' => now()->subDays(mt_rand(5, 10)),
            'has_preview' => $this->faker->boolean(),
            'vimeo_preview_url' => fn (array $attributes) => $attributes['has_preview']
                ? $this->faker->randomElement([
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
                ])
                : null,
            'preview_start_time' => fn (array $attributes) => $attributes['has_preview']
                ? $this->faker->time
                : null,
            'preview_end_time' => fn (array $attributes) => $attributes['has_preview']
                ? $this->faker->time
                : null,
            'passing_marks_percentage' => mt_rand(40, 70),
            'quiz_skipable' => $this->faker->boolean(),
        ];
    }

    public function configure(): LessonFactory
    {
        return $this->afterCreating(function (Lesson $lesson) {
            $lesson->addDummyMedia(public_path('/assets/img/lesson'), 'thumbnail');
        });
    }
}
