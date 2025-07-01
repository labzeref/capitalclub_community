<?php

namespace App\Jobs\Klaviyo;

use App\Models\User;
use App\Services\KlaviyoService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Http\Client\Response;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class SendOnBoardingDataToKlaviyoJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private KlaviyoService $service;

    public function __construct(readonly private User $user)
    {
        $this->service = new KlaviyoService();
    }

    public function handle(): void
    {
        $response = $this->service->findProfileByEmail(email: $this->user->email);

        if (!$response->successful()) {
            $this->log(message: 'Find profile api failed', identifier: $this->user->email, response: $response);
            return;
        }

        if (empty($response->json()['data'])) {
            $attributes = [
                'first_name' => $this->user->first_name,
                'last_name' => $this->user->last_name,
                'email' => $this->user->email,
                'phone_number' => $this->user->billingAddress?->phone_number,
                'properties' => [
                    'glitchNumber' => $this->user->id,
                    'OQ_top3Interests' => $this->user->interests->pluck('name')->toArray(),
                    'OQ_ownBusiness' => $this->user->business_owner,
                    'OQ_whatIndustry' => $this->user->industries->pluck('name')->toArray(),
                    'OQ_annualRevenue' => $this->user->annual_revenue,
                ],
            ];

            $response = $this->service->createProfile(attributes: $attributes);

            if (!$response->successful()) {
                $this->log(message: 'Unable to create profile', identifier: $this->user->email, response: $response);
                return;
            }

            $klaviyoId = $response->json()['data']['id'];
            $this->user->update(['klaviyo_id' => $klaviyoId]);

            return;
        } else {
            $klaviyoId = $response->json()['data'][0]['id'];
            $this->user->update(['klaviyo_id' => $klaviyoId]);
        }

        $attributes = [
            'first_name' => $this->user->first_name,
            'last_name' => $this->user->last_name,
            'properties' => [
                'glitchNumber' => $this->user->id,
                'OQ_top3Interests' => $this->user->interests->pluck('name')->toArray(),
                'OQ_ownBusiness' => $this->user->business_owner,
                'OQ_whatIndustry' => $this->user->industries->pluck('name')->toArray(),
                'OQ_annualRevenue' => $this->user->annual_revenue,
            ],
        ];

        $response = $this->service->updateProfile(klaviyoId: $this->user->klaviyo_id, attributes: $attributes);

        if (!$response->successful()) {
            $this->log(message: 'Unable to update on boarding to profile', identifier: $this->user->email, response: $response);
            return;
        }
    }

    private function log(string $message, string $identifier, ?Response $response = null): void
    {
        Log::channel('klaviyo')->info($message);
        Log::channel('klaviyo')->info($identifier);
        if ($response) {
            Log::channel('klaviyo')->info($response->body());
            Log::channel('klaviyo')->info($response->status());
        }
        Log::channel('klaviyo')->info("----------------------------------------------------------------------------------------------------------");
    }
}
