<?php

namespace App\Http\Resources\Marketplace;

use App\Enums\PartnerProfileReviewTypeEnum;
use App\Models\Marketplace\PartnerProfileReview;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin PartnerProfileReview */
class PartnerProfileReviewResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'profile_id' => $this->profile_id,
            'name' => $this->name,
            'feedback' => $this->feedback,
        ];
    }
}
