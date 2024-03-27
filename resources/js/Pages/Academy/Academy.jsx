import React, { useEffect, useRef, lazy, Suspense } from "react";
import Layout from "@/Layouts/Layout.jsx";
import Button from "../../Components/Button";
import OwlCarousel from "react-owl-carousel";
import LazyLoad from 'react-lazy-load';
import { motion } from 'framer-motion'

import { ReactComponent as WatchSvg } from "../../../assets/svg/watch.svg";
import { ReactComponent as ArrowRight } from "../../../assets/svg/ArrowRight.svg";
import whiteimg from "../../../assets/white.jpg";

import ccc1 from "../../../assets/img/ccc1.jpg";
import ccc1Blur from "../../../assets/img/ccc1-blur.jpg";
import ccc2 from "../../../assets/img/ccc2.jpg";
import ccc2Blur from "../../../assets/img/ccc2-blur.jpg";
import ccc3 from "../../../assets/img/ccc3.jpg";
import ccc3Blur from "../../../assets/img/ccc3-blur.jpg";

import ccc4 from "../../../assets/img/ccc4.jpg";
import ccc4Blur from "../../../assets/img/ccc4-blur.jpg";
import ccc5 from "../../../assets/img/ccc5.jpg";
import ccc5Blur from "../../../assets/img/ccc5-blur.jpg";
import ccc6 from "../../../assets/img/ccc6.jpg";
import ccc6Blur from "../../../assets/img/ccc6-blur.jpg";

import { ReactComponent as ArrowLeft } from "../../../assets/svg/ArrowLeft.svg";

import { ReactComponent as NextArrow } from "../../../assets/svg/nextArrow.svg";

import BackgroundImageOnLoad from 'background-image-on-load';


import CourseCard from "@/Components/Course/CourseCard.jsx";
import CourseFeaturedCard from "@/Components/Course/CourseFeaturedCard.jsx";
import Badge from "@/Components/Badge.jsx";
import CourseInstructorCard from "@/Components/Course/CourseInstructorCard.jsx";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import AOS from 'aos';
import 'aos/dist/aos.css';

import AcademyLargeCard from "@/Components/Course/AcademyLargeCard";
import AcademySmallCard from "@/Components/Course/AcademySmallCard";
import AcademyText from '../../Components/ACADEMY_LOTTIE_ANIMATION.json';

// import AcademyLargeCard from "@/Components/Course/AcademyLargeCard";
// import AcademySmallCard from "@/Components/Course/AcademySmallCard";
import IconButton from "@/Components/IconButton";
import ToastNotification from "@/Components/ToastNotification";
import { useState } from "react";
import Lottie from "react-lottie-player";
import WELCOME_LOTTIE from "@/Components/welcome.json";
import ArrowMark from "@/Components/ArrowMark";
import SlideArrows from "@/Components/SlideArrows";

const Academy = ({
    featuredCourses, // collection
    generalCourses, // collection
    moneyTalkCourse, // object
     exclusiveCourses, // collection
     exclusiveCourses2, // collection
}) => {

    useEffect(() => {
        AOS.init();
    }, [])

    const isLock = false;

    const { post } = useForm();

    const handleRoute = (id) => {
        post(route('instructors.show', id))
    }
    // console.log("mainCourses");
    // console.log(mainCourses);
    // console.log("featuredCourses");
    // console.log(featuredCourses);
    // console.log("entrepreneurCourse");
    // console.log(entrepreneurCourse);
    // console.log("moneyTalkCourse");
    // console.log(moneyTalkCourse);
    // console.log("upcomingCourses");
    // console.log(upcomingCourses);
    // console.log("generalCourses", generalCourses);
    console.log("exclusiveCourses", exclusiveCourses);


    // const filteredCategories = categoryWiseCourses.filter(category => category?.courses.length > 0);
    // Main academy  slider buttons
    const mainRef = useRef(null);
    // category   slider buttons
    const catRef = useRef(null);

    // featuer slider button
    const featureRef = useRef(null);

    // new lessons slider buttons
    const newLessonRef = useRef(null);

    // Top instructor slider buttons
    const topInstRef = useRef(null);

    // upcoming   slider buttons
    const upComingRef = useRef(null);

    const handleSliderNext = (e) => {
        e.current.next();
    };

    const handleSliderPrev = (e) => {
        e.current.prev();
    };

    //  map function slider buttons
    const mapRefs = useRef([]);

    const handleMapNext = (index) => {
        mapRefs.current[index].next();
    };

    const handleMapPrev = (index) => {
        mapRefs.current[index].prev();
    };

    const [imageLazyLoaded, setImageLazyLoaded] = useState(false);

    // console.log( 'image loaded', imageLoaded)

    // useEffect(() => {
    //     const img = new Image();
    //     img.onload = () => {
    //       setImageLoaded(true);
    //     };
    //     img.src = actualImage;

    //     return () => {
    //       img.onload = null;
    //     };
    //   }, [ ]);



    const [owlOptions, setOwlOptions] = useState({
        options: {
            loop: true,
            margin: 18,
            items: 1,
            autoplay: false,
            autoplayHoverPause: true,
            autoplayTimeout: 10000,
            // animationDuration: 100,
            smartSpeed: 50,
            animateIn: "fadeIn",
            animateOut: "fadeOut",
            nav: false,
            dots: true,
            autoWidth: false,
            responsiveClass: true,

            responsive: {
                0: {
                    dotsEach: 1,
                    items: 1,
                },
                600: {
                    dotsEach: 1,
                },
                1200: {
                    dotsEach: 1,
                }
            }
        }
    })


    const [owlMoneyTalks, setOwlMoneyTalks] = useState({
        options: {
            loop: true,
            margin: 18,
            items: 3,
            autoplay: false,
            nav: false,
            dots: false,
            autoWidth: true,
            responsiveClass: false,
            slideBy: 3,
        }
    })



    const [comingSoon, setcomingSoon] = useState({
        options: {
            loop: true,
            margin: 18,
            items: 3,
            autoplay: false,
            nav: false,
            dots: false,
            autoWidth: false,
            responsiveClass: true,
            slideBy: 3,

            responsive: {
                0: {
                    items: 2,
                    slideBy: 2,
                },
                600: {
                    items: 2,
                },
                1200: {
                    items: 3,
                }
            }
        }
    })



    const imageArray = [
        {
            thumbnail: {

                blur: {
                    url: ccc1Blur,
                },
                original: {
                    url: ccc1,
                }

            }
        },
        {
            thumbnail: {

                blur: {
                    url: ccc2Blur,
                },
                original: {
                    url: ccc2,
                }

            }
        },
        // {
        //     thumbnail: {
        //
        //         blur: {
        //             url: ccc3Blur,
        //         },
        //         original: {
        //             url: ccc3,
        //         }
        //
        //     }
        // },
        // {
        //     thumbnail: {

        //         blur: {
        //             url: ccc4Blur,
        //         },
        //         original: {
        //             url: ccc4,
        //         }

        //     }
        // },
        {
            thumbnail: {

                blur: {
                    url: ccc5Blur,
                },
                original: {
                    url: ccc5,
                }

            }
        },

        // {
        //     thumbnail: {

        //         blur: {
        //             url: ccc6Blur,
        //         },
        //         original: {
        //             url: ccc6,
        //         }

        //     }
        // },

    ];


//     const isHardRefreshed = usePage().props.isHardRefreshed;

//     const [isDocumentReady, setDocumentReady] = useState(false);

//   const isLoaded = localStorage.getItem("academyLoaded", true);


//     const handleLottieComplete = () => {
//         localStorage.setItem("academyLoaded", true);
//         if (document.readyState === 'complete') {
//             setTimeout(() => {
//                 setDocumentReady(true);
//             }, 1000);

//         } else {

//             // If document is not ready yet, listen for the DOMContentLoaded event
//             document.addEventListener('DOMContentLoaded', () => {
//                 setDocumentReady(true);
//             });
//         }
//     };

//     useEffect(() => {
//         // Cleanup event listener on component unmount
//         return () => {
//             document.removeEventListener('DOMContentLoaded', () => {
//                 setDocumentReady(true);
//             });
//         };
//     }, []);



     return (
        <div data-aos="fade-in" data-aos-delay="100" data-aos-easing="ease" data-aos-duration="300" className="">
            <Head title="Academy" />

            {/* {!isLoaded &&
            <>


            {!isHardRefreshed &&  <div className={`academy-preloader ${isDocumentReady && 'hide-loader'}`}>
                <Lottie
                    loop={false}
                    animationData={WELCOME_LOTTIE}
                    onComplete={handleLottieComplete}
                    play
                    height='100px'
                    className='play-page-animation'
                />
            </div>
}
            </>} */}


            <div className="  container mx-auto lg:px-3  px-4">
                {/* Main slider  */}


                {/* new header img  */}
                {featuredCourses?.length > 0 &&
                    <div>

                        <div className="grid grid-cols-12 relative h-full w-full  ">
                            <div className="col-span-12">
                                <OwlCarousel {...owlOptions?.options}
                                    ref={mainRef}
                                    className="owl-theme relative">
                                    {featuredCourses?.map((data, index) => (
                                        <React.Fragment key={index + 3}>


                                            <AcademyLargeCard
                                                className={"academy-large-card feature-card"}
                                                title={data?.title}
                                                instructor={data?.default_instructor?.full_name}
                                                duration={"5 hr 40 min"}
                                                lessons={data?.lessons_count}
                                                desktop_image={data?.thumbnail}
                                                mobile_image={data?.mobile_thumbnail}
                                                badge={"primary"}
                                                badge_text={""}
                                                live={false}
                                                routeToPlay={route('courses.preview', { course: data?.id })}
                                                isLock={isLock ? 'pointer-events-none' : 'pointer-events-auto'}
                                                isLockedIcon={isLock}
                                                videoProgress={0} />


                                        </React.Fragment>
                                    ))}
                                </OwlCarousel>
                            </div>

                            <div className="hidden lg:block">
                                <div className="   absolute mx-auto  academy-arrow px-5 z-[1] ">
                                    <div className="flex items-center justify-center" onClick={() => {
                                        handleSliderPrev(mainRef)
                                    }}>
                                        <SlideArrows />

                                    </div>
                                </div>
                                <div className="    absolute mx-auto right-1  academy-arrow px-5 z-[1] ">
                                    <div className="rotate-180 flex items-center justify-center" onClick={() => {
                                        handleSliderNext(mainRef)
                                    }}>
                                        <SlideArrows />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                }




                {/* ********************New layout ************************** */}
                <div className="container mx-auto   ">

                    {/* ******************New small card end ****************** */}


                    <div>
                        <div className="mt-1 md:mt-[30px]">

                            {/* <h1 className="academy-section-heading "> ACADEMY</h1> */}
                            <Lottie
                                loop
                                animationData={AcademyText}
                                play
                                className='academy-text'
                            // style={{ width: 'auto', height: 'auto' }}
                            />
                        </div>
                        {generalCourses?.length > 0 &&

                            <div className="grid grid-cols-12 gap-y-4 md:gap-y-8 lg:gap-y-12 gap-x-3 md:gap-x-5 lg:gap-x-9 mt-[15px] md:mt-[30px]">
                                {generalCourses?.map((data, index) => (
                                    <React.Fragment key={index + 2}>
                                        <div className=" col-span-6 lg:col-span-6 ">
                                            <LazyLoad height={'auto'} width={'auto'} threshold={0.75} >
                                                <AcademyLargeCard
                                                    className={"academy-small-card no-slide-course-card"}
                                                    title={data?.title}
                                                    instructor={data?.default_instructor?.full_name}
                                                    duration={"5 hr 40 min"}
                                                    lessons={data?.lessons_count}
                                                    desktop_image={data?.thumbnail}
                                                    mobile_image={data?.mobile_thumbnail}
                                                    badge={"primary"}
                                                    badge_text={""}
                                                    live={false}
                                                    routeToPlay={route('courses.preview', {
                                                        course: data?.id,
                                                    })}
                                                    isLock={isLock ? 'pointer-events-none' : 'pointer-events-auto'}
                                                    isLockedIcon={isLock}
                                                    videoProgress={0} />
                                            </LazyLoad>

                                        </div>
                                    </React.Fragment>
                                ))}
                            </div>
                        }
                    </div>

                    {/* course section end  */}


                    {/* ***************** MONEY TALKS SECTION START ***************  */}
                    <div>
                        <h1 className=" text-center mb-[21px] md:mb-[1.59rem]   mt-[30px] md:mt-[60px]"> EXCLUSIVE
                            SERIES</h1>
                    </div>

                        {
                        exclusiveCourses.length > 0 &&
                        <div className="large-second gap-y-[30px] md:gap-y-[36px] flex flex-col  ">
                            {
                                exclusiveCourses.map((course, index) => (
                                    <AcademyLargeCard
                                className={"academy-large-card feature-card"}
                                title={course?.title}
                                instructor={course?.default_instructor?.full_name}
                                duration={"5 hr 40 min"}
                                lessons={course?.lessons_count}
                                desktop_image={course?.thumbnail}
                                mobile_image={course?.mobile_thumbnail}
                                badge={"primary"}
                                badge_text={""}
                                routeToPlay={route('courses.preview', course?.id)}
                                isLock={isLock ? 'pointer-events-none' : 'pointer-events-auto'}
                                isLockedIcon={isLock}
                                live={false} />
                                ))
                            }
                            </div>
                        }

                    {moneyTalkCourse && <div className="large-second mt-[30px] md:mt-[36px]  ">
                        <LazyLoad height={'auto'} width={'auto'} threshold={0.75}  >
                            <AcademyLargeCard
                                className={"academy-large-card feature-card"}
                                title={moneyTalkCourse?.title}
                                instructor={moneyTalkCourse?.default_instructor?.full_name}
                                duration={"5 hr 40 min"}
                                lessons={moneyTalkCourse?.lessons_count}
                                desktop_image={moneyTalkCourse?.thumbnail}
                                mobile_image={moneyTalkCourse?.mobile_thumbnail}
                                badge={"primary"}
                                badge_text={""}
                                routeToPlay={route('courses.preview', moneyTalkCourse?.id)}
                                isLock={isLock ? 'pointer-events-none' : 'pointer-events-auto'}
                                isLockedIcon={isLock}
                                live={false} />
                        </LazyLoad>
                    </div>
                    }

                    {/* *********** MONEY TALKS LESSONS  ********* */}

                    <div className="grid grid-cols-12 mt-[12px] md:mt-[31px]">
                        <div className="col-span-12 relative  ">

                            {/* <div className={`lesson-shadow right  `}></div>
                        <div className={`interests-shadow left`}></div> */}

                            <div className="marquee-shadow left "></div>
                            <div className="marquee-shadow right -top-[1px]"></div>
                            {moneyTalkCourse?.lessons && (
                                <OwlCarousel {...owlMoneyTalks?.options}
                                    ref={newLessonRef}
                                    className="owl-theme relative">
                                    {moneyTalkCourse?.lessons?.map((data, index) => (
                                        <React.Fragment key={index + 3}>
                                            {/* <LazyLoad height={'auto'} width={'auto'} threshold={0.80}  > */}
                                            <AcademyLargeCard
                                                className={"academy-large-card feature-card slide-item "}
                                                title={data?.title}
                                                instructor={data?.default_instructor?.full_name}
                                                duration={"5 hr 40 min"}
                                                lessons={data?.lessons_count}
                                                desktop_image={data?.banner}
                                                mobile_image={data?.banner}
                                                badge={"primary"}
                                                badge_text={""}
                                                live={false}
                                                routeToPlay={route('lessons.play', data?.id)}
                                                isLock={isLock ? 'pointer-events-none' : 'pointer-events-auto'}
                                                isLockedIcon={isLock}
                                                lessonProgress={data?.duration_watched}
                                            />
                                            {/* </LazyLoad> */}
                                        </React.Fragment>
                                    ))}
                                </OwlCarousel>)
                            }
                            <div className="hidden lg:block">
                                <div className="absolute mx-auto  position-center z-[999] px-4">
                                    <div onClick={() => {
                                        handleSliderPrev(newLessonRef)
                                    }}>
                                        <SlideArrows />

                                    </div>
                                </div>
                                <div className="absolute mx-auto right-1 position-center z-[999] px-4">
                                    <div className="rotate-180" onClick={() => {
                                        handleSliderNext(newLessonRef)
                                    }}>
                                        <SlideArrows />
                                    </div>
                                </div>
                            </div>






                        </div>
                    </div>


                    {/* ***************** MONEY TALKS SECTION END ***************  */}



                    {/* ****************Exclusive v2* ***************** */}

                    {
                        exclusiveCourses2.length > 0 &&
                        <div className="large-second mt-[20px] gap-y-[30px] md:gap-y-[36px] flex flex-col  ">
                            {
                                exclusiveCourses2.map((course, index) => (
                                    <AcademyLargeCard
                                        className={"academy-large-card feature-card"}
                                        title={course?.title}
                                        instructor={course?.default_instructor?.full_name}
                                        duration={"5 hr 40 min"}
                                        lessons={course?.lessons_count}
                                        desktop_image={course?.thumbnail}
                                        mobile_image={course?.mobile_thumbnail}
                                        badge={"primary"}
                                        badge_text={""}
                                        routeToPlay={route('courses.preview', course?.id)}
                                        isLock={isLock ? 'pointer-events-none' : 'pointer-events-auto'}
                                        isLockedIcon={isLock}
                                        live={false} />
                                ))
                            }
                        </div>
                    }

                    {/* ****************Exclusive v2* ***************** */}


                    {/* *************COMING SOON START************** */}
                    {/* <div className="h-[1px] w-full bg-[#1B1B1B] mt-[49px] lg-d-none"></div> */}
                    <div className="  md:mt-[60px] my-[30px] md:mb-[30px]">
                        <h1 className="fs-65px text-center"> COMING SOON</h1>
                    </div>


                    <div className="grid grid-cols-12 coming-soon-mb ">
                        <div className="col-span-12 relative ">

                            {imageArray && (
                                <OwlCarousel {...comingSoon?.options}
                                    ref={upComingRef}
                                    className="owl-theme relative">
                                    {imageArray?.map((data, index) => (
                                        <React.Fragment key={index + 3}>
                                            <AcademyLargeCard
                                                className={"academy-large-card coming-soon "}
                                                title={'data?.title'}
                                                instructor={'data?.default_instructor?.full_name'}
                                                duration={"5 hr 40 min"}
                                                lessons={'data?.lessons_count'}
                                                desktop_image={data?.thumbnail}
                                                mobile_image={data?.thumbnail}
                                                badge={"primary"}
                                                badge_text={""}
                                                live={false}
                                                // routeToPlay={route('courses.play', { course: featuredCourses?.id, byPass: 'false' })}
                                                isLock={isLock ? 'pointer-events-none' : 'pointer-events-auto'}
                                                isLockedIcon={isLock}
                                                videoProgress={0} />
                                        </React.Fragment>
                                    ))}
                                </OwlCarousel>)
                            }
                            <div className="hidden lg:block">
                                <div className="absolute mx-auto  position-center z-[999] px-5">
                                    <div onClick={() => {
                                        handleSliderPrev(upComingRef)
                                    }}>
                                        <SlideArrows />

                                    </div>
                                </div>
                                <div className="absolute mx-auto right-1  position-center z-[999] px-5">
                                    <div className="rotate-180" onClick={() => {
                                        handleSliderNext(upComingRef)
                                    }}>
                                        <SlideArrows />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ************COMING SOON END ****************  */}
                </div>


                {/* Top instructor  slider */}

                {/* <section className="mt-[4rem] group">
                    <div className="container mx-auto px-5 xl:px-0">
                        <div className=" flex justify-center lg:justify-between   mb-8">
                            <div onClick={() => {
                                handleSliderPrev(topInstRef)
                            }} className="cursor-pointer hidden w-[10%] lg:block lg:invisible group-hover:lg:visible">
                                <IconButton
                                    className={"secondary  "}
                                    icon={<ArrowLeft />}
                                ></IconButton>
                            </div>

                            <div className="text-center  ">
                                <h1 className=" text-50 text-center">MEET THE EXPERTS</h1>
                            </div>

                            <div onClick={() => {
                                handleSliderNext(topInstRef)
                            }} className=" cursor-pointer w-[10%] hidden lg:block lg:invisible group-hover:lg:visible">
                                <IconButton
                                    className={"secondary header_arrow"}
                                    icon={<ArrowRight />}
                                ></IconButton>
                            </div>
                        </div>
                    </div>
                    <div className="px-5 xl:px-0">
                        <div className="grid grid-cols-12">
                            <div className="col-span-12">
                                <OwlCarousel
                                    // center={true}
                                    ref={topInstRef}
                                    className="owl-theme relative "
                                    loop
                                    margin={24}
                                    items={6}
                                    autoplay={true}
                                    autoplayHoverPause={true}
                                    autoplayTimeout={7000}
                                    animateIn={"fadeIn"}
                                    animateOut={"fadeOut"}
                                    nav={false}
                                    dots={false}
                                    autoWidth={true}
                                >
                                    {topInstructors?.map((data, index) => (
                                        <div key={index + 1}>
                                            <CourseInstructorCard
                                                className={"item"}
                                                title={data?.full_name}
                                                category={data?.category?.name}
                                                courses={data?.courses_count}
                                                image={data?.dp?.medium?.url}
                                                user_id={data?.id}
                                            />
                                        </div>
                                    ))}

                                </OwlCarousel>
                            </div>
                        </div>
                    </div>
                </section> */}


            </div>
        </div>
    );
};


function formatDuration(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);

    return `${hours}:${minutes.toString().padStart(2, '0')}`;
}


Academy.layout = (page) => <Layout children={page} />;
export default Academy;
