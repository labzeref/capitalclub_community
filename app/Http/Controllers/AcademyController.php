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
                ->where('title', '!=', 'MASTER THE ART OF PERFORMANCE CREATIVE')
                ->where('title', '!=', 'MONEY TALKS')
                ->where('title', '!=', 'ENTREPRENEUR FIT')
                ->where('title', '!=', 'TIKTOK DROPSHIPPING BOOTCAMP')
                ->where('title', '!=', 'CREATE. MULTIPLY. PRESERVE.')
                ->where('title', '!=', 'Confessions of a Central Banker')
                ->withCount('lessons')
                ->orderBy('id')
                ->get()
        );

        $exclusiveCourses = CourseResource::collection(
            Course::query()
                ->whereIn('title', [
                    'Confessions of a Central Banker',
                    'CREATE. MULTIPLY. PRESERVE.'
                ])
                ->orderBy('id','desc')
                ->get()
        );

        $moneyTalkCourse = new CourseResource(
            Course::query()
                ->where('title', 'MONEY TALKS')
                ->with([
                    'lessons' => fn($lessons) => $lessons->with([
                        'progress' => fn($progress) => $progress->where('user_id', _user()->id)
                    ])
                ])
                ->first()
        );

        $exclusiveCourses2 = CourseResource::collection(
            Course::query()
                ->whereIn('title', [
                    'ENTREPRENEUR FIT',
                    'TIKTOK DROPSHIPPING BOOTCAMP',
                    'MASTER THE ART OF PERFORMANCE CREATIVE'
                ])
                ->orderByRaw("
                    CASE
                        WHEN title = 'TIKTOK DROPSHIPPING BOOTCAMP' THEN 1
                        WHEN title = 'ENTREPRENEUR FIT' THEN 2
                        WHEN title = 'MASTER THE ART OF PERFORMANCE CREATIVE' THEN 3
                    END
                ")
                ->get()
        );

        return inertia('Academy/Academy', compact([
            'featuredCourses',
            'generalCourses',
            'moneyTalkCourse',
            'exclusiveCourses',
            'exclusiveCourses2',
        ]));
    }
}
