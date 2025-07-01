import React, { useCallback, useEffect, useState, useRef } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Layout from "@/Layouts/Layout.jsx";
import Button from "../../Components/Button";
// import OwlCarousel from "react-owl-carousel";
// import AnimateHeightComponent from  "@/Components/AnimateHeightComponent";
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

import ecommerce from "../../../assets/category/ecommerce.svg";
import lifestyle from "../../../assets/category/lifestyle.svg";
import agencey from "../../../assets/category/agencey.svg";

import crypto from "../../../assets/category/crypto.svg";
import health from "../../../assets/category/health.svg";
import marketing from "../../../assets/category/marketing.svg";
import stock from "../../../assets/category/stocks.svg";


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
import AnimateHeight from 'react-animate-height';
import AcademyLargeCard from "@/Components/Course/AcademyLargeCard";
import AcademySmallCard from "@/Components/Course/AcademySmallCard";
import AcademyText from '../../Components/ACADEMY_LOTTIE_ANIMATION.json';

// import AcademyLargeCard from "@/Components/Course/AcademyLargeCard";
// import AcademySmallCard from "@/Components/Course/AcademySmallCard";
import IconButton from "@/Components/IconButton";
import ToastNotification from "@/Components/ToastNotification";
import Lottie from "react-lottie-player";
import WELCOME_LOTTIE from "@/Components/welcome.json";
import ArrowMark from "@/Components/ArrowMark";
import SlideArrows from "@/Components/SlideArrows";
import { GTMLogs } from "@/utils/GTMLogs";
import AcademySmallSliderCard from "@/Components/Course/AcademySmallSliderCard";
import GraySlideArrow from "@/Components/GraySlideArrow";
import GraySlideArrowRight from "@/Components/GraySlideArrowRight";
import AcademyMainSlider from './AcademyMainSlider';
import AcademyComingSoon from '@/Components/Course/AcademyComingSoon';

const Academy = ({
    featuredCourses, // collection
    generalCourses, // collection
    moneyTalkCourse, // object
    exclusiveCourses, // collection
    exclusiveCourses2, // collection
    continueWatch,
    comingSoonCourses
}) => {



    useEffect(() => {
        AOS.init();
    }, [])

    const isLock = false;

    const { post } = useForm();

    const handleRoute = (id) => {
        post(route('instructors.show', id))
    }
    // console.log("continueWatch");
    // console.log(continueWatch);
    // console.log("featuredCourses");
    // console.log(featuredCourses);
    // console.log("entrepreneurCourse");
    // console.log(entrepreneurCourse);
    // console.log("moneyTalkCourse");
    // console.log(moneyTalkCourse);
    // console.log("upcomingCourses");
    // console.log(upcomingCourses);
    // console.log("generalCourses", generalCourses);
    // console.log("exclusiveCourses", exclusiveCourses);


    // const filteredCategories = categoryWiseCourses.filter(category => category?.courses.length > 0);
    // Main academy  slider buttons
    const mainRef = useRef(null);
    // category   slider buttons
    const moneyTalkCourseRef = useRef(null);

    // featuer slider button
    const generalCoursRef = useRef(null);

    // new lessons slider buttons
    const newLessonRef = useRef(null);

    // Top instructor slider buttons
    const exclusiveCoursRef = useRef(null);

    // upcoming   slider buttons
    const upComingRef = useRef(null);

    const handleSliderNext = (e) => {
        e.current.next();
    };

    const handleSliderPrev = (e) => {
        e.current.prev();
    };


    const goToNext = (carouselRef) => {

        carouselRef.current.next();

    };

    const goToPrev = (carouselRef) => {

        carouselRef.current.prev();

    };

    //  map function slider buttons
    const mapRefs = useRef([]);

    const handleMapNext = (index) => {
        mapRefs.current[index].next();
    };

    const handleMapPrev = (index) => {
        mapRefs.current[index].prev();
    };



    // const [owlOptions, setOwlOptions] = useState({
    //     options: {
    //         loop: true,
    //         margin: 18,
    //         items: 1,
    //         autoplay: true,
    //         autoplayHoverPause: true,
    //         autoplayTimeout: 5000,
    //         lazy: true,
    //         lazyContent: true,
    //         lazyLoadEager: 1,
    //         // animationDuration: 100,
    //         smartSpeed: 30,
    //         animateIn: "fadeIn",
    //         animateOut: "fadeOut",
    //         nav: false,
    //         dots: true,
    //         autoWidth: false,
    //         responsiveClass: true,

    //         responsive: {
    //             0: {
    //                 dotsEach: 1,
    //                 items: 1,
    //             },
    //             600: {
    //                 dotsEach: 1,
    //                 items: 1,
    //             },
    //             1200: {
    //                 dotsEach: 1,
    //                 items: 1,
    //             }
    //         }
    //     }
    // })


    // const [owlMoneyTalks, setOwlMoneyTalks] = useState({
    //     options: {
    //         loop: true,
    //         margin: 9,
    //         items: 4,
    //         autoplay: false,
    //         nav: false,
    //         dots: false,
    //         autoWidth: false,
    //         // responsiveClass: true,
    //         slideBy: 1,

    //         responsive: {
    //             0: {
    //                 items: 2,
    //             },
    //             600: {
    //                 dotsEach: 1,
    //                 items: 3,
    //             },
    //             1200: {
    //                 dotsEach: 3,

    //             }
    //         }
    //     }
    // })

    // const [owlGenCourse, setOwlGenCourse] = useState({
    //     options: {
    //         loop: true,
    //         margin: 9,
    //         items: 4,
    //         autoplay: false,
    //         nav: false,
    //         dots: false,
    //         autoWidth: false,
    //         slideBy: 1,

    //         responsive: {
    //             0: {
    //                 items: 2,
    //             },
    //             600: {
    //                 dotsEach: 1,
    //                 items: 3,
    //             },
    //             1200: {
    //                 dotsEach: 3,
    //             }
    //         }
    //     }
    // })
    // const [owlExclusive, setOwlExclusive] = useState({
    //     options: {
    //         loop: true,
    //         margin: 9,
    //         items: 4,
    //         autoplay: false,
    //         nav: false,
    //         dots: false,
    //         autoWidth: false,
    //         lazy: true,
    //         lazyContent: true,
    //         lazyLoadEager: 1,
    //         // animationDuration: 100,
    //         smartSpeed: 30,
    //         // responsiveClass: true,
    //         slideBy: 1,

    //         responsive: {
    //             0: {
    //                 items: 2,
    //             },
    //             600: {
    //                 dotsEach: 1,
    //                 items: 3,
    //             },
    //             1200: {
    //                 dotsEach: 3,

    //             }
    //         }
    //     }
    // })
    // const [owlContinueWatching, setOwlContinueWatching] = useState({
    //     options: {
    //         loop: false,
    //         margin: 9,
    //         items: 4,
    //         autoplay: false,
    //         nav: false,
    //         dots: false,
    //         autoWidth: false,
    //         // responsiveClass: true,
    //         slideBy: 1,

    //         responsive: {
    //             0: {
    //                 items: 2,
    //             },
    //             600: {
    //                 dotsEach: 1,
    //                 items: 3,
    //             },
    //             1200: {
    //                 dotsEach: 3,

    //             }
    //         }
    //     }
    // })
    // const [comingSoon, setcomingSoon] = useState({
    //     options: {
    //         loop: comingSoonCourses.length > 1,
    //         margin: 18,
    //         items: 3,
    //         autoplay: false,
    //         nav: false,
    //         dots: false,
    //         autoWidth: false,
    //         responsiveClass: true,
    //         slideBy: 1,

    //         responsive: {
    //             0: {
    //                 items: 2.3,
    //                 slideBy: 1,
    //             },
    //             600: {
    //                 items: 2,
    //             },
    //             1200: {
    //                 items: 3.45,
    //             }
    //         }
    //     }
    // })



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

    useEffect(() => {
        GTMLogs({
            'event': 'GTMevent',
            'event_name': 'academy',
            'event_id': '10005',
        })
    }, [])


    const imagesData = [
        { id: 1, imageURL: ecommerce },
        { id: 2, imageURL: lifestyle },
        { id: 3, imageURL: agencey },
        { id: 4, imageURL: crypto },
        { id: 5, imageURL: health },
        { id: 6, imageURL: marketing },
        { id: 3, imageURL: marketing },
        { id: 2, imageURL: stock },


    ];

    const slideDuration = 40;

    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: 'start',
        duration: slideDuration,
        slidesToScroll: 1,
        // containScroll: 'trim',
        // dragFree: true,
    });

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);


    // const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
    // const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

    const [generalRef, genralApi] = useEmblaCarousel({
        loop: true,
        align: 'start',
        duration: slideDuration,
        slidesToScroll: 1,
        // containScroll: 'trim',
        // dragFree: true,
    });
    const genScrollPrev = useCallback(() => genralApi && genralApi.scrollPrev(), [genralApi]);
    const genScrollNext = useCallback(() => genralApi && genralApi.scrollNext(), [genralApi]);





    // moneytalk slider 

    const [MTRef, MTApi] = useEmblaCarousel({
        loop: true,
        align: 'start',
        duration: slideDuration,
        slidesToScroll: 1,
        // containScroll: 'trim',
        // dragFree: true,
    });
    const MTPrev = useCallback(() => MTApi && MTApi.scrollPrev(), [MTApi]);
    const MTNext = useCallback(() => MTApi && MTApi.scrollNext(), [MTApi]);




    // continue slider 

    const [CWRef, CWApi] = useEmblaCarousel({
        loop: false,
        align: 'start',
        slidesToScroll: 1,
        duration: slideDuration,
        // containScroll: 'trim',
        // dragFree: true,
    });
    const CWPrev = useCallback(() => CWApi && CWApi.scrollPrev(), [CWApi]);
    const CWNext = useCallback(() => CWApi && CWApi.scrollNext(), [CWApi]);

    // coming soon
    const [CSRef, CSApi] = useEmblaCarousel({
        loop: true,
        slidesToScroll: 1,
        align: 'start',
        duration: slideDuration,
        // containScroll: 'trim',
        // dragFree: true,
    });
    const CSPrev = useCallback(() => CSApi && CSApi.scrollPrev(), [CSApi]);
    const CSNext = useCallback(() => CSApi && CSApi.scrollNext(), [CSApi]);

    return (
        <div data-aos="fade-in" data-aos-delay="100" data-aos-easing="ease" data-aos-duration="300" className="">
            <Head title="Academy" />
            <div className="   lg:px-3  px-4">
                {/* Main slider  */}
                {featuredCourses?.length > 0 &&
                    <div className="max-w-[1517px]  mx-auto">
                        <AcademyMainSlider data={featuredCourses} />

                    </div>
                }

                <div className="container mx-auto">
                    {/* *********** Courses sliders new   ********* */}
                    <div className="relative">
                        <p className="academy-heading"> COURSES</p>
                        <div className="hidden lg:block">
                            <div className="absolute mx-auto right-[30px] top-0 cursor-pointer">
                                <div onClick={genScrollPrev}>
                                    <GraySlideArrow />

                                </div>
                            </div>
                            <div className="absolute mx-auto right-0 top-0 cursor-pointer">
                                <div onClick={genScrollNext}>
                                    <GraySlideArrowRight />

                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="embla">
                        <div className="marquee-shadow left "></div>
                        <div className="marquee-shadow right -top-[1px]"></div>
                        <div className="embla__viewport" ref={generalRef}>
                            <div className="embla__container">
                                {generalCourses.map((data, index) => (
                                    <div className="embla__slide" key={index}>
                                        <AcademySmallSliderCard
                                            IsMoneyTalk={false}
                                            imgHeight={'  rounded-[10px]'}
                                            title={data?.title}
                                            summery={data?.summery}
                                            desktop_image={data?.thumbnail}
                                            mobile_image={data?.mobile_thumbnail}
                                            isNew={data?.is_new}
                                            routeToPlay={route('courses.preview', {
                                                course: data?.id,
                                            })}
                                            lessonProgress={data?.duration_watched}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>




                    {/* <div className=" first-letter: mt-[12px] md:mt-[31px]">
                        <div className="  relative  ">

                            <div className="marquee-shadow left "></div>
                            <div className="marquee-shadow right -top-[1px]"></div>
                            {generalCourses?.length > 0 && (
                                <OwlCarousel {...owlGenCourse?.options}
                                    ref={generalCoursRef}
                                    className="owl-theme relative">
                                    {generalCourses?.map((data, index) => (
                                        <React.Fragment key={data?.id}>
                                            <AcademySmallSliderCard
                                                IsMoneyTalk={false}
                                                imgHeight={'  rounded-[10px]'}
                                                title={data?.title}
                                                summery={data?.summery}
                                                desktop_image={data?.thumbnail}
                                                mobile_image={data?.mobile_thumbnail}
                                                isNew={data?.is_new}
                                                routeToPlay={route('courses.preview', {
                                                    course: data?.id,
                                                })}
                                                lessonProgress={data?.duration_watched}
                                            />

                                        </React.Fragment>
                                    ))}
                                </OwlCarousel>)
                            }
                        </div>
                    </div> */}

                    {/* EXCLUSIVE SERIES  slider*/}

                    {/* {exclusiveCourses?.length > 0 && <>
                        <div className="relative">
                            <p className="academy-heading">EXCLUSIVE SERIES</p>
                            <div className="hidden lg:block">
                                <div className="absolute mx-auto right-[30px] top-0 cursor-pointer">
                                    <div onClick={() => {
                                        goToPrev(exclusiveCoursRef)
                                    }}>
                                        <GraySlideArrow />

                                    </div>
                                </div>
                                <div className="absolute mx-auto right-0 top-0 cursor-pointer">
                                    <div onClick={() => {
                                        goToNext(exclusiveCoursRef)
                                    }}>
                                        <GraySlideArrowRight />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className=" first-letter: mt-[12px] md:mt-[31px]">
                            <div className="  relative  ">

                                <div className="marquee-shadow left "></div>
                                <div className="marquee-shadow right -top-[1px]"></div>
                                {exclusiveCourses?.length > 0 && (
                                    <OwlCarousel {...owlExclusive?.options}
                                        ref={exclusiveCoursRef}
                                        className="owl-theme relative">
                                        {exclusiveCourses?.map((data, index) => (
                                            <React.Fragment key={data?.id}>
                                                <AcademySmallSliderCard
                                                    IsMoneyTalk={false}
                                                    imgHeight={'  rounded-[10px]'}
                                                    title={data?.title}
                                                    summery={data?.summery}
                                                    desktop_image={data?.thumbnail}
                                                    mobile_image={data?.mobile_thumbnail}
                                                    isNew={data?.is_new}
                                                    routeToPlay={route('courses.preview', {
                                                        course: data?.id,
                                                    })}
                                                    lessonProgress={data?.duration_watched}
                                                />
                                            </React.Fragment>
                                        ))}
                                    </OwlCarousel>)
                                }

                            </div>
                        </div>
                    </>
                    } */}


                    {/* Embla slider new  */}
                    {exclusiveCourses?.length > 0 && <>

                        <div className="relative">
                            <p className="academy-heading">EXCLUSIVE SERIES</p>
                            <div className="hidden lg:block">
                                <div className="absolute mx-auto right-[30px] top-0 cursor-pointer">
                                    <div onClick={scrollPrev}>
                                        <GraySlideArrow />

                                    </div>
                                </div>
                                <div className="absolute mx-auto right-0 top-0 cursor-pointer">
                                    <div onClick={scrollNext}>
                                        <GraySlideArrowRight />
                                    </div>
                                </div>
                            </div>
                        </div>




                        <div className="embla">
                            <div className="marquee-shadow left "></div>
                            <div className="marquee-shadow right -top-[1px]"></div>
                            <div className="embla__viewport" ref={emblaRef}>
                                <div className="embla__container">
                                    {exclusiveCourses.map((data, index) => (
                                        <div className="embla__slide" key={index}>
                                            <AcademySmallSliderCard
                                                IsMoneyTalk={false}
                                                imgHeight={'  rounded-[10px]'}
                                                title={data?.title}
                                                summery={data?.summery}
                                                desktop_image={data?.thumbnail}
                                                mobile_image={data?.mobile_thumbnail}
                                                isNew={data?.is_new}
                                                routeToPlay={route('courses.preview', {
                                                    course: data?.id,
                                                })}
                                                lessonProgress={data?.duration_watched}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>



                    </>
                    }

                </div>

                {/* ***************** MONEY TALKS SECTION START ***************  */}

                <div className="container mx-auto">

                    <div>
                        <p className="academy-heading">
                            RECOMMENDED FOR YOU</p>
                    </div>

                    {moneyTalkCourse && <div className="large-second mt-[30px] md:mt-[36px]  ">
                        <AcademyLargeCard
                            isMoneyTalkBanner={true}
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
                    </div>
                    }
                </div>


                {/* ***********MORE  MONEY TALKS LESSONS  ********* */}
                <div className="container mx-auto relative md:mt-[27px] md:mb-[30px] mt-[20px] mb-[15px] ">
                    <p className="text-[24px] md:text-[35px] font-bold leading-[24px] md:leading-[35px] text-center">MORE MONEY TALKS</p>
                    <div className="hidden lg:block">
                        <div className="absolute mx-auto right-[30px] top-0 cursor-pointer">
                            <div onClick={MTPrev}>
                                <GraySlideArrow />

                            </div>
                        </div>
                        <div className="absolute mx-auto right-0 top-0 cursor-pointer">
                            <div onClick={MTNext}>
                                <GraySlideArrowRight />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-[12px] md:mt-[31px]">
                    <div className="container mx-auto relative  ">


                        <div className="embla">
                            <div className="marquee-shadow left "></div>
                            <div className="marquee-shadow right -top-[1px]"></div>
                            <div className="embla__viewport" ref={MTRef}>
                                <div className="embla__container">
                                    {moneyTalkCourse?.lessons.map((data, index) => (
                                        <div className="embla__slide" key={index}>
                                            <AcademySmallSliderCard
                                                IsMoneyTalk={true}
                                                imgHeight={' h-[130px] md:h-[150px] lg:h-[180px] rounded-[10px]'}
                                                title={data?.title}
                                                desktop_image={data?.thumbnail}
                                                mobile_image={data?.mobile_thumbnail}
                                                isNew={data?.is_new}
                                                routeToPlay={route('lessons.play', data?.id)}
                                                lessonProgress={data?.duration_watched}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>


                    </div>
                </div>

                {/* CONTINUE WATCHING LESSONS  */}
                {continueWatch?.length > 0 && <>

                    <div className=" container  mx-auto relative ">
                        <p className="mt-[30px] lg:mt-[87px] mb-[30px] lg:mb-[43px] text-[24px] md:text-[35px] font-bold leading-[24px] md:leading-[35px] text-center">CONTINUE WATCHING</p>
                        <div className="hidden lg:block">
                            <div className="absolute mx-auto right-[30px] top-0 cursor-pointer ">
                                <div onClick={CWPrev}>
                                    <GraySlideArrow />

                                </div>
                            </div>
                            <div className="absolute mx-auto right-0 top-0 cursor-pointer">
                                <div onClick={CWNext}>
                                    <GraySlideArrowRight />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="container mx-auto mt-[12px] md:mt-[31px]">
                        <div className="container ml-auto relative  ">



                            <div className="embla">
                                <div className="marquee-shadow left "></div>
                                <div className="marquee-shadow right -top-[1px]"></div>
                                <div className="embla__viewport" ref={CWRef}>
                                    <div className="embla__container">
                                        {continueWatch.map((data, index) => (
                                            <div className="embla__slide" key={index}>
                                                <AcademySmallSliderCard
                                                    IsMoneyTalk={true}
                                                    isContinueWatching={true}
                                                    imgHeight={'h-[130px] md:h-[150px] lg:h-[180px] w-auto rounded-[10px]'}
                                                    title={data?.title}
                                                    desktop_image={data?.thumbnail}
                                                    mobile_image={data?.mobile_thumbnail}
                                                    routeToPlay={route('lessons.play', data?.id)}
                                                    lessonProgress={data?.duration_watched}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>



                            {/* {continueWatch && (
                                <OwlCarousel {...owlContinueWatching?.options}
                                    ref={newLessonRef}
                                    className="owl-theme relative">
                                    {continueWatch?.map((data, index) => (
                                        <React.Fragment key={data?.id}>
                                            <AcademySmallSliderCard
                                                IsMoneyTalk={true}
                                                isContinueWatching={true}
                                                imgHeight={'h-[130px] md:h-[150px] lg:h-[180px] w-auto rounded-[10px]'}
                                                title={data?.title}
                                                desktop_image={data?.thumbnail}
                                                mobile_image={data?.mobile_thumbnail}
                                                routeToPlay={route('lessons.play', data?.id)}
                                                lessonProgress={data?.duration_watched}
                                            />
                                        </React.Fragment>
                                    ))}
                                </OwlCarousel>)
                            } */}
                        </div>
                    </div>
                </>}
                {/* CATEGORIES START----  */}

                {comingSoonCourses?.length > 0 &&
                    <div className="container mx-auto">
                        {/* *************COMING SOON START************** */}
                        <div className="relative">
                            <p className="academy-heading">
                                COMING SOON</p>
                            <div className="hidden lg:block">
                                <div className="absolute mx-auto right-8 top-0 cursor-pointer">
                                    <div onClick={CSPrev}>
                                        <GraySlideArrow />

                                    </div>
                                </div>
                                <div className="absolute mx-auto right-0 top-0 cursor-pointer">
                                    <div onClick={CSNext}>
                                        <GraySlideArrowRight />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-12 coming-soon-mb ">
                            <div className="col-span-12 relative ">



                                <div className="embla">
                                    <div className="marquee-shadow left "></div>
                                    <div className="marquee-shadow right -top-[1px]"></div>
                                    <div className="embla__viewport" ref={CSRef}>
                                        <div className="embla__container">
                                            {comingSoonCourses.map((data, index) => (
                                                <div className="embla__slide" key={index}>

                                                    <AcademyComingSoon data={data} />

                                                    {/* <AcademyLargeCard
                                                        className={"academy-large-card coming-soon "}
                                                        title={'data?.title'}
                                                        instructor={'data?.default_instructor?.full_name'}
                                                        duration={"5 hr 40 min"}
                                                        lessons={'data?.lessons_count'}
                                                        desktop_image={data?.mobile_thumbnail}
                                                        mobile_image={data?.mobile_thumbnail}
                                                        badge={"primary"}
                                                        badge_text={""}
                                                        live={false}
                                                        // routeToPlay={route('courses.play', { course: featuredCourses?.id, byPass: 'false' })}
                                                        isLock={isLock ? 'pointer-events-none' : 'pointer-events-auto'}
                                                        isLockedIcon={isLock}
                                                        videoProgress={0} /> */}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>



                                {/* {comingSoonCourses && (
                                    <OwlCarousel {...comingSoon?.options}
                                        ref={upComingRef}
                                        className="owl-theme relative">
                                        {comingSoonCourses?.map((data, index) => (
                                            <React.Fragment key={data?.id}>
                                                <AcademyLargeCard
                                                    className={"academy-large-card coming-soon "}
                                                    title={'data?.title'}
                                                    instructor={'data?.default_instructor?.full_name'}
                                                    duration={"5 hr 40 min"}
                                                    lessons={'data?.lessons_count'}
                                                    desktop_image={data?.mobile_thumbnail}
                                                    mobile_image={data?.mobile_thumbnail}
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
                                } */}

                            </div>
                        </div>

                        {/* ************COMING SOON END ****************  */}
                    </div>
                }
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



{/* <div className="container mx-auto">
                    <div className="grid grid-cols-1">
                        <p className="text-[24px] md:text-[35px] font-bold leading-[24px] md:leading-[35px] text-center mt-[30px] lg:mt-[80px] mb-[30px] lg:mb-[43px]">CATEGORIES</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 lg:gap-[30px]">
                        {imagesData.map((image) => (

                            <div key="{image.id}" className="bg-[#1A1A1A] rounded-[10px] lg:rounded-[18px] h-[80px] lg:h-[138px] w-full flex items-center justify-center p-4">
                                <img src={image.imageURL} alt="" className="h-5 lg:h-8" />
                            </div>
                        ))}
                    </div>
                </div> */}
{/* CATEGORIES END ---  */ }
