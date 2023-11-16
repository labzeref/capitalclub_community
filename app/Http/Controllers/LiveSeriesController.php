<?php

namespace App\Http\Controllers;

use App\Http\Resources\Instructor\InstructorResource;
use App\Http\Resources\LiveStreamResource;
use App\Models\Instructor;
use App\Models\LiveStream;

class LiveSeriesController extends Controller
{
    public function preview($liveStreamId)
    {
        $liveStream = new LiveStreamResource(LiveStream::with('liveSeries.faqs', 'liveSeries.instructors')->findOrFail($liveStreamId));
        $randomInstuctors = InstructorResource::collection(Instructor::inRandomOrder()->take(5)->get());
        $randomLives = LiveStreamResource::collection(
            LiveStream::with('liveSeries')->inRandomOrder()->take(10)->get()->load('liveSeries'));

        return inertia('Live/LiveTrainingInfo', compact('liveStream', 'randomInstuctors', 'randomLives'));

    }
}
