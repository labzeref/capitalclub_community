import { Link } from '@inertiajs/react'
import React, { useEffect } from 'react'
import IconButton from '../IconButton'
import { ReactComponent as BookMark } from "../../../assets/svg/Bookmark.svg";
import placeholder from "../../../assets/svg/coursePlaceholder.svg";
import LiveBadge from '../LiveBadge';
import Badge from '../Badge';
import { useState } from 'react';

const AcademySmallCard = ({ className = '', routeToPlay = '', isLock = '', isLockedIcon = '', id = "", liveBadge, wasLiveBadge = '', live, upcomming, bookMark = "", badge, isProgressCard, videoProgress = "", instructor, user_id, desktop_image, mobile_image, title, handleBookmarkToggle, courses, category, ...props }) => {
    const [imageLoaded, setImageLoaded] = useState(false);

    useEffect(() => {
        const blurDivs = document.querySelectorAll(".blur-load");

        blurDivs.forEach((div) => {
            const img = div.querySelector("img");

            function loaded() {
                div.classList.add("loaded");
            }

            if (img.complete) {
                loaded();
            } else {
                img.addEventListener("load", loaded);
            }

            return () => {
                // Cleanup: Remove the event listener when the component unmounts
                img.removeEventListener("load", loaded);
            };
        });
    }, []);


    return (
        <>
            <Link preserveScroll href={routeToPlay} className={isLock} >
                <div className={className + " large-card-hover-div bg-cover bg-center rounded-lg relative  blur-load bg-img"}
                // style={{ backgroundImage: `url(${placeholder}) ` }}
                >

                    <img src={imageLoaded ? desktop_image?.original?.url : desktop_image?.original?.url} onLoad={() => setImageLoaded(true)} loading="lazy" className="  w-full hide-sm-img desktop " />
                    <img src={imageLoaded ? mobile_image?.original?.url : mobile_image?.original?.url} onLoad={() => setImageLoaded(true)} loading="lazy" className=" w-full hide-md-img mobile " />

                    <div className="card-overlay"></div>

                    {upcomming && <Badge className={badge}>upcomming</Badge>}
                    {wasLiveBadge && <Badge className={badge}>was live</Badge>}
                    {liveBadge &&
                        <LiveBadge LiveClass="absolute" />
                    }

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
                    {isLockedIcon && <div className='absolute right-3 bottom-3 md:right-4 md:bottom-4'>

                        <svg className=' h-5 md:h-7 ' viewBox="0 0 70 92" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M61.0006 30.8333H56.6673V22.1667C56.6673 10.2067 46.9606 0.5 35.0006 0.5C23.0406 0.5 13.334 10.2067 13.334 22.1667V30.8333H9.00065C4.23398 30.8333 0.333984 34.7333 0.333984 39.5V82.8333C0.333984 87.6 4.23398 91.5 9.00065 91.5H61.0006C65.7673 91.5 69.6673 87.6 69.6673 82.8333V39.5C69.6673 34.7333 65.7673 30.8333 61.0006 30.8333ZM35.0006 69.8333C30.234 69.8333 26.334 65.9333 26.334 61.1667C26.334 56.4 30.234 52.5 35.0006 52.5C39.7673 52.5 43.6673 56.4 43.6673 61.1667C43.6673 65.9333 39.7673 69.8333 35.0006 69.8333ZM22.0006 30.8333V22.1667C22.0006 14.9733 27.8073 9.16667 35.0006 9.16667C42.194 9.16667 48.0006 14.9733 48.0006 22.1667V30.8333H22.0006Z" fill="white" />
                        </svg>

                    </div>
                    }
                    <div className={` progrss-bar  absolute  -mt-1   `}
                        style={{ width: videoProgress + '%' }} ></div>
                </div>
            </Link>
        </>
    )
}

export default AcademySmallCard
