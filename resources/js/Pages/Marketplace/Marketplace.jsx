import React, { useEffect } from 'react'
import Layout from '@/Layouts/Layout'
import OwlCarousel from "react-owl-carousel";
import market1 from "../../../assets/svg/Marketplace1.svg";


// import desktop from "../../../assets/img/MARKETPLACE_DESK.png";
import desktop from "../../../assets/img/marketplace_2_desktop.svg";
// import mobile from "../../../assets/img/MARKETPLACE_MOBILE.png";
import mobile from "../../../assets/img/marketplace_2_mobile.svg";

import slide1 from "../../../assets/img/marketplace2.jpg";
import slideMobile1 from "../../../assets/img/marketplaceMobile2.jpg";

import marketplace1 from "../../../assets/svg/Marketplace1.svg";
import marketplace2 from "../../../assets/svg/Marketplace2.svg";
import marketplace3 from "../../../assets/svg/Marketplace3.svg";
import marketplace4 from "../../../assets/svg/Marketplace4.svg";
import marketplace5 from "../../../assets/svg/Marketplace5.svg";
import marketplace6 from "../../../assets/svg/Marketplace6.svg";


import { Head, Link } from '@inertiajs/react';
import axios from 'axios';
import { useState } from 'react';
import ReactToast from '@/Components/ReactToast';
import AcademyText from '../../Components/MARKETPLACE_LOTTIE_ANIMATION2.json';
import Lottie from 'react-lottie-player';
import AcademyLargeCard from '@/Components/Course/AcademyLargeCard';
import { useRef } from 'react';
import SlideArrows from '@/Components/SlideArrows';
import MarketplaceCard from './MarketplaceCard';
import MarketplaceSlide from '@/Components/Course/MarketplaceSlide';


const Marketplace = () => {
    const mainRef = useRef(null);
    const handleSliderNext = (e) => {
        e.current.next();
    };

    const handleSliderPrev = (e) => {
        e.current.prev();
    };

    const [owlOptions, setOwlOptions] = useState({
        options: {
            loop: true,
            margin: 18,
            items: 1,
            autoplay: false,
            autoplayHoverPause: true,
            autoplayTimeout: 10000,
            // animationDuration: 100,
            smartSpeed: 50,
            animateIn: "fadeIn",
            animateOut: "fadeOut",
            nav: false,
            dots: true,
            autoWidth: false,
            responsiveClass: true,

            responsive: {
                0: {
                    dotsEach: 1,
                    items: 1,
                },
                600: {
                    dotsEach: 1,
                },
                1200: {
                    dotsEach: 1,
                }
            }
        }
    })

    const imageArray = [
        {
            thumbnail: {

                blur: {
                    url: slide1,
                },
                original: {
                    url: slide1,
                }

            },
            mobile_thumbnail: {

                blur: {
                    url: slideMobile1,
                },
                original: {
                    url: slideMobile1,
                }

            }

        },
        {
            thumbnail: {

                blur: {
                    url: slide1,
                },
                original: {
                    url: slide1,
                }

            },
            mobile_thumbnail: {

                blur: {
                    url: slideMobile1,
                },
                original: {
                    url: slideMobile1,
                }

            }
        },
        {
            thumbnail: {

                blur: {
                    url: slide1,
                },
                original: {
                    url: slide1,
                }

            },
            mobile_thumbnail: {

                blur: {
                    url: slideMobile1,
                },
                original: {
                    url: slideMobile1,
                }

            }
        },

    ];

    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    const [showTopShadow, setShowTopShadow] = useState(false);
    const [showBottomShadow, setShowBottomShadow] = useState(true);

    const handleScrollModules = (event) => {
        const { scrollTop, scrollHeight, clientHeight } = event.target;

        // Calculate the remaining space at the top and bottom
        const remainingTopSpace = scrollTop;
        const remainingBottomSpace = scrollHeight - scrollTop - clientHeight;

        // Set the state to show/hide the top and bottom shadows based on the remaining space
        setShowTopShadow(remainingTopSpace >= 5);
        setShowBottomShadow(remainingBottomSpace >= 5);
    };


    const companies = [
        {
            companyName: "Solutions Corporation",
            logo: marketplace1,
            description: "Worem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulp utate libero et velit  adipiscing elit. Nun Worem ipsum",
            link: "https://www.abc-corp.com",
        },
        {
            companyName: "Tech Group Industries",
            logo: marketplace2,
            description: "Worem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulp utate libero et velit  adipiscing elit. Nun Worem ipsum",
            link: "https://www.xyz-industries.com",
        },
        {
            companyName: "Services Innovators Ltd.",
            logo: marketplace3,
            description: "Worem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulp utate libero et velit  adipiscing elit. Nun Worem ipsum",
            link: "https://www.tech-innovators.com",
        },
        {
            companyName: "Global Services Inc.",
            logo: marketplace4,
            description: "Worem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulp utate libero et velit  adipiscing elit. Nun Worem ipsum",
            link: "https://www.global-services-inc.com",
        },
        {
            companyName: "Innovate Solutions Co.",
            logo: marketplace5,
            description: "Worem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulp utate libero et velit  adipiscing elit. Nun Worem ipsum",
            link: "https://www.innovate-solutions.com",
        },
        {
            companyName: "Dynamic Tech Group",
            logo: marketplace6,
            description: "Worem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulp utate libero et velit  adipiscing elit. Nun Worem ipsum",
            link: "https://www.dynamic-tech-group.com",
        },
    ];


    return (
        <div>
            <Head title="Marketplace" />
            <section data-aos="fade-in" data-aos-delay="100" data-aos-easing="ease" data-aos-duration="300" className="">
                <div className="container mx-auto px-5 xl:px-3">
                    <div className="grid grid-cols-12">
                        <div className="col-span-12  flex items-center justify-center  ">
                            <div className='w-[90%] md:w-[50%] flex flex-col items-center mt-[30px] md:mt-[50px]'>


                                {/* <img src={desktop} alt='coming soon' className='w-full hide-sm-img border-rounded-10 input-shadow' />
                                <img src={mobile} alt='coming soon' className='w-full hide-md-img border-rounded-10 input-shadow' /> */}
                                {/* <Lottie
                                    loop
                                    animationData={AcademyText}
                                    play
                                    className='marketplace-lottie'
                                // style={{ width: 'auto', height: 'auto' }}
                                /> */}

                                <svg className='marketplace-lottie' viewBox="0 0 534 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M313.582 1.50042L278.695 53.054L243.808 1.50041L313.582 1.50042Z" stroke="white" stroke-width="3" stroke-linecap="square" />
                                    <path d="M278.699 17.1484L278.699 50" stroke="white" stroke-width="3" stroke-linecap="square" />
                                    <path d="M309.439 15.1689H248.057" stroke="white" stroke-width="3" stroke-linecap="square" />
                                    <path d="M0 50.4229V3.78264H18.0414L26.285 38.0299L34.5286 3.78264H52.5024V50.4229H41.4884V15.2428L32.2312 50.4229H20.2712L11.0816 15.2428V50.4229H0Z" fill="white" />
                                    <path d="M93.5427 50.4229L89.9614 39.8289H72.7985L69.2172 50.4229H57.4599L74.4877 3.78264H88.2722L105.3 50.4229H93.5427ZM75.5689 31.6336H87.191L81.38 14.31L75.5689 31.6336Z" fill="white" />
                                    <path d="M110.23 50.4229V3.78264H131.582C142.732 3.78264 149.286 8.64655 149.286 16.9752C149.286 23.2383 145.097 26.9029 141.786 27.5026C145.705 28.1022 148.475 30.5009 148.475 35.3648C148.475 46.0254 148.88 48.1575 151.313 50.4229H139.421C137.664 48.0243 137.191 46.1587 137.191 37.0305C137.191 33.6324 134.893 32.3665 131.853 32.3665H121.514V50.4229H110.23ZM121.514 23.9712H130.569C135.028 23.9712 137.664 21.7725 137.664 18.1079C137.664 14.5765 135.231 12.1779 130.569 12.1779H121.514V23.9712Z" fill="white" />
                                    <path d="M200.929 50.4229H187.28L169.239 29.1683V50.4229H157.954V3.78264H169.239V24.1711L187.01 3.78264H200.119L180.253 26.6364L200.929 50.4229Z" fill="white" />
                                    <path d="M204.755 50.4229V3.78264H239.013V12.4444H216.039V22.5054H237.324V31.1671H216.039V41.7612H239.351V50.4229H204.755Z" fill="white" />
                                    <path d="M318.612 50.4229V3.78264H340.099C351.992 3.78264 357.735 9.24621 357.735 18.1079C357.735 26.9695 351.992 32.3665 340.099 32.3665H329.896V50.4229H318.612ZM329.896 23.9712H339.086C344.018 23.9712 346.113 21.3061 346.113 18.1079C346.113 14.9763 344.018 12.1779 339.086 12.1779H329.896V23.9712Z" fill="white" />
                                    <path d="M363.499 50.4229V3.78264H374.783V41.4946H397.284V50.4229H363.499Z" fill="white" />
                                    <path d="M435.134 50.4229L431.552 39.8289H414.39L410.808 50.4229H399.051L416.079 3.78264H429.863L446.891 50.4229H435.134ZM417.16 31.6336H428.782L422.971 14.31L417.16 31.6336Z" fill="white" />
                                    <path d="M471.799 51.4224C457.271 51.4224 447.946 41.3614 447.946 27.236C447.946 12.9774 457.271 2.7832 471.799 2.7832C483.286 2.7832 490.381 8.64655 492.543 16.8419H480.38C479.096 13.777 476.258 11.7781 471.799 11.7781C464.298 11.7781 460.041 17.908 460.041 27.236C460.041 36.4975 464.298 42.4274 471.799 42.4274C476.258 42.4274 479.096 40.2953 480.38 37.0305H492.543C490.381 45.4257 483.286 51.4224 471.799 51.4224Z" fill="white" />
                                    <path d="M498.82 50.4229V3.78264H533.078V12.4444H510.104V22.5054H531.389V31.1671H510.104V41.7612H533.416V50.4229H498.82Z" fill="white" />
                                </svg>

                                <p className='fs-16 fw-regular text-center mt-[16px] md:mt-[22px] '>Capital Club provides unlimited access to an exclusive marketplace of VIP services with privately negotiated rates, premium support and membership privileges. </p>

                            </div>
                        </div>
                    </div>
                    {/* search fields  */}
                    <div className='w-full lg:flex justify-center gap-x-5 my-[30px] md:mt-[42px] md:mb-[52px]'>

                        <div className='bg-[#1A1A1A] search-w marketplace-search-wrapper py-2.5 lg:py-4 pl-9 pr-2 flex items-center'>
                            <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14.9734 13.281H14.0846L13.7696 12.9772C15.1196 11.4022 15.8171 9.25348 15.4346 6.96973C14.9059 3.84223 12.2959 1.34473 9.14586 0.962227C4.38711 0.377227 0.38211 4.38223 0.96711 9.14098C1.34961 12.291 3.84711 14.901 6.97461 15.4297C9.25836 15.8122 11.4071 15.1147 12.9821 13.7647L13.2859 14.0797V14.9685L18.0671 19.7497C18.5284 20.211 19.2821 20.211 19.7434 19.7497C20.2046 19.2885 20.2046 18.5347 19.7434 18.0735L14.9734 13.281ZM8.22336 13.281C5.42211 13.281 3.16086 11.0197 3.16086 8.21848C3.16086 5.41723 5.42211 3.15598 8.22336 3.15598C11.0246 3.15598 13.2859 5.41723 13.2859 8.21848C13.2859 11.0197 11.0246 13.281 8.22336 13.281Z" fill="white" />
                            </svg>
                            <input type='text' className=' w-full fs-14 fw-bold' placeholder='SEARCH KEY WORD' />
                        </div>


                        <div className="custom-dropdown is-category-wrap mt-4 lg:mt-0 ">
                            <button className="dropdown-button is-category-btn" onClick={toggleDropdown}>
                                <span className="mt-[2px]">   Category  </span>
                                <svg width="13" height="8" viewBox="0 0 13 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7.33325 7.63803L12.7174 1.78536C13.3546 1.0929 12.8445 0 11.8824 0H1.11584C0.155547 0 -0.354552 1.0929 0.282618 1.78536L5.66499 7.63803C6.10792 8.12066 6.89032 8.12066 7.33325 7.63803Z" fill="white" />
                                </svg>

                            </button>

                            <div className="relative">
                                {isOpen && (
                                    <div className="absolute z-[9999] w-full ">
                                        <div onScroll={handleScrollModules} className="dropdown-options ">

                                            {/* {modules?.length > 5 && <>
                                                <div className={`interests-shadow module-top ${showTopShadow ? '' : 'shadow-off'}`}></div>
                                                <div className={`interests-shadow module-bottom ${showBottomShadow ? '' : 'shadow-off'}`}></div>
                                            </>
                                            } */}

                                            {/* {lesson?.module == null && */}
                                            <>
                                                <div onClick={() => { setIsOpen(false) }} className="option">
                                                    Category &nbsp; {1}
                                                    <svg width="5" height="6" viewBox="0 0 5 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M0.902344 5.77588L4.82789 3.2984L0.902343 0.820925L0.902344 5.77588Z" fill="white" />
                                                    </svg>
                                                </div>
                                            </>
                                            {/* } */}
                                            {/* {modules?.map((module, index) => ( */}
                                            <div
                                                // key={index + 3} 
                                                onClick={() => {
                                                    // setSelectedIndex(index), setSelectedModuleId(module?.id),
                                                    setIsOpen(false)
                                                }}
                                                className="option">
                                                Category 2
                                                <svg width="5" height="6" viewBox="0 0 5 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M0.902344 5.77588L4.82789 3.2984L0.902343 0.820925L0.902344 5.77588Z" fill="white" />
                                                </svg>

                                            </div>
                                            {/* ))} */}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>


                    </div>
                    {/* marketplace slider */}
                    <div>
                        {imageArray?.length > 0 &&
                            <div>

                                <div className="grid grid-cols-12 relative h-full w-full  ">
                                    <div className="col-span-12">
                                        <OwlCarousel {...owlOptions?.options}
                                            ref={mainRef}
                                            className="owl-theme relative marketplace-dots">
                                            {imageArray?.map((data, index) => (
                                                <React.Fragment key={index + 3}>


                                                    <MarketplaceSlide
                                                        className={"academy-large-card  "}
                                                        desktop_image={data?.thumbnail}
                                                        mobile_image={data?.mobile_thumbnail}
                                                        logo={marketplace5}
                                                        routeToPlay={''}
                                                        lessonProgress={0}
                                                    />


                                                </React.Fragment>
                                            ))}
                                        </OwlCarousel>
                                    </div>

                                    <div className="hidden lg:block">
                                        <div className="   absolute mx-auto  academy-arrow px-5 z-[1] ">
                                            <div className="flex items-center justify-center" onClick={() => {
                                                handleSliderPrev(mainRef)
                                            }}>
                                                <SlideArrows />

                                            </div>
                                        </div>
                                        <div className="    absolute mx-auto right-1  academy-arrow px-5 z-[1] ">
                                            <div className="rotate-180 flex items-center justify-center" onClick={() => {
                                                handleSliderNext(mainRef)
                                            }}>
                                                <SlideArrows />
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>

                        }
                    </div>

                    <div className="grid  grid-cols-12 gap-5 md:gap-12 relative mt-4 z-[9] ">
                        {companies.map((company, index) => (
                            <div key={index + 3} className="col-span-12 md:col-span-6 lg:col-span-4 bg-[#1A1A1A] marketplace-card">
                                <MarketplaceCard company={company} />
                            </div>
                        ))}
                    </div>
                    {/* Load more button  */}
                    <div className='flex justify-center my-[30px] md:my-[60px] '>
                        <button className="button isLogin primary rounded-full max-w-[299px] w-full">
                            <div className="button_container glitch uppercase">
                                LOAD MORE
                            </div>
                        </button>
                    </div>
                </div>
            </section>
        </div>
    )
}
Marketplace.layout = page => <Layout children={page} title="" />
export default Marketplace
