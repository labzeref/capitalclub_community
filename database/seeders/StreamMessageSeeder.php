<?php

namespace Database\Seeders;

use App\Models\StreamMessage;
use Illuminate\Database\Seeder;

class StreamMessageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        StreamMessage::factory(100)->create(['user_id' => 1]);
        StreamMessage::factory(100)->create(['user_id' => 2]);
        StreamMessage::factory(100)->create(['user_id' => 3]);
    }
}
