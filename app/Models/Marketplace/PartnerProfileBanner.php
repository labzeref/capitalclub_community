<?php

namespace App\Models\Marketplace;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class PartnerProfileBanner extends Model implements HasMedia
{
    use HasFactory, InteractsWithMedia;

    protected $fillable = ['id'];

    protected $casts = [
        'is_vimeo' => 'bool',
    ];

    protected $with = ['media'];

    protected static function boot(): void
    {
        parent::boot();

        self::creating(
            fn(PartnerProfileBanner $banner) => $banner->order = PartnerProfileBanner::query()
                    ->whereProfileId($banner->profile_id)
                    ->latest('id')
                    ->value('order') + 1
        );
    }

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('thumbnail')->singleFile();
        $this->addMediaCollection('image')->singleFile();
        $this->addMediaCollection('mobile_image')->singleFile();
    }

    public function registerAllMediaConversions(): void
    {
        $this->addMediaConversion('medium')
            ->performOnCollections('thumbnail', 'image', 'mobile_image')
            ->width(600)
            ->keepOriginalImageFormat()
            ->nonQueued();

        $this->addMediaConversion('small')
            ->performOnCollections('thumbnail', 'image', 'mobile_image')
            ->width(300)
            ->keepOriginalImageFormat()
            ->nonQueued();

        $this->addMediaConversion('blur')
            ->performOnCollections('thumbnail', 'image', 'mobile_image')
            ->blur(15) // Adjust the blur amount as needed
            ->width(70)
            ->keepOriginalImageFormat()
            ->nonQueued();
    }

    /**
     * --------------------------------------------------------
     * Relations
     * --------------------------------------------------------
     */

    public function profile(): BelongsTo
    {
        return $this->belongsTo(PartnerProfile::class, 'profile_id');
    }
}
