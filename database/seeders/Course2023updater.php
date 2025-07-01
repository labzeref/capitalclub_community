<?php

namespace Database\Seeders;

use App\Jobs\AddSpatieMediaJob;
use App\Models\Course;
use App\Models\Instructor;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class Course2023updater extends Seeder
{
    public function run(): void
    {


        $instructors = [
            [
                'f_name' => 'Victor',
                'l_name' => 'Smushkevich',
                'dp' => public_path('/images/course/social-dynamics/dp.jpeg'),
                'courses'=> [
                    'SOCIAL DYNAMICS' => [
                        'exclusive' => FALSE,
                            'desktopThumbnail' => public_path('/images/course/social-dynamics/desktop-thumbnail.jpeg'),
                            'mobileThumbnail' => public_path('/images/course/social-dynamics/mobile-thumbnail.jpeg'),
                            'poster' => public_path('/images/course/social-dynamics/poster.jpeg'),
                        // 'lessons' => [
                        //     'desktopThumbnail' => public_path('/images/course/social-dynamics/desktop-thumbnail.jpeg'),
                        // ],

                    ],
                ],
            ],
            [
                'f_name' => 'Philipp',
                'l_name' => 'Schoeffmann',
                'dp' => public_path('/images/course/freedom-entrepreneur-blueprint/dp.jpeg'),
                'courses'=> [
                    'FREEDOM ENTREPRENEUR BLUEPRINT' => [
                        'exclusive' => FALSE,

                            'desktopThumbnail' => public_path('/images/course/freedom-entrepreneur-blueprint/desktop-thumbnail.jpeg'),
                            'mobileThumbnail' => public_path('/images/course/freedom-entrepreneur-blueprint/mobile-thumbnail.jpeg'),
                            'poster' => public_path('/images/course/freedom-entrepreneur-blueprint/poster.jpeg'),

                        // 'lessons' => [
                        //     'desktopThumbnail' => public_path('/images/course/social-dynamics/desktop-thumbnail.jpeg'),
                        // ],

                    ],
                ],
            ],
            [
                'f_name' => 'Joshua',
                'l_name' => 'Chin',
                'dp' => public_path('/images/course/unlock-ecom-profits-with-marketing/dp.jpeg'),
                'courses'=> [
                    'UNLOCK ECOM PROFITS WITH EMAIL MARKETING' => [
                        'exclusive' => FALSE,

                            'desktopThumbnail' => public_path('/images/course/unlock-ecom-profits-with-marketing/desktop-thumbnail.jpeg'),
                            'mobileThumbnail' => public_path('/images/course/unlock-ecom-profits-with-marketing/mobile-thumbnail.jpeg'),
                            'poster' => public_path('/images/course/unlock-ecom-profits-with-marketing/poster.jpeg'),

                        // 'lessons' => [
                        //     'desktopThumbnail' => public_path('/images/course/social-dynamics/desktop-thumbnail.jpeg'),
                        // ],

                    ],
                ],
            ],
            [
                'f_name' => 'Nate',
                'l_name' => 'Belmar',
                'dp' => '',
                'courses'=> [
                    'ENTREPRENEUR FIT' => [
                        'exclusive' => FALSE,

                            'desktopThumbnail' => public_path('/images/course/entrepreneur-fit/desktop-thumbnail.jpeg'),
                            'mobileThumbnail' => public_path('/images/course/entrepreneur-fit/mobile-thumbnail.jpeg'),
                            'poster' => public_path('/images/course/entrepreneur-fit/poster.jpeg'),

                        // 'lessons' => [
                        //     'desktopThumbnail' => public_path('/images/course/social-dynamics/desktop-thumbnail.jpeg'),
                        // ],

                    ],
                ],
            ],
            [
                'f_name' => 'Dan',
                'l_name' => 'Eymel',
                'dp' => public_path('/images/course/master-the-art-of-performance-creative/dp.jpeg'),
                'courses'=> [
                    'MASTER THE ART OF PERFORMANCE CREATIVE' => [
                        'exclusive' => FALSE,

                            'desktopThumbnail' => public_path('/images/course/master-the-art-of-performance-creative/desktop-thumbnail.jpeg'),
                            'mobileThumbnail' => public_path('/images/course/master-the-art-of-performance-creative/mobile-thumbnail.jpeg'),
                            'poster' => public_path('/images/course/master-the-art-of-performance-creative/poster.jpeg'),

                        // 'lessons' => [
                        //     'desktopThumbnail' => public_path('/images/course/social-dynamics/desktop-thumbnail.jpeg'),
                        // ],

                    ],
                ],
            ],
            [
                'f_name' => 'Anthony',
                'l_name' => 'Eclipse',
                'dp' => public_path('/images/course/tiktok-dropshipping-bootcamp/dp.jpeg'),
                'courses'=> [
                    'TIKTOK DROPSHIPPING BOOTCAMP' => [
                        'exclusive' => FALSE,

                            'desktopThumbnail' => public_path('/images/course/tiktok-dropshipping-bootcamp/desktop-thumbnail.jpeg'),
                            'mobileThumbnail' => public_path('/images/course/tiktok-dropshipping-bootcamp/mobile-thumbnail.jpeg'),
                            'poster' => public_path('/images/course/tiktok-dropshipping-bootcamp/poster.jpeg'),

                        // 'lessons' => [
                        //     'desktopThumbnail' => public_path('/images/course/social-dynamics/desktop-thumbnail.jpeg'),
                        // ],

                    ],
                ],
            ],
            [
                'f_name' => 'Alex',
                'l_name' => 'Chen',
                'dp' => public_path('/images/course/the-ecommerce-brand-playbook/dp.jpeg'),
                'courses'=> [
                    'THE ECOMMERCE BRAND PLAYBOOOK' => [
                        'exclusive' => FALSE,

                            'desktopThumbnail' => public_path('/images/course/the-ecommerce-brand-playbook/desktop-thumbnail.jpeg'),
                            'mobileThumbnail' => public_path('/images/course/the-ecommerce-brand-playbook/mobile-thumbnail.jpeg'),
                            'poster' => public_path('/images/course/the-ecommerce-brand-playbook/poster.jpeg'),

                    ],
                ],
            ],
            [
                'f_name' => 'LUKE',
                'l_name' => 'BELMAR',
                'dp' => '',
                'courses'=> [
                    'DATA SETS' => [
                        'exclusive' => TRUE,
                            'desktopThumbnail' => public_path('/images/course/data-set/desktop-thumbnail.jpeg'),
                            'mobileThumbnail' => public_path('/images/course/data-set/mobile-thumbnail.jpeg'),
                            'poster' => public_path('/images/course/data-set/poster.jpeg'),

                    ],
                    'MONEY TALKS' => [
                        'exclusive' => TRUE,
                        'trailer' => 'https://vimeo.com/945826232?share=copy',
                        'desktopThumbnail' => public_path('/images/course/money-talk/desktop-thumbnail.jpeg'),
                        'mobileThumbnail' => public_path('/images/course/money-talk/mobile-thumbnail.jpeg'),
                        'poster' => public_path('/images/course/money-talk/poster.jpeg'),
                    ],
                ],
            ],
            [
                'f_name' => 'Brian',
                'l_name' => 'Tracy',
                'dp' => public_path('/images/course/create-multiply-preserve/dp.jpeg'),
                'featured' => TRUE,
                'courses'=> [
                    'CREATE. MULTIPLY. PRESERVE.' => [
                        'exclusive' => TRUE,

                            'desktopThumbnail' => public_path('/images/course/create-multiply-preserve/desktop-thumbnail.jpeg'),
                            'mobileThumbnail' => public_path('/images/course/create-multiply-preserve/mobile-thumbnail.jpeg'),
                            'poster' => public_path('/images/course/create-multiply-preserve/poster.jpeg'),

                    ],
                ],
            ],
            [
                'f_name' => 'Ardian',
                'l_name' => 'Fullani',
                'dp' => public_path('/images/course/confession-of-a-central-banker/dp.jpeg'),
                'courses'=> [
                    'Confessions of a Central Banker' => [
                        'exclusive' => TRUE,

                            'desktopThumbnail' => public_path('/images/course/confession-of-a-central-banker/desktop-thumbnail.jpeg'),
                            'mobileThumbnail' => public_path('/images/course/confession-of-a-central-banker/mobile-thumbnail.jpeg'),
                            'poster' => public_path('/images/course/confession-of-a-central-banker/poster.jpeg'),

                    ],
                ],
            ],

        ];

        foreach ($instructors as $instructorData) {
            $instructor = Instructor::where('first_name','iLIKE', $instructorData['f_name'])
                                     ->where('last_name','iLIKE', $instructorData['l_name'])
                                     ->first();
            if ($instructorData['dp']) {
                AddSpatieMediaJob::dispatch(
                    $instructorData['dp'],
                    $instructor,
                    'dp',
                    'path'
                );
            }

            if ($instructor) {
                foreach($instructorData['courses'] as $key => $courseName){
                    //dd($key);
                    $course = Course::where('default_instructor_id', $instructor->id)->where('title','iLIKE',$key)->first();
                    $course->update([
                        'exclusive' => $courseName['exclusive'],
                    ]);

                    if (isset($courseName['trailer'])) {
                        $course->update([
                            'trailer_url' => $courseName['trailer'],
                        ]);
                    }

                    if (isset($courseName['featured'])) {
                        $course->update([
                            'featured' => $courseName['featured'],
                        ]);
                    }else{
                        $course->update([
                            'featured' => FALSE,
                        ]);
                    }

                if ($course) {
                    if (isset($courseName['desktopThumbnail'])) {
                        AddSpatieMediaJob::dispatch(
                            $courseName['desktopThumbnail'],
                            $course,
                            'thumbnail',
                            'path'
                        );
                    }

                    if (!empty($courseName['mobileThumbnail'])) {
                        AddSpatieMediaJob::dispatch(
                            $courseName['mobileThumbnail'],
                            $course,
                            'mobileThumbnail',
                            'path'
                        );
                    }

                    if (!empty($courseName['poster'])) {
                        AddSpatieMediaJob::dispatch(
                            $courseName['poster'],
                            $course,
                            'poster',
                            'path'
                        );
                    }
                    // foreach($courseName['lessons'] as $lessonName){
                    //     $lesson = Lesson::where('course_id',$course->id)->where('title',$lessonName['title'])->first();
                    //     // update lesson here
                    // }

                } else {
                    // course is not found for the instructor
                }
                }

            } else {
                // instructor is not found
            }
        }



    }

    // private function createInstructor(array $instructorData): Instructor
    // {
    //     $instructor = Instructor::updateOrCreate([
    //         'first_name' => $instructorData['firstName'],
    //         'last_name' => $instructorData['lastName'],
    //     ], [
    //         'country_iso' => $instructorData['country_iso'],
    //         'first_name' => $instructorData['firstName'],
    //         'last_name' => $instructorData['lastName'],
    //         'title' => $instructorData['title'],
    //         'about' => $instructorData['about'],
    //     ]);

    //     if ($instructorData['dp']) {
    //         AddSpatieMediaJob::dispatch(
    //             $instructorData['dp'],
    //             $instructor,
    //             'dp',
    //             'path'
    //         );
    //     }

    //     return $instructor;
    // }

    // private function createUserForInstructor(array $userData, Instructor $instructor): void
    // {
    //     $user = User::updateOrCreate([
    //         'email' => $userData['email'],
    //     ], [
    //         'id' => $userData['glitch_id'],
    //         'country_iso' => $userData['country_iso'],
    //         'first_name' => $userData['firstName'],
    //         'last_name' => $userData['lastName'],
    //         'password' => Hash::make(Str::random()),
    //     ]);

    //     $instructor->update(['user_id' => $user->id]);

    //     AddSpatieMediaJob::dispatch(
    //         public_path('/images/avatars/33.jpeg'),
    //         $user,
    //         'dp',
    //         'path'
    //     );
    // }
}
