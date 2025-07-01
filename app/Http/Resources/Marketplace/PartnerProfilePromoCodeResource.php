<?php

namespace App\Http\Resources\Marketplace;

use App\Models\Marketplace\PromoCode;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin PromoCode */
class PartnerProfilePromoCodeResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'promo_code' => $this->promo_code,
            'description' => $this->description,
        ];
    }
}
