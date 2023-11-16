<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class ShouldEnrolledInLessonMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        $lessonId = is_object($request->route('lesson'))
        ? $request->route('lesson')->id
        : $request->route('lesson');

        if (_user()->hasEnrolledInLesson($lessonId)) {
            return $next($request);
        }

        return back()->with('info', __('You have to enrolled in the lesson first.'));
    }
}
