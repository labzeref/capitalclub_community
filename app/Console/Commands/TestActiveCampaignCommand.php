<?php

namespace App\Console\Commands;

use App\Jobs\ActiveCampaign\AddTagToActiveCampaignContactJob;
use App\Jobs\ActiveCampaign\CreateActiveCampaignContactJob;
use App\Jobs\ActiveCampaign\RemoveTagFromActiveCampaignContactJob;
use App\Jobs\ActiveCampaign\UpdateActiveCampaignContactJob;
use App\Jobs\ActiveCampaign\UpdateDiscordIdActiveCampaignContactJob;
use App\Jobs\ActiveCampaign\UpdateLoginTimeActiveCampaignContactJob;
use App\Models\User;
use Illuminate\Console\Command;

class TestActiveCampaignCommand extends Command
{
    protected $signature = 'test:active-campaign';

    protected $description = 'Command description';

    public function handle(): void
    {
        $options = [
            'Create contact in active campaign.',
            'Update user onboarding data in active campaign.',
            'Update discord username in active campaign.',
            'Update user login time in active campaign.',
            'Add tag of yearly member in active campaign.',
            'Remove tag of yearly member and assign cancel tag in active campaign.',
            'Do the all respectively.',
        ];

        $selectedOption = $this->choice('What do you want to do?', $options);

        $userId = $this->ask('Please enter the user id or leave blank for first user in database.');

        if (! $userId) {
            $user = User::first();
        } else {
            $user = User::find($userId);
        }

        if ($selectedOption == $options[0]) {
            CreateActiveCampaignContactJob::dispatchSync(userId: $user->id);
        } elseif ($selectedOption == $options[1]) {
            if (! $user->active_campaign_id) {
                $this->error('User does not has active campaign id.');

                return;
            }
            UpdateActiveCampaignContactJob::dispatchSync(userId: $user->id);
        } elseif ($selectedOption == $options[2]) {
            if (! $user->discord_integrated) {
                $this->error('User does not integrated the discord.');

                return;
            }
            UpdateDiscordIdActiveCampaignContactJob::dispatchSync(userId: $user->id);
        } elseif ($selectedOption == $options[3]) {
            if (! $user->active_campaign_id) {
                $this->error('User does not has active campaign id.');

                return;
            }
            UpdateLoginTimeActiveCampaignContactJob::dispatchSync(userId: $user->id, date: now()->format('m/d/Y'));
        } elseif ($selectedOption == $options[4]) {
            if (! $user->active_campaign_id) {
                $this->error('User does not has active campaign id.');

                return;
            }
            AddTagToActiveCampaignContactJob::dispatchSync(userId: $user->id);
        } elseif ($selectedOption == $options[5]) {
            if (! $user->active_campaign_id) {
                $this->error('User does not has active campaign id.');

                return;
            }
            RemoveTagFromActiveCampaignContactJob::dispatchSync(userId: $user->id);
        } else {
            if (! $user->discord_integrated) {
                $this->error('User does not integrated the discord.');

                return;
            }
            CreateActiveCampaignContactJob::dispatchSync(userId: $user->id);
            UpdateActiveCampaignContactJob::dispatchSync(userId: $user->id);
            UpdateDiscordIdActiveCampaignContactJob::dispatchSync(userId: $user->id);
            UpdateLoginTimeActiveCampaignContactJob::dispatchSync(userId: $user->id, date: now()->format('m/d/Y'));
            AddTagToActiveCampaignContactJob::dispatchSync(userId: $user->id);
        }

        $this->info('Job dispatches successfully');
    }
}
