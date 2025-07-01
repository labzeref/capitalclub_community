<?php

namespace Database\Factories\Marketplace;

use Illuminate\Database\Eloquent\Factories\Factory;

class MarketPlaceCategoryFactory extends Factory
{
    public function definition(): array
    {
        return [
            'parent_id' => MarketPlaceCategoryFactory::class,
            'name' => $this->faker->jobTitle(),
        ];
    }

    public function parent(): static
    {
        return $this->state(fn (array $attributes) => [
            'parent_id' => null,
        ]);
    }
}
