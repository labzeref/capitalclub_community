<?php

namespace App\Http\Controllers;

use App\Http\Resources\CourseResource;
use App\Http\Resources\Instructor\InstructorResource;
use App\Models\Instructor;
use Inertia\Response;
use Inertia\ResponseFactory;

class InstructorProfileShowController extends Controller
{
    /**
     * Show the instructor profile screen
     *
     * @return Response|ResponseFactory
     */
    public function __invoke(Instructor $instructor)
    {
        $instructor = new InstructorResource(
            $instructor->load([
                'category',
                'courses' => fn ($query) => $query->withCount('lessons'),
            ])->loadCount('courses')
        );

        $courses = CourseResource::collection(
            $instructor->courses()->withCount('lessons')->get()
        );

        $relatedInstructors = InstructorResource::collection(
            Instructor::query()
                ->when(
                    $instructor->category,
                    fn ($instructors) => $instructors->withWhereHas(
                        'category', fn ($query) => $query->where('id', $instructor->category->id)
                    )
                )
                ->withCount('courses')
                ->get()
        );

        return inertia('Academy/Instructor', compact([
            'instructor',
            'relatedInstructors',
            'courses',
        ]));
    }
}
