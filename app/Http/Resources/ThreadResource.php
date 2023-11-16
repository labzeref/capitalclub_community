<?php

namespace App\Http\Resources;

use App\Http\Resources\User\UserCompactResource;
use App\Models\Thread;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin Thread */
class ThreadResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $user = _user();

        return [
            'id' => $this->id,
            'user' => new UserCompactResource($this->whenLoaded('user')),
            'followers' => UserCompactResource::collection($this->whenLoaded('followers')),
            'followers_count' => $this->when(isset($this->followers_count), fn () => $this->followers_count),
            'has_followed' => $this->when(
                $user->relationLoaded('followingThreads'),
                fn () => $user->followingThreads->contains('id', $this->id)
            ),
            'comments_count' => $this->when(isset($this->comments_count), fn () => $this->comments_count),
            'title' => $this->title,
            'created_at' => $this->created_at?->diffForHumans(),
        ];
    }
}
