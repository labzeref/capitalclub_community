import React, { useEffect, useState } from "react";
import glitch from "../../../assets/svg/glitch.svg";
import logo from "../../../assets/svg/logo.svg";
import { Link } from "@inertiajs/react";
import Toast from "@/Components/Toast/Toast.jsx";
import { useForm } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import ReactToast from "@/Components/ReactToast.jsx";
import Recaptcha from "@/Components/Recaptcha.jsx";
import Footer from "@/Components/Nav-Footer/Footer";
import AuthFooter from "./AuthFooter";

const Login = ({ recaptchaKey, recaptchaKeyV2, showSingUpBtn }) => {
    const [show, setShow] = useState(false);
    // const [recaptchaState, setRecaptchaState] = useState(0);
    // console.log('re-captcha Key V2 : ', recaptchaKeyV2)
    const { data, setData, post, processing, errors, clearErrors } = useForm({
        email: "",
        password: "",
        remember: false,
        // recaptcha: null,
        // recaptcha_version: null
    });


    const handleSubmit = (event) => {
        event.preventDefault();
        post(route("login.store"), {
            replace: true,
            // onFinish: () => setRecaptchaState(previous => previous + 1)
        });
    };

    useEffect(() => {
        if (errors?.recaptcha) {
            // console.log('siteKey', recaptchaKey);
            ReactToast('error', errors?.recaptcha);
            clearErrors('recaptcha');
        }
    }, [errors?.recaptcha])






    const [orientation, setOrientation] = useState(
        window.matchMedia('(orientation: portrait)').matches ? 'portrait' : 'landscape');

    useEffect(() => {
        const handleOrientationChange = () => {
            setOrientation(
                window.matchMedia('(orientation: portrait)').matches
                    ? 'portrait' : 'landscape');
        };

        // Add an event listener for changes in orientation
        window.addEventListener('resize', handleOrientationChange);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('resize', handleOrientationChange);
        };
    }, []);



    const innerHeight = window.innerHeight;

    const handleContextMenu = (e) => {
        e.preventDefault(); 
      };

    return (

        <section onContextMenu={handleContextMenu} className="px-5 lg:px-0 fixed w-full">
            <Toast />


            {/* <div className=" col-span-0 lg:col-span-2  "></div> */}

            <div className={` flex justify-center items-center flex-col ${innerHeight < 500 ? 'login-wrapper' : '  scale-[1] md:scale-[1.2]'}  transition-all h-[97vh] max-w-[366px]   mx-auto `} style={{ maxHeight: '-webkit-fill-available' }}>


                <Link href={route('welcome')} className="flex justify-center w-full ">
                    <img className="flex justify-center w-full  h-34vw"
                        src={logo}
                        alt=""
                    />
                </Link>
                <div className="mt-28vw w-full">

                    <form
                        onSubmit={handleSubmit}
                        className="containerMedium px-0   pr-0 lg:pr-5 xl:pr-0 relative"
                    >
                        <div className="  w-full px-9vw py-9vw card-bg border-rounded-10  items-start justify-center flex flex-col">

                            <p className="font-14 fw-bold  text-center w-full">
                                LOGIN TO <br />
                                CAPITAL CLUB</p>
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
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    className=" input-text w-full         "
                                    placeholder="Email"
                                />
                                {errors?.email && (
                                    <p className="font-9 fw-regular mt-1   text-center danger-color ">
                                        {errors?.email}{" "}
                                    </p>
                                )}
                            </div>
                            <div className="relative w-full  mb-1">
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
                                    placeholder="Password"
                                />
                                {errors?.password && (
                                    <p className="font-9 fw-regular mt-1 text-center danger-color ">
                                        {errors?.password}{" "}
                                    </p>
                                )}
                            </div>
                            {/* <div className="w-full mt-3 flex justify-end items-end text-end">
                                            <Link href={route("password.request")}>
                                                <p className="fs-medium fw-regular  opacity-50">
                                                    Forgot your password?
                                                </p>
                                            </Link>
                                        </div> */}

                            <div className="flex items-center gap-2 mt-11vw mb-13vw">
                                <input
                                    id="default-checkbox"
                                    type="checkbox"
                                    checked={data.remember}
                                    value={data.remember}
                                    onChange={(e) => setData("remember", e.target.checked)}
                                    className={`w-4 md:w-4 h-4 md:h-4 sm:w-4 rounded-[2px] border-[2px] border-[#ffffff]
                                                     first-letter:focus:outline-transparent   text-[#000] bg-[#000] ${data?.remember
                                            ? "border-[2px] border-[#ffffff] ring-[2px] ring-[#ffffff] focus:outline-none"
                                            : "border-[2px] border-[#999999] ring-transparent focus:outline-transparent"
                                        } focus:shadow-none focus:ring-transparent overflow-hidden focus:border-0 `}
                                />

                                <p className="font-12 fw-semibold  uppercase leading-[0px]" style={{paddingTop:'3.6px'}}>
                                    Remember me
                                </p>
                            </div>

                            <button className="button isLogin primary rounded-full w-full mt-1.5">
                                <div className="button_container glitch uppercase">
                                    Login
                                </div>
                            </button>


                            <div className={`mt-18vw  gap-x-[12px] flex w-full`}>
                                {showSingUpBtn && <Link href={route("register")} className={" button secondary  border  rounded-full w-full  pt-[0.05vw]"} >
                                    <button className="text-[10px]">SIGN UP</button>
                                </Link>
                                }



                                <Link href={route("password.request")} className={" button secondary  border  rounded-full w-full pt-[0.05vw]"} >
                                    <button className="text-[10px]">
                                        RESET PASSWORD
                                    </button>
                                </Link>
                            </div>




                            {/* <Recaptcha
                                            className={'mt-4'}
                                            recaptchaKey={recaptchaKey}
                                            recaptchaKeyV2={recaptchaKeyV2}
                                            state={recaptchaState}
                                            setData={setData}
                                            recaptchaVersion={data?.recaptcha_version}
                                            recaptchaError={errors?.recaptcha}
                                        /> */}


                        </div>
                    </form>
                </div>

                {/* <div className="   col-span-0 lg:col-span-0   ">
                                <AuthFooter />
                            </div> */}

            </div>


        </section>

    );
};

export default Login;
