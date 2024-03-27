<?php

namespace App\Http\Controllers;

use App\Http\Resources\CourseResource;
use App\Http\Resources\User\UserCompactResource;
use App\Models\Course;
use App\Models\Instructor;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Inertia\Response;
use Inertia\ResponseFactory;

class CourseController extends Controller
{
    /**
     * Show the course preview screen
     *
     * @return RedirectResponse|Response|ResponseFactory
     */
    public function preview(Request $request, Course $course)
    {
        $hasEnrolledInCourse = _user()->hasEnrolledInCourse($course->id);
//
//        if ($hasEnrolledInCourse && !$request->input('byPass')) {
//            return to_route('courses.play', $course->id);
//        }

        $courseModulesCount = $course->lessons->pluck('module')->unique()->count();

        $course = new CourseResource(
            $course->load([
                'lessons' => fn($lessons) => $lessons->orderBy('module_id')->orderBy('serial_number')->with([
                    'progress' => fn($progress) => $progress->where('user_id', _user()->id)
                ]),
                'trailer',
                'defaultInstructor'
            ])
        );

        $instructorUser = User::find($course->defaultInstructor->user_id);

        $instructorAvatar = $instructorUser
            ? $instructorUser->getFirstMedia('dp')
                ? _getSignedUrl($instructorUser->getFirstMediaPath('dp'))
                : _defaultDp()
            : null;

        return inertia('Academy/Course', compact([
            'course',
            'hasEnrolledInCourse',
            'courseModulesCount',
            'instructorAvatar'
        ]));
    }

    /**
     * Enroll the user and navigate to lesson play screen
     *
     * @return RedirectResponse
     */
    public function enrol(Course $course)
    {
        $user = _user();
        $hasEnrolledInCourse = $user->hasEnrolledInCourse($course->id);

        if (!$hasEnrolledInCourse) {
            DB::beginTransaction();

            try {
                $user->enrolledInCourse($course);
            } catch (\Throwable $throwable) {
                DB::rollBack();

                return back()->with('error', _serverErrorMessage());
            }

            DB::commit();
        }

        return to_route('courses.play', $course->id);
    }

    /**
     * Play the course and start the lesson where user was left
     * and navigate to lesson play screen
     *
     * @return RedirectResponse
     */
    public function play(Course $course)
    {
        if ($course->strict) {
            $lastUnlockedLessonId = _user()->enrolledLessons()
                ->wherePivot('course_id', $course->id)
                ->orderBy('id', 'desc')
                ->value('id');
        } else {
            $lastUnlockedLessonId = _user()->getLastVisitLessonId(courseId: $course->id);
        }

        return to_route('lessons.play', $lastUnlockedLessonId);
    }
}
