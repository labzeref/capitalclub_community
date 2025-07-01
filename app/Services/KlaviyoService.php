<?php

namespace App\Services;

use GuzzleHttp\Promise\PromiseInterface;
use Illuminate\Http\Client\Response;
use Illuminate\Support\Facades\Http;

class KlaviyoService
{
    const BASE_URL = 'https://a.klaviyo.com/api';

    private string $key;
    private array $headers;

    public function __construct()
    {
        $this->key = config('klaviyo.key');
        $this->headers = [
            'Authorization' => "Klaviyo-API-Key $this->key",
            'accept' => 'application/json',
            'content-type' => 'application/json',
            'revision' => '2023-12-15',
        ];
    }


    public function getLists(): PromiseInterface|Response
    {
        return Http::withHeaders($this->headers)->get(self::BASE_URL . '/lists');
    }

    public function createProfile(array $attributes): PromiseInterface|Response
    {
        return Http::withHeaders($this->headers)
            ->post(self::BASE_URL . '/profiles', [
                'data' => [
                    'type' => 'profile',
                    'attributes' => $attributes
                ]
            ]);
    }

    public function addProfileToList(string $listId, string $profileId): PromiseInterface|Response
    {
        return Http::withHeaders($this->headers)
            ->post(self::BASE_URL . "/lists/$listId/relationships/profiles", [
                'data' => [
                    [
                        'type' => 'profile',
                        'id' => $profileId,
                    ]
                ]
            ]);
    }

    public function subscribeProfile(string $email, string $phoneNumber, string $profileId, string $listId): PromiseInterface|Response
    {
        return Http::withHeaders($this->headers)->post(self::BASE_URL . '/profile-subscription-bulk-create-jobs', [
            'data' => [
                'type' => 'profile-subscription-bulk-create-job',
                'attributes' => [
                    'custom_source' => 'Marketing Event',
                    'profiles' => [
                        'data' => [
                            [
                                'type' => 'profile',
                                'id' => $profileId,
                                'attributes' => [
                                    'email' => $email,
                                    'phone_number' => $phoneNumber,
                                    'subscriptions' => [
                                        'email' => [
                                            'marketing' => [
                                                'consent' => 'SUBSCRIBED',
                                            ],
                                        ],
                                        'sms' => [
                                            'marketing' => [
                                                'consent' => 'SUBSCRIBED',
                                            ],
                                        ],
                                    ],
                                ],
                            ],
                        ],
                    ],
                ],
                'relationships' => [
                    'list' => [
                        'data' => [
                            'type' => 'list',
                            'id' => $listId,
                        ],
                    ],
                ],
            ],
        ]);
    }

    public function findProfileByEmail(string $email): PromiseInterface|Response
    {
        return Http::withHeaders($this->headers)
            ->get(self::BASE_URL . '/profiles/?filter=equals(email,"'.$email.'")');
    }

    public function updateProfile(string $klaviyoId, array $attributes): PromiseInterface|Response
    {
        return Http::withHeaders($this->headers)
            ->patch(self::BASE_URL . "/profiles/$klaviyoId", [
                'data' => [
                    'type' => 'profile',
                    'id' => "$klaviyoId",
                    'attributes' => $attributes
                ]
            ]);
    }
}
