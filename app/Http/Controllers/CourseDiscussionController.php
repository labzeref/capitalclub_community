<?php

namespace App\Http\Controllers;

use App\Http\Resources\CourseResource;
use App\Http\Resources\User\UserCompactResource;
use App\Models\Course;
use App\Models\User;

class CourseDiscussionController extends Controller
{
    public function index(Course $course)
    {
        $course = new CourseResource($course);
        $topRankMembers = UserCompactResource::collection(
            User::query()
                ->whereHas('enrolledCourses', fn ($query) => $query->where('id', $course->id))
                ->topRank()
                ->get()
        );

        return inertia('Academy/Discussion', compact(['course', 'topRankMembers']));
    }
}
