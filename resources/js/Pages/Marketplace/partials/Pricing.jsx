import { GTMLogs } from '@/utils/GTMLogs'
import React from 'react'

const Pricing = ({ pricingData, setSwitchTab, setSelectedIndex, setSelectedURL, setShowsidebar }) => {

    return (
        <>

            <p id='plansSection' className='  text-20 fw-semibold mt-12 mb-8 md:mb-9 text-center uppercase leading-[24px]'>Plans & features</p>
            <div className=" lg:mt-12 grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 space-y-0">
                {pricingData?.map((data, index) => (
                    <div key={index} className="card-bg-discord flex justify-between flex-col px-[25px] xl:px-[68px]  md:pt-[60px] md:pb-[86px] pt-[30px] pb-[50px] border-rounded-20  shadow-sm">
                        <div>
                            <div>
                                {/* title  */}
                                <p className="text-20  fw-semibold text-center leading-[24px]">{data?.name}</p>
                                {/* price  */}
                                <p className="text-center mt-8 text-[35px] leading-[40px] fw-bold">${data?.offer_price}
                                    <p className='text-[25px] fw-regular line-through leading-[30px]'>${data?.real_price}</p> </p>
                            </div>

                            <div className="mt-8">
                                <ul role="list" className="mt-6 space-y-4">
                                    <li className="flex space-x-3 items-center">
                                        <svg width="15" height="10" viewBox="0 0 15 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1.75 5L5.5 8.75L13 1.25" stroke="white" strokeWidth="2.16667" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>


                                        <span className="text-[14px] md:text-[18px] fw-bold leading-[30px] md:leading-[35px]"> All features above included </span>
                                    </li>

                                    {data?.features?.map((feature, idx) => (

                                        <li key={idx} className="flex space-x-3">
                                            <span className='mt-1'>
                                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M3.75 9L7.5 12.75L15 5.25" stroke="white" strokeWidth="2.16667" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>

                                            </span>

                                            <span className="text-[14px] md:text-[18px] fw-regular leading-[30px] md:leading-[35px] ">{feature}</span>
                                        </li>
                                    ))}

                                </ul>
                            </div>
                        </div>
                        <a onClick={() => {
                            setSwitchTab(1);
                            setSelectedIndex(data?.name);
                            setSelectedURL(data?.url);
                            setShowsidebar(true)
                        }}
                            // onClick={() => {
                            //     GTMLogs({
                            //         'event': 'GTMevent',
                            //         'event_name': 'plan_link_marketplace',
                            //         'plan_name': data?.name,
                            //         'plan_id': data?.id,
                            //         'event_id': '6248227',
                            //     })
                            // }}
                            href={'#benifitsId'}>

                            <button className="button isBy-now primary border-rounded-8 2xl:max-w-[319px] mt-8 md:mt-[26px] mx-auto w-full">
                                <div className="button_container glitch uppercase">
                                    BUY NOW
                                </div>
                            </button>
                        </a>

                    </div>
                ))}
            </div>
        </>
    )
}

export default Pricing
