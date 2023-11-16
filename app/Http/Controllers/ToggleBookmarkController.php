<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Lesson;
use App\Models\LiveStream;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Maize\Markable\Models\Bookmark;

class ToggleBookmarkController extends Controller
{
    /**
     * Toggle the bookmark of course
     *
     * @return RedirectResponse
     */
    public function course(Course $course)
    {
        $user = _user();
        Bookmark::toggle($course, $user);

        if (_user()->bookmarkedCourses->contains($course->id)) {

            $message = 'Course added to bookmark list.';
        } else {

            $message = 'Course removed from bookmark list.';
        }

        return back()->with('success', __($message));
    }

    /**
     * Toggle the bookmark of lesson
     *
     * @param Lesson $lesson
     * @return JsonResponse
     */
    public function lesson(Lesson $lesson)
    {
        $user = _user();
        Bookmark::toggle($lesson, $user);

        if (_user()->bookmarkedLessons->contains($lesson->id)) {

            $message = 'Lesson added to your favorites.';
        } else {

            $message = 'Lesson removed from your favorites.';
        }

        return $this->sendResponse([], $message);
    }

    /**
     * Toggle the bookmark of live training
     *
     * @return RedirectResponse
     */
    public function liveStream(LiveStream $liveStream)
    {
        Bookmark::toggle($liveStream, _user());

        if (_user()->bookmarkedLiveStream->contains($liveStream->id)) {
            $message = 'Live training is added to bookmark list.';
        } else {
            $message = 'Live training removed from bookmark list.';
        }

        // return $this->sendResponse([], __($message));
        return back()->with('success', __($message));

    }
}
