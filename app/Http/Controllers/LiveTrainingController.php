<?php

namespace App\Http\Controllers;

use App\Http\Resources\LiveStreamResource;
use App\Models\LiveStream;
use Inertia\Response;
use Inertia\ResponseFactory;

class LiveTrainingController extends Controller
{
    /**
     * Show the live training index page where all live training shows
     *
     * @return Response|ResponseFactory
     */
    public function index()
    {
        $featured = LiveStream::with('liveSeries')->featured()->first();
        if ($featured) {
            $featured = new LiveStreamResource($featured);
        }

        $upcoming = LiveStreamResource::collection(
            LiveStream::with('liveSeries')->notFeatured()->upcoming()->get()
        );

        $live = LiveStreamResource::collection(
            LiveStream::with('liveSeries')->notFeatured()->live()->get()
        );

        $wasLive = LiveStreamResource::collection(
            LiveStream::with('liveSeries')->notFeatured()->wasLive()->get()
        );

        return inertia('Live/LiveTraining', compact('upcoming', 'live', 'featured', 'wasLive'));
    }
}
