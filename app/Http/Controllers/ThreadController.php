<?php

namespace App\Http\Controllers;

use App\Http\Requests\ThreadsRequest;
use App\Http\Resources\CourseResource;
use App\Http\Resources\ThreadResource;
use App\Http\Resources\User\UserResource;
use App\Models\Course;
use App\Models\Thread;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Response;
use Inertia\ResponseFactory;

class ThreadController extends Controller
{
    /**
     * Get the all threads
     *
     * @return JsonResponse
     */
    public function index(Request $request, Course $course)
    {
        $user = _user();

        // This is for checking in the resource that user has followed the thread or not
        $user->load('followingThreads');

        if ($request->has('following')) {
            $threadQuery = $user->followingThreads()->where('course_id', $course->id);
        } else {
            $threadQuery = $course->threads();
        }

        $topRankMemberIdsArray = User::topRank()->take(3)->pluck('id')->toArray();

        $response = ThreadResource::collection(
            $threadQuery->with([
                'user.badges',
                'followers' => fn ($query) => $query->whereIn('id', $topRankMemberIdsArray),
            ])
                ->withCount(['comments', 'followers'])
                ->latest('id')
                ->paginate(5)
        )->resource;

        return $this->sendResponse($response);
    }

    /**
     * Show the threa view screen
     *
     * @return Response|ResponseFactory
     */
    public function view(Thread $thread)
    {
        /**
         * This is for checking in the resource that user has followed the thread or not
         */
        _user()->load('followingThreads');

        $thread = new ThreadResource($thread->load('user.badges')->loadCount('comments'));
        $course = new CourseResource($thread->course);
        $topRankMembers = UserResource::collection(
            User::query()
                ->whereHas('enrolledCourses', fn ($query) => $query->where('id', $course->id))
                ->topRank()
                ->get()
        );

        return inertia('Academy/Thread', compact(['thread', 'course', 'topRankMembers']));
    }

    /**
     * Create the thread
     *
     * @return JsonResponse
     */
    public function store(ThreadsRequest $request, Course $course)
    {
        $user = _user();
        $thread = $course->threads()->create($request->validated() + ['user_id' => $user->id]);
        $response = new ThreadResource($thread->load('user.badges')->loadCount(['comments', 'followers']));

        return $this->sendResponse($response, __('Thread created successfully.'));
    }
}
