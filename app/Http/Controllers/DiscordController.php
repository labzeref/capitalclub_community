<?php

namespace App\Http\Controllers;

use App\Jobs\ConnectToDiscordJob;
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
            dump($request->error);
            return to_route('discord.setup');
        }

        $user = $request->user();
        $user->update(['discord_code' => $request->code]);

        ConnectToDiscordJob::dispatchSync($user->id);

        return to_route('discord.setup');
    }
}
