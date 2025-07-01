import React, { useRef, useState } from "react";
import Layout from "@/Layouts/Layout";
import coursebg from "../../../assets/img/coursebg.jpg";
import dissProfile from "../../../assets/img/discussion-profile-pic.jpg";
import dissProfile2 from "../../../assets/img/DissProfilePic2.jpg";
import cross from "../../../assets/svg/cross.svg";
import plus from "../../../assets/svg/faqplus.svg";
import Lock from "../../../assets/svg/Lock.svg";
import OwlCarousel from "react-owl-carousel";

import checkCircle from "../../../assets/svg/CheckCircle2.svg";

import { ReactComponent as BookMark } from "../../../assets/svg/Bookmark.svg";
import Button from "../../Components/Button";
import { ReactComponent as Play } from "../../../assets/svg/Play.svg";
import { ReactComponent as ArrowRight } from "../../../assets/svg/ArrowRight.svg";
import { ReactComponent as ArrowLeft } from "../../../assets/svg/ArrowLeft.svg";
import AcademyLargeCard from "@/Components/Course/AcademyLargeCard";

// art and design
import art1 from "../../../assets/img/art1.jpg";
import art2 from "../../../assets/img/art2.jpg";
import art3 from "../../../assets/img/art3.jpg";
import art4 from "../../../assets/img/art4.jpg";
import art5 from "../../../assets/img/art5.jpg";
import CourseCard from "@/Components/Course/CourseCard";
// top instructor
import top1 from "../../../assets/img/top1.jpg";
import top2 from "../../../assets/img/top2.jpg";
import top3 from "../../../assets/img/top3.jpg";
import top4 from "../../../assets/img/top4.jpg";
import top5 from "../../../assets/img/top5.jpg";
import CourseInstructorCard from "@/Components/Course/CourseInstructorCard";
import LiveBadge from "@/Components/LiveBadge";
import LiveInfoCard from "@/Components/Course/LiveInfoCard";
import { Link, useForm } from "@inertiajs/react";
import IconButton from "@/Components/IconButton";
import TabButton from "@/Components/TabButton";
import AcademySmallCard from "@/Components/Course/AcademySmallCard";

const LiveTrainingInfo = ({ liveTraining, liveStream, randomLives, randomInstuctors }) => {
    // console.log('liveTraining')
    // console.log(liveTraining)
    // console.log('liveStream')
    // console.log(liveStream)
    // console.log('randomLives')
    // console.log(randomLives)
    // randomInstuctors live-training
    //route('live-trainings.session',1)

    // < div
    // style = "padding:56.25% 0 0 0;position:relative;" > < iframe
    // src = "https://player.restream.io/?token=e67d6bfbb7ff488082ab504b46e6b6c3&vwrs=1"
    // allow = "autoplay"
    // allowFullScreen
    // frameBorder = "0"
    // style = "position:absolute;top:0;left:0;width:100%;height:100%;" > < /iframe></di
    // v >

    const { post } = useForm();
    const handleLiveTrainingBookmarkToggle = () => {
        post(route('bookmark-toggle.live-training', liveTraining?.id), {
            preserveScroll: true
        });
    }



    const handleLiveStreamBookmarkToggle = () => {
        post(route('bookmark-toggle.livestream', liveStream?.id), {
            preserveScroll: true
        });
    }





    // Top instructor slider buttons
    const weeklyRef = useRef(null);

    // Top instructor slider buttons
    const seriesRef = useRef(null);

    // upcoming   slider buttons
    const topInstructorRef = useRef(null);

    const handleSliderNext = (ref) => {
        ref.current.next();
    };

    const handleSliderPrev = (ref) => {
        ref.current.prev();
    };
    const [imageLoaded, setImageLoaded] = useState(false);






    const [styleState, setStyleState] = useState({
        options: {
            loop: true,
            margin: 24,
            autoplay: true,
            autoplayHoverPause: true,
            autoplayTimeout: 2500,
            animateIn: "fadeIn",
            animateOut: "fadeOut",
            nav: false,
            dots: false,
            autoWidth: false,
            responsiveClass: true,
            responsive: {
                0: {
                    items: 2,
                },
                600: {
                    items: 2,
                },
                1000: {
                    items: 4,
                }
            }
        }
    })





    const handleContextMenu = (e) => {
        e.preventDefault();
      };

    return (
        <div onContextMenu={handleContextMenu} data-aos="fade-in" data-aos-delay="100" data-aos-easing="ease" data-aos-duration="300">




            <div className="container mx-auto mt-[5rem] md:mt-[6rem] px-5 md:px-3">
                <Link
                    href={route(
                        "livestream.play",
                        liveStream?.id
                    )}
                >
                    <AcademyLargeCard
                        className={"academy-large-card feature-card"}
                        title={liveStream?.title}
                        instructor={liveStream?.default_instructor?.full_name}
                        duration={"5 hr 40 min"}
                        lessons={liveStream?.lessons_count}
                        desktop_image={liveStream?.live_series?.thumbnail}
                        mobile_image={liveStream?.live_series?.mobile_thumbnail}
                        badge={"primary"}
                        badge_text={""}
                        live={false} />
                </Link>
                <div className="container mx-auto px-5 lg:px-0  md:-mt-[7rem] -mt-[3rem] relative">

                    <div className="max-w-2xl mx-auto">
                        <div className="grid grid-cols-12">
                            <div className="col-span-12  z-50">
                                <div className="flex items-center gap-2 lg:gap-4  justify-center">
                                    <Link href={route("livestream.play", liveStream?.id)}>
                                        <button className="button primary">
                                            <div className="button_container glitch uppercase">
                                                {liveStream?.status == 'was-live' ? 'watch video' : ' WATCH LIVE'}
                                            </div>
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>















            <div className="hidden">
                <div
                    className="main-header relative bg-cover bg-center  overflow-hidden h-[629px] lg:h-[700px] min-h-[612px] md:min-h-[712px] lg:min-h-[700px] xl:min-h-[700px] flex items-center bg-no-repeat"
                // style="background-image: url('{{ asset('assets/course-main.png') }}');"
                // style={{backgroundImage: `url(${ liveTraining ? liveTraining?.thumbnail?.original?.url : liveStream?.live_series?.thumbnail?.original?.url }) `}}
                >  <div className="shadow top"></div>
                    <div className="course-shadow bottom "></div>

                    <img src={
                        imageLoaded ?
                            liveTraining ? liveTraining?.thumbnail?.original?.url : liveStream?.live_series?.thumbnail?.original?.url
                            :
                            liveTraining ? liveTraining?.thumbnail?.medium?.url : liveStream?.live_series?.thumbnail?.medium?.url}

                        onLoad={() => setImageLoaded(true)} className="h-100 w-100 header-image object-cover object-center  " />
                    <div className="container mx-auto px-5 lg:px-0  relative">
                        <div className="max-w-2xl mx-auto">
                            <div className="grid grid-cols-12">
                                <div className="col-span-12  z-50">
                                    <div className="text-center h-[600px] lg:h-[700px] min-h-[600px] md:min-h-[700px] flex flex-col justify-end items-center">
                                        {/* <div className="my-4">
                                            <LiveBadge LiveClass="static" />
                                        </div> */}
                                        {/* <h1 className="mb-2">
                                            {liveTraining ? liveTraining?.title : liveStream?.live_series?.title}
                                        </h1> */}
                                        {/* <h3 className="mb-5 font-normal">
                                            {liveTraining ? liveTraining?.default_instructor?.full_name : liveStream?.live_series?.default_instructor?.full_name}
                                        </h3> */}
                                        {/* <div className="flex items-center gap-8 mb-4">
                                            <div className="flex">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M18 20H6" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M22 4H2V16H22V4Z" fill="#FAFAFA" fillOpacity="0.2" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>

                                                <p className="danger-color px-2 ">

                                                    Live
                                                </p>
                                            </div>
                                            {liveStream && <p className="flex item-center">
                                                <span className="mr-[10px]">
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M3 21H12H21C21.55 21 22 20.55 22 20V4C22 3.45 21.55 3 21 3H12H3C2.45 3 2 3.45 2 4V20C2 20.55 2.45 21 3 21Z" fill="white" fillOpacity="0.2" />
                                                        <path d="M4 12H10" stroke="#E0E0E0" strokeWidth="1.2" strokeMiterlimit="10" />
                                                        <path d="M4 8H10" stroke="#E0E0E0" strokeWidth="1.2" strokeMiterlimit="10" />
                                                        <path d="M4 16H10" stroke="#E0E0E0" strokeWidth="1.2" strokeMiterlimit="10" />
                                                        <path d="M14 12H20" stroke="#E0E0E0" strokeWidth="1.2" strokeMiterlimit="10" />
                                                        <path d="M14 8H20" stroke="#E0E0E0" strokeWidth="1.2" strokeMiterlimit="10" />
                                                    </svg>
                                                </span>
                                                <span className="opacity-60">
                                                    {liveStream?.live_series?.live_streams?.length} Sessions
                                                </span>
                                            </p>}
                                        </div> */}
                                        {/* <p className="regular text-[#FFFFFF] font-normal mb-8">
                                            {liveTraining ? liveTraining?.description?.length > 110 ? liveTraining?.description?.substring(0, 110) + "..." : liveTraining?.description

                                                :

                                                liveStream?.live_series?.description?.length > 110 ? liveStream?.live_series?.description?.substring(0, 110) + "..." : liveStream?.live_series?.description

                                            }

                                        </p> */}
                                        <div className="flex items-center gap-4 flex-wrap justify-center">
                                            <button className="button primary">
                                                <Link

                                                    href={liveTraining ? route("live-training.play", liveTraining?.id) : route("livestream.play", liveStream?.id)}
                                                >
                                                    <div className="button_container glitch uppercase">


                                                        WATCH LIVE
                                                    </div>
                                                </Link>

                                            </button>

                                            {liveTraining ?
                                                <IconButton
                                                    onClick={handleLiveTrainingBookmarkToggle}
                                                    icon={<BookMark />}
                                                    className={` ${liveTraining?.bookmarked ? 'primary' : 'secondary'}  icon_button `}
                                                ></IconButton>
                                                : <IconButton
                                                    onClick={handleLiveStreamBookmarkToggle}
                                                    icon={<BookMark />}
                                                    className={` ${liveStream?.bookmarked ? 'primary' : 'secondary'}  icon_button `}
                                                ></IconButton>}
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



            {/*tabs*/}
            <section className=" pt-11 md:pt-16 ">
                <div className=""></div>
                <div className="container mx-auto px-5 xl:px-0">
                    <div className="max-w-[57rem] mx-auto">
                        <div className="grid grid-cols-12">
                            <div className="col-span-12">
                                <div
                                    className="flex items-center justify-center overflow-x-scroll lg:overflow-x-hidden">
                                    {/* <Button className={` button success  active glitch `}>  </Button> */}
                                    <a
                                        href="#overview"
                                        className=" px-4        glitch"
                                    >
                                        <TabButton>

                                            Overview
                                        </TabButton>

                                    </a>

                                    {liveStream?.live_series?.live_streams?.length > 1 && <a
                                        href="#sessions"
                                        className=" px-4        glitch"
                                    >
                                        <TabButton>

                                            Sessions
                                        </TabButton>

                                    </a>}
                                    <a
                                        href="#session"
                                        className=" px-4       glitch"
                                    >
                                        <TabButton>

                                            Session
                                        </TabButton>

                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="border-b-[1px] border-b-[#FFFFFF] opacity-20"></div>
            </section>
            {/*overview*/}
            <section id="overview" className="paddingSectionSmall">
                <div className="container mx-auto px-5 lg:px-3">
                    <div className="">
                        <div className="grid grid-cols-12">
                            <div className="col-span-12">
                                <div className="text-start">
                                    <h3 className="mb-6 lg:mb-8">Overview</h3>
                                    <p className="mb-4">
                                        {liveTraining ? liveTraining?.description : liveStream?.live_series?.description}
                                    </p>
                                </div>
                                <div className="text-start">
                                    <h5 className="mb-1 font-normal">
                                        <span className="opacity-50">
                                            Instructor(s):
                                        </span>
                                        {liveTraining ? liveTraining?.default_instructor?.full_name : liveStream?.live_series?.default_instructor?.full_name}
                                    </h5>
                                    {/* <h5 className="mb-1 font-normal">
                                        <span className="opacity-50">
                                            Class Length:
                                        </span>
                                        35 video lessons (8 hours 1 minute)
                                    </h5> */}
                                    {liveStream?.live_series?.default_instructor?.category?.name && <h5 className="mb-1 font-normal">
                                        <span className="opacity-50">
                                            Category:
                                        </span>
                                        {liveStream?.live_series?.default_instructor?.category?.name}
                                    </h5>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* session */}
            {(liveStream?.live_series?.live_streams?.length > 1) &&
                <section id="sessions" className="paddingSectionLarge">
                    <div className="container mx-auto px-5 lg:px-3">
                        <div className="">
                            <div className="grid grid-cols-3 mb-8">
                                <div className="col-span-12">
                                    <div className="text-start flex justify-between item-center">
                                        <h3 className="font-medium">
                                            Session
                                        </h3>
                                        <div className="flex items-center gap-3">
                                            <div className="md:block hidden ">
                                                <svg
                                                    onClick={() => {
                                                        handleSliderPrev(seriesRef)
                                                    }}
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
                                            <div className="md:block hidden">
                                                <svg
                                                    onClick={() => {
                                                        handleSliderNext(seriesRef)
                                                    }}
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
                    <div className="flex justify-end">
                        <div className="w-[97%] xl:w-[94%]  2xl:w-[80%]  ">
                            <div className=" lg:ml-auto">
                                <div className="grid grid-cols-12">
                                    <div className="col-span-0 md:col-span-0 lg:col-span-1 xl:col-span-2 2xl:col-span-4 ">
                                    </div>
                                    <div className="col-span-12 relative   lg:h-[350px]">
                                        <div className="  left-0  ">
                                            <OwlCarousel {...styleState?.options}
                                                ref={seriesRef}
                                                className="owl-theme relative"


                                            >
                                                {liveStream.live_series.live_streams.map((data, index) => (
                                                    <React.Fragment key={index + 3}>

                                                        <AcademySmallCard
                                                            // href={ route("livestream.play", data?.id)}
                                                            className={"academy-small-card isSlider feature-card"}
                                                            title={data?.sub_title}
                                                            instructor={data?.live_series?.default_instructor?.full_name}
                                                            duration={"5 hr 40 min"}
                                                            lessons={3}
                                                            desktop_image={liveStream.live_series?.mobile_thumbnail}
                                                            mobile_image={liveStream.live_series?.mobile_thumbnail}
                                                            routeToPlay={route('livestream.play', { course: data?.id })}
                                                            badge={"primary"}
                                                            badge_text={""}
                                                            live={true}
                                                            videoProgress={0}
                                                        />
                                                    </React.Fragment>

                                                ))}



                                            </OwlCarousel>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            }


            {/*Weekly sessions */}
            {randomLives?.length > 0 &&
                <section id="session" className="paddingSectionLarge">
                    <div className="container mx-auto px-5 lg:px-3">
                        <div className="">
                            <div className="grid grid-cols-3 mb-8">
                                <div className="col-span-12">
                                    <div className="text-start flex justify-between item-center">
                                        <h3 className="font-medium">
                                            Weekly session schedule
                                        </h3>
                                        <div className="flex items-center gap-3">
                                            <div className="md:block hidden cursor-pointer ">
                                                <svg
                                                    onClick={() => {
                                                        handleSliderPrev(weeklyRef)
                                                    }}
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
                                            <div className="md:block hidden cursor-pointer">
                                                <svg
                                                    onClick={() => {
                                                        handleSliderNext(weeklyRef)
                                                    }}
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
                    <div className="flex justify-end">
                        <div className="w-[97%] xl:w-[94%]  2xl:w-[80%]  ">
                            <div className=" lg:ml-auto">
                                <div className="grid grid-cols-12">
                                    <div className="col-span-0 md:col-span-0 lg:col-span-1 xl:col-span-2 2xl:col-span-4 ">
                                    </div>
                                    <div className="col-span-12 relative lg:h-[350px]">
                                        <div className="  left-0  ">
                                            <OwlCarousel {...styleState?.options}
                                                ref={weeklyRef}
                                                className="owl-theme relative"

                                            >


                                                {randomLives?.map((data, index) => (

                                                    <React.Fragment key={index + 3}>

                                                        <AcademySmallCard
                                                            className={"academy-small-card isSlider feature-card"}
                                                            title={data?.live_series?.title}
                                                            instructor={'Arkin Sorkin'}
                                                            duration={"5 hr 40 min"}
                                                            lessons={3}
                                                            desktop_image={data?.live_series?.mobile_thumbnail}
                                                            mobile_image={data?.live_series?.mobile_thumbnail}
                                                            routeToPlay={route('live-series.preview', data.id)}
                                                            videoProgress={0}
                                                            badge={"primary"}
                                                            badge_text={""}
                                                            liveBadge={data?.status == 'live'}
                                                            upcomming={data?.status == 'upcoming'}
                                                            live={data?.status == 'live'}
                                                            wasLiveBadge={data?.status == 'was-live'}
                                                        />
                                                    </React.Fragment>
                                                ))}
                                            </OwlCarousel>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            }


            {/* industry experts*/}
            {/* <section id="instructors" className="paddingSectionLarge">
                <div className="container mx-auto  px-5 lg:px-3">
                    <div className="grid grid-cols-12 mb-8">
                        <div className="col-span-12">
                            <div className="text-start flex justify-between item-center">
                                <h3>Learn live with industry experts</h3>

                                <div className="flex items-center gap-3">
                                    <div className="md:block hidden ">
                                        <svg
                                            onClick={() => {
                                                handleSliderPrev(topInstructorRef)
                                            }}
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
                                    <div className="md:block hidden">
                                        <svg
                                            onClick={() => {
                                                handleSliderNext(topInstructorRef)
                                            }}
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
                <div className="   px-5 xl:px-0">
                    <div className="grid grid-cols-12">

                        <div className="col-span-12">
                            <div className="flex justify-end">
                                <div className="w-[97%] xl:w-[94%]  2xl:w-[80%]">
                                    <div className="grid grid-cols-12">
                                        <div className="col-span-12 relative h-[500px]">
                                            <div className="  left-0  ">
                                                <OwlCarousel
                                                    ref={topInstructorRef}
                                                    className="owl-theme relative"


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



                                                    {randomInstuctors?.map((data , index)=>(

                                                    <CourseInstructorCard
                                                        className={"item"}
                                                        title={data?.title}
                                                        category={data?.category?.name}
                                                        image={data?.dp?.medium?.url}
                                                        user_id={data?.id}
                                                    />

                                                    ))}


                                                </OwlCarousel>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}

        </div>
    );
};

LiveTrainingInfo.layout = (page) => <Layout children={page} title="" />;
export default LiveTrainingInfo;
