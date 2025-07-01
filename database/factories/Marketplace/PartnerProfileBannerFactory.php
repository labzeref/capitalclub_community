<?php

namespace Database\Factories\Marketplace;

use App\Jobs\AddSpatieMediaJob;
use App\Models\Marketplace\PartnerProfileBanner;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

class PartnerProfileBannerFactory extends Factory
{
    public function definition(): array
    {
        return [
            'vimeo_url' => $this->faker->randomElement([null, $this->faker->url()]),
        ];
    }

    public function configure(): PartnerProfileBannerFactory
    {
        return $this->afterCreating(function (PartnerProfileBanner $banner) {

            if ($banner->is_vimeo) {
                return;
            }

            $images = glob(storage_path('/images/partner-profiles-banners') . '/*');
            $image = $images[array_rand($images)];

            AddSpatieMediaJob::dispatch(
                source: $image,
                model: $banner,
                collection: 'image',
                strategy: 'path'
            );

            AddSpatieMediaJob::dispatch(
                source: $image,
                model: $banner,
                collection: 'thumbnail',
                strategy: 'path'
            );
        });
    }
}
