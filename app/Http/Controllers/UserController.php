<?php

namespace App\Http\Controllers;

use App\Http\Resources\User\UserCompactResource;
use App\Models\Chat\Conversation;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    public function profile(User $user)
    {
        _user()->load('followingUsers');
        $profile = new UserCompactResource($user->load(['badges', 'socialMedia']));

        return inertia('Discussion/UserPublicProfile', compact('profile'));
    }

    public function message(User $user)
    {
        DB::beginTransaction();

        try {
            $conversationId = Conversation::start(_user()->id, $user->id)->id;
            $activeConversationId = encrypt($conversationId);
        } catch (\Throwable $throwable) {
            DB::rollBack();

            return back()->with('error', _serverErrorMessage());
        }

        DB::commit();

        return to_route('chat.index', $activeConversationId);
    }
}
