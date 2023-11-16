<?php

namespace Database\Factories;

use App\Models\FAQ;
use Illuminate\Database\Eloquent\Factories\Factory;

class FAQFactory extends Factory
{
    protected $model = FAQ::class;

    public function definition(): array
    {
        return [
            'question' => $this->faker->text(80),
            'answer' => $this->faker->text(300),
        ];
    }
}
