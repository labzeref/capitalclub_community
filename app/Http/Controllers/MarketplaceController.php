<?php

namespace App\Http\Controllers;

use App\Http\Resources\Marketplace\MarketPlaceCategoryResource;
use App\Http\Resources\Marketplace\PartnerProfileResource;
use App\Models\Marketplace\MarketPlaceCategory;
use App\Models\Marketplace\PartnerProfile;
use Illuminate\Http\Request;
use Inertia\Response;
use Inertia\ResponseFactory;

class MarketplaceController extends Controller
{
    public function index()
    {
        $specialProfiles = PartnerProfileResource::collection(
            PartnerProfile::query()
                ->where('special', true)
                ->with('categories')
                ->orderBy('title')
                ->get()
        );

        $featuredProfiles = PartnerProfileResource::collection(
            PartnerProfile::query()
                ->where('featured', true)
                ->with('categories')
                ->orderBy('title')
                ->get()
        );

        $parentCategories = MarketPlaceCategoryResource::collection(
            MarketPlaceCategory::whereNull('parent_id')->get()
        );

        return inertia('Marketplace/Marketplace', compact(['featuredProfiles', 'parentCategories', 'specialProfiles']));
    }

    public function profile(PartnerProfile $partnerProfile)
    {
        $partnerProfile = new PartnerProfileResource($partnerProfile->load([
            'categories',
            'banners' => fn ($banners) => $banners->orderBy('order'),
            'reviews' => fn ($reviews) => $reviews->orderBy('id'),
            'plans' => fn ($plans) => $plans->orderBy('id'),
            'promoCodes' => fn ($promoCodes) => $promoCodes->orderBy('id'),
        ]));

        $relatedPartnerProfiles = PartnerProfileResource::collection( 
            PartnerProfile::query()
                ->withWhereHas(
                    'categories',
                    fn($categories) => $categories->whereIn('market_place_categories.id', $partnerProfile->categories->pluck('id')->toArray())
                )
                ->where('id', '!=', $partnerProfile->id)
                ->limit(3)
                ->get()
        );

        return inertia('Marketplace/MarketplaceProfile', compact(['partnerProfile', 'relatedPartnerProfiles']));
    }
    public function redeem(PartnerProfile $partnerProfile)
    {
        if (!$partnerProfile->redeem_link_embedded){
            return abort(404);
        }
        $partnerProfile = new PartnerProfileResource($partnerProfile->load([
            'categories',
            'banners' => fn ($banners) => $banners->orderBy('order'),
            'reviews' => fn ($reviews) => $reviews->orderBy('id'),
            'plans' => fn ($plans) => $plans->orderBy('id'),
        ]));
        return inertia('Marketplace/MarketplaceProfileRedeem', compact(['partnerProfile']));
    }

    public function searchList(Request $request)
    {
        $query = $request->query('query', null);

        $response = PartnerProfileResource::collection(
            PartnerProfile::with(['categories', 'subCategories'])
                ->where(function ($queryBuilder) use ($query) {
                    // Search by title
                    $queryBuilder->where('title', 'iLIKE', "%$query%")
                        // Or search by category name
                        ->orWhereHas('categories', function ($categoryQuery) use ($query) {
                            $categoryQuery->where('name', 'iLIKE', "%$query%");
                        });
                })
                ->paginate(20)
        )->resource;

        return $this->sendResponse($response);
    }

    public function category(Request $request, MarketPlaceCategory $category)
    {
        $category->load('subCategories');
        $query = $request->query('query', null);

        $partnerProfiles = PartnerProfileResource::collection(
            PartnerProfile::query()
                ->when($query, fn ($profiles) => $profiles->where('title', 'iLIKE', "%$query%"))
                ->withWhereHas(
                    'categories',
                    fn($categories) => $categories->where('market_place_categories.id', $category->id)
                )
                ->orWhereHas(
                    'subCategories',
                    fn($categories) => $categories->where('market_place_categories.parent_id', $category->id)
                )
                ->paginate(12)
        )->resource;

        if ($request->wantsJson()) {
            return $this->sendResponse($partnerProfiles);
        }

        $specialProfiles = PartnerProfileResource::collection(
            PartnerProfile::query()
                ->where('special', true)
                ->where(fn ($query) => $query
                    ->whereHas(
                        'categories',
                        fn($categories) => $categories->where('market_place_categories.id', $category->id)
                    )
                    ->orWhereHas(
                        'subCategories',
                        fn($categories) => $categories->whereIn(
                            'market_place_categories.id',
                            $category->subCategories->pluck('id')->toArray()
                        )
                    )
                )
                ->with('categories')
                ->orderBy('title')
                ->get()
        )->resource;


        $category = new MarketPlaceCategoryResource($category);

        $parentCategories = MarketPlaceCategoryResource::collection(
            MarketPlaceCategory::whereNull('parent_id')->get()
        );

        return inertia('Marketplace/MarketCategories', compact([
            'category',
            'specialProfiles',
            'partnerProfiles',
            'parentCategories',
        ]));
    }

    public function subCategory(Request $request, MarketPlaceCategory $category, MarketPlaceCategory $subCategory = null)
    {
        $category->load('subCategories');
        $query = $request->query('query', null);

        $partnerProfiles = PartnerProfileResource::collection(
            PartnerProfile::query()
                ->when($query, fn ($profiles) => $profiles->where('title', 'iLIKE', "%$query%"))
                ->withWhereHas(
                    'categories',
                    fn($categories) => $categories->where('market_place_categories.id', $category->id)
                )
                ->when(
                    !$subCategory,
                    fn($profiles) => $profiles->orWhereHas(
                        'subCategories',
                        fn($categories) => $categories->where('market_place_categories.parent_id', $category->id)
                    )
                )
                ->when(
                    $subCategory,
                    fn($profiles) => $profiles->whereHas(
                        'subCategories',
                        fn($categories) => $categories->where('market_place_categories.id', $subCategory->id)
                    )
                )
                ->paginate(12)
        )->resource;

        if ($request->wantsJson()) {
            return $this->sendResponse($partnerProfiles);
        }

        $specialProfiles = PartnerProfileResource::collection(
            PartnerProfile::query()
                ->where('special', true)
                ->withWhereHas(
                    'categories',
                    fn($categories) => $categories->where('partner_profile_category.id', $category->id)
                )
                ->whereHas(
                    'subCategories',
                    fn($categories) => $categories->where(
                        'partner_profile_sub_category.id',
                        $category->subCategories->pluck('id')->toArray()
                    )
                )
                ->orderBy('title')
                ->get()
        )->resource;


        $category = new MarketPlaceCategoryResource($category);
        $subCategoryId = $subCategory?->id;

        $parentCategories = MarketPlaceCategoryResource::collection(
            MarketPlaceCategory::whereNull('parent_id')->get()
        );

        return inertia('Marketplace/MarketCategories', compact([
            'category',
            'specialProfiles',
            'partnerProfiles',
            'parentCategories',
            'subCategoryId'
        ]));
    }
}
