<?php

namespace Database\Factories;

use App\Enums\QuizTypeEnum;
use App\Models\Lesson;
use App\Models\Quiz;
use Illuminate\Database\Eloquent\Factories\Factory;

class QuizFactory extends Factory
{
    protected $model = Quiz::class;

    public function definition(): array
    {
        return [
            'lesson_id' => Lesson::factory(),
            'correct_answer_id' => null,
            'type' => $this->faker->randomElement(QuizTypeEnum::cases()),
            'question' => $this->faker->text(50),
        ];
    }

    public function configure(): QuizFactory
    {
        return $this->afterCreating(function (Quiz $quiz) {
            $quiz->update([
                'correct_answer_id' => $quiz->answers()->orderBy('id')->value('id'),
            ]);
        });
    }
}
