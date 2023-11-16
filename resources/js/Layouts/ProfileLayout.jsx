import { Head, Link } from "@inertiajs/react";
import Button from "@/Components/Button.jsx";
import { useEffect, useState } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import AppLayout from "./AppLayout";
import { motion } from "framer-motion"
import TabButton from "@/Components/TabButton";
import ToastNotification from "@/Components/ToastNotification";
const ProfileLayout = ({ children, pageTitle }) => {
    useEffect(() => {
        AOS.init();
    }, [])
    const [show, setShow] = useState(false)
    const currentPathname = window.location.pathname;
    const segments = currentPathname.split('/');

    // Get the last segment
    const lastSegment = segments[segments.length - 1];

    // console.log('show profilel layout')

    return (
        <div className="pt-[4rem]   ">
             <Head title="Profile"/>
            <ToastNotification />
            <div className="  pt-[2rem] ">
                <div className=" border-b border-[#ffffff10] overflow-x-auto hidden md:block ">
                    <div className="containerMedium flex align-items-center justify-center gap-x-3 ">

                        <Link href={route('profile.progress')}>
                            <TabButton className={`mx-4     ${route().current('profile.progress') && '    active'}     glitch `} activeBottom={route().current('profile.progress') && 'active-tab-block'} >  My Progress  </TabButton>
                        </Link>
                        <Link href={route('profile.personal')}>
                            <TabButton className={`mx-4      ${route().current('profile.personal') && 'active'}     glitch   uppercase`} activeBottom={route().current('profile.personal') && 'active-tab-block'} >  Personal  </TabButton>
                        </Link>
                        {/* <Link href={route('profile.interests')}>
                            <Button className={` button    ${route().current('profile.interests') && 'active' }    glitch   uppercase`}> <p className="fw-regular fs-small uppercase"> Interests </p></Button>
                        </Link> */}
                        <Link href={route('profile.payment')}>
                            <TabButton className={`mx-4      ${route().current('profile.payment') && 'active'} glitch   uppercase`} activeBottom={route().current('profile.payment') && 'active-tab-block'} >  Payment  </TabButton>
                        </Link>
                        <Link href={window._base_url + "/profile/privacy"}>
                            <TabButton className={`mx-4      ${lastSegment == 'privacy' && 'active'}   glitch   uppercase`} activeBottom={lastSegment == 'privacy' && 'active-tab-block'}>  Privacy  </TabButton>
                        </Link>
                        <Link href={route('profile.account')}>
                            <TabButton className={`mx-4      ${route().current('profile.account') && 'active'}   glitch   uppercase`} activeBottom={route().current('profile.account') && 'active-tab-block'}>  Account  </TabButton>
                        </Link>
                        <Link href={route('profile.activity')}>
                            <TabButton className={`mx-4      ${route().current('profile.activity') && 'active'}   glitch   uppercase`} activeBottom={route().current('profile.activity') && 'active-tab-block'}>  Activity  </TabButton>
                        </Link>
                    </div>
                </div>


                <div className="block md:hidden     w-[50px] mx-2 h-[50px] ">
                    <button onClick={() => { setShow(!show) }} className=" z-[99] relative  rounded focus:outline-none group">
                        <svg
                            width="32"
                            height="32"
                            viewBox="0 0 32 32"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g clipPath="url(#clip0_474_26908)">
                                <path
                                    opacity="0.2"
                                    d="M27 8H5V24H27V8Z"
                                    fill="white"
                                />
                                <path
                                    d="M5 16H27"
                                    stroke="white"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M5 8H27"
                                    stroke="white"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M5 24H27"
                                    stroke="white"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </g>
                            <defs>
                                <clipPath id="clip0_474_26908">
                                    <rect width="32" height="32" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                    </button>
                </div>


            
                    <div className={` flex absolute md:hidden z-[9999] inset-border left-0 ${show ? 'block  transition-all ease-in-out duration-300' : ' hidden transition-all ease-in-out duration-300 '}     `} >
                    <motion.div
                    initial={{ y: -100 }}
                    animate={{

                        y: 0,
                        rotate: 0,
                    }}
                >     <div className="flex flex-col border-rounded-10  p-3 bg-black shadow w-60">
                            <div className="space-y-3">
                                <div className="flex items-center">
                                    <h2 className="text-xl font-bold text-white">Profile</h2>
                                </div>

                                <div className="flex-1">
                                    <ul className="pt-2 pb-4 space-y-1 text-sm  ">
                                        <li className="rounded-sm  ">
                                            <Link onClick={() => { setShow(false) }} href={window._base_url + "/profile/progress"}
                                                className="flex items-center p-2 space-x-3 rounded-md"
                                            >
                                                {/* <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="w-6 h-6 text-gray-100"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                                />
                                            </svg> */}
                                                <span className="text-gray-100">My Progress</span>
                                            </Link>
                                        </li>
                                        <li className="rounded-sm">
                                            <Link onClick={() => { setShow(false) }} href={window._base_url + "/profile/personal"}
                                                className="flex items-center p-2 space-x-3 rounded-md"
                                            >
                                                {/* <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="w-6 h-6 text-gray-100"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                                                />
                                            </svg> */}
                                                <span className="text-gray-100">Personal</span>
                                            </Link>
                                        </li>
                                        {/* <li className="rounded-sm">
                            <Link onClick={()=>{setShow(false)}} href={window._base_url + "/profile/interests"}
                                    className="flex items-center p-2 space-x-3 rounded-md"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6 text-gray-100"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                                        />
                                    </svg>
                                    <span className="text-gray-100">Interests</span>
                                </Link>
                            </li> */}

                                        <li className="rounded-sm">
                                            <Link onClick={() => { setShow(false) }} href={window._base_url + "/profile/payment"}
                                                className="flex items-center p-2 space-x-3 rounded-md"
                                            >
                                                {/* <svg height="20px"
                                                width="20px"
                                                version="1.1" id="Capa_1"
                                                xmlns="http://www.w3.org/2000/svg"
                                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                                viewBox="0 0 502.69 502.69" xmlSpace="preserve" fill="#ffffff" stroke="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path style={{ fill: "#ffffff" }} d="M482.797,276.924c4.53-5.824,6.73-13.331,4.724-20.988L428.05,30.521 c-3.451-13.029-16.847-20.837-29.854-17.386L18.184,113.331C5.22,116.761-2.61,130.2,0.798,143.207L60.269,368.6 c3.408,13.007,16.868,20.816,29.876,17.408l134.278-35.419v75.476c0,42.214,69.954,64.303,139.11,64.303 c69.113,0,139.153-22.089,139.153-64.302V311.61C502.685,297.869,495.157,286.307,482.797,276.924z M439.763,199.226l6.212,23.469 l-75.541,19.953l-6.169-23.512L439.763,199.226z M395.931,50.733l11.799,44.695l-118.014,31.148l-11.799-44.695L395.931,50.733z M342.975,224.744l6.04,22.951c-27.934,1.251-55.113,6.126-76.943,14.452l-4.616-17.429L342.975,224.744z M79.984,319.224 l-6.169-23.426l75.519-19.975l6.212,23.555L79.984,319.224z M170.625,270.237l75.476-19.953l5.716,21.506 c-1.834,1.122-3.559,2.286-5.242,3.473l-69.781,18.421L170.625,270.237z M477.491,424.209c0,24.612-50.993,44.544-113.958,44.544 c-62.9,0-113.937-19.953-113.937-44.544v-27.718c0-0.928,0.539-1.769,0.69-2.653c3.602,23.34,52.654,41.847,113.247,41.847 c60.614,0,109.687-18.508,113.268-41.847c0.151,0.884,0.69,1.726,0.69,2.653V424.209z M477.491,369.678 c0,24.591-50.993,44.522-113.958,44.522c-62.9,0-113.937-19.931-113.937-44.522V341.96c0-0.906,0.539-1.769,0.69-2.653 c3.602,23.318,52.654,41.869,113.247,41.869c60.614,0,109.687-18.551,113.268-41.869c0.151,0.884,0.69,1.747,0.69,2.653V369.678z M363.532,356.11c-62.9,0-113.937-19.931-113.937-44.501c0-24.569,51.036-44.5,113.937-44.5c62.965,0,113.958,19.931,113.958,44.5 C477.491,336.179,426.497,356.11,363.532,356.11z"></path> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> </g> </g></svg> */}
                                                <span className="text-gray-100">Payment</span>
                                            </Link>
                                        </li>
                                        <li className="rounded-sm">
                                            <Link onClick={() => { setShow(false) }} href={window._base_url + "/profile/privacy"}
                                                className="flex items-center p-2 space-x-3 rounded-md"
                                            >
                                                {/* <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="w-6 h-6 text-gray-100"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                                />
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                />
                                            </svg> */}
                                                <span className="text-gray-100">Privacy</span>
                                            </Link>
                                        </li>
                                        <li className="rounded-sm">
                                            <Link onClick={() => { setShow(false) }} href={window._base_url + "/profile/account"}
                                                className="flex items-center p-2 space-x-3 rounded-md"
                                            >
                                                {/* <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="w-6 h-6 text-gray-100"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                                                />
                                            </svg> */}
                                                <span className="text-gray-100">Account</span>
                                            </Link>
                                        </li>


                                        <li className="rounded-sm">
                                            <Link onClick={() => { setShow(false) }} href={route('profile.activity')}
                                                className="flex items-center p-2 space-x-3 rounded-md"
                                            >
                                                {/* <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="w-6 h-6 text-gray-100"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                                                />
                                            </svg> */}
                                                <span className="text-gray-100">Activity</span>
                                            </Link>
                                        </li>
                                       
                                    </ul>
                                    <div onClick={() => { setShow(false) }}  className="  fixed inset-0 -z-10  "></div>
                                </div>
                            </div>
                        </div>
                        </motion.div>
                    </div>
               

                <div className={`    ${pageTitle === 'Progress' ? 'containerLarge' : 'containerMedium'}   `}>
                    {/* {!pageTitle=='' &&   <h3 className=" ml-4 lg:px-0 semibold paddingSectionSmall ">
                        {pageTitle}
                    </h3> } */}

                    {children}
                </div>
            </div>
        </div>
    );
};
ProfileLayout.layout = (page) => <AppLayout children={page} title="" />;
export default ProfileLayout;
