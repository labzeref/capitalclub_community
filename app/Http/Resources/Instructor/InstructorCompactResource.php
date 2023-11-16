<?php

namespace App\Http\Resources\Instructor;

use App\Http\Resources\Asset\CategoryResource;
use App\Http\Resources\Asset\CountryResource;
use App\Http\Resources\Media\MediaResource;
use App\Http\Resources\Media\MediumMediaResource;
use App\Http\Resources\Media\SmallMediaResource;
use App\Http\Resources\User\UserCompactResource;
use App\Models\Instructor;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin Instructor */
class InstructorCompactResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'user' => new UserCompactResource($this->whenLoaded('user')),
            'category' => new CategoryResource($this->whenLoaded('category')),
            'country' => new CountryResource($this->whenLoaded('country')),
            'courses_count' => $this->when($this->courses_count, $this->courses_count),
            'glitch_id' => $this->user_id,
            'country_iso' => $this->country_iso,
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'full_name' => $this->full_name,
            'title' => $this->title,
            'about' => $this->about,
            'default' => $this->whenPivotLoaded('instructorables', fn () => $this->pivot->default),
            'dp' => $this->whenLoaded(
                'media',
                fn () => [
                    'original' => $this->getFirstMedia('dp')
                        ? new MediaResource($this->getFirstMedia('dp'))
                        : _defaultDp(),
                    'medium' => $this->getFirstMedia('dp')
                        ? new MediumMediaResource($this->getFirstMedia('dp'))
                        : _defaultDp(),
                    'small' => $this->getFirstMedia('dp')
                        ? new SmallMediaResource($this->getFirstMedia('dp'))
                        : _defaultDp(),
                ]
            ),
        ];
    }
}
