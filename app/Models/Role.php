<?php

namespace App\Models;

use Spatie\Permission\Models\Role as SpatieRole;

class Role extends SpatieRole
{
    protected $guarded = ['id'];

    /**
     * Constant roll of super admin
     */
    const SUPER_ADMIN = 'Super Admin';
}
