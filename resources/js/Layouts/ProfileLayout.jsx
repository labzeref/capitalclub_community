import { Head, Link, useForm } from "@inertiajs/react";
import Button from "@/Components/Button.jsx";
import { useEffect, useState } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import AppLayout from "./AppLayout";
import { motion } from "framer-motion"
import TabButton from "@/Components/TabButton";
import ToastNotification from "@/Components/ToastNotification";

import logo from "../../assets/logo.svg";
import Footer from "@/Components/Nav-Footer/Footer";
const ProfileLayout = ({ children, pageTitle }) => {
    useEffect(() => {
        AOS.init();
    }, [])
    const [show, setShow] = useState(false)

    const currentPathname = window.location.pathname;
    const segments = currentPathname.split('/');

    // Get the last segment
    const currentPage = segments[segments.length - 1];


    const { post, processing, errors } = useForm();
    // console.log('show profilel layout')
    const handleLogout = (e) => {
        e.preventDefault();
        post(route("logout"));
    }

    const handleContextMenu = (e) => {
        e.preventDefault();
      };

    return (
        <div onContextMenu={handleContextMenu} className={`profile-layout-margin ${currentPage == 'progress' ? 'auto' : 'max-w-[600px]'}  mx-auto px-1 `}>
            {currentPage != 'progress' && <p className=" fav-heading progress-mobile-title  pb-[1rem] choice-text-options fw-bold text-center"> SETTINGS</p>}



            {currentPage == 'progress' &&
                <div className="fav-heading progress-mobile-title w-full flex justify-center ">

                    <p className=" flex pb-[1rem] w-full  justify-center  text-[14px] fw-bold text-center">FAVORITES
                        <svg className=" ml-1.5 mt-[2px]" width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.9174 4.584L8.48909 4.2865L7.15034 1.13441C6.90951 0.560664 6.08784 0.560664 5.84701 1.13441L4.50826 4.29358L1.08701 4.584C0.463678 4.63358 0.208678 5.41275 0.683261 5.82358L3.28284 8.07608L2.50368 11.4194C2.36201 12.0286 3.02076 12.5102 3.55909 12.1844L6.49868 10.4136L9.43826 12.1915C9.97659 12.5173 10.6353 12.0357 10.4937 11.4265L9.71451 8.07608L12.3141 5.82358C12.7887 5.41275 12.5408 4.63358 11.9174 4.584ZM6.49868 9.089L3.83534 10.6969L4.54368 7.66525L2.19201 5.62525L5.29451 5.35608L6.49868 2.5015L7.70993 5.36316L10.8124 5.63233L8.46076 7.67233L9.1691 10.704L6.49868 9.089Z" fill="white" />
                        </svg>
                    </p>
                </div>
            }



            <ToastNotification />
            <div className="flex flex-col justify-between h-[85vh]" style={{ maxHeight: '-webkit-fill-available' }}>
                <div>
                    {currentPage !== 'progress' && <div className="   overflow-x-auto block mt-1 ">
                        <div className="containerMedium flex align-items-center justify-center gap-x-2 px-3 ">

                            <Link href={route('profile.personal')} className="w-full">
                                <TabButton className={`mx-3      ${route().current('profile.personal') && 'active pointer-events-none'}     glitch   uppercase`} activeBottom={route().current('profile.personal') && 'active-tab-block'} >  PROFILE  </TabButton>
                            </Link>
                            <Link href={route('profile.payment')} className="w-full">
                                <TabButton className={`mx-3      ${route().current('profile.payment') && 'active pointer-events-none'} glitch   uppercase`} activeBottom={route().current('profile.payment') && 'active-tab-block'} >  BILLING  </TabButton>
                            </Link>

                            <Link href={route('profile.security')} className="w-full">
                                <TabButton className={`mx-3      ${route().current('profile.security') && 'active pointer-events-none'}   glitch   uppercase`} activeBottom={route().current('profile.security') && 'active-tab-block'}>  ACCOUNT  </TabButton>
                            </Link>
                        </div>
                    </div>
                    }





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

                                                    <span className="text-gray-100 fw-bold uppercase">Progress</span>
                                                </Link>
                                            </li>
                                            <li className="rounded-sm">
                                                <Link onClick={() => { setShow(false) }} href={window._base_url + "/profile/personal"}
                                                    className="flex items-center p-2 space-x-3 rounded-md"
                                                >

                                                    <span className="text-gray-100 fw-bold uppercase">Personal</span>
                                                </Link>
                                            </li>


                                            <li className="rounded-sm">
                                                <Link onClick={() => { setShow(false) }} href={window._base_url + "/profile/payment"}
                                                    className="flex items-center p-2 space-x-3 rounded-md"
                                                >

                                                    <span className="text-gray-100 fw-bold uppercase">Payment</span>
                                                </Link>
                                            </li>

                                            <li className="rounded-sm">
                                                <Link onClick={() => { setShow(false) }} href={route('profile.security')} className="flex items-center p-2 space-x-3 rounded-md">


                                                    <span className="text-gray-100 fw-bold uppercase">Security</span>
                                                </Link>
                                            </li>

                                        </ul>
                                        <div onClick={() => { setShow(false) }} className="  fixed inset-0 -z-10  "></div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>


                    <div className={`   ${pageTitle === 'Progress' ? 'container mx-auto' : 'containerMedium'}   `}>
                        {/* {!pageTitle=='' &&   <h3 className=" ml-4 lg:px-0 semibold paddingSectionSmall ">
                        {pageTitle}
                    </h3> } */}
                        {children}
                    </div>
                </div>

                <div className=" mt-[8.5rem]">
                    {!route().current('profile.progress') &&
                        <div className="containerMedium mx-auto relative">

                            <div className="   w-full flex gap-x-2  px-4 md:px-3">
                                {route().current('profile.security') &&
                                    <button onClick={(e) => { handleLogout(e) }} className="notification-btn flex justify-center gap-x-1.5 text-size  items-center px-[9px] fw-bold bg-[#7E0606] text-[#fff] w-full rounded-[10px] h-[47px] pt-[2px] ">
                                        LOGOUT
                                        <svg width="18" height="14" className="mb-[2px]" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M4.21441 3.33333H8.34983C8.72891 3.33333 9.03906 3.03333 9.03906 2.66667C9.03906 2.3 8.72891 2 8.34983 2H4.21441C3.45625 2 2.83594 2.6 2.83594 3.33333V12.6667C2.83594 13.4 3.45625 14 4.21441 14H8.34983C8.72891 14 9.03906 13.7 9.03906 13.3333C9.03906 12.9667 8.72891 12.6667 8.34983 12.6667H4.21441V3.33333Z" fill="white" />
                                            <path d="M15.001 7.76667L13.078 5.90667C12.8574 5.69333 12.4852 5.84 12.4852 6.14V7.33333H7.66059C7.28151 7.33333 6.97135 7.63333 6.97135 8C6.97135 8.36667 7.28151 8.66667 7.66059 8.66667H12.4852V9.86C12.4852 10.16 12.8574 10.3067 13.0711 10.0933L14.9941 8.23333C15.1319 8.10667 15.1319 7.89333 15.001 7.76667Z" fill="white" />
                                        </svg>

                                    </button>
                                }

                                <a onClick={() => { setOpenMobileMenu(false) }}
                                    className="w-full" href="https://capitalclub1498.zendesk.com/hc/en-us" target="_blank">  <button className="notification-btn flex justify-center gap-x-1.5 text-[10px]  items-center px-[9px] fw-bold bg-[#1c1c1e] text-[#fff] w-full rounded-[10px] h-[47px] pt-[1px]">
                                       <span className="pt-[2px] support-font-size "> SUPPORT</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 15 14" fill="none">
                                            <path d="M12.6693 7.12833C12.6693 3.92583 10.1843 1.75 7.41927 1.75C4.68344 1.75 2.16927 3.87917 2.16927 7.16333C1.81927 7.36167 1.58594 7.735 1.58594 8.16667V9.33333C1.58594 9.975 2.11094 10.5 2.7526 10.5C3.07344 10.5 3.33594 10.2375 3.33594 9.91667V7.11083C3.33594 4.87667 5.05677 2.9225 7.29094 2.85833C9.60094 2.78833 11.5026 4.64333 11.5026 6.94167V11.0833H7.41927C7.09844 11.0833 6.83594 11.3458 6.83594 11.6667C6.83594 11.9875 7.09844 12.25 7.41927 12.25H11.5026C12.1443 12.25 12.6693 11.725 12.6693 11.0833V10.3717C13.0134 10.1908 13.2526 9.835 13.2526 9.415V8.07333C13.2526 7.665 13.0134 7.30917 12.6693 7.12833Z" fill="white" />
                                            <path d="M5.66927 8.16667C5.99144 8.16667 6.2526 7.9055 6.2526 7.58333C6.2526 7.26117 5.99144 7 5.66927 7C5.3471 7 5.08594 7.26117 5.08594 7.58333C5.08594 7.9055 5.3471 8.16667 5.66927 8.16667Z" fill="white" />
                                            <path d="M9.16927 8.16667C9.49144 8.16667 9.7526 7.9055 9.7526 7.58333C9.7526 7.26117 9.49144 7 9.16927 7C8.8471 7 8.58594 7.26117 8.58594 7.58333C8.58594 7.9055 8.8471 8.16667 9.16927 8.16667Z" fill="white" />
                                            <path d="M10.9193 6.43417C10.6393 4.77167 9.1926 3.5 7.44844 3.5C5.68094 3.5 3.77927 4.96417 3.93094 7.2625C5.37177 6.67333 6.45677 5.39 6.76594 3.82667C7.5301 5.36083 9.09927 6.41667 10.9193 6.43417Z" fill="white" />
                                        </svg>
                                    </button>
                                </a>
                            </div>
                        </div>
                    }

                    <div className={` ${currentPage == 'progress' && 'lg-d-none' } `}>
                        <div className=" text-center flex justify-center profile-footer-p">
                            <svg width="109" height="21" viewBox="0 0 109 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M25.0781 10.5257C25.0781 7.81601 26.7391 5.87891 29.3107 5.87891C31.3534 5.87891 32.6084 6.98044 33.002 8.49976H31.2055C30.9223 7.80332 30.3072 7.32212 29.3107 7.32212C27.7726 7.32212 26.8743 8.58856 26.8743 10.5257C26.8743 12.4628 27.7726 13.6785 29.3107 13.6785C30.3072 13.6785 30.9227 13.1719 31.2055 12.4378H33.002C32.6084 13.9952 31.3534 15.1221 29.3107 15.1221C26.7391 15.1221 25.0781 13.2103 25.0781 10.5261V10.5257Z" fill="white" />
                                <path d="M39.1297 12.6649H35.7461L34.9588 14.9314H33.1992L36.4353 6.06836H38.441L41.677 14.9314H39.9175L39.1301 12.6649H39.1297ZM38.6744 11.3481L37.4318 7.77754L36.2014 11.3481H38.6748H38.6744Z" fill="white" />
                                <path d="M42.5508 6.06836H46.2668C48.3954 6.06836 49.4046 7.06842 49.4046 8.72727C49.4046 10.3861 48.3958 11.3735 46.2668 11.3735H44.2364V14.9314H42.5508V6.06836ZM46.1558 10.0187C47.2017 10.0187 47.657 9.46136 47.657 8.72727C47.657 7.99319 47.2017 7.4105 46.1558 7.4105H44.2364V10.0187H46.1558Z" fill="white" />
                                <path d="M50.4766 6.06836H52.1622V14.9314H50.4766V6.06836Z" fill="white" />
                                <path d="M55.9538 7.47392H53.1484V6.06836H60.4448V7.47392H57.6395V14.9314H55.9538V7.47392Z" fill="white" />
                                <path d="M65.5008 12.6649H62.1172L61.3299 14.9314H59.5703L62.8064 6.06836H64.8121L68.0481 14.9314H66.2885L65.5012 12.6649H65.5008ZM65.0455 11.3481L63.8029 7.77754L62.5725 11.3481H65.0459H65.0455Z" fill="white" />
                                <path d="M68.9219 6.06836H70.6075V13.5262H74.877V14.9318H68.9219V6.06877V6.06836Z" fill="white" />
                                <path d="M77.7188 10.5257C77.7188 7.81601 79.3797 5.87891 81.9513 5.87891C83.994 5.87891 85.249 6.98044 85.6426 8.49976H83.8461C83.563 7.80332 82.9478 7.32212 81.9513 7.32212C80.4132 7.32212 79.5149 8.58856 79.5149 10.5257C79.5149 12.4628 80.4132 13.6785 81.9513 13.6785C82.9478 13.6785 83.5634 13.1719 83.8461 12.4378H85.6426C85.249 13.9952 83.994 15.1221 81.9513 15.1221C79.3797 15.1221 77.7188 13.2103 77.7188 10.5261V10.5257Z" fill="white" />
                                <path d="M86.8129 6.06836H88.4985V13.5262H92.7681V14.9318H86.8125V6.06877L86.8129 6.06836Z" fill="white" />
                                <path d="M93.3984 11.9558V6.06836H95.0841V11.8547C95.0841 13.1334 95.7608 13.6781 96.8929 13.6781C98.025 13.6781 98.7138 13.1334 98.7138 11.8547V6.06836H100.4V11.9558C100.4 13.9309 99.1325 15.1213 96.8929 15.1213C94.6534 15.1213 93.3984 13.9309 93.3984 11.9558Z" fill="white" />
                                <path d="M102.024 6.06836H105.703C107.709 6.06836 108.631 7.04346 108.631 8.3856C108.631 9.33533 108.028 10.0821 107.339 10.247C108.25 10.4369 109 11.2597 109 12.3993C109 13.944 107.979 14.9318 105.924 14.9318H102.023V6.06877L102.024 6.06836ZM105.592 9.74042C106.417 9.74042 106.884 9.30996 106.884 8.58815C106.884 7.86634 106.404 7.4105 105.592 7.4105H103.71V9.74042H105.592ZM105.814 13.5897C106.798 13.5897 107.253 13.1085 107.253 12.349C107.253 11.5895 106.798 11.0957 105.814 11.0957H103.71V13.5901H105.814V13.5897Z" fill="white" />
                                <path d="M10.2127 0C4.58128 0 0 4.71427 0 10.5092C0 15.0803 2.85152 18.977 6.81963 20.4198C7.26977 20.5834 7.73382 20.7164 8.2106 20.8142C8.21975 20.8163 8.22929 20.8175 8.23883 20.8195C8.69255 20.9112 9.1566 20.9726 9.6298 21V3.25387C9.29021 3.25387 8.68618 3.35658 8.23883 3.48997C8.22929 3.49284 8.22014 3.49529 8.2106 3.49816C7.72348 3.64588 7.25744 3.84392 6.81963 4.09026C5.22467 4.98638 3.99913 6.49383 3.44123 8.30409C3.29689 8.77261 3.14498 9.31519 3.14657 9.76448H6.94847V8.30409H4.9499C5.34437 7.31098 5.99531 6.45332 6.81963 5.82031C7.24193 5.49582 7.70957 5.23148 8.2106 5.03671V19.319C7.73104 19.2037 7.26579 19.0498 6.81963 18.8571C3.65039 17.4879 1.4188 14.2623 1.4188 10.5096C1.4188 5.51996 5.36345 1.4604 10.2127 1.4604C15.062 1.4604 19.0067 5.51996 19.0067 10.5096C19.0067 14.2189 16.8256 17.4126 13.7144 18.8084C13.2659 19.0097 12.7978 19.173 12.3143 19.2957V5.07681C12.8209 5.28509 13.2913 5.5662 13.7144 5.90746C14.4867 6.53107 15.099 7.35518 15.4756 8.30409H13.5856V9.76448H17.2781C17.2793 9.32706 17.1409 8.72064 16.9966 8.25253C16.4514 6.4836 15.2561 5.05758 13.7148 4.1545C13.275 3.89671 12.8066 3.68434 12.3147 3.52721C12.3083 3.52516 12.302 3.52353 12.2956 3.52148C11.8463 3.37949 11.2208 3.25305 10.8955 3.25346V20.9922C11.3715 20.9599 11.8395 20.8957 12.2956 20.7979C12.302 20.7966 12.3083 20.7946 12.3147 20.7934C12.7943 20.6898 13.2623 20.5523 13.7148 20.3817C17.6269 18.9078 20.4259 15.0385 20.4259 10.5092C20.4255 4.71427 15.8442 0 10.2127 0Z" fill="white" />
                                <path d="M13.5859 15.1104V16.8637C15.3483 16.031 16.5074 14.3951 17.03 12.5574C17.1632 12.0881 17.2765 11.5238 17.2785 11.0938L15.868 11.0974H13.5859V12.5578H15.5364C15.2584 13.5542 14.493 14.5035 13.5859 15.1112V15.1104Z" fill="white" />
                                <path d="M6.95033 11.0982H4.55968L3.14844 11.0957C3.16474 11.5851 3.26455 12.0892 3.39776 12.5581C3.9322 14.438 5.13746 15.9908 6.95033 16.9291V15.1991C5.79835 14.4302 5.27783 13.6179 4.89132 12.5586H6.95033V11.0982Z" fill="white" />
                            </svg>
                        </div>
                    </div>

                    {currentPage == 'progress' &&
                        <div className="sm-d-none md-d-none">
                            <Footer />
                        </div>
                    }

                </div>


            </div>
        </div>
    );
};
ProfileLayout.layout = (page) => <AppLayout children={page} title="" />;
export default ProfileLayout;
