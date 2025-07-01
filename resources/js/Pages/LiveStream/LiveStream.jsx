import Badge from '@/Components/Badge';
import Layout from '@/Layouts/Layout';
import React from 'react'
import OwlCarousel from "react-owl-carousel";
import upcomingBanner from '../../../assets/live/upcomingLive.jpg'
import mobileupcomingBanner from '../../../assets/live/mobileupcomingLive.jpg'
import pastBanner from '../../../assets/live/pastLive.jpg'
import LiveStreamCard from '@/Components/Course/LiveStreamCard';

import live1 from '../../../assets/live/live1.jpg';
import live2 from '../../../assets/live/live2.jpg';
import live3 from '../../../assets/live/live3.jpg';
import live4 from '../../../assets/live/live4.jpg';
import { useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import 'moment-timezone';
import { useEffect } from 'react';
import { useRef } from 'react';
import { Head, Link } from '@inertiajs/react';
import AcademyLargeCard from '@/Components/Course/AcademyLargeCard';
import SlideArrows from '@/Components/SlideArrows';
import { AsyncImage } from "loadable-image";
import { Blur } from "transitions-kit";
import LiveSwitchButtons from './partials/LiveSwitchButtons';
import { useContext } from 'react';
import { PostsContext } from '../../Store/PostsProvider';
import LiveStreamLayout from '@/Layouts/LiveStreamLayout';


const LiveStream = ({ featuredLiveStream }) => {

    const { setFeaturedLiveStream } = useContext(PostsContext);

    useEffect(() => {
        setFeaturedLiveStream(featuredLiveStream)
    }, [])

    const loadingRef = useRef(null);
    const [nextPage, setNextPage] = useState();


    const [activeButton, setActiveButton] = useState('upcoming');
    const handleClick = (e, button) => {
        e.preventDefault()
        if (button === 'past' && pastStreams?.length < 1) {
            handleGetPast('asc')
        }
        setActiveButton(button);
    };

    //  === UP COMING ===
    const [upcomingStreams, setUpcomingStreams] = useState([])
    // console.log('upcomingStreams:', upcomingStreams)
    const handleGetUpcoming = () => {
        try {
            axios.get(route('livestream.upcoming')).then((res) => {
                setUpcomingStreams(res?.data?.payload)
            });
        } catch (error) {
            console.error('Error : ', error)

        }
    }
    useEffect(() => {
        handleGetUpcoming()
    }, [])

    //  === PAST STREAM ===
    const [pastStreams, setPastStreams] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState('asc');

    const handleGetPast = (order) => {
        try {
            axios.get(route('livestream.past', { order: order })).then((res) => {
                setPastStreams(res?.data?.payload?.data)
                setNextPage(res?.data?.payload?.next_page_url)
                // console.log('past : ', res)
            });
        } catch (error) {
            console.error('Error : ', error)

        }
    }

    const [selectedSort, setSelectedSort] = useState('desc');

    useEffect(() => {
        handleChange()
    }, [selectedSort])

    const handleChange = () => {
        setSelectedOrder(selectedSort); // Update state
        handleGetPast(selectedSort); // Fetch sorted data
    };

    const handleConvertTimeZone = (date) => {
        const parsedDateTime = moment.utc(date).tz('America/New_York');
        const month = parsedDateTime.format('MMMM');
        const day = parsedDateTime.format('D');
        let daysuffix = parsedDateTime.format('Do');
        daysuffix = daysuffix.replace(day, '')
        let time = parsedDateTime.format('h A') + ' EST';
        const formattedDateTime = parsedDateTime.format('MMMM Do | h A') + ' EST';


        return {
            month,
            day,
            daysuffix,
            time
        };
    }

    // load more pagination
    const loadMore = async () => {
        if (!nextPage) {
            return;
        }
        try {
            const response = await axios.get(nextPage);
            setPastStreams(prevData => [...prevData, ...response?.data?.payload?.data]);
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
    }, []);


    useEffect(() => {
        Echo.private(`LiveStream`)
            .listen('.LiveStreamEnded', (event) => {
                // console.log(event?.live_stream_id)
                window.location.reload()
            })

    }, [])


    // Step 1: Group the data by 'live_at_for_grouping'
    const groupedStreams = pastStreams?.reduce((groups, stream) => {
        const groupKey = stream.live_at_for_grouping;
        if (!groups[groupKey]) {
            groups[groupKey] = [];
        }
        groups[groupKey].push(stream);
        return groups;
    }, {});


    const toTop = () => {
        window.scrollTo(0, 0)
    }


    // SLIDER
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
            margin: 0,
            items: 1,
            autoplay: false,
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

    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };


    return (
        <div className="  live-container mx-auto lg:px-3  px-[15px]">
            <Head title="Livestream" />

            {/* {featuredLiveStream &&
                <div className='mt-7 md:mt-12 '>
                    {!featuredLiveStream.disabled ?
                        <Link href={route('livestream.show', featuredLiveStream?.id)} >

                            <div className="block md:block lg:hidden">
                                <AsyncImage
                                    src={featuredLiveStream?.mobileBanner}
                                    className={`rounded-[25px] input-shadow `}
                                    style={{ height: "auto", width: "100%", aspectRatio: 343 / 432, objectFit: "contain" }}
                                    // Transition={props => <Blur radius={10} {...props} />}
                                    loader={<div style={{ background: '#1A1A1A' }} />}
                                    error={<div style={{ background: '#1A1A1A' }} />} />
                            </div>
                            <div className="hidden md:hidden lg:block">
                                <AsyncImage
                                    src={featuredLiveStream?.banner}
                                    className={`rounded-[25px] input-shadow`}
                                    style={{ height: "auto", width: "100%", aspectRatio: 768 / 317, objectFit: "contain" }}
                                    // Transition={props => <Blur radius={10} {...props} />}
                                    loader={<div style={{ background: '#1A1A1A' }} />}
                                    error={<div style={{ background: '#1A1A1A' }} />} />
                            </div>
                        </Link>
                        :
                        <>

                            <div className="block md:block lg:hidden">
                                <AsyncImage
                                    src={featuredLiveStream?.mobileBanner}
                                    className={`rounded-[25px] input-shadow `}
                                    style={{ height: "auto", width: "100%", aspectRatio: 343 / 432, objectFit: "contain" }}
                                    // Transition={props => <Blur radius={10} {...props} />}
                                    loader={<div style={{ background: '#1A1A1A' }} />}
                                    error={<div style={{ background: '#1A1A1A' }} />} />
                            </div>
                            <div className="hidden md:hidden lg:block">
                                <AsyncImage
                                    src={featuredLiveStream?.banner}
                                    className={`rounded-[25px] input-shadow`}
                                    style={{ height: "auto", width: "100%", aspectRatio: 768 / 317, objectFit: "contain" }}
                                    // Transition={props => <Blur radius={10} {...props} />}
                                    loader={<div style={{ background: '#1A1A1A' }} />}
                                    error={<div style={{ background: '#1A1A1A' }} />} />
                            </div>

                        </>
                    }
                </div>
            } */}

            {/* upcoming and past switch buttons  */}
            <div className=''>
                {activeButton == 'upcoming' ?

                    <>
                        {upcomingStreams?.length > 0 ?
                            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-x-[26px] gap-y-[18px] mt-8 lg:mt-[26px]">
                                {upcomingStreams?.map((item, index) => (
                                    <React.Fragment key={index}>
                                        {!item.disabled ?
                                            <Link href={route('livestream.show', item?.id)} >
                                                <LiveStreamCard isUpcoming={true} training={item} />
                                            </Link>
                                            :
                                            <LiveStreamCard isUpcoming={true} training={item} />}
                                    </React.Fragment>
                                ))}
                            </div>
                            :

                            <>
                                <p className='py-10 text-lg opacity-40 fw-regular w-full text-center'>
                                    No upcoming live stream
                                </p>
                            </>
                        }

                    </>

                    :
                    <>
                        {pastStreams?.length > 0 ?
                            <>

                                {Object.keys(groupedStreams)?.map((groupName, index) => (
                                    <>
                                        <div className='flex justify-between items-center  mt-8 md:mt-12 mb-[18px]'>
                                            <p className='fw-bold text-[20px] leading-[22px] '>{groupName}</p>
                                            {index == 0 && <div>
                                                <p className='fw-bold text-[12px] uppercase flex  items-center'>Sort by:
                                                    <span className='border-b  mx-1'>




                                                        <div className='relative w-[70px] px-1 flex items-center justify-between mx-auto  md:max-w-full 2xl:max-w-[319px]   cursor-pointer'
                                                            onClick={toggleDropdown}>
                                                            <p className="mt-0.5 text-[12px] leading-[13px] font-medium mr-1">{selectedSort == 'desc' ? 'Newest' : 'Oldest'}  </p>


                                                            <svg className='  transform transition-transform duration-500' style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} width="9" height="5" viewBox="0 0 9 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M4.5 5L0.602885 0.5L8.39711 0.500001L4.5 5Z" fill="#E2E2E2" />
                                                            </svg>
                                                            <div className={` dropdown-options sort-dropdown  absolute left-0 bg-[#2e2e2e]   z-[999999] border-rounded-8  overflow-hidden transition-all ease-out duration-200 ${isOpen ? 'max-h-open-sort' : 'max-h-close-sort'}`}>

                                                                <div className="text-white px-2  hover:bg-[#1a1a1a] cursor-pointer option sort-px"
                                                                    onClick={() => {
                                                                        setSelectedSort('desc');
                                                                        setIsOpen(false);
                                                                    }}>
                                                                    Newest
                                                                </div>

                                                                <div className="text-white px-2   hover:bg-[#1a1a1a] cursor-pointer option sort-px"
                                                                    onClick={() => {
                                                                        setSelectedSort('asc');
                                                                        setIsOpen(false);
                                                                    }}>
                                                                    Oldest
                                                                </div>

                                                            </div>
                                                        </div>
                                                        {isOpen && <div onClick={() => { setIsOpen(false) }} className='inset-0 w-full h-full fixed z-[5]'></div>}


                                                    </span>

                                                </p>
                                            </div>}
                                        </div>


                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-[26px] gap-y-[18px] ">
                                            {groupedStreams[groupName].map((stream, index) => (
                                                <React.Fragment key={index}>
                                                    {!stream.disabled ?
                                                        <Link href={route('livestream.show', stream?.id)} >
                                                            <LiveStreamCard isUpcoming={false} training={stream} />
                                                        </Link>
                                                        :
                                                        <LiveStreamCard isUpcoming={false} training={stream} />
                                                    }
                                                </React.Fragment>
                                            ))}


                                        </div>
                                    </>
                                ))}
                                <div ref={loadingRef} style={{ height: '2px' }}></div>
                            </>
                            : <>
                                <p className='py-10 text-lg opacity-40 fw-regular w-full text-center'>
                                    No past live stream
                                </p>
                            </>}

                    </>
                }

            </div>






            {/* footer content Live stram page  */}
            {activeButton == 'upcoming' ?
                <>
                    {/* <div className='flex justify-center mt-12 md:mt-[81px] '>
                        <p className='fw-bold text-[30px] md:text-[35px] leading-[35px] md:leading-[40px] text-center uppercase'>NOMINATE AN EXPERT </p>
                    </div>

                    <p className='max-w-[360px] tracking-[1%] md:max-w-[35.93rem] opacity-[60%] leading-[20px] md:leading-[27px] fw-regular text-[14px] md:text-[18px] mb-[2rem] mt-5 md:my-5 text-center mx-auto'>
                        Do you know someone who is at the cutting edge of their field? Are you a
                        compelling speaker with a unique mission to share?
                    </p>

                    <div className='flex justify-center md:mb-[100px] '>
                        <a className='w-full' href="https://capital.club/partnerships/suggestions" target='_blank' >   <button className="button primary isLive-Footer-btn rounded-full max-w-[299px] w-full mx-auto">
                            <div className="button_container glitch uppercase isLive-Footer-btn">
                                NOMINATE
                            </div>
                        </button></a>
                    </div> */}
                </>
                :
                <div className='flex justify-center flex-col items-center   mt-[45px] md:mb-[60px] '>
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
                        <p className='fs-12 fw-medium mt-1.5 leading-[20px]'>

                            RETURN TO TOP
                        </p>
                    </div>
                </div>
            }


        </div >
    )
}
LiveStream.layout = (page) => <LiveStreamLayout children={page} />;
export default LiveStream
