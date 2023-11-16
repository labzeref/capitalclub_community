import React, { useState, useEffect } from "react";
import cross from "../../../assets/cross.png";
import copypage from "../../../assets/copypage.png";

import download from "../../../assets/download.png";
import Button from "../../Components/Button";
import { ReactComponent as Download } from "../../../assets/svg/Download.svg";
import { ReactComponent as DownloadWhite } from "../../../assets/svg/DownloadWhite.svg";
import axios from "axios";
import ReactToast from "../ReactToast";
import { Link } from "@inertiajs/react";
import { AnimatePresence, motion } from "framer-motion"
import Xmark from "../Xmark";
export default function BookmarkLessons({ setShowModal, showModal, favLessons }) {

 useEffect(() => {
        if (showModal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [showModal]);



 


    const [isOpen, setIsOpen] = useState(false);

    // const [currentModuleID, setcurrentModuleID] = useState(
    //     modules.findIndex(module => module.id === lesson?.module?.id)
    // );



    const [selectedModuleId, setSelectedModuleId] = useState(favLessons?.modules[0]?.serial_number);




    // ****handle modules****


    const [selectedIndex, setSelectedIndex] = useState(
        favLessons?.modules.find(module => module?.serial_number === favLessons?.lesson?.module?.serial_number)
        );
 
    const [filteredLesson, setFilteredLesson] = useState([]);
    useEffect(() => {
        const filterdLessonModule = favLessons?.lessons?.filter((lesson) => lesson?.module?.serial_number == selectedModuleId)
        setFilteredLesson(filterdLessonModule)
    }, [selectedModuleId])

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };





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



    return (

        <>

            <AnimatePresence>
                {showModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <>
                            <div
                                id="defaultModal"
                                tabIndex="-1"
                                aria-hidden="true"
                                className={` ${showModal
                                    ? " transition-all duration-300 ease-out"
                                    : "-translate-y-[1000rem] transition-all duration-300 ease-out"
                                    } justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[99999] h-[calc(100%)] max-h-full`}>
                                <div className="relative   my-6 mx-auto  w-[95%]  max-w-[1280px] ">
                                    {/*content*/}
                                    <div className="  border-rounded-10  shadow-lg md:px-[13px]  relative flex flex-col w-full z-[99999] outline-none focus:outline-none">
                                        {/*header*/}
                                        <div>

                                        </div>










                                        {/*body*/}
                                        {/* <div className="relative mb-3 mx-3 md:mx-6 flex-auto h-[450px] md:h-[400px] overflow-auto">
                                            <div className="grid grid-cols-12 gap-y-3 md:gap-y-10 gap-x-5 lg:gap-x-6 mt-3">
                                                {favLessons?.lessons?.map((data, index) => (
                                                    <div key={index + 3} className="col-span-6 md:col-span-4 lg:col-span-3  ">
                                                        <Link href={!data?.locked && route('lessons.play', data?.id)}>
                                                            <div key={index + 1}
                                                                className={` ${data?.locked && "opacity-50"}   border-rounded-10 cursor-pointer`}  >
                                                                <div className="flex flex-col items-start gap-2.5">
                                                                    <div className="relative w-full">
                                                                        <img src={data?.thumbnail?.small?.url}
                                                                            className=" border-rounded-10  playlist-lesson-thumbnail  object-cover object-center "
                                                                            alt=""
                                                                        />
                                                                    </div>
                                                                    <div>
                                                                        <p className="video-description">
                                                                            <span className="fw-bold"></span>  &nbsp;
                                                                            {data?.title}
                                                                        </p>
                                                                        <p className="module-description">
                                                                            <span className="fw-bold"></span>  {data?.module?.name}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                ))}
                                            </div>
                                        </div> */}
                                        {/*footer*/}







                                        <div className="card-background input-shadow border-rounded-10  pb-[33px] pt-4 lg:pb-6 px-6 md:px-10 relative">
                                            <div className="flex   justify-end  w-full pb-4">
                                                <div onClick={() => setShowModal(false)}>
                                                    <Xmark />
                                                </div>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <p className="uppercase text-[20px] md:text-[25px] lg:leading-[2px] lg:py-[18px] fw-bold">{favLessons?.title}</p>

                                                {favLessons?.modules?.length > 0 &&  <div className="custom-dropdown ">

                                                    <button className="dropdown-button" onClick={toggleDropdown}>
                                                        <span className="mt-[2px]">  {isOpen ? 'SELECT' : `MODULE ${selectedModuleId}`} </span>
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
                                                       <div className="absolute w-full z-[9999]">

                                                            <div onScroll={handleScrollModules}  className="dropdown-options">
                                                                <div className={`interests-shadow module-top ${showTopShadow ? '' : 'shadow-off'}`}></div>
                                                                <div className={`interests-shadow module-bottom ${showBottomShadow ? '' : 'shadow-off'}`}></div>

                                                                {favLessons?.modules?.map((module, index) => (
                                                                    <div key={index + 3} onClick={() => { setSelectedIndex(module?.serial_number), setSelectedModuleId(module?.serial_number), setIsOpen(false) }} className="option">
                                                                        MODULE &nbsp; {module?.serial_number}
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
                                            }

                                            </div>
                                            <div className="relative mobile-height md:h-[460px] lg:h-[410px] border-rounded-10 overflow-hidden mt-4">
                                                <div  className={"grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-x-[30px] gap-y-3 xl:gap-x-[30px] lg:gap-y-5 play-lessons-wrapper-favourite content-start"}

                                                >
                                                    {filteredLesson?.map((data, index) => (
                                                        <Link key={index + 3} href={!data?.locked && route('lessons.play', data?.id)}>
                                                            <div
                                                                className={` ${data?.locked && "opacity-50"}   border-rounded-10 cursor-pointer`}  >
                                                                <div className="flex flex-col items-start gap-2.5">
                                                                    <div className="relative w-full">
                                                                        <img src={data?.thumbnail?.original?.url}
                                                                            className=" border-rounded-10  playlist-lesson-thumbnail-favourite  object-cover object-center"
                                                                            alt=""
                                                                        />
                                                                    </div>
                                                                    <div>
                                                                        <p className="video-description">
                                                                            <span className="fw-bold">L{data?.serial_number}:</span>  &nbsp;
                                                                            {data?.title}
                                                                        </p>

                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    )
                                                    )}
                                                </div>
                                            </div>
                                        </div>
























                                    </div>
                                </div>
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="backdrop-blur-[2px] bg-black/10 fixed inset-0    "
                                >
                                    <div className="     "></div>
                                </motion.div>
                            </div>
                        </>
                    </motion.div>
                )}
            </AnimatePresence>
        </>

    );
}
