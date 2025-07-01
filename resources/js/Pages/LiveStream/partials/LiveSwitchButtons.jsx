import { Link } from '@inertiajs/react';
import React from 'react'

const LiveSwitchButtons = () => {
    const currentPathname = window.location.pathname;
    const segments = currentPathname.split('/');
    // Get the last segment
    const currentPage = segments[segments.length - 1];
    return (
        <div>
            <div className='flex flex-col lg:flex-row  lg:justify-between justify-center  w-full items-center mt-[48px] md:mt-[4.2rem]'>
                <p className='text-[20px] lg:text-[2rem] fw-semibold leading-[25px] text-center'>{currentPage == 'livestream' ? 'Upcoming' : 'Past'} Livestreams</p>

                <div className='live-switch-btn flex  mt-5 mb-6 lg:mt-0 lg:mb-0 leading-[13px]'>
                    <Link href={route("livestream.index")}
                        className={`${currentPage === 'livestream'
                            ? 'bg-white text-[#1a1a1a] transition-colors duration-300'
                            : 'text-white'
                            } up-btn`}
                    >
                        Upcoming
                    </Link>
                    <Link href={route("livestream.past")}
                        className={`${currentPage === 'past'
                            ? 'bg-white text-[#1a1a1a] transition-colors duration-300'
                            : 'text-white'
                            } past-btn`}
                    >
                        Past
                    </Link>
                </div>

            </div>
        </div>
    )
}

export default LiveSwitchButtons
