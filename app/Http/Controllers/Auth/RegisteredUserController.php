<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\RegisteredUserRequest;
use App\Http\Resources\Asset\CountryResource;
use App\Mail\UserPasswordMail;
use App\Models\Country;
use App\Models\User;
use App\Services\ChargeBeeService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Inertia\Response;
use Stevebauman\Location\Facades\Location;

class RegisteredUserController extends Controller
{
    public function create(Request $request): Response
    {
        $countries = CountryResource::collection(Country::all());
        $price = config('chargbee.yearly_item_price');

        $register_page_expiry = Carbon::parse(config('app.registration_expiry'));

        if ($register_page_expiry) {
            $timeDifferenceInSeconds = now()->diffInSeconds($register_page_expiry);
        } else {
            $timeDifferenceInSeconds = now()->diffInSeconds(now()->addDay());
        }

        $position = Location::get($request->ip()) ? Location::get($request->ip()) : Location::get();
        $countryCode = $position->countryCode;

        return inertia('Auth/Register', compact([
            'countries', 'price', 'timeDifferenceInSeconds', 'countryCode',
        ]));
    }

    public function store(RegisteredUserRequest $request, ChargeBeeService $chargeBeeService): RedirectResponse
    {
        DB::beginTransaction();

        try {
            $password = Str::random();

            $user = User::create([
                'country_iso' => $request->country_iso,
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'email' => $request->email,
                'password' => Hash::make($password),
            ]);

            $user->billingAddress()->create([
                'phone_number' => $request->phone_number,
                'street_address' => $request->street_address,
                'city' => $request->city,
                'zip_code' => $request->zip_code,
                'state' => $request->state,
                'country_iso' => $request->country_iso,
            ]);

            $customer = $chargeBeeService->createCustomer($user);
            $user->update(['charge_bee_id' => $customer->id]);

            Mail::to($user)->send(new UserPasswordMail($user, $password));

            Auth::login($user);

            logActivity(causedBy: $user, performedOn: null, log: 'You have registered.');
        } catch (\Throwable $throwable) {
            DB::rollBack();

            if (Str::contains($throwable->getMessage(), 'zip')) {
                return back()->with('error', __('Invalid zip code.'));
            }

            return back()->with('error', _serverErrorMessage());
        }

        DB::commit();

        return to_route('subscription.index')
            ->with('success', __('Credentials has been sent to your email address.'));
    }
}
