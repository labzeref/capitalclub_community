import React, {useEffect, useRef, lazy, Suspense} from "react";
import Layout from "@/Layouts/Layout.jsx";
import Button from "../../Components/Button";
import OwlCarousel from "react-owl-carousel";
import {motion} from 'framer-motion'

import {ReactComponent as WatchSvg} from "../../../assets/svg/watch.svg";
import {ReactComponent as ArrowRight} from "../../../assets/svg/ArrowRight.svg";
import whiteimg from "../../../assets/white.jpg";

import {ReactComponent as ArrowLeft} from "../../../assets/svg/ArrowLeft.svg";

import BackgroundImageOnLoad from 'background-image-on-load';


import CourseCard from "@/Components/Course/CourseCard.jsx";
import CourseFeaturedCard from "@/Components/Course/CourseFeaturedCard.jsx";
import Badge from "@/Components/Badge.jsx";
import CourseInstructorCard from "@/Components/Course/CourseInstructorCard.jsx";
import {Head, Link, useForm} from "@inertiajs/react";
import AOS from 'aos';
import 'aos/dist/aos.css';

const AcademyLargeCard = lazy(() => import("@/Components/Course/AcademyLargeCard"));
const AcademySmallCard = lazy(() => import("@/Components/Course/AcademySmallCard"));

// import AcademyLargeCard from "@/Components/Course/AcademyLargeCard";
// import AcademySmallCard from "@/Components/Course/AcademySmallCard";
import IconButton from "@/Components/IconButton";
import ToastNotification from "@/Components/ToastNotification";
import {useState} from "react";

const Academy = ({
    mainCourses,
    featuredCourses,
    generalCourses,
    topInstructors,
}) => {

    useEffect(() => {
        AOS.init();
    }, [])

    const {post} = useForm();

    const handleRoute = (id) => {
        post(route('instructors.show', id))
    }

    // console.log("categories");
    // console.log(categories);
    // console.log("categoryWiseCourses");
    // console.log(categoryWiseCourses);
    // console.log("mainCourses");
    // console.log(mainCourses);
    // console.log("featuredCourses");
    // console.log(featuredCourses);
    // console.log("topInstructors");
    // console.log(topInstructors);
    // console.log("newCourses");
    // console.log(newCourses);
    // console.log("upcomingCourses");
    // console.log(upcomingCourses);
    // console.log("topInstructors", topInstructors);


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

    const handleSliderNext = (ref) => {
        ref.current.next();
    };

    const handleSliderPrev = (ref) => {
        ref.current.prev();
    };


    //  map function slider buttons
    const mapRefs = useRef([]);

    const handleMapNext = (index) => {
        mapRefs.current[index].next();
    };

    const handleMapPrev = (index) => {
        mapRefs.current[index].prev();
    };

    const [imageLoaded, setImageLoaded] = useState(false);

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

    return (
        <div className=" ">
            <Head title="Academy"/>
            <div className="   ">
                {/* Main slider  */}

                <div data-aos="fade-in" data-aos-delay="100" data-aos-easing="ease" data-aos-duration="300"
                     className="relative">
                    <OwlCarousel
                        ref={mainRef}
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
                        {mainCourses?.map((data, index) => (
                            <div key={index + 1}
                                 className="item h-[65vh] md:min-h-[75vh] md:h-[75vh] lg:h-[80vh]  w-100 flex items-center position-relative main-header pt-[4rem] md:pt-[6rem] lg:pt-[6rem] p-[]100rem">
                                <div className="shadow top"></div>
                                <div className="shadow bottom"></div>
                                <div className="shadow left"></div>
                                {/* <div className="w-full border border-rose-400 p-5"> */}
                                <div className="container mx-auto my-auto w-full     px-5 lg:px-2 content">
                                    <div className="max-w-md">
                                        <h1 className="mb-2 text-center md:text-start">{data?.title?.length > 20 ? data?.title?.substring(0, 20) + "..." : data?.title}</h1>
                                        <h3 className="mb-5 font-normal text-center md:text-start">
                                            {data?.default_instructor?.full_name}
                                        </h3>
                                        <div className="flex items-center justify-center md:justify-start gap-8 mb-4">
                                            <div
                                                className="regular text-[#FFFFFF] font-normal flex item-center"
                                            >
                                                <span className="mr-[10px]">
                                                    <svg
                                                        width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M18 20H6" stroke="white" strokeWidth="1.2"
                                                              strokeLinecap="round" strokeLinejoin="round"/>
                                                        <path d="M22 4H2V16H22V4Z" fill="#FAFAFA" fillOpacity="0.2"
                                                              stroke="white" strokeWidth="1.2" strokeLinecap="round"
                                                              strokeLinejoin="round"/>
                                                    </svg>

                                                </span>
                                                <span className=" course-color ">
                                                    4 hours
                                                </span>
                                            </div>
                                            <a
                                                href="#"
                                                className="regular text-[#FFFFFF] font-normal flex item-center"
                                            >
                                                <span className="mr-[10px]">
                                                    <svg
                                                        width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path fillRule="evenodd" clipRule="evenodd"
                                                              d="M3 21H12H21C21.55 21 22 20.55 22 20V4C22 3.45 21.55 3 21 3H12H3C2.45 3 2 3.45 2 4V20C2 20.55 2.45 21 3 21Z"
                                                              fill="white" fillOpacity="0.2"/>
                                                        <path d="M4 12H10" stroke="#E0E0E0" strokeWidth="1.2"
                                                              strokeMiterlimit="10"/>
                                                        <path d="M4 8H10" stroke="#E0E0E0" strokeWidth="1.2"
                                                              strokeMiterlimit="10"/>
                                                        <path d="M4 16H10" stroke="#E0E0E0" strokeWidth="1.2"
                                                              strokeMiterlimit="10"/>
                                                        <path d="M14 12H20" stroke="#E0E0E0" strokeWidth="1.2"
                                                              strokeMiterlimit="10"/>
                                                        <path d="M14 8H20" stroke="#E0E0E0" strokeWidth="1.2"
                                                              strokeMiterlimit="10"/>
                                                    </svg>

                                                </span>
                                                <span className=" ">
                                                    {data?.lessons_count} Lessons
                                                </span>
                                            </a>
                                        </div>
                                        <p className=" text-center md:text-start  mb-8">
                                            {data?.summery?.length > 110 ? data?.summery?.substring(0, 110) + "..." : data?.summery}
                                        </p>
                                        <div className="flex justify-center md:justify-start">
                                            <Link
                                                href={route("courses.preview", data?.id)}
                                            >
                                                <Button
                                                    className={
                                                        "primary   uppercase "
                                                    }
                                                    // icon={<WatchSvg />}
                                                >
                                                    Watch now
                                                </Button>
                                            </Link>


                                        </div>
                                    </div>
                                </div>
                                {/* </div> */}

                                <div
                                    className="h-100 w-100 header-image"

                                    // style={{
                                    //     backgroundImage: `url(${ imageLoaded ? data?.thumbnail?.original?.url : data?.thumbnail?.small?.url  })`,
                                    // }}
                                    // onLoad={() => setImageLoaded(true)}
                                >
                                    {/* <BackgroundImageOnLoad
            src={data?.thumbnail?.original?.url}
            onLoadBg={() =>	setImageLoaded(true)}
          /> */}
                                    <img
                                        src={imageLoaded ? data?.thumbnail?.original?.url : data?.thumbnail?.medium?.url}
                                        onLoad={() => setImageLoaded(true)} className="h-100 w-100 header-image"/>
                                    <div className="overlay"></div>
                                </div>
                            </div>
                        ))}

                    </OwlCarousel>
                    <div className="  container mx-auto -mt-[4rem] z-[9999] relative">
                        <div className=" ml-2 absolute     ">
                            <div className=" hidden lg:block">
                                <div className="flex   gap-3">
                                    <div onClick={() => {
                                        handleSliderPrev(mainRef)
                                    }}>
                                        <IconButton
                                            className={"secondary header_arrow"}
                                            icon={<ArrowLeft/>}
                                        ></IconButton>

                                    </div>
                                    <div onClick={() => {
                                        handleSliderNext(mainRef)
                                    }}>
                                        <IconButton
                                            className={"secondary header_arrow"}
                                            icon={<ArrowRight/>}
                                        ></IconButton>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* category slider */}

                {/* <section data-aos="fade-in" className="mt-20 group">
                    <div className="px-5 xl:px-0">
                        <div className="container mx-auto">
                            <div className="grid grid-cols-1 lg:grid-cols-3 mb-8">
                                <div onClick={() => { handleSliderPrev(catRef) }} className="cursor-pointer hidden lg:block lg:invisible group-hover:lg:visible">
                                    <Button
                                        className={"secondary header_arrow"}
                                        icon={<ArrowLeft />}
                                    ></Button>
                                </div>

                                <div className="text-center">
                                    <h3>Categories</h3>
                                </div>

                                <div onClick={() => { handleSliderNext(catRef) }} className="ml-auto cursor-pointer hidden lg:block lg:invisible group-hover:lg:visible">
                                    <Button
                                        className={"secondary header_arrow"}
                                        icon={<ArrowRight />}
                                    ></Button>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-12">


                            <div className="col-span-12 relative">
                                <div className="marquee-shadow left z-index-50"></div>
                                <div className="marquee-shadow right z-index-50"></div>
                                <OwlCarousel
                                    ref={catRef}
                                    className="owl-theme relative"
                                    margin={10}
                                    autoWidth={true}
                                    animateIn={"fadeIn"}
                                    animateOut={"fadeOut"}
                                    nav={false}
                                    dots={false}
                                >
                                    {categories?.map((data, index) => (
                                        <div key={index + 1} className="item  ">
                                            <div className=" h-[95px] w-[112px] md:w-auto  md:h-20  md:flex  items-center  noise-10 inset-border slider-cat-img   py-4 md:py-6 px-4 md:px-8 justify-center">
                                                <img
                                                    src={data?.icon?.url}
                                                    className=" w-[2rem] flex mx-auto h-[2rem] "
                                                />

                                                <p className="fs-regular-sm  text-center fw-regular md:ml-4">
                                                    {data?.name}
                                                </p>
                                            </div>
                                        </div>
                                    ))}

                                </OwlCarousel>
                            </div>
                        </div>
                    </div>
                </section> */}


                {/* ********************New layout ************************** */}


                <div className="container mx-auto px-5 lg:px-3  mt-[6rem] lg:mt-[8rem]">
                    {/* ******************************************** New Large card ************************ */}
                    <div>
                            <h1 className="text-50 text-center mt-[3rem] md:mt-[6rem] "> FEATURED COURSES</h1>
                        </div>
                      {featuredCourses?.length > 0 &&
                      <div className="mt-[20px] md:mt-[40px]">
                    <Link

                        href={route(
                            "courses.preview",
                            featuredCourses[0]?.id
                        )}
                    >
                        <Suspense fallback={<div>Loading...</div>}>
                            <AcademyLargeCard
                                className={'academy-large-card feature-card'}
                                title={featuredCourses[0]?.title}
                                instructor={featuredCourses[0]?.default_instructor?.full_name}
                                duration={"5 hr 40 min"}
                                lessons={featuredCourses[0]?.lessons_count}
                                medium_image={featuredCourses[0]?.thumbnail?.medium?.url}
                                original_image={featuredCourses[0]?.thumbnail?.original?.url}
                                badge={"primary"}
                                badge_text={""}
                                live={false}/>
                        </Suspense>
                    </Link>
                    </div>
                    }
                    {/* ************* New Large card end ******** */}
                    {/* ******************* New small card ***************** */}
                    <div className="grid grid-cols-12 gap-y-2 md:gap-y-4 lg:gap-y-6 gap-x-2 md:gap-x-4 lg:gap-x-6  mt-3 md:mt-0">
                        {featuredCourses?.map((data, index) => (
                            <>
                                {index >= 1 && index <= 2 &&
                                    <div className="col-span-6  ">

                                        <motion.div
                                            initial={{opacity: 0}}
                                            animate={{opacity: 1}}><Link
                                            key={index + 1}
                                            href={route(
                                                "courses.preview",
                                                data?.id
                                            )}
                                        >

                                            <AcademySmallCard
                                                className={"academy-small-card feature-card"}
                                                title={data?.title}
                                                instructor={data?.default_instructor?.full_name}
                                                duration={"5 hr 40 min"}
                                                lessons={data?.lessons_count}
                                                medium_image={data?.thumbnail?.small?.url}
                                                original_image={data?.thumbnail?.medium?.url}
                                                badge={"primary"}
                                                badge_text={""}
                                                live={false}
                                                videoProgress={0}
                                            />

                                        </Link>
                                        </motion.div>
                                    </div>}
                            </>
                        ))}
                    </div>
                    {/* ******************New small card end ****************** */}


                    {/* *****************course section **************** */}

                    <div>
                        <div>
                            <h1 className="text-50 text-center mt-[3rem] md:mt-[6rem] ">COURSES SECTION</h1>
                        </div>
                        {generalCourses?.length > 0 && <div className="large-second mt-[20px] md:mt-[40px] ">
                            <Link

                                href={route(
                                    "courses.preview",
                                    generalCourses[0]?.id
                                )}
                            >
                                <AcademyLargeCard
                                    className={"academy-large-card feature-card"}
                                    title={generalCourses[0]?.title}
                                    instructor={generalCourses[0]?.default_instructor?.full_name}
                                    duration={"5 hr 40 min"}
                                    lessons={generalCourses[0]?.lessons_count}
                                    medium_image={generalCourses[0]?.thumbnail?.medium?.url}
                                    original_image={generalCourses[0]?.thumbnail?.original?.url}
                                    badge={"primary"}
                                    badge_text={""}
                                    live={false}/>
                            </Link>
                        </div>
                        }
                        <div className="grid grid-cols-12 gap-y-2 md:gap-y-4 lg:gap-y-[24px] gap-x-2 md:gap-x-4 lg:gap-x-[30px] mt-3 md:mt-0 ">
                            {generalCourses?.map((data, index) => (
                                <>
                                    {index >= 1 && index <= 6 &&
                                        <div className=" col-span-6">
                                            <Link
                                                key={index + 1}
                                                href={route(
                                                    "courses.preview",
                                                    data?.id
                                                )}
                                            >
                                                <AcademySmallCard
                                                    className={"academy-small-card new-course-card"}
                                                    title={data?.title}
                                                    instructor={data?.default_instructor?.full_name}
                                                    duration={"5 hr 40 min"}
                                                    lessons={data?.lessons_count}
                                                    medium_image={data?.thumbnail?.small?.url}
                                                    original_image={data?.thumbnail?.medium?.url}
                                                    badge={"primary"}
                                                    badge_text={""}
                                                    live={false}
                                                    videoProgress={0}/>

                                            </Link>

                                        </div>}
                                </>
                            ))}
                        </div>
                    </div>

                    {/* course section end  */}
                </div>


                {/* Top instructor  slider */}

                <section className="mt-[4rem] group">
                    <div className="container mx-auto px-5 xl:px-0">
                        <div className=" flex justify-center lg:justify-between   mb-8">
                            <div onClick={() => {
                                handleSliderPrev(topInstRef)
                            }} className="cursor-pointer hidden w-[10%] lg:block lg:invisible group-hover:lg:visible">
                                <IconButton
                                    className={"secondary  "}
                                    icon={<ArrowLeft/>}
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
                                    icon={<ArrowRight/>}
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
                </section>


            </div>
        </div>
    );
};
Academy.layout = (page) => <Layout children={page}/>;
export default Academy;
