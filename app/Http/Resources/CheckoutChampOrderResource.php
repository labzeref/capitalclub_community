<?php

namespace App\Http\Resources;

use App\Models\CheckoutChampOrder;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin CheckoutChampOrder */
class CheckoutChampOrderResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'product' => new CheckoutChampProductResource($this->whenLoaded('product')),
            'start_at' => Carbon::parse($this->start_at)?->format('Y-m-d'),
            'end_at' => Carbon::parse($this->end_at)?->format('Y-m-d'),
            'last_success_retry' => $this->last_success_retry ? Carbon::parse($this->last_success_retry) > now()->subHour() ? true : false : false,
            'active' => $this->end_at > now(),
            'amount' => $this->amount,
            'status' => $this->status,
        ];
    }
}
