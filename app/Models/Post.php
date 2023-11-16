<?php

namespace App\Models;

use App\Enums\PostStatusEnum;
use Dyrynda\Database\Support\CascadeSoftDeletes;
use FFMpeg\Coordinate\TimeCode;
use FFMpeg\FFMpeg;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\File;
use Maize\Markable\Markable;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Post extends Model implements HasMedia
{
    use SoftDeletes, InteractsWithMedia, Markable, CascadeSoftDeletes;

    protected $guarded = ['id'];

    protected $casts = [
        'published' => 'bool',
        'published_at' => 'date',
        'poll_duration_date' => 'date',
        'schedule_at' => 'datetime',
        'status' => PostStatusEnum::class,
        'reported' => 'boolean',
        'reported_at' => 'date',
    ];

    protected $with = ['media'];

    protected static array $marks = [
        \Maize\Markable\Models\Bookmark::class,
        \Maize\Markable\Models\Reaction::class,
    ];

    protected array $cascadeDeletes = ['choices', 'comments', 'polling', 'reports'];

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('image')->singleFile();
        $this->addMediaCollection('video')->singleFile();
    }

    public function registerAllMediaConversions(): void
    {
        $this->addMediaConversion('thumbnail')
            ->performOnCollections('video')
            ->extractVideoFrameAtSecond(5)
            ->width(600)
            ->height(400)
            ->nonQueued();
    }

    /**
     * ------------------
     * | Relations
     * ------------------
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function choices(): HasMany
    {
        return $this->hasMany(Choice::class);
    }

    public function comments(): HasMany
    {
        return $this->hasMany(PostComment::class);
    }

    public function polling(): HasMany
    {
        return $this->hasMany(ChoicePolling::class);
    }

    public function reports(): MorphMany
    {
        return $this->morphMany(Report::class, 'reportable');
    }

    /**
     * ------------------
     * | Methods
     * ------------------
     */
    public function pollExistForUser(int $userId): bool
    {
        return $this->polling()->where('user_id', $userId)->exists();
    }

    public function updateChoicesPollPercentage(): void
    {
        $choices = $this->choices;
        $polling = $this->polling;
        $pollingCount = $polling->count();

        foreach ($choices as $choice) {
            if ($pollingCount > 0) {
                $poll_percentage = ($polling->where('choice_id', $choice->id)->count() / $pollingCount) * 100;
            } else {
                $poll_percentage = 0;
            }

            $choice->update([
                'poll_percentage' => $poll_percentage,
            ]);
        }
    }

    public function createThumbnail(): void
    {
        $ffmpeg = FFMpeg::create([
            'ffmpeg.binaries' => config('app.ffmpeg'),
            'ffprobe.binaries' => config('app.ffprobe'),
        ]);

        $video = $ffmpeg->open(_getSignedUrl($this->getFirstMediaPath('media')));
        $name = $this->getFirstMedia('media')->name.'png';

        $directory = storage_path('/temp');

        if (! File::exists($directory)) {
            File::makeDirectory($directory, 0755, true);
        }

        $thumbnail = "$directory/$name";

        $video->frame(TimeCode::fromSeconds(5))->save($thumbnail);

        $this->addMedia($thumbnail)->toMediaCollection('thumbnail');
    }
}
