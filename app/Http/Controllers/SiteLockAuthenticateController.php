<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SiteLockAuthenticateController extends Controller
{
    public function __invoke(Request $request)
    {
        if ($request->password == config('app.sitePassword')) {

            try {
                $wantedUrl = decrypt($request->wantedUrl);
            } catch (\Throwable $throwable) {
                return back()->with('error', _serverErrorMessage());
            }

            $request->session()->put('siteUnlocked', true);

            return redirect($wantedUrl);
        }

        return back()->with('error', __('Password does not match.'));
    }
}
