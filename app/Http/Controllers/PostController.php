<?php

namespace App\Http\Controllers;

use App\Enums\PostStatusEnum;
use App\Enums\PostTypeEnum;
use App\Http\Requests\Post\PostRequest;
use App\Http\Requests\Post\PostSelectChoiceRequest;
use App\Http\Resources\PostResource;
use App\Http\Resources\ReactionResource;
use App\Jobs\CreatePostJob;
use App\Models\Chunk;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PostController extends Controller
{
    public function index(Request $request)
    {
        $user = _user();

        if ($request->has('following')) {
            $followingUserIds = $user->followingUsers()->get()->pluck('id')->toArray();
            $postQuery = Post::whereIn('user_id', $followingUserIds);
        } elseif ($request->has('bookmarked')) {
            $postQuery = $user->bookmarkedPosts();
        } else {
            $postQuery = Post::query();
        }

        $response = PostResource::collection(
            $postQuery->with([
                'user' => ['badges' => fn ($query) => $query->orderBy('badges.weight')->take(1)],
                'reactions',
                'choices',
            ])
                ->withCount(['comments', 'reactions'])
                ->latest('id')
                ->paginate(30)
        )->resource;

        return $this->sendResponse($response);
    }

    public function store(PostRequest $request)
    {
        $user = _user();
        $chunk = Chunk::where('key', $request->media_key)->first();

        DB::beginTransaction();

        try {
            $data = $request->only(['title', 'type']) + [
                'status' => PostStatusEnum::approve,
            ];

            if ($request->type == PostTypeEnum::poll->name) {
                $data = array_merge($data, $request->only('poll_duration_name'));
            }

            if ($request->has('schedule_at')) {
                $data = array_merge($data, [
                    'schedule_at' => $request->schedule_at,
                    'published' => false,
                ]);
            } else {
                $data = array_merge($data, [
                    'published' => true,
                    'published_at' => now(),
                ]);
            }

            if ($chunk && ! $chunk->singular) {
                dispatch(new CreatePostJob($user->id, $data, $request->media_key));
                $response = [];
                $message = __('Your post will be posted soon.');

            } else {
                $post = _user()->posts()->create($data);

                if (
                    in_array($request->type, [PostTypeEnum::image->name, PostTypeEnum::video->name])
                    && $request->media_key
                ) {
                    if ($request->type == PostTypeEnum::video->name) {
                        $post->addMedia($chunk->combineAndGetPath())->toMediaCollection('video');
                    } elseif ($request->type == PostTypeEnum::image->name) {
                        $post->addMedia($chunk->combineAndGetPath())->toMediaCollection('image');
                    }
                }

                if ($request->type == PostTypeEnum::poll->name) {
                    foreach ($request->poll_choices as $choice) {
                        $post->choices()->create([
                            'value' => $choice,
                        ]);
                    }

                    $post->load('choices');
                }

                $response = new PostResource($post->load([
                    'media',
                    'reactions',
                    'user' => ['badges' => fn ($query) => $query->orderBy('badges.weight', 'desc')->take(1)],
                ]));
                $message = __('Post created successfully.');
                logActivity(causedBy: $user, performedOn: $post, log: 'You create a post.');
                $chunk?->delete();
            }
        } catch (\Throwable $throwable) {
            DB::rollBack();

            $chunk?->deleteDownloadedFiles();

            return $this->sendError(_serverErrorMessage());
        }

        DB::commit();

        return $this->sendResponse($response, $message);
    }

    public function show(Post $post)
    {
        $response = new PostResource($post->load(['media', 'user']));

        $this->sendResponse($response);
    }

    public function destroy(Post $post)
    {
        logActivity(causedBy: _user(), performedOn: $post, log: 'You delete a post.');
        $post->delete();

        return $this->sendResponse([], __('Post deleted successfully.'));
    }

    public function selectChoice(PostSelectChoiceRequest $request, Post $post)
    {
        if ($post->pollExistForUser(_user()->id)) {
            return $this->sendError('You have already polled.');
        }

        DB::beginTransaction();

        try {
            $post->polling()->create([
                'choice_id' => $request->choice_id,
                'user_id' => _user()->id,
            ]);

            $post->updateChoicesPollPercentage();
        } catch (\Throwable $throwable) {
            DB::rollBack();

            return $this->sendError(_serverErrorMessage());
        }

        DB::commit();

        $response = new PostResource(
            $post->load(['user', 'choices'])->loadCount(['comments', 'reactions'])
        );

        return $this->sendResponse($response);
    }

    public function reactions(Post $post)
    {
        $reactions = $post->reactions()->with('user')->get();
        $response = ReactionResource::collection($reactions);

        return $this->sendResponse($response);
    }
}
