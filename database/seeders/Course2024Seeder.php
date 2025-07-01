<?php

namespace Database\Seeders;

use App\Jobs\AddSpatieMediaJob;
use App\Models\Course;
use App\Models\Instructor;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class Course2024Seeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $entrepreneurCourseDrippedDate = now()->addYear();
        $courses = [


            [
                // 'id' => 'course-id-10',
                'courseTitle' => 'SCALING PAST 8-FIGURES WITH ORGANISATIONAL EXCELLENCE',
                'courseSummery' => 'This course covers the aspects of scaling a team to achieve organisational excellence. It includes both the knowledge and practical applications to ensure an engaging and effective learning experience for all participants.',
                'featured' => true,
                'desktopThumbnail' => public_path('/images/course/scaling-past-8-figures/desktop-thumbnail.jpeg'),
                'mobileThumbnail' => public_path('/images/course/scaling-past-8-figures/mobile-thumbnail.jpeg'),
                'poster' => public_path('/images/course/scaling-past-8-figures/poster.jpeg'),
                'modules' => [
                    'INTRODUCTION' => [
                        [
                            'lessonTitle' => 'Welcome and Introduction',
                            'lessonDescription' => '',
                            'duration' => (3 * 60) + 18,
                            'vimeoUrl' => 'https://vimeo.com/940797618?share=copy',
                            'thumbnail' => public_path('/images/course/scaling-past-8-figures/lesson-thumbnails/module-1/m1l1.jpeg'),
                        ],
                        [
                            'lessonTitle' => 'Purpose of the Course',
                            'lessonDescription' => '',
                            'duration' => (2 * 60) + 17,
                            'vimeoUrl' => 'https://vimeo.com/941074843?share=copy',
                            'thumbnail' => public_path('/images/course/scaling-past-8-figures/lesson-thumbnails/module-1/m1l2.jpeg'),
                        ],
                        [
                            'lessonTitle' => 'Lesson Outline Overview',
                            'lessonDescription' => '',
                            'duration' => (2 * 60) + 18,
                            'vimeoUrl' => 'https://vimeo.com/941075093?share=copy',
                            'thumbnail' => public_path('/images/course/scaling-past-8-figures/lesson-thumbnails/module-1/m1l3.jpeg'),
                        ],

                    ],

                    'UNDERSTANDING ORGANIZATIONAL EXCELLENCE' => [
                        [
                            'lessonTitle' => 'Organizational Excellence Defined',
                            'lessonDescription' => '',
                            'duration' => (3 * 60) + 37,
                            'vimeoUrl' => 'https://vimeo.com/941080424?share=copy',
                            'thumbnail' => public_path('/images/course/scaling-past-8-figures/lesson-thumbnails/module-2/m2l1.jpeg'),
                        ],
                        [
                            'lessonTitle' => 'Importance and Benefits',
                            'lessonDescription' => '',
                            'duration' => (1 * 60) + 39,
                            'vimeoUrl' => 'https://vimeo.com/941082082?share=copy',
                            'thumbnail' => public_path('/images/course/scaling-past-8-figures/lesson-thumbnails/module-2/m2l2.jpeg'),
                        ],
                        [
                            'lessonTitle' => 'Key Components',
                            'lessonDescription' => '',
                            'duration' => (5 * 60) + 48,
                            'vimeoUrl' => 'https://vimeo.com/941083885?share=copy',
                            'thumbnail' => public_path('/images/course/scaling-past-8-figures/lesson-thumbnails/module-2/m2l3.jpeg'),
                        ],

                    ],
                    'UNDERSTANDING SCALING AND ITS IMPORTANCE IN BUSINESS' => [
                        [
                            'lessonTitle' => 'Definition and Importance',
                            'lessonDescription' => '',
                            'duration' => (3 * 60) + 12,
                            'vimeoUrl' => 'https://vimeo.com/941086658?share=copy',
                            'thumbnail' => public_path('/images/course/scaling-past-8-figures/lesson-thumbnails/module-3/m3l1.jpeg'),
                        ],
                        [
                            'lessonTitle' => 'Different Approaches: Horizontal and Vertical',
                            'lessonDescription' => '',
                            'duration' => (2 * 60) + 30,
                            'vimeoUrl' => 'https://vimeo.com/941090507?share=copy',
                            'thumbnail' => public_path('/images/course/scaling-past-8-figures/lesson-thumbnails/module-3/m3l2.jpeg'),
                        ],
                        [
                            'lessonTitle' => 'Possible Challenges',
                            'lessonDescription' => '',
                            'duration' => (3 * 60) + 45,
                            'vimeoUrl' => 'https://vimeo.com/941100638?share=copy',
                            'thumbnail' => public_path('/images/course/scaling-past-8-figures/lesson-thumbnails/module-3/m3l3.jpeg'),
                        ],

                    ],

                    'SETTING A VISION FOR SCALING' => [
                        [
                            'lessonTitle' => 'Define The Vision',
                            'lessonDescription' => '',
                            'duration' => (5 * 60) + 29,
                            'vimeoUrl' => 'https://vimeo.com/941104094?share=copy',
                            'resources_link' => 'https://we.tl/t-SGybC9kIqQ',
                            'thumbnail' => public_path('/images/course/scaling-past-8-figures/lesson-thumbnails/module-4/m4l1.jpeg'),
                        ],
                        [
                            'lessonTitle' => 'Objectives, Alignment & Business Goals',
                            'lessonDescription' => '',
                            'duration' => (3 * 60) + 22,
                            'vimeoUrl' => 'https://vimeo.com/941108353?share=copy',
                            'resources_link' => 'https://we.tl/t-SGybC9kIqQ',
                            'thumbnail' => public_path('/images/course/scaling-past-8-figures/lesson-thumbnails/module-4/m4l2.jpeg'),
                        ],
                        [
                            'lessonTitle' => 'Importance of a Clear Vision',
                            'lessonDescription' => '',
                            'duration' => (3 * 60) + 12,
                            'vimeoUrl' => 'https://vimeo.com/941115232?share=copy',
                            'resources_link' => 'https://we.tl/t-SGybC9kIqQ',
                            'thumbnail' => public_path('/images/course/scaling-past-8-figures/lesson-thumbnails/module-4/m4l3.jpeg'),
                        ],

                    ],

                    'BUILDING THE RIGHT TEAM' => [
                        [
                            'lessonTitle' => 'Identifying the Right People',
                            'lessonDescription' => '',
                            'duration' => (4 * 60) + 51,
                            'vimeoUrl' => 'https://vimeo.com/941119396?share=copy',
                            'resources_link' => 'https://we.tl/t-uQZGnggY0P',
                            'thumbnail' => public_path('/images/course/scaling-past-8-figures/lesson-thumbnails/module-5/m5l1.jpeg'),
                        ],
                        [
                            'lessonTitle' => 'Recruiting and Retaining Talent',
                            'lessonDescription' => '',
                            'duration' => (6 * 60) + 38,
                            'vimeoUrl' => 'https://vimeo.com/941122235?share=copy',
                            'resources_link' => 'https://we.tl/t-uQZGnggY0P',
                            'thumbnail' => public_path('/images/course/scaling-past-8-figures/lesson-thumbnails/module-5/m5l2.jpeg'),
                        ],
                        [
                            'lessonTitle' => 'Developing Leaders',
                            'lessonDescription' => '',
                            'duration' => (6 * 60) + 14,
                            'vimeoUrl' => 'https://vimeo.com/941125706?share=copy',
                            'resources_link' => 'https://we.tl/t-uQZGnggY0P',
                            'thumbnail' => public_path('/images/course/scaling-past-8-figures/lesson-thumbnails/module-5/m5l3.jpeg'),
                        ],

                    ],

                    'INCORPORATE MMA INTO YOUR BUSINESS' => [
                        [
                            'lessonTitle' => 'Typical Problems Faced by Businesses',
                            'lessonDescription' => '',
                            'duration' => (2 * 60) + 41,
                            'vimeoUrl' => 'https://vimeo.com/941130506?share=copy',
                            'resources_link' => 'https://we.tl/t-0XWlEQ321O',
                            'thumbnail' => public_path('/images/course/scaling-past-8-figures/lesson-thumbnails/module-6/m6l1.jpeg'),
                        ],
                        [
                            'lessonTitle' => 'MMA (Meaning, Mastery, Autonomy)',
                            'lessonDescription' => '',
                            'duration' => (5 * 60) + 50,
                            'vimeoUrl' => 'https://vimeo.com/941133152?share=copy',
                            'resources_link' => 'https://we.tl/t-0XWlEQ321O',
                            'thumbnail' => public_path('/images/course/scaling-past-8-figures/lesson-thumbnails/module-6/m6l2.jpeg'),
                        ],
                        [
                            'lessonTitle' => 'Documentation and Knowledge Sharing',
                            'lessonDescription' => '',
                            'duration' => (3 * 60) + 15,
                            'vimeoUrl' => 'https://vimeo.com/941135682?share=copy',
                            'resources_link' => 'https://we.tl/t-0XWlEQ321O',
                            'thumbnail' => public_path('/images/course/scaling-past-8-figures/lesson-thumbnails/module-6/m6l3.jpeg'),
                        ],

                    ],

                    'METRICS FOR MONITORING SCALING SUCCESS' => [
                        [
                            'lessonTitle' => 'Key Performance Indicators',
                            'lessonDescription' => '',
                            'duration' => (4 * 60) + 18,
                            'vimeoUrl' => 'https://vimeo.com/941143344?share=copy',
                            'resources_link' => 'https://we.tl/t-fj449PnAdQ',
                            'thumbnail' => public_path('/images/course/scaling-past-8-figures/lesson-thumbnails/module-7/m7l1.jpeg'),
                        ],
                        [
                            'lessonTitle' => 'Monitoring and Adjusting Scaling',
                            'lessonDescription' => '',
                            'duration' => (2 * 60) + 2,
                            'vimeoUrl' => 'https://vimeo.com/941145631?share=copy',
                            'resources_link' => 'https://we.tl/t-fj449PnAdQ',
                            'thumbnail' => public_path('/images/course/scaling-past-8-figures/lesson-thumbnails/module-7/m7l2.jpeg'),
                        ],
                        [
                            'lessonTitle' => 'Tools for Tracking Scaling Progress',
                            'lessonDescription' => '',
                            'duration' => (4 * 60) + 30,
                            'vimeoUrl' => 'https://vimeo.com/941147905?share=copy',
                            'resources_link' => 'https://we.tl/t-fj449PnAdQ',
                            'thumbnail' => public_path('/images/course/scaling-past-8-figures/lesson-thumbnails/module-7/m7l3.jpeg'),
                        ],

                    ],

                    'CASE STUDY AND DISCUSSION' => [
                        [
                            'lessonTitle' => 'Presentation on Vodien: Using the Cycle of Good Work',
                            'lessonDescription' => '',
                            'duration' => (4 * 60) + 1,
                            'vimeoUrl' => 'https://vimeo.com/941150481?share=copy',
                            'resources_link' => 'https://we.tl/t-1DYRMsOR2I',
                            'thumbnail' => public_path('/images/course/scaling-past-8-figures/lesson-thumbnails/module-8/m8l1.jpeg'),
                        ],
                    ],

                    'WRAP-UP' => [
                        [
                            'lessonTitle' => 'Course Recap',
                            'lessonDescription' => '',
                            'duration' => (2 * 60) + 31,
                            'vimeoUrl' => 'https://vimeo.com/941155645?share=copy',
                            'thumbnail' => public_path('/images/course/scaling-past-8-figures/lesson-thumbnails/module-9/m9l1.jpeg'),
                        ],
                        [
                            'lessonTitle' => 'Resources and Recommended Reading',
                            'lessonDescription' => '',
                            'duration' => 36,
                            'vimeoUrl' => 'https://vimeo.com/941157553?share=copy',
                            'thumbnail' => public_path('/images/course/scaling-past-8-figures/lesson-thumbnails/module-9/m3l2.jpeg'),
                        ],
                    ],

                ],
                'instructors' => [
                    [
                        'country_iso' => 'MY',
                        'firstName' => 'STUART',
                        'lastName' => 'TAN',
                        'title' => 'Co-Founders of Super Scaling',
                        'about' => 'Stuart Tan is a speaker, coach and organizational development consultant, having served over 500,000 people around the world. His clients include government ministries and statutory boards, Fortune 500 companies and leaders of small and medium enterprises.He continues to serve organizations and coach their leaders whose aim is to jointly multiply wellness and productivity.',
                        'dp' => public_path('/images/instructors/dp/stuart.jpeg'),
                    ],
                    [
                        'country_iso' => 'MY',
                        'firstName' => 'ALVIN',
                        'lastName' => 'POH',
                        'title' => 'Co-Founders of Super Scaling',
                        'about' => 'At 33, Alvin sold his Internet business for $30 million. This was Vodien, which he scaled up from $0 all the way to Singapore’s #1 hosting provider with 35,000 clients and a team of 150.Currently, he gives back as a mentor, runs a cloud host at CLDY.com, and serves as an advisor to businesses.',
                        'dp' => public_path('/images/instructors/dp/alvin.jpeg'),
                    ],
                ],
            ],










            [
                // 'id' => 'course-id-11',
                'courseTitle' => 'ANTHROPOLGY OF CONSUMERISM AND PRODUCT RESEARCH METHODOLOGY',
                'courseSummery' => 'Venture with Luke into on an epic journey where he takes a deep dive into consumer patterns that shape our world through an anthropological lens. Learn the values and principles that will help you find the business success you’ve always been looking for.',
                'featured' => true,
                'desktopThumbnail' => public_path('/images/course/anthropolgy-of-consumerism/desktop-thumbnail.jpeg'),
                'mobileThumbnail' => public_path('/images/course/anthropolgy-of-consumerism/mobile-thumbnail.jpeg'),
                'poster' => public_path('/images/course/anthropolgy-of-consumerism/poster.jpeg'),
                'modules' => [
                    'INTRODUCTION' => [
                        [
                            'lessonTitle' => 'Welcome',
                            'lessonDescription' => '',
                            'duration' => (1 * 60) + 59,
                            'vimeoUrl' => 'https://vimeo.com/942213469?share=copy',
                            'resources_link' => 'https://we.tl/t-2XGTGzQc8y',
                            'thumbnail' => public_path('/images/course/anthropolgy-of-consumerism/lesson-thumbnails/m1l1.jpeg'),
                        ],
                    ],

                    'PRIMAL VALUES' => [
                        [
                            'lessonTitle' => 'The 6 Primal Values',
                            'lessonDescription' => '',
                            'duration' => (1 * 60) + 53,
                            'vimeoUrl' => 'https://vimeo.com/942215190?share=copy',
                            'resources_link' => 'https://we.tl/t-OzVkmzJ8nj',
                            'thumbnail' => public_path('/images/course/anthropolgy-of-consumerism/lesson-thumbnails/m2l1.jpeg'),
                        ],
                        [
                            'lessonTitle' => 'Survival',
                            'lessonDescription' => '',
                            'duration' => (2 * 60) + 55,
                            'vimeoUrl' => 'https://vimeo.com/942217591?share=copy',
                            'resources_link' => 'https://we.tl/t-OzVkmzJ8nj',
                            'thumbnail' => public_path('/images/course/anthropolgy-of-consumerism/lesson-thumbnails/m2l2.jpeg'),
                        ],
                        [
                            'lessonTitle' => 'Lifespan Longevity',
                            'lessonDescription' => '',
                            'duration' => (4 * 60) + 9,
                            'vimeoUrl' => 'https://vimeo.com/942222242?share=copy',
                            'resources_link' => 'https://we.tl/t-OzVkmzJ8nj',
                            'thumbnail' => public_path('/images/course/anthropolgy-of-consumerism/lesson-thumbnails/m2l3.jpeg'),
                        ],
                        [
                            'lessonTitle' => 'Pain Avoidance',
                            'lessonDescription' => '',
                            'duration' => (3 * 60) + 48,
                            'vimeoUrl' => 'https://vimeo.com/942223992?share=copy',
                            'resources_link' => 'https://we.tl/t-OzVkmzJ8nj',
                            'thumbnail' => public_path('/images/course/anthropolgy-of-consumerism/lesson-thumbnails/m2l4.jpeg'),
                        ],
                        [
                            'lessonTitle' => 'Pleasure',
                            'lessonDescription' => '',
                            'duration' => (4 * 60) + 26,
                            'vimeoUrl' => 'https://vimeo.com/942226059?share=copy',
                            'resources_link' => 'https://we.tl/t-OzVkmzJ8nj',
                            'thumbnail' => public_path('/images/course/anthropolgy-of-consumerism/lesson-thumbnails/m2l5.jpeg'),
                        ],
                        [
                            'lessonTitle' => 'Reciprocity',
                            'lessonDescription' => '',
                            'duration' => (3 * 60) + 51,
                            'vimeoUrl' => 'https://vimeo.com/942227957?share=copy',
                            'resources_link' => 'https://we.tl/t-OzVkmzJ8nj',
                            'thumbnail' => public_path('/images/course/anthropolgy-of-consumerism/lesson-thumbnails/m2l6.jpeg'),
                        ],
                        [
                            'lessonTitle' => 'Fear',
                            'lessonDescription' => '',
                            'duration' => (4 * 60) + 11,
                            'vimeoUrl' => 'https://vimeo.com/942229667?share=copy',
                            'resources_link' => 'https://we.tl/t-OzVkmzJ8nj',
                            'thumbnail' => public_path('/images/course/anthropolgy-of-consumerism/lesson-thumbnails/m2l7.jpeg'),
                        ],
                    ],

                    'EMOTIONAL VALUES' => [
                        [
                            'lessonTitle' => 'Four Emotional Values',
                            'lessonDescription' => '',
                            'duration' => (2 * 60) + 17,
                            'vimeoUrl' => 'https://vimeo.com/942231996?share=copy',
                            'resources_link' => 'https://we.tl/t-lVdsaK7rQd',
                            'thumbnail' => public_path('/images/course/anthropolgy-of-consumerism/lesson-thumbnails/m3l1.jpeg'),
                        ],
                        [
                            'lessonTitle' => 'Personal Wellness',
                            'lessonDescription' => '',
                            'duration' => (3 * 60) + 26,
                            'vimeoUrl' => 'https://vimeo.com/942234970?share=copy',
                            'resources_link' => 'https://we.tl/t-lVdsaK7rQd',
                            'thumbnail' => public_path('/images/course/anthropolgy-of-consumerism/lesson-thumbnails/m3l2.jpeg'),
                        ],
                        [
                            'lessonTitle' => 'Empathy',
                            'lessonDescription' => '',
                            'duration' => (3 * 60) + 35,
                            'vimeoUrl' => 'https://vimeo.com/942282388?share=copy',
                            'resources_link' => 'https://we.tl/t-lVdsaK7rQd',
                            'thumbnail' => public_path('/images/course/anthropolgy-of-consumerism/lesson-thumbnails/m3l3.jpeg'),
                        ],
                        [
                            'lessonTitle' => 'Reward',
                            'lessonDescription' => '',
                            'duration' => (3 * 60) + 18,
                            'vimeoUrl' => 'https://vimeo.com/942293010?share=copy',
                            'resources_link' => 'https://we.tl/t-lVdsaK7rQd',
                            'thumbnail' => public_path('/images/course/anthropolgy-of-consumerism/lesson-thumbnails/m3l4.jpeg'),
                        ],
                        [
                            'lessonTitle' => 'Nostalgia',
                            'lessonDescription' => '',
                            'duration' => (3 * 60) + 1,
                            'vimeoUrl' => 'https://vimeo.com/942298757?share=copy',
                            'resources_link' => 'https://we.tl/t-lVdsaK7rQd',
                            'thumbnail' => public_path('/images/course/anthropolgy-of-consumerism/lesson-thumbnails/m3l5.jpeg'),
                        ],
                    ],

                    'FIVE EFFICIENCY VALUES' => [
                        [
                            'lessonTitle' => 'Five Efficiency Values',
                            'lessonDescription' => '',
                            'duration' => (2 * 60) + 30,
                            'vimeoUrl' => 'https://vimeo.com/942300954?share=copy',
                            'resources_link' => 'https://we.tl/t-TcUhPuzEm2',
                            'thumbnail' => public_path('/images/course/anthropolgy-of-consumerism/lesson-thumbnails/m4l1.jpeg'),
                        ],
                        [
                            'lessonTitle' => 'Friction Reduction',
                            'lessonDescription' => '',
                            'duration' => (3 * 60) + 11,
                            'vimeoUrl' => 'https://vimeo.com/942302751?share=copy',
                            'resources_link' => 'https://we.tl/t-TcUhPuzEm2',
                            'thumbnail' => public_path('/images/course/anthropolgy-of-consumerism/lesson-thumbnails/m4l2.jpeg'),
                        ],
                        [
                            'lessonTitle' => 'Simple Access',
                            'lessonDescription' => '',
                            'duration' => (3 * 60) + 55,
                            'vimeoUrl' => 'https://vimeo.com/942304798?share=copy',
                            'resources_link' => 'https://we.tl/t-TcUhPuzEm2',
                            'thumbnail' => public_path('/images/course/anthropolgy-of-consumerism/lesson-thumbnails/m4l3.jpeg'),
                        ],
                        [
                            'lessonTitle' => 'Targeted Information',
                            'lessonDescription' => '',
                            'duration' => (3 * 60) + 40,
                            'vimeoUrl' => 'https://vimeo.com/942307347?share=copy',
                            'resources_link' => 'https://we.tl/t-TcUhPuzEm2',
                            'thumbnail' => public_path('/images/course/anthropolgy-of-consumerism/lesson-thumbnails/m4l4.jpeg'),
                        ],
                        [
                            'lessonTitle' => 'Financial Savings',
                            'lessonDescription' => '',
                            'duration' => (3 * 60) + 16,
                            'vimeoUrl' => 'https://vimeo.com/942309112?share=copy',
                            'resources_link' => 'https://we.tl/t-TcUhPuzEm2',
                            'thumbnail' => public_path('/images/course/anthropolgy-of-consumerism/lesson-thumbnails/m4l5.jpeg'),
                        ],
                    ],

                    'THREE SOCIAL VALUES' => [
                        [
                            'lessonTitle' => 'Social Hierarchy',
                            'lessonDescription' => '',
                            'duration' => (3 * 60) + 55,
                            'vimeoUrl' => 'https://vimeo.com/942311087?share=copy',
                            'resources_link' => 'https://we.tl/t-0yFqaDfioi',
                            'thumbnail' => public_path('/images/course/anthropolgy-of-consumerism/lesson-thumbnails/m5l1.jpeg'),
                        ],
                        [
                            'lessonTitle' => 'Trends',
                            'lessonDescription' => '',
                            'duration' => (3 * 60) + 17,
                            'vimeoUrl' => 'https://vimeo.com/942312620?share=copy',
                            'resources_link' => 'https://we.tl/t-0yFqaDfioi',
                            'thumbnail' => public_path('/images/course/anthropolgy-of-consumerism/lesson-thumbnails/m5l2.jpeg'),
                        ],
                        [
                            'lessonTitle' => 'Clan Incorporation',
                            'lessonDescription' => '',
                            'duration' => (4 * 60) + 22,
                            'vimeoUrl' => 'https://vimeo.com/942314189?share=copy',
                            'resources_link' => 'https://we.tl/t-0yFqaDfioi',
                            'thumbnail' => public_path('/images/course/anthropolgy-of-consumerism/lesson-thumbnails/m5l3.jpeg'),
                        ],
                    ],



                ],
                'instructors' => [
                    [
                        'country_iso' => 'US',
                        'firstName' => 'LUKE',
                        'lastName' => 'BELMAR',
                        'title' => 'Co-Founder of Capital Club',
                        'about' => 'Co-founder of CC',
                        'dp' => public_path('/images/instructors/dp/instructor-id-2.jpeg'),
                    ],
                ],
            ],





            [
                'courseTitle' => 'THE SCIENCE OF GOOGLE ADS',
                'courseSummery' => 'Learn the necessary fundamentals in order to execute Google Ads effectively. This course will not only enable you to launch profitable Google Ads, but also help you understand how to scale to levels that you have never seen before.',
                'featured' => true,
                'desktopThumbnail' => public_path('/images/course/the-science-of-google-ads/desktop-thumbnail.jpeg'),
                'mobileThumbnail' => public_path('/images/course/the-science-of-google-ads/mobile-thumbnail.jpeg'),
                'poster' => public_path('/images/course/the-science-of-google-ads/poster.jpeg'),
                'modules' => [
                    'INTRODUCTION' => [
                        [
                            'lessonTitle' => 'Welcome',
                            'lessonDescription' => '',
                            'duration' => (2 * 60) + 46,
                            'vimeoUrl' => 'https://vimeo.com/943916083?share=copy',
                            'thumbnail' => public_path('/images/course/the-science-of-google-ads/lesson-thumbnails/module1/m1l1.jpeg'),
                        ],

                        ],
                        'PUSH VS PULL TRAFFIC' => [
                        [
                        'lessonTitle' => 'Facebook Ads vs Google Ads',
                        'lessonDescription' => '',
                        'duration' => (4 * 60) + 12,
                        'vimeoUrl' => 'https://vimeo.com/943921013?share=copy',
                        'thumbnail' => public_path('/images/course/the-science-of-google-ads/lesson-thumbnails/m2l1.jpeg'),
                        ],
                        [
                        'lessonTitle' => 'Lead vs. Demand Generation',
                        'lessonDescription' => '',
                        'duration' => (2 * 60) + 28,
                        'vimeoUrl' => 'https://vimeo.com/943924122?share=copy',
                        'thumbnail' => public_path('/images/course/the-science-of-google-ads/lesson-thumbnails/m2l2.jpeg'),
                        ],
                        [
                        'lessonTitle' => 'Campaign Types',
                        'lessonDescription' => '',
                        'duration' => (2 * 60) + 22,
                        'vimeoUrl' => 'https://vimeo.com/943943837?share=copy',
                        'thumbnail' => public_path('/images/course/the-science-of-google-ads/lesson-thumbnails/m2l3.jpeg'),
                        ],
                        [
                        'lessonTitle' => 'Push vs. Pull Marketing: Marketing Examples',
                        'lessonDescription' => '',
                        'duration' => (2 * 60) + 30,
                        'vimeoUrl' => 'https://vimeo.com/943947577?share=copy',
                        'thumbnail' => public_path('/images/course/the-science-of-google-ads/lesson-thumbnails/m2l4.jpeg'),
                        ],

                     ],
                     'UNDERSTANDING THE FUNDAMENTALS OF GOOGLE ADS' => [
                        [
                        'lessonTitle' => 'Search Volume & Seasonality',
                        'lessonDescription' => '',
                        'duration' => (6 * 60) + 56,
                        'vimeoUrl' => 'https://vimeo.com/943952476?share=copy',
                        'thumbnail' => public_path('/images/course/the-science-of-google-ads/lesson-thumbnails/m3l1.jpeg'),
                        ],
                        [
                        'lessonTitle' => 'Google Trends',
                        'lessonDescription' => '',
                        'duration' => (4 * 60) + 33,
                        'vimeoUrl' => 'https://vimeo.com/943955645?share=copy',
                        'thumbnail' => public_path('/images/course/the-science-of-google-ads/lesson-thumbnails/m3l2.jpeg'),
                        ],
                        [
                        'lessonTitle' => 'Keywords',
                        'lessonDescription' => '',
                        'duration' => (5 * 60) + 26,
                        'vimeoUrl' => 'https://vimeo.com/943959027?share=copy',
                        'thumbnail' => public_path('/images/course/the-science-of-google-ads/lesson-thumbnails/m3l3.jpeg'),
                        ],
                        [
                        'lessonTitle' => 'Search Intent',
                        'lessonDescription' => '',
                        'duration' => (9 * 60) + 58,
                        'vimeoUrl' => 'https://vimeo.com/943963498?share=copy',
                        'thumbnail' => public_path('/images/course/the-science-of-google-ads/lesson-thumbnails/m3l4.jpeg'),
                        ],
                        [
                        'lessonTitle' => 'Keyword Match Types',
                        'lessonDescription' => '',
                        'duration' => (3 * 60) + 56,
                        'vimeoUrl' => 'https://vimeo.com/943967162?share=copy',
                        'resource_link' => 'https://we.tl/t-QyvbmqYjND',
                        'thumbnail' => public_path('/images/course/the-science-of-google-ads/lesson-thumbnails/m3l5.jpeg'),
                        ],
                        [
                        'lessonTitle' => 'Negative Keywords',
                        'lessonDescription' => '',
                        'duration' => (3 * 60) + 56,
                        'vimeoUrl' => 'https://vimeo.com/943969945?share=copy',
                        'thumbnail' => public_path('/images/course/the-science-of-google-ads/lesson-thumbnails/m3l6.jpeg'),
                        ],

                     ],
                ],
                'instructors' => [
                    [
                        'country_iso' => 'ID',
                        'firstName' => 'JEM',
                        'lastName' => 'BOUROUH',
                        'title' => 'Founder of Adcubator',
                        'about' => 'Founder of Adcubator',
                        'dp' => public_path('/images/course/the-science-of-google-ads/dp.jpeg'),
                    ],
                ],
            ],


            [
                'courseTitle' => 'Your Roadmap to Money in the 2020s',
                'courseSummery' => '',
                'featured' => true,
                'desktopThumbnail' => public_path('/images/course/your-roadmap-to-money-in-the-2020s/desktop-thumbnail.jpeg'),
                'mobileThumbnail' => public_path('/images/course/your-roadmap-to-money-in-the-2020s/mobile-thumbnail.jpeg'),
                'poster' => public_path('/images/course/your-roadmap-to-money-in-the-2020s/poster.jpeg'),
                'modules' => [
                    'The Modern Battlefield' => [
                        [
                            'lessonTitle' => 'The Modern Battlefield',
                            'lessonDescription' => '',
                            'duration' => (32 * 60) + 1,
                            'vimeoUrl' => 'https://vimeo.com/944681774?share=copy',
                            'thumbnail' => public_path('/images/course/your-roadmap-to-money-in-the-2020s/lesson-thumbnails/module1/m1l1.jpeg'),
                        ],

                        ],
                        'Emergent Tech That Changes Everything' => [
                        [
                        'lessonTitle' => 'The Nanomaterial Revolution',
                        'lessonDescription' => '',
                        'duration' => (4 * 60) + 10,
                        'vimeoUrl' => 'https://vimeo.com/944685649?share=copy',
                        'thumbnail' => public_path('/images/course/your-roadmap-to-money-in-the-2020s/lesson-thumbnails/module2/m2l1.jpeg'),
                        ],
                        [
                        'lessonTitle' => 'Robotics and Automation',
                        'lessonDescription' => '',
                        'duration' => (4 * 60) + 28,
                        'vimeoUrl' => 'https://vimeo.com/944689365?share=copy',
                        'thumbnail' => public_path('/images/course/your-roadmap-to-money-in-the-2020s/lesson-thumbnails/module2/m2l2.jpeg'),
                        ],
                        [
                        'lessonTitle' => 'The Form Factor Revolution',
                        'lessonDescription' => '',
                        'duration' => (4 * 60) + 12,
                        'vimeoUrl' => 'https://vimeo.com/944698391?share=copy',
                        'thumbnail' => public_path('/images/course/your-roadmap-to-money-in-the-2020s/lesson-thumbnails/module2/m2l3.jpeg'),
                        ],
                        [
                        'lessonTitle' => 'Weaponized Information',
                        'lessonDescription' => '',
                        'duration' => (9 * 60) + 46,
                        'vimeoUrl' => 'https://vimeo.com/944700676?share=copy',
                        'thumbnail' => public_path('/images/course/your-roadmap-to-money-in-the-2020s/lesson-thumbnails/module2/m2l4.jpeg'),
                        ],
                        [
                        'lessonTitle' => '5G Cellular',
                        'lessonDescription' => '',
                        'duration' => (5 * 60) + 18,
                        'vimeoUrl' => 'https://vimeo.com/944702967?share=copy',
                        'thumbnail' => public_path('/images/course/your-roadmap-to-money-in-the-2020s/lesson-thumbnails/module2/m2l5.jpeg'),
                        ],
                        [
                        'lessonTitle' => 'AI',
                        'lessonDescription' => '',
                        'duration' => (8 * 60) + 22,
                        'vimeoUrl' => 'https://vimeo.com/944709540?share=copy',
                        'thumbnail' => public_path('/images/course/your-roadmap-to-money-in-the-2020s/lesson-thumbnails/module2/m2l6.jpeg'),
                        ],
                        [
                        'lessonTitle' => 'Quantum Computing',
                        'lessonDescription' => '',
                        'duration' => (4 * 60) + 29,
                        'vimeoUrl' => 'https://vimeo.com/944720349?share=copy',
                        'thumbnail' => public_path('/images/course/your-roadmap-to-money-in-the-2020s/lesson-thumbnails/module2/m2l7.jpeg'),
                        ],
                        [
                        'lessonTitle' => '3D Printing',
                        'lessonDescription' => '',
                        'duration' => (3 * 60) + 30,
                        'vimeoUrl' => 'https://vimeo.com/944727953?share=copy',
                        'thumbnail' => public_path('/images/course/your-roadmap-to-money-in-the-2020s/lesson-thumbnails/module2/m2l8.jpeg'),
                        ],
                        [
                        'lessonTitle' => 'The Internet of Things',
                        'lessonDescription' => '',
                        'duration' => (4 * 60) + 13,
                        'vimeoUrl' => 'https://vimeo.com/944734409?share=copy',
                        'thumbnail' => public_path('/images/course/your-roadmap-to-money-in-the-2020s/lesson-thumbnails/module2/m2l9.jpeg'),
                        ],

                     ],
                     'Emergent Economic Phenomena' => [
                        [
                        'lessonTitle' => 'The Mass Displacement',
                        'lessonDescription' => '',
                        'duration' => (3 * 60) + 13,
                        'vimeoUrl' => 'https://vimeo.com/946070155?share=copy',
                        'thumbnail' => public_path('/images/course/your-roadmap-to-money-in-the-2020s/lesson-thumbnails/module3/m3l1.jpeg'),
                        ],
                        [
                        'lessonTitle' => 'The Entrepreneurial Explosion',
                        'lessonDescription' => '',
                        'duration' => (3 * 60) + 13,
                        'vimeoUrl' => 'https://vimeo.com/946072040?share=copy',
                        'thumbnail' => public_path('/images/course/your-roadmap-to-money-in-the-2020s/lesson-thumbnails/module3/m3l2.jpeg'),
                        ],
                        [
                        'lessonTitle' => 'The Rise of the Mutant Middlemen',
                        'lessonDescription' => '',
                        'duration' => (5 * 60) + 21,
                        'vimeoUrl' => 'https://vimeo.com/946074579?share=copy',
                        'thumbnail' => public_path('/images/course/your-roadmap-to-money-in-the-2020s/lesson-thumbnails/module3/m3l3.jpeg'),
                        ],
                    ],
                    'Humanitys 9 Greatest Threats' => [
                        [
                        'lessonTitle' => 'The Grand Choice:  Centralization vs. Decentralization',
                        'lessonDescription' => '',
                        'duration' => (5 * 60) + 11,
                        'vimeoUrl' => 'https://vimeo.com/946076227?share=copy',
                        'thumbnail' => public_path('/images/course/your-roadmap-to-money-in-the-2020s/lesson-thumbnails/module4/m4l1.jpeg'),
                        ],
                        [
                        'lessonTitle' => 'The Coldest War - Mass Information Warfare',
                        'lessonDescription' => '',
                        'duration' => (5 * 60) + 13,
                        'vimeoUrl' => 'https://vimeo.com/946077485?share=copy',
                        'thumbnail' => public_path('/images/course/your-roadmap-to-money-in-the-2020s/lesson-thumbnails/module4/m4l2.jpeg'),
                        ],
                        [
                        'lessonTitle' => 'The Great Educational Deficit - Epistemological, Media Studies, and EQ Illiteracy',
                        'lessonDescription' => '',
                        'duration' => (4 * 60) + 32,
                        'vimeoUrl' => 'https://vimeo.com/946079178?share=copy',
                        'thumbnail' => public_path('/images/course/your-roadmap-to-money-in-the-2020s/lesson-thumbnails/module4/m4l3.jpeg'),
                        ],
                        [
                        'lessonTitle' => 'Man Vs. Machine',
                        'lessonDescription' => '',
                        'duration' => (2 * 60) + 21,
                        'vimeoUrl' => 'https://vimeo.com/946082568?share=copy',
                        'thumbnail' => public_path('/images/course/your-roadmap-to-money-in-the-2020s/lesson-thumbnails/module4/m4l4.jpeg'),
                        ],
                        [
                        'lessonTitle' => 'Unintended Consequences',
                        'lessonDescription' => '',
                        'duration' => (3 * 60) + 37,
                        'vimeoUrl' => 'https://vimeo.com/946090394?share=copy',
                        'thumbnail' => public_path('/images/course/your-roadmap-to-money-in-the-2020s/lesson-thumbnails/module4/m4l5.jpeg'),
                        ],
                        [
                        'lessonTitle' => ' The Complexity Gap on Steroids',
                        'lessonDescription' => '',
                        'duration' => (1 * 60) + 16,
                        'vimeoUrl' => 'https://vimeo.com/946092284?share=copy',
                        'thumbnail' => public_path('/images/course/your-roadmap-to-money-in-the-2020s/lesson-thumbnails/module4/m4l6.jpeg'),
                        ],
                        [
                        'lessonTitle' => 'The End of Privacy, Cryptography, and Blockchain?',
                        'lessonDescription' => '',
                        'duration' => (2 * 60) + 56,
                        'vimeoUrl' => 'https://vimeo.com/946094185?share=copy',
                        'thumbnail' => public_path('/images/course/your-roadmap-to-money-in-the-2020s/lesson-thumbnails/module4/m4l7.jpeg'),
                        ],
                        [
                        'lessonTitle' => 'Big Tech vs. Small Business',
                        'lessonDescription' => '',
                        'duration' => (3 * 60) + 15,
                        'vimeoUrl' => 'https://vimeo.com/946096172?share=copy',
                        'thumbnail' => public_path('/images/course/your-roadmap-to-money-in-the-2020s/lesson-thumbnails/module4/m4l8.jpeg'),
                        ],
                        [
                        'lessonTitle' => ' The Transition Tribulation',
                        'lessonDescription' => '',
                        'duration' => (1 * 60) + 54,
                        'vimeoUrl' => 'https://vimeo.com/946098299?share=copy',
                        'thumbnail' => public_path('/images/course/your-roadmap-to-money-in-the-2020s/lesson-thumbnails/module4/m4l9.jpeg'),
                        ],
                    ],
                    'Emerging Growth Markets' => [
                        [
                        'lessonTitle' => 'Mutant Middlemen ',
                        'lessonDescription' => '',
                        'duration' => (4 * 60) + 27,
                        'vimeoUrl' => 'https://vimeo.com/946100339?share=copy',
                        'thumbnail' => public_path('/images/course/your-roadmap-to-money-in-the-2020s/lesson-thumbnails/module5/m5l1.jpeg'),
                        ],
                        [
                        'lessonTitle' => ' Pickaxes and Shovels to Miners',
                        'lessonDescription' => '',
                        'duration' => (3 * 60) + 28,
                        'vimeoUrl' => 'https://vimeo.com/946102366?share=copy',
                        'thumbnail' => public_path('/images/course/your-roadmap-to-money-in-the-2020s/lesson-thumbnails/module5/m5l2.jpeg'),
                        ],
                        [
                        'lessonTitle' => 'Digital Nomads',
                        'lessonDescription' => '',
                        'duration' => (1 * 60) + 40,
                        'vimeoUrl' => 'https://vimeo.com/946106253?share=copy',
                        'thumbnail' => public_path('/images/course/your-roadmap-to-money-in-the-2020s/lesson-thumbnails/module5/m5l3.jpeg'),
                        ],
                        [
                        'lessonTitle' => 'The Gig Economy',
                        'lessonDescription' => '',
                        'duration' => (2 * 60) + 3,
                        'vimeoUrl' => 'https://vimeo.com/946107786?share=copy',
                        'thumbnail' => public_path('/images/course/your-roadmap-to-money-in-the-2020s/lesson-thumbnails/module5/m5l4.jpeg'),
                        ],
                        [
                        'lessonTitle' => 'Big Tech Alternatives',
                        'lessonDescription' => '',
                        'duration' => (2 * 60) + 2,
                        'vimeoUrl' => 'https://vimeo.com/946108519?share=copy',
                        'thumbnail' => public_path('/images/course/your-roadmap-to-money-in-the-2020s/lesson-thumbnails/module5/m5l5.jpeg'),
                        ],
                        [
                        'lessonTitle' => 'Personal Security',
                        'lessonDescription' => '',
                        'duration' => (2 * 60) + 42,
                        'vimeoUrl' => 'https://vimeo.com/946112135?share=copy',
                        'thumbnail' => public_path('/images/course/your-roadmap-to-money-in-the-2020s/lesson-thumbnails/module5/m5l6.jpeg'),
                        ],
                        [
                        'lessonTitle' => ' Preppers',
                        'lessonDescription' => '',
                        'duration' => (1 * 60) + 33,
                        'vimeoUrl' => 'https://vimeo.com/946115904?share=copy',
                        'thumbnail' => public_path('/images/course/your-roadmap-to-money-in-the-2020s/lesson-thumbnails/module5/m5l7.jpeg'),
                        ],
                        [
                        'lessonTitle' => 'Centralization Disruptors',
                        'lessonDescription' => '',
                        'duration' => (2 * 60) + 57,
                        'vimeoUrl' => 'https://vimeo.com/946120047?share=copy',
                        'thumbnail' => public_path('/images/course/your-roadmap-to-money-in-the-2020s/lesson-thumbnails/module5/m5l8.jpeg'),
                        ],
                        [
                        'lessonTitle' => '  Natural Health',
                        'lessonDescription' => '',
                        'duration' => (2 * 60) + 31,
                        'vimeoUrl' => 'https://vimeo.com/946120047?share=copy',
                        'thumbnail' => public_path('/images/course/your-roadmap-to-money-in-the-2020s/lesson-thumbnails/module5/m5l9.jpeg'),
                        ],
                        [
                        'lessonTitle' => ' High Tech Health',
                        'lessonDescription' => '',
                        'duration' => (3 * 60) + 29,
                        'vimeoUrl' => 'https://vimeo.com/946121585?share=copy',
                        'thumbnail' => public_path('/images/course/your-roadmap-to-money-in-the-2020s/lesson-thumbnails/module5/m5l10.jpeg'),
                        ],
                        [
                        'lessonTitle' => 'Safe Havens',
                        'lessonDescription' => '',
                        'duration' => (1 * 60) + 58,
                        'vimeoUrl' => 'https://vimeo.com/946123031?share=copy',
                        'thumbnail' => public_path('/images/course/your-roadmap-to-money-in-the-2020s/lesson-thumbnails/module5/m5l11.jpeg'),
                        ],
                        [
                        'lessonTitle' => 'Health Havens',
                        'lessonDescription' => '',
                        'duration' => (2 * 60) + 39,
                        'vimeoUrl' => 'https://vimeo.com/946124289?share=copy',
                        'thumbnail' => public_path('/images/course/your-roadmap-to-money-in-the-2020s/lesson-thumbnails/module5/m5l12.jpeg'),
                        ],
                        [
                        'lessonTitle' => 'Health Retreats',
                        'lessonDescription' => '',
                        'duration' => (2 * 60) + 48,
                        'vimeoUrl' => 'https://vimeo.com/946125616?share=copy',
                        'thumbnail' => public_path('/images/course/your-roadmap-to-money-in-the-2020s/lesson-thumbnails/module5/m5l13.jpeg'),
                        ],
                        [
                        'lessonTitle' => 'Health Tourism',
                        'lessonDescription' => '',
                        'duration' => (2 * 60) + 35,
                        'vimeoUrl' => 'https://vimeo.com/946127259?share=copy',
                        'thumbnail' => public_path('/images/course/your-roadmap-to-money-in-the-2020s/lesson-thumbnails/module5/m5l14.jpeg'),
                        ],
                        [
                        'lessonTitle' => ' Machine/Human Interfaces',
                        'lessonDescription' => '',
                        'duration' => (2 * 60) + 20,
                        'vimeoUrl' => 'https://vimeo.com/946128961?share=copy',
                        'thumbnail' => public_path('/images/course/your-roadmap-to-money-in-the-2020s/lesson-thumbnails/module5/m5l15.jpeg'),
                        ],
                        [
                        'lessonTitle' => 'Quantum Resistant Cryptography and Blockchain',
                        'lessonDescription' => '',
                        'duration' => (1 * 60) + 32,
                        'vimeoUrl' => 'https://vimeo.com/946131948?share=copy',
                        'thumbnail' => public_path('/images/course/your-roadmap-to-money-in-the-2020s/lesson-thumbnails/module5/m5l16.jpeg'),
                        ],
                        [
                        'lessonTitle' => 'Content Internationalization',
                        'lessonDescription' => '',
                        'duration' => (3 * 60) + 17,
                        'vimeoUrl' => 'https://vimeo.com/946134752?share=copy',
                        'thumbnail' => public_path('/images/course/your-roadmap-to-money-in-the-2020s/lesson-thumbnails/module5/m5l17.jpeg'),
                        ],
                        [
                        'lessonTitle' => 'Intellectual Property Protection',
                        'lessonDescription' => '',
                        'duration' => (1 * 60) + 00,
                        'vimeoUrl' => 'https://vimeo.com/946136529?share=copy',
                        'thumbnail' => public_path('/images/course/your-roadmap-to-money-in-the-2020s/lesson-thumbnails/module5/m5l18.jpeg'),
                        ],
                        [
                        'lessonTitle' => ' Consciousness Exploration',
                        'lessonDescription' => '',
                        'duration' => (1 * 60) + 35,
                        'vimeoUrl' => 'https://vimeo.com/946138163?share=copy',
                        'thumbnail' => public_path('/images/course/your-roadmap-to-money-in-the-2020s/lesson-thumbnails/module5/m5l19.jpeg'),
                        ],
                        [
                        'lessonTitle' => ' Mental Health',
                        'lessonDescription' => '',
                        'duration' => (2 * 60) + 44,
                        'vimeoUrl' => 'https://vimeo.com/946140949?share=copy',
                        'thumbnail' => public_path('/images/course/your-roadmap-to-money-in-the-2020s/lesson-thumbnails/module5/m5l20.jpeg'),
                        ],
                        [
                        'lessonTitle' => 'Epistemological Education',
                        'lessonDescription' => '',
                        'duration' => (1 * 60) + 49,
                        'vimeoUrl' => 'https://vimeo.com/946142474?share=copy',
                        'thumbnail' => public_path('/images/course/your-roadmap-to-money-in-the-2020s/lesson-thumbnails/module5/m5l21.jpeg'),
                        ],
                    ],
                    ' The Three Essential Hedges' => [
                        [
                        'lessonTitle' => 'The Only Three Assets that Really Matter:  Skills, Knowledge, and Health',
                        'lessonDescription' => '',
                        'duration' => (5 * 60) + 7,
                        'vimeoUrl' => 'https://vimeo.com/946144358?share=copy',
                        'thumbnail' => public_path('/images/course/your-roadmap-to-money-in-the-2020s/lesson-thumbnails/module6/m6l1.jpeg'),
                        ],
                        [
                        'lessonTitle' => 'Big Tech Marketing Independence',
                        'lessonDescription' => '',
                        'duration' => (4 * 60) + 52,
                        'vimeoUrl' => 'https://vimeo.com/946146228?share=copy',
                        'thumbnail' => public_path('/images/course/your-roadmap-to-money-in-the-2020s/lesson-thumbnails/module6/m6l2.jpeg'),
                        ],
                        [
                        'lessonTitle' => 'A Lifeboat Business',
                        'lessonDescription' => '',
                        'duration' => (6 * 60) + 7,
                        'vimeoUrl' => 'https://vimeo.com/946148783?share=copy',
                        'thumbnail' => public_path('/images/course/your-roadmap-to-money-in-the-2020s/lesson-thumbnails/module6/m6l3.jpeg'),
                        ],
                    ],

                ],
                'instructors' => [
                    [
                        'country_iso' => 'US',
                        'firstName' => 'Mark',
                        'lastName' => 'Joyner',
                        'title' => ' Founder and CEO of Simpleology',
                        'about' => ' Founder and CEO of Simpleology',
                        'dp' => public_path('/images/course/your-roadmap-to-money-in-the-2020s/dp.jpeg'),
                    ],
                ],
            ],
        ];

        foreach ($courses as $courseData) {
            $course = Course::updateOrCreate([
                'title' => $courseData['courseTitle'],
            ], [
                'title' => $courseData['courseTitle'],
                'summery' => $courseData['courseSummery'],
                'featured' => $courseData['featured'],
                'published_at' => now(),
            ]);

            if (isset($courseData['resources_link'])){
                $course->update(['resources_link' => $courseData['resources_link']]);
            }

            if (isset($courseData['desktopThumbnail'])) {
                AddSpatieMediaJob::dispatch(
                    $courseData['desktopThumbnail'],
                    $course,
                    'thumbnail',
                    'path'
                );
            }

            if ($courseData['mobileThumbnail']) {
                AddSpatieMediaJob::dispatch(
                    $courseData['mobileThumbnail'],
                    $course,
                    'mobileThumbnail',
                    'path'
                );
            }

            if ($courseData['poster']) {
                AddSpatieMediaJob::dispatch(
                    $courseData['poster'],
                    $course,
                    'poster',
                    'path'
                );
            }

            foreach ($courseData['instructors'] as $instructorData) {
                $instructor = $this->createInstructor($instructorData);

                $course->instructors()->syncWithoutDetaching($instructor->id);
                $course->update(['default_instructor_id' => $instructor->id]);
            }

            foreach ($courseData['modules'] as $moduleName => $lessons) {
                if (empty($moduleName)) {
                    $module = null;
                } else {
                    $module = $course->modules()->updateOrCreate(['name' => $moduleName]);
                    $module->updateSerialNumber();
                }

                foreach ($lessons as $lessonData) {
                    if (! array_key_exists('duration', $lessonData)) {
                        dd($lessonData);
                    }
                    $lesson = $course->lessons()->updateOrCreate([
                        'title' => $lessonData['lessonTitle'],
                    ], [
                        'guest_name' => $lessonData['guest_name'] ?? null,
                        'module_id' => $module?->id,
                        'title' => $lessonData['lessonTitle'],
                        'duration' => $lessonData['duration'],
                        'description' => $lessonData['lessonDescription'],
                        'vimeo_url' => $lessonData['vimeoUrl'],
                        'published_at' => now(),
                        'dripped_at' => $lessonData['dripped_at'] ?? null,
                    ]);

                    $lesson->updateSerialNumber();

                    if (isset($lessonData['thumbnail'])) {
                        AddSpatieMediaJob::dispatch(
                            $lessonData['thumbnail'],
                            $lesson,
                            'thumbnail',
                            'path'
                        );
                    }

                    if (isset($lessonData['desktopBanner'])) {
                        AddSpatieMediaJob::dispatch(
                            $lessonData['desktopBanner'],
                            $lesson,
                            'banner',
                            'path'
                        );
                    }

                    if (isset($lessonData['mobileBanner'])) {
                        AddSpatieMediaJob::dispatch(
                            $lessonData['mobileBanner'],
                            $lesson,
                            'mobileBanner',
                            'path'
                        );
                    }
                }

                $course->updateDuration();
            }
        }

    }

    private function createInstructor(array $instructorData): Instructor
    {
        $instructor = Instructor::updateOrCreate([
            'first_name' => $instructorData['firstName'],
            'last_name' => $instructorData['lastName'],
        ], [
            'country_iso' => $instructorData['country_iso'],
            'first_name' => $instructorData['firstName'],
            'last_name' => $instructorData['lastName'],
            'title' => $instructorData['title'],
            'about' => $instructorData['about'],
        ]);

        if ($instructorData['dp']) {
            AddSpatieMediaJob::dispatch(
                $instructorData['dp'],
                $instructor,
                'dp',
                'path'
            );
        }

        return $instructor;
    }

    // private function createUserForInstructor(array $userData, Instructor $instructor): void
    // {
    //     // $user = User::updateOrCreate([
    //     //     'email' => $userData['email'],
    //     // ], [
    //     //     'id' => $userData['glitch_id'],
    //     //     'country_iso' => $userData['country_iso'],
    //     //     'first_name' => $userData['firstName'],
    //     //     'last_name' => $userData['lastName'],
    //     //     'password' => Hash::make(Str::random()),
    //     // ]);

    //     $userAttributes = [
    //         'email' => $userData['email'],
    //         'country_iso' => $userData['country_iso'] ?? null,
    //         'first_name' => $userData['firstName'],
    //         'last_name' => $userData['lastName'],
    //         'password' => Hash::make(Str::random(16)),
    //     ];

    //     // Only set 'id' if it exists in the userData
    //     if (!empty($userData['glitch_id'])) {
    //         $userAttributes['id'] = $userData['glitch_id'];
    //     }

    //     $user = User::updateOrCreate(
    //         ['email' => $userData['email']],
    //         $userAttributes
    //     );

    //     $instructor->update(['user_id' => $user->id]);

    //     AddSpatieMediaJob::dispatch(
    //         public_path('/images/avatars/33.jpeg'),
    //         $user,
    //         'dp',
    //         'path'
    //     );
    // }
}

