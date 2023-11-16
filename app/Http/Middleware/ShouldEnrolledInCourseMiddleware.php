<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class ShouldEnrolledInCourseMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        $courseId = is_object($request->route('course'))
            ? $request->route('course')->id
            : $request->route('course');

        if (_user()->hasEnrolledInCourse($courseId)) {
            return $next($request);
        }

        return to_route('courses.preview', $courseId)
            ->with('info', __('You have to enrolled in the course first.'));
    }
}
