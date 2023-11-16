import React, { useRef, useEffect, useState } from "react";
import { useForm } from '@inertiajs/react'
import Layout from "@/Layouts/Layout";
import cross from "../../../assets/svg/cross.svg";
import topRank from "../../../assets/svg/No-Top-Members.svg";
import faqplus from "../../../assets/svg/faqplus.svg";
import Lock from "../../../assets/svg/Lock.svg";
import checkCircle from "../../../assets/svg/CheckCircle2.svg";
import OwlCarousel from "react-owl-carousel";
import {motion} from 'framer-motion'
import AOS from 'aos';
import 'aos/dist/aos.css';
import Button from "../../Components/Button";
import { ReactComponent as WatchSvg } from "../../../assets/svg/watch.svg";
import { ReactComponent as ArrowRight } from "../../../assets/svg/ArrowRight.svg";
import { ReactComponent as ArrowLeft } from "../../../assets/svg/ArrowLeft.svg";
import { ReactComponent as BookMark } from "../../../assets/svg/Bookmark.svg";

// art and design
import art1 from "../../../assets/img/art1.jpg";
import art2 from "../../../assets/img/art2.jpg";
import art3 from "../../../assets/img/art3.jpg";
import art4 from "../../../assets/img/art4.jpg";
import art5 from "../../../assets/img/art5.jpg";
import CourseCard from "@/Components/Course/CourseCard";
import { Link } from "@inertiajs/react";
import TabButton from "@/Components/TabButton";
import IconButton from "@/Components/IconButton";
import AcademySmallCard from "@/Components/Course/AcademySmallCard";

const Course = ({ course, similarCourses, hasEnrolledInCourse, topRankMembers }) => {
    // console.log("topRankMembers")
    // console.log(topRankMembers)
    // console.log('similarCourses')
    // console.log(similarCourses)
    // console.log('course')
    // console.log(course)

    const { post , processing } = useForm();



    const handleBookmarkToggle = () => {
let timeOut = setTimeout(()=>{
    if (!processing) {

        post(route('bookmark-toggle.courses', course?.id), {
            preserveScroll: true
        });
        clearTimeout(timeOut)
    }
    },2000)
}


    const [nowPlaying, setNowPlaying] = useState(course?.trailer?.vimeo_url)

    useEffect(() => {
        const videoWithPreview = course?.lessons?.find(item => item.has_preview);
        if (videoWithPreview) {
            setNowPlaying(videoWithPreview.vimeo_url);
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

    const [ imageThumbnailLoaded , setImageThumbnailLoaded] = useState(false)

    return (
        <div>
            <div className="">

                <div data-aos="fade-in" data-aos-delay="100" data-aos-easing="ease" data-aos-duration="300"
                    className="relative main-header bg-cover bg-center mh-[60vh] sm:min-h-[92vh] md:min-h-[50vh] lg:min-h-[100vh] xl:min-h-[100vh] flex items-center bg-no-repeat"
                    // style="background-image: url('{{ asset('assets/course-main.png') }}');"
                    // style={{ backgroundImage: `url(${course?.thumbnail?.original?.url}) ` }}
                >

                                                    <div className="shadow top"></div>
                                <div className="shadow bottom"></div>
                                <img src={ imageLoaded ? course?.thumbnail?.original?.url : course?.thumbnail?.medium?.url }  onLoad={() => setImageLoaded(true)} className="h-100 w-100 header-image" />
                    <div className="container mx-auto px-5 lg:px-0  relative">

                        <div className="max-w-2xl mx-auto">
                            <div className="grid grid-cols-12">
                                <div className="col-span-12  z-50">
                                    <div
                                        className="text-center h-[550px] lg:h-[670px] flex flex-col justify-end items-center">
                                        {/* <h1 className="mb-2">
                                            {course?.title}
                                        </h1> */}
                                        {/* <Link href={route('instructors.show', course?.default_instructor?.id)}>    <h3 className="hover:underline  mb-5 font-normal">
                                            {course?.default_instructor?.full_name}
                                        </h3>  </Link> */}
                                        {/* <div className="flex items-center gap-8 mb-4">
                                            <div
                                                className="regular text-[#FFFFFF] font-normal flex item-center"
                                            >
                                                <span className="mr-[10px]">
                                                    <svg
                                                        width="24"
                                                        height="24"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M18 20H6"
                                                            stroke="white"
                                                            strokeOpacity="0.6"
                                                            strokeWidth="1.2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                        <path
                                                            d="M22 4H2V16H22V4Z"
                                                            fill="white"
                                                            fillOpacity="0.2"
                                                            stroke="white"
                                                            strokeOpacity="0.6"
                                                            strokeWidth="1.2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    </svg>
                                                </span>
                                                <span className="danger-color uppercase">
                                                    4 hours
                                                </span>
                                            </div>
                                            <div
                                                className="regular text-[#FFFFFF] font-normal flex item-center"
                                            >
                                                <span className="mr-[10px]">
                                                    <svg
                                                        width="24"
                                                        height="24"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M3 21H12H21C21.55 21 22 20.55 22 20V4C22 3.45 21.55 3 21 3H12H3C2.45 3 2 3.45 2 4V20C2 20.55 2.45 21 3 21Z"
                                                            fill="white"
                                                            fillOpacity="0.2"
                                                        />
                                                        <path
                                                            d="M4 12H10"
                                                            stroke="white"
                                                            strokeOpacity="0.6"
                                                            strokeWidth="1.2"
                                                            strokeMiterlimit="10"
                                                        />
                                                        <path
                                                            d="M4 8H10"
                                                            stroke="white"
                                                            strokeOpacity="0.6"
                                                            strokeWidth="1.2"
                                                            strokeMiterlimit="10"
                                                        />
                                                        <path
                                                            d="M4 16H10"
                                                            stroke="white"
                                                            strokeOpacity="0.6"
                                                            strokeWidth="1.2"
                                                            strokeMiterlimit="10"
                                                        />
                                                        <path
                                                            d="M14 12H20"
                                                            stroke="white"
                                                            strokeOpacity="0.6"
                                                            strokeWidth="1.2"
                                                            strokeMiterlimit="10"
                                                        />
                                                        <path
                                                            d="M14 8H20"
                                                            stroke="white"
                                                            strokeOpacity="0.6"
                                                            strokeWidth="1.2"
                                                            strokeMiterlimit="10"
                                                        />
                                                    </svg>
                                                </span>
                                                <span className=" uppercase">
                                                    {course?.lessons?.length} Lessons
                                                </span>
                                            </div>
                                        </div> */}
                                        {/* <p className="regular text-[#FFFFFF] font-normal mb-8">
                                            {course?.summery?.length > 110 ? course?.summery?.substring(0, 140) + "..." : course?.summery}
                                        </p> */}
                                        <div className="flex items-center gap-2 lg:gap-4  justify-center">
                                            <Link href={hasEnrolledInCourse
                                                ? route('courses.play', course?.id)
                                                : route('courses.enrol', course.id)}>
                                                <button className="button primary">
                                                    <div className="button_container glitch uppercase">


                                                        {hasEnrolledInCourse ? 'Play' : 'Enrol Now'}
                                                    </div>
                                                </button>
                                            </Link>

                                            <a href="#lessons">
                                                <button className="button secondary">
                                                    <div className="button_container glitch uppercase">

                                                        Trailer
                                                    </div>
                                                </button>
                                            </a>

                                            <IconButton
                                                onClick={handleBookmarkToggle}
                                                disabled={processing}
                                                icon={<BookMark />}
                                                className={` ${course?.bookmarked ? ' primary' : 'secondary'}  icon_button`}
                                            ></IconButton>

                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="absolute bottom-0 flex item-center z-10 w-full">

                        <img
                            className="w-full"
                            src="{{ asset('assets/img/shade.png') }}"
                            alt=""
                        />
                    </div>

                </div>
            </div>

            {/* course trailer */}

            <section id="lessons" className="pt-12">
                <div className="container mx-auto px-5 lg:px-3">
                    <div className="grid grid-cols-12 gap-y-6 lg:gap-x-6">
                        <div className="col-span-12">
                            <div className="text-start">
                                <h3>{ course?.lessons && course?.lessons?.length} Lessons</h3>
                            </div>
                        </div>
                        <div className="col-span-12 lg:col-span-8 ">
                            {!nowPlaying ? <div className="">
                                <img onLoad={()=>setImageThumbnailLoaded(true)} src={imageThumbnailLoaded ? course?.thumbnail?.original?.url : course?.thumbnail?.small?.url}
                                    className="w-full overflow-hidden border-rounded-10 min-h-[250px]    max-h-[576px]   " />
                            </div> :
                                <div className="text-start relative ">
                                    <div className="text-start relative">
                                        <style>
                                            {`
                                    .codegena {
                                        position: relative;
                                        width: 100%;
                                        height: 0;

                                        padding-bottom: 56.27198%;
                                    }

                                    .codegena iframe {
                                        position: absolute;
                                        top: 0;
                                        left: 0;
                                        border-radius:10px;
                                        width: 100%;
                                        height: 100%;
                                    }
                                    `}
                                        </style>
                                        <div className="codegena  ">
                                            <iframe src={nowPlaying}></iframe>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                        <div   className="col-span-12 lg:col-span-4 " >
                            <div className=" min-auto max-h-[576px] relative">
                                <div
                                    className={`lessons-shadow top absolute z-[99999] -mt-2 ${isTopShadowVisible < 110 && "none"
                                        } `}
                                ></div>
                                <div
                                    className={
                                        "relative overflow-y-auto min-h-auto max-h-[36rem]  xl:max-h-[30rem] lg:max-h-[23rem] 2xl:max-h-[36rem]"
                                    }
                                    onScroll={handleScroll}
                                >

                                    <div >







                                    <div onClick={() => {  setNowPlaying(course?.trailer?.vimeo_url) }}   className={`mb-2 cursor-pointer `}>
                                                <div
                                                    className="flex items-center gap-4"
                                                >
                                                    <div className="relative">
                                                        <img
                                                            src={course?.trailer?.thumbnail?.url}
                                                            className="h-[86px] border-rounded-10  md:h-[162px] lg:h-[86px] min-w-[150px]  max-w-[150px] md:min-w-[281px] lg:min-w-[149px]  object-cover object-center"
                                                            alt=""
                                                        />
                                                         <span
                                                            className="absolute top-1 left-1 bg-[#FFFFFF] rounded-3xl px-2 py-1 text-[10px] text-[#000000] font-normal">
                                                            Tralier
                                                        </span>
                                                        <span
                                                            className="absolute right-1 bottom-1 bg-[#000000] rounded-3xl px-2 py-1 text-[10px] text-[#FFFFFF] font-normal">
                                                            11:45
                                                        </span>
                                                        <div className="absolute left-1 bottom-2">
                                                            {/* {data?.has_preview ? */}
                                                                <svg
                                                                    width="25"
                                                                    height="24"
                                                                    viewBox="0 0 25 24"
                                                                    fill="none"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                >
                                                                    <g clipPath="url(#clip0_829_44093)">
                                                                        <path
                                                                            opacity="0.4"
                                                                            d="M7.25 3.739V20.2615C7.25245 20.3933 7.28962 20.5222 7.35776 20.6351C7.4259 20.748 7.5226 20.841 7.63812 20.9046C7.75364 20.9682 7.88388 21.0002 8.01572 20.9974C8.14756 20.9946 8.27634 20.9571 8.38906 20.8887L21.8966 12.6274C22.0045 12.5621 22.0937 12.4701 22.1556 12.3602C22.2175 12.2504 22.2501 12.1264 22.2501 12.0003C22.2501 11.8741 22.2175 11.7501 22.1556 11.6403C22.0937 11.5304 22.0045 11.4384 21.8966 11.3731L8.38906 3.11181C8.27634 3.04338 8.14756 3.00588 8.01572 3.0031C7.88388 3.00031 7.75364 3.03233 7.63812 3.09594C7.5226 3.15954 7.4259 3.25248 7.35776 3.36538C7.28962 3.47828 7.25245 3.60715 7.25 3.739Z"
                                                                            fill="white"
                                                                        />
                                                                        <path
                                                                            d="M7.25 3.739V20.2615C7.25245 20.3933 7.28962 20.5222 7.35776 20.6351C7.4259 20.748 7.5226 20.841 7.63812 20.9046C7.75364 20.9682 7.88388 21.0002 8.01572 20.9974C8.14756 20.9946 8.27634 20.9571 8.38906 20.8887L21.8966 12.6274C22.0045 12.5621 22.0937 12.4701 22.1556 12.3602C22.2175 12.2504 22.2501 12.1264 22.2501 12.0003C22.2501 11.8741 22.2175 11.7501 22.1556 11.6403C22.0937 11.5304 22.0045 11.4384 21.8966 11.3731L8.38906 3.11181C8.27634 3.04338 8.14756 3.00588 8.01572 3.0031C7.88388 3.00031 7.75364 3.03233 7.63812 3.09594C7.5226 3.15954 7.4259 3.25248 7.35776 3.36538C7.28962 3.47828 7.25245 3.60715 7.25 3.739Z"
                                                                            stroke="white"
                                                                            strokeWidth="1.2"
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                        />
                                                                    </g>
                                                                    <defs>
                                                                        <clipPath id="clip0_829_44093">
                                                                            <rect
                                                                                width="24"
                                                                                height="24"
                                                                                fill="white"
                                                                                transform="translate(0.5)"
                                                                            />
                                                                        </clipPath>
                                                                    </defs>
                                                                </svg>
                                                                {/* :

                                                                <img
                                                                    className="  left-1 bottom-1"
                                                                    src={Lock}
                                                                    alt=""
                                                                />} */}

                                                        </div>
                                                    </div>
                                                    <div>
                                                        <p className="text-[16px] md:text-[32px] lg:text-[20px] font-medium ">
                                                              {course?.trailer?.title}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>




                                            <hr className="mb-3 border-[1px] border-[#ffffff1a] rounded-full " />







                                        {course?.lessons?.map((data, index) => (

                                            <div onClick={() => { data?.has_preview && setNowPlaying(data?.vimeo_preview_url) }} key={index + 1} className={`mb-4   ${!data?.has_preview ? 'opacity-50' : 'cursor-pointer'} `}>
                                                <div
                                                    className="flex items-center gap-4"
                                                >
                                                    <div className="relative">
                                                        <img
                                                            src={data?.thumbnail?.small?.url}
                                                            className="h-[86px] border-rounded-10  md:h-[162px] lg:h-[86px] min-w-[150px]  max-w-[150px] md:min-w-[281px] lg:min-w-[149px]  object-cover object-center"
                                                            alt=""
                                                        />
                                                        {data?.has_preview && <span
                                                            className="absolute top-1 left-1 bg-[#FFFFFF] rounded-3xl px-2 py-1 text-[10px] text-[#000000] font-normal">
                                                            Preview
                                                        </span>}
                                                        <span
                                                            className="absolute right-1 bottom-1 bg-[#000000] rounded-3xl px-2 py-1 text-[10px] text-[#FFFFFF] font-normal">
                                                            11:45
                                                        </span>
                                                        <div className="absolute left-1 bottom-2">
                                                            {data?.has_preview ?
                                                                <svg
                                                                    width="25"
                                                                    height="24"
                                                                    viewBox="0 0 25 24"
                                                                    fill="none"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                >
                                                                    <g clipPath="url(#clip0_829_44093)">
                                                                        <path
                                                                            opacity="0.4"
                                                                            d="M7.25 3.739V20.2615C7.25245 20.3933 7.28962 20.5222 7.35776 20.6351C7.4259 20.748 7.5226 20.841 7.63812 20.9046C7.75364 20.9682 7.88388 21.0002 8.01572 20.9974C8.14756 20.9946 8.27634 20.9571 8.38906 20.8887L21.8966 12.6274C22.0045 12.5621 22.0937 12.4701 22.1556 12.3602C22.2175 12.2504 22.2501 12.1264 22.2501 12.0003C22.2501 11.8741 22.2175 11.7501 22.1556 11.6403C22.0937 11.5304 22.0045 11.4384 21.8966 11.3731L8.38906 3.11181C8.27634 3.04338 8.14756 3.00588 8.01572 3.0031C7.88388 3.00031 7.75364 3.03233 7.63812 3.09594C7.5226 3.15954 7.4259 3.25248 7.35776 3.36538C7.28962 3.47828 7.25245 3.60715 7.25 3.739Z"
                                                                            fill="white"
                                                                        />
                                                                        <path
                                                                            d="M7.25 3.739V20.2615C7.25245 20.3933 7.28962 20.5222 7.35776 20.6351C7.4259 20.748 7.5226 20.841 7.63812 20.9046C7.75364 20.9682 7.88388 21.0002 8.01572 20.9974C8.14756 20.9946 8.27634 20.9571 8.38906 20.8887L21.8966 12.6274C22.0045 12.5621 22.0937 12.4701 22.1556 12.3602C22.2175 12.2504 22.2501 12.1264 22.2501 12.0003C22.2501 11.8741 22.2175 11.7501 22.1556 11.6403C22.0937 11.5304 22.0045 11.4384 21.8966 11.3731L8.38906 3.11181C8.27634 3.04338 8.14756 3.00588 8.01572 3.0031C7.88388 3.00031 7.75364 3.03233 7.63812 3.09594C7.5226 3.15954 7.4259 3.25248 7.35776 3.36538C7.28962 3.47828 7.25245 3.60715 7.25 3.739Z"
                                                                            stroke="white"
                                                                            strokeWidth="1.2"
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                        />
                                                                    </g>
                                                                    <defs>
                                                                        <clipPath id="clip0_829_44093">
                                                                            <rect
                                                                                width="24"
                                                                                height="24"
                                                                                fill="white"
                                                                                transform="translate(0.5)"
                                                                            />
                                                                        </clipPath>
                                                                    </defs>
                                                                </svg>
                                                                :

                                                                <img
                                                                    className="  left-1 bottom-1"
                                                                    src={Lock}
                                                                    alt=""
                                                                />}

                                                        </div>
                                                    </div>
                                                    <div>
                                                        <p className="text-[16px] md:text-[32px] lg:text-[20px] font-medium ">
                                                            {index + 1}. {data?.title}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                        ))}




                                    </div>
                                    {/*shadow bottom*/}

                                </div>
                                <div
                                    className={` ${isTopShadowVisible > 560 && "none"
                                        }  z-50 lessons-shadow bottom -mt-[40px]  `}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* course tab */}

            <section className="pt-12">
                <div className="opacity-20"></div>
                <div className="container mx-auto px-5 xl:px-0">
                    <div className="max-w-3xl mx-auto">
                        <div className="grid grid-cols-12">
                            <div className="col-span-12">
                                <div
                                    className="flex items-center justify-between overflow-x-scroll lg:overflow-hidden   overflow-whitewrap">
                                    <a
                                        href="#overview"
                                        className=" px-3          glitch"
                                    >

                                        <TabButton>

                                            Overview
                                        </TabButton>
                                    </a>
                                    <a
                                        href="#topranked"
                                        className=" px-3          glitch"
                                    >
                                        <TabButton>

                                            Top Rank Members
                                        </TabButton>

                                    </a>
                                    <a
                                        href="#experience"
                                        className=" px-3          glitch"
                                    >
                                        <TabButton>

                                            Experience
                                        </TabButton>

                                    </a>
                                    <a
                                        href="#session"
                                        className="        px-3  glitch"
                                    >
                                        <TabButton>

                                            Suggested courses
                                        </TabButton>

                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="border-b-[1px] border-b-[#FFFFFF] opacity-20   "></div>
            </section>

            {/* overview */}
            <section id="overview" className="pt-11 lg:pt-16">
                <div className="container mx-auto px-5 lg:px-3">
                    <div className="">
                        <div className="grid grid-cols-12">
                            <div className="col-span-12">
                                <div className="text-start">
                                    <h3 className="mb-6 lg:mb-8">Overview</h3>
                                    <p className="mb-4">
                                        {course?.summery}.
                                    </p>
                                    {/* <p className="mb-4">
                                        The Ultimate Drawing Course will show
                                        you how to create advanced art that will
                                        stand up as professional work. This
                                        course will enhance or give you skills
                                        in the world of drawing - or your money
                                        back The course is your track to
                                        obtaining drawing skills like you always
                                        knew you should have! Whether for your
                                        own projects or to draw for other
                                        people.
                                    </p>
                                    <p className="mb-4">
                                        This course will take you from having
                                        little knowledge in drawing to creating
                                        advanced art and having a deep
                                        understanding of drawing fundamentals.
                                    </p> */}
                                </div>
                                <div className="text-start">
                                    <h5 className="mb-1 font-normal">
                                        <span className="opacity-50">
                                            Instructor(s):
                                        </span>{" "}
                                        {course?.default_instructor?.full_name}
                                    </h5>
                                    <h5 className="mb-1 font-normal">
                                        <span className="opacity-50">
                                            Class Length:
                                        </span>{" "}
                                        35 video lessons (8 hours 1 minute)
                                    </h5>
                                    <h5 className="mb-1 font-normal">
                                        <span className="opacity-50">
                                            Category:
                                        </span>{" "}

                                        {course?.category?.name}
                                    </h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* top ranks member */}

            <section id="topranked" className="pt-16 mt-0 lg:mt-16">
                <div className="container mx-auto px-5 lg:px-3">
                    <div className="">
                        <div className="grid grid-cols-3 mb-8">
                            <div className="col-span-12">
                                <div className="text-start flex justify-between item-center">
                                    <h3 className="font-medium">
                                        Top Rank Members
                                    </h3>
                                  {topRankMembers?.length > 0 &&  <div className="hidden md:block">
                                        <div className="flex items-center gap-3">
                                            <div onClick={() => handleSliderPrev(topRankRef)} className="cursor-pointer">
                                                <svg
                                                    width="32"
                                                    height="32"
                                                    viewBox="0 0 32 32"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <g clipPath="url(#clip0_724_31297)">
                                                        <path
                                                            opacity="0.4"
                                                            d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z"
                                                            fill="white"
                                                        />
                                                        <path
                                                            d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z"
                                                            stroke="black"
                                                            strokeWidth="1.2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                        <path
                                                            d="M11 16H21"
                                                            stroke="white"
                                                            strokeOpacity="0.6"
                                                            strokeWidth="1.2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                        <path
                                                            d="M15 12L11 16L15 20"
                                                            stroke="white"
                                                            strokeOpacity="0.6"
                                                            strokeWidth="1.2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_724_31297">
                                                            <rect
                                                                width="32"
                                                                height="32"
                                                                fill="white"
                                                            />
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                            </div>
                                            <div onClick={() => handleSliderNext(topRankRef)} className="cursor-pointer" >
                                                <svg
                                                    width="32"
                                                    height="32"
                                                    viewBox="0 0 32 32"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <g clipPath="url(#clip0_724_31291)">
                                                        <path
                                                            opacity="0.4"
                                                            d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z"
                                                            fill="white"
                                                        />
                                                        <path
                                                            d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z"
                                                            stroke="white"
                                                            strokeOpacity="0.6"
                                                            strokeWidth="1.2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                        <path
                                                            d="M11 16H21"
                                                            stroke="white"
                                                            strokeOpacity="0.6"
                                                            strokeWidth="1.2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                        <path
                                                            d="M17 12L21 16L17 20"
                                                            stroke="white"
                                                            strokeOpacity="0.6"
                                                            strokeWidth="1.2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_724_31291">
                                                            <rect
                                                                width="32"
                                                                height="32"
                                                                fill="white"
                                                            />
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                            </div>
                                        </div>
                                    </div> }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {!topRankMembers?.length > 0 &&      <div className=" w-full flex justify-center">
                    <div className="">

                <img src={topRank} className="h-[90px] mx-auto" />
                <p className=" fs-regular fw-regular opacity-50 py-2">No Ranked Members</p>
                    </div>
                </div> }

                <div className="relative  h-[10rem]">
                    <div className="container mx-auto px-5 xl:px-0">
                        <div className="grid grid-cols-12">
                            <div className="col-span-12 ml-0 xl:ml-6 relative h-[10rem]">
                                <div className="absolute left-0 features-slider-width">
                                    <OwlCarousel
                                        ref={topRankRef}
                                        className="owl-theme relative"

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


                                    {topRankMembers?.map((members , index)=>(

                                    <div key={index+3} className="item relative cursor-pointer text-center group">
                                            <div className="h-[112px]  w-[112px]  group-hover:opacity-100 opacity-50">
                                                <img
                                                    className="h-[112px]  w-[112px] rounded-full   object-cover group-hover:opacity-80 opacity-50 object-center"
                                                    src={members?.dp?.small?.url}
                                                    alt=""
                                                />
                                            </div>

                                    {/* <div className="hidden group-hover:block  text-center w-[110px] "> */}
                                            <p className="fw-regular text-center words-wrap hidden group-hover:block w-[110px] fs-regular ">
                                               {members?.full_name}
                                            </p>
                                            </div>
                                            // </div>
                                         ))}


                                    </OwlCarousel>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* experience*/}
            <section id="experience" className="pt-8 lg:pt-16">
                <div className="container mx-auto px-5 lg:px-3">
                    <div className="">
                        <div className="grid grid-cols-12">
                            <div className="col-span-12">
                                <div className="text-start mb-8">
                                    <h3>Immersive Learning Experience</h3>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-12 gap-x-4 lg:gap-x-6 gap-y-10 lg:gap-y-14">

                            {course?.experience?.map((exp , index)=>(
                            <div key={index+3} className="col-span-6 lg:col-span-6">
                                <div className="text-start">
                                    <span>
                                        <img src={checkCircle} className="w-5 md:w-[1.688rem] h-5 md:h-[1.688rem]" />
                                    </span>
                                    <h4 className="my-2 lg:my-5 fw-medium">
                                       {exp?.title}
                                    </h4>
                                    <p className="live-exprience-point">
                                        {exp?.description}
                                    </p>
                                </div>
                            </div>
                            ) )}



                        </div>
                    </div>
                </div>
            </section>
            {/* member who liked */}

            {similarCourses?.length > 0 &&
                <section id="session" className="pt-14 lg:pt-[6rem]">
                    <div className="container mx-auto px-5 lg:px-3">
                        <div className="">
                            <div className="grid grid-cols-3 mb-8">
                                <div className="col-span-12">
                                    <div className="text-start flex justify-between item-center">
                                        <h3 className="font-medium">
                                            Members who liked this course also liked
                                        </h3>
                                        <div className="hidden md:block">
                                            <div className="flex items-center gap-3">
                                                <div className="cursor-pointer" >
                                                    <svg onClick={() => handleSliderPrev(likedRef)}
                                                        width="32"
                                                        height="32"
                                                        viewBox="0 0 32 32"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <g clipPath="url(#clip0_724_31297)">
                                                            <path
                                                                opacity="0.4"
                                                                d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z"
                                                                fill="white"
                                                            />
                                                            <path
                                                                d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z"
                                                                stroke="black"
                                                                strokeWidth="1.2"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            />
                                                            <path
                                                                d="M11 16H21"
                                                                stroke="white"
                                                                strokeOpacity="0.6"
                                                                strokeWidth="1.2"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            />
                                                            <path
                                                                d="M15 12L11 16L15 20"
                                                                stroke="white"
                                                                strokeOpacity="0.6"
                                                                strokeWidth="1.2"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            />
                                                        </g>
                                                        <defs>
                                                            <clipPath id="clip0_724_31297">
                                                                <rect
                                                                    width="32"
                                                                    height="32"
                                                                    fill="white"
                                                                />
                                                            </clipPath>
                                                        </defs>
                                                    </svg>
                                                </div>
                                                <div className="cursor-pointer">
                                                    <svg onClick={() => handleSliderNext(likedRef)}
                                                        width="32"
                                                        height="32"
                                                        viewBox="0 0 32 32"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <g clipPath="url(#clip0_724_31291)">
                                                            <path
                                                                opacity="0.4"
                                                                d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z"
                                                                fill="white"
                                                            />
                                                            <path
                                                                d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z"
                                                                stroke="white"
                                                                strokeOpacity="0.6"
                                                                strokeWidth="1.2"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            />
                                                            <path
                                                                d="M11 16H21"
                                                                stroke="white"
                                                                strokeOpacity="0.6"
                                                                strokeWidth="1.2"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            />
                                                            <path
                                                                d="M17 12L21 16L17 20"
                                                                stroke="white"
                                                                strokeOpacity="0.6"
                                                                strokeWidth="1.2"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            />
                                                        </g>
                                                        <defs>
                                                            <clipPath id="clip0_724_31291">
                                                                <rect
                                                                    width="32"
                                                                    height="32"
                                                                    fill="white"
                                                                />
                                                            </clipPath>
                                                        </defs>
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative md:h-[300px]">
                        <div className="container mx-auto px-5 xl:px-0">
                            <div className="grid grid-cols-12">
                                {/* <div className="col-span-0 md:col-span-0 lg:col-span-1 xl:col-span-2 2xl:col-span-4 "></div> */}
                                <div className="col-span-12 relative md:h-[300px]">
                                    <div className="absolute left-0 features-slider-width">
                                        <OwlCarousel
                                            ref={likedRef}
                                            className="owl-theme relative"

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


                                            {similarCourses?.map((data, index) => (
                                                <div key={index + 1}>

                                                    <AcademySmallCard
                                                        className={'academy-small-card isSlider course-card'}
                                                        title={data?.title}
                                                        instructor={data?.default_instructor?.full_name}
                                                        duration={"5 hr 40 min"}
                                                        lessons={data?.lessons_count}
                                                        original_image={data?.thumbnail?.medium?.url}
                                                        medium_image={data?.thumbnail?.small?.url}
                                                        badge={"primary"}
                                                        badge_text={""}
                                                        live={false} />


                                                    {/* <CourseCard
                                                        title={data?.title}
                                                        instructor={data?.default_instructor?.full_name}
                                                        duration={"2 hr 13 min"}
                                                        lessons={7}
                                                        image={data?.thumbnail?.small?.url}
                                                        badge={"primary"}
                                                        badge_text={""}

                                                    /> */}
                                                </div>))}

                                            {/* <CourseCard
                                            title={"Taking Care of Your Voice"}
                                            instructor={"Christina Aguilera"}
                                            duration={"2 hr 13 min"}
                                            lessons={7}
                                            image={art4}
                                            badge={"primary"}
                                            badge_text={""}
                                        />
  */}
                                        </OwlCarousel>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>}
            {/* faq's */}
            <section className="pt-[4rem] mt-[10rem] lg:mt-8">
                <div className="container mx-auto px-5 xl:px-0">
                    <div className="max-w-2xl mx-auto">
                        <div className="grid grid-col-12">
                            <div className="col-span-12">
                                <h3 className="mb-8 text-center">
                                    Frequently asked question
                                </h3>
                            </div>
                        </div>
                        <div className="grid grid-cols-12 gap-y-2">
                            {course?.faqs?.map((data, index) => (
                                <div key={index + 1} className="col-span-12">
                                    <div
                                        className={`${activeIndex !== null && activeIndex === index
                                            ? "textarea-bg"
                                            : "intrestcheck"
                                            } pt-4 pb-5 px-4  border-[1px] border-[#ffffff1a] border-rounded-10 `}

                                    >
                                        <div className="flex items-center gap-4 h-auto">
                                            <img
                                                onClick={() => handleAccordionClick(index)}

                                                className={`w-6 h-6 cursor-pointer transition-all duration-300 transform ${activeIndex !== null && activeIndex === index ? "r 5" : ""
                                                    }`}
                                                src={activeIndex !== null && activeIndex === index ? cross : faqplus}
                                                alt=""
                                            />
                                            <p>{data?.question}</p>
                                        </div>
                                        {activeIndex === index && (
                                            <motion.div
                                            initial={{  y: 50 }}
                                            animate={{   y: 0 }}>
                                            <div className="ml-10 opacity-60 h-auto mt-4" data-aos="fade-in" data-aos-delay="100" data-aos-easing="ease" data-aos-duration="300">
                                                <p className="fs-small mb-5">{data?.answer}</p>
                                            </div>
                                            </motion.div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

Course.layout = (page) => <Layout children={page} title="" />;
export default Course;
