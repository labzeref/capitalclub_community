<?php

namespace App\Http\Resources;

use App\Models\CheckoutChampProduct;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin CheckoutChampProduct */
class CheckoutChampProductResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'name' => $this->name,
            'description' => $this->description,
            'cost' => $this->cost,
        ];
    }
}
