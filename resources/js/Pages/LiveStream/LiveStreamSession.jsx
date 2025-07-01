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
import { ReactComponent as Like } from "../../../assets/svg/like.svg";
import { ReactComponent as Liked } from "../../../assets/svg/liked.svg";
import { ReactComponent as Share } from "../../../assets/svg/share.svg";
import { ReactComponent as Send } from "../../../assets/svg/send.svg";
import { ReactComponent as FillStar } from "../../../assets/svg/fillStar.svg";
import Notes from "./partials/Notes";
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
import CC_LOTTIE from "@/Components/CC_LOTTIE_V01.json";
import { Suspense } from "react";
import Xmark from "@/Components/Xmark";
import LessonLayout from "@/Layouts/LessonLayout";
import PlyrComponent from "@/Components/PlyrComponent";
const Lesson = ({ course, lesson, liveStream }) => {


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


    const textareaRef = useRef(null);
    useEffect(() => {
        const textarea = textareaRef.current;
        if (!textarea) return;


        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;


    }, [orientation]);



    const { toggleStudyMode, setCourseId, setStudyMoodOn, studyMoodOn, isPlayPage, setIsPlayPage } = useContext(PostsContext);


    useEffect(() => {
        AOS.init();
        let fragment = window.location.hash?.slice(1);

    }, [])



    const [lessonBookmark, setLessonBookmark] = useState(liveStream?.bookmarked)
    const handleBookmarkToggle = () => {
        setLessonBookmark(!lessonBookmark)
        axios.post(route("bookmark-toggle.livestream", liveStream?.id)).then(() => {
        });

    };

    const [showNotes, setShowNotes] = useState(!liveStream?.live_end_at && !liveStream?.video_url ? false : true);



    const [lottieDelayAnimation, setLottieDelayAnimation] = useState(false);

    const lottieFunction = () => {


        setTimeout(() => {
            setIsPlayPage(false)
        }, 800);

        setLottieDelayAnimation(true)
    }

    const handleContextMenu = (e) => {
        e.preventDefault();
    };




    //   **** Full screen ****

    const [isFullScreen, setIsFullScreen] = useState(false);

    const toggleFullScreen = () => {
        if (!isFullScreen) {
            enterFullScreen();
        } else {
            exitFullScreen();
        }
    };

    const enterFullScreen = () => {
        const element = document.documentElement;

        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }

        setIsFullScreen(true);
    };

    const exitFullScreen = () => {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }

        setIsFullScreen(false);
    };

    useEffect(() => {
        document.addEventListener('fullscreenchange', handleFullScreenChange);

        return () => {
            document.removeEventListener('fullscreenchange', handleFullScreenChange);
        };
    }, []);

    const handleFullScreenChange = () => {
        setIsFullScreen(!!(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement));
    };
    const [isCopied, setIsCopied] = useState(false);

    const handleCopyClick = () => {
        const pageUrl = window.location.href;

        navigator.clipboard.writeText(pageUrl).then(() => {
            setIsCopied(true);
            setTimeout(() => {
                setIsCopied(false);
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    };

    useEffect(() => {
        Echo.private(`LiveStream`)
            .listen('.LiveStreamEnded', (event) => {
                // console.log("event")
                // console.log(event?.live_stream_id)
                if (liveStream?.id === event?.live_stream_id) {
                    window.location.reload()
                }
            })

    }, [])

    function convertNewlinesToBreaks(text) {
        if (!text) return '';
        return text
            .replace(/ /g, ' ')   // Convert spaces to &nbsp;
            .replace(/\n/g, '<br />'); // Convert newlines to <br />
    }

    const descriptionWithBreaks = convertNewlinesToBreaks(liveStream?.description);




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
                            onComplete={lottieFunction}
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
                        <section className="relative pt-2 md:pt-[30px]">
                            <div className="container  lg:px-3 mx-auto px-4 min-h-[91vh] md:min-h-[66vh] ">
                                <div className="grid grid-cols-12 gap-y-[13px]  lg:gap-x-4   z-[99] bg-[#0d0d0d]">

                                    {/* **********Live stream  VIDEO ********** */}

                                    <div onContextMenu={handleContextMenu} className="col-span-12 lg:col-span-9">
                                        <div className={`${studyMoodOn && ' z-[1200] '} relative `}>
                                            {studyMoodOn &&
                                                <button onClick={() => { setStudyMoodOn(false); toggleStudyMode(); toggleFullScreen() }} className="absolute left-0 top-0 -mt-[50px] flex items-center gap-x-2">
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

                                                    {/* {lesson.vimeo_url ? */}
                                                    <>
                                                        {liveStream?.live_end_at && liveStream?.video_url ?
                                                            <VimeoVideoPlayer videoId={liveStream?.video_url} />
                                                            :
                                                            <div style={{ "padding": "56.25% 0 0 0", "position": "relative" }}>
                                                                <iframe src={'https://vimeo.com/event/' + liveStream?.embed_url + '/embed'} frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen style={{ position: "absolute", top: 0, left: 0, "width": "100%", "height": "100%" }}>
                                                                </iframe>
                                                            </div>
                                                        }
                                                        {/* {!videoReady &&
                                                            <img src={lesson?.thumbnail?.original?.url} className="absolute w-full h-full border-rounded-10" />
                                                        } */}
                                                    </>


                                                    {/* <div className=" absolute top-[40%] fw-bold fs-x-large w-full flex justify-center items-center ">
                                                        Coming Soon...
                                                    </div> */}



                                                </div>


                                            </div>

                                        </div>
                                        {/* favourits buttons videos  */}
                                        <div onContextMenu={handleContextMenu} className="col-span-12 lg:col-span-6">
                                            <div className="flex items-center justify-between mt-[26px] ">
                                                <div className="flex items-end">
                                                    <p className="fw-semibold text-[20px] md:text-[2rem] leading-[24px]">{liveStream?.title}</p>

                                                </div>
                                                <div className="flex  gap-x-4 gap-y-2 items-center justify-end">

                                                    <div className="flex flex-col items-center">
                                                        <IconButton
                                                            onClick={handleBookmarkToggle}

                                                            icon={<Star />}
                                                            className={` ${lessonBookmark ? 'primary' : 'secondary '}     icon_button`}
                                                        ></IconButton>
                                                        <p className="fw-medium text-[12px] leading-[16px] text-[#B4B4B4] mt-2.5">
                                                            FAVORITE
                                                        </p>
                                                    </div>

                                                    <div className="flex flex-col items-center">
                                                        <IconButton
                                                            onClick={handleCopyClick}

                                                            icon={<Send />}
                                                            className={` ${isCopied ? 'primary' : 'secondary '}     icon_button`}
                                                        ></IconButton>
                                                        <p className="fw-medium text-[12px] leading-[16px] uppercase text-[#B4B4B4] mt-2.5">
                                                            {isCopied ? 'Copied' : 'LINK'}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex gap-x-3  items-center my-[32px] md:mt-[26px] md:mb-[46px]">
                                                <div className="h-[52px] w-[52px] object-cover rounded-full overflow-hidden">
                                                    <img src={liveStream?.instructor?.dp?.small?.url} className="w-full h-full rounded-full" alt="" />
                                                </div>
                                                <div>

                                                    <p className="fw-bold text-[20px] leading-[26px]">
                                                        {liveStream?.instructor?.full_name}
                                                    </p>
                                                    <p className={` text-[#C4C4C4] fw-regular text-[16px] leading-[24px]`}> {liveStream?.category?.name}</p>
                                                </div>
                                            </div>

                                            <div className="text-[14px] break-words  md:text-[16px] text-[#B4B4B4] font-medium leading-[21px]"
                                                dangerouslySetInnerHTML={{ __html: descriptionWithBreaks }}
                                            />
                                            {/* <textarea
                                                ref={textareaRef}
                                                className="text-[14px] md:text-[16px] text-[#B4B4B4] font-medium leading-[21px]"
                                                style={{
                                                    background: 'transparent',
                                                    border: 'none',
                                                    outline: 'none',
                                                    resize: 'none',
                                                    width: '100%',
                                                    height: 'auto',
                                                }}
                                                value={liveStream?.description && liveStream?.description}
                                                disabled={true}
                                            /> */}
                                        </div>

                                    </div>
                                    {/* **********LESSON NOTES ********** */}
                                    <div className={`col-span-3 lg:col-span-3 hidden-sm ${studyMoodOn && 'z-[1200]'} relative h-full`}>
                                        <div className={`rounded-[15px] overflow-hidden flex bg-[#0F0F0F]`}>
                                            {showNotes &&
                                                // notes desktop
                                                <Notes
                                                    liveStream={liveStream}
                                                />
                                            }
                                            {/* chat desktop  */}
                                            {!liveStream?.live_end_at && !liveStream?.video_url && <div className={!showNotes ? 'block w-full  ' : 'hidden  '}>
                                                <iframe src={'https://vimeo.com/live/interaction_tools/live_event/' + liveStream?.embed_url} width="100%" height="100%" frameborder="0" className="rounded-l-[15px] h-[80vh]"></iframe>
                                                {/* <div className="h-[80px] bg-[#101010] w-full -mt-[5rem] relative z-[99999]"></div> */}
                                            </div>}
                                            <div className=" bg-[#1A1A1A] live-notes rounded-tr-[15px] rounded-br-[15px] px-[3px] py-1">
                                                {!liveStream?.live_end_at && !liveStream?.video_url &&
                                                    <div
                                                        onClick={() => { setShowNotes(false) }}
                                                        className={` ${!showNotes && 'bg-[#303030]'} mb-5 cursor-pointer rounded-[10px] flex items-center justify-center px-[11px] pt-4 pb-[13px] `}>
                                                        <svg width="26" height="39" viewBox="0 0 26 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M3.73 35.15C1.73 35.15 0.42 33.64 0.42 31.52C0.42 29.38 1.73 27.85 3.73 27.85C5.31 27.85 6.28 28.72 6.63 29.85H5.68C5.39 29.17 4.78 28.65 3.73 28.65C2.25 28.65 1.37 29.78 1.37 31.52C1.37 33.25 2.25 34.35 3.73 34.35C4.78 34.35 5.39 33.81 5.68 33.1H6.63C6.28 34.26 5.31 35.15 3.73 35.15ZM12.3531 28H13.2531V35H12.3531V31.8H8.65313V35H7.75313V28H8.65313V31.05H12.3531V28ZM19.7327 35L18.9027 32.89H15.8627L15.0327 35H14.0827L16.8727 28H17.8927L20.6827 35H19.7327ZM16.1527 32.14H18.6127L17.3827 28.99L16.1527 32.14ZM22.3635 35V28.75H19.9735V28H25.6535V28.75H23.2635V35H22.3635Z" fill="white" />
                                                            <g clipPath="url(#clip0_3433_7467)">
                                                                <path d="M7.7999 14.1667H19.6641V4.16667H6.33073V15.3208L7.7999 14.1667ZM8.37656 15.8333L4.66406 18.75V3.33333C4.66406 3.11232 4.75186 2.90036 4.90814 2.74408C5.06442 2.5878 5.27638 2.5 5.4974 2.5H20.4974C20.7184 2.5 20.9304 2.5878 21.0867 2.74408C21.2429 2.90036 21.3307 3.11232 21.3307 3.33333V15C21.3307 15.221 21.2429 15.433 21.0867 15.5893C20.9304 15.7455 20.7184 15.8333 20.4974 15.8333H8.37656Z" fill="#F9F9F9" />
                                                            </g>
                                                            <defs>
                                                                <clipPath id="clip0_3433_7467">
                                                                    <rect width="20" height="20" fill="white" transform="translate(3)" />
                                                                </clipPath>
                                                            </defs>
                                                        </svg>

                                                    </div>}
                                                <div
                                                    onClick={() => { setShowNotes(true) }}
                                                    className={`flex  ${showNotes && 'bg-[#303030]'} cursor-pointer rounded-[10px] items-center justify-center  py-3 `}>
                                                    <svg width="33" height="38" viewBox="0 0 33 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M0.8 34V27H1.94L5.46 32.78V27H6.36V34H5.22L1.7 28.22V34H0.8ZM10.8882 34.15C8.8882 34.15 7.5782 32.64 7.5782 30.5C7.5782 28.38 8.8882 26.85 10.8882 26.85C12.8882 26.85 14.1982 28.38 14.1982 30.5C14.1982 32.64 12.8882 34.15 10.8882 34.15ZM10.8882 33.35C12.3682 33.35 13.2482 32.24 13.2482 30.5C13.2482 28.77 12.3682 27.65 10.8882 27.65C9.4082 27.65 8.5282 28.77 8.5282 30.5C8.5282 32.24 9.4082 33.35 10.8882 33.35ZM16.7288 34V27.75H14.3388V27H20.0188V27.75H17.6288V34H16.7288ZM20.9367 34V27H25.6767V27.75H21.8367V30.05H25.4267V30.8H21.8367V33.25H25.7267V34H20.9367ZM29.3414 34.15C27.6914 34.15 26.7714 33.29 26.5014 32.1H27.4514C27.6914 32.93 28.3314 33.38 29.3414 33.38C30.5414 33.38 31.0914 32.83 31.0914 32.12C31.0914 30.22 26.7214 31.44 26.7214 28.83C26.7214 27.62 27.7114 26.85 29.1714 26.85C30.6714 26.85 31.6214 27.75 31.8814 28.85H30.9314C30.7014 28.16 30.2214 27.62 29.1714 27.62C28.1614 27.62 27.6414 28.16 27.6414 28.78C27.6414 30.56 32.0114 29.37 32.0114 32.07C32.0114 33.34 31.1114 34.15 29.3414 34.15Z" fill="white" />
                                                        <g clipPath="url(#clip0_3433_7475)">
                                                            <path d="M21.6667 1.66669C22.1267 1.66669 22.5 2.04002 22.5 2.50002V5.63085L20.8333 7.29752V3.33335H9.16667V16.6667H20.8333V14.3684L22.5 12.7017V17.5C22.5 17.96 22.1267 18.3334 21.6667 18.3334H8.33333C7.87333 18.3334 7.5 17.96 7.5 17.5V2.50002C7.5 2.04002 7.87333 1.66669 8.33333 1.66669H21.6667ZM23.1483 7.34002L24.3267 8.51835L17.845 15L16.665 14.9984L16.6667 13.8217L23.1483 7.34002ZM15.8333 10V11.6667H11.6667V10H15.8333ZM18.3333 6.66669V8.33335H11.6667V6.66669H18.3333Z" fill="#F9F9F9" />
                                                        </g>
                                                        <defs>
                                                            <clipPath id="clip0_3433_7475">
                                                                <rect width="20" height="20" fill="white" transform="translate(5)" />
                                                            </clipPath>
                                                        </defs>
                                                    </svg>


                                                </div>
                                            </div>
                                        </div>
                                    </div>





                                </div>

                                {/* .MOBILE  */}

                                {/* **************LESSON TITLE AND BUTTONS********* */}

                                <div className="grid grid-cols-12  gap-y-2 md:gap-y-5 lg:gap-x-4 mt-12 mb-0 md:mb-0 lg:mb-6">



                                    <div className="col-span-12 lg:col-span-6">

                                        <div className="flex items-center gap-3 mb-3.5 lg:mb-0 md:justify-end ">
                                            {/****Mobile buttons***/}
                                            <div className="hidden-lg w-full">
                                                <div className="flex item-center justify-center gap-x-1 ">

                                                    {!liveStream?.live_end_at && !liveStream?.video_url && <div onClick={() => { setShowNotes(!showNotes) }} className={` button   secondary w-full rounded-[5px] `}>
                                                        <div className="button_container gap-6 ">
                                                            <span className="pt-0.5 leading-[14px]"> {showNotes ? 'CHAT' : 'NOTES'} </span>
                                                            <div className="svg-12">
                                                                {showNotes ?

                                                                    <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <g clipPath="url(#clip0_4173_754)">
                                                                            <path d="M3.85079 9.20833H11.5625V2.70833H2.89583V9.95854L3.85079 9.20833ZM4.22563 10.2917L1.8125 12.1875V2.16667C1.8125 2.02301 1.86957 1.88523 1.97115 1.78365C2.07273 1.68207 2.21051 1.625 2.35417 1.625H12.1042C12.2478 1.625 12.3856 1.68207 12.4872 1.78365C12.5888 1.88523 12.6458 2.02301 12.6458 2.16667V9.75C12.6458 9.89366 12.5888 10.0314 12.4872 10.133C12.3856 10.2346 12.2478 10.2917 12.1042 10.2917H4.22563Z" fill="#F9F9F9" />
                                                                        </g>
                                                                        <defs>
                                                                            <clipPath id="clip0_4173_754">
                                                                                <rect width="13" height="13" fill="white" transform="translate(0.726562)" />
                                                                            </clipPath>
                                                                        </defs>
                                                                    </svg>
                                                                    :

                                                                    <svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <g clipPath="url(#clip0_4173_758)">
                                                                            <path d="M9.99219 1C10.2682 1 10.4922 1.224 10.4922 1.5V3.3785L9.49219 4.3785V2H2.49219V10H9.49219V8.621L10.4922 7.621V10.5C10.4922 10.776 10.2682 11 9.99219 11H1.99219C1.71619 11 1.49219 10.776 1.49219 10.5V1.5C1.49219 1.224 1.71619 1 1.99219 1H9.99219ZM10.8812 4.404L11.5882 5.111L7.69919 9L6.99119 8.999L6.99219 8.293L10.8812 4.404ZM6.49219 6V7H3.99219V6H6.49219ZM7.99219 4V5H3.99219V4H7.99219Z" fill="#B4B4B4" />
                                                                        </g>
                                                                        <defs>
                                                                            <clipPath id="clip0_4173_758">
                                                                                <rect width="12" height="12" fill="white" transform="translate(-0.0078125)" />
                                                                            </clipPath>
                                                                        </defs>
                                                                    </svg>
                                                                }
                                                            </div>

                                                        </div>
                                                    </div>}

                                                    {/* <div onClick={() => { setShowNotes(true) }} className={` button ${showNotes && 'notes-active-btn'} secondary w-full rounded-[5px]`}>
                                                        <div className="button_container gap-6">
                                                            <span className="pt-0.5">NOTES</span>
                                                            <div className="svg-12">
                                                                <svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <g clipPath="url(#clip0_4173_758)">
                                                                        <path d="M9.99219 1C10.2682 1 10.4922 1.224 10.4922 1.5V3.3785L9.49219 4.3785V2H2.49219V10H9.49219V8.621L10.4922 7.621V10.5C10.4922 10.776 10.2682 11 9.99219 11H1.99219C1.71619 11 1.49219 10.776 1.49219 10.5V1.5C1.49219 1.224 1.71619 1 1.99219 1H9.99219ZM10.8812 4.404L11.5882 5.111L7.69919 9L6.99119 8.999L6.99219 8.293L10.8812 4.404ZM6.49219 6V7H3.99219V6H6.49219ZM7.99219 4V5H3.99219V4H7.99219Z" fill="#B4B4B4" />
                                                                    </g>
                                                                    <defs>
                                                                        <clipPath id="clip0_4173_758">
                                                                            <rect width="12" height="12" fill="white" transform="translate(-0.0078125)" />
                                                                        </clipPath>
                                                                    </defs>
                                                                </svg>
                                                            </div>



                                                        </div>
                                                    </div> */}

                                                </div>
                                            </div>

                                        </div>

                                        {/*Notes component mobile*/}
                                        {showNotes &&
                                            <div className={`notes-container ${showNotes ? "show lg:hidden" : "hidden"}`}  >
                                                {showNotes && (
                                                    <div>
                                                        <Notes
                                                            liveStream={liveStream}
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        }

                                        {!liveStream?.live_end_at && !liveStream?.video_url && <div className={` ${!showNotes ? 'block ' : 'hidden'} block lg:hidden `}>
                                            <iframe src={'https://vimeo.com/live/interaction_tools/live_event/' + liveStream?.embed_url} width="100%" height="100%" frameborder="0" className="rounded-[15px] h-[80vh]"></iframe>

                                            {/* <div className="h-[80px] bg-[#101010] w-full -mt-[4rem] relative z-[99999]"></div> */}
                                        </div>}
                                    </div>

                                </div>
                            </div>
                        </section>

                    </motion.div>

                </AnimatePresence>

            </div >
        </>
    );
};

Lesson.layout = (page) => <LessonLayout children={page} title="" />;
export default Lesson;
