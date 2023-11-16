<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class NotificationResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'image' => $this->data['image'],
            'title' => $this->data['title'],
            'description' => $this->data['description'],
            'read' => $this->read_at?->diffForHumans(),
            'created_at' => $this->created_at?->diffForHumans(),
        ];
    }
}
