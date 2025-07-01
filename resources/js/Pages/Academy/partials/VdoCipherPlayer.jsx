import React, { useEffect, useRef, useState } from 'react';
import axios from "axios";
import {useForm} from "@inertiajs/react";
import {GTMLogs} from "@/utils/GTMLogs.js";

const VdoCipherPlayer = ({
                             progress,
                             setVideoReady,
                             courseName,
                             lessonName,




              isAutoPlayState,
              lesson_id,


              otp,
              playbackInfo,
}) => {


    const playerContainer = useRef(null);
    const intervalRef = useRef(null);
    const [isVideoReady, setIsVideoReady] = useState(true); // Use state to trigger re-renders


    const { get } = useForm();
    const playerRef = useRef(null);

    let renderedPlayerRef = useRef(null);
    var autoPlayRef = useRef(null);


    // const [nextLessonTimer, setNextLessonTimer] = useState(0);
    // const nextLessonTimerRef = useRef(null);
    // const [isCancel, setIsCancel] = useState(false);

    // useEffect(() => {
    //     if (nextLessonTimer >= 100) {
    //         if (isCancel) {
    //
    //             if (lastLessonId){
    //                 get(route("lessons.complete", lesson_id));
    //             }else{
    //                 get(route('courses.preview', courseID));
    //             }
    //
    //         }
    //     } else if (nextLessonTimer > 0 && nextLessonTimer < 100) {
    //         nextLessonTimerRef.current = setTimeout(() => {
    //             setNextLessonTimer(nextLessonTimer + 1);
    //             setCountDown(10 - Math.floor((nextLessonTimer + 1) / 10));  // Calculate the new countdown value
    //         }, 100);// increments every 100ms to complete in 10 seconds
    //     }
    //
    //     return () => clearTimeout(nextLessonTimerRef.current);
    // }, [nextLessonTimer, lesson_id]);


    const sendProgressToServer = (progress , arguDuration) => {
        if (arguDuration) {
            const progressPercentage = (progress / arguDuration) * 100;
            console.log('sent progress' , progressPercentage)
            if (progressPercentage > 99.5) {
                get(route("lessons.complete", lesson_id));
            }
            if (progressPercentage < 99.99999) {
                axios.post(route('lessons.update-progress', lesson_id), {
                    progress: progressPercentage
                }).then(response => {
                    // console.log('success', response);
                }).catch(response => {
                    // console.log('error', response);
                });
            }
        }
    };


    useEffect(() => {
        const scriptId = 'vdocipher-js';
        let playerScript = document.getElementById(scriptId);

        if (!playerScript) {
            playerScript = document.createElement("script");
            playerScript.id = scriptId;
            playerScript.src = "https://player.vdocipher.com/playerAssets/1.6.10/vdo.js";
            document.body.appendChild(playerScript);
        }

        playerScript.onload = () => {
            if (window.VdoPlayer) {
                loadPlayer();
                setVideoReady(true);
            }
        };

        return () => {
            clearInterval(intervalRef.current); // Clear interval on component unmount
            document.body.removeChild(playerScript);
        };
    }, []);

    const loadPlayer = () => {
        if (playerContainer.current && !renderedPlayerRef.current) {
            renderedPlayerRef.current = new window.VdoPlayer({
                otp: otp,
                playbackInfo: playbackInfo,
                theme: "9ae8bbe8dd964ddc9bdb932cca1cb59a",
                container: playerContainer.current,
                autoplay: false,
            });

            // Assign the player instance to the global window object if needed
            window.player = renderedPlayerRef.current;
        }

        window.player.addEventListener('play', () => {
            // console.log('Video is playing');
            GTMLogs(
                {
                    'event': 'GTMevent',
                    'event_name': 'academy_lesson_play',
                    'video_name': lessonName,
                    'course_name': courseName,
                    'lesson_id': lesson_id,
                    'course_category': null,
                    'event_id': '10009'
                }
            )
            trackPlayedTime();
            if (window.player) {
                const duration = window.player.duration;
                const startTime = (progress / 100) * duration;
                // console.log('Setting start time to:', startTime);
                window.player.seek(startTime);
            }
        });

        window.player.addEventListener('pause', () => {
            // console.log('Video is paused');
            clearInterval(intervalRef.current);
        });

        window.player.addEventListener('end', () => {
            // console.log('Video has ended');
            clearInterval(intervalRef.current);
        });
    };

    const trackPlayedTime = () => {
        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            if (window.player) {
                const time = window.player.currentTime;
                sendProgressToServer(time , window.player.duration);
                // console.log(`Played time: ${time} seconds`);
            }
        }, 10000);
    };

    return (
        <>
          <div ref={playerContainer}></div>
        </>
    );
};

export default VdoCipherPlayer;
