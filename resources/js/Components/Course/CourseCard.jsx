import React, { useEffect, useState, useMemo } from "react";
import headerImage from "../../../assets/img/header.jpg";
import Badge from "@/Components/Badge.jsx";
import { Link } from "@inertiajs/react";

export default function CourseCard({ className = '', image, badge = '',badge_text,title,lessons,duration,instructor, ...props }) {

    return (
        <div className={className}>
         <div className="course-card">
                <img className="rounded-lg mb-7 card-img" src={`${image}`} alt=""/>
               {typeof badge_text==='string' && badge_text.length !==0 &&  <Badge className={badge}>{badge_text}</Badge>}
                <div className="flex items-center mb-4">
                    <div className="   flex item-center">
                                <span className="mr-[10px] mt-1 md:mt-0">
                                    <svg className="w-[14px] h-[12px] md:w-6 md:h-6 " viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M18 20H6" stroke="white" strokeOpacity="0.6" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M22 4H2V16H22V4Z" fill="white" fillOpacity="0.2" stroke="white" strokeOpacity="0.6" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </span>
                        <span className="opacity-60 fw-regular text-[12px] md:text-[16px] uppercase">{duration}</span>
                    </div>
                    <div className="  text-[#FFFFFF]   flex item-center ml-8">
                                <span className="mr-[10px] mt-1 md:mt-0">
                                    <svg className="w-[14px] h-[12px] md:w-6 md:h-6 " viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M3 21H12H21C21.55 21 22 20.55 22 20V4C22 3.45 21.55 3 21 3H12H3C2.45 3 2 3.45 2 4V20C2 20.55 2.45 21 3 21Z" fill="white" fillOpacity="0.2"/>
                                        <path d="M4 12H10" stroke="white" strokeOpacity="0.6" strokeWidth="1.2" strokeMiterlimit="10"/>
                                        <path d="M4 8H10" stroke="white" strokeOpacity="0.6" strokeWidth="1.2" strokeMiterlimit="10"/>
                                        <path d="M4 16H10" stroke="white" strokeOpacity="0.6" strokeWidth="1.2" strokeMiterlimit="10"/>
                                        <path d="M14 12H20" stroke="white" strokeOpacity="0.6" strokeWidth="1.2" strokeMiterlimit="10"/>
                                        <path d="M14 8H20" stroke="white" strokeOpacity="0.6" strokeWidth="1.2" strokeMiterlimit="10"/>
                                    </svg>
                                </span>
                        <span className="opacity-60 fw-regular text-[12px] md:text-[16px] uppercase">{lessons} Lessons</span>
                    </div>
                </div>
                <p className="  course-card-title">{title}</p>
                <p className="course-card-instructor">{instructor}</p>
            </div>
        </div>
    );
}
