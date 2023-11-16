<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Jobs\AssignStoredDiscordRolesJob;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class GetUserInfoController extends Controller
{
    /**
     * This function will return user information against the discord id
     * if exists.
     *
     * @return JsonResponse
     */
    public function __invoke(Request $request)
    {
        if ($request->accessToken == 'xVhiiDhHljsyloadbFfjlMqtjAvCMyLI') {
            if ($request->discordId) {
                $user = User::where('discord_id', $request->discordId)->first();

                if ($user) {

                    if ($user->subscribed){
                        $subscription = $user->subscriptions()->latest()->first();
                        AssignStoredDiscordRolesJob::dispatch(userId: $user->id);

                        $response = [
                            'message' => '',
                            'success' => true,
                            'user' => [
                                'subscription_item_price_id' => $subscription->item_price_id ?? '',
                                'glitch_id' => $user->getGlitchId(),
                            ]
                        ];

                        return response()->json($response);
                    }else{
                        return response()->json(['message' => 'Subscription expired', 'success' => false], 404);
                    }


                }

                return response()->json(['message' => 'No user found', 'success' => false], 404);
            }

            return response()->json(['message' => 'DiscordId is missing', 'success' => false], 422);
        }

        return response()->json(['message' => 'Unauthorized', 'success' => false], 401);
    }
}
