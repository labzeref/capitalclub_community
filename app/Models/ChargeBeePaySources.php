<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ChargeBeePaySources extends Model
{
    protected $guarded = ['id'];

    protected $casts = [
        'payload' => 'json'
    ];
}
