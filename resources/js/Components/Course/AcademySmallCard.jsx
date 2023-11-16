import { Link } from '@inertiajs/react'
import React from 'react'
import IconButton from '../IconButton'
import { ReactComponent as BookMark } from "../../../assets/svg/Bookmark.svg";
import LiveBadge from '../LiveBadge';
import Badge from '../Badge';
import { useState } from 'react';

const AcademySmallCard = ({ className = '', routeToPlay = '' , isLock='', isLockedIcon='', id = "", liveBadge, wasLiveBadge = '', live, upcomming, bookMark = "", badge, isProgressCard, videoProgress = "", instructor, user_id, desktop_image, mobile_image, title, handleBookmarkToggle, courses, category, ...props }) => {
    const [imageLoaded, setImageLoaded] = useState(false);

    return (
        <>
            <Link preserveScroll href={routeToPlay} className={isLock} >
                <div className={className + " large-card-hover-div bg-cover bg-center rounded-lg relative  "}
                // style={{ backgroundImage: `url(${image}) ` }}
                >
                    {/* <div className="academy-top-inst-img top-instructor-overlay absolute top-0 left-0 w-full"></div> */}
                    <img src={imageLoaded ? desktop_image?.original?.url : desktop_image?.original?.url} onLoad={() => setImageLoaded(true)} loading="lazy" className="  w-full hide-sm-img desktop " />
                    <img src={imageLoaded ? mobile_image?.original?.url : mobile_image?.original?.url} onLoad={() => setImageLoaded(true)} loading="lazy" className=" w-full hide-md-img mobile " />
                    <div className="card-overlay"></div>

                    {upcomming && <Badge className={badge}>upcomming</Badge>}
                    {wasLiveBadge && <Badge className={badge}>was live</Badge>}
                    {liveBadge &&
                        <LiveBadge LiveClass="absolute" />
                    }
                    {/* {isProgressCard && */}
                    {/* <Link href={routeToPlay} className='md:hidden block'>
                        <div className="absolute bottom-[3%] cursor-pointer z-[999]  md:bottom-[5%] left-3">
                            <svg
                                className='border-rounded-10 w-[40px] h-[40px] md:w-[50px]  md:h-[40px]  '
                                width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M26.318 0.114746C12.1829 0.114746 0.710938 11.5867 0.710938 25.7218C0.710938 39.8569 12.1829 51.3289 26.318 51.3289C40.4531 51.3289 51.9251 39.8569 51.9251 25.7218C51.9251 11.5867 40.4531 0.114746 26.318 0.114746ZM21.1966 34.6843V16.7593C21.1966 15.7094 22.4001 15.0949 23.2451 15.7351L35.2036 24.6975C35.895 25.2097 35.895 26.2339 35.2036 26.7461L23.2451 35.7086C22.4001 36.3487 21.1966 35.7342 21.1966 34.6843Z" fill="white" />
                            </svg>

                        </div>
                    </Link> */}
                    {/* } */}
                    {bookMark && (
                        <div onClick={() => { handleBookmarkToggle(id) }} className="absolute z-[9999] top-[2px] right-[2px] md:top-4 md:right-4">
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
                                                    <svg
                                                        className='w-4 md:w-6 h-4 md:h-6' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                    {isLockedIcon && <div className='absolute right-3 bottom-3 md:right-4 md:bottom-4'>

<svg className=' h-5 md:h-7 ' viewBox="0 0 70 92" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M61.0006 30.8333H56.6673V22.1667C56.6673 10.2067 46.9606 0.5 35.0006 0.5C23.0406 0.5 13.334 10.2067 13.334 22.1667V30.8333H9.00065C4.23398 30.8333 0.333984 34.7333 0.333984 39.5V82.8333C0.333984 87.6 4.23398 91.5 9.00065 91.5H61.0006C65.7673 91.5 69.6673 87.6 69.6673 82.8333V39.5C69.6673 34.7333 65.7673 30.8333 61.0006 30.8333ZM35.0006 69.8333C30.234 69.8333 26.334 65.9333 26.334 61.1667C26.334 56.4 30.234 52.5 35.0006 52.5C39.7673 52.5 43.6673 56.4 43.6673 61.1667C43.6673 65.9333 39.7673 69.8333 35.0006 69.8333ZM22.0006 30.8333V22.1667C22.0006 14.9733 27.8073 9.16667 35.0006 9.16667C42.194 9.16667 48.0006 14.9733 48.0006 22.1667V30.8333H22.0006Z" fill="white" />
</svg>

</div>
}
                    <div className={` progrss-bar  absolute  -mt-1   `}
                        style={{ width: videoProgress + '%' }} ></div>
                </div>

                {/* <div className='academy-new-shadow bottom -mt-[10rem] md:-mt-[16rem] static -z-[9999]'></div> */}
            </Link>
        </>
    )
}

export default AcademySmallCard
