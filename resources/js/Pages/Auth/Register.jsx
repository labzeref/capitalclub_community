import React, { useEffect, useState } from "react";
import logo from "../../../assets/svg/logo.svg";
import { Link, useForm, usePage } from "@inertiajs/react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { ToastContainer, toast } from "react-toastify";
import Toast from "@/Components/Toast/Toast.jsx";
import Timer from "@/Components/Timer";
import intlTelInput from 'intl-tel-input';
import 'intl-tel-input/build/css/intlTelInput.css';
import { useRef } from "react";

const Register = ({ countries, price, timeDifferenceInSeconds, countryCode }) => {
    useEffect(() => {
        AOS.init();
    }, [])

    const { data, setData, post, processing, errors } = useForm({
        first_name: "",
        last_name: "",
        phone_number: "",
        street_address: "",
        city: "",
        zip_code: "",
        state: "",
        email: "",
        password: "",
        password_confirmation: "",
        country_iso: "",
    });

    const handleSubmit = (event) => {
        console.log(data);
        event.preventDefault();

        post(route("register.store"), {
            replace: true
        });
    };

    const [hours, setHours] = useState(48);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        const countdown = setInterval(() => {
            if (hours === 0 && minutes === 0 && seconds === 0) {
                clearInterval(countdown);
            } else {
                if (seconds > 0) {
                    setSeconds(seconds - 1);
                } else {
                    if (minutes > 0) {
                        setMinutes(minutes - 1);
                        setSeconds(59);
                    } else {
                        setHours(hours - 1);
                        setMinutes(59);
                        setSeconds(59);
                    }
                }
            }
        }, 1000);

        return () => {
            clearInterval(countdown);
        };
    }, [hours, minutes, seconds]);

    const handleKeyPress = (e) => {
        const keyCode = e.which || e.keyCode;
        const isValidKey =
            (keyCode >= 48 && keyCode <= 57) || keyCode === 8 || keyCode === 9;
        if (!isValidKey) {
            e.preventDefault();
        }
    };

    // const [selectedOption, setSelectedOption] = useState(null);

    // useEffect(() => {
    //     setData(
    //         "country_iso",
    //         selectedOption?.country_iso
    //     )
    // }, [selectedOption])

    // const options = countries.map((country) => ({
    //     country_iso: country?.iso,
    //     label: country?.name,
    // }));
    // const colourStyles = {
    //     control: styles => ({ ...styles, border: '1px solid #ffffff10', height: '50px', borderRadius: '0px', backgroundColor: '#ffffff10' }),
    //     option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    //         // const color = chroma(data.color);
    //         return {
    //             ...styles,
    //             backgroundColor: isDisabled ? 'red' : 'black',
    //             color: 'white',
    //             cursor: isDisabled ? 'not-allowed' : 'default',

    //         };
    //     },

    // };
    const [disableButton, setDisableButton] = useState(true)

    const [isValidPhone, setIsValidPhone] = useState(false)

    const phoneInputRef = useRef(null);
    let phoneInput;

    useEffect(() => {
        const fetchCountryCode = async () => {
            try {
                initializePhoneInput(countryCode);
            } catch (error) {
                initializePhoneInput('us'); // Default to 'us' if fetching country code fails
            }
        };

        fetchCountryCode();
    }, []);

    const initializePhoneInput = (countryCode) => {
        phoneInput = intlTelInput(phoneInputRef.current, {
            initialCountry: countryCode,
            utilsScript: 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js',
        });
    };

    const handlePhoneInputChange = () => {
        const phoneInput = phoneInputRef.current;
        if (phoneInput) {
            const phoneNumber = phoneInput.value;


            const intlTelInputInstance = window.intlTelInputGlobals.getInstance(phoneInput);
            console.log(intlTelInputInstance)
            if (intlTelInputInstance.isValidNumber()) {
                setIsValidPhone(false)
                setDisableButton(false)
                console.log('phoen is valid:', phoneNumber);
                setData('phone_number', phoneNumber)

            } else {
                setDisableButton(true)
                setIsValidPhone(true)
                console.log('Invalid phone number:', phoneNumber);
            }
        }
    };

    return (
        <div>
            <Toast />
            <section className="relative mybg ">
                <div className="container mx-auto">
                    <ToastContainer />
                    <div
                        className=" grid grid-cols-12 gap-y-7 md:gap-y-0">
                        <div className=" col-span-0 lg:col-span-2  "></div>
                        <div className=" md:w-full xl:w-[70%] mx-auto col-span-12 lg:col-span-8    ">
                            <div className=" px-5 xl:px-0">
                                <div className="mt-5 mb-6 lg:mb-[70px] flex justify-center  ">
                                    <Link href={route('welcome')}>     <img
                                        className="max-h-[30px] lg:max-h-[40px]"
                                        src={logo}
                                        alt=""
                                    />
                                    </Link>
                                </div>
                                <div
                                    className="text-center lg:text-end flex items-center justify-center gap-4 mt-5 mb-6">
                                    <p className="fs-large fw-regular">
                                        Registration Ends Soon
                                    </p>
                                    <Timer time={timeDifferenceInSeconds} />
                                </div>
                                {/* <div className="h-[1px] left-0 md:hidden w-full bg-gray-800 absolute"></div> */}
                                <div className="flex items-center  mt-[3rem] md:mt-0 justify-between flex-wrap gap-4">
                                    {/* <h3>Signup</h3> */}
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

                                <div className="flex">

                                    <button
                                        className="bg-[#1a1a1a]  text-[#fff] rounded-l-[10px] text-[14px] h-[45px] w-full uppercase font-bold relative flex justify-center pt-[10px]">Billing <div
                                            className={`  payment-tab-shadow   `}></div></button>
                                    <button
                                        className="  bg-[#1a1a1a] text-[#656565]  rounded-r-[10px] text-[14px] h-[45px] w-full uppercase font-bold  ">
                                        Payment
                                    </button>

                                </div>

                                {/* Personal Information */}
                                <div data-aos="fade-right" data-aos-delay="100" data-aos-easing="ease"
                                    data-aos-duration="300">
                                    <div className="flex justify-center md:pt-[4.5rem] pt-[2rem] "><p
                                        className="text-[25px] fw-medium ">Personal Information</p></div>

                                    <div>
                                        <div className="col-span-12 mt-[1.5rem]">
                                            <div className="relative">
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={data.email}
                                                    onChange={(e) =>
                                                        setData(
                                                            "email",
                                                            e.target.value
                                                        )
                                                    }
                                                    className=" input-text w-full  text-center  "
                                                    placeholder="Email *"
                                                />

                                            </div>
                                            {errors?.email && (
                                                <p className="fs-tiny fw-regular mt-[3px] ml-5 text-center danger-color ">
                                                    {errors?.email}{" "}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex justify-center md:pt-[2.75rem] pt-[1.5rem] "><p
                                        className="text-[25px] fw-medium ">Billing Address</p></div>

                                    <form onSubmit={handleSubmit}>
                                        <div className="grid grid-cols-12 mt-[1.5rem]">
                                            <div className="col-span-12 lg:col-span-6">
                                                <div className="relative mb-4 lg:mb-0">
                                                    <input
                                                        type="text"
                                                        name="first_name"
                                                        value={data.last}
                                                        onChange={(e) => setData("first_name", e.target.value)}
                                                        className="  input-text  w-full    text-center   "
                                                        placeholder="First Name *"
                                                    />

                                                </div>
                                                {errors?.first_name && (
                                                    <p className="fs-tiny fw-regular mt-[3px]   text-center danger-color ">
                                                        {errors?.first_name}{" "}
                                                    </p>
                                                )}
                                            </div>

                                            <div className="col-span-12 lg:col-span-6 lg:ml-[1rem] ">
                                                <div className="relative">
                                                    <input
                                                        type="text"
                                                        name="last_name"
                                                        value={data.last_name}
                                                        onChange={(e) => setData("last_name", e.target.value)}
                                                        className=" input-text w-full text-center  "
                                                        placeholder="Last Name *"
                                                    />

                                                </div>
                                                {errors?.last_name && (
                                                    <p className="fs-tiny fw-regular mt-[3px]   text-center danger-color ">
                                                        {errors?.last_name}{" "}
                                                    </p>
                                                )}
                                            </div>
                                            {/* phone number  */}

                                            <div className="col-span-12 mt-[1.5rem]">
                                                <div className="relative">
                                                    {/* <input
                                                        type="tel"
                                                        name="phone"
                                                        value={data.phone_number}
                                                        onChange={(e) =>
                                                            setData(
                                                                "phone_number",
                                                                e.target.value
                                                            )
                                                        }
                                                        className=" input-text w-full  text-center  "
                                                        placeholder="Phone Number *"
                                                    /> */}

                                                    <input
                                                        ref={phoneInputRef}
                                                        type="tel"
                                                        id="phone"
                                                        onChange={handlePhoneInputChange}

                                                    />

                                                </div>
                                                {isValidPhone && (
                                                    <p className="fs-tiny fw-regular mt-[3px] ml-5 text-center danger-color ">
                                                        Invalid Phone Number
                                                    </p>
                                                )}
                                                {errors?.phone_number && (
                                                    <p className="fs-tiny fw-regular mt-[3px] ml-5 text-center danger-color ">
                                                        {errors?.phone_number}{" "}
                                                    </p>
                                                )}
                                            </div>
                                            {/* Street Address  */}


                                            <div className="col-span-12 mt-[1.5rem]">
                                                <div className="relative">
                                                    <input
                                                        type="text"
                                                        name="street"
                                                        value={data.street_address}
                                                        onChange={(e) =>
                                                            setData(
                                                                "street_address",
                                                                e.target.value
                                                            )
                                                        }
                                                        className=" input-text w-full  text-center  "
                                                        placeholder="Street Address *"
                                                    />

                                                </div>
                                                {errors?.street_address && (
                                                    <p className="fs-tiny fw-regular mt-[3px]   text-center danger-color ">
                                                        {errors?.street_address}{" "}
                                                    </p>
                                                )}
                                            </div>


                                            {/* city */}
                                            <div className="col-span-6 lg:col-span-6 mt-[1rem]">
                                                <div className="relative">
                                                    <input
                                                        type="text"
                                                        className=" input-text  w-full "
                                                        placeholder="City *"
                                                        name="city"
                                                        value={data.city}
                                                        onChange={(e) =>
                                                            setData(
                                                                "city",
                                                                e.target.value
                                                            )
                                                        }
                                                    />

                                                </div>
                                                {errors?.city && (
                                                    <p className="fs-tiny fw-regular mt-[3px]  text-center danger-color ">
                                                        {errors?.city}
                                                    </p>
                                                )}
                                            </div>
                                            {/* zip  */}
                                            <div className="col-span-6 lg:col-span-6  ml-[1rem] mt-[1rem]">
                                                <div className="relative">
                                                    <input
                                                        type="text"
                                                        className=" input-text  w-full "
                                                        placeholder="Zip Code *"
                                                        name="zip"
                                                        value={data.zip_code}
                                                        onChange={(e) =>
                                                            setData(
                                                                "zip_code",
                                                                e.target.value
                                                            )
                                                        }
                                                    />

                                                </div>
                                                {errors?.zip_code && (
                                                    <p className="fs-tiny fw-regular mt-[3px] text-center danger-color ">
                                                        {errors?.zip_code}{" "}
                                                    </p>
                                                )}
                                            </div>
                                            {/* country  */}
                                            <div className="col-span-6 mt-[1rem]">

                                                <div className="country">
                                                    {/* <Select
        // defaultValue={profile?.country_iso}
        onChange={setSelectedOption}
        options={options}
        styles={colourStyles}
    /> */}
                                                </div>

                                                <fieldset>
                                                    <div className="relative ">
                                                        <label
                                                            for="frm-whatever"
                                                            className="sr-only"
                                                        >
                                                            My field
                                                        </label>
                                                        <select
                                                            name="selectedOption"
                                                            value={data?.country_iso}
                                                            onChange={(e) =>
                                                                setData(
                                                                    "country_iso",
                                                                    e.target.value
                                                                )
                                                            }
                                                            className="appearance-none w-full text-center py-2 text-gray-500 rounded-[20px] border-0  text-base  font-normal bg-[#1A1A1A] outline-none h-[45px] md:h-[53px] px-6   focus:shadow-none focus:ring-transparent focus:border focus:border-[#0000001a]"
                                                            id="frm-whatever"
                                                        >
                                                            <option value="" disabled>
                                                                Country *
                                                            </option>
                                                            {countries.map(
                                                                (item, index) => (
                                                                    <>
                                                                        <option
                                                                            value={
                                                                                item?.iso
                                                                            }
                                                                        >

                                                                            {
                                                                                item?.name
                                                                            }
                                                                        </option>
                                                                    </>
                                                                )
                                                            )}
                                                        </select>
                                                        <div
                                                            className="pointer-events-none absolute right-0 top-0 bottom-0 flex items-center px-2 text-base text-[#FFFFFF] font-normal bg-transparent outline-none">
                                                            {/* <svg
                width="21"
                height="22"
                viewBox="0 0 21 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <g clipPath="url(#clip0_216_18759)">
                    <path
                        opacity="0.2"
                        d="M17.0625 8.375L10.5 14.9375L3.9375 8.375H17.0625Z"
                        fill="white"
                    />
                    <path
                        d="M17.0625 8.375L10.5 14.9375L3.9375 8.375H17.0625Z"
                        stroke="white"
                        strokeOpacity="0.6"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </g>
                <defs>
                    <clipPath id="clip0_216_18759">
                        <rect
                            width="21"
                            height="21"
                            fill="white"
                            transform="translate(0 0.5)"
                        />
                    </clipPath>
                </defs>
            </svg> */}
                                                        </div>
                                                    </div>
                                                </fieldset>
                                                {errors?.country_iso && (
                                                    <p className="fs-tiny fw-regular mt-[3px] ml-5 text-center danger-color ">
                                                        {errors?.country_iso}
                                                    </p>
                                                )}
                                            </div>

                                            {/* state  */}
                                            <div className="col-span-6 lg:col-span-6 ml-[1rem] mt-[1rem]  ">
                                                <input
                                                    type="text"
                                                    name="state"
                                                    value={data.state}
                                                    onChange={(e) =>
                                                        setData(
                                                            "state",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="input-text w-full   "
                                                    placeholder="State *"
                                                />
                                                {errors?.state && (
                                                    <p className="fs-tiny danger-color fw-regular mt-2   text-center lg:ml-5">
                                                        {errors?.state}
                                                    </p>
                                                )}
                                            </div>

                                            {/* payments */}


                                            <div className="col-span-12 mt-10 lg:mt-[65px] mb-[1rem] ">
                                                <div className="flex items-center justify-between flex-wrap gap-4">

                                                </div>
                                            </div>

                                            <div className="col-span-12">
                                                <button disabled={disableButton} type={"submit"}
                                                    className="button primary w-full">
                                                    <div className="button_container glitch uppercase">

                                                        Continue to Payment
                                                    </div>
                                                </button>
                                            </div>
                                            {/*<div className="col-span-12 mt-[1rem] flex justify-end ">*/}
                                            {/*    <p className="fs-regular fw-regular opacity-50">*/}
                                            {/*        Already have an Account?*/}
                                            {/*    </p>*/}
                                            {/*    <Link*/}
                                            {/*        href={route("login")}*/}
                                            {/*        className="fs-regular fw-regular px-[2px] -mt-1 underline underline-offset-4"*/}
                                            {/*    >*/}
                                            {/*        Login*/}
                                            {/*    </Link>*/}

                                            {/*</div>*/}

                                        </div>
                                    </form>

                                </div>

                            </div>
                        </div>
                        {/* <div className="col-span-12"> */}
                        {/* <div  className="relative lg:absolute right-0 top-0 min-h-[100vh] noise-10  xl:w-[37rem] lg:w-[28rem] border-l border-l-[#ffffff1a]"> */}
                        {/* <div className="hidden md:block">
                                    <div
                                        className="text-center lg:text-end flex items-center justify-center gap-4 mt-5 ">
                                        <p className="fs-large fw-regular">
                                            Registration Ends Soon
                                        </p>
                                      <Timer time={timeDifferenceInSeconds} />
                                    </div>
                                </div> */}


                        {/* <div className="text-center justify-center flex flex-col items-center mt-12 lg:mt-20">
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
                                        <p className="fs-x-large fw-regular  ">
                                        ${price}/Year
                                        </p>
                                        <p className="fs-regular fw-regular opacity-50">
                                            billed yearly
                                        </p>
                                    </div>
                                </div> */}
                        {/* <div className="flex justify-between flex-col   ">
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
                                </div> */}
                        {/* </div> */}
                        {/* </div> */}
                    </div>
                </div>
            </section>
        </div>
    );
};

// Register.layout = (page) => <AuthLayout login={false} children={page} />;

export default Register;
