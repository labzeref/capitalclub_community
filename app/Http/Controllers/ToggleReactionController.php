<?php

namespace App\Http\Controllers;

use App\Http\Requests\ToggleReactionRequest;
use App\Http\Resources\ThreadCommentResource;
use App\Models\ThreadComment;
use Illuminate\Http\JsonResponse;
use Maize\Markable\Exceptions\InvalidMarkValueException;
use Maize\Markable\Models\Reaction;

class ToggleReactionController extends Controller
{
    /**
     * Toggle the reaction of a thread comment
     *
     * @return JsonResponse
     */
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

        } else {

        }

        return $this->sendResponse($response);
    }

    /**
     * Toggle the reaction of a modal
     *
     * @throws InvalidMarkValueException
     */
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

    /**
     * Remove the reaction of a modal
     */
    private function removeReactions($reactionsArray, $model): void
    {
        foreach ($reactionsArray as $reaction) {
            if (Reaction::has($model, _user(), $reaction)) {
                Reaction::remove($model, _user(), $reaction);
            }
        }
    }
}
