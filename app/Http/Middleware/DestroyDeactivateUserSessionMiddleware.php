<?php

namespace App\Http\Middleware;

use App\Enums\UserStatusEnum;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DestroyDeactivateUserSessionMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        if (Auth::user()?->status == UserStatusEnum::Blocked) {
            Auth::guard('web')->logout();

            $request->session()->invalidate();
            $request->session()->regenerateToken();
            $request->session()->put('siteUnlocked', true);

            return to_route('welcome');
        }

        return $next($request);
    }
}
