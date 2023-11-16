<?php

namespace App\Http\Resources;

use App\Http\Resources\Media\MediaResource;
use App\Models\Avatar;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin Avatar */
class AvatarResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'image' => $this->whenLoaded(
                'media',
                fn () => new MediaResource($this->getFirstMedia('image')),
            ),
        ];
    }
}
