<?php

namespace App\Http\Controllers;

use App\Http\Resources\CourseCompactResource;
use App\Http\Resources\CourseResource;
use App\Http\Resources\Lesson\LessonCompactResource;
use App\Models\Course;
use App\Models\Lesson;
use Inertia\Response;

class AcademyController extends Controller
{
    /**
     * Show the academy page
     *
     * @return Response
     */
    public function __invoke()
    {
        $featuredCourses = CourseCompactResource::collection(Course::featured()->get());

        $generalCourses = CourseCompactResource::collection(
            Course::query()
                ->where('exclusive', '=', 'FALSE')
                ->where('is_coming_soon', '=' , 'FALSE')
                ->orderBy('id')
                ->get()
        );

        $exclusiveCourses = CourseCompactResource::collection(
            Course::query()
                ->where('exclusive', '=', 'TRUE')
                ->where('is_coming_soon', '=' , 'FALSE')
                ->orderBy('id')
                ->get()
        );

        $moneyTalkCourse = new CourseResource(
            Course::query()
                ->where('title', 'MONEY TALKS')
                ->where('is_coming_soon', '=' , 'FALSE')
                ->with('lessons')
                ->first()
        );

        $continueWatch = LessonCompactResource::collection(
            Lesson::with('progress')
                ->whereHas('progress', function ($query) {
                $query->where('progress', '<=', 95.00)
                    ->where('user_id', auth()->id());
            })->get()
        );

        $comingSoonCourses = CourseCompactResource::collection(
            Course::query()
                ->Upcoming()
                ->where('is_coming_soon', '=' , 'TRUE')
                ->orderBy('id')
                ->get()
        );

        return inertia('Academy/Academy', compact([
            'featuredCourses',
            'generalCourses',
            'moneyTalkCourse',
            'exclusiveCourses',
            'continueWatch',
            'comingSoonCourses',
        ]));
    }
}
