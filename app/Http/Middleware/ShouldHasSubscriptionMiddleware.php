<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ShouldHasSubscriptionMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        $user = $request->user();
        if ($user->orders()->where('end_at','>',now())->count() > 0 || $user->life_time_membership || $user->hasActiveChargebeeSubscription()) {
            return $next($request);
        }

        if ($user->orders()->count() > 0) {
           return Inertia::location(route('profile.payment'));
        }

        return Inertia::location(config('checkout-champ.funnel_url'));
    }
}
