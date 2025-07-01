import React, { useRef, useEffect } from 'react';
import VimeoPlayer from '@vimeo/player';
import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import axios from 'axios';
import { PostsContext } from '../Store/PostsProvider';
import { useContext } from "react";
import { GTMLogs } from '@/utils/GTMLogs';

const VimeoVideoPlayer = ({ progress, videoId, lesson_id, setVideoReady, courseName, lessonName}) => {

  const { get } = useForm();
  // const { setVideoReady } = useContext(PostsContext);

  const playerRef = useRef(null);





  let renderedPlayerRef = useRef(null);
  let durationRef = useRef(null);


  const [duration, setDuration] = useState(null);

  const [timerId, setTimerId] = useState(null);

  const sendProgressToServer = (progress) => {

    //  console.log('durationRef.current' , durationRef.current)

    if (durationRef.current) {

      const progressPercentage = (progress / durationRef.current) * 100;



      // console.log( 'progress Percentage' , progressPercentage)

      if (progressPercentage > 99.99999) {

        get(route("lessons.complete", lesson_id))
      }

      axios.post(route('lessons.update-progress', lesson_id), {
        progress: progressPercentage
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
      // id: '4057751'
    });



    renderedPlayerRef.current.ready().then(function () {
      setVideoReady(true)
      // console.log('Video Ready play func');
    }).catch(function (error) {
      console.error('Error in ready function:', error);
    });




    // Event listener for 'play' event
    renderedPlayerRef.current.on('play', () => {
      // console.log('Video is playing.');
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


      // Start the timer for sending progress every 10 seconds
      const intervalId = setInterval(() => {
        renderedPlayerRef.current.getCurrentTime().then((seconds) => {
          // console.log('Current time:', seconds);
          sendProgressToServer(seconds);
        });
      }, durationRef?.current > 180 ? 10000 : 4500); // 10 seconds interval

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

  useEffect(() => {
    const percentage = progress;
    renderedPlayerRef.current.getDuration().then(duration => {
      const startTime = (percentage / 100) * duration;
      renderedPlayerRef.current.setCurrentTime(startTime);
    });
  }, [])

  return <div ref={playerRef}></div>;
};

export default VimeoVideoPlayer;
