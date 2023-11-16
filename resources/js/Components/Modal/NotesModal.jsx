import React, { useMemo, useState, useEffect } from "react";
import cross from "../../../assets/cross.png";
import Button from "../../Components/Button";
import { Link, useForm } from "@inertiajs/react";
import AOS from 'aos';
import 'aos/dist/aos.css';
// import { ReactComponent as Plus } from "../../../assets/svg/Plus.svg";
import { ReactComponent as Continuebtn } from "../../../assets/svg/countinuebtn.svg";
import axios from "axios";
import AcademySmallCard from "../Course/AcademySmallCard";
import { useContext } from "react";
import { PostsContext } from '../../Store/PostsProvider';
import { AnimatePresence, motion } from "framer-motion"
import Xmark from "../Xmark";
const NotesModal = ({ notes }) => {
    const { toggleStudyMode, setStudyMoodOn } = useContext(PostsContext);
    const [showModal, setShowModal] = useState(false);
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



    const [data, setData] = useState("");

    const [timer, setTimer] = useState(null);

    const handleKeyUp = (e, id) => {

        const content = e.target.innerHTML;
        // console.log('Content:', content);
        setData(content);


        if (timer) {
            clearTimeout(timer);
        }

        setTimer(
            setTimeout(() => {
                axios.post(route("lessons.notes.store", id), {
                    content: content
                });
            }, 1000)
        );
    };

    useEffect(() => {
        return () => {
            clearTimeout(timer);
        };
    }, []);



    const [isOpen, setIsOpen] = useState(false);

    // const [currentModuleID, setcurrentModuleID] = useState(
    //     modules.findIndex(module => module.id === lesson?.module?.id)
    // );

    const [selectedModuleId, setSelectedModuleId] = useState(notes?.modules[0]?.serial_number);


    const [selectedIndex, setSelectedIndex] = useState(
        notes?.modules.find(module => module?.serial_number === notes?.lesson?.module?.serial_number)
    );


    const [filteredLesson, setFilteredLesson] = useState([]);
    useEffect(() => {
        const filterdLessonModule = notes?.lessons?.filter((lesson) => lesson?.module?.serial_number == selectedModuleId)
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

        <div>
            {/* <!-- Modal toggle --> */}
            <div onClick={() => setShowModal(true)} className="">

                <div onClick={() => setShowModal(true)} className="">

                    <div className={"cursor-pointer academy-small-card  is-favorites large-card-hover-div   rounded-[8px] relative  "}
                    // style={{ backgroundImage: `url(${image}) ` }}
                    >
                        {/* <div className="academy-top-inst-img top-instructor-overlay absolute top-0 left-0 w-full"></div> */}
                        <img src={notes?.mobile_thumbnail?.medium?.url} className="  w-full hide-sm-img desktop " />
                        <img src={notes?.mobile_thumbnail?.medium?.url} className=" w-full hide-md-img mobile " />
                    </div></div>
            </div>












            {/* <!-- Main modal --> */}
            <AnimatePresence>
                {showModal &&

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >

                        <div
                            id="defaultModal"
                            tabIndex="-1"
                            aria-hidden="true"

                            className={`  justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[999999] h-[calc(100%)] max-h-full`}
                        >
                            <div className={`  relative w-full max-w-[58rem] max-h-full z-50 `}>
                                {/* <!-- Modal content --> */}


                                <div className="relative rounded-[10px] px-3 mx-2 shadow bg-[#0d0d0d]  my-[4rem]">
                                    {/* <!-- Modal header --> */}
                                    <div>


                                        <div className="flex  justify-between px-3  py-5     ">
                                            <p className="notes-modal-heading">
                                                {notes?.title}
                                            </p>

                                            <div onClick={() => setShowModal(false)}>
                                                <Xmark />
                                            </div>


                                        </div>

                                        <div className="w-full flex justify-end items-center">
                                            {/* <p className="uppercase text-[20px] md:text-[25px] lg:leading-[2px] lg:py-[18px] fw-bold">{favLessons?.title}</p> */}

                                            {notes?.modules?.length > 0 && <div className="custom-dropdown ">

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

                                                            <div onScroll={handleScrollModules} className="dropdown-options">
                                                              {notes?.modules?.length > 5 && <>
                                                                <div className={`interests-shadow module-top ${showTopShadow ? '' : 'shadow-off'}`}></div>
                                                                <div className={`interests-shadow module-bottom ${showBottomShadow ? '' : 'shadow-off'}`}></div>
                                                               </>
}

                                                                {notes?.modules?.map((module, index) => (
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

                                    </div>











                                    {/* <!-- Modal body --> */}
                                    <div className="relative pb-6 px-3 flex-auto">
                                        {/* <div className="modal-card px-3 paddingSectionXS">
                                <div className="modal-img rounded-full overflow-hidden w-[5rem] h-[5rem]">
                                    <img src={notes?.default_instructor?.dp?.small?.url} className="rounded-[50px]  object-top   object-contain " alt='lesson video' />
                                </div>
                                <div className="py-3 md:py-5 ">
                                    <h5 className="px-2">
                                        {notes?.title}
                                    </h5>
                                    <p className="px-2">{notes?.default_instructor?.full_name}</p>
                                </div>
                            </div>  */}

                                        <div className="">
                                            <div className="overflow-y-auto h-[33rem] border-radius-6">
                                                {filteredLesson?.map((data, index) => (
                                                    <div key={index + 3} className="notes-bg-progress p-2.5 my-4">

                                                        <div className="flex justify-between">
                                                            <p className="  w-[60%] text-left fs-tiny fw-bold mb-2  ">
                                                                {index + 1}. {data?.title}
                                                            </p>

                                                            <Link className=" " href={route('lessons.play', data?.id)}   >
                                                                <div className="flex cursor-pointer">
                                                                    <p className="fs-tiny fw-semibold   px-1   md:mt-[2px] ">
                                                                        OPEN
                                                                    </p>
                                                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <g clipPath="url(#clip0_6548_111208)">
                                                                            <path d="M4.5 2.49071V13.5057C4.50163 13.5936 4.52641 13.6795 4.57184 13.7548C4.61727 13.8301 4.68174 13.892 4.75875 13.9344C4.83576 13.9768 4.92259 13.9982 5.01048 13.9963C5.09837 13.9945 5.18422 13.9695 5.25938 13.9238L14.2644 8.41634C14.3363 8.3728 14.3958 8.31145 14.4371 8.2382C14.4784 8.16495 14.5 8.08229 14.5 7.99821C14.5 7.91413 14.4784 7.83148 14.4371 7.75823C14.3958 7.68498 14.3363 7.62363 14.2644 7.58009L5.25938 2.07259C5.18422 2.02697 5.09837 2.00197 5.01048 2.00011C4.92259 1.99825 4.83576 2.0196 4.75875 2.06201C4.68174 2.10441 4.61727 2.16637 4.57184 2.24164C4.52641 2.3169 4.50163 2.40282 4.5 2.49071Z" fill="white" />
                                                                            <path d="M4.5 2.49071V13.5057C4.50163 13.5936 4.52641 13.6795 4.57184 13.7548C4.61727 13.8301 4.68174 13.892 4.75875 13.9344C4.83576 13.9768 4.92259 13.9982 5.01048 13.9963C5.09837 13.9945 5.18422 13.9695 5.25938 13.9238L14.2644 8.41634C14.3363 8.3728 14.3958 8.31145 14.4371 8.2382C14.4784 8.16495 14.5 8.08229 14.5 7.99821C14.5 7.91413 14.4784 7.83148 14.4371 7.75823C14.3958 7.68498 14.3363 7.62363 14.2644 7.58009L5.25938 2.07259C5.18422 2.02697 5.09837 2.00197 5.01048 2.00011C4.92259 1.99825 4.83576 2.0196 4.75875 2.06201C4.68174 2.10441 4.61727 2.16637 4.57184 2.24164C4.52641 2.3169 4.50163 2.40282 4.5 2.49071Z" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                                                        </g>
                                                                        <defs>
                                                                            <clipPath id="clip0_6548_111208">
                                                                                <rect width="16" height="16" fill="white" />
                                                                            </clipPath>
                                                                        </defs>
                                                                    </svg>


                                                                </div>
                                                            </Link>
                                                        </div>
                                                        <div
                                                            contentEditable
                                                            onKeyUp={(e) => handleKeyUp(e, data?.id)}
                                                            dangerouslySetInnerHTML={{ __html: data?.note }}
                                                            onChange={(e) => setData(e.target.value)}
                                                            className="w-full bg-[#1A1A1A] text-14 overflow-auto outline-none h-[200px] border-0 outline-0 focus:outline-none focus:ring-0 focus:border-transparent border-transparent"
                                                            placeholder="Add your text here…"
                                                            id=""
                                                            rows="7"
                                                            data-placeholder="Start typing..."
                                                        />
                                                        {/* <textarea
                                                            defaultValue={data?.note}
                                                            onKeyUp={() => handleKeyUp(data?.id)}
                                                            onChange={(e) => { setData(e.target.value) }}
                                                            className="w-full bg-[#1A1A1A] text-14 outline-none  border-0 outline-0 focus:outline-none focus:ring-0 focus:border-transparent border-transparent"
                                                            placeholder="Add your text here…"
                                                            id=""
                                                            rows="7"
                                                        ></textarea> */}
                                                    </div>

                                                ))}

                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </motion.div>
                }
            </AnimatePresence>
            {showModal &&
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="backdrop-blur-[2px] bg-black/10 fixed inset-0   z-[9999]"
                >
                    <div className="  fixed inset-0 z-40 "></div>
                </motion.div>
            }
        </div>

    );
};

export default NotesModal;
