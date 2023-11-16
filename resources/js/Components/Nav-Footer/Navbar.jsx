import React, { useEffect, useState } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link, usePage } from "@inertiajs/react";
import logo from "../../../assets/logo.svg";
import { motion } from "framer-motion"
import ToastNotification from "../ToastNotification";
import NotificationDropdown from "../NotificationDropdown";
const Navbar = () => {
    useEffect(() => {
        AOS.init();
    }, [])
    const auth = usePage()
    const user = auth?.props?.auth?.user;
    // console.log("auth......", auth);

const [openMobileMenu , setOpenMobileMenu] = useState(false)

    const mobileMenu = [
        {
          id: 1,
          title: 'Academy',
          path: 'academy',
        },
        {
          id: 2,
          title: 'Live Training',
          path: 'live-training.index',
        },
        {
          id: 3,
          title: 'Discussion',
          path: 'discussion',
        },
        {
          id: 4,
          title: 'Marketplace',
          path: 'marketplace.index',
        },
        {
          id: 5,
          title: 'Search',
          path: 'search.index',
        },
        {
          id: 6,
          title: 'Chat',
          path: 'chat.index',
        },
        {
          id: 7,
          title: 'Profile',
          path: 'profile.personal',
        },
        {
          id: 8,
          title: 'Bookmark',
          path: 'profile',
        },
      ];




      useEffect(() => {
        if (openMobileMenu) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [openMobileMenu]);


    return (
        <div className="container flex flex-wrap flex-col md:flex-row md:items-center navbar-main px-5 lg:px-3">

            <nav className="w-full">
                <div className="container m-auto flex justify-between items-center text-gray-center">
                    <Link href={route("academy")} className="">
                        <div className="flex title-font -z-10  font-medium items-center justify-between text-gray-900">
                            <img src={logo} className="lg:h-[40px] h-[27px] " alt="" />
                        </div>
                    </Link>
                    <ul className="hidden md:flex md:mx-auto item-center lg:pr-10 text-base font-semibold cursor-pointer">
                        <Link href={route("academy")}>  <li className=" pt-4 md:px-2 lg:px-4 text-[12px] xl:text-[15px]  text-[#FFFFFF]  font-normal uppercase">
                            Academy
                        </li></Link>
                        <Link href={route("live-training.index")}>
                            <div className="ring-container absolute">
                                <div className="ringring"></div>
                                <div className="circle"></div>
                            </div>
                            <li className=" py-4 md:px-2 lg:px-4 text-[12px] xl:text-[15px] text-[#FFFFFF] relative font-normal uppercase">
                                Live Training
                            </li>
                        </Link>
                        <Link href={route('discussion')}>
                            <li className=" py-4 md:px-2 lg:px-4 text-[12px] xl:text-[15px] text-[#FFFFFF] font-normal uppercase">
                                discussion
                            </li>
                        </Link>
                        <Link href={route("marketplace.index")}>
                            <li className=" py-4 md:px-2 lg:px-4 text-[12px] xl:text-[15px] text-[#FFFFFF] font-normal uppercase">
                                Marketplace
                            </li>
                        </Link>
                    </ul>
                    <motion.div
  initial={{   y: -100  }}
  animate={{
    y: 0,


  }}
>
                    <div className="hidden md:block md:-mt-2 lg:mt-0">
                        <div className="flex items-center justify-end  md:w-[200px] lg:w-[300px] px-3    rounded-full  bg-[#1A1A1A]">
                            <div className=" md:mr-5 lg:mr-10 ">

                                <Link href={route('search.index')}>
                                    <span>
                                        <svg className="w-4 h-4 md:w-5 md:h-5"  viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8.5 16C12.6421 16 16 12.6421 16 8.5C16 4.35786 12.6421 1 8.5 1C4.35786 1 1 4.35786 1 8.5C1 12.6421 4.35786 16 8.5 16Z" stroke="#E3E3E3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M13.8027 13.8027L18.9993 18.9993" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>

                                    </span>
                                </Link>
                            </div>
                            <div className=" md:mr-5 lg:mr-10 ">
                                <Link href={route('chat.index')}>
                                    <span>
                                        <svg className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M3.86495 18.6041L3.87281 18.5977L3.88055 18.5911L6.82024 16.0918H19.25C19.7044 16.0918 20.1461 15.917 20.4765 15.5966C20.8079 15.2752 21 14.8327 21 14.3645V2.72732C21 2.25913 20.8079 1.81656 20.4765 1.49515C20.1461 1.17476 19.7044 1 19.25 1H2.75C2.29561 1 1.85388 1.17476 1.5235 1.49515C1.19208 1.81655 1 2.25913 1 2.72732L0.999999 17.2738L1 17.2753C1.00051 17.6107 1.09986 17.9366 1.28304 18.2146C1.46599 18.4922 1.72391 18.7092 2.02316 18.844C2.32218 18.9787 2.65269 19.0272 2.97678 18.9854C3.30095 18.9436 3.60933 18.8126 3.86495 18.6041Z" stroke="#E3E3E3" strokeWidth="2" strokeLinecap="round" />
                                            <path d="M8 7.0918H14" stroke="#E3E3E3" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M8 10H14" stroke="#E3E3E3" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>

                                    </span>
                                </Link>
                            </div>
                            <div className=" md:mr-5 lg:mr-10 group">
                                <span>
                                    <svg className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9 18C9 18.7956 9.31607 19.5587 9.87868 20.1213C10.4413 20.6839 11.2044 21 12 21C12.7956 21 13.5587 20.6839 14.1213 20.1213C14.6839 19.5587 15 18.7956 15 18" stroke="#E3E3E3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M5.24939 9.75C5.24939 7.95979 5.96055 6.2429 7.22642 4.97703C8.49229 3.71116 10.2092 3 11.9994 3C13.7896 3 15.5065 3.71116 16.7724 4.97703C18.0382 6.2429 18.7494 7.95979 18.7494 9.75C18.7494 13.1081 19.5275 15.8063 20.1463 16.875C20.212 16.9888 20.2466 17.1179 20.2468 17.2493C20.2469 17.3808 20.2124 17.5099 20.1469 17.6239C20.0814 17.7378 19.9871 17.8325 19.8735 17.8985C19.7598 17.9645 19.6308 17.9995 19.4994 18H4.49939C4.36813 17.9992 4.23936 17.964 4.12598 17.8978C4.01259 17.8317 3.91855 17.7369 3.85326 17.6231C3.78797 17.5092 3.75371 17.3801 3.75391 17.2489C3.75411 17.1176 3.78876 16.9887 3.85439 16.875C4.47221 15.8063 5.24939 13.1072 5.24939 9.75Z" stroke="#E3E3E3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>

                                </span>
                                <div className=" flex justify-end">
<NotificationDropdown  />
</div>
                            </div>
                            {/* <p className="uppercase text-[#FFFFFF] text-[14px] lg:text-[16px] mr-2   lg:pt-[5px]">
                                {auth?.user?.first_name}
                            </p> */}
                            <div className="dropdown inline-block relative">
                                <button className="text-white rounded inline-flex items-center">

                                    <div className="mt-[6px]  rounded-full h-[24px] w-[24px]  lg:h-[32px] lg:w-[32px]   flex items-center justify-center">
                                        <img
                                            src={user?.dp?.small?.url}
                                            className="  h-[24px] w-[24px]  lg:h-[32px] lg:w-[32px] object-cover rounded-full "
                                        />
                                    </div>

                                    {/* <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <g
                                            opacity="0.6"
                                            clipPath="url(#clip0_2083_5172)"
                                        >
                                            <path
                                                opacity="0.4"
                                                d="M19.5 9L12 16.5L4.5 9H19.5Z"
                                                fill="white"
                                            />
                                            <path
                                                d="M19.5 9L12 16.5L4.5 9H19.5Z"
                                                stroke="white"
                                                strokeWidth="1.2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_2083_5172">
                                                <rect
                                                    width="24"
                                                    height="24"
                                                    fill="white"
                                                />
                                            </clipPath>
                                        </defs>
                                    </svg> */}
                                </button>

                                <div className="dropdown-menu   -ml-[6rem] hidden  z-10 absolute bg-[#1A1A1A] border-rounded-10  divide-y divide-gray-100 shadow w-[9.5rem]  ">
                                    <ul
                                        className="  text-sm text-black  "
                                        aria-labelledby="dropdownDefaultButton"
                                    >
                                        {/* <li className="  ">
                                                <p className="px-4 py-2  text-black bg-gray-100 rounded-t-[10px] fw-regular ">
                                                   {user?.full_name}  <br/>
                                         
                                                <span className="pt-2 fs-tiny">  Glitch id #  {user?.id} </span> 
                                                </p>
                                            </li> */}

                                        <Link href={route('profile.personal')} >
                                        <li className="  ">
                                                <p className="px-4 py-2  text-black bg-gray-100 rounded-t-[10px] fw-regular ">
                                                   {user?.full_name}  <br/>
                                         
                                                <span className="pt-2 fs-tiny">  Glitch id #  {user?.id} </span> 
                                                </p>
                                            </li>
                                            </Link>

                                        <Link href={route("profile")}>
                                        <li className=" ">
                                            <p className="border-y border-[#303030] px-4 py-2 text-white hover:text-black hover:bg-gray-100  fw-regular ">
                                                Bookmark
                                            </p>
                                        </li>
                                        </Link>

                                        <Link
                                            href={route("logout")}
                                            method="post"
                                        >
                                            <li className="">
                                                <p className="px-4 py-2 text-white hover:text-black hover:bg-gray-100 rounded-b-[10px] fw-regular ">
                                                    Logout
                                                </p>
                                            </li>{" "}
                                        </Link>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    </motion.div>
                    {/*<a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0 hidden md:block">*/}
                    {/*    <img src="./assets/images/nav-right.svg" className="h-[50px]" alt=""/>*/}
                    {/*</a>*/}

                    {/* <button className="block md:hidden py-3 rounded focus:outline-none group">
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
                    </button> */}



                    <div className="flex ">
                        {/* mobile  */}
                        <div className="dropdown mt-4 mx-2 inline-block relative md:hidden">
                            {/* <button className="text-white rounded inline-flex items-center">
                                {auth?.user?.dp?.small?.url ? (
                                    <div className="   rounded-full h-[24px] w-[24px]  lg:h-[32px] lg:w-[32px]   flex items-center justify-center">
                                        <img
                                            src={auth?.user?.dp?.small?.url}
                                            className="  h-[24px] w-[24px]  lg:h-[32px] lg:w-[32px] object-cover rounded-full "
                                        />
                                    </div>
                                ) : (
                                    <p className="rounded-full  h-[24px] w-[24px]  lg:h-[32px] lg:w-[32px]   flex items-center justify-center bg-white uppercase text-[#000] fs-regular-sm mr-2 pt-[5px]">
                                        {auth?.user?.first_name?.substring(
                                            0,
                                            1
                                        )}
                                    </p>
                                )}
                            </button> */}

                            <div className="dropdown-menu -ml-[4.5rem] hidden -mt-1 z-10 absolute bg-[#1A1A1A] inset-border divide-y divide-gray-100 shadow w-[7.5rem]  ">
                                <ul
                                    className="  text-sm text-black  "
                                    aria-labelledby="dropdownDefaultButton"
                                >
                                    <Link href={route("profile")}>
                                        {" "}
                                        <li className=" inset-border">
                                            <p className="px-4 py-2 text-white hover:text-black hover:bg-gray-100  fw-regular ">
                                                My Profile
                                            </p>
                                        </li>
                                    </Link>
                                    <li className=" inset-border">
                                        <p className="px-4 py-2 text-white hover:text-black hover:bg-gray-100  fw-regular ">
                                            Bookmark
                                        </p>
                                    </li>

                                    <Link
                                        href={route("logout")}
                                        method="post"
                                    >
                                        <li className="">
                                            <p className="px-4 py-2 text-white hover:text-black hover:bg-gray-100  fw-regular ">
                                                Logout
                                            </p>
                                        </li>{" "}
                                    </Link>
                                </ul>
                            </div>
                        </div>









                        {/* ${openMobileMenu && 'right-0' */}



                        <button  className="block md:hidden py-3 rounded focus:outline-none group">
                            <div onClick={()=>{setOpenMobileMenu(true)}}
                             className="font-[617] font-[pangramRegular] text-white text-xs">
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
                                            <rect
                                                width="32"
                                                height="32"
                                                fill="white"
                                            />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </div>

                            {/* <div
                                className="fixed -top-4  h-screen w-full bg-[#000000e0]     right-0
                 opacity-100 transition-all duration-300 z-[100]"
                            > */}









                            <div
                               className={` fixed -top-4  h-screen w-full bg-[#000000fa]   overflow-x-hidden overflow-y-auto   ${openMobileMenu ? 'right-0   fixed inset-0 z-40  ' : ' right-full  opacity-0' }
                 transition-all duration-300 z-[100] `}>





                                <ul className="flex flex-col text-left   w-full text-base cursor-pointer py-5">
                                    <li className="py-5 px-5">
                                        <div className="flex justify-between">
                                        <Link href={route("academy")} className="">
                                            <img
                                                src="../../assets/svg/logo.svg"
                                                className="h-[30px]"
                                                alt=""
                                            />
                                            </Link>
                                            <div onClick={()=>{setOpenMobileMenu(false)}}
                                                className="text-[1.25rem] fw-regular text-[#fff] flex items-center"
                                            >
                                                Close
                                                <span className="ml-2">
                                                <svg
                                                width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path opacity="0.2" d="M26 5H6C5.44772 5 5 5.44772 5 6V26C5 26.5523 5.44772 27 6 27H26C26.5523 27 27 26.5523 27 26V6C27 5.44772 26.5523 5 26 5Z" fill="#FAFAFA"/>
                                                <path d="M5.33301 5.33203L26.665 26.6641" stroke="#E0E0E0" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                                                <path d="M26.667 5.33203L5.33495 26.6641" stroke="#E0E0E0" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                                                </svg>

                                                </span>
                                            </div>
                                        </div>
                                    </li>
                                    {mobileMenu?.map((page , index)=>(
                                    <Link href={route(page?.path)} key={index+3} > <li onClick={()=>{setOpenMobileMenu(false)}} className="hover:bg-[#1a1a1a]  mt-[2rem]  w-full  text-center  fs-x-large fw-reguler  text-white">
                                       {page?.title}
                                    </li></Link>
                                    ))}
                                    <Link href={route("logout")}method="post" >
                                            <li className="hover:bg-gray-200   w-full mt-[1.5rem] text-center fs-x-large fw-regular  dangerColor">
                                      Logout
                                    </li>
                                    </Link>

                                    {/* <Link href={route('search.index')}>
                                    <li className="hover:bg-gray-200 pb-2 px-5 w-full text-5xl font-thin  text-white">
                                      Search
                                    </li>
                                    </Link> */}

                                </ul>
                            </div>
                        </button>
                    </div>
                </div>
            </nav>

        </div>
    );
};

export default Navbar;
