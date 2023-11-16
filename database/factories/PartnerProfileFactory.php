<?php

namespace Database\Factories;

use App\Models\PartnerProfile;
use Illuminate\Database\Eloquent\Factories\Factory;

class PartnerProfileFactory extends Factory
{
    protected $model = PartnerProfile::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->name(),
            'head_offices' => [
                'Pakistan',
                'Australia',
                'United Kingdom',
            ],
            'industries' => [
                'Japan',
                'China',
                'Germany',
            ],
            'overview' => $this->faker->text(),
            'website' => $this->faker->url,
        ];
    }

    public function configure(): PartnerProfileFactory
    {
        return $this->afterCreating(function (PartnerProfile $partner_profile) {
            $partner_profile->addDummyMedia(public_path('/assets/img/partner-profile'), 'dp');
            $partner_profile->addDummyMedia(public_path('/assets/img/partner-profile-cover'), 'cover');
        });
    }
}
