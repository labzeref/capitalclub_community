<?php

namespace Database\Factories;

use App\Models\Asset\Category;
use App\Models\Instructor;
use Illuminate\Database\Eloquent\Factories\Factory;

class InstructorFactory extends Factory
{
    protected $model = Instructor::class;

    public function definition(): array
    {
        return [
            'category_id' => Category::inRandomOrder()->value('id'),
            'first_name' => $this->faker->firstName,
            'last_name' => $this->faker->lastName,
            'about' => $this->faker->text(450),
        ];
    }

    public function configure(): InstructorFactory
    {
        return $this->afterCreating(fn (Instructor $instructor) => $instructor->addDummyMedia(public_path('/assets/img/instructor'), 'dp'));
    }
}
