import React, { useState } from "react";
import glitch from "../../../assets/svg/glitch.svg";
import logo from "../../../assets/svg/logo.svg";
import { Link, useForm, usePage } from "@inertiajs/react";
import { ToastContainer, toast } from "react-toastify";
import Toast from "@/Components/Toast/Toast";
import AuthFooter from "./AuthFooter";
const ForgotPassword = () => {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        post(route('password.email'))
    }
    const innerHeight = window.innerHeight;

    const handleContextMenu = (e) => {
        e.preventDefault(); 
      };
    return (
            <section  onContextMenu={handleContextMenu}>
            <Toast />
                <div className="px-5 lg:px-0 hidden">
                    <div className="">

                        <div className=" md:w-[60%] max-w-[500px] xl:w-[30%] mx-auto">

                            <Link href={route('welcome')} className="flex justify-center w-full ">
                                <img
                                    className="flex justify-center w-full mt-6  max-h-[40px] mx-[4rem] "
                                    src={logo}
                                    alt=""
                                />
                            </Link>
                            <form
                                onSubmit={handleSubmit}
                                className="containerMedium px-0   pr-0 lg:pr-5 xl:pr-0 relative"
                            >
                                <div className="h-[80vh] w-full px-0    items-start justify-center flex flex-col">

                                    <h3 className="mb-2 text-center w-full">Reset Your Password</h3>


                                    <div className="flex items-center w-full justify-center ">
                                        <p className="fs-regular fw-regular text-center text-[#949494]">
                                            Enter your email to receive a
                                            link to reset your password.
                                        </p>

                                    </div>

                                    <div className="md:pr-5 w-full">
                                        <div className="relative w-full mt-[2rem]">
                                            <input
                                                type="email"
                                                name="email"
                                                value={data.email}
                                                onChange={event => setData('email', event.target.value)}
                                                className=" w-full  input-text "
                                                placeholder="Email"
                                            />
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
                                                GET LINK
                                            </div>
                                        </button>

                                    </div>
                                    <div className="flex items-center w-full justify-center pt-4">
                                        <p className="fs-regular fw-regular text-[#949494]">
                                            If you remember your password.
                                        </p>
                                        <Link
                                            href={route('login')}
                                        >
                                            <p className="fs-regular fw-regular underline underline-offset-4 px-1">
                                                Login Here
                                            </p>
                                        </Link>
                                    </div>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>





                <section className=" ">
               
                <div className="px-5 lg:px-0">
                    <div
                        className="    ">
                        {/* <div className=" col-span-0 lg:col-span-2  "></div> */}
                        <div className="   h-[90vh]   ">
                            <div className={` flex justify-center items-center flex-col ${innerHeight < 500 ? 'login-wrapper' : '  scale-[1] md:scale-[1.2]'}  h-[90vh] max-w-[366px] mx-auto `}>


                            <Link href={route('welcome')} className="flex justify-center w-full ">
                                <img className="flex justify-center w-full mt-6  h-34vw"
                                    src={logo}
                                    alt=""
                                />
                            </Link>
                            <div className="mt-28vw w-full">

                                <form

                                    className="containerMedium px-0   pr-0 lg:pr-5 xl:pr-0 relative"
                                >
                                    <div className="  w-full px-9vw py-9vw card-bg border-rounded-10  items-start justify-center flex flex-col">

                                        <p className="font-14 fw-bold  text-center w-full">
                                        RESET YOUR <br/>
                                        PASSWORD</p>
                                        {/* <div className="flex items-center w-full justify-center">
                                            <p className="fs-regular fw-regular text-[#949494]">
                                                Alrady have an account?
                                            </p>
                                            <Link href={route("register")}>
                                                <p className="fs-regular fw-regular underline underline-offset-4 px-1">
                                                    Sign Up
                                                </p>
                                            </Link>
                                        </div> */}

                                        <div className=" relative w-full mt-18vw mb-13vw-input">
                                        <input
                                                type="email"
                                                name="email"
                                                value={data.email}
                                                onChange={event => setData('email', event.target.value)}
                                                className=" w-full  input-text "
                                                placeholder="Enter Your Account Email"
                                            />
                                            {errors?.email && (
                                                <p className="font-9 fw-regular   text-center danger-color ">
                                                    {errors?.email}{" "}
                                                </p>
                                            )}
                                        </div>




                                        <button onClick={handleSubmit} disabled={processing} className="button primary rounded-full w-full mt-1">
                                            <div className="button_container glitch uppercase">
                                            GET RESET LINK
                                            </div>
                                        </button>


                                        <div className={`mt-57vw flex justify-end   gap-x-[12px] w-full`}>




                                            <Link href={route("login")} className={" button secondary  border  rounded-full w-[165px] isreset-btn pt-[0.010vw]"} >
                                                <button className="uppercase">
                                                    Login
                                                </button>
                                            </Link>
                                        </div>


                                    </div>
                                </form>
                            </div>
                        </div>
                            {/* <div className="   col-span-0 lg:col-span-0   ">
                                <AuthFooter />
                            </div> */}
                        </div>
                    </div>
                </div>

            </section>






























            </section>
    );
};

export default ForgotPassword;
