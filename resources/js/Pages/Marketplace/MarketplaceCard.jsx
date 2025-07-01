import Button from '@/Components/Button'
import { GTMLogs } from '@/utils/GTMLogs'
import { Link } from '@inertiajs/react'
import React from 'react'
import {AsyncImage} from "loadable-image";
import {Blur} from "transitions-kit";

const MarketplaceCard = ({ company, logoHeight, logoMT, p_my, btn_mt }) => {

    // const handleGTMPartnerprofile = () => {
    //     GTMLogs({
    //         'event': 'GTMevent',
    //         'event_name': 'partner_marketplace_profile',
    //         'category_name': company?.categories?.length > 0 && company?.categories[0]?.name,
    //         'partner_name': company?.slug,
    //         'marketplace_profile_id': company?.id,
    //         'event_id': '6248223',
    //     })
    // }

    return (
        <div className=' flex flex-col justify-between items-center h-full '>

            {company?.categories?.length > 0 &&
                <Link href={route('marketplace.category', [company?.categories[0]?.slug])} >
                    <p className='text-16 fw-bold leading-[20px]'>{company?.categories[0]?.name}</p>
                </Link>
            }

            <div className={`${logoMT}`}>
                <Link href={route("marketplace.profile", company?.slug)}>
                    <div className="mx-auto object-contain">
                        <AsyncImage
                            src={company.logo}
                            style={{ width: "auto", maxHeight: 55,aspectRatio:50 / 11, marginLeft:"auto", marginRight:"auto",objectFit:"contain" }}
                            Transition={props => <Blur radius={10} {...props}/>}
                            loader={<div style={{ background: 'transparent' }}/>}
                            error={<div style={{ background: 'transparent' }}/>}/>
                    </div>
                </Link>

                <p className={`${p_my} text-14 h-[55px] break-words overflow-hidden overflow-ellipsis mx-auto w-[270px] md:w-[290px] xl:w-[326] fw-regular text-white opacity-60 text-center leading-[19px] `}>{company?.short_description}</p>

                <Link href={route("marketplace.profile", company?.slug)}>
                    <p className='mx-auto text-12 fw-medium text-center leading-[20px] flex items-center justify-center lg:h-6  xl:h-auto'>
                        {company.promo_line.substring(0, 32)}
                    </p>
                </Link>

            </div>
            <Link href={route("marketplace.profile", company?.slug)} className={`${btn_mt} button secondary h-slider-btn h-[28px] md:h-[48px] border  border-rounded-8 w-full pt-[0.05vw] max-w-[298px] `} >
                <button className="text-[12px] fw-bold leading-[14px]">
                    LEARN MORE
                </button>
            </Link>

        </div >
    )
}

export default MarketplaceCard
