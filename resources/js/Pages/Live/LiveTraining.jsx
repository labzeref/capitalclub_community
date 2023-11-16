import React, { useRef } from "react";
import Layout from "@/Layouts/Layout.jsx";
import Button from "../../Components/Button";
import OwlCarousel from "react-owl-carousel";

import { ReactComponent as WatchSvg } from "../../../assets/svg/watch.svg";
import { ReactComponent as ArrowRight } from "../../../assets/svg/ArrowRight.svg";
import { ReactComponent as ArrowLeft } from "../../../assets/svg/ArrowLeft.svg";



import liveplace from "../../../assets/liveplace.png";






import LiveBadge from "@/Components/LiveBadge";
import { Head, Link } from "@inertiajs/react";
import IconButton from "@/Components/IconButton";
import AcademySmallCard from "@/Components/Course/AcademySmallCard";
import AcademyLargeCard from "@/Components/Course/AcademyLargeCard";
import { useState } from "react";

const LiveTraining = ({ featured, live, upcoming, wasLive }) => {

    // console.log('featured')
    // console.log(featured)

    // console.log('live')
    // console.log(live)

    // console.log('upcoming')
    // console.log(upcoming)

    // console.log('wasLive')
    // console.log(wasLive)

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

    const handleContextMenu = (e) => {
        e.preventDefault(); 
      };

    return (
        <div onContextMenu={handleContextMenu} className="mt-[5rem] lg:mt-[6rem] ">
            <Head title="Live" />
            <div data-aos="fade-in" data-aos-delay="100" data-aos-easing="ease" data-aos-duration="300" className=" px-5 md:px-3 container mx-auto  ">
                {/* main header new  */}
                {featured ?
                    <div className="  md:px-3 container mx-auto mt-[5rem] md:mt-[6rem]">
                        {/* <Link  href={route("live-series.preview", featured?.id)}    > */}
                        <AcademyLargeCard
                            className={"academy-large-card feature-card"}
                            title={featured?.title}
                            instructor={featured?.default_instructor?.full_name}
                            duration={"5 hr 40 min"}
                            lessons={featured?.lessons_count}
                            desktop_image={featured?.live_series?.thumbnail}
                            mobile_image={featured?.live_series?.mobile_thumbnail}
                            badge={"primary"}
                            badge_text={""}
                            live={false} />
                        {/* </Link> */}

                        <div className="w-full -mt-[3rem] md:-mt-[7rem]  ">
                            <div className="flex justify-center  ">
                                <Link href={route("live-series.preview", featured?.id)}  >
                                    <Button
                                        className={"primary  static z-[999] uppercase "}  >
                                        WATCH LIVE
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    :
                    <div className="container mx-auto rounded-[25px]  ">

                        <img src={liveplace} alt="no live training" className="rounded-[25px]" />

                    </div>
                }
                {/* hidden live slider old  */}
                {/* **************new design live now training******************  */}







                <div className="container mx-auto   ">

                    {/* ******************************************** New Large card LIVE NOW ************************ */}
                    {live?.length > 0 && <>
                        <div>
                            <h1 className="text-50 text-center mt-[3rem] md:mt-[6rem] ">LIVE NOW</h1>
                        </div>
                        {/* <Link
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
                                desktop_image={live[0]?.live_series?.thumbnail}
                                badge={"primary"}
                                badge_text={""}
                                live={true} />
                        </Link> */}
                        {/* ************* New Large card end ******** */}
                        {/* ******************* Live now New small card ***************** */}
                        <div className="grid grid-cols-12 gap-y-2 md:gap-y-6 gap-x-2 lg:gap-x-6  mt-[20px] md:mt-[40px]">
                            {live?.map((data, index) => (
                                 <React.Fragment key={index+3}>

                                    <div className="col-span-12 lg:col-span-6">

                                        <AcademySmallCard
                                            className={"academy-small-card new-course-card  "}
                                            title={data?.live_series?.title}
                                            instructor={data?.live_series?.default_instructor?.full_name}
                                            duration={"5 hr 40 min"}
                                            lessons={data?.lessons_count}
                                            desktop_image={data?.live_series?.thumbnail}
                                            mobile_image={data?.live_series?.mobile_thumbnail}

                                            routeToPlay={route('live-series.preview', data.id)}
                                            badge={"primary"}
                                            badge_text={""}
                                            live={true}
                                            liveBadge={true}
                                            videoProgress={0}
                                        />

                                    </div>
                                </React.Fragment>
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
                            {/* <div className="large-second mt-[20px] md:mt-[40px] ">
                                <Link

                                    href={upcoming[0]?.live_series_id ? route("live-series.preview", upcoming[0]?.id) : route("live-training.preview", upcoming[0]?.id)}
                                >
                                    <AcademyLargeCard
                                        className={"academy-large-card feature-card"}
                                        title={upcoming[0]?.live_series_id ? upcoming[0]?.live_series?.title : upcoming[0]?.title}
                                        instructor={upcoming[0]?.live_series_id ? upcoming[0]?.live_series?.default_instructor?.full_name : upcoming[0]?.default_instructor?.full_name}
                                        duration={"5 hr 40 min"}
                                        lessons={'null'}
                                        desktop_image={upcoming[0]?.live_series?.thumbnail}
                                        mobile_image={upcoming[0]?.live_series?.thumbnail}

                                        badge={"primary"}
                                        badge_text={""}

                                        live={true}
                                        upcomming={true}
                                    />
                                </Link>
                            </div> */}
                            <div className="grid grid-cols-12 gap-y-2 md:gap-y-4 lg:gap-y-[24px] gap-x-2 md:gap-x-4 lg:gap-x-[28px] mt-[20px] md:mt-[40px] ">
                                {upcoming?.map((data, index) => (
                                     <React.Fragment key={index+3}>
                                        {/* {index != 0 && */}
                                        <div className="col-span-12 lg:col-span-6">
                                            <Link key={index + 1}
                                                href={data?.live_series_id ? route("live-series.preview", data?.id) : route("live-training.preview", data?.id)}
                                            >
                                                <AcademySmallCard
                                                    className={"academy-small-card new-course-card"}
                                                    title={data?.live_series_id ? data?.live_series?.title : data?.title}
                                                    instructor={data?.live_series_id ? data?.live_series?.default_instructor?.full_name : data?.default_instructor?.full_name}
                                                    duration={"5 hr 40 min"}
                                                    lessons={data?.lessons_count}

                                                    desktop_image={data?.live_series?.thumbnail}
                                                    mobile_image={data?.live_series?.mobile_thumbnail}

                                                    routeToPlay={route('live-series.preview', data.id)}
                                                    badge={"primary"}
                                                    badge_text={""}
                                                    live={true}
                                                    liveBadge={false}
                                                    videoProgress={0}
                                                    upcomming={true}
                                                    wasLiveBadge={false}
                                                />

                                            </Link>
                                        </div>
                                        {/* } */}
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    }


                    {/* ********Was live ***************  */}






                    {wasLive?.length > 0 &&
                        <div>
                            <div>
                                <h1 className="text-50 text-center mt-[3rem] md:mt-[6rem] ">WAS LIVE</h1>
                            </div>

                            <div className="grid grid-cols-12 gap-y-2 md:gap-y-4 lg:gap-y-[24px] gap-x-2 md:gap-x-4 lg:gap-x-[28px] mt-[20px] md:mt-[40px] ">
                                {wasLive?.map((data, index) => (
                                    <React.Fragment key={index+3}>
                                        <div className="col-span-12 lg:col-span-6">
                                            <Link key={index + 1}
                                                href={data?.live_series_id ? route("live-series.preview", data?.id) : route("live-training.preview", data?.id)}
                                            >
                                                <AcademySmallCard
                                                    className={"academy-small-card new-course-card"}
                                                    title={data?.live_series_id ? data?.live_series?.title : data?.title}
                                                    instructor={data?.live_series_id ? data?.live_series?.default_instructor?.full_name : data?.default_instructor?.full_name}
                                                    duration={"5 hr 40 min"}
                                                    lessons={data?.lessons_count}

                                                    desktop_image={data?.live_series?.thumbnail}
                                                    mobile_image={data?.live_series?.mobile_thumbnail}

                                                    routeToPlay={route('live-series.preview', data.id)}
                                                    badge={"primary was-live-bg "}
                                                    badge_text={""}
                                                    live={true}
                                                    liveBadge={false}
                                                    videoProgress={0}
                                                    upcomming={false}
                                                    wasLiveBadge={true}
                                                />

                                            </Link>
                                        </div>
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    }
















                </div>






            </div>
        </div>
    );
};
LiveTraining.layout = (page) => <Layout children={page} />;
export default LiveTraining;
