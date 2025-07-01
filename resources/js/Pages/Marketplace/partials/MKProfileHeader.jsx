import React from 'react'
import VimeoPlayer from '@vimeo/player';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import WELCOME_LOTTIE from "@/Components/welcome.json";
import Lottie from 'react-lottie-player';
import { usePage } from '@inertiajs/react';
import CC_LOTTIE from "@/Components/CC_LOTTIE_V01.json";
import {AsyncImage} from "loadable-image";
import {Blur} from "transitions-kit";
const MKProfileHeader = ({ imgs }) => {

    const [selectedItem, setSelectedItem] = useState(imgs[0])
    // const [isLoading, setIsLoading] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(0)

    const [videoReady, setVideoReady] = useState(true);
    let renderedPlayerRef = useRef(null);

    const playerRef = useRef(null);


    // const handleChangeMedia = (item) => {
    //     console.log('change img')
    //     setSelectedItem(item)

    // }

    useEffect(() => {

        if (selectedItem?.is_vimeo) {
            if (renderedPlayerRef.current) {
                renderedPlayerRef.current.destroy();
                setVideoReady(true)
            }

            renderedPlayerRef.current = new VimeoPlayer(playerRef.current, {
                id: selectedItem?.vimeo_url,
            });


            renderedPlayerRef.current.on('loaded', () => {
            });


            renderedPlayerRef.current.ready().then(function () {
                setVideoReady(false)
                // console.log('Video Ready play func');
            }).catch(function (error) {
                console.error('Error in ready function:', error);
            });

        }

    }, [selectedItem])


    // useEffect(() => {
    //     const images = document.querySelectorAll('img');

    //     const loadHandler = () => {
    //         setTimeout(() => {
    //             setLoading(false);
    //         }, 500);
    //     };

    //     const errorHandler = () => {
    //         setLoading(false);
    //     };

    //     images.forEach(image => {
    //         image.addEventListener('load', loadHandler);
    //         image.addEventListener('error', errorHandler);
    //     });

    //     return () => {
    //         images.forEach(image => {
    //             image.removeEventListener('load', loadHandler);
    //             image.removeEventListener('error', errorHandler);
    //         });
    //     };
    // }, []);


    const [loading, setLoading] = useState(true);
    const handleLottieComplete = () => {
        // setTimeout(() => {
        setLoading(false);
        // }, 500);
    };

    const isHardRefreshed = usePage().props.isHardRefreshed;

    // const [isVimeoInit, setIsVimeoInit] = useState(false);
    // useEffect(() => {
    //     const isInitialized = playerRef.current.getAttribute('data-vimeo-initialized');
    //     console.log('is', isInitialized)
    //     setIsVimeoInit(isInitialized === 'true');
    // }, [playerRef.current]);

    // console.log('isVimeoInit', isVimeoInit)
    // console.log('current', playerRef.current)

    return (
        <>
            {/*{!isHardRefreshed && <div className={`academy-preloader ${!loading && 'hide-loader'}`}>*/}
            {/*    <Lottie*/}
            {/*        loop={false}*/}
            {/*        animationData={CC_LOTTIE}*/}
            {/*        play*/}
            {/*        height='75px'*/}
            {/*        className='play-page-animation'*/}
            {/*        onComplete={handleLottieComplete}*/}
            {/*    /></div>}*/}

            <div className="flex flex-wrap 2xl:flex-nowrap relative z-[5] w-full gap-x-4 2xl:gap-x-7">
                {/*
                {loading &&
                    <div className={`fixed w-full h-full inset-0 z-[99] bg-black `}></div>
                } */}

                <div className='2xl:space-y-[22px]  min-w-[92px] space-x-3 2xl:space-x-0 flex 2xl:flex-col flex-row order-1 2xl:order-none mt-4 2xl:mt-0 sidebar-marketplace'>
                    {imgs.map((item, index) => (
                        <div className={`relative min-h-[52.2px]  min-w-[92px] rounded-[8px] md:rounded-[8px] ${currentIndex == index && ' border border-2 outline-white'}`} style={{overflowX:'hidden'}} key={index}>

                            <AsyncImage
                                onClick={() => { setSelectedItem(item); setCurrentIndex(index) }}
                                src={item?.image}
                                className={`cursor-pointer rounded-[6px] md:rounded-[6px] `}
                                style={{ width: 92, height: "auto",aspectRatio:16 / 9,objectFit:"cover" }}
                                loader={<div style={{ background: '#161616' }}/>}
                                error={<div style={{ background: '#161616' }}/>}/>
                            {item?.is_vimeo &&
                                <svg onClick={() => { setSelectedItem(item); setCurrentIndex(index) }} className='xy-center cursor-pointer w-5 h-5 md:w-7 md:h-7' viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18 0.5C8.34 0.5 0.5 8.34 0.5 18C0.5 27.66 8.34 35.5 18 35.5C27.66 35.5 35.5 27.66 35.5 18C35.5 8.34 27.66 0.5 18 0.5ZM14.5 25.875V10.125L25 18L14.5 25.875Z" fill="white" />
                                </svg>
                            }

                        </div>
                    ))}
                </div>

                <div className='w-full 2xl:h-full'>
                    <div className={selectedItem?.is_vimeo ? 'block' : 'hidden'}>
                        <style>
                            {`
                                    .codegena {
                                        position: relative;
                                        width: 100%;
                                        height: 0;
                                        padding-bottom: 56.27198%;

                                    }

                                    .codegena iframe {
                                        position: absolute;
                                        top: 0;
                                        left: 0;
                                        border-radius:20px;
                                        width: 100%;
                                        height: 100%;
                                    }
                                    `}
                        </style>
                        <div className='codegena'>
                            <div className='w-full h-full' ref={playerRef}></div>
                            {videoReady ? < img src={selectedItem?.image} alt=""
                                className='h-auto w-full border-rounded-20' /> : null
                            }
                        </div>
                    </div>


                    <div className={!selectedItem?.is_vimeo ? 'block' : 'hidden'}>
                        {/* desktop  */}
                        {imgs?.map((currImg, index) => (
                            <>
                                <div className={index === currentIndex ? 'block' : 'hidden'}>

                                    <AsyncImage
                                        src={currImg?.image}
                                        className={'border-rounded-20'}
                                        style={{ width: "100%", height: "auto",aspectRatio:16 / 9, marginLeft:"auto", marginRight:"auto",objectFit:"cover" }}
                                        Transition={props => <Blur radius={10} {...props}/>}
                                        loader={<div style={{ background: '#161616' }}/>}
                                        error={<div style={{ background: '#161616' }}/>}/>

                                </div>
                            </>
                        ))}


                        {/* mobile  */}
                        {/* {imgs?.map((currImg, index) => (
                                <>
                                    <div className={index === currentIndex ? 'block' : 'hidden'}>
                                        <img src={currImg?.mobile_image} className=' w-full  border-rounded-20 block md:hidden' alt="" />
                                    </div>
                                </>
                            ))} */}
                    </div>


                </div>

            </div >
        </>
    )
}
export default MKProfileHeader
