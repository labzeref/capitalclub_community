import React, { useState, useEffect } from "react";
import cross from "../../../assets/cross.png";
import copypage from "../../../assets/copypage.png";
import VimeoPlayer from '@vimeo/player';
import download from "../../../assets/download.png";
import Button from "../Button";
import { ReactComponent as Download } from "../../../assets/svg/Download.svg";
import { ReactComponent as DownloadWhite } from "../../../assets/svg/DownloadWhite.svg";
import axios from "axios";
import ReactToast from "../ReactToast";
import AcademyButton from "../AcademyButton";
import { AnimatePresence, motion } from "framer-motion"
import Xmark from "../Xmark";
import { useRef } from "react";
export default function TrailerModal({ url }) {
    const [showModal, setShowModal] = useState(false);


    const [isPlaying, setIsPlaying] = useState(false);
    const playerRef = useRef(null);

    useEffect(() => {
        if (playerRef?.current) {

            const player = new VimeoPlayer(playerRef.current, {
                url: `${url}`,
                autoplay: false, // Autoplay is set to false initially
                controls: true
            });

            // Add event listeners for play and pause
            player.on('play', () => setIsPlaying(true));
            player.on('pause', () => setIsPlaying(false));

            return () => {
                player.destroy();
            };
        }
    }, [showModal]);



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
            <div className={` w-full max-w-[390px] -mt-[2.5rem] md:-mt-14 lg:-mt-16' `}>
                <button onClick={() => setShowModal(true)} className="button isPreview-page primary border-rounded-8 w-full">
                    <div className="button_container glitch uppercase">
                        WATCH TRAILER
                    </div>
                </button>
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
                                <div className="relative   my-6 mx-auto  w-[95%] max-w-[1023px] ">
                                    {/*content*/}
                                    <div className="  border-rounded-10  shadow-lg md:px-[13px] relative flex flex-col w-full bg-black z-[99999] outline-none focus:outline-none  my-[4rem]">
                                        {/*header*/}
                                        <div>
                                            <div className="flex items-center  justify-between p-2 w-full ">
                                                <p className="fw-bold font-size-16">    </p>
                                                <div onClick={() => setShowModal(false)}>
                                                    <Xmark />
                                                </div>

                                            </div>
                                        </div>
                                        {/*body*/}
                                        <div className="relative p-3   flex-auto">

                                            <div className="max-w-[720px] md:max-w-[920px] lg:max-w-[1023px] mx-auto paddingSectionXSmall    ">


                                                <div className="iframe-container text-start mt-[0.2%] ">
                                                    <style>
                                                        {`
                                    .codegena {
                                        position: relative;
                                        width: 100%;
                                        height: 0;
                                        padding-bottom: 56.27198%;

                                    }

                                    .codegena iframe {
                                        position: absolute;
                                        top: 0;
                                        left: 0;
                                        border-radius:10px;
                                        width: 100%;
                                        height: 100%;
                                    }
                                    `}
                                                    </style>

                                                    <div className={'codegena'}>
                                                        <div ref={playerRef} className="h-full w-full"></div>
                                                    </div>

                                                </div>


                                            </div>
                                        </div>
                                        <div className="md:flex items-center justify-center p-3   ">

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
