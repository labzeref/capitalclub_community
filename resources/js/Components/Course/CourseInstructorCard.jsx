import React, { useEffect, useState, useMemo } from "react";
import headerImage from "../../../assets/img/header.jpg";
import Badge from "@/Components/Badge.jsx";
import top1 from "../../../assets/img/top1.png";
import { Link } from "@inertiajs/react";

export default function CourseInstructorCard({ className = '', user_id, image, title, courses, category, ...props }) {

    return (
        <Link href={route('instructors.show', user_id)}>
            <div className={className + "  academy-top-inst-img bg-cover bg-center rounded-lg p-4"} style={{ backgroundImage: `url(${image}) ` }}>
                {/* <div className="academy-top-inst-img top-instructor-overlay absolute top-0 left-0 w-full"></div> */}
                <div className="h-[370px] md:h-[430px] flex flex-col justify-between">
                    <div className="  flex item-center z-50">
                        <span className="mr-[10px]">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd"
                                    d="M3 21H12H21C21.55 21 22 20.55 22 20V4C22 3.45 21.55 3 21 3H12H3C2.45 3 2 3.45 2 4V20C2 20.55 2.45 21 3 21Z"
                                    fill="white" fillOpacity="0.2" />
                                <path d="M4 12H10" stroke="white" strokeWidth="1.2" strokeMiterlimit="10" />
                                <path d="M4 8H10" stroke="white" strokeWidth="1.2" strokeMiterlimit="10" />
                                <path d="M4 16H10" stroke="white" strokeWidth="1.2" strokeMiterlimit="10" />
                                <path d="M14 12H20" stroke="white" strokeWidth="1.2" strokeMiterlimit="10" />
                                <path d="M14 8H20" stroke="white" strokeWidth="1.2" strokeMiterlimit="10" />
                            </svg>
                        </span>
                        <p>{courses} {courses > 1 ? 'Courses ': 'course' }</p>
                    </div>
                    <div className="z-50">
                        <h3 className="mb-1">{title}</h3>
                        <p className="fs-medium fw-regular">{category}</p>
                    </div>
                </div>
            </div>
        </Link>
    );
}
