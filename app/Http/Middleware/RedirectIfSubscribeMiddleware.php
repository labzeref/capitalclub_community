<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class RedirectIfSubscribeMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        if (_user()->subscribed || _user()->life_time_membership) {
            return to_route('academy');
        }

        return $next($request);
    }
}
