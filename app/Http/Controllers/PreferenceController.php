<?php

namespace App\Http\Controllers;

use App\Assets\VideoAsset;
use App\Http\Requests\OnboardingStoreRequest;
use App\Http\Resources\Asset\CategoryResource;
use App\Http\Resources\AvatarResource;
use App\Http\Resources\IndustryResource;
use App\Jobs\ActiveCampaign\UpdateActiveCampaignContactJob;
use App\Jobs\AttachAvatarToUserJob;
use App\Models\Asset\Category;
use App\Models\Avatar;
use App\Models\Industry;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Inertia\Response;
use Inertia\ResponseFactory;

class PreferenceController extends Controller
{
    /**
     * Show the glitch id screen
     *
     * @return Response|ResponseFactory
     */
    public function glitchId()
    {
        $videoAsset = VideoAsset::getResource();

        return inertia('Preference/GlitchId', compact('videoAsset'));
    }

    /**
     * Show the intro screen
     *
     * @return Response|ResponseFactory
     */
    public function shortIntro()
    {
        return inertia('Preference/ShortIntro');
    }

    /**
     * Show the onboarding screen
     *
     * @return Response|ResponseFactory
     */
    public function onboarding()
    {
        $categories = CategoryResource::collection(Category::orderBy('name')->get());
        $industries = IndustryResource::collection(Industry::all());
        $avatars = AvatarResource::collection(Avatar::get());

        return inertia('Preference/PreferencesLayout', compact(['categories', 'industries', 'avatars']));
    }

    /**
     * Store the onboarding data
     *
     * @return RedirectResponse
     */
    public function onboardingStore(OnboardingStoreRequest $request)
    {
        DB::beginTransaction();

        try {
            $user = _user();

            $user->interests()->sync($request->top_interests);

            $user->update([
                'business_owner' => $request->business_owner,
                'annual_revenue' => $request->annual_revenue,
            ]);

            $user->industries()->sync($request->industries);
        } catch (\Throwable $throwable) {
            DB::rollBack();

            return back()->with('error', _serverErrorMessage());
        }

        DB::commit();

        AttachAvatarToUserJob::dispatchSync(userId: _user()->id, avatarId: $request->avatar_id);
//        UpdateActiveCampaignContactJob::dispatch(userId: $user->id);

        return to_route('preference.transition');
    }

    /**
     * Show the identity screen
     *
     * @return Response|ResponseFactory
     */
    public function identity()
    {

        //        if (_user()->getFirstMediaPath('dp')) {
        //            return to_route('preference.transition');
        //        }

        $avatars = AvatarResource::collection(Avatar::get());

        return inertia('Preference/Identity', compact('avatars'));
    }

    /**
     * Show the transition animation screen
     *
     * @return Response|ResponseFactory
     */
    public function transition()
    {
        $videoAsset = VideoAsset::getResource();

        _user()->update(['profile_completed' => true]);

        return inertia('Preference/Transition', compact('videoAsset'));
    }

    /**
     * Show lock academy page of game
     *
     * @return Response|ResponseFactory
     */
    public function game()
    {
        $academyOpeningDate = Carbon::parse(config('app.academy_opening'));
        $timeDifferenceInSeconds = now()->diffInSeconds($academyOpeningDate);

        return inertia('Preference/GamePlay', compact('academyOpeningDate'));
    }
}
