import React, { useEffect, useState } from 'react'

const Timer = ({time}) => {
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
      console.log("Countdown finished!");
    }

    return () => clearInterval(countdownInterval);
  }, [totalSeconds]);

  // Calculate hours, minutes, and seconds
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
     
  return (
    <div className='flex gap-x-3'>
                                         <div>
                                            <p className="h-9 w-11 bg-[#ffffff1a] fs-x-large fw-regular text-center items-center justify-center flex rounded-[6px] ">
                                                {hours}
                                            </p>
                                            <p className="fs-tiny fw-regular text-center mt-1 opacity-50">
                                                Hours
                                            </p>
                                        </div>
                                        <div>
                                            <p className="h-9 w-11 bg-[#ffffff1a] fs-x-large fw-regular text-center items-center justify-center flex rounded-[6px] ">
                                                {minutes}
                                            </p>
                                            <p className="fs-tiny fw-regular text-center mt-1 opacity-50">
                                                Minutes
                                            </p>
                                        </div>
                                        <div>
                                            <p className="h-9 w-11  bg-[#ffffff1a] fs-x-large fw-regular text-center items-center justify-center flex rounded-[6px] ">
                                                {seconds}
                                            </p>
                                            <p className="fs-tiny fw-regular text-center mt-1 opacity-50">
                                                Seconds
                                            </p>
                                        </div>
    </div>
  )
}

export default Timer