<?php

namespace App\Http\Resources\Asset;

use App\Http\Resources\CourseResource;
use App\Http\Resources\Media\MediaResource;
use App\Models\Asset\Category;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin Category */
class CategoryResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'courses' => CourseResource::collection($this->whenLoaded('courses')),
            'name' => $this->name,
            'featured' => $this->featured,
            'icon' => $this->whenLoaded(
                'media',
                fn () => new MediaResource($this->getFirstMedia('icon'))
            ),
        ];
    }
}
