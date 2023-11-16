<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class LessonResourceModel extends Model
{
    use SoftDeletes;

    protected $table = 'lesson_resources';

    protected $guarded = ['id'];
}
