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
import { Head, Link, useForm } from "@inertiajs/react";
import IconButton from "@/Components/IconButton";
import AcademySmallCard from "@/Components/Course/AcademySmallCard";
import { useState } from "react";
import { useEffect } from "react";
import SessionLayout from "@/Layouts/SessionLayout";
import { AnimatePresence, motion } from "framer-motion"
import BookmarkLessons from "@/Components/Modal/BookmarkLessons";

import { PostsContext } from '../../Store/PostsProvider';
import { useContext } from "react";

const Progress = ({
    bookmarkedCourses,
    notedCourses,
}) => {

    const {scrollToNotes , setScrollToNotes } = useContext(PostsContext);
    // console.log("bookmarkedCourses");
    // console.log(bookmarkedCourses);
    // console.log("bookmarkedLessons");
    // console.log(bookmarkedLessons);
    // console.log("notedCourses");
    // console.log(notedCourses);
    // console.log(" enrolledCourses");
    // console.log(enrolledCourses);
 

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



    const { post } = useForm();

    const handleBookmarkLessonToggle = (id) => {

        post(route("bookmark-toggle.lessons", id), {
            preserveScroll: true,
        });
    };


    const handleBookmarkCourseToggle = (id) => {

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

    const [showSlider, setShowSlider] = useState(false)


    useEffect(() => {

        setTimeout(() => {
            setShowSlider(true)
        }, 2000);

    }, [])


    useEffect(() => {
    setTimeout(() => {
        setScrollToNotes(false)
    }, 2000);
    }, [])


    const [favLessons, setFavLessons] = useState({})

    const [showModal, setShowModal] = useState(false);

    const [shouldScrollToNotes, setShouldScrollToNotes] = useState(scrollToNotes);

    const notesSectionRef = useRef(null);
    useEffect(() => {
        if (scrollToNotes && notesSectionRef.current ) {
          notesSectionRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }, [scrollToNotes]);




      useEffect(() => {
        if (scrollToNotes && notesSectionRef.current) {
          // Scroll to the 5th section
          notesSectionRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }, [scrollToNotes]);

      useEffect(() => {
        if(scrollToNotes){
            window.scrollTo(0, document.getElementById('second-section').offsetTop);
        }
      }, []);



console.log('bookmarkedCourses' , bookmarkedCourses)

    return (
        <div className={`profile-margin ${bookmarkedCourses.length > 0 || notedCourses.length > 0 ? 'h-[100%]' : 'h-[75vh]'} `} style={{ maxHeight: '-webkit-fill-available' }}>
            <Head>
                <title>Favorites</title>
            </Head>
           
            <div className="container mx-auto px-4 lg:px-0 ">
                <div data-aos="fade-in" data-aos-delay="100" data-aos-easing="ease" data-aos-duration="300" className=" md:pb-[1rem]  md:px-3">

                    <div className="lesson-notes-wrapper border-rounded-15 favourites-card-padding  ">
                        {/* **********COURSES ************* */}
                        <>
                         <p className="progress-headings  ">FAVORITES </p>

                            <div className="grid grid-cols-12 gap-y-4 md:gap-y-7 lg:gap-y-10 gap-x-2.5 md:gap-x-5 lg:gap-x-6 mt-4">

                                {bookmarkedCourses?.length > 0 ? <>
                                    {bookmarkedCourses?.map((data, index) => (

                                        <div key={index + 3}
                                            onClick={() => { setFavLessons(data), setShowModal(true) }
                                            } className="col-span-4 md:col-span-4 lg:col-span-3  ">


                                            <div className={"cursor-pointer academy-small-card  is-favorites large-card-hover-div rounded-[8px] relative  "}>
                                                <img src={data?.mobile_thumbnail?.medium?.url} className="  w-full hide-sm-img desktop " />
                                                <img src={data?.mobile_thumbnail?.medium?.url} className=" w-full hide-md-img mobile " />

                                            </div>
                                        </div>
                                    ))}
                                </> : <div className="col-span-12 text-center opacity-50 text-[10px] md:text-[14px] lg:text-[20px]">
                                    Each lesson you favorite will appear here
                                </div>
                                }

                            </div>
                        </>

                        {/* **********RELATED LESSONS************* */}

                      


                    </div>

                    {/* ************ NEW NOTES ****************  */}
 

                    <div id="second-section" ref={notesSectionRef} className="lesson-notes-wrapper border-rounded-15 favourites-card-padding  md:mx-0 mt-[1rem] md:mt-[2.2rem]">
                      

                        <p className="progress-headings  ">NOTES </p>

                        <div className="grid grid-cols-12 gap-y-4 md:gap-y-7 lg:gap-y-10 gap-x-2.5 lg:gap-x-6 mt-4">
                            {notedCourses?.length < 1
                            ?
                            <div className="col-span-12 text-center opacity-50 text-[10px] md:text-[14px] lg:text-[20px]">
                                Notes you take on each lesson will appear here
                            </div>
                             :

                                <>
                                    {notedCourses?.map((data, index) => (

                                        <div key={index + 3} className="col-span-4 md:col-span-4 lg:col-span-3   ">
                                            <NotesModal notes={data} />
                                        </div>
                                    ))}

                                </>
                            }

                        </div>


                    </div>

                </div>
            </div>
            <>
                            <AnimatePresence>
                                {showModal &&
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <BookmarkLessons setShowModal={setShowModal} showModal={showModal} favLessons={favLessons} />
                                    </motion.div>
                                }
                            </AnimatePresence>


                        </>
        </div>
    );
};
Progress.layout = (page) => (
    <Layout children={page} pageTitle={"Progress"} />
);
export default Progress;
