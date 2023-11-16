<?php

namespace App\Models\Asset;

use App\Models\Course;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Category extends Model implements HasMedia
{
    use SoftDeletes, InteractsWithMedia;

    protected $guarded = ['id'];

    protected $with = ['media'];

    public function scopeFeatured(Builder $query): void
    {
        $query->where('featured', true);
    }

    public function courses(): HasMany
    {
        return $this->hasMany(Course::class);
    }
}
