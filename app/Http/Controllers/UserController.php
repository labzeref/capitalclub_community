<?php

namespace App\Http\Controllers;

use App\Http\Resources\User\UserResource;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function getAuthUser(Request $request)
    {
        $user = _user();

        $billingAddress = $request->get('billingAddress', false);

        if ($billingAddress) {
            $user->load('billingAddress');
        }

        return $this->sendResponse(new UserResource($user));
    }
}
