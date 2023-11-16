<?php

namespace App\Http\Resources;

use App\Models\Subscription;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin Subscription */
class SubscriptionResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'started_at' => $this->started_at?->toDateString(),
            'period_unit' => $this->period_unit,
            'amount' => $this->amount ? $this->amount / 100 : 0,
        ];
    }
}
