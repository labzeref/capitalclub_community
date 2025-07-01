import React, { useEffect } from 'react'
import Layout from '@/Layouts/Layout'
import OwlCarousel from "react-owl-carousel";
import market1 from "../../../assets/svg/Marketplace1.svg";


// import desktop from "../../../assets/img/MARKETPLACE_DESK.png";
import desktop from "../../../assets/img/marketplace_2_desktop.svg";
// import mobile from "../../../assets/img/MARKETPLACE_MOBILE.png";
import mobile from "../../../assets/img/marketplace_2_mobile.svg";

import slide1 from "../../../assets/img/marketplace3.jpg";
import crossicon from "../../../assets/svg/x.png";
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
import GraySlideArrowRight from '@/Components/GraySlideArrowRight';
import GraySlideArrow from '@/Components/GraySlideArrow';
import { Inertia } from '@inertiajs/inertia';



const MarketCategories = ({ category, specialProfiles, partnerProfiles, parentCategories, subCategoryId }) => {


    useEffect(() => {
        GTMLogs({
            'event': 'GTMevent',
            'event_name': 'marketplace_category_parent',
            'category': category.name,
            'event_id': '10014',
        })
    }, [])

    const toTop = () => {
        window.scrollTo(0, 0);
    }

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

        const remainingTopSpace = scrollTop;
        const remainingBottomSpace = scrollHeight - scrollTop - clientHeight;

        setShowTopShadow(remainingTopSpace >= 5);
        setShowBottomShadow(remainingBottomSpace >= 5);
    };


    const [selectedSubCateID, setselectedSubCateID] = useState(subCategoryId);
    const [selectedAll, setSelectedAll] = useState(true);
    const handleSelectAll = () => {
        if (selectedSubCateID) {
            setSelectedAll(true)
            setselectedSubCateID(null)
        }
    }
    useEffect(() => {
        if (selectedSubCateID) {
            setSelectedAll(false)
        } else {
            setSelectedAll(true)
            setselectedSubCateID(null)
        }
    }, [])

    const [timer, setTimer] = useState(null);
    const [nextPage, setNextPage] = useState(partnerProfiles?.next_page_url);
    const [searchData, setSearchData] = useState(partnerProfiles?.data);
    const [searchQuery, setSearchQuery] = useState('');
    const loadingRef = useRef(null);





    const subCatSlug = category?.subCategories?.find((item) => item?.id == subCategoryId)

    // console.log('sub cat : ', subCatSlug)

    // console.log('subCategoryId', subCategoryId)

    // const handleKeyUp = () => {
    //     if (timer) {
    //         clearTimeout(timer);
    //     }
    //     setTimer(
    //         setTimeout(async () => {
    //             try {
    //                 const response = await axios.get(route("marketplace.category", [category?.slug, subCatSlug?.slug]), {
    //                     params: { query: searchQuery }
    //                 });
    //                 setNextPage(response?.data?.payload?.next_page_url)
    //                 setSearchData(response.data?.payload?.data);
    //                 // console.log('search data', response.data?.payload?.data);
    //             } catch (error) {
    //                 console.error("Error fetching data:", error);
    //                 setSearchData(null);
    //             }
    //         }, 2000)
    //     );
    // };

    // useEffect(() => {
    //     return () => {
    //         clearTimeout(timer);
    //     };
    // }, []);


    const handleKeyUp = (e) => {
        const value = e.target.value;
        setSearchQuery(value);

        if (timer) {
            clearTimeout(timer);
        }

        setTimeout(async () => {
            try {
                const response = await axios.get(route("marketplace.category", [category?.slug, subCatSlug?.slug]), {
                    params: { query: value }
                });
                setNextPage(response?.data?.payload?.next_page_url)
                setSearchData(response.data?.payload?.data);
                // console.log('search data', response.data?.payload?.data);
            } catch (error) {
                console.error("Error fetching data:", error);
                setSearchData(null);
            }
        }, 1000)
    };

    useEffect(() => {
        return () => {
            if (timer) {
                clearTimeout(timer);
            }
        };
    }, [timer]);

    const searchRevert = partnerProfiles?.data;


    // console.log('search data : ', searchData)
    // console.log('search query : ', searchQuery)
    // console.log('partnerProfiles : ', partnerProfiles?.data)
    // console.log('searchRevert :', searchRevert)


    useEffect(() => {
        if (searchQuery === '') {
            setSearchData(partnerProfiles?.data)
        }
    }, [searchQuery])





    console.log('next page', nextPage)











    const loadMore = async () => {
        if (!nextPage) {
            return;
        }
        try {
            const response = await axios.get(nextPage);
            setSearchData(prevData => [...prevData, ...response?.data?.payload?.data]);
            setNextPage(response?.data?.payload?.next_page_url);
        } catch (error) {
            console.error('Error fetching more items:', error);
        }
    };

    useEffect(() => {

        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting) {
                    loadMore();
                }
            },
            { threshold: 1.0 }
        );
        if (loadingRef.current) {
            observer.observe(loadingRef.current);
        }
        return () => {
            if (loadingRef.current) {
                observer.unobserve(loadingRef.current);
            }
        };
    }, [nextPage]);
    const [opendropdown, setOpendropdown] = useState(false)
    const [SelectedCat, setSelectedCat] = useState(subCategoryId ? category?.subCategories?.find((cate) => cate?.id == subCategoryId) : category?.subCategories[0])



    const MKcatesRef = useRef(null);
    const [MKcate, setcomingSoon] = useState({
        options: {
            loop: true,
            margin: 12,
            items: 30,
            autoplay: false,
            nav: false,
            dots: false,
            autoWidth: true,
            responsiveClass: false,
            // slideBy: 3,

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

    const handleCrossCategory = (mapId, catID) => {

        if (mapId == catID) {
            const url = route("marketplace.index");
            Inertia.visit(url);
        }
    }

    return (
        <div>
            <Head title="Marketplace" />
            <section data-aos="fade-in" data-aos-delay="100" data-aos-easing="ease" data-aos-duration="300" className="">
                <div className="container mx-auto px-[15px] xl:px-3 2xl:px-0">

                    {/* buttons start */}
                    {/* <div className='flex flex-wrap justify-center gap-x-3 gap-y-4  lg:gap-x-[30px] max-w-[59.563rem] mx-auto md:mt-[60px] mt-[30px]'>
                        {parentCategories?.map((data, index) => (

                            <Link onClick={() => {
                                GTMLogs({
                                    'event': 'GTMevent',
                                    'event_name': 'parent_marketplace_category',
                                    'category_name': data?.slug,
                                    'event_id': '6248222',
                                })
                            }} href={route('marketplace.category', [data?.slug])} key={index} className={` ${data?.id == category?.id ? 'border-active' : 'deactive-pills'} desktop-nav-item  is-marketplace-cat-button cursor-pointer pt-8`} >

                                {data?.name}

                            </Link>
                        ))}
                        <div onClick={toggleDropdown} className={` cursor-pointer border-rounded-20 ${isOpen ? 'bg-white' : 'bg-[#191919]'}  px-7 py-1 md:py-1.5 flex justify-center items-center `}>
                            <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14.9773 13.28H14.0885L13.7735 12.9762C15.1235 11.4012 15.821 9.2525 15.4385 6.96875C14.9098 3.84125 12.2998 1.34375 9.14977 0.961251C4.39102 0.376251 0.386016 4.38125 0.971016 9.14C1.35352 12.29 3.85102 14.9 6.97852 15.4288C9.26227 15.8113 11.411 15.1138 12.986 13.7638L13.2898 14.0788V14.9675L18.071 19.7488C18.5323 20.21 19.286 20.21 19.7473 19.7488C20.2085 19.2875 20.2085 18.5338 19.7473 18.0725L14.9773 13.28ZM8.22727 13.28C5.42602 13.28 3.16477 11.0188 3.16477 8.2175C3.16477 5.41625 5.42602 3.155 8.22727 3.155C11.0285 3.155 13.2898 5.41625 13.2898 8.2175C13.2898 11.0188 11.0285 13.28 8.22727 13.28Z" fill={isOpen ? '#000' : 'white'} />
                            </svg>

                        </div>
                    </div> */}








                    {/* catetory slider pillls  */}
                    <div className='flex justify-center gap-x-3 gap-y-4  lg:gap-x-[30px] xl:max-w-[59.563rem] mx-auto md:mt-[60px] mt-[47px] '>
                        <div className='order-1 lg:order-0 flex gap-x-3'>

                            <div className='cursor-pointer pt-1.5' onClick={() => { handleSliderPrev(MKcatesRef) }}>
                                <GraySlideArrow />
                            </div>

                            <div className=' flex items-center max-w-[60vw]  overflow-x-auto md:max-w-[52.563rem] mx-auto'>
                                <OwlCarousel {...MKcate?.options}
                                    ref={MKcatesRef}
                                    className="owl-theme relative">
                                    {parentCategories?.map((data, index) => (
                                        <Link onClick={() => {
                                            GTMLogs({
                                                'event': 'GTMevent',
                                                'event_name': 'parent_marketplace_category',
                                                'category_name': data?.slug,
                                                'event_id': '6248222',
                                            });
                                        }} href={data?.id == category?.id ? route("marketplace.index") : route('marketplace.category', [data?.slug])} key={index} className={` ${data?.id == category?.id ? 'border-active ' : 'px-2.5 deactive-pills'} desktop-nav-item gap-x-3 is-marketplace-cat-button cursor-pointer pt-8 flex items-center`} >
                                            {data?.name}

                                            {data?.id == category?.id &&
                                                // <img src={crossicon} alt='close' className='pill-cross' />
                                                <svg className='-mt-0.5 ' width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M3 21L21 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M21 21L3 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>

                                                //    <svg className='-mt-1 ' width="13" height="13" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                //         <circle cx="12.5" cy="12.5" r="12.5" fill="#fff" />
                                                //         <path d="M17.1499 7.84766L8.41406 16.5835" stroke="black" strokeWidth="2" strokeLinecap="square" strokeLinejoin="round" />
                                                //         <path d="M8.41406 7.84766L17.1499 16.5835" stroke="black" strokeWidth="2" strokeLinecap="square" strokeLinejoin="round" />
                                                //     </svg>



                                            }


                                        </Link>
                                    ))}
                                </OwlCarousel>
                            </div>

                            <div className='cursor-pointer pt-1.5' onClick={() => { handleSliderNext(MKcatesRef) }}>
                                <GraySlideArrowRight />
                            </div>
                        </div>

                        <div className='order-0 lg:order-1 flex items-center'>
                            <div onClick={toggleDropdown} className={` cursor-pointer border-rounded-8 ${isOpen ? 'md:bg-[#191919]' : 'md:bg-[#191919]'} px-2 md:px-7 md:py-1.5 flex justify-center items-center `}>
                                <svg className='h-4 w-4 md:h-5 md:w-5' viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.65406 7.6482H8.1274L7.94073 7.4682C8.74073 6.53487 9.15406 5.26154 8.9274 3.9082C8.61406 2.05487 7.0674 0.57487 5.20073 0.348204C2.38073 0.00153688 0.00739622 2.37487 0.354063 5.19487C0.58073 7.06154 2.06073 8.6082 3.91406 8.92154C5.2674 9.1482 6.54073 8.73487 7.47406 7.93487L7.65406 8.12154V8.6482L10.4874 11.4815C10.7607 11.7549 11.2074 11.7549 11.4807 11.4815C11.7541 11.2082 11.7541 10.7615 11.4807 10.4882L8.65406 7.6482ZM4.65406 7.6482C2.99406 7.6482 1.65406 6.3082 1.65406 4.6482C1.65406 2.9882 2.99406 1.6482 4.65406 1.6482C6.31406 1.6482 7.65406 2.9882 7.65406 4.6482C7.65406 6.3082 6.31406 7.6482 4.65406 7.6482Z" fill="white" />
                                </svg>

                            </div>
                        </div>

                    </div>

                    {/* search fields  */}
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
                                    <div className='bg-[#1A1A1A] search-w marketplace-search-wrapper max-w-[59.563rem] py-[9px] pl-7 pr-5 flex items-center'>
                                        <input type='text' autoFocus value={searchQuery} onChange={(e) => { handleKeyUp(e); }} className=' w-full fs-14 fw-bold' placeholder='WHAT ARE YOU LOOKING FOR? ' />
                                        <svg onClick={toggleDropdown} className='cursor-pointer' width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M19.9375 9.0625L9.0625 19.9375" stroke="#B4B4B4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M9.0625 9.0625L19.9375 19.9375" stroke="#B4B4B4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="grid grid-cols-12">
                        <div className="col-span-12  flex items-center justify-center  ">
                            {/*<div className='w-[90%] md:w-[50%] flex flex-col items-center '>*/}
                            {/*    <p className='text-[14px] leading-[22px] md:text-[16px] fw-regular text-center mt-[30px] md:mt-[46px] '>*/}
                            {/*        Master the intricacies of online commerce with our comprehensive ecommerce course, tailored to propel your business to new heights of digital success.  </p>*/}

                            {/*</div>*/}
                        </div>
                    </div>

                    {/* buttons end  */}

                    {/* marketplace slider */}
                    {searchQuery?.length < 1 &&
                        <div className='mt-[60px] '>
                            {specialProfiles?.length > 0 &&

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
                                                        mobile_image={slideMobile1}
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

                                    <div className="hidden lg:block">
                                        <div className="   absolute mx-auto  academy-arrow px-5 z-[1] ">
                                            <div className={` flex items-center justify-center ${specialProfiles?.length > 1 ? 'cursor-pointer' : 'cursor-opacity'}  `} onClick={() => {
                                                handleSliderPrev(mainRef)
                                            }}>
                                                <SlideArrows />

                                            </div>
                                        </div>
                                        <div className="    absolute mx-auto right-1  academy-arrow px-5 z-[1] ">
                                            <div className={` rotate-180 flex items-center justify-center ${specialProfiles?.length > 1 ? 'cursor-pointer' : 'cursor-opacity'} `} onClick={() => {
                                                handleSliderNext(mainRef)
                                            }}>
                                                <SlideArrows />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    }
                    {/* mobile category  */}
                    <div className='block lg:hidden'>

                        <p className='fw-semibold leading-[40px] text-[30px] text-center uppercase'>{category?.name}</p>
                        <div className='w-full flex justify-center'>
                            <div className="relative flex justify-center cursor-pointer py-2">

                                <div onClick={() => setOpendropdown(!opendropdown)} className="flex items-center justify-between space-x-2 border-b px-2">
                                    <a className="  text-16 fw-medium text-white lg:mx-4" onClick="">
                                        {selectedAll ? 'All' : SelectedCat?.name}
                                    </a>
                                    <span>
                                        <svg width="10" height="5" viewBox="0 0 10 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M5 5L0.669873 0.5L9.33013 0.500001L5 5Z" fill="white" />
                                        </svg>

                                    </span>
                                </div>

                                {opendropdown &&
                                    <div className="  absolute z-50 flex max-h-[350px] overflow-y-auto top-10 w-[300px] flex-col bg-[#0d0d0d] py-1 px-4 text-gray-100 shadow-xl">
                                        <Link href={route('marketplace.category', [category?.slug])} >
                                            <div preserveScroll={true} onClick={() => { setOpendropdown(false); handleSelectAll() }} className="my-2 block border-b border-gray-700 py-1 font-semibold md:mx-2">
                                                All
                                            </div>
                                        </Link>
                                        {category?.subCategories.map((data, index) => (
                                            <Link preserveScroll={true} href={route('marketplace.sub-category', { category: category.slug, subCategory: data.slug })} onClick={() => { setSelectedCat(data?.name); setOpendropdown(false) }} className="my-2 block border-b border-gray-700 py-1 font-semibold md:mx-2">
                                                {data?.name}
                                            </Link>
                                        ))}
                                        <div onClick={() => { setOpendropdown(false) }} className='-z-10 fixed w-full h-full inset-0 '></div>
                                    </div>}
                            </div>

                        </div>
                    </div>
                    <div className="grid  grid-cols-12 gap-5 relative mt-4 md:mt-[60px] z-[8] ">
                        {/* desktop category  */}
                        <div className="hidden lg:block col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3 mt-4 h-fit bg-[#1A1A1A]  border-rounded-20 py-[38px] px-[44px] ">
                            <p className='text-35 fw-bold leading-[40px] '>
                                {category?.name}
                            </p>

                            <div>
                                <Link href={route('marketplace.category', [category?.slug])} >
                                    <div className='pt-5 border-b border-[#535353] w-full'>
                                        <p onClick={() => handleSelectAll()}
                                            //  ${selectedIndustry == index ? 'fw-bold text-white border-b pl-1 pr-4' :
                                            className={`pb-3 ${selectedAll ? 'fw-bold text-white border-b pl-1 pr-4' : 'fw-medium text-[#909090]'} w-fit   fs-16 cursor-pointer`}>
                                            All
                                        </p>
                                    </div>
                                </Link>
                                {category?.subCategories.map((data, index) => (
                                    <div key={index} className=' mb-3 pt-5 border-b border-[#535353] w-full'>
                                        <Link onClick={() => {
                                            GTMLogs({
                                                'event': 'GTMevent',
                                                'event_name': 'marketplace_sub_category',
                                                'sub_category': data?.name,
                                                'category': category?.name,
                                                'event_id': '10015',
                                            })
                                        }} preserveScroll={true} href={route('marketplace.sub-category', { category: category.slug, subCategory: data.slug })} >
                                            <p onClick={() => { setselectedSubCateID(data?.id); setSelectedCat(data?.name) }} className={`pb-3 w-fit ${selectedSubCateID == data?.id ? 'fw-bold text-white border-b pl-1 pr-4' : 'fw-medium text-[#909090]'} fs-16 cursor-pointer`}>
                                                {data.name}
                                            </p>
                                        </Link>
                                    </div>
                                ))}
                            </div>

                        </div>



                        <div className='col-span-12 lg:col-span-8 xl:col-span-9'>

                            {searchData?.length > 0 ?
                                <div className="grid  grid-cols-12 gap-[18px] relative mt-4 z-[9] ">

                                    {searchData?.map((company, index) => (
                                        <div key={index + 3} className="col-span-12 md:col-span-6 xl:col-span-4 bg-[#1A1A1A] marketplace-cate-card">
                                            <MarketplaceCard
                                                company={company}
                                                logoHeight={'w-[200px] h-[44px]'}
                                                logoMT={'mt-[35px]'}
                                                p_my={'my-9'}
                                                btn_mt={'mt-[1.77rem] md:mt-[2.188rem] '}
                                            />
                                        </div>
                                    ))}
                                    <div ref={loadingRef} style={{ height: '2px' }}></div>
                                </div>
                                :
                                <div className=' opacity-50 w-full text-center'>
                                    <p >No data</p>
                                </div>
                            }
                        </div>
                    </div>

                    {/* back to top button  */}
                    <div className='flex justify-center flex-col items-center mt-[30px] md:my-[83px] '>
                        <div onClick={toTop} className='flex items-center flex-col cursor-pointer'>

                            <svg width="35" height="35" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                            <p className='text-12 lh-20 fw-medium mt-1.5'>
                                RETURN TO TOP
                            </p>
                        </div>
                    </div>


                </div>
            </section >
        </div >
    )
}
MarketCategories.layout = page => <Layout children={page} title="" />
export default MarketCategories
