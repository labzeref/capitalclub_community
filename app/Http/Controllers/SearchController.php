<?php

namespace App\Http\Controllers;

use App\Http\Requests\SearchRequest;
use App\Http\Resources\Asset\CategoryResource;
use App\Http\Resources\CourseResource;
use App\Http\Resources\Instructor\InstructorResource;
use App\Http\Resources\LiveStreamResource;
use App\Models\Asset\Category;
use App\Models\Course;
use App\Models\Instructor;
use App\Models\LiveSeries;
use App\Models\LiveStream;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function index(Request $request)
    {
        $courses = CourseResource::collection(
            Course::inRandomOrder()
                ->withCount('lessons')
                ->take(20)
                ->get()
        );

        $categories = CategoryResource::collection(
            Category::setEagerLoads([])->get()
        );

        return inertia('Academy/Search', compact(['courses', 'categories']));
    }

    public function data(SearchRequest $request)
    {
        $response = [];

        if ($request->type == 'academy') {
            if ($request->instructor_ids) {
                $instructor_courses_ids = Instructor::query()
                    ->whereIn('id', $request->instructor_ids)
                    ->with('courses')
                    ->get()
                    ->pluck('courses')
                    ->flatten()
                    ->pluck('id')
                    ->toArray();
            } else {
                $instructor_courses_ids = null;
            }

            $courses = Course::search($request->query)
                ->query(
                    fn ($query) => $query
                        ->when(
                            $instructor_courses_ids,
                            fn () => $query->whereIn('id', $instructor_courses_ids)
                        )
                        ->when($request->category_ids,
                            fn ($query) => $query->withWhereHas(
                                'category',
                                fn ($query) => $query->whereIn('id', $request->category_ids)
                            )
                        )
                        ->withCount('lessons')
                )
                ->paginate(20);

            $response = CourseResource::collection($courses);
        } elseif ($request->type == 'live-training') {
            if ($request->instructor_ids) {
                $instructorLiveSeriesIds = Instructor::query()
                    ->whereIn('id', $request->instructor_ids)
                    ->with('liveSeries')
                    ->get()
                    ->pluck('liveSeries')
                    ->flatten()
                    ->pluck('id')->unique()
                    ->toArray();

            } else {
                $instructorLiveSeriesIds = null;
            }
            //                return $instructorLiveSeriesIds;
            $liveSeries_ids = LiveSeries::search('RECRUITER')
                ->query(
                    fn ($query) => $query->when(
                        $instructorLiveSeriesIds,
                        fn ($query) => $query->whereIn('id', $instructorLiveSeriesIds)
                    )
                )
                ->get()->pluck('id');

            $liveStreams = LiveStream::with('liveSeries.instructors')->whereIn('live_series_id', $liveSeries_ids)->paginate(20);
            $response = LiveStreamResource::collection($liveStreams)->resource;
        }

        return $this->sendResponse($response);
    }

    public function instructors(Request $request)
    {
        $query = $request->input('query') ?? '';

        $response = InstructorResource::collection(
            Instructor::search($query)->get()
        );

        return $this->sendResponse($response);
    }
}
