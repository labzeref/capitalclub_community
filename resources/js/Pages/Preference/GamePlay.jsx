import Timer from '@/Components/Timer'
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import flyout from "../../../assets/img/flyout.png";
import { Link, router } from '@inertiajs/react';
const GamePlay = ({academyOpeningDate}) => {
    const [totalSeconds, setTotalSeconds] = useState(51198);

    useEffect(() => {
        const countdownInterval = setInterval(() => {
            setTotalSeconds((prevSeconds) => prevSeconds - 1);
        }, 1000);

        if (totalSeconds <= 0) {
            clearInterval(countdownInterval);
            // console.log("Countdown finished!");
        }

        return () => clearInterval(countdownInterval);
    }, [totalSeconds]);

    // Calculate hours, minutes, and seconds
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return (
        <>
            <div className='h-[95vh] items-center flex justify-center'>
                <div className='flex flex-col justify-between h-[85vh] md:h-[75vh]  items-center my-2'>

                    <div>
                        <div className='container mx-auto flex justify-center mb-4'>
                            <div className="grid grid-cols-1">

                                <p className='text-13 fw-bold uppercase text-center mb-4'>DOORS OPEN IN</p>
                                <div className='gap-x-3 flex justify-center w-full'>
                                    <div className="w-full onboarding-game py-2  fw-bold register-timer text-center">
                                        <p className=" text-32 fw-bold leading-[normal]">
                                            {hours}
                                        </p>
                                        <p className=" text-center text-[#d1d1d1] fw-semibold text-12">
                                            Hours
                                        </p>
                                    </div>
                                    <div className="w-full onboarding-game py-2  fw-bold register-timer text-center">
                                        <p className=" text-32 fw-bold leading-[normal] ">
                                            {minutes}
                                        </p>
                                        <p className=" text-center text-[#d1d1d1] fw-semibold text-12">
                                            Minutes
                                        </p>
                                    </div>
                                    <div className="w-full onboarding-game py-2  fw-bold register-timer text-center">
                                        <p className=" text-32 fw-bold leading-[normal] ">
                                            {seconds}
                                        </p>
                                        <p className=" text-center text-[#d1d1d1] fw-semibold text-12">
                                            Seconds
                                        </p>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className='w-[90%]   max-w-[500px] mx-auto mt-[1.125rem] game-desc'>

                            <p className='text-10 fw-medium'>Once the 48hr new member sign up period closes,
                                we will open up the Capital Club members area for you.
                                <br /><br />
                                We don't want sneak peaks of whats inside being
                                leaked and then having random bots join. Fuck that.


                                Anyways ,enjoy this glitch game we made for you while you wait.
                                <br /><br />


                                Oh and top score wins a prize :) a big one.

                                <br /><br />

                                See you inside...
                            </p>

                        </div>

                    </div>







                    <div className='card-bg p-4 w-full max-w-[300px]   border-rounded-10 mx-auto py-[1.5rem] px-[0.6rem] '>
                        <img src={flyout} alt='fly out of the matrix' className='mx-auto' />
                        <a href={route('game.play')}>
                            <button className='button primary uppercase rounded-full w-full mt-[1rem]'>
                                play game
                            </button>
                        </a>
                    </div>


                    <div className="grid grid-cols-1">
                        <div className="text-center flex gap-x-3">
                            <Link href={route('terms-and-conditions')} className="text-[8px] fw-semibold">
                                Terms & Conditions
                            </Link>
                            <a
                                href="https://support.capital.club"
                                target="_blank"
                                rel="noopener noreferrer"

                            >
                                <p className="text-[8px] fw-semibold">support</p>
                            </a>
                        </div>
                    </div>






                </div>
            </div>
        </>
    )
}

export default GamePlay
