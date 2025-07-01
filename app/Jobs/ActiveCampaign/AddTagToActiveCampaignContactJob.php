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

class AddTagToActiveCampaignContactJob implements ShouldQueue
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

        $url = rtrim(config('active-campaign.base_url'), '/').'/contactTags';

        $response = Http::withHeaders([
            'Content-Type' => 'application/json',
            'Api-Token' => config('active-campaign.token'),
        ])->post($url, [
            'contactTag' => [
                'contact' => $user->active_campaign_id,
                'tag' => config('active-campaign.tags.CC-Yearly-Members'),
            ],
        ]);

        if (! $response->successful()) {
            $this->log('While adding tag', $user->email, $response);
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
