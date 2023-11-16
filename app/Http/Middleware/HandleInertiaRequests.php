<?php

namespace App\Http\Middleware;

use App\Http\Resources\User\UserCompactResource;
use App\Models\LiveStream;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Tightenco\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    public function share(Request $request): array
    {
        $user = $request->user()
            ? new UserCompactResource($request->user())
            : null;

        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $user,
            ],
            'discordServerUrl' => $request?->user()?->discord_integrated
                ? config('discord.serverLink')
                : null,
            'csrf_token' => csrf_token(),
            'toastMessage' => $this->getToastMessage(),
            'anyLiveTraining' => $this->anyLiveTraining(),
            'ziggy' => function () use ($request) {
                return array_merge((new Ziggy)->toArray(), [
                    'location' => $request->url(),
                ]);
            },
        ]);
    }

    private function getToastMessage(): ?array
    {
        $toast_message = null;

        foreach (['success', 'info', 'warning', 'error'] as $message_type) {
            if (session($message_type)) {
                $toast_message = [
                    'type' => $message_type,
                    'message' => session($message_type),
                ];

                break;
            }
        }

        return $toast_message;
    }

    private function anyLiveTraining(): bool
    {
        return false;
//        return LiveStream::where('live_at', '<', now())
//            ->where('live_end_at', null)
//            ->exists();
    }
}
