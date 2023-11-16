<?php

namespace App\Http\Resources\Media;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

/** @mixin Media */
class BlurMediaResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'url' => _getSignedUrl($this->getPath('blur')),
        ];
    }
}
