<?php

namespace App\Http\Controllers;

use App\Http\Requests\ThreadCommentRequest;
use App\Http\Resources\ReactionResource;
use App\Http\Resources\ThreadCommentResource;
use App\Models\Thread;
use App\Models\ThreadComment;
use Illuminate\Http\JsonResponse;

class ThreadCommentController extends Controller
{
    /**
     * Get the all comments of a thread
     *
     * @return JsonResponse
     */
    public function index(Thread $thread)
    {
        $response = ThreadCommentResource::collection(
            $thread->comments()
                ->with([
                    'user.badges',
                    'reactions',
                    'replies' => fn ($query) => $query->with(['user', 'reactions'])->withCount('reactions')->orderBy('id'),
                ])
                ->withCount('reactions')
                ->orderBy('id')
                ->paginate(5)
        )->resource;

        return $this->sendResponse($response);
    }

    /**
     * Store the comment for a thread
     *
     * @return JsonResponse
     */
    public function store(ThreadCommentRequest $request)
    {
        $user = $request->user();

        $comment = ThreadComment::create([
            'thread_id' => $request->thread_id,
            'user_id' => $user->id,
            'parent_id' => $request->parent_comment_id,
            'value' => $request->comment,
        ]);

        if ($request->parent_comment_id) {
            $comment->load(['user.badges', 'reactions'])->loadCount('reactions');

        } else {
            $comment->load([
                'user.badges',
                'reactions',
                'replies' => fn ($query) => $query->with(['user.badges', 'reactions'])->withCount('reactions')->orderBy('id'),
            ])
                ->loadCount('reactions');

        }

        $response = new ThreadCommentResource($comment);

        return $this->sendResponse($response);
    }

    /**
     * Store the reaction for thread comment
     *
     * @return JsonResponse
     */
    public function reactions(ThreadComment $threadComment)
    {
        $reactions = $threadComment->reactions()->with('user')->get();
        $response = ReactionResource::collection($reactions);

        return $this->sendResponse($response);
    }
}
