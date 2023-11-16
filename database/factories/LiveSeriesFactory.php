<?php

namespace Database\Factories;

use App\Models\Instructor;
use App\Models\LiveSeries;
use Illuminate\Database\Eloquent\Factories\Factory;

class LiveSeriesFactory extends Factory
{
    protected $model = LiveSeries::class;

    public function definition(): array
    {
        return [
            //            'instructor_id' => Instructor::inRandomOrder()->value('id'),
            'title' => fake()->jobTitle,
            'description' => fake()->text(250),
            'experience' => [
                ['title' => $this->faker->jobTitle, 'description' => $this->faker->text],
                ['title' => $this->faker->jobTitle, 'description' => $this->faker->text],
                ['title' => $this->faker->jobTitle, 'description' => $this->faker->text],
            ],
        ];
    }

    public function configure(): LiveSeriesFactory
    {
        return $this->afterCreating(function (LiveSeries $live_series) {
            $live_series->addDummyMedia(public_path('/assets/img/live-training'), 'thumbnail');
            $instructors = Instructor::inRandomOrder()->take(2)->get();
            $live_series->update(['default_instructor_id' => $instructors->value('id')]);
            $live_series->instructors()->attach($instructors);
        });
    }
}
