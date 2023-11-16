<?php

namespace App\Models;

use App\Traits\AddDummyImageTrait;
use Dyrynda\Database\Support\CascadeSoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphToMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class LiveSeries extends Model implements HasMedia
{
    use SoftDeletes, HasFactory, InteractsWithMedia, AddDummyImageTrait, CascadeSoftDeletes;

    protected $guarded = ['id'];

    protected $casts = [
        'published' => 'boolean',
    ];

    protected $with = ['media', 'defaultInstructor', 'liveStreams'];

    protected array $cascadeDeletes = ['liveStreams'];

    public function toSearchableArray(): array
    {
        return [
            'title' => (string) $this->title,
            'description' => (string) $this->description,
        ];
    }

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('thumbnail')->singleFile();
        $this->addMediaCollection('mobileThumbnail')->singleFile();
    }

    public function registerAllMediaConversions(): void
    {
        $this->addMediaConversion('medium')
            ->performOnCollections('thumbnail')
            ->width(600)
            ->keepOriginalImageFormat()
            ->nonQueued();

        $this->addMediaConversion('small')
            ->performOnCollections('thumbnail')
            ->width(300)
            ->keepOriginalImageFormat()
            ->nonQueued();

        $this->addMediaConversion('medium')
            ->performOnCollections('mobileThumbnail')
            ->width(600)
            ->keepOriginalImageFormat()
            ->nonQueued();

        $this->addMediaConversion('small')
            ->performOnCollections('mobileThumbnail')
            ->width(300)
            ->keepOriginalImageFormat()
            ->nonQueued();
    }

    /**
     * -----------------
     * | Relations
     * -----------------
     */
    public function liveStreams(): HasMany
    {
        return $this->hasMany(LiveStream::class);
    }

    public function instructors(): MorphToMany
    {
        return $this->morphToMany(Instructor::class, 'instructorable');
    }

    public function defaultInstructor(): BelongsTo
    {
        return $this->belongsTo(Instructor::class, 'default_instructor_id');
    }
}
