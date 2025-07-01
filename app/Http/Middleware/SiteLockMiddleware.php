<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class SiteLockMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        if (config('app.siteLock') && !$request->session()->has('siteUnlocked')) {
            return to_route('site-lock.index');
        }

        return $next($request);
    }
}
