import React, { useState } from "react";
import inst1 from "../../../assets/img/inst1.jpg";
import inst2 from "../../../assets/img/inst2.jpg";
import inst3 from "../../../assets/img/inst3.jpg";
import marketplaceMain from "../../../assets/img/marketplace-main.jpg";
import Layout from "@/Layouts/Layout";

import { ReactComponent as Plus } from "../../../assets/svg/Plus.svg";
import Button from "../../Components/Button";
import OwlCarousel from "react-owl-carousel";

import { ReactComponent as WatchSvg } from "../../../assets/svg/watch.svg";
import { ReactComponent as ArrowRight } from "../../../assets/svg/ArrowRight.svg";
import { ReactComponent as ArrowLeft } from "../../../assets/svg/ArrowLeft.svg";

// top instructor
import top1 from "../../../assets/img/top1.jpg";
import top2 from "../../../assets/img/top2.jpg";
import top3 from "../../../assets/img/top3.jpg";
import top4 from "../../../assets/img/top4.jpg";
import top5 from "../../../assets/img/top5.jpg";
import CourseInstructorCard from "@/Components/Course/CourseInstructorCard";
import { Link } from "@inertiajs/react";
import AcademySmallCard from "@/Components/Course/AcademySmallCard";
const Instructor = ({ instructor, relatedInstructors, courses }) => {
    console.log("instructor");
    console.log(instructor);
    console.log("relatedInstructors");
    console.log(relatedInstructors);
    console.log("courses");
    console.log(courses);
    const [imageLoaded, setImageLoaded] = useState(false);
    return (
        <div className="pt-[4rem]">
            <section className="   paddingSectionSmall">
                <div data-aos="fade-in" data-aos-delay="100" data-aos-easing="ease" data-aos-duration="300" className="container mx-auto px-5 xl:px-0">
                    <div className="grid grid-cols-12 gap-y-14 md:gap-x-14 lg:gap-x-20 flex justify-center items-center">
                        <div className="col-span-12 md:col-span-6 order-2 md:order-1"  >
                            <div 
                            // style={{ backgroundImage: `url(${instructor?.dp?.original?.url}) ` }} 
                            className="text-start flex item-center justify-center  w-full bg-cover	bg-center">
                                <img
                                    className=" h-[294px]  md:h-[547px] w-full object-cover border-rounded-10  object-top"
                                    onLoad={()=>{setImageLoaded(true)}}
                                    src={ imageLoaded ?  instructor?.dp?.original?.url : instructor?.dp?.medium?.url }
                                    alt=""
                                />
                            </div>
                        </div>
                        <div className="col-span-12 md:col-span-6 order-1 md:order-2 ">
                            <div className=" text-start flex flex-col   md:justify-start   md:items-start">
                                <div className="w-full flex md:justify-end">
                                    <div>
                                        <p className="fs-regular text-start md:text fw-medium">
                                            Social
                                        </p>
                                        <div className="flex gap-5">
                                            <div className="discord glitch cursor-pointer">
                                                <svg
                                                    className="h-5 w-5 md:h-6 md:w-6 glitch cursor-pointer"

                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <g
                                                        opacity="0.6"
                                                        clipPath="url(#clip0_1925_92920)"
                                                    >
                                                        <path
                                                            opacity="0.4"
                                                            d="M13.7804 17.1619C13.1885 17.2209 12.594 17.2503 11.9992 17.25C11.4043 17.2503 10.8098 17.2209 10.2179 17.1619L9.25697 19.7559C9.22022 19.8539 9.16373 19.9434 9.09099 20.0186C9.01826 20.0939 8.93083 20.1534 8.83414 20.1935C8.73744 20.2336 8.63354 20.2534 8.52888 20.2517C8.42422 20.2499 8.32103 20.2267 8.22572 20.1834L1.94447 17.3991C1.78275 17.328 1.65128 17.2022 1.57325 17.0437C1.49521 16.8852 1.47562 16.7043 1.51791 16.5328L4.2901 5.625C4.32625 5.48164 4.40356 5.35198 4.51251 5.25203C4.62146 5.15208 4.75728 5.08619 4.90322 5.0625L8.28385 4.5075C8.47213 4.4755 8.66556 4.51563 8.82558 4.61988C8.9856 4.72412 9.10047 4.88484 9.14728 5.07L9.61603 6.91031C11.199 6.69906 12.8031 6.69906 14.386 6.91031L14.8548 5.07C14.9016 4.88484 15.0165 4.72412 15.1765 4.61988C15.3365 4.51563 15.5299 4.4755 15.7182 4.5075L19.0951 5.0625C19.241 5.08619 19.3769 5.15208 19.4858 5.25203C19.5948 5.35198 19.6721 5.48164 19.7082 5.625L22.4767 16.5347C22.519 16.7062 22.4994 16.8871 22.4213 17.0456C22.3433 17.2041 22.2118 17.3299 22.0501 17.4009L15.7688 20.1853C15.6735 20.2286 15.5703 20.2518 15.4657 20.2535C15.361 20.2553 15.2571 20.2355 15.1604 20.1954C15.0637 20.1553 14.9763 20.0958 14.9036 20.0205C14.8308 19.9452 14.7743 19.8558 14.7376 19.7578L13.7804 17.1619Z"
                                                            fill="white"
                                                        />
                                                        <path
                                                            d="M8.625 14.25C9.24632 14.25 9.75 13.7463 9.75 13.125C9.75 12.5037 9.24632 12 8.625 12C8.00368 12 7.5 12.5037 7.5 13.125C7.5 13.7463 8.00368 14.25 8.625 14.25Z"
                                                            fill="white"
                                                        />
                                                        <path
                                                            d="M15.375 14.25C15.9963 14.25 16.5 13.7463 16.5 13.125C16.5 12.5037 15.9963 12 15.375 12C14.7537 12 14.25 12.5037 14.25 13.125C14.25 13.7463 14.7537 14.25 15.375 14.25Z"
                                                            fill="white"
                                                        />
                                                        <path
                                                            d="M14.385 6.90844L14.8538 5.06812C14.9006 4.88297 15.0154 4.72225 15.1755 4.618C15.3355 4.51375 15.5289 4.47363 15.7172 4.50562L19.0959 5.0625C19.2419 5.08619 19.3777 5.15208 19.4866 5.25203C19.5956 5.35198 19.6729 5.48163 19.7091 5.625L22.4775 16.5347C22.5198 16.7062 22.5002 16.8871 22.4222 17.0456C22.3441 17.2041 22.2127 17.3299 22.0509 17.4009L15.7697 20.1853C15.6744 20.2286 15.5712 20.2518 15.4665 20.2535C15.3619 20.2553 15.258 20.2355 15.1613 20.1954C15.0646 20.1553 14.9772 20.0958 14.9044 20.0205C14.8317 19.9452 14.7752 19.8558 14.7384 19.7578L13.7812 17.1619"
                                                            stroke="white"
                                                            strokeWidth="1.2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                        <path
                                                            d="M9.61432 6.90844L9.14557 5.06812C9.09875 4.88297 8.98389 4.72225 8.82386 4.618C8.66384 4.51375 8.47041 4.47363 8.28213 4.50562L4.90338 5.0625C4.75744 5.08619 4.62162 5.15208 4.51267 5.25203C4.40372 5.35198 4.3264 5.48163 4.29025 5.625L1.52182 16.5328C1.47952 16.7043 1.49912 16.8852 1.57715 17.0437C1.65519 17.2022 1.78665 17.328 1.94838 17.3991L8.22963 20.1834C8.32494 20.2267 8.42813 20.2499 8.53279 20.2517C8.63745 20.2534 8.74135 20.2336 8.83804 20.1935C8.93474 20.1534 9.02216 20.0939 9.0949 20.0186C9.16764 19.9434 9.22413 19.8539 9.26088 19.7559L10.2181 17.1619"
                                                            stroke="white"
                                                            strokeWidth="1.2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                        <path
                                                            d="M7.5 7.34156C8.96628 6.94143 10.4801 6.74243 12 6.75C13.5199 6.74243 15.0337 6.94143 16.5 7.34156"
                                                            stroke="white"
                                                            strokeWidth="1.2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                        <path
                                                            d="M16.5 16.6584C15.0337 17.0586 13.5199 17.2576 12 17.25C10.4801 17.2576 8.96628 17.0586 7.5 16.6584"
                                                            stroke="white"
                                                            strokeWidth="1.2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_1925_92920">
                                                            <rect
                                                                width="24"
                                                                height="24"
                                                                fill="white"
                                                            />
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                            </div>
                                            <div className="twitter  glitch cursor-pointer">
                                                <svg
                                                    className="h-5 w-5 md:h-6 md:w-6"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <g
                                                        opacity="0.6"
                                                        clipPath="url(#clip0_1925_92921)"
                                                    >
                                                        <path
                                                            opacity="0.4"
                                                            d="M8.25 16.5C8.25 16.5 3.07969 13.5 3.82312 5.25C3.82312 5.25 7.54125 9 12 9.75V8.25C12 6.1875 13.6875 4.47469 15.75 4.5C16.4779 4.50846 17.1882 4.72473 17.7972 5.12336C18.4063 5.52198 18.8888 6.08635 19.1878 6.75H22.5L19.5 9.75C19.1006 16.0163 13.8675 21 7.5 21C4.5 21 3.75 19.875 3.75 19.875C3.75 19.875 6.75 18.75 8.25 16.5Z"
                                                            fill="white"
                                                        />
                                                        <path
                                                            d="M8.25 16.5C8.25 16.5 3.07969 13.5 3.82312 5.25C3.82312 5.25 7.54125 9 12 9.75V8.25C12 6.1875 13.6875 4.47469 15.75 4.5C16.4779 4.50846 17.1882 4.72473 17.7972 5.12336C18.4063 5.52198 18.8888 6.08635 19.1878 6.75H22.5L19.5 9.75C19.1006 16.0163 13.8675 21 7.5 21C4.5 21 3.75 19.875 3.75 19.875C3.75 19.875 6.75 18.75 8.25 16.5Z"
                                                            stroke="white"
                                                            strokeWidth="1.2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_1925_92921">
                                                            <rect
                                                                width="24"
                                                                height="24"
                                                                fill="white"
                                                            />
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                            </div>
                                            <div className="linkedin  glitch cursor-pointer">
                                                <svg
                                                    className="h-5 w-5 md:h-6 md:w-6"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <g
                                                        opacity="0.6"
                                                        clipPath="url(#clip0_1925_92922)"
                                                    >
                                                        <path
                                                            opacity="0.4"
                                                            d="M20.25 3H3.75C3.33579 3 3 3.33579 3 3.75V20.25C3 20.6642 3.33579 21 3.75 21H20.25C20.6642 21 21 20.6642 21 20.25V3.75C21 3.33579 20.6642 3 20.25 3Z"
                                                            fill="white"
                                                        />
                                                        <path
                                                            d="M20.25 3H3.75C3.33579 3 3 3.33579 3 3.75V20.25C3 20.6642 3.33579 21 3.75 21H20.25C20.6642 21 21 20.6642 21 20.25V3.75C21 3.33579 20.6642 3 20.25 3Z"
                                                            stroke="white"
                                                            strokeWidth="1.2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                        <path
                                                            d="M11.25 10.5V16.5"
                                                            stroke="white"
                                                            strokeWidth="1.2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                        <path
                                                            d="M8.25 10.5V16.5"
                                                            stroke="white"
                                                            strokeWidth="1.2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                        <path
                                                            d="M11.25 13.125C11.25 12.4288 11.5266 11.7611 12.0188 11.2688C12.5111 10.7766 13.1788 10.5 13.875 10.5C14.5712 10.5 15.2389 10.7766 15.7312 11.2688C16.2234 11.7611 16.5 12.4288 16.5 13.125V16.5"
                                                            stroke="white"
                                                            strokeWidth="1.2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                        <path
                                                            d="M8.25 9C8.87132 9 9.375 8.49632 9.375 7.875C9.375 7.25368 8.87132 6.75 8.25 6.75C7.62868 6.75 7.125 7.25368 7.125 7.875C7.125 8.49632 7.62868 9 8.25 9Z"
                                                            fill="white"
                                                        />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_1925_92922">
                                                            <rect
                                                                width="24"
                                                                height="24"
                                                                fill="white"
                                                            />
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                            </div>
                                            <div className="website  glitch cursor-pointer">
                                                <svg
                                                    className="h-5 w-5 md:h-6 md:w-6"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <g
                                                        opacity="0.6"
                                                        clipPath="url(#clip0_1925_92923)"
                                                    >
                                                        <path
                                                            opacity="0.4"
                                                            d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
                                                            fill="white"
                                                        />
                                                        <path
                                                            d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
                                                            stroke="white"
                                                            strokeWidth="1.2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                        <path
                                                            d="M8.25 12C8.25 15.5119 9.49969 18.6488 11.4637 20.7647C11.532 20.8389 11.6149 20.8981 11.7072 20.9387C11.7995 20.9792 11.8992 21.0001 12 21.0001C12.1008 21.0001 12.2005 20.9792 12.2928 20.9387C12.3851 20.8981 12.468 20.8389 12.5363 20.7647C14.5003 18.6488 15.75 15.5119 15.75 12C15.75 8.48813 14.5003 5.35125 12.5363 3.23531C12.468 3.1611 12.3851 3.10186 12.2928 3.06133C12.2005 3.02081 12.1008 2.99989 12 2.99989C11.8992 2.99989 11.7995 3.02081 11.7072 3.06133C11.6149 3.10186 11.532 3.1611 11.4637 3.23531C9.49969 5.35125 8.25 8.48813 8.25 12Z"
                                                            stroke="white"
                                                            strokeWidth="1.2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                        <path
                                                            d="M3.51172 9H20.488"
                                                            stroke="white"
                                                            strokeWidth="1.2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                        <path
                                                            d="M3.51172 15H20.488"
                                                            stroke="white"
                                                            strokeWidth="1.2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_1925_92923">
                                                            <rect
                                                                width="24"
                                                                height="24"
                                                                fill="white"
                                                            />
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                            </div>

                                            <div className="instagram  glitch cursor-pointer">
                                                <svg
                                                    className="h-5 w-5 md:h-6 md:w-6"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <g
                                                        opacity="0.6"
                                                        clipPath="url(#clip0_1925_92930)"
                                                    >
                                                        <path
                                                            opacity="0.4"
                                                            d="M16.5 3H7.5C6.30653 3 5.16193 3.47411 4.31802 4.31802C3.47411 5.16193 3 6.30653 3 7.5V16.5C3 17.6935 3.47411 18.8381 4.31802 19.682C5.16193 20.5259 6.30653 21 7.5 21H16.5C17.6935 21 18.8381 20.5259 19.682 19.682C20.5259 18.8381 21 17.6935 21 16.5V7.5C21 6.30653 20.5259 5.16193 19.682 4.31802C18.8381 3.47411 17.6935 3 16.5 3ZM12 15.75C11.2583 15.75 10.5333 15.5301 9.91661 15.118C9.29993 14.706 8.81928 14.1203 8.53545 13.4351C8.25162 12.7498 8.17736 11.9958 8.32205 11.2684C8.46675 10.541 8.8239 9.8728 9.34835 9.34835C9.8728 8.8239 10.541 8.46675 11.2684 8.32205C11.9958 8.17736 12.7498 8.25162 13.4351 8.53545C14.1203 8.81928 14.706 9.29993 15.118 9.91661C15.5301 10.5333 15.75 11.2583 15.75 12C15.75 12.9946 15.3549 13.9484 14.6517 14.6517C13.9484 15.3549 12.9946 15.75 12 15.75Z"
                                                            fill="white"
                                                        />
                                                        <path
                                                            d="M16.5 3H7.5C5.01472 3 3 5.01472 3 7.5V16.5C3 18.9853 5.01472 21 7.5 21H16.5C18.9853 21 21 18.9853 21 16.5V7.5C21 5.01472 18.9853 3 16.5 3Z"
                                                            stroke="white"
                                                            strokeWidth="1.2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                        <path
                                                            d="M12 15.75C14.0711 15.75 15.75 14.0711 15.75 12C15.75 9.92893 14.0711 8.25 12 8.25C9.92893 8.25 8.25 9.92893 8.25 12C8.25 14.0711 9.92893 15.75 12 15.75Z"
                                                            stroke="white"
                                                            strokeWidth="1.2"
                                                            strokeMiterlimit="10"
                                                        />
                                                        <path
                                                            d="M16.875 8.25C17.4963 8.25 18 7.74632 18 7.125C18 6.50368 17.4963 6 16.875 6C16.2537 6 15.75 6.50368 15.75 7.125C15.75 7.74632 16.2537 8.25 16.875 8.25Z"
                                                            fill="white"
                                                        />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_1925_92930">
                                                            <rect
                                                                width="24"
                                                                height="24"
                                                                fill="white"
                                                            />
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                            </div>

                                            <div className="youtube  glitch cursor-pointer">
                                                <svg
                                                    className="h-5 w-5 md:h-6 md:w-6"

                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <g
                                                        opacity="0.6"
                                                        clipPath="url(#clip0_1925_92931)"
                                                    >
                                                        <path
                                                            opacity="0.4"
                                                            d="M21.2428 6.70594C21.1851 6.47468 21.0731 6.26051 20.9161 6.08117C20.7591 5.90183 20.5616 5.76249 20.34 5.67469C17.2013 4.46719 12 4.5 12 4.5C12 4.5 6.79875 4.46719 3.65625 5.67938C3.43466 5.76718 3.23718 5.90652 3.08017 6.08586C2.92317 6.2652 2.81116 6.47937 2.75344 6.71063C2.53781 7.55063 2.25 9.19594 2.25 12C2.25 14.8041 2.53781 16.4494 2.75719 17.2941C2.8152 17.5241 2.92694 17.7371 3.08322 17.9155C3.23951 18.094 3.43589 18.2328 3.65625 18.3206C6.79875 19.5328 12 19.5 12 19.5C12 19.5 17.2013 19.5328 20.3438 18.3206C20.5648 18.2333 20.7619 18.0947 20.9189 17.9162C21.0759 17.7377 21.1882 17.5245 21.2466 17.2941C21.4659 16.4503 21.7537 14.8041 21.7537 12C21.7537 9.19594 21.4622 7.55063 21.2428 6.70594ZM10.5 15V9L15 12L10.5 15Z"
                                                            fill="white"
                                                        />
                                                        <path
                                                            d="M15 12L10.5 9V15L15 12Z"
                                                            stroke="white"
                                                            strokeWidth="1.2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                        <path
                                                            d="M2.25 12C2.25 14.8041 2.53781 16.4484 2.75719 17.2941C2.8152 17.5241 2.92694 17.7371 3.08322 17.9155C3.23951 18.094 3.43589 18.2328 3.65625 18.3206C6.79875 19.5328 12 19.5 12 19.5C12 19.5 17.2012 19.5328 20.3438 18.3206C20.5648 18.2333 20.7619 18.0947 20.9189 17.9162C21.0759 17.7377 21.1882 17.5245 21.2466 17.2941C21.4659 16.4503 21.7537 14.8041 21.7537 12C21.7537 9.19594 21.4659 7.55157 21.2466 6.70594C21.1888 6.47468 21.0768 6.26051 20.9198 6.08117C20.7628 5.90183 20.5653 5.76249 20.3438 5.67469C17.2012 4.46719 12 4.5 12 4.5C12 4.5 6.79875 4.46719 3.65625 5.67938C3.43466 5.76718 3.23718 5.90652 3.08017 6.08586C2.92317 6.2652 2.81116 6.47937 2.75344 6.71063C2.53781 7.55063 2.25 9.19594 2.25 12Z"
                                                            stroke="white"
                                                            strokeWidth="1.2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_1925_92931">
                                                            <rect
                                                                width="24"
                                                                height="24"
                                                                fill="white"
                                                            />
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <h3 className="mb-2 mt-[3rem] md:mt-[4rem] ">
                                    {instructor?.category?.name}
                                </h3>
                                <h1 className="mb-2">
                                    {instructor?.full_name}
                                </h1>
                                <div className="flex items-center gap-2 mb-4">
                                    <span>
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
                                                d="M4 8.00098H10"
                                                stroke="white"
                                                strokeOpacity="0.6"
                                                strokeWidth="1.2"
                                                strokeMiterlimit="10"
                                            />
                                            <path
                                                d="M4 15.999H10"
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
                                                d="M14 8.00098H20"
                                                stroke="white"
                                                strokeOpacity="0.6"
                                                strokeWidth="1.2"
                                                strokeMiterlimit="10"
                                            />
                                        </svg>
                                    </span>
                                    <p className="fw-regular fs-regular opacity-60">
                                        {instructor?.courses_count} Courses
                                    </p>
                                </div>
                                <p className="fs-regular fw-regular">
                                    Learn to listen and inspire a culture of
                                    teamwork. The 43rd U.S.{" "}
                                    <br className="hidden lg:block" /> president
                                    teaches leadership skills from his career
                                    and opens up{" "}
                                    <br className="hidden lg:block" /> about
                                    painting.
                                </p>
                                {/* <Button
                                    icon={<Plus />}
                                    className={"secondary mt-[2rem] "}
                                >
                                    Follow
                                </Button> */}
                            </div>
                        </div>
                    </div>
                    <div className="w-full lg:w-[75%] my-[3rem] pt-3">
                        <h3>About</h3>
                        <p className="fw-regular fs-medium leading-[150%] my-[1rem]   ">
                            {" "}
                            {instructor?.about}{" "}
                        </p>
                    </div>
                </div>
            </section>

            {/* Courses */}
            <section className=" py-[1rem] md:py-[3rem] ">
                <div className="container mx-auto px-5 xl:px-0">
                    <div className="grid grid-cols-3 mb-8">
                        <div className="col-span-12">
                            <div className="text-start">
                                <h3>Courses</h3>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-12 gap-y-12 gap-x-4 lg:gap-x-6">


                        {courses?.map((data, index) => (
                        <>
                        <div key={index + 1} className="col-span-6 lg:col-span-4 xl:col-span-3">
                         <AcademySmallCard
                                        className={"academy-small-card feature-card"}
                                        title={data?.title}
                                        instructor={ data?.instructor?.full_name }
                                        duration={"5 hr 40 min" }
                                        lessons={ data?.lessons_count }
                                        original_image={data?.thumbnail?.medium?.url}
                                        medium_image={data?.thumbnail?.small?.url}
                                        badge={"primary"}
                                        badge_text={""}
                                        live={false} />
</div>
                        {/* <div key={index + 1} className="col-span-6 lg:col-span-4 xl:col-span-3">
                            <div className="item cursor-pointer">
                                <img
                                    className=" min-h-[112px] h-[112px] md:h-[306px] w-full object-cover object-center rounded-lg mb-6"
                                    src={course?.thumbnail?.medium?.url}
                                    alt=""
                                />
                                <div className="flex items-center gap-2 md:gap-6 md:mb-4 mb-2 ">
                                    <div className="  flex item-center">
                                        <span className=" mt-[3px] md:mt-0 mr-[5px] md:mr-[10px]">
                                            <svg
                                                className=" w-[14px] h-[12px]  md:w-6 md:h-6 "
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
                                        <span className="opacity-60 text-[12px] md:text-[16px] font-normal md:captilize">
                                            2 hr 10 min
                                        </span>
                                    </div>
                                    <div className="regular text-[#FFFFFF] font-normal flex item-center">
                                        <span className="mt-[3px] md:mt-0 mr-[5px] md:mr-[10px]">
                                            <svg
                                                className=" w-[14px] h-[12px]  md:w-6 md:h-6 "
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
                                        <span className="opacity-60 text-[12px] md:text-[16px] font-normal md:uppercase">
                                            7 Lessons
                                        </span>
                                    </div>
                                </div>
                                <h4 className="mb-2">{course?.title}</h4>
                                <h6>{instructor?.full_name}</h6>
                            </div>
                        </div> */}
                        </>
                        
                        ))}


                    </div>
                </div>
            </section>

            {/* Related industry experts */}

            <section className="pt-[4rem]">
                <div className="container mx-auto pl-5 xl:px-0">
                    <div className="grid grid-cols-3 mb-8">
                        <div className="col-span-12">
                            <div className="text-start">
                                <h3>Related industry experts</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container mx-auto px-5 xl:px-0">
                    <div className="grid grid-cols-12">
                        <div className="col-span-12">
                            <div className=" ">
                                <div className="grid grid-cols-12">
                                    <div className="col-span-12">
                                        <OwlCarousel
                                            className="owl-theme relative"
                                            loop
                                            margin={24}
                                            items={6}
                                            autoplay={true}
                                            autoplayHoverPause={true}
                                            autoplayTimeout={7000}
                                            animateIn={"fadeIn"}
                                            animateOut={"fadeOut"}
                                            nav={false}
                                            dots={false}
                                            autoWidth={true}
                                        >
                                            {relatedInstructors?.map((data, index) => (
                                                <div key={index + 1}>
                                                    <CourseInstructorCard
                                                        className={"item"}
                                                        title={data?.full_name}
                                                        category={data?.category?.name}
                                                        courses={data?.courses_count}
                                                        image={data?.dp?.original?.url}
                                                        user_id={data?.id}
                                                    /> </div>
                                            ))}
                                            {/* <CourseInstructorCard
                                                className={"item"}
                                                title={'Lisan Haider'}
                                                category={"Music"}
                                                courses={4}
                                                image={top1}
                                            /> */}

                                        </OwlCarousel>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

Instructor.layout = (page) => <Layout children={page} title="" />;
export default Instructor;
