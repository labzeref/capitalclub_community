<?php

namespace App\Models;

use Carbon\Carbon;
use Dyrynda\Database\Support\CascadeSoftDeletes;
use Illuminate\Database\Eloquent\Builder; // Import the correct Builder class
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Maize\Markable\Markable;
use Maize\Markable\Models\Bookmark;

class LiveStream extends Model
{
    use SoftDeletes, HasFactory, Markable, CascadeSoftDeletes;

    protected $guarded = ['id'];

    protected $appends = ['live_at_readable', 'status'];

    protected $casts = [
        'live_at' => 'timestamp:Y-m-d H:i:sT ',
        'live_end_at' => 'timestamp:Y-m-d H:i:sT ',
        'published_at' => 'datetime',
        'featured' => 'boolean',
    ];

    protected array $cascadeDeletes = ['streamMessages'];

    protected static function booted(): void // only for student side
    {
        static::addGlobalScope('published', function (Builder $builder) {
            $builder->whereNotNull('published_at');
        });
    }

    public function scopeNotFeatured(Builder $query): void
    {
        $query->where('featured', false);
    }

    public function scopeFeatured(Builder $query): void
    {
        $query->where('featured', true);
    }

    public function scopeUpcoming(Builder $query): void
    {
        $query->where('live_at', '>', now());
    }

    public function scopeLive(Builder $query): void
    {
        $query->where('live_at', '<=', now())
            ->whereNull('live_end_at');
    }

    public function scopeWasLive(Builder $query): void
    {
        $query->where('live_at', '<=', now())
            ->whereNotNull('live_end_at');
    }

    protected function liveAtReadable(): Attribute
    {
        return Attribute::make(
            get: fn () => Carbon::createFromFormat('Y-m-d H:i:sT', $this->live_at)->diffForHumans()
        );
    }

    protected function status(): Attribute
    {
        $live_at = Carbon::parse($this->live_at);
        $live_end_at = Carbon::parse($this->live_end_at);

        return Attribute::make(
            get: fn () => $live_at > now() ? 'upcoming' : ($this->live_end_at === null ? 'live' : 'was-live')
        );
    }

    protected static array $marks = [
        Bookmark::class,
    ];

    public function toSearchableArray(): array
    {
        return [
            'sub_title' => (string) $this->sub_title,
        ];
    }

    /**
     * -----------------
     * | Relations
     * -----------------
     */
    public function liveSeries(): BelongsTo
    {
        return $this->belongsTo(LiveSeries::class);
    }

    public function streamMessages(): HasMany
    {
        return $this->hasMany(StreamMessage::class);
    }

    public function enrolledUsers(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'live_stream_enrollment')
            ->withPivot('enrolled_at');
    }

    /**
     * -----------------
     * | Methods
     * -----------------
     */

    /**
     * Tells this live training has sibling or not in the same group
     */
    public function hasSiblings(): bool
    {
        return self::where('live_series_id', $this->live_series->id)->count() > 1;
    }
}
