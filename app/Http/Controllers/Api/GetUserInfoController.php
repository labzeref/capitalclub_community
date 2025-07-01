<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Jobs\AssignStoredDiscordRolesJob;
use App\Models\CheckoutChampOrder;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

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

                    if ($user->orders()->where('end_at','>',now())->count() > 0 || $user->life_time_membership || $user->hasActiveChargebeeSubscription()) {
                        $latest_order = CheckoutChampOrder::where('user_id', $user->id)->latest('id')->first();
                        $amount = 0;
                        $subscription_price_id = null;
                        if ($latest_order) {
                            $amount = $latest_order->amount;
                        } else {
                            $subscription = $user->subscriptions()->latest('id')->first();
                            if ($subscription) {
                                $subscription_price_id = $subscription->item_price_id;
                                $amount = 369;
                            }
                        }

                        AssignStoredDiscordRolesJob::dispatch(userId: $user->id);

                        $response = [
                            'message' => '',
                            'success' => true,
                            'user' => [
                                'amount_paid' => $amount,
                                'glitch_id' => $user->getGlitchId(),
                                'subscribed'=> $user->orders()->where('end_at','>',now())->count() > 0 || $user->life_time_membership || $user->hasActiveChargebeeSubscription(),
                            ],
                        ];

                        return response()->json($response);
                    } else {
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
