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
use Laravel\Scout\Searchable;
use Maize\Markable\Markable;
use Maize\Markable\Models\Bookmark;

class LiveStream extends Model
{
    use SoftDeletes, HasFactory, Markable, Searchable, CascadeSoftDeletes;

    protected $guarded = ['id'];

    protected $appends = ['live_at_readable', 'status'];

    protected $casts = [
        'live_at' => 'timestamp:Y-m-d H:i:sT ',
        'live_end_at' => 'timestamp:Y-m-d H:i:sT ',
        'published' => 'boolean',
        'bannered' => 'boolean',
    ];

    protected array $cascadeDeletes = ['streamMessages'];

    protected static function booted(): void
    {
        static::addGlobalScope('published', function (Builder $builder) {
            $builder->where('published', true);
        });
    }

    protected function liveAtReadable(): Attribute
    {
        return Attribute::make(
            get: fn () => Carbon::createFromFormat('Y-m-d H:i:sT', $this->live_at)->diffForHumans()
        );
    }

    protected function status(): Attribute
    {
        $now = Carbon::now();

        return Attribute::make(
            get: fn () => $this->live_at > $now ?
                'upcoming'
                : ($this->live_end_at === null || $this->live_end_at > $now ?
                    'live'
                : 'was-live')
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
    public function hasSiblings(): bool
    {
        return self::where('live_series_id', $this->live_series->id)->count() > 1;
    }
}
