<?php

namespace App\Http\Controllers;

use App\Http\Requests\ToggleReactionRequest;
use App\Http\Resources\Chat\MessageResource;
use App\Http\Resources\PostCommentResource;
use App\Http\Resources\PostResource;
use App\Http\Resources\ThreadCommentResource;
use App\Models\Chat\Message;
use App\Models\Post;
use App\Models\PostComment;
use App\Models\ThreadComment;
use App\Notifications\PostReactionNotification;
use Maize\Markable\Models\Reaction;

class ToggleReactionController extends Controller
{
    public function post(ToggleReactionRequest $request, Post $post)
    {
        $user = $request->user();
        $reacted = $this->toggleReaction($request, $post);

        $response = new PostResource(
            $post->load([
                'user' => ['badges' => fn ($query) => $query->orderBy('badges.weight')->take(1)],
                'reactions',
                'choices',
            ])->loadCount(['comments', 'reactions'])
        );

        $post->user->notify(new PostReactionNotification($user));

        if ($reacted) {
            logActivity(
                causedBy: $user,
                performedOn: $post,
                log: "You have reacted on post by <span class='activity-text'>{$post->user->full_name}</span>."
            );
        } else {
            logActivity(
                causedBy: $user,
                performedOn: $post,
                log: "User has remove reaction on post by <span class='activity-text'>{$post->user->full_name}</span>."
            );
        }

        return $this->sendResponse($response);
    }

    public function postComment(ToggleReactionRequest $request, PostComment $postComment)
    {
        $user = $request->user();
        $reacted = $this->toggleReaction($request, $postComment);

        if ($postComment->parent_id) {
            $response = new PostCommentResource(
                $postComment->load(['user', 'reactions'])
                    ->loadCount('reactions')
            );
        } else {
            $response = new PostCommentResource(
                $postComment->load([
                    'user',
                    'reactions',
                    'replies' => fn ($query) => $query->with(['user', 'reactions'])->withCount('reactions')->orderBy('id'),
                ])
                    ->loadCount('reactions')
            );
        }

        /**
         * Checking comment is reply or parent comment
         */
        $userName = $postComment->parent_id
            ? $postComment->parent->post->user->full_name
            : $postComment->post->user->full_name;

        if ($reacted) {
            logActivity(
                causedBy: $user,
                performedOn: $postComment,
                log: "You have reacted on comment of post <span class='activity-text'>$userName</span>."
            );
        } else {
            logActivity(
                causedBy: $user,
                performedOn: $postComment,
                log: "You have remove reaction on comment of post <span class='activity-text'>$userName</span>."
            );
        }

        return $this->sendResponse($response);
    }

    public function threadComment(ToggleReactionRequest $request, ThreadComment $threadComment)
    {
        $user = $request->user();
        $reacted = $this->toggleReaction($request, $threadComment);

        if ($threadComment->parent_id) {
            $response = new ThreadCommentResource(
                $threadComment->load(['user', 'reactions'])
                    ->loadCount('reactions')
            );
        } else {
            $response = new ThreadCommentResource(
                $threadComment->load([
                    'user',
                    'reactions',
                    'replies' => fn ($query) => $query->with(['user', 'reactions'])->withCount('reactions')->orderBy('id'),
                ])
                    ->loadCount('reactions')
            );
        }

        /**
         * Checking comment is reply or parent comment
         */
        $userName = $threadComment->parent_id
            ? $threadComment->parent->thread->user->full_name
            : $threadComment->thread->user->full_name;

        if ($reacted) {
            logActivity(
                causedBy: $user,
                performedOn: $threadComment,
                log: "You have reacted on comment of thread <span class='activity-text'>$userName</span>."
            );
        } else {
            logActivity(
                causedBy: $user,
                performedOn: $threadComment,
                log: "You have removed reaction on comment of thread <span class='activity-text'>$userName</span>."
            );
        }

        return $this->sendResponse($response);
    }

    public function message(ToggleReactionRequest $request, Message $message)
    {
        $this->toggleReaction($request, $message);

        $response = new MessageResource($message);

        return $this->sendResponse($response);

    }

    private function toggleReaction($request, $model): bool
    {
        $reactionsArray = config('markable.allowed_values.reaction');

        if (Reaction::has($model, _user(), $request->reaction)) {
            $this->removeReactions($reactionsArray, $model);

            return false;
        } else {
            $this->removeReactions($reactionsArray, $model);
            Reaction::add($model, _user(), $request->reaction);

            return true;
        }
    }

    private function removeReactions($reactionsArray, $model): void
    {
        foreach ($reactionsArray as $reaction) {
            if (Reaction::has($model, _user(), $reaction)) {
                Reaction::remove($model, _user(), $reaction);
            }
        }
    }
}
