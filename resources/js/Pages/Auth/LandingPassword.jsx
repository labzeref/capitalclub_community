import { useForm } from '@inertiajs/react';
import React, { useState } from 'react'
import logo from "../../../assets/svg/logo.svg";
import Toast from "@/Components/Toast/Toast.jsx";

const LandingPassword = ({ wantedUrl }) => {
    const [show, setShow] = useState(false);
    const { data, setData, post, processing, errors } = useForm({
        password: "",
        wantedUrl: wantedUrl,
    });

    const handleSubmit = (event) => {
        event.preventDefault();

        post(route('site-lock.authenticate'));
    }

    return (
        <div>
            <Toast />
            <div className='flex justify-center'>
                <div className="mt-5 mb-6 lg:mb-[70px] flex justify-center lg:justify-start">
                    <img
                        className="max-h-[30px] lg:max-h-[40px]"
                        src={logo}
                        alt=""
                    />
                </div>
            </div>
            <div className='h-[90vh] w-full flex justify-center items-center'>
                <div className='p-10 inset-border noise-10 min-w-[300px] max-w-[500px]  w-[50%]'>
                    <div className="col-span-12 lg:col-span-6">
                        <form onSubmit={(event) => handleSubmit(event)}>
                            <div className="relative">
                                <input
                                    type="password"

                                    className=" input-text  w-full "
                                    placeholder="Password *"
                                    name="password"
                                    value={data.password}
                                    onChange={(e) =>
                                        setData(
                                            "password",
                                            e.target.value
                                        )
                                    }
                                />
                                {/* <span
                                    onClick={() => {
                                        setShow(!show);
                                    }}
                                    className="absolute right-4 top-3"
                                >
                                    <svg
                                        width="25"
                                        height="24"
                                        viewBox="0 0 25 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <g
                                            opacity="0.6"
                                            clipPath="url(#clip0_1129_6499)"
                                        >
                                            <path
                                                opacity="0.4"
                                                d="M12.5 5.25C5 5.25 2 12 2 12C2 12 5 18.75 12.5 18.75C20 18.75 23 12 23 12C23 12 20 5.25 12.5 5.25ZM12.5 15.75C11.7583 15.75 11.0333 15.5301 10.4166 15.118C9.79993 14.706 9.31928 14.1203 9.03545 13.4351C8.75162 12.7498 8.67736 11.9958 8.82205 11.2684C8.96675 10.541 9.3239 9.8728 9.84835 9.34835C10.3728 8.8239 11.041 8.46675 11.7684 8.32205C12.4958 8.17736 13.2498 8.25162 13.9351 8.53545C14.6203 8.81928 15.206 9.29993 15.618 9.91661C16.0301 10.5333 16.25 11.2583 16.25 12C16.25 12.9946 15.8549 13.9484 15.1517 14.6517C14.4484 15.3549 13.4946 15.75 12.5 15.75Z"
                                                fill="white"
                                            />
                                            <path
                                                d="M12.5 5.25C5 5.25 2 12 2 12C2 12 5 18.75 12.5 18.75C20 18.75 23 12 23 12C23 12 20 5.25 12.5 5.25Z"
                                                stroke="white"
                                                strokeWidth="1.2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M12.5 15.75C14.5711 15.75 16.25 14.0711 16.25 12C16.25 9.92893 14.5711 8.25 12.5 8.25C10.4289 8.25 8.75 9.92893 8.75 12C8.75 14.0711 10.4289 15.75 12.5 15.75Z"
                                                stroke="white"
                                                strokeWidth="1.2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_1129_6499">
                                                <rect
                                                    width="24"
                                                    height="24"
                                                    fill="white"
                                                    transform="translate(0.5)"
                                                />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </span> */}
                            </div>
                            {errors?.password && (
                                <p className="fs-tiny fw-regular mt-3 ml-5 danger-color ">
                                    {errors?.password}{" "}
                                </p>
                            )}
                            <button className="button primary w-full mt-4">
                                <div className="button_container glitch uppercase">
                                    {/* <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <g clipPath="url(#clip0_1129_6393)">
                                            <path
                                                opacity="0.2"
                                                d="M1.99988 12.0005L11.9999 22.0005L21.9999 12.0005L11.9999 2.00049L1.99988 12.0005Z"
                                                fill="black"
                                            />
                                            <path
                                                opacity="0.6"
                                                d="M1.64632 11.6469C1.45106 11.8422 1.45106 12.1588 1.64632 12.354L11.6463 22.354C11.8416 22.5493 12.1582 22.5493 12.3534 22.354L22.3534 12.354C22.5487 12.1588 22.5487 11.8422 22.3534 11.6469L12.3534 1.64693C12.1582 1.45167 11.8416 1.45167 11.6463 1.64693L1.64632 11.6469Z"
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
                                            <clipPath id="clip0_1129_6393">
                                                <rect
                                                    width="24"
                                                    height="24"
                                                    fill="white"
                                                />
                                            </clipPath>
                                        </defs>
                                    </svg> */}
                                    Submit
                                </div>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LandingPassword
