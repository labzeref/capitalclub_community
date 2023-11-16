<?php

namespace App\Http\Resources;

use App\Http\Resources\Media\MediaResource;
use App\Models\Trailer;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin Trailer */
class TrailerResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'course' => new CourseResource($this->whenLoaded('course')),
            'thumbnail' => $this->whenLoaded(
                'media',
                fn () => new MediaResource($this->getFirstMedia('thumbnail'))
            ),
            'title' => $this->title,
            'vimeo_url' => $this->vimeo_url,
        ];
    }
}
