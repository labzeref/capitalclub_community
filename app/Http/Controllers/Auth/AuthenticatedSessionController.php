<?php

namespace App\Http\Controllers\Auth;

use App\Enums\UserStatusEnum;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    public function create(): Response
    {
        return inertia('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    public function store(LoginRequest $request)
    {
        $request->authenticate();
        $user = _user();

        if ($user->status == UserStatusEnum::Blocked) {
            $this->logOut($request);

            return back()->with('error', 'Account blocked please contact support');
        }

        $request->session()->regenerate();

        logActivity(causedBy: $user, performedOn: null, log: 'You logged in.');

        return redirect()->intended(RouteServiceProvider::HOME);
    }

    public function destroy(Request $request): RedirectResponse
    {
        $this->logOut($request);

        return to_route('welcome');
    }

    private function logOut($request): void
    {
        logActivity(causedBy: $request->user, performedOn: null, log: 'You logged out.');

        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();
        $request->session()->put('siteUnlocked', true);
    }
}
