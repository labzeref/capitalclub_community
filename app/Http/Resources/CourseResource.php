<?php

namespace App\Http\Resources;

use App\Http\Resources\Asset\CategoryResource;
use App\Http\Resources\Instructor\InstructorCompactResource;
use App\Http\Resources\Lesson\LessonCompactResource;
use App\Http\Resources\Media\MediaResource;
use App\Http\Resources\Media\MediumMediaResource;
use App\Http\Resources\Media\SmallMediaResource;
use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin Course */
class CourseResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'default_instructor' => new InstructorCompactResource($this->whenLoaded('defaultInstructor')),
            'instructors' => InstructorCompactResource::collection(
                $this->whenLoaded('instructors', fn () => $this->instructors)
            ),
            'trailer' => new TrailerResource($this->whenLoaded('trailer')),
            'category' => new CategoryResource($this->whenLoaded('category')),
            'thumbnail' => $this->whenLoaded(
                'media',
                fn () => [
                    'original' => new MediaResource($this->getFirstMedia('thumbnail')),
                    'medium' => new MediumMediaResource($this->getFirstMedia('thumbnail')),
                    'small' => new SmallMediaResource($this->getFirstMedia('thumbnail')),
                ]),
            'faqs' => FAQResource::collection($this->whenLoaded('faqs')),
            'lessons' => LessonCompactResource::collection($this->whenLoaded('lessons')),
            'lessons_count' => $this->when(isset($this->lessons_count), $this->lessons_count),
            'bookmarked' => auth()->user()->bookmarkedCourses->contains($this->id),
            'progress' => $this->whenPivotLoaded('course_enrollment', fn () => $this->pivot->progress),
            'title' => $this->title,
            'summery' => $this->summery,
            'duration' => $this->duration,
            'featured' => $this->featured,
            'published' => (bool) $this->published_at,
            'published_at' => $this->published_at?->toDateString(),
            'experience' => $this->experience,
        ];
    }
}
