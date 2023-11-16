<?php

namespace App\Notifications;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class PostReactionNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(readonly User $reactor)
    {
    }

    public function via($notifiable): array
    {
        return ['mail', 'database', 'broadcast'];
    }

    public function toMail($notifiable): MailMessage
    {
        return (new MailMessage)
            ->line("{$this->reactor->full_name} has react on your post.")
            ->action('See Post', route('discussion'))
            ->line('Thank you for using our application!');
    }

    public function toArray($notifiable): array
    {
        return [
            'image' => _getSignedUrl($this->reactor->getFirstMedia('dp')->getPath('small')),
            'title' => 'Post reacted.',
            'description' => "{$this->reactor->full_name} has react on your post.",
            'action' => route('discussion'),
        ];
    }
}
