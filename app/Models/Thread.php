<?php

namespace App\Models;

use Dyrynda\Database\Support\CascadeSoftDeletes;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Thread extends Model
{
    use SoftDeletes, CascadeSoftDeletes;

    protected $guarded = ['id'];

    protected array $cascadeDeletes = ['comments'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class);
    }

    public function comments(): HasMany
    {
        return $this->hasMany(ThreadComment::class);
    }

    public function followers(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'thread_followers');
    }
}
