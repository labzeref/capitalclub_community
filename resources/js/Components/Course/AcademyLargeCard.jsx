import { Link } from '@inertiajs/react'
import React from 'react'
import LiveBadge from '../LiveBadge'
import Badge from '../Badge'
import { useState } from 'react'

const AcademyLargeCard = ({ className = '', upcomming, live ,badge, instructor, user_id, medium_image , original_image, title, courses, category, ...props }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    return (
        <div>
            {/* <Link href={route('instructors.show', user_id)}> */}
            <div className={className + "  large-card-hover-div  bg-cover bg-center relative rounded-lg p-4"}  >
                {/* <div className="academy-top-inst-img top-instructor-overlay absolute top-0 left-0 w-full"></div> */}
                <img src={ imageLoaded ?  original_image : medium_image }  onLoad={() => setImageLoaded(true)} className="h-100 w-100 header-image" />
                {upcomming ?   
                    <Badge className={badge }>upcomming</Badge>
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
            <div className='academy-new-shadow bottom -mt-[10rem]  md:-mt-[15rem] lg:-mt-[14rem] static -z-[9999]'></div>
            {/* </Link> */}
        </div>
    )
}

export default AcademyLargeCard
