<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class UnlockController extends Controller
{
    public function __invoke(Request $request, $encryptedData)
    {
        try {
            $data = decrypt($encryptedData);

            [$email, $invitationCode, $expiry] = explode('===__', $data);

            $request->session()->put('invitation_email', $email);
            $request->session()->put('invitation_code', $invitationCode);
            $request->session()->put('invitation_expiry', Carbon::parse($expiry)->format('Y-m-d H:i:s'));

            return to_route('welcome');
        } catch (\Throwable $throwable) {
            return redirect()->away(config('app.lander_url') . '?message=Invalid Signature');
        }
    }
}
