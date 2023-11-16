<?php

namespace App\Console\Commands;

use App\Http\Resources\Lesson\LessonResourceResource;
use App\Models\Lesson;
use Illuminate\Console\Command;

class UpdateSerialNumberCommand extends Command
{
    protected $signature = 'update:serial-number';

    protected $description = 'Command description';

    public function handle(): void
    {
        $courseId = $this->ask("Enter course id");

        if (!$courseId) {
            return;
        }

        $lessons = Lesson::whereCourseId($courseId)->get();

        foreach ($lessons as $lesson) {
            $lesson->updateSerialNumber();
        }

        info("All lessons serial number updated.");
    }
}
