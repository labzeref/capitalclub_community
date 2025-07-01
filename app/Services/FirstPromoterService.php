<?php

namespace App\Services;

use GuzzleHttp\Promise\PromiseInterface;
use Illuminate\Http\Client\Response;
use Illuminate\Support\Facades\Http;

class FirstPromoterService
{
    private array $headers = ['Content-Type' => 'application/json', 'x-api-key' => '71baab5e593d010ed1f7b86441bf72db'];

    public function trackSale(array $data): PromiseInterface|Response
    {
        return Http::withHeaders($this->headers)->post('https://firstpromoter.com/api/v1/track/sale', $data);
    }

    public function cancellation(array $data): PromiseInterface|Response
    {
        return Http::withHeaders($this->headers)->post('https://firstpromoter.com/api/v1/track/cancellation', $data);
    }

    public function refund(array $data): PromiseInterface|Response
    {
        return Http::withHeaders($this->headers)->post('https://firstpromoter.com/api/v1/track/refund', $data);
    }
}
