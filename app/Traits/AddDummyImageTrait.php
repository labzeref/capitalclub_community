<?php

namespace App\Traits;

use Illuminate\Support\Facades\File;

trait AddDummyImageTrait
{
    public function addDummyMedia(string $directory, string $mediaCollection): void
    {
        if (! File::isDirectory($directory)) {
            return;
        }

        $files = glob($directory.'/*');

        if (empty($files)) {
            return;
        }

        $randomFile = $files[array_rand($files)];
        $this->addMedia($randomFile)->preservingOriginal()->toMediaCollection($mediaCollection);
    }
}
