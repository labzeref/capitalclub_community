<?php

namespace Database\Seeders;

use App\Models\Industry;
use Illuminate\Database\Seeder;

class IndustrySeeder extends Seeder
{
    public function run(): void
    {
        $data = [
            'SAAS',
            'FINANCE',
            'ONLINE EDUCATION',
            'RETAIL',
            'AGENCY',
            'DIGITAL MARKETING',
            'WEB3 STARTUP',
            'TRADING',
            'SALES',
            'OTHERS',
            'ECOMMERCE BRAND',
            'DROPSHIPPING',
            'FOREX TRADING',
            'COACHING',
            'REAL ESTATE',
            'HEDGE FUND',
            'ENTERTAINMENT',
            'AFFILIATE MARKETING',
            'VENTURE CAPITAL ',
            'CRYPTOCURRENCY',
            'HEALTH & WELLNESS',
            'CONTENT CREATOR',
            'MANUFACTURING',
            'FOOD & BEVERAGE',
        ];

        collect($data)->each(fn ($name) => Industry::updateOrCreate(['name' => $name]));
    }
}
