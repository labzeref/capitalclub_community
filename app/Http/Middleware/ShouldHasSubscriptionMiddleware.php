<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class ShouldHasSubscriptionMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        if (_user()->subscribed) {
            return $next($request);
        }

        return to_route('subscription.index');
    }
}
