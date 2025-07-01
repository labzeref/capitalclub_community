<?php

namespace Database\Factories\Marketplace;

use App\Jobs\AddSpatieMediaJob;
use App\Models\Marketplace\PartnerProfile;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;

class PartnerProfileFactory extends Factory
{
    public function definition(): array
    {
        return [
            'title' => $this->faker->text(100),
            'short_description' => $this->faker->text(100),
            'long_description' => $this->faker->text(500),
            'promo_line' => $this->faker->text(20),
            'promo_code' => Str::random(5),
            'website_link' => $this->faker->url(),
            'instructions' => $this->faker->text(400),
            'instructions_note' => $this->faker->text(200),
            'published_at' => now(),
            'featured' => (bool)mt_rand(0, 1),
            'is_trust_pilot' => mt_rand(0, 1),
            'trust_pilot_link' => $this->faker->url,
            'cc_benefits' => $this->faker->text(20),
            'is_benefits' => false,
        ];
    }

    public function configure(): PartnerProfileFactory
    {
        return $this->afterCreating(function (PartnerProfile $partnerProfile) {
            $logos = glob(storage_path('/images/partner-profiles-logos') . '/*');
            $logo = $logos[array_rand($logos)];

            $banners = glob(storage_path('/images/partner-profiles-banners') . '/*');
            $banner = $banners[array_rand($banners)];

            AddSpatieMediaJob::dispatch(
                source: $logo,
                model: $partnerProfile,
                collection: 'logo',
                strategy: 'path'
            );
        });
    }
}
