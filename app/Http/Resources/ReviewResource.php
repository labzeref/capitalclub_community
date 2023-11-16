<?php

namespace App\Http\Resources;

use App\Http\Resources\User\UserCompactResource;
use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin Review */
class ReviewResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'user' => new UserCompactResource($this->whenLoaded('user')),
            'rating' => $this->rating,
            'feedback' => $this->feedback,
            'created_at' => $this->created_at?->diffForHumans(),
        ];
    }
}
