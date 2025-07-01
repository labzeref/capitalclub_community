import React, { useEffect } from 'react'
import placeholderImg from '../../../../assets/img/TopRank.png'
import { useState } from 'react';
import { useRef } from 'react';
const MKProfileReviews = ({ reviwes, isTrustPilot, trustPilotScript }) => {



    useEffect(() => {
        if (isTrustPilot) {

            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = '//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js';
            script.async = true;
            document.body.appendChild(script);
            // Initialize Trustpilot widget
            window.Trustpilot && window.Trustpilot.loadFromElement(document.getElementById('trust_box').getElementsByClassName('trustpilot-widget')[0], true);
        }
    }, []);
    return (
        <div className='market-profile-des mt-4 md:mt-6'>
            <div className='flex  items-center'>
                <p className='text-20 fw-semibold pb-3 leading-[24px]'> REVIEWS</p>
            </div>
            {!isTrustPilot ?

                <>
                    {reviwes?.map((data, index) => (
                        // px-3 py-3 input-shadow border-rounded-8
                        <div className='mt-[26px] ' >
                            <p className='mk-text-color text-[14px] md:text-[18px] fw-regular leading-[21px] md:leading-[27px] '>
                                {data?.feedback} </p>
                            <div className='flex space-x-2 items-center mt-4 md:mt-2.5'>
                                {/* <img src={data?.dp ? data?.dp : placeholderImg} alt='dp' className='h-8 w-8 rounded-full object-cover' /> */}
                                <p className='fs-18 fw-semibold  leading-[27px] '>
                                    {data?.name}
                                </p>
                            </div>
                        </div>
                    ))}
                </>
                :
                <div id='trust_box' dangerouslySetInnerHTML={{ __html: trustPilotScript }}></div>
            }
        </div >
    )
}
export default MKProfileReviews
