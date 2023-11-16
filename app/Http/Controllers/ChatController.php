<?php

namespace App\Http\Controllers;

use App\Http\Resources\Chat\ConversationResource;
use App\Models\Chat\Conversation;

class ChatController extends Controller
{
    public function __invoke($activeConversationId = null)
    {
        $activeConversation = null;

        if ($activeConversationId) {
            try {
                $activeConversationId = decrypt($activeConversationId);
                $activeConversation = Conversation::query()
                    ->where('id', $activeConversationId)
                    ->with('participants.user')
                    ->first();
                $activeConversation = new ConversationResource($activeConversation);
            } catch (\Throwable $throwable) {
                return $this->sendError(__('Payload is invalid.'));
            }
        }

        return inertia('Academy/Chat', compact(['activeConversationId', 'activeConversation']));
    }
}
