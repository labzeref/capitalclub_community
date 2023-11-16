<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Spatie\Activitylog\Models\Activity;

/** @mixin  Activity */
class ActivityResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'description' => $this->description,
            'created_at' => $this->created_at?->format('M d, Y'),
            'time' => $this->created_at?->diffForHumans(),
        ];
    }
}
