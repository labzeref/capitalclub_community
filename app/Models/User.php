<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Enums\UserStatusEnum;
use App\Models\Asset\Category;
use App\Traits\AddDummyImageTrait;
use Dyrynda\Database\Support\CascadeSoftDeletes;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Illuminate\Database\Eloquent\Relations\MorphToMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Laravel\Scout\Searchable;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class User extends Authenticatable implements HasMedia
{
    use HasApiTokens, HasFactory, Notifiable, SoftDeletes, InteractsWithMedia, AddDummyImageTrait, Searchable, CascadeSoftDeletes;

    protected $guarded = ['id'];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'status' => UserStatusEnum::class,
        'subscribed' => 'bool',
        'verified_by_webhook' => 'bool',
    ];

    protected $with = ['media'];

    protected $appends = ['full_name'];

    protected array $cascadeDeletes = [
        'socialMedia', 'posts', 'threads', 'reports', 'subscriptions', 'billingAddress', 'invoices',
    ];

    public function scopeTopRank(Builder $query): void
    {
        $query->withWhereHas('badges')
            ->leftJoin('badge_user', 'users.id', '=', 'badge_user.user_id')
            ->leftJoin('badges', 'badge_user.badge_id', '=', 'badges.id')
            ->groupBy('users.id')
            ->orderByRaw('SUM(badges.weight) DESC')
            ->select('users.*');
    }

    protected function fullName(): Attribute
    {
        return Attribute::make(
            get: fn () => "$this->first_name $this->last_name"
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

    public function dp($size = 'medium')
    {
        return $this->getFirstMedia('dp')
            ? _getSignedUrl($this->getFirstMediaPath('dp', $size))
            : _defaultDp()->url;
    }

    public function toSearchableArray(): array
    {
        return [
            'first_name' => (string) $this->first_name,
            'last_name' => (string) $this->last_name,
            'full_name' => (string) $this->first_name,
        ];
    }

    /**
     * -----------------
     * | Relations
     * -----------------
     */
    public function country(): BelongsTo
    {
        return $this->belongsTo(Country::class, 'country_iso', 'iso');
    }

    public function bookmarkedLiveStream(): MorphToMany
    {
        return $this->morphedByMany(LiveStream::class, 'markable', 'markable_bookmarks');
    }

    public function bookmarkedLiveSeries(): MorphToMany
    {
        return $this->morphedByMany(LiveSeries::class, 'markable', 'markable_bookmarks');
    }

    public function bookmarkedCourses(): MorphToMany
    {
        return $this->morphedByMany(Course::class, 'markable', 'markable_bookmarks');
    }

    public function bookmarkedLessons(): MorphToMany
    {
        return $this->morphedByMany(Lesson::class, 'markable', 'markable_bookmarks');
    }

    public function bookmarkedPosts(): MorphToMany
    {
        return $this->morphedByMany(Post::class, 'markable', 'markable_bookmarks');
    }

    public function enrolledCourses(): BelongsToMany
    {
        return $this->belongsToMany(Course::class, 'course_enrollment')
            ->withPivot(['completed', 'progress', 'enrolled_at']);
    }

    public function completedCourses(): BelongsToMany
    {
        return $this->belongsToMany(Course::class, 'course_enrollment')
            ->withPivot(['completed', 'progress', 'enrolled_at'])
            ->wherePivot('completed', true);
    }

    public function uncompletedCourses(): BelongsToMany
    {
        return $this->belongsToMany(Course::class, 'course_enrollment')
            ->withPivot(['completed', 'progress', 'enrolled_at'])
            ->wherePivot('completed', false);
    }

    public function enrolledLessons(): BelongsToMany
    {
        return $this->belongsToMany(Lesson::class, 'lesson_enrollment')
            ->withPivot(['course_id', 'completed', 'progress']);
    }

    public function enrolledLiveStreams(): BelongsToMany
    {
        return $this->belongsToMany(LiveStream::class, 'live_stream_enrollment')
            ->withPivot('enrolled_at');
    }

    public function socialMedia(): MorphOne
    {
        return $this->morphOne(SocialMedia::class, 'socialable');
    }

    public function interests(): BelongsToMany
    {
        return $this->belongsToMany(Category::class, 'interest');
    }

    public function pollAnswers(): MorphToMany
    {
        return $this->morphedByMany(Answer::class, 'pollerable', 'polling');
    }

    public function posts(): HasMany
    {
        return $this->hasMany(Post::class);
    }

    public function deactivateReason(): HasOne
    {
        return $this->hasOne(DeactivateReason::class);
    }

    public function threads(): HasMany
    {
        return $this->hasMany(Thread::class);
    }

    public function followingThreads(): BelongsToMany
    {
        return $this->belongsToMany(Thread::class, 'thread_followers');
    }

    public function badges(): BelongsToMany
    {
        return $this->belongsToMany(Badge::class);
    }

    public function reports(): HasMany
    {
        return $this->hasMany(Report::class);
    }

    public function postReports(): HasMany
    {
        return $this->hasMany(Report::class)->where('reportable_type', Post::class);
    }

    public function postCommentReports(): HasMany
    {
        return $this->hasMany(Report::class)->where('reportable_type', PostComment::class);
    }

    /**
     * The users which the current user follows
     */
    public function followingUsers(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'user_followers', 'follower_id', 'followed_id');
    }

    /**
     * The followers of current user
     */
    public function followerUsers(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'user_followers', 'followed_id', 'follower_id');
    }

    public function subscriptions(): HasMany
    {
        return $this->hasMany(Subscription::class);
    }

    public function billingAddress(): HasOne
    {
        return $this->hasOne(BillingAddress::class);
    }

    public function invoices(): HasMany
    {
        return $this->hasMany(Invoice::class);
    }

    /**
     * -----------------
     * | Methods
     * -----------------
     */
    public function hasEnrolledInCourse(int $courseId): bool
    {
        return (bool) $this->enrolledCourses()->find($courseId);
    }

    public function enrolledInCourse(Course $course): void
    {
        $this->enrolledCourses()->attach($course->id, [
            'progress' => 0,
            'enrolled_at' => now(),
        ]);
        $this->enrolledInLesson(
            $course->lessons()->orderBy('id')->value('id'),
            $course->id
        );
    }

    public function hasEnrolledInLesson(int $lessonId): bool
    {
        return $this->enrolledLessons()->where('id', $lessonId)->exists();
    }

    public function enrolledInLesson(int $lessonId, int $courseId, bool $quizSkipped = false): void
    {
        $this->enrolledLessons()->attach($lessonId, [
            'course_id' => $courseId,
            'completed' => false,
            'progress' => 0,
            'quiz_skipped' => $quizSkipped,
            'enrolled_at' => now(),
        ]);
    }

    public function enrolledInLiveStream(int $liveStreamId): void
    {
        $this->enrolledLiveStreams()->attach($liveStreamId, [
            'enrolled_at' => now(),
        ]);
    }

    public function hasEnrolledInLiveStream(int $liveStreamId): bool
    {
        return $this->enrolledLiveStreams()
            ->where('id', $liveStreamId)
            ->exists();
    }

    public function hasCompletedLesson($lessonId): bool
    {
        return $this->enrolledLessons()
            ->wherePivot('completed', true)
            ->where('id', $lessonId)
            ->exists();
    }

    public function hasCompletedCourse($courseId): bool
    {
        return $this->enrolledCourses()
            ->wherePivot('completed', true)
            ->where('id', $courseId)
            ->exists();
    }
}
