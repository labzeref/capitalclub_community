<?php

namespace App\Http\Resources;

use App\Models\SingleLiveStream;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin SingleLiveStream */
class SingleLiveStreamResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'title' => $this->title,
            'restream_link' => $this->restream_link,
        ];
    }
}
