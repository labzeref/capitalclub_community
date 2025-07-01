import { Link } from '@inertiajs/react'
import React from 'react'
import LiveBadge from '../LiveBadge'
import Badge from '../Badge'
import { useState } from 'react'
import { useEffect } from 'react'
import PlayIcon from '../PlayIcon'
import { AsyncImage } from "loadable-image";
import { Blur } from "transitions-kit";

const AcademySmallSliderCard = ({ IsMoneyTalk = false, isNew = false, isContinueWatching = false, imgHeight, lessonProgress = 0, upcomming, desktop_image, mobile_image, title, summery = '', courses, routeToPlay = '', ...props }) => {

    return (


        <Link preserveScroll href={routeToPlay} >
            <div className={"   large-card-hover-div object-cover  relative   "}  >

                <div className='relative rounded-[10px] overflow-hidden'>
                    {isContinueWatching && <div className='absolute w-full h-full bg-black opacity-[0.45]'></div>}
                    {/*{!isContinueWatching && isNew && <div className='absolute bottom-1.5 right-1.5 max-w-[88px] w-full pt-1 h-5 flex justify-center items-center px-7 uppercase fw-bold text-[13px] leading-[16px] rounded-full bg-white text-black '>*/}
                    {/*    New*/}
                    {/*</div>}*/}

                    {!IsMoneyTalk ?
                        <div>
                            <div className="hidden border-rounded-10 md:flex" style={{ height: "auto", width: "100%" }}>
                                <AsyncImage
                                    src={desktop_image?.original?.url}
                                    className={`header-image border-rounded-10 input-shadow smallSliderImageAcademy`}
                                    style={{ height: "auto", width: "100%", aspectRatio: 43609 / 18000, objectFit: 'contain' }}
                                    Transition={props => <Blur radius={10} {...props} />}
                                    loader={<div style={{ background: '#1A1A1A' }} />}
                                    error={<div style={{ background: '#1A1A1A' }} />} />
                            </div>
                            <div className="flex border-rounded-10 md:hidden" style={{ height: "auto", width: "100%" }}>
                                <AsyncImage
                                    src={mobile_image?.original?.url}
                                    className={`header-image border-rounded-10 input-shadow smallSliderImageAcademy`}
                                    style={{ height: "auto", width: "100%", aspectRatio: 343 / 432, objectFit: 'contain' }}
                                    Transition={props => <Blur radius={10} {...props} />}
                                    loader={<div style={{ background: '#1A1A1A' }} />}
                                    error={<div style={{ background: '#1A1A1A' }} />} />
                            </div>
                        </div>
                        :
                        <AsyncImage
                            src={desktop_image?.original?.url}
                            className={`header-image border-rounded-10 input-shadow smallSliderImageAcademy`}
                            style={{ height: "auto", width: "100%", aspectRatio: 16 / 9, objectFit: 'contain' }}
                            Transition={props => <Blur radius={10} {...props} />}
                            loader={<div style={{ background: '#1A1A1A' }} />}
                            error={<div style={{ background: '#1A1A1A' }} />} />
                    }

                    {lessonProgress > 0 && isContinueWatching && <div className="w-[130%] h-[6px] bg-[#1a1a1a] bottom-0 absolute">
                        <div style={{ width: lessonProgress + '%' }} className={`h-[6px] bg-[#ffffff]    `}></div>
                    </div>}
                </div>
                {/* {!IsMoneyTalk && <div>
                            <p className='text-[15px] font-bold leading-[18px] uppercase mt-2'>{title} </p>
                            <p className='text-[13px] font-regular leading-[16px]'>{summery?.length < 58 ? summery : summery?.slice(0, 58) + '...'}  </p>
                        </div>} */}


                {isContinueWatching &&
                    <div className='position-XY-center absolute'>
                        <PlayIcon />
                    </div>
                }
            </div>
        </Link>

    )
}

export default AcademySmallSliderCard
