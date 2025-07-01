<?php

namespace Database\Seeders;

use App\Models\Lesson;
use App\Jobs\AddSpatieMediaJob;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class LessonUpdate2024Seeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // $lessonThumbnail = ['thumbnail' => public_path('/images/course/money-talk-updated/1.jpeg')];
        // $lessonThumbnail = ['thumbnail' => public_path('/images/course/money-talk-updated/2.jpeg')];
        // $lessonThumbnail = ['thumbnail' => public_path('/images/course/money-talk-updated/3.jpeg')];
        // $lessonThumbnail = ['thumbnail' => public_path('/images/course/money-talk-updated/4.jpeg')];
        // $lessonThumbnail = ['thumbnail' => public_path('/images/course/money-talk-updated/5.jpeg')];
        // $lessonThumbnail = ['thumbnail' => public_path('/images/course/money-talk-updated/6.jpeg')];
        // $lessonThumbnail = ['thumbnail' => public_path('/images/course/money-talk-updated/7.jpeg')];
        // $lessonThumbnail = ['thumbnail' => public_path('/images/course/money-talk-updated/8.jpeg')];
        // $lessonThumbnail = ['thumbnail' => public_path('/images/course/money-talk-updated/9.jpeg')];
        // $lessonThumbnail = ['thumbnail' => public_path('/images/course/money-talk-updated/10.jpeg')];
        // $lessonThumbnail = ['thumbnail' => public_path('/images/course/money-talk-updated/11.jpeg')];
        // $lessonThumbnail = ['thumbnail' => public_path('/images/course/money-talk-updated/12.jpeg')];
        // $lessonThumbnail = ['thumbnail' => public_path('/images/course/money-talk-updated/13.jpeg')];
        // $lessonThumbnail = ['thumbnail' => public_path('/images/course/money-talk-updated/14.jpeg')];
        // $lessonThumbnail = ['thumbnail' => public_path('/images/course/money-talk-updated/15.jpeg')];
        // $lessonThumbnail = ['thumbnail' => public_path('/images/course/money-talk-updated/16.jpeg')];
        // $lessonThumbnail = ['thumbnail' => public_path('/images/course/money-talk-updated/17.jpeg')];
        // $lessonThumbnail = ['thumbnail' => public_path('/images/course/money-talk-updated/18.jpeg')];
        // $lessonThumbnail = ['thumbnail' => public_path('/images/course/money-talk-updated/19.jpeg')];
        // $lessonThumbnail = ['thumbnail' => public_path('/images/course/money-talk-updated/20.jpeg')];
        // $lessonThumbnail = ['thumbnail' => public_path('/images/course/money-talk-updated/21.jpeg')];
        // $lessonThumbnail = ['thumbnail' => public_path('/images/course/money-talk-updated/22.jpeg')];
        // $lessonThumbnail = ['thumbnail' => public_path('/images/course/money-talk-updated/23.jpeg')];
        // $lessonThumbnail = ['thumbnail' => public_path('/images/course/money-talk-updated/24.jpeg')];
        // $lessonThumbnail = ['thumbnail' => public_path('/images/course/money-talk-updated/25.jpeg')];
        // $lessonThumbnail = ['thumbnail' => public_path('/images/course/money-talk-updated/26.jpeg')];
        // $lessonThumbnail = ['thumbnail' => public_path('/images/course/money-talk-updated/27.jpeg')];
        // $lessonThumbnail = ['thumbnail' => public_path('/images/course/money-talk-updated/28.jpeg')];
        // $lessonThumbnail = ['thumbnail' => public_path('/images/course/money-talk-updated/29.jpeg')];
        // $lessonThumbnail = ['thumbnail' => public_path('/images/course/money-talk-updated/30.jpeg')];
        // $lessonThumbnail = ['thumbnail' => public_path('/images/course/money-talk-updated/31.jpeg')];
        // $lessonThumbnail = ['thumbnail' => public_path('/images/course/money-talk-updated/32.jpeg')];
        // $lessonThumbnail = ['thumbnail' => public_path('/images/course/money-talk-updated/33.jpeg')];
        // $lessonThumbnail = ['thumbnail' => public_path('/images/course/money-talk-updated/34.jpeg')];
        // $lessonThumbnail = ['thumbnail' => public_path('/images/course/money-talk-updated/35.jpeg')];
        // $lessonThumbnail = ['thumbnail' => public_path('/images/course/money-talk-updated/36.jpeg')];



        // $lesson1 = Lesson::findOrFail(290);
        // $lesson1 = Lesson::findOrFail();
        // $lesson1 = Lesson::findOrFail();
        // $lesson1 = Lesson::findOrFail();
        // $lesson1 = Lesson::findOrFail();
        // $lesson1 = Lesson::findOrFail();
        // $lesson1 = Lesson::findOrFail();
        // $lesson1 = Lesson::findOrFail();
        // $lesson1 = Lesson::findOrFail();
        // $lesson1 = Lesson::findOrFail();
        // $lesson1 = Lesson::findOrFail();
        // $lesson1 = Lesson::findOrFail();
        // $lesson1 = Lesson::findOrFail();
        // $lesson1 = Lesson::findOrFail();
        // $lesson1 = Lesson::findOrFail();
        // $lesson1 = Lesson::findOrFail();
        // $lesson1 = Lesson::findOrFail();
        // $lesson1 = Lesson::findOrFail();
        // $lesson1 = Lesson::findOrFail();
        // $lesson1 = Lesson::findOrFail();
        // $lesson1 = Lesson::findOrFail();
        // $lesson1 = Lesson::findOrFail();
        // $lesson1 = Lesson::findOrFail();
        // $lesson1 = Lesson::findOrFail();
        // $lesson1 = Lesson::findOrFail();
        // $lesson1 = Lesson::findOrFail();
        // $lesson1 = Lesson::findOrFail();
        // $lesson1 = Lesson::findOrFail();
        // $lesson1 = Lesson::findOrFail();
        // $lesson1 = Lesson::findOrFail();
        // $lesson1 = Lesson::findOrFail();
        // $lesson1 = Lesson::findOrFail();
        // $lesson1 = Lesson::findOrFail();
        // $lesson1 = Lesson::findOrFail();
        // $lesson1 = Lesson::findOrFail();
        // $lesson1 = Lesson::findOrFail();



        // if (isset($lessonThumbnail1['thumbnail'])) {
        //     AddSpatieMediaJob::dispatch(
        //         $lessonThumbnail1['thumbnail'],
        //         $lesson1,
        //         'thumbnail',
        //         'path'
        //     );
        // }

        Lesson::where('id', 326)->update([
            'published_at' => null
        ]);


        $lessonThumbnails = [
            290 => public_path('/images/course/money-talk-updated/1.jpeg'),
            331 => public_path('/images/course/money-talk-updated/2.jpeg'),
            244 => public_path('/images/course/money-talk-updated/3.jpeg'),
            19 => public_path('/images/course/money-talk-updated/4.jpeg'),
            17 => public_path('/images/course/money-talk-updated/5.jpeg'),
            330 => public_path('/images/course/money-talk-updated/6.jpeg'),
            252 => public_path('/images/course/money-talk-updated/7.jpeg'),
            12 => public_path('/images/course/money-talk-updated/8.jpeg'),
            257 => public_path('/images/course/money-talk-updated/9.jpeg'),
            18 => public_path('/images/course/money-talk-updated/10.jpeg'),
            14 => public_path('/images/course/money-talk-updated/11.jpeg'),
            250 => public_path('/images/course/money-talk-updated/12.jpeg'),
            243 => public_path('/images/course/money-talk-updated/13.jpeg'),
            334 => public_path('/images/course/money-talk-updated/14.jpeg'),
            327 => public_path('/images/course/money-talk-updated/15.jpeg'),
            332 => public_path('/images/course/money-talk-updated/16.jpeg'),
            328 => public_path('/images/course/money-talk-updated/17.jpeg'),
            329 => public_path('/images/course/money-talk-updated/18.jpeg'),
            242 => public_path('/images/course/money-talk-updated/19.jpeg'),
            13 => public_path('/images/course/money-talk-updated/20.jpeg'),
            291 => public_path('/images/course/money-talk-updated/21.jpeg'),
            16 => public_path('/images/course/money-talk-updated/22.jpeg'),
            256 => public_path('/images/course/money-talk-updated/23.jpeg'),
            241 => public_path('/images/course/money-talk-updated/24.jpeg'),
            333 => public_path('/images/course/money-talk-updated/25.jpeg'),
            246 => public_path('/images/course/money-talk-updated/26.jpeg'),
            335 => public_path('/images/course/money-talk-updated/27.jpeg'),
            251 => public_path('/images/course/money-talk-updated/28.jpeg'),
            239 => public_path('/images/course/money-talk-updated/29.jpeg'),
            20 => public_path('/images/course/money-talk-updated/30.jpeg'),
            245 => public_path('/images/course/money-talk-updated/31.jpeg'),
            21 => public_path('/images/course/money-talk-updated/32.jpeg'),
            15 => public_path('/images/course/money-talk-updated/33.jpeg'),
            240 => public_path('/images/course/money-talk-updated/34.jpeg'),
            253 => public_path('/images/course/money-talk-updated/35.jpeg'),
            231 => public_path('/images/course/money-talk-updated/36.jpeg'),
        ];




        $lessonIds = [290, 331, 244, 19, 17, 330, 252, 12, 257, 18, 14, 250, 243, 334, 327, 332, 328, 329, 242, 13, 291, 16 ,256, 241, 333, 246, 335, 251, 239, 20, 245, 21, 15, 240, 253, 231];

        foreach ($lessonIds as $lessonId) {
            // Find the lesson
            $lesson = Lesson::findOrFail($lessonId);

            // Get the corresponding thumbnail path
            $thumbnailPath = $lessonThumbnails[$lessonId] ?? null;

            // If thumbnail path exists, dispatch the job and handle the thumbnail
            if ($thumbnailPath) {
                AddSpatieMediaJob::dispatch(
                    $thumbnailPath,
                    $lesson,
                    'thumbnail',
                    'path'
                );
            }
        }

    }
}
