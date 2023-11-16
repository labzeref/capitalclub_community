<?php

namespace App\Http\Controllers;

use App\Http\Resources\Asset\CategoryResource;
use App\Http\Resources\CourseResource;
use App\Http\Resources\Instructor\InstructorResource;
use App\Models\Asset\Category;
use App\Models\Course;
use App\Models\Instructor;

class AcademyController extends Controller
{
    public function __invoke()
    {
        $mainCourses = CourseResource::collection(
            Course::withCount('lessons')->inRandomOrder()->get()
        );
        $featuredCourses = CourseResource::collection(
            Course::featured()->withCount('lessons')->get()
        );
        $topInstructors = InstructorResource::collection(
            Instructor::withCount('courses')->get()
        );

        $newCourses = CourseResource::collection(
            Course::hasNewLessons()->withCount('lessons')->get()
        );

        $categoryWiseCourses = CategoryResource::collection(
            Category::featured()
                ->with(['courses' => fn ($query) => $query->withCount('lessons')])
                ->get()
        );

        $upcomingCourses = CourseResource::collection(
            Course::upcoming()->withCount('lessons')->get()
        );

        $generalCourses = CourseResource::collection(
            Course::query()
                ->withCount('lessons')
                ->orderBy('title')
                ->get()
        );

        return inertia('Academy/Academy', compact([
            'categoryWiseCourses',
            'mainCourses',
            'featuredCourses',
            'topInstructors',
            'newCourses',
            'upcomingCourses',
            'generalCourses',
        ]));
    }
}
