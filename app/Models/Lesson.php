<?php

namespace App\Models;

use App\Traits\AddDummyImageTrait;
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

class Lesson extends Model implements HasMedia
{
    use SoftDeletes, HasFactory, InteractsWithMedia, AddDummyImageTrait, Markable, CascadeSoftDeletes;

    protected $guarded = ['id'];

    protected $casts = [
        'published_at' => 'date',
        'dripped_at' => 'date',
        'has_preview' => 'bool',
        'preview_start_time' => 'datetime',
        'preview_end_time' => 'datetime',
        'quiz_skipable' => 'bool',
    ];

    protected $with = ['media'];

    protected static array $marks = [
        Bookmark::class,
    ];

    protected array $cascadeDeletes = ['notes', 'quizzes'];

    protected static function booted(): void
    {
        static::addGlobalScope('published', fn (Builder $builder) => $builder->whereNotNull('published_at'));
    }

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('thumbnail')->singleFile();
    }

    public function registerAllMediaConversions(): void
    {
        $this->addMediaConversion('medium')
            ->performOnCollections('thumbnail')
            ->width(600)
            ->height(400)
            ->nonQueued();

        $this->addMediaConversion('small')
            ->performOnCollections('thumbnail')
            ->width(300)
            ->height(200)
            ->nonQueued();
    }

    /**
     * -----------------
     * | Relations
     * -----------------
     */
    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class);
    }

    public function enrolledUsers(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'lesson_enrollment')
            ->withPivot(['completed', 'progress']);
    }

    public function notes(): HasMany
    {
        return $this->hasMany(LessonNote::class);
    }

    public function note(): HasOne
    {
        return $this->hasOne(LessonNote::class);
    }

    public function quizzes(): HasMany
    {
        return $this->hasMany(Quiz::class);
    }

    /**
     * -----------------
     * | Methods
     * -----------------
     */
    public function nextLesson(): ?Lesson
    {
        return self::where('course_id', $this->course_id)
            ->where('id', '>', $this->id)
            ->orderBy('id')
            ->first();
    }

    public function complete(int $userId): void
    {
        $this->enrolledUsers()->syncWithoutDetaching([$userId => ['completed' => true]]);
    }

    public function getNumber(): int
    {
        return self::where('course_id', $this->course_id)
            ->where('id', '<=', $this->id)
            ->count();
    }

    public function hasEnrolledInUser(int $userId): bool
    {
        return $this->enrolledUsers()->where('id', $userId)->exists();
    }

    public function updateQuizResultForUser(int $userId, int $result): void
    {
        $this->enrolledUsers()->syncWithoutDetaching([$userId => ['quiz_marks_percentage' => $result]]);
    }
}
