<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;

class RoadmapController extends Controller
{
     public function roadmap(){
        if (!Auth::check()) {
            return redirect()->route('login');
        }
        return inertia('RoadMap/RoadMap');
     }
}
