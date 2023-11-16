<?php

namespace App\Http\Controllers;

use App\Http\Resources\Asset\CategoryResource;
use App\Models\Asset\Category;

class PreferenceController extends Controller
{
    public function interests()
    {
        $categories = CategoryResource::collection(Category::all());

        return inertia('Preference/Interests', compact('categories'));
    }
}
