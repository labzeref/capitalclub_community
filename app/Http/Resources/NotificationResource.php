<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class NotificationResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'iconUrl' => _getSignedUrl($this->data['iconPath']),
            'title' => $this->data['title'],
            'link' => $this->data['link'],
            'read' => $this->read_at?->diffForHumans(),
            'created_at' => $this->created_at?->diffForHumans(),
        ];
    }
}
