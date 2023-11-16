<?php

namespace App\Http\Controllers;

use App\Http\Resources\PartnerProfileResource;
use App\Models\PartnerProfile;

class MarketplaceController extends Controller
{
    public function index()
    {
        $partnerProfiles = PartnerProfileResource::collection(
            PartnerProfile::paginate(10)
        )->resource;

        return inertia('Marketplace/Marketplace', compact('partnerProfiles'));
    }

    public function list()
    {
        $response = PartnerProfileResource::collection(
            PartnerProfile::paginate(10)
        )->resource;

        return $this->sendResponse($response);
    }

    public function profile(PartnerProfile $partner_profile)
    {
        $partnerProfile = new PartnerProfileResource($partner_profile);

        return inertia('Marketplace/MarketProfile', compact('partnerProfile'));
    }
}
