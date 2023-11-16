<?php

namespace App\Http\Controllers;

use App\Http\Requests\ReportRequest;
use App\Models\StreamMessage;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class ReportController extends Controller
{
    /**
     * Report the message of live training chat
     *
     * @return JsonResponse
     */
    public function streamMessage(StreamMessage $streamMessage, ReportRequest $request)
    {
        if ($streamMessage->reports()->where('user_id', _user()->id)->exists()) {
            return $this->sendError(__('You have reported this comment already'));
        }
        DB::beginTransaction();

        try {
            $streamMessage->reports()->create($request->validated() + ['user_id' => _user()->id]);
        } catch (\Throwable $throwable) {
            DB::rollBack();

            return $this->sendError([], _serverErrorMessage());
        }

        DB::commit();

        return $this->sendResponse([], __('Message reported successfully'));
    }
}
