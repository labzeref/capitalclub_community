<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class TestDB extends Command
{
    protected $signature = 'db:test';

    protected $description = 'Command description';

    public function handle(): void
    {
        $readingDB = true;

        try {
            DB::connection('pgsql::read')->getPdo();
        } catch (\Throwable $throwable) {
            $readingDB = false;
        }

        if ($readingDB) {
            $this->info('Reading DB working.');
        } else {
            $this->error('Reading DB is not working');
        }

        $writingDB = true;

        try {
            DB::connection('pgsql::write')->getPdo();
        } catch (\Throwable $throwable) {
            $writingDB = false;
        }

        if ($writingDB) {
            $this->info('Writing DB working.');
        } else {
            $this->error('Writing DB is not working');
        }
    }
}
