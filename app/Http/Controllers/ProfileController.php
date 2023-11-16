<?php

namespace App\Http\Controllers;

use App\Enums\UserStatusEnum;
use App\Http\Requests\Profile\AccountProfileRequest;
use App\Http\Requests\Profile\PersonalProfileRequest;
use App\Http\Resources\Asset\CountryResource;
use App\Http\Resources\AvatarResource;
use App\Http\Resources\CourseResource;
use App\Http\Resources\InvoiceResource;
use App\Http\Resources\Lesson\LessonResource;
use App\Http\Resources\LiveStreamResource;
use App\Http\Resources\User\UserResource;
use App\Models\Avatar;
use App\Models\Country;
use App\Models\Course;
use App\Models\Invoice;
use App\Models\Lesson;
use App\Services\ChargeBeeService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
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
            'bookmarkedLiveStream.liveSeries.instructors',
        ]);

//        $bookmarkedLiveStream = LiveStreamResource::collection($user->bookmarkedLiveStream);
//        $bookmarkedLessons = LessonResource::collection($user->bookmarkedLessons);
        $bookmarkedCourses = CourseResource::collection(
            Course::query()
                ->withWhereHas(
                    'lessons',
                    fn($lessons) => $lessons->whereIn('id', $user->bookmarkedLessons->pluck('id')->toArray())
                )
                ->with([
                    'modules' => fn($modules) => $modules->whereIn('id', $user->bookmarkedLessons->pluck('module_id')->toArray())
                ])
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
                        fn($note) => $note->where('user_id', $user->id)->whereRaw('CHAR_LENGTH(content) > 1')
                    )
                )
                ->with([
                    'modules' => fn($modules) => $modules->whereIn('id', $needToLoadModuleIds)
                ])
                ->get()
        );

        return inertia('Profile/Progress', compact([
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

        return back()->with('success', __('Profile updated successfully.'));
    }

    /**
     * Show the subscription payment screen
     *
     * @return Response|ResponseFactory
     */
    public function payment(ChargeBeeService $chargeBeeService)
    {
        $user = _user();
        $invoices = InvoiceResource::collection($user->invoices);

        $chargeBeeSite = config('chargbee.site');
        $chargeBeePublicKey = config('chargbee.public_key');

        return inertia('Profile/Payment', compact([
            'invoices',
            'chargeBeeSite',
            'chargeBeePublicKey',
        ]));
    }

    /**
     * Give the invoice download link getting from chargebee
     *
     * @return JsonResponse
     */
    public function invoiceDownload(Invoice $invoice, ChargeBeeService $chargeBeeService)
    {
        abort_if($invoice->user_id != _user()->id, 404);

        $chargeBeeInvoice = $chargeBeeService->downloadInvoicePdf($invoice->charge_bee_id);
        $response = ['download_url' => $chargeBeeInvoice->downloadUrl];

        return $this->sendResponse($response);
    }

    /**
     * Create portal session from chargebee
     *
     * @return mixed
     */
    public function createPortalSession(ChargeBeeService $chargeBeeService)
    {
        return $chargeBeeService->createPortalSession(_user()->charge_bee_id)->toJson();
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
