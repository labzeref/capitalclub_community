import React, { useState, useEffect } from "react";
import cross from "../../../assets/cross.png";
import copypage from "../../../assets/copypage.png";

import download from "../../../assets/download.png";
import Button from "../../Components/Button";
import { ReactComponent as Download } from "../../../assets/svg/Download.svg";
import { ReactComponent as DownloadWhite } from "../../../assets/svg/DownloadWhite.svg";

export default function TermAndCondition() {
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

    const detail = [
        {
            id: 0,

            value: "Acceptance of Terms: By using our services, you agree to abide by these terms and conditions.",
        },
        {
            id: 1,

            value: "Use of Services: Our services are provided 'as is' and we reserve the right to modify or discontinue them at any time.",
        },
        {
            id: 2,

            value: "Intellectual Property: All content provided through our services is our property and protected by intellectual property laws. You may not use or reproduce it without our consent.",
        },
        {
            id: 3,

            value: "User Responsibilities: You are responsible for providing accurate information, maintaining the confidentiality of your account, and using our services for lawful purposes.",
        },
        {
            id: 4,

            value: "Limitation of Liability: We are not liable for any damages arising from the use of our services. We do not guarantee the accuracy or availability of the services.",
        },
        {
            id: 5,

            value: "Modifications: We may update these terms and conditions without prior notice. It is your responsibility to review them periodically.",
        },
    ];

    return (
        <>
            <p onClick={()=>{setShowModal(true)}} className=" cursor-pointer fs-regular fw-regular underline underline-offset-4 px-1">
                                                        Terms and Conditions
                                                    </p>

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
                        <div className="relative   my-6 mx-auto  w-[95%] max-w-[620px] ">
                            {/*content*/}
                            <div className="  border-rounded-10  shadow-lg md:px-[13px] relative flex flex-col w-full bg-black z-[99999] outline-none focus:outline-none  my-[4rem]">
                                {/*header*/}

                                    <div className="flex items-start justify-between px-6 pt-6  ">
                                    <p className="fw-medium fs-x-large">
                                           Term and Condition
                                        </p>
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

                                {/*body*/}
                                <div className="relative p-3 md:p-6 flex-auto">

                                    <div className="max-w-[420px] md:max-w-[620px] lg:max-w-[830px] mx-auto paddingSectionXSmall">
                                       {detail?.map((data , index)=>(
                                       <div className="flex gap-x-3">
                                         <p className=" py-2 flex fw-bold fs-regular">{index+1} </p>   <p className=" py-2 fw-regular fs-regular">{data?.value}</p>
                                        </div>
                                        ))}
                                    </div>
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
