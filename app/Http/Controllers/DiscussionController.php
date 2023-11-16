<?php

namespace App\Http\Controllers;

use App\Http\Resources\PostResource;
use App\Http\Resources\User\UserCompactResource;
use App\Http\Resources\User\UserResource;
use App\Models\Post;
use App\Models\User;

class DiscussionController extends Controller
{
    public function index()
    {
        $posts = PostResource::collection(
            Post::with(['user', 'choices'])
                ->withCount(['comments', 'reactions'])
                ->latest('id')
                ->get()
        );

        $postPollDurations = array_values(array_flip(config('constant.postPollDurations')));
        $profile = new UserResource(_user()->load(['socialMedia', 'badges']));
        $topRankMembers = UserCompactResource::collection(
            User::topRank()->get()
        );

        $chunkSize = config('chunk.size');

        return inertia('Discussion/Discussion', compact([
            'posts',
            'profile',
            'postPollDurations',
            'topRankMembers',
            'chunkSize',
        ]));
    }
}
