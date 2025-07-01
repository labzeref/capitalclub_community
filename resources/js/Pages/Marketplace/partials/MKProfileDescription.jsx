import React from 'react'
import {AsyncImage} from "loadable-image";
import {Blur} from "transitions-kit";

const MKProfileDescription = ({ cateName, logo, longDesc }) => {
    return (
        <div className='market-profile-des'>
            {/* Name */}
            <div className='flex  items-center'>
                <p className='text-[14px] md:text-[20px] fw-semibold leading-[17px] text-center w-full md:text-start'> {cateName}</p>
            </div>
            {/* Logo  */}
            <div className='flex justify-center md:justify-start'>
                <AsyncImage
                    src={logo}
                    className={'mt-4 md:mt-7 h-10 md:max-h-[52px]'}
                    style={{ width: "auto", height: 77,aspectRatio:50 / 11, marginRight:"auto",objectFit:"contain" }}
                    Transition={props => <Blur radius={10} {...props}/>}
                    loader={<div style={{ background: 'transparent' }}/>}
                    error={<div style={{ background: 'transparent' }}/>}/>
            </div>
            {/* descriptions  */}
            <div className='mk-text-color long-desc-list-style render-html-marketplace-fonts' >
                <div dangerouslySetInnerHTML={{ __html: longDesc }} className='  mt-[1.9rem]  mk-text-color ' />
                {/* points */}
                {/* <ul className='list-disc ml-4 mt-4'>
                    <li>Lorem ipsum dolor sit amet </li>
                    <li>Lorem ipsum dolor sit amet </li>
                    <li>Lorem ipsum dolor sit amet </li>
                    <li>Lorem ipsum dolor sit amet </li>
                </ul> */}
            </div>
        </div>
    )
}
export default MKProfileDescription
