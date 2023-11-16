<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class ShouldNotHasProfileCompleted
{
    public function handle(Request $request, Closure $next)
    {
        if (_user()->profile_completed) {
            return to_route('academy');
        }

        return $next($request);
    }
}
