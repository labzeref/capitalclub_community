import React, { useEffect } from 'react'
import Layout from '@/Layouts/Layout'
import OwlCarousel from "react-owl-carousel";
import market1 from "../../../assets/svg/Marketplace1.svg";


// import desktop from "../../../assets/img/MARKETPLACE_DESK.png";
import desktop from "../../../assets/img/marketplace_2_desktop.svg";
// import mobile from "../../../assets/img/MARKETPLACE_MOBILE.png";
import mobile from "../../../assets/img/marketplace_2_mobile.svg";

import slide1 from "../../../assets/img/marketplace3.jpg";
import mobileslide1 from "../../../assets/img/mobile_marketplace3.png";

// import slideMobile1 from "../../../assets/img/marketplaceMobile2.jpg";
import slideMobile1 from "../../../assets/img/marketplaceMobile2.jpg";


import marketplace1 from "../../../assets/svg/Marketplace1.svg";
import marketplace2 from "../../../assets/svg/Marketplace2.svg";
import marketplace3 from "../../../assets/svg/Marketplace3.svg";
import marketplace4 from "../../../assets/svg/Marketplace4.svg";
import marketplace5 from "../../../assets/svg/Marketplace5.svg";
import marketplace6 from "../../../assets/svg/Marketplace6.svg";


import { Head, Link, router } from '@inertiajs/react';
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
import { AnimatePresence, motion } from "framer-motion"
import { GTMLogs } from '@/utils/GTMLogs';
import GraySlideArrow from '@/Components/GraySlideArrow';
import GraySlideArrowRight from '@/Components/GraySlideArrowRight';


const Marketplace = ({ featuredProfiles, parentCategories, specialProfiles }) => {

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
            // autoplayHoverPause: true,
            // autoplayTimeout: 10000,
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


    const MKcatesRef = useRef(null);

    const [MKcate, setMKcate] = useState({
        options: {
            loop: true,
            margin: 2,
            items: 10,
            autoplay: false,
            nav: false,
            dots: false,
            autoWidth: true,
            responsiveClass: true,

            // responsive: {
            //     0: {
            //         items: 2,
            //         slideBy: 2,
            //     },
            //     600: {
            //         items: 2,
            //     },
            //     1200: {
            //         autoWidth: true,
            //     }
            // }
        }
    })

    // const [showModal, setShowModal] = useState(true);

    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
        if (isOpen) {
            setSearchQuery('')
        }
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


    const [timer, setTimer] = useState(null);
    const [nextPage, setNextPage] = useState();
    const [searchData, setSearchData] = useState(featuredProfiles);
    const [searchQuery, setSearchQuery] = useState('');
    const loadingRef = useRef(null);


    // const handleKeyUp = (e) => {
    //     if (timer) {
    //         clearTimeout(timer);
    //     }
    //     setTimer(
    //         setTimeout(async () => {
    //             try {
    //                 const response = await axios.get(route("marketplace.search-list"), {
    //                     params: { query: searchQuery }
    //                 });
    //                 setNextPage(response?.data?.payload?.next_page_url)
    //                 setSearchData(response.data?.payload?.data);
    //             } catch (error) {
    //                 console.error("Error fetching data:", error);
    //                 setSearchData(null);
    //             }
    //         }, 1000)
    //     );
    // };

    const searchRevert = featuredProfiles;

    useEffect(() => {
        if (searchQuery === '') {
            setSearchData(searchRevert)
        }
    }, [searchQuery])

    const handleKeyUp = (e) => {
        const value = e.target.value;
        setSearchQuery(value);

        if (timer) {
            clearTimeout(timer);
        }

        setTimer(
            setTimeout(async () => {
                try {
                    const response = await axios.get(route("marketplace.search-list"), {
                        params: { query: value }
                    });
                    setNextPage(response?.data?.payload?.next_page_url);
                    setSearchData(response?.data?.payload?.data || []);
                } catch (error) {
                    console.error("Error fetching data:", error);
                    setSearchData([]);
                }
            }, 1000) // Delay for 1 seconds
        );
    };

    useEffect(() => {
        return () => {
            if (timer) {
                clearTimeout(timer);
            }
        };
    }, [timer]);




    useEffect(() => {
        return () => {
            clearTimeout(timer);
        };
    }, []);

    const loadMore = async () => {

        if (!nextPage) {

            return;
        }
        try {
            const response = await axios.get(nextPage);
            // Check if the next_page_url is indeed provided and not null/undefined

            setSearchData(prevData => [...prevData, ...response?.data?.payload?.data]);
            setNextPage(response?.data?.payload?.next_page_url);


        } catch (error) {
            console.error('Error fetching more items:', error);
        }
    };

    useEffect(() => {

        const observer = new IntersectionObserver(
            entries => {
                // Check if the observed entry is intersecting (visible)
                if (entries[0].isIntersecting) {
                    loadMore(); // Load more items
                }
            },
            { threshold: 1.0 } // Trigger when the element is fully visible
        );

        if (loadingRef.current) {
            observer.observe(loadingRef.current); // Start observing the 'load more' element
        }

        // Cleanup function to unobserve the element when the component unmounts
        return () => {
            if (loadingRef.current) {
                observer.unobserve(loadingRef.current);
            }
        };
    }, [nextPage]);


    useEffect(() => {
        GTMLogs({
            'event': 'GTMevent',
            'event_name': 'marketplace',
            'event_id': '10013',
        })
    }, [])

    const handleGTMMainPage = (e, name) => {
        e.preventDefault()
        GTMLogs({
            'event': 'GTMevent',
            'event_name': 'marketplace_category_parent',
            'category': name,
            'event_id': '10014',
        })
    }


    return (
        <div>
            <Head title="Marketplace" />
            <section data-aos="fade-in" data-aos-delay="100" data-aos-easing="ease" data-aos-duration="300" className="">
                <div className="container mx-auto px-[15px] xl:px-3">
                    <div className="grid grid-cols-12">
                        <div className="col-span-12  flex items-center justify-center  ">
                            <div className='w-[90%] md:w-[50%] flex flex-col items-center mt-[30px]'>


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
                                    <path d="M313.582 1.50042L278.695 53.054L243.808 1.50041L313.582 1.50042Z" stroke="white" strokeWidth="3" strokeLinecap="square" />
                                    <path d="M278.699 17.1484L278.699 50" stroke="white" strokeWidth="3" strokeLinecap="square" />
                                    <path d="M309.439 15.1689H248.057" stroke="white" strokeWidth="3" strokeLinecap="square" />
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

                                <p className='text-[14px] leading-[22px] md:text-[16px] fw-regular text-center mt-[16px] md:mt-[22px] '>
                                    Capital Club provides unlimited access to an exclusive marketplace of VIP services with privately negotiated rates, premium support and membership privileges.  </p>

                            </div>
                        </div>
                    </div>

                    {/* buttons start */}
                    <div className='flex justify-center gap-x-3 gap-y-4  lg:gap-x-[30px] xl:max-w-[59.563rem] mx-auto md:mt-[60px] mt-[30px] '>



                        <div className='order-1 lg:order-0 flex gap-x-3'>
                            <div className='cursor-pointer    pt-1.5' onClick={() => { handleSliderPrev(MKcatesRef) }}>
                                <GraySlideArrow />
                            </div>


                            <div className=' flex  max-w-[60vw] items-center  lg:max-w-[52.563rem] mx-auto'>
                                <OwlCarousel {...MKcate?.options}
                                    ref={MKcatesRef}
                                    className="owl-theme relative">
                                    {parentCategories?.map((data, index) => (
                                        <Link href={route('marketplace.category', [data?.slug])} key={data?.slug} className={`whitespace-nowrap desktop-nav-item  px-2.5 md:px-6 is-marketplace-cat-button cursor-pointer`} >
                                            {data?.name}
                                        </Link >
                                    ))}
                                </OwlCarousel>
                            </div>
                            <div className='cursor-pointer   pt-1.5' onClick={() => { handleSliderNext(MKcatesRef) }}>
                                <GraySlideArrowRight />
                            </div>
                        </div>
                        <div className='order-0 lg:order-1 flex items-center'>
                            <div onClick={toggleDropdown} className={` cursor-pointer border-rounded-8 ${isOpen ? 'md:bg-[#191919]' : 'md:bg-[#191919]'}  px-2 md:px-7 py-1 md:py-1.5 flex justify-center items-center `}>
                                <svg className='h-4 w-4 md:h-5 md:w-5' viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.65406 7.6482H8.1274L7.94073 7.4682C8.74073 6.53487 9.15406 5.26154 8.9274 3.9082C8.61406 2.05487 7.0674 0.57487 5.20073 0.348204C2.38073 0.00153688 0.00739622 2.37487 0.354063 5.19487C0.58073 7.06154 2.06073 8.6082 3.91406 8.92154C5.2674 9.1482 6.54073 8.73487 7.47406 7.93487L7.65406 8.12154V8.6482L10.4874 11.4815C10.7607 11.7549 11.2074 11.7549 11.4807 11.4815C11.7541 11.2082 11.7541 10.7615 11.4807 10.4882L8.65406 7.6482ZM4.65406 7.6482C2.99406 7.6482 1.65406 6.3082 1.65406 4.6482C1.65406 2.9882 2.99406 1.6482 4.65406 1.6482C6.31406 1.6482 7.65406 2.9882 7.65406 4.6482C7.65406 6.3082 6.31406 7.6482 4.65406 7.6482Z" fill="currentColor" />
                                </svg>
                            </div>
                        </div>


                    </div>

                    {/* buttons end  */}

                    {/* search fields  */}
                    {/* <div className='h-[50px]'> */}

                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: '-5vh' }}
                                animate={{ opacity: 1, y: '0' }}
                                exit={{ opacity: 0, y: '-5vh' }}
                                transition={{ duration: 0.4 }}
                                className="relative z-[8]"
                            >

                                <div className='w-full lg:flex justify-center gap-x-5 mt-[12px]'>
                                    <div className='bg-[#1A1A1A] search-w marketplace-search-wrapper max-w-[59.863rem] py-[9px] pl-4 md:pl-7 pr-4 flex items-center'>
                                        <input type='text' value={searchQuery} autoFocus onChange={(e) => { handleKeyUp(e); }} className='w-full fs-14 fw-bold ' placeholder='WHAT ARE YOU LOOKING FOR?' />
                                        <svg onClick={() => { toggleDropdown() }} className='cursor-pointer' width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M19.9375 9.0625L9.0625 19.9375" stroke="#B4B4B4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M9.0625 9.0625L19.9375 19.9375" stroke="#B4B4B4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                </div>

                            </motion.div>
                        )}
                    </AnimatePresence>
                    {/* </div> */}


                    {/* <div className='block lg:hidden'>

                        <div className=' w-full lg:flex justify-center gap-x-5 mt-[20px]'>
                            <div className='bg-[#1A1A1A] search-w marketplace-search-wrapper mx-auto max-w-[396px] py-0.5 pl-4 md:pl-7 pr-4 flex items-center'>
                                <input type='text' value={searchQuery} autoFocus onChange={(e) => handleKeyUp(e)} className='w-full fs-14 fw-bold ' placeholder='WHAT ARE YOU LOOKING FOR?' />
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.98484 8.9282H9.39234L9.18234 8.7257C10.0823 7.6757 10.5473 6.2432 10.2923 4.7207C9.93984 2.6357 8.19984 0.970704 6.09984 0.715704C2.92734 0.325704 0.257344 2.9957 0.647344 6.1682C0.902344 8.2682 2.56734 10.0082 4.65234 10.3607C6.17484 10.6157 7.60734 10.1507 8.65734 9.2507L8.85984 9.4607V10.0532L12.0473 13.2407C12.3548 13.5482 12.8573 13.5482 13.1648 13.2407C13.4723 12.9332 13.4723 12.4307 13.1648 12.1232L9.98484 8.9282ZM5.48484 8.9282C3.61734 8.9282 2.10984 7.4207 2.10984 5.5532C2.10984 3.6857 3.61734 2.1782 5.48484 2.1782C7.35234 2.1782 8.85984 3.6857 8.85984 5.5532C8.85984 7.4207 7.35234 8.9282 5.48484 8.9282Z" fill="white" />
                                </svg>

                            </div>
                        </div>
                    </div> */}



                    {/* <div className="custom-dropdown is-category-wrap mt-4 lg:mt-0 ">
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
                                            <>
                                                <div onClick={() => { setIsOpen(false) }} className="option">
                                                    Category &nbsp; {1}
                                                    <svg width="5" height="6" viewBox="0 0 5 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M0.902344 5.77588L4.82789 3.2984L0.902343 0.820925L0.902344 5.77588Z" fill="white" />
                                                    </svg>
                                                </div>
                                            </>
                                            <div
                                                onClick={() => { setIsOpen(false) }}
                                                className="option">
                                                Category 2
                                                <svg width="5" height="6" viewBox="0 0 5 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M0.902344 5.77588L4.82789 3.2984L0.902343 0.820925L0.902344 5.77588Z" fill="white" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div> */}


                    {/* marketplace slider */}

                    {searchQuery?.length < 1 &&
                        <div className='mt-[47px]'>
                            {specialProfiles?.length > 0 &&
                                <div>

                                    <div className="grid grid-cols-12 relative h-full w-full  ">
                                        <div className="col-span-12">
                                            <OwlCarousel {...owlOptions?.options}
                                                mouseDrag={specialProfiles?.length > 1}
                                                ref={mainRef}
                                                className="owl-theme relative marketplace-dots">
                                                {specialProfiles?.map((data, index) => (
                                                    <React.Fragment key={index + 3}>

                                                        <MarketplaceSlide
                                                            desktop_image={slide1}
                                                            mobile_image={mobileslide1}
                                                            logo={data?.logo}
                                                            category={data?.categories[0]?.name}
                                                            profile_id={data?.id}
                                                            linkId={data?.slug}
                                                            shortDecs={data?.short_description}
                                                        />

                                                    </React.Fragment>
                                                ))}
                                            </OwlCarousel>
                                        </div>

                                        {specialProfiles.length > 1 && <div className="hidden lg:block">
                                            <div className="   absolute mx-auto top-[50%] px-5 z-[1]">
                                                <div className={` flex items-center justify-center ${specialProfiles?.length > 1 ? 'cursor-pointer' : 'cursor-opacity'}  `} onClick={() => {
                                                    handleSliderPrev(mainRef)
                                                }}>
                                                    <SlideArrows />

                                                </div>
                                            </div>
                                            <div className="    absolute mx-auto right-1 top-[50%] px-5 z-[1] ">
                                                <div className={` rotate-180 flex items-center justify-center ${specialProfiles?.length > 1 ? 'cursor-pointer' : 'cursor-opacity'} `} onClick={() => {
                                                    handleSliderNext(mainRef)
                                                }}>
                                                    <SlideArrows />
                                                </div>
                                            </div>
                                        </div>}

                                    </div>
                                </div>
                            }
                        </div>
                    }
                    <p className='text-[30px] md:text-[35px] leading-[40px] fw-semibold mt-[30px] md:mt-10 z-30 relative text-center uppercase'> {searchQuery?.length < 1 ? 'FEATURED PARTNERS' : 'search results'} </p>
                    <div className="grid  grid-cols-12 gap-5 md:gap-6 xl:gap-[51px] relative mt-4 md:mb-12 z-[9] ">
                        {searchData?.length > 0 ? <>
                            {searchData.map((company, index) => (
                                <div key={index + 3} className="col-span-12 md:col-span-6 lg:col-span-4 bg-[#1A1A1A] MK-feature-card w-full">
                                    <MarketplaceCard
                                        company={company}
                                        logoHeight={'w-[327px] h-[72px]'}
                                        logoMT={'mt-[60px]'}
                                        p_my={'my-[38px]'}
                                        btn_mt={'mt-[2rem] '}
                                    />
                                </div>
                            ))}
                        </> : <div className='opacity-50 col-span-12 text-center py-10'>
                            <p>No Data</p>
                        </div>}
                        <div ref={loadingRef} style={{ height: '2px' }}></div>
                    </div>


                    {/* footer marketplace ethos  */}
                    <div className='flex justify-center mt-[44px] md:mb-5 md:mt-[83px] '>
                        <p className='MK-footer-heading'>Marketplace Ethos </p>
                    </div>

                    <p className='MK-footer-text mt-2.5 mb-[30px]  md:mt-5 md:mb-6'>
                        Is there a Benefit in mind that you'd like to see? Your
                        input is invaluable to us, and many of our current benefits
                        were inspired by suggestions from our Members like you.
                        Our commitment lies in curating top-tier benefits for
                        our Members, so don't hesitate to share your ideas with us.
                    </p>

                    <div className='flex justify-center mb-[66px] md:mb-[83px] '>
                        <a className='w-full max-w-[299px]' onClick={() => {
                            GTMLogs({
                                'event': 'GTMevent',
                                'event_name': 'marketplace_suggest_benefit',
                                'event_id': '10017',
                            })
                        }} href="https://www.capital.club/partnerships/suggestions" target='_blank' >   <button className="button isMarketFooter primary border-rounded-8 w-full">
                                <div className="button_container glitch uppercase">
                                    Suggest a Benefit
                                </div>
                            </button></a>
                    </div>


                    <div className='flex justify-center mt-[30px] md:mt-[83px] '>
                        <p className='MK-footer-heading'>PARTNERING WITH CAPITAL CLUB </p>
                    </div>

                    <p className='MK-footer-text mt-4 mb-[30px] md:mt-5 md:mb-6'>
                        We look to partner with leading and innovative
                        companies that will contribute to the Capital Club ecosystem.
                        If you are keen on partnering with us, please click below to get in touch.
                    </p>

                    <div className='flex justify-center   md:mb-[83px] '>
                        <a className='w-full max-w-[299px]' onClick={() => {
                            GTMLogs({
                                'event': 'GTMevent',
                                'event_name': 'marketplace_get_in_touch',
                                'event_id': '10018',
                            })
                        }} href="https://www.capital.club/partnerships/apply" target='_blank' >
                            <button className="button isMarketFooter primary border-rounded-8 w-full h-[28px]">
                                <div className="button_container glitch uppercase">
                                    Get in Touch
                                </div>
                            </button>
                        </a>
                    </div>



                    {/* <div className='flex justify-center flex-col items-center mb-[30px] md:mb-[83px] '>
                        <div onClick={toTop} className='flex items-center flex-col cursor-pointer'>

                            <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g filter="url(#filter0_d_3079_313)">
                                    <path d="M8.0026 1.73503C4.3226 1.73503 1.33594 4.72169 1.33594 8.40169C1.33594 12.0817 4.3226 15.0684 8.0026 15.0684C11.6826 15.0684 14.6693 12.0817 14.6693 8.40169C14.6693 4.72169 11.6826 1.73502 8.0026 1.73503ZM8.0026 13.735C5.05594 13.735 2.66927 11.3484 2.66927 8.40169C2.66927 5.45503 5.05594 3.06836 8.0026 3.06836C10.9493 3.06836 13.3359 5.45503 13.3359 8.40169C13.3359 11.3484 10.9493 13.735 8.0026 13.735ZM8.0026 5.73503L10.6693 8.40169L9.72927 9.34169L8.66927 8.28836L8.66927 11.0684L7.33594 11.0684L7.33594 8.28836L6.27594 9.34836L5.33594 8.40169L8.0026 5.73503Z" fill="white" />
                                </g>
                                <defs>
                                    <filter id="filter0_d_3079_313" x="-14.6641" y="-14.2656" width="45.3359" height="45.334" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                        <feOffset />
                                        <feGaussianBlur stdDeviation="8" />
                                        <feComposite in2="hardAlpha" operator="out" />
                                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.6 0" />
                                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3079_313" />
                                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3079_313" result="shape" />
                                    </filter>
                                </defs>
                            </svg>
                            <p className='fs-12 fw-medium mt-1.5'>

                                RETURN TO TOP
                            </p>
                        </div>
                    </div> */}


                </div>
            </section >
        </div >
    )
}
Marketplace.layout = page => <Layout children={page} title="" />
export default Marketplace
