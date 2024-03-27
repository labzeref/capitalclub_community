import React, { useState, useEffect } from "react";
import cross from "../../../assets/cross.png";
import copypage from "../../../assets/copypage.png";

import download from "../../../assets/download.png";
import Button from "../Button";
import { ReactComponent as Download } from "../../../assets/svg/Download.svg";
import { ReactComponent as DownloadWhite } from "../../../assets/svg/DownloadWhite.svg";
import axios from "axios";
import ReactToast from "../ReactToast";
import AcademyButton from "../AcademyButton";
import { AnimatePresence, motion } from "framer-motion"
import Xmark from "../Xmark";
export default function Resources({ files , lesson_name }) {
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

    return (
        <>
            <div className="w-full">
                <a href={files} target={'_blank'}>
                    <AcademyButton className={"secondary  uppercase w-full border-rounded-10 btn-white h-30"}>
                        RESOURCES
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="15" viewBox="0 0 20 15" fill="none">
                                <path d="M13.5242 5.83211H12.2841V2.76238C12.2841 2.42471 11.9331 2.14844 11.5041 2.14844H8.38423C7.95524 2.14844 7.60426 2.42471 7.60426 2.76238V5.83211H6.3641C5.66993 5.83211 5.31894 6.49517 5.81032 6.88196L9.39039 9.69997C9.69458 9.93941 10.186 9.93941 10.4901 9.69997L14.0702 6.88196C14.5616 6.49517 14.2184 5.83211 13.5242 5.83211ZM4.48438 11.9716C4.48438 12.3092 4.83536 12.5855 5.26435 12.5855H14.624C15.053 12.5855 15.404 12.3092 15.404 11.9716C15.404 11.6339 15.053 11.3576 14.624 11.3576H5.26435C4.83536 11.3576 4.48438 11.6339 4.48438 11.9716Z" fill="white" />
                            </svg>
                        </span>
                    </AcademyButton>
                </a>
            </div>

            <AnimatePresence>
                {showModal && (
                    <>

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
                                className={` ${showModal
                                    ? " transition-all duration-300 ease-out"
                                    : "-translate-y-[1000rem] transition-all duration-300 ease-out"
                                    } justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[99999] h-[calc(100%)] max-h-full`}>
                                <div className="relative   my-6 mx-auto  w-[95%] max-w-[620px] ">
                                    {/*content*/}
                                    <div className="  border-rounded-10  shadow-lg md:px-[13px] relative flex flex-col w-full bg-black z-[99999] outline-none focus:outline-none  my-[4rem]">
                                        {/*header*/}
                                        <div>
                                            <div className="flex items-center  justify-between p-2 w-full ">
                                              <p className="fw-bold font-size-16">  Resources </p>
                                                <div onClick={() => setShowModal(false)}>
                                                    <Xmark />
                                                </div>

                                            </div>
                                        </div>
                                        {/*body*/}
                                        <div className="relative p-3 md:p-6 flex-auto">

                                            <div className="max-w-[420px] md:max-w-[620px] lg:max-w-[830px] mx-auto paddingSectionXSmall  max-h-[25rem] overflow-auto ">
                                                    <>
                                                        <div className="relative overflow-x-auto border-rounded-10" >
                                                            <table className="w-full text-sm text-left text-white ">
                                                                <thead className="  text-xs text-white uppercase bg-[#1a1a1a]  ">
                                                                    <tr>
                                                                        {/* <th scope="col" className="px-6 py-3">
                                                                            File name
                                                                        </th> */}
                                                                        <th scope="col" className=" text-center px-6 py-3">
                                                                       {lesson_name}
                                                                        </th>

                                                                    </tr>
                                                                </thead>
                                                                <tbody className="max-h-[25rem] overflow-y-auto">
                                                                    {/* {files?.map((data, index) => ( */}
                                                                    <tr className="bg-[#121212]  ">
                                                                        {/* <th scope="row" className="px-6 py-4 text-[10px] md:text-[14px] font-medium text-white whitespace-nowrap">
                                                                            {data?.name}
                                                                        </th> */}
                                                                        <td className="px-6 py-4 flex justify-center">
                                                                            <a href={files} target="_blank"  >
                                                                            <button className="button primary rounded-full w-full ">
                                                                                <div className="button_container glitch uppercase text-[10px]">

                                                                                   Download
                                                                                </div>
                                                                            </button>
                                                                            </a>
                                                                        </td>

                                                                    </tr>
                                                                    {/* ))} */}
                                                                </tbody>
                                                            </table>
                                                        </div>

                                                    </>


                                            </div>
                                        </div>
                                        {/*footer*/}
                                        <div className="md:flex items-center justify-center p-3   ">
                                            {/* <Button   onClick={() => setShowModal(false)} icon={<Download/>} className={'primary mt-[10px]  uppercase w-full'}>
                Download Receipt
            </Button> */}



                                            {/* <button className="button secondary noise-10 w-full">
                                        <div className="button_container glitch uppercase">

                                            Download Invoice
                                        </div>
                                    </button> */}
                                        </div>
                                    </div>
                                </div>

                                <AnimatePresence>
                                    {showModal &&
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                            className="backdrop-blur-[2px] bg-black/10  fixed inset-0  "
                                        >
                                            <div className="  fixed inset-0   z-[999]  "></div>
                                        </motion.div>
                                    }
                                </AnimatePresence>

                            </div>

                        </motion.div>


                    </>
                )}
            </AnimatePresence>
        </>
    );
}
