<?php

namespace App\Events;

use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class CreatingSubscriptionEvent
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(
        private readonly int $userId,
        private readonly string $success,
        private readonly array $message,
    ) {
    }

    public function broadcastOn(): array
    {
        return [
            new PrivateChannel('user.'.$this->userId),
        ];
    }

    public function broadcastAs(): string
    {
        return 'subscriptionStatus';
    }

    public function broadcastWith(): array
    {
        return [
            'success' => $this->success,
            'message' => $this->message,
        ];
    }
}
