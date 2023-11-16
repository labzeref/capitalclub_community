import React, { useEffect, useState, useMemo } from "react";
import headerImage from "../../../assets/img/header.jpg";
import Badge from "@/Components/Badge.jsx";
import { Link } from "@inertiajs/react";
import LiveBadge from "../LiveBadge";

export default function CourseFeaturedCard({
    className = "",
    image,
    badge = "",
    badge_text = "",
    title,
    lessons,
    duration,
    instructor,
    live,
    ...props
}) {
    return (
        <div className={className}>
            {" "}
            <div className="course-card featured">
                <img
                    className="rounded-lg mb-7 academy-featured-img"
                    src={`${image}`}
                    alt=""
                />
                {!badge_text == "" && (
                    <Badge className={badge}>{badge_text}</Badge>
                )}
                {live && <LiveBadge LiveClass="absolute" />}
                <div className="flex items-center gap-8 mb-4">
                    {live ? (
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

                            <p className="danger-color px-2 "> Live</p>
                        </div>
                    ) : (
                        <div className="flex">
                            {" "}
                            <div className=" mr-[10px]  flex item-center">
                                <span className="mr-[10px]  ">
                                    <svg
                                        className="w-5 md:w-6 h-5 md:h-6"
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
                                <span className=" px-1 opacity-60">
                                    {duration}
                                </span>
                            </div>
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

                                <span className=" px-1 opacity-60">
                                    {lessons} Lessons
                                </span>
                            </div>
                        </div>
                    )}
                </div>

                <h2 className="uppercase">{title}</h2>
                <p className=" text-[18px] md:text-[24px]   fw-regular">{instructor}</p>
            </div>{" "}
        </div>
    );
}
