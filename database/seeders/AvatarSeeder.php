<?php

namespace Database\Seeders;

use App\Models\Avatar;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;

class AvatarSeeder extends Seeder
{
    public function run(): void
    {
        $files = File::files(public_path('/images/avatars'));

        sort($files);

        foreach ($files as $id => $file) {
            $id += 1;
            Avatar::updateOrCreate(['id' => $id])->addMedia($file->getPathname())->preservingOriginal()->toMediaCollection('image');
        }
    }
}
