
import logo from "../../assets/svg/logo.svg";
import AppLayout from "./AppLayout";
import Toast from "@/Components/Toast/Toast";
import Button from "..//Components/Button";
import IconButton from "@/Components/IconButton";
import { ReactComponent as WELCOMEARROW } from "../../assets/svg/WELCOMEARROW.svg";
import { Link, useForm, usePage } from "@inertiajs/react";

import clickSound from "../../assets/clickSound.wav";
import TabButton from "@/Components/TabButton";
import { useRef } from "react";
import { motion } from "framer-motion"
import { useEffect } from "react";
import { useState } from "react";
import TopInterest from "@/Pages/Preference/TopInterests";
const PreferencesLayout = ({ children, progress = "", backPAth = '', farwordPath = "", handleSubmit, isLast, isShowButton = '' }) => {
    const { auth } = usePage().props;
    function goBack() {
        // playAudio()
        window.history.back();
    }

    const currentPathname = window.location.pathname;
    const segments = currentPathname.split('/');

    // Get the last segment
    const currentPage = segments[segments.length - 1];


    //   const [screenInnerHeight, setScreenInnerHeight] = useState(false)

    //   const heightIs =  useRef(window.innerHeight)
    //   console.log(heightIs)

    //   useEffect(() => {
    //     setScreenInnerHeight(heightIs.current)
    // }, [heightIs.current])
    //     console.log(screenInnerHeight)

    const handleContextMenu = (e) => {
        e.preventDefault(); 
      };

    return (
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* className={innerHeight >580 && 'fixed'} */}
        <div onContextMenu={handleContextMenu} className="prefrence-layout-scroll"  style={{ width: '100vw',  transition: 'opacity 0.3s ease-in-out',  }}>
            <Toast />
            <div>
                <section className="md:my-4 lg:my-0">
                    <div className=" flex flex-col  min-h-[400px] fixed w-full prefrence-layout-scroll" style={{ maxHeight: '-webkit-fill-available',justifyContent:'space-between' }}>
                        <div className="w-full">

                            <div className=" prefrerence-layout-mt  w-full flex justify-center">
                                <Link href={route('welcome')}>   <img className="onboarding-logo object-cover" src={logo} alt="" /> </Link>
                            </div>
                            <div className="w-full flex flex-col items-center justify-between  ">

                                <p className="welcome-text    welcome-paddeing " > WELCOME</p>

                                <h1 className="text-center  font-40 uppercase font-bold mt-1">
                                    Glitch  #{auth.user.id.toString().padStart(4, '0')}
                                </h1>
                            </div>
                            {/* ********* children ******** */}
                            <section className="w-full flex justify-center items-start children mb-8 md:mb-7 preference-height-xs px-4 flex"  style={{overflowY:'hidden'}}>
                                {/* {children} */}
                            <TopInterest   />
                            </section>
                        </div>

                        <div className=" w-full ">
                            <div className="container mx-auto  ">
                                <div className="flex justify-center mb-[5vh] md:mb-[9vh] cursor-pointer ">
                                    {isLast ?
                                        <div className=" md:w-[25%] w-[50%]  " >
                                            <button
                                                onClick={(e) => { handleSubmit(e) }}
                                                className={"font-bold w-full   bg-white rounded-[10px] h-[52px] text-black mb-[1rem] md:mb-[5rem]  uppercase"}
                                            >
                                                Complete
                                            </button>
                                        </div>
                                        :
                                        <>
                                            {/* {currentPage != 'business' && */}
                                            <svg className={`${currentPage == 'business' && 'invisible'} cursor-pointer mb-[1rem] w-[28px] md:w-[34px]`}
                                                 onClick={() => { handleSubmit()  }}  viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <circle cx="14" cy="14" r="14" fill="white" />
                                                <path d="M7 13.75H21.5" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M14.25 6.5L21.5 13.75L14.25 21" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            {/* } */}
                                        </>
                                    }

                                </div>
                            </div>
                        </div>





                    </div>
                </section>
                {/* <div className={` bg-white h-[10px] md:h-[20px]  mt-3 fixed bottom-0 z-[9999] `} style={{ width: progress + '%' }} ></div> */}
            </div>
        </div>
        </motion.div>
    );

}
PreferencesLayout.layout = (page) => <AppLayout children={page} title="" />;
export default PreferencesLayout;
