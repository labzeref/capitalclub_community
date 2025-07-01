<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChargeBeeCustomer extends Model
{
    use HasFactory;

    protected $guarded = ['id'];
    public function paySource()
    {
        return $this->hasOne(ChargeBeePaySources::class, 'customer_id', 'customer_id');
    }
}
