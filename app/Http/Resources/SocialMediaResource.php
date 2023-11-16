<?php

namespace App\Http\Resources;

use App\Http\Resources\User\UserResource;
use App\Models\SocialMedia;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin SocialMedia */
class SocialMediaResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'user_id' => new UserResource($this->whenLoaded('user')),
            'twitter' => $this->twitter,
            'linkedin' => $this->linkedin,
            'instagram' => $this->instagram,
            'youtube' => $this->youtube,
        ];
    }
}
