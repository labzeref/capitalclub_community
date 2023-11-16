<?php

namespace Database\Factories;

use App\Models\Answer;
use App\Models\Quiz;
use Illuminate\Database\Eloquent\Factories\Factory;

class AnswerFactory extends Factory
{
    protected $model = Answer::class;

    public function definition(): array
    {
        return [
            'quiz_id' => Quiz::factory(),
            'value' => $this->faker->text(10),
        ];
    }
}
