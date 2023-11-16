<?php

namespace Database\Factories;

use App\Models\Avatar;
use Illuminate\Database\Eloquent\Factories\Factory;

class AvatarFactory extends Factory
{
    public function definition(): array
    {
        return [
        ];
    }

    public function configure(): AvatarFactory
    {
        return $this->afterCreating(fn (Avatar $avatar) => $avatar->addDummyMedia(public_path('/assets/img/avatars'), 'image'));
    }
}
