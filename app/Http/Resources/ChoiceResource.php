<?php

namespace App\Http\Resources;

use App\Models\Choice;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin Choice */
class ChoiceResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'value' => $this->value,
            'poll_percentage' => $this->poll_percentage,
        ];
    }
}
