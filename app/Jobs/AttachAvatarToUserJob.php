<?php

namespace App\Jobs;

use App\Models\Avatar;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class AttachAvatarToUserJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(private readonly int $userId, private readonly int $avatarId)
    {
        $this->onQueue('seeder');
    }

    /**
     * Attach the avatar to the user
     */
    public function handle(): void
    {
        $user = User::find($this->userId);

        if (! $user) {
            return;
        }

        Avatar::find($this->avatarId)?->getFirstMedia('image')->copy($user, 'dp', 's3');
    }
}
