<?php

namespace App\Console\Commands;

use App\Models\Marketplace\MarketPlaceCategory;
use App\Models\Marketplace\PartnerProfile;
use Illuminate\Console\Command;
use Illuminate\Support\Str;

class TempFixSlugCommand extends Command
{
    protected $signature = 'temp:fix-slug';

    protected $description = 'Command description';

    public function handle(): void
    {
        foreach (MarketPlaceCategory::all() as $category) {
            $category->update(['slug' => Str::slug($category->name)]);
        }
    }
}
