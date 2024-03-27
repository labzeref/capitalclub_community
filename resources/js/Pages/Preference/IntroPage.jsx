import React, { useState } from 'react';
import preimg from '../../../assets/img/pre-img.png';


import fp from '../../../assets/Fingerprint.svg';

import CLICKHERE from '../../Components/CLICKHERE.json';

import BecomeAMember from '../../Components/BecomeAMember_Final.json';

import logo from "../../../assets/svg/logo.svg";
import { Link, useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Lottie from 'react-lottie-player'
import { useRef } from 'react';
import { Inertia } from '@inertiajs/inertia';
const IntroPage = ({ hideButton, videoAsset }) => {
    useEffect(() => {
        AOS.init();
    }, [])
    const [muted, setMuted] = useState(true);
    const [mutedVideo2, setMutedVideo2] = useState(true);

    const toggleMute = () => {
        setMuted(!muted);
    };

    // const unmuteVideo2 = () => {
    //     setMuted(true)
    // };


    const [showVideo2, setShowVideo2] = useState(true)
    // const [showGlitchDelay, setShowGlitchDelay] = useState(false)
    const [hideGlitch, setHideGlitch] = useState(false)

    const playIntroVideo = () => {

        setTimeout(() => {
            setHideGlitch(true)
        }, 1500);

    }


    const isWatched = () => {
        localStorage.setItem("watched", 'watched');
    }

    const isWatch = localStorage.getItem("watched");


    const { get } = useForm();


    const videoRef = useRef(null);


    const [videoPlaying, setVideoPlaying] = useState(false)


    const playVideo = () => {
        if (isWatch == 'watched') {
            get(route('register'));
        } else {
            // routeToRegister()
            setShowVideo2(false)
            playIntroVideo()
            if (videoRef.current) {
                setVideoPlaying(true)
                setIsPause(false)
                var videoStartFrom = localStorage.getItem("videoTime")
                videoRef.current.currentTime = videoStartFrom;
                videoRef.current.play();
            }
        }
    };


    const video_Ref_2 = useRef(null);
    const delay_video_Ref = useRef(null);

    useEffect(() => {
        if (video_Ref_2.current) {
            video_Ref_2.current.play().catch(error => {
                console.error("Autoplay error:", error);
            });
        }

    }, []);


    useEffect(() => {
        if (!showVideo2) {

            if (videoRef.current) {
                videoRef.current.play().catch(error => {
                    // Autoplay may be blocked by the browser, handle the error here.
                    console.error("Autoplay error:", error);
                });
            }
        }
    }, [showVideo2]);

    const [joinButtonDelay, setJoinButtonDelay] = useState(false)

    const innerHeight = window.innerHeight;
    const [blinkJoinButtonDelay, setBlinkJoinButtonDelay] = useState(false)
    // const [blinkBecomeAMember , setBlinkBecomeAMember] = useState(false)

    const delayButton = () => {
        setTimeout(() => {
            setJoinButtonDelay(true)
            setBlinkJoinButtonDelay(true)
        }, 35000);
    }

    const showJoinButton = () => {
        setBlinkJoinButtonDelay(true)
    }


    useEffect(() => {
        let timeoutId;

        if (innerHeight < 450) {
            timeoutId = setTimeout(() => {
                setBlinkJoinButtonDelay(false);
            }, 3000);
        }
        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [blinkJoinButtonDelay]);


    // useEffect(() => {

    //     if (delay_video_Ref.current) {
    //         delay_video_Ref.current.play().catch(error => {
    //             console.error("Autoplay error:", error);
    //         });
    //     }
    // }, [showGlitchDelay]);

    const [RoutTime, setRoutTime] = useState(0)


    const [progress, setProgress] = useState(0);
    const [videoLoaded, setVideoLoaded] = useState(false)



    const startProgress = () => {
        if (videoPlaying && videoLoaded) {


            isPlaying.current = setTimeout(() => {
                delayButton()
                animateProgress();
            }, 1000);
        }
    };


    useEffect(() => {
        startProgress()
    }, [videoPlaying, videoLoaded])





    useEffect(() => {
        const handleVideoLoaded = () => {
            // This function will be called when the video is loaded and ready to play
            setVideoLoaded(true)
            // console.log('Video is loaded and ready to play');
        };

        if (videoRef.current) {
            // Add event listener to the video element
            videoRef.current.addEventListener('loadeddata', handleVideoLoaded);
        }

        // Clean up the event listener when the component unmounts
        return () => {
            if (videoRef.current) {
                videoRef.current.removeEventListener('loadeddata', handleVideoLoaded);
            }
        };
    }, []);


 


    const routTimeRef = useRef(0)


    useEffect(() => {
        if (RoutTime > 392) {
            localStorage.setItem("watched", 'watched');
            Inertia.visit(route('register'), {
                method: 'get',
            });
        }
    }, [RoutTime])

    useEffect(() => {
        const videoElement = videoRef.current;

        const updateTimeProgress = () => {
            const currentTime = videoElement.currentTime;
            const duration = videoElement.duration;
            const progress = (currentTime / duration) * 100;


            routTimeRef.current = currentTime;

            setRoutTime(currentTime)

            // console.log(`Current Time: ${currentTime}`);
            localStorage.setItem("videoTime", currentTime)
            // console.log(`Duration: ${duration}`);
            // console.log(`Progress: ${progress}%`);
        };

        videoElement.addEventListener('timeupdate', updateTimeProgress);

        return () => {
            videoElement.removeEventListener('timeupdate', updateTimeProgress);
        };
    }, []);





    const totalDuration = 35000; // 35 seconds in milliseconds
    const isPlaying = useRef(true);
    const progressPlay = useRef();
    const startTime = useRef(0);

    let start = null;



    function animateProgress() {
        // console.log(startTime.current)
        startTime.current = startTime.current + 50;
        const elapsedTime = startTime.current;

        const currentProgress = Math.min((elapsedTime / totalDuration) * 100, 100);
        setProgress(currentProgress);

        progressPlay.current = setTimeout(() => {
            animateProgress();
        }, 50);
    }

    const [isPause, setIsPause] = useState()


    const togglePlayPause = () => {
        if (videoRef.current) {
            if (isPlaying.current) {
                videoRef.current.pause();
                setIsPause(true)
                isPlaying.current = false;
                clearTimeout(progressPlay.current);
            } else {
                videoRef.current.play();
                setIsPause(false)
                isPlaying.current = true;
                progressPlay.current = setTimeout(() => {
                    animateProgress();
                }, 50);
            }
        }
    };



    // const routeToRegister = () => {
    //     setTimeout(() => {
    //         Inertia.visit(route('register'), {
    //             method: 'get',
    //         });
    //     }, 492000);
    // }

    const reWatchFunction = () => {
        localStorage.setItem("watched", 'notWatched');
        setTimeout(() => {
            // routeToRegister();
            setShowVideo2(false);
            playIntroVideo();
            if (videoRef.current) {
                setIsPause(false);
                var videoStartFrom = localStorage.getItem("videoTime")
                videoRef.current.currentTime = 0;
                videoRef.current.play();
            }
            setVideoPlaying(true)
            startProgress();
            delayButton();
        }, 300);
    }



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



    const handleContextMenu = (e) => {
        e.preventDefault(); 
      };

    return (
        <>
            {/* glitch video for desktop  */}
            <div onContextMenu={handleContextMenu}>


                <div className={` ${hideGlitch && 'opacity-0'} `} style={{ width: '100vw', height: '100vh', maxHeight: '-webkit-fill-available', position: 'fixed', transition: 'opacity 0.3s ease-in-out' }}>


                    {isWatch == 'watched' && <button onClick={() => { reWatchFunction() }} className='z-[9999] uppercase re-watch-video w-[80%] md:w-[40%] px-[3%] h-[24px] md:h-[34px]    bg-white text-black font-bold  rounded-full'>
                        re-watch video
                    </button>
                    }

                    <div style={{ transform: 'translateY(-50%)' }} className='absolute z-[999] top-[50%]  flex justify-center w-full '>
                        <div className='cursor-pointer' onClick={() => {  playVideo() }}>

                            <Lottie
                                loop
                                animationData={CLICKHERE}
                                play
                                className='click-here-btn'
                            // style={{ width: 'auto', height: 'auto' }}
                            />
                        </div>
                    </div>
                    <video
                        ref={video_Ref_2}
                        src={videoAsset.glitch}
                        preload='auto'
                        playsInline
                        loop={true}
                        muted={true}
                        defaultmuted={'true'}
                        className=' background-video video tag'
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}

                    >
                    </video>
                    <button className=' hidden absolute top-2 right-2' onClick={toggleMute}>
                        {muted ?
                            <>
                                <svg
                                    width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path opacity="0.2" d="M7.5 15.75H3C2.80109 15.75 2.61032 15.671 2.46967 15.5303C2.32902 15.3897 2.25 15.1989 2.25 15V9C2.25 8.80109 2.32902 8.61032 2.46967 8.46967C2.61032 8.32902 2.80109 8.25 3 8.25H7.5V15.75Z" fill="#FAFAFA" />
                                    <path d="M7.5 15.75H3C2.80109 15.75 2.61032 15.671 2.46967 15.5303C2.32902 15.3897 2.25 15.1989 2.25 15V9C2.25 8.80109 2.32902 8.61032 2.46967 8.46967C2.61032 8.32902 2.80109 8.25 3 8.25H7.5L14.25 3V21L7.5 15.75Z" stroke="#E0E0E0" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M22.5 9.75L18 14.25" stroke="#E0E0E0" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M22.5 14.25L18 9.75" stroke="#E0E0E0" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M7.49707 8.25V15.75" stroke="#E0E0E0" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </>
                            : <>
                                <svg
                                    width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path opacity="0.2" d="M7.5 8.25V15.75H3C2.80109 15.75 2.61032 15.671 2.46967 15.5303C2.32902 15.3897 2.25 15.1989 2.25 15V9C2.25 8.80109 2.32902 8.61032 2.46967 8.46967C2.61032 8.32902 2.80109 8.25 3 8.25H7.5Z" fill="#FAFAFA" />
                                    <path d="M14.5791 2.32579C14.4529 2.26433 14.3121 2.23948 14.1726 2.25406C14.033 2.26865 13.9004 2.32208 13.7897 2.40829L7.24219 7.49985H3C2.60218 7.49985 2.22064 7.65788 1.93934 7.93919C1.65804 8.22049 1.5 8.60202 1.5 8.99985V14.9998C1.5 15.3977 1.65804 15.7792 1.93934 16.0605C2.22064 16.3418 2.60218 16.4998 3 16.4998H7.24219L13.7897 21.5914C13.9005 21.6775 14.0332 21.7309 14.1728 21.7453C14.3124 21.7597 14.4533 21.7347 14.5793 21.6731C14.7054 21.6115 14.8117 21.5157 14.8861 21.3967C14.9604 21.2777 14.9999 21.1402 15 20.9998V2.99985C15 2.85934 14.9606 2.72166 14.8861 2.60248C14.8117 2.48331 14.7053 2.38743 14.5791 2.32579ZM3 8.99985H6.75V14.9998H3V8.99985ZM13.5 19.4661L8.25 15.3833V8.61641L13.5 4.5336V19.4661ZM18.5625 9.5211C19.1657 10.2059 19.4986 11.0872 19.4986 11.9998C19.4986 12.9125 19.1657 13.7938 18.5625 14.4786C18.43 14.6242 18.2456 14.7119 18.049 14.7227C17.8524 14.7335 17.6595 14.6666 17.5118 14.5364C17.3642 14.4062 17.2736 14.2231 17.2597 14.0268C17.2458 13.8304 17.3097 13.6364 17.4375 13.4867C17.7992 13.0759 17.9988 12.5473 17.9988 11.9998C17.9988 11.4524 17.7992 10.9238 17.4375 10.513C17.3097 10.3633 17.2458 10.1693 17.2597 9.97293C17.2736 9.77656 17.3642 9.59353 17.5118 9.46333C17.6595 9.33314 17.8524 9.26623 18.049 9.27703C18.2456 9.28784 18.43 9.3755 18.5625 9.5211ZM23.25 11.9998C23.2511 13.845 22.5711 15.6257 21.3403 17.0005C21.2067 17.145 21.0216 17.2313 20.825 17.2406C20.6284 17.2499 20.436 17.1815 20.2893 17.0503C20.1426 16.919 20.0535 16.7353 20.041 16.5388C20.0286 16.3424 20.0939 16.1489 20.2228 16.0002C21.2066 14.9001 21.7505 13.4761 21.7505 12.0003C21.7505 10.5245 21.2066 9.1005 20.2228 8.00047C20.1553 7.9274 20.103 7.84163 20.0689 7.74814C20.0349 7.65466 20.0197 7.55533 20.0245 7.45595C20.0292 7.35657 20.0536 7.25911 20.0963 7.16926C20.1391 7.07942 20.1993 6.99897 20.2734 6.93261C20.3475 6.86625 20.4341 6.81531 20.5281 6.78274C20.6222 6.75018 20.7217 6.73664 20.821 6.74293C20.9203 6.74922 21.0173 6.7752 21.1065 6.81936C21.1957 6.86352 21.2751 6.92498 21.3403 7.00016C22.5714 8.37436 23.2515 10.1549 23.25 11.9998Z" fill="#E0E0E0" />
                                </svg>
                            </>}
                    </button>
                </div>

                <div className={`${hideGlitch ? 'button-fade-in  static -z-70' : 'visibility-0 static -z-70'} `} >
                    {/*  ********* intro video ***********8  */}
                    <div className=" absolute w-full z-[999999]    flex justify-center">
                        <div className='w-fit fixed  left-[1rem] top-[1rem] md:left-[2rem] md:top-[2rem]  z-70 flex justify-start'>
                            {/* <Link href={route('welcome')}> */}
                            {/*<svg className='w-6 h-6 md:w-10 md:h-10 ' width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">*/}
                            {/*    <path d="M20.4996 0C9.19581 0 0 9.06026 0 20.1974C0 28.9825 5.72373 36.4715 13.6888 39.2444C14.5923 39.5589 15.5238 39.8145 16.4808 40.0025C16.4991 40.0064 16.5183 40.0087 16.5374 40.0127C17.4482 40.1888 18.3796 40.3068 19.3295 40.3595V6.25355C18.6478 6.25355 17.4354 6.45094 16.5374 6.70731C16.5183 6.71282 16.4999 6.71754 16.4808 6.72304C15.503 7.00694 14.5675 7.38756 13.6888 7.86098C10.4873 9.58323 8.02728 12.4804 6.90743 15.9595C6.61769 16.8599 6.31279 17.9027 6.31598 18.7662H13.9474V15.9595H9.93572C10.7275 14.0508 12.0341 12.4025 13.6888 11.1859C14.5364 10.5623 15.4751 10.0543 16.4808 9.67995V37.1289C15.5182 36.9071 14.5843 36.6114 13.6888 36.241C7.32727 33.6097 2.8479 27.4104 2.8479 20.1982C2.8479 10.6087 10.7658 2.80671 20.4996 2.80671C30.2334 2.80671 38.1513 10.6087 38.1513 20.1982C38.1513 27.3271 33.7733 33.465 27.5284 36.1475C26.628 36.5344 25.6886 36.8482 24.718 37.0841V9.75702C25.7348 10.1573 26.6791 10.6976 27.5284 11.3534C29.0784 12.5519 30.3076 14.1358 31.0635 15.9595H27.2697V18.7662H34.6816C34.684 17.9255 34.4063 16.76 34.1165 15.8604C33.0222 12.4607 30.6229 9.72006 27.5292 7.98445C26.6464 7.48901 25.7061 7.08086 24.7188 6.77888C24.706 6.77495 24.6932 6.7718 24.6805 6.76787C23.7785 6.49498 22.523 6.25198 21.8701 6.25277V40.3445C22.8255 40.2824 23.7649 40.159 24.6805 39.971C24.6932 39.9686 24.706 39.9647 24.7188 39.9623C25.6814 39.7634 26.6208 39.4992 27.5292 39.1712C35.3816 36.3386 41 28.9022 41 20.1974C40.9992 9.06026 31.8034 0 20.4996 0Z" fill="white" />*/}
                            {/*    <path d="M27.2695 29.0422V32.412C30.8071 30.8116 33.1337 27.6675 34.1826 24.1358C34.4499 23.2337 34.6774 22.1493 34.6814 21.3228L31.8503 21.3298H27.2695V24.1365H31.1846C30.6267 26.0515 29.0902 27.8759 27.2695 29.0438V29.0422Z" fill="white" />*/}
                            {/*    <path d="M13.9478 21.3275H9.14914L6.31641 21.3228C6.34913 22.2633 6.54947 23.2322 6.81686 24.1334C7.88961 27.7462 10.3089 30.7306 13.9478 32.5339V29.2089C11.6355 27.7312 10.5906 26.1702 9.81482 24.1342H13.9478V21.3275Z" fill="white" />*/}
                            {/*</svg>*/}
                            <svg width="35" height="33" viewBox="0 0 35 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16.9997 0C7.62579 0 0 7.40814 0 16.5145C0 23.6975 4.74651 29.821 11.3516 32.0882C12.1009 32.3454 12.8734 32.5544 13.667 32.7081C13.6822 32.7113 13.6981 32.7132 13.714 32.7164C14.4692 32.8605 15.2417 32.9569 16.0293 33V5.11323C15.4641 5.11323 14.4586 5.27462 13.714 5.48425C13.6981 5.48875 13.6829 5.49261 13.667 5.49711C12.8562 5.72923 12.0804 6.04045 11.3516 6.42754C8.69675 7.83574 6.65676 10.2046 5.72811 13.0493C5.48784 13.7855 5.23499 14.6382 5.23764 15.3442H11.5661V13.0493H8.23938C8.89598 11.4887 9.97952 10.1409 11.3516 9.1462C12.0546 8.63629 12.833 8.2209 13.667 7.91483V30.3585C12.8687 30.1772 12.0943 29.9354 11.3516 29.6325C6.07627 27.481 2.36167 22.4122 2.36167 16.5151C2.36167 8.67423 8.92775 2.29491 16.9997 2.29491C25.0716 2.29491 31.6377 8.67423 31.6377 16.5151C31.6377 22.344 28.0071 27.3627 22.8284 29.556C22.0818 29.8724 21.3027 30.129 20.4978 30.3219V7.97785C21.3411 8.30514 22.1241 8.74689 22.8284 9.28316C24.1138 10.2631 25.1331 11.5581 25.76 13.0493H22.6139V15.3442H28.7604C28.7624 14.6568 28.532 13.7039 28.2917 12.9683C27.3843 10.1885 25.3946 7.94762 22.8291 6.5285C22.097 6.1234 21.3173 5.78968 20.4985 5.54276C20.4879 5.53954 20.4773 5.53697 20.4667 5.53376C19.7188 5.31063 18.6776 5.11194 18.1362 5.11259V32.9878C18.9285 32.937 19.7075 32.836 20.4667 32.6824C20.4773 32.6804 20.4879 32.6772 20.4985 32.6753C21.2967 32.5126 22.0758 32.2965 22.8291 32.0284C29.3409 29.7123 34 23.632 34 16.5145C33.9993 7.40814 26.3735 0 16.9997 0Z" fill="white" />
                                <path d="M22.6143 23.7456V26.5009C25.5478 25.1924 27.4773 22.6217 28.347 19.7339C28.5687 18.9964 28.7574 18.1096 28.7607 17.4338L26.4129 17.4396H22.6143V19.7345H25.8609C25.3982 21.3003 24.1241 22.7921 22.6143 23.7469V23.7456Z" fill="white" />
                                <path d="M11.5663 17.4392H7.58689L5.23779 17.4353C5.26493 18.2043 5.43107 18.9965 5.65281 19.7334C6.54241 22.6874 8.54864 25.1277 11.5663 26.6021V23.8834C9.64872 22.6752 8.78229 21.3988 8.13892 19.7341H11.5663V17.4392Z" fill="white" />
                            </svg>

                            {/* </Link> */}
                        </div>
                    </div>


                    <div className=" fixed w-full z-[999999]    flex justify-center">
                        <div onClick={togglePlayPause} className='w-fit absolute  right-[1rem] top-[1rem] md:right-[2rem] md:top-[2rem]  z-70 flex justify-end'>
                            {isPause ?
                                // <svg className='w-8 h-8 md:w-12 md:h-12 ' width="42" height="42" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                //     <path d="M17.4998 0.299561C8.06984 0.299561 0.416504 7.69079 0.416504 16.7978C0.416504 25.9049 8.06984 33.2961 17.4998 33.2961C26.9298 33.2961 34.5832 25.9049 34.5832 16.7978C34.5832 7.69079 26.9298 0.299561 17.4998 0.299561ZM14.0832 24.2221V9.37362L24.3332 16.7978L14.0832 24.2221Z" fill="white" />
                                // </svg>

                                <svg width="35" height="33" viewBox="0 0 35 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17.0833 0C7.65333 0 0 7.39123 0 16.4983C0 25.6053 7.65333 32.9966 17.0833 32.9966C26.5133 32.9966 34.1667 25.6053 34.1667 16.4983C34.1667 7.39123 26.5133 0 17.0833 0ZM13.6667 23.9225V9.07406L23.9167 16.4983L13.6667 23.9225Z" fill="white" />
                                </svg>

                                :
                                <svg width="35" height="33" viewBox="0 0 35 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M34 16.5C34 25.6127 26.3888 33 17 33C7.61116 33 0 25.6127 0 16.5C0 7.3873 7.61116 0 17 0C26.3888 0 34 7.3873 34 16.5ZM14.577 10.1536C14.577 9.32514 13.9054 8.65356 13.077 8.65356C12.2486 8.65356 11.577 9.32514 11.577 10.1536V22.8459C11.577 23.6743 12.2486 24.3459 13.077 24.3459C13.9054 24.3459 14.577 23.6743 14.577 22.8459V10.1536ZM22.4232 10.1536C22.4232 9.32514 21.7516 8.65356 20.9232 8.65356C20.0947 8.65356 19.4232 9.32514 19.4232 10.1536V22.8459C19.4232 23.6743 20.0947 24.3459 20.9232 24.3459C21.7516 24.3459 22.4232 23.6743 22.4232 22.8459V10.1536Z" fill="white" />
                                </svg>
                                // <svg className='w-8 h-8 md:w-12 md:h-12 ' width="41" height="41" viewBox="0 0 41 41" xmlns="http://www.w3.org/2000/svg">
                                //     <path fillRule="evenodd" clipRule="evenodd" d="M34 17.5C34 26.6127 26.6127 34 17.5 34C8.3873 34 1 26.6127 1 17.5C1 8.3873 8.3873 1 17.5 1C26.6127 1 34 8.3873 34 17.5ZM15.1922 11.1536C15.1922 10.3252 14.5207 9.65363 13.6922 9.65363C12.8638 9.65363 12.1922 10.3252 12.1922 11.1536V23.8459C12.1922 24.6744 12.8638 25.3459 13.6922 25.3459C14.5207 25.3459 15.1922 24.6744 15.1922 23.8459V11.1536ZM22.8076 11.1536C22.8076 10.3252 22.136 9.65363 21.3076 9.65363C20.4792 9.65363 19.8076 10.3252 19.8076 11.1536V23.8459C19.8076 24.6744 20.4792 25.3459 21.3076 25.3459C22.136 25.3459 22.8076 24.6744 22.8076 23.8459V11.1536Z" fill="white" />
                                //     <path d="M17.5 34.5C26.8888 34.5 34.5 26.8888 34.5 17.5H33.5C33.5 26.3366 26.3366 33.5 17.5 33.5V34.5ZM0.5 17.5C0.5 26.8888 8.11116 34.5 17.5 34.5V33.5C8.66344 33.5 1.5 26.3366 1.5 17.5H0.5ZM17.5 0.5C8.11116 0.5 0.5 8.11116 0.5 17.5H1.5C1.5 8.66344 8.66344 1.5 17.5 1.5V0.5ZM34.5 17.5C34.5 8.11116 26.8888 0.5 17.5 0.5V1.5C26.3366 1.5 33.5 8.66344 33.5 17.5H34.5ZM13.6922 10.1536C14.2445 10.1536 14.6922 10.6013 14.6922 11.1536H15.6922C15.6922 10.0491 14.7968 9.15363 13.6922 9.15363V10.1536ZM12.6922 11.1536C12.6922 10.6013 13.1399 10.1536 13.6922 10.1536V9.15363C12.5877 9.15363 11.6922 10.0491 11.6922 11.1536H12.6922ZM12.6922 23.8459V11.1536H11.6922V23.8459H12.6922ZM13.6922 24.8459C13.1399 24.8459 12.6922 24.3982 12.6922 23.8459H11.6922C11.6922 24.9505 12.5877 25.8459 13.6922 25.8459V24.8459ZM14.6922 23.8459C14.6922 24.3982 14.2445 24.8459 13.6922 24.8459V25.8459C14.7968 25.8459 15.6922 24.9505 15.6922 23.8459H14.6922ZM14.6922 11.1536V23.8459H15.6922V11.1536H14.6922ZM21.3076 10.1536C21.8599 10.1536 22.3076 10.6013 22.3076 11.1536H23.3076C23.3076 10.0491 22.4122 9.15363 21.3076 9.15363V10.1536ZM20.3076 11.1536C20.3076 10.6013 20.7553 10.1536 21.3076 10.1536V9.15363C20.203 9.15363 19.3076 10.0491 19.3076 11.1536H20.3076ZM20.3076 23.8459V11.1536H19.3076V23.8459H20.3076ZM21.3076 24.8459C20.7553 24.8459 20.3076 24.3982 20.3076 23.8459H19.3076C19.3076 24.9505 20.203 25.8459 21.3076 25.8459V24.8459ZM22.3076 23.8459C22.3076 24.3982 21.8599 24.8459 21.3076 24.8459V25.8459C22.4122 25.8459 23.3076 24.9505 23.3076 23.8459H22.3076ZM22.3076 11.1536V23.8459H23.3076V11.1536H22.3076Z" fill="white" />
                                // </svg>

                            }


                        </div>
                    </div>

                    <div className='relative' style={{ width: '100vw', height: '100vh', position: 'fixed', maxHeight: '-webkit-fill-available' }}>
                        {joinButtonDelay || routTimeRef.current > 35 && routTimeRef.current > 358 ?
                            <>
                                {/*{!hideButton ?*/}
                                {/*    <div className={` ${innerHeight < 450 ? blinkJoinButtonDelay ? 'opacity-100 transform transition-all' : 'opacity-0 transform transition-all' : blinkJoinButtonDelay && 'opacity-100 transform transition-all'}  absolute z-[9999]   bottom-[9vh]  flex justify-center w-full `}>*/}
                                {/*        <Link onClick={() => isWatched()} href={route('register')} className='absolute z-[9999]    bottom-[14%] md:bottom-[1%]  flex justify-center w-[80%] md:w-[30%] '>*/}

                                {/*            <Lottie*/}
                                {/*                // loop*/}
                                {/*                animationData={BecomeAMember}*/}
                                {/*                play*/}
                                {/*                className='btn-become-member'*/}
                                {/*            />*/}
                                {/*        </Link>*/}
                                {/*    </div>*/}

                                {/*    :*/}
                                {/*    <>*/}
                                {/*        <div className={` ${innerHeight < 450 ? blinkJoinButtonDelay ? 'opacity-100 transform transition-all' : 'opacity-0 transform transition-all' : blinkJoinButtonDelay && 'opacity-100 transform transition-all'} absolute z-[9999]   bottom-[14%] md:bottom-[7%]  flex justify-center w-full `}>*/}
                                {/*            <Link href={route('login')} className='absolute z-[9999]   bottom-[14%]  flex justify-center w-full '>*/}
                                {/*                <button onClick={() => { setShowVideo2(true) }} className={` w-[80%] md:w-[20%] px-[3%] h-[24px]  text-[14px] pt-[2px]   ${innerHeight < 450 ? 'md:h-[25px] md:text-[18px]' : 'md:h-[35px] md:text-[22px]'} bg-white text-black font-bold   rounded-full `}>*/}
                                {/*                    LOGIN*/}
                                {/*                </button>*/}
                                {/*            </Link>*/}
                                {/*        </div>*/}
                                {/*    </>*/}
                                {/*}*/}

                                <div className={` ${innerHeight < 450 ? blinkJoinButtonDelay ? 'opacity-100 transform transition-all' : 'opacity-0 transform transition-all' : blinkJoinButtonDelay && 'opacity-100 transform transition-all'}  absolute z-[9999]   bottom-[9vh]  flex justify-center w-full `}>
                                    <Link onClick={() => isWatched()} href={route('register')} className='absolute z-[9999]    bottom-[14%] md:bottom-[1%]  flex justify-center w-[80%] md:w-[30%] '>

                                        <Lottie
                                            // loop
                                            animationData={BecomeAMember}
                                            play
                                            className='btn-become-member'
                                        />
                                    </Link>
                                </div>
                            </>
                            :
                            // <div className='absolute z-[9999] bottom-[14%] md:bottom-[7%] flex justify-center w-full'>
                            <div className={` ${orientation == 'landscape' ? 'video-progress-landscap' : 'bottom-[10vh] '}  absolute z-[9999] flex justify-center w-full `}>
                                <div className={` ${orientation == 'landscape' ? 'video-progress-landscap-h' : 'h-[21px]'}  horizantal-progress-w mx-auto bg-[#333333] rounded-full overflow-hidden `}>
                                    <div className={`bg-[#fff] ${orientation == 'landscape' ? 'video-progress-landscap-h' : 'h-[21px]'} rounded-full`} style={{ width: `${progress}%` }}></div>
                                </div>
                            </div>

                        }
                        <video
                            onClick={() => { showJoinButton() }}
                            ref={videoRef}
                            preload='auto'
                            playsInline
                            loop={false}
                            defaultmuted={'true'}
                            muted={showVideo2}
                            className=' background-video video tag intro'
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}

                            poster={preimg}
                        >
                            <source src={preimg} type="image/png" />
                            <source src={videoAsset?.sales} type="video/mp4" />
                        </video>
                    </div>
                </div>

            </div>

            {/* delay glitch */}
            {/* <div className={`${!showGlitchDelay && ' hidden'}`}>
                <div style={{ width: '100vw', height: '100vh', position: 'fixed' }}>
                    <video
                        ref={delay_video_Ref}
                        preload='auto'
                        playsInline
                        loop
                        muted={true}
                        defaultmuted={'true'}
                        className=' background-video video tag delay'
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    >
                        <source src={glitchDelay} type="video/mp4" />
                    </video>
                </div>
            </div> */}

        </>
    );
};









export default IntroPage;
