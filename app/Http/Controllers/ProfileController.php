<?php

namespace App\Http\Controllers;

use App\Http\Requests\Profile\AccountProfileRequest;
use App\Http\Requests\Profile\PersonalProfileRequest;
use App\Http\Resources\ActivityResource;
use App\Http\Resources\Asset\CountryResource;
use App\Http\Resources\CourseResource;
use App\Http\Resources\InvoiceResource;
use App\Http\Resources\Lesson\LessonResource;
use App\Http\Resources\LiveStreamResource;
use App\Http\Resources\User\UserCompactResource;
use App\Http\Resources\User\UserResource;
use App\Models\Country;
use App\Models\Invoice;
use App\Services\ChargeBeeService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Spatie\Activitylog\Models\Activity;

class ProfileController extends Controller
{
    public function progress()
    {
        $user = _user();

        $user->load([
            'bookmarkedLessons',
            'bookmarkedCourses',
            'enrolledCourses',
            'bookmarkedLiveStream.liveSeries.instructors',
        ]);

        $bookmarkedLiveStream = LiveStreamResource::collection($user->bookmarkedLiveStream);
        $bookmarkedLessons = LessonResource::collection($user->bookmarkedLessons);
        $bookmarkedCourses = CourseResource::collection($user->bookmarkedCourses);
        $enrolledCourses = CourseResource::collection($user->enrolledCourses);
        $notedCourses = CourseResource::collection(
            $user->enrolledCourses()->withWhereHas(
                'lessons',
                fn ($query) => $query->withWhereHas(
                    'note',
                    fn ($query) => $query->where('user_id', $user->id)
                )
            )->get()
        );

        return inertia('Profile/Progress', compact([
            'bookmarkedLiveStream',
            'bookmarkedLessons',
            'bookmarkedCourses',
            'enrolledCourses',
            'notedCourses',
        ]));
    }

    public function personal()
    {
        $countries = CountryResource::collection(Country::all());
        $profile = new UserResource(_user()->load('socialMedia'));

        return inertia('Profile/Personal', compact(['profile', 'countries']));
    }

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

            logActivity(causedBy: $user, performedOn: null, log: 'You updated profile.');

            if ($request->profile_image) {
                $user->addMediaFromBase64($request->profile_image)->toMediaCollection('dp');
            }
        } catch (\Throwable $throwable) {
            DB::rollBack();

            return back()->with('error', _serverErrorMessage());
        }

        DB::commit();

        return back()->with('success', __('Profile updated successfully.'));
    }

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

    public function invoiceDownload(Invoice $invoice, ChargeBeeService $chargeBeeService)
    {
        abort_if($invoice->user_id != _user()->id, 404);

        $chargeBeeInvoice = $chargeBeeService->downloadInvoicePdf($invoice->charge_bee_id);
        $response = ['download_url' => $chargeBeeInvoice->downloadUrl];

        return $this->sendResponse($response);
    }

    public function createPortalSession(ChargeBeeService $chargeBeeService)
    {
        return $chargeBeeService->createPortalSession(_user()->charge_bee_id, route('discussion'))->toJson();
    }

    public function updateAccount(AccountProfileRequest $request)
    {
        $user = _user();

        if (! Hash::check($request->current_password, $user->password)) {
            return back()->with('error', __('Password does not match.'));
        }

        $user->update([
            'password' => Hash::make($request->password),
        ]);

        logActivity(causedBy: $user, performedOn: null, log: 'You changed password.');

        return back()->with('success', __('Password updated successfully.'));
    }

    public function deactivateAccount(Request $request)
    {
        DB::beginTransaction();

        try {
            $user = _user();

            logActivity(causedBy: $user, performedOn: null, log: 'You have deactivated his account.');

            $user->update(['active' => false]);
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

    public function activity()
    {
        $profile = new UserCompactResource(_user()->load(['badges' => fn ($query) => $query->orderBy('weight', 'desc')->take(1)]));

        return inertia('Academy/LatestActivity', compact('profile'));
    }

    public function activityList()
    {
        $activities = Activity::causedBy(_user())->latest()->paginate(20);
        $activities = ActivityResource::collection($activities)->resource;

        return $this->sendResponse($activities);
    }
}
