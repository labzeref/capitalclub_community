<?php

namespace Database\Seeders;

use App\Models\Course;
use App\Models\Lesson;
use App\Models\Quiz;
use Illuminate\Database\Seeder;

class CourseSeeder extends Seeder
{
    public function run(): void
    {
        Course::factory(7)
            ->hasFaqs(5)
            ->hasTrailer()
            ->has(
                Lesson::factory(mt_rand(2, 4))
                    ->has(Quiz::factory(mt_rand(3, 5))->hasAnswers(mt_rand(3, 5)))
            )
            ->create();
    }
}
