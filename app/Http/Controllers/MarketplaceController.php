<?php

namespace App\Http\Controllers;

use Inertia\Response;
use Inertia\ResponseFactory;

class MarketplaceController extends Controller
{
    /**
     * Show the marketplace screen
     *
     * @return Response|ResponseFactory
     */
    public function index()
    {
        return inertia('Marketplace/Marketplace');
    }
}
