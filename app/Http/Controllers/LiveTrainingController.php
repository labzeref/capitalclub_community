<?php

namespace App\Http\Controllers;

use App\Http\Resources\LiveStreamResource;
use App\Models\LiveStream;
use Carbon\Carbon;

class LiveTrainingController extends Controller
{
    public function index()
    {

        $upcoming = LiveStreamResource::collection(
            LiveStream::with('liveSeries')
                ->where('live_at', '>', Carbon::now())
                ->orderBy('live_at', 'DESC')
                ->take(7)
                ->get());

        $bannered = LiveStreamResource::collection(
            LiveStream::with('liveSeries')
                ->where( 'bannered',true)
                ->get());

        $live = LiveStreamResource::collection(LiveStream::with('liveSeries') //live
            ->where('live_at', '<', Carbon::now())
            ->where('live_end_at', null)
            ->get());

        $wasLive = LiveStreamResource::collection(
            LiveStream::with('liveSeries')
                ->where('live_end_at', '<', Carbon::now())
                ->orderBy('live_at', 'DESC')
                ->take(7)
                ->get());

        //                 dd(
        //                     'upcoming',
        //
        //                         LiveStream::with('liveSeries')
        //                             ->where('live_at', '>',  Carbon::now())
        //                             ->orderBy('live_at', 'DESC')
        //                             ->take(7)
        //                             ->get()->toArray(),
        //                         'bannered',
        //                         LiveStream::with('liveSeries')
        //                             ->where('type', 'bannered')
        //                             ->get()->toArray(),
        //
        //                            'featured',
        //                     LiveStream::with('liveSeries') //live
        //                     ->where('live_at', '<',  Carbon::now())
        //                         ->where('live_end_at',null)
        //                         ->get()->toArray(),
        //
        //                     'was live',
        //                     LiveStream::with('liveSeries')
        //                         ->where('live_end_at', '<',  Carbon::now())
        //                         ->orderBy('live_at', 'DESC')
        //                         ->take(7)
        //                         ->get()->toArray()
        //                 );

        return inertia('Live/LiveTraining', compact('upcoming', 'live', 'bannered', 'wasLive'));
    }
}
