<?php

namespace App\Models;

use App\Traits\AddDummyImageTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Avatar extends Model implements HasMedia
{
    use SoftDeletes, InteractsWithMedia, HasFactory, AddDummyImageTrait;

    protected $guarded = [];

    protected $with = ['media'];

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('image')->singleFile();
    }
}
