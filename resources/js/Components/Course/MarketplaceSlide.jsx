import { Link } from '@inertiajs/react'
import React from 'react'

const MarketplaceSlide = ({ className = '', routeToPlay = '', lessonProgress = 0, desktop_image, mobile_image, logo, ...props }) => {

    return (
        <div>
            <Link preserveScroll href={routeToPlay}>
                <div className={className + "coming-soon-linear  large-card-hover-div object-cover  relative   "}  >

                    {/* For Desktop  */}
                    <img src={desktop_image?.original?.url} className="h-[100%] w-full hide-sm-img header-image input-shadow" />
                    <div className='   hide-sm-img  mk-desk-wrapper '>
                        <img src={logo} alt='company logo' className='mk-desk-slide-logo ' />
                        <p className='mk-desk-slide-p '>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Nunc vulp utate libero et velit  adipiscing elit. Nun Worem ipsum
                        </p>
                        <div className='flex justify-center my-[10px] md:my-[20px] '>
                        <Link href={route("marketplace-profile")} className={" button secondary  border  rounded-full max-w-[299px] w-[20vw] pt-[0.05vw]"} >
                            <button className="text-[12px] fw-bold">
                                LEARN MORE
                            </button>
                        </Link>
                        </div>
                        </div>

                    {/* For Mobile  */}
                    <img src={mobile_image?.original?.url} className="h-[100%] w-full hide-md-img header-image input-shadow" />
                    <div className='hide-md-img'>
                        <img src={logo} alt='company logo' className='mk-mobile-slide-logo' />
                    </div>
                    <p className='hide-md-img text-[12px] text-center mk-mobile-slide-p'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Nunc vulp utate libero et velit  adipiscing elit. Nun Worem ipsum
                    </p>

                    <div className='hide-md-img absolute bottom-10 -translate-x-1/2 left-1/2  '>
                    <Link href={route("marketplace-profile")} className="button isLogin primary rounded-full w-[144px]">
                            <div className="button_container glitch uppercase text-[12px] fw-bold">
                                LEAN MORE
                            </div>
                        </Link>
                    </div>

                    {/* **** Lesson progress bar ****   */}
                    {lessonProgress > 0 &&
                        <div className="w-[130%] h-[10px] bg-[#1a1a1a] bottom-0 absolute">
                            <div style={{ width: lessonProgress + '%' }} className={`h-[10px] bg-[#ffffff]`}></div>
                        </div>
                    }
                </div>
                {/* <div className='academy-new-shadow bottom -mt-[10rem]  md:-mt-[15rem] lg:-mt-[14rem] static -z-[9999]'></div> */}
            </Link>
        </div>
    )
}

export default MarketplaceSlide
