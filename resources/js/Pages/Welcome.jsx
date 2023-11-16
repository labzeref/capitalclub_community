import React, { useEffect, useState, useMemo } from "react";
import { Link } from '@inertiajs/react'
import AOS from 'aos';
import 'aos/dist/aos.css';
import logo from "../../assets/svg/logo.svg";
import countinuebtn from "../../assets/svg/countinuebtn.svg";
import Fingerprint from "../../assets/svg/Fingerprint.svg";
import lander from "../../assets/img/lander1.png";
import bot from "../../assets/img/bot.png";
import Button from "../Components/Button";
import { ReactComponent as Continuebtn } from "../../assets/svg/countinuebtn.svg";
import AuthLayout from '../Layouts/AuthLayout';
import Environment from "@/Pages/Environment.jsx";


const Welcome = ({login = true}) => {
    useEffect(() => {
        AOS.init();
    }, [])
    return (
        <>
            <div className="grid grid-cols-12 h-[100vh] lg:h-[90vh]">
            <div className="static z-[99999999] flex justify-between col-span-12 p-6   ">
                    <Link href={route('welcome')}>
                        <img className="h-7  lg:h-10 object-cover md:ml-10" src={logo} alt="" />
                    </Link>
                    {login && <Link href={route('login')} className=" static z-[99999999] flex items-center justify-end md:mr-10">
                        <img className="h-6 w-6 object-cover " src={Fingerprint} alt="" />
                        <span className="text-base text-[#FFFFFF] font-normal uppercase ml-3">
                            login
                        </span>
                    </Link>}
                </div>
                <div className="col-span-12 lg:col-span-6   -mt-[6rem] lg:-mt-[0rem]">
                    <div className="h-[100%] flex flex-col items-center noise-10 lg:absolute pt-32 lg:pt-10 pb-11 lg:pb-10 lg:py-0 top-0  w-full lg:w-[50%]  justify-center  ">
                        <img className="h-36 lg:h-72  cursor-pointer" src={lander} alt="" />
                        <h1 className="text-[#FFFFFF] font-normal text-[32px] lg:text-[64px] my-4 lg:my-10 uppercase">
                            I am <span className="font-bold">glitch</span>
                        </h1>
                        <div className="static z-[9999999]">
                            <Link as="button" href={route('register')}  >

                                <Button
                                    icon={<Continuebtn />}
                                    className={"primary icon static z-[9999999999]  uppercase"}
                                >
                                    continue
                                </Button>

                            </Link>
                        </div>
                    </div>
                </div>
                <div className="col-span-12 lg:col-span-6  bg-lander h-[50vh] lg:h-[80vh] p-6">
                    <div className="h-[100%] flex flex-col items-center justify-center ">
                        <img className="h-36 lg:h-72 mb-10 cursor-pointer" src={bot} alt="" />
                        <h1 className="text-[#FFFFFF] font-normal text-[32px] lg:text-[64px] mb-4 lg:mb-10 uppercase">
                            I am <span className="font-bold">bot</span>
                        </h1>
                    </div>
                </div>
            </div>
        </>

    );
};
// Welcome.layout = page => <AuthLayout children={page} title="Welcome" />
export default Welcome;
