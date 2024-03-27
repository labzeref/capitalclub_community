<?php

namespace App\Http\Controllers;

use App\Http\Resources\SingleLiveStreamResource;
use App\Models\SingleLiveStream;

class SingleLiveStreamController extends Controller
{
    public function __invoke(SingleLiveStream $singleLiveStream)
    {
        $singleLiveStream = new SingleLiveStreamResource($singleLiveStream);

        return inertia('Live/RestreamLink', compact('singleLiveStream'));
    }
}
