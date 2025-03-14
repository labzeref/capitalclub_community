import React, { useEffect, useState, useRef } from "react";
import logo from "../../../assets/svg/logo.svg";
import lander from "../../../assets/svg/glitch.svg";
import Button from "@/Components/Button";
import { ReactComponent as WELCOMEARROW } from "../../../assets/svg/WELCOMEARROW.svg";
import { Link, usePage } from "@inertiajs/react";
// import VIPACCESS from '../../../assets/VIPACCESS.json';
import { Player, Controls } from '@lottiefiles/react-lottie-player';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { motion } from 'framer-motion';
import IconButton from "@/Components/IconButton";
import CountUp from 'react-countup';

import preimg from '../../../assets/img/pre-img.png';

import WELCOME_1 from '../../Components/WELCOME_V2.json'

import WELCOME_2 from '../../Components/CheckMark.json'
import { Inertia } from "@inertiajs/inertia";


const GlitchId = ({ videoAsset }) => {

    // console.log(WELCOME_2)
    useEffect(() => {
        AOS.init();
    }, [])
    const { auth } = usePage().props;

    const [showId, setShowId] = useState(false)


    const formatValue = (value) => {
        const digits = value.toString().length;
        const zerosToAdd = 4 - digits;
        return '0'.repeat(zerosToAdd) + value;
    };


    useEffect(() => {
        setTimeout(() => {
            setShowId(true)
        }, 50);

    }, [])

    const [hideGlitchPage, setHideGlitchPage] = useState(false);





    const [animationCompleted, setAnimationCompleted] = useState(false);

    const handleAnimationComplete = () => {
        if (!animationCompleted) {
            setAnimationCompleted(true);
            // Perform any actions you want to do once the animation completes
        }
    };


    const [animationStarted, setAnimationStarted] = useState(false);

    useEffect(() => {
        const animationTimeout = setTimeout(() => {
            setAnimationStarted(true);
        }, 50);

        return () => clearTimeout(animationTimeout);
    }, []);



    const [nextjoinButtonDelay, setNextButtonDelay] = useState(false)

    // useEffect(() => {
    //     setTimeout(() => {
    //         setNextButtonDelay(true)
    //     }, 1000);
    // }, [])



    const videoRef = useRef(null);
    const playVideo = () => {
        if (videoRef.current) {
            var videoStartFrom = localStorage.getItem("welcomeVideoTime")
            videoRef.current.currentTime = videoStartFrom;
            videoRef.current.play();
        }
    };



    // ********* SHORT VIDEO  **********


    const [hidePlayIcon, setHidePlayIcon] = useState(true);



    const [buttonDelay, setButtonDelay] = useState(false)



    // const routeToPreferences = () => {





    //   setTimeout(() => {
    //     Inertia.visit(route('preference.top-interest'), {
    //       method: 'get',
    //     });
    //     setButtonDelay(true)
    //   }, 381000);
    // }


    const [videoProgress, setVideoProgress] = useState(0)





    const [RoutTime, setRoutTime] = useState(0)

    const routTimeRef = useRef(0)

    useEffect(() => {
        if (RoutTime > 300) {
            localStorage.removeItem("welcomeVideoTime")
        }
        if (RoutTime > 377) {
            // localStorage.setItem("watched", 'watched');
            Inertia.visit(route('preference.index'), {
                method: 'get',
            });
        }
    }, [RoutTime])

    const startTrackingProgress = () => {
        const videoElement = videoRef.current;

        const updateTimeProgress = () => {
            const currentTime = videoElement.currentTime;
            const duration = videoElement.duration;
            const progress = (currentTime / duration) * 100;
            setVideoProgress((currentTime / duration) * 100)


            routTimeRef.current = currentTime;

            setRoutTime(currentTime)

            // console.log(`Current Time: ${currentTime}`);
            localStorage.setItem("welcomeVideoTime", currentTime)

            // console.log(`Current Time: ${currentTime}`);
            // console.log(`Duration: ${duration}`);
            // console.log(`Progress: ${progress}%`);
        };

        videoElement.addEventListener('timeupdate', updateTimeProgress);

        return () => {
            videoElement.removeEventListener('timeupdate', updateTimeProgress);
        };
    };






    const [isPause, setIsPause] = useState()
    const isPlaying = useRef(true);

    const togglePlayPause = () => {
        if (videoRef.current) {
            if (isPlaying.current) {
                videoRef.current.pause();
                setIsPause(true)
                isPlaying.current = false;
            } else {
                videoRef.current.play();
                setIsPause(false)
                isPlaying.current = true;

            }
        }
    };

    const [orientation, setOrientation] = useState(
        window.matchMedia('(orientation: portrait)').matches ? 'portrait':'landscape');

      useEffect(() => {
        const handleOrientationChange = () => {
          setOrientation(
            window.matchMedia('(orientation: portrait)').matches
              ? 'portrait' : 'landscape' );};

        // Add an event listener for changes in orientation
        window.addEventListener('resize', handleOrientationChange);

        // Clean up the event listener when the component unmounts
        return () => {
          window.removeEventListener('resize', handleOrientationChange);
        };
      }, []);

      const handleContextMenu = (e) => {
        e.preventDefault();
      };

    return (
        <div onContextMenu={handleContextMenu}>

            {/* ***********GLITCH ID ********** */}

            <div  className={` ${hideGlitchPage && 'hidden'} flex flex-col h-[100vh] fixed w-full`} style={{ maxHeight: '-webkit-fill-available', justifyContent: 'space-between', overflowY: 'hidden' }}>
                <div className={` relative flex flex-col items-center justify-between  w-full  glitch-id-container`}>



                    {/* {nextjoinButtonDelay && */}
                     <div className={` ${nextjoinButtonDelay && 'glitch-id-page-fade-in'} glitch-id-page-fade-in  z-70   prefrerence-layout-mt  w-full flex justify-center`}>
                        <Link href={route('welcome')}>     <img
                            className={` ${orientation=='landscape' ? 'onboarding-logo-landscap' : 'onboarding-logo' }   `}
                            src={logo}
                            alt=""
                        />
                        </Link>
                    </div>
                    {/* } */}


                    <div className="glitch-id-center">
                        <div className="glitch-id-div">
                            {animationStarted &&
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.2 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 1 }}
                                >

                                    <h1 className="text-[#FFFFFF] text-center text-[15px] leading-6 font-semibold   uppercase">
                                        YOU ARE NOW
                                    </h1>
                                    <div className="text-[#FFFFFF] text-[35px] md:text-[45px] uppercase font-bold  text-center h-[35px] md:h-[45px]">
                                        <p className={`text-[#FFFFFF] ${orientation=='landscape' ? 'text-[28px]' : 'text-[35px]' }  md:text-[45px] uppercase font-bold  text-center `}>Glitch</p>
                                    </div>
                                    <div className={`text-[#FFFFFF] ${orientation=='landscape' ? 'text-[28px]' : 'text-[35px]' }  md:text-[45px] uppercase font-bold  text-center `}>
                                        {showId &&
                                            <div className={'flex justify-center mx-[10px]'}>
                                                <svg className={` ${orientation=='landscape' ? 'w-[20px] h-[20px] mt-[8px]' : 'w-[23px] h-[23px]' }   md:w-[31px] md:h-[31px] lg:w-[31px] lg:h-[31px] mt-[10px] md:mt-[13px] lg:mt-[14px] `}  viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M12.3089 0.161621H16.7522V19.8788H12.3089V0.161621Z" fill="white"/>
                                                    <path d="M3.42232 0.161621H7.86563V19.8788H3.42232V0.161621Z" fill="white"/>
                                                    <path d="M19.807 11.8253V15.4355L0.0898438 15.4355L0.0898439 11.8253L19.807 11.8253Z" fill="white"/>
                                                    <path d="M19.807 4.04951V7.6597L0.0898438 7.6597L0.0898439 4.04951L19.807 4.04951Z" fill="white"/>
                                                </svg>
                                                {auth?.user.id.toString().padStart(4, '0')}
                                            </div>
                                        }
                                    </div>

                                </motion.div>
                            }
                        </div>
                    </div>

                    {/* {nextjoinButtonDelay && */}
                    <div className={` ${nextjoinButtonDelay && 'glitch-id-page-fade-in'} glitch-id-page-fade-in`}>

                        <div className=" w-full ">
                            <div className="container mx-auto  ">
                                <Link href={route('preference.index')} className="flex justify-center mb-[5vh] md:mb-[9vh] cursor-pointer ">


                                    <svg
                                        className={" mb-[5vh] md:mb-[9vh] cursor-pointer w-[28px] md:w-[34px] "}
                                        // onClick={() => { playVideo() }}
                                        viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="14" cy="14" r="14" fill="white" />
                                        <path d="M7 13.75H21.5" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M14.25 6.5L21.5 13.75L14.25 21" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>

                                </Link>
                            </div> </div> </div>

                    {/* } */}

                </div>

            </div>

            {/* ************WECLOME VIDEO ************ */}


            {/* ************removed************** */}
            <div className={` ${!hideGlitchPage && 'hidden'}  hidden `}>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    <div style={{ width: '100vw', height: '100vh', position: 'relative', maxHeight: '-webkit-fill-available' }}>
                        <div className=" absolute w-full z-[999999] mt-5 flex justify-center">
                            <div className='w-full absolute  z-70 flex justify-center'>
                                <Link href={route('welcome')}>     <img
                                    className="max-h-[30px] lg:max-h-[40px]"
                                    src={logo}
                                    alt=""
                                />
                                </Link>
                            </div>
                        </div>
                        <div style={{ width: '100vw', height: '100vh', position: 'fixed', maxHeight: '-webkit-fill-available' }}>

                            {buttonDelay ?
                                <div className='absolute z-[9999] bottom-[14%] md:bottom-[16%] flex justify-center w-full '>
                                    <Link href={route('preference.top-interest')} className='absolute z-[9999]    flex justify-center w-full '>
                                        <IconButton

                                            icon={<WELCOMEARROW />}
                                            className={"primary icon   uppercase"}
                                        >
                                        </IconButton>
                                    </Link>
                                </div>
                                :
                                <div className='absolute z-[9999] bottom-[7%] md:bottom-[12%] flex justify-center w-full'>
                                    <div className="max-w-[404px] w-[80%] mx-auto bg-[#333333] rounded-full h-[21px] overflow-hidden ">
                                        <div className="bg-[#fff] h-[21px] rounded-full" style={{ width: `${videoProgress}%` }}></div>
                                    </div>
                                </div>
                            }
                            <video
                                ref={videoRef}
                                preload='auto'
                                playsInline
                                loop={false}
                                defaultmuted={'true'}
                                className=' background-video video tag intro'
                                style={{ width: '100%', height: '100%', maxHeight: '-webkit-fill-available', objectFit: 'cover' }}

                            >

                                <source src={videoAsset?.welcome} type="video/mp4" />
                            </video>
                        </div>
                    </div>
                    {/* <div className="bg-white h-[10px] md:h-[20px]  mt-3 fixed bottom-0 z-[9999] w-[15%] "></div> */}
                </motion.div>
            </div>
            {/* ************removed************** */}










            <div className={`${hideGlitchPage ? 'button-fade-in  static -z-70' : 'visibility-0 static -z-70'} `} >
                {/*  ********* intro video ***********8  */}
                <div className=" absolute w-full z-[9]    flex justify-center">
                    <div className='w-fit fixed  left-[1rem] top-[1rem] md:left-[2rem] md:top-[2rem]  z-70 flex justify-start'>

                        <svg width="35" height="33" viewBox="0 0 35 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.9997 0C7.62579 0 0 7.40814 0 16.5145C0 23.6975 4.74651 29.821 11.3516 32.0882C12.1009 32.3454 12.8734 32.5544 13.667 32.7081C13.6822 32.7113 13.6981 32.7132 13.714 32.7164C14.4692 32.8605 15.2417 32.9569 16.0293 33V5.11323C15.4641 5.11323 14.4586 5.27462 13.714 5.48425C13.6981 5.48875 13.6829 5.49261 13.667 5.49711C12.8562 5.72923 12.0804 6.04045 11.3516 6.42754C8.69675 7.83574 6.65676 10.2046 5.72811 13.0493C5.48784 13.7855 5.23499 14.6382 5.23764 15.3442H11.5661V13.0493H8.23938C8.89598 11.4887 9.97952 10.1409 11.3516 9.1462C12.0546 8.63629 12.833 8.2209 13.667 7.91483V30.3585C12.8687 30.1772 12.0943 29.9354 11.3516 29.6325C6.07627 27.481 2.36167 22.4122 2.36167 16.5151C2.36167 8.67423 8.92775 2.29491 16.9997 2.29491C25.0716 2.29491 31.6377 8.67423 31.6377 16.5151C31.6377 22.344 28.0071 27.3627 22.8284 29.556C22.0818 29.8724 21.3027 30.129 20.4978 30.3219V7.97785C21.3411 8.30514 22.1241 8.74689 22.8284 9.28316C24.1138 10.2631 25.1331 11.5581 25.76 13.0493H22.6139V15.3442H28.7604C28.7624 14.6568 28.532 13.7039 28.2917 12.9683C27.3843 10.1885 25.3946 7.94762 22.8291 6.5285C22.097 6.1234 21.3173 5.78968 20.4985 5.54276C20.4879 5.53954 20.4773 5.53697 20.4667 5.53376C19.7188 5.31063 18.6776 5.11194 18.1362 5.11259V32.9878C18.9285 32.937 19.7075 32.836 20.4667 32.6824C20.4773 32.6804 20.4879 32.6772 20.4985 32.6753C21.2967 32.5126 22.0758 32.2965 22.8291 32.0284C29.3409 29.7123 34 23.632 34 16.5145C33.9993 7.40814 26.3735 0 16.9997 0Z" fill="white" />
                            <path d="M22.6143 23.7456V26.5009C25.5478 25.1924 27.4773 22.6217 28.347 19.7339C28.5687 18.9964 28.7574 18.1096 28.7607 17.4338L26.4129 17.4396H22.6143V19.7345H25.8609C25.3982 21.3003 24.1241 22.7921 22.6143 23.7469V23.7456Z" fill="white" />
                            <path d="M11.5663 17.4392H7.58689L5.23779 17.4353C5.26493 18.2043 5.43107 18.9965 5.65281 19.7334C6.54241 22.6874 8.54864 25.1277 11.5663 26.6021V23.8834C9.64872 22.6752 8.78229 21.3988 8.13892 19.7341H11.5663V17.4392Z" fill="white" />
                        </svg>
                    </div>
                </div>


                <div className=" fixed w-full z-[999999]    flex justify-center">
                    <div onClick={togglePlayPause} className='w-fit absolute  right-[1rem] top-[1rem] md:right-[2rem] md:top-[2rem]  z-70 flex justify-end'>
                        {isPause ?
                            <svg width="35" height="33" viewBox="0 0 35 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.0833 0C7.65333 0 0 7.39123 0 16.4983C0 25.6053 7.65333 32.9966 17.0833 32.9966C26.5133 32.9966 34.1667 25.6053 34.1667 16.4983C34.1667 7.39123 26.5133 0 17.0833 0ZM13.6667 23.9225V9.07406L23.9167 16.4983L13.6667 23.9225Z" fill="white" />
                            </svg>

                            :
                            <svg width="35" height="33" viewBox="0 0 35 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M34 16.5C34 25.6127 26.3888 33 17 33C7.61116 33 0 25.6127 0 16.5C0 7.3873 7.61116 0 17 0C26.3888 0 34 7.3873 34 16.5ZM14.577 10.1536C14.577 9.32514 13.9054 8.65356 13.077 8.65356C12.2486 8.65356 11.577 9.32514 11.577 10.1536V22.8459C11.577 23.6743 12.2486 24.3459 13.077 24.3459C13.9054 24.3459 14.577 23.6743 14.577 22.8459V10.1536ZM22.4232 10.1536C22.4232 9.32514 21.7516 8.65356 20.9232 8.65356C20.0947 8.65356 19.4232 9.32514 19.4232 10.1536V22.8459C19.4232 23.6743 20.0947 24.3459 20.9232 24.3459C21.7516 24.3459 22.4232 23.6743 22.4232 22.8459V10.1536Z" fill="white" />
                            </svg>
                        }


                    </div>
                </div>

                <div className='relative' style={{ width: '100vw', height: '100vh', position: 'fixed', maxHeight: '-webkit-fill-available' }}>
                    {buttonDelay ?
                        <div className='absolute z-[9999] bottom-[14%] md:bottom-[16%] flex justify-center w-full '>
                            <IconButton

                                icon={<WELCOMEARROW />}
                                className={"primary icon   uppercase"}
                            >
                            </IconButton>
                        </div>
                        :
                        <div className={` ${orientation == 'landscape' ? 'video-progress-landscap' : 'bottom-[10vh] '}  absolute z-[9999] flex justify-center w-full `}>
                        <div className={` ${orientation == 'landscape' ? 'video-progress-landscap-h' : 'h-[21px]'}  horizantal-progress-w mx-auto bg-[#333333] rounded-full overflow-hidden `}>
                            <div className={`bg-[#fff] ${orientation == 'landscape' ? 'video-progress-landscap-h' : 'h-[21px]'} rounded-full`} style={{ width: `${videoProgress}%` }}></div>
                        </div>
                    </div>
                        // <div className='absolute z-[99] bottom-[10vh] flex justify-center w-full'>
                        //     <div className=" horizantal-progress-w mx-auto bg-[#333333] rounded-full h-[21px] overflow-hidden">
                        //         <div className="bg-[#fff] h-[21px] rounded-full" style={{ width: `${videoProgress}%` }}></div>
                        //     </div>
                        // </div>

                    }
                    <video
                        ref={videoRef}
                        preload='auto'
                        playsInline
                        loop={false}
                        defaultmuted={'true'}
                        className=' background-video video tag intro'
                        style={{ width: '100%', height: '100%', maxHeight: '-webkit-fill-available', objectFit: 'cover' }}

                        poster={preimg}
                    >
                        {/* <source src={preimg} type="image/png" /> */}
                        <source src={videoAsset?.welcome} type="video/mp4" />
                    </video>
                </div>
            </div>


























        </div>
    );
};
export default GlitchId;
