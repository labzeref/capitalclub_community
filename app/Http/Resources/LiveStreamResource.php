<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin \App\Models\LiveStream */
class LiveStreamResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'sub_title' => $this->sub_title,
            'embed_url' => $this->embed_url,
            'video_url' => $this->embed_url,
            'live_at' => $this->live_at,
            'live_at_readable' => $this->live_at_readable,
            'live_end_at' => $this->live_end_at,
            'live_series_id' => $this->live_series_id,
            'bookmarked' => _user()->bookmarkedLiveStream->contains($this->id),
            'live_series' => new LiveSeriesResource($this->whenLoaded('liveSeries')),
            'status' => $this->status,
            'chat_enabled' => $this->chat_enabled,
        ];
    }
}
