<?php

namespace App\Http\Resources;

use App\Http\Resources\User\UserCompactResource;
use App\Models\PostComment;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin PostComment */
class PostCommentResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'user' => new UserCompactResource($this->whenLoaded('user')),
            'replies' => PostCommentResource::collection($this->whenLoaded('replies')),
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
            'reported' => _user()->postCommentReports->contains('reportable_id', $this->id),
            'created_at' => $this->created_at?->diffForHumans(),
        ];
    }
}
