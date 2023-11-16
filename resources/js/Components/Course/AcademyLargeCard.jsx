import { Link } from '@inertiajs/react'
import React from 'react'
import LiveBadge from '../LiveBadge'
import Badge from '../Badge'
import { useState } from 'react'

const AcademyLargeCard = ({ className = '', upcomming, live, badge, instructor, user_id, desktop_image, mobile_image, title, courses, routeToPlay = '', isLock = '', isLockedIcon = '', category, ...props }) => {
    const [imageLoaded, setImageLoaded] = useState(false);


    return (
        <div>
            {
                routeToPlay
                    ?
                    <Link preserveScroll href={routeToPlay} className={isLock} >
                        <div className={className + "coming-soon-linear  large-card-hover-div   relative  "}  >
                            {/* <div className="academy-top-inst-img top-instructor-overlay absolute top-0 left-0 w-full"></div> */}
                            <img src={imageLoaded ? desktop_image?.original?.url : desktop_image?.original?.url} onLoad={() => setImageLoaded(true)} loading="lazy" className="h-100 w-100 hide-sm-img header-image input-shadow" />
                            <img src={imageLoaded ? mobile_image?.original?.url : mobile_image?.original?.url} onLoad={() => setImageLoaded(true)} loading="lazy" className="h-100 w-100 hide-md-img header-image input-shadow" />
                            {upcomming ?
                                <Badge className={badge}>upcomming</Badge>
                                :
                                live &&
                                <LiveBadge LiveClass="absolute" />

                            }
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
                                            {/* <p className="fs-medium fw-regular">{category}</p> */}
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


                        </div>
                        {/* <div className='academy-new-shadow bottom -mt-[10rem]  md:-mt-[15rem] lg:-mt-[14rem] static -z-[9999]'></div> */}
                    </Link>
                    :
                    <div href={routeToPlay}>
                        <div className={className + "  large-card-hover-div   relative  "}  >
                            {/* <div className="academy-top-inst-img top-instructor-overlay absolute top-0 left-0 w-full"></div> */}
                            <img src={imageLoaded ? desktop_image?.original?.url : desktop_image?.original?.url} onLoad={() => setImageLoaded(true)} loading="lazy" className="h-100 w-100 hide-sm-img header-image input-shadow" />
                            <img src={imageLoaded ? mobile_image?.original?.url : mobile_image?.original?.url} onLoad={() => setImageLoaded(true)} loading="lazy" className="h-100 w-100 hide-md-img header-image input-shadow" />
                            {upcomming ?
                                <Badge className={badge}>upcomming</Badge>
                                :
                                live &&
                                <LiveBadge LiveClass="absolute" />

                            }
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
                                            {/* <p className="fs-medium fw-regular">{category}</p> */}
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        {/* <div className='academy-new-shadow bottom -mt-[10rem]  md:-mt-[15rem] lg:-mt-[14rem] static -z-[9999]'></div> */}
                    </div>
            }
        </div>
    )
}

export default AcademyLargeCard
