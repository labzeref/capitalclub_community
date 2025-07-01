<?php

namespace App\Http\Resources\Marketplace;

use App\Models\Marketplace\PartnerProfilePlan;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin PartnerProfilePlan */
class PartnerProfilePlanResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'url' => $this->url,
            'offer_price' => $this->offer_price,
            'real_price' => $this->real_price,
            'features' => $this->features,
        ];
    }
}
