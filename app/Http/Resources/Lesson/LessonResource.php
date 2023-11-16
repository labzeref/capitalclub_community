<?php

namespace App\Http\Resources\Lesson;

use App\Http\Resources\CourseResource;
use App\Http\Resources\Media\MediaResource;
use App\Http\Resources\Media\MediumMediaResource;
use App\Http\Resources\Media\SmallMediaResource;
use App\Models\Lesson;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin Lesson */
class LessonResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $user = _user();

        return [
            'id' => $this->id,
            'course' => new CourseResource($this->whenLoaded('course')),
            'thumbnail' => $this->whenLoaded(
                'media',
                fn () => [
                    'original' => new MediaResource($this->getFirstMedia('thumbnail')),
                    'medium' => new MediumMediaResource($this->getFirstMedia('thumbnail')),
                    'small' => new SmallMediaResource($this->getFirstMedia('thumbnail')),
                ]
            ),
            'bookmarked' => auth()->user()->bookmarkedLessons->contains($this->id),
            'title' => $this->title,
            'description' => $this->description,
            'vimeo_url' => $this->vimeo_url,
            'duration' => $this->duration,
            'published' => (bool) $this->published_at,
            'published_at' => $this->published_at?->toDateString(),
            'dripped' => (bool) $this->dripped_at,
            'dripped_at' => $this->dripped_at?->toDateString(),
            'has_preview' => $this->has_preview,
            'preview_start_time' => $this->preview_start_time,
            'preview_end_time' => $this->preview_end_time,
            $this->mergeWhen(
                $this->relationLoaded('enrolledUsers'),
                fn () => [
                    'locked' => ! $this->hasEnrolledInUser($user->id),
                    'completed' => (bool) $this->enrolledUsers->where('id', $user->id)
                        ->first()?->pivot->completed,
                    'progress' => (float) $this->enrolledUsers->where('id', _user()->id)
                        ->first()?->pivot->progress,
                ]
            ),
            'note' => $this->whenLoaded(
                'note',
                fn () => $this->note?->content
            ),
            'quiz_skipable' => $this->quiz_skipable,
        ];
    }
}
