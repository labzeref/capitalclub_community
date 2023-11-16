import React, { useEffect, useRef } from "react";
import Plyr from "plyr";
import "plyr/dist/plyr.css";
import { useState } from "react";

const PlyrComponent = ({ source, thumbnail }) => {
 
    const videoRef = useRef(null);
    const [currentTime, setCurrentTime] = useState(0);
 
    useEffect(() => {
        const player = new Plyr(videoRef.current, {
            controls: [
                "play",
                "progress",
                "current-time",
                "mute",
                "volume",
                "captions",
                "fullscreen",
            ],
            captions: { active: true, update: true },
            speed: { selected: 1, options: [0.5, 1, 1.5, 2] },
        });



        player.on('timeupdate', (event) => {
            const newTime = event.detail.plyr.currentTime;
            setCurrentTime(newTime);
          });



        return () => {
            if (player) {
                player.destroy();
            }
        };
    }, []);

    return (
        <div className="border-rounded-10 overflow-hidden">

            <video ref={videoRef} poster={thumbnail}>
                <source src={source} type="video/mp4" />
                <track
                    kind="captions"
                    label="English"
                    srcLang="en"
                    src={thumbnail}
                    default
                />
            </video>


            {/* <video ref={videoRef}>
                <source src={source} type="video/mp4" />
                <track
                    kind="captions"
                    label="English"
                    srcLang="en"
                    src={thumbnail}
                    default
                />
            </video> */}
        </div>
    );
};

export default PlyrComponent;
