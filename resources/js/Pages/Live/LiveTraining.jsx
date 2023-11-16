import React, { useRef } from "react";
import Layout from "@/Layouts/Layout.jsx";
import Button from "../../Components/Button";
import OwlCarousel from "react-owl-carousel";

import { ReactComponent as WatchSvg } from "../../../assets/svg/watch.svg";
import { ReactComponent as ArrowRight } from "../../../assets/svg/ArrowRight.svg";
import { ReactComponent as ArrowLeft } from "../../../assets/svg/ArrowLeft.svg";



import headerImage2 from "../../../assets/img/Slide2.jpg";


// new slider

// live
import feature1 from "../../../assets/img/feature1.jpg";
import feature2 from "../../../assets/img/feature2.jpg";
import feature3 from "../../../assets/img/feature3.jpg";

// new lesson

import newLesson1 from "../../../assets/img/newlesson1.jpg";
import newLesson2 from "../../../assets/img/newlesson2.jpg";
import newLesson3 from "../../../assets/img/newlesson3.jpg";
import newLesson4 from "../../../assets/img/newlesson4.jpg";
import newLesson5 from "../../../assets/img/newlesson5.jpg";

// art and design
import art1 from "../../../assets/img/art1.jpg";
import art2 from "../../../assets/img/art2.jpg";
import art3 from "../../../assets/img/art3.jpg";
import art4 from "../../../assets/img/art4.jpg";
import art5 from "../../../assets/img/art5.jpg";

//  design & style
import design1 from "../../../assets/img/design1.jpg";
import design2 from "../../../assets/img/design2.jpg";
import design3 from "../../../assets/img/design3.jpg";
import design4 from "../../../assets/img/design4.jpg";
import design5 from "../../../assets/img/design5.jpg";


import upcoming from "../../../assets/img/upcoming.jpg";

import CourseCard from "@/Components/Course/CourseCard.jsx";
import CourseFeaturedCard from "@/Components/Course/CourseFeaturedCard.jsx";
import Badge from "@/Components/Badge.jsx";
import CourseInstructorCard from "@/Components/Course/CourseInstructorCard.jsx";
import LiveBadge from "@/Components/LiveBadge";
import { Head, Link } from "@inertiajs/react";
import IconButton from "@/Components/IconButton";
import AcademySmallCard from "@/Components/Course/AcademySmallCard";
import AcademyLargeCard from "@/Components/Course/AcademyLargeCard";
import { useState } from "react";

const LiveTraining = ({bannered,live,upcoming,wasLive}) => {

    console.log('bannered')
    console.log(bannered)

    console.log('live')
    console.log(live)

    console.log('upcoming')
    console.log(upcoming)

    console.log('wasLive')
    console.log(wasLive)

//route('live-training.preview',1)


    // Main academy  slider buttons
    const liveMainRef = useRef(null);
    // category   slider buttons
    const catRef = useRef(null);

    // featuer slider button
    const LiveNowRef = useRef(null);

    // new lessons slider buttons
    const newLessonRef = useRef(null);

    // Top instructor slider buttons
    const topInstRef = useRef(null);

    // upcoming   slider buttons
    const upComingRef = useRef(null);

    const handleSliderNext = (ref) => {
        ref.current.next();
    };

    const handleSliderPrev = (ref) => {
        ref.current.prev();
    };
    const [imageLoaded, setImageLoaded] = useState(false);
    return (
        <div className=" ">
             <Head title="Live"/>
            <div data-aos="fade-in" data-aos-delay="100" data-aos-easing="ease" data-aos-duration="300" className="   ">
                {/* main header slider  */}

                <div className="relative">
                    <OwlCarousel
                        ref={liveMainRef}
                        className="owl-theme relative "

                        margin={0}
                        items={1}
                        autoplay={true}
                        autoplayHoverPause={true}
                        autoplayTimeout={5000}
                        animateIn={"fadeIn"}
                        animateOut={"fadeOut"}
                        nav={false}
                        dots={false}
                    >

                   {bannered?.map((data ,  index)=>(     <div className="item h-[65vh] md:h-[65vh] lg:h-[80vh]  w-100 flex items-center position-relative main-header pt-[4rem] md:pt-[6rem] lg:pt-[6rem] p-[]100rem">
                            <div className="shadow top"></div>
                            <div className="shadow bottom"></div>
                            <div className="shadow left"></div>
                            <div className="container mx-auto my-auto w-full     px-5 lg:px-3 content">
                                <div className="max-w-md">
                                    <div className="my-4 flex justify-center md:justify-start ">
                                        <LiveBadge LiveClass="static" />
                                    </div>
                                    <h1 className="mb-2 text-center md:text-start">{data?.live_series?.title}</h1>
                                    <h3 className="mb-5 font-normal text-center md:text-start">
                                       {data?.live_series?.default_instructor?.full_name}
                                    </h3>
                                    <div className="flex items-center justify-center md:justify-start gap-8 mb-4">
                                        <div
                                            className="regular text-[#FFFFFF] font-normal flex item-center"
                                        >
                                            <span className="mr-[10px]">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18 20H6" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M22 4H2V16H22V4Z" fill="#FAFAFA" fillOpacity="0.2" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>

                                            </span>
                                            <span className="text-[#B72E2E]">
                                               Live
                                            </span>
                                        </div>
                                        <a
                                            href="#"
                                            className="regular text-[#FFFFFF] font-normal flex item-center"
                                        >
                                            <span className="mr-[10px]">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fillRule="evenodd" clipRule="evenodd" d="M3 21H12H21C21.55 21 22 20.55 22 20V4C22 3.45 21.55 3 21 3H12H3C2.45 3 2 3.45 2 4V20C2 20.55 2.45 21 3 21Z" fill="white" fillOpacity="0.2"/>
<path d="M4 12H10" stroke="#E0E0E0" strokeWidth="1.2" strokeMiterlimit="10"/>
<path d="M4 8H10" stroke="#E0E0E0" strokeWidth="1.2" strokeMiterlimit="10"/>
<path d="M4 16H10" stroke="#E0E0E0" strokeWidth="1.2" strokeMiterlimit="10"/>
<path d="M14 12H20" stroke="#E0E0E0" strokeWidth="1.2" strokeMiterlimit="10"/>
<path d="M14 8H20" stroke="#E0E0E0" strokeWidth="1.2" strokeMiterlimit="10"/>
                                            </svg>

                                            </span>
                                            <span className=" ">
                                               {!data?.live_series_id && '1'} Sessions
                                            </span>
                                        </a>
                                    </div>
                                    <p className=" text-center md:text-start  mb-8">
                                    {data?.live_series?.description?.length > 110 ? data?.live_series?.description?.substring(0, 110) + "..." : data?.live_series?.description}
                                    </p>
                                    <div className="flex justify-center md:justify-start">
                                        <Link
                                            href={route("live-series.preview", data?.id)}
                                        >
                                            <Button
                                                className={
                                                    "primary icon uppercase "
                                                }
                                                icon={<WatchSvg />}
                                            >
                                                Watch Live
                                            </Button>
                                        </Link>


                                    </div> </div>
                            </div>
                            <div
                                className="h-100 w-100 header-image"
                                // style={{
                                //     backgroundImage: `url(${data?.thumbnail?.original?.url})`,
                                // }}
                            >
                                <img src={ imageLoaded ? data?.live_series?.thumbnail?.original?.url : data?.live_series?.thumbnail?.medium?.url }  onLoad={() => setImageLoaded(true)} className="h-100 w-100 header-image" />
                                <div className="overlay"></div>
                            </div>
                        </div>))}




                    </OwlCarousel>


                    <div className="  container mx-auto -mt-[4rem] z-[9999] relative">
                    <div className=" ml-2 absolute     ">
                        <div className=" hidden lg:block">
                            <div className="flex   gap-3">
                                <div onClick={() => { handleSliderPrev(liveMainRef) }}>
                                    <IconButton
                                        className={"secondary header_arrow"}
                                        icon={<ArrowLeft />}
                                    ></IconButton>

                                </div>
                                <div onClick={() => { handleSliderNext(liveMainRef) }}>
                                    <IconButton
                                        className={"secondary header_arrow"}
                                        icon={<ArrowRight />}
                                    ></IconButton>

                                </div>
                            </div>
                        </div>
                       </div>
                       </div>




                    {/* <div className="absolute left-[5%] bottom-[3%] z-[9999]  ">
                        <div className=" hidden lg:block">
                            <div className="flex  ">
                                <div onClick={() => { handleSliderPrev(liveMainRef) }}>
                                    <IconButton
                                        className={"secondary header_arrow"}
                                        icon={<ArrowLeft />}
                                    ></IconButton>

                                </div>
                                <div onClick={() => { handleSliderNext(liveMainRef) }}>
                                    <IconButton
                                        className={"secondary mx-3 header_arrow"}
                                        icon={<ArrowRight />}
                                    ></IconButton>

                                </div>
                            </div>
                        </div>         </div> */}

                </div>
{/* **************new design live now training******************  */}







                <div className="container mx-auto px-5 lg:px-3  mt-[6rem] lg:mt-[8rem]">

                    {/* ******************************************** New Large card ************************ */}
                  {live?.length > 0  && <>


                    <Link

                        href={route(
                            "live-series.preview",
                            live[0]?.id
                        )}
                    >

                        <AcademyLargeCard
                            className={'academy-large-card feature-card'}
                            title={live[0]?.live_series?.title}
                            instructor={live[0]?.live_series?.default_instructor?.full_name}
                            duration={"5 hr 40 min"}
                            lessons={live[0]?.live_series?.lessons_count}
                            medium_image={live[0]?.live_series?.thumbnail?.medium?.url }
                            original_image={live[0]?.live_series?.thumbnail?.original?.url }
                            badge={"primary"}
                            badge_text={""}
                            live={true} />
                    </Link>
                    {/* ************* New Large card end ******** */}
                    {/* ******************* Live now New small card ***************** */}
                    <div className="grid grid-cols-12 gap-y-2 md:gap-y-6 gap-x-2 lg:gap-x-6  mt-3 md:mt-0">
                        {live?.map((data, index) => (
                            <>
                             {index >=1 && index<=2 &&
                            <div className="col-span-6  ">
                                <Link
                                    key={index + 1}
                                    href={route("live-series.preview",data?.id)} >
                                    <AcademySmallCard
                                        className={"academy-small-card feature-card"}
                                        title={data?.live_series?.title}
                                        instructor={ data?.live_series?.default_instructor?.full_name }
                                        duration={"5 hr 40 min" }
                                        lessons={ data?.lessons_count }
                                        original_image={data?.live_series?.thumbnail?.original?.url}
                                        medium_image={data?.live_series?.thumbnail?.small?.url}
                                        badge={"primary"}
                                        badge_text={""}
                                        live={true}
                                        liveBadge={true}
                                        videoProgress={0}
                                        />
                                </Link>
                            </div> }
                            </>
                        ))}
                    </div>
                    </>}
                    {/* ******************Live now New small card end ****************** */}


                    {/* *****************UPCOMMING live training **************** */}

                    {upcoming?.length > 0 &&
                    <div>
                        <div>
                            <h1 className="text-50 text-center mt-[3rem] md:mt-[6rem] ">UPCOMMING TRAININGS</h1>
                        </div>
                        <div className="large-second mt-[20px] md:mt-[40px] ">
                            <Link

                                href={upcoming[0]?.live_series_id ? route("live-series.preview",  upcoming[0]?.id) : route("live-training.preview", upcoming[0]?.id ) }
                            >
                                <AcademyLargeCard
                                    className={"academy-large-card feature-card"}
                                    title={upcoming[0]?.live_series_id ? upcoming[0]?.live_series?.title : upcoming[0]?.title }
                                    instructor={upcoming[0]?.live_series_id ? upcoming[0]?.live_series?.default_instructor?.full_name : upcoming[0]?.default_instructor?.full_name  }
                                    duration={"5 hr 40 min"}
                                    lessons={'null'}
                                    medium_image={upcoming[0]?.live_series_id ? upcoming[0]?.live_series?.thumbnail?.medium?.url : upcoming[0]?.thumbnail?.medium?.url }
                                    original_image={upcoming[0]?.live_series_id ? upcoming[0]?.live_series?.thumbnail?.original?.url : upcoming[0]?.thumbnail?.original?.url }

                                    badge={"primary"}
                                    badge_text={""}

                                    live={true}
                                    upcomming={true}
                                    />
                            </Link>
                        </div>
                        <div className="grid grid-cols-12 gap-y-2 md:gap-y-4 lg:gap-y-[24px] gap-x-2 md:gap-x-4 lg:gap-x-[28px] mt-3 md:mt-0 ">
                            {upcoming?.map((data, index) => (
                                <>
                                 {index >=1 && index<=6 &&
                                <div className=" col-span-6">
                                    <Link key={index + 1}
                                        href={data?.live_series_id ? route("live-series.preview",  data?.id ) : route("live-training.preview", data?.id )}
                                    >
                                        <AcademySmallCard
                                            className={"academy-small-card new-course-card"}
                                            title={data?.live_series_id ? data?.live_series?.title : data?.title }
                                            instructor={data?.live_series_id ? data?.live_series?.default_instructor?.full_name : data?.default_instructor?.full_name  }
                                            duration={"5 hr 40 min"}
                                            lessons={data?.lessons_count}

                                            medium_image={data?.live_series_id ? data?.live_series?.thumbnail?.medium?.url : data?.thumbnail?.medium?.url }
                                    original_image={data?.live_series_id ? data?.live_series?.thumbnail?.original?.url : data?.thumbnail?.original?.url }
                                            badge={"primary"}
                                            badge_text={""}
                                            live={true}
                                            liveBadge={false}
                                            videoProgress={0}
                                            upcomming={true}
                                            />

                                    </Link>
                                </div>}
                                            </>
                            ))}
                        </div>
                    </div>
}

                    {/* UPCOMMING live training end  */}
                </div>




                {/* Live right now*/}

                {/* <section className="mt-[60px] md:mt-[80px] lg:mt-[120px] group">
                    <div className="w-[92%]  mx-auto px-5 xl:px-0">
                        <div className="grid grid-cols-1 lg:grid-cols-3 mb-8">
                            <div onClick={() => { handleSliderPrev(LiveNowRef) }} className="cursor-pointer invisible group-hover:visible ">
                                <Button
                                    className={"secondary header_arrow"}
                                    icon={<ArrowLeft />}
                                ></Button>
                            </div>
                            <div className="text-center">
                                <h3 className="font-medium">
                                    {" "}
                                    <span className="danger-color">
                                        {" "}
                                        Live{" "}
                                    </span>{" "}
                                    Right Now
                                </h3>
                            </div>
                            <div onClick={() => { handleSliderNext(LiveNowRef) }} className="ml-auto cursor-pointer invisible group-hover:visible ">
                                <Button
                                    className={"secondary header_arrow"}
                                    icon={<ArrowRight />}
                                ></Button>
                            </div>
                        </div>
                    </div>
                    <div className="relative flex justify-end h-[600px] ">
                        <div className="w-[94%]  ">
                            <div className="grid grid-cols-12">
                                <div className="col-span-12 relative h-[600px]">
                                    <div className="  left-0  ">
                                        <OwlCarousel
                                            ref={LiveNowRef}
                                            className="owl-theme relative"
                                            margin={24}
                                            items={3}
                                            autoplay={true}
                                            autoplayHoverPause={true}
                                            autoplayTimeout={7000}
                                            animateIn={"fadeIn"}
                                            animateOut={"fadeOut"}
                                            nav={false}
                                            dots={false}
                                            autoWidth={true}
                                        >

                                        {upcoming?.map((data , index)=>(
                                             <Link
                                             key={index + 1}
                                             href={route(  "live-training.preview", data?.id )}
                                         >
                                        <AcademySmallCard
                                        className={"academy-small-card is-Live-Now  "}
                                        title={data?.title}
                                        instructor={ data?.default_instructor?.full_name }
                                        duration={"5 hr 40 min" }
                                        lessons={ data?.lessons_count }
                                        image={data?.thumbnail?.medium?.url}
                                        badge={"primary"}
                                        badge_text={""}
                                        live={true}
                                        videoProgress={0}
                                        isProgressCard={false}
                                        upcomming={true}
                                        />
                                        </Link>
                                        ))}



                                        </OwlCarousel>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section> */}

                {/* new lesson available slider */}

            </div>
        </div>
    );
};
LiveTraining.layout = (page) => <Layout children={page} />;
export default LiveTraining;
