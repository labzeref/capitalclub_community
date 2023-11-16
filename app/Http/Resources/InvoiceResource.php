<?php

namespace App\Http\Resources;

use App\Models\Invoice;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin Invoice */
class InvoiceResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'currency_code' => $this->currency_code,
            'amount_paid' => $this->amount_paid,
            'total' => $this->total,
            'paid_at' => $this->paid_at->format('M d, Y'),
            'date' => $this->date->format('M d, Y'),
            'status' => $this->status,
        ];
    }
}
