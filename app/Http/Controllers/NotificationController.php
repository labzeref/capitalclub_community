<?php

namespace App\Http\Controllers;

use App\Http\Resources\NotificationResource;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function index(Request $request)
    {
        $limit = $request->get('limit');

        $response = NotificationResource::collection(
            _user()->notifications()->when(
                $limit,
                fn ($query) => $query->limit($limit)
            )->get()
        );

        return $this->sendResponse($response);
    }
}
