import React from "react";
import { Link } from "@inertiajs/react";
import Badge from "@/Components/Badge.jsx";

import Button from "../../Components/Button";

import { ReactComponent as BookMark } from "../../../assets/svg/Bookmark.svg";
import IconButton from "../IconButton";

const ProgressCard = ({
    className = "",
    image,
    badge = "",
    badge_text,
    title,
    lessons,
    duration,
    instructor,
    videoProgress,
    bookMark,
    id,
    handleBookmarkToggle,
    ...props
}) => {
    return (
        <div className={className}>
            {/* <Link
        href={
            window._base_url +
            "/academy/course"
        }
    >  */}
            <div className="progress-card ">
                <div className="relative">
                    <img
                        className="rounded-lg mb-7 card-img"
                        src={`${image}`}
                        alt=""
                    />
                    <div
                        className={`bg-[#FF6666] h-[1px] -mt-[28px]  `}
                        style={{ width: videoProgress + '%' }} ></div>
                    {bookMark && (
                        <div onClick={() => { handleBookmarkToggle(id) }} className="absolute top-4 right-4">
                            {" "}
                            <IconButton
                                icon={<BookMark />}
                                className={
                                    "secondary noise-10 bg-[#ffffff10]  icon_button absolute top-0 right-2"
                                }
                            ></IconButton>
                        </div>
                    )}
                    <div className="absolute top-[5.3rem] left-[7.5rem] ">
                        <svg
                            width="60"
                            height="44"
                            viewBox="0 0 60 44"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <rect
                                width="60"
                                height="44"
                                fill="black"
                                fillOpacity="0.5"
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
                    </div>
                </div>

                <div className="flex items-center gap-8 pb-3 pt-7">
                    <p className=" fw-regular  flex item-center">
                        <span className="mr-[10px]">
                            <svg
                                width="24"
                                height="24"
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
                        <span className="opacity-60">{duration}</span>
                    </p>
                    <p className=" fw-regular flex item-center">
                        <span className="mr-[10px]">
                            <svg
                                width="24"
                                height="24"
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
                        <span className="opacity-60">{lessons} Lessons</span>
                    </p>
                </div>
                <h5 className="   ">{title}</h5>
                <p className="fs-medium fw-regular">{instructor}</p>
            </div>
            {/* </Link> */}
        </div>
    );
};

export default ProgressCard;
