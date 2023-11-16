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
import Lottie from "react-lottie-player";
import logo from "../../../assets/svg/nav-logo.svg"
import ArrowMark from "../ArrowMark";
import Xmark from "../Xmark";
import axios from "axios";


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

    const pageData = usePage();
    const url = pageData?.url;
    useEffect(() => {
        const match = url.match(/\/([^/]+)$/);
        if (match) {
            const play = match[1];
            setCurrentPage(play)
        } else {
            console.log("Play not found in the URL");
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
        if (openMobileMenu || openDropDownMenu) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [openMobileMenu, openDropDownMenu]);

    const { post, processing, errors } = useForm();

    const handleLogout = (e) => {
        e.preventDefault();
        post(route("logout"));
    }


    const currentPathname = window.location.pathname;
    const segments = currentPathname.split('/');

    // Get the last segment
    const currentPage = segments[segments.length - 1];

    // console.log('current Page : ', currentPage)

    function goBack() {
        window.history.back();
    }



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


    const [showBlink , setShowBlink] = useState(false)

    const readNotification = async () => {
        if (showBlink) {            
            try {
                await axios.post(route("notifications.read-all"));  
                setShowBlink(false)
            } catch (error) { 
                console.error("Error while notification:", error?.response );
            }
        }
    };



    const handleContextMenu = (e) => {
        e.preventDefault(); 
      };
 
    return (
        <>
            <div onContextMenu={handleContextMenu} className={` navbar-main ${studymode &&  currentPage=='play' ? 'hidden' :  'block' } container flex flex-wrap flex-col md:flex-row md:items-center   px-4 lg:px-3 z-[999] relative  ${currentPage == 'play' || currentPage == 'preview' ? ' navbar-arrow' : ''}`}>

                <nav className="w-full  ">
                    <div className="container m-auto">
                        <div className="flex justify-between items-center">
                            {currentPage == 'academy' || currentPage == 'marketplace' || currentPage == 'setup' ?
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

                            <div className={` ${currentPage == 'academy' || currentPage == 'marketplace' || currentPage == 'setup' ? 'visible' : 'invisible'}  w-full flex justify-center`}>
                                <div className={` ${!isSticky ? 'md:invisible   ' : ''} hidden lg:flex md:mx-auto item-center gap-x-4   text-base font-semibold cursor-pointer `}>
                                    <Link className={` ${currentPage == 'academy' && 'pointer-events-none'} desktop-nav-item  ${currentPage == 'academy' && 'active'} `} href={route("academy")}>

                                        Academy

                                    </Link>

                                    {
                                        discordUrl ?
                                            <a href={discordUrl} target='_blank'>
                                                <div className={`desktop-nav-item  ${currentPage == 'setup' && 'active'} `}>
                                                    Discord
                                                </div>
                                            </a>
                                            :
                                            <Link className={`desktop-nav-item  ${currentPage == 'setup' && 'active'} ${currentPage == 'setup' && 'pointer-events-none'} `} href={route('discord.setup')}>

                                                Discord

                                            </Link>
                                    }
                                    {/* <Link href={route('discussion')}> */}
                                    {/* <Link className={`desktop-nav-item  ${currentPage == 'marketplace' && 'active'} ${currentPage == 'marketplace' && 'pointer-events-none'} `} href={route("marketplace.index")}>

                                        Marketplace

                                    </Link> */}
                                </div>
                            </div>


                            <div className="hidden md:block md:-mt-2 lg:mt-0">
                                <div className="flex items-center justify-end rounded-full  ">
                                    <div onClick={()=> readNotification()} className="notification-btn notification-icon  bg-1a cursor-pointer">
                                        <div className="  group">
                                            <span onClick={() => { setOpenDropDownNotification(true) }}>
                                                <svg width="15" height="19" viewBox="0 0 15 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M14.4864 14.33L13.2501 13.0938V8.30208C13.2501 5.36 11.6784 2.89708 8.93761 2.24542V1.59375C8.93761 0.798333 8.29553 0.15625 7.50011 0.15625C6.70469 0.15625 6.06261 0.798333 6.06261 1.59375V2.24542C3.31219 2.89708 1.75011 5.35042 1.75011 8.30208V13.0938L0.51386 14.33C-0.0898896 14.9338 0.331777 15.9688 1.18469 15.9688H13.8059C14.6684 15.9688 15.0901 14.9338 14.4864 14.33ZM11.3334 14.0521H3.66678V8.30208C3.66678 5.92542 5.11386 3.98958 7.50011 3.98958C9.88636 3.98958 11.3334 5.92542 11.3334 8.30208V14.0521ZM7.50011 18.8438C8.55428 18.8438 9.41678 17.9812 9.41678 16.9271H5.58344C5.58344 17.9812 6.43636 18.8438 7.50011 18.8438Z" fill="white" />
                                                </svg>

                                            </span>
                                            
                                            <div className=" flex justify-end">
                                            {showBlink &&   <div class="circle-noti red-noti"></div> }
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
                                            <p className="fw-bold nav-glitch-id  pt-[3px]">  #{user.id.toString().padStart(4, '0')} </p>
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

                                                    <div className={` absolute -top-[2px] -right-[2px]  w-[400px] ${innerHeight < 500 ? 'h-[300px] overflow-auto pb-3' : 'h-auto'}   bg-[#121212] border-rounded-17   z-[999] `}>

                                                        <ul className="flex flex-col text-left   w-full text-base cursor-pointer pl-3 pt-3 pr-3 pb-[12px]">
                                                            <li className="pb-5 ">
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

                                                            <div className="flex w-full gap-x-2">
                                                                <div onClick={() => { setOpenDropDownMenu(false) }}
                                                                    className=" border-rounded-10 pt-4 pb-3 card-bg-discord input-shadow w-full notification-click">
                                                                    <Link className={` ${currentPage == 'academy' && 'pointer-events-none'} w-full flex justify-center items-center `} href={route('academy')}>
                                                                        <div>
                                                                            <svg
                                                                                className="mx-auto"
                                                                                width="24" height="20" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path d="M3.89382 13.618V17.4833C3.89382 18.4875 4.42951 19.4228 5.28662 19.9043L11.9828 23.6596C12.7863 24.1135 13.7506 24.1135 14.5541 23.6596L21.2503 19.9043C22.1074 19.4228 22.6431 18.4875 22.6431 17.4833V13.618L14.5541 18.1573C13.7506 18.6113 12.7863 18.6113 11.9828 18.1573L3.89382 13.618ZM11.9828 0.330133L0.693053 6.65769C-0.231018 7.1804 -0.231018 8.55595 0.693053 9.07867L11.9828 15.4062C12.7863 15.8602 13.7506 15.8602 14.5541 15.4062L25.3215 9.36753V17.4971C25.3215 18.2536 25.9242 18.8726 26.6608 18.8726C27.3973 18.8726 28 18.2536 28 17.4971V8.67975C28 8.1708 27.7322 7.71687 27.3036 7.46927L14.5541 0.330133C13.7506 -0.110044 12.7863 -0.110044 11.9828 0.330133Z" fill="white" />
                                                                            </svg>
                                                                            <p className="fw-bold font-size-12 pt-2">Academy</p>
                                                                        </div>
                                                                    </Link>
                                                                </div>




                                                                {discordUrl ?

                                                                    <a href={discordUrl} className="w-full">
                                                                        <div onClick={() => { setOpenDropDownMenu(false) }}
                                                                            className="notification-click border-rounded-10 pt-4 pb-3 card-bg-discord input-shadow w-full flex justify-center items-center">
                                                                            <div>
                                                                                <svg className="mx-auto" width="22" height="20" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                    <path d="M18.3894 1.47065C16.9842 0.783615 15.4816 0.284309 13.9107 0C13.7178 0.364474 13.4924 0.8547 13.337 1.24467C11.6671 0.982255 10.0126 0.982255 8.3734 1.24467C8.21804 0.8547 7.98753 0.364474 7.79288 0C6.2203 0.284309 4.71601 0.78545 3.31076 1.47428C0.476366 5.94994 -0.291993 10.3144 0.092187 14.6169C1.97211 16.0839 3.79398 16.9751 5.58511 17.5582C6.02734 16.9222 6.42176 16.2461 6.76154 15.5336C6.11442 15.2766 5.49461 14.9596 4.90897 14.5914C5.06434 14.4712 5.21631 14.3454 5.36314 14.216C8.93515 15.9618 12.8162 15.9618 16.3456 14.216C16.4941 14.3454 16.6461 14.4712 16.7997 14.5914C16.2124 14.9614 15.5909 15.2784 14.9437 15.5354C15.2835 16.2461 15.6763 16.924 16.1202 17.56C17.913 16.9769 19.7366 16.0858 21.6165 14.6169C22.0673 9.62923 20.8465 5.30483 18.3894 1.47065ZM7.24818 11.9709C6.1759 11.9709 5.29654 10.9249 5.29654 9.65109C5.29654 8.37728 6.15712 7.32945 7.24818 7.32945C8.33927 7.32945 9.2186 8.37545 9.19982 9.65109C9.20152 10.9249 8.33927 11.9709 7.24818 11.9709ZM14.4605 11.9709C13.3883 11.9709 12.5089 10.9249 12.5089 9.65109C12.5089 8.37728 13.3694 7.32945 14.4605 7.32945C15.5516 7.32945 16.431 8.37545 16.4122 9.65109C16.4122 10.9249 15.5516 11.9709 14.4605 11.9709Z" fill="white" />
                                                                                </svg>
                                                                                <p className="fw-bold font-size-12 pt-2">Discord</p>
                                                                            </div>
                                                                        </div>
                                                                    </a>

                                                                    :

                                                                    <div onClick={() => { setOpenDropDownMenu(false) }}
                                                                        className="notification-click border-rounded-10 pt-4 pb-3 card-bg-discord input-shadow w-full ">
                                                                        <Link className={` ${currentPage == 'setup' && 'pointer-events-none'} w-full flex justify-center items-center`} href={route('discord.setup')}  >

                                                                            <div>
                                                                                <svg className="mx-auto" width="22" height="20" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                    <path d="M18.3894 1.47065C16.9842 0.783615 15.4816 0.284309 13.9107 0C13.7178 0.364474 13.4924 0.8547 13.337 1.24467C11.6671 0.982255 10.0126 0.982255 8.3734 1.24467C8.21804 0.8547 7.98753 0.364474 7.79288 0C6.2203 0.284309 4.71601 0.78545 3.31076 1.47428C0.476366 5.94994 -0.291993 10.3144 0.092187 14.6169C1.97211 16.0839 3.79398 16.9751 5.58511 17.5582C6.02734 16.9222 6.42176 16.2461 6.76154 15.5336C6.11442 15.2766 5.49461 14.9596 4.90897 14.5914C5.06434 14.4712 5.21631 14.3454 5.36314 14.216C8.93515 15.9618 12.8162 15.9618 16.3456 14.216C16.4941 14.3454 16.6461 14.4712 16.7997 14.5914C16.2124 14.9614 15.5909 15.2784 14.9437 15.5354C15.2835 16.2461 15.6763 16.924 16.1202 17.56C17.913 16.9769 19.7366 16.0858 21.6165 14.6169C22.0673 9.62923 20.8465 5.30483 18.3894 1.47065ZM7.24818 11.9709C6.1759 11.9709 5.29654 10.9249 5.29654 9.65109C5.29654 8.37728 6.15712 7.32945 7.24818 7.32945C8.33927 7.32945 9.2186 8.37545 9.19982 9.65109C9.20152 10.9249 8.33927 11.9709 7.24818 11.9709ZM14.4605 11.9709C13.3883 11.9709 12.5089 10.9249 12.5089 9.65109C12.5089 8.37728 13.3694 7.32945 14.4605 7.32945C15.5516 7.32945 16.431 8.37545 16.4122 9.65109C16.4122 10.9249 15.5516 11.9709 14.4605 11.9709Z" fill="white" />
                                                                                </svg>
                                                                                <p className="fw-bold font-size-12 pt-2">Discord</p>
                                                                            </div>
                                                                        </Link>
                                                                    </div>


                                                                }

                                                                <div onClick={() => { setOpenDropDownMenu(false) }}
                                                                    className="notification-click border-rounded-10 pt-4 pb-3 card-bg-discord input-shadow w-full ">
                                                                    <Link onClick={() => { setOpenDropDownMenu(false), setScrollToNotes(true) }} className={`w-full flex justify-center items-center`} href={route('profile')}  >
                                                                        <div>
                                                                        <svg className="mx-auto" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_9431_21773)">
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.81736 0.0665255C7.4372 0.175932 7.01757 0.397229 6.71926 0.645666C6.40478 0.90751 6.03625 1.4207 5.92211 1.75562L5.84945 1.9689L5.27964 1.96918C4.96623 1.96932 4.63281 1.99084 4.53864 2.01695C4.3255 2.0762 4.04575 2.37704 4.00581 2.59009C3.9895 2.67699 3.98303 3.17921 3.99142 3.70613L4.0067 4.66421L4.15117 4.96904C4.32817 5.34254 4.64621 5.66935 5.00336 5.84467L5.27232 5.97671H8.48326H11.6942L11.9622 5.85109C12.4906 5.60345 12.8772 5.11126 12.9826 4.55237C13.0543 4.17174 13.0399 2.73442 12.9622 2.51659C12.81 2.08979 12.6171 1.99918 11.7971 1.96913L11.15 1.94546L11.0449 1.68653C10.7657 0.998447 10.1245 0.392494 9.40778 0.139182C9.03948 0.00905678 8.15711 -0.0313026 7.81736 0.0665255ZM2.06139 3.07435C1.29901 3.27545 0.620449 3.82721 0.279012 4.52359C-0.0188322 5.13099 -0.00392597 4.70949 0.0098084 12.1215L0.022324 18.8673L0.131683 19.159C0.423152 19.9367 1.06332 20.5767 1.84 20.8671L2.1317 20.9761L6.14214 20.9894L10.1525 21.0026L10.2388 20.4741C10.4497 19.1822 10.6045 18.8519 11.377 18.0456L11.9131 17.486L7.70209 17.4736L3.49107 17.4611L3.33803 17.3519C3.13412 17.2065 3.02945 16.9937 3.02851 16.7226C3.02762 16.4709 3.1247 16.3061 3.37342 16.1369L3.52839 16.0314H8.47871H13.429L15.2218 14.2382L17.0145 12.445V8.94882C17.0145 5.62056 17.0101 5.43526 16.9219 5.09059C16.7856 4.55757 16.5791 4.20099 16.1728 3.79703C15.6414 3.2687 15.0105 3.00015 14.3007 3.00015H13.9676V3.79473C13.9676 4.72951 13.9285 4.95812 13.682 5.4639C13.3713 6.10135 12.7726 6.62682 12.096 6.85581C11.7916 6.95888 11.7513 6.96024 8.64732 6.97431C5.13479 6.9902 5.13156 6.98996 4.48768 6.66784C4.04954 6.44865 3.55136 5.95632 3.33737 5.53103C3.08471 5.02885 3.03901 4.79354 3.01206 3.85562L2.98745 3.00015L2.65332 3.00324C2.46957 3.00493 2.20318 3.03695 2.06139 3.07435ZM3.43056 9.59396C2.87687 9.86682 2.88971 10.627 3.45282 10.9163C3.52665 10.9542 4.94031 10.9689 8.51532 10.9687C13.3821 10.9686 13.4783 10.9668 13.6282 10.8754C13.8739 10.7256 13.9757 10.5212 13.9562 10.2168C13.9363 9.90493 13.8312 9.74157 13.5661 9.61023C13.3787 9.51737 13.2941 9.51578 8.48017 9.51685C4.06089 9.51779 3.56982 9.52529 3.43056 9.59396ZM20.7074 11.7629C20.5858 11.8104 20.3854 11.9242 20.2621 12.0157C20.1388 12.1072 18.3158 13.9078 16.211 16.0169C13.2465 18.9875 12.373 19.8887 12.3352 20.0158C12.3083 20.106 12.166 20.8677 12.0189 21.7085C11.8348 22.7614 11.7615 23.2898 11.7834 23.4063C11.8448 23.7337 12.168 24.0002 12.5035 24.0002C12.6032 24.0002 13.3835 23.8761 14.2375 23.7244C15.3685 23.5236 15.8324 23.4224 15.9454 23.3519C16.0307 23.2987 17.8114 21.5402 19.9026 19.4441C24.2539 15.0825 23.9754 15.4136 23.9754 14.6017C23.9754 13.8887 23.9032 13.7641 22.9065 12.757C21.9658 11.8065 21.7557 11.6706 21.2333 11.6743C21.0532 11.6755 20.8381 11.7118 20.7074 11.7629ZM3.52928 12.8014C3.3235 12.8615 3.10473 13.0936 3.04511 13.3151C2.94395 13.6908 3.18203 14.1011 3.56031 14.203C3.68218 14.2358 5.34109 14.2477 8.61226 14.2393L13.4828 14.2267L13.6549 14.0954C14.0889 13.7643 14.075 13.2056 13.6244 12.8717C13.4922 12.7737 13.4844 12.7736 8.58531 12.7657C5.67015 12.761 3.61796 12.7755 3.52928 12.8014Z" fill="black" fill-opacity="0.349"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M8.0625 0.0321608C7.14206 0.186239 6.20344 0.956817 5.9287 1.78397L5.85183 2.0154H5.18288C4.56642 2.0154 4.50155 2.02369 4.35713 2.121C4.27092 2.17913 4.15706 2.3004 4.10409 2.39054C4.01456 2.54293 4.008 2.62697 4.01067 3.58571C4.01297 4.42674 4.02778 4.6538 4.09078 4.81669C4.28991 5.33124 4.7287 5.74885 5.23448 5.90508C5.52834 5.99583 5.66367 5.99977 8.47945 5.99977C11.7625 5.99977 11.7674 5.99935 12.2328 5.68219C12.3738 5.58615 12.5693 5.3926 12.6674 5.25207C12.9509 4.84585 12.9844 4.66571 12.9844 3.54615C12.9844 2.58535 12.9817 2.55816 12.8688 2.36546C12.6915 2.06297 12.5453 2.0154 11.7922 2.0154C11.225 2.0154 11.1503 2.00621 11.127 1.93336C11.1126 1.88827 11.0256 1.69411 10.9337 1.50193C10.4497 0.48938 9.1883 -0.156324 8.0625 0.0321608ZM2.07197 3.09455C1.57439 3.22491 1.19545 3.44447 0.820078 3.81985C0.438938 4.20094 0.224063 4.57622 0.0925781 5.09021C0.00253125 5.44229 0 5.63283 0 11.9998C0 18.3667 0.00253125 18.5573 0.0925781 18.9093C0.224063 19.4233 0.438938 19.7986 0.820078 20.1797C1.20117 20.5608 1.57645 20.7757 2.09044 20.9072C2.43652 20.9957 2.62181 20.9998 6.28786 20.9998H10.1232L10.1465 20.8943C10.1592 20.8363 10.2134 20.5357 10.2668 20.2263C10.4542 19.1405 10.6042 18.8394 11.332 18.0885C11.622 17.7892 11.8594 17.5308 11.8594 17.5142C11.8594 17.4977 9.98517 17.4841 7.69444 17.4841H3.5295L3.37453 17.3787C3.15019 17.226 3.0398 17.0547 3.01312 16.8181C2.98252 16.5465 3.12159 16.2671 3.36183 16.1178L3.53906 16.0076L8.48414 15.9959L13.4292 15.9842L15.2239 14.1912L17.0187 12.3982L17.004 8.83571C16.9879 4.90566 17.0041 5.1271 16.6861 4.49719C16.2585 3.64983 15.3915 3.08293 14.418 3.01425L14.0282 2.98674L14.0036 3.87216C13.9829 4.61724 13.9626 4.80586 13.8759 5.06227C13.5641 5.98411 12.8365 6.67566 11.9299 6.91182C11.5178 7.01916 5.50406 7.02005 5.08406 6.9128C4.57355 6.78249 4.2255 6.5776 3.81891 6.168C3.16678 5.5111 3.00178 5.03054 3.0007 3.78493L3 2.99977L2.70703 3.00235C2.54592 3.00375 2.26012 3.04529 2.07197 3.09455ZM3.37453 9.62086C3.15019 9.77354 3.0398 9.94482 3.01312 10.1815C2.98252 10.4531 3.12159 10.7324 3.36183 10.8818L3.53906 10.992L8.40591 11.0045C11.6301 11.0129 13.3331 11.0008 13.4516 10.9689C13.6926 10.904 13.9487 10.6168 13.9915 10.3633C14.0336 10.114 13.8745 9.77269 13.6454 9.62091L13.4861 9.51539H8.50781H3.5295L3.37453 9.62086ZM20.8259 11.7368C20.7173 11.7723 20.5274 11.8594 20.404 11.9303C20.1318 12.0866 12.5047 19.6809 12.4015 19.8984C12.3638 19.9779 12.2053 20.7676 12.0494 21.6534C11.7367 23.4294 11.7347 23.5073 11.996 23.7686C12.268 24.0406 12.3408 24.0398 14.0455 23.7452C14.8927 23.5988 15.6705 23.4487 15.774 23.4116C15.9243 23.3578 16.7434 22.5616 19.8582 19.4416C23.565 15.7287 23.7598 15.5251 23.8636 15.2576C23.9467 15.0434 23.973 14.8814 23.9738 14.5779C23.9747 14.2237 23.9577 14.143 23.8204 13.8513C23.6862 13.5661 23.5606 13.4185 22.8603 12.7223C21.9713 11.8385 21.7911 11.7188 21.3047 11.6893C21.1445 11.6796 20.9384 11.7001 20.8259 11.7368ZM3.44297 12.8157C3.00375 13.007 2.86556 13.6052 3.17545 13.9735C3.41962 14.2637 3.15047 14.2498 8.50819 14.2498C13.2917 14.2498 13.4144 14.2475 13.5909 14.1575C14.1165 13.8893 14.1165 13.1102 13.5909 12.8421C13.4143 12.752 13.2935 12.7498 8.49797 12.7516C4.52002 12.7531 3.55875 12.7653 3.44297 12.8157Z" fill="white" fill-opacity="0.988"/>
</g>
<defs>
<clipPath id="clip0_9431_21773">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>
</svg>
                                                                            {/* <svg
                                                                                className="mx-auto" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path d="M10.2947 0.603774L5.59579 8.25157C5.07789 9.08176 5.68421 10.1635 6.66947 10.1635H16.0547C17.04 10.1635 17.6463 9.08176 17.1284 8.25157L12.4421 0.603774C11.9495 -0.201258 10.7874 -0.201258 10.2947 0.603774Z" fill="white" />
                                                                                <path d="M18.3158 24C21.4551 24 24 21.4658 24 18.3396C24 15.2135 21.4551 12.6792 18.3158 12.6792C15.1765 12.6792 12.6316 15.2135 12.6316 18.3396C12.6316 21.4658 15.1765 24 18.3158 24Z" fill="white" />
                                                                                <path d="M1.26316 23.3711H8.8421C9.53684 23.3711 10.1053 22.805 10.1053 22.1132V14.566C10.1053 13.8742 9.53684 13.3082 8.8421 13.3082H1.26316C0.568421 13.3082 0 13.8742 0 14.566V22.1132C0 22.805 0.568421 23.3711 1.26316 23.3711Z" fill="white" />
                                                                            </svg> */}
                                                                            <p className="fw-bold font-size-12 pt-2">Notes</p>
                                                                        </div>
                                                                    </Link>
                                                                </div>
                                                            </div>


                                                            <div className=" rounded-[20px]   mt-[42px]">

                                                                <div onClick={() => { setOpenDropDownMenu(false), setScrollToNotes(true) }}>

                                                                    <Link className={` ${currentPage == 'progress' && 'pointer-events-none'} `} href={route('profile')} >
                                                                        <li className="notification-click mb-[14px] card-bg-discord flex justify-center items-center h-[39px]  input-shadow border-rounded-10   mt-3 uppercase w-full text-center font-size-12 fw-bold ">
                                                                            notes
                                                                        </li>
                                                                    </Link>
                                                                </div>
                                                                <div onClick={() => { setOpenDropDownMenu(false) }}>
                                                                    <Link className={` ${currentPage == 'progress' && 'pointer-events-none'} `} href={route('profile')} >
                                                                        <li className="notification-click mb-[14px] card-bg-discord flex justify-center items-center h-[39px]  input-shadow border-rounded-10   uppercase w-full text-center font-size-12 fw-bold ">
                                                                            favorites
                                                                        </li>
                                                                    </Link>
                                                                </div>
                                                                <div onClick={() => { setOpenDropDownMenu(false) }}>
                                                                    <Link className={` ${currentPage == 'personal' && 'pointer-events-none'} `} href={route('profile.personal')}  >
                                                                        <li className="notification-click mb-[14px] my-3 card-bg-discord flex justify-center items-center h-[39px]  input-shadow border-rounded-10   uppercase w-full text-center font-size-12 fw-bold ">
                                                                            SETTINGS
                                                                        </li>
                                                                    </Link>
                                                                </div>
                                                                <a onClick={() => { setOpenDropDownMenu(false) }}
                                                                    href="https://support.capital.club" target="_blank">
                                                                    <li className="notification-click bg-white text-black border-rounded-10 mt-20 pt-3 pb-[10px] uppercase w-full text-center font-size-12 fw-bold ">
                                                                        <p className="flex justify-center font-size-12 fw-bold" >    SUPPORT <svg className="m-1" width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                            <path d="M11.6667 6.12833C11.6667 2.92583 9.18174 0.75 6.41674 0.75C3.6809 0.75 1.16674 2.87917 1.16674 6.16333C0.816738 6.36167 0.583405 6.735 0.583405 7.16667V8.33333C0.583405 8.975 1.1084 9.5 1.75007 9.5H2.3334V5.94167C2.3334 3.68417 4.15924 1.85833 6.41674 1.85833C8.67424 1.85833 10.5001 3.68417 10.5001 5.94167V10.0833H5.8334V11.25H10.5001C11.1417 11.25 11.6667 10.725 11.6667 10.0833V9.37167C12.0109 9.19083 12.2501 8.835 12.2501 8.415V7.07333C12.2501 6.665 12.0109 6.30917 11.6667 6.12833Z" fill="black" />
                                                                            <path d="M4.66674 7.16667C4.9889 7.16667 5.25007 6.9055 5.25007 6.58333C5.25007 6.26117 4.9889 6 4.66674 6C4.34457 6 4.0834 6.26117 4.0834 6.58333C4.0834 6.9055 4.34457 7.16667 4.66674 7.16667Z" fill="black" />
                                                                            <path d="M8.16674 7.16667C8.4889 7.16667 8.75007 6.9055 8.75007 6.58333C8.75007 6.26117 8.4889 6 8.16674 6C7.84457 6 7.5834 6.26117 7.5834 6.58333C7.5834 6.9055 7.84457 7.16667 8.16674 7.16667Z" fill="black" />
                                                                            <path d="M9.91674 5.43417C9.63674 3.77167 8.19007 2.5 6.4459 2.5C4.6784 2.5 2.77674 3.96417 2.9284 6.2625C4.36924 5.67333 5.45424 4.39 5.7634 2.82667C6.52757 4.36083 8.09674 5.41667 9.91674 5.43417Z" fill="black" />
                                                                        </svg>
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


                                <button className="block md:hidden py-1 rounded  ">

                                    <div className="md:hidden block md:-mt-2 lg:mt-0">
                                        <div className="flex items-center justify-end  rounded-full">
                                            <div onClick={()=> readNotification()} className={` notification-icon ${currentPage == 'academy' ? 'block md:hidden ' : 'sm-d-none md:block'}  bg-1a `}>
                                                <div className="   ">
                                                    <span className="cursor-pointer" onClick={() => { setOpenDropDownNotification(true) }}>
                                                        <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M18.4871 16.33L17.2508 15.0938V10.3021C17.2508 7.36 15.6792 4.89708 12.9383 4.24542V3.59375C12.9383 2.79833 12.2963 2.15625 11.5008 2.15625C10.7054 2.15625 10.0633 2.79833 10.0633 3.59375V4.24542C7.31293 4.89708 5.75084 7.35042 5.75084 10.3021V15.0938L4.51459 16.33C3.91084 16.9338 4.33251 17.9688 5.18543 17.9688H17.8067C18.6692 17.9688 19.0908 16.9338 18.4871 16.33ZM15.3342 16.0521H7.66751V10.3021C7.66751 7.92542 9.11459 5.98958 11.5008 5.98958C13.8871 5.98958 15.3342 7.92542 15.3342 10.3021V16.0521ZM11.5008 20.8438C12.555 20.8438 13.4175 19.9812 13.4175 18.9271H9.58418C9.58418 19.9812 10.4371 20.8438 11.5008 20.8438Z" fill="white" />
                                                        </svg>
                                                    </span>

                                                    

                                                    <div className="w-full flex justify-end">

                                                    {showBlink &&  <div class="circle-noti red-noti"></div> }

                                                        <NotificationDropdown
                                                            setOpenDropDownNotification={setOpenDropDownNotification}
                                                            openDropDownNotification={openDropDownNotification}
                                                            setShowBlink={setShowBlink}
                                                            showBlink={showBlink}
                                                             />
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
                                                        className={`  md:ml-2    rounded-full  ${currentPage == 'academy' ? 'h-[30px] w-[30px] bg-[#000] ' : '  lg:h-[34px] lg:w-[34px] '}      flex items-center justify-center `}>
                                                        <img
                                                            src={user?.dp?.original?.url}
                                                            className={` ${currentPage == 'academy' ? 'h-[18px] w-[18px]' : ' h-[24px] w-[26px]'}   h-[18px] w-[18px]  lg:h-[20px] lg:w-[20px] object-contain rounded-full `}
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
                                                    <ul className="flex flex-col text-left   w-full text-base cursor-pointer pl-4 pt-6 pr-3 pb-[14px]">
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

                                                        <div className="flex w-full gap-x-2">

                                                            <div onClick={() => { setOpenMobileMenu(false) }}
                                                                className=" border-rounded-10 pt-4 pb-3 card-bg-discord input-shadow w-full ">
                                                                <Link className={` ${currentPage == 'academy' && 'pointer-events-none'} w-full flex justify-center items-center`} href={route('academy')}   >
                                                                    <div>
                                                                        <svg
                                                                            className="mx-auto"
                                                                            width="24" height="20" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                            <path d="M3.89382 13.618V17.4833C3.89382 18.4875 4.42951 19.4228 5.28662 19.9043L11.9828 23.6596C12.7863 24.1135 13.7506 24.1135 14.5541 23.6596L21.2503 19.9043C22.1074 19.4228 22.6431 18.4875 22.6431 17.4833V13.618L14.5541 18.1573C13.7506 18.6113 12.7863 18.6113 11.9828 18.1573L3.89382 13.618ZM11.9828 0.330133L0.693053 6.65769C-0.231018 7.1804 -0.231018 8.55595 0.693053 9.07867L11.9828 15.4062C12.7863 15.8602 13.7506 15.8602 14.5541 15.4062L25.3215 9.36753V17.4971C25.3215 18.2536 25.9242 18.8726 26.6608 18.8726C27.3973 18.8726 28 18.2536 28 17.4971V8.67975C28 8.1708 27.7322 7.71687 27.3036 7.46927L14.5541 0.330133C13.7506 -0.110044 12.7863 -0.110044 11.9828 0.330133Z" fill="white" />
                                                                        </svg>
                                                                        <p className="fw-bold font-size-12 pt-2">Academy</p>
                                                                    </div>
                                                                </Link>
                                                            </div>


                                                            {discordUrl ?

                                                                <a href={discordUrl} className="w-full">
                                                                    <div onClick={() => { setOpenMobileMenu(false) }}
                                                                        className=" border-rounded-10 pt-4 pb-3 card-bg-discord input-shadow w-full flex justify-center items-center">
                                                                        <div>
                                                                            <svg className="mx-auto" width="22" height="20" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path d="M18.3894 1.47065C16.9842 0.783615 15.4816 0.284309 13.9107 0C13.7178 0.364474 13.4924 0.8547 13.337 1.24467C11.6671 0.982255 10.0126 0.982255 8.3734 1.24467C8.21804 0.8547 7.98753 0.364474 7.79288 0C6.2203 0.284309 4.71601 0.78545 3.31076 1.47428C0.476366 5.94994 -0.291993 10.3144 0.092187 14.6169C1.97211 16.0839 3.79398 16.9751 5.58511 17.5582C6.02734 16.9222 6.42176 16.2461 6.76154 15.5336C6.11442 15.2766 5.49461 14.9596 4.90897 14.5914C5.06434 14.4712 5.21631 14.3454 5.36314 14.216C8.93515 15.9618 12.8162 15.9618 16.3456 14.216C16.4941 14.3454 16.6461 14.4712 16.7997 14.5914C16.2124 14.9614 15.5909 15.2784 14.9437 15.5354C15.2835 16.2461 15.6763 16.924 16.1202 17.56C17.913 16.9769 19.7366 16.0858 21.6165 14.6169C22.0673 9.62923 20.8465 5.30483 18.3894 1.47065ZM7.24818 11.9709C6.1759 11.9709 5.29654 10.9249 5.29654 9.65109C5.29654 8.37728 6.15712 7.32945 7.24818 7.32945C8.33927 7.32945 9.2186 8.37545 9.19982 9.65109C9.20152 10.9249 8.33927 11.9709 7.24818 11.9709ZM14.4605 11.9709C13.3883 11.9709 12.5089 10.9249 12.5089 9.65109C12.5089 8.37728 13.3694 7.32945 14.4605 7.32945C15.5516 7.32945 16.431 8.37545 16.4122 9.65109C16.4122 10.9249 15.5516 11.9709 14.4605 11.9709Z" fill="white" />
                                                                            </svg>
                                                                            <p className="fw-bold font-size-12 pt-2">Discord</p>
                                                                        </div>
                                                                    </div>
                                                                </a>

                                                                :

                                                                <div onClick={() => { setOpenMobileMenu(false) }}
                                                                    className=" border-rounded-10 pt-4 pb-3 card-bg-discord input-shadow w-full ">
                                                                    <Link className={` ${currentPage == 'setup' && 'pointer-events-none'} w-full flex justify-center items-center`} href={route('discord.setup')}  >

                                                                        <div>
                                                                            <svg className="mx-auto" width="22" height="20" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path d="M18.3894 1.47065C16.9842 0.783615 15.4816 0.284309 13.9107 0C13.7178 0.364474 13.4924 0.8547 13.337 1.24467C11.6671 0.982255 10.0126 0.982255 8.3734 1.24467C8.21804 0.8547 7.98753 0.364474 7.79288 0C6.2203 0.284309 4.71601 0.78545 3.31076 1.47428C0.476366 5.94994 -0.291993 10.3144 0.092187 14.6169C1.97211 16.0839 3.79398 16.9751 5.58511 17.5582C6.02734 16.9222 6.42176 16.2461 6.76154 15.5336C6.11442 15.2766 5.49461 14.9596 4.90897 14.5914C5.06434 14.4712 5.21631 14.3454 5.36314 14.216C8.93515 15.9618 12.8162 15.9618 16.3456 14.216C16.4941 14.3454 16.6461 14.4712 16.7997 14.5914C16.2124 14.9614 15.5909 15.2784 14.9437 15.5354C15.2835 16.2461 15.6763 16.924 16.1202 17.56C17.913 16.9769 19.7366 16.0858 21.6165 14.6169C22.0673 9.62923 20.8465 5.30483 18.3894 1.47065ZM7.24818 11.9709C6.1759 11.9709 5.29654 10.9249 5.29654 9.65109C5.29654 8.37728 6.15712 7.32945 7.24818 7.32945C8.33927 7.32945 9.2186 8.37545 9.19982 9.65109C9.20152 10.9249 8.33927 11.9709 7.24818 11.9709ZM14.4605 11.9709C13.3883 11.9709 12.5089 10.9249 12.5089 9.65109C12.5089 8.37728 13.3694 7.32945 14.4605 7.32945C15.5516 7.32945 16.431 8.37545 16.4122 9.65109C16.4122 10.9249 15.5516 11.9709 14.4605 11.9709Z" fill="white" />
                                                                            </svg>
                                                                            <p className="fw-bold font-size-12 pt-2">Discord</p>
                                                                        </div>
                                                                    </Link>
                                                                </div>
                                                            }



                                                            <div onClick={() => { setOpenMobileMenu(false) }}
                                                                className=" border-rounded-10 pt-4 pb-3 card-bg-discord input-shadow w-full "> 
                                                                <Link onClick={() => { setOpenMobileMenu(false), setScrollToNotes(true) }} className={`   w-full flex justify-center items-center`} href={route('profile')}>
                                                                    <div>
                                                                    <svg className="mx-auto" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_9431_21773)">
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.81736 0.0665255C7.4372 0.175932 7.01757 0.397229 6.71926 0.645666C6.40478 0.90751 6.03625 1.4207 5.92211 1.75562L5.84945 1.9689L5.27964 1.96918C4.96623 1.96932 4.63281 1.99084 4.53864 2.01695C4.3255 2.0762 4.04575 2.37704 4.00581 2.59009C3.9895 2.67699 3.98303 3.17921 3.99142 3.70613L4.0067 4.66421L4.15117 4.96904C4.32817 5.34254 4.64621 5.66935 5.00336 5.84467L5.27232 5.97671H8.48326H11.6942L11.9622 5.85109C12.4906 5.60345 12.8772 5.11126 12.9826 4.55237C13.0543 4.17174 13.0399 2.73442 12.9622 2.51659C12.81 2.08979 12.6171 1.99918 11.7971 1.96913L11.15 1.94546L11.0449 1.68653C10.7657 0.998447 10.1245 0.392494 9.40778 0.139182C9.03948 0.00905678 8.15711 -0.0313026 7.81736 0.0665255ZM2.06139 3.07435C1.29901 3.27545 0.620449 3.82721 0.279012 4.52359C-0.0188322 5.13099 -0.00392597 4.70949 0.0098084 12.1215L0.022324 18.8673L0.131683 19.159C0.423152 19.9367 1.06332 20.5767 1.84 20.8671L2.1317 20.9761L6.14214 20.9894L10.1525 21.0026L10.2388 20.4741C10.4497 19.1822 10.6045 18.8519 11.377 18.0456L11.9131 17.486L7.70209 17.4736L3.49107 17.4611L3.33803 17.3519C3.13412 17.2065 3.02945 16.9937 3.02851 16.7226C3.02762 16.4709 3.1247 16.3061 3.37342 16.1369L3.52839 16.0314H8.47871H13.429L15.2218 14.2382L17.0145 12.445V8.94882C17.0145 5.62056 17.0101 5.43526 16.9219 5.09059C16.7856 4.55757 16.5791 4.20099 16.1728 3.79703C15.6414 3.2687 15.0105 3.00015 14.3007 3.00015H13.9676V3.79473C13.9676 4.72951 13.9285 4.95812 13.682 5.4639C13.3713 6.10135 12.7726 6.62682 12.096 6.85581C11.7916 6.95888 11.7513 6.96024 8.64732 6.97431C5.13479 6.9902 5.13156 6.98996 4.48768 6.66784C4.04954 6.44865 3.55136 5.95632 3.33737 5.53103C3.08471 5.02885 3.03901 4.79354 3.01206 3.85562L2.98745 3.00015L2.65332 3.00324C2.46957 3.00493 2.20318 3.03695 2.06139 3.07435ZM3.43056 9.59396C2.87687 9.86682 2.88971 10.627 3.45282 10.9163C3.52665 10.9542 4.94031 10.9689 8.51532 10.9687C13.3821 10.9686 13.4783 10.9668 13.6282 10.8754C13.8739 10.7256 13.9757 10.5212 13.9562 10.2168C13.9363 9.90493 13.8312 9.74157 13.5661 9.61023C13.3787 9.51737 13.2941 9.51578 8.48017 9.51685C4.06089 9.51779 3.56982 9.52529 3.43056 9.59396ZM20.7074 11.7629C20.5858 11.8104 20.3854 11.9242 20.2621 12.0157C20.1388 12.1072 18.3158 13.9078 16.211 16.0169C13.2465 18.9875 12.373 19.8887 12.3352 20.0158C12.3083 20.106 12.166 20.8677 12.0189 21.7085C11.8348 22.7614 11.7615 23.2898 11.7834 23.4063C11.8448 23.7337 12.168 24.0002 12.5035 24.0002C12.6032 24.0002 13.3835 23.8761 14.2375 23.7244C15.3685 23.5236 15.8324 23.4224 15.9454 23.3519C16.0307 23.2987 17.8114 21.5402 19.9026 19.4441C24.2539 15.0825 23.9754 15.4136 23.9754 14.6017C23.9754 13.8887 23.9032 13.7641 22.9065 12.757C21.9658 11.8065 21.7557 11.6706 21.2333 11.6743C21.0532 11.6755 20.8381 11.7118 20.7074 11.7629ZM3.52928 12.8014C3.3235 12.8615 3.10473 13.0936 3.04511 13.3151C2.94395 13.6908 3.18203 14.1011 3.56031 14.203C3.68218 14.2358 5.34109 14.2477 8.61226 14.2393L13.4828 14.2267L13.6549 14.0954C14.0889 13.7643 14.075 13.2056 13.6244 12.8717C13.4922 12.7737 13.4844 12.7736 8.58531 12.7657C5.67015 12.761 3.61796 12.7755 3.52928 12.8014Z" fill="black" fill-opacity="0.349"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M8.0625 0.0321608C7.14206 0.186239 6.20344 0.956817 5.9287 1.78397L5.85183 2.0154H5.18288C4.56642 2.0154 4.50155 2.02369 4.35713 2.121C4.27092 2.17913 4.15706 2.3004 4.10409 2.39054C4.01456 2.54293 4.008 2.62697 4.01067 3.58571C4.01297 4.42674 4.02778 4.6538 4.09078 4.81669C4.28991 5.33124 4.7287 5.74885 5.23448 5.90508C5.52834 5.99583 5.66367 5.99977 8.47945 5.99977C11.7625 5.99977 11.7674 5.99935 12.2328 5.68219C12.3738 5.58615 12.5693 5.3926 12.6674 5.25207C12.9509 4.84585 12.9844 4.66571 12.9844 3.54615C12.9844 2.58535 12.9817 2.55816 12.8688 2.36546C12.6915 2.06297 12.5453 2.0154 11.7922 2.0154C11.225 2.0154 11.1503 2.00621 11.127 1.93336C11.1126 1.88827 11.0256 1.69411 10.9337 1.50193C10.4497 0.48938 9.1883 -0.156324 8.0625 0.0321608ZM2.07197 3.09455C1.57439 3.22491 1.19545 3.44447 0.820078 3.81985C0.438938 4.20094 0.224063 4.57622 0.0925781 5.09021C0.00253125 5.44229 0 5.63283 0 11.9998C0 18.3667 0.00253125 18.5573 0.0925781 18.9093C0.224063 19.4233 0.438938 19.7986 0.820078 20.1797C1.20117 20.5608 1.57645 20.7757 2.09044 20.9072C2.43652 20.9957 2.62181 20.9998 6.28786 20.9998H10.1232L10.1465 20.8943C10.1592 20.8363 10.2134 20.5357 10.2668 20.2263C10.4542 19.1405 10.6042 18.8394 11.332 18.0885C11.622 17.7892 11.8594 17.5308 11.8594 17.5142C11.8594 17.4977 9.98517 17.4841 7.69444 17.4841H3.5295L3.37453 17.3787C3.15019 17.226 3.0398 17.0547 3.01312 16.8181C2.98252 16.5465 3.12159 16.2671 3.36183 16.1178L3.53906 16.0076L8.48414 15.9959L13.4292 15.9842L15.2239 14.1912L17.0187 12.3982L17.004 8.83571C16.9879 4.90566 17.0041 5.1271 16.6861 4.49719C16.2585 3.64983 15.3915 3.08293 14.418 3.01425L14.0282 2.98674L14.0036 3.87216C13.9829 4.61724 13.9626 4.80586 13.8759 5.06227C13.5641 5.98411 12.8365 6.67566 11.9299 6.91182C11.5178 7.01916 5.50406 7.02005 5.08406 6.9128C4.57355 6.78249 4.2255 6.5776 3.81891 6.168C3.16678 5.5111 3.00178 5.03054 3.0007 3.78493L3 2.99977L2.70703 3.00235C2.54592 3.00375 2.26012 3.04529 2.07197 3.09455ZM3.37453 9.62086C3.15019 9.77354 3.0398 9.94482 3.01312 10.1815C2.98252 10.4531 3.12159 10.7324 3.36183 10.8818L3.53906 10.992L8.40591 11.0045C11.6301 11.0129 13.3331 11.0008 13.4516 10.9689C13.6926 10.904 13.9487 10.6168 13.9915 10.3633C14.0336 10.114 13.8745 9.77269 13.6454 9.62091L13.4861 9.51539H8.50781H3.5295L3.37453 9.62086ZM20.8259 11.7368C20.7173 11.7723 20.5274 11.8594 20.404 11.9303C20.1318 12.0866 12.5047 19.6809 12.4015 19.8984C12.3638 19.9779 12.2053 20.7676 12.0494 21.6534C11.7367 23.4294 11.7347 23.5073 11.996 23.7686C12.268 24.0406 12.3408 24.0398 14.0455 23.7452C14.8927 23.5988 15.6705 23.4487 15.774 23.4116C15.9243 23.3578 16.7434 22.5616 19.8582 19.4416C23.565 15.7287 23.7598 15.5251 23.8636 15.2576C23.9467 15.0434 23.973 14.8814 23.9738 14.5779C23.9747 14.2237 23.9577 14.143 23.8204 13.8513C23.6862 13.5661 23.5606 13.4185 22.8603 12.7223C21.9713 11.8385 21.7911 11.7188 21.3047 11.6893C21.1445 11.6796 20.9384 11.7001 20.8259 11.7368ZM3.44297 12.8157C3.00375 13.007 2.86556 13.6052 3.17545 13.9735C3.41962 14.2637 3.15047 14.2498 8.50819 14.2498C13.2917 14.2498 13.4144 14.2475 13.5909 14.1575C14.1165 13.8893 14.1165 13.1102 13.5909 12.8421C13.4143 12.752 13.2935 12.7498 8.49797 12.7516C4.52002 12.7531 3.55875 12.7653 3.44297 12.8157Z" fill="white" fill-opacity="0.988"/>
</g>
<defs>
<clipPath id="clip0_9431_21773">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>
</svg>
                                                                        {/* <svg
                                                                            className="mx-auto" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                            <path d="M10.2947 0.603774L5.59579 8.25157C5.07789 9.08176 5.68421 10.1635 6.66947 10.1635H16.0547C17.04 10.1635 17.6463 9.08176 17.1284 8.25157L12.4421 0.603774C11.9495 -0.201258 10.7874 -0.201258 10.2947 0.603774Z" fill="white" />
                                                                            <path d="M18.3158 24C21.4551 24 24 21.4658 24 18.3396C24 15.2135 21.4551 12.6792 18.3158 12.6792C15.1765 12.6792 12.6316 15.2135 12.6316 18.3396C12.6316 21.4658 15.1765 24 18.3158 24Z" fill="white" />
                                                                            <path d="M1.26316 23.3711H8.8421C9.53684 23.3711 10.1053 22.805 10.1053 22.1132V14.566C10.1053 13.8742 9.53684 13.3082 8.8421 13.3082H1.26316C0.568421 13.3082 0 13.8742 0 14.566V22.1132C0 22.805 0.568421 23.3711 1.26316 23.3711Z" fill="white" />
                                                                        </svg> */}
                                                                        <p className="fw-bold font-size-12 pt-2">Notes</p>
                                                                    </div>
                                                                </Link>
                                                            </div>

                                                        </div>


                                                        <div className=" rounded-[20px]   mt-[42px]">


                                                            {/* <Link onClick={() => { setOpenMobileMenu(false) }} href={route('live-training.index')}  >
                                            <li onClick={() => {
                                                setOpenMobileMenu(false)
                                            }}
                                                className="new-card-background input-shadow border-rounded-10 py-[2%] uppercase w-full text-center fs-tiny fw-bold ">
                                                live training
                                            </li>
                                        </Link> */}






                                                            <Link onClick={() => { setOpenMobileMenu(false), setScrollToNotes(true) }} href={route('profile')} >
                                                                <li className="mb-[14px] card-bg-discord flex justify-center items-center h-[39px] input-shadow border-rounded-10   uppercase w-full text-center font-size-12 fw-bold">
                                                                    notes
                                                                </li>
                                                            </Link>
                                                            <Link onClick={() => { setOpenMobileMenu(false) }} href={route('profile')} >
                                                                <li className="mb-[14px] card-bg-discord flex justify-center items-center h-[39px]   input-shadow border-rounded-10    mt-3 uppercase w-full text-center font-size-12 fw-bold">
                                                                    favorites
                                                                </li>
                                                            </Link>




                                                            <Link onClick={() => { setOpenMobileMenu(false) }} href={route('profile.personal')}  >
                                                                <li className="mb-[14px] my-3 card-bg-discord flex justify-center items-center h-[39px] input-shadow border-rounded-10 uppercase w-full text-center font-size-12 fw-bold ">
                                                                    SETTINGS
                                                                </li>
                                                            </Link>

                                                            <a onClick={() => { setOpenMobileMenu(false) }}
                                                                href="https://support.capital.club" target="_blank">
                                                                <li className="bg-white text-black border-rounded-10 mt-20 flex justify-center items-center h-[39px] uppercase w-full text-center font-size-12 fw-bold ">
                                                                    <p className="flex justify-center font-size-12 fw-bold" >    SUPPORT <svg className="m-1" width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path d="M11.6667 6.12833C11.6667 2.92583 9.18174 0.75 6.41674 0.75C3.6809 0.75 1.16674 2.87917 1.16674 6.16333C0.816738 6.36167 0.583405 6.735 0.583405 7.16667V8.33333C0.583405 8.975 1.1084 9.5 1.75007 9.5H2.3334V5.94167C2.3334 3.68417 4.15924 1.85833 6.41674 1.85833C8.67424 1.85833 10.5001 3.68417 10.5001 5.94167V10.0833H5.8334V11.25H10.5001C11.1417 11.25 11.6667 10.725 11.6667 10.0833V9.37167C12.0109 9.19083 12.2501 8.835 12.2501 8.415V7.07333C12.2501 6.665 12.0109 6.30917 11.6667 6.12833Z" fill="black" />
                                                                        <path d="M4.66674 7.16667C4.9889 7.16667 5.25007 6.9055 5.25007 6.58333C5.25007 6.26117 4.9889 6 4.66674 6C4.34457 6 4.0834 6.26117 4.0834 6.58333C4.0834 6.9055 4.34457 7.16667 4.66674 7.16667Z" fill="black" />
                                                                        <path d="M8.16674 7.16667C8.4889 7.16667 8.75007 6.9055 8.75007 6.58333C8.75007 6.26117 8.4889 6 8.16674 6C7.84457 6 7.5834 6.26117 7.5834 6.58333C7.5834 6.9055 7.84457 7.16667 8.16674 7.16667Z" fill="black" />
                                                                        <path d="M9.91674 5.43417C9.63674 3.77167 8.19007 2.5 6.4459 2.5C4.6784 2.5 2.77674 3.96417 2.9284 6.2625C4.36924 5.67333 5.45424 4.39 5.7634 2.82667C6.52757 4.36083 8.09674 5.41667 9.91674 5.43417Z" fill="black" />
                                                                    </svg>
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
                        </div>

                    </div>
                </nav>

            </div>
        </>
    );
};

export default Navbar;
