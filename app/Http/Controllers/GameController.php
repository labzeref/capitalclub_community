<?php

namespace App\Http\Controllers;

use Illuminate\Support\Carbon;

class GameController extends Controller
{
    public function index()
    {
        return view('game');
    }
}
