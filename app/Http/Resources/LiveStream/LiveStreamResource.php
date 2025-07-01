<?php

namespace App\Http\Resources\LiveStream;

use App\Http\Resources\Instructor\InstructorCompactResource;
use App\Models\LiveStream\LiveStream;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin LiveStream */
class LiveStreamResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'instructor' => new InstructorCompactResource($this->whenLoaded('instructor')),
            'category' => new LiveStreamCategoryResource($this->whenLoaded('category')),
            'title' => $this->title,
            'guests' => $this->guests,
            'description' => $this->description,
            'embed_url' => $this->embed_url,
            'embed_chat_url' => $this->embed_chat_url,
            'video_url' => $this->video_url,
            'published' => (bool)$this->published_at,
            'live_at' => $this->live_at?->toDateTimeString(),
            'timezone' => $this->time_zone,
            'disabled' => $this->disabled,
            'live_at_for_grouping' => $this->live_at?->format('M, Y'),
            'live_end_at' => $this->live_end_at?->toDateTimeString(),

            'note' => $this->whenLoaded(
                'note',
                fn () => $this->note?->content
            ),

            'bookmarked' => $this->when(
                _user()->relationLoaded('bookmarkedLiveStream'),
                function () {
                    return _user()->bookmarkedLiveStream->contains($this->id);
                }
            ),

            $this->mergeWhen(
                $this->relationLoaded('media'),
                function () {
                    return [
                        'thumbnail' => $this->getFirstMedia('thumbnail')
                            ? _getSignedUrl($this->getFirstMediaPath('thumbnail'))
                            : _defaultDesktopImage(),
                        'banner' => $this->getFirstMedia('banner')
                            ? _getSignedUrl($this->getFirstMediaPath('banner'))
                            : _defaultDesktopImage(),
                        'mobileBanner' => $this->getFirstMedia('mobileBanner')
                            ? _getSignedUrl($this->getFirstMediaPath('mobileBanner'))
                            : _defaultDesktopImage(),
                    ];
                }
            ),
        ];
    }
}
