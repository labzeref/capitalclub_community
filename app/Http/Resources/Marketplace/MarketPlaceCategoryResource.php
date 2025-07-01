<?php

namespace App\Http\Resources\Marketplace;

use App\Models\Marketplace\MarketPlaceCategory;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin MarketPlaceCategory */
class MarketPlaceCategoryResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'subCategories' => MarketPlaceCategoryResource::collection($this->whenLoaded('subCategories'))
        ];
    }
}
