<?php

namespace App\Http\Controllers;

use App\Models\Thread;
use App\Models\User;
use Illuminate\Http\JsonResponse;

class ToggleFollowController extends Controller
{
    /**
     * Toggle the follow of a thread
     *
     * @return JsonResponse
     */
    public function thread(Thread $thread)
    {
        $user = _user();

        if ($thread->user_id == $user->id) {
            return $this->sendError(__('Can not follow your own thread'));
        }

        if ($user->followingThreads()->find($thread->id)) {
            $user->followingThreads()->detach($thread->id);
            $message = __('Thread unfollowed');

        } else {
            $user->followingThreads()->attach($thread->id);
            $message = __('Thread followed');

        }

        return $this->sendResponse($message);
    }

    /**
     * Toggle the follow of a user
     *
     * @return JsonResponse
     */
    public function user(User $user)
    {
        $authUser = _user();

        if ($authUser->id == $user->id) {
            return $this->sendError(__('Can not follow your self'));
        }
        if ($authUser->followingUsers()->find($user->id)) {
            $authUser->followingUsers()->detach($user->id);
            $message = __('User unfollowed');

        } else {
            $authUser->followingUsers()->attach($user->id);
            $message = __('User followed');

        }

        return $this->sendResponse($message);
    }
}
