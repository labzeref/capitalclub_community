<?php

namespace App\Models\Marketplace;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Support\Str;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class PartnerProfile extends Model implements HasMedia
{
    use HasFactory, InteractsWithMedia;

    protected $guarded = ['id'];

    protected $with = ['media'];

    protected $casts = [
        'featured' => 'bool',
        'cc_benefits' => 'json',
    ];

    public static function boot(): void
    {
        parent::boot();

        static::addGlobalScope('published', function (Builder $profile) {
            $profile->whereNotNull('published_at');
        });

        self::creating(function (PartnerProfile $profile) {
            $profile->slug = Str::slug($profile->title);
        });
    }

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('logo')->singleFile();
    }

    public function registerAllMediaConversions(): void
    {
        $this->addMediaConversion('medium')
            ->performOnCollections('logo')
            ->width(600)
            ->keepOriginalImageFormat()
            ->nonQueued();

        $this->addMediaConversion('small')
            ->performOnCollections('logo')
            ->width(200)
            ->keepOriginalImageFormat()
            ->nonQueued();

        $this->addMediaConversion('blur')
            ->performOnCollections('logo')
            ->blur(15) // Adjust the blur amount as needed
            ->width(70)
            ->keepOriginalImageFormat()
            ->nonQueued();


    }

    /**
     * -------------------------------------------------------------------------------
     * Relations
     * -------------------------------------------------------------------------------
     */

    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(MarketPlaceCategory::class, 'partner_profile_category', 'profile_id', 'category_id');
    }

    public function subCategories(): BelongsToMany
    {
        return $this->belongsToMany(MarketPlaceCategory::class, 'partner_profile_sub_category', 'profile_id', 'category_id');
    }

    public function plans(): HasMany
    {
        return $this->hasMany(PartnerProfilePlan::class, 'profile_id');
    }

    public function promoCodes(): HasMany
    {
        return $this->hasMany(PromoCode::class, 'profile_id');
    }

    public function reviews(): HasMany
    {
        return $this->hasMany(PartnerProfileReview::class, 'profile_id');
    }

    public function banners(): HasMany
    {
        return $this->hasMany(PartnerProfileBanner::class, 'profile_id');
    }

    public function review(): HasOne
    {
        return $this->hasOne(PartnerProfileReview::class, 'profile_id');
    }
}
