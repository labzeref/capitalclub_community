<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\RegisteredUserRequest;
use App\Http\Requests\Auth\UpdateRegistrationRequest;
use App\Http\Resources\Asset\CountryResource;
use App\Http\Resources\User\UserResource;
use App\Jobs\ActiveCampaign\CreateActiveCampaignContactJob;
use App\Jobs\ActiveCampaign\UpdateLoginTimeActiveCampaignContactJob;
use App\Models\Country;
use App\Models\Invitation;
use App\Models\PremiumUser;
use App\Models\User;
use App\Services\CheckoutChampService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Inertia\Response;
use Inertia\Inertia;

class RegisteredUserController extends Controller
{
    /**
     * Show the register user screen
     */
    public function create(Request $request): Response|RedirectResponse
    {
        return Inertia::location(config('checkout-champ.funnel_url'));
    }
}
