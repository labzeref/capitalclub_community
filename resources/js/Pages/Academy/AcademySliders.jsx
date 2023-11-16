import React, { useEffect, useRef } from "react";
import Layout from "@/Layouts/Layout.jsx";
import Button from "../../Components/Button";
import OwlCarousel from "react-owl-carousel";



import { ReactComponent as WatchSvg } from "../../../assets/svg/watch.svg";
import { ReactComponent as ArrowRight } from "../../../assets/svg/ArrowRight.svg";
import { ReactComponent as ArrowLeft } from "../../../assets/svg/ArrowLeft.svg";



import CourseCard from "@/Components/Course/CourseCard.jsx";
import CourseFeaturedCard from "@/Components/Course/CourseFeaturedCard.jsx";
import Badge from "@/Components/Badge.jsx";
import CourseInstructorCard from "@/Components/Course/CourseInstructorCard.jsx";
import { Link, useForm } from "@inertiajs/react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import AcademyLargeCard from "@/Components/Course/AcademyLargeCard";
import AcademySmallCard from "@/Components/Course/AcademySmallCard";
import IconButton from "@/Components/IconButton";

const AcademySliders = ({
    categories,
    categoryWiseCourses,
    mainCourses,
    featuredCourses,
    topInstructors,
    newCourses,
    upcomingCourses,
}) => {
    useEffect(() => {
        AOS.init();
    }, [])

    const { post } = useForm();

    const handleRoute = (id) => {
        post(route('instructors.show', id))
    }

    console.log("categories");
    console.log(categories);
    console.log("categoryWiseCourses");
    console.log(categoryWiseCourses);
    console.log("mainCourses");
    console.log(mainCourses);
    console.log("featuredCourses");
    console.log(featuredCourses);
    console.log("topInstructors");
    console.log(topInstructors);
    console.log("newCourses");
    console.log(newCourses);
    console.log("upcomingCourses");
    console.log(upcomingCourses);
    console.log("topInstructors", topInstructors);


    const filteredCategories = categoryWiseCourses.filter(category => category?.courses.length > 0);
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

  return (
    <div>


                {/* Featured slider */}
                <section data-aos="fade-in" data-aos-delay="100" data-aos-easing="ease" data-aos-duration="300" className="mt-[60px] md:mt-[80px] lg:mt-[120px] group ">
                    <div className="w-[93%] mx-auto px-5 xl:px-0">
                        <div className="grid grid-cols-3 mb-8">
                            <div onClick={() => { handleSliderPrev(featureRef) }} className="cursor-pointer invisible group-hover:visible ">
                                <Button
                                    className={"secondary header_arrow"}
                                    icon={<ArrowLeft />}
                                ></Button>
                            </div>
                            <div className="text-center">
                                <h3 className="font-medium">Featured</h3>
                            </div>
                            <div onClick={() => { handleSliderNext(featureRef) }} className="ml-auto cursor-pointer invisible group-hover:visible ">
                                <Button
                                    className={"secondary header_arrow"}
                                    icon={<ArrowRight />}
                                ></Button>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <div className="  w-[94%] ">
                            <div className="grid grid-cols-12">
                                <div className="col-span-12 relative h-[600px]">
                                    <div className="left-0">
                                        <OwlCarousel
                                            // center={true}
                                            ref={featureRef}
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
                                            {featuredCourses?.map(
                                                (data, index) => (
                                                    <Link
                                                        key={index + 1}
                                                        href={route(
                                                            "courses.preview",
                                                            data?.id
                                                        )}
                                                    >
                                                        <CourseFeaturedCard
                                                            title={data?.title}
                                                            instructor={
                                                                data?.instructor
                                                                    ?.full_name
                                                            }
                                                            duration={
                                                                "5 hr 40 min"
                                                            }
                                                            lessons={
                                                                data?.lessons_count
                                                            }
                                                            image={
                                                                data?.thumbnail
                                                                    ?.medium
                                                                    ?.url
                                                            }
                                                            badge={"primary"}
                                                            badge_text={""}
                                                            live={false}
                                                        />{" "}
                                                    </Link>
                                                )
                                            )}
                                        </OwlCarousel>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* new lesson available slider */}

                <section className="mt-[60px] md:mt-[80px] lg:mt-[120px] group">
                    <div className="container mx-auto px-5 xl:px-0">
                        <div className="grid grid-cols-1 lg:grid-cols-3 mb-8">
                            <div onClick={() => { handleSliderPrev(newLessonRef) }} className="cursor-pointer hidden lg:block lg:invisible group-hover:lg:visible">
                                <Button
                                    className={"secondary header_arrow"}
                                    icon={<ArrowLeft />}
                                ></Button>
                            </div>

                            <div className="text-center">
                                <h3>New Lesson Available</h3>
                                <p className="fs-regular fw-regular opacity-60">
                                    12 Classes
                                </p>
                            </div>

                            <div onClick={() => { handleSliderNext(newLessonRef) }} className="ml-auto cursor-pointer hidden lg:block lg:invisible group-hover:lg:visible">
                                <Button
                                    className={"secondary header_arrow"}
                                    icon={<ArrowRight />}
                                ></Button>
                            </div>
                        </div>
                    </div>
                    <div className="px-5 xl:px-0">
                        <div className="grid grid-cols-12">
                            <div className="col-span-12">
                                <OwlCarousel
                                    ref={newLessonRef}
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
                                    {newCourses?.map((course, index) => (<Link
                                        href={route(
                                            "courses.preview",
                                            course?.id
                                        )}
                                        key={index + 1}
                                    >
                                        <CourseCard
                                            title={course?.title}
                                            instructor={course?.default_instructor?.full_name}
                                            duration={"2 hr 10 min"}
                                            lessons={course?.lessons_count}
                                            image={course?.thumbnail?.small?.url}
                                            badge={"primary"}
                                            badge_text={""}
                                        />
                                    </Link>))}
                                    {/* <CourseCard
                                        title={
                                            "An Intuitive Approach to Design"
                                        }
                                        instructor={"Christina Aguilera"}
                                        duration={"2 hr 13 min"}
                                        lessons={7}
                                        image={newLesson2}
                                        badge={"primary"}
                                        badge_text={""}
                                    /> */}

                                </OwlCarousel>
                            </div>
                        </div>
                    </div>
                </section>




                {/* Art and entertainment  slider */}

                {filteredCategories?.map((category, index) => (<section key={index + 1} className="mt-[60px] md:mt-[80px] lg:mt-[120px] group">
                    <div className="container mx-auto px-5 xl:px-0">
                        <div className="grid grid-cols-1 lg:grid-cols-3 mb-8">
                            <div onClick={() => handleMapPrev(index)} className="cursor-pointer hidden lg:block lg:invisible group-hover:lg:visible">
                                <Button
                                    className={"secondary header_arrow"}
                                    icon={<ArrowLeft />}
                                ></Button>
                            </div>

                            <div className="text-center">
                                <h3>{category?.name}</h3>
                                <p className=" fs-regular fw-regular opacity-60">
                                    {category?.courses && category?.courses?.length} Classes
                                </p>
                            </div>

                            <div onClick={() => handleMapNext(index)} className="ml-auto cursor-pointer hidden lg:block lg:invisible group-hover:lg:visible">
                                <Button
                                    className={"secondary header_arrow"}
                                    icon={<ArrowRight />}
                                ></Button>
                            </div>
                        </div>
                    </div>
                    <div className="px-5 xl:px-0">
                        <div className="grid grid-cols-12">
                            <div className="col-span-12">
                                <OwlCarousel
                                    ref={(element) => (mapRefs.current[index] = element)}
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
                                    {category?.courses?.map((course, index) => (<Link
                                        href={route(
                                            "courses.preview",
                                            course?.id
                                        )}
                                        key={index + 1}
                                    >   <CourseCard
                                            title={
                                                course?.title
                                            }
                                            instructor={
                                                course?.default_instructor?.full_name
                                            }
                                            duration={"2 hr 10 min"}
                                            lessons={course?.lessons_count}
                                            image={course?.thumbnail?.small?.url}
                                            badge={"primary"}
                                            badge_text={""}
                                        /> </Link>))}

                                </OwlCarousel>
                            </div>
                        </div>
                    </div>
                </section>))}




                {/* Top instructor  slider */}

                <section className="mt-[60px] md:mt-[80px] lg:mt-[120px] group">
                    <div className="container mx-auto px-5 xl:px-0">
                        <div className="grid grid-cols-1 lg:grid-cols-3 mb-8">
                            <div onClick={() => { handleSliderPrev(topInstRef) }} className="cursor-pointer hidden lg:block lg:invisible group-hover:lg:visible">
                                <Button
                                    className={"secondary header_arrow"}
                                    icon={<ArrowLeft />}
                                ></Button>
                            </div>

                            <div className="text-center">
                                <h3 className=" ">Top Instructors</h3>
                            </div>

                            <div onClick={() => { handleSliderNext(topInstRef) }} className="ml-auto cursor-pointer hidden lg:block lg:invisible group-hover:lg:visible">
                                <Button
                                    className={"secondary header_arrow"}
                                    icon={<ArrowRight />}
                                ></Button>
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

                {/*  marquee text gain new skills */}
                <section className="mt-[60px] md:mt-[80px] lg:mt-[120px] relative ">
                    <div className="marquee-shadow left "></div>
                    <div className="marquee-shadow right "></div>
                    <div className="">
                        <div className="grid grid-cols-12">
                            <div className="col-span-12">
                                <div className="text-center ">
                                    <marquee
                                        direction="left"
                                        loop=""
                                        scrollamount="20"
                                    >
                                        <h1 className="uppercase slider-Text">
                                            GAIN NEW SKILLS - GAIN NEW SKILLS -
                                            GAIN NEW SKILLS
                                        </h1>
                                    </marquee>
                                    <marquee
                                        direction="right"
                                        loop=""
                                        scrollamount="16"
                                    >
                                        <h1 className="uppercase slider-Text">
                                            GAIN NEW SKILLS - GAIN NEW SKILLS -
                                            GAIN NEW SKILLS
                                        </h1>
                                    </marquee>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Upcoming slider */}

                <section className="mt-[60px] md:mt-[80px] lg:mt-[120px] group">
                    <div className="container mx-auto px-5 xl:px-0">
                        <div className="grid grid-cols-1 lg:grid-cols-3 mb-8">
                            <div onClick={() => { handleSliderPrev(upComingRef) }} className="cursor-pointer hidden lg:block lg:invisible group-hover:lg:visible">
                                <Button
                                    className={"secondary header_arrow"}
                                    icon={<ArrowLeft />}
                                ></Button>
                            </div>

                            <div className="text-center">
                                <h3 className=" ">Upcoming</h3>
                            </div>

                            <div onClick={() => { handleSliderNext(upComingRef) }} className="ml-auto cursor-pointer hidden lg:block lg:invisible group-hover:lg:visible">
                                <Button
                                    className={"secondary header_arrow"}
                                    icon={<ArrowRight />}
                                ></Button>
                            </div>
                        </div>
                    </div>
                    <div className="px-5 xl:px-0">
                        <div className="grid grid-cols-12">
                            <div className="col-span-12">
                                <OwlCarousel
                                    ref={upComingRef}
                                    className="owl-theme relative"

                                    margin={24}
                                    autoplay={true}
                                    autoplayHoverPause={true}
                                    autoplayTimeout={7000}
                                    animateIn={"fadeIn"}
                                    animateOut={"fadeOut"}
                                    nav={false}
                                    dots={false}
                                    autoWidth={true}
                                >
                                    {upcomingCourses?.map((data, index) => (
                                        <div key={index + 1}>

                                            <CourseCard
                                                title={data?.title}
                                                instructor={data?.default_instructor?.full_name}
                                                duration={"2 hr 10 min"}
                                                lessons={data?.lessons_count}
                                                image={data?.thumbnail?.small?.url}
                                                badge={"primary"}
                                                badge_text={"upcoming"}
                                            />
                                        </div>
                                    ))}


                                </OwlCarousel>
                            </div>
                        </div>
                    </div>
                </section>

    </div>
  )
}

export default AcademySliders
