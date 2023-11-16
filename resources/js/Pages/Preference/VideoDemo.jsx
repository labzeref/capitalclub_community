import React, { useState } from 'react';

import preimg from '../../../assets/img/pre-img.png';


import fp from '../../../assets/Fingerprint.svg';
 

import logo from "../../../assets/svg/logo.svg";
import { Link } from '@inertiajs/react';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Lottie from 'react-lottie-player'
import { useRef } from 'react';
const IntroPage = () => {
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
    const [showGlitchDelay, setShowGlitchDelay] = useState(false)
    const [hideGlitch, setHideGlitch] = useState(false)

    const playIntroVideo = () => {

        setTimeout(() => {
            setHideGlitch(true)
        }, 400);

    }

    const videoRef = useRef(null);
    const playVideo = () => {
        if (videoRef.current) { 
            videoRef.current.play();
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



    useEffect(() => {

        if (delay_video_Ref.current) {
            delay_video_Ref.current.play().catch(error => {
                console.error("Autoplay error:", error);
            });
        }
    }, [showGlitchDelay]);
    const handleContextMenu = (e) => {
        e.preventDefault(); 
      };
    return (
        <>
            {/* glitch video for desktop  */}
            <div onContextMenu={handleContextMenu}>
                <div className="m-[20%]" >
                    <iframe src="https://vimeo.com/347119375" width="640" height="360"  ></iframe>

                </div>
            </div>

        </>
    );
};

export default IntroPage;
