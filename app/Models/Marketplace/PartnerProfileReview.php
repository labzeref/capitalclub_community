<?php

namespace App\Models\Marketplace;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class PartnerProfileReview extends Model implements HasMedia
{
    use HasFactory, InteractsWithMedia;

    protected $guarded = ['id'];

    protected $with = ['media'];

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('dp')->singleFile();
    }

    public function registerAllMediaConversions(): void
    {
        $this->addMediaConversion('medium')
            ->performOnCollections('dp')
            ->width(600)
            ->keepOriginalImageFormat()
            ->nonQueued();

        $this->addMediaConversion('small')
            ->performOnCollections('dp')
            ->width(300)
            ->keepOriginalImageFormat()
            ->nonQueued();
    }

    /**
     * ------------------------------------------------------------------------
     * Relations
     * ------------------------------------------------------------------------
     */

    public function profile(): BelongsTo
    {
        return $this->belongsTo(PartnerProfile::class, 'profile_id');
    }
}
