import { useForm } from "@inertiajs/react";
import React, { useEffect, useRef, useState } from "react";
import logo from "../../../assets/svg/logo.svg";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from "@inertiajs/react";
import TermAndCondition from "@/Components/Modal/TermAndCondition";
import ReactToast from "@/Components/ReactToast.jsx";
import Timer from "@/Components/Timer";
import Toast from "@/Components/Toast/Toast.jsx";
import { CardCVV, CardComponent, CardExpiry, CardNumber } from "@chargebee/chargebee-js-react-wrapper";
import { debounce } from "lodash";
import { Inertia } from "@inertiajs/inertia";
import axios from "axios";
import check from "../../../assets/img/CheckCircle.png";
import CheckoutLayout from "@/Layouts/CheckoutLayout";
import Recaptcha from "@/Components/Recaptcha";
import PaymentSuccessful from "../../Components/PAYMENT_Success.json";
import paymentSound from "../../../assets/paymentSound.mp3";
// import clickHere from "../../../assets/CLICKHERE.json";
import { motion } from "framer-motion"
import UpdateRegister from "./UpdateRegister";
import Lottie from "react-lottie-player";
import { ToastContainer, toast } from "react-toastify";




const Payment = ({
    price,
    chargeBeeSite,
    chargeBeePublicKey,
    timeDifferenceInSeconds,
    recaptchaKey,
    videoAsset,
    showComponent,
    user,
    countries,
    showCoupon,
    countryCode,
    planName,
    couponCode,
    invite_code,
    is3DSecure,
}) => {
    const [updateBillingPage, setUpdateBillingPage] = useState(showComponent)
    const [couponApplied, setCouponApplied] = useState(!showCoupon)
    const [couponCodeValue, setCouponCodeValue] = useState(couponCode)

    const [userData , setUserData] = useState(user)

    const isCoupn = showCoupon;
    const chargebeeFontSize = useRef('12px');


    let screenSize = window.innerWidth;
    if (screenSize < 500) {
        let font = screenSize * 2.4 / 60;
        chargebeeFontSize.current = font + 'px';
    } else {
        chargebeeFontSize.current = '12px';
    }



    // const [recaptchaState, setRecaptchaState] = useState(0);
    // const [recaptchaError, setRecaptchaError] = useState(null)

    const { data, setData, get } = useForm({
        // recaptcha: null,
        // recaptcha_version: 3,
    });



    const [isPosted, setIsPosted] = useState(false);
    const CardRef = useRef(null);

    const [coupon, setCoupon] = useState(null);
    const [paymentIntent, setPaymentIntent] = useState(null);
    const [termAndCondition, setTermAndCondition] = useState(null);

    // const [customPrice, setCustomPricesetCustomPrice] = useState(price);

    window.Chargebee.init({
        site: chargeBeeSite,
        domain: 'https://billing.capital.club',
        embed: false,
        enableGTMTracking: true,
        publishableKey: chargeBeePublicKey,
    })


    const handlePaymentIntent = async (e = null) => {

        if (e) {
            e.preventDefault()
        }


        if(couponCodeValue){
            axios.get(route('subscription.payment-intent', couponCodeValue)).then(response => {



                if (is3DSecure) {
                    setPaymentIntent(response?.data?.payload?.paymentIntent);
                }


                setCustomPriceState(response?.data?.payload?.price)

                if(response?.data?.payload?.success){
                    setCouponApplied(true)
                }else{
                    setCouponApplied(false)
                }

                if (updateBillingPage === 'payment') {
                    if(response?.data?.payload?.success){
                        // console.log('making coupon applied true on use effect');
                        setCouponApplied(true)
                        ReactToast('success', response.data.metadata.message)
                    }else{
                        setCouponApplied(false)
                        ReactToast('error', response.data.metadata.message)
                    }
                }

            }).catch(error => {
                ReactToast('error', error.response.data.metadata.message)
            })
        }else{
            axios.get(route('subscription.payment-intent')).then(response => {



                if (is3DSecure) {
                    setPaymentIntent(response?.data?.payload?.paymentIntent);
                }

                setCustomPriceState(response?.data?.payload?.price)
            }).catch(error => {
                ReactToast('error', error.response.data.metadata.message)
            })
        }
    }

    useEffect(() => {
        handlePaymentIntent()
        AOS.init();
    }, [])

    useEffect(() => {
        if (showCoupon) {
            if (couponCodeValue === '') {
                setCouponApplied(true)

            } else {
                setCouponApplied(false)

            }
        }
    }, [couponCodeValue])

    // getting signup user via axios <API>

    // const [userData , setUserData] = useState({})

    //       const handleGetUser = async (id) => {
    //         try {
    //             const response = await axios.get(route("get-auth-user"));
    //             setUserData(response.data?.payload)
    //             console.log("user data reveived*********************** :", response );
    //         } catch (error) {
    //             console.error("Error while getting user   :", error);
    //         }
    //     };



    const [captchaToken, setCaptchaToken] = useState()

    const showTACWarning = () => {
        if (!termAndCondition) {
            ReactToast('error', 'Please accept Terms & Conditions')
        }
    }


    // useEffect(() => {
    //     grecaptcha.enterprise.execute(recaptchaKey, { action: 'login' })
    //         .then(token => setCaptchaToken(token));
    // }, []);
    const [isDisable, setIsDisable] = useState(true)

    useEffect(() => {

        setIsDisable(!termAndCondition)

    }, [termAndCondition])

    const [paymentProcessing, setPaymentProcessing] = useState(false)

    const [showVideo, setShowVideo] = useState(false)

    const [isPlaying, setIsPlaying] = useState(false);





    const [fadeOut, setFadeOut] = useState(false)

    const handleSubmit = (event) => {
        localStorage.removeItem("videoTime");
        localStorage.removeItem("welcomeVideoTime")
        playAudio()
        pauseAudio()
        event.preventDefault();

        if (termAndCondition) {

            setIsDisable(true)
            setPaymentProcessing(true)

            if (CardRef.current) {
                const additionalData = {
                    firstName: user.first_name,
                    lastName: user.last_name,
                    plan: planName,
                    email: user?.email,
                    phone: user?.billingAddress?.phone_number,
                    billingAddress: {
                        firstName: user.first_name,
                        lastName: user.last_name,
                        phone: user?.billingAddress?.phone_number,
                        addressLine1: user?.billingAddress?.street_address,
                        city: user?.billingAddress?.city,
                        state: user?.billingAddress?.state,
                        zip: user?.billingAddress?.zip_code,
                        countryCode: user?.billingAddress?.country_iso,
                    },
                    customerBillingAddress: {
                        firstName: user.first_name,
                        lastName: user.last_name,
                        phone: user?.billingAddress?.phone_number,
                        addressLine1: user?.billingAddress?.street_address,
                        city: user?.billingAddress?.city,
                        state: user?.billingAddress?.state,
                        zip: user?.billingAddress?.zip_code,
                        countryCode: user?.billingAddress?.country_iso,
                    },
                    shippingAddress: {
                        firstName: user.first_name,
                        lastName: user.last_name,
                        phone: user?.billingAddress?.phone_number,
                        addressLine1: user?.billingAddress?.street_address,
                        city: user?.billingAddress?.city,
                        state: user?.billingAddress?.state,
                        zip: user?.billingAddress?.zip_code,
                        countryCode: user?.billingAddress?.country_iso,
                    },
                };

                let method = 'authorizeWith3ds';
                let param1 = JSON.parse(paymentIntent ?? '{}');
                let param2 = additionalData;


                if (!is3DSecure) {
                    method = 'tokenize';
                    param1 = additionalData;
                    param2 = null;
                }

                CardRef.current[method](param1, param2).then(async response => {
                    // console.log('rs authorization of card', response)
                    // await setRecaptchaError(null)

                    axios.post(route('subscription.store'), {
                        coupon: couponCodeValue,
                        paymentIntent: is3DSecure ? response : response?.token,
                        term_and_condition: termAndCondition,
                        // recaptcha: data?.recaptcha,
                        // recaptcha_version: data?.recaptcha_version,
                    }
                    ).then(
                        response => {
                            // console.log('then', response)
                            setShowVideo(true)
                            // ReactToast('success', response.data.metadata.message);
                            playAudio()
                            setIsPlaying(true);


                            setTimeout(() => {
                                setFadeOut(true)
                            }, 15000);

                            setTimeout(() => {
                                redirectToGlich();
                            }, 15000);
                            localStorage.removeItem("user");
                        }).catch(
                            error => {
                                handlePaymentIntent()
                                setIsDisable(false)
                                setPaymentProcessing(false)
                                // setRecaptchaError(error?.response?.data?.errors?.recaptcha[0])

                                if (error?.response?.data?.metadata?.message) {
                                    ReactToast('error', error?.response?.data?.metadata?.message);
                                    if (error?.response?.status === 401){
                                        window.location.href = '/checkout';
                                    }
                                }

                                if (error?.response?.data?.errors?.recaptcha[0]) {
                                    ReactToast('error', error?.response?.data?.errors?.recaptcha[0])
                                }
                                // console.log('error', error?.response?.data?.metadata?.message)
                                // setRecaptchaState(previous => previous + 1)
                            }
                        );

                    setIsPosted(true);
                    // setPaymentProcessing(false)

                }).catch(error => {
                    // console.log('er authorization of card', error)
                    handlePaymentIntent()
                    setIsDisable(false)
                    setPaymentProcessing(false)
                    ReactToast('error', 'Invalid card information please check with your bank.')
                });
            }
        }
    };


    const [customPriceState, setCustomPriceState] = useState(price)


    const [errorcouponCode, setErrorCouponCode] = useState(false)

    // const verifyCoupon = (e) => {
    //     e.preventDefault()
    //     setCoupon(couponCodeValue);

    //     if (couponCodeValue) {
    //         setErrorCouponCode(false)
    //         axios.get(route('subscription.verify-coupon-code', couponCodeValue)).then(response => {
    //             setCustomPriceState(response.data.payload)
    //             ReactToast('success', response.data.metadata.message)
    //         }).catch(error => {
    //             ReactToast('error', error.response.data.metadata.message)
    //             setCustomPriceState(originalPrice)
    //         })
    //     } else {

    //         setErrorCouponCode(true)
    //     }
    // }


    const redirectToGlich = () => {
        setTimeout(() => {
            get(route('preference.glitch-id'));
        }, 200);
    }

    const audioRef = useRef(null);

    const playAudio = () => {
        const audio = audioRef.current;
        audio.currentTime = 0;
        audio.play();
    };


    const pauseAudio = () => {
        const audio = audioRef.current;
        audio.currentTime = 0;
        audio.pause();
    };

    const handleContextMenu = (e) => {
        e.preventDefault();
      };

      
    return (
        <>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2 }}
            >

                <div onContextMenu={handleContextMenu} className={` ${showVideo ? 'block' : 'hidden'} ${fadeOut && 'payment-video-div'} `}  >
                    <div className="h-[100vh] flex justify-center items-center">

                        <div className=" payment-lottie-wrapper ">

                            <audio ref={audioRef} controls className="hidden">
                                <source src={paymentSound} type="audio/mpeg" />
                            </audio>

                            <Lottie
                                animationData={PaymentSuccessful}
                                play={isPlaying}
                                // loop={false}
                                className="payment-lottie"
                            />
                        </div>

                    </div>
                </div>

            </motion.div>

            <div className={` ${!showVideo ? 'block' : 'hidden'} ${fadeOut && 'payment-video-div'} `} >

                <CheckoutLayout user={user} showVideo={showVideo} timeEnd={timeDifferenceInSeconds} price={price} setUpdateBillingPage={setUpdateBillingPage} updateBillingPage={updateBillingPage}>

                    {updateBillingPage === 'billing' ?
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1 }}
                        >
                            <div className={` ${showVideo ? 'hidden' : ' block'}   `}>
                                <UpdateRegister userData={userData}  setUserData={setUserData} countries={countries} setUpdateBillingPage={setUpdateBillingPage} countryCode={countryCode} invite_code={invite_code} />
                            </div>
                        </motion.div>
                        :
                        <>
                            {/* *******payment screen ***** */}
                            <div className={` ${showVideo ? 'hidden' : 'block'} `}>
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 1 }}
                                >
                                    <div>
                                        <form className=" flex flex-col justify-between " >
                                            <div className="card-bg border-rounded-15 card-padding">
                                                {/* address */}

                                                <div className="flex items-center justify-center flex-wrap">
                                                    <p className="register-input-heading-2">  SECURE PAYMENT</p>
                                                </div>
                                                {/* payments */}
                                                {/* {!isCoupn ? */}
                                                <div className="">
                                                    <CardComponent
                                                        // icon={false}
                                                        style={{ color: '#fff', fontSize: `${chargebeeFontSize.current}`, fill: '#909090 !important' }}
                                                        ref={CardRef}
                                                        styles={{
                                                            base: {
                                                                color: '#fff',
                                                                fontWeight: 600,
                                                                fontFamily: 'Quicksand, Open Sans, Segoe UI, sans-serif',
                                                                fontSize: `${chargebeeFontSize.current}`,
                                                                textAlign: 'center',
                                                                fontSmoothing: 'antialiased',

                                                                ':focus': {
                                                                    color: '#fff',
                                                                },

                                                                '::placeholder': {
                                                                    color: '#909090',
                                                                },

                                                                ':focus::placeholder': {
                                                                    color: '#909090',
                                                                },
                                                            },
                                                            invalid: {
                                                                color: '#fff',
                                                                ':focus': {
                                                                    color: '#FA755A',
                                                                },
                                                                '::placeholder': {
                                                                    color: '#FFCCA5',
                                                                },
                                                            }
                                                        }}
                                                        className="text-[#fff]"
                                                    >

                                                        <div className="grid grid-cols-12">

                                                            <div className="col-span-12 lg:col-span-12  ">
                                                                <div className="relative ">

                                                                    <CardNumber className="input-text text-[#fff] flex items-center w-full pl-8 pr-4" />

                                                                </div>
                                                            </div>

                                                            <div className="col-span-6 lg:col-span-6 mr-[0.5vw] md:mr-[5px]">

                                                                <CardExpiry
                                                                    className="input-text text-[#fff]  flex items-center  w-full" />
                                                            </div>

                                                            <div className="col-span-6 lg:col-span-6 ml-[0.5vw] md:ml-[5px]">

                                                                <CardCVV
                                                                    className="input-text text-[#fff]   flex items-center  w-full" />
                                                            </div>
                                                        </div>
                                                    </CardComponent>
                                                </div>


                                                {isCoupn &&
                                                <div className="justify-between w-full  gap-x-1  mt-4 ">
                                                    <div className="flex  gap-x-2   w-full ">

                                                        <input type="text" style={{marginBottom:'auto  !important', marginTop:'auto  !important'}}
                                                            className="input-text    my-auto w-full "
                                                            placeholder="COUPON CODE" value={couponCodeValue}
                                                            onChange={(e) => setCouponCodeValue(e.target.value)} />


                                                    </div>
                                                    <p className="font-12 fw-regular   text-center danger-color ">
                                                        {errorcouponCode && 'Please enter coupon code'}
                                                    </p>

                                                    <button disabled={couponApplied || couponCodeValue== ''} onClick={(e) => { handlePaymentIntent(e) }}
                                                    className={`button  primary ${(couponApplied || couponCodeValue== '') && 'disable'} mt-1  rounded-full  pt-[2px] h-[9vw] md:h-[35px]    w-[100%] `}>
                                                        APPLY COUPON</button>

                                                </div>
  }

                                                {/* // } */}
                                            </div>
                                            <div className="padding-payout">
                                                {!isCoupn &&
                                                    <p className="fw-medium text-center  timer-subheading-2  mb-[1.5vw] md:mb-[8px]">This exclusive $369 membership discount will NEVER be repeated.</p>
                                                }

                                                <div className="col-span-12 mt-[5px]">
                                                    <div className="flex  items-center justify-between payment-price-h border-rounded-5 bg-[#1a1a1a] px-4 flex-wrap">
                                                        <p className="yearly-member  ">
                                                            CC YEARLY MEMBERSHIP
                                                        </p>
                                                        <div className="flex">

                                                            <div className="relative">
                                                                {price !== customPriceState && <div className="absolute top-3 w-full h-[2px] bg-[#C50A0A] -rotate-12 "></div>}
                                                                <p className="font-14 fw-bold pt-[3px]">${price}</p>
                                                            </div>
                                                            {price!= customPriceState && <p className="font-14 fw-bold pt-[3px] pl-2">${customPriceState}   </p>}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div onClick={() => showTACWarning()} className="col-span-12  mt-2 md:mt-[0.875rem]  ">
                                                    <button disabled={paymentProcessing || !couponApplied} onClick={(e) => { handleSubmit(e) }}
                                                        type="submit"
                                                        className={` ${paymentProcessing && 'disable'} rounded-full button primary w-full fw-bold fw-bold register-button`}>
                                                        <div className="button_container glitch uppercase ">

                                                            <div className="flex items-center gap-x-2">
                                                                {paymentProcessing &&
                                                                    //  <div className="spinner-5 -mt-[3px] md:-mt-[5px]"></div>

                                                                    <div class="loader" id="loader-6">
                                                                        <span></span>
                                                                        <span></span>
                                                                        <span></span>
                                                                        <span></span>
                                                                    </div>

                                                                }
                                                                <span className="-mt-[2px]"> {paymentProcessing ? 'Please Wait' : 'PAY NOW'} </span>
                                                            </div>


                                                        </div>
                                                    </button>

                                                </div>

                                                <div className="col-span-12  flex justify-center md:justify-center items-center md:order-rst  mt-2 ">
                                                    <span className="danger-color mr-1">*</span>
                                                    <input
                                                        id="default-checkbox"
                                                        type="checkbox"
                                                        checked={termAndCondition}
                                                        value={termAndCondition}
                                                        onChange={(e) => setTermAndCondition(e.target.checked)}
                                                        className={`w-4 md:w-5 h-4 md:h-5 rounded-[2px] border-[2px] border-[#ffffff]  focus:outline-transparent   text-[#000] bg-[#000] ${termAndCondition
                                                            ? "border-[2px] border-[#ffffff] ring-[2px] ring-[#ffffff] focus:outline-none"
                                                            : "border-[2px] border-[#999999] ring-transparent focus:outline-transparent"
                                                            } focus:shadow-none focus:ring-transparent overflow-hidden focus:border-0 `}
                                                    />


                                                    <div className="flex items-center ml-2 pt-[1px] md:pt-[3px] ">
                                                        <p className="payment-TAC ">
                                                            I have read and agreed to the
                                                        </p>
                                                        <a
                                                            href={'https://capital.club/terms-of-service'}
                                                            target="_blank" // Add this attribute to open in a new tab
                                                            className="payment-TAC   px-1 underline"
                                                        >
                                                            Terms Of Service
                                                        </a>
                                                    </div>

                                                </div>

                                                {/* <div className="col-span-12  flex justify-center md:justify-start items-center md:order-rst   mt-[0.7rem] ">
                                    <Recaptcha
                                        className={'mt-4'}
                                        recaptchaKey={recaptchaKey}
                                        recaptchaKeyV2={recaptchaKeyV2}
                                        state={recaptchaState}
                                        setData={setData}
                                        recaptchaVersion={data?.recaptcha_version}
                                        recaptchaError={recaptchaError}
                                />
                                </div> */}




                                                {/* bottom cards  */}
                                                <div className="flex justify-center gap-x-2 payment-bottom-icon-mt ">
                                                    <div className="rounded-[10px]  w-full   bg-[#1a1a1a] flex py-1.5 md:py-2   justify-center  ">

                                                        <div className="h-auto">

                                                            <svg className="refund-gurentee-icon mx-auto" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M24.7838 12.2798L22.259 9.47286L22.6108 5.76044L18.8754 4.93546L16.9198 1.72607L13.4017 3.19494L9.88354 1.72607L7.92789 4.93546L4.19248 5.75038L4.54429 9.47286L2.01953 12.2798L4.54429 15.0868L4.19248 18.8092L7.92789 19.6342L9.88354 22.8537L13.4017 21.3747L16.9198 22.8436L18.8754 19.6342L22.6108 18.8092L22.259 15.0968L24.7838 12.2798ZM20.6966 13.7688L20.1171 14.4227L20.1999 15.2779L20.3861 17.2398L17.551 17.8635L17.0957 18.608L16.0713 20.2982L14.2294 19.5236L13.4017 19.1815L12.5842 19.5236L10.7424 20.2982L9.71798 18.6181L9.2627 17.8736L6.42752 17.2498L6.61377 15.2779L6.69655 14.4227L6.1171 13.7688L4.78228 12.2899L6.1171 10.8009L6.69655 10.1469L6.60342 9.2817L6.41717 7.32992L9.25235 6.70615L9.70764 5.96165L10.732 4.27145L12.5739 5.04612L13.4017 5.38819L14.2191 5.04612L16.0609 4.27145L17.0853 5.96165L17.5406 6.70615L20.3758 7.32992L20.1895 9.29176L20.1068 10.1469L20.6862 10.8009L22.021 12.2798L20.6966 13.7688Z" fill="white" />
                                                                <path d="M11.4253 14.0505L9.02471 11.7063L7.4933 13.2054L11.4253 17.0385L19.0203 9.63383L17.4889 8.13478L11.4253 14.0505Z" fill="white" />
                                                            </svg>



                                                            {/* <svg className="refund-gurentee-icon mx-auto" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M16.6478 8.35756L14.947 6.41277L15.184 3.84062L12.6676 3.26903L11.3502 1.04541L8.98016 2.06312L6.61015 1.04541L5.29271 3.26903L2.77632 3.83365L3.01333 6.41277L1.3125 8.35756L3.01333 10.3024L2.77632 12.8815L5.29271 13.4531L6.61015 15.6837L8.98016 14.659L11.3502 15.6767L12.6676 13.4531L15.184 12.8815L14.947 10.3093L16.6478 8.35756ZM13.8944 9.38921L13.5041 9.8423L13.5598 10.4348L13.6853 11.7941L11.7754 12.2262L11.4687 12.7421L10.7786 13.9131L9.5378 13.3764L8.98016 13.1394L8.42948 13.3764L7.18871 13.9131L6.49862 12.749L6.19192 12.2332L4.28197 11.801L4.40744 10.4348L4.46321 9.8423L4.07286 9.38921L3.17365 8.36453L4.07286 7.33289L4.46321 6.8798L4.40047 6.28033L4.275 4.92803L6.18495 4.49585L6.49165 3.98003L7.18174 2.80897L8.42251 3.34571L8.98016 3.58271L9.53083 3.34571L10.7716 2.80897L11.4617 3.98003L11.7684 4.49585L13.6783 4.92803L13.5529 6.2873L13.4971 6.8798L13.8875 7.33289L14.7867 8.35756L13.8944 9.38921Z" fill="white" />
                                                            <path d="M7.64877 9.58439L6.03159 7.96024L4.99995 8.99886L7.64877 11.6547L12.7652 6.5243L11.7335 5.48568L7.64877 9.58439Z" fill="white" />
                                                        </svg> */}



                                                            <p className="font-12 fw-semibold  text-center   pt-[2px] md:pt-1.5 ">14 DAY  REFUND <br />
                                                                GUARANTEED</p>
                                                        </div>


                                                    </div>
                                                    <div className="rounded-[10px] w-full   bg-[#1a1a1a] flex py-1.5 md:py-2   justify-center ">
                                                        <div className="h-auto">

                                                            <svg className="secure-ssl-icon mx-auto" viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M15.547 7.23835H14.4691V5.31004C14.4691 2.64897 12.0547 0.489258 9.07985 0.489258C6.10498 0.489258 3.69059 2.64897 3.69059 5.31004V7.23835H2.61274C1.4271 7.23835 0.457031 8.10609 0.457031 9.16666V18.8082C0.457031 19.8688 1.4271 20.7365 2.61274 20.7365H15.547C16.7326 20.7365 17.7027 19.8688 17.7027 18.8082V9.16666C17.7027 8.10609 16.7326 7.23835 15.547 7.23835ZM5.84629 5.31004C5.84629 3.70954 7.29062 2.41757 9.07985 2.41757C10.8691 2.41757 12.3134 3.70954 12.3134 5.31004V7.23835H5.84629V5.31004ZM15.547 18.8082H2.61274V9.16666H15.547V18.8082ZM9.07985 15.9158C10.2655 15.9158 11.2356 15.048 11.2356 13.9874C11.2356 12.9269 10.2655 12.0591 9.07985 12.0591C7.89421 12.0591 6.92415 12.9269 6.92415 13.9874C6.92415 15.048 7.89421 15.9158 9.07985 15.9158Z" fill="white" />
                                                            </svg>


                                                            {/* <svg className="secure-ssl-icon mx-auto" viewBox="0 0 13 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M10.6147 5.55746H9.88857V4.22142C9.88857 2.3777 8.26209 0.881348 6.25805 0.881348C4.254 0.881348 2.62753 2.3777 2.62753 4.22142V5.55746H1.90143C1.10271 5.55746 0.449219 6.15867 0.449219 6.89349V13.5736C0.449219 14.3085 1.10271 14.9097 1.90143 14.9097H10.6147C11.4134 14.9097 12.0669 14.3085 12.0669 13.5736V6.89349C12.0669 6.15867 11.4134 5.55746 10.6147 5.55746ZM4.07974 4.22142C4.07974 3.11252 5.05272 2.21738 6.25805 2.21738C7.46338 2.21738 8.43636 3.11252 8.43636 4.22142V5.55746H4.07974V4.22142ZM10.6147 13.5736H1.90143V6.89349H10.6147V13.5736ZM6.25805 11.5696C7.05676 11.5696 7.71026 10.9684 7.71026 10.2336C7.71026 9.49875 7.05676 8.89753 6.25805 8.89753C5.45933 8.89753 4.80584 9.49875 4.80584 10.2336C4.80584 10.9684 5.45933 11.5696 6.25805 11.5696Z" fill="white" />
                                                        </svg> */}

                                                            <p className="font-12 fw-semibold text-center   pt-1 md:pt-1.5">SECURED <br />
                                                                WITH SSL</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <p className="money-back-text  my-2.5 ">*Capital Club offers a 14-day money back guarantee, if you don’t love the Yearly Membership.</p>

                                            </div>

                                        </form>
                                    </div>
                                </motion.div>
                            </div>
                        </>
                    }
                </CheckoutLayout>
            </div>
        </>
    );
};
export default Payment;
