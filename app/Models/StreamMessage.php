<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class StreamMessage extends Model
{
    use SoftDeletes, HasFactory;

    protected $casts = [
        'send_at' => 'datetime',
    ];

    protected $guarded = ['id'];

    protected $with = ['mentionedMessage', 'user'];

    /**
    ---------------------
     *  relations
     * -----------------
     */
    public function liveStream(): BelongsTo
    {
        return $this->belongsTo(LiveStream::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function mentionedMessage(): BelongsTo
    {
        return $this->belongsTo(StreamMessage::class, 'mentioned_message_id');
    }

    public function reports(): MorphMany
    {
        return $this->morphMany(Report::class, 'reportable');
    }
}
