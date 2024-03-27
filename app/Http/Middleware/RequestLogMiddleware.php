<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Stevebauman\Location\Facades\Location;
use Torann\GeoIP\Facades\GeoIP;

class RequestLogMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        $now = now();

        $attributes = [
            'user_id' => $request->user()->id,
            'ip' => $request->ip(),
            'uri' => $request->getPathInfo(),
            'created_at' => $now,
            'updated_at' => $now,
        ];

        $currentUserInfo = Location::get($request->ip());

        if ($currentUserInfo) {
            if ($currentUserInfo->countryName) {
                $attributes['country'] = $currentUserInfo->countryName;
            }

            if ($currentUserInfo->cityName) {
                $attributes['city'] = $currentUserInfo->cityName;
            }

            if ($currentUserInfo->zipCode) {
                $attributes['zip'] = $currentUserInfo->zipCode;
            }
        }

        try {
            $attributes['device'] = gethostname();
        } catch (\Throwable $throwable) {

        }

        DB::table('request_logs')->insert($attributes);

        return $next($request);
    }
}
