<?php

namespace App\Http\Middleware;

use App\Models\Lesson;
use Closure;
use Illuminate\Http\Request;

class ShouldEnrolledInLessonMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        $lessonId = is_object($request->route('lesson'))
        ? $request->route('lesson')->id
        : $request->route('lesson');

        $course = Lesson::find($lessonId)->course;

        if (! $course->strict) {
            return $next($request);
        }

        if (_user()->hasEnrolledInLesson($lessonId)) {
            return $next($request);
        }

        return to_route('courses.play', $course->id)->with('info', __('You have to enrolled in the lesson first.'));
    }
}
