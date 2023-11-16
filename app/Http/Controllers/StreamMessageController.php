<?php

namespace App\Http\Controllers;

use App\Events\MessageForLiveStreamEvent;
use App\Http\Requests\StreamMessageRequest;
use App\Http\Resources\StreamMessageResource;
use App\Models\LiveStream;
use Illuminate\Support\Facades\DB;

class StreamMessageController extends Controller
{
    public function storeChatLiveStream(StreamMessageRequest $request, LiveStream $liveStream)
    {
        if (! $liveStream->chat_enabled)
        {
            return $this->sendError(__('Sorry, it seems like chat is disabled'));
        }
        $user = _user();

        DB::beginTransaction();

        try {
            $streamMessage = $liveStream->streamMessages()->create([
                'value' => $request->value,
                'user_id' => $user->id,
                'send_at' => now(),
                'mentioned_message_id' => $request->mentioned_message_id ?? null,
            ]);

        } catch (\Throwable $throwable) {
            DB::rollBack();

            return $this->sendError(_serverErrorMessage());
        }

        DB::commit();

        $streamMessage->load('user', 'mentionedMessage.user');
        broadcast(new MessageForLiveStreamEvent($streamMessage, $liveStreamId, _user()->id));

        return $this->sendResponse(new StreamMessageResource($streamMessage));
    }
}
