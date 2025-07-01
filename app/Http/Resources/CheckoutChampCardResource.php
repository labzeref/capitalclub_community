<?php

namespace App\Http\Resources;

use App\Models\CheckoutChampCard;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin CheckoutChampCard */
class CheckoutChampCardResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'is_primary' => $this->is_primary,
            'type' => $this->type,
            'last_4' => $this->last_4,
            'year' => $this->year,
            'month' => $this->month,
            'expiry_date' => $this->expiry_date?->toDateString(),
            'ach_routing_number' => $this->ach_routing_number,
            'ach_account_type' => $this->ach_account_type,
            'ach_bank_name' => $this->ach_bank_name,
            'ach_last_4' => $this->ach_last_4,
        ];
    }
}
