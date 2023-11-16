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
use Laravel\Scout\Searchable;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Instructor extends Model implements HasMedia
{
    use SoftDeletes, HasFactory, InteractsWithMedia, AddDummyImageTrait, Searchable;

    protected $guarded = ['id'];

    protected $with = ['category', 'media'];

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
            ->height(400)
            ->nonQueued();

        $this->addMediaConversion('small')
            ->performOnCollections('dp')
            ->width(300)
            ->height(200)
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
    public function courses(): MorphToMany
    {
        return $this->morphedByMany(Course::class, 'instructorable');
    }

    public function liveSeries(): MorphToMany
    {
        return $this->morphedByMany(LiveSeries::class, 'instructorable');
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function socialMedia(): MorphOne
    {
        return $this->morphOne(SocialMedia::class, 'socialable');
    }
}
