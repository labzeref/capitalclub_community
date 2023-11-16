<?php

namespace App\Events;

use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ConnectToDiscordEvent implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(
        private readonly int $userId,
        private readonly string $status,
        private readonly array $message,
    ) {
    }

    public function broadcastOn(): array
    {
        return [
            new PrivateChannel('discord.'.$this->userId),
        ];
    }

    public function broadcastAs(): string
    {
        return 'status';
    }

    public function broadcastWith(): array
    {
        return [
            'discordStatus' => $this->status,
            'message' => $this->message,
        ];
    }
}
