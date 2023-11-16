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

class RemoveTagFromActiveCampaignContactJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private string $baseUrl;

    public function __construct(private readonly int $userId)
    {
        $this->queue = 'active-campaign';
        $this->baseUrl = rtrim(config('active-campaign.base_url'), '/');
    }

    public function handle(): void
    {
        $user = User::find($this->userId);

        if (!$user) {
            return;
        }

        if ($user->active_campaign_id) {

            $removableTagId = $this->getRemovableTagId(user: $user);

            if (!$removableTagId) {
                $this->log("User does not has CC - Yearly-Member tag", $user->email);
            }else{
                try {
                    $this->removeTag(tagId: $removableTagId);
                }catch (\Exception $exception){

                }
            }


            $this->assignRefundTag(user: $user);
        } else {
            CreateActiveCampaignContactJob::dispatchSync(userId: $user->id);

            $this->assignRefundTag(user: $user);
        }
    }

    private function getRemovableTagId(User $user)
    {
        $url = "$this->baseUrl/contacts/$user->active_campaign_id/contactTags";

        $response = Http::withHeaders([
            'Content-Type' => 'application/json',
            'Api-Token' => config('active-campaign.token'),
        ])->get($url);

        if ($response->ok()) {
            $data = $response->json();
            $tag = collect($data['contactTags'])
                ->where('tag', config('active-campaign.tags.CC-Yearly-Members'))
                ->first();

            return $tag ? $tag['id'] : null;
        }

        $this->log("While getting removable tag id", $user->email, $response);

        return null;
    }

    private function removeTag(string $tagId) : void
    {
        $url = "$this->baseUrl/contactTags/$tagId";

        $response = Http::withHeaders([
            'Content-Type' => 'application/json',
            'Api-Token' => config('active-campaign.token'),
        ])->delete($url);

        if (!$response->ok()) {
            $this->log("While removing tag", $this->userId, $response);
        }
    }

    private function assignRefundTag(User $user) : void
    {
        $url = "$this->baseUrl/contactTags";

        $response = Http::withHeaders([
            'Content-Type' => 'application/json',
            'Api-Token' => config('active-campaign.token'),
        ])->post($url, [
            'contactTag' => [
                'contact' => $user->active_campaign_id,
                'tag' => config('active-campaign.tags.CC-Cancellations-Refunded'),
            ]
        ]);

        if (!$response->successful()) {
            $this->log("While assigning refund tag", $user->email, $response);
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
