<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Lesson;
use App\Models\LiveStream;
use App\Models\Post;
use Maize\Markable\Models\Bookmark;

class ToggleBookmarkController extends Controller
{
    public function course(Course $course)
    {
        $user = _user();
        Bookmark::toggle($course, $user);

        if (_user()->bookmarkedCourses->contains($course->id)) {
            logActivity(
                causedBy: $user,
                performedOn: $course,
                log: "You have bookmarked the course <span class='activity-text'>$course->title</span>."
            );
            $message = 'Course added to bookmark list.';
        } else {
            logActivity(
                causedBy: $user,
                performedOn: $course,
                log: "You have remove bookmarked course <span class='activity-text'>$course->title</span>."
            );
            $message = 'Course removed from bookmark list.';
        }

        return back()->with('success', __($message));
    }

    public function lesson(Lesson $lesson)
    {
        $user = _user();
        Bookmark::toggle($lesson, $user);

        if (_user()->bookmarkedLessons->contains($lesson->id)) {
            logActivity(
                causedBy: $user,
                performedOn: $lesson,
                log: "You have bookmarked the lesson <span class='activity-text'>$lesson->title</span>."
            );
            $message = 'Lesson added to bookmark list.';
        } else {
            logActivity(
                causedBy: $user,
                performedOn: $lesson,
                log: "You have remove bookmarked lesson <span class='activity-text'>$lesson->title</span>."
            );
            $message = 'Lesson removed from bookmark list.';
        }

        return back()->with('success', __($message));
    }

    public function post(Post $post)
    {
        $user = _user();
        Bookmark::toggle($post, $user);

        if (_user()->bookmarkedPosts->contains($post->id)) {
            logActivity(
                causedBy: $user,
                performedOn: $post,
                log: "User has bookmarked the post by <span class='activity-text'>{$post->user->full_name}</span>."
            );
            $message = 'Post added to bookmark list.';
        } else {
            logActivity(
                causedBy: $user,
                performedOn: $post,
                log: "User has bookmarked the post by <span class='activity-text'>{$post->user->full_name}</span>."
            );
            $message = 'Post removed from bookmark list.';
        }

        return $this->sendResponse([], __($message));
    }

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
