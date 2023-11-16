<?php

namespace App\Http\Controllers;

use App\Assets\VideoAsset;
use Illuminate\Support\Carbon;
use Inertia\Response;
use Inertia\ResponseFactory;

class WelcomeController extends Controller
{
    /**
     * Show the welcome screen
     *
     * @return Response|ResponseFactory
     */
    public function __invoke()
    {
        $hideButton = false;

        $videoAsset = VideoAsset::getResource();

        return inertia('Preference/IntroPage', compact(['hideButton', 'videoAsset']));
    }
}
