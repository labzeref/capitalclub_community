<?php

use App\Http\Controllers\Api\GetUserInfoController;
use Illuminate\Support\Facades\Route;

Route::get('/users/get-info', GetUserInfoController::class);
