<?php

namespace Database\Factories;

use App\Models\Asset\Category;
use App\Models\Course;
use App\Models\Instructor;
use Illuminate\Database\Eloquent\Factories\Factory;

class CourseFactory extends Factory
{
    public function definition(): array
    {
        return [
            'category_id' => Category::inRandomOrder()->value('id'),
            'title' => $this->faker->jobTitle,
            'summery' => $this->faker->text(450),
            'duration' => $this->faker->numberBetween(600, 6000),
            'featured' => $this->faker->boolean,
            'published_at' => now()->subDays(mt_rand(8, 15)),
        ];
    }

    public function configure(): CourseFactory
    {
        return $this->afterCreating(function (Course $course) {
            $course->addDummyMedia(public_path('/assets/img/course'), 'thumbnail');
            $instructors = Instructor::inRandomOrder()->take(3)->get();
            $course->update(['default_instructor_id' => $instructors->value('id')]);
            $course->instructors()->attach($instructors->pluck('id')->toArray());
        });
    }
}
