import React, { useState, useEffect } from "react";
import cross from "../../../assets/cross.png";
import copypage from "../../../assets/copypage.png";

import download from "../../../assets/download.png";
import Button from "../../Components/Button";
import { ReactComponent as Download } from "../../../assets/svg/Download.svg";
import { ReactComponent as DownloadWhite } from "../../../assets/svg/DownloadWhite.svg";
import axios from "axios";
import ReactToast from "../ReactToast";
import { AnimatePresence, motion } from "framer-motion"
import Xmark from "../Xmark";

export default function PaymentModal({ invoices }) {
    const [showModal, setShowModal] = useState(false);


    const downloadInvoice = async () => {
        try {
            const response = await axios.get(route("profile.payment.invoices.download", invoices?.id));

            window.open(response.data.payload.download_url, '_blank');


            // console.log('response of bookmark post.....', response?.data?.metadata?.message)
        } catch (error) {
            console.error("Error while download  invoice:", error);
        }
    };
    const amount = invoices?.amount_paid;
    const wholeAmount = Math.floor(amount);






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
            <p
                onClick={() => setShowModal(true)}
                className="fw-regular text-[10px] md:text-[0.75rem] text-[#909090] text-center px-[12px] md:px-[5px] py-[3px] md:py-[5px] uppercase  rounded-full new-card-background  cursor-pointer "
            >
                View
            </p>
            <AnimatePresence>
                {showModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="relative z-[9999999]"
                    >
                        <>
                            <div
                                id="defaultModal"
                                tabIndex="-1"
                                aria-hidden="true"
                                className={` justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[99999] h-[calc(100%)] max-h-full`}>
                                <div className="relative   my-6 mx-auto  w-[95%] max-w-[400px] ">
                                    {/*content*/}
                                    <div className=" px-2 pb-[17px] pt-2 border-rounded-20  shadow-lg relative flex flex-col w-full bg-black z-[99999] outline-none focus:outline-none  my-[4rem]">
                                        {/*header*/}
                                        <div>
                                            <div className="flex items-center justify-end   w-full ">
                                                <div onClick={() => setShowModal(false)}>
                                                    <Xmark />
                                                </div>
                                                {/* <svg  className="cursor-pointer" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M10.9993 0.166504C5.00852 0.166504 0.166016 5.009 0.166016 10.9998C0.166016 16.9907 5.00852 21.8332 10.9993 21.8332C16.9902 21.8332 21.8327 16.9907 21.8327 10.9998C21.8327 5.009 16.9902 0.166504 10.9993 0.166504ZM10.9993 19.6665C6.22185 19.6665 2.33268 15.7773 2.33268 10.9998C2.33268 6.22234 6.22185 2.33317 10.9993 2.33317C15.7768 2.33317 19.666 6.22234 19.666 10.9998C19.666 15.7773 15.7768 19.6665 10.9993 19.6665ZM14.8885 5.58317L10.9993 9.47234L7.11018 5.58317L5.58268 7.11067L9.47185 10.9998L5.58268 14.889L7.11018 16.4165L10.9993 12.5273L14.8885 16.4165L16.416 14.889L12.5268 10.9998L16.416 7.11067L14.8885 5.58317Z" fill="white" />
                                                </svg> */}
                                            </div>
                                        </div>
                                        {/*body*/}
                                        <div className="relative   flex-auto">
                                            <div className="flex justify-center">
                                                <div className="text-center text-white">
                                                    <svg className="mx-auto" width="57" height="71" viewBox="0 0 57 71" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M37.4558 2.95643C36.1416 1.64227 34.3779 0.916016 32.5449 0.916016H7.7487C3.94453 0.916016 0.832031 4.02852 0.832031 7.83268V63.166C0.832031 66.9702 3.90995 70.0827 7.71411 70.0827H49.2487C53.0529 70.0827 56.1654 66.9702 56.1654 63.166V24.5364C56.1654 22.7035 55.4391 20.9398 54.1249 19.6602L37.4558 2.95643ZM38.8737 56.2494H18.1237C16.2216 56.2494 14.6654 54.6931 14.6654 52.791C14.6654 50.8889 16.2216 49.3327 18.1237 49.3327H38.8737C40.7758 49.3327 42.332 50.8889 42.332 52.791C42.332 54.6931 40.7758 56.2494 38.8737 56.2494ZM38.8737 42.416H18.1237C16.2216 42.416 14.6654 40.8598 14.6654 38.9577C14.6654 37.0556 16.2216 35.4994 18.1237 35.4994H38.8737C40.7758 35.4994 42.332 37.0556 42.332 38.9577C42.332 40.8598 40.7758 42.416 38.8737 42.416ZM31.957 21.666V6.10352L50.9779 25.1243H35.4154C33.5133 25.1243 31.957 23.5681 31.957 21.666Z" fill="white" />
                                                    </svg>

                                                    {/* <img
                                                src={copypage}
                                                alt="page"
                                                className=" w-[90px] mx-auto h-[90px] md:h-[120px]  md:w-[120px] "
                                            /> */}
                                                    <h6 className=" fw-medium font-14 text-[#797979] uppercase  opacity-50 pt-3 pb-0 md:pb-1">
                                                        Invoice Paid
                                                    </h6>
                                                    <p className="font-14 fw-bold text-white text-center mb-1">
                                                        USD ${wholeAmount}
                                                    </p>
                                                    <p className="font-14 fw-medium ">

                                                        {invoices?.paid_at}
                                                    </p>
                                                </div>
                                            </div>
                                            {/* <div className="max-w-[420px] md:max-w-[620px] lg:max-w-[830px] mx-auto paddingSectionXSmall">
                                        <div className="">
                                            <div className="flex justify-between border-b border-[#ffffff10] py-[12px] ">
                                                <p className="text-white text-[12px] md:text-[16px] fw-regular text-start ">
                                                    Status
                                                </p>
                                                <p className="text-[12px] md:text-[16px] fw-regular ">

                                                    {invoices?.status}
                                                </p>
                                            </div>
                                            <div className="flex justify-between border-b border-[#ffffff10] py-[12px] ">
                                                <p className="text-white text-[12px] md:text-[16px] fw-regular text-start ">
                                                    Payment date
                                                </p>
                                                <p className="text-[12px] md:text-[16px] fw-regular ">

                                                    {invoices?.paid_at}
                                                </p>
                                            </div>
                                            <div className="flex justify-between border-b border-[#ffffff10] py-[12px] ">
                                                <p className="text-white text-[12px] md:text-[16px] fw-regular text-start ">
                                                    Currency
                                                </p>
                                                <p className="text-[12px] md:text-[16px] fw-regular ">

                                                    {invoices?.currency_code}
                                                </p>
                                            </div>
                                        </div>
                                    </div> */}
                                        </div>
                                        {/*footer*/}
                                        <div className="md:flex items-center justify-center pt-6  md:space-x-3 space-y-3 md:space-y-0">


                                            <button onClick={() => { downloadInvoice() }} className="button primary rounded-full w-full">
                                                <div className="button_container glitch uppercase text-[10px]">

                                                    Download Receipt
                                                </div>
                                            </button>
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
                                            <div className="  fixed inset-0   z-[99999999]  "></div>
                                        </motion.div>
                                    }
                                </AnimatePresence>

                            </div>
                        </>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
