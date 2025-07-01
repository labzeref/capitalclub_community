<?php

namespace App\Models\LiveStream;

use App\Models\Instructor;
use App\Models\User;
use Dyrynda\Database\Support\CascadeSoftDeletes;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;
use Maize\Markable\Markable;
use Maize\Markable\Models\Bookmark;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

// Import the correct Builder class

class LiveStream extends Model implements HasMedia
{
    use SoftDeletes, HasFactory, Markable, CascadeSoftDeletes, InteractsWithMedia;

    protected $guarded = ['id'];

    protected $with = ['media'];

    protected $casts = [
        'live_at' => 'datetime',
        'live_end_at' => 'datetime',
        'published_at' => 'date',
    ];

    protected static function booted(): void // only for student side
    {
        static::addGlobalScope('published', function (Builder $builder) {
            $builder->whereNotNull('published_at');
        });
    }

    protected static array $marks = [
        Bookmark::class,
    ];

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('thumbnail')->singleFile();
        $this->addMediaCollection('banner')->singleFile();
        $this->addMediaCollection('mobileBanner')->singleFile();
    }

    /**
     * -----------------
     * | Relations
     * -----------------
     */
    public function enrolledUsers(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'live_stream_enrollment')
            ->withPivot('enrolled_at');
    }

    public function instructor(): BelongsTo
    {
        return $this->belongsTo(Instructor::class);
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(LiveStreamCategory::class);
    }

    /**
     * -----------------
     * | Methods
     * -----------------
     */

    public function note(): HasOne
    {
        return $this->hasOne(LiveStreamNote::class);
    }
}
