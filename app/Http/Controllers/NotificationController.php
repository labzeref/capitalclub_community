<?php

namespace App\Http\Controllers;

use App\Http\Resources\NotificationResource;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    /**
     * Send the notification of the current log in user
     *
     * @return JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('limit');

        $response = NotificationResource::collection(
            _user()->notifications()->when(
                $limit,
                fn ($query) => $query->limit($limit)
            )
                ->get()
        );

        return $this->sendResponse($response);
    }

    public function clear()
    {
        _user()->notifications()->delete();

        return $this->sendResponse();
    }

    public function readAll()
    {
        _user()->notifications()->whereNull('read_at')->update(['read_at' => now()]);

        return $this->sendResponse();
    }
}
