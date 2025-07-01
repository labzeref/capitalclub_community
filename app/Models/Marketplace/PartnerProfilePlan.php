<?php

namespace App\Models\Marketplace;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PartnerProfilePlan extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    protected $casts = [
        'features' => 'json',
    ];
}
