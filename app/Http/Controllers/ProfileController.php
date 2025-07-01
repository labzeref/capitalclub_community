<?php

namespace App\Http\Controllers;

use App\Enums\UserStatusEnum;
use App\Http\Requests\Profile\AccountProfileRequest;
use App\Http\Requests\Profile\PersonalProfileRequest;
use App\Http\Resources\Asset\CountryResource;
use App\Http\Resources\AvatarResource;
use App\Http\Resources\CheckoutChampCardResource;
use App\Http\Resources\CheckoutChampOrderResource;
use App\Http\Resources\CourseResource;
use App\Http\Resources\InvoiceResource;
use App\Http\Resources\LiveStream\LiveStreamResource;
use App\Http\Resources\User\UserResource;
use App\Jobs\Klaviyo\UpdateProfileDataToKlaviyoJob;
use App\Models\Avatar;
use App\Models\CheckoutChampUserCard;
use App\Models\Country;
use App\Models\Course;
use App\Models\Invoice;
use App\Models\Lesson;
use App\Models\LiveStream\LiveStream;
use App\Services\CheckoutChampService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Notification;
use App\Notifications\SlackTestNotification;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;
use Inertia\ResponseFactory;

class ProfileController extends Controller
{
    /**
     * Show the progress screen
     *
     * @return Response|ResponseFactory
     */
    public function progress()
    {
        $user = _user();

        $user->load([
            'bookmarkedLessons',
            'bookmarkedCourses',
            'enrolledCourses',
            'bookmarkedLiveStream',
        ]);

        //        $bookmarkedLiveStream = LiveStreamResource::collection($user->bookmarkedLiveStream);
        //        $bookmarkedLessons = LessonResource::collection($user->bookmarkedLessons);
        $bookmarkedCourses = CourseResource::collection(
            Course::query()
                ->whereHas(
                    'lessons',
                    fn($lessons) => $lessons->whereIn('id', $user->bookmarkedLessons->pluck('id')->toArray())
                )
                ->with([
                    'modules' => fn($modules) => $modules->whereIn('id', $user->bookmarkedLessons->pluck('module_id')->toArray()),
                    'lessons' => fn($lessons) => $lessons
                        ->whereIn('id', $user->bookmarkedLessons->pluck('id')->toArray())
                        ->orderBy('serial_number')
                        ->with([
                            'progress' => fn($progress) => $progress->where('user_id', $user->id),
                        ]),
                ])
                ->get()
        );

        $bookmarkedLivestream = LiveStreamResource::collection(
            LiveStream::query()
                ->whereIn('id', $user->bookmarkedLiveStream->pluck('id')->toArray())
                ->get()
        );

        //        $enrolledCourses = CourseResource::collection($user->enrolledCourses);
        $needToLoadModuleIds = Lesson::query()
            ->whereIn('id', $user->notes()->get(['lesson_id'])->pluck('lesson_id')->toArray())
            ->get(['module_id'])
            ->pluck('module_id')
            ->toArray();

        $notedCourses = CourseResource::collection(
            $user->enrolledCourses()
                ->withWhereHas(
                    'lessons',
                    fn($lessons) => $lessons->orderBy('id')->withWhereHas(
                        'note',
                        fn($note) => $note->where('user_id', $user->id)->whereRaw('CHAR_LENGTH(content) > 0')
                    )
                )
                ->with([
                    'modules' => fn($modules) => $modules->whereIn('id', $needToLoadModuleIds),
                ])
                ->get()
        );

        return inertia('Profile/Progress', compact([
            'bookmarkedLivestream',
            'bookmarkedCourses',
            'notedCourses',
        ]));
    }

    /**
     * Show the personal screen
     *
     * @return Response|ResponseFactory
     */
    public function personal()
    {
        $countries = CountryResource::collection(Country::getWithUSFirst());
        $profile = new UserResource(_user()->load('socialMedia'));
        $avatars = AvatarResource::collection(Avatar::paginate(10))->resource;

        $phoneNumber = _user()->billingAddress?->phone_number;

        return inertia('Profile/Personal', compact(['profile', 'countries', 'avatars', 'phoneNumber']));
    }

    /**
     * Update the personal profile data of user
     *
     * @return RedirectResponse
     */
    public function updatePersonal(PersonalProfileRequest $request)
    {
        $user = _user();

        DB::beginTransaction();

        try {
            $user->update($request->only([
                'country_iso',
                'first_name',
                'last_name',
                'about',
            ]));

            if ($user->instructor()->exists()) {
                $user->instructor()->update($request->only([
                    'country_iso',
                    'first_name',
                    'last_name',
                    'email',
                ]));
            }

            if ($user->billingAddress()->exists()) {
                $user->billingAddress()->update($request->only([
                    'phone_number',
                ]));
            } else {
                $user->billingAddress()->create($request->only([
                    'phone_number',
                ]));
            }

            if ($user->socialMedia()->exists()) {
                $user->socialMedia()->update($request->only([
                    'twitter',
                    'linkedin',
                    'instagram',
                    'youtube',
                ]));
            } else {
                $user->socialMedia()->create($request->only([
                    'twitter',
                    'linkedin',
                    'instagram',
                    'youtube',
                ]));
            }

            if ($request->avatar_id) {
                Avatar::find($request->avatar_id)?->getFirstMedia('image')->copy(_user(), 'dp', 's3');
            }
        } catch (\Throwable $throwable) {
            DB::rollBack();

            return back()->with('error', _serverErrorMessage());
        }

        DB::commit();

        $user->refresh();

        UpdateProfileDataToKlaviyoJob::dispatch(user: $user);

        return back()->with('success', __('Profile updated successfully.'));
    }

    /**
     * Show the subscription payment screen
     */
    public function payment()
    {
        $user = _user();

//        if (!$user->checkout_champ_id){
//             abort(404);
//        }

        $orders = CheckoutChampOrderResource::collection(
            _user()->orders()->with(['product', 'card'])->latest('id')->get()
        );

        $orderModel = _user()->orders()->with(['product', 'card'])->where('end_at', '>', now())->latest('id')->first();

        if ($orderModel) {
            $order = new CheckoutChampOrderResource($orderModel);
        } else {
            $inactiveOrder = _user()->orders()->with(['product', 'card'])->latest('id')->first();
            if (!$inactiveOrder) {
                $order = null;
            } else {
                $order = new CheckoutChampOrderResource($inactiveOrder);
            }
        }

        $card = CheckoutChampUserCard::where('user_id', $user->id)->latest('id')->first();


        if ($user->checkout_champ_id && !$card) {

            $service = new CheckoutChampService();

            $customerResponse = $service->getCustomerByCustomerId(customerId: $user->checkout_champ_id);

            if ($customerResponse->successful()) {
                if ($customerResponse->json()['result'] == 'SUCCESS') {

                    $customer = $customerResponse['message']['data'][0];

                    if (isset($customer['cardType']) && isset($customer['cardLast4']) && isset($customer['cardExpiryDate']) && isset($customer['paySourceId'])) {

                        $card = CheckoutChampUserCard::updateOrCreate([
                            'user_id' => $user->id
                        ], [
                            'user_id' => $user->id,
                            'type' => $customer['cardType'],
                            'last_4' => $customer['cardLast4'],
                            'expiry' => $customer['cardExpiryDate'],
                            'pay_source_id' => $customer['paySourceId'],
                        ]);

                    }


                }
            }
        }


        if ($card) {

            $card = [
                'type' => $card->type,
                'last_4' => $card->last_4,
                'expiry' => $card->expiry,
            ];
        }


        return inertia('Profile/Payment', compact(['order', 'orders', 'card']));
    }

    public function addCard(Request $request, CheckoutChampService $service)
    {
        $request->validate([
            'number' => 'required',
            'month' => 'required',
            'year' => 'required',
            'cvv' => 'required',
        ]);

        if (!$request->user()->checkout_champ_id) {
            return back()->with('error', __('You cannot update the default card.'));
        }

        $customerResponse = $service->getCustomerByCustomerId(customerId: $request->user()->checkout_champ_id);

        if (!$customerResponse->successful()) {
            Log::channel('checkout-champ')->info('----------------------------------------------------------------------------------------------------------------------------------------------');
            Log::channel('checkout-champ')->error("Error in getting customer by customer id. User id: {$request->user()->id}, in profile");
            Log::channel('checkout-champ')->error($customerResponse->json());

            return back()->with('error', __('You cannot update the default card.'));
        }

        if ($customerResponse->json()['result'] != 'SUCCESS') {
            Log::channel('checkout-champ')->info('----------------------------------------------------------------------------------------------------------------------------------------------');
            Log::channel('checkout-champ')->error("Error in result of customer. User id: {$request->user()->id}, in profile");
            Log::channel('checkout-champ')->error($customerResponse->json());

            return back()->with('error', __('You cannot update the default card. at the moment'));
        }

        $card = CheckoutChampUserCard::where('user_id', $request->user()->id)->latest('id')->first();

        $response = $service->addCard(
            cardNumber: $request->number,
            cardMonth: $request->month,
            cardYear: $request->year,
            cardSecurityCode: $request->cvv,
            paySourceId: $card?->pay_source_id,
            customerId: $request->user()->checkout_champ_id,
        );


        if ($response->successful()) {
            Log::channel('checkout-champ')->info('----------------------------------------------------------------------------------------------------------------------------------------------');
            Log::channel('checkout-champ')->error("Success api of add card. User id: {$request->user()->id}, in profile");
            Log::channel('checkout-champ')->error($customerResponse->json());

            if ($response->json()['result'] != 'SUCCESS') {
                Log::channel('checkout-champ')->info('----------------------------------------------------------------------------------------------------------------------------------------------');
                Log::channel('checkout-champ')->error("Error in result of customer. User id: {$request->user()->id}, in profile");
                Log::channel('checkout-champ')->error($customerResponse->json());

                $message = $response->json()['message'];

                if (!is_string($message)) {
                    $message = 'Unable to update default payment method';
                }

                return back()->with('error', __($message));
            }

            $user = $request->user();

            // Calling again the api for confirmation that the card is added successfully in checkout champ
            $customerResponse = $service->getCustomerByCustomerId(customerId: $user->checkout_champ_id);

            if ($customerResponse->successful()) {
                if ($customerResponse->json()['result'] == 'SUCCESS') {

                    $customer = $customerResponse['message']['data'][0];

                    if (isset($customer['cardType']) && isset($customer['cardLast4']) && isset($customer['cardExpiryDate']) && isset($customer['paySourceId'])) {

                        $card = CheckoutChampUserCard::updateOrCreate([
                            'user_id' => $user->id
                        ], [
                            'user_id' => $user->id,
                            'type' => $customer['cardType'],
                            'last_4' => $customer['cardLast4'],
                            'expiry' => $customer['cardExpiryDate'],
                            'pay_source_id' => $customer['paySourceId'],
                        ]);

                    }


                }
            }

            return back()->with('success', __('Card added successfully.'));
        } else {
            Log::channel('checkout-champ')->info('----------------------------------------------------------------------------------------------------------------------------------------------');
            Log::channel('checkout-champ')->error("Error in getting customer by customer id. User id: {$request->user()->id}, in profile");
            Log::channel('checkout-champ')->error($customerResponse->json());
        }

        return back()->with('error', __('Unable to update default payment method.'));
    }

    /**
     * Update password
     *
     * @return RedirectResponse
     */
    public function updateAccount(AccountProfileRequest $request)
    {
        $user = _user();

        if (!Hash::check($request->current_password, $user->password)) {
            return back()->with('error', __('Password does not match.'));
        }

        if (Hash::check($request->password, $user->password)) {
            return back()->with('info', __('Your new password is your current password.'));
        }

        $user->update([
            'password' => Hash::make($request->password),
        ]);

        return back()->with('success', __('Password updated successfully.'));
    }

    /**
     * Deactivate the user account
     *
     * @return RedirectResponse
     */
    public function deactivateAccount(Request $request)
    {
        DB::beginTransaction();

        try {
            $user = _user();

            $user->update(['status' => UserStatusEnum::Blocked]);
            $user->deactivateReason()->create(['reason' => 'Deactivated by himself.']);

            Auth::guard('web')->logout();
            $request->session()->invalidate();
            $request->session()->regenerateToken();

            $request->session()->put('siteUnlocked', true);
        } catch (\Throwable $throwable) {
            DB::rollBack();

            return back()->with('error', _serverErrorMessage());
        }

        DB::commit();

        return to_route('welcome');
    }
}
