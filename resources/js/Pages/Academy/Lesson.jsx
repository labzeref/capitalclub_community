import React, { useState, useEffect, useRef, lazy } from "react";

import { Head, useForm, usePage } from "@inertiajs/react";
import { Link } from "@inertiajs/react";
import profilepic from "../../../assets/img/profilepic.png";
// import coursemain from "../../../assets/img/coursemain.jpg";
import Button from "../../Components/Button";
import dissProfile from "../../../assets/img/discussion-profile-pic.jpg";
import dissProfile2 from "../../../assets/img/DissProfilePic2.jpg";
import Lock from "../../../assets/svg/Lock.svg";
import closeStudyMood from "../../../assets/img/close-study-mood.png";
import { ReactComponent as ShareFat } from "../../../assets/svg/ShareFat.svg";
import { ReactComponent as Notebook } from "../../../assets/svg/Notebook.svg";
import { ReactComponent as Chats } from "../../../assets/svg/Chats.svg";
import { ReactComponent as BookMark } from "../../../assets/svg/Bookmark.svg";
import { ReactComponent as Star } from "../../../assets/svg/star.svg";
import { ReactComponent as FillStar } from "../../../assets/svg/fillStar.svg";
import Notes from "./Notes";
import SessionLayout from "@/Layouts/SessionLayout";
import AOS from 'aos';
import 'aos/dist/aos.css';
import OwlCarousel from "react-owl-carousel";
import { ReactComponent as ArrowRight } from "../../../assets/svg/ArrowRight.svg";
import { ReactComponent as ArrowLeft } from "../../../assets/svg/ArrowLeft.svg";
import ShareModal from "@/Components/Modal/ShareModal";
import IconButton from "@/Components/IconButton";
import { AnimatePresence, motion, useDragControls } from "framer-motion"
// import CC_LOTTIE from "@/Components/CC_LOTTIE.json";  
import CC_LOTTIE from "@/Components/CC_LOTTIE_V01.json"; 




import axios from "axios";
import RatingModal from "@/Components/Modal/RatingModal";
const VimeoVideoPlayer = lazy(() => import('@/Components/VimeoVideoPlayer'));
import logo from "../../../assets/logo.svg";
import Layout from "@/Layouts/Layout";
import Resources from "@/Components/Modal/Resources";
// import Layout from '@/Layouts/Layout'
import { PostsContext } from '../../Store/PostsProvider';
import { useContext } from "react";
import AcademyButton from "@/Components/AcademyButton";
import Lottie from "react-lottie-player";
import { Suspense } from "react";
import Xmark from "@/Components/Xmark";
import LessonLayout from "@/Layouts/LessonLayout";
const Lesson = ({ course, lesson, takeReview, modules, showGuestName }) => {
    const controls = useDragControls()
    // console.log('course')
    // console.log(course)
    // console.log('modules', modules)
    const { toggleStudyMode, setCourseId, setStudyMoodOn, studyMoodOn, isPlayPage, setIsPlayPage } = useContext(PostsContext);


    // console.log('current lesson', lesson)


    const [openStudyNotes, setOpenStudyNotes] = useState(false)

    useEffect(() => {
        AOS.init();

    }, [])

    const getLastUnlockedVideoUrl = () => {
        const unlockedLessons = course?.lessons?.filter(
            (lesson) => !lesson.locked
        );

        const lastUnlockedLesson = unlockedLessons[unlockedLessons.length - 1];
        return lastUnlockedLesson?.vimeo_url || "";
    };


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
        setCourseId(route('courses.preview', { course: course.id, byPass: 'false' }))
    }, []);

    const handleLessonClick = (lesson, index) => {
        if (!lesson.locked) {
            // setNowPlaying(lesson.vimeo_url);
            setCurrentVideoId(lesson.id);
            setCurrentVideoIndex(index);
        }
    };



    const [lessonBookmark, setLessonBookmark] = useState(lesson?.bookmarked)
    const { post, processing } = useForm();
    const handleBookmarkToggle = () => {
        setLessonBookmark(!lessonBookmark)
        axios.post(route("bookmark-toggle.lessons", lesson?.id)).then(() => {
        });

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

    const lessonContainerRef = useRef(null);
    const lessonHeight = 100; // Adjust this based on your actual content
    const currentLessonId = lesson?.id;

    useEffect(() => {
        if (lessonContainerRef.current) {
            const currentLessonIndex = course?.lessons.findIndex(lesson => lesson.id === currentLessonId);

            if (currentLessonIndex !== -1) {
                const scrollToPosition = currentLessonIndex * lessonHeight;
                lessonContainerRef.current.scrollTop = scrollToPosition;
            }
        }
    }, [currentLessonId]);


    const [isOpen, setIsOpen] = useState(false);

    const [currentModuleID, setcurrentModuleID] = useState(
        modules.findIndex(module => module.id === lesson?.module?.id)
    );

    const [selectedIndex, setSelectedIndex] = useState(
        modules.findIndex(module => module.id === lesson?.module?.id)
    );

    // ****handle modules****

    const [selectedModuleId, setSelectedModuleId] = useState(lesson?.module?.id);
    const [filteredLesson, setFilteredLesson] = useState([]);
    const [liberaryShow, setLiberaryShow] = useState(false);
    const [isFading, setIsFading] = useState(false);


    useEffect(() => {

        setIsFading(true);
        setTimeout(() => {
            const filterdLessonModule = course?.lessons?.filter((lesson) => lesson?.module?.id == selectedModuleId)
            setFilteredLesson(filterdLessonModule)

            setIsFading(false);
        }, 500);

    }, [selectedModuleId])




    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])






    const [showTopShadow, setShowTopShadow] = useState(false);
    const [showBottomShadow, setShowBottomShadow] = useState(true);

    const handleScrollModules = (event) => {
        const { scrollTop, scrollHeight, clientHeight } = event.target;

        // Calculate the remaining space at the top and bottom
        const remainingTopSpace = scrollTop;
        const remainingBottomSpace = scrollHeight - scrollTop - clientHeight;

        // Set the state to show/hide the top and bottom shadows based on the remaining space
        setShowTopShadow(remainingTopSpace >= 5);
        setShowBottomShadow(remainingBottomSpace >= 5);
    };

    const [lottieDelayAnimation, setLottieDelayAnimation] = useState(false);

    const lottieFunciton = () => {


        setTimeout(() => {
            setIsPlayPage(false)
        }, 800);

        setLottieDelayAnimation(true)
    }

    const [videoReady, setVideoReady] = useState(false);


    const handleContextMenu = (e) => {
        e.preventDefault(); 
      };
 

    return (
        <>
            <Head>
                <title>{lesson?.title}</title>
            </Head>

            <div className={studyMoodOn && 'w-full fixed top-20'}>
                <div style={
                    studyMoodOn ?
                        { opacity: 1, top: 0, left: 0, background: '#0D0D0D', position: 'fixed', width: '100vw', height: '100vh', zIndex: '1100', transition: 'opacity 0.5s ease-in-out' }
                        :
                        { opacity: 0, top: 0, left: 0, background: '#0D0D0D', position: 'fixed', width: '100vw', height: '100vh', zIndex: '1100', transition: 'opacity 0.5s ease-in-out', pointerEvents: 'none' }
                }></div>


                <div className={`show-with-events ${!isPlayPage && 'hide-no-events'}`} style={
                    { top: 0, left: 0, background: '#0D0D0D', position: 'fixed', width: '100vw', height: '100vh', zIndex: '1100' }}>
                    <div className={lottieDelayAnimation && 'payment-video-div'}>
                        <Lottie
                            loop={false}
                            animationData={CC_LOTTIE}
                            play
                            height='100px'
                            className='play-page-animation'
                            onComplete={lottieFunciton}
                        />
                    </div>
                </div>

                <AnimatePresence>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <section className="relative z-10">
                            <div className="container lg:px-3 mx-auto px-4 min-h-[91vh] md:min-h-[66vh] ">
                                {/* <div className="grid grid-cols-12">
                            <div className="col-span-12">

                                <div className="lg:flex items-center  lg:justify-between   gap-y-2">
                                    <h1 className=" test-vw uppercase mb-2 md:w-[70%]">
                                        {course?.title}
                                    </h1>

                                    <div className="hidden lg:block">
                                        <div className=" flex justify-end w-full lg:w-[50%]"></div>
                                        {lesson?.completed ?
                                            <>
                                                <Link href={route("lessons.complete", lesson?.id)}  >
                                                    <Button className={"secondary uppercase mx-2"}>
                                                        RE-WATCH LESSON
                                                    </Button>
                                                </Link>
                                            </>
                                            :
                                            <Link href={route("lessons.complete", lesson?.id)}>
                                                <Button className={"secondary uppercase "}>
                                                {course?.strict ? 'Mark as Complete' : 'Next Lesson' }
                                                </Button>
                                            </Link>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div> */}
                                {/* <div className="grid grid-cols-12 gap-y-5  lg:gap-x-4  sticky top-2 lg:top-[5.5rem] z-[99] bg-[#0d0d0d] pb-[6.5px] "> */}
                                <div className="grid grid-cols-12 gap-y-[13px]  lg:gap-x-4   z-[99] bg-[#0d0d0d] items-center">

                                    {/* **********LESSON VIDEO ********** */}

                                    <div onContextMenu={handleContextMenu} className="col-span-12 lg:col-span-9">
                                        <div className="flex items-center justify-between mb-4 md:mb-7 gap-x-6 gap-y-6 hidden">
                                            <div className="z-[99]">
                                                {/* <Link  href={route(  "instructors.show",  course?.default_instructor?.id   )}   > */}

                                                <div className="cursor-pointer z-[9999] flex items-center gap-4">
                                                    <img
                                                        className="w-14 h-14 rounded-full object-cover object-center"
                                                        src={course?.default_instructor?.dp?.small?.url}
                                                        alt=""
                                                    />
                                                    <div>
                                                        <h4>
                                                            {course?.default_instructor?.full_name}
                                                        </h4>
                                                        <p className="text-[#9E9E9E]">
                                                            {course?.default_instructor?.category?.name}
                                                        </p>
                                                    </div>
                                                </div>
                                                {/* </Link> */}
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
                                                <Link href={route('courses.preview', { course: course?.id })}>
                                                    <IconButton
                                                        icon={<ShareFat />}
                                                        className={` secondary   icon_button `}
                                                    ></IconButton>
                                                </Link>

                                            </div>
                                        </div>
                                        <div className={`${studyMoodOn && ' z-[1200] '} relative `}>
                                            {studyMoodOn &&
                                                <button onClick={() => { setStudyMoodOn(false); toggleStudyMode() }} className="absolute left-0 top-0 -mt-[50px] flex items-center gap-x-2">
                                                    <Xmark />
                                                    <p className=" pt-1 fw-bold">Study Mode</p>
                                                </button>
                                            }

                                            <div className="iframe-container text-start mt-[0.2%] ">
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

                                                <div className={'codegena'}>

                                                    {lesson.vimeo_url ?
                                                        <>

                                                            <Suspense >
                                                                <VimeoVideoPlayer videoId={lesson?.vimeo_url} lesson_id={lesson?.id} setVideoReady={setVideoReady} />
                                                            </Suspense>

                                                            {!videoReady &&
                                                                <img src={lesson?.thumbnail?.original?.url} className="absolute w-full h-full border-rounded-10" />
                                                            }
                                                        </>
                                                        :
                                                        <div className=" absolute top-[40%] fw-bold fs-x-large w-full flex justify-center items-center ">coming soon...</div>
                                                    }


                                                    <div>
                                                        <div className={`h-full study-mode-on-notes  ${(openStudyNotes) && 'active'} ${!studyMoodOn && 'hidden'} `}>
                                                            <div className={'h-full relative'} style={{ width: '440px' }}>

                                                                <Notes
                                                                    openStudyNotes={openStudyNotes}
                                                                    setOpenStudyNotes={setOpenStudyNotes}
                                                                    setShow={setShow}
                                                                    course={course?.lessons}
                                                                    lesson={lesson}
                                                                    currentVideoIndex={currentVideoIndex}
                                                                    currentVideoId={currentVideoId}
                                                                    hideCloseButton={true}
                                                                />

                                                            </div>
                                                        </div>
                                                    </div>


                                                </div>

                                            </div>

                                        </div>


                                    </div>
                                    {/* **********LESSON NOTES ********** */}
                                    <div className={`col-span-3 lg:col-span-3 hidden-sm ${studyMoodOn && 'z-[1200]'} relative `}>
                                        <div className={`h-full`}>
                                            {/* {show && ( */}

                                            {/*<motion.div*/}
                                            {/* drag*/}
                                            {/* dragListener={studyMoodOn}*/}
                                            {/* dragControls={controls}*/}
                                            {/* dragConstraints={calculateBoundries()}*/}
                                            {/* dragElastic={0}*/}
                                            {/*>*/}
                                            <Notes
                                                StudyNotes={false}
                                                setShow={setShow}
                                                course={course?.lessons}
                                                lesson={lesson}
                                                currentVideoIndex={currentVideoIndex}
                                                currentVideoId={currentVideoId}
                                                hideCloseButton={true}
                                            />

                                            {/* )} */}
                                            {/*</motion.div>*/}
                                        </div>
                                    </div>



                                    <div onContextMenu={handleContextMenu} className="col-span-6  flex items-center">
                                        <div className="flex justify-between items-center md:items-center">
                                            <div className="text-start">
                                                <p className="lesson-text fw-medium">
                                                    {lesson?.title}
                                                </p>
                                                {showGuestName ? <p className={` leasson-description `}>GUEST : {lesson?.guest_name}</p>
                                                    :
                                                    <p className={` leasson-description `}>MODULE {lesson?.module?.serial_number}: {lesson?.module?.name}</p>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div onContextMenu={handleContextMenu} className="col-span-6 hidden-sm">
                                        <div className="flex  gap-x-4 gap-y-2 items-center justify-end">
                                            {lesson?.resources_link &&
                                                <div className={` w-[24%] `}>
                                                    <Resources files={lesson?.resources_link} lesson_name={lesson.title} />
                                                </div>
                                            }
                                            <button onClick={handleBookmarkToggle} className="academy-icon-button h-30 lesson-btn-p secondary w-[24%]">
                                                <div className="button_container lesson-btn-p">FAVORITE
                                                    {lessonBookmark
                                                        ? <svg width="12" height="12" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <g clip-path="url(#clip0_9001_21340)">
                                                                <path d="M6.39721 6.29981L8.5004 1.9004L11.3047 6.29981L15.511 7.03305L12.0057 10.6992L12.7068 15.8319L8.5004 13.6322L4.29402 15.8319L4.99508 10.6992L1.48976 6.29981H6.39721Z" fill="white" />
                                                                <path d="M16.0963 5.68976L11.2894 5.25348L9.41227 0.631041C9.07459 -0.210347 7.92251 -0.210347 7.58483 0.631041L5.70773 5.26387L0.910698 5.68976C0.0367052 5.76247 -0.320838 6.9051 0.344589 7.50757L3.98954 10.8108L2.89705 15.7137C2.69841 16.607 3.62206 17.3134 4.37687 16.8356L8.49855 14.2387L12.6202 16.8459C13.375 17.3238 14.2987 16.6174 14.1 15.7241L13.0076 10.8108L16.6525 7.50757C17.3179 6.9051 16.9703 5.76247 16.0963 5.68976ZM8.49855 12.2962L4.76421 14.6542L5.75739 10.2083L2.46005 7.21672L6.81015 6.82199L8.49855 2.63583L10.1969 6.83238L14.547 7.22711L11.2496 10.2187L12.2428 14.6646L8.49855 12.2962Z" fill="white" />
                                                            </g>
                                                            <defs>
                                                                <clipPath id="clip0_9001_21340">
                                                                    <rect width="17" height="17" fill="white" />
                                                                </clipPath>
                                                            </defs>
                                                        </svg>

                                                        : <svg width="12" height="12" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M9.46187 3.42177L6.63854 3.17677L5.53604 0.580938C5.3377 0.108438 4.66104 0.108438 4.4627 0.580938L3.3602 3.1826L0.542704 3.42177C0.029371 3.4626 -0.180629 4.10427 0.210204 4.4426L2.35104 6.2976L1.70937 9.05094C1.5927 9.5526 2.1352 9.94927 2.57854 9.68094L4.99937 8.2226L7.4202 9.68677C7.86354 9.9551 8.40604 9.55844 8.28937 9.05677L7.64771 6.2976L9.78854 4.4426C10.1794 4.10427 9.9752 3.4626 9.46187 3.42177ZM4.99937 7.13177L2.80604 8.45594L3.38937 5.95927L1.4527 4.27927L4.0077 4.0576L4.99937 1.70677L5.99687 4.06344L8.55187 4.2851L6.6152 5.9651L7.19854 8.46177L4.99937 7.13177Z" fill="white" />
                                                        </svg>

                                                    }
                                                </div>
                                            </button>

                                            <Link className="w-[24%]" href={route("lessons.complete", lesson?.id)}>
                                                <AcademyButton className={" secondary uppercase lg:w-full border-rounded-10"}>
                                                    {course?.strict ? 'Mark as Complete' : 'Next Lesson'}
                                                </AcademyButton>
                                            </Link>

                                            <div className="w-[24%]">
                                                <AcademyButton onClick={() => { setStudyMoodOn(true); toggleStudyMode() }} className={" secondary uppercase w-full border-rounded-10"}>
                                                    STUDY MODE
                                                </AcademyButton>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-6 md-d-none lg-d-none">
                                        <div className="flex items-center justify-end gap-x-2">
                                            <div className="">
                                                <IconButton
                                                    onClick={handleBookmarkToggle}
                                                    disabled={processing}
                                                    icon={<Star />}
                                                    className={` ${lessonBookmark ? 'primary' : 'secondary '}     icon_button`}
                                                ></IconButton>
                                            </div>
                                            <Link href={route("lessons.complete", lesson?.id)}>
                                                <button className="  academy-icon-button secondary w-full h-30 pt-[2.5px]">
                                                    <div className="button_container uppercase whitespace-nowrap">Next Lesson
                                                    </div>
                                                </button>
                                            </Link>
                                        </div>

                                    </div>


                                </div>
                                {/* **************LESSON TITLE AND BUTTONS********* */}

                                <div  className="grid grid-cols-12  gap-y-2 md:gap-y-5 lg:gap-x-4 mt-[18px] lg:mt-3   mb-0 md:mb-0 lg:mb-6">



                                    <div onContextMenu={handleContextMenu} className="col-span-12 lg:col-span-6 hidden-sm">
                                        <div className="card-bg  input-shadow border-rounded-10 about-padding-outer">
                                            <p className="course-about-heading w-full  mb-4">ABOUT THE PROGRAM</p>
                                            <div className="relative  card-bg-discord border-rounded-10 px-3 md:px-5 padding-about w-full">
                                                <div className="lg:flex gap-x-2 md:gap-x-1 lg:gap-x-8 xl:gap-x-0 w-full flex-col">
                                                    <div className="flex items-center gap-x-[19px] mb-4 w-full lg:w-[100%]">
                                                        <p className="course-about-description  ">Modules: {modules?.length < 1  ? 1 : modules?.length }</p>
                                                        <p className="course-about-description">Lessons: {course?.lessons?.length}</p>
                                                        <p className="course-about-description">Duration: {courseDuration(course?.duration)}hrs </p>
                                                    </div>
                                                    <p className={`   text-12 fw-regular md-d-none sm-d-none `}> {course?.summery}  </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-span-12 lg:col-span-6">

                                        <div className="flex items-center gap-3 mb-3.5 lg:mb-0 md:justify-end ">
                                            {/****Mobile***/}
                                            {lesson?.resources_link &&
                                                <div className={`    w-full hidden-lg `}>
                                                    <Resources files={lesson?.resources_link} lesson_name={lesson.title} />
                                                </div>
                                            }
                                            <div className="hidden-lg w-full">
                                                <div onClick={() => { setShow(!show); }} className="w-full"  >
                                                    <AcademyButton
                                                        className={` ${show ? "secondary" : " secondary "} border-rounded-10 px-3 md:px-0 w-full `}  >
                                                        {show ? 'LIBRARY' : 'NOTES'}
                                                    </AcademyButton>
                                                </div>
                                            </div>
                                        </div>

                                        {/* ********** MOBILE ABOUT THE PROGRAM ********* */}

                                        {/* <div className={` lg-d-none border-rounded-10 card-bg px-3 py-2 w-full mb-3 overflow-hidden ${isOpenAbout ? 'lesson-accordian-h-open' : 'lesson-accordian-h-close'}  `}>
                                    <div onClick={() => { setIsOpenAbout(!isOpenAbout) }} className="flex justify-between items-center">

                                        <p className="course-about-heading w-full  ">ABOUT THE PROGRAM</p>
                                        <svg className={` ${isOpenAbout && 'rotate-180'} transform transition-all  `} width="12" height="12" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M0.4375 0.916504L4.70657 5.08317L8.97563 0.916504H0.4375Z" fill="white" />
                                        </svg>
                                    </div>

                                    <div className="relative mt-3 lg:h-[353px] card-bg-discord border-rounded-10 px-3 md:px-[26px] padding-about w-full">
                                        <div className=" gap-x-2 md:gap-x-1 lg:gap-x-8 xl:gap-x-0 w-full">
                                            <div className="  items-center gap-x-4 mb-2 md:mb-5 lg:mb-0 w-full lg:w-[70%]">
                                                <p className="font-14 fw-semibold   ">Modules: {modules?.length} </p>
                                                <p className="font-14 fw-semibold ">Lessons: {course?.lesson?.length}</p>
                                                <p className="font-14 fw-semibold  mb-0 lg:mb-5">Duration: {courseDuration(course?.duration)}hrs </p>
                                            </div>
                                            <p className={`   font-14 fw-regular  `}> {course?.summery} </p>
                                        </div>
                                    </div>


                                </div> */}





                                        {/*Notes component mobile*/}

                                        <div  className={`notes-container ${show ? "show" : ""  }`}  >
                                            {show && (
                                                <div>
                                                    <Notes
                                                        setShow={setShow}
                                                        course={course?.lessons}
                                                        lesson={lesson}
                                                        currentVideoIndex={currentVideoIndex}
                                                        currentVideoId={currentVideoId}
                                                    />
                                                </div>
                                            )}
                                        </div>

                                        <div onContextMenu={handleContextMenu} className={`modules notes-container ${!show ? "show" : ""  }`}  >
                                            {!show && (
                                                <div onContextMenu={handleContextMenu} className="card-background input-shadow border-rounded-10  pt-5  pb-5 lg:pb-6">
                                                    <div className="flex justify-between items-center px-3.5 lg:px-5">

                                                        <p className="uppercase text-[20px] md:text-[25px] leading-[2px] py-[18px] fw-bold">LIBRARY</p>


                                                        {/* {lesson.module &&  */}
                                                        <div className="custom-dropdown ">
                                                            <button className="dropdown-button" onClick={toggleDropdown}>
                                                                <span className="mt-[2px]">  {isOpen ? 'SELECT' : `MODULE ${selectedIndex + 1 == 0 ? 1 : selectedIndex + 1}`} </span>
                                                                <svg
                                                                    width="9"
                                                                    height="6"
                                                                    viewBox="0 0 9 6"
                                                                    fill="none"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    className={isOpen ? 'rotate' : ''}
                                                                >
                                                                    <path d="M0.4375 0.916504L4.70657 5.08317L8.97563 0.916504H0.4375Z" fill="white" />
                                                                </svg>
                                                            </button>

                                                            <div className="relative">

                                                                {isOpen && (
                                                                    <div className="absolute z-[9999] w-full ">
                                                                        <div onScroll={handleScrollModules} className="dropdown-options ">

                                                                            {modules?.length > 5 && <>
                                                                                <div className={`interests-shadow module-top ${showTopShadow ? '' : 'shadow-off'}`}></div>
                                                                                <div className={`interests-shadow module-bottom ${showBottomShadow ? '' : 'shadow-off'}`}></div>
                                                                            </>
                                                                            }
                                                                            
                                                                            {lesson?.module == null &&
                                                                                <>
                                                                                    <div onClick={() => { setIsOpen(false) }} className="option">
                                                                                        MODULE &nbsp; {1}
                                                                                        <svg width="5" height="6" viewBox="0 0 5 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                            <path d="M0.902344 5.77588L4.82789 3.2984L0.902343 0.820925L0.902344 5.77588Z" fill="white" />
                                                                                        </svg>

                                                                                    </div>
                                                                                </>
                                                                            }
                                                                            {modules?.map((module, index) => (
                                                                                <div key={index + 3} onClick={() => { setSelectedIndex(index), setSelectedModuleId(module?.id), setIsOpen(false) }} className="option">
                                                                                    MODULE &nbsp; {index + 1}
                                                                                    <svg width="5" height="6" viewBox="0 0 5 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                        <path d="M0.902344 5.77588L4.82789 3.2984L0.902343 0.820925L0.902344 5.77588Z" fill="white" />
                                                                                    </svg>

                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                        {/* } */}
                                                    </div>

                                                    <div className="relative mobile-height md:h-[460px] lg:h-[320px] border-rounded-10 overflow-hidden mt-4">

                                                        <div ref={lessonContainerRef} className={` lab-fade-container ${isFading ? 'lab-fade-out' : 'lab-fade-in'} " grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3  gap-x-[1rem] gap-y-3 xl:gap-x-[1rem] lg:gap-y-3.5 play-lessons-wrapper px-3.5 lg:px-5 content-start " `}>
                                                            {filteredLesson?.map((data, index) => (
                                                                <Link key={index + 3} href={!data?.locked && route('lessons.play', data?.id)}>
                                                                    <div onClick={() => { !data?.locked && handleLessonClick(data, index) }}
                                                                        className={` ${data?.locked && "opacity-50"}   border-rounded-10 cursor-pointer`}  >
                                                                        <div className="flex flex-col items-start gap-2.5">
                                                                            <div className="relative w-full">
                                                                                <img src={data?.thumbnail?.original?.url}
                                                                                    className=" border-rounded-10  playlist-lesson-thumbnail  object-cover object-center"
                                                                                    alt="" />
                                                                                <div className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                                                                                    {data?.locked &&
                                                                                        <img className="w-[4rem]" src={Lock} alt="" />}
                                                                                </div>
                                                                            </div>
                                                                            <div>
                                                                                <p className="video-description">
                                                                                    <span className="fw-bold">L{index + 1}:</span>  &nbsp;
                                                                                    {data?.title}
                                                                                </p>

                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </Link>
                                                            ))}
                                                        </div>

                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </section>

                    </motion.div>

                </AnimatePresence>

            </div>
        </>
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


Lesson.layout = (page) => <LessonLayout children={page} title="" />;
export default Lesson;
