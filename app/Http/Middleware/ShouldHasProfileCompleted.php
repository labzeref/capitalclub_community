<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class ShouldHasProfileCompleted
{
    public function handle(Request $request, Closure $next)
    {
        if (! _user()->profile_completed) {
            return to_route('preference.glitch-id');
        }

        return $next($request);
    }
}
