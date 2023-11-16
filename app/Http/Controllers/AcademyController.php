<?php

namespace App\Http\Controllers;

use App\Http\Resources\CourseResource;
use App\Models\Course;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;
use Inertia\Response;
use Inertia\ResponseFactory;

class AcademyController extends Controller
{
    /**
     * Show the academy page
     *
     * @return Response
     */
    public function __invoke()
    {
        $featuredCourses = CourseResource::collection(Course::featured()->get());

        $generalCourses = CourseResource::collection(
            Course::query()
                ->where('title', '!=', 'DATA SETS')
                ->where('title', '!=', 'MONEY TALKS')
                ->where('title', '!=', 'ENTREPRENEUR FIT')
                ->where('title', '!=', 'TIKTOK DROPSHIPPING BOOTCAMP')
                ->withCount('lessons')
                ->orderBy('id')
                ->get()
        );

        $tiktokDropShippingBootcamp = new CourseResource(
            Course::query()
                ->where('title', 'TIKTOK DROPSHIPPING BOOTCAMP')
                ->with('lessons')
                ->first()
        );

        $moneyTalkCourse = new CourseResource(
            Course::where('title', 'MONEY TALKS')->with('lessons')->first()
        );

        $entrepreneurCourse = new CourseResource(
            Course::where('title', 'ENTREPRENEUR FIT')->with('lessons')->first()
        );

        return inertia('Academy/Academy', compact([
            'featuredCourses',
            'generalCourses',
            'moneyTalkCourse',
            'entrepreneurCourse',
            'tiktokDropShippingBootcamp',
        ]));
    }
}
