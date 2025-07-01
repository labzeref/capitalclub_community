import { GTMLogs } from '@/utils/GTMLogs'
import { Link } from '@inertiajs/react'
import React from 'react'
import {AsyncImage} from "loadable-image";
import {Blur} from "transitions-kit";

const MarketplaceSlide = ({ profile_id, category, linkId = '', shortDecs = '', desktop_image, mobile_image, logo, ...props }) => {

    // const handleGTMPartnerprofile = () => {
    //     GTMLogs({
    //         'event': 'GTMevent',
    //         'event_name': 'partner_marketplace_profile',
    //         'category_name': category,
    //         'partner_name': linkId,
    //         'marketplace_profile_id': profile_id,
    //         'event_id': '6248223',
    //     })
    // }

    return (
        <div className='h-[100%] block overflow-hidden'>

            <div className={"mk-slide-bg relative overflow-hidden min-h-[500px] lg:min-h-[709px] large-card-hover-div flex "}  >

                {/* For Desktop  */}

                <div className='mk-slider-gradiant'>  </div>
                <div className='mk-slider-shadow'></div>
                {/* <img src={desktop_image} className="h-[100%] w-full hide-sm-img header-image input-shadow" /> */}
                <div className='    px-[51px]   w-full  my-auto -translate-y-6 '>
                    <Link href={route("marketplace.profile", linkId)} >

                        <div className="mk-desk-slide-logo">
                            <AsyncImage
                                src={logo}
                                style={{ width: "auto", height: "100%",maxHeight:131, aspectRatio:50 / 11, marginLeft:"auto", marginRight:"auto",objectFit:"contain" }}
                                Transition={props => <Blur radius={10} {...props}/>}
                                loader={<div style={{ background: 'transparent' }}/>}
                                error={<div style={{ background: 'transparent' }}/>}/>
                        </div>
                    </Link>
                    <p className='mk-desk-slide-p max-w-[427px] h-[75px] '>
                        {shortDecs?.length > 115 ? shortDecs.slice(0, 115) + '...' : shortDecs}
                    </p>
                    <div className='flex justify-center
                    '>
                        <Link href={route("marketplace.profile", linkId)} className={" button secondary  border  border-rounded-8 min-h-[28px] md:min-h-[38px] w-[225px] lg:w-[303px]  pt-[2px]"} >
                            <button className="text-[14px] lg:text-[20px] leading-[25px] fw-bold">
                                LEARN MORE
                            </button>
                        </Link>
                    </div>
                </div>

                {/* For Mobile  */}
                {/* <img src={mobile_image} className="h-[100%] w-full hide-md-img header-image input-shadow" />
                <div className='hide-md-img'>
                    <img src={logo} alt='company logo' className='mk-mobile-slide-logo' />
                </div>
                <p className='hide-md-img text-[12px] text-center mk-mobile-slide-p'>
                    {shortDecs}
                </p> */}

                {/* <div className='hide-md-img absolute bottom-10 -translate-x-1/2 left-1/2  '>
                    <Link href={route("marketplace.profile", linkId)} className="button isLogin primary rounded-full w-[144px]">
                        <div className="button_container glitch uppercase text-[12px] fw-bold">
                            LEAN MORE
                        </div>
                    </Link>
                </div> */}
            </div>
            {/* <div className='academy-new-shadow bottom -mt-[10rem]  md:-mt-[15rem] lg:-mt-[14rem] static -z-[9999]'></div> */}

        </div>
    )
}

export default MarketplaceSlide
