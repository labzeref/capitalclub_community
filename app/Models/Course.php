<?php

namespace App\Models;

use App\Models\Asset\Category;
use App\Traits\AddDummyImageTrait;
use Dyrynda\Database\Support\CascadeSoftDeletes;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Relations\MorphToMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\DB;
use Laravel\Scout\Searchable;
use Maize\Markable\Markable;
use Maize\Markable\Models\Bookmark;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Course extends Model implements HasMedia
{
    use SoftDeletes, HasFactory, InteractsWithMedia, AddDummyImageTrait, Markable, Searchable, CascadeSoftDeletes;

    protected $guarded = ['id'];

    protected $with = ['media', 'defaultInstructor'];

    protected $casts = [
        'featured' => 'boolean',
        'bannered' => 'boolean',
        'published_at' => 'datetime',
        'experience' => 'json',
    ];

    protected static array $marks = [
        Bookmark::class,
    ];

    protected array $cascadeDeletes = ['lessons', 'faqs', 'threads', 'reviews'];

    protected static function booted(): void
    {
        static::addGlobalScope('published', fn (Builder $builder) => $builder->whereNotNull('published_at'));
    }

    public function scopeFeatured(Builder $query): void
    {
        $query->where('featured', true);
    }

    public function scopeHasNewLessons(Builder $query): void
    {
        $query->whereHas(
            'lessons',
            fn ($query) => $query->whereColumn('lessons.published_at', '>', DB::raw('courses.published_at'))
                ->whereDate('lessons.published_at', '>', now()->subMonth())
        );
    }

    public function scopeUpcoming(Builder $query): void
    {
        $query->whereNull('published_at');
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

    public function toSearchableArray(): array
    {
        return [
            'title' => (string) $this->title,
            'summery' => (string) $this->summery,
            'experience' => (array) $this->experience,
        ];
    }

    public function trailer(): HasOne
    {
        return $this->hasOne(Trailer::class);
    }

    /**
     * ---------------
     * | Relations
     * ---------------
     */
    public function instructors(): MorphToMany
    {
        return $this->morphToMany(Instructor::class, 'instructorable');
    }

    public function defaultInstructor(): BelongsTo
    {
        return $this->belongsTo(Instructor::class, 'default_instructor_id');
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function lessons(): HasMany
    {
        return $this->hasMany(Lesson::class);
    }

    public function faqs(): MorphMany
    {
        return $this->morphMany(FAQ::class, 'faqable');
    }

    public function enrolledUsers(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'course_enrollment')
            ->withPivot(['completed', 'progress', 'enrolled_at']);
    }

    public function completedUsers(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'course_enrollment')
            ->withPivot(['completed', 'progress', 'enrolled_at'])
            ->wherePivot('completed', true);
    }

    public function threads(): HasMany
    {
        return $this->hasMany(Thread::class);
    }

    public function reviews(): MorphMany
    {
        return $this->morphMany(Review::class, 'reviewable');
    }

    /**
     * ---------------
     * | Methods
     * ---------------
     */
    public function updateProgressForUser(User $user): void
    {
        $totalLessonCount = $this->lessons()->count();
        $completedLessonsCount = $user->enrolledLessons()
            ->wherePivot('course_id', $this->id)
            ->wherePivot('completed', true)
            ->count();

        $progress = round(($completedLessonsCount / $totalLessonCount) * 100);

        $this->enrolledUsers()->syncWithoutDetaching([$user->id => [
            'progress' => round(($completedLessonsCount / $totalLessonCount) * 100),
        ]]);

        if ($progress == 100) {
            $this->enrolledUsers()->syncWithoutDetaching([$user->id => [
                'completed' => true,
            ]]);
        }
    }

    public function hasReviewForUser(int $userId): bool
    {
        return $this->reviews()->where('user_id', $userId)->exists();
    }
}
