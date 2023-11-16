<?php

namespace App\Http\Resources;

use App\Models\Badge;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin Badge */
class BadgeResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'svg' => $this->svg,
            'title' => $this->title,
            'description' => $this->description,
            'weight' => $this->weight,
        ];
    }
}
