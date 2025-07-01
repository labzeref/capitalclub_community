import React, { useEffect, useState } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link, router, useForm, usePage } from "@inertiajs/react";
import lottieLogo from "../CCLOGO.json";
import { AnimatePresence, motion } from "framer-motion"
import ToastNotification from "../ToastNotification";
import NotificationDropdown from "../NotificationDropdown";
import { ReactComponent as PrevArrow } from "../../../assets/svg/navPrevArrow.svg";
import IconButton from "../IconButton";
import { PostsContext } from '../../Store/PostsProvider';
import { useContext } from "react";
import logo from "../../../assets/svg/nav-logo.svg"
import roadIcon from "../../../assets/roadmap/road2.svg"

import ArrowMark from "../ArrowMark";
import Xmark from "../Xmark";
import axios from "axios";

import Lottie from "react-lottie-player";
import WELCOME_LOTTIE from "@/Components/welcome.json";
import { GTMLogs } from "@/utils/GTMLogs";
import CC_LOTTIE from "@/Components/CC_LOTTIE_V01.json";
import SearchDropdown from "../SearchDropdown";

const Navbar = () => {
    useEffect(() => {
        AOS.init();
    }, [])
    const auth = usePage()
    const discordUrl = usePage().props.discordServerUrl;
    const { studymode, CourseId } = useContext(PostsContext);
    const { setCurrentPage, setScrollToNotes } = useContext(PostsContext);
    const user = auth?.props?.auth?.user;
    const anyLiveTraining = usePage().props.anyLiveTraining;

    const [openMobileMenu, setOpenMobileMenu] = useState(false)
    const [openDropDownMenu, setOpenDropDownMenu] = useState(false)

    const [openDropDownNotification, setOpenDropDownNotification] = useState(false)
    const [openSearchDropDown, setOpenSearchDropDown] = useState(false)
    const pageData = usePage();
    const url = pageData?.url;
    useEffect(() => {
        const match = url.match(/\/([^/]+)$/);
        if (match) {
            const play = match[1];
            setCurrentPage(play)
        } else {
            // console.log("Play not found in the URL");
        }
    }, [])


    const [orientation, setOrientation] = useState(
        window.matchMedia('(orientation: portrait)').matches ? 'portrait' : 'landscape');

    useEffect(() => {
        const handleOrientationChange = () => {
            setOrientation(
                window.matchMedia('(orientation: portrait)').matches
                    ? 'portrait' : 'landscape');
        };

        // Add an event listener for changes in orientation
        window.addEventListener('resize', handleOrientationChange);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('resize', handleOrientationChange);
        };
    }, []);




    useEffect(() => {
        if (openMobileMenu) {

            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [openMobileMenu]);



    useEffect(() => {
        if (openDropDownMenu) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [openDropDownMenu]);



    const { post, processing, errors } = useForm();

    const handleLogout = (e) => {
        e.preventDefault();
        post(route("logout"));
    }


    const currentPathname = window.location.pathname;
    const segments = currentPathname.split('/');

    // Get the last segment
    const currentPage = segments[segments.length - 1];


    const currentUrl = window.location.href;
    const extractMarketplaceSegment = (url) => {
        const parsedUrl = new URL(url);
        const pathname = parsedUrl.pathname;
        const segments = pathname.split('/');
        const marketplaceIndex = segments.findIndex(segment => segment.toLowerCase() === 'marketplace');
        if (marketplaceIndex !== -1) {
            return segments[marketplaceIndex];
        } else {
            return null;
        }
    };
    const marketplaceSegment = extractMarketplaceSegment(currentUrl);



    const extractFirstSegment = (url) => {
        const parsedUrl = new URL(url);
        const pathname = parsedUrl.pathname;
        const segments = pathname.split('/').filter(segment => segment.trim() !== ''); // Remove any empty segments
        // Assuming you always want the first segment after the domain
        return segments.length > 0 ? segments[0] : null;
    };

    const currentPageSegment = extractFirstSegment(currentUrl);

    // console.log('currentPageSegment : ', currentPageSegment)

    const [isSticky, setIsSticky] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            if (orientation == 'landscape' && window.scrollY <= 530) {

                setIsSticky(true);
            } else if (orientation == 'portrait' && window.scrollY <= 700) {

                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            // Clean up the event listener when the component unmounts
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const innerHeight = window.innerHeight;


    const [showBlink, setShowBlink] = useState(false)

    const readNotification = async () => {
        if (showBlink) {
            try {
                await axios.post(route("notifications.read-all"));
                setShowBlink(false)
            } catch (error) {
                console.error("Error while notification:", error?.response);
            }
        }
    };



    const handleContextMenu = (e) => {
        e.preventDefault();
    };



    let isHardRefreshed = usePage().props.isHardRefreshed;
    const [isDocumentReady, setDocumentReady] = useState(false);
    const isLoaded = localStorage.getItem("academyLoaded", true);




    const handleLottieComplete = () => {
        // localStorage.setItem("academyLoaded", true);
        if (document.readyState === 'complete') {
            setTimeout(() => {
                setDocumentReady(true);
                localStorage.setItem("academyLoaded", true)
                isHardRefreshed = false;
            }, 1000);
        } else {
            setTimeout(() => {
                handleLottieComplete()
            }, 500);
        }
    };

    useEffect(() => {

        if (currentPage == 'academy' && isHardRefreshed) {
            localStorage.setItem("academyLoaded", true);
        }

        // Cleanup event listener on component unmount
        return () => {
            document.removeEventListener('DOMContentLoaded', () => {
                setDocumentReady(true);
            });
        };
    }, []);


    // google Discord GTM
    const handleDiscordGTM = () => {
        if (discordUrl) {
            GTMLogs(
                {
                    'event': 'GTMevent',
                    'event_name': 'discord_external_page',
                    'event_id': '10012',
                }
            )

        } else {
            GTMLogs(
                {
                    'event': 'GTMevent',
                    'event_name': 'discord_page',
                    'event_id': '10011',
                }
            )
        }
    }




    return (
        <>
            <div onContextMenu={handleContextMenu} className={` navbar-main ${studymode && currentPage == 'play' ? 'hidden' : 'block'} container flex flex-wrap flex-col md:flex-row md:items-center   px-4 lg:px-3 z-[999] relative  ${currentPage == 'play' || currentPage == 'preview' ? ' navbar-arrow' : ''}`}>


                {/*{!isLoaded && currentPage == 'academy' &&*/}
                {/*    <>*/}
                {/*        {!isHardRefreshed && <div className={`academy-preloader ${isDocumentReady && 'hide-loader'}`}>*/}
                {/*            /!* <Lottie*/}
                {/*                loop={false}*/}
                {/*                animationData={WELCOME_LOTTIE}*/}
                {/*                onComplete={handleLottieComplete}*/}
                {/*                play*/}
                {/*                height='100px'*/}
                {/*                className='play-page-animation'*/}
                {/*            /> *!/*/}
                {/*            <Lottie*/}
                {/*                loop={false}*/}
                {/*                animationData={CC_LOTTIE}*/}
                {/*                play*/}
                {/*                height='75px'*/}
                {/*                className='play-page-animation'*/}
                {/*                onComplete={handleLottieComplete}*/}
                {/*            />*/}
                {/*        </div>*/}
                {/*        }*/}
                {/*    </>*/}
                {/*}*/}

                <nav className="w-full  ">
                    <div className="container m-auto">
                        <div className="flex justify-between items-center">
                            {currentPage == 'academy' || currentPage == 'setup' || currentPageSegment == 'marketplace' || currentPageSegment == 'livestream' ?
                                <Link href={route("academy")} className="">
                                    <div className={`  ${!isSticky ? 'md:invisible' : ''} title-font -z-10 `}>
                                        {/* <img className="h-10 md:h-9 w-full" src={logo} alt="" /> */}
                                        <svg className="h-[21px] lg:md:h-[36px]" viewBox="0 0 192 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M44.1758 18.044C44.1758 13.3989 47.1015 10.0781 51.6313 10.0781C55.2294 10.0781 57.44 11.9665 58.1335 14.571H54.9689C54.4702 13.3771 53.3866 12.5522 51.6313 12.5522C48.922 12.5522 47.3397 14.7232 47.3397 18.044C47.3397 21.3647 48.922 23.4488 51.6313 23.4488C53.3866 23.4488 54.4709 22.5804 54.9689 21.3219H58.1335C57.44 23.9917 55.2294 25.9236 51.6313 25.9236C47.1015 25.9236 44.1758 22.6463 44.1758 18.0447V18.044Z" fill="white" />
                                            <path d="M68.9268 21.7122H62.9668L61.5799 25.5976H58.4805L64.1807 10.4038H67.7137L73.4139 25.5976H70.3144L68.9275 21.7122H68.9268ZM68.1248 19.4548L65.936 13.3338L63.7688 19.4548H68.1255H68.1248Z" fill="white" />
                                            <path d="M74.957 10.4038H81.5027C85.2521 10.4038 87.0298 12.1182 87.0298 14.9619C87.0298 17.8057 85.2528 19.4983 81.5027 19.4983H77.9262V25.5976H74.957V10.4038ZM81.3072 17.1758C83.1494 17.1758 83.9514 16.2204 83.9514 14.9619C83.9514 13.7035 83.1494 12.7046 81.3072 12.7046H77.9262V17.1758H81.3072Z" fill="white" />
                                            <path d="M88.9141 10.4038H91.8832V25.5976H88.9141V10.4038Z" fill="white" />
                                            <path d="M98.5588 12.8133H93.6172V10.4038H106.47V12.8133H101.528V25.5976H98.5588V12.8133Z" fill="white" />
                                            <path d="M115.38 21.7122H109.42L108.033 25.5976H104.934L110.634 10.4038H114.167L119.867 25.5976H116.768L115.381 21.7122H115.38ZM114.578 19.4548L112.389 13.3338L110.222 19.4548H114.579H114.578Z" fill="white" />
                                            <path d="M121.406 10.4038H124.375V23.1888H131.896V25.5983H121.406V10.4045V10.4038Z" fill="white" />
                                            <path d="M136.902 18.044C136.902 13.3989 139.828 10.0781 144.358 10.0781C147.956 10.0781 150.167 11.9665 150.86 14.571H147.695C147.197 13.3771 146.113 12.5522 144.358 12.5522C141.649 12.5522 140.066 14.7232 140.066 18.044C140.066 21.3647 141.649 23.4488 144.358 23.4488C146.113 23.4488 147.197 22.5804 147.695 21.3219H150.86C150.167 23.9917 147.956 25.9236 144.358 25.9236C139.828 25.9236 136.902 22.6463 136.902 18.0447V18.044Z" fill="white" />
                                            <path d="M152.923 10.4038H155.892V23.1888H163.412V25.5983H152.922V10.4045L152.923 10.4038Z" fill="white" />
                                            <path d="M164.52 20.4965V10.4038H167.489V20.3233C167.489 22.5153 168.681 23.449 170.675 23.449C172.669 23.449 173.882 22.5153 173.882 20.3233V10.4038H176.852V20.4965C176.852 23.8825 174.62 25.9231 170.675 25.9231C166.73 25.9231 164.52 23.8825 164.52 20.4965Z" fill="white" />
                                            <path d="M179.712 10.4038H186.192C189.725 10.4038 191.35 12.0754 191.35 14.3762C191.35 16.0043 190.288 17.2845 189.074 17.5672C190.678 17.8927 192 19.3033 192 21.2569C192 23.9049 190.201 25.5983 186.582 25.5983H179.711V10.4045L179.712 10.4038ZM185.997 16.6988C187.449 16.6988 188.273 15.9608 188.273 14.7234C188.273 13.4861 187.428 12.7046 185.997 12.7046H182.682V16.6988H185.997ZM186.388 23.2975C188.122 23.2975 188.923 22.4726 188.923 21.1706C188.923 19.8687 188.121 19.022 186.388 19.022H182.682V23.2982H186.388V23.2975Z" fill="white" />
                                            <path d="M17.9894 0C8.06978 0 0 8.0816 0 18.0158C0 25.8519 5.02286 32.5319 12.0126 35.0053C12.8055 35.2859 13.6229 35.5139 14.4627 35.6815C14.4788 35.685 14.4956 35.6871 14.5124 35.6906C15.3116 35.8478 16.1291 35.953 16.9626 36V5.57807C16.3644 5.57807 15.3004 5.75414 14.5124 5.98281C14.4956 5.98772 14.4795 5.99193 14.4627 5.99684C13.6047 6.25007 12.7838 6.58958 12.0126 7.01187C9.2031 8.54808 7.04434 11.1323 6.06162 14.2356C5.80736 15.0388 5.53979 15.9689 5.54259 16.7391H12.2395V14.2356H8.71909C9.41393 12.5331 10.5605 11.0628 12.0126 9.97767C12.7564 9.42141 13.5802 8.96826 14.4627 8.63436V33.1184C13.618 32.9206 12.7985 32.6568 12.0126 32.3264C6.43005 29.9793 2.49917 24.4496 2.49917 18.0165C2.49917 9.46279 9.44755 2.50354 17.9894 2.50354C26.5313 2.50354 33.4797 9.46279 33.4797 18.0165C33.4797 24.3753 29.6378 29.8502 24.1575 32.2429C23.3674 32.5881 22.543 32.8679 21.6913 33.0784V8.7031C22.5836 9.06015 23.4122 9.54206 24.1575 10.1271C25.5178 11.1961 26.5964 12.6089 27.2598 14.2356H23.9306V16.7391H30.4349C30.437 15.9892 30.1932 14.9497 29.939 14.1472C28.9786 11.1147 26.8731 8.67013 24.1582 7.122C23.3835 6.68007 22.5584 6.31601 21.692 6.04665C21.6808 6.04314 21.6695 6.04033 21.6583 6.03683C20.8668 5.79342 19.765 5.57666 19.1921 5.57737V35.9867C20.0305 35.9313 20.8549 35.8211 21.6583 35.6535C21.6695 35.6514 21.6808 35.6479 21.692 35.6458C22.5367 35.4683 23.3611 35.2326 24.1582 34.9401C31.0492 32.4134 35.9796 25.7803 35.9796 18.0158C35.9789 8.0816 27.9091 0 17.9894 0Z" fill="white" />
                                            <path d="M23.9297 25.9046V28.9104C27.034 27.4829 29.0758 24.6785 29.9962 21.5282C30.2309 20.7236 30.4305 19.7563 30.434 19.019L27.9495 19.0254H23.9297V21.5289H27.3654C26.8757 23.237 25.5274 24.8644 23.9297 25.906V25.9046Z" fill="white" />
                                            <path d="M12.2399 19.0247H8.02883L5.54297 19.0205C5.57169 19.8595 5.7475 20.7237 5.98215 21.5276C6.92354 24.7501 9.04658 27.4122 12.2399 29.0206V26.0548C10.2107 24.7368 9.29383 23.3444 8.613 21.5283H12.2399V19.0247Z" fill="white" />
                                            .                        </svg>

                                        {/* <Lottie
                                                loop
                                                animationData={lottieLogo}
                                                play
                                                className="lg:h-[77px]  h-[50px] "
                                            /> */}
                                        {/* <img src={logo} className="lg:h-[40px] h-[21px] " alt="" /> */}
                                    </div>
                                </Link>
                                :
                                <>
                                    <Link className="flex justify-between items-center" href={currentPage == 'play' ? CourseId : route("academy")}>
                                        <ArrowMark />
                                    </Link>
                                </>
                            }

                            <div className={` ${currentPage == 'academy' || currentPage == 'setup' || currentPageSegment == 'marketplace' || currentPageSegment == 'livestream' ? 'visible' : 'invisible'}  w-full flex justify-center`}>
                                <div className={` ${!isSticky ? 'md:invisible   ' : ''} hidden lg:flex md:mx-auto item-center gap-x-2 xl:gap-x-4   text-base font-semibold cursor-pointer `}>
                                    <Link className={` ${currentPage == 'academy' && 'pointer-events-none'} desktop-nav-item  ${currentPage == 'academy' && 'active'} `} href={route("academy")}>

                                        Academy

                                    </Link>

                                    <Link className={`   desktop-nav-item  ${currentPageSegment == 'livestream' && 'active'} `} href={route("livestream.index")}>
                                        LIVESTREAM
                                    </Link>

                                    {
                                        discordUrl ?
                                            <a href={discordUrl} target='_blank'>
                                                <div onClick={() => handleDiscordGTM()} className={`desktop-nav-item  ${currentPage == 'setup' && 'active'} `}>
                                                    Discord
                                                </div>
                                            </a>
                                            :
                                            <Link onClick={() => handleDiscordGTM()} className={`desktop-nav-item  ${currentPage == 'setup' && 'active'} ${currentPage == 'setup' && 'pointer-events-none'} `} href={route('discord.setup')}>

                                                Discord

                                            </Link>
                                    }
                                    {/* <Link href={route('discussion')}> */}
                                    <Link onClick={() => {
                                        GTMLogs({
                                            'event': 'GTMevent',
                                            'event_name': 'marketplace_link_click'
                                        })
                                    }} className={`desktop-nav-item  ${marketplaceSegment == 'marketplace' && 'active'} `} href={route("marketplace.index")}>

                                        Marketplace

                                    </Link>
                                </div>
                            </div>


                            <div className="hidden md:block md:-mt-2 lg:mt-0">
                                <div className="flex items-center justify-end rounded-full  ">


                                    {/* <div className="notification-btn notification-icon  bg-1a cursor-pointer">
                                        <div className="  group">
                                            <span onClick={() => { setOpenSearchDropDown(true) }}>
                                                <svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M12.5706 11.4907L11.7823 11.4387L11.5207 11.1509C12.8101 9.83284 13.5544 7.96773 13.3486 5.91977C13.0624 3.11489 10.8934 0.747153 8.12177 0.223792C3.93511 -0.573199 0.14875 2.74503 0.389508 7.00007C0.544676 9.81637 2.60734 12.2773 5.35042 12.9291C7.35367 13.4018 9.3003 12.9087 10.7762 11.8034L11.0272 12.1005L10.9752 12.8888L14.9366 17.409C15.3188 17.8451 15.9873 17.8892 16.4234 17.507C16.8595 17.1249 16.9035 16.4563 16.5214 16.0202L12.5706 11.4907ZM6.5836 11.0962C4.09898 10.9325 2.22549 8.79467 2.3892 6.31005C2.55292 3.82544 4.69072 1.95195 7.17533 2.11566C9.65995 2.27937 11.5334 4.41718 11.3697 6.90179C11.206 9.3864 9.06821 11.2599 6.5836 11.0962Z" fill="white" />
                                                </svg>


                                            </span>

                                            <div className=" flex justify-end">
                                                <SearchDropdown
                                                    setOpenSearchDropDown={setOpenSearchDropDown}
                                                    openSearchDropDown={openSearchDropDown}
                                                />
                                            </div>
                                        </div>
                                    </div> */}







                                    <div onClick={() => readNotification()} className="notification-btn notification-icon  bg-1a cursor-pointer">
                                        <div className="  group">
                                            <span onClick={() => { setOpenDropDownNotification(true) }}>
                                                <svg width="15" height="19" viewBox="0 0 15 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M14.4864 14.33L13.2501 13.0938V8.30208C13.2501 5.36 11.6784 2.89708 8.93761 2.24542V1.59375C8.93761 0.798333 8.29553 0.15625 7.50011 0.15625C6.70469 0.15625 6.06261 0.798333 6.06261 1.59375V2.24542C3.31219 2.89708 1.75011 5.35042 1.75011 8.30208V13.0938L0.51386 14.33C-0.0898896 14.9338 0.331777 15.9688 1.18469 15.9688H13.8059C14.6684 15.9688 15.0901 14.9338 14.4864 14.33ZM11.3334 14.0521H3.66678V8.30208C3.66678 5.92542 5.11386 3.98958 7.50011 3.98958C9.88636 3.98958 11.3334 5.92542 11.3334 8.30208V14.0521ZM7.50011 18.8438C8.55428 18.8438 9.41678 17.9812 9.41678 16.9271H5.58344C5.58344 17.9812 6.43636 18.8438 7.50011 18.8438Z" fill="white" />
                                                </svg>

                                            </span>

                                            <div className=" flex justify-end">
                                                {showBlink && <div className="circle-noti red-noti"></div>}
                                                <NotificationDropdown
                                                    setOpenDropDownNotification={setOpenDropDownNotification}
                                                    openDropDownNotification={openDropDownNotification}
                                                    setShowBlink={setShowBlink}
                                                    showBlink={showBlink}
                                                />
                                            </div>
                                        </div>
                                    </div>




                                    <div className="dropdown inline-block relative">
                                        <div onClick={() => setOpenDropDownMenu(true)} className="notification-btn text-white  h-[36px] w-[92px]  pl-3 pr-0.5 cursor-pointer inline-flex items-center bg-1a rounded-full outline-none">
                                            <p className="fw-bold nav-glitch-id  pt-[3px]">  #{user?.id.toString().padStart(4, '0')} </p>
                                            <div
                                                className="ml-2 rounded-full h-[24px] w-[24px] bg-[#000] md:h-[26px] md:w-[26px] lg:h-[32px] lg:w-[32px] flex items-center justify-center">
                                                <img
                                                    src={user?.dp?.original?.url}
                                                    className="  h-[14px] w-[14px] lg:h-[18px] lg:w-[18px] object-contain rounded-full "
                                                />
                                            </div>
                                        </div>
                                        {/* ---------------------------  */}
                                        <AnimatePresence>
                                            {openDropDownMenu &&
                                                <motion.div
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    transition={{ duration: 0.25 }}
                                                    className="backdrop-blur-[2px] bg-black/10  fixed inset-0  "
                                                >
                                                    <div onClick={() => { setOpenDropDownMenu(false) }} className="  fixed inset-0   z-[999]  "></div>
                                                </motion.div>
                                            }
                                        </AnimatePresence>

                                        <AnimatePresence>
                                            {openDropDownMenu &&

                                                <motion.div
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    transition={{ duration: 0.25 }}
                                                >

                                                    <div className={` absolute -top-[2px] -right-[2px]  w-[428px] ${innerHeight < 500 ? 'h-[300px] overflow-auto pb-3' : 'h-auto'}   bg-[#121212] rounded-[16px]   z-[999] `}>

                                                        <ul className="flex flex-col text-left   w-full text-base cursor-pointer p-4">
                                                            <li className="pb-6 ">
                                                                <div className="flex justify-between items-center" style={{ justifyContent: 'space-between' }}>
                                                                    <p className="fw-bold text-20 uppercase pt-0.5">menu</p>
                                                                    <div onClick={() => {
                                                                        setOpenDropDownMenu(false)
                                                                    }}
                                                                        className="text-[1.25rem] fw-regular text-[#fff] flex items-center"
                                                                    >

                                                                        <span className="ml-2">
                                                                            <Xmark />
                                                                            {/* <svg
                                                                                    width="22" height="22" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                    <path d="M13 0.5C6.0875 0.5 0.5 6.0875 0.5 13C0.5 19.9125 6.0875 25.5 13 25.5C19.9125 25.5 25.5 19.9125 25.5 13C25.5 6.0875 19.9125 0.5 13 0.5ZM13 23C7.4875 23 3 18.5125 3 13C3 7.4875 7.4875 3 13 3C18.5125 3 23 7.4875 23 13C23 18.5125 18.5125 23 13 23ZM17.4875 6.75L13 11.2375L8.5125 6.75L6.75 8.5125L11.2375 13L6.75 17.4875L8.5125 19.25L13 14.7625L17.4875 19.25L19.25 17.4875L14.7625 13L19.25 8.5125L17.4875 6.75Z" fill="white" />
                                                                                </svg> */}

                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </li>

                                                            <div className="grid grid-cols-2 w-full gap-2 uppercase">
                                                                <div onClick={() => { setOpenDropDownMenu(false) }}
                                                                    className="   menu-4-cards-bg input-shadow w-full notification-click">
                                                                    <Link className={` ${currentPage == 'academy' && 'pointer-events-none'} w-full flex justify-center items-center `} href={route('academy')}>
                                                                        <div>
                                                                            <svg className="mx-auto" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path d="M4.57115 15.4157V18.7979C4.57115 19.6765 5.03988 20.495 5.78986 20.9163L11.649 24.2021C12.3521 24.5993 13.1958 24.5993 13.8989 24.2021L19.758 20.9163C20.508 20.495 20.9767 19.6765 20.9767 18.7979V15.4157L13.8989 19.3877C13.1958 19.7849 12.3521 19.7849 11.649 19.3877L4.57115 15.4157ZM11.649 3.78887L1.77048 9.32548C0.961922 9.78285 0.961922 10.9865 1.77048 11.4438L11.649 16.9804C12.3521 17.3776 13.1958 17.3776 13.8989 16.9804L23.3204 11.6966V18.8099C23.3204 19.4719 23.8477 20.0135 24.4922 20.0135C25.1367 20.0135 25.6641 19.4719 25.6641 18.8099V11.0948C25.6641 10.6494 25.4297 10.2523 25.0547 10.0356L13.8989 3.78887C13.1958 3.40371 12.3521 3.40371 11.649 3.78887Z" fill="#EBEBEB" />
                                                                            </svg>

                                                                            <p className="menu-cards-text">Academy</p>
                                                                        </div>
                                                                    </Link>
                                                                </div>





                                                                <div onClick={() => { setOpenDropDownMenu(false) }}
                                                                    className="   menu-4-cards-bg input-shadow w-full notification-click">
                                                                    <Link className={` ${currentPage == 'live-stream' && 'pointer-events-none'} w-full flex justify-center items-center `} href={route('livestream.index')}>
                                                                        <div>
                                                                            <svg className="mx-auto" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path d="M18.4891 13.3914C18.4891 15.2689 16.565 16.7829 15.6969 18.2149C15.3183 18.8394 14.6888 19.4525 13.9585 19.4525C13.2712 19.4525 12.6841 18.8753 12.3376 18.2817C11.4901 16.8299 9.50573 15.2981 9.50573 13.3914C9.50573 11.0518 11.5206 9.14859 13.9974 9.14859C16.4742 9.14859 18.4891 11.0518 18.4891 13.3914ZM26.8307 13.9975C26.8307 11.0154 25.6886 8.28791 23.8021 6.17864C23.4299 5.76648 22.7754 5.71799 22.3647 6.1059C22.0182 6.4332 21.9797 6.96658 22.2877 7.31813C23.9176 9.11222 24.9057 11.4518 24.9057 13.9975C24.9057 16.5432 23.9176 18.8828 22.2877 20.689C21.9669 21.0405 22.0182 21.5739 22.3647 21.9012C22.7754 22.2891 23.4299 22.2406 23.8021 21.8285C25.6886 19.7071 26.8307 16.9796 26.8307 13.9975ZM3.08906 13.9975C3.08906 11.4518 4.07723 9.11222 5.70706 7.30601C6.0279 6.95446 5.97656 6.42108 5.63006 6.09378C5.23223 5.71799 4.5649 5.75436 4.19273 6.16651C2.30623 8.28791 1.16406 11.0154 1.16406 13.9975C1.16406 16.9796 2.30623 19.7071 4.19273 21.8285C4.5649 22.2406 5.2194 22.2891 5.63006 21.9012C5.97656 21.5739 6.01506 21.0405 5.70706 20.689C4.07723 18.8828 3.08906 16.5432 3.08906 13.9975ZM21.0557 13.9975C21.0557 15.5491 20.4911 16.9917 19.5414 18.1312C19.2462 18.4827 19.2847 18.9919 19.6312 19.3192C20.0419 19.7071 20.7221 19.6707 21.0814 19.2343C22.2621 17.7918 22.9807 15.9734 22.9807 13.9975C22.9807 12.0216 22.2621 10.2032 21.0686 8.7728C20.7092 8.3364 20.0291 8.30003 19.6184 8.68794C19.2847 9.00312 19.2334 9.51226 19.5286 9.87593C20.4911 11.0033 21.0557 12.4458 21.0557 13.9975ZM8.3764 19.307C8.71006 18.9919 8.7614 18.4827 8.46623 18.1191C7.50373 16.9917 6.93906 15.5491 6.93906 13.9975C6.93906 12.4458 7.50373 11.0033 8.4534 9.8638C8.74856 9.51226 8.71006 9.00312 8.36356 8.67582C7.96573 8.30003 7.28556 8.3364 6.92623 8.76068C5.73273 10.2032 5.01406 12.0216 5.01406 13.9975C5.01406 15.9734 5.73273 17.7918 6.92623 19.2343C7.28556 19.6586 7.96573 19.695 8.3764 19.307Z" fill="#EBEBEB" />
                                                                            </svg>


                                                                            <p className="menu-cards-text">Livestream</p>
                                                                        </div>
                                                                    </Link>
                                                                </div>






                                                                <div onClick={() => {
                                                                    GTMLogs({
                                                                        'event': 'GTMevent',
                                                                        'event_name': 'marketplace_link_click'
                                                                    }); setOpenDropDownMenu(false)
                                                                }}
                                                                    className="notification-click pt-5 pb-3 menu-4-cards-bg input-shadow w-full ">

                                                                    <Link onClick={() => { setOpenDropDownMenu(false) }} className={` w-full flex justify-center items-center`} href={route("marketplace.index")}  >
                                                                        <div>
                                                                            <svg className="mx-auto" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path d="M12.3447 2.92038L7.77629 10.3557C7.27278 11.1629 7.86225 12.2146 8.82015 12.2146H17.9447C18.9026 12.2146 19.4921 11.1629 18.9886 10.3557L14.4324 2.92038C13.9535 2.13771 12.8237 2.13771 12.3447 2.92038Z" fill="white" />
                                                                                <path d="M20.143 25.6667C23.1951 25.6667 25.6693 23.2029 25.6693 20.1636C25.6693 17.1243 23.1951 14.6604 20.143 14.6604C17.0909 14.6604 14.6166 17.1243 14.6166 20.1636C14.6166 23.2029 17.0909 25.6667 20.143 25.6667Z" fill="white" />
                                                                                <path d="M3.56401 25.0552H10.9324C11.6079 25.0552 12.1605 24.5049 12.1605 23.8323V16.4948C12.1605 15.8222 11.6079 15.2719 10.9324 15.2719H3.56401C2.88857 15.2719 2.33594 15.8222 2.33594 16.4948V23.8323C2.33594 24.5049 2.88857 25.0552 3.56401 25.0552Z" fill="white" />
                                                                            </svg>

                                                                            <p className="menu-cards-text">Marketplace</p>
                                                                        </div>
                                                                    </Link>
                                                                </div>

                                                                {discordUrl ?

                                                                    <a href={discordUrl} className="w-full">
                                                                        <div onClick={() => { setOpenDropDownMenu(false); handleDiscordGTM() }}
                                                                            className="notification-click   menu-4-cards-bg input-shadow w-full flex justify-center items-center">
                                                                            <div>
                                                                                <svg className="mx-auto" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                    <path d="M22.6184 5.21575C20.9789 4.41422 19.2259 3.83169 17.3932 3.5C17.1682 3.92522 16.9052 4.49715 16.7239 4.95212C14.7757 4.64596 12.8454 4.64596 10.933 4.95212C10.7518 4.49715 10.4828 3.92522 10.2558 3.5C8.42108 3.83169 6.66608 4.41636 5.02662 5.22C1.71982 10.4416 0.823404 15.5335 1.27161 20.5531C3.46486 22.2646 5.59037 23.3042 7.68002 23.9846C8.19596 23.2426 8.65612 22.4538 9.05253 21.6225C8.29755 21.3227 7.57444 20.9528 6.89119 20.5233C7.07245 20.383 7.24976 20.2363 7.42106 20.0854C11.5884 22.1221 16.1163 22.1221 20.2339 20.0854C20.4072 20.2363 20.5845 20.383 20.7638 20.5233C20.0785 20.9549 19.3534 21.3249 18.5984 21.6247C18.9948 22.4538 19.453 23.2447 19.9709 23.9867C22.0626 23.3063 24.1901 22.2667 26.3833 20.5531C26.9092 14.7341 25.4849 9.68896 22.6184 5.21575ZM9.62027 17.4661C8.36928 17.4661 7.34336 16.2457 7.34336 14.7596C7.34336 13.2735 8.34737 12.051 9.62027 12.051C10.8932 12.051 11.9191 13.2714 11.8972 14.7596C11.8992 16.2457 10.8932 17.4661 9.62027 17.4661ZM18.0347 17.4661C16.7837 17.4661 15.7578 16.2457 15.7578 14.7596C15.7578 13.2735 16.7617 12.051 18.0347 12.051C19.3076 12.051 20.3335 13.2714 20.3116 14.7596C20.3116 16.2457 19.3076 17.4661 18.0347 17.4661Z" fill="white" />
                                                                                </svg>

                                                                                <p className="menu-cards-text">Discord</p>
                                                                            </div>
                                                                        </div>
                                                                    </a>
                                                                    :
                                                                    <div onClick={() => { setOpenDropDownMenu(false); handleDiscordGTM() }}
                                                                        className="notification-click   menu-4-cards-bg input-shadow w-full ">
                                                                        <Link className={` ${currentPage == 'setup' && 'pointer-events-none'} w-full flex justify-center items-center`} href={route('discord.setup')}  >

                                                                            <div>
                                                                                <svg className="mx-auto" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                    <path d="M22.6184 5.21575C20.9789 4.41422 19.2259 3.83169 17.3932 3.5C17.1682 3.92522 16.9052 4.49715 16.7239 4.95212C14.7757 4.64596 12.8454 4.64596 10.933 4.95212C10.7518 4.49715 10.4828 3.92522 10.2558 3.5C8.42108 3.83169 6.66608 4.41636 5.02662 5.22C1.71982 10.4416 0.823404 15.5335 1.27161 20.5531C3.46486 22.2646 5.59037 23.3042 7.68002 23.9846C8.19596 23.2426 8.65612 22.4538 9.05253 21.6225C8.29755 21.3227 7.57444 20.9528 6.89119 20.5233C7.07245 20.383 7.24976 20.2363 7.42106 20.0854C11.5884 22.1221 16.1163 22.1221 20.2339 20.0854C20.4072 20.2363 20.5845 20.383 20.7638 20.5233C20.0785 20.9549 19.3534 21.3249 18.5984 21.6247C18.9948 22.4538 19.453 23.2447 19.9709 23.9867C22.0626 23.3063 24.1901 22.2667 26.3833 20.5531C26.9092 14.7341 25.4849 9.68896 22.6184 5.21575ZM9.62027 17.4661C8.36928 17.4661 7.34336 16.2457 7.34336 14.7596C7.34336 13.2735 8.34737 12.051 9.62027 12.051C10.8932 12.051 11.9191 13.2714 11.8972 14.7596C11.8992 16.2457 10.8932 17.4661 9.62027 17.4661ZM18.0347 17.4661C16.7837 17.4661 15.7578 16.2457 15.7578 14.7596C15.7578 13.2735 16.7617 12.051 18.0347 12.051C19.3076 12.051 20.3335 13.2714 20.3116 14.7596C20.3116 16.2457 19.3076 17.4661 18.0347 17.4661Z" fill="white" />
                                                                                </svg>

                                                                                <p className="menu-cards-text">Discord</p>
                                                                            </div>
                                                                        </Link>
                                                                    </div>
                                                                }





                                                            </div>


                                                            <div className=" rounded-[20px]   mt-[24px]">


                                                                {/* <div onClick={() => { setOpenDropDownMenu(false), setScrollToNotes(true) }}>

                                                                    <Link className={` ${currentPage == 'livestream' && 'pointer-events-none'} `} href={route('livestream.index')} >
                                                                        <li className="notification-click mb-[14px] card-bg-discord flex justify-center items-center h-[39px]  input-shadow border-rounded-10   mt-3 uppercase w-full text-center font-size-12 fw-bold ">
                                                                            Livestream
                                                                        </li>
                                                                    </Link>
                                                                </div> */}


                                                                <div onClick={() => { setOpenDropDownMenu(false), setScrollToNotes(true) }}>

                                                                    <Link className={` ${currentPage == 'progress' && 'pointer-events-none'} `} href={route('profile')} >
                                                                        <li className="notification-click   menu-options-dropdown   ">
                                                                            notes
                                                                        </li>
                                                                    </Link>
                                                                </div>
                                                                <div onClick={() => { setOpenDropDownMenu(false) }}>
                                                                    <Link className={` ${currentPage == 'progress' && 'pointer-events-none'} `} href={route('profile')} >
                                                                        <li className="notification-click  menu-options-dropdown">
                                                                            favorites
                                                                        </li>
                                                                    </Link>
                                                                </div>
                                                                <div onClick={() => { setOpenDropDownMenu(false) }}>
                                                                    <Link className={` ${currentPage == 'personal' && 'pointer-events-none'} `} href={route('profile.personal')}  >
                                                                        <li className="notification-click menu-options-dropdown ">
                                                                            SETTINGS
                                                                        </li>
                                                                    </Link>
                                                                </div>
                                                                <a onClick={() => { setOpenDropDownMenu(false) }}
                                                                    href="https://capitalclub1498.zendesk.com/hc/en-us" target="_blank">
                                                                    <li className="notification-click flex justify-center items-center bg-white text-black rounded-[8px] h-12 mt-6  uppercase w-full text-center font-size-12 fw-bold ">
                                                                        <p className="menu-support-button" >    SUPPORT
                                                                            {/* <svg className="m-1" width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                            <path d="M11.6667 6.12833C11.6667 2.92583 9.18174 0.75 6.41674 0.75C3.6809 0.75 1.16674 2.87917 1.16674 6.16333C0.816738 6.36167 0.583405 6.735 0.583405 7.16667V8.33333C0.583405 8.975 1.1084 9.5 1.75007 9.5H2.3334V5.94167C2.3334 3.68417 4.15924 1.85833 6.41674 1.85833C8.67424 1.85833 10.5001 3.68417 10.5001 5.94167V10.0833H5.8334V11.25H10.5001C11.1417 11.25 11.6667 10.725 11.6667 10.0833V9.37167C12.0109 9.19083 12.2501 8.835 12.2501 8.415V7.07333C12.2501 6.665 12.0109 6.30917 11.6667 6.12833Z" fill="black" />
                                                                            <path d="M4.66674 7.16667C4.9889 7.16667 5.25007 6.9055 5.25007 6.58333C5.25007 6.26117 4.9889 6 4.66674 6C4.34457 6 4.0834 6.26117 4.0834 6.58333C4.0834 6.9055 4.34457 7.16667 4.66674 7.16667Z" fill="black" />
                                                                            <path d="M8.16674 7.16667C8.4889 7.16667 8.75007 6.9055 8.75007 6.58333C8.75007 6.26117 8.4889 6 8.16674 6C7.84457 6 7.5834 6.26117 7.5834 6.58333C7.5834 6.9055 7.84457 7.16667 8.16674 7.16667Z" fill="black" />
                                                                            <path d="M9.91674 5.43417C9.63674 3.77167 8.19007 2.5 6.4459 2.5C4.6784 2.5 2.77674 3.96417 2.9284 6.2625C4.36924 5.67333 5.45424 4.39 5.7634 2.82667C6.52757 4.36083 8.09674 5.41667 9.91674 5.43417Z" fill="black" />
                                                                        </svg> */}
                                                                        </p>
                                                                    </li>
                                                                </a>



                                                            </div>
                                                        </ul>
                                                    </div>
                                                </motion.div>
                                            }
                                        </AnimatePresence>

                                    </div>
                                </div>
                            </div>




                            <div >


                                {/* ******************** MOBILE *************** */}


                                {/* ${openMobileMenu && 'right-0' */}


                                <button className="block md:hidden rounded  ">

                                    <div className="md:hidden block md:-mt-2 lg:mt-0">
                                        <div className="flex items-center justify-end  rounded-full">

                                            {/* <div className="notification-btn notification-icon  bg-1a cursor-pointer">
                                        <div className="  group">
                                            <span onClick={() => { setOpenSearchDropDown(true) }}>
                                                <svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M12.5706 11.4907L11.7823 11.4387L11.5207 11.1509C12.8101 9.83284 13.5544 7.96773 13.3486 5.91977C13.0624 3.11489 10.8934 0.747153 8.12177 0.223792C3.93511 -0.573199 0.14875 2.74503 0.389508 7.00007C0.544676 9.81637 2.60734 12.2773 5.35042 12.9291C7.35367 13.4018 9.3003 12.9087 10.7762 11.8034L11.0272 12.1005L10.9752 12.8888L14.9366 17.409C15.3188 17.8451 15.9873 17.8892 16.4234 17.507C16.8595 17.1249 16.9035 16.4563 16.5214 16.0202L12.5706 11.4907ZM6.5836 11.0962C4.09898 10.9325 2.22549 8.79467 2.3892 6.31005C2.55292 3.82544 4.69072 1.95195 7.17533 2.11566C9.65995 2.27937 11.5334 4.41718 11.3697 6.90179C11.206 9.3864 9.06821 11.2599 6.5836 11.0962Z" fill="white" />
                                                </svg>


                                            </span>

                                            <div className=" flex justify-end">
                                                <SearchDropdown
                                                    setOpenSearchDropDown={setOpenSearchDropDown}
                                                    openSearchDropDown={openSearchDropDown}
                                                />
                                            </div>
                                        </div>
                                    </div> */}




                                            <div
                                            // className={`${currentPage == 'academy' || currentPage == 'setup' || currentPage == 'marketplace' || currentPage == 'livestream' ? 'block md:hidden  ' : 'hidden md:block'} `}
                                            >

                                                <div onClick={() => readNotification()} className={` notification-icon bg-1a `}>
                                                    <div className="   ">
                                                        <span className="cursor-pointer" onClick={() => { setOpenDropDownNotification(true) }}>
                                                            <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M18.4871 16.33L17.2508 15.0938V10.3021C17.2508 7.36 15.6792 4.89708 12.9383 4.24542V3.59375C12.9383 2.79833 12.2963 2.15625 11.5008 2.15625C10.7054 2.15625 10.0633 2.79833 10.0633 3.59375V4.24542C7.31293 4.89708 5.75084 7.35042 5.75084 10.3021V15.0938L4.51459 16.33C3.91084 16.9338 4.33251 17.9688 5.18543 17.9688H17.8067C18.6692 17.9688 19.0908 16.9338 18.4871 16.33ZM15.3342 16.0521H7.66751V10.3021C7.66751 7.92542 9.11459 5.98958 11.5008 5.98958C13.8871 5.98958 15.3342 7.92542 15.3342 10.3021V16.0521ZM11.5008 20.8438C12.555 20.8438 13.4175 19.9812 13.4175 18.9271H9.58418C9.58418 19.9812 10.4371 20.8438 11.5008 20.8438Z" fill="white" />
                                                            </svg>
                                                        </span>



                                                        <div className={` w-full flex justify-end `}>

                                                            {showBlink && <div className="circle-noti red-noti"></div>}

                                                            <NotificationDropdown
                                                                setOpenDropDownNotification={setOpenDropDownNotification}
                                                                openDropDownNotification={openDropDownNotification}
                                                                setShowBlink={setShowBlink}
                                                                showBlink={showBlink}
                                                            />
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>




                                            <div className="dropdown inline-block relative items-center flex">
                                                <div onClick={() => {
                                                    setOpenMobileMenu(true)
                                                }} className={`text-white ${currentPage == 'academy' ? 'pl-3 bg-1a pr-0.5 py-0.5' : 'md:px-3'}   inline-flex items-center  rounded-full `}>
                                                    <p className={` ${currentPage == 'academy' ? 'block md:hidden  ' : 'hidden md:block'} fs-tiny fw-semibold pl-1 pt-[2px] pr-2 `}>
                                                        #{user.id.toString().padStart(4, '0')} </p>
                                                    <div
                                                        className={`  md:ml-2    rounded-full  ${currentPage == 'academy' ? 'min-h-[30px] min-w-[30px] bg-[#000] ' : '  lg:h-[34px] lg:w-[34px] '}      flex items-center justify-center `}>
                                                        <img
                                                            src={user?.dp?.original?.url}
                                                            className={` ${currentPage == 'academy' ? 'h-[18px] w-[18px]' : ' min-h-[24px] min-w-[26px]'}   h-[18px] w-[18px]  lg:h-[20px] lg:w-[20px] object-contain rounded-full `}
                                                        />
                                                    </div>
                                                </div>


                                                {/* <button onClick={() => {
                                                        setOpenMobileMenu(true)
                                                    }} className={`text-white ${currentPage == 'academy' ? 'px-3' : 'md:px-3'}   inline-flex items-center bg-1a rounded-full `}>
                                                        <p className={` ${currentPage == 'academy' ? 'block md:hidden  ' : 'hidden md:block'} fs-tiny fw-semibold pl-1 pt-[2px] pr-2 `}>
                                                              #{user.id.toString().padStart(4, '0')} </p>
                                                        <div
                                                            className="md:ml-2      flex items-center justify-center">
                                                            <img
                                                                src={user?.dp?.original?.url}
                                                                className="  h-[24px] w-[26px]  lg:h-[20px] lg:w-[20px] object-contain rounded-full "
                                                            />
                                                        </div>
                                                    </button> */}



                                            </div>
                                        </div>
                                    </div>





                                    {/* <div onClick={() => {
                                setOpenMobileMenu(true)
                            }}
                                className="font-[617] font-[pangramRegular] text-white text-xs">
                                <div
                                    className="h-[24px] w-[24px] flex items-center justify-center">
                                    <img
                                        src={user?.dp?.original?.url}
                                        className="  h-[26px] w-[26px]object-contain rounded-full "
                                    />
                                </div>
                            </div>  */}
                                    <AnimatePresence>

                                        {openMobileMenu &&

                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <div
                                                    className={` fixed top-0 ${orientation == 'landscape' ? 'overflow-auto h-[100vh] md:h-auto' : 'h-auto'}  w-full bg-[#121212] border-rounded-17    right-0   }
                                         transition-all duration-300 z-[100] `} style={{ maxHeight: '-webkit-fill-available' }}>
                                                    <ul className="flex flex-col text-left   w-full text-base cursor-pointer p-4">
                                                        <li className="pb-5 ">
                                                            <div className="flex justify-between" style={{ justifyContent: 'space-between' }}>
                                                                <p className="fw-bold text-20 uppercase">menu</p>
                                                                <div onClick={() => {
                                                                    setOpenMobileMenu(false)
                                                                }}
                                                                    className="text-[1.25rem] fw-regular text-[#fff] flex items-center"
                                                                >

                                                                    <span className="ml-2">
                                                                        <svg
                                                                            width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                            <path d="M13 0.5C6.0875 0.5 0.5 6.0875 0.5 13C0.5 19.9125 6.0875 25.5 13 25.5C19.9125 25.5 25.5 19.9125 25.5 13C25.5 6.0875 19.9125 0.5 13 0.5ZM13 23C7.4875 23 3 18.5125 3 13C3 7.4875 7.4875 3 13 3C18.5125 3 23 7.4875 23 13C23 18.5125 18.5125 23 13 23ZM17.4875 6.75L13 11.2375L8.5125 6.75L6.75 8.5125L11.2375 13L6.75 17.4875L8.5125 19.25L13 14.7625L17.4875 19.25L19.25 17.4875L14.7625 13L19.25 8.5125L17.4875 6.75Z" fill="white" />
                                                                        </svg>

                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </li>

                                                        <div className="grid grid-cols-2 w-full gap-2 uppercase">

                                                            <div onClick={() => { setOpenMobileMenu(false) }}
                                                                className="   menu-4-cards-bg   w-full ">
                                                                <Link className={` ${currentPage == 'academy' && 'pointer-events-none'} w-full flex justify-center items-center`} href={route('academy')}   >
                                                                    <div>
                                                                        <svg className="mx-auto" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                            <path d="M4.57115 15.4157V18.7979C4.57115 19.6765 5.03988 20.495 5.78986 20.9163L11.649 24.2021C12.3521 24.5993 13.1958 24.5993 13.8989 24.2021L19.758 20.9163C20.508 20.495 20.9767 19.6765 20.9767 18.7979V15.4157L13.8989 19.3877C13.1958 19.7849 12.3521 19.7849 11.649 19.3877L4.57115 15.4157ZM11.649 3.78887L1.77048 9.32548C0.961922 9.78285 0.961922 10.9865 1.77048 11.4438L11.649 16.9804C12.3521 17.3776 13.1958 17.3776 13.8989 16.9804L23.3204 11.6966V18.8099C23.3204 19.4719 23.8477 20.0135 24.4922 20.0135C25.1367 20.0135 25.6641 19.4719 25.6641 18.8099V11.0948C25.6641 10.6494 25.4297 10.2523 25.0547 10.0356L13.8989 3.78887C13.1958 3.40371 12.3521 3.40371 11.649 3.78887Z" fill="#EBEBEB" />
                                                                        </svg>
                                                                        <p className="menu-cards-text">Academy</p>
                                                                    </div>
                                                                </Link>
                                                            </div>


                                                            <div onClick={() => { setOpenMobileMenu(false) }}
                                                                className="   menu-4-cards-bg   w-full ">
                                                                <Link className={` ${currentPage == 'live-stream' && 'pointer-events-none'} w-full flex justify-center items-center `} href={route('livestream.index')}>
                                                                    <div>
                                                                        <svg className="mx-auto" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                            <path d="M18.4891 13.3914C18.4891 15.2689 16.565 16.7829 15.6969 18.2149C15.3183 18.8394 14.6888 19.4525 13.9585 19.4525C13.2712 19.4525 12.6841 18.8753 12.3376 18.2817C11.4901 16.8299 9.50573 15.2981 9.50573 13.3914C9.50573 11.0518 11.5206 9.14859 13.9974 9.14859C16.4742 9.14859 18.4891 11.0518 18.4891 13.3914ZM26.8307 13.9975C26.8307 11.0154 25.6886 8.28791 23.8021 6.17864C23.4299 5.76648 22.7754 5.71799 22.3647 6.1059C22.0182 6.4332 21.9797 6.96658 22.2877 7.31813C23.9176 9.11222 24.9057 11.4518 24.9057 13.9975C24.9057 16.5432 23.9176 18.8828 22.2877 20.689C21.9669 21.0405 22.0182 21.5739 22.3647 21.9012C22.7754 22.2891 23.4299 22.2406 23.8021 21.8285C25.6886 19.7071 26.8307 16.9796 26.8307 13.9975ZM3.08906 13.9975C3.08906 11.4518 4.07723 9.11222 5.70706 7.30601C6.0279 6.95446 5.97656 6.42108 5.63006 6.09378C5.23223 5.71799 4.5649 5.75436 4.19273 6.16651C2.30623 8.28791 1.16406 11.0154 1.16406 13.9975C1.16406 16.9796 2.30623 19.7071 4.19273 21.8285C4.5649 22.2406 5.2194 22.2891 5.63006 21.9012C5.97656 21.5739 6.01506 21.0405 5.70706 20.689C4.07723 18.8828 3.08906 16.5432 3.08906 13.9975ZM21.0557 13.9975C21.0557 15.5491 20.4911 16.9917 19.5414 18.1312C19.2462 18.4827 19.2847 18.9919 19.6312 19.3192C20.0419 19.7071 20.7221 19.6707 21.0814 19.2343C22.2621 17.7918 22.9807 15.9734 22.9807 13.9975C22.9807 12.0216 22.2621 10.2032 21.0686 8.7728C20.7092 8.3364 20.0291 8.30003 19.6184 8.68794C19.2847 9.00312 19.2334 9.51226 19.5286 9.87593C20.4911 11.0033 21.0557 12.4458 21.0557 13.9975ZM8.3764 19.307C8.71006 18.9919 8.7614 18.4827 8.46623 18.1191C7.50373 16.9917 6.93906 15.5491 6.93906 13.9975C6.93906 12.4458 7.50373 11.0033 8.4534 9.8638C8.74856 9.51226 8.71006 9.00312 8.36356 8.67582C7.96573 8.30003 7.28556 8.3364 6.92623 8.76068C5.73273 10.2032 5.01406 12.0216 5.01406 13.9975C5.01406 15.9734 5.73273 17.7918 6.92623 19.2343C7.28556 19.6586 7.96573 19.695 8.3764 19.307Z" fill="#EBEBEB" />
                                                                        </svg>

                                                                        <p className="menu-cards-text">Livestream</p>
                                                                    </div>
                                                                </Link>
                                                            </div>





                                                            <div onClick={() => {
                                                                GTMLogs({
                                                                    'event': 'GTMevent',
                                                                    'event_name': 'marketplace_link_click'
                                                                }); setOpenMobileMenu(false)
                                                            }}
                                                                className=" border-rounded-10 pt-4 pb-3 menu-4-cards-bg   w-full ">

                                                                <Link onClick={() => { setOpenMobileMenu(false) }} className={`  ${currentPage == 'profile' && 'pointer-events-none'} w-full flex justify-center items-center`} href={route("marketplace.index")}>
                                                                    <div>
                                                                        <svg className="mx-auto" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                            <path d="M12.3447 2.92038L7.77629 10.3557C7.27278 11.1629 7.86225 12.2146 8.82015 12.2146H17.9447C18.9026 12.2146 19.4921 11.1629 18.9886 10.3557L14.4324 2.92038C13.9535 2.13771 12.8237 2.13771 12.3447 2.92038Z" fill="white" />
                                                                            <path d="M20.143 25.6667C23.1951 25.6667 25.6693 23.2029 25.6693 20.1636C25.6693 17.1243 23.1951 14.6604 20.143 14.6604C17.0909 14.6604 14.6166 17.1243 14.6166 20.1636C14.6166 23.2029 17.0909 25.6667 20.143 25.6667Z" fill="white" />
                                                                            <path d="M3.56401 25.0552H10.9324C11.6079 25.0552 12.1605 24.5049 12.1605 23.8323V16.4948C12.1605 15.8222 11.6079 15.2719 10.9324 15.2719H3.56401C2.88857 15.2719 2.33594 15.8222 2.33594 16.4948V23.8323C2.33594 24.5049 2.88857 25.0552 3.56401 25.0552Z" fill="white" />
                                                                        </svg>
                                                                        <p className="menu-cards-text">Marketplace</p>
                                                                    </div>
                                                                </Link>
                                                            </div>




                                                            {discordUrl ?

                                                                <a href={discordUrl} className="w-full">
                                                                    <div onClick={() => { setOpenMobileMenu(false); handleDiscordGTM() }}
                                                                        className=" border-rounded-10   menu-4-cards-bg   w-full flex justify-center items-center">
                                                                        <div>
                                                                            <svg className="mx-auto" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path d="M22.6184 5.21575C20.9789 4.41422 19.2259 3.83169 17.3932 3.5C17.1682 3.92522 16.9052 4.49715 16.7239 4.95212C14.7757 4.64596 12.8454 4.64596 10.933 4.95212C10.7518 4.49715 10.4828 3.92522 10.2558 3.5C8.42108 3.83169 6.66608 4.41636 5.02662 5.22C1.71982 10.4416 0.823404 15.5335 1.27161 20.5531C3.46486 22.2646 5.59037 23.3042 7.68002 23.9846C8.19596 23.2426 8.65612 22.4538 9.05253 21.6225C8.29755 21.3227 7.57444 20.9528 6.89119 20.5233C7.07245 20.383 7.24976 20.2363 7.42106 20.0854C11.5884 22.1221 16.1163 22.1221 20.2339 20.0854C20.4072 20.2363 20.5845 20.383 20.7638 20.5233C20.0785 20.9549 19.3534 21.3249 18.5984 21.6247C18.9948 22.4538 19.453 23.2447 19.9709 23.9867C22.0626 23.3063 24.1901 22.2667 26.3833 20.5531C26.9092 14.7341 25.4849 9.68896 22.6184 5.21575ZM9.62027 17.4661C8.36928 17.4661 7.34336 16.2457 7.34336 14.7596C7.34336 13.2735 8.34737 12.051 9.62027 12.051C10.8932 12.051 11.9191 13.2714 11.8972 14.7596C11.8992 16.2457 10.8932 17.4661 9.62027 17.4661ZM18.0347 17.4661C16.7837 17.4661 15.7578 16.2457 15.7578 14.7596C15.7578 13.2735 16.7617 12.051 18.0347 12.051C19.3076 12.051 20.3335 13.2714 20.3116 14.7596C20.3116 16.2457 19.3076 17.4661 18.0347 17.4661Z" fill="white" />
                                                                            </svg>
                                                                            <p className="menu-cards-text">Discord</p>
                                                                        </div>
                                                                    </div>
                                                                </a>

                                                                :

                                                                <div onClick={() => { setOpenMobileMenu(false); handleDiscordGTM() }}
                                                                    className=" border-rounded-10   menu-4-cards-bg   w-full ">
                                                                    <Link className={` ${currentPage == 'setup' && 'pointer-events-none'} w-full flex justify-center items-center`} href={route('discord.setup')}  >

                                                                        <div>
                                                                            <svg className="mx-auto" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path d="M22.6184 5.21575C20.9789 4.41422 19.2259 3.83169 17.3932 3.5C17.1682 3.92522 16.9052 4.49715 16.7239 4.95212C14.7757 4.64596 12.8454 4.64596 10.933 4.95212C10.7518 4.49715 10.4828 3.92522 10.2558 3.5C8.42108 3.83169 6.66608 4.41636 5.02662 5.22C1.71982 10.4416 0.823404 15.5335 1.27161 20.5531C3.46486 22.2646 5.59037 23.3042 7.68002 23.9846C8.19596 23.2426 8.65612 22.4538 9.05253 21.6225C8.29755 21.3227 7.57444 20.9528 6.89119 20.5233C7.07245 20.383 7.24976 20.2363 7.42106 20.0854C11.5884 22.1221 16.1163 22.1221 20.2339 20.0854C20.4072 20.2363 20.5845 20.383 20.7638 20.5233C20.0785 20.9549 19.3534 21.3249 18.5984 21.6247C18.9948 22.4538 19.453 23.2447 19.9709 23.9867C22.0626 23.3063 24.1901 22.2667 26.3833 20.5531C26.9092 14.7341 25.4849 9.68896 22.6184 5.21575ZM9.62027 17.4661C8.36928 17.4661 7.34336 16.2457 7.34336 14.7596C7.34336 13.2735 8.34737 12.051 9.62027 12.051C10.8932 12.051 11.9191 13.2714 11.8972 14.7596C11.8992 16.2457 10.8932 17.4661 9.62027 17.4661ZM18.0347 17.4661C16.7837 17.4661 15.7578 16.2457 15.7578 14.7596C15.7578 13.2735 16.7617 12.051 18.0347 12.051C19.3076 12.051 20.3335 13.2714 20.3116 14.7596C20.3116 16.2457 19.3076 17.4661 18.0347 17.4661Z" fill="white" />
                                                                            </svg>
                                                                            <p className="menu-cards-text">Discord</p>
                                                                        </div>
                                                                    </Link>
                                                                </div>
                                                            }





                                                        </div>


                                                        <div className=" rounded-[20px]   mt-[24px]">



                                                            {/* <Link onClick={() => { setOpenMobileMenu(false), setScrollToNotes(true) }} href={route('livestream.index')} >
                                                                <li className="mb-[14px] card-bg-discord flex justify-center items-center h-[39px] input-shadow border-rounded-10   uppercase w-full text-center font-size-12 fw-bold">
                                                                    LIVESTREAM
                                                                </li>
                                                            </Link> */}

                                                            <Link onClick={() => { setOpenMobileMenu(false), setScrollToNotes(true) }} href={route('profile')} >
                                                                <li className="menu-options-dropdown">
                                                                    notes
                                                                </li>
                                                            </Link>
                                                            <Link onClick={() => { setOpenMobileMenu(false) }} href={route('profile')} >
                                                                <li className="menu-options-dropdown">
                                                                    favorites
                                                                </li>
                                                            </Link>




                                                            <Link onClick={() => { setOpenMobileMenu(false) }} href={route('profile.personal')}  >
                                                                <li className="menu-options-dropdown">
                                                                    SETTINGS
                                                                </li>
                                                            </Link>

                                                            <a onClick={() => { setOpenMobileMenu(false) }}
                                                                href="https://capitalclub1498.zendesk.com/hc/en-us" target="_blank">
                                                                <li className="bg-white text-black rounded-[8px] mt-6 flex justify-center items-center h-[48px] w-full     ">
                                                                    <p className="menu-support-button" >    SUPPORT
                                                                        {/* <svg className="m-1" width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path d="M11.6667 6.12833C11.6667 2.92583 9.18174 0.75 6.41674 0.75C3.6809 0.75 1.16674 2.87917 1.16674 6.16333C0.816738 6.36167 0.583405 6.735 0.583405 7.16667V8.33333C0.583405 8.975 1.1084 9.5 1.75007 9.5H2.3334V5.94167C2.3334 3.68417 4.15924 1.85833 6.41674 1.85833C8.67424 1.85833 10.5001 3.68417 10.5001 5.94167V10.0833H5.8334V11.25H10.5001C11.1417 11.25 11.6667 10.725 11.6667 10.0833V9.37167C12.0109 9.19083 12.2501 8.835 12.2501 8.415V7.07333C12.2501 6.665 12.0109 6.30917 11.6667 6.12833Z" fill="black" />
                                                                        <path d="M4.66674 7.16667C4.9889 7.16667 5.25007 6.9055 5.25007 6.58333C5.25007 6.26117 4.9889 6 4.66674 6C4.34457 6 4.0834 6.26117 4.0834 6.58333C4.0834 6.9055 4.34457 7.16667 4.66674 7.16667Z" fill="black" />
                                                                        <path d="M8.16674 7.16667C8.4889 7.16667 8.75007 6.9055 8.75007 6.58333C8.75007 6.26117 8.4889 6 8.16674 6C7.84457 6 7.5834 6.26117 7.5834 6.58333C7.5834 6.9055 7.84457 7.16667 8.16674 7.16667Z" fill="black" />
                                                                        <path d="M9.91674 5.43417C9.63674 3.77167 8.19007 2.5 6.4459 2.5C4.6784 2.5 2.77674 3.96417 2.9284 6.2625C4.36924 5.67333 5.45424 4.39 5.7634 2.82667C6.52757 4.36083 8.09674 5.41667 9.91674 5.43417Z" fill="black" />
                                                                    </svg> */}
                                                                    </p>
                                                                </li>
                                                            </a>



                                                            {/* <Link onClick={() => {
                                            setOpenMobileMenu(false)
                                        }} href={window._base_url + "/profile/payment"}>
                                            <li onClick={() => {
                                                setOpenMobileMenu(false)
                                            }}
                                                className="hover:bg-[#1a1a1a] uppercase mt-[2rem]  w-full  text-center  fs-x-large fw-reguler  text-white">
                                                Payment
                                            </li>
                                        </Link> */}

                                                            {/* <Link onClick={() => {
                                            setOpenMobileMenu(false)
                                        }} href={route('profile.security')}>
                                            <li onClick={() => {
                                                setOpenMobileMenu(false)
                                            }}
                                                className="hover:bg-[#1a1a1a] uppercase mt-[2rem]  w-full  text-center  fs-x-large fw-reguler  text-white">
                                                Security
                                            </li>
                                        </Link> */}


                                                        </div>



                                                        {/* <li onClick={(e) => { handleLogout(e) }} className="hover:bg-[#1a1a1a] border-rounded-20 uppercase py-7 w-full mt-[1.5rem] text-center fs-x-large fw-regular  dangerColor">
                                        Logout
                                    </li> */}



                                                    </ul>
                                                </div>
                                            </motion.div>
                                        }
                                    </AnimatePresence>

                                    {openMobileMenu &&
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <div onClick={() => { setOpenMobileMenu(false) }} className="backdrop-blur-[2px] bg-black/10  fixed inset-0 z-40    "></div>
                                        </motion.div>}
                                </button>
                            </div>
                        </div >

                    </div >
                </nav >

            </div >
        </>
    );
};

export default Navbar;
