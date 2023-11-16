<?php

namespace App\Mail;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class UserPasswordMail extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public function __construct(private readonly User $user, private readonly string $password)
    {
        $this->queue = 'emails';
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Your Account Credentials',
        );
    }

    public function content(): Content
    {
        return new Content(
            markdown: 'emails.user-password',
            with: [
                'user' => $this->user,
                'password' => $this->password,
            ]
        );
    }

    public function attachments(): array
    {
        return [];
    }
}
