<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Module extends Model
{
    use SoftDeletes;

    protected $guarded = ['id'];

    /**
     * Update the serial number according to its course
     *
     * @return void
     */
    public function updateSerialNumber(): void
    {
        $serialNumber = self::query()
            ->whereCourseId($this->course_id)
            ->where('id', '<', $this->id)
            ->count() + 1;

        $this->update(['serial_number' => $serialNumber]);
    }
}
