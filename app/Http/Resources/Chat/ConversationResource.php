<?php

namespace App\Http\Resources\Chat;

use App\Http\Resources\User\UserCompactResource;
use App\Models\Chat\Conversation;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin Conversation */
class ConversationResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'encrypted_id' => encrypt($this->id),
            'opponent' => $this->whenLoaded(
                'participants',
                fn () => new UserCompactResource($this->opponent(_user()->id))
            ),
            'last_message' => $this->last_message ?? '....',
            'last_update' => $this->last_update?->diffForHumans(),
        ];
    }
}
