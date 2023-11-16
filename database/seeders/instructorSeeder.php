<?php

namespace Database\Seeders;

use App\Models\Instructor;
use Illuminate\Database\Seeder;

class instructorSeeder extends Seeder
{
    public function run(): void
    {
        Instructor::factory(5)->create();
    }
}
