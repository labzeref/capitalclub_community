<?php

namespace Database\Seeders;

use App\Jobs\AddSpatieMediaJob;
use App\Models\Course;
use App\Models\Instructor;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use DB;

class ComingSoon extends Seeder
{
    public function run(): void
    {

        DB::table('courses')->where('is_coming_soon',TRUE)->delete();
        $courses = [
            [
                'is_coming_soon' => TRUE,
                    'desktopThumbnail' => public_path('/images/course/timepiece/desktop-thumbnail.jpeg'),
                    'mobileThumbnail' => public_path('/images/course/timepiece/mobile-thumbnail.jpeg'),
                    'poster' => public_path('/images/course/timepiece/poster.jpeg'),
            ],
            [
                'is_coming_soon' => TRUE,
                    'desktopThumbnail' => public_path('/images/course/stock-trading/desktop-thumbnail.jpeg'),
                    'mobileThumbnail' => public_path('/images/course/stock-trading/mobile-thumbnail.jpeg'),
                    'poster' => public_path('/images/course/stock-trading/poster.jpeg'),
            ],
            [
                'is_coming_soon' => TRUE,
                    'desktopThumbnail' => public_path('/images/course/mindful-motion/desktop-thumbnail.jpeg'),
                    'mobileThumbnail' => public_path('/images/course/mindful-motion/mobile-thumbnail.jpeg'),
                    'poster' => public_path('/images/course/mindful-motion/poster.jpeg'),
            ],
            [
                'is_coming_soon' => TRUE,
                    'desktopThumbnail' => public_path('/images/course/fba/desktop-thumbnail.jpeg'),
                    'mobileThumbnail' => public_path('/images/course/fba/mobile-thumbnail.jpeg'),
                    'poster' => public_path('/images/course/fba/poster.jpeg'),
            ],
            [
                'is_coming_soon' => TRUE,
                    'desktopThumbnail' => public_path('/images/course/euro-dropship/desktop-thumbnail.jpeg'),
                    'mobileThumbnail' => public_path('/images/course/euro-dropship/mobile-thumbnail.jpeg'),
                    'poster' => public_path('/images/course/euro-dropship/poster.jpeg'),
            ],
            [
                'is_coming_soon' => TRUE,
                    'desktopThumbnail' => public_path('/images/course/social-presence/desktop-thumbnail.jpeg'),
                    'mobileThumbnail' => public_path('/images/course/social-presence/mobile-thumbnail.jpeg'),
                    'poster' => public_path('/images/course/social-presence/poster.jpeg'),
            ],
            [
                'is_coming_soon' => TRUE,
                    'desktopThumbnail' => public_path('/images/course/freedom/desktop-thumbnail.jpeg'),
                    'mobileThumbnail' => public_path('/images/course/freedom/mobile-thumbnail.jpeg'),
                    'poster' => public_path('/images/course/freedom/poster.jpeg'),
            ],
            [
                'is_coming_soon' => TRUE,
                    'desktopThumbnail' => public_path('/images/course/irresistible-offer/desktop-thumbnail.jpeg'),
                    'mobileThumbnail' => public_path('/images/course/irresistible-offer/mobile-thumbnail.jpeg'),
                    'poster' => public_path('/images/course/irresistible-offer/poster.jpeg'),
            ],


        ];


            foreach($courses as $courseData){
                //dd($key);
                $course=Course::create([
                    'is_coming_soon' => $courseData['is_coming_soon'],
                ]);

            if ($course) {

                if (isset($courseData['desktopThumbnail'])) {
                    AddSpatieMediaJob::dispatch(
                        $courseData['desktopThumbnail'],
                        $course,
                        'thumbnail',
                        'path'
                    );
                }

                if (!empty($courseData['mobileThumbnail'])) {
                    AddSpatieMediaJob::dispatch(
                        $courseData['mobileThumbnail'],
                        $course,
                        'mobileThumbnail',
                        'path'
                    );
                }

                if (!empty($courseData['poster'])) {
                    AddSpatieMediaJob::dispatch(
                        $courseData['poster'],
                        $course,
                        'poster',
                        'path'
                    );
                }
                // foreach($courseName['lessons'] as $lessonName){
                //     $lesson = Lesson::where('course_id',$course->id)->where('title',$lessonName['title'])->first();
                //     // update lesson here
                // }


            }





        }
    }
}
