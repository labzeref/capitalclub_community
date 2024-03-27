<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class ShouldHasSubscriptionMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        if (_user()->subscribed || _user()->life_time_membership) {
            return $next($request);
        }

        return to_route('subscription.index');
    }
}
