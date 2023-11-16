<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Validation\ValidationException;
use Inertia\Response;

class PasswordResetLinkController extends Controller
{
    /**
     * Show the forget password screen
     */
    public function create(): Response
    {
        return inertia('Auth/ForgotPassword', [
            'status' => session('status'),
        ]);
    }

    /**
     * Sends the forget password mail to user
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'email' => 'required|email',
        ]);

        // We will send the password reset link to this user. Once we have attempted
        // to send the link, we will examine the response then see the message we
        // need to show to the user. Finally, we'll send out a proper response.
        $status = Password::sendResetLink(
            $request->only('email')
        );

        if ($status == Password::RESET_LINK_SENT) {
            return back()->with('success', __('Reset password link sent successfully'));
        }

        throw ValidationException::withMessages([
            'email' => [trans($status)],
        ]);
    }
}
