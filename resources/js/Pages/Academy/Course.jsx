import React, { useRef, useEffect, useState } from "react";
import { Head, useForm } from '@inertiajs/react'
import Layout from "@/Layouts/Layout";
import cross from "../../../assets/svg/cross.svg";
import topRank from "../../../assets/svg/No-Top-Members.svg";
import faqplus from "../../../assets/svg/faqplus.svg";
import Lock from "../../../assets/svg/Lock.svg";
import checkCircle from "../../../assets/svg/CheckCircle2.svg";
import OwlCarousel from "react-owl-carousel";
import { motion } from 'framer-motion'
import AOS from 'aos';
import 'aos/dist/aos.css';
import flagIcons from 'flag-icons';
import Button from "../../Components/Button";
import { ReactComponent as WatchSvg } from "../../../assets/svg/watch.svg";
import { ReactComponent as ArrowRight } from "../../../assets/svg/ArrowRight.svg";
import { ReactComponent as ArrowLeft } from "../../../assets/svg/ArrowLeft.svg";
import { ReactComponent as BookMark } from "../../../assets/svg/bookmark1.svg";
import { ReactComponent as NextArrow } from "../../../assets/svg/nextArrow.svg";

// art and design
import CourseCard from "@/Components/Course/CourseCard";
import { Link } from "@inertiajs/react";
import TabButton from "@/Components/TabButton";
import IconButton from "@/Components/IconButton";
import AcademySmallCard from "@/Components/Course/AcademySmallCard";
import AcademyLargeCard from "@/Components/Course/AcademyLargeCard";
import CoursePreviewHeader from "@/Components/Course/CoursePreviewHeader";
import ReactCountryFlag from "react-country-flag";
import ArrowMark from "@/Components/ArrowMark";
import SlideArrows from "@/Components/SlideArrows";
import Xmark from "@/Components/Xmark";

import { PostsContext } from '../../Store/PostsProvider';
import { useContext } from "react";

const Course = ({ course, hasEnrolledInCourse, courseModulesCount, instructorAvatar }) => {

    const {setIsPlayPage } = useContext(PostsContext);

    // console.log('course')
    // console.log(course)

    // console.log('instructorAvatar')
    // console.log(instructorAvatar)

    // useEffect(() => {
    //     window.scrollTo(0, 0);  
    //   }, []);

    const countryCode = course?.default_instructor?.country_iso ? course?.default_instructor?.country_iso : 'us';



    const { post, processing } = useForm();



    const handleBookmarkToggle = () => {
        let timeOut = setTimeout(() => {
            if (!processing) {

                post(route('bookmark-toggle.courses', course?.id), {
                    preserveScroll: true
                });
                clearTimeout(timeOut)
            }
        }, 2000)
    }




    const [nowPlaying, setNowPlaying] = useState(course?.trailer?.vimeo_url || course?.trailer?.vimeo_url)

    useEffect(() => {
        const videoWithPreview = course?.lessons?.find(lesson => lesson?.has_preview);
        // console.log('video with preview : ', videoWithPreview)
        if (videoWithPreview) {
            setNowPlaying(videoWithPreview.vimeo_preview_url);
        }
    }, []);


    const [activeIndex, setActiveIndex] = useState(null);

    const handleAccordionClick = (index) => {
        setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
    };


    const [isTopShadowVisible, setIsTopShadowVisible] = useState(false);
    const [isBottomShadowVisible, setIsBottomShadowVisible] = useState(false);

    const handleScroll = (event) => {
        const { scrollTop, scrollHeight, clientHeight } = event.target;
        // console.log("scroll top is ...:", clientHeight);

        setIsTopShadowVisible(scrollTop);
        setIsBottomShadowVisible(scrollTop + clientHeight < scrollHeight);
    };

    // upcoming   slider buttons
    const topRankRef = useRef(null);
    const likedRef = useRef(null);

    const handleSliderNext = (ref) => {
        // console.log('next ....:', ref)
        ref.current.next();
    };

    const handleSliderPrev = (ref) => {
        ref.current.prev();
    };

    useEffect(() => {
        AOS.init();
    }, [])
    const [imageLoaded, setImageLoaded] = useState(false);

    const [showDetail, setShowDetail] = useState(false);

    const [imageThumbnailLoaded, setImageThumbnailLoaded] = useState(false)


    const newLessonRef = useRef(null);
    const [owlCourseLessons, setOwlCourseLessons] = useState({
        options: {
            loop: true,
            margin: 18,
            items: 3,
            autoplay: false,
            nav: false,
            dots: false,
            autoWidth: true,
            slideBy: 3,
        }
    })



    // useEffect(() => {
    //     const owlInstance = newLessonRef.current;

    //     const handleScrollSlider = (event) => {
    //       if (owlInstance && event.deltaY !== 0) {
    //         event.preventDefault();
    //         if (event.deltaY > 0) {
    //           owlInstance.next();
    //         } else {
    //           owlInstance.prev();
    //         }
    //       }
    //     };

    //     owlInstance.on('wheel', handleScrollSlider);

    //     return () => {
    //       // Remove the scroll event listener when the component unmounts
    //       owlInstance.on('wheel', handleScrollSlider);
    //     };
    //   }, []);






    // useEffect(() => {
    //     const sliderElement = sliderContainer.current;
    //     const handleScroll = (event) => {
    //         if (sliderElement.contains(event.target)) {
    //             event.preventDefault();
    //             moveSlide(event);
    //         }
    //     };
    //     document.addEventListener('wheel', handleScroll, { passive: false });
    //     return () => {
    //         document.removeEventListener('wheel', handleScroll);
    //     };
    // }, []);


    // const moveSlide = (event) => {
    //     newLessonRef.current.preserveScroll = false;

    //     if (event.deltaY > 0) {
    //         newLessonRef.current.next();
    //     } else {
    //         newLessonRef.current.prev();
    //     }
    // };




    const [orientation, setOrientation] = useState(
        window.matchMedia('(orientation: portrait)').matches ? 'portrait' : 'landscape');

    useEffect(() => {
        const handleOrientationChange = () => {
            setOrientation(
                window.matchMedia('(orientation: portrait)').matches
                    ? 'portrait' : 'landscape');
        };

        // Add an event listener for changes in orientation
        window.addEventListener('resize', handleOrientationChange);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('resize', handleOrientationChange);
        };
    }, []);


 

    useEffect(() => {
        if (showDetail) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };

    }, [showDetail]);

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
    >
        <div>
            <Head>
                <title>{course?.title}</title>
            </Head>


            <div className=" container mx-auto  px-4 lg:px-3">

                <CoursePreviewHeader
                    className={"course-preview-header-card feature-card  "}
                    title={course?.title}
                    instructor={course?.default_instructor?.full_name}
                    duration={"5 hr 40 min"}
                    lessons={course?.lessons_count}
                    desktop_image={course?.thumbnail}
                    mobile_image={course?.mobile_thumbnail}
                    badge={"primary"}
                    badge_text={""}
                    live={false} />

                <div className="container mx-auto px-5 lg:px-0  md:-mt-[5rem] -mt-[3.5rem] relative">

                    <div className="max-w-2xl mx-auto">
                        <div className="grid grid-cols-12">
                            <div className="col-span-12  z-50">
                                <div className="flex justify-center items-center gap-2 lg:gap-4 ">
                                    <Link preserveScroll onClick={()=>{setIsPlayPage(true)}} className="max-w-[390px] w-[100%]" href={hasEnrolledInCourse
                                        ? route('courses.play', course?.id)
                                        : route('courses.enrol', course.id)}>
                                        <button className="button isPreview-page primary border-rounded-10 w-full">
                                            <div className="button_container glitch uppercase">
                                                {hasEnrolledInCourse ? 'Play' : 'START PROGRAM'}
                                            </div>
                                        </button>
                                    </Link>

                                    {/* <a href="#lessons">
                                        <button className="button secondary">
                                            <div className="button_container glitch uppercase">

                                                Trailer
                                            </div>
                                        </button>
                                    </a> */}

                                    {/* <IconButton
                                        onClick={handleBookmarkToggle}
                                        disabled={processing}
                                        icon={<BookMark />}
                                        className={` ${course?.bookmarked ? ' primary' : 'secondary'}  icon_button`}
                                    ></IconButton> */}

                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </div>



            {/* ***************** NEW COURSE AND INSTRUCTOR ABOUT CARDS STARTS***************** */}


            <div className="relative mt-[2.17rem] md:mt-[3.5rem] ">



                <div className={` instructor-card ${showDetail && 'show'} z-[9999999]  absolute w-full left-0 md:top-[6rem] `}>

                    <div className="container mx-auto flex  border-rounded-15 p-3 -mt-[1rem] md:-mt-[6rem] relative">


                        <div className="absolute right-3.5 top-14 md:top-5 lg:top-0 card-outside-bg top-padding   w-[100%] md:w-[80%] lg:w-[65%] xl:w-[52%]">
                        <div onClick={() => { setShowDetail(false) }} className="z-[999] absolute right-5 lg:right-5 top-5 md:top-3 lg:top-3 w-fit container mx-auto cursor-pointer   flex justify-center">
                                 <Xmark />
                            </div>

                            <div className="inner-card-bg border-rounded-10  px-3 lg:px-4 pt-3 lg:pt-5 pb-3 lg:pb-5">
                                <div className="flex gap-x-4 ">
                                    <div className="img  w-[40%]  ">
                                        <img src={course?.default_instructor?.dp?.original?.url} alt="dp" className="insturctor-img border-rounded-10 object-cover  " />
                                    </div>
                                    <div className="w-[60%] ">
                                        <div className="intro card-bg border-rounded-10 pt-4 pb-4 px-4">
                                            <p className="insturctor-name leading-[3rem]">{course?.default_instructor?.full_name}</p>
                                            <p className="insturctor-about pt-1.5 pb-0 lg:pb-1.5">{course.default_instructor?.title}</p>

                                        </div>

                                        <div className="w-full gap-x-4 flex mt-2 lg:mt-4">
                                            <div className="intro card-bg border-rounded-10 py-3 lg:py-5 px-3 lg:px-5 w-[50%]">
                                                <div className="flex justify-center w-full">
                                                    <div className=" flag-wrapper">
                                                        <span className={`fi fi-${course?.default_instructor?.country?.iso.toLowerCase()} flag-icon `}></span>
                                                        {/* <ReactCountryFlag
                                                    className=""
                                                    countryCode={course.default_instructor.country_iso}
                                                    svg
                                                    style={{
                                                        width: '30px',
                                                        height: '30px',
                                                        objectFit: 'cover'
                                                    }}
                                                    aria-label="United States"
                                                /> */}
                                                        {/* <img
                                                            src={flagIcon}
                                                            className="w-5 h-5 "
                                                        /> */}

                                                    </div>
                                                </div>

                                                <p className="insturctor-about-logo text-center pt-[8px] lg:pt-3 leading-[2rem]">{course?.default_instructor?.country?.name && course?.default_instructor?.country?.name}</p>

                                            </div>
                                            <div className="intro card-bg border-rounded-10 py-3 lg:py-5 px-3 lg:px-5 w-[50%]">
                                                <div className="flex justify-center w-full">
                                                    {instructorAvatar &&
                                                        <img
                                                            src={instructorAvatar && instructorAvatar}
                                                            className="  h-8 w-8  object-contain rounded-full "
                                                        />
                                                    }
                                                    {/* <img
                                                            src={instructorUser?.dp?.original?.url}
                                                            className="  h-[14px] w-[14px]  lg:h-[18px] lg:w-[18px] object-contain rounded-full "
                                                        /> */}

                                                </div>

                                                {instructorAvatar && <p className="insturctor-about-logo text-center pt-[5px] lg:pt-3 leading-[2rem]">GLITCH #{course.default_instructor?.glitch_id ? course.default_instructor?.glitch_id.toString().padStart(4, '0') : ' xxxx '}</p>
                                                }
                                            </div>


                                        </div>
                                    </div>
                                </div>
                                <div className="intro card-bg border-rounded-5 py-5 px-5  mt-4">
                                    <p className="fw-regular text-[12px]    ">
                                     {course.default_instructor?.about}</p>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>








                <div className="container mx-auto  px-4 lg:px-3 ">
                    <div className={` ${showDetail ? '-z-[999999]' : ''}  grid grid-cols-1 relative    lg:grid-cols-2 card-bg border-rounded-15 py-2.5 md:py-[18px] px-1.5 md:px-5 gap-x-5 gap-y-3 `}>
                        <div className="relative card-bg-discord border-rounded-10 px-3 md:px-[26px] padding-about w-full">

                            <div className="lg:flex gap-x-2 md:gap-x-1 lg:gap-x-8 xl:gap-x-0 w-full">
                                <p className="course-about-heading w-full lg:w-[30%] mb-2">ABOUT THE <br className="sm-d-none md-d-none" /> PROGRAM</p>
                                <div className="flex lg:block items-center gap-x-4 mb-2 md:mb-5 lg:mb-0 w-full lg:w-[70%]">
                                    <p className="course-about-description  ">Modules: {courseModulesCount} </p>
                                    <p className="course-about-description">Lessons: {course?.lessons?.length}</p>
                                    <p className="course-about-description mb-0 lg:mb-5">Duration: {courseDuration(course?.duration)}hrs </p>
                                    <p className={`   text-12 fw-regular md-d-none sm-d-none `}> {course?.summery} </p>
                                </div>

                            </div>
                            <p className="text-[12.5px] fw-regular lg-d-none">  {course?.summery}  </p>

                            {/* <div className=" flex justify-end">
                                <IconButton
                                    onClick={handleBookmarkToggle}
                                    disabled={processing}
                                    icon={<BookMark />}
                                    className={` ${course?.bookmarked ? ' primary' : 'secondary'}  icon_button`}
                                ></IconButton>
                            </div> */}
                        </div>
                        <div className="relative card-bg-discord border-rounded-10 padding-about-data w-full sm-d-none">

                            {/* instructor detail popup card  */}

                            {/* instructor detail popup card  */}
                            <div className="flex items-start gap-x-3 md:gap-x-5">

                                <div className="img">
                                    <img src={course?.default_instructor?.dp?.original?.url} alt="dp" className="h-[160px] w-[160px] md:h-[160px] md:w-[160px] rounded-full object-cover  " />
                                </div>
                                <div className="intro mt-2 md:mt-4">
                                    <p className="course-about-heading">{course?.default_instructor?.full_name}</p>
                                    <p className="course-about-description">{course.default_instructor?.title}</p>
                                </div>
                            </div>

                            <div onClick={() => { setShowDetail(true) }} className=" cursor-pointer right-4  bottom-4 flex justify-end absolute">
                                <svg className="h-6 w-6 md:w-[43px] md:h-[43px]" viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M39.4154 21.5002C39.4154 11.6102 31.3887 3.5835 21.4987 3.5835C11.6087 3.5835 3.58203 11.6102 3.58203 21.5002C3.58203 31.3902 11.6087 39.4168 21.4987 39.4168C31.3887 39.4168 39.4154 31.3902 39.4154 21.5002ZM21.4987 26.4989V23.2918H16.1237C15.1383 23.2918 14.332 22.4856 14.332 21.5002C14.332 20.5147 15.1383 19.7085 16.1237 19.7085H21.4987V16.5014C21.4987 15.6952 22.4662 15.301 23.0216 15.8743L28.0204 20.8731C28.3787 21.2314 28.3787 21.7868 28.0204 22.1452L23.0216 27.1439C22.4662 27.6993 21.4987 27.3052 21.4987 26.4989Z" fill="#EBEBEB" />
                                </svg>

                            </div>
                        </div>
                    </div>

                    {/* *************instructor detail card ********** */}
                    {/* mobile */}

                    <div className="grid grid-cols-1 instructor-card-mobile mt-[7px]">
                        <div className="card-outside-bg padding-mobile-profile">
                            <div className=" border-rounded-10">
                                <div className="flex gap-x-3 h-full" style={{ alignItems: 'flex-start' }}>
                                    <div className="img w-[40%]">
                                        <img src={course?.default_instructor?.dp?.original?.url} alt="dp" className={`filter-drop insturctor-img-mobile   border-rounded-10 object-cover`} />
                                    </div>
                                    <div className="w-[60%]">
                                        <div className="intro card-bg  profile-card-bg px-[13px] py-[15px]">
                                            <p className="insturctor-name">{course?.default_instructor?.full_name}</p>
                                            <p className="insturctor-about pt-1">{course.default_instructor?.title}</p>

                                        </div>
                                        <div className="w-full gap-x-3 flex mt-3 lg:mt-4">
                                            <div className="intro card-bg profile-card-bg py-2.5 px-2.5 w-[50%]">
                                                <div className="flex justify-center w-full">
                                                    <div className=" flag-wrapper">
                                                        <span className={`fi fi-${course?.default_instructor?.country?.iso.toLowerCase()} flag-icon `}></span>
                                                        {/* <ReactCountryFlag
                                                            className=""
                                                            countryCode={course.default_instructor.country_iso}
                                                            svg
                                                            style={{
                                                                width: '25px',
                                                                height: '25px',
                                                                objectFit: 'cover'
                                                            }}
                                                            aria-label="United States"
                                                        /> */}
                                                    </div>
                                                    {/* <svg className="w-[26px] h-[26px]" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <g clipPath="url(#clip0_6136_3555)">
                                                            <path d="M8.53653 17.0369C13.1184 17.0369 16.8328 13.3225 16.8328 8.74063C16.8328 4.15871 13.1184 0.444336 8.53653 0.444336C3.95461 0.444336 0.240234 4.15871 0.240234 8.74063C0.240234 13.3225 3.95461 17.0369 8.53653 17.0369Z" fill="#F0F0F0" />
                                                            <path d="M8.53613 0.444336C4.96902 0.444336 1.92807 2.69574 0.755859 5.85498H16.3164C15.1442 2.69574 12.1032 0.444336 8.53613 0.444336Z" fill="#A2001D" />
                                                            <path d="M8.53613 17.0371C12.1032 17.0371 15.1442 14.7857 16.3164 11.6265H0.755859C1.92807 14.7857 4.96902 17.0371 8.53613 17.0371Z" fill="#0052B4" />
                                                        </g>
                                                        <defs>
                                                            <clipPath id="clip0_6136_3555">
                                                                <rect width="16.5926" height="16.5926" fill="white" transform="translate(0.240234 0.444336)" />
                                                            </clipPath>
                                                        </defs>
                                                    </svg> */}
                                                </div>
                                                <p className="insturctor-about-logo text-center pt-[10px] lg:pt-3">{course?.default_instructor?.country?.name}</p>
                                            </div>
                                            <div className="intro card-bg profile-card-bg py-2.5 px-2.5 w-[50%]">
                                                <div className="flex justify-center w-full">
                                                {instructorAvatar &&
                                                    <img
                                                        src={instructorAvatar && instructorAvatar}
                                                        className="  h-[18px] w-[18px]  object-contain rounded-full "
                                                    />
                                                }
                                                </div>
                                                {instructorAvatar &&
                                                <p className="insturctor-about-logo text-center pt-[10px] lg:pt-3">GLITCH #{course.default_instructor?.glitch_id ? course.default_instructor?.glitch_id.toString().padStart(4, '0') : 'xxxx'}</p>
                                                }
                                                </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="intro card-bg profile-card-bg py-4 px-2.5  mt-3">
                                    <p className="fw-regular text-[12.5px]">
                                      {course.default_instructor?.about}</p>

                                </div>
                            </div>

                        </div>
                    </div>




                    {/* *************instructor detail card ********** */}






                    {/* *************instructor detail card ********** */}


                    <div className="my-[14px] md:mt-[22px]  container mx-auto  px-4 lg:px-3">
                        <p className="fw-bold fs-small"> EXPLORE ALL {course?.title=='MONEY TALKS'  ||  course?.title=='DATA SETS'  ? course?.title : 'EPISODES'  } </p>



                        <div className="grid grid-cols-12 mt-[8px] md:mt-[24px]">
                            <div  className="col-span-12 relative"  >

                            <div className="marquee-shadow left h-80"></div>
                        <div className="marquee-shadow right -top-[1px] h-80"></div>


                                <OwlCarousel  {...owlCourseLessons?.options}
                                    ref={newLessonRef}
                                    className="owl-theme relative" >
                                    {course?.lessons?.map((data, index) => (
                                        <div key={index + 3}  className={"academy-small-card new-course-card "}>
                                            <AcademyLargeCard

                                                title={data?.title}
                                                instructor={data?.default_instructor?.full_name}
                                                duration={"5 hr 40 min"}
                                                lessons={data?.lessons_count}
                                                 desktop_image={data?.thumbnail}
                                                mobile_image={data?.thumbnail}
                                                badge={"primary"}
                                                badge_text={""}
                                                live={false}
                                                routeToPlay={route('lessons.play', data?.id)}
                                                videoProgress={0} />
                                            <p className="lesson-title pt-1 md:pt-5">{index + 1} . {data?.title}</p>
                                        </div>
                                    ))}
                                </OwlCarousel>

                                <div className="hidden lg:block">
                                <div className="absolute mx-auto  top-[35%] z-[9999] px-4">
                                    <div onClick={() => {
                                        handleSliderPrev(newLessonRef)
                                    }}>
                                        <SlideArrows />

                                    </div>
                                </div>
                                <div className="absolute mx-auto right-1 top-[35%] z-[9999] px-4">
                                    <div className="rotate-180" onClick={() => {
                                        handleSliderNext(newLessonRef)
                                    }}>
                                        <SlideArrows />
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div>



                    </div>





                </div>

            </div>

                {showDetail && <div onClick={() => { setShowDetail(false) }} className="bg-sm-black backdrop-blur-[2px] bg-black/10 fixed mx-auto inset-0 z-[9999]   "></div>}



        </div>
        </motion.div>
    );
};











function formatDuration(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}


function courseDuration(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours}.${minutes.toString().padStart(2, '0')}  `;
}



Course.layout = (page) => <Layout children={page} title="" />;
export default Course;
