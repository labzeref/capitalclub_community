<?php

namespace App\Http\Controllers\Chat;

use App\Events\MessageSentEvent;
use App\Http\Controllers\Controller;
use App\Http\Requests\Chat\MessageRequest;
use App\Http\Resources\Chat\MessageResource;
use App\Models\Chat\Conversation;
use Illuminate\Support\Facades\DB;

class MessageController extends Controller
{
    public function index($conversation)
    {
        $conversation = Conversation::find($conversation);
        if ($conversation->isNotParticipant(_user()->id)) {
            return $this->sendError(__('User is not participant to this conversation.'));
        }

        $response = MessageResource::collection(
            $conversation->messages()->orderBy('id')->paginate(100)
        )->resource;

        return $this->sendResponse($response);
    }

    public function store(MessageRequest $request, Conversation $conversation)
    {
        $user = _user();

        if ($request->has('media_key') && ! $user->getFirstMedia('temp')) {
            return $this->sendError(__('Media file did not upload properly.'));
        }

        $conversationParticipantId = $conversation->participants()->where('user_id', $user->id)->value('id');

        if (! $conversationParticipantId) {
            return $this->sendError(__('User is not participant to this conversation.'));
        }

        DB::beginTransaction();

        try {
            $message = $conversation->messages()->create([
                'conversation_participant_id' => $conversationParticipantId,
                'user_id' => $user->id,
                'value' => $request->value,
            ]);

            if ($request->has('media_key')) {
                $user->getFirstMedia('temp')->move($message, 'media', 's3');
            }

            if (empty($request->value) && $request->has('media_key')) {
                $conversation->update([
                    'last_message' => 'Sent a media file',
                    'last_update' => now(),
                ]);
            } else {
                $conversation->update([
                    'last_message' => $request->value,
                    'last_update' => now(),
                ]);
            }

        } catch (\Throwable $throwable) {
            DB::rollBack();

            return $this->sendError(_serverErrorMessage());
        }

        DB::commit();

        $response = new MessageResource($message);
        event(new MessageSentEvent($response->resource, $message->conversation->opponent($user->id)->id));

        return $this->sendResponse($response);
    }
}
