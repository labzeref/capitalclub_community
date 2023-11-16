import React, { useState, useEffect } from "react";
import cross from "../../../assets/cross.png";
import AOS from 'aos';
import 'aos/dist/aos.css';
import axios from "axios";
import Toast from "../Toast/Toast";
import ReactToast from "../ReactToast";
import ReactStars from "react-rating-stars-component";
export default function RatingModal({ course_id, openModal }) {
    const [showModal, setShowModal] = useState(openModal);
    const [feedbackData, setFeedbackData] = useState("");
    const [errors, setErrors] = useState()

    const [starRating, setStartRating] = useState(1)



    const secondExample = {
        size: 50,
        paddingRight: '15px',
        count: 5,
        color: "black",
        activeColor: "red",
        value: 1,
        a11y: true,
        isHalf: false,
        emptyIcon:
            <svg
                width="28" height="25" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path opacity="0.2" d="M20.9842 9.72318L16.7561 13.4132L18.0226 18.9069C18.0897 19.1941 18.0705 19.4947 17.9677 19.7711C17.8648 20.0475 17.6827 20.2874 17.4442 20.4609C17.2057 20.6344 16.9214 20.7337 16.6267 20.7464C16.3321 20.7592 16.0402 20.6848 15.7876 20.5326L10.9961 17.6263L6.21482 20.5326C5.96223 20.6848 5.67038 20.7592 5.37574 20.7464C5.0811 20.7337 4.79676 20.6344 4.55826 20.4609C4.31976 20.2874 4.13769 20.0475 4.03481 19.7711C3.93193 19.4947 3.9128 19.1941 3.97983 18.9069L5.24451 13.4188L1.01545 9.72318C0.791771 9.53027 0.630028 9.27561 0.550503 8.99113C0.470978 8.70666 0.477213 8.40504 0.568424 8.1241C0.659636 7.84315 0.831764 7.59539 1.06322 7.41188C1.29468 7.22838 1.57517 7.11729 1.86951 7.09256L7.44389 6.60974L9.61982 1.41974C9.73346 1.14742 9.92512 0.914795 10.1707 0.751174C10.4163 0.587552 10.7047 0.500244 10.9998 0.500244C11.2949 0.500244 11.5834 0.587552 11.829 0.751174C12.0745 0.914795 12.2662 1.14742 12.3798 1.41974L14.5623 6.60974L20.1348 7.09256C20.4292 7.11729 20.7097 7.22838 20.9411 7.41188C21.1726 7.59539 21.3447 7.84315 21.4359 8.1241C21.5271 8.40504 21.5334 8.70666 21.4538 8.99113C21.3743 9.27561 21.2126 9.53027 20.9889 9.72318H20.9842Z" fill="#FAFAFA" />
            </svg>
        ,
        // halfIcon: <i className="fa fa-star-half-alt" />,
        filledIcon:
            <svg
                width="28" height="25" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.9842 9.72318L16.7561 13.4132L18.0226 18.9069C18.0897 19.1941 18.0705 19.4947 17.9677 19.7711C17.8648 20.0475 17.6827 20.2874 17.4442 20.4609C17.2057 20.6344 16.9214 20.7337 16.6267 20.7464C16.3321 20.7592 16.0402 20.6848 15.7876 20.5326L10.9961 17.6263L6.21482 20.5326C5.96223 20.6848 5.67038 20.7592 5.37574 20.7464C5.0811 20.7337 4.79676 20.6344 4.55826 20.4609C4.31976 20.2874 4.13769 20.0475 4.03481 19.7711C3.93193 19.4947 3.9128 19.1941 3.97983 18.9069L5.24451 13.4188L1.01545 9.72318C0.791771 9.53027 0.630028 9.27561 0.550503 8.99113C0.470978 8.70666 0.477213 8.40504 0.568424 8.1241C0.659636 7.84315 0.831764 7.59539 1.06322 7.41188C1.29468 7.22838 1.57517 7.11729 1.86951 7.09256L7.44389 6.60974L9.61982 1.41974C9.73346 1.14742 9.92512 0.914795 10.1707 0.751174C10.4163 0.587552 10.7047 0.500244 10.9998 0.500244C11.2949 0.500244 11.5834 0.587552 11.829 0.751174C12.0745 0.914795 12.2662 1.14742 12.3798 1.41974L14.5623 6.60974L20.1348 7.09256C20.4292 7.11729 20.7097 7.22838 20.9411 7.41188C21.1726 7.59539 21.3447 7.84315 21.4359 8.1241C21.5271 8.40504 21.5334 8.70666 21.4538 8.99113C21.3743 9.27561 21.2126 9.53027 20.9889 9.72318H20.9842Z" fill="#BA3E17" />
            </svg>
        ,
        onChange: newValue => {
            setStartRating(newValue)
            // console.log(`Example 2: new value is ${newValue}`);
        }
    };

    // review Function to the server
    const submitReview = async () => {
        try {
            const response = await axios.post(route("review.courses.store", course_id), {
                rating: starRating,
                feedback: feedbackData,
            });
            setShowModal(false)
            // console.log("Data posted successfully:", response.data);
            ReactToast('success', response.data?.metadata?.message)
            // setPostData("");
        } catch (error) {
            // ReactToast('error', error?.response?.data?.metadata?.message);
            setErrors(error?.response?.data?.message)
            console.error("Error while posting data:", error?.response?.data?.message);
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

            {/* <button onClick={() => setShowModal(true)} className="px-4 py-2 button primary text-white hover:text-black hover:bg-gray-100  fw-regular ">
               Rating
            </button> */}

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
                                    <div className="flex items-start justify-between p-4  ">
                                        <h4 > Course feedback</h4>
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
                                    <div className="flex justify-center py-3">
                                        {/* <ReactStars {...thirdExample} /> */}
                                        <ReactStars {...secondExample} />
                                    </div>
                                    <div className="max-w-[420px] md:max-w-[620px] lg:max-w-[830px] mx-auto paddingSectionXSmall">
                                        <div className="">
                                            <textarea
                                                autoFocus
                                                rows="4"
                                                value={feedbackData}
                                                onChange={(e) => {
                                                    setFeedbackData(
                                                        e.target.value
                                                    );
                                                }}
                                                className=" border-rounded-10  bg-[#ffffff10] focus:border-[#ffffff] focus:shadow-none focus:ring-transparent focus:border inset-border border-[#ffffff1a] w-full px-[24px] py-[16px] text-[15px] outline-0 text-white                 "
                                                placeholder=" Your feedback... "
                                            ></textarea>
                                            {errors && (
                                                <p className="fs-tiny fw-regular mt-1   danger-color ">
                                                    {errors}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                {/*footer*/}
                                <div className="md:flex items-center justify-center p-3  md:p-6  md:space-x-3 space-y-3 md:space-y-0">
                                    {/* <Button   onClick={() => setShowModal(false)} icon={<Download/>} className={'primary mt-[10px]  uppercase w-full'}>
                Download Receipt
            </Button> */}

                                    <button onClick={() => { submitReview() }} className="button primary w-full">
                                        <div className="button_container glitch uppercase">

                                            submit review
                                        </div>
                                    </button>


                                </div>
                            </div>
                        </div>

                        <div className="backdrop-blur-lg bg-black/30 fixed inset-0   noise-10  "></div>
                    </div>
                </>
            ) : null}
        </>
    );
}
