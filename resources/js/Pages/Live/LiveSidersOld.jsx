import React, { useRef } from "react";
import Layout from "@/Layouts/Layout.jsx";
import Button from "../../Components/Button";
import OwlCarousel from "react-owl-carousel";

import { ReactComponent as WatchSvg } from "../../../assets/svg/watch.svg";
import { ReactComponent as ArrowRight } from "../../../assets/svg/ArrowRight.svg";
import { ReactComponent as ArrowLeft } from "../../../assets/svg/ArrowLeft.svg";


 
import headerImage2 from "../../../assets/img/Slide2.jpg";
 

// new slider

// featured
import feature1 from "../../../assets/img/feature1.jpg";
import feature2 from "../../../assets/img/feature2.jpg";
import feature3 from "../../../assets/img/feature3.jpg";

// new lesson

import newLesson1 from "../../../assets/img/newlesson1.jpg";
import newLesson2 from "../../../assets/img/newlesson2.jpg";
import newLesson3 from "../../../assets/img/newlesson3.jpg";
import newLesson4 from "../../../assets/img/newlesson4.jpg";
import newLesson5 from "../../../assets/img/newlesson5.jpg";

// art and design
import art1 from "../../../assets/img/art1.jpg";
import art2 from "../../../assets/img/art2.jpg";
import art3 from "../../../assets/img/art3.jpg";
import art4 from "../../../assets/img/art4.jpg";
import art5 from "../../../assets/img/art5.jpg";

//  design & style
import design1 from "../../../assets/img/design1.jpg";
import design2 from "../../../assets/img/design2.jpg";
import design3 from "../../../assets/img/design3.jpg";
import design4 from "../../../assets/img/design4.jpg";
import design5 from "../../../assets/img/design5.jpg";

 
import upcoming from "../../../assets/img/upcoming.jpg";

import CourseCard from "@/Components/Course/CourseCard.jsx";
import CourseFeaturedCard from "@/Components/Course/CourseFeaturedCard.jsx";
import Badge from "@/Components/Badge.jsx";
import CourseInstructorCard from "@/Components/Course/CourseInstructorCard.jsx";
import LiveBadge from "@/Components/LiveBadge";
import { Link } from "@inertiajs/react";
import IconButton from "@/Components/IconButton";
import AcademySmallCard from "@/Components/Course/AcademySmallCard";
import AcademyLargeCard from "@/Components/Course/AcademyLargeCard";

const LiveSidersOld = ({upcomingLiveTrainings, inProgressLiveTrainings, hasLivedTrainings}) => {
   
    console.log('upcomingLiveTrainings')
    console.log(upcomingLiveTrainings)
    console.log('inProgressLiveTrainings')
    console.log(inProgressLiveTrainings)
    console.log('hasLivedTrainings')
    console.log(hasLivedTrainings)

//route('livetraining.preview',1)


    // Main academy  slider buttons
    const liveMainRef = useRef(null);
    // category   slider buttons
    const catRef = useRef(null);

    // featuer slider button
    const LiveNowRef = useRef(null);

    // new lessons slider buttons
    const newLessonRef = useRef(null);

    // Top instructor slider buttons
    const topInstRef = useRef(null);

    // upcoming   slider buttons
    const upComingRef = useRef(null);

    const handleSliderNext = (ref) => {
        ref.current.next();
    };

    const handleSliderPrev = (ref) => {
        ref.current.prev();
    };



  return (
    <div>
           {/* category slider  */}
                {/* <section className="mt-20 group">
                    <div className="px-5 xl:px-0">
                        <div className='container mx-auto'>
                            <div className="grid grid-cols-1 lg:grid-cols-3 mb-8">

                                <div onClick={() => { handleSliderPrev(catRef) }} className="cursor-pointer hidden lg:block lg:invisible group-hover:lg:visible">
                                    <Button
                                        className={"secondary header_arrow"}
                                        icon={<ArrowLeft />}
                                    ></Button>
                                </div>

                                <div className="text-center">
                                    <h3  >Categories</h3>

                                </div>

                                <div onClick={() => { handleSliderNext(catRef) }} className="ml-auto cursor-pointer hidden lg:block lg:invisible group-hover:lg:visible">
                                    <Button
                                        className={"secondary header_arrow"}
                                        icon={<ArrowRight />}
                                    ></Button>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-12">

                            <div className="col-span-12 relative">
                                <div className="marquee-shadow left z-index-50"></div>
                                <div className="marquee-shadow right z-index-50"></div>
                                <OwlCarousel
                                    ref={catRef}
                                    className="owl-theme relative"
                                    margin={10}
                                    autoWidth={true}
                                    animateIn={"fadeIn"}
                                    animateOut={"fadeOut"}
                                    nav={false}
                                    dots={false}
                                >
                                    <div className="item">
                                        <div className="h-[95px] w-[112px] md:w-auto  md:h-20  md:flex  items-center  noise-10 inset-border slider-cat-img   py-4 md:py-6 px-4 md:px-8 justify-center">
                                            <div className="w-[2rem] flex mx-auto h-[2rem]">
                                                <svg className="opacity-60"
                                                    width="32"
                                                    height="32"
                                                    viewBox="0 0 32 32"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <g clipPath="url(#clip0_347_23029)">
                                                        <path
                                                            opacity="0.2"
                                                            d="M20.67 15.3813C24.045 12.4288 28 8.10125 28 4C23.8987 4 19.5712 7.955 16.625 11.33C18.321 12.2817 19.7209 13.6838 20.67 15.3813Z"
                                                            fill="white"
                                                        />
                                                        <path
                                                            d="M2 27H11.5C12.7856 27 14.0423 26.6188 15.1112 25.9046C16.1801 25.1903 17.0132 24.1752 17.5052 22.9874C17.9972 21.7997 18.1259 20.4928 17.8751 19.2319C17.6243 17.971 17.0052 16.8128 16.0962 15.9038C15.1872 14.9948 14.029 14.3757 12.7681 14.1249C11.5072 13.8741 10.2003 14.0028 9.01256 14.4948C7.82484 14.9868 6.80968 15.8199 6.09545 16.8888C5.38122 17.9577 5 19.2144 5 20.5C5 25 2 27 2 27Z"
                                                            stroke="white"
                                                            strokeWidth="1.2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                        <path
                                                            d="M14.0513 14.52C16.45 11.2862 22.4325 4 28 4C28 9.5675 20.7138 15.55 17.48 17.9487"
                                                            stroke="white"
                                                            strokeWidth="1.2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                        <path
                                                            d="M16.625 11.3301C18.3233 12.2809 19.7254 13.683 20.6763 15.3813"
                                                            stroke="white"
                                                            strokeWidth="1.2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_347_23029">
                                                            <rect
                                                                width="32"
                                                                height="32"
                                                                fill="white"
                                                            />
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                            </div>

                                            <p className="fs-regular-sm  text-center fw-regular md:ml-4">
                                                Art & Entertainment
                                            </p>
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="h-[95px] w-[112px] md:w-auto  md:h-20  md:flex  items-center  noise-10 inset-border slider-cat-img   py-4 md:py-6 px-4 md:px-8 justify-center">
                                            <div className="w-[2rem] flex mx-auto h-[2rem]">      <svg className="opacity-60"
                                                width="32"
                                                height="32"
                                                viewBox="0 0 32 32"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <g clipPath="url(#clip0_347_23038)">
                                                    <path
                                                        opacity="0.2"
                                                        d="M16 18.0003C11.7869 18.007 7.64702 16.8996 4 14.7903V25.0003C4 25.2655 4.10536 25.5199 4.29289 25.7074C4.48043 25.895 4.73478 26.0003 5 26.0003H27C27.2652 26.0003 27.5196 25.895 27.7071 25.7074C27.8946 25.5199 28 25.2655 28 25.0003V14.7891C24.3532 16.8991 20.2132 18.007 16 18.0003Z"
                                                        fill="white"
                                                    />
                                                    <path
                                                        d="M14 14H18"
                                                        stroke="white"
                                                        strokeWidth="1.2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                    <path
                                                        d="M27 8H5C4.44772 8 4 8.44772 4 9V25C4 25.5523 4.44772 26 5 26H27C27.5523 26 28 25.5523 28 25V9C28 8.44772 27.5523 8 27 8Z"
                                                        stroke="white"
                                                        strokeWidth="1.2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                    <path
                                                        d="M21 8V6C21 5.46957 20.7893 4.96086 20.4142 4.58579C20.0391 4.21071 19.5304 4 19 4H13C12.4696 4 11.9609 4.21071 11.5858 4.58579C11.2107 4.96086 11 5.46957 11 6V8"
                                                        stroke="white"
                                                        strokeWidth="1.2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                    <path
                                                        d="M28 14.7891C24.3532 16.8991 20.2132 18.0069 16 18.0003C11.7869 18.007 7.64702 16.8996 4 14.7903"
                                                        stroke="white"
                                                        strokeWidth="1.2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_347_23038">
                                                        <rect
                                                            width="32"
                                                            height="32"
                                                            fill="white"
                                                        />
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                            </div>
                                            <p className="fs-regular-sm  text-center fw-regular md:ml-4">
                                                Business
                                            </p>
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="h-[95px] w-[112px] md:w-auto  md:h-20  md:flex  items-center  noise-10 inset-border slider-cat-img   py-4 md:py-6 px-4 md:px-8 justify-center">
                                            <div className="w-[2rem] flex mx-auto h-[2rem]">
                                                <svg className="opacity-60"
                                                    width="32"
                                                    height="32"
                                                    viewBox="0 0 32 32"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <g clipPath="url(#clip0_347_23048)">
                                                        <path
                                                            opacity="0.2"
                                                            d="M26.2819 26.283C28.4361 24.1288 25.579 17.7789 19.9003 12.1002C14.2216 6.42149 7.8717 3.56433 5.71747 5.71856C3.56324 7.87279 6.4204 14.2226 12.0991 19.9014C17.7778 25.5801 24.1277 28.4372 26.2819 26.283Z"
                                                            fill="white"
                                                        />
                                                        <path
                                                            d="M26.2819 26.283C28.4361 24.1288 25.579 17.7789 19.9003 12.1002C14.2216 6.42149 7.8717 3.56433 5.71747 5.71856C3.56324 7.87279 6.4204 14.2226 12.0991 19.9014C17.7778 25.5801 24.1277 28.4372 26.2819 26.283Z"
                                                            stroke="white"
                                                            strokeWidth="1.2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                        <path
                                                            d="M19.9003 19.8998C25.579 14.2211 28.4361 7.87123 26.2819 5.717C24.1277 3.56277 17.7778 6.41993 12.0991 12.0986C6.4204 17.7774 3.56324 24.1272 5.71747 26.2814C7.8717 28.4357 14.2216 25.5785 19.9003 19.8998Z"
                                                            stroke="white"
                                                            strokeWidth="1.2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                        <path
                                                            d="M16 17.5C16.8284 17.5 17.5 16.8284 17.5 16C17.5 15.1716 16.8284 14.5 16 14.5C15.1716 14.5 14.5 15.1716 14.5 16C14.5 16.8284 15.1716 17.5 16 17.5Z"
                                                            fill="white"
                                                        />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_347_23048">
                                                            <rect
                                                                width="32"
                                                                height="32"
                                                                fill="white"
                                                            />
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                            </div>
                                            <p className="fs-regular-sm  text-center fw-regular md:ml-4">
                                                {" "}
                                                <div className="ring-container   -left-5    ">
                                                    <div className="ringring"></div>
                                                    <div className="circle"></div>
                                                </div>{" "}
                                                Science & Tech
                                            </p>
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="h-[95px] w-[112px] md:w-auto  md:h-20  md:flex  items-center  noise-10 inset-border slider-cat-img   py-4 md:py-6 px-4 md:px-8 justify-center">
                                            <div className="w-[2rem] flex mx-auto h-[2rem]">
                                                <svg className="opacity-60"
                                                    width="32"
                                                    height="32"
                                                    viewBox="0 0 32 32"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <g clipPath="url(#clip0_347_23057)">
                                                        <path
                                                            opacity="0.2"
                                                            d="M19 26.0005V20.0005C19 19.7353 18.8946 19.4809 18.7071 19.2934C18.5196 19.1058 18.2652 19.0005 18 19.0005H14C13.7348 19.0005 13.4804 19.1058 13.2929 19.2934C13.1054 19.4809 13 19.7353 13 20.0005V26.0005C13 26.2657 12.8946 26.52 12.7071 26.7076C12.5196 26.8951 12.2652 27.0005 12 27.0005H6C5.73478 27.0005 5.48043 26.8951 5.29289 26.7076C5.10536 26.52 5 26.2657 5 26.0005V14.443C5.00001 14.3036 5.02915 14.1658 5.08555 14.0384C5.14195 13.9109 5.22436 13.7967 5.3275 13.703L15.3275 4.26047C15.5116 4.09288 15.7516 4 16.0006 4C16.2496 4 16.4896 4.09288 16.6737 4.26047L26.6737 13.703C26.7769 13.7967 26.8593 13.9109 26.9157 14.0384C26.9721 14.1658 27.0012 14.3036 27.0012 14.443V26.0005C27.0012 26.2657 26.8959 26.52 26.7084 26.7076C26.5208 26.8951 26.2665 27.0005 26.0012 27.0005H20C19.7348 27.0005 19.4804 26.8951 19.2929 26.7076C19.1054 26.52 19 26.2657 19 26.0005Z"
                                                            fill="white"
                                                        />
                                                        <path
                                                            d="M19 26.0005V20.0005C19 19.7353 18.8946 19.4809 18.7071 19.2934C18.5196 19.1058 18.2652 19.0005 18 19.0005H14C13.7348 19.0005 13.4804 19.1058 13.2929 19.2934C13.1054 19.4809 13 19.7353 13 20.0005V26.0005C13 26.2657 12.8946 26.52 12.7071 26.7076C12.5196 26.8951 12.2652 27.0005 12 27.0005H6C5.73478 27.0005 5.48043 26.8951 5.29289 26.7076C5.10536 26.52 5 26.2657 5 26.0005V14.443C5.00001 14.3036 5.02915 14.1658 5.08555 14.0384C5.14195 13.9109 5.22436 13.7967 5.3275 13.703L15.3275 4.26047C15.5116 4.09288 15.7516 4 16.0006 4C16.2496 4 16.4896 4.09288 16.6737 4.26047L26.6737 13.703C26.7769 13.7967 26.8593 13.9109 26.9157 14.0384C26.9721 14.1658 27.0012 14.3036 27.0012 14.443V26.0005C27.0012 26.2657 26.8959 26.52 26.7084 26.7076C26.5208 26.8951 26.2665 27.0005 26.0012 27.0005H20C19.7348 27.0005 19.4804 26.8951 19.2929 26.7076C19.1054 26.52 19 26.2657 19 26.0005Z"
                                                            stroke="white"
                                                            strokeWidth="1.2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_347_23057">
                                                            <rect
                                                                width="32"
                                                                height="32"
                                                                fill="white"
                                                            />
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                            </div>
                                            <p className="fs-regular-sm  text-center fw-regular md:ml-4">
                                                <div className="ring-container  -left-5 ">
                                                    <div className="ringring"></div>
                                                    <div className="circle"></div>
                                                </div>{" "}
                                                Home & Lifestyle
                                            </p>
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="h-[95px] w-[112px] md:w-auto  md:h-20  md:flex  items-center  noise-10 inset-border slider-cat-img   py-4 md:py-6 px-4 md:px-8 justify-center">
                                            <div className="w-[2rem] flex mx-auto h-[2rem]">
                                                <svg className="opacity-60"
                                                    width="32"
                                                    height="32"
                                                    viewBox="0 0 32 32"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <g clipPath="url(#clip0_347_23064)">
                                                        <path
                                                            opacity="0.2"
                                                            d="M16 13C17.6569 13 19 11.6569 19 10C19 8.34315 17.6569 7 16 7C14.3431 7 13 8.34315 13 10C13 11.6569 14.3431 13 16 13Z"
                                                            fill="white"
                                                        />
                                                        <path
                                                            opacity="0.2"
                                                            d="M5 25C6.65685 25 8 23.6569 8 22C8 20.3431 6.65685 19 5 19C3.34315 19 2 20.3431 2 22C2 23.6569 3.34315 25 5 25Z"
                                                            fill="white"
                                                        />
                                                        <path
                                                            opacity="0.2"
                                                            d="M27 25C28.6569 25 30 23.6569 30 22C30 20.3431 28.6569 19 27 19C25.3431 19 24 20.3431 24 22C24 23.6569 25.3431 25 27 25Z"
                                                            fill="white"
                                                        />
                                                        <path
                                                            d="M2 10H13"
                                                            stroke="white"
                                                            strokeWidth="1.2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                        <path
                                                            d="M19 10H30"
                                                            stroke="white"
                                                            strokeWidth="1.2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                        <path
                                                            d="M16 13C17.6569 13 19 11.6569 19 10C19 8.34315 17.6569 7 16 7C14.3431 7 13 8.34315 13 10C13 11.6569 14.3431 13 16 13Z"
                                                            stroke="white"
                                                            strokeWidth="1.2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                        <path
                                                            d="M5 25C6.65685 25 8 23.6569 8 22C8 20.3431 6.65685 19 5 19C3.34315 19 2 20.3431 2 22C2 23.6569 3.34315 25 5 25Z"
                                                            stroke="white"
                                                            strokeWidth="1.2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                        <path
                                                            d="M27 25C28.6569 25 30 23.6569 30 22C30 20.3431 28.6569 19 27 19C25.3431 19 24 20.3431 24 22C24 23.6569 25.3431 25 27 25Z"
                                                            stroke="white"
                                                            strokeWidth="1.2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                        <path
                                                            d="M18.9727 10.4062C20.9534 10.9637 22.7385 12.0647 24.1255 13.5847C25.5124 15.1047 26.4459 16.9829 26.8202 19.0063"
                                                            stroke="white"
                                                            strokeWidth="1.2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                        <path
                                                            d="M5.18018 19.0063C5.55452 16.9829 6.48807 15.1049 7.87504 13.5849C9.26202 12.0649 11.047 10.9638 13.0277 10.4062"
                                                            stroke="white"
                                                            strokeWidth="1.2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_347_23064">
                                                            <rect
                                                                width="32"
                                                                height="32"
                                                                fill="white"
                                                            />
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                            </div>
                                            <p className="fs-regular-sm  text-center fw-regular md:ml-4">
                                                Design & Style
                                            </p>
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="h-[95px] w-[112px] md:w-auto  md:h-20  md:flex  items-center  noise-10 inset-border slider-cat-img   py-4 md:py-6 px-4 md:px-8 justify-center">
                                            <div className="w-[2rem] flex mx-auto h-[2rem]">
                                                <svg className="opacity-60"
                                                    width="32"
                                                    height="32"
                                                    viewBox="0 0 32 32"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <g clipPath="url(#clip0_347_23079)">
                                                        <path
                                                            opacity="0.2"
                                                            d="M22.5 25C24.433 25 26 23.433 26 21.5C26 19.567 24.433 18 22.5 18C20.567 18 19 19.567 19 21.5C19 23.433 20.567 25 22.5 25Z"
                                                            fill="white"
                                                        />
                                                        <path
                                                            opacity="0.2"
                                                            d="M6.5 29C8.433 29 10 27.433 10 25.5C10 23.567 8.433 22 6.5 22C4.567 22 3 23.567 3 25.5C3 27.433 4.567 29 6.5 29Z"
                                                            fill="white"
                                                        />
                                                        <path
                                                            d="M22.5 25C24.433 25 26 23.433 26 21.5C26 19.567 24.433 18 22.5 18C20.567 18 19 19.567 19 21.5C19 23.433 20.567 25 22.5 25Z"
                                                            stroke="white"
                                                            strokeWidth="1.2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                        <path
                                                            d="M6.5 29C8.433 29 10 27.433 10 25.5C10 23.567 8.433 22 6.5 22C4.567 22 3 23.567 3 25.5C3 27.433 4.567 29 6.5 29Z"
                                                            stroke="white"
                                                            strokeWidth="1.2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                        <path
                                                            d="M26 10L10 14"
                                                            stroke="white"
                                                            strokeWidth="1.2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                        <path
                                                            d="M10 25.5V8L26 4V21.5"
                                                            stroke="white"
                                                            strokeWidth="1.2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_347_23079">
                                                            <rect
                                                                width="32"
                                                                height="32"
                                                                fill="white"
                                                            />
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                            </div>
                                            <p className="fs-regular-sm  text-center fw-regular md:ml-4">
                                                {" "}
                                                <div className="ring-container   -left-5    ">
                                                    <div className="ringring"></div>
                                                    <div className="circle"></div>
                                                </div>{" "}
                                                Music
                                            </p>
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="h-[95px] w-[112px] md:w-auto  md:h-20  md:flex  items-center  noise-10 inset-border slider-cat-img   py-4 md:py-6 px-4 md:px-8 justify-center">
                                            <div className="w-[2rem] flex mx-auto h-[2rem]">
                                                <svg className="opacity-60"
                                                    width="32"
                                                    height="32"
                                                    viewBox="0 0 32 32"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <g clipPath="url(#clip0_347_23090)">
                                                        <path
                                                            opacity="0.2"
                                                            d="M4.18115 18.1816C4.59615 15.0266 5.80615 11.5566 8.68115 8.68164C11.5562 5.80664 15.0249 4.59539 18.1812 4.18164L27.8187 13.8191C27.4037 16.9741 26.1937 20.4441 23.3187 23.3191C20.4437 26.1941 16.9749 27.4054 13.8187 27.8191L4.18115 18.1816Z"
                                                            fill="white"
                                                        />
                                                        <path
                                                            d="M23.3175 23.3179C17.9425 28.6929 10.485 28.2617 6.89871 27.6542C6.26088 27.5464 5.67243 27.2428 5.21503 26.7854C4.75763 26.328 4.45397 25.7395 4.34621 25.1017C3.73871 21.5154 3.30996 14.0554 8.68246 8.68294C14.055 3.31044 21.515 3.73919 25.1012 4.34669C25.739 4.45446 26.3275 4.75812 26.7849 5.21552C27.2423 5.67292 27.5459 6.26137 27.6537 6.89919C28.2612 10.4854 28.69 17.9454 23.3175 23.3179Z"
                                                            stroke="white"
                                                            strokeWidth="1.2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                        <path
                                                            d="M13 16L16 19"
                                                            stroke="white"
                                                            strokeWidth="1.2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                        <path
                                                            d="M16 13L19 16"
                                                            stroke="white"
                                                            strokeWidth="1.2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                        <path
                                                            d="M20 12L12 20"
                                                            stroke="white"
                                                            strokeWidth="1.2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                        <path
                                                            d="M18.1812 4.18164L27.8187 13.8191"
                                                            stroke="white"
                                                            strokeWidth="1.2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                        <path
                                                            d="M4.18115 18.1816L13.8187 27.8191"
                                                            stroke="white"
                                                            strokeWidth="1.2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_347_23090">
                                                            <rect
                                                                width="32"
                                                                height="32"
                                                                fill="white"
                                                            />
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                            </div>
                                            <p className="fs-regular-sm  text-center fw-regular md:ml-4">
                                                Sports & Gaming
                                            </p>
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="h-[95px] w-[112px] md:w-auto  md:h-20  md:flex  items-center  noise-10 inset-border slider-cat-img   py-4 md:py-6 px-4 md:px-8 justify-center">
                                            <div className="w-[2rem] flex mx-auto h-[2rem]">
                                                <svg className="opacity-60"
                                                    width="32"
                                                    height="32"
                                                    viewBox="0 0 32 32"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <g clipPath="url(#clip0_347_23029)">
                                                        <path
                                                            opacity="0.2"
                                                            d="M20.67 15.3813C24.045 12.4288 28 8.10125 28 4C23.8987 4 19.5712 7.955 16.625 11.33C18.321 12.2817 19.7209 13.6838 20.67 15.3813Z"
                                                            fill="white"
                                                        />
                                                        <path
                                                            d="M2 27H11.5C12.7856 27 14.0423 26.6188 15.1112 25.9046C16.1801 25.1903 17.0132 24.1752 17.5052 22.9874C17.9972 21.7997 18.1259 20.4928 17.8751 19.2319C17.6243 17.971 17.0052 16.8128 16.0962 15.9038C15.1872 14.9948 14.029 14.3757 12.7681 14.1249C11.5072 13.8741 10.2003 14.0028 9.01256 14.4948C7.82484 14.9868 6.80968 15.8199 6.09545 16.8888C5.38122 17.9577 5 19.2144 5 20.5C5 25 2 27 2 27Z"
                                                            stroke="white"
                                                            strokeWidth="1.2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                        <path
                                                            d="M14.0513 14.52C16.45 11.2862 22.4325 4 28 4C28 9.5675 20.7138 15.55 17.48 17.9487"
                                                            stroke="white"
                                                            strokeWidth="1.2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                        <path
                                                            d="M16.625 11.3301C18.3233 12.2809 19.7254 13.683 20.6763 15.3813"
                                                            stroke="white"
                                                            strokeWidth="1.2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_347_23029">
                                                            <rect
                                                                width="32"
                                                                height="32"
                                                                fill="white"
                                                            />
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                            </div>
                                            <p className="fs-regular-sm  text-center fw-regular md:ml-4">
                                                Art & Entertainment
                                            </p>
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="h-[95px] w-[112px] md:w-auto  md:h-20  md:flex  items-center  noise-10 inset-border slider-cat-img   py-4 md:py-6 px-4 md:px-8 justify-center">
                                            <div className="w-[2rem] flex mx-auto h-[2rem]">
                                                <svg className="opacity-60"
                                                    width="32"
                                                    height="32"
                                                    viewBox="0 0 32 32"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <g clipPath="url(#clip0_347_23048)">
                                                        <path
                                                            opacity="0.2"
                                                            d="M26.2819 26.283C28.4361 24.1288 25.579 17.7789 19.9003 12.1002C14.2216 6.42149 7.8717 3.56433 5.71747 5.71856C3.56324 7.87279 6.4204 14.2226 12.0991 19.9014C17.7778 25.5801 24.1277 28.4372 26.2819 26.283Z"
                                                            fill="white"
                                                        />
                                                        <path
                                                            d="M26.2819 26.283C28.4361 24.1288 25.579 17.7789 19.9003 12.1002C14.2216 6.42149 7.8717 3.56433 5.71747 5.71856C3.56324 7.87279 6.4204 14.2226 12.0991 19.9014C17.7778 25.5801 24.1277 28.4372 26.2819 26.283Z"
                                                            stroke="white"
                                                            strokeWidth="1.2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                        <path
                                                            d="M19.9003 19.8998C25.579 14.2211 28.4361 7.87123 26.2819 5.717C24.1277 3.56277 17.7778 6.41993 12.0991 12.0986C6.4204 17.7774 3.56324 24.1272 5.71747 26.2814C7.8717 28.4357 14.2216 25.5785 19.9003 19.8998Z"
                                                            stroke="white"
                                                            strokeWidth="1.2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                        <path
                                                            d="M16 17.5C16.8284 17.5 17.5 16.8284 17.5 16C17.5 15.1716 16.8284 14.5 16 14.5C15.1716 14.5 14.5 15.1716 14.5 16C14.5 16.8284 15.1716 17.5 16 17.5Z"
                                                            fill="white"
                                                        />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_347_23048">
                                                            <rect
                                                                width="32"
                                                                height="32"
                                                                fill="white"
                                                            />
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                            </div>
                                            <p className="fs-regular-sm  text-center fw-regular md:ml-4">
                                                {" "}
                                                <div className="ring-container   -left-5    ">
                                                    <div className="ringring"></div>
                                                    <div className="circle"></div>
                                                </div>{" "}
                                                Science & Tech
                                            </p>
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="h-[95px] w-[112px] md:w-auto  md:h-20  md:flex  items-center  noise-10 inset-border slider-cat-img   py-4 md:py-6 px-4 md:px-8 justify-center">
                                            <div className="w-[2rem] flex mx-auto h-[2rem]">
                                                <svg className="opacity-60"
                                                    width="32"
                                                    height="32"
                                                    viewBox="0 0 32 32"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <g clipPath="url(#clip0_347_23057)">
                                                        <path
                                                            opacity="0.2"
                                                            d="M19 26.0005V20.0005C19 19.7353 18.8946 19.4809 18.7071 19.2934C18.5196 19.1058 18.2652 19.0005 18 19.0005H14C13.7348 19.0005 13.4804 19.1058 13.2929 19.2934C13.1054 19.4809 13 19.7353 13 20.0005V26.0005C13 26.2657 12.8946 26.52 12.7071 26.7076C12.5196 26.8951 12.2652 27.0005 12 27.0005H6C5.73478 27.0005 5.48043 26.8951 5.29289 26.7076C5.10536 26.52 5 26.2657 5 26.0005V14.443C5.00001 14.3036 5.02915 14.1658 5.08555 14.0384C5.14195 13.9109 5.22436 13.7967 5.3275 13.703L15.3275 4.26047C15.5116 4.09288 15.7516 4 16.0006 4C16.2496 4 16.4896 4.09288 16.6737 4.26047L26.6737 13.703C26.7769 13.7967 26.8593 13.9109 26.9157 14.0384C26.9721 14.1658 27.0012 14.3036 27.0012 14.443V26.0005C27.0012 26.2657 26.8959 26.52 26.7084 26.7076C26.5208 26.8951 26.2665 27.0005 26.0012 27.0005H20C19.7348 27.0005 19.4804 26.8951 19.2929 26.7076C19.1054 26.52 19 26.2657 19 26.0005Z"
                                                            fill="white"
                                                        />
                                                        <path
                                                            d="M19 26.0005V20.0005C19 19.7353 18.8946 19.4809 18.7071 19.2934C18.5196 19.1058 18.2652 19.0005 18 19.0005H14C13.7348 19.0005 13.4804 19.1058 13.2929 19.2934C13.1054 19.4809 13 19.7353 13 20.0005V26.0005C13 26.2657 12.8946 26.52 12.7071 26.7076C12.5196 26.8951 12.2652 27.0005 12 27.0005H6C5.73478 27.0005 5.48043 26.8951 5.29289 26.7076C5.10536 26.52 5 26.2657 5 26.0005V14.443C5.00001 14.3036 5.02915 14.1658 5.08555 14.0384C5.14195 13.9109 5.22436 13.7967 5.3275 13.703L15.3275 4.26047C15.5116 4.09288 15.7516 4 16.0006 4C16.2496 4 16.4896 4.09288 16.6737 4.26047L26.6737 13.703C26.7769 13.7967 26.8593 13.9109 26.9157 14.0384C26.9721 14.1658 27.0012 14.3036 27.0012 14.443V26.0005C27.0012 26.2657 26.8959 26.52 26.7084 26.7076C26.5208 26.8951 26.2665 27.0005 26.0012 27.0005H20C19.7348 27.0005 19.4804 26.8951 19.2929 26.7076C19.1054 26.52 19 26.2657 19 26.0005Z"
                                                            stroke="white"
                                                            strokeWidth="1.2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_347_23057">
                                                            <rect
                                                                width="32"
                                                                height="32"
                                                                fill="white"
                                                            />
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                            </div>
                                            <p className="fs-regular-sm  text-center fw-regular md:ml-4">
                                                <div className="ring-container  -left-5 ">
                                                    <div className="ringring"></div>
                                                    <div className="circle"></div>
                                                </div>{" "}
                                                Home & Lifestyle
                                            </p>
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="h-[95px] w-[112px] md:w-auto  md:h-20  md:flex  items-center  noise-10 inset-border slider-cat-img   py-4 md:py-6 px-4 md:px-8 justify-center">
                                            <div className="w-[2rem] flex mx-auto h-[2rem]">
                                                <svg className="opacity-60"
                                                    width="32"
                                                    height="32"
                                                    viewBox="0 0 32 32"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <g clipPath="url(#clip0_347_23064)">
                                                        <path
                                                            opacity="0.2"
                                                            d="M16 13C17.6569 13 19 11.6569 19 10C19 8.34315 17.6569 7 16 7C14.3431 7 13 8.34315 13 10C13 11.6569 14.3431 13 16 13Z"
                                                            fill="white"
                                                        />
                                                        <path
                                                            opacity="0.2"
                                                            d="M5 25C6.65685 25 8 23.6569 8 22C8 20.3431 6.65685 19 5 19C3.34315 19 2 20.3431 2 22C2 23.6569 3.34315 25 5 25Z"
                                                            fill="white"
                                                        />
                                                        <path
                                                            opacity="0.2"
                                                            d="M27 25C28.6569 25 30 23.6569 30 22C30 20.3431 28.6569 19 27 19C25.3431 19 24 20.3431 24 22C24 23.6569 25.3431 25 27 25Z"
                                                            fill="white"
                                                        />
                                                        <path
                                                            d="M2 10H13"
                                                            stroke="white"
                                                            strokeWidth="1.2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                        <path
                                                            d="M19 10H30"
                                                            stroke="white"
                                                            strokeWidth="1.2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                        <path
                                                            d="M16 13C17.6569 13 19 11.6569 19 10C19 8.34315 17.6569 7 16 7C14.3431 7 13 8.34315 13 10C13 11.6569 14.3431 13 16 13Z"
                                                            stroke="white"
                                                            strokeWidth="1.2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                        <path
                                                            d="M5 25C6.65685 25 8 23.6569 8 22C8 20.3431 6.65685 19 5 19C3.34315 19 2 20.3431 2 22C2 23.6569 3.34315 25 5 25Z"
                                                            stroke="white"
                                                            strokeWidth="1.2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                        <path
                                                            d="M27 25C28.6569 25 30 23.6569 30 22C30 20.3431 28.6569 19 27 19C25.3431 19 24 20.3431 24 22C24 23.6569 25.3431 25 27 25Z"
                                                            stroke="white"
                                                            strokeWidth="1.2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                        <path
                                                            d="M18.9727 10.4062C20.9534 10.9637 22.7385 12.0647 24.1255 13.5847C25.5124 15.1047 26.4459 16.9829 26.8202 19.0063"
                                                            stroke="white"
                                                            strokeWidth="1.2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                        <path
                                                            d="M5.18018 19.0063C5.55452 16.9829 6.48807 15.1049 7.87504 13.5849C9.26202 12.0649 11.047 10.9638 13.0277 10.4062"
                                                            stroke="white"
                                                            strokeWidth="1.2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_347_23064">
                                                            <rect
                                                                width="32"
                                                                height="32"
                                                                fill="white"
                                                            />
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                            </div>
                                            <p className="fs-regular-sm  text-center fw-regular md:ml-4">
                                                Design & Style
                                            </p>
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="h-[95px] w-[112px] md:w-auto  md:h-20  md:flex  items-center  noise-10 inset-border slider-cat-img   py-4 md:py-6 px-4 md:px-8 justify-center">
                                            <div className="w-[2rem] flex mx-auto h-[2rem]">
                                                <svg className="opacity-60"
                                                    width="32"
                                                    height="32"
                                                    viewBox="0 0 32 32"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <g clipPath="url(#clip0_347_23079)">
                                                        <path
                                                            opacity="0.2"
                                                            d="M22.5 25C24.433 25 26 23.433 26 21.5C26 19.567 24.433 18 22.5 18C20.567 18 19 19.567 19 21.5C19 23.433 20.567 25 22.5 25Z"
                                                            fill="white"
                                                        />
                                                        <path
                                                            opacity="0.2"
                                                            d="M6.5 29C8.433 29 10 27.433 10 25.5C10 23.567 8.433 22 6.5 22C4.567 22 3 23.567 3 25.5C3 27.433 4.567 29 6.5 29Z"
                                                            fill="white"
                                                        />
                                                        <path
                                                            d="M22.5 25C24.433 25 26 23.433 26 21.5C26 19.567 24.433 18 22.5 18C20.567 18 19 19.567 19 21.5C19 23.433 20.567 25 22.5 25Z"
                                                            stroke="white"
                                                            strokeWidth="1.2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                        <path
                                                            d="M6.5 29C8.433 29 10 27.433 10 25.5C10 23.567 8.433 22 6.5 22C4.567 22 3 23.567 3 25.5C3 27.433 4.567 29 6.5 29Z"
                                                            stroke="white"
                                                            strokeWidth="1.2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                        <path
                                                            d="M26 10L10 14"
                                                            stroke="white"
                                                            strokeWidth="1.2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                        <path
                                                            d="M10 25.5V8L26 4V21.5"
                                                            stroke="white"
                                                            strokeWidth="1.2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_347_23079">
                                                            <rect
                                                                width="32"
                                                                height="32"
                                                                fill="white"
                                                            />
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                            </div>
                                            <p className="fs-regular-sm  text-center fw-regular md:ml-4">
                                                {" "}
                                                <div className="ring-container   -left-5    ">
                                                    <div className="ringring"></div>
                                                    <div className="circle"></div>
                                                </div>{" "}
                                                Music
                                            </p>
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="h-[95px] w-[112px] md:w-auto  md:h-20  md:flex  items-center  noise-10 inset-border slider-cat-img   py-4 md:py-6 px-4 md:px-8 justify-center">
                                            <div className="w-[2rem] flex mx-auto h-[2rem]">
                                                <svg className="opacity-60"
                                                    width="32"
                                                    height="32"
                                                    viewBox="0 0 32 32"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <g clipPath="url(#clip0_347_23090)">
                                                        <path
                                                            opacity="0.2"
                                                            d="M4.18115 18.1816C4.59615 15.0266 5.80615 11.5566 8.68115 8.68164C11.5562 5.80664 15.0249 4.59539 18.1812 4.18164L27.8187 13.8191C27.4037 16.9741 26.1937 20.4441 23.3187 23.3191C20.4437 26.1941 16.9749 27.4054 13.8187 27.8191L4.18115 18.1816Z"
                                                            fill="white"
                                                        />
                                                        <path
                                                            d="M23.3175 23.3179C17.9425 28.6929 10.485 28.2617 6.89871 27.6542C6.26088 27.5464 5.67243 27.2428 5.21503 26.7854C4.75763 26.328 4.45397 25.7395 4.34621 25.1017C3.73871 21.5154 3.30996 14.0554 8.68246 8.68294C14.055 3.31044 21.515 3.73919 25.1012 4.34669C25.739 4.45446 26.3275 4.75812 26.7849 5.21552C27.2423 5.67292 27.5459 6.26137 27.6537 6.89919C28.2612 10.4854 28.69 17.9454 23.3175 23.3179Z"
                                                            stroke="white"
                                                            strokeWidth="1.2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                        <path
                                                            d="M13 16L16 19"
                                                            stroke="white"
                                                            strokeWidth="1.2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                        <path
                                                            d="M16 13L19 16"
                                                            stroke="white"
                                                            strokeWidth="1.2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                        <path
                                                            d="M20 12L12 20"
                                                            stroke="white"
                                                            strokeWidth="1.2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                        <path
                                                            d="M18.1812 4.18164L27.8187 13.8191"
                                                            stroke="white"
                                                            strokeWidth="1.2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                        <path
                                                            d="M4.18115 18.1816L13.8187 27.8191"
                                                            stroke="white"
                                                            strokeWidth="1.2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_347_23090">
                                                            <rect
                                                                width="32"
                                                                height="32"
                                                                fill="white"
                                                            />
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                            </div>
                                            <p className="fs-regular-sm  text-center fw-regular md:ml-4">
                                                Sports & Gaming
                                            </p>
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="h-[95px] w-[112px] md:w-auto  md:h-20  md:flex  items-center  noise-10 inset-border slider-cat-img   py-4 md:py-6 px-4 md:px-8 justify-center">
                                            <div className="w-[2rem] flex mx-auto h-[2rem]">
                                                <svg className="opacity-60"
                                                    width="32"
                                                    height="32"
                                                    viewBox="0 0 32 32"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <g clipPath="url(#clip0_347_23029)">
                                                        <path
                                                            opacity="0.2"
                                                            d="M20.67 15.3813C24.045 12.4288 28 8.10125 28 4C23.8987 4 19.5712 7.955 16.625 11.33C18.321 12.2817 19.7209 13.6838 20.67 15.3813Z"
                                                            fill="white"
                                                        />
                                                        <path
                                                            d="M2 27H11.5C12.7856 27 14.0423 26.6188 15.1112 25.9046C16.1801 25.1903 17.0132 24.1752 17.5052 22.9874C17.9972 21.7997 18.1259 20.4928 17.8751 19.2319C17.6243 17.971 17.0052 16.8128 16.0962 15.9038C15.1872 14.9948 14.029 14.3757 12.7681 14.1249C11.5072 13.8741 10.2003 14.0028 9.01256 14.4948C7.82484 14.9868 6.80968 15.8199 6.09545 16.8888C5.38122 17.9577 5 19.2144 5 20.5C5 25 2 27 2 27Z"
                                                            stroke="white"
                                                            strokeWidth="1.2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                        <path
                                                            d="M14.0513 14.52C16.45 11.2862 22.4325 4 28 4C28 9.5675 20.7138 15.55 17.48 17.9487"
                                                            stroke="white"
                                                            strokeWidth="1.2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                        <path
                                                            d="M16.625 11.3301C18.3233 12.2809 19.7254 13.683 20.6763 15.3813"
                                                            stroke="white"
                                                            strokeWidth="1.2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_347_23029">
                                                            <rect
                                                                width="32"
                                                                height="32"
                                                                fill="white"
                                                            />
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                            </div>
                                            <p className="fs-regular-sm  text-center fw-regular md:ml-4">
                                                Art & Entertainment
                                            </p>
                                        </div>
                                    </div>



                                </OwlCarousel>
                            </div>
                        </div>
                    </div>
                </section> */}
           {/* new lesson available slider */}

           <section className="mt-[60px] md:mt-[80px] lg:mt-[120px] group">
                    <div className="container mx-auto px-5 xl:px-0">
                        <div className="grid grid-cols-1 lg:grid-cols-3 mb-8">
                            <div onClick={() => { handleSliderPrev(newLessonRef) }} className="cursor-pointer hidden lg:block lg:invisible group-hover:lg:visible">
                                <Button
                                    className={"secondary header_arrow"}
                                    icon={<ArrowLeft />}
                                ></Button>
                            </div>

                            <div className="text-center">
                                <h3 className="font-medium">
                                    New Lesson Available
                                </h3>
                                <p className="text-base text-[#FFFFFF] font-normal opacity-60">
                                    12 Classes
                                </p>
                            </div>

                            <div onClick={() => { handleSliderNext(newLessonRef) }} className="ml-auto cursor-pointer hidden lg:block lg:invisible group-hover:lg:visible">
                                <Button
                                    className={"secondary header_arrow"}
                                    icon={<ArrowRight />}
                                ></Button>
                            </div>
                        </div>
                    </div>
                    <div className="px-5 xl:px-0">
                        <div className="grid grid-cols-12">
                            <div className="col-span-12">
                                <OwlCarousel
                                    ref={newLessonRef}
                                    className="owl-theme relative"


                                    margin={24}
                                    items={3}
                                    autoplay={true}
                                    autoplayHoverPause={true}
                                    autoplayTimeout={7000}
                                    animateIn={"fadeIn"}
                                    animateOut={"fadeOut"}
                                    nav={false}
                                    dots={false}
                                    autoWidth={true}
                                >
                                    <CourseCard
                                        title={"The Changing Face of Beauty"}
                                        instructor={
                                            "Madeleine Albright & Condoleezza Rice"
                                        }
                                        duration={"2 hr 10 min"}
                                        lessons={7}
                                        image={newLesson1}
                                        badge={"primary"}
                                        badge_text={""}
                                    />
                                    <CourseCard
                                        title={
                                            "An Intuitive Approach to Design"
                                        }
                                        instructor={"Christina Aguilera"}
                                        duration={"2 hr 13 min"}
                                        lessons={7}
                                        image={newLesson2}
                                        badge={"primary"}
                                        badge_text={""}
                                    />
                                    <CourseCard
                                        title={
                                            "Elevate Your Singing and Stage Presence"
                                        }
                                        instructor={"Kris Jenner"}
                                        duration={"2 hr 10 min"}
                                        lessons={7}
                                        image={newLesson3}
                                        badge={"primary"}
                                        badge_text={""}
                                    />
                                    <CourseCard
                                        title={"The Power of Personal Branding"}
                                        instructor={"Richard Branson"}
                                        duration={"2 hr 10 min"}
                                        lessons={7}
                                        image={newLesson4}
                                        badge={"primary"}
                                        badge_text={""}
                                    />
                                    <CourseCard
                                        title={"Authentic Leadership"}
                                        instructor={"George W. Bush"}
                                        duration={"2 hr 10 min"}
                                        lessons={7}
                                        image={newLesson5}
                                        badge={"primary"}
                                        badge_text={""}
                                    />
                                    <CourseCard
                                        title={"The Changing Face of Beauty"}
                                        instructor={
                                            "Madeleine Albright & Condoleezza Rice"
                                        }
                                        duration={"2 hr 10 min"}
                                        lessons={7}
                                        image={newLesson1}
                                        badge={"primary"}
                                        badge_text={""}
                                    />
                                    <CourseCard
                                        title={
                                            "An Intuitive Approach to Design"
                                        }
                                        instructor={"Christina Aguilera"}
                                        duration={"2 hr 13 min"}
                                        lessons={7}
                                        image={newLesson2}
                                        badge={"primary"}
                                        badge_text={""}
                                    />
                                    <CourseCard
                                        title={
                                            "Elevate Your Singing and Stage Presence"
                                        }
                                        instructor={"Kris Jenner"}
                                        duration={"2 hr 10 min"}
                                        lessons={7}
                                        image={newLesson3}
                                        badge={"primary"}
                                        badge_text={""}
                                    />
                                </OwlCarousel>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Art and entertainment  slider */}

                <section className="mt-[60px] md:mt-[80px] lg:mt-[120px] group">
                    <div className="container mx-auto px-5 xl:px-0">
                        <div className="grid grid-cols-1 lg:grid-cols-3 mb-8">
                            <div className="cursor-pointer hidden lg:block lg:invisible group-hover:lg:visible">
                                <Button
                                    className={"secondary header_arrow"}
                                    icon={<ArrowLeft />}
                                ></Button>
                            </div>

                            <div className="text-center">
                                <h3 className="font-medium">
                                    Arts & Entertainment
                                </h3>
                                <p className="text-base text-[#FFFFFF] font-normal opacity-60">
                                    22 Classes
                                </p>
                            </div>

                            <div className="ml-auto cursor-pointer hidden lg:block lg:invisible group-hover:lg:visible">
                                <Button
                                    className={"secondary header_arrow"}
                                    icon={<ArrowRight />}
                                ></Button>
                            </div>
                        </div>
                    </div>
                    <div className="px-5 xl:px-0">
                        <div className="grid grid-cols-12">
                            <div className="col-span-12">
                                <OwlCarousel
                                    className="owl-theme relative"


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
                                    <CourseCard
                                        title={
                                            "Photographing People Who Are Close to You"
                                        }
                                        instructor={
                                            "Madeleine Albright & Condoleezza Rice"
                                        }
                                        duration={"2 hr 10 min"}
                                        lessons={7}
                                        image={art1}
                                        badge={"primary"}
                                        badge_text={""}
                                    />
                                    <CourseCard
                                        title={"Taking Care of Your Voice"}
                                        instructor={"Christina Aguilera"}
                                        duration={"2 hr 13 min"}
                                        lessons={7}
                                        image={art2}
                                        badge={"primary"}
                                        badge_text={""}
                                    />
                                    <CourseCard
                                        title={
                                            "The Technical Side of Photography"
                                        }
                                        instructor={"Kris Jenner"}
                                        duration={"2 hr 10 min"}
                                        lessons={7}
                                        image={art3}
                                        badge={"primary"}
                                        badge_text={""}
                                    />
                                    <CourseCard
                                        title={
                                            "Style Your Own Hair For Any Occasion"
                                        }
                                        instructor={"Richard Branson"}
                                        duration={"2 hr 10 min"}
                                        lessons={7}
                                        image={art4}
                                        badge={"primary"}
                                        badge_text={""}
                                    />
                                    <CourseCard
                                        title={
                                            "ELEVATE YOUR SINGING AND STAGE PRESENCE"
                                        }
                                        instructor={"George W. Bush"}
                                        duration={"2 hr 10 min"}
                                        lessons={7}
                                        image={art5}
                                        badge={"primary"}
                                        badge_text={""}
                                    />
                                    <CourseCard
                                        title={
                                            "Photographing People Who Are Close to You"
                                        }
                                        instructor={
                                            "Madeleine Albright & Condoleezza Rice"
                                        }
                                        duration={"2 hr 10 min"}
                                        lessons={7}
                                        image={art1}
                                        badge={"primary"}
                                        badge_text={""}
                                    />
                                    <CourseCard
                                        title={"Taking Care of Your Voice"}
                                        instructor={"Christina Aguilera"}
                                        duration={"2 hr 13 min"}
                                        lessons={7}
                                        image={art2}
                                        badge={"primary"}
                                        badge_text={""}
                                    />
                                    <CourseCard
                                        title={
                                            "The Technical Side of Photography"
                                        }
                                        instructor={"Kris Jenner"}
                                        duration={"2 hr 10 min"}
                                        lessons={7}
                                        image={art3}
                                        badge={"primary"}
                                        badge_text={""}
                                    />
                                </OwlCarousel>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Design & Style  slider */}

                <section className="mt-[60px] md:mt-[80px] lg:mt-[120px] group">
                    <div className="container mx-auto px-5 xl:px-0">
                        <div className="grid grid-cols-1 lg:grid-cols-3 mb-8">
                            <div className="cursor-pointer hidden lg:block lg:invisible group-hover:lg:visible">
                                <Button
                                    className={"secondary header_arrow"}
                                    icon={<ArrowLeft />}
                                ></Button>
                            </div>

                            <div className="text-center">
                                <h3 className="font-medium">Design & Style</h3>
                                <p className="text-base text-[#FFFFFF] font-normal opacity-60">
                                    36 Classes
                                </p>
                            </div>

                            <div className="ml-auto cursor-pointer hidden lg:block lg:invisible group-hover:lg:visible">
                                <Button
                                    className={"secondary header_arrow"}
                                    icon={<ArrowRight />}
                                ></Button>
                            </div>
                        </div>
                    </div>
                    <div className="px-5 xl:px-0">
                        <div className="grid grid-cols-12">
                            <div className="col-span-12">
                                <OwlCarousel
                                    className="owl-theme relative"


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
                                    <CourseCard
                                        title={"The Power of Personal Branding"}
                                        instructor={
                                            "Madeleine Albright & Condoleezza Rice"
                                        }
                                        duration={"2 hr 10 min"}
                                        lessons={7}
                                        image={design1}
                                        badge={"primary"}
                                        badge_text={""}
                                    />
                                    <CourseCard
                                        title={"The Power of What You Wear"}
                                        instructor={"Kris Jenner"}
                                        duration={"2 hr 13 min"}
                                        lessons={7}
                                        image={design2}
                                        badge={"primary"}
                                        badge_text={""}
                                    />
                                    <CourseCard
                                        title={
                                            "The Evolution of a Photographer"
                                        }
                                        instructor={"Richard Branson"}
                                        duration={"2 hr 10 min"}
                                        lessons={7}
                                        image={design3}
                                        badge={"primary"}
                                        badge_text={""}
                                    />
                                    <CourseCard
                                        title={"The Changing Face of Beauty"}
                                        instructor={"Christina Aguilera"}
                                        duration={"2 hr 10 min"}
                                        lessons={7}
                                        image={design4}
                                        badge={"primary"}
                                        badge_text={""}
                                    />
                                    <CourseCard
                                        title={
                                            "An Intuitive Approach to Design"
                                        }
                                        instructor={"George W. Bush"}
                                        duration={"2 hr 10 min"}
                                        lessons={7}
                                        image={design5}
                                        badge={"primary"}
                                        badge_text={""}
                                    />

                                    <CourseCard
                                        title={"The Changing Face of Beauty"}
                                        instructor={
                                            "Madeleine Albright & Condoleezza Rice"
                                        }
                                        duration={"2 hr 10 min"}
                                        lessons={7}
                                        image={design1}
                                        badge={"primary"}
                                        badge_text={""}
                                    />
                                    <CourseCard
                                        title={
                                            "An Intuitive Approach to Design"
                                        }
                                        instructor={"Christina Aguilera"}
                                        duration={"2 hr 13 min"}
                                        lessons={7}
                                        image={design2}
                                        badge={"primary"}
                                        badge_text={""}
                                    />
                                    <CourseCard
                                        title={
                                            "Elevate Your Singing and Stage Presence"
                                        }
                                        instructor={"Kris Jenner"}
                                        duration={"2 hr 10 min"}
                                        lessons={7}
                                        image={design3}
                                        badge={"primary"}
                                        badge_text={""}
                                    />
                                </OwlCarousel>
                            </div>
                        </div>
                    </div>
                </section>



                {/*  marquee text gain new skills */}
                <section className="mt-[60px] md:mt-[80px] lg:mt-[120px] relative ">
                    <div className="marquee-shadow left "></div>
                    <div className="marquee-shadow right "></div>
                    <div className="">
                        <div className="grid grid-cols-12">
                            <div className="col-span-12">
                                <div className="text-center ">
                                    <marquee
                                        direction="left"
                                        loop=""
                                        scrollamount="23"
                                    >
                                        <h1 className="uppercase slider-Text">
                                            GAIN NEW SKILLS - GAIN NEW SKILLS -
                                            GAIN NEW SKILLS
                                        </h1>
                                    </marquee>
                                    <marquee
                                        direction="right"
                                        loop=""
                                        scrollamount="18"
                                    >
                                        <h1 className="uppercase slider-Text">
                                            GAIN NEW SKILLS - GAIN NEW SKILLS -
                                            GAIN NEW SKILLS
                                        </h1>
                                    </marquee>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Upcoming slider */}

                <section className="mt-[60px] md:mt-[80px] lg:mt-[120px] group">
                    <div className="container mx-auto px-5 xl:px-0">
                        <div className="grid grid-cols-1 lg:grid-cols-3 mb-8">
                            <div onClick={() => { handleSliderPrev(upComingRef) }} className="cursor-pointer hidden lg:block lg:invisible group-hover:lg:visible">
                                <Button
                                    className={"secondary header_arrow"}
                                    icon={<ArrowLeft />}
                                ></Button>
                            </div>

                            <div className="text-center">
                                <h3 className=" ">Upcoming</h3>
                            </div>

                            <div onClick={() => { handleSliderNext(upComingRef) }} className="ml-auto cursor-pointer hidden lg:block lg:invisible group-hover:lg:visible">
                                <Button
                                    className={"secondary header_arrow"}
                                    icon={<ArrowRight />}
                                ></Button>
                            </div>
                        </div>
                    </div>
                    <div className="px-5 xl:px-0">
                        <div className="grid grid-cols-12">
                            <div className="col-span-12">
                                <OwlCarousel
                                    ref={upComingRef}
                                    className="owl-theme relative"


                                    margin={24}
                                    autoplay={true}
                                    autoplayHoverPause={true}
                                    autoplayTimeout={7000}
                                    animateIn={"fadeIn"}
                                    animateOut={"fadeOut"}
                                    nav={false}
                                    dots={false}
                                    autoWidth={true}
                                >
                                         {upcomingLiveTrainings?.map((data, index)=>(
                                            <AcademySmallCard
                                            className={"academy-small-card new-course-card"}
                                            title={data?.title}
                                            instructor={ data?.instructor?.full_name
                                            }
                                            duration={ "5 hr 40 min"}
                                            lessons={data?.lessons_count}
                                            image={data?.thumbnail?.medium?.url}
                                            badge={"primary"} 
                                            live={false} 
                                            videoProgress={0} 
                                            badge_text={"upcoming"}
                                            upcomming={true}
                                            />
                                            ))}
                                  {/* {upcomingLiveTrainings?.map((data, index)=>(  <CourseCard
                                        title={"The Changing Face of Beauty"}
                                        instructor={
                                            "Madeleine Albright & Condoleezza Rice"
                                        }
                                        duration={"2 hr 10 min"}
                                        lessons={7}
                                        image={newLesson1}
                                        badge={"primary"}
                                        badge_text={"upcoming"}
                                    />
                                    ))} */}
                                   
                                </OwlCarousel>
                            </div>
                        </div>
                    </div>
                </section>

    </div>
  )
}

export default LiveSidersOld