import { useForm } from "@inertiajs/react";
import { useEffect, useRef, useState } from "react";
import logo from "../../../assets/svg/logo.svg";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from "@inertiajs/react";
import TermAndCondition from "@/Components/Modal/TermAndCondition";
import ReactToast from "@/Components/ReactToast.jsx";
import Timer from "@/Components/Timer";
import Toast from "@/Components/Toast/Toast.jsx";
import { CardCVV, CardComponent, CardExpiry, CardNumber } from "@chargebee/chargebee-js-react-wrapper";

const Payment = ({ price, chargeBeeSite, chargeBeePublicKey, paymentIntent, timeDifferenceInSeconds }) => {
    const [isPosted, setIsPosted] = useState(false);
    const CardRef = useRef(null);

    window.Chargebee.init({
        site: chargeBeeSite,
        embed: false,
        enableGTMTracking: true,
        publishableKey: chargeBeePublicKey
    })

    useEffect(() => {
        AOS.init();
    }, [])

    useEffect(() => {
        if (isPosted) {
            // Call the API endpoint
            post(route('subscription.store'), {
                replace: true
            });
            setIsPosted(false)
        }
    }, [isPosted]);

    const { data, setData, post, processing, errors } = useForm({
        paymentIntent: {},
        term_and_condition: false,
    });
    const [isDisable, setIsDisable] = useState(true)

    useEffect(() => {

        setIsDisable(!data?.term_and_condition)

    }, [data?.term_and_condition])

    const [paymentProcessing, setPaymentProcessing] = useState(false)

    const handleSubmit = (event) => {
        setIsDisable(true)
        setPaymentProcessing(true)
        event.preventDefault();

        if (CardRef.current) {
            CardRef.current.authorizeWith3ds(JSON.parse(paymentIntent)).then(async response => {
                await setData('paymentIntent', response);
                setIsPosted(true);
                setPaymentProcessing(false)
            }).catch(error => {
                setIsDisable(false)
                setPaymentProcessing(false)
                ReactToast('error', 'Invalid card information please check with your bank.')
            });
        }
    };

    return (
        <div>
            <Toast />
            <section className="relative mybg ">
                <div className="container mx-auto">
                    <div
                        className="grid grid-cols-12 gap-y-7 lg:gap-y-0">
                        <div className=" col-span-0 lg:col-span-2  "></div>
                        <div className="md:w-full xl:w-[70%] mx-auto col-span-12 lg:col-span-8  ">
                            <div className=" px-5 xl:px-0">
                                <div className="mt-5 mb-6 lg:mb-[70px] flex justify-between  ">
                                <Link href={route('welcome')}>

                                    <img
                                        className="max-h-[30px] lg:max-h-[40px]"
                                        src={logo}
                                        alt=""
                                    />
                                     </Link>
                                    <Link href={route('logout')} method={'post'}
                                        className="fs-regular fw-regular  underline mt-1 opacity-50">
                                        Logout
                                    </Link>
                                </div>
                                <div
                                    className="text-center lg:text-end flex items-center justify-center gap-4 mt-5 md:hidden mb-6">
                                    <p className="fs-large fw-regular">
                                        Registration Ends Soon
                                    </p>
                                    <Timer time={timeDifferenceInSeconds} />
                                </div>
                                <div className="h-[1px] left-0 md:hidden w-full  absolute"></div>


                                <div className="flex">
                                    <button
                                        className="bg-[#1a1a1a] text-[#656565] rounded-l-[10px] text-[14px] h-[45px] w-full uppercase font-bold">Billing
                                    </button>
                                    <button
                                        className="  bg-[#1a1a1a] text-[#fff] rounded-r-[10px] text-[14px] h-[45px] w-full uppercase font-bold relative flex justify-center pt-[11px]">Payment <div
                                            className={`  payment-tab-shadow   `}></div></button>
                                </div>
                                <div data-aos="fade-left" data-aos-delay="100" data-aos-easing="ease"
                                    data-aos-duration="300">
                                    <div
                                        className="flex items-center  mt-[3rem] md:mt-0 justify-center flex-wrap gap-4 md:pt-[4.5rem] pt-[2rem] ">
                                        <p className="text-[25px] fw-medium text-center">Payment</p>
                                        {/* <div className="flex items-center">
                                        <p className="fs-regular fw-regular opacity-50">
                                            Already have an Account?
                                        </p>
                                        <Link
                                            href={route("login")}
                                            className="fs-regular fw-regular px-[2px] -mt-1 underline underline-offset-4"
                                        >
                                            Login
                                        </Link>
                                    </div> */}
                                    </div>

                                    <form onSubmit={() => {
                                        handleSubmit(event)
                                    }}>

                                        {/* address */}


                                        {/* payments */}
                                        <CardComponent
                                            style={{ color: '#fff' }}
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
                                                        {/*<input*/}
                                                        {/*    className="input-text w-full   "*/}
                                                        {/*    placeholder="Card Number"*/}
                                                        {/*    type="text"*/}
                                                        {/*    pattern="[0-9]+"*/}
                                                        {/*    name="cardNumber"*/}
                                                        {/*/>*/}
                                                        <CardNumber className="input-text text-[#fff]  w-full" />

                                                    </div>
                                                </div>

                                                <div className="col-span-6 lg:col-span-3 mr-[1rem] lg:mx-[1rem] ">
                                                    {/*<input*/}
                                                    {/*    type="text"*/}
                                                    {/*    name="expiry"*/}
                                                    {/*    className="input-text  w-full "*/}
                                                    {/*    placeholder="Expiry"*/}
                                                    {/*/>*/}
                                                    <CardExpiry
                                                        className="input-text text-[#fff] mt-[1rem] lg:mt-0  w-full" />
                                                </div>

                                                <div className="col-span-6 lg:col-span-3">
                                                    {/*<input*/}
                                                    {/*    onKeyPress={handleKeyPress}*/}
                                                    {/*    type="text"*/}
                                                    {/*    name="cvc"*/}
                                                    {/*    pattern="[0-9]*"*/}
                                                    {/*    inputMode="numeric"*/}
                                                    {/*    className="input-text w-full    "*/}
                                                    {/*    placeholder="CVC"*/}
                                                    {/*/>*/}
                                                    <CardCVV
                                                        className="input-text text-[#fff] mt-[1rem] lg:mt-0  w-full" />
                                                </div>
                                            </div>

                                        </CardComponent>
                                        <div
                                            className="col-span-12    flex items-center gap-2  mt-[1rem] ">
                                            <input
                                                id="default-checkbox"
                                                type="checkbox"
                                                checked={data?.term_and_condition}
                                                value={data.term_and_condition}
                                                onChange={(e) => setData("term_and_condition", e.target.checked)}
                                                className={`w-5 h-5 rounded-[2px] text-[#fff] bg-[#fff] ${data?.term_and_condition
                                                    ? "border-[2px] border-[#ffffff] ring-[2px] checkbox-bg bg-white ring-[#ffffff] focus:outline-none"
                                                    : "border-[2px] border-[#999999]    ring-transparent focus:outline-transparent"
                                                    }   focus:shadow-none focus:ring-transparent`}
                                            />

                                            <div className="flex items-center">
                                                <p className="fs-regular fw-regular text-[#949494]">
                                                    I agree to the
                                                </p>

                                                <TermAndCondition />

                                            </div>
                                        </div>
                                        <div className="col-span-12 mt-12 lg:mt-[65px] mb-[1rem] ">
                                            <div className="flex items-center justify-between flex-wrap gap-4">
                                                <h6 className="  uppercase ">
                                                    TOTAL PAYMENT
                                                </h6>
                                                <h6>${price}/year </h6>
                                            </div>
                                        </div>

                                        <div className="col-span-12">
                                            <button disabled={isDisable} className={` ${isDisable && 'disable'}  button primary w-full `}>
                                                <div className="button_container glitch uppercase  ">
                                                    {paymentProcessing ? <div className="flex">
                                                        <svg aria-hidden="true"
                                                            className="inline -mt-[2px] w-7 h-7 mr-2 text-gray-100 animate-spin dark:text-gray-600 fill-gray-900"
                                                            viewBox="0 0 100 101" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                                                fill="currentColor" />
                                                            <path
                                                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                                                fill="currentFill" />
                                                        </svg>
                                                        Please Wait
                                                    </div> : 'Pay Now'}

                                                </div>
                                            </button>
                                        </div>


                                    </form>
                                </div>
                            </div>
                        </div>
                        {/* <div className="col-span-12 w-full">
                            <div
                                className="relative lg:absolute  right-0 top-0 min-h-[100vh] noise-10  xl:w-[37rem] lg:w-[28rem] border-l border-l-[#ffffff1a]">
                                <div className="hidden md:block">
                                    <div
                                        className="text-center lg:text-end flex items-center justify-center gap-4 mt-5 ">
                                        <p className="fs-large fw-regular">
                                            Registration Ends Soon
                                        </p>
                                        <Timer time={timeDifferenceInSeconds}/>
                                    </div>
                                </div>

                                <div className="text-center justify-center flex flex-col items-center mt-12 lg:mt-20">
                                    <img
                                        className="h-[145px] mb-7 lg:mb-14"
                                        src={gain}
                                        alt=""
                                    />
                                    <h2 className="max-w-md mx-auto px-4 lg:px-0">
                                        GAIN NEW SKILLS IN 10 MINUTES
                                    </h2>
                                </div>
                                <div className="flex justify-around items-center signup-plan mt-10 py-7">
                                    <div>
                                        <h3 className="mb-2">Yearly Plan</h3>
                                        <p className="fw-regular fs-small">
                                            LIMITED TIME OFFER
                                        </p>
                                    </div>
                                    <div>
                                        <p className="fs-x-large fw-regular ">
                                            ${price}/Year
                                        </p>
                                        <p className="fs-regular fw-regular opacity-50">
                                            billed yearly
                                        </p>
                                    </div>
                                </div>
                                <div className="flex justify-between flex-col   ">
                                    <div>
                                        <ul className="mt-8 lg:mt-12 ml-8 xl:ml-16">
                                            <li className="flex items-center gap-5 mb-4">
                                                <span>
                                                    <img src={CheckCircle} alt=""/>
                                                    
                                                </span>
                                                <p className="fs-large fw-regular">
                                                    All 180+ classes across 11
                                                    categories
                                                </p>
                                            </li>
                                            <li className="flex items-center gap-5 mb-4">
                                                <span>
                                                    <img src={CheckCircle} alt=""/>
                                                    
                                                </span>
                                                <p className="fs-large fw-regular">
                                                    Bonus class guides & content
                                                </p>
                                            </li>
                                            <li className="flex gap-5 mb-4">
                                                <span>
                                                    <img src={CheckCircle} alt=""/>
                                                    
                                                </span>
                                                <span>
                                                    <p className="fs-large fw-regular mb-2">
                                                        Access to live training by
                                                        Capital Club
                                                    </p>
                                                    <p className="fs-regular fw-regular opacity-50">
                                                        Learn by doing in just 30
                                                        days.
                                                    </p>
                                                </span>
                                            </li>
                                            <li className="flex items-center gap-5 mb-4">
                                                <span>
                                                    <img src={CheckCircle} alt=""/>
                                                    
                                                </span>
                                                <p className="fs-large fw-regular">
                                                    Get world's best certificates
                                                </p>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className=" mt-[3rem] ml-8 lg:ml-16 bottom-5 left-20  ">
                                        <div
                                            className="flex items-center gap-4 pb-[2rem] md:pb-0 "
                                        >
                                            <span>
                                                <svg
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <g clipPath="url(#clip0_216_18882)">
                                                        <path
                                                            opacity="0.2"
                                                            d="M19.5 8.25H4.5C4.08579 8.25 3.75 8.58579 3.75 9V19.5C3.75 19.9142 4.08579 20.25 4.5 20.25H19.5C19.9142 20.25 20.25 19.9142 20.25 19.5V9C20.25 8.58579 19.9142 8.25 19.5 8.25Z"
                                                            fill="white"
                                                        />
                                                        <path
                                                            d="M19.5 8.25H4.5C4.08579 8.25 3.75 8.58579 3.75 9V19.5C3.75 19.9142 4.08579 20.25 4.5 20.25H19.5C19.9142 20.25 20.25 19.9142 20.25 19.5V9C20.25 8.58579 19.9142 8.25 19.5 8.25Z"
                                                            stroke="white"
                                                            strokeWidth="1.2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                        <path
                                                            d="M8.25 8.25V5.25C8.25 4.25544 8.64509 3.30161 9.34835 2.59835C10.0516 1.89509 11.0054 1.5 12 1.5C12.9946 1.5 13.9484 1.89509 14.6517 2.59835C15.3549 3.30161 15.75 4.25544 15.75 5.25V8.25"
                                                            stroke="white"
                                                            strokeWidth="1.2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_216_18882">
                                                            <rect
                                                                width="24"
                                                                height="24"
                                                                fill="white"
                                                            />
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                            </span>
                                            <p className="fs-regular fw-regular py-3">
                                                Secure with SSL
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </section>
        </div>
    );
};

// Register.layout = (page) => <AuthLayout login={false} children={page} />;

export default Payment;
