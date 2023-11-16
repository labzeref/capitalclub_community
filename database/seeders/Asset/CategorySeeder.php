<?php

namespace Database\Seeders\Asset;

use App\Models\Asset\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Food',
                'featured' => fake()->boolean,
                'icon' => 'ForkKnife.svg',
            ],
            [
                'name' => 'Art & Entertainment',
                'featured' => fake()->boolean,
                'icon' => 'PaintBrush.svg',
            ],
            [
                'name' => 'Music',
                'featured' => false,
                'icon' => 'MusicNotes.svg',
            ],
            [
                'name' => 'Sports & Gaming',
                'featured' => false,
                'icon' => 'Football.svg',
            ],
            [
                'name' => 'Business',
                'featured' => false,
                'icon' => 'Briefcase.svg',
            ],
            [
                'name' => 'Science & Tech',
                'featured' => fake()->boolean,
                'icon' => 'Atom.svg',
            ],
            [
                'name' => 'Home & Lifestyle',
                'featured' => true,
                'icon' => 'House.svg',
            ],
            [
                'name' => 'Design & Style',
                'featured' => true,
                'icon' => 'BezierCurve.svg',
            ],
            [
                'name' => 'Food',
                'featured' => fake()->boolean,
                'icon' => 'ForkKnife.svg',
            ],
            [
                'name' => 'Art & Entertainment',
                'featured' => fake()->boolean,
                'icon' => 'PaintBrush.svg',
            ],
            [
                'name' => 'Music',
                'featured' => false,
                'icon' => 'MusicNotes.svg',
            ],
            [
                'name' => 'Sports & Gaming',
                'featured' => false,
                'icon' => 'Football.svg',
            ],
        ];

        collect($categories)->each(function ($categoryData) {
            $category = Category::create([
                'name' => $categoryData['name'],
                'featured' => $categoryData['featured'],
            ]);
            $category->addMedia(public_path('/assets/category/'.$categoryData['icon']))
                ->preservingOriginal()
                ->toMediaCollection('icon');
        });
    }
}
