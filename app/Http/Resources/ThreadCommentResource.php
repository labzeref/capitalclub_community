<?php

namespace App\Http\Resources;

use App\Http\Resources\User\UserCompactResource;
use App\Models\ThreadComment;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin ThreadComment */
class ThreadCommentResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'user' => new UserCompactResource($this->whenLoaded('user')),
            'replies' => ThreadCommentResource::collection($this->whenLoaded('replies')),
            'reactions_count' => $this->when(isset($this->reactions_count), $this->reactions_count),
            'reactions' => $this->whenLoaded(
                'reactions',
                fn () => $this->reactions->pluck('value')->unique()->toArray()
            ),
            'my_reaction' => $this->whenLoaded(
                'reactions',
                fn () => $this->reactions->where('user_id', _user()->id)->value('value')
            ),
            'value' => $this->value,
            'created_at' => $this->created_at?->diffForHumans(),
        ];
    }
}
