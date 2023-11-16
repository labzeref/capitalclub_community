<?php

namespace App\Http\Resources\Chat;

use App\Http\Resources\Media\MediaResource;
use App\Models\Chat\Message;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin Message */
class MessageResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'user_id' => $this->user_id,
            'conversation_id' => $this->conversation_id,
            'media' => $this->whenLoaded(
                'media',
                fn () => new MediaResource($this->getFirstMedia('media'))
            ),
            'value' => $this->value,
            'seen' => $this->seen,
            'my_reaction' => $this->reactions()->where('user_id', _user()->id)->value('value'),
            'created_at' => $this->created_at?->diffForHumans(),
            'timestamp' => $this->created_at?->timestamp,
        ];
    }
}
