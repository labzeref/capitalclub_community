<?php

namespace Database\Factories;

use App\Models\Chat\Conversation;
use Illuminate\Database\Eloquent\Factories\Factory;

class ConversationFactory extends Factory
{
    protected $model = Conversation::class;

    public function definition(): array
    {
        return [
            'type' => $this->faker->boolean,
            'last_message' => $this->faker->text(10),
            'last_update' => $this->faker->dateTime,
            'created_at' => $this->faker->dateTime,
            'updated_at' => $this->faker->dateTime,
        ];
    }
}
