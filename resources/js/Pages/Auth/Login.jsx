import React, { useEffect, useState } from "react";
import glitch from "../../../assets/svg/glitch.svg";
import logo from "../../../assets/svg/logo.svg";
import { Link } from "@inertiajs/react";
import Toast from "@/Components/Toast/Toast.jsx";
import { useForm } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
const Login = () => {
    const [show, setShow] = useState(false);
    const { data, setData, post, processing, errors } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        post(route("login.store"), {
            replace: true
        });
    };

    return (
        <div>
            <section className="mybg">
                <div className="px-5 lg:px-0">
                    <div className="grid grid-cols-12">
                        <div className="col-span-12 lg:col-span-5">
                            <Toast />
                            <form
                                onSubmit={handleSubmit}
                                className="containerMedium px-0   pr-0 lg:pr-5 xl:pr-0 relative"
                            >
                                <div className="h-screen w-full px-0  lg:px-[4rem] items-start justify-center flex flex-col">
                                <Link href={route('welcome')}>   <img
                                        className="absolute top-6 left-0 max-h-[40px] mx-[4rem] "
                                        src={logo}
                                        alt=""
                                    />
                                    </Link>
                                    <h3 className="mb-4">Login</h3>
                                    <div className="flex items-center">
                                        <p className="fs-regular fw-regular text-[#949494]">
                                            Alrady have an account?
                                        </p>
                                        <Link href={route("register")}>
                                            <p className="fs-regular fw-regular underline underline-offset-4 px-1">
                                                Sign Up
                                            </p>
                                        </Link>
                                    </div>

                                    <div className=" relative w-full mt-6 lg:mt-16">
                                        <input
                                            type="email"
                                            name="email"
                                            value={data.email}
                                            onChange={(e) =>
                                                setData("email", e.target.value)
                                            }
                                            className=" input-text w-full         "
                                            placeholder="Email *"
                                        />
                                        {/* <span className="absolute right-5 top-4">
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
                                    <div className="relative w-full mt-16 mt-4">
                                        <input
                                            type={show ? "text" : "password"}
                                            name="password"
                                            value={data.password}
                                            onChange={(e) =>
                                                setData(
                                                    "password",
                                                    e.target.value
                                                )
                                            }
                                            className=" input-text   w-full     "
                                            placeholder="Password *"
                                        />
                                        <span
                                            onClick={() => {
                                                setShow(!show);
                                            }}
                                            className="absolute right-5 top-4"
                                        >
                                            {/* <svg
                                                width="21"
                                                height="22"
                                                viewBox="0 0 21 22"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <g clipPath="url(#clip0_829_45221)">
                                                    <path
                                                        opacity="0.2"
                                                        d="M10.5 5.09375C3.9375 5.09375 1.3125 11 1.3125 11C1.3125 11 3.9375 16.9062 10.5 16.9062C17.0625 16.9062 19.6875 11 19.6875 11C19.6875 11 17.0625 5.09375 10.5 5.09375ZM10.5 14.2812C9.85103 14.2812 9.21663 14.0888 8.67704 13.7283C8.13744 13.3677 7.71687 12.8553 7.46852 12.2557C7.22017 11.6561 7.15519 10.9964 7.2818 10.3599C7.40841 9.72336 7.72091 9.1387 8.17981 8.67981C8.6387 8.22091 9.22336 7.90841 9.85986 7.7818C10.4964 7.65519 11.1561 7.72017 11.7557 7.96852C12.3553 8.21687 12.8677 8.63744 13.2283 9.17704C13.5888 9.71663 13.7812 10.351 13.7812 11C13.7812 11.8702 13.4355 12.7048 12.8202 13.3202C12.2048 13.9355 11.3702 14.2812 10.5 14.2812Z"
                                                        fill="white"
                                                    />
                                                    <path
                                                        d="M10.5 5.09375C3.9375 5.09375 1.3125 11 1.3125 11C1.3125 11 3.9375 16.9062 10.5 16.9062C17.0625 16.9062 19.6875 11 19.6875 11C19.6875 11 17.0625 5.09375 10.5 5.09375Z"
                                                        stroke="white"
                                                        strokeOpacity="0.6"
                                                        strokeWidth="1.2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                    <path
                                                        d="M10.5 14.2812C12.3122 14.2812 13.7812 12.8122 13.7812 11C13.7812 9.18782 12.3122 7.71875 10.5 7.71875C8.68782 7.71875 7.21875 9.18782 7.21875 11C7.21875 12.8122 8.68782 14.2812 10.5 14.2812Z"
                                                        stroke="white"
                                                        strokeOpacity="0.6"
                                                        strokeWidth="1.2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_829_45221">
                                                        <rect
                                                            width="21"
                                                            height="21"
                                                            fill="white"
                                                            transform="translate(0 0.5)"
                                                        />
                                                    </clipPath>
                                                </defs>
                                            </svg> */}
                                        </span>
                                        {errors?.password && (
                                            <p className="fs-tiny fw-regular mt-3 ml-5 text-center danger-color ">
                                                {errors?.password}{" "}
                                            </p>
                                        )}
                                    </div>
                                    <div className="w-full mt-3 flex justify-end items-end text-end">
                                        <Link href={route("password.request")}>
                                            <p className="fs-medium fw-regular opacity-50">
                                                Forgot your password?
                                            </p>
                                        </Link>
                                    </div>

                                    <button className="button primary w-full mt-8">
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
                                            Login
                                        </div>
                                    </button>

                                    <div className="flex items-center gap-2 mt-6">
                                        <input
                                            id="default-checkbox"
                                            type="checkbox"
                                            checked={data.remember}
                                            value={data.remember}
                                            onChange={(e) => setData("remember", e.target.checked)}
                                            className={`w-5 h-5 rounded-[2px] text-[#fff] bg-[#fff] ${data?.remember
                                                ? "border-[2px] border-[#ffffff] ring-[2px] checkbox-bg bg-white ring-[#ffffff] focus:outline-none"
                                                : "border-[2px] border-[#999999]    ring-transparent focus:outline-transparent"
                                            }   focus:shadow-none focus:ring-transparent`}
                                        />

                                        <p className="fs-small fw-regular opacity-50">
                                            Remember me
                                        </p>
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
                                    <span className="font-medium">I am</span>{" "}
                                    glitch
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Login;
