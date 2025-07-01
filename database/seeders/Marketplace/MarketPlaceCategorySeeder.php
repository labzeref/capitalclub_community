<?php

namespace Database\Seeders\Marketplace;

use App\Models\Marketplace\MarketPlaceCategory;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MarketPlaceCategorySeeder extends Seeder
{
    public function run(): void
    {

        DB::table('market_place_categories')->truncate();

        $data = [
            'SaaS',
            'Marketing',
            'Fulfilment',
            'Lifestyle',
            'Banking',
        ];

        foreach ($data as $name) {
            DB::table('market_place_categories')->insert([
                'name' => $name,
                'slug' => strtolower($name),
                'parent_id' => null,
            ]);
        }
    }
}
