<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SiteLockController extends Controller
{
    public function index(Request $request)
    {
        if (! config('app.siteLock') || (config('app.siteLock') && $request->session()->has('siteUnlocked'))) {
            return to_route('academy');
        }

        return inertia('Auth/LandingPassword');
    }

    public function store(Request $request)
    {
        if ($request->password == config('app.sitePassword')) {

            $request->session()->put('siteUnlocked', true);

            return to_route('academy');
        }

        return back()->withErrors(['password' => 'Password does not match']);
    }
}
