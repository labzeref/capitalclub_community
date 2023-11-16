<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class SiteLockMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        if (
            !config('app.check_invitation') ||
            $request->session()->has('invitation_email') && $request->session()->has('invitation_code')
        ) {
            return $next($request);
        }

        return redirect()->away(config('app.lander_url'));
    }
}
