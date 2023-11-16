import React, { useEffect, useState, useMemo } from "react";
import headerImage from "../../../assets/img/header.jpg";
import Badge from "@/Components/Badge.jsx";
import { Link } from "@inertiajs/react";
import LiveBadge from "../LiveBadge";

export default function LiveInfoCard({
    className = "",
    image,
    badge = "",
    title,
    session,
    remaining,
    live,
    ...props
}) {
    const badge_text = "upcoming";
    return (
        <div className={className}>
            <Link href={window._base_url + "/academy/course"}>
                {" "}
                <div className="course-card">
                    <img
                        className="rounded-lg mb-7 card-img"
                        src={`${image}`}
                        alt=""
                    />
                    {live ? (
                        <LiveBadge LiveClass="absolute" />
                    ) : (
                        <Badge className={badge}>{badge_text}</Badge>
                    )}
                    <div className="flex items-center   mb-4">
                        <p className="regular text-[#FFFFFF] font-normal flex item-center">
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
                            {live ? (
                                <p className="danger-color  ">Live</p>
                            ) : (
                                <span className="opacity-60">{remaining} min </span>
                            )}
                        </p>
                    </div>
                    <p className="fs-x-large fw-medium  capitalize">{title}</p>
                    <p className="fs-medium fw-regular">Session {session}</p>
                </div>{" "}
            </Link>
        </div>
    );
}
