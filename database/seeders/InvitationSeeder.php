<?php

namespace Database\Seeders;

use App\Imports\InvitationImport;
use App\Models\Invitation;
use App\Models\InvitationFile;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;
use Maatwebsite\Excel\Facades\Excel;

class InvitationSeeder extends Seeder
{
    public function run(): void
    {
        $files = File::files(base_path('/database/source'));

        foreach ($files as $file) {
            $invitationFile= InvitationFile::updateOrCreate(['name' => $file->getFilename()]);
            Excel::import(new InvitationImport($invitationFile->id), $file);
            $invitationFile->addMedia($file)->preservingOriginal()->toMediaCollection('csv');
        }
    }
}
