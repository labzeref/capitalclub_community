<?php

namespace App\Console\Commands;

use Database\Seeders\Marketplace\MarketPlaceCategorySeeder;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;

class SeedMarketplaceCommand extends Command
{
    protected $signature = 'marketplace:seed';

    protected $description = 'Command description';

    public function handle(): void
    {
        $this->call(MarketPlaceCategorySeeder::class);
    }
}
