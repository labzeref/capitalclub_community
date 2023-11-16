import React, { useState, useEffect } from "react";
import cross from "../../../assets/cross.png";
import AOS from 'aos';
import 'aos/dist/aos.css';
import axios from "axios";
import Toast from "../Toast/Toast";
import ReactToast from "../ReactToast";
import Button from "../../Components/Button";
import {ReactComponent as Plus} from "../../../assets/svg/Plus.svg";
import {CardCVV, CardExpiry, CardNumber, CardComponent} from "@chargebee/chargebee-js-react-wrapper";
import { useRef } from "react";
import {useForm} from "@inertiajs/react";
export default function AddNewCard({paymentIntent}) {
    const [showModal, setShowModal] = useState(false);
    const [isPosted, setIsPosted] = useState(false);
    const CardRef = useRef(null);
    const [isDisable , setIsDisable] = useState(false)

    const [CardError , setCardError] = useState(false)




    useEffect(() => {
        if (isPosted) {
            // Call the API endpoint
            post(route('profile.payment.add-card'), {
                replace: true,
                onSuccess: () => setShowModal(false),
            });
            setIsPosted(false)
        }
    }, [isPosted]);

    const {data, setData, post, processing, errors} = useForm({
        paymentIntent: {},
    });

    const [paymentProcessing , setPaymentProcessing] =useState(false)

    const handleSubmit = () => {
        console.log("submit")
        setIsDisable(true)
        setPaymentProcessing(true)

        if (CardRef.current) {
            CardRef.current.authorizeWith3ds(JSON.parse(paymentIntent)).then(async response => {
                await setData('paymentIntent', response);
                setIsPosted(true);
                setPaymentProcessing(false)
                setIsDisable(false)
            }).catch(error => {
                setIsDisable(false)
                setPaymentProcessing(false)
                setCardError(true)
                // ReactToast('error', 'Invalid card information please check with your bank.')
            });
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

            {/* <p onClick={() => setShowModal(true)} className="px-4 py-2 rounded-b-[10px] text-white hover:text-black hover:bg-gray-100  fw-regular ">
                Report
            </p> */}
            <Button
            onClick={() => setShowModal(true)}
                                        icon={<Plus/>}
                                        className={"secondary   "}
                                    >
                                       Replace Credit Card
                                    </Button>

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
                                <div className="relative p-3 md:p-3 flex-auto">
                                    {/* <div className="flex justify-center">
                                        <div className="">

                                            <h6 className=" fw-regular fs-medium   text-center tableRowSpaceY">
                                                Invoice Paid
                                            </h6>

                                        </div>
                                    </div> */}
                                    <div className="max-w-[420px] md:max-w-[620px] lg:max-w-[830px] mx-auto paddingSectionXSmall">
                                    <div className="grid grid-cols-12 ">
                            <div className="col-span-12 lg:col-span-12 mt-[1rem]">
                            <form onSubmit={() => {
                                        handleSubmit(event)
                                    }}>

                                        {/* address */}


                                        {/* payments */}
                                        <CardComponent
                                            style={{color: '#fff'}}
                                            ref={CardRef}
                                            styles={{
                                                base: {
                                                    color: '#fff',
                                                    fontWeight: 600,
                                                    fontFamily: 'Quicksand, Open Sans, Segoe UI, sans-serif',
                                                    fontSize: '16px',
                                                    textAlign: 'center',
                                                    fontSmoothing: 'antialiased',

                                                    ':focus': {
                                                        color: 'white',
                                                    },

                                                    '::placeholder': {
                                                        color: '#8C8C8C',
                                                    },

                                                    ':focus::placeholder': {
                                                        color: '#CFD7DF',
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

                                            <div className="grid grid-cols-12 mt-6">

                                                <div className="col-span-12 lg:col-span-6  ">
                                                    <div className="relative   lg:mb-0">

                                                        <CardNumber className="input-text text-[#fff]  w-full"/>

                                                    </div>

                                                </div>

                                                <div className="col-span-6 lg:col-span-3 mr-[1rem] lg:mx-[8px] ">

                                                    <CardExpiry
                                                        className="input-text text-[#fff] mt-[1rem] lg:mt-0  w-full"/>
                                                </div>

                                                <div className="col-span-6 lg:col-span-3">

                                                    <CardCVV
                                                        className="input-text text-[#fff] mt-[1rem] lg:mt-0  w-full"/>
                                                </div>
                                            </div>

                                        </CardComponent>





                                    </form>

                                   {CardError && <p className="danger-color fs-tiny py-3 text-center ">Invalid card information please check with your bank.</p> }
                            </div>


                        </div>
                                    </div>
                                </div>
                                {/*footer*/}
                                <div className="md:flex items-center justify-center p-3  md:p-6  md:space-x-3 space-y-3 md:space-y-0">


                                    <button onClick={() => {handleSubmit()}}
                                            disabled={isDisable}
                                            className={` ${isDisable && 'disable'}  button primary w-full `}>
                                        <div className="button_container glitch uppercase  ">
                                            {paymentProcessing ? <div className="flex">
                                                <svg   aria-hidden="true"
                                                       className="inline -mt-[2px] w-7 h-7 mr-2 text-gray-100 animate-spin dark:text-gray-600 fill-gray-900"
                                                       viewBox="0 0 100 101" fill="none"
                                                       xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                                        fill="currentColor"/>
                                                    <path
                                                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                                        fill="currentFill"/>
                                                </svg>
                                                Please Wait
                                            </div> :  'Add Card' }

                                        </div>
                                    </button>


                                </div>
                            </div>
                        </div>

                        <div className="backdrop-blur-lg bg-black/30 fixed inset-0 -z-40 noise-10  "></div>
                    </div>
                </>
            ) : null}
        </>
    );
}
