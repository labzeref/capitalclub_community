<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class SiteLockMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        if ($request->session()->has('siteUnlocked')) {
            return $next($request);
        }

        $wantedUrl = encrypt($request->fullUrl());

        return inertia('Auth/LandingPassword', compact('wantedUrl'));
    }
}
