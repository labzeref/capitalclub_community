<?php

namespace App\Traits;

use Illuminate\Http\JsonResponse;

trait ResponseMethods
{
    protected function sendError(string $errorMessages = 'Something went wrong, internal server error.', int $code = 500, array $result = []): JsonResponse
    {
        $response = [
            'metadata' => [
                'message' => $errorMessages,
            ],
            'payload' => $result,
        ];

        return response()->json($response, $code);
    }

    protected function sendResponse($result = [], string $message = '', int $code = 200): JsonResponse
    {
        $response = [
            'metadata' => [
                'message' => $message,
            ],
            'payload' => $result,
        ];

        return response()->json($response, $code);
    }
}
