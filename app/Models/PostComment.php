<?php

namespace App\Models;

use Dyrynda\Database\Support\CascadeSoftDeletes;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Maize\Markable\Markable;

class PostComment extends Model
{
    use SoftDeletes, Markable, CascadeSoftDeletes;

    protected $guarded = ['id'];

    protected $casts = [
        'reported' => 'boolean',
        'reported_at' => 'date',
    ];

    protected static array $marks = [
        \Maize\Markable\Models\Reaction::class,
    ];

    protected array $cascadeDeletes = ['replies', 'reports'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function post(): BelongsTo
    {
        return $this->belongsTo(Post::class);
    }

    public function parent(): BelongsTo
    {
        return $this->belongsTo(self::class, 'parent_id');
    }

    public function replies(): HasMany
    {
        return $this->hasMany(self::class, 'parent_id');
    }

    public function reports(): MorphMany
    {
        return $this->morphMany(Report::class, 'reportable');
    }
}
