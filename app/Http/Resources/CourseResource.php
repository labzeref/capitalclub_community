<?php

namespace App\Http\Resources;

use App\Http\Resources\Asset\CategoryResource;
use App\Http\Resources\Instructor\InstructorCompactResource;
use App\Http\Resources\Lesson\LessonCompactResource;
use App\Http\Resources\Media\BlurMediaResource;
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
            'modules' => ModuleResource::collection($this->whenLoaded('modules')),
            'default_instructor' => new InstructorCompactResource($this->whenLoaded('defaultInstructor')),
            'instructors' => InstructorCompactResource::collection(
                $this->whenLoaded('instructors', fn () => $this->instructors)
            ),
            // 'trailer' => new TrailerResource($this->whenLoaded('trailer')),
            'category' => new CategoryResource($this->whenLoaded('category')),
            'thumbnail' => $this->whenLoaded(
                'media',
                fn () => [
                    'original' => $this->getFirstMedia('thumbnail')
                        ? new MediaResource($this->getFirstMedia('thumbnail'))
                        : _defaultDesktopImage(),
                    'medium' => $this->getFirstMedia('thumbnail')
                        ? new MediumMediaResource($this->getFirstMedia('thumbnail'))
                        : _defaultDesktopMediumImage(),
                    'small' => $this->getFirstMedia('thumbnail')
                        ? new SmallMediaResource($this->getFirstMedia('thumbnail'))
                        : _defaultDesktopSmallImage(),
                    'blur' => $this->getFirstMedia('thumbnail')
                        ? new BlurMediaResource($this->getFirstMedia('thumbnail'))
                        : _defaultDesktopSmallImage(),
                ]
            ),
            'mobile_thumbnail' => $this->whenLoaded(
                'media',
                fn () => [
                    'original' => $this->getFirstMedia('mobileThumbnail')
                        ? new MediaResource($this->getFirstMedia('mobileThumbnail'))
                        : _defaultMobileImage(),
                    'medium' => $this->getFirstMedia('mobileThumbnail')
                        ? new MediumMediaResource($this->getFirstMedia('mobileThumbnail'))
                        : _defaultMobileMediumImage(),
                    'small' => $this->getFirstMedia('mobileThumbnail')
                        ? new SmallMediaResource($this->getFirstMedia('mobileThumbnail'))
                        : _defaultMobileSmallImage(),
                    'blur' => $this->getFirstMedia('mobileThumbnail')
                        ? new BlurMediaResource($this->getFirstMedia('mobileThumbnail'))
                        : _defaultMobileSmallImage(),
                ]
            ),
            'poster' => $this->whenLoaded(
                'media',
                fn () => [
                    'original' => $this->getFirstMedia('poster')
                        ? new MediaResource($this->getFirstMedia('poster'))
                        : _defaultMobileImage(),
                    'blur' => $this->getFirstMedia('poster')
                        ? new BlurMediaResource($this->getFirstMedia('poster'))
                        : _defaultMobileImage(),
                ]
            ),
            'lessons' => LessonCompactResource::collection($this->whenLoaded('lessons')),
            'lessons_count' => $this->when(isset($this->lessons_count), $this->lessons_count),
            'bookmarked' => auth()->user()->bookmarkedCourses->contains($this->id),
            'progress' => $this->whenPivotLoaded('course_enrollment', fn () => $this->pivot->progress),
            'title' => $this->title,
            'summery' => $this->summery,
            'trailer_url' => $this->trailer_url,
            'duration' => $this->duration,
            'featured' => $this->featured,
            'strict' => $this->strict,
            'published' => (bool) $this->published_at,
            'published_at' => $this->published_at?->toDateString(),
            'is_new' => $this->whenLoaded('lessons', function () {
                return $this->lessons->isEmpty() || $this->lessons->every(function ($lesson) {
                        return !$lesson->progress;
                    });
            }),
        ];
    }
}
