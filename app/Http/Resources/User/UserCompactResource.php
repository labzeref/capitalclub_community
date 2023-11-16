<?php

namespace App\Http\Resources\User;

use App\Http\Resources\BadgeResource;
use App\Http\Resources\Media\MediaResource;
use App\Http\Resources\Media\MediumMediaResource;
use App\Http\Resources\Media\SmallMediaResource;
use App\Http\Resources\SocialMediaResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin User */
class UserCompactResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $authUser = _user();

        return [
            'id' => $this->id,
            'badges' => BadgeResource::collection($this->whenLoaded('badges')),
            'socialMedia' => new SocialMediaResource($this->whenLoaded('socialMedia')),
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'full_name' => $this->full_name,
            'country_iso' => $this->country_iso,
            'about' => $this->about,
            'has_followed' => $this->when(
                $authUser->relationLoaded('followingUsers'),
                fn () => $authUser->followingUsers->contains('id', $this->id)
            ),
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
