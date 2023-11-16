<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class PlayGameIfAcademyLockedMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        $academyOpeningDate = Carbon::parse(config('app.academy_opening'));

        if ($academyOpeningDate->isPast()) {
            return $next($request);
        }

        return to_route('preference.game');
    }
}
