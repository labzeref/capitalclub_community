<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Subscription extends Model
{
    use SoftDeletes;

    protected $guarded = ['id'];

    protected $casts = [
        'current_term_start' => 'datetime',
        'current_term_end' => 'datetime',
        'next_billing_at' => 'datetime',
        'started_at' => 'datetime',
        'activated_at' => 'datetime',
        'verified_by_webhook' => 'bool',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
