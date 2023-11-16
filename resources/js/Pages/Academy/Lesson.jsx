import React, { useState, useEffect, useRef } from "react";

import { useForm, usePage } from "@inertiajs/react";
import { Link } from "@inertiajs/react";
import profilepic from "../../../assets/img/profilepic.png";
// import coursemain from "../../../assets/img/coursemain.jpg";
import Button from "../../Components/Button";
import dissProfile from "../../../assets/img/discussion-profile-pic.jpg";
import dissProfile2 from "../../../assets/img/DissProfilePic2.jpg";
import Lock from "../../../assets/svg/Lock.svg";
import { ReactComponent as ShareFat } from "../../../assets/svg/ShareFat.svg";
import { ReactComponent as Notebook } from "../../../assets/svg/Notebook.svg";
import { ReactComponent as Chats } from "../../../assets/svg/Chats.svg";
import { ReactComponent as BookMark } from "../../../assets/svg/Bookmark.svg";
import { ReactComponent as Export } from "../../../assets/svg/Export.svg";
import { ReactComponent as Check } from "../../../assets/svg/Check.svg";
import Notes from "./Notes";
import SessionLayout from "@/Layouts/SessionLayout";
import AOS from 'aos';
import 'aos/dist/aos.css';
import OwlCarousel from "react-owl-carousel";
import { ReactComponent as ArrowRight } from "../../../assets/svg/ArrowRight.svg";
import { ReactComponent as ArrowLeft } from "../../../assets/svg/ArrowLeft.svg";
import ShareModal from "@/Components/Modal/ShareModal";
import IconButton from "@/Components/IconButton";
import axios from "axios";
import RatingModal from "@/Components/Modal/RatingModal";
import VimeoVideoPlayer from "@/Components/VimeoVideoPlayer";
// import Layout from '@/Layouts/Layout'

const Lesson = ({ course, lesson, takeReview }) => {

    // console.log("takeReview", takeReview);
    useEffect(() => {
        AOS.init();
    }, [])

    // footer lesson slider

    const catRef = useRef(null);

    const handleSliderNext = (ref) => {
        ref.current.next();
    };

    const handleSliderPrev = (ref) => {
        ref.current.prev();
    };


    // const handleChangeLesson = async (id) => {
    //     try {
    //         const response = await axios.get(route("lessons.play",id));
    //         setSingleUserMessages(response.data?.payload?.data)
    //         console.log("Lesson change successfully:", response.data?.payload );
    //     } catch (error) {
    //         console.error("Error while changing lesson   :", error);
    //     }
    // };




    // const { auth } = usePage().props;
    // console.log(' props lesson  ****************......:'  , lesson)
    // console.log("course");
    // console.log(course);

    const [currentLessonIndex, setCurrentLessonIndex] = useState(-1);
    const [currentLessonNotes, setCurrentLessonNotes] = useState({});

    const getLastUnlockedVideoUrl = () => {
        const unlockedLessons = course?.lessons?.filter(
            (lesson) => !lesson.locked
        );

        const lastUnlockedLesson = unlockedLessons[unlockedLessons.length - 1];
        return lastUnlockedLesson?.vimeo_url || "";
    };

    const [nowPlaying, setNowPlaying] = useState(lesson?.vimeo_url);
    const [currentVideoId, setCurrentVideoId] = useState(null);
    const [currentVideoIndex, setCurrentVideoIndex] = useState(null);
    // console.log('current Video Index   ********', currentVideoIndex)
    useEffect(() => {
        const lastUnlockedVideoUrl = getLastUnlockedVideoUrl();
        // setNowPlaying(lastUnlockedVideoUrl);

        const lastUnlockedLessonIndex = course?.lessons?.findIndex(
            (lesson) => lesson.vimeo_url === lastUnlockedVideoUrl
        );
        if (lastUnlockedLessonIndex !== -1) {
            setCurrentVideoId(course.lessons[lastUnlockedLessonIndex].id);
            setCurrentVideoIndex(lastUnlockedLessonIndex);
        }
    }, []);

    const handleLessonClick = (lesson, index) => {
        if (!lesson.locked) {
            // setNowPlaying(lesson.vimeo_url);
            setCurrentVideoId(lesson.id);
            setCurrentVideoIndex(index);
        }
    };

    // console.log("currentVideoId ....", currentVideoId);

    // console.log("currentVideoIndex...", currentVideoIndex);

    const { post , processing } = useForm();
    const handleBookmarkToggle = () => {
        console.log("boookmark id ....:", lesson?.id);
   let timeOut=  setTimeout(()=>{
        post(route("bookmark-toggle.lessons", lesson?.id), {
            preserveScroll: true,
        });
clearTimeout(timeOut)
    },2000)

    };

    const [show, setShow] = useState(false);

    const [isTopShadowVisible, setIsTopShadowVisible] = useState(false);
    const [isBottomShadowVisible, setIsBottomShadowVisible] = useState(false);

    const handleScroll = (event) => {

        const { scrollTop, scrollHeight, clientHeight } = event.target;
        // console.log("scroll top is ...:", clientHeight);

        setIsTopShadowVisible(scrollTop);
        setIsBottomShadowVisible(scrollTop + clientHeight < scrollHeight);

    };

    // console.log('shadow is .....:', isTopShadowVisible)

    const handleRoute = (id) => {
        post(route("instructors.show", id));
    };
    // console.log('********course.....:', course?.lessons[currentVideoIndex]?.completed)

 
 

      const regex = /vimeo\.com\/video\/(\d+)/;
      const match = lesson?.vimeo_url.match(regex);
      const vimeoVideoId = match ? match[1] : null;


console.log('vimeo link id : ' , vimeoVideoId)

    return (
        <div className="">
            <section className="pt-[8rem] pb-[3rem] ">
                <div data-aos="fade-in" data-aos-delay="100" data-aos-easing="ease" data-aos-duration="300" className="container mx-auto px-5 xl:px-0">
                    <div className="grid grid-cols-12">
                        <div className="col-span-12">

                            <div className="lg:flex items-center  lg:justify-between   gap-y-2">
                                <h1 className="uppercase mb-2">
                                    {course?.title}
                                </h1>
                                <div className=" flex justify-end w-full lg:w-[40%]">
                                    {lesson?.completed ?
                                        <>
                                            <Link href={route("lessons.complete",lesson?.id)}  >
                                                <Button

                                                    className={
                                                        "secondary   uppercase mx-2 "
                                                    }
                                                >
                                                    {/* <div className="h-7 w-7 left-[4.5rem] -top-3  rounded-full backdrop-blur-xl bg-[#202020] mark-shadow-light   absolute -z-[9999] "></div> */}
                                                    Retake Quiz
                                                </Button>
                                            </Link>
                                            {/* <Button
                                            icon={<Check />}
                                            className={
                                                "secondary noise-10 uppercase "
                                            }
                                        >
                                            <div className="h-7 w-7 left-[4.5rem] -top-3  rounded-full backdrop-blur-xl bg-[#202020] mark-shadow-light   absolute -z-[9999] "></div>
                                            Mark as Complete
                                        </Button> */}

                                        </>
                                        :

                                        <Link
                                            href={route(
                                                "lessons.complete",
                                                lesson?.id
                                            )}
                                        >
                                            <Button
                                                // icon={<Check />}
                                                className={
                                                    "secondary   uppercase "
                                                }
                                            >
                                                {/* <div className="h-7 w-7 left-[4.5rem] -top-3  rounded-full backdrop-blur-xl bg-[#202020] mark-shadow-light   absolute -z-[9999] "></div> */}
                                                Mark as Complete
                                            </Button>
                                        </Link>

                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-12 gap-y-2 md:gap-y-8 lg:gap-x-6 mt-6">
                        <div className="col-span-12 lg:col-span-8">
                            <div className="flex items-center justify-between mb-7 gap-x-6 gap-y-6 flex-wrap">
                                <div className="z-[99]">
                                    <Link
                                        href={route(
                                            "instructors.show",
                                            course?.default_instructor?.id
                                        )}
                                    >

                                        <div className="cursor-pointer z-[99999999] flex items-center gap-4">
                                            <img
                                                className="w-14 h-14 rounded-full object-cover object-center"
                                                src={course?.default_instructor?.dp ?.small?.url}
                                                alt=""
                                            />
                                            <div>
                                                <h4>
                                                    {course?.default_instructor?.full_name}
                                                </h4>
                                                <p className="text-[#9E9E9E]">
                                                    {course?.default_instructor?.category?.name }
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                                <RatingModal course_id={course?.id} openModal={takeReview} />
                                <div className="flex items-center gap-4">
                                    <div onClick={handleBookmarkToggle}>
                                        <IconButton
                                        disabled={processing}
                                            icon={<BookMark />}
                                            className={` ${lesson?.bookmarked
                                                ? "primary"
                                                : "secondary"
                                                }   icon_button `}
                                        ></IconButton>
                                    </div>
                                    <Link href={route('courses.preview', { course: course?.id, byPass: 'false' })}>
                                    <IconButton
                                            icon={<ShareFat />}
                                            className={` secondary   icon_button `}
                                        ></IconButton>
                                    </Link>

                                </div>
                            </div>
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
                                <div className="codegena">
                                <VimeoVideoPlayer videoId={vimeoVideoId} lesson_id={lesson?.id} />
                                    {/* <iframe
                                        width="500px"
                                        height="294px"
                                        src={nowPlaying}
                                    ></iframe> */}
                                </div>
                                {/* <div className="h-[9rem] w-[9rem]">
                                <video id="player" playsinline controls data-poster="/path/to/poster.jpg">
                                    <source src="/path/to/video.mp4" type="video/mp4" />
                                    <source src="/path/to/video.webm" type="video/webm" />


                                    <track kind="captions" label="English captions" src="/path/to/captions.vtt" srclang="en" default />
                                </video>
                            </div> */}
                            </div>
                            <div className="text-start mt-8">
                                <p className="fs-large fw-regular">
                                    {course?.summery.length > 210
                                        ? course?.summery?.substring(0, 210) +
                                        "..."
                                        : course?.summery}
                                </p>
                            </div>
                        </div>
                        <div className="col-span-12 lg:col-span-4">
                            <div className="flex items-center gap-3 mt-1 mb-8 justify-end">
                                <div
                                    onClick={() => {
                                        setShow(!show);
                                    }}
                                >
                                    <Button
                                        // icon={<Notebook />}
                                        className={` ${show ? "primary" : " secondary "
                                            } px-3 md:px-0  `}
                                    >
                                        Notes
                                    </Button>
                                </div>
                                <div>
                                    <Link
                                        href={route('courses.discussion', course?.id)}
                                    >

                                        <Button
                                            // icon={<Chats />}
                                            className={` ${show === 1  ? "primary"  : " secondary "  } px-3 md:px-0  `}
                                        >
                                            Discussion
                                        </Button>
                                    </Link>
                                </div>
                            </div>

                            {/*Notes component*/}

                            <div
                                className={`notes-container ${show ? "show" : ""
                                    }`}
                            >
                                {show && (
                                    <div>
                                        <Notes
                                        course={course?.lessons}
                                        lesson={lesson}
                                        currentVideoIndex={currentVideoIndex}
                                        currentVideoId={currentVideoId}
                                        />
                                    </div>
                                )}
                            </div>

                            <div
                                className={`notes-container ${!show ? "show" : ""
                                    }`}
                            >
                                {!show && (
                                    <div className="relative h-[570px]">
                                        {/*shadow top*/}
                                        <div
                                            className={`lessons-shadow top absolute ${isTopShadowVisible < 100 && "none" } `} ></div>
                                        <div className={"relative overflow-y-auto h-[36rem]  xl:h-[30rem] lg:h-[23rem] 2xl:h-[36rem]"  }
                                            onScroll={handleScroll}
                                        >
                                            {course?.lessons?.map((data, index) => (
                                                 <Link href={ !data?.locked && route('lessons.play',data?.id )}>
                                                    <div key={index + 1}
                                                        onClick={() => {!data?.locked && handleLessonClick(data,index); setCurrentLessonIndex(index)}}
                                                        className={` ${data?.locked && "opacity-50" }  ${lesson?.id == data?.id && 'noise-10 bg-[#ffffff20]'} border-rounded-10 cursor-pointer mb-4`}  >
                                                        <div className="flex items-center gap-4">
                                                            <div className="relative">
                                                                <img  src={data?.thumbnail?.small?.url }
                                                                    className=" border-rounded-10 h-[86px] md:h-[162px] lg:h-[86px] min-w-[150px]  max-w-[150px] md:max-w-[281px] lg:max-w-[149px]  object-cover object-center"
                                                                    alt=""
                                                                />
                                                                <span className="absolute right-1 bottom-1 bg-[#000000] rounded-3xl px-2 py-1 text-[10px] text-[#FFFFFF] font-normal">
                                                                    11:45
                                                                </span>
                                                                {data?.locked ? (
                                                                    <img  className="absolute left-1 bottom-1"
                                                                        src={Lock}  alt=""  />
                                                                ) : (
                                                                    <svg
                                                                        className="w-6 h-6 absolute left-1 bottom-2"
                                                                        width="25"
                                                                        height="24"
                                                                        viewBox="0 0 25 24"
                                                                        fill="none"
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                    >
                                                                        <g
                                                                            opacity="0.6"
                                                                            clipPath="url(#clip0_1107_69303)"
                                                                        >
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
                                                                            <clipPath id="clip0_1107_69303">
                                                                                <rect
                                                                                    width="24"
                                                                                    height="24"
                                                                                    fill="white"
                                                                                    transform="translate(0.5)"
                                                                                />
                                                                            </clipPath>
                                                                        </defs>
                                                                    </svg>
                                                                )}
                                                            </div>
                                                            <div>
                                                                <p className="text-[16px] md:text-[32px] lg:text-[20px] font-medium ">
                                                                    {index + 1}.
                                                                    { data  ?.title  }
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    </Link>
                                                )
                                            )}
                                        </div>
                                        {/*shadow bottom*/}
                                        <div
                                            className={` ${isTopShadowVisible > 460 &&
                                                "none"
                                                }  z-50 lessons-shadow bottom -mt-[50px]  `}
                                        ></div>
                                    </div>
                                )}
                            </div>
                            <div className=" mt-2 md:mt-8 mb-14 md:mb-0 flex items-center justify-between">

                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/*footer lessons*/}

            <section className={"lesson-footer  mt-5"}>
                {/* <div className="grid grid-cols-12">
                    <div className="col-span-12"> */}
                        <div className="flex relative">
                            <div onClick={() => { handleSliderPrev(catRef) }} className=" cursor-pointer hidden lg:block  ">
                                <IconButton
                                    className={"secondary  "}
                                    icon={<ArrowLeft />}
                                ></IconButton>
                            </div>
                            <div className="w-[100%] lg:w-[93%]    mx-auto relative ">
                                <OwlCarousel
                                    ref={catRef}
                                    className="owl-theme relative"
                                    margin={0}
                                    autoWidth={true}
                                    animateIn={"fadeIn"}
                                    animateOut={"fadeOut"}
                                    nav={false}
                                    dots={false}
                                >

                                    {course?.lessons?.map((item, index) => (
                                        <div key={index+4}>
                                           {/* <Link href={ !item?.locked && route('lessons.play',item?.id )}> */}
                                        <button className={` ${lesson?.id == item?.id ? 'bg-white' : 'bg-[#1A1A1A]'} border-x border-[#303030] h-[40px] w-[100px] md:w-[150px]  lg:w-[400px]  px-4 flex items-center justify-center `}>
                                            <p className={` ${lesson?.id == item?.id  ? 'text-[#000000] ' : 'text-[#fff] '}   fw-medium fs-tiny`}>
                                                Lesson {index + 1}
                                            </p>
                                        </button>
                                       {/* </Link> */}
                                        </div>
                                    ))}


                                </OwlCarousel>
                            </div>

                            <div onClick={() => { handleSliderNext(catRef) }} className="cursor-pointer hidden lg:block  ">
                                <IconButton
                                    className={"secondary  "}
                                    icon={<ArrowRight />}
                                ></IconButton>
                            </div>
                        </div>

            </section>
        </div>
    );
};
Lesson.layout = (page) => <SessionLayout children={page} title="" />;
export default Lesson;
