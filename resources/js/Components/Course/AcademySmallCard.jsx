import { Link } from '@inertiajs/react'
import React from 'react'
import IconButton from '../IconButton'
import { ReactComponent as BookMark } from "../../../assets/svg/Bookmark.svg";
import LiveBadge from '../LiveBadge';
import Badge from '../Badge';
import { useState } from 'react';

const AcademySmallCard = ({ className = '', id = "", liveBadge, live, upcomming, bookMark = "", badge, isProgressCard, videoProgress = "", instructor, user_id, medium_image, original_image, title, handleBookmarkToggle, courses, category, ...props }) => {
    const [imageLoaded, setImageLoaded] = useState(false);

    return (
        <>
            {/* <Link href={route('instructors.show', user_id)}> */}
            <div className={className + " large-card-hover-div bg-cover bg-center rounded-lg relative  "}
            // style={{ backgroundImage: `url(${image}) ` }}
            >
                {/* <div className="academy-top-inst-img top-instructor-overlay absolute top-0 left-0 w-full"></div> */}
                <img src={imageLoaded ? original_image : medium_image} onLoad={() => setImageLoaded(true)} className="  w-full  " />
                <div className="card-overlay"></div>
                {/* {live && } */}
                {upcomming && <Badge className={badge}>upcomming</Badge>}
                {liveBadge &&
                    <LiveBadge LiveClass="absolute" />

                }
                {isProgressCard &&
                    <div className="absolute top-[3%] cursor-pointer  md:top-[5%] left-[8px] ">
                        <svg
                            className='border-rounded-10 w-[40px] md:w-[50px] h-[30px] md:h-[40px]  '

                            width="50"
                            height="40"
                            viewBox="0 0 60 44"
                            fill="black"
                            fillOpacity="0.6"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <rect
                                width="60"
                                height="44"
                                fill="white"
                                fillOpacity="0.6"
                            />
                            <g clipPath="url(#clip0_1107_76186)">
                                <path
                                    opacity="0.2"
                                    d="M25.625 15.1173V28.886C25.627 28.9959 25.658 29.1033 25.7148 29.1974C25.7716 29.2915 25.8522 29.3689 25.9484 29.4219C26.0447 29.4749 26.1532 29.5016 26.2631 29.4993C26.373 29.497 26.4803 29.4657 26.5742 29.4087L37.8305 22.5243C37.9204 22.4699 37.9947 22.3932 38.0463 22.3017C38.0979 22.2101 38.1251 22.1068 38.1251 22.0017C38.1251 21.8966 38.0979 21.7933 38.0463 21.7017C37.9947 21.6101 37.9204 21.5334 37.8305 21.479L26.5742 14.5946C26.4803 14.5376 26.373 14.5064 26.2631 14.504C26.1532 14.5017 26.0447 14.5284 25.9484 14.5814C25.8522 14.6344 25.7716 14.7119 25.7148 14.806C25.658 14.9 25.627 15.0074 25.625 15.1173Z"
                                    fill="white"
                                />
                                <path
                                    d="M25.625 15.1173V28.886C25.627 28.9959 25.658 29.1033 25.7148 29.1974C25.7716 29.2915 25.8522 29.3689 25.9484 29.4219C26.0447 29.4749 26.1532 29.5016 26.2631 29.4993C26.373 29.497 26.4803 29.4657 26.5742 29.4087L37.8305 22.5243C37.9204 22.4699 37.9947 22.3932 38.0463 22.3017C38.0979 22.2101 38.1251 22.1068 38.1251 22.0017C38.1251 21.8966 38.0979 21.7933 38.0463 21.7017C37.9947 21.6101 37.9204 21.5334 37.8305 21.479L26.5742 14.5946C26.4803 14.5376 26.373 14.5064 26.2631 14.504C26.1532 14.5017 26.0447 14.5284 25.9484 14.5814C25.8522 14.6344 25.7716 14.7119 25.7148 14.806C25.658 14.9 25.627 15.0074 25.625 15.1173Z"
                                    stroke="white"
                                    strokeWidth="1.2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </g>
                            <defs>
                                <clipPath id="clip0_1107_76186">
                                    <rect
                                        width="20"
                                        height="20"
                                        fill="white"
                                        transform="translate(20 12)"
                                    />
                                </clipPath>
                            </defs>
                        </svg>
                    </div>}
                {bookMark && (
                    <div onClick={() => { handleBookmarkToggle(id) }} className="absolute  top-[2px] right-[2px] md:top-4 md:right-4">
                        {" "}
                        <IconButton
                            icon={<BookMark />}
                            className={
                                " primary   icon_button absolute top-0 right-2"
                            }
                        ></IconButton>
                    </div>
                )}
                <div className='hidden'>
                <div className=' w-full h-[1px] flex justify-center items-end'>
                    <div className=" mb-[22px] info-div static z-[99]">
                        <h2 className=" px-2 ">{title}</h2>
                        <div className=" large-card-detail-info z-50  ">

                            <h3 className="mb-1   " >{instructor}</h3>
                            <div className=''>
                                <div className="flex justify-center lg:gap-x-6 ">

                                    {live ?
                                        <div className="flex">
                                            <svg className='w-4 md:w-6 h-4 md:h-6' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M18 20H6" stroke="#E0E0E0" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M22 4H2V16H22V4Z" fill="white" fillOpacity="0.2" stroke="#E0E0E0" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            <p className="text-[#B72E2E] px-2 "> Live</p>
                                        </div>
                                        :
                                        <div className="    flex item-center">
                                            <span className="  lg:mr-[10px]  ">
                                                <svg className='w-4 md:w-6 h-4 md:h-6' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M18 20H6" stroke="#E0E0E0" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M22 4H2V16H22V4Z" fill="white" fillOpacity="0.2" stroke="#E0E0E0" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>


                                            </span>
                                            <span className=" text-[#B72E2E] px-1  ">
                                                {12} hours
                                            </span>
                                        </div>
                                    }
                                    {!live && <div className=" flex item-center">
                                        <span className="   lg:mr-[10px]  ">
                                            <svg className='w-4 md:w-6 h-4 md:h-6' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M3 21H12H21C21.55 21 22 20.55 22 20V4C22 3.45 21.55 3 21 3H12H3C2.45 3 2 3.45 2 4V20C2 20.55 2.45 21 3 21Z" fill="white" fillOpacity="0.2" />
                                                <path d="M4 12H10" stroke="#E0E0E0" strokeWidth="1.2" strokeMiterlimit="10" />
                                                <path d="M4 8H10" stroke="#E0E0E0" strokeWidth="1.2" strokeMiterlimit="10" />
                                                <path d="M4 16H10" stroke="#E0E0E0" strokeWidth="1.2" strokeMiterlimit="10" />
                                                <path d="M14 12H20" stroke="#E0E0E0" strokeWidth="1.2" strokeMiterlimit="10" />
                                                <path d="M14 8H20" stroke="#E0E0E0" strokeWidth="1.2" strokeMiterlimit="10" />
                                            </svg>


                                        </span>

                                        <span className="static z-[9999] px-1  ">
                                            {12} Lessons
                                        </span>
                                    </div>}
                                </div>
                            </div>
                            <p className="fs-medium fw-regular">{category}</p>
                        </div>
                    </div>

                </div>
                </div>
                <div className={` progrss-bar  absolute  -mt-1   `}
                    style={{ width: videoProgress + '%' }} ></div>
            </div>

            <div className='academy-new-shadow bottom -mt-[10rem] md:-mt-[16rem] static -z-[9999]'></div>
            {/* </Link> */}
        </>
    )
}

export default AcademySmallCard
