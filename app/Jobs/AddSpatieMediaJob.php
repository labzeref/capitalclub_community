<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class AddSpatieMediaJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(
        private readonly mixed $source,
        private readonly Model $model,
        private readonly string $collection,
        private readonly string $strategy,

    ) {
        $this->onQueue('seeder');
    }

    /**
     * Add the media to the modal
     */
    public function handle(): void
    {

        $ext = pathinfo($this->source, PATHINFO_EXTENSION);
        switch ($this->strategy) {
            case 'path':
                $this->model->addMedia($this->source)
                    ->usingFileName(\Str::uuid().'.'.$ext)
                    ->preservingOriginal()
                    ->toMediaCollection($this->collection);
                break;
            case 'url':
                $this->model->addMediaFromUrl($this->source)
                    ->usingFileName(\Str::uuid().'.'.$ext)
                    ->toMediaCollection($this->collection);
        }
    }
}
