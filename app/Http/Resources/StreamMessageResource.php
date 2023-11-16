<?php

namespace App\Http\Resources;

use App\Http\Resources\User\UserCompactResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin \App\Models\StreamMessage */
class StreamMessageResource extends JsonResource
{
    public function toArray(Request $request): array
    {

        return [
            'id' => $this->id,
            'value' => $this->value,
            'user_id' => $this->user_id,
            'user' => new UserCompactResource($this->whenLoaded('user')),
            'send_at' => $this->send_at->diffForHumans(),
            'mentioned_message_id' => $this->mentioned_message_id,
            'mentioned_message' => new StreamMessageResource($this->whenLoaded('mentionedMessage')),

        ];
    }
}
