<?php

namespace App\Http\Controllers;

use App\Jobs\ConnectToDiscordJob;
use App\Jobs\Klaviyo\UpdateDiscordDataToKlaviyoJob;
use App\Services\DiscordService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;
use Inertia\ResponseFactory;

class DiscordController extends Controller
{
    /**
     * Show the discord setup screen
     *
     * @return Response|ResponseFactory
     */
    public function setup(DiscordService $discordService)
    {
        $user = _user();
        $discordConnected = $user->discord_integrated;
        $connectDiscordUrl = $discordService->getSSO();
        $serverLink = config('discord.serverLink');

        return inertia('Discord/DiscordSetup', compact(['connectDiscordUrl', 'discordConnected', 'serverLink']));
    }

    /**
     * Handle the request when redirect from discord sso page of authorization
     * and dispatch the jog for connection
     *
     * @return RedirectResponse
     */
    public function handleRedirect(Request $request)
    {
        if ($request->error) {
            return to_route('discord.setup');
        }

        $user = $request->user();

        if ($user->discord_integrated) {
            return to_route('discord.setup');
        }

        $user->update(['discord_code' => $request->code]);

        /**
         * When we just dispatch and run in queue it not working don't know why.
         */
        ConnectToDiscordJob::dispatchSync($user->id);

        $user->refresh();

        UpdateDiscordDataToKlaviyoJob::dispatch(user: $user);

        return to_route('discord.setup');
    }
}
