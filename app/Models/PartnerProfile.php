<?php

namespace App\Models;

use App\Traits\AddDummyImageTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class PartnerProfile extends Model implements HasMedia
{
    use HasFactory, SoftDeletes, InteractsWithMedia, AddDummyImageTrait;

    protected $casts = [
        'head_offices' => 'array',
        'industries' => 'array',
    ];

    protected $with = ['media'];

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('dp')->singleFile();
        $this->addMediaCollection('cover')->singleFile();
    }

    public function registerAllMediaConversions(): void
    {
        $this->addMediaConversion('medium')
            ->performOnCollections('dp', 'cover')
            ->width(600)
            ->height(400)
            ->nonQueued();

        $this->addMediaConversion('small')
            ->performOnCollections('dp', 'cover')
            ->width(300)
            ->height(200)
            ->nonQueued();
    }
}
