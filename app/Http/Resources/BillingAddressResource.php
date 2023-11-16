<?php

namespace App\Http\Resources;

use App\Models\BillingAddress;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin BillingAddress */
class BillingAddressResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'phone_number' => $this->phone_number,
            'street_address' => $this->street_address,
            'city' => $this->city,
            'zip_code' => $this->zip_code,
            'country_iso' => $this->country_iso,
            'state' => $this->state,
        ];
    }
}
