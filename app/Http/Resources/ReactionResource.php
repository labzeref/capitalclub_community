<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Maize\Markable\Models\Reaction;

/** @mixin Reaction */
class ReactionResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'value' => $this->value,
            'user' => $this->whenLoaded(
                'user',
                fn () => [
                    'id' => $this->user->id,
                    'full_name' => $this->user->full_name,
                    'dp' => $this->user->dp('small'),
                ]
            ),
        ];
    }
}
