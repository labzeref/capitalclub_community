import React, { useRef, useEffect } from 'react';
import VimeoPlayer from '@vimeo/player';
import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import axios from 'axios';

const VimeoVideoPlayer = ({ videoId , lesson_id }) => {
  const playerRef = useRef(null);

const [duration, setDuration] = useState(null);
 
const [timerId, setTimerId] = useState(null);

  const sendProgressToServer = (progress) => {

 
    const progressPercentage = (progress / duration) * 100;
    console.log( 'progress in function : ' , progressPercentage)
    // Hit the API with progress and lesson data
    axios.post(route('lessons.update-progress', lesson_id), {
      progress : progressPercentage
    }).then(response => {
      console.log('success', response);
    }).catch(response => {
      console.log('error', response);
    })
  };

  


 

  useEffect(() => {
    const player = new VimeoPlayer(playerRef.current, {
      id: videoId,
    });


 

      // Event listener for 'play' event
      player.on('play', () => {
        console.log('Video is playing.');
  
        // Start the timer for sending progress every 10 seconds
        const intervalId = setInterval(() => {
          player.getCurrentTime().then((seconds) => {
            // console.log('Current time:', seconds);
           console.log( 'progress in', seconds / duration *  100)
            sendProgressToServer(seconds);
          });
        }, 10000); // 10 seconds interval
  
        setTimerId(intervalId);
      });
  
      // Event listener for 'pause' event
      player.on('pause', () => {
        console.log('Video is paused.');
  
        // Clear the timer when the video is paused
        if (timerId) {
          clearInterval(timerId);
          setTimerId(null);
        }
      });
  
  

      // Event listener for 'loaded' event
      player.on('loaded', () => { 
        player.getDuration().then((videoDuration) => {
          // console.log('Duration:', videoDuration);
          setDuration(videoDuration);
        });
      });

 



    // Event listener for 'timeupdate' event
    player.on('timeupdate', (data) => {
      // console.log('Current time:', data.seconds);
    });

    // Clean up the player when the component is unmounted
    return () => {
      player.off('play');
      player.off('pause');
      player.off('timeupdate'); // Make sure to remove the 'timeupdate' listener as well
      player.destroy();
    };
  }, [videoId , duration]);



  return <div ref={playerRef}></div>;
};

export default VimeoVideoPlayer;
