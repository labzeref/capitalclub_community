<?php

namespace Database\Factories;

use App\Models\Chat\Conversation;
use App\Models\Chat\ConversationParticipant;
use Illuminate\Database\Eloquent\Factories\Factory;

class ConversationParticipantFactory extends Factory
{
    protected $model = ConversationParticipant::class;

    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'conversation_id' => Conversation::factory(),
            'last_update' => $this->faker->dateTime,
            'created_at' => $this->faker->dateTime,
            'updated_at' => $this->faker->dateTime,
        ];
    }
}
