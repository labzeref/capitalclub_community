import { Link } from '@inertiajs/react'
import React from 'react'
import LiveBadge from '../LiveBadge'
import Badge from '../Badge'
import { useState } from 'react'
import { useEffect } from 'react'

import placeholderImg from '../../../scss/components/coursePlaceholder.svg'
import PlayIcon from '../PlayIcon'
import { AsyncImage } from "loadable-image";
import { Blur } from "transitions-kit";

const AcademyLargeCard = ({ className = '', lazyLoad = false, isMoneyTalkBanner = false, lessonProgress = 0, upcomming, live, badge, instructor, user_id, desktop_image, mobile_image, title, courses, routeToPlay = '', isLock = '', isLockedIcon = '', category, ...props }) => {


    return (
        <div>
            {
                routeToPlay
                    ?
                    <Link preserveScroll href={routeToPlay} className={isLock} >
                        <div className={className + "coming-soon-linear  large-card-hover-div object-cover  relative   "}  >

                            <div className="hidden md:flex w-100" style={{ height: "auto", width: "100%" }}>
                                {!lazyLoad ?
                                    <AsyncImage
                                        src={desktop_image?.original?.url}
                                        className={'w-100 header-image border-rounded-10'}
                                        style={{ height: "auto", width: "100%", aspectRatio: 768 / 317, objectFit: "contain" }}
                                        // Transition={props => <Blur radius={10} {...props}/>}
                                        loader={<div style={{ background: '#1A1A1A' }} />}
                                        error={<div style={{ background: '#1A1A1A' }} />} />
                                    :
                                    <img src={desktop_image?.original?.url} className={'w-100 header-image border-rounded-10'} />
                                }
                            </div>
                            <div className="flex md:hidden w-100" style={{ height: "auto", width: "100%" }}>
                                {!lazyLoad ?
                                    <AsyncImage
                                        src={mobile_image?.original?.url}
                                        className="h-100 w-100 header-image border-rounded-10"
                                        style={{ width: "100%", height: "auto", aspectRatio: 343 / 432 }}
                                        // Transition={props => <Blur radius={10} {...props}/>}
                                        loader={<div style={{ background: '#1A1A1A' }} />}
                                        error={<div style={{ background: '#1A1A1A' }} />} /> :
                                    <img src={mobile_image?.original?.url} className="h-100 w-100 header-image border-rounded-10" />}
                            </div>

                            {upcomming ?
                                <Badge className={badge}>upcomming</Badge>
                                :
                                live &&
                                <LiveBadge LiveClass="absolute" />

                            }


                            {/*{isMoneyTalkBanner &&*/}
                            {/*    <div className='position-XY-center absolute'>*/}
                            {/*        <svg width="92" height="92" viewBox="0 0 92 92" fill="none" xmlns="http://www.w3.org/2000/svg">*/}
                            {/*            <path d="M40.4974 63.8751L61.9016 47.8334C63.1391 46.9167 63.1391 45.0834 61.9016 44.1668L40.4974 28.1251C38.9849 26.9792 36.8307 28.0792 36.8307 29.9584V62.0418C36.8307 63.9209 38.9849 65.0209 40.4974 63.8751ZM45.9974 0.166748C20.6974 0.166748 0.164062 20.7001 0.164062 46.0001C0.164062 71.3001 20.6974 91.8334 45.9974 91.8334C71.2974 91.8334 91.8307 71.3001 91.8307 46.0001C91.8307 20.7001 71.2974 0.166748 45.9974 0.166748ZM45.9974 82.6667C25.7849 82.6667 9.33073 66.2126 9.33073 46.0001C9.33073 25.7876 25.7849 9.33342 45.9974 9.33342C66.2099 9.33342 82.6641 25.7876 82.6641 46.0001C82.6641 66.2126 66.2099 82.6667 45.9974 82.6667Z" fill="white" />*/}
                            {/*        </svg>*/}

                            {/*    </div>*/}
                            {/*}*/}


                            <div className='hidden'>
                                <div className='  w-full h-full flex justify-center items-end'>
                                    <div className="info-div">
                                        <h2 className="mb-1 static z-[99]">{title}</h2>
                                        <div className=" large-card-detail-info z-50">

                                            <h3 className="mb-1 static z-[99] " >{instructor}</h3>
                                            <div className=''>
                                                <div className="flex justify-center  ">
                                                    {" "}
                                                    {live ?
                                                        <div className="flex">
                                                            <svg
                                                                className="w-5 md:w-6 h-5 md:h-6"
                                                                viewBox="0 0 24 24"
                                                                fill="none"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <g opacity="0.6">
                                                                    <path
                                                                        d="M18 20.001H6"
                                                                        stroke="white"
                                                                        strokeOpacity="0.6"
                                                                        strokeWidth="1.2"
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                    />
                                                                    <path
                                                                        opacity="0.4"
                                                                        d="M22 3.99902H2V15.999H22V3.99902Z"
                                                                        fill="white"
                                                                        stroke="white"
                                                                        strokeOpacity="0.6"
                                                                        strokeWidth="1.2"
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                    />
                                                                    <path
                                                                        d="M22 3.99902H2V15.999H22V3.99902Z"
                                                                        stroke="white"
                                                                        strokeWidth="1.2"
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                    />
                                                                </g>
                                                            </svg>

                                                            <p className="text-[#B72E2E] px-2 "> Live</p>
                                                        </div>
                                                        :
                                                        <div className="    flex item-center">
                                                            <span className="  lg:mr-[10px]  ">
                                                                <svg
                                                                    className="w-4 md:w-6 h-4 md:h-6"
                                                                    viewBox="0 0 24 24"
                                                                    fill="none"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                >
                                                                    <path
                                                                        d="M18 20H6"
                                                                        stroke="white"
                                                                        strokeOpacity="0.6"
                                                                        strokeWidth="1.2"
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                    />
                                                                    <path
                                                                        d="M22 4H2V16H22V4Z"
                                                                        fill="white"
                                                                        fillOpacity="0.2"
                                                                        stroke="white"
                                                                        strokeOpacity="0.6"
                                                                        strokeWidth="1.2"
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                    />
                                                                </svg>
                                                            </span>
                                                            <span className=" text-[#B72E2E] px-1  ">
                                                                {12} hours
                                                            </span>
                                                        </div>
                                                    }
                                                    {!live &&
                                                        <div className=" flex item-center">
                                                            <span className="mr-[10px]  ">
                                                                <svg
                                                                    className="w-5 md:w-6 h-5 md:h-6"
                                                                    viewBox="0 0 24 24"
                                                                    fill="none"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                >
                                                                    <path
                                                                        fillRule="evenodd"
                                                                        clipRule="evenodd"
                                                                        d="M3 21H12H21C21.55 21 22 20.55 22 20V4C22 3.45 21.55 3 21 3H12H3C2.45 3 2 3.45 2 4V20C2 20.55 2.45 21 3 21Z"
                                                                        fill="white"
                                                                        fillOpacity="0.2"
                                                                    />
                                                                    <path
                                                                        d="M4 12H10"
                                                                        stroke="white"
                                                                        strokeOpacity="0.6"
                                                                        strokeWidth="1.2"
                                                                        strokeMiterlimit="10"
                                                                    />
                                                                    <path
                                                                        d="M4 8H10"
                                                                        stroke="white"
                                                                        strokeOpacity="0.6"
                                                                        strokeWidth="1.2"
                                                                        strokeMiterlimit="10"
                                                                    />
                                                                    <path
                                                                        d="M4 16H10"
                                                                        stroke="white"
                                                                        strokeOpacity="0.6"
                                                                        strokeWidth="1.2"
                                                                        strokeMiterlimit="10"
                                                                    />
                                                                    <path
                                                                        d="M14 12H20"
                                                                        stroke="white"
                                                                        strokeOpacity="0.6"
                                                                        strokeWidth="1.2"
                                                                        strokeMiterlimit="10"
                                                                    />
                                                                    <path
                                                                        d="M14 8H20"
                                                                        stroke="white"
                                                                        strokeOpacity="0.6"
                                                                        strokeWidth="1.2"
                                                                        strokeMiterlimit="10"
                                                                    />
                                                                </svg>
                                                            </span>

                                                            <span className=" px-1  ">
                                                                {12} Lessons
                                                            </span>
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            {isLockedIcon && <div className='absolute right-3 bottom-3 md:right-4 md:bottom-4'>

                                <svg className=' h-5 md:h-7 ' viewBox="0 0 70 92" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M61.0006 30.8333H56.6673V22.1667C56.6673 10.2067 46.9606 0.5 35.0006 0.5C23.0406 0.5 13.334 10.2067 13.334 22.1667V30.8333H9.00065C4.23398 30.8333 0.333984 34.7333 0.333984 39.5V82.8333C0.333984 87.6 4.23398 91.5 9.00065 91.5H61.0006C65.7673 91.5 69.6673 87.6 69.6673 82.8333V39.5C69.6673 34.7333 65.7673 30.8333 61.0006 30.8333ZM35.0006 69.8333C30.234 69.8333 26.334 65.9333 26.334 61.1667C26.334 56.4 30.234 52.5 35.0006 52.5C39.7673 52.5 43.6673 56.4 43.6673 61.1667C43.6673 65.9333 39.7673 69.8333 35.0006 69.8333ZM22.0006 30.8333V22.1667C22.0006 14.9733 27.8073 9.16667 35.0006 9.16667C42.194 9.16667 48.0006 14.9733 48.0006 22.1667V30.8333H22.0006Z" fill="white" />
                                </svg>

                            </div>
                            }
                            {/* **** Lesson progress bar ****   */}

                            {lessonProgress > 0 && <div className="w-[130%] h-[10px] bg-[#1a1a1a] bottom-0 absolute">

                                <div style={{ width: lessonProgress + '%' }} className={`h-[10px] bg-[#ffffff]    `}></div>
                            </div>
                            }



                        </div>
                    </Link>

                    :

                    <div href={routeToPlay}>
                        <div className={className + "  large-card-hover-div   relative  "}  >
                            {/* <div className="academy-top-inst-img top-instructor-overlay absolute top-0 left-0 w-full"></div> */}
                            <img
                                // data-src={desktop_image?.original?.url}
                                src={desktop_image?.original?.url} className="h-[100%] w-full hide-sm-img header-image input-shadow" />
                            <img
                                // data-src={desktop_image?.original?.url}
                                src={desktop_image?.original?.url} className="h-[100%] w-full hide-md-img header-image input-shadow" />
                            {upcomming ?
                                <Badge className={badge}>upcomming</Badge>
                                :
                                live &&
                                <LiveBadge LiveClass="absolute" />

                            }
                        </div>
                        {/* <div className='academy-new-shadow bottom -mt-[10rem]  md:-mt-[15rem] lg:-mt-[14rem] static -z-[9999]'></div> */}
                    </div>
            }
        </div>
    )
}

export default AcademyLargeCard
