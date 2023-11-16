<?php

namespace Database\Seeders;

use App\Models\Badge;
use App\Models\Course;
use App\Models\LiveStream;
use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $factory = User::factory();

        $courses = Course::inRandomOrder()->take(mt_rand(1, 6))->get();
        $liveStreams = LiveStream::get();

        foreach ($liveStreams as $liveStream) {
            $factory = $factory->hasAttached($liveStream, [
                'enrolled_at' => now(),
            ], 'enrolledLiveStreams');
        }

        foreach ($courses as $course) {
            $factory = $factory->hasAttached($course, [
                'progress' => mt_rand(10, 80),
                'enrolled_at' => now(),
            ], 'enrolledCourses');

            if (fake()->boolean) {
                $factory = $factory->hasAttached($course, [], 'bookmarkedCourses');
            }

            $lessons = $course->lessons()->orderBy('id')->take(mt_rand(1, 6))->get();

            /**
             * This if for tracking the lesson loop iteration
             */
            $lessonTotalIteration = $lessons->count();
            $lessonCurrentIteration = 0;

            foreach ($lessons as $lesson) {
                if (fake()->boolean) {
                    $factory = $factory->hasAttached($lesson, [], 'bookmarkedLessons');
                }

                $lessonCurrentIteration++;

                /**
                 * If it is the last lesson it should be completed false
                 */
                $completed = $lessonCurrentIteration != $lessonTotalIteration;

                $factory = $factory->hasAttached($lesson, [
                    'course_id' => $course->id,
                    'completed' => $completed,
                    'progress' => mt_rand(20, 60),
                    'enrolled_at' => now(),
                ], 'enrolledLessons');
            }
        }

        $factory = $factory->hasAttached(Badge::inRandomOrder()->take(mt_rand(1, 3))->get());

        $factory->create([
            'email' => 'student@system.com',
        ]);

        User::factory(5)
            ->hasAttached(Badge::inRandomOrder()->take(mt_rand(1, 3))->get())
            ->create();
    }
}
