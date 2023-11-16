import React, { useEffect } from "react";
import logo from "../../../assets/svg/logo.svg"; 
import { ReactComponent as WELCOMEARROW } from "../../../assets/svg/WELCOMEARROW.svg";
import { Link, usePage } from "@inertiajs/react";
import InterestLayout from "@/Layouts/InterestLayout";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { motion } from 'framer-motion';
import IconButton from "@/Components/IconButton";
const GlitchId = () => {
    useEffect(() => {
        AOS.init();
    }, [])
    const { auth } = usePage().props;
    // console.log('auth from use................' , auth)
    const handleContextMenu = (e) => {
        e.preventDefault(); 
      };
    return (
        <div onContextMenu={handleContextMenu}>
            <section className="md:my-4 lg:my-0">
                <div className="container mx-auto px-5 xl:p-0">

                    <div className="grid grid-cols-12">
                        <div className="col-span-12">
                            <div className="min-h-[90vh]  h-full flex flex-col items-center justify-between">
                            <p></p> <p></p>
                                <div className="glitch-id-div">
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.2 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 2 }}
                                    >

                                        <h1 className="text-[#FFFFFF] text-center text-[20px]  font-semibold lg:text-[20px] uppercase">
                                        YOU ARE NOW
                                        </h1>
                                        <h1 className="text-[#FFFFFF] text-[48px] lg:text-[64px] uppercase font-bold mt-2 flex flex-row ">
                                            Glitch
                                        </h1>
                                        <h1 className="text-[#FFFFFF] text-[48px] lg:text-[64px] uppercase font-bold mt-2 flex flex-row">
                                            <svg 
                                            width="52" height="53" viewBox="0 0 52 53" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M48.0439 12.6474C44.9029 7.30896 39.6462 3.61283 33.5013 1.69644C30.9733 0.908423 28.3767 0.687107 26.1949 0.70052C24.0131 0.687107 21.4165 0.907584 18.8884 1.69644C12.7444 3.61283 7.48684 7.30896 4.34667 12.6474C1.20567 17.9858 0.933049 21.0272 1.20567 25.6656C1.47913 30.3048 5.43883 37.4908 12.6073 43.7874C19.5901 49.9214 23.0748 51.6374 26.0276 51.7229C26.0836 51.7246 26.1388 51.7255 26.1949 51.7255C26.2501 51.7255 26.3061 51.7238 26.3621 51.7229C29.315 51.6383 32.7988 49.9214 39.7825 43.7874C46.9509 37.4908 50.9114 30.3048 51.1841 25.6656C51.4575 21.0263 51.1841 17.9849 48.0431 12.6465L48.0439 12.6474Z" fill="white" />
                                                <path d="M26.1991 52.2243C21.2309 52.9503 7.73777 41.3572 3.89598 34.364C-4.58122 21.3525 4.32665 5.39515 18.7413 1.2195C23.0665 -0.153663 29.3259 -0.152825 33.6494 1.2195C48.064 5.39683 56.9719 21.3517 48.4947 34.364C44.6604 41.348 31.1531 52.9528 26.1999 52.2243H26.1991ZM26.016 1.19854C12.614 0.989799 0.218093 12.712 1.70246 25.6363C2.04198 31.3989 7.58891 38.7165 12.9351 43.4128C19.3476 49.011 22.875 51.1647 26.1991 51.2275C29.5099 51.1647 33.0498 49.0069 39.4539 43.4128C49.0182 34.8745 54.7867 24.3168 47.6141 12.9006C43.5858 5.92999 34.7758 0.977225 26.016 1.19854Z" fill="#EAEAEA" />
                                                <path d="M19.6203 34.0091C23.4049 31.5697 24.0433 25.8042 21.0461 21.1313C18.049 16.4585 12.5513 14.6479 8.76667 17.0873C4.98208 19.5267 4.34374 25.2922 7.3409 29.9651C10.3381 34.6379 15.8357 36.4485 19.6203 34.0091Z" fill="#EAEAEA" />
                                                <path d="M20.2619 34.9617C23.7688 32.7014 24.1819 27.0809 21.1848 22.4081C18.1876 17.7352 12.9151 15.7795 9.40826 18.0399C5.90144 20.3002 5.48827 25.9207 8.48543 30.5935C11.4826 35.2663 16.7551 37.222 20.2619 34.9617Z" fill="black" />
                                                <path d="M45.0539 29.9756C48.0511 25.3028 47.4127 19.5372 43.6282 17.0978C39.8436 14.6584 34.3459 16.469 31.3487 21.1419C28.3516 25.8147 28.9899 31.5803 32.7745 34.0197C36.5591 36.459 42.0568 34.6484 45.0539 29.9756Z" fill="#EAEAEA" />
                                                <path d="M43.9074 30.5997C46.9046 25.9269 46.4914 20.3064 42.9846 18.0461C39.4778 15.7858 34.2052 17.7415 31.2081 22.4143C28.2109 27.0872 28.6241 32.7076 32.1309 34.9679C35.6377 37.2283 40.9103 35.2726 43.9074 30.5997Z" fill="black" />
                                                <path d="M26.2165 42.0272C23.992 42.0272 21.9774 41.24 20.5131 39.9649C20.1812 39.6757 19.6735 39.9976 19.8015 40.4193C20.6712 43.2889 23.2143 45.3671 26.2165 45.3671C29.2186 45.3671 31.7617 43.2897 32.6314 40.4193C32.7594 39.9976 32.2518 39.6757 31.9198 39.9649C30.4555 41.24 28.4409 42.0272 26.2165 42.0272Z" fill="black" />
                                            </svg>


                                            <span className="ml-1" >

                                                {auth.user.id.toString().padStart(4, '0')}
                                            </span>


                                        </h1>


                                    </motion.div>
                                </div>
                                
                                    <div className="welcome-animation  ">

                                        <p className="welcome-text-div text-xl text-center text-[#FFFFFF] font-normal mt-2 md:mt-0 ">
                                            Welcome to capital club
                                        </p>
                                        <div className={`   text-center flex justify-center p-4 `}>
                                            <div>
                                                <Link href={route('welcome')}>   <img className="h-12 object-cover" src={logo} alt="" /> </Link>
                                            </div>
                                        </div>
                                    </div>
                                 
                                <Link href={route('preference.top-interest')}>
                                    <IconButton
                                        icon={<WELCOMEARROW />}
                                        className={"primary icon md:mt-[32px] mt-[20px] uppercase"}
                                    >
                                        

                                    </IconButton>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
export default GlitchId;
