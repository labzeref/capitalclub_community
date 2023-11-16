<?php

namespace App\Jobs;

use App\Enums\PostTypeEnum;
use App\Models\Chunk;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\DB;

class CreatePostJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(
        private readonly int $user_id,
        private readonly array $data,
        private readonly string $media_key,
    ) {
    }

    public function handle(): void
    {
        $user = User::find($this->user_id);
        $chunk = Chunk::where('key', $this->media_key)->first();

        if (! $user) {
            $chunk?->delete();

            return;
        }

        DB::beginTransaction();

        try {
            $post = $user->posts()->create($this->data);

            if ($this->data['type'] == PostTypeEnum::video->name) {
                $post->addMedia($chunk->combineAndGetPath())->toMediaCollection('video');
            } elseif ($this->data['type'] == PostTypeEnum::image->name) {
                $post->addMedia($chunk->combineAndGetPath())->toMediaCollection('image');
            }

            logActivity(causedBy: $user, performedOn: $post, log: 'User create a post.');
            $chunk->delete();
        } catch (\Throwable $throwable) {
            DB::rollBack();

            $chunk->deleteDownloadedFiles();

            throw $throwable;
        }

        DB::commit();
    }
}
