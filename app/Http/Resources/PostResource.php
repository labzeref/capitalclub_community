<?php

namespace App\Http\Resources;

use App\Enums\PostTypeEnum;
use App\Http\Resources\User\UserCompactResource;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin Post */
class PostResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'user' => new UserCompactResource($this->whenLoaded('user')),
            'comments_count' => $this->when(isset($this->comments_count), $this->comments_count),
            'title' => $this->title,
            'type' => $this->type,
            'reactions_count' => $this->when(isset($this->reactions_count), $this->reactions_count),
            'reactions' => $this->whenLoaded(
                'reactions',
                fn () => $this->reactions->pluck('value')->unique()->toArray()
            ),
            'my_reaction' => $this->whenLoaded(
                'reactions',
                fn () => $this->reactions->where('user_id', _user()->id)->value('value')
            ),
            $this->mergeWhen(
                $this->relationLoaded('media'),
                fn () => [
                    'video' => $this->getFirstMediaPath('video')
                        ? _getSignedUrl($this->getFirstMediaPath('video'))
                        : null,
                    'image' => $this->getFirstMediaPath('image')
                        ? _getSignedUrl($this->getFirstMediaPath('image'))
                        : null,
                    'thumbnail' => $this->getFirstMediaPath('video', 'thumbnail')
                        ? _getSignedUrl($this->getFirstMediaPath('video', 'thumbnail'))
                        : null,
                ]
            ),
            'choices' => $this->when(
                $this->type == PostTypeEnum::poll->name && $this->relationLoaded('choices'),
                fn () => ChoiceResource::collection($this->choices)
            ),
            'my_choice_id' => $this->when(
                $this->type == PostTypeEnum::poll->name,
                fn () => $this->polling()->where('user_id', _user()->id)->value('choice_id')
            ),
            'bookmarked' => _user()->bookmarkedPosts->contains($this->id),
            'published' => $this->published,
            'schedule_at' => $this->schedule_at?->format('Y-m-d H:i:s'),
            'reported' => _user()->postReports->contains('reportable_id', $this->id),
            'created_at' => $this->created_at?->diffForHumans(),
        ];
    }
}
