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

    protected $with = ['media', 'module'];

    protected static array $marks = [
        Bookmark::class,
    ];

    protected array $cascadeDeletes = ['notes', 'quizzes', 'resources'];

    protected static function booted(): void
    {
        parent::booted();

        static::addGlobalScope('published', fn (Builder $builder) => $builder->whereNotNull('published_at'));
    }

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('thumbnail')->singleFile();
        $this->addMediaCollection('banner')->singleFile();
        $this->addMediaCollection('mobileBanner')->singleFile();
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
            ->width(200)
            ->keepOriginalImageFormat()
            ->nonQueued();

        $this->addMediaConversion('blur')
            ->performOnCollections('thumbnail')
            ->blur(15) // Adjust the blur amount as needed
            ->width(70)
            ->keepOriginalImageFormat()
            ->nonQueued();

        $this->addMediaConversion('medium')
            ->performOnCollections('mobileBanner')
            ->width(600)
            ->keepOriginalImageFormat()
            ->nonQueued();

        $this->addMediaConversion('small')
            ->performOnCollections('mobileBanner')
            ->width(300)
            ->keepOriginalImageFormat()
            ->nonQueued();

        $this->addMediaConversion('blur')
            ->performOnCollections('mobileBanner')
            ->blur(15) // Adjust the blur amount as needed
            ->width(70)
            ->keepOriginalImageFormat()
            ->nonQueued();

        $this->addMediaConversion('medium')
            ->performOnCollections('banner')
            ->width(600)
            ->keepOriginalImageFormat()
            ->nonQueued();

        $this->addMediaConversion('small')
            ->performOnCollections('banner')
            ->width(300)
            ->keepOriginalImageFormat()
            ->nonQueued();

        $this->addMediaConversion('blur')
            ->performOnCollections('banner')
            ->blur(15) // Adjust the blur amount as needed
            ->width(70)
            ->keepOriginalImageFormat()
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

    public function module(): BelongsTo
    {
        return $this->belongsTo(Module::class);
    }

    public function enrolledUsers(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'lesson_enrollment')
            ->withPivot(['completed']);
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

    public function resources(): HasMany
    {
        return $this->hasMany(LessonResourceModel::class);
    }

    /**
     * -----------------
     * | Methods
     * -----------------
     */

    /**
     * Get next lesson of current lesson
     */
    public function nextLesson(): ?Lesson
    {
        if ($this->module_id){
            return self::where('course_id', $this->course_id)
                ->where(function ($query) {
                    $query->where('module_id', '>', $this->module_id)
                        ->orWhere(function ($query) {
                            $query->where('module_id', $this->module_id)
                                ->where('serial_number', '>', $this->serial_number);
                        });
                })
                ->orderBy('module_id')
                ->orderBy('serial_number')
                ->first();
        }else{
            return self::where('course_id', $this->course_id)
                ->where('id', '>', $this->id)
                ->orderBy('id')
                ->first();
        }
    }

    /**
     * Complete the status of lesson in pivot table
     */
    public function complete(int $userId): void
    {
        $this->enrolledUsers()->syncWithoutDetaching([$userId => ['completed' => true]]);
    }

    /**
     * Get the lesson number of the course
     */
    public function getNumber(): int
    {
        return self::where('course_id', $this->course_id)
            ->where('id', '<=', $this->id)
            ->count();
    }

    /**
     * Tells user has or not enroll in lesson
     */
    public function hasEnrolledInUser(int $userId): bool
    {
        return $this->enrolledUsers()->where('id', $userId)->exists();
    }

    /**
     * Update quiz result for the user in pivot table
     */
    public function updateQuizResultForUser(int $userId, ?int $result, bool $quizSkipped = false): void
    {
        $this->enrolledUsers()->syncWithoutDetaching([$userId => ['quiz_marks_percentage' => $result, 'quiz_skipped' => $quizSkipped]]);
    }

    /**
     * This will update the serial number of lesson according to its module
     *
     * @return void
     */
    public function updateSerialNumber(): void
    {
        if ($this->module_id) {
            $serialNumber = self::query()
                    ->whereModuleId($this->module_id)
                    ->where('id', '<', $this->id)
                    ->count() + 1;

            $this->update(['serial_number' => $serialNumber]);
        } else {
            $serialNumber = self::query()
                ->whereCourseId($this->course_id)
                ->where('id', '<', $this->id)
                ->count() + 1;

            $this->update(['serial_number' => $serialNumber]);
        }
    }
}
