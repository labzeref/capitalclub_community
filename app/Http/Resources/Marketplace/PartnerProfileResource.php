<?php

namespace App\Http\Resources\Marketplace;

use App\Models\Marketplace\PartnerProfile;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin PartnerProfile */
class PartnerProfileResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'reviews' => PartnerProfileReviewResource::collection($this->whenLoaded('reviews')),
            'categories' => MarketPlaceCategoryResource::collection($this->whenLoaded('categories')),
            'subCategories' => MarketPlaceCategoryResource::collection($this->whenLoaded('subCategories')),
            'banners' => PartnerProfileBannerResource::collection($this->whenLoaded('banners')),
            'plans' => PartnerProfilePlanResource::collection($this->whenLoaded('plans')), 
            'promoCodes' => PartnerProfilePromoCodeResource::collection($this->whenLoaded('promoCodes')),
            'title' => $this->title,
            'slug' => $this->slug,
            'short_description' => $this->short_description,
            'long_description' => $this->long_description,
            'promo_line' => $this->promo_line,
            'promo_code' => $this->promo_code,
            'website_link' => $this->website_link,
            'redeem_link' => $this->redeem_link,
            'redeem_link_embedded' => $this->redeem_link_embedded,
            'instructions' => $this->instructions,
            'instructions_note' => $this->instructions_note,
            'is_trust_pilot' => $this->is_trust_pilot,
            'cc_benefits' => $this->cc_benefits,
            'is_benefits' => $this->is_benefits,
            'trust_pilot_link' => $this->when($this->is_trust_pilot == true, $this->trust_pilot_link),

            $this->mergeWhen(
                $this->relationLoaded('media'),
                fn() => ['logo' => $this->getFirstMedia('logo')
                    ? _getSignedUrl($this->getFirstMediaPath('logo'))
                    : _defaultDesktopSmallImage()]
            ),

            $this->mergeWhen(
                $this->relationLoaded('reviews') && $this->is_trust_pilot == false,
                function () {
                    return [
                        'reviews' => PartnerProfileReviewResource::collection($this->reviews),
                    ];
                }
            )
        ];
    }
}
