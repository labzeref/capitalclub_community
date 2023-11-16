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

        if (! app()->environment(['local', 'testing']) && in_array($response->status(), [500, 404, 419])) {

            return match ($response->status()) {
                500 => inertia('Error/Error500'),
                419 => inertia('Error/Error419'),
                404 => inertia('Error/Error404'),
            };
        }

        return $response;
    }
}
