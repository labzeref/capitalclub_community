<?php

namespace App\Jobs\ActiveCampaign;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Http\Client\Response;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class UpdateActiveCampaignContactJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(private readonly int $userId)
    {
        $this->queue = 'active-campaign';
    }

    public function handle(): void
    {
        $user = User::find($this->userId);

        if (! $user) {
            return;
        }

        if (! $user->active_campaign_id) {
            CreateActiveCampaignContactJob::dispatchSync(userId: $user->id);
        }

        $url = rtrim(config('active-campaign.base_url'), '/')."/contacts/$user->active_campaign_id";

        $fieldValues = [
            [
                'field' => config('active-campaign.fields.TOP_3_INTEREST'),
                'value' => $user->interests->pluck('name')->toArray(),
            ],
            [
                'field' => config('active-campaign.fields.DO_YOU_OWN_A_BUSINESS'),
                'value' => $user->business_owner,
            ],
        ];

        if ($user->business_owner == 'YES') {
            $fieldValues[] = [
                'field' => config('active-campaign.fields.WHAT_INDUSTRY'),
                'value' => $user->industries->pluck('name')->toArray(),
            ];

            $fieldValues[] = [
                'field' => config('active-campaign.fields.BIZ_ANNUAL_REVENUE'),
                'value' => $user->annual_revenue,
            ];
        }

        $response = Http::withHeaders([
            'Content-Type' => 'application/json',
            'Api-Token' => config('active-campaign.token'),
        ])->put($url, [
            'contact' => [
                'fieldValues' => $fieldValues,
            ],
        ]);

        if (! $response->successful()) {
            $this->log('Wile updating onboarding data', $user->email, $response);
            throw new \Exception($response->body());
        }
    }

    private function log(string $message, string $identifier, Response $response = null): void
    {
        Log::channel('active-campaign')->info($message);
        Log::channel('active-campaign')->info($identifier);
        if ($response) {
            Log::channel('active-campaign')->info($response->body());
            Log::channel('active-campaign')->info($response->status());
        }
        Log::channel('active-campaign')->info('----------------------------------------------------------------------------------------------------------');
    }
}
