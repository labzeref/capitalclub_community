<?php

namespace App\Http\Controllers;

use App\Models\CheckoutChampOrder;
use App\Models\Subscription;
use App\Services\CheckoutChampService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;

class CheckoutChampRegisterUserController extends Controller
{
    public function create(Request $request)
    {
        Auth::logout();
        $orderId = $request->query('orderId');
        return inertia('CheckoutChamp/CheckRegistration', compact('orderId'));
    }

    public function store(Request $request, CheckoutChampService $checkoutChampService)
    {
        $orderId = $request->order_id;
        $tryCount = $request->try_count;

        if ($tryCount >= 15) {
            $response = $checkoutChampService->getOrder(orderId: $orderId);

            if ($response->json()['result'] == 'ERROR') {
                return $this->sendResponse(['showError' => true]);
            }
        }

        $order = CheckoutChampOrder::where('checkout_champ_id', $orderId)->latest('id')->first();
        $user = $order?->user;

        if ($user && $order->end_at > now()) {
            if ($user->created_at < now()->subHour()) {
                return $this->sendResponse([], 'User found successfully.');
            }

            Auth::login($user);
            $request->session()->put('siteUnlocked', true);

            return $this->sendResponse([], 'User found successfully.');
        }

        return response()->json(['error' => 'No user found.'], 404);

    }
}
