import React, { useState } from "react";
import glitch from "../../../assets/svg/glitch.svg";
import logo from "../../../assets/svg/logo.svg";
import { Link, useForm, usePage } from "@inertiajs/react";
import { ToastContainer, toast } from "react-toastify";
import Toast from "@/Components/Toast/Toast";
const ForgotPassword = () => {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        post(route('password.email'))
    }

    return (
        <div className="mybg">
            <Toast />
            <section>
                <div className="px-5 xl:px-0">
                    <div className="grid grid-cols-12">
                        <div className="col-span-12 lg:col-span-5">
                            <form
                                onSubmit={handleSubmit}
                                className=" containerMedium px-6 pr-0 lg:pr-5 xl:pr-0 relative"
                            >
                                <div className="h-screen w-full px-0  lg:px-[4rem] items-start justify-center flex flex-col">
                                <Link href={route('welcome')}>  
                                    <img
                                        className="absolute top-6 px-[4rem] left-0 max-h-[40px]"
                                        src={logo}
                                        alt=""
                                    />
                                    </Link>
                                    <h3 className="mb-4">Forgot Password?</h3>
                                    <div className="flex items-center">
                                        <p className="fs-regular fw-regular text-[#949494]">
                                            Remember your password?
                                        </p>
                                        <Link
                                            href={route('login')}
                                        >
                                            <p className="fs-regular fw-regular underline underline-offset-4 px-1">
                                                Login
                                            </p>
                                        </Link>
                                    </div>
                                    <div className="pr-5 w-full">
                                        <div className="relative w-full mt-[3rem]">
                                            <input
                                                type="email"
                                                name="email"
                                                value={data.email}
                                                onChange={event => setData('email', event.target.value)}
                                                className=" w-full  input-text "
                                                placeholder="Email"
                                            />
                                            {/* <span className="absolute right-5 top-3.5">
                                            <svg
                                                width="21"
                                                height="22"
                                                viewBox="0 0 21 22"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <g clipPath="url(#clip0_829_45212)">
                                                    <path
                                                        opacity="0.2"
                                                        d="M18.375 5.09375L10.5 12.3125L2.625 5.09375H18.375Z"
                                                        fill="white"
                                                    />
                                                    <path
                                                        d="M2.625 5.09375H18.375V16.25C18.375 16.424 18.3059 16.591 18.1828 16.714C18.0597 16.8371 17.8928 16.9062 17.7188 16.9062H3.28125C3.1072 16.9062 2.94028 16.8371 2.81721 16.714C2.69414 16.591 2.625 16.424 2.625 16.25V5.09375Z"
                                                        stroke="white"
                                                        strokeOpacity="0.6"
                                                        strokeWidth="1.2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                    <path
                                                        d="M18.375 5.09375L10.5 12.3125L2.625 5.09375"
                                                        stroke="white"
                                                        strokeOpacity="0.6"
                                                        strokeWidth="1.2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_829_45212">
                                                        <rect
                                                            width="21"
                                                            height="21"
                                                            fill="white"
                                                            transform="translate(0 0.5)"
                                                        />
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                        </span> */}
                                         {errors?.email && (
                                                <p className="fs-tiny fw-regular mt-3 ml-5 text-center danger-color ">
                                                    {errors?.email}{" "}
                                                </p>
                                            )}
                                        </div>

                                        <button
                                            disabled={processing}
                                            className="button primary w-full mt-8">
                                            <div className="button_container glitch uppercase">
                                                {/* <svg
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <g clipPath="url(#clip0_1090_5475)">
                                                    <path
                                                        opacity="0.2"
                                                        d="M2 12.0005L12 22.0005L22 12.0005L12 2.00049L2 12.0005Z"
                                                        fill="black"
                                                    />
                                                    <path
                                                        opacity="0.6"
                                                        d="M1.64645 11.6469C1.45118 11.8422 1.45118 12.1588 1.64645 12.354L11.6464 22.354C11.8417 22.5493 12.1583 22.5493 12.3536 22.354L22.3536 12.354C22.5488 12.1588 22.5488 11.8422 22.3536 11.6469L12.3536 1.64693C12.1583 1.45167 11.8417 1.45167 11.6464 1.64693L1.64645 11.6469Z"
                                                        stroke="black"
                                                        strokeMiterlimit="10"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                    <path
                                                        opacity="0.6"
                                                        d="M8.25 12H15.75"
                                                        stroke="black"
                                                        strokeWidth="1.2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                    <path
                                                        opacity="0.6"
                                                        d="M12.75 9L15.75 12L12.75 15"
                                                        stroke="black"
                                                        strokeWidth="1.2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_1090_5475">
                                                        <rect
                                                            width="24"
                                                            height="24"
                                                            fill="white"
                                                        />
                                                    </clipPath>
                                                </defs>
                                            </svg> */}
                                                SEND LINK
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="col-span-12 lg:col-span-7 hidden lg:block">
                            <div className="h-screen noise-20 items-center justify-center flex flex-col">
                                <img
                                    className="h-[290px] mb-10"
                                    src={glitch}
                                    alt=""
                                />
                                <h1>
                                    <span className="font-medium">I am</span> glitch
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ForgotPassword;
