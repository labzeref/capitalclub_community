<?php

namespace App\Http\Controllers;

use App\Http\Requests\PostComment\PostCommentRequest;
use App\Http\Resources\PostCommentResource;
use App\Http\Resources\ReactionResource;
use App\Models\Post;
use App\Models\PostComment;

class PostCommentController extends Controller
{
    public function index(Post $post)
    {
        $response = PostCommentResource::collection(
            $post->comments()
                ->with([
                    'user.badges',
                    'reactions',
                    'replies' => fn ($query) => $query->with(['user.badges', 'reactions'])->withCount('reactions')->orderBy('id')])
                ->withCount('reactions')
                ->orderBy('id')
                ->paginate(100)
        )->resource;

        return $this->sendResponse($response);
    }

    public function store(PostCommentRequest $request)
    {
        $user = $request->user();

        $comment = PostComment::create([
            'post_id' => $request->post_id,
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
            ])->loadCount('reactions');
            logActivity(
                causedBy: $user,
                performedOn: $comment,
                log: "You have commented on post by <span class='activity-text'>{$comment->post->user->full_name}</span>."
            );
        }

        $response = new PostCommentResource($comment);

        return $this->sendResponse($response);
    }

    public function reactions(PostComment $postComment)
    {
        $reactions = $postComment->reactions()->with('user')->get();
        $response = ReactionResource::collection($reactions);

        return $this->sendResponse($response);
    }
}
