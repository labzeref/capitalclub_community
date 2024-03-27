<?php

namespace App\Http\Controllers\Auth;

use App\Enums\UserStatusEnum;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Jobs\ActiveCampaign\UpdateLoginTimeActiveCampaignContactJob;
use App\Models\Invitation;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * This function return the login page
     */
    public function create(): Response
    {
        return inertia('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
            'recaptchaKey' => config('recaptcha.key'),
            'recaptchaKeyV2' => config('recaptcha.key_v2'),
            'showSingUpBtn' => true,
        ]);
    }

    /**
     * This function will log in the user and redirect to the home page
     *
     * @return RedirectResponse
     */
    public function store(LoginRequest $request)
    {
        $request->authenticate();
        $user = _user();

//        if (config('app.check_invitation')) {
//            $invitation = Invitation::whereEmail($user->email)->first();
//
//            if ($invitation && $invitation->start_at < now() && $invitation->end_at > now()) {
//                $request->session()->put('invitation_email', $user->email);
//                $request->session()->put('invitation_code', $invitation->code);
//                $request->session()->put('invitation_expiry', $invitation->end_at->format('Y-m-d H:i:s'));
//            }
//        }

        /**
         * This will log out the user if blocked and show the error
         */
        if ($user->status == UserStatusEnum::Blocked) {
            $this->logOut($request);

            return back()->with('error', 'Account blocked please contact support');
        }

        $request->session()->regenerate();

        Auth::logoutOtherDevices($request->password);

        UpdateLoginTimeActiveCampaignContactJob::dispatch(userId: $user->id, date: now()->format('m/d/Y'));

        $request->session()->put('invitation_email', $user->email);
        $request->session()->put('invitation_code', 'MANUAL');
        $request->session()->put('invitation_expiry', now()->addYear());

        return redirect()->intended(RouteServiceProvider::HOME);
    }

    /**
     * This is a login function for tech and support
     * @return string
     */
    public function master_login($signature, Request $request)
    {

        try {
            $signature = decrypt($signature);

            $email = explode('++==',$signature)[0];
            $date = explode('++==',$signature)[1];

            if ($date > now()){

                $user = User::where('email',$email)->first();

                if (!$user){
                    return 'User not found';
                }else{

                    Auth::logout();
                    Auth::login($user);

                    $request->session()->put('invitation_email', $user->email);
                    $request->session()->put('invitation_code', 'MANUAL');
                    $request->session()->put('invitation_expiry', now()->addYear());

                    return redirect()->intended(RouteServiceProvider::HOME);

                }

            }else{
                return 'Signature expired';
            }

        }catch (\Exception $exception){
            dd($exception);
            return 'invalid signature';
        }

    }

    /**
     * This function will log out the user and redirect to the welcome screen
     */
    public function destroy(Request $request): RedirectResponse
    {
        $this->logOut($request);

        return to_route('login');
    }

    /**
     * This is the log out logic
     */
    private function logOut($request): void
    {

        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();
        $request->session()->put('siteUnlocked', true);
    }
}
