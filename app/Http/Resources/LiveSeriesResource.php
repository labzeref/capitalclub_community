<?php

namespace App\Http\Resources;

use App\Http\Resources\Instructor\InstructorCompactResource;
use App\Http\Resources\Media\MediaResource;
use App\Http\Resources\Media\MediumMediaResource;
use App\Http\Resources\Media\SmallMediaResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin \App\Models\LiveSeries */
class LiveSeriesResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'default_instructor' => new InstructorCompactResource($this->whenLoaded('defaultInstructor')),
            'live_streams' => LiveStreamResource::collection($this->whenLoaded('liveStreams')),
            'faqs' => FAQResource::collection($this->whenLoaded('faqs')),
            'title' => $this->title,
            'description' => $this->description,
            'experience' => $this->experience,
            'thumbnail' => $this->whenLoaded(
                'media',
                fn () => [
                    'original' => new MediaResource($this->getFirstMedia('thumbnail')),
                    'medium' => new MediumMediaResource($this->getFirstMedia('thumbnail')),
                    'small' => new SmallMediaResource($this->getFirstMedia('thumbnail')),
                ]
            ),
        ];
    }
}
