<?php

namespace App\Http\Resources\LiveStream;

use App\Models\LiveStream\LiveStreamCategory;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin LiveStreamCategory */
class LiveStreamCategoryResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
        ];
    }
}
