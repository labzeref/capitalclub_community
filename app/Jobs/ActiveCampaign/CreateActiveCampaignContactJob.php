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

class CreateActiveCampaignContactJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(private readonly int $userId)
    {
        $this->queue = 'active-campaign';
    }

    public function handle(): void
    {
        $user = User::find($this->userId);

        if (!$user) {
            return;
        }

        $url = rtrim(config('active-campaign.base_url'), '/') . '/contact/sync';

        $response = Http::withHeaders([
            'Content-Type' => 'application/json',
            'Api-Token' => config('active-campaign.token'),
        ])->post($url, [
            'contact' => [
                'email' => $user->email,
                'first_name' => $user->first_name,
                'last_name' => $user->last_name,
                'phone' => $user->billingAddress?->phone_number,
                'fieldValues' => [[
                    'field' => config('active-campaign.fields.GLITCH_NUMBER'),
                    'value' => $user->id,
                ]]
            ]
        ]);

        if ($response->successful()) {
            $data = $response->json();
            $id = $data['contact']['id'];

            $user->update(['active_campaign_id' => $id]);
        } else {
            $this->log("While adding tag", $user->email, $response);
            throw new \Exception($response->body());
        }
    }

    private function log(string $message, string $identifier, ?Response $response = null): void
    {
        Log::channel('active-campaign')->info($message);
        Log::channel('active-campaign')->info($identifier);
        if ($response) {
            Log::channel('active-campaign')->info($response->body());
            Log::channel('active-campaign')->info($response->status());
        }
        Log::channel('active-campaign')->info("----------------------------------------------------------------------------------------------------------");
    }
}
