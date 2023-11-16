import React, { useState, useEffect } from "react";
import cross from "../../../assets/cross.png";
import copypage from "../../../assets/copypage.png";

import download from "../../../assets/download.png";
import Button from "../../Components/Button";
import { ReactComponent as Download } from "../../../assets/svg/Download.svg";
import { ReactComponent as DownloadWhite } from "../../../assets/svg/DownloadWhite.svg";
import axios from "axios";
import ReactToast from "../ReactToast";

export default function ConfirmationModal({handleAction}) {
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
          <button onClick={() => setShowModal(true)}
                                                    className="button  py-3 delete buttonSecondry dangerColor uppercase"
                                                    type="button"
                                                >
                                                    Deactivate My Account
                                                </button>

            {showModal ? (
                <>
                    <div
                        id="defaultModal"
                        tabIndex="-1"
                        aria-hidden="true"
                        className={` ${showModal
                                ? " transition-all duration-300 ease-out"
                                : "-translate-y-[1000rem] transition-all duration-300 ease-out"
                            } justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[99999] h-[calc(100%)] max-h-full`}>
                        <div className="relative   my-6 mx-auto  w-[95%] max-w-[420px] ">
                            {/*content*/}
                            <div className="  border-rounded-10  shadow-lg md:px-[13px] relative flex flex-col w-full bg-black z-[99999] outline-none focus:outline-none  my-[4rem]">
                                {/*header*/}
                                <div>
                                    <div className="flex items-start justify-between p-2  ">
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
                                <div className="relative p-3 md:p-6 flex-auto">
                                    <div className="flex justify-center">
                                        <div className="  mx-auto">
                                        <svg className="mx-auto" width="129" height="128" viewBox="0 0 129 128" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clipPath="url(#clip0_1033_61390)">
                      <path opacity="0.2" d="M100.5 28V104C100.5 105.061 100.079 106.078 99.3284 106.828C98.5783 107.579 97.5609 108 96.5 108H32.5C31.4391 108 30.4217 107.579 29.6716 106.828C28.9214 106.078 28.5 105.061 28.5 104V28H100.5Z" fill="white"/>
                      <path d="M108.5 28H20.5" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M44.5 12H84.5" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M100.5 28V104C100.5 105.061 100.079 106.078 99.3284 106.828C98.5783 107.579 97.5609 108 96.5 108H32.5C31.4391 108 30.4217 107.579 29.6716 106.828C28.9214 106.078 28.5 105.061 28.5 104V28" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                      </g>
                      <defs>
                      <clipPath id="clip0_1033_61390">
                      <rect width="128" height="128" fill="white" transform="translate(0.5)"/>
                      </clipPath>
                      </defs>
                    </svg>

                                            <h3 className=" text-white  text-center semibold">
                                               Are you sure ?
                                            </h3>
                                        </div>
                                    </div>

                                </div>
                                {/*footer*/}
                                <div className="md:flex items-center justify-center p-3  md:p-6  md:space-x-3 space-y-3 md:space-y-0">
                                    {/* <Button   onClick={() => setShowModal(false)} icon={<Download/>} className={'primary mt-[10px]  uppercase w-full'}>
                Download Receipt
            </Button> */}

                                    <button onClick={(e)=>{handleAction(e) ; setShowModal(false)}} className="button primary w-full">
                                        <div className="button_container glitch uppercase">

                                            Deactivate
                                        </div>
                                    </button>

                                    <button onClick={() => setShowModal(false)} className="button secondary noise-10 w-full">
                                        <div className="button_container glitch uppercase">

                                           Cancel
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="backdrop-blur-lg bg-black/30 fixed inset-0 z-40 noise-10  "></div>
                    </div>
                </>
            ) : null}
        </>
    );
}
