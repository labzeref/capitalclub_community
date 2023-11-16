<?php

namespace App\Events;

use App\Http\Resources\Media\MediaResource;
use App\Models\Chat\Message;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class MessageSentEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $messageResource;

    public function __construct(private readonly Message $message, private readonly int $opponentId)
    {
    }

    public function broadcastOn(): array
    {
        return [
            new PrivateChannel('message-sent.'.$this->opponentId),
        ];
    }

    public function broadcastAs(): string
    {
        return 'message-sent';
    }

    public function broadcastWith(): array
    {
        return [
            'message' => [

                'id' => $this->message->id,
                'user_id' => $this->message->user_id,
                'conversation_id' => $this->message->conversation_id,
                'media' => $this->message->getFirstMedia('media')
                    ? new MediaResource($this->message->getFirstMedia('media'))
                    : '',
                'value' => $this->message->value,
                'seen' => $this->message->seen,
                'created_at' => $this->message->created_at?->diffForHumans(),
                'timestamp' => $this->message->created_at?->timestamp,
            ],
        ];
    }
}
