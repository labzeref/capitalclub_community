import Button from '@/Components/Button'
import { Link } from '@inertiajs/react'
import React from 'react'

const MarketplaceCard = ({ company }) => {
    return (
        <div className=' flex flex-col justify-between items-center h-full'>

            <p className='fs-16 fw-bold'>{company?.companyName}</p>

            <div className='py-8'>
                <img src={company.logo} alt='company logo' className='mx-auto h-[90px]  object-conver' />
                <p className='fs-14 fw-regular mk-text-color text-center mt-6 leading-[19px] '>{company?.description}</p>
            </div>

            <Link href={route("marketplace-profile")} className={" button secondary  border  rounded-full w-full pt-[0.05vw]"} >
                <button className="text-[12px] fw-bold">
                    LEARN MORE
                </button>
            </Link>

        </div>
    )
}

export default MarketplaceCard
