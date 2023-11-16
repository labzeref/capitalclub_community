<?php

namespace App\Http\Controllers;

use App\Models\Thread;
use App\Models\User;

class ToggleFollowController extends Controller
{
    public function thread(Thread $thread)
    {
        $user = _user();

        if ($thread->user_id == $user->id) {
            return $this->sendError(__('Can not follow your own thread'));
        }

        if ($user->followingThreads()->find($thread->id)) {
            $user->followingThreads()->detach($thread->id);
            $message = __('Thread unfollowed');
            logActivity(
                causedBy: $user,
                performedOn: $thread,
                log: "You have unfollow the thread <span class='activity-text'>{$thread->user->full_name}</span>.");
        } else {
            $user->followingThreads()->attach($thread->id);
            $message = __('Thread followed');
            logActivity(
                causedBy: $user,
                performedOn: $thread,
                log: "You have follow the thread <span class='activity-text'>{$thread->user->full_name}</span>.");
        }

        return $this->sendResponse($message);
    }

    public function user(User $user)
    {
        $authUser = _user();

        if ($authUser->id == $user->id) {
            return $this->sendError(__('Can not follow your self'));
        }
        if ($authUser->followingUsers()->find($user->id)) {
            $authUser->followingUsers()->detach($user->id);
            $message = __('User unfollowed');
            logActivity(
                causedBy: $user,
                performedOn: $user,
                log: "You have unfollowed other user <span class='activity-text'>$user->full_name</span>.");
        } else {
            $authUser->followingUsers()->attach($user->id);
            $message = __('User followed');
            logActivity(
                causedBy: $user,
                performedOn: $user,
                log: "You have follow other user <span class='activity-text'>$user->full_name</span>.");
        }

        return $this->sendResponse($message);
    }
}
