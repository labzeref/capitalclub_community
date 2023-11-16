<?php

namespace App\Models;

use App\Traits\AddDummyImageTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Trailer extends Model implements HasMedia
{
    use SoftDeletes, HasFactory, InteractsWithMedia, AddDummyImageTrait;

    protected $guarded = ['id'];

    protected $with = ['media'];

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('thumbnail')->singleFile();
        $this->addMediaCollection('video')->singleFile();
    }
}
