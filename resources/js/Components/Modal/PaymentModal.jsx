import React, { useState, useEffect } from "react";
import cross from "../../../assets/cross.png";
import copypage from "../../../assets/copypage.png";

import download from "../../../assets/download.png";
import Button from "../../Components/Button";
import { ReactComponent as Download } from "../../../assets/svg/Download.svg";
import { ReactComponent as DownloadWhite } from "../../../assets/svg/DownloadWhite.svg";
import axios from "axios";
import ReactToast from "../ReactToast";

export default function PaymentModal({invoices}) {
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
                className="fw-regular fs-medium text-white cursor-pointer "
            >
                View
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
                                        <div className="">
                                            <img
                                                src={copypage}
                                                alt="page"
                                                className=" w-[90px] mx-auto h-[90px] md:h-[120px]  md:w-[120px] "
                                            />
                                            <h6 className=" fw-regular fs-medium   text-center tableRowSpaceY">
                                                Invoice Paid
                                            </h6>
                                            <h3 className=" text-white  text-center semibold">
                                                US${invoices?.amount_paid}
                                            </h3>
                                        </div>
                                    </div>
                                    <div className="max-w-[420px] md:max-w-[620px] lg:max-w-[830px] mx-auto paddingSectionXSmall">
                                        <div className="">
                                            {/* {detail?.map((data, index) => ( */}
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
                                            {/* // ))} */}
                                        </div>
                                    </div>
                                </div>
                                {/*footer*/}
                                <div className="md:flex items-center justify-center p-3  md:p-6  md:space-x-3 space-y-3 md:space-y-0">
                                    {/* <Button   onClick={() => setShowModal(false)} icon={<Download/>} className={'primary mt-[10px]  uppercase w-full'}>
                Download Receipt
            </Button> */}

                                    <button onClick={()=>{downloadInvoice()}} className="button primary w-full">
                                        <div className="button_container glitch uppercase">

                                            Download Receipt
                                        </div>
                                    </button>

                                    {/* <button className="button secondary noise-10 w-full">
                                        <div className="button_container glitch uppercase">

                                            Download Invoice
                                        </div>
                                    </button> */}
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
