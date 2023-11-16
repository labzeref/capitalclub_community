import React, { useEffect, useState } from "react";
import logo from "../../assets/svg/logo.svg";

import line from "../../assets/svg/line.svg";
import fname from "../../assets/svg/fname.svg";
import envolpe from "../../assets/svg/envolpe.svg";
import passicon from "../../assets/svg/passicon.svg";
import CreditCard from "../../assets/svg/CreditCard.svg";
import gain from "../../assets/img/gain.png";
import countinuebtn from "../../assets/svg/countinuebtn.svg";
import CheckCircle from '../../assets/svg/CheckCircle2.svg'
import { Link } from "@inertiajs/react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { ToastContainer, toast } from "react-toastify";

import AuthLayout from "@/Layouts/AuthLayout";
const SignUp = () => {
    useEffect(() => {
        AOS.init();
    }, [])
    const [passwrodMatched, setPasswrodMatched] = useState(false);
    const [show, setShow] = useState(false);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        selectedOption: "",
        cardNumber: "",
        expiry: "",
        cvc: "",
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    useEffect(() => {
        if (formData?.password != formData?.confirmPassword) {
            setPasswrodMatched(false);
        } else {
            setPasswrodMatched(true);
        }
    }, [formData?.confirmPassword]);

    const handleSubmit = (event) => {
        event.preventDefault();

        // Perform form validation here
        const {
            firstName,
            lastName,
            password,
            confirmPassword,
            selectedOption,
            cardNumber,
            expiry,
            cvc,
        } = formData;
        if (
            (firstName === "" ||
                lastName === "" ||
                password === "" ||
                confirmPassword === "" ||
                selectedOption === "" ||
                cardNumber === "" ||
                expiry === "",
                cvc === "")
        ) {
            toast.warning("Please fill all fields.", {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            return;
        }

        if (password >= 7) {
            toast.error("Password not strong!", {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Password not match!", {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            return;
        }
 
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
        const isValidKey = (keyCode >= 48 && keyCode <= 57) || keyCode === 8 || keyCode === 9;
        if (!isValidKey) {
            e.preventDefault();
        }
    }



    return (
        <div className="  ">
            <section className="pb-10  relative">
                <div data-aos="fade-in" data-aos-delay="100" data-aos-easing="ease" data-aos-duration="300" className="container  mx-auto px-5 xl:px-0">
                    <ToastContainer />
                    <div className="grid grid-cols-12   gap-y-8">




                        <div className="col-span-12 lg:col-span-7 pr-0 lg:pr-16">
                            <div className="mt-5 mb-[70px] flex justify-center">
                                <img className="max-h-[40px]" src={logo} alt="" />
                            </div>
                            <div className="flex items-center justify-between flex-wrap gap-4">
                                <h3>Signup</h3>
                                <div className="flex items-center">
                                    <p className="fs-regular fw-regular opacity-50">Already have an Account?</p>
                                    <div className="fs-regular fw-regular px-[2px] -mt-1 underline underline-offset-4">Login</div>
                                </div>
                            </div>

                            <div className="flex items-center flex-wrap lg:flex-nowrap gap-4 mb-6 mt-10 lg:mt-[70px]">
                                <p className="fs-regular fw-regular opacity-50 uppercase">Personal</p>
                                <img
                                    className="object-cover w-[80%]"
                                    src={line}
                                    alt=""
                                />
                            </div>

                            <form onSubmit={handleSubmit}>
                                <div className="grid grid-cols-12 gap-4">
                                    <div className="col-span-12 lg:col-span-6">
                                        <div className="relative">
                                            <input type="text"
                                                pattern="[A-Za-z]+"
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleChange}
                                                className="h-12 px-6   w-full   input-noise-10   inset-border text-base text-[#FFFFFF] font-normal outline-none focus:border-[#ffffff]  focus:shadow-none focus:ring-transparent focus:border  "
                                                placeholder="First Name" />
                                            <span className="absolute right-4 top-3">
                                                <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <g clipPath="url(#clip0_1129_6405)">
                                                        <path opacity="0.4" d="M20.75 4.5H4.25C4.05109 4.5 3.86032 4.57902 3.71967 4.71967C3.57902 4.86032 3.5 5.05109 3.5 5.25V18.75C3.5 18.9489 3.57902 19.1397 3.71967 19.2803C3.86032 19.421 4.05109 19.5 4.25 19.5H20.75C20.9489 19.5 21.1397 19.421 21.2803 19.2803C21.421 19.1397 21.5 18.9489 21.5 18.75V5.25C21.5 5.05109 21.421 4.86032 21.2803 4.71967C21.1397 4.57902 20.9489 4.5 20.75 4.5ZM9.5 13.5C9.05499 13.5 8.61998 13.368 8.24997 13.1208C7.87996 12.8736 7.59157 12.5222 7.42127 12.111C7.25097 11.6999 7.20642 11.2475 7.29323 10.811C7.38005 10.3746 7.59434 9.97368 7.90901 9.65901C8.22368 9.34434 8.62459 9.13005 9.06105 9.04323C9.4975 8.95642 9.9499 9.00097 10.361 9.17127C10.7722 9.34157 11.1236 9.62996 11.3708 9.99997C11.618 10.37 11.75 10.805 11.75 11.25C11.75 11.8467 11.5129 12.419 11.091 12.841C10.669 13.2629 10.0967 13.5 9.5 13.5Z" fill="white" />
                                                        <path d="M14.75 10.5H18.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M14.75 13.5H18.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M20.75 4.5H4.25C3.83579 4.5 3.5 4.83579 3.5 5.25V18.75C3.5 19.1642 3.83579 19.5 4.25 19.5H20.75C21.1642 19.5 21.5 19.1642 21.5 18.75V5.25C21.5 4.83579 21.1642 4.5 20.75 4.5Z" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M9.5 13.5C10.7426 13.5 11.75 12.4926 11.75 11.25C11.75 10.0074 10.7426 9 9.5 9C8.25736 9 7.25 10.0074 7.25 11.25C7.25 12.4926 8.25736 13.5 9.5 13.5Z" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M6.5 15.75C6.83281 14.4562 8.10219 13.5 9.5 13.5C10.8978 13.5 12.1681 14.4553 12.5 15.75" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_1129_6405">
                                                            <rect width="24" height="24" fill="white" transform="translate(0.5)" />
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                            </span>
                                        </div>
                                    </div>

                                    <div className="col-span-12 lg:col-span-6">
                                        <div className="relative">
                                            <input type="text"
                                                className="h-12 px-6   w-full   input-noise-10   inset-border text-base text-[#FFFFFF] font-normal outline-none focus:border-[#ffffff]  focus:shadow-none focus:ring-transparent focus:border  "
                                                placeholder="Last Name" />
                                            <span className="absolute right-4 top-3">
                                                <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <g clipPath="url(#clip0_1129_6405)">
                                                        <path opacity="0.4" d="M20.75 4.5H4.25C4.05109 4.5 3.86032 4.57902 3.71967 4.71967C3.57902 4.86032 3.5 5.05109 3.5 5.25V18.75C3.5 18.9489 3.57902 19.1397 3.71967 19.2803C3.86032 19.421 4.05109 19.5 4.25 19.5H20.75C20.9489 19.5 21.1397 19.421 21.2803 19.2803C21.421 19.1397 21.5 18.9489 21.5 18.75V5.25C21.5 5.05109 21.421 4.86032 21.2803 4.71967C21.1397 4.57902 20.9489 4.5 20.75 4.5ZM9.5 13.5C9.05499 13.5 8.61998 13.368 8.24997 13.1208C7.87996 12.8736 7.59157 12.5222 7.42127 12.111C7.25097 11.6999 7.20642 11.2475 7.29323 10.811C7.38005 10.3746 7.59434 9.97368 7.90901 9.65901C8.22368 9.34434 8.62459 9.13005 9.06105 9.04323C9.4975 8.95642 9.9499 9.00097 10.361 9.17127C10.7722 9.34157 11.1236 9.62996 11.3708 9.99997C11.618 10.37 11.75 10.805 11.75 11.25C11.75 11.8467 11.5129 12.419 11.091 12.841C10.669 13.2629 10.0967 13.5 9.5 13.5Z" fill="white" />
                                                        <path d="M14.75 10.5H18.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M14.75 13.5H18.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M20.75 4.5H4.25C3.83579 4.5 3.5 4.83579 3.5 5.25V18.75C3.5 19.1642 3.83579 19.5 4.25 19.5H20.75C21.1642 19.5 21.5 19.1642 21.5 18.75V5.25C21.5 4.83579 21.1642 4.5 20.75 4.5Z" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M9.5 13.5C10.7426 13.5 11.75 12.4926 11.75 11.25C11.75 10.0074 10.7426 9 9.5 9C8.25736 9 7.25 10.0074 7.25 11.25C7.25 12.4926 8.25736 13.5 9.5 13.5Z" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M6.5 15.75C6.83281 14.4562 8.10219 13.5 9.5 13.5C10.8978 13.5 12.1681 14.4553 12.5 15.75" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_1129_6405">
                                                            <rect width="24" height="24" fill="white" transform="translate(0.5)" />
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                            </span>
                                        </div>
                                    </div>

                                    <div className="col-span-12">
                                        <div className="relative">
                                            <input type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="h-12 px-6   w-full   input-noise-10   inset-border text-base text-[#FFFFFF] font-normal outline-none focus:border-[#ffffff]  focus:shadow-none focus:ring-transparent focus:border  "
                                                placeholder="Email" />
                                            <span className="absolute right-4 top-3">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <g opacity="0.6" clipPath="url(#clip0_1129_6436)">
                                                        <path opacity="0.4" d="M21 5.25L12 13.5L3 5.25H21Z" fill="white" />
                                                        <path d="M3 5.25H21V18C21 18.1989 20.921 18.3897 20.7803 18.5303C20.6397 18.671 20.4489 18.75 20.25 18.75H3.75C3.55109 18.75 3.36032 18.671 3.21967 18.5303C3.07902 18.3897 3 18.1989 3 18V5.25Z" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M21 5.25L12 13.5L3 5.25" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_1129_6436">
                                                            <rect width="24" height="24" fill="white" />
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                            </span>
                                        </div>
                                    </div>

                                    <div className="col-span-12 lg:col-span-6">
                                        <div className="relative">
                                            <input type={
                                                show ? "text" : "password"
                                            }
                                                className="h-12 px-6   w-full   input-noise-10   inset-border text-base text-[#FFFFFF] font-normal outline-none focus:border-[#ffffff]  focus:shadow-none focus:ring-transparent focus:border  "
                                                placeholder="Password"
                                                name="password"
                                                value={formData.password}
                                                onChange={handleChange} />
                                            <span onClick={() => {
                                                setShow(!show);
                                            }} className="absolute right-4 top-3">
                                                <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <g opacity="0.6" clipPath="url(#clip0_1129_6499)">
                                                        <path opacity="0.4" d="M12.5 5.25C5 5.25 2 12 2 12C2 12 5 18.75 12.5 18.75C20 18.75 23 12 23 12C23 12 20 5.25 12.5 5.25ZM12.5 15.75C11.7583 15.75 11.0333 15.5301 10.4166 15.118C9.79993 14.706 9.31928 14.1203 9.03545 13.4351C8.75162 12.7498 8.67736 11.9958 8.82205 11.2684C8.96675 10.541 9.3239 9.8728 9.84835 9.34835C10.3728 8.8239 11.041 8.46675 11.7684 8.32205C12.4958 8.17736 13.2498 8.25162 13.9351 8.53545C14.6203 8.81928 15.206 9.29993 15.618 9.91661C16.0301 10.5333 16.25 11.2583 16.25 12C16.25 12.9946 15.8549 13.9484 15.1517 14.6517C14.4484 15.3549 13.4946 15.75 12.5 15.75Z" fill="white" />
                                                        <path d="M12.5 5.25C5 5.25 2 12 2 12C2 12 5 18.75 12.5 18.75C20 18.75 23 12 23 12C23 12 20 5.25 12.5 5.25Z" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M12.5 15.75C14.5711 15.75 16.25 14.0711 16.25 12C16.25 9.92893 14.5711 8.25 12.5 8.25C10.4289 8.25 8.75 9.92893 8.75 12C8.75 14.0711 10.4289 15.75 12.5 15.75Z" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_1129_6499">
                                                            <rect width="24" height="24" fill="white" transform="translate(0.5)" />
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                            </span>
                                        </div>
                                        <p className="fs-tiny fw-regular mt-3 ml-5 opacity-50">Must be at least 8
                                            characters</p>
                                    </div>

                                    <div className="col-span-12 lg:col-span-6">
                                        <input type={
                                            show ? "text" : "password"
                                        }
                                            name="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            className="h-12 px-6   w-full   input-noise-10   inset-border text-base text-[#FFFFFF] font-normal outline-none focus:border-[#ffffff]  focus:shadow-none focus:ring-transparent focus:border  "
                                            placeholder="Confirm Password" />
                                        {!passwrodMatched && (<p className="fs-tiny fw-regular mt-3 ml-5">Password is Matched</p>)}
                                    </div>

                                    <div className="col-span-12">
                                        <fieldset>
                                            <div className="relative ">
                                                <label for="frm-whatever" className="sr-only">My field</label>
                                                <select name="selectedOption"
                                                    value={
                                                        formData.selectedOption
                                                    }
                                                    onChange={handleChange} className="appearance-none w-full py-1 px-2 inset-border text-base text-[#FFFFFF] font-normal noise-10 outline-none h-12 px-6 focus:border-transparent focus:shadow-none focus:ring-transparent focus:border focus:border-[#ffffff1a]"
                                                    id="frm-whatever">
                                                    <option value="">Please choose&hellip;</option>
                                                    <option value="1">Item 1</option>
                                                    <option value="2">Item 2</option>
                                                    <option value="3">Item 3</option>
                                                </select>
                                                <div
                                                    className="pointer-events-none absolute right-0 top-0 bottom-0 flex items-center px-2 text-base text-[#FFFFFF] font-normal bg-transparent outline-none">
                                                    <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <g clipPath="url(#clip0_216_18759)">
                                                            <path opacity="0.2" d="M17.0625 8.375L10.5 14.9375L3.9375 8.375H17.0625Z" fill="white" />
                                                            <path d="M17.0625 8.375L10.5 14.9375L3.9375 8.375H17.0625Z" stroke="white" strokeOpacity="0.6" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                                        </g>
                                                        <defs>
                                                            <clipPath id="clip0_216_18759">
                                                                <rect width="21" height="21" fill="white" transform="translate(0 0.5)" />
                                                            </clipPath>
                                                        </defs>
                                                    </svg>
                                                </div>
                                            </div>
                                        </fieldset>
                                    </div>

                                    <div className="col-span-12">
                                        <div className="flex items-center gap-4 mb-3 lg:mb-6 mt-10 lg:mt-[70px]">
                                            <p className="fs-regular fw-regular opacity-50 uppercase">Payment</p>
                                            <img className="object-cover w-[100%]" src={line} alt="" />
                                        </div>
                                    </div>

                                    <div className="col-span-12 lg:col-span-6">
                                        <div className="relative">
                                            <input
                                                className="h-12 px-6   w-full   input-noise-10   inset-border text-base text-[#FFFFFF] font-normal outline-none focus:border-[#ffffff]  focus:shadow-none focus:ring-transparent focus:border  "
                                                placeholder="Card Number"
                                                type="number"
                                                pattern="[0-9]+"
                                                name="cardNumber"
                                                value={formData.cardNumber}
                                                onChange={handleChange} />
                                            <span className="absolute right-4 top-3">
                                                <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <g opacity="0.6" clipPath="url(#clip0_1129_6518)">
                                                        <path opacity="0.4" d="M2.75 9H22.25V18C22.25 18.1989 22.171 18.3897 22.0303 18.5303C21.8897 18.671 21.6989 18.75 21.5 18.75H3.5C3.30109 18.75 3.11032 18.671 2.96967 18.5303C2.82902 18.3897 2.75 18.1989 2.75 18V9Z" fill="white" />
                                                        <path d="M21.5 5.25H3.5C3.08579 5.25 2.75 5.58579 2.75 6V18C2.75 18.4142 3.08579 18.75 3.5 18.75H21.5C21.9142 18.75 22.25 18.4142 22.25 18V6C22.25 5.58579 21.9142 5.25 21.5 5.25Z" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M2.75 9H22.25" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_1129_6518">
                                                            <rect width="24" height="24" fill="white" transform="translate(0.5)" />
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                            </span>
                                        </div>
                                    </div>

                                    <div className="col-span-6 lg:col-span-3">
                                        <input type="text"
                                            name="expiry"
                                            value={formData.expiry}
                                            onChange={handleChange}
                                            className="h-12 px-6   w-full   input-noise-10   inset-border text-base text-[#FFFFFF] font-normal outline-none focus:border-[#ffffff]  focus:shadow-none focus:ring-transparent focus:border  "
                                            placeholder="Expire" />
                                    </div>

                                    <div className="col-span-6 lg:col-span-3">
                                        <input
                                            onKeyPress={handleKeyPress} type="number"
                                            name="cvc"
                                            pattern="[0-9]*" inputMode="numeric"
                                            value={formData.cvc}
                                            onChange={handleChange}
                                            className="h-12 px-6   w-full   input-noise-10  focus:border-[#ffffff]  inset-border text-base text-[#FFFFFF] font-normal outline-none  focus:shadow-none focus:ring-transparent focus:border  "
                                            placeholder="CVC" />
                                    </div>

                                    <div className="col-span-12 mt-10 lg:mt-[72px]">
                                        <div className="flex items-center justify-between flex-wrap gap-4">
                                            <h6 className="opacity-50 uppercase " >Total</h6>
                                            <h6>$2,388/year </h6>
                                        </div>
                                    </div>

                                    <div className="col-span-12">
                                        <button className="button primary w-full">
                                            <div className="button_container glitch uppercase">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <g clipPath="url(#clip0_1129_6393)">
                                                        <path opacity="0.2" d="M1.99988 12.0005L11.9999 22.0005L21.9999 12.0005L11.9999 2.00049L1.99988 12.0005Z" fill="black" />
                                                        <path opacity="0.6" d="M1.64632 11.6469C1.45106 11.8422 1.45106 12.1588 1.64632 12.354L11.6463 22.354C11.8416 22.5493 12.1582 22.5493 12.3534 22.354L22.3534 12.354C22.5487 12.1588 22.5487 11.8422 22.3534 11.6469L12.3534 1.64693C12.1582 1.45167 11.8416 1.45167 11.6463 1.64693L1.64632 11.6469Z" stroke="black" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path opacity="0.6" d="M8.25 12H15.75" stroke="black" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path opacity="0.6" d="M12.75 9L15.75 12L12.75 15" stroke="black" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_1129_6393">
                                                            <rect width="24" height="24" fill="white" />
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                                Subscribe
                                            </div>
                                        </button>
                                    </div>

                                    <div className="col-span-12 mt-2">
                                        <p className="fs-small fw-regular text-[#ffffff80]">By clicking "Make Payment", you agree to enroll in our annual subscription plan and to our <a href="#" className="text-white  ">Offer Terms</a> and <a href="#" className="text-white  ">Terms of Service</a> . Your payment method will be charged the promotional price for the first year and annually there after at the then-current non-promotional price. Prices are tax inclusive. Cancel any time in Settings. No refunds for partial unused periods.</p>
                                    </div>
                                </div>
                            </form>

                        </div>










                        {/* <div className="col-span-12 lg:col-span-7 pr-0 lg:pr-16">
                            <div className="flex items-center justify-between flex-wrap gap-4">
                                <h3>Signup</h3>
                                <div className="flex">
                                    <p className="fs-regular fw-regular opacity-50">
                                        Already have an Account?
                                    </p>
                                    <p className="s-regular fw-regular px-1">
                                        Login
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center flex-wrap gap-4 mb-6 mt-10 lg:mt-[72px] flex">
                                <p className="fs-regular fw-regular uppercase opacity-50">
                                    Personal
                                </p>
                                <img
                                    className="object-cover w-[80%]"
                                    src={line}
                                    alt=""
                                />
                            </div>

                            <form onSubmit={handleSubmit}>
                                <div className="grid grid-cols-12 gap-4">
                                    <div className="col-span-12 lg:col-span-6">
                                        <span className="relative">
                                            <input
                                                type="text"

                                                autoFocus
                                                className="h-12 px-6 w-full bg-transparent outline-none border-[1px] border-[#ffffff1a]  text-base text-[#FFFFFF] font-normal"
                                                placeholder="First Name"
                                                pattern="[A-Za-z]+"
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleChange}
                                            />
                                            <img
                                                className="w-5 h-5 absolute right-5 top-0"
                                                src={fname}
                                                alt=""
                                            />
                                        </span>
                                    </div>

                                    <div className="col-span-12 lg:col-span-6">
                                        <span className="relative">
                                            <input
                                                type="text"
                                                className="h-12 px-6 w-full focus:noisebg bg-transparent outline-none border-[1px] border-[#ffffff1a]  text-base text-[#FFFFFF] font-normal"
                                                placeholder="Last Name"
                                                pattern="[A-Za-z]+"
                                                name="lastName"
                                                value={formData.lastName}
                                                onChange={handleChange}
                                            />
                                            <img
                                                className="w-5 h-5 absolute right-5 top-0"
                                                src={fname}
                                                alt=""
                                            />
                                        </span>
                                    </div>

                                    <div className="col-span-12">
                                        <span className="relative">
                                            <input
                                                type="email"
                                                className="h-12 px-6 w-full bg-transparent outline-none border-[1px] border-[#ffffff1a]  text-base text-[#FFFFFF] font-normal"
                                                placeholder="Email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                            />
                                            <img
                                                className="w-5 h-5 absolute right-5 top-0"
                                                src={envolpe}
                                                alt=""
                                            />
                                        </span>
                                    </div>

                                    <div className="col-span-12 lg:col-span-6">
                                        <span className="relative">
                                            <input
                                                type={
                                                    show ? "text" : "password"
                                                }
                                                className="h-12 px-6 w-full bg-transparent outline-none border-[1px] border-[#ffffff1a]  text-base text-[#FFFFFF] font-normal"
                                                placeholder="Password"
                                                name="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                            />
                                            <img
                                                onClick={() => {
                                                    setShow(!show);
                                                }}
                                                className="w-5 h-5 absolute right-5 top-0"
                                                src={passicon}
                                                alt=""
                                            />
                                        </span>
                                        <p className="fw-regular fs-tiny  mt-3 ml-5 opacity-50">
                                            Must be at least 8 characters
                                        </p>
                                    </div>

                                    <div className="col-span-12 lg:col-span-6">
                                        <input
                                            type="password"
                                            className="h-12 px-6 w-full bg-transparent outline-none border-[1px] border-[#ffffff1a]  text-base text-[#FFFFFF] font-normal"
                                            placeholder="Confirm Password"
                                            name="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                        />
                                        {passwrodMatched && (
                                            <p className=" fw-regular fs-tiny mt-3 ml-5">
                                                Password is Matched
                                            </p>
                                        )}
                                    </div>

                                    <div className="col-span-12">
                                        <fieldset>
                                            <div className="relative ">
                                                <label
                                                    htmlFor={"frm-whatever"}
                                                    className="sr-only"
                                                >
                                                    My field
                                                </label>
                                                <select
                                                    name="selectedOption"
                                                    value={
                                                        formData.selectedOption
                                                    }
                                                    onChange={handleChange}
                                                    className=" bg-black appearance-none w-full py-1 px-2 border-[1px] border-[#ffffff1a]  text-base text-[#FFFFFF] font-normal bg-transparent outline-none h-12 px-6"
                                                    id="frm-whatever"
                                                >
                                                    <option
                                                        className=""
                                                        value=""
                                                    >
                                                        Please choose&hellip;
                                                    </option>
                                                    <option value="1">
                                                        Item 1
                                                    </option>
                                                    <option value="2">
                                                        Item 2
                                                    </option>
                                                    <option value="3">
                                                        Item 3
                                                    </option>
                                                </select>
                                                <div className="pointer-events-none absolute right-0 top-0 bottom-0 flex items-center px-2 text-base text-[#FFFFFF] font-normal bg-transparent outline-none">
                                                    <svg
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
                                                    </svg>
                                                </div>
                                            </div>
                                        </fieldset>
                                    </div>

                                    <div className="col-span-12">
                                        <div className="flex items-center flex-wrap gap-4 mb-2 mt-10 lg:mt-[72px]">
                                            <p className="fs-regular fw-regular opacity-50 uppercase">
                                                Payment
                                            </p>
                                            <img
                                                className="object-cover w-[80%]"
                                                src={line}
                                                alt=""
                                            />
                                        </div>
                                    </div>

                                    <div className="col-span-12 lg:col-span-6">
                                        <span className="relative">
                                            <input

                                                className="h-12 px-6 w-full bg-transparent outline-none border-[1px] border-[#ffffff1a]  text-base text-[#FFFFFF] font-normal"
                                                placeholder="Card Number"
                                                type="number"
                                                pattern="[0-9]+"
                                                name="cardNumber"
                                                value={formData.cardNumber}
                                                onChange={handleChange}
                                            />
                                            <img
                                                className="w-5 h-5 absolute right-5 top-0"
                                                src={CreditCard}
                                                alt=""
                                            />
                                        </span>
                                    </div>

                                    <div className="col-span-6 lg:col-span-3">
                                        <input
                                            type="text"
                                            className="h-12 px-6 w-full bg-transparent outline-none border-[1px] border-[#ffffff1a]  text-base text-[#FFFFFF] font-normal"
                                            placeholder="Expire"
                                            name="expiry"
                                            value={formData.expiry}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="col-span-6 lg:col-span-3">
                                        <input
                                            type="number"

                                            className="h-12 px-6 w-full bg-transparent outline-none border-[1px] border-[#ffffff1a]  text-base text-[#FFFFFF] font-normal"
                                            placeholder="CVC"
                                            name="cvc"
                                            pattern="[0-9]+"
                                            value={formData.cvc}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="col-span-12 mt-10 lg:mt-[72px]">
                                        <div className="flex items-center justify-center lg:justify-between flex-wrap gap-4">
                                            <p className=" fs-medium fw-medium opacity-50">
                                                Total
                                            </p>
                                            <p className="  fs-medium fw-medium">
                                                $2,388/year{" "}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="col-span-12">
                                        <div className="flex justify-center text-center">
                                            <button
                                                type="submit"
                                                // to="/intrest"
                                                className="w-full justify-center text-base font-normal bg-[#FFFFFF] text-[#000000] px-4 py-3 uppercase flex items-center"
                                            >
                                                <img
                                                    className="h-6"
                                                    src={countinuebtn}
                                                    alt=""
                                                />
                                                <span className="ml-3">
                                                    continue
                                                </span>
                                            </button>
                                        </div>
                                    </div>

                                    <div className="col-span-12 mt-2">
                                        <p className="text-[#ffffff80] fw-regular fs-small">
                                            By clicking "Make Payment", you
                                            agree to enroll in our annual
                                            subscription plan and to our{" "}
                                            <a
                                                href="#"
                                                className="text-white underline"
                                            >
                                                Offer Terms
                                            </a>{" "}
                                            and{" "}
                                            <a
                                                href="#"
                                                className="text-white underline"
                                            >
                                                Terms of Service
                                            </a>{" "}
                                            . Your payment method will be
                                            charged the promotional price for
                                            the first year and annually there
                                            after at the then-current
                                            non-promotional price. Prices are
                                            tax inclusive. Cancel any time in
                                            Settings. No refunds for partial
                                            unused periods.
                                        </p>
                                    </div>
                                </div>
                            </form>
                        </div> */}
                        <div className="absolute right-0 top-0 h-screen noise-10  xl:w-[37rem] lg:w-[28rem] border-l border-l-[#ffffff1a] hidden lg:block">

                            <div className="text-center lg:text-end flex items-center justify-center gap-4 mt-5">
                                <p className="fs-large fw-regular">Registration Ends Soon</p>
                                <div>
                                    <p className="h-9 w-11 bg-[#ffffff1a] fs-x-large fw-regular text-center items-center justify-center flex rounded "
                                    >{hours}</p>
                                    <p className="fs-tiny fw-regular text-center mt-1 opacity-50">Hours</p>
                                </div>
                                <div>
                                    <p className="h-9 w-11 bg-[#ffffff1a] fs-x-large fw-regular text-center items-center justify-center flex rounded "
                                    >{minutes}</p>
                                    <p className="fs-tiny fw-regular text-center mt-1 opacity-50">Minutes</p>
                                </div>
                                <div>
                                    <p className="h-9 w-11  bg-[#ffffff1a] fs-x-large fw-regular text-center items-center justify-center flex rounded "
                                    >{seconds}</p>
                                    <p className="fs-tiny fw-regular text-center mt-1 opacity-50">Seconds</p>
                                </div>

                            </div>

                            <div className="text-center justify-center flex flex-col items-center mt-20">
                                <img className="h-[145px] mb-7 lg:mb-14" src={gain} alt="" />
                                <h2 className="max-w-md mx-auto">GAIN NEW SKILLS  IN 10 MINUTES</h2>
                            </div>
                            <div className="flex justify-around items-center bg-signup-right mt-10 py-7">
                                <div>
                                    <h3 className="mb-2">Yearly Plan</h3>
                                    <p className="fw-regular fs-small">LIMITED TIME OFFER</p>
                                </div>
                                <div>
                                    <p className="fs-x-large fw-regular mb-3">$199/mo</p>
                                    <p className="fs-regular fw-regular opacity-50">billed yearly</p>
                                </div>
                            </div>
                            <ul className="mt-8 lg:mt-12 ml-8 xl:ml-16">
                                <li className="flex items-center gap-5 mb-4">
                                    <span>
                                        <img src={CheckCircle} alt="" />
                                        {/* <!-- svg here  --> */}
                                    </span>
                                    <p className="fs-large fw-regular">
                                        All 180+ classes across 11 categories
                                    </p>
                                </li>
                                <li className="flex items-center gap-5 mb-4">
                                    <span>
                                        <img src={CheckCircle} alt="" />
                                        {/* <!-- svg here  --> */}
                                    </span>
                                    <p className="fs-large fw-regular">
                                        Bonus class guides & content
                                    </p>
                                </li>
                                <li className="flex gap-5 mb-4">
                                    <span>
                                        <img src={CheckCircle} alt="" />
                                        {/* <!-- svg here  --> */}
                                    </span>
                                    <span>
                                        <p className="fs-large fw-regular mb-2">Access to live training by Capital Club</p>
                                        <p className="fs-regular fw-regular opacity-50">Learn by doing in just 30 days.</p>
                                    </span>
                                </li>
                                <li className="flex items-center gap-5 mb-4">
                                    <span>
                                        <img src={CheckCircle} alt="" />
                                        {/* <!-- svg here  --> */}
                                    </span>
                                    <p className="fs-large fw-regular">
                                        Get world's best certificates
                                    </p>
                                </li>
                            </ul>
                            <div className="absolute bottom-5 left-20">
                                <div className="flex items-center gap-4">
                                    <span>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g clipPath="url(#clip0_216_18882)">
                                                <path opacity="0.2" d="M19.5 8.25H4.5C4.08579 8.25 3.75 8.58579 3.75 9V19.5C3.75 19.9142 4.08579 20.25 4.5 20.25H19.5C19.9142 20.25 20.25 19.9142 20.25 19.5V9C20.25 8.58579 19.9142 8.25 19.5 8.25Z" fill="white" />
                                                <path d="M19.5 8.25H4.5C4.08579 8.25 3.75 8.58579 3.75 9V19.5C3.75 19.9142 4.08579 20.25 4.5 20.25H19.5C19.9142 20.25 20.25 19.9142 20.25 19.5V9C20.25 8.58579 19.9142 8.25 19.5 8.25Z" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M8.25 8.25V5.25C8.25 4.25544 8.64509 3.30161 9.34835 2.59835C10.0516 1.89509 11.0054 1.5 12 1.5C12.9946 1.5 13.9484 1.89509 14.6517 2.59835C15.3549 3.30161 15.75 4.25544 15.75 5.25V8.25" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_216_18882">
                                                    <rect width="24" height="24" fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </span>
                                    <p className="fs-regular fw-regular">
                                        Secure with SSL
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

// SignUp.layout = (page) => <AuthLayout login={false} children={page} />;

export default SignUp;
