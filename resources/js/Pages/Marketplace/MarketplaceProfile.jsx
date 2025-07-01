import Layout from '@/Layouts/Layout';
import marketplace1 from "../../../assets/svg/Marketplace1.svg";
import marketplace2 from "../../../assets/svg/Marketplace2.svg";
import marketplace3 from "../../../assets/svg/Marketplace3.svg";
import marketplace5 from "../../../assets/svg/Marketplace5.svg";
import MarketplaceCard from './MarketplaceCard';
import OwlCarousel from "react-owl-carousel";
// new 27 feb , main banner
import mainbanner from "../../../assets/marketplace/6.jpg";

import mk1 from "../../../assets/marketplace/1.jpg";
import mk2 from "../../../assets/marketplace/2.jpg";
import mk3 from "../../../assets/marketplace/3.jpg";
import mk4 from "../../../assets/marketplace/4.jpg";
import mk5 from "../../../assets/marketplace/5.jpg";
import MKProfileBenifitsCard from './partials/MKProfileBenifitsCard';
import MKProfileDescription from './partials/MKProfileDescription';
import MKProfileHeader from './partials/MKProfileHeader';
import MKProfileReviews from './partials/MKProfileReviews';
import Pricing from './partials/Pricing';
import { Head, Link } from '@inertiajs/react';
import React, { useState, useEffect, useRef } from 'react';
import { GTMLogs } from '@/utils/GTMLogs';



const MarketplaceProfile = ({ partnerProfile, relatedPartnerProfiles }) => {

    const toTop = () => {
        window.scrollTo(0, 0);
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [switchTab, setSwitchTab] = useState(0)

    useEffect(() => {
        GTMLogs({
            'event': 'GTMevent',
            'event_name': 'marketplace_profile',
            'event_id': '10016',
            'partner_profile_slug': partnerProfile?.title,
        })
    }, [])
    const upComingRef = useRef(null);
    const [comingSoon, setcomingSoon] = useState({
        options: {
            loop: true,
            margin: 18,
            items: 3,
            autoplay: false,
            nav: false,
            dots: false,
            autoWidth: true,
            responsiveClass: false,
            slideBy: 1,

            responsive: {
                0: {
                    items: 1.1,
                    slideBy: 1,
                },
                600: {
                    items: 2,
                },
                1200: {
                    items: 3,
                }
            }
        }
    })

    const [showsidebar, setShowsidebar] = useState(false)
    const [selectedURL, setSelectedURL] = useState(partnerProfile?.plans[0]?.url);
    const [selectedIndex, setSelectedIndex] = useState(partnerProfile?.plans[0]?.name);



    return (

        <div className='container mx-auto px-[15px] xl:px-3'>

            <Head title="Marketplace" />

            <p className='text-[12px] md:text-[16px] fw-regular text-[#9e9e9e] mt-[34px] md:leading-[19px] leading-[14px]'>
                <Link href={route('marketplace.index')} className='uppercase' >   Marketplace </Link> /  <Link href={route('marketplace.category', [partnerProfile?.categories[0]?.slug])} > {partnerProfile?.categories[0]?.name} </Link> / <span className='text-white'> {partnerProfile?.title} </span>
            </p>

            <div className='mt-4 2xl:mt-7 lg:gap-x-7 grid grid-cols-12'>
                <div className=" gap-y-4  md:gap-y-6 flex flex-col relative flex-grow  col-span-12 lg:col-span-8 xl:col-span-9 ">

                    <div className='lg:flex   gap-x-7 w-full'>

                        {/* left header images section  */}
                        <MKProfileHeader imgs={partnerProfile?.banners} />
                        {/* <div className='mt-6 border-b text-[14px] cursor-pointer font-regular border-[#3d3d3d] lg:hidden flex gap-x-5 uppercase'>
                            <p onClick={() => setSwitchTab(0)} className={switchTab == 0 && 'font-bold border-b-2 border-white'}>Overview</p>
                            <p onClick={() => setSwitchTab(1)} className={switchTab == 1 && 'font-bold border-b-2 border-white'}>Benefits</p>
                            {partnerProfile?.plans?.length > 0 &&
                                <p onClick={() => setSwitchTab(2)} className={switchTab == 2 && 'font-bold border-b-2 border-white leading-[17px]'}>Plans and features</p>}
                        </div> */}

                        {/* right card  */}
                        {/* ${switchTab == 1 ? 'block' : 'hidden lg:block'} */}
                        <div className='block lg:hidden'>
                            <div className={`
                            lg:hidden block w-full 2xl:max-w-[372px] `}>
                                <MKProfileBenifitsCard
                                    title={partnerProfile?.title}
                                    CCBenefits={partnerProfile?.cc_benefits}
                                    is_benefits={partnerProfile?.is_benefits}
                                    plans={partnerProfile?.plans && partnerProfile?.plans}
                                    isPlans={partnerProfile?.plans?.length > 0 ? true : false}
                                    promoCode={partnerProfile?.promoCodes}
                                    webLink={partnerProfile?.website_link}
                                    instruction={partnerProfile?.instructions}
                                    inst_note={partnerProfile?.instructions_note}
                                    setSwitchTab={setSwitchTab}
                                    slug={partnerProfile?.slug}

                                    redeemLink={partnerProfile?.redeem_link}
                                    isLinkEmbedded={partnerProfile?.redeem_link_embedded}

                                    showsidebar={showsidebar}
                                    setShowsidebar={setShowsidebar}
                                    selectedIndex={selectedIndex}
                                    setSelectedIndex={setSelectedIndex}
                                    selectedURL={selectedURL}
                                    setSelectedURL={setSelectedURL}

                                />
                            </div>
                        </div>

                    </div>



                    {/* // ${switchTab == 0 ? 'block' : 'hidden lg:block'}  */}

                    <div className={`w-[100%] `}>
                        <MKProfileDescription cateName={partnerProfile?.categories[0]?.name} logo={partnerProfile?.logo} longDesc={partnerProfile?.long_description} />
                        {/* Reviews Module */}
                        {/* <MKProfileReviews reviwes={partnerProfile?.reviews} isTrustPilot={partnerProfile?.is_trust_pilot} trustPilotScript={partnerProfile?.trust_pilot_link} /> */}

                    </div>

                </div>




                <div className={`hidden lg:block w-full 2xl:max-w-[372px] col-span-12 lg:col-span-4 xl:col-span-3`}>
                    <MKProfileBenifitsCard
                        title={partnerProfile?.title}
                        CCBenefits={partnerProfile?.cc_benefits}
                        is_benefits={partnerProfile?.is_benefits}
                        plans={partnerProfile?.plans && partnerProfile?.plans}
                        isPlans={partnerProfile?.plans?.length > 0 ? true : false}
                        promoCode={partnerProfile?.promoCodes}

                        webLink={partnerProfile?.website_link}
                        instruction={partnerProfile?.instructions}
                        inst_note={partnerProfile?.instructions_note}
                        setSwitchTab={setSwitchTab}
                        slug={partnerProfile?.slug}


                        redeemLink={partnerProfile?.redeem_link}
                        isLinkEmbedded={partnerProfile?.redeem_link_embedded}

                        showsidebar={showsidebar}
                        setShowsidebar={setShowsidebar}
                        selectedIndex={selectedIndex}
                        setSelectedIndex={setSelectedIndex}
                        selectedURL={selectedURL}
                        setSelectedURL={setSelectedURL}
                    />

                </div>



            </div>

            {/* ${switchTab == 2 ? 'block' : 'hidden lg:block'} */}
            {partnerProfile?.plans?.length > 0 &&
                <div className={`
                 md:gap-5 mt-5 md:mt-6 `}>
                    {/* pricing cards module  */}
                    <Pricing
                        pricingData={partnerProfile?.plans}
                        setSwitchTab={setSwitchTab}

                        setShowsidebar={setShowsidebar}
                        setSelectedIndex={setSelectedIndex}
                        setSelectedURL={setSelectedURL}
                    />
                </div>
            }

            {/* Related Companies */}
            {relatedPartnerProfiles.length > 0 && <p className='text-20 fw-semibold text-center mt-[2.87rem] leading-[24px] mb-8 lg:mb-0'>EXPLORE OTHER BENEFITS</p>
            }
            <div className='hidden lg:block'>
                <div className="grid  grid-cols-12 gap-5 md:gap-[30px] xl:gap-[51px] relative my-[2.5rem] ">
                    {relatedPartnerProfiles.map((company, index) => (
                        <div key={index + 3} className="col-span-12 md:col-span-6 lg:col-span-4  bg-[#1A1A1A] marketplace-card">
                            <MarketplaceCard
                                company={company}
                                logoHeight={'lg:w-[270px] lg:h-[45px] xl:w-[327px] xl:h-[72px]'}
                                logoMT={'mt-[60px]'}
                                p_my={'my-[38px]'}
                                btn_mt={'mt-[2rem] '} />
                        </div>
                    ))}
                </div>
            </div>


            {/* mobile slider --- RELATED PROFILES  */}
            <div className='block lg:hidden'>
                <OwlCarousel {...comingSoon?.options}
                    ref={upComingRef}
                    className="owl-theme relative">
                    {relatedPartnerProfiles.map((company, index) => (
                        <div key={index + 3} className="bg-[#1A1A1A] MK-profile-slildr-card">
                            <MarketplaceCard
                                company={company}
                                logoHeight={'w-[120px] h-[35px]'}
                                logoMT={'mt-[36px]'}
                                p_my={'my-[32px]'}
                                btn_mt={'mt-[2rem] '} />
                        </div>
                    ))}
                </OwlCarousel>
            </div>




            <div className='flex justify-center flex-col items-center mt-[43px] md:mt-[83px] md:mb-[36px]'>
                <div onClick={toTop} className='flex items-center flex-col cursor-pointer'>

                    <svg width="35" height="35" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g filter="url(#filter0_d_3079_313)">
                            <path d="M8.0026 1.73503C4.3226 1.73503 1.33594 4.72169 1.33594 8.40169C1.33594 12.0817 4.3226 15.0684 8.0026 15.0684C11.6826 15.0684 14.6693 12.0817 14.6693 8.40169C14.6693 4.72169 11.6826 1.73502 8.0026 1.73503ZM8.0026 13.735C5.05594 13.735 2.66927 11.3484 2.66927 8.40169C2.66927 5.45503 5.05594 3.06836 8.0026 3.06836C10.9493 3.06836 13.3359 5.45503 13.3359 8.40169C13.3359 11.3484 10.9493 13.735 8.0026 13.735ZM8.0026 5.73503L10.6693 8.40169L9.72927 9.34169L8.66927 8.28836L8.66927 11.0684L7.33594 11.0684L7.33594 8.28836L6.27594 9.34836L5.33594 8.40169L8.0026 5.73503Z" fill="white" />
                        </g>
                        <defs>
                            <filter id="filter0_d_3079_313" x="-14.6641" y="-14.2656" width="45.3359" height="45.334" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                <feOffset />
                                <feGaussianBlur stdDeviation="8" />
                                <feComposite in2="hardAlpha" operator="out" />
                                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.6 0" />
                                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3079_313" />
                                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3079_313" result="shape" />
                            </filter>
                        </defs>
                    </svg>
                    <p className='text-12 lh-20 fw-medium mt-1.5'>

                        RETURN TO TOP
                    </p>
                </div>
            </div>






        </div >
    )
}

MarketplaceProfile.layout = page => <Layout children={page} title="" />
export default MarketplaceProfile
