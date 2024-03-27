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
use App\Models\RegistrationCap;
use App\Models\User;
use App\Services\ChargeBeeService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Inertia\Response;
use Torann\GeoIP\Facades\GeoIP;

class RegisteredUserController extends Controller
{
    /**
     * Show the register user screen
     */
    public function create(Request $request): Response|RedirectResponse
    {

        $countries = CountryResource::collection(Country::getWithUSFirst());
        $price = config('chargbee.yearly_item_price');

        $timeDifferenceInSeconds = _getPageRemainingSeconds();

        $countryCode = GeoIP::getLocation($request->ip())->iso_code;

        $recaptchaKey = config('recaptcha.key');

        $invite_code = $request->session()->get('invitation_code');

        return inertia('Auth/Register', compact([
            'countries', 'price', 'timeDifferenceInSeconds', 'countryCode', 'recaptchaKey','invite_code'
        ]));
    }

    /**
     * Register the user
     */
    public function store(RegisteredUserRequest $request, ChargeBeeService $chargeBeeService): RedirectResponse
    {

        $startData = now()->setHour(15)->setMinute(0)->seconds(0);
        $endData = now();

        if ($startData > $endData) {
            $startData->subDay();
        }



        $total_registrations =  \Illuminate\Support\Facades\DB::table('users')
            ->where('subscribed',true)
            ->where('created_at', '>=', $startData)
            ->where('created_at', '<=', $endData)
            ->count();

        $registrationCap = \Illuminate\Support\Facades\DB::table('registration_caps')->orderBy('id','desc')->first();

        if ($registrationCap) {
            if (($registrationCap->limit - $total_registrations) <= 0){
                return back()->with('error', __('Sold Out'));

            }
        }

        $valid = false;

        if (
            Invitation::query()
                ->whereEmail($request->email)
                ->whereCode($request->invite_code)
                ->where('start_at', '<', now())
                ->where('end_at', '>', now())
                ->exists()
        ) {
            $valid = true;
        }

//        if (!$valid){
//            if (
//                Invitation::query()
//                    ->whereCode($request->invite_code)
//                    ->doesntExist()
//            ) {
//                return back()->with('error', __('Invalid Invitation Code. <br> <b><u><a href="mailto:hello@capital.club">Contact Support</a></u></b> '));
//            }
//            else if (
//                Invitation::query()
//                    ->whereEmail($request->email)
//                    ->whereCode($request->invite_code)
//                    ->doesntExist()
//            ){
//                return back()->with('error', __('The Invitation Code does not belong to this email.'));
//            }
//            else if (
//                Invitation::query()
//                    ->whereEmail($request->email)
//                    ->whereCode($request->invite_code)
//                    ->where('end_at', '<', now())
//                    ->exists() &&
//                Invitation::query()
//                    ->whereEmail($request->email)
//                    ->whereCode($request->invite_code)
//                    ->where('end_at', '>', now())
//                    ->doesntExist()
//            ) {
//                return back()->with('error', __('Your Invitation Code Has Expired. <br> <b><u><a href="mailto:hello@capital.club">Contact Support</a></u></b>'));
//            }
//            else if (
//                Invitation::query()
//                    ->whereEmail($request->email)
//                    ->whereCode($request->invite_code)
//                    ->where('start_at', '>', now())
//                    ->exists() &&
//                Invitation::query()
//                    ->whereEmail($request->email)
//                    ->whereCode($request->invite_code)
//                    ->where('start_at', '<', now())
//                    ->doesntExist()
//            ) {
//                return back()->with('error', __('Your Invitation Code Is Not Active Yet.'));
//            }else{
//                return back()->with('error', __('Invalid Invitation Code. <br> <b><u><a href="mailto:hello@capital.club">Contact Support</a></u></b>'));
//            }
//        }

        DB::beginTransaction();


        try {
            $password = Str::random();
            $user = User::whereEmail($request->email)->first();
            $premiumUser = PremiumUser::whereEmail($request->email)->whereNotNull('glitch_id')->first();

            if ($user) {
                if ($user->subscriptions()->withTrashed()->exists()) {
                    DB::rollBack();
                    return back()->with('error', __('Email already exist please login.'));
                }

                $user->update($request->only([
                    'country_iso',
                    'first_name',
                    'last_name',
                    'email',
                ]));

                if ($user->instructor()->exists()) {
                    $user->instructor()->update($request->only([
                        'country_iso',
                        'first_name',
                        'last_name',
                    ]));
                }

                if ($user->billingAddress) {
                    $user->billingAddress()->update($request->only([
                        'phone_number',
                        'street_address',
                        'city',
                        'zip_code',
                        'state',
                        'country_iso',
                    ]));

                    $billingAddress = $user->billingAddress;
                } else {
                    $billingAddress = $user->billingAddress()->create($request->only([
                        'phone_number',
                        'street_address',
                        'city',
                        'zip_code',
                        'state',
                        'country_iso',
                    ]));
                }

                if ($user->charge_bee_id) {
                    $chargeBeeService->updateCustomer($user, $billingAddress);
                } else {
                    $customer = $chargeBeeService->createCustomer($user, $billingAddress);
                    $user->update(['charge_bee_id' => $customer->id]);
                }

                $user->password = Hash::make($password);
                $user->save();
            } else {
                if ($premiumUser) {
                    $user = User::create([
                        'id' => $premiumUser->glitch_id,
                        'country_iso' => $request->country_iso,
                        'first_name' => $request->first_name,
                        'last_name' => $request->last_name,
                        'email' => $request->email,
                        'password' => Hash::make($password),
                    ]);
                } else {
                    $user = User::create([
                        'country_iso' => $request->country_iso,
                        'first_name' => $request->first_name,
                        'last_name' => $request->last_name,
                        'email' => $request->email,
                        'password' => Hash::make($password),
                    ]);
                }

                $billingAddress = $user->billingAddress()->create([
                    'phone_number' => $request->phone_number,
                    'street_address' => $request->street_address,
                    'city' => $request->city,
                    'zip_code' => $request->zip_code,
                    'state' => $request->state,
                    'country_iso' => $request->country_iso,
                ]);

                if ($user->instructor()->exists()) {
                    $user->instructor()->update($request->only([
                        'country_iso',
                        'first_name',
                        'last_name',
                    ]));
                }

                $customer = $chargeBeeService->createCustomer($user, $billingAddress);
                $user->update(['charge_bee_id' => $customer->id]);

                CreateActiveCampaignContactJob::dispatch(userId: $user->id);
            }

            if (config('app.check_invitation')) {
                $user->update(['invitation_code' => session('invitation_code')]);
            }
            Auth::login($user);
        } catch (\Throwable $throwable) {
            DB::rollBack();

            if (Str::contains($throwable->getMessage(), 'zip')) {
                return back()->with('error', __('Invalid zip code.'));
            }

            return back()->with('error', _serverErrorMessage());
        }

        DB::commit();



        UpdateLoginTimeActiveCampaignContactJob::dispatch(userId: $user->id, date: now()->format('m/d/Y'));

        return to_route('subscription.index')->with('showComponent', 'payment');
    }

    /**
     * Update the user registration information before payment
     * without payment the all system is locked, so he cannot
     * visit his/her profile.
     *
     * @return JsonResponse
     */
    public function updateRegistration(UpdateRegistrationRequest $request, ChargeBeeService $chargeBeeService)
    {
        $startData = now()->setHour(15)->setMinute(0)->seconds(0);
        $endData = now();

        if ($startData > $endData) {
            $startData->subDay();
        }

        $total_registrations =  \Illuminate\Support\Facades\DB::table('users')
            ->where('subscribed',true)
            ->where('created_at', '>=', $startData)
            ->where('created_at', '<=', $endData)
            ->count();

        $registrationCap = \Illuminate\Support\Facades\DB::table('registration_caps')->orderBy('id','desc')->first();

        if ($registrationCap) {
            if (($registrationCap->limit - $total_registrations) <= 0){
                Auth::logout();
                return $this->sendError(__('Sold Out'),401);
            }
        }

//        $valid = false;
//
//        if (
//            Invitation::query()
//                ->whereEmail($request->email)
//                ->whereCode($request->invite_code)
//                ->where('start_at', '<', now())
//                ->where('end_at', '>', now())
//                ->exists()
//        ) {
//            $valid = true;
//        }
//
//        if (!$valid){
//            if (
//                Invitation::query()
//                    ->whereCode($request->invite_code)
//                    ->doesntExist()
//            ) {
//                return $this->sendError(__('Invalid Invitation Code. <br> <b><u><a href="mailto:hello@capital.club">Contact Support</a></u></b> '));
//            }
//            else if (
//                Invitation::query()
//                    ->whereEmail($request->email)
//                    ->whereCode($request->invite_code)
//                    ->doesntExist()
//            ){
//                return $this->sendError(__('The Invitation Code does not belong to this email.'));
//            }
//            else if (
//                Invitation::query()
//                    ->whereEmail($request->email)
//                    ->whereCode($request->invite_code)
//                    ->where('end_at', '<', now())
//                    ->exists() &&
//                Invitation::query()
//                    ->whereEmail($request->email)
//                    ->whereCode($request->invite_code)
//                    ->where('end_at', '>', now())
//                    ->doesntExist()
//            ) {
//                return $this->sendError(__('Your Invitation Code Has Expired. <br> <b><u><a href="mailto:hello@capital.club">Contact Support</a></u></b>'));
//            }
//            else if (
//                Invitation::query()
//                    ->whereEmail($request->email)
//                    ->whereCode($request->invite_code)
//                    ->where('start_at', '>', now())
//                    ->exists() &&
//                Invitation::query()
//                    ->whereEmail($request->email)
//                    ->whereCode($request->invite_code)
//                    ->where('start_at', '<', now())
//                    ->doesntExist()
//            ) {
//                return $this->sendError(__('Your Invitation Code Is Not Active Yet.'));
//            }else{
//                return $this->sendError(__('Invalid Invitation Code. <br> <b><u><a href="mailto:hello@capital.club">Contact Support</a></u></b>'));
//            }
//        }

        // add expiry for per day registrations

        DB::beginTransaction();

        try {
            $user = $request->user();

            $user->update($request->only([
                'country_iso',
                'first_name',
                'last_name',
                'email',
            ]));

            if ($user->instructor()->exists()) {
                $user->instructor()->update($request->only([
                    'country_iso',
                    'first_name',
                    'last_name',
                    'email',
                ]));
            }

            $user->billingAddress()->update($request->only([
                'phone_number',
                'street_address',
                'city',
                'zip_code',
                'state',
                'country_iso',
            ]));

            $chargeBeeService->updateCustomer($user);

            if (config('app.check_invitation')) {
                $user->update(['invitation_code' => session('invitation_code')]);
            }
        } catch (\Throwable $throwable) {
            DB::rollBack();

            return $this->sendError(_serverErrorMessage());
        }

        DB::commit();

        $response = new UserResource($user->load('billingAddress'));

        return $this->sendResponse($response, __('Billing updated successfully.'));
    }
}
