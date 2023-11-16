<?php

namespace App\Http\Controllers;

use App\Http\Resources\Instructor\InstructorResource;
use App\Http\Resources\LiveStreamResource;
use App\Models\Instructor;
use App\Models\LiveStream;
use Inertia\Response;
use Inertia\ResponseFactory;

class LiveSeriesController extends Controller
{
    /**
     * Show the live training preview screen
     *
     * @return Response|ResponseFactory
     */
    public function preview($liveStreamId)
    {
        $liveStream = new LiveStreamResource(LiveStream::with('liveSeries', 'liveSeries.instructors')->findOrFail($liveStreamId));
        $randomInstuctors = InstructorResource::collection(Instructor::inRandomOrder()->take(5)->get());
        $randomLives = LiveStreamResource::collection(
            LiveStream::with('liveSeries')->inRandomOrder()->take(10)->get()->load('liveSeries'));

        return inertia('Live/LiveTrainingInfo', compact('liveStream', 'randomInstuctors', 'randomLives'));
    }
}
