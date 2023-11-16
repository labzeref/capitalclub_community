import React, { useState } from "react";
import glitch from "../../../assets/svg/glitch.svg";
import logo from "../../../assets/svg/logo.svg";
import { Link, useForm } from "@inertiajs/react";
import { ToastContainer, toast } from "react-toastify";
import Toast from "@/Components/Toast/Toast.jsx";
const ResetPassword = ({ token, email }) => {
    const [show, setShow] = useState(false);
    const { data, setData, post, processing, errors } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const handleSubmit = (event) => {
        event.preventDefault();

        console.log(data)

        post(route('password.store'));
    }

    return (
        <div className="mybg">
            <Toast />
            <section>
                <div className="px-5 xl:px-0">
                    <div className="grid grid-cols-12">
                        <div className="col-span-12 lg:col-span-5">
                            <ToastContainer />
                            <form
                                onSubmit={handleSubmit}
                                className=" containerMedium px-6 pr-0 lg:pr-5 xl:pr-0 relative"
                            >
                                <div className="h-screen w-full px-0  lg:px-[4rem] items-start justify-center flex flex-col">
                                <Link href={route('welcome')}>    <img
                                        className="absolute top-6 px-[4rem] left-0 max-h-[40px]"
                                        src={logo}
                                        alt=""
                                    />
                                     </Link>
                                    <h3 className="mb-4">Reset Password?</h3>
                                    {/* <div className="flex items-center">
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
                                    </div> */}
                                    <div className="pr-5 w-full">
                                        <div className="relative w-full mt-[1rem]">
                                            <input type= "password"
                                            
                                                className="input-text   w-full "
                                                placeholder="New Password"
                                                name="password"
                                                value={data.password}
                                                onChange={e => setData('password', e.target.value)} />
                                                {errors?.password && (
                                                <p className="fs-tiny fw-regular mt-3 ml-5 text-center danger-color ">
                                                    {errors?.password}{" "}
                                                </p>
                                            )}
                                           
                                        </div>
                                        <div className="relative w-full mt-[1rem]">
                                            <input
                                                type={
                                                    show ? "text" : "password"
                                                }
                                                name="password_confirmation"
                                                value={data?.password_confirmation}
                                                onChange={event => setData('password_confirmation', event.target.value)}
                                                className=" w-full  input-text "
                                                placeholder="Confirm New Password"
                                            />
                                                    {errors?.password_confirmation && (
                                                <p className="fs-tiny fw-regular mt-3 ml-5 text-center danger-color ">
                                                    {errors?.password_confirmation}{" "}
                                                </p>
                                            )}
                                        </div>

                                        <button className="button primary w-full mt-[2rem]">
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
                                                Save
                                            </div>
                                        </button>
                                        <button className="button secondary w-full mt-[1rem]">
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
                                                CANCEL
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

export default ResetPassword;
