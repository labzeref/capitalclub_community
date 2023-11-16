import React, { useEffect, useState } from "react";
import logo from "../../assets/svg/logo.svg";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { ToastContainer, toast } from "react-toastify";
import Toast from "@/Components/Toast/Toast.jsx";
import Timer from "@/Components/Timer";
import intlTelInput from 'intl-tel-input';
import 'intl-tel-input/build/css/intlTelInput.css';
import { useRef } from "react";
import { motion } from "framer-motion"

const CheckoutLayout = ({ children, showVideo = '', timeEnd, price, setUpdateBillingPage, updateBillingPage }) => {
    useEffect(() => {
        AOS.init();
    }, []) 

    

    var currentLocation = window.location.href;
    var pageName = currentLocation.split('/').pop();
    // let w = window.innerWidth;
    //     let h = window.innerHeight;
    //     console.log(w)
    //     console.log(h)
    // -----------------------------SCALE APPLY FOR HEIGHT RESIZE-------------------------------------------------------
    const [scaleFactor, setScaleFactor] = useState(1);

    useEffect(() => {
        const handleResize = () => {
            // const desiredCardHeight = document.getElementById('checkout-container').offsetHeight + 100;
            const desiredCardHeight = document.getElementById('checkout-container').offsetHeight + 100;
            const screenHeight = window.innerHeight;
            const newScaleFactor = screenHeight < desiredCardHeight ? screenHeight / desiredCardHeight : 1;
            setScaleFactor(newScaleFactor);
        };

        // Initial calculation
        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const cardContainerStyle = {
        transform: `scale(${scaleFactor})`,
        transformOrigin: 'top center',
        height: `${100 * scaleFactor}%`,
    };
    // ----------------------------------SCALE APPLY FOR HEIGHT RESIZE------------------------------------------------------------


    // const [orientation, setOrientation] = useState(
    //     window.matchMedia('(orientation: portrait)').matches ? 'portrait':'landscape');

    //   useEffect(() => {
    //     const handleOrientationChange = () => {
    //       setOrientation(
    //         window.matchMedia('(orientation: portrait)').matches
    //           ? 'portrait' : 'landscape' );};

    //     // Add an event listener for changes in orientation
    //     window.addEventListener('resize', handleOrientationChange);

    //     // Clean up the event listener when the component unmounts
    //     return () => {
    //       window.removeEventListener('resize', handleOrientationChange);
    //     };
    //   }, []);


    // console.log(' mobile orientation : ' , orientation)

    const handleContextMenu = (e) => {
        e.preventDefault(); 
      };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }} >
            <Head>
                <title>Checkout</title>
            </Head>

            <div>
                <Toast />
                            <div onContextMenu={handleContextMenu} className="absolute w-full h-full "></div>
                <section className="relative   ">
                    <div className="container  mx-auto  flex justify-center">
                        {/* <ToastContainer /> */}

                        <div className=" flex justify-center items-center xl:mt-2  md:gap-y-0 fixed w-full" >
                            <div onContextMenu={handleContextMenu} className="w-full max-w-[600px]  mx-auto  checkout-container"  >
                                <div id={'checkout-container'} className="preference-px" style={cardContainerStyle} >
                                    {!showVideo && <>
                                        {/* <p className="checkout-join text-center  ">JOIN</p> */}
                                        <div className={`flex  justify-center`}>

                                            <Link href={route('welcome')}>

                                                <img
                                                    className="form-logo"
                                                    src={logo}
                                                    alt=""
                                                />
                                            </Link>
                                            {/* {pageName == 'payment' && <Link  href={route('logout')} method={'post'}
                                        className="fs-regular fw-regular  underline mt-1 opacity-50">
                                        Logout
                                    </Link>
                                    } */}
                                        </div>
                                    </>
                                    }

                                    {!showVideo && <>
                                        <div className="w-[57%] mx-auto">
                                            <p className="font-14 font-semibold cupofcoffee-padding text-center">
                                                JOIN NOW FOR ${price}, LESS THAN THE   PRICE OF A  CUP OF COFFEE A DAY.
                                            </p>
                                        </div>
                                        <div className="timer-layout-hidden bg-[#0d0d0d]">
                                            <div className="text-center lg:text-end flex items-center justify-center timer-container">
                                                <Timer time={timeEnd} />
                                            </div>
                                        </div>

                                        <div className="flex">
                                            {/* <div onClick={() => {pageName == 'payment' && setUpdateBillingPage('billing')}} className={` ${pageName == 'checkout' || updateBillingPage== 'billing' ? 'text-[#9b9b9b] bg-[#353535]  ' : 'text-[#3E3E3E] bg-[#151515] '} register-tab`}>Billing
                                        </div> */}
                                            <div onClick={() => { pageName == 'payment' && setUpdateBillingPage('billing') }} className={` ${pageName == 'checkout' || updateBillingPage == 'billing' ? 'text-[#9b9b9b] bg-[#353535]  ' : 'text-[#3E3E3E] bg-[#151515] '} register-tab`}>Billing
                                            </div>
                                            <div onClick={() => { pageName == 'payment' && setUpdateBillingPage('payment') }} className={`  bg-[#0c0c0c] ${pageName == 'payment' && updateBillingPage != 'billing' ? 'text-[#9b9b9b] bg-[#353535]  ' : 'text-[#3E3E3E] bg-[#151515] '} register-tab`}>Payment
                                            </div>
                                        </div>
                                    </>
                                    }
                                    {/* CHILDREN */}
                                    <div className={'checkout-body'}>
                                        {children}
                                    </div>
                                    {!showVideo && <div className="timer-layout-sm border-inset bg-[#0d0d0d] mb-5">
                                        <p   className="text-center uppercase register-input-heading mt-[2vw] mb-[1.5vw] md:mb-[16px] md:mt-[20px]">Capital Club closes Again in: </p>

                                        <div    className="text-center lg:text-end flex items-center justify-center gap-4">
                                            <Timer time={timeEnd} />
                                        </div>
                                    </div>}

                                </div>
                            </div>

                        </div>
                    </div>
                </section>
            </div>
        </motion.div>
    );
};

export default CheckoutLayout;
