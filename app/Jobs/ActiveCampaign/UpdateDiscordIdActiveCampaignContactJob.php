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

class UpdateDiscordIdActiveCampaignContactJob implements ShouldQueue
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
                'field' => config('active-campaign.fields.DISCORD_USERNAME'),
                'value' => $user->discord_id,
            ],
        ];

        $response = Http::withHeaders([
            'Content-Type' => 'application/json',
            'Api-Token' => config('active-campaign.token'),
        ])->put($url, [
            'contact' => [
                'fieldValues' => $fieldValues,
            ],
        ]);

        if (! $response->successful()) {
            $this->log('While update discord', $user->email, $response);
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
