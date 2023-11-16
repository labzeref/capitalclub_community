<?php

namespace App\Http\Controllers;

use App\Http\Resources\CourseResource;
use App\Http\Resources\User\UserCompactResource;
use App\Models\Course;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CourseController extends Controller
{
    public function preview(Request $request, Course $course)
    {
        $hasEnrolledInCourse = _user()->hasEnrolledInCourse($course->id);

        if ($hasEnrolledInCourse && ! $request->input('byPass')) {
            return to_route('lessons.play', $course->lessons()->orderBy('id')->value('id'));
        }

        $course = new CourseResource(
            $course->load(['lessons', 'faqs', 'trailer'])
        );

        $similarCourses = CourseResource::collection(
            Course::query()
                ->whereHas('category', fn ($query) => $query->where('id', $course->category->id))
                ->get()
        );

        $topRankMembers = UserCompactResource::collection(
            User::query()
                ->whereHas('enrolledCourses', fn ($query) => $query->where('id', $course->id))
                ->topRank()
                ->get()
        );

        return inertia('Academy/Course', compact([
            'course',
            'similarCourses',
            'hasEnrolledInCourse',
            'topRankMembers',
        ]));
    }

    public function enrol(Course $course)
    {
        $user = _user();
        $hasEnrolledInCourse = $user->hasEnrolledInCourse($course->id);

        if (! $hasEnrolledInCourse) {
            DB::beginTransaction();

            try {
                $user->enrolledInCourse($course);

                $firstLesson = $course->lessons()->orderBy('id')->first();

                logActivity(
                    causedBy: $user,
                    performedOn: $course,
                    log: "You have enrolled in course <span class='activity-text'>$course->title</smpan>."
                );
                logActivity(
                    causedBy: $user,
                    performedOn: $firstLesson,
                    log: "You have enrolled in lesson <span class='activity-text'>$firstLesson->title</smpan>."
                );
            } catch (\Throwable $throwable) {
                DB::rollBack();

                return back()->with('error', _serverErrorMessage());
            }

            DB::commit();
        }

        return to_route('lessons.play', $course->lessons()->orderBy('id')->value('id'));
    }

    public function play(Course $course)
    {
        $lastUnlockedLessonId = _user()->enrolledLessons()
            ->wherePivot('course_id', $course->id)
            ->orderBy('id', 'desc')
            ->value('id');

        return to_route('lessons.play', $lastUnlockedLessonId);
    }
}
