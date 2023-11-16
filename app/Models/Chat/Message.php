<?php

namespace App\Models\Chat;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use Maize\Markable\Markable;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Message extends Model implements HasMedia
{
    use SoftDeletes, InteractsWithMedia, markable;

    protected $guarded = ['id'];

    protected $casts = [
        'seen' => 'boolean',
    ];

    protected $with = ['media', 'user'];

    protected static array $marks = [
        \Maize\Markable\Models\Reaction::class,
    ];

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('media')->singleFile();
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function conversation(): BelongsTo
    {
        return $this->belongsTo(Conversation::class);
    }
}
