<?php

namespace App\Http\Controllers;

use App\Http\Resources\LiveStreamResource;
use App\Http\Resources\StreamMessageResource;
use App\Models\LiveStream;

class LiveStreamController extends Controller
{
    public function play(LiveStream $liveStream)
    {
        $user = _user();
        $streamChat = [];
        if (! $user->hasEnrolledInLiveStream($liveStream->id)) {
            $user->enrolledInLiveStream($liveStream->id);
        }

        if ($liveStream->chat_enabled)
        {
            $chat = $liveStream->streamMessages()->orderBy('id', 'DESC')->limit(100)->get();
            $streamChat =  StreamMessageResource::collection($chat);
        }

        $liveStream = new LiveStreamResource($liveStream->load('liveSeries'));

        return inertia('Live/LiveSession', compact('liveStream', 'streamChat'));

    }
}
