<?php

namespace App\Jobs;

use App\Mail\UserPasswordMail;
use App\Notifications\SlackErrorNotification;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Notification;
use Throwable as ThrowableAlias;

class UserPasswordMailJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private mixed $password;
    private mixed $user;
    protected $tries = 5;

    /**
     * Create a new job instance.
     */
    public function __construct($user, $password)
    {
        $this->user = $user;
        $this->password = $password;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        try {
            Mail::to($this->user->email)->send(new UserPasswordMail($this->user, $this->password));
        } catch (ThrowableAlias $throwable) {
            Notification::route('slack', config('services.slack.notifications.channel'))
                ->notify(new SlackErrorNotification('Checkout-Champs webhook failed. ----- Error: '.$throwable->getMessage()));
            throw $throwable;
        }
    }
}
