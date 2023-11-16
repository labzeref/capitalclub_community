import React, { useState, useEffect } from "react";
import cross from "../../../assets/cross.png";
import AOS from 'aos';
import 'aos/dist/aos.css';
import axios from "axios";
import Toast from "../Toast/Toast";
import ReactToast from "../ReactToast";
import flag from "../../../assets/img/flag.svg";


export default function CommentReport({ id }) {
    const [showModal, setShowModal] = useState(false);
    const [postData, setPostData] = useState("");
    const [error, setError] = useState()




    // Image Function to post data to the server
    const handleReport = async () => { 
        try {
             
                const response = await axios.post(route("stream-message.report", id), {
                    reason: postData,
                });
                ReactToast('success', response?.data?.metadata?.message);
                setPostData('')
                setShowModal(false)
                // console.log("Data posted successfully:", response.data);
          

            // setPostData("");
        } catch (error) { 
            setError(error?.response?.data?.metadat?.message)
            console.error("Error while posting data:", error?.response?.data?.metadata?.message);
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

    useEffect(() => {
        AOS.init();
    }, [])

    return (
        <>

            
            <img src={flag} alt="" onClick={() => setShowModal(true)} />
            

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
                            } justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[99999] h-[calc(100%)] max-h-full`}>
                        <div className="relative   my-6 mx-auto  w-[95%] max-w-[620px] ">
                            {/*content*/}
                            <div className=" border-rounded-10   shadow-lg md:px-[13px] relative flex flex-col w-full bg-black z-[99999] outline-none focus:outline-none  my-[4rem]">
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
                                    {/* <div className="flex justify-center">
                                        <div className="">

                                            <h6 className=" fw-regular fs-medium   text-center tableRowSpaceY">
                                                Invoice Paid
                                            </h6>

                                        </div>
                                    </div> */}
                                    <div className="max-w-[420px] md:max-w-[620px] lg:max-w-[830px] mx-auto paddingSectionXSmall">
                                        <div className="">
                                            <textarea
                                                autoFocus
                                                rows="4"
                                                value={postData}
                                                onChange={(e) => {
                                                    setPostData(
                                                        e.target.value
                                                    );
                                                }}
                                                className=" border-rounded-10  bg-[#ffffff10] focus:border-[#ffffff] focus:shadow-none focus:ring-transparent focus:border inset-border border-[#ffffff1a] w-full px-[24px] py-[16px] text-[15px] outline-0 text-white                 "
                                                placeholder="Describe report reason... "
                                            ></textarea>
                                            {error && (
                                                <p className="fs-tiny fw-regular mt-1   danger-color ">
                                                    {error}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                {/*footer*/}
                                <div className="md:flex items-center justify-center p-3  md:p-6  md:space-x-3 space-y-3 md:space-y-0">
 

                                    <button onClick={() => { handleReport() }} className="button primary w-full">
                                        <div className="button_container glitch uppercase">
                                            
                                            Report
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
