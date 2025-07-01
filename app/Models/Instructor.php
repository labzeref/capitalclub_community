<?php

namespace App\Models;

use App\Models\Asset\Category;
use App\Traits\AddDummyImageTrait;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Illuminate\Database\Eloquent\Relations\MorphToMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Instructor extends Model implements HasMedia
{
    use SoftDeletes, HasFactory, InteractsWithMedia, AddDummyImageTrait;

    protected $guarded = ['id'];

    protected $with = ['category', 'media', 'country'];

    protected $appends = ['full_name'];

    protected function fullName(): Attribute
    {
        return Attribute::make(
            get: fn ($user) => "$this->first_name $this->last_name"
        );
    }

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

    public function toSearchableArray(): array
    {
        return [
            'first_name' => (string) $this->first_name,
            'last_name' => (string) $this->last_name,
            'full_name' => (string) $this->full_name,
            'about' => (string) $this->about,
        ];
    }

    /**
     * -----------------------
     *  Relations
     * ------------------------
     */
    public function country(): BelongsTo
    {
        return $this->belongsTo(Country::class, 'country_iso', 'iso');
    }

    public function courses(): MorphToMany
    {
        return $this->morphedByMany(Course::class, 'instructorable');
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function socialMedia(): MorphOne
    {
        return $this->morphOne(SocialMedia::class, 'socialable');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
