<?php

namespace App\Models;

use App\Traits\AddDummyImageTrait;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class TemporaryMedia extends Model implements HasMedia
{
    use InteractsWithMedia, AddDummyImageTrait;

    protected $guarded = ['id'];

    public static function boot(): void
    {
        parent::boot();

        static::deleting(function ($temporaryMedia) {
            if (method_exists($temporaryMedia, 'isForceDeleting') && ! $temporaryMedia->isForceDeleting()) {
                return;
            }

            $temporaryMedia->media()->delete();
        });
    }

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('temp')->singleFile();
    }

    //    public function registerAllMediaConversions(): void
    //    {
    //        $this->addMediaConversion('medium')
    //            ->performOnCollections('temp')
    //            ->width(600)
    //            ->height(400)
    //            ->nonQueued();
    //
    //        $this->addMediaConversion('small')
    //            ->performOnCollections('temp')
    //            ->width(300)
    //            ->height(200)
    //            ->nonQueued();
    //    }
}
