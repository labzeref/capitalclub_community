<?php

namespace App\Http\Controllers;

use App\Http\Requests\ThreadCommentRequest;
use App\Http\Resources\ReactionResource;
use App\Http\Resources\ThreadCommentResource;
use App\Models\Thread;
use App\Models\ThreadComment;

class ThreadCommentController extends Controller
{
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
            logActivity(
                causedBy: $user,
                performedOn: $comment,
                log: "You have replyed on comment by <span class='activity-text'>{$comment->user->full_name}</span>."
            );
        } else {
            $comment->load([
                'user.badges',
                'reactions',
                'replies' => fn ($query) => $query->with(['user.badges', 'reactions'])->withCount('reactions')->orderBy('id'),
            ])
                ->loadCount('reactions');
            logActivity(
                causedBy: $user,
                performedOn: $comment,
                log: "You have commented on thread by <span class='activity-text'>{$comment->thread->user->full_name}</span>."
            );
        }

        $response = new ThreadCommentResource($comment);

        return $this->sendResponse($response);
    }

    public function reactions(ThreadComment $threadComment)
    {
        $reactions = $threadComment->reactions()->with('user')->get();
        $response = ReactionResource::collection($reactions);

        return $this->sendResponse($response);
    }
}
