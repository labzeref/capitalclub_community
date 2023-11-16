import React, { useState, useEffect } from "react";
import cross from "../../../assets/cross.png";
import AOS from 'aos';
import 'aos/dist/aos.css';
import axios from "axios";
import Toast from "../Toast/Toast";
import ReactToast from "../ReactToast";
import Button from "../../Components/Button";
import { ReactComponent as Export } from "../../../assets/svg/Export.svg";
import { usePage } from "@inertiajs/react";

export default function ShareModal({ id, type }) {
    const [showModal, setShowModal] = useState(false);

    console.log(' navigator ************ ', navigator)

    const { url } = usePage();
    const fullUrl = window.location.origin + url;

    const copyToClipboard = () => {
        navigator?.clipboard?.writeText(fullUrl)
            .then(() => {
                ReactToast('success', 'Link copied ')
                console.log('Link copied to clipboard');
            })
            .catch((error) => {
                console.error('Error copying link to clipboard:', error);
            });
    };


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

    useEffect(() => {
        AOS.init();
    }, [])

    return (
        <>

            <Button
                onClick={() => { setShowModal(true) }}
                icon={<Export />}
                className={"secondary  icon_button"}
            ></Button>

            {showModal ? (
                <>
                    <div
                        data-aos="fade-in" data-aos-delay="100" data-aos-easing="ease" data-aos-duration="300"
                        id="defaultModal"
                        tabIndex="-1"
                        aria-hidden="true"
                        className={` ${showModal
                            ? " transition-all duration-300 ease-out"
                            : "-translate-y-[1000rem] transition-all duration-300 ease-out"
                            } justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[99] h-[calc(100%)] max-h-full`}>
                        <div className="relative   my-6 mx-auto  w-[95%] max-w-[620px] ">
                            {/*content*/}
                            <div className="    shadow-lg  p-[2rem] rounded-md relative flex flex-col w-full bg-black z-[99999] outline-none focus:outline-none  my-[4rem]">
                                {/*header*/}
                                <div>
                                    <div className="flex items-start justify-between  border-b border-[#ffffff20] pb-[1.5rem] ">
                                        <p className="fs-x-large fw-medium">Share This Course</p>
                                        <button
                                            className="p-1 ml-auto     float-right  "
                                            onClick={() => setShowModal(false)}
                                        >
                                            <img
                                                src={cross}
                                                className="   h-6 w-6  "
                                            />
                                        </button>
                                    </div>
                                </div>
                                {/*body*/}
                                <div className="relative  flex-auto mt-[2rem]">

                                    {/* <hr className=""/> */}

                                    <div className="  mx-auto paddingSectionXSmall">
                                        <div className="">
                                            <div className="flex">
                                                <input type="text"
                                                    value={fullUrl}
                                                    className=" input-text w-full opacity-50"
                                                    placeholder="Lesson Link... "
                                                />
                                                <button onClick={() => copyToClipboard()} className="py-3  w-[150px] bg-white text-black  uppercase ">copy link</button>
                                            </div>
                                            <p className="opacity-50 mt-2">Copy this link to share this course video.</p>
                                        </div>
                                    </div>
                                </div>
                                {/*footer*/}

                            </div>
                        </div>

                        <div className="backdrop-blur-lg bg-black/30 fixed inset-0 z-40 noise-10  "></div>
                    </div>
                </>
            ) : null}
        </>
    );
}
