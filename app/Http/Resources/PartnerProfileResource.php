<?php

namespace App\Http\Resources;

use App\Http\Resources\Media\MediaResource;
use App\Http\Resources\Media\MediumMediaResource;
use App\Http\Resources\Media\SmallMediaResource;
use App\Models\PartnerProfile;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin PartnerProfile */
class PartnerProfileResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'head_offices' => $this->head_offices,
            'industries' => $this->industries,
            'overview' => $this->overview,
            'website' => $this->website,
            $this->mergeWhen(
                $this->relationLoaded('media'),
                fn () => [
                    'dp' => [
                        'original' => new MediaResource($this->getFirstMedia('dp')),
                        'medium' => new MediumMediaResource($this->getFirstMedia('dp')),
                        'small' => new SmallMediaResource($this->getFirstMedia('dp')),
                    ],
                    'cover' => [
                        'original' => new MediaResource($this->getFirstMedia('cover')),
                        'medium' => new MediumMediaResource($this->getFirstMedia('cover')),
                        'small' => new SmallMediaResource($this->getFirstMedia('cover')),
                    ],
                ]

            ),
        ];
    }
}
