<?php

namespace App\Http\Controllers;

use App\Http\Requests\ReportRequest;
use App\Models\Post;
use App\Models\PostComment;
use App\Models\StreamMessage;
use Illuminate\Support\Facades\DB;

class ReportController extends Controller
{
    public function post(Post $post, ReportRequest $request)
    {
        if ($post->reports()->where('user_id', _user()->id)->exists()) {
            return $this->sendError(__('You have reported this post already'));
        }

        DB::beginTransaction();

        try {
            $post->reports()->create($request->validated() + ['user_id' => _user()->id]);

            if (! $post->reported) {
                $post->update([
                    'reported' => true,
                    'reported_at' => now(),
                ]);
            }
        } catch (\Throwable $throwable) {
            DB::rollBack();

            return $this->sendError(_serverErrorMessage());
        }

        DB::commit();

        return $this->sendResponse([], __('Post reported successfully'));
    }

    public function postComment(PostComment $postComment, ReportRequest $request)
    {
        if ($postComment->reports()->where('user_id', _user()->id)->exists()) {
            return $this->sendError(__('You have reported this comment already'));
        }

        DB::beginTransaction();

        try {
            $postComment->reports()->create($request->validated() + ['user_id' => _user()->id]);

            if (! $postComment->reported) {
                $postComment->update([
                    'reported' => true,
                    'reported_at' => now(),
                ]);
            }
        } catch (\Throwable $throwable) {
            DB::rollBack();

            return $this->sendError(_serverErrorMessage());
        }

        DB::commit();

        return $this->sendResponse([], __('Comment reported successfully'));
    }

    public function streamMessage(StreamMessage $streamMessage, ReportRequest $request)
    {
        if ($streamMessage->reports()->where('user_id', _user()->id)->exists()) {
            return $this->sndError(__('You have reported this comment already'));
        }
        DB::beginTransaction();

        try {
            $streamMessage->reports()->create($request->validated() + ['user_id' => _user()->id]);

            //            if (! $streamMessage->reported) {
            //                $streamMessage->update([
            //                    'reported' => true,
            //                    'reported_at' => now(),
            //                ]);
            //            }

        } catch (\Throwable $throwable) {
            DB::rollBack();

            return $this->sendServerError();
        }

        DB::commit();

        return $this->sendResponse([], __('Message reported successfully'));
    }
}
