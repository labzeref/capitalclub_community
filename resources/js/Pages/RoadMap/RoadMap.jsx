import React from 'react'
import roadMapImg from '../../../assets/roadmap/roadmap.png'
import { AsyncImage } from 'loadable-image'
import Layout from '@/Layouts/Layout'
const RoadMap = () => {
    return (
        <div className='container mx-auto pt-[32px] md:pt-[87px] pb-[32px] md:pb-[67px] px-4 md:px-[9.563rem] '>
            {/* <div className='bg-red-500  roadmap-logo'></div> */}
            <AsyncImage
                src={roadMapImg}
                className='bg-transparent'
                style={{ width: "100%", height: "auto", aspectRatio: 1276 / 5197 }}
                loader={<div style={{ background: '#1A1A1A' }} />}
                error={<div style={{ background: '#1A1A1A' }} />} />
            {/* <img src={roadMapImg} alt="" className='bg-[#0d0d0d]' /> */}
        </div>
    )
}

RoadMap.layout = (page) => <Layout children={page} />;
export default RoadMap
