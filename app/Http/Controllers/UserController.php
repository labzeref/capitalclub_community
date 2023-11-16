<?php

namespace App\Http\Controllers;

use App\Http\Resources\User\UserCompactResource;
use App\Http\Resources\User\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Response;
use Inertia\ResponseFactory;

class UserController extends Controller
{
    /**
     * Show the other user public profile screen
     *
     * @return Response|ResponseFactory
     */
    public function profile(User $user)
    {
        _user()->load('followingUsers');
        $profile = new UserCompactResource($user->load(['badges', 'socialMedia']));

        return inertia('Discussion/UserPublicProfile', compact('profile'));
    }

    public function getAuthUser(Request $request)
    {
        $user = _user();

        $loads = $request->get('loads', []);

        if (is_array($loads)) {
            if (in_array('billingAddress', $loads)) {
                $user->load('billingAddress');
            }
        }

        return $this->sendResponse(new UserResource($user));
    }
}
