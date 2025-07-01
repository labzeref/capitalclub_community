<?php

use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\CheckoutChampRegisterUserController;
use App\Http\Controllers\CheckoutChampWebhookController;
use Illuminate\Support\Facades\Route;

Route::prefix('/checkout-champ')->name('checkout-champ.')->group(function () {
    Route::controller(CheckoutChampWebhookController::class)->prefix('/cQ4zORO3qhImYNM/webhook')->name('webhook.')
        ->group(function () {
            Route::get('/new-sale', 'newSale')->name('new-sell');
            Route::get('/cancel', 'cancel')->name('cancel');
            Route::get('/refund', 'refund')->name('refund');
            Route::get('/partial-refund', 'partialRefund')->name('partial-refund');
            Route::get('/recurring', 'recurring')->name('recurring');
        });

    Route::controller(CheckoutChampRegisterUserController::class)->prefix('/register')->name('register.')
        ->group(function () {
            Route::get('/', 'create')->name('create');
            Route::post('/', 'store')->name('store');
        });
});
