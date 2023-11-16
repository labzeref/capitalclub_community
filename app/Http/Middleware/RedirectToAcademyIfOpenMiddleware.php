<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class RedirectToAcademyIfOpenMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        $academyOpeningDate = Carbon::parse(config('app.academy_opening'));

        if ($academyOpeningDate->isPast()) {
            return to_route('academy');
        }

        return $next($request);
    }
}
