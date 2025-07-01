<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class CheckoutChampOrder extends Model
{
    use SoftDeletes;

    protected $guarded = ['id'];

    protected $casts = [
        'start_at' => 'datetime',
        'end_at' => 'datetime',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(CheckoutChampProduct::class, 'product_id');
    }

    public function card(): BelongsTo
    {
        return $this->belongsTo(CheckoutChampUserCard::class, 'card_id');
    }
}
