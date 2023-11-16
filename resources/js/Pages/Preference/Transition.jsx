import React, { useEffect } from "react";
import logo from "../../../assets/svg/logo.svg";
import { ReactComponent as WELCOMEARROW } from "../../../assets/svg/WELCOMEARROW.svg";
import { Link, useForm, usePage } from "@inertiajs/react";
import InterestLayout from "@/Layouts/InterestLayout";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { motion } from 'framer-motion';
import IconButton from "@/Components/IconButton";
import { useState } from "react";
import { useRef } from "react";
import { Inertia } from "@inertiajs/inertia";
const Transition = ({ videoAsset }) => {
    useEffect(() => {
        AOS.init();
    }, [])
    const { auth } = usePage().props;
    const {get} = useForm();



    // ********* SHORT VIDEO  **********

    const videoRef = useRef(null);
    const playVideo = () => {
        if (videoRef.current) {
            videoRef.current.play();
        }
    };


    const [hideGlitchPage, setHideGlitchPage] = useState(false);


    const [buttonDelay, setButtonDelay] = useState(false)



    const routeToAcademy = () => {

        setTimeout(() => {
           get(route('academy'));
        }, 1500);


    }


    const [videoProgress, setVideoProgress] = useState(0)

    const startTrackingProgress = () => {
        const videoElement = videoRef.current;

        const updateTimeProgress = () => {
            const currentTime = videoElement.currentTime;
            const duration = videoElement.duration;
            const progress = (currentTime / duration) * 100;
            setVideoProgress((currentTime / duration) * 100)

            // console.log(`Current Time: ${currentTime}`);
            // console.log(`Duration: ${duration}`);
            // console.log(`Progress: ${progress}%`);
        };

        videoElement.addEventListener('timeupdate', updateTimeProgress);

        return () => {
            videoElement.removeEventListener('timeupdate', updateTimeProgress);
        };
    };


    useEffect(() => {
            // startTrackingProgress()
            // setHideGlitchPage(true)
            routeToAcademy()
            // playVideo()

    }, [])


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
        <div onContextMenu={handleContextMenu} >
            <section className={` md:my-4 lg:my-0  `}>
                <div className="container mx-auto px-5 xl:p-0">

                    <div className="grid grid-cols-12">
                        <div className="col-span-12">
                            <div className="min-h-[90vh]  h-full flex flex-col items-center justify-between md:justify-evenly">
                                <div className="    mt-4 ">

                                    {/* <p className="welcome-text-div text-xl text-center text-[#FFFFFF] font-normal mt-2 md:mt-0 ">
        Welcome to capital club
    </p> */}
                                    <div className={` transition-glitch-id-div  text-center flex justify-center p-4 `}>
                                        <div>
                                            <Link href={route('welcome')}>   <img className="onboarding-logo object-cover" src={logo} alt="" /> </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="transition-glitch-id-div">
                                    {/* <motion.div
                                        initial={{ opacity: 0, scale: 0.2 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0 }}
                                    > */}
                                        <h1 className="text-[#FFFFFF] text-center text-[15px]  font-semibold lg:text-[20px] uppercase">
                                            YOU ARE READY
                                        </h1>
                                        <div className="flex text-center  glitch-transaction-text uppercase font-bold mt-1">
                                            Glitch
                                            <svg className={`ml-3 mr-1 ${orientation=='landscape' ? 'hash-img-mobile-landscap' : ' hash-img' }  `}  viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M12.3089 0.161621H16.7522V19.8788H12.3089V0.161621Z" fill="white"/>
                                                    <path d="M3.42232 0.161621H7.86563V19.8788H3.42232V0.161621Z" fill="white"/>
                                                    <path d="M19.807 11.8253V15.4355L0.0898438 15.4355L0.0898439 11.8253L19.807 11.8253Z" fill="white"/>
                                                    <path d="M19.807 4.04951V7.6597L0.0898438 7.6597L0.0898439 4.04951L19.807 4.04951Z" fill="white"/>
                                                </svg>
                                            {auth.user.id.toString().padStart(4, '0')}
                                        </div>

                                    {/* </motion.div> */}
                                </div>
                                <p></p>


                                {/* <Link href={route('academy')}>
                                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="14" cy="14" r="14" fill="white" />
                                        <path d="M7 13.75H21.5" stroke="black" strokeWidth="3" stroke-linecap="round" strokeLinejoin="round" />
                                        <path d="M14.25 6.5L21.5 13.75L14.25 21" stroke="black" strokeWidth="3" stroke-linecap="round" strokeLinejoin="round" />
                                    </svg>

                                </Link> */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>



            {/* ************* video section *************  */}


            <div className={`  hidden  `}>
                <div  >
                    {/*  ********* intro video ***********8  */}
                    <div className=" absolute w-full z-[999999] mt-5    flex justify-center">
                        <div className='w-full absolute  z-70 flex justify-center'>
                            <Link href={route('welcome')}>     <img
                                className="onboarding-logo"
                                src={logo}
                                alt=""
                            />
                            </Link>
                        </div>
                    </div>
                    <div style={{ width: '100vw', height: '100vh', maxHeight:'-webkit-fill-available' , position: 'fixed' }}>
                        {/* {hidePlayIcon && <div className='absolute z-[9999] left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer'>
                        <svg onClick={() => { handleVideoClick() ; handleDelayNextButton() }}
                            width="100" height="100" viewBox="0 0 117 117" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M58.689 0.475098C26.6549 0.475098 0.65625 26.4738 0.65625 58.5079C0.65625 90.542 26.6549 116.541 58.689 116.541C90.7231 116.541 116.722 90.542 116.722 58.5079C116.722 26.4738 90.7231 0.475098 58.689 0.475098ZM47.0825 78.8194V38.1964C47.0825 35.8171 49.81 34.4243 51.7251 35.8751L78.8264 56.1866C80.3933 57.3472 80.3933 59.6685 78.8264 60.8292L51.7251 81.1407C49.81 82.5915 47.0825 81.1987 47.0825 78.8194Z" fill="white" />
                        </svg>
                    </div>
                    } */}
                        {buttonDelay ?
                            <div className='absolute z-[9999] bottom-[12%] md:bottom-[16%] flex justify-center w-full '>
                                <Link href={route('preference.top-interest')} className='absolute z-[9999]    flex justify-center w-full '>
                                    <IconButton

                                        // onClick={(e) => { handleSubmit(e) }}
                                        icon={<WELCOMEARROW />}
                                        className={"primary icon   uppercase"}
                                    >
                                    </IconButton>
                                </Link>
                            </div>
                            :
                            <div className='absolute z-[9999] bottom-[8%] md:bottom-[10%] flex justify-center w-full'>
                                <div className="w-[80%] mx-auto bg-[#333333] rounded-full h-[21px] overflow-hidden ">
                                    <div className="bg-[#838383] h-[21px] rounded-full" style={{ width: `${videoProgress}%` }}></div>
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
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        // poster={preimg}
                        >
                            {/* <source src={preimg} type="image/png" /> */}
                            <source src={videoAsset?.welcome} type="video/mp4" />
                        </video>
                    </div>
                </div>
                {/* <div className="bg-white h-[10px] md:h-[20px]  mt-3 fixed bottom-0 z-[9999] w-[15%] "></div> */}
            </div>








        </div>
    );
};
export default Transition;
