<?php

namespace App\Http\Resources\Lesson;

use App\Http\Resources\CourseResource;
use App\Http\Resources\Media\BlurMediaResource;
use App\Http\Resources\Media\MediaResource;
use App\Http\Resources\Media\MediumMediaResource;
use App\Http\Resources\Media\SmallMediaResource;
use App\Http\Resources\ModuleResource;
use App\Models\Lesson;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin Lesson */
class LessonCompactResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $user = _user();

        return [
            'id' => $this->id,
            'serial_number' => $this->serial_number,
            'course' => new CourseResource($this->whenLoaded('course')),
            'module' => new ModuleResource($this->whenLoaded('module')),
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
            'banner' => $this->whenLoaded(
                'media',
                fn () => [
                    'original' => $this->getFirstMedia('banner')
                        ? new MediaResource($this->getFirstMedia('banner'))
                        : _defaultDesktopImage(),
                    'medium' => $this->getFirstMedia('banner')
                        ? new MediumMediaResource($this->getFirstMedia('banner'))
                        : _defaultDesktopMediumImage(),
                    'small' => $this->getFirstMedia('banner')
                        ? new SmallMediaResource($this->getFirstMedia('banner'))
                        : _defaultDesktopSmallImage(),
                    'blur' => $this->getFirstMedia('banner')
                        ? new BlurMediaResource($this->getFirstMedia('banner'))
                        : _defaultDesktopSmallImage(),
                ]
            ),
            'mobile_banner' => $this->whenLoaded(
                'media',
                fn () => [
                    'original' => $this->getFirstMedia('mobileBanner')
                        ? new MediaResource($this->getFirstMedia('mobileBanner'))
                        : _defaultMobileImage(),
                    'medium' => $this->getFirstMedia('mobileBanner')
                        ? new MediumMediaResource($this->getFirstMedia('mobileBanner'))
                        : _defaultMobileMediumImage(),
                    'small' => $this->getFirstMedia('mobileBanner')
                        ? new SmallMediaResource($this->getFirstMedia('mobileBanner'))
                        : _defaultMobileSmallImage(),
                    'blur' => $this->getFirstMedia('mobileBanner')
                        ? new BlurMediaResource($this->getFirstMedia('mobileBanner'))
                        : _defaultMobileSmallImage(),

                ]
            ),
            'title' => $this->title,
            'guest_name' => $this->guest_name,
            'vimeo_preview_url' => $this->vimeo_preview_url,
            'has_preview' => (bool) $this->vimeo_preview_url,
            'duration' => $this->duration,
            'dripped' => (bool) $this->dripped_at > now(),
            $this->mergeWhen(
                $this->relationLoaded('enrolledUsers'),
                fn () => [
                    'locked' => $this->course->strict ? ! $this->hasEnrolledInUser($user->id) : false,
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
            'duration_watched' => $this->when(
                $this->relationLoaded('progress'),
                fn () => (float) $this->progress?->progress
            ),
            'is_new' => $this->whenLoaded('lessons', function () {
                return $this->lessons->isEmpty() || $this->lessons->every(function ($lesson) {
                        return !$lesson->progress;
                    });
            }),
        ];
    }
}
