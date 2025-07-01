<?php

namespace App\Http\Resources\User;

use App\Http\Resources\Asset\CategoryResource;
use App\Http\Resources\Asset\CountryResource;
use App\Http\Resources\BadgeResource;
use App\Http\Resources\BillingAddressResource;
use App\Http\Resources\Media\MediaResource;
use App\Http\Resources\Media\MediumMediaResource;
use App\Http\Resources\Media\SmallMediaResource;
use App\Http\Resources\SocialMediaResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin User */
class UserResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'country' => new CountryResource($this->whenLoaded('country')),
            'badges' => BadgeResource::collection($this->whenLoaded('badges')),
            'country_iso' => $this->country_iso,
            'socialMedia' => new SocialMediaResource($this->whenLoaded('socialMedia')),
            'interests' => CategoryResource::collection($this->whenLoaded('interests')),
            'billingAddress' => new BillingAddressResource($this->whenLoaded('billingAddress')),
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'full_name' => $this->full_name,
            'email' => $this->email,
            'about' => $this->about,
            'business_owner' => $this->business_owner,
            'annual_revenue' => $this->annual_revenue,
            'objective' => $this->objective,
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
            'created_at' => $this->created_at?->format('d M Y'),
        ];
    }
}
