import React, { useRef, useEffect } from 'react';
import VimeoPlayer from '@vimeo/player';
import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import axios from 'axios';
import { PostsContext } from '../Store/PostsProvider';
import { useContext } from "react";

const VimeoVideoPlayer = ({ videoId , lesson_id , setVideoReady }) => {
 
  const { get } = useForm();
  // const { setVideoReady } = useContext(PostsContext);

  const playerRef = useRef(null);
  let renderedPlayerRef = useRef(null);
  let durationRef = useRef(null);

const [duration, setDuration] = useState(null);
 
const [timerId, setTimerId] = useState(null);

  const sendProgressToServer = (progress) => {

 
if (durationRef.current) {

  const progressPercentage = (progress / durationRef.current) * 100;

 

  // console.log( 'progress Percentage' , progressPercentage)

if (progressPercentage > 99 ) {
  console.log('run')
   get(route("lessons.complete", lesson_id))
}
 
  axios.post(route('lessons.update-progress', lesson_id), {
    progress : progressPercentage
  }).then(response => {
    // console.log('success', response);
  }).catch(response => {
    // console.log('error', response);
  })
};

}

  

  const regex = /vimeo\.com\/(?:video\/|video\/video\/|)(\d+)/;

  const match = videoId.match(regex); 
  const vimeoVideoId = match ? match[1] : null;
  
  // console.log('new id from client' , vimeoVideoId)
 
 


  useEffect(() => {
      renderedPlayerRef.current = new VimeoPlayer(playerRef.current, {
      id: vimeoVideoId,
      // id:'871122886'
    }); 



    renderedPlayerRef.current.ready().then(function() {   
      setVideoReady(true)   
      console.log('Video Ready play func');
    }).catch(function(error) {
      console.error('Error in ready function:', error);  
    });
    

      // Event listener for 'play' event
      renderedPlayerRef.current.on('play', () => {
        // console.log('Video is playing.');
        console.log('in play func')
        // Start the timer for sending progress every 10 seconds
        const intervalId = setInterval(() => {
          renderedPlayerRef.current.getCurrentTime().then((seconds) => {
            // console.log('Current time:', seconds); 
            sendProgressToServer(seconds);
          });
        }, 10000); // 10 seconds interval
  
        setTimerId(intervalId);
      });
  
      // Event listener for 'pause' event
      renderedPlayerRef.current.on('pause', () => {
        // console.log('Video is paused.');
  
        // Clear the timer when the video is paused
        if (timerId) {
          clearInterval(timerId);
          setTimerId(null);
        }
      });
  
  

      // // Event listener for 'loaded' event
      renderedPlayerRef.current.on('loaded', () => { 
        renderedPlayerRef.current.getDuration().then((videoDuration) => {
    
          durationRef.current = (videoDuration);
        });
      });

    // Event listener for 'timeupdate' event
    renderedPlayerRef.current.on('timeupdate', (data) => {
    });

    // Clean up the renderedPlayerRef.current when the component is unmounted
    return () => {
      renderedPlayerRef.current.off('play');
      renderedPlayerRef.current.off('pause');
      renderedPlayerRef.current.off('timeupdate');
      renderedPlayerRef.current.destroy();
    };
  }, []);



  return <div ref={playerRef}></div>;
};

export default VimeoVideoPlayer;
