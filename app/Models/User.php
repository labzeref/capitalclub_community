<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Enums\UserStatusEnum;
use App\Models\Asset\Category;
use App\Models\LiveStream\LiveStream;
use App\Notifications\ResetPasswordNotification;
use App\Services\DiscordService;
use App\Traits\AddDummyImageTrait;
use Dyrynda\Database\Support\CascadeSoftDeletes;
use Exception;
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
use Illuminate\Support\Facades\DB;
use Laravel\Sanctum\HasApiTokens;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class User extends Authenticatable implements HasMedia
{
    use HasApiTokens, HasFactory, Notifiable, SoftDeletes, InteractsWithMedia, AddDummyImageTrait, CascadeSoftDeletes;

    protected $guarded = [];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    public function sendPasswordResetNotification($token): void
    {
        $url = route('password.reset', ['token' => $token]);

        $this->notify(new ResetPasswordNotification($this, $url));
    }

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'status' => UserStatusEnum::class,
        'verified_by_webhook' => 'bool',
        'discord_access_token_expiry' => 'datetime',
        'discord_roles' => 'array',
    ];

    protected $with = ['media'];

    protected $appends = ['full_name'];

    protected array $cascadeDeletes = [
        'socialMedia', 'reports', 'subscriptions', 'billingAddress', 'invoices',
    ];

    public function ChargebeeCustomer(): HasOne
    {
        return $this->hasOne(ChargeBeeCustomer::class);
    }

    protected static function boot(): void
    {
        parent::boot();

        self::created(function () {
            $id = self::max('id') + 1;
            DB::statement("ALTER SEQUENCE users_id_seq RESTART WITH $id");
        });
    }

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
            ->keepOriginalImageFormat()
            ->nonQueued();

        $this->addMediaConversion('small')
            ->performOnCollections('dp')
            ->width(300)
            ->keepOriginalImageFormat()
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

    public function bookmarkedCourses(): MorphToMany
    {
        return $this->morphedByMany(Course::class, 'markable', 'markable_bookmarks');
    }

    public function bookmarkedLessons(): MorphToMany
    {
        return $this->morphedByMany(Lesson::class, 'markable', 'markable_bookmarks');
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
            ->withPivot(['course_id', 'completed']);
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

    public function deactivateReason(): HasOne
    {
        return $this->hasOne(DeactivateReason::class);
    }

    public function badges(): BelongsToMany
    {
        return $this->belongsToMany(Badge::class);
    }

    public function reports(): HasMany
    {
        return $this->hasMany(Report::class);
    }

    public function subscriptions(): HasMany
    {
        return $this->hasMany(Subscription::class);
    }

    public function hasActiveChargebeeSubscription()
    {
        return $this->subscriptions()->where('status','active')->where('next_billing_at','>',now())->count() > 0;


    }

    public function billingAddress(): HasOne
    {
        return $this->hasOne(BillingAddress::class);
    }

    public function invoices(): HasMany
    {
        return $this->hasMany(Invoice::class);
    }

    public function industries(): BelongsToMany
    {
        return $this->belongsToMany(Industry::class, 'user_has_industries')->withoutTrashed();
    }

    public function instructor(): HasOne
    {
        return $this->hasOne(Instructor::class);
    }

    public function lastVisitLessonData(): HasMany
    {
        return $this->hasMany(LastVisitLessonData::class);
    }

    public function lessonWatchTimes(): HasMany
    {
        return $this->hasMany(LessonWatchTime::class);
    }

    public function notes(): HasMany
    {
        return $this->hasMany(LessonNote::class);
    }

    public function liveStreamNotes(): HasMany
    {
        return $this->hasMany(LessonNote::class);
    }

    public function orders(): HasMany
    {
        return $this->hasMany(CheckoutChampOrder::class);
    }

    public function cards(): HasMany
    {
        return $this->hasMany(CheckoutChampCard::class);
    }

    public function primaryCard(): HasOne
    {
        return $this->hasOne(CheckoutChampCard::class)->where('is_primay', true);
    }

    /**
     * -----------------
     * | Methods
     * -----------------
     */

    /**
     * Tells the user has enrolled in this course or not
     */
    public function hasEnrolledInCourse(int $courseId): bool
    {
        return (bool) $this->enrolledCourses()->find($courseId);
    }

    /**
     * Make user enroll in course and its first lesson
     */
    public function enrolledInCourse(Course $course): void
    {
        $this->enrolledCourses()->attach($course->id, [
            'progress' => 0,
            'enrolled_at' => now(),
        ]);

        $this->enrolledInLesson(
            $course->lessons()->orderBy('id')->first()->id,
            $course->id
        );
    }

    /**
     * Tells that user has enrolled or not in this lesson
     */
    public function hasEnrolledInLesson(int $lessonId): bool
    {
        return $this->enrolledLessons()->where('id', $lessonId)->exists();
    }

    /**
     * Make user enroll in lesson
     */
    public function enrolledInLesson(int $lessonId, int $courseId): void
    {
        if ($this->hasEnrolledInLesson($lessonId)) {
            Log::create(['name' => _user()->id."user is a-e in l-$lessonId of c-$courseId"]);

            return;
        }

        $this->enrolledLessons()->attach($lessonId, [
            'course_id' => $courseId,
            'completed' => false,
            'quiz_skipped' => false,
            'enrolled_at' => now(),
        ]);
    }

    /**
     * Make user enrolled in live stream
     */
    public function enrolledInLiveStream(int $liveStreamId): void
    {
        $this->enrolledLiveStreams()->attach($liveStreamId, [
            'enrolled_at' => now(),
        ]);
    }

    /**
     * Tells that user has enrolled or not in live trianing
     */
    public function hasEnrolledInLiveStream(int $liveStreamId): bool
    {
        return $this->enrolledLiveStreams()
            ->where('id', $liveStreamId)
            ->exists();
    }

    /**
     * Tells user has completed this lesson or not
     */
    public function hasCompletedLesson($lessonId): bool
    {
        return $this->enrolledLessons()
            ->wherePivot('completed', true)
            ->where('id', $lessonId)
            ->exists();
    }

    /**
     * Tells that user has completed this course or not
     */
    public function hasCompletedCourse($courseId): bool
    {
        return $this->enrolledCourses()
            ->wherePivot('completed', true)
            ->where('id', $courseId)
            ->exists();
    }

    /**
     * Get discord access token
     *
     * @throws Exception
     */
    public function getDiscordAccessToken(): string
    {
        if (! $this->discord_access_token || ! $this->discord_access_token_expiry) {
            throw new Exception('User discord token and its expiry not present in database.');
        }

        if ($this->discord_access_token_expiry > now()->addMinutes(10)) {
            return $this->discord_access_token;
        }

        $discordService = new DiscordService();

        $response = $discordService->getRefreshToken(refreshToken: $this->discord_refresh_token);

        if (! $response->ok()) {
            throw new Exception("Discord refresh token api execute with {$response->status()} status.");
        }

        $tokenData = $response->json();

        $this->update([
            'discord_access_token' => $tokenData['access_token'],
            'discord_refresh_token' => $tokenData['refresh_token'],
            'discord_access_token_expiry' => now()->addSeconds($tokenData['expires_in']),
            'discord_scope' => $tokenData['scope'],
        ]);

        return $tokenData['access_token'];
    }

    /**
     * Will update the last visit lesson in database
     */
    public function updateLastVisitLessonData(int $courseId, int $lessonId): void
    {
        if ($this->lastVisitLessonData()->where('course_id', $courseId)->exists()) {
            $this->lastVisitLessonData()->where('course_id', $courseId)->update([
                'lesson_id' => $lessonId,
            ]);
        } else {
            $this->lastVisitLessonData()->create([
                'course_id' => $courseId,
                'lesson_id' => $lessonId,
            ]);
        }
    }

    /**
     * Get last visit lesson id against course id
     */
    public function getLastVisitLessonId(int $courseId): int
    {
        $lastVisitLessonId = $this->lastVisitLessonData()
            ->where('course_id', $courseId)
            ->value('lesson_id');

        if ($lastVisitLessonId) {
            return $lastVisitLessonId;
        }

        return Lesson::where('course_id', $courseId)->value('id');
    }

    public function getGlitchId(): string
    {
        return 'GLITCH #'.str_pad($this->id, 4, '0', STR_PAD_LEFT);
    }

    public function getDiscordFormatNameId(): string
    {
        return "$this->discord_display_name #".str_pad($this->id, 4, '0', STR_PAD_LEFT);
    }

    public function chargebeePayource(): HasOne
    {
        return $this->hasOne(ChargeBeePaySources::class);
    }
}
