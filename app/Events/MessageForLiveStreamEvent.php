<?php

namespace App\Events;

use App\Http\Resources\User\UserCompactResource;
use App\Models\StreamMessage;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class MessageForLiveStreamEvent
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(public StreamMessage $streamMessage, private readonly int $LiveTrainingId, private readonly int $auth_user_id)
    {

    }

    public function broadcastOn(): array
    {
        return [
            new PresenceChannel('live-stream.'.$this->LiveTrainingId),
        ];
    }

    public function broadcastAs(): string
    {
        return 'live-stream';
    }

    public function broadcastWith(): array
    {
        return [
            'message' => [
                'id' => $this->id,
                'value' => $this->value,
                'user_id' => $this->user_id,
                'user' => new UserCompactResource($this->whenLoaded('user')),
                'send_at' => $this->send_at->diffForHumans(),
                'mentioned_message_id' => $this->mentioned_message_id,
                'my_reaction' => $this->reactions()->where('user_id', $this->auth_user_id)->value('value'),
                'mentioned_message' => $this->whenloaded('mentionedMessage') ? [

                    'id' => $this->id,
                    'value' => $this->value,
                    'user' => new UserCompactResource($this->whenLoaded('user')),

                ] : $this->whenloaded('mentionedMessage'),

            ],
        ];
    }
}
