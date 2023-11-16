import React, { useEffect, useState } from 'react'

const Timer = ({ time }) => {
  // const [hours, setHours] = useState();
  // const [minutes, setMinutes] = useState();
  // const [seconds, setSeconds] = useState();
 
  const [totalSeconds, setTotalSeconds] = useState(time);

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setTotalSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);

    if (totalSeconds <= 0) {
      clearInterval(countdownInterval);
      // console.log("Countdown finished!");
      window.location.reload();
    }

 

    return () => clearInterval(countdownInterval);
  }, [totalSeconds]);

  // Calculate hours, minutes, and seconds
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return (
    <div className='flex justify-center'>
      <div className="timer-shadow fw-bold  text-center">
        <p className="timer-text">
          {hours}
        </p>
        <p   className=" text-center text-[#d1d1d1] timer-subheading uppercase mt-1">
          Hours
        </p>
      </div>
      <div className="timer-shadow fw-bold  text-center">
        <p className="timer-text">
          {minutes}
        </p>
        <p className="text-center   text-[#d1d1d1] timer-subheading uppercase mt-1">
          Minutes
        </p>
      </div>
      <div className="timer-shadow fw-bold  text-center">
        <p className="timer-text">
          {seconds}
        </p>
        <p className="text-center text-[#d1d1d1] timer-subheading uppercase mt-1">
          Seconds
        </p>
      </div>
    </div>
  )
}

export default Timer
