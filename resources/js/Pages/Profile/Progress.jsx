import React, { useRef } from "react";
import ProfileLayout from "@/Layouts/ProfileLayout.jsx";
import Layout from "@/Layouts/Layout.jsx";
import CourseCard from "@/Components/Course/CourseCard";
import OwlCarousel from "react-owl-carousel";
import Button from "../../Components/Button";
import { ReactComponent as ArrowRight } from "../../../assets/svg/ArrowRight.svg";
import nodata from "../../../assets/svg/nodata.svg";
import ProgressCard from "@/Components/Course/ProgressCard";
import NotesCard from "@/Components/Course/NotesCard";
import NotesModal from "@/Components/Modal/NotesModal";
import { Link, useForm } from "@inertiajs/react";
import IconButton from "@/Components/IconButton";
import AcademySmallCard from "@/Components/Course/AcademySmallCard";

const Progress = ({
    bookmarkedLiveStream,
    enrolledCourses,
    bookmarkedCourses,
    bookmarkedLessons,
    notedCourses,
}) => {

    // console.log("bookmarkedCourses");
    // console.log(bookmarkedCourses);
    // console.log("bookmarkedLessons");
    // console.log(bookmarkedLessons);
    // console.log("notedCourses");
    // console.log(notedCourses);
    // console.log("bookmarkedLiveStream");
    // console.log(bookmarkedLiveStream);



    const { post } = useForm();

    const handleBookmarkLessonToggle = (id) => {
        console.log("boookmark id ....:", id);

        post(route("bookmark-toggle.lessons", id), {
            preserveScroll: true,
        });
    };


    const handleBookmarkCourseToggle = (id) => {
        console.log("boookmark course id ....:", id);

        post(route("bookmark-toggle.courses", id), {
            preserveScroll: true,
        });
    };


    const handleBookmarkLiveToggle = (id) => {
        post(route("bookmark-toggle.live-stream", id), {
            preserveScroll: true,
        });
    };

    const progressRef = useRef(null);
    const lessonRef = useRef(null);
    const courseRef = useRef(null);
    const liveRef = useRef(null);

    const handleSliderNext = (ref) => {
        ref.current.next();
    };
    return (
        <div>
            <div data-aos="fade-in" data-aos-delay="100" data-aos-easing="ease" data-aos-duration="300" className=" md:py-[3rem] py-[2rem]  md:px-6 ">
                <div className="grid grid-cols-12 gap-4 px-5 lg:px-0 pb-6">
                    {/* <div className="col-span-2 md:col-span-2 hidden md:block"> </div> */}
                    <div className="col-span-12 lg:col-span-12">

                        <div className="flex justify-between  ">
                            <h3 className="    ">Progress</h3>
                            {enrolledCourses?.length > 0 && <div className="hidden md:block" onClick={() => { handleSliderNext(progressRef) }}>
                                <IconButton
                                    className={"secondary header_arrow"}
                                    icon={<ArrowRight />}
                                ></IconButton>

                            </div>}
                        </div>
                    </div>

                </div>
                <div className="grid grid-cols-12 gap-y-12 gap-x-5 lg:gap-x-6">
                    <div className="col-span-12 lg:col-span-12 xl:col-span-12 px-5 lg:px-0">
                        {enrolledCourses?.length > 0 ? (
                            <OwlCarousel
                                ref={progressRef}
                                className="owl-theme relative"
                                loop
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
                                {enrolledCourses?.map((lesson, index) => (
                                    <div key={index + 1}>
                                        <Link href={route('lessons.play', lesson?.id)}>
                                            <AcademySmallCard
                                                className={"academy-small-card isSlider feature-card"}
                                                title={lesson?.title}
                                                instructor={lesson?.instructor?.full_name}
                                                duration={"5 hr 40 min"}
                                                lessons={lesson?.lessons_count}
                                                original_image={lesson?.thumbnail?.medium?.url}
                                                medium_image={lesson?.thumbnail?.small?.url}
                                                badge={"primary"}
                                                badge_text={""}
                                                live={false}
                                                videoProgress={lesson?.progress}
                                                isProgressCard={true}
                                                bookMark={false}
                                                id={lesson?.id}
                                            />
                                        </Link>


                                        {/* <ProgressCard
                                            title={lesson?.title}
                                            instructor={lesson?.instructor?.full_name }
                                            duration={"2 hr 10 min"}
                                            lessons={7}
                                            image={lesson?.thumbnail?.small?.url}
                                            badge={"primary"}
                                            badge_text={""}
                                            videoProgress={lesson?.progress}
                                        /> */}
                                    </div>
                                ))}
                            </OwlCarousel>
                        ) : (
                            // <p className=" w-full opacity-50 text-center">
                            //     No data
                            // </p>
                            <div className="flex  justify-center w-full">
                                <img src={nodata} className="w-[4rem] h-[8rem]" alt='no data' />

                            </div>
                        )}{" "}
                    </div>
                </div>


                {/* Bookmark lesson  */}


                <div className="grid grid-cols-12 gap-y-12 gap-x-5 lg:gap-x-6 md:pt-[3rem] pt-[2rem] ">
                    <div className="col-span-12 lg:col-span-12 xl:col-span-12  px-5 lg:px-0">
                        <div className="flex justify-between pb-[2rem] ">
                            <h3 className="">
                                My Bookmark Lessons
                            </h3>
                            {bookmarkedLessons?.length > 0 && <div className="hidden md:block" onClick={() => { handleSliderNext(lessonRef) }}>
                                <IconButton className={"secondary header_arrow"} icon={<ArrowRight />}  ></IconButton>

                            </div>}
                        </div>
                        {bookmarkedLessons?.length > 0 ? (
                            <OwlCarousel
                                ref={lessonRef}
                                className="owl-theme relative"
                                loop
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
                                {bookmarkedLessons?.map((lesson, index) => (
                                    <div key={index + 1}>

                                        <Link href={route(
                                            "lessons.play",
                                            lesson?.id
                                        )} >

                                            <AcademySmallCard
                                                className={"academy-small-card isSlider feature-card"}
                                                title={lesson?.title}
                                                instructor={lesson?.instructor?.full_name}
                                                duration={"5 hr 40 min"}
                                                lessons={lesson?.lessons_count}
                                                original_image={lesson?.thumbnail?.medium?.url}
                                                medium_image={lesson?.thumbnail?.small?.url}
                                                badge={"primary"}
                                                badge_text={""}
                                                live={false}
                                                videoProgress={lesson?.progress}
                                                isProgressCard={true}
                                                bookMark={true}
                                                id={lesson?.id}
                                                handleBookmarkToggle={
                                                    handleBookmarkLessonToggle
                                                }
                                            />
                                        </Link>
                                    </div>
                                ))}
                            </OwlCarousel>
                        ) : (
                            // <p className=" w-full opacity-50 text-center">
                            //     No data
                            // </p>
                            <div className="flex  justify-center w-full">
                                <img src={nodata} className="w-[4rem] h-[8rem]" alt='no data' />

                            </div>
                        )}
                    </div>
                </div>

                {/* Bookmark course  */}

                <div className="grid grid-cols-12 gap-y-12 gap-x-5 lg:gap-x-6 md:pt-[3rem] pt-[2rem]">
                    <div className="col-span-12 lg:col-span-12 xl:col-span-12  px-5 lg:px-0">
                        <div className="flex justify-between pb-[2rem] ">

                            <h3 className="">
                                My Bookmark Courses
                            </h3>
                            {bookmarkedCourses?.length > 0 && <div className="hidden md:block" onClick={() => { handleSliderNext(courseRef) }}>
                                <IconButton
                                    className={"secondary header_arrow"}
                                    icon={<ArrowRight />}
                                ></IconButton>

                            </div>}

                        </div>
                        {bookmarkedCourses?.length > 0 ? (
                            <OwlCarousel
                                ref={courseRef}
                                className="owl-theme relative"
                                loop
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
                                {bookmarkedCourses?.map((lesson, index) => (
                                    <div key={index + 1}>
                                        <Link href={route(
                                            "courses.preview",
                                            lesson?.id
                                        )} >

                                            <AcademySmallCard
                                                className={"academy-small-card isSlider feature-card"}
                                                title={lesson?.title}
                                                instructor={lesson?.instructor?.full_name}
                                                duration={"5 hr 40 min"}
                                                lessons={lesson?.lessons_count}
                                                original_image={lesson?.thumbnail?.medium?.url}
                                                medium_image={lesson?.thumbnail?.small?.url}
                                                badge={"primary"}
                                                badge_text={""}
                                                live={false}
                                                videoProgress={lesson?.progress}
                                                isProgressCard={true}
                                                bookMark={true}
                                                id={lesson?.id}
                                                handleBookmarkToggle={
                                                    handleBookmarkCourseToggle
                                                }
                                            />
                                        </Link>
                                    </div>
                                ))}
                            </OwlCarousel>
                        ) : (
                            <div className="flex  justify-center w-full">
                                <img src={nodata} className="w-[4rem] h-[8rem]" alt='no data' />

                            </div>
                        )}
                    </div>
                </div>



                {/* Live Training Bookmark   */}

                <div className="grid grid-cols-12 gap-y-12 gap-x-5 lg:gap-x-6 md:pt-[3rem] pt-[2rem]">
                    <div className="col-span-12 lg:col-span-12 xl:col-span-12  px-5 lg:px-0">
                        <div className="flex justify-between pb-[2rem] ">

                            <h3 className="">
                                My Bookmark Live Trainings
                            </h3>
                            {bookmarkedLiveStream?.length > 0 && <div className="hidden md:block" onClick={() => { handleSliderNext(liveRef) }}>
                                <IconButton
                                    className={"secondary header_arrow"}
                                    icon={<ArrowRight />}
                                ></IconButton>

                            </div>}

                        </div>
                        {bookmarkedLiveStream?.length > 0 ? (
                            <OwlCarousel
                                ref={liveRef}
                                className="owl-theme relative"
                                loop
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
                                {bookmarkedLiveStream?.map((lesson, index) => (
                                    <div key={index + 1}>

                                        <AcademySmallCard
                                            className={"academy-small-card isSlider feature-card"}
                                            title={lesson?.live_series?.title}
                                            instructor={lesson?.sub_title}
                                            duration={"5 hr 40 min"}
                                            lessons={lesson?.lessons_count}
                                            original_image={lesson?.live_series?.thumbnail?.medium?.url}
                                            medium_image={lesson?.live_series?.thumbnail?.small?.url}
                                            badge={"primary"}
                                            badge_text={""}
                                            live={true}
                                            videoProgress={lesson?.progress}
                                            isProgressCard={true}
                                            bookMark={true}
                                            id={lesson?.id}
                                            handleBookmarkToggle={handleBookmarkLiveToggle}
                                        />
                                    </div>
                                ))}
                            </OwlCarousel>
                        ) : (
                            <div className="flex  justify-center w-full">
                                <img src={nodata} className="w-[4rem] h-[8rem]" alt='no data' />

                            </div>
                        )}
                    </div>
                </div>



                {/* ***** ***Notes**** ***  */}
                <div className="grid grid-cols-12 gap-y-12 gap-x-5 lg:gap-x-6 mt-0 md:mt-[2rem] ">
                    <div className="col-span-12   px-5 lg:px-0">
                        <h3 className="paddingSectionSmall   ">My Notes</h3>
                        {notedCourses?.length > 0 ? (
                            <div className="grid grid-cols-12 gap-y-12 gap-x-6   ">
                                <>
                                    {notedCourses?.map((notes, index) => (
                                        <div key={index + 1} className="col-span-12   md:col-span-6 lg:col-span-3      ">
                                            <NotesCard
                                                title={notes?.title}
                                                detail={
                                                    notes?.summery?.length > 79
                                                        ? notes?.summery?.substring(
                                                            0,
                                                            85
                                                        ) + "..."
                                                        : notes?.summery
                                                }
                                                image={
                                                    notes?.thumbnail?.small?.url
                                                }
                                                notes={notes}
                                            />
                                        </div>
                                    ))}
                                </>
                            </div>
                        ) : (
                            // <p className=" w-full opacity-50 text-center">
                            //     No data
                            // </p>
                            <div className="flex  justify-center w-full">
                                <img src={nodata} className="w-[4rem] h-[8rem]" alt='no data' />

                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
Progress.layout = (page) => (
    <Layout>
        <ProfileLayout children={page} pageTitle={"Progress"} />
    </Layout>
);
export default Progress;
