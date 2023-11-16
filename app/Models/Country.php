<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Country extends Model
{
    use SoftDeletes, HasFactory;

    protected $guarded = ['id'];

    /**
     * This function get all country but prepend US country on top
     */
    public static function getWithUSFirst(): Collection|array
    {
        $countries = self::on('pgsql::write')->get();
        $USCountry = Country::whereIso('US')->first();

        return $countries->prepend($USCountry);
    }
}
