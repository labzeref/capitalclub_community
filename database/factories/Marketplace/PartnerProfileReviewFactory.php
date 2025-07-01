<?php

namespace Database\Factories\Marketplace;

use App\Models\Marketplace\PartnerProfileReview;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

class PartnerProfileReviewFactory extends Factory
{
    public function definition(): array
    {
        return [
            'profile_id' => PartnerProfileFactory::class,
            'name' => $this->faker->name,
            'feedback' => $this->faker->text(),
        ];
    }
}
