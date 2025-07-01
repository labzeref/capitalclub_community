<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;

class Handler extends ExceptionHandler
{
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    public function register(): void
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }

    public function render($request, Throwable $e)
    {
        $response = parent::render($request, $e);

        if (
            ! app()->environment(['local', 'testing']) &&
            in_array($response->status(), [403, 404, 405, 419, 429, 500])
        ) {
            return match ($response->status()) {
                403 => inertia('Error/Error403'),
                404 => inertia('Error/Error404'),
                405 => inertia('Error/Error405'),
                419 => inertia('Error/Error419'),
                429 => inertia('Error/Error429'),
                500 => inertia('Error/Error500'),
            };
        }

        return $response;
    }
}
