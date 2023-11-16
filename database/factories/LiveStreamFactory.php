<?php

namespace Database\Factories;

use App\Models\LiveStream;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

class LiveStreamFactory extends Factory
{
    protected $model = LiveStream::class;

    public function definition(): array
    {
        // Generate a random date and time between 'now' and '+60 days' for live_at.
        $liveAt = fake()->dateTimeBetween('-1 days', '+1 days');

        // Create a DateTime object 2 hours ahead of $liveAt for live_end_at.
        $liveEndAt = (clone $liveAt)->add(new \DateInterval('PT10H'));

        $timezone = 'America/New_York';
        $liveAt = Carbon::instance($liveAt)->setTimezone($timezone);
        if ($liveEndAt < now()) {
            $liveEndAt = Carbon::instance($liveEndAt)->setTimezone($timezone);
            $video_url = 'https://vimeo.com/838262246';
        } else {
            $liveEndAt = null;
            $video_url = null;
        }
        // Convert the DateTime objects to the desired timezone (e.g., 'America/New_York')

        return [
            'sub_title' => 'part '.fake()->numberBetween(1, 10),
            'embed_url' => 'https://player.restream.io/?token=e67d6bfbb7ff488082ab504b46e6b6c3&vwrs=1',
            'live_series_id' => LiveSeriesFactory::class,
            'live_at' => $liveAt,
            'video_url' => $video_url,
            'live_end_at' => $liveEndAt,
            'bannered' => $this->faker->boolean,
            'published' => true,
            'chat_enabled' => fake()->boolean,
        ];
    }
}
