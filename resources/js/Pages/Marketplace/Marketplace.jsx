import React, { useEffect } from 'react'
import Layout from '@/Layouts/Layout'
import market1 from "../../../assets/svg/Marketplace1.svg";


import card1 from "../../../assets/img/card1.jpg";

import { Head, Link } from '@inertiajs/react';
import axios from 'axios';
import { useState } from 'react';
import ReactToast from '@/Components/ReactToast';


const Marketplace = ( ) => {
    // console.log('partnerProfiles')
    // console.log(partnerProfiles)

    // console.log('partnerProfiles')



    const [partnerProfiles, setPartnerProfiles] = useState([])
    const [nextPage, setNextPage] = useState(null);
       const getAllPartners = async () => {
        try {
            const response = await axios.get(route("marketplace.list")); 
            setPartnerProfiles(response?.data?.payload?.data) 
            setNextPage(response?.data?.payload?.next_page_url)
        } catch (error) {
            console.error("error market Place Data:", error);
        }
    };
    useEffect(() => {
        getAllPartners()
    }, [])


    const loadMore = async () => {
        try {
            const response = await axios.get(nextPage); 
            console.log('pagination res' , response?.data?.payload)
            setPartnerProfiles(partnerProfiles.concat(response?.data?.payload?.data))
            setNextPage(response?.data?.payload?.next_page_url)
        } catch (error) {
            console.error(error)
            ReactToast('error', error?.response?.data?.payload) 
            console.log('its error')
        }
    }
    const [imageLoaded, setImageLoaded] = useState(false);

console.log(partnerProfiles)


    return (
        <div>
<Head title="Marketplace"/>
            <section data-aos="fade-in" data-aos-delay="100" data-aos-easing="ease" data-aos-duration="300" className=" mt-[6.8rem] md:mt-[8rem] lg:mt-[8rem]">
                <div className="container mx-auto px-5 xl:px-0">
                    <div className="grid grid-cols-12">
                        <div className="col-span-12">
                            <h1 className="mb-8 lg:mb-12 text-center">Marketplace</h1>
                        </div>
                    </div>

                    <div className="grid grid-cols-12 gap-6">



<>
                        {partnerProfiles?.map((item, index) => (
                            <div  key={index + 1} className="col-span-12 md:col-span-6 lg:col-span-4">
                                <Link href={route('marketplace.profile', item?.id)}>
                                    <div className="noise-10 border-rounded-10 inset-border  border-[#ffffff1a] max-h-[650px] ">
                                        <div className=" items-center gap-4 p-8 ">
                                            <div className='flex items-center'>
                                                <div className='rounded-full inset-border'>
                                                    <img className="w-[4.6rem] h-[4.6rem] rounded-full object-cover object-center border-[1px] border-[#ffffff1a]"   src={  item?.dp?.small?.url} alt="" />
                                                </div>
                                                <div>
                                                    <h4 className="px-[1rem]">{item?.name}</h4>
                                                    {/* <p className="fs-rgular fw-regular text-[#9E9E9E]">United States</p> */}
                                                </div>
                                            </div>
                                            <div className='mt-[1rem] flex flex-wrap gap-[8px] '>
                                                {item?.head_offices?.map((data, idx) => (
                                                    <p key={idx + 1} className="border-rounded-20 fs-tiny fw-regular px-4 py-2 inset-border">
                                                        {data}
                                                    </p>
                                                ))}

                                            </div>
                                        </div>
                                        <div className="py-4  border-y    border-[#ffffff1a]  ">
                                            <p className="flex items-center justify-center  gap-2 fs-regular fw-regular text-[#fff]">
                                                <span>
                                                <svg className='-mt-1' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M21.9842 10.7232L17.7561 14.4132L19.0226 19.9069C19.0897 20.1941 19.0705 20.4947 18.9677 20.7711C18.8648 21.0475 18.6827 21.2874 18.4442 21.4609C18.2057 21.6344 17.9214 21.7337 17.6267 21.7464C17.3321 21.7592 17.0402 21.6848 16.7876 21.5326L11.9961 18.6263L7.21482 21.5326C6.96223 21.6848 6.67038 21.7592 6.37574 21.7464C6.0811 21.7337 5.79676 21.6344 5.55826 21.4609C5.31976 21.2874 5.13769 21.0475 5.03481 20.7711C4.93193 20.4947 4.9128 20.1941 4.97982 19.9069L6.24451 14.4188L2.01545 10.7232C1.79177 10.5303 1.63003 10.2756 1.5505 9.99113C1.47098 9.70666 1.47721 9.40504 1.56842 9.1241C1.65964 8.84315 1.83176 8.59539 2.06322 8.41188C2.29468 8.22838 2.57517 8.11729 2.86951 8.09256L8.44389 7.60974L10.6198 2.41974C10.7335 2.14742 10.9251 1.9148 11.1707 1.75117C11.4163 1.58755 11.7047 1.50024 11.9998 1.50024C12.2949 1.50024 12.5834 1.58755 12.829 1.75117C13.0745 1.9148 13.2662 2.14742 13.3798 2.41974L15.5623 7.60974L21.1348 8.09256C21.4292 8.11729 21.7097 8.22838 21.9411 8.41188C22.1726 8.59539 22.3447 8.84315 22.4359 9.1241C22.5271 9.40504 22.5334 9.70666 22.4538 9.99113C22.3743 10.2756 22.2126 10.5303 21.9889 10.7232H21.9842Z" fill="#BA3E17"/>
</svg>

                                                </span>
                                               <p className=' '>4.9 (14 reviews)</p> 
                                            </p>
                                        </div>
                                        <p className="fw-regular fs-regular p-8">{item?.overview?.length > 105 ? item?.overview?.substring(0, 106) + "..." : item?.overview}.</p>
                                        <img className="h-[306px] w-full object-center object-cover" onLoad={()=>{setImageLoaded(true)}} src={imageLoaded ? item?.cover?.original?.url : item?.cover?.small?.url } alt="" />
                                    </div>
                                </Link>
                            </div>

                        ))}



</> 
 
                    </div>



 






                    {/* Load more buttn  */}
                    <div className="grid grid-cols-12">
                        <div className="col-span-12">
                            <div className="flex items-center justify-center pt-[4rem] ">
                            {
                nextPage &&    <button onClick={() => loadMore()} className="button secondary">
                                    <div className="button_container glitch uppercase">
                                        {/* <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g clipPath="url(#clip0_829_47187)">
                                                <path opacity="0.2" d="M10.2266 17.1602C14.3687 17.1602 17.7266 13.8023 17.7266 9.66016C17.7266 5.51802 14.3687 2.16016 10.2266 2.16016C6.08443 2.16016 2.72656 5.51802 2.72656 9.66016C2.72656 13.8023 6.08443 17.1602 10.2266 17.1602Z" fill="white" />
                                                <path d="M13.125 3.46484C14.4334 4.07505 15.5402 5.04627 16.3153 6.26423C17.0903 7.48219 17.5014 8.89619 17.5 10.3398C17.5 12.329 16.7098 14.2366 15.3033 15.6431C13.8968 17.0497 11.9891 17.8398 10 17.8398C8.01088 17.8398 6.10323 17.0497 4.6967 15.6431C3.29018 14.2366 2.5 12.329 2.5 10.3398C2.49865 8.89619 2.90969 7.48219 3.68475 6.26423C4.45982 5.04627 5.56665 4.07505 6.875 3.46484" stroke="white" strokeOpacity="0.6" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_829_47187">
                                                    <rect width="20" height="20" fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg> */}
                                        Load more
                                    </div>
                                </button>
}
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    )
}
Marketplace.layout = page => <Layout children={page} title="" />
export default Marketplace
