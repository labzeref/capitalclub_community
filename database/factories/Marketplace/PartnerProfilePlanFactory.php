<?php

namespace Database\Factories\Marketplace;

use App\Models\Marketplace\PartnerProfilePlan;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

class PartnerProfilePlanFactory extends Factory
{
    protected $model = PartnerProfilePlan::class;

    public function definition(): array
    {
        return [
            'profile_id' => PartnerProfileFactory::class,
            'name' => $this->faker->name(),
            'url' => $this->faker->url(),
            'offer_price' => $this->faker->randomNumber(3),
            'real_price' => $this->faker->randomNumber(3),
            'features' => $this->faker->randomElements([
                $this->faker->text(50),
                $this->faker->text(50),
                $this->faker->text(50),
                $this->faker->text(50),
                $this->faker->text(50),
            ], 5),
        ];
    }
}
