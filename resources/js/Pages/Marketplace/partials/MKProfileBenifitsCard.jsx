import { GTMLogs } from '@/utils/GTMLogs';
import { Link } from '@inertiajs/react';
import React from 'react'
import { useState } from 'react'
import { SliderButton } from '@typeform/embed-react'
import { useEffect } from 'react';
const MKProfileBenifitsCard = ({ title,
    CCBenefits,
    is_benefits,
    plans,
    isPlans,
    promoCode,
    webLink,
    redeemLink,
    instruction,
    inst_note,
    setSwitchTab,
    showsidebar,
    setShowsidebar,
    selectedIndex,
    setSelectedIndex,
    selectedURL,
    setSelectedURL,
    isLinkEmbedded,
    slug

}) => {


    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };


    const [isPlanDrop, setIsPlanDrop] = useState(false);
    const togglePlanDropdown = () => {
        setIsPlanDrop(!isPlanDrop);
    };

    const [selectedPromoCode, setSelectedPromoCode] = useState(promoCode[0])

    const couponcode = selectedPromoCode?.promo_code;
    const [isCopied, setIsCopied] = useState(false);
    const handleCopyClick = () => {
        const referralCode = couponcode;

        if (referralCode) {
            navigator.clipboard.writeText(referralCode);
            setIsCopied(true);

            // Reset the "Copied" state after a certain duration if needed
            setTimeout(() => {
                setIsCopied(false);
            }, 2000);
        }
    };

    // Function to handle change in the <select> element
    const handleSelectChange = (event) => {
        setSelectedURL(event.target.value);
    };



    useEffect(() => {
        if (showsidebar) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [showsidebar]);



    return (
        <>
            <div id='benifitsId' className="z-[6] lg:sticky top-3 mt-5 lg:mt-0 min-w-[300px] lg:h-fit bg-[#1a1a1a]  rounded-[20px] pt-12 pb-[22px] px-[27px] ">
                <p className='leading-[40px] text-35 fw-bold mb-3 '>
                    {title}
                </p>

                {is_benefits && <>
                    <p className='fw-medium text-[12px]'>
                        CAPITAL CLUB EXCLUSIVE BENEFIT
                    </p>
                    <p className='fw-semibold text-[14px] mt-6 uppercase'>
                        CC Members receive:
                    </p>

                    <div className='ml-4 fs-14 fw-regular opacity-60 list-disc mt-2.5 long-desc-list-style render-html-heading-size' >
                        {/* {CCBenefits?.map((data, index) => (
                        <p key={index}>{data}</p>
                    ))} */}
                        <div dangerouslySetInnerHTML={{ __html: CCBenefits }} className='text-[14px] leading-[20px]' />
                    </div>
                </>}
                {isPlans && <>
                    <div>
                        <div className='flex justify-between items-center mt-10'>
                            <p className='text-16 font-semibold uppercase'>Select a plan</p>
                            <a onClick={() => setSwitchTab(2)} href='#plansSection' className='font-medium text-xs underline cursor-pointer'>View Plan Details</a>
                        </div>
                        <div className='relative w-full px-2.5 my-3 h-7 md:h-10 flex items-center justify-between mx-auto  md:max-w-full 2xl:max-w-[319px] border border-rounded-8 cursor-pointer'
                            onClick={toggleDropdown}>
                            <p className="ml-4 mt-0.5 text-base font-medium">{selectedIndex.length > 19 ? selectedIndex.slice(0, 19) + '...' : selectedIndex}  </p>
                            <svg className='absolute right-3 transform transition-transform duration-500' width="13" height="7" viewBox="0 0 13 7" fill="none" xmlns="http://www.w3.org/2000/svg"
                                style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                                <path d="M11.25 1.125L6.5 5.875L1.75 1.125" stroke="white" strokeWidth="2.16667" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <div className={` dropdown-options plan-dropdown absolute left-0 top-20 w-full bg-[#2e2e2e]   z-[999999] border-rounded-8 mt-1 overflow-hidden transition-all ease-out duration-200 ${isOpen ? 'max-h-open' : 'max-h-close'}`}>
                                {plans.map((item, index) => (
                                    <div key={index} className="text-white px-4 py-2 hover:bg-[#1a1a1a] cursor-pointer option"
                                        onClick={() => {
                                            setSelectedIndex(item.name);
                                            setSelectedURL(item.url);
                                            setIsOpen(false);
                                        }}>
                                        {item.name}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </>
                }
                <div className={!isPlans && 'mt-[7.68rem]'}>
                    <button onClick={() => {
                        GTMLogs({
                            'event': 'GTMevent',
                            'event_name': 'marketplace_open_instructions',
                            'partner_profile_slug': title,
                            'event_id': '10019',
                        }); setShowsidebar(true)
                    }} className="button   isBy-now primary border-rounded-8 md:max-w-full 2xl:max-w-[319px] mx-auto w-full">
                        <div className="button_container glitch uppercase">
                            {isPlans ? 'BUY NOW' : 'REDEEM BENEFIT'}
                        </div>
                    </button>

                    <div className='my-4 w-full flex justify-center'>
                        <a onClick={() => {
                            GTMLogs({
                                'event': 'GTMevent',
                                'event_name': 'marketplace_visit_website',
                                'partner_profile_slug': title,
                                'event_id': '10022',
                            })
                        }} href={webLink} target='_blank' className='underline fw-medium text-[14px]'>Visit Website</a>
                    </div>
                </div>

            </div>


            {isOpen && <div onClick={() => { setIsOpen(false) }} className='inset-0 w-full h-full fixed z-[5]'></div>}


            {/* sidebar */}

            <div className={`   flex overflow-hidden `}>
                <div className={` fixed z-[999999] top-0 right-0 bg-white text-white w-full max-w-[692px] min-h-screen h-[500px] ${isPlanDrop ? 'overflow-y-hidden' : 'overflow-y-scroll'} transition-transform transform ${showsidebar ? '-translate-x-0 h-screen' : 'h-0 translate-x-full '} ease-in-out duration-300 `}
                >
                    <div className="px-[34px] lg:px-10 py-7  lg:py-11  overflow-y-auto">
                        <div className='w-full flex justify-end'>
                            <svg onClick={() => { setShowsidebar(false); setIsPlanDrop(false) }} className='cursor-pointer w-[32px] h-[32px] md:w-[52px] md:h-[52px] relative z-[9999999]' width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="26" cy="26" r="26" fill="#F0F0F0" />
                                <path d="M34.1875 17.8125L18.8125 33.1875" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M18.8125 17.8125L34.1875 33.1875" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>

                        </div>
                        <div className='mt-5 lg:mt-[3.7rem] lg:px-7'>
                            <h1 className="text-[30px] md:text-[40px] font-bold text-[#1A1A1A] leading-[40px] md:leading-[53px]">Instructions</h1>
                            <div className="mt-5  text-[16px] text-[#303030] font-medium render-html-heading-size">
                                <div dangerouslySetInnerHTML={{ __html: instruction }} className={` ${promoCode?.length > 0 ? 'mb-[30px]' : 'mb-[14px]'}   long-desc-list-style  text-[14px] leading-[20px] break-words `} />
                            </div>



                            <p className='text-[#1A1A1A] mb-2.5 fw-bold text-[16px] leading-[25px] mt-[5px]'>
                                {selectedPromoCode?.title}
                            </p>



                            {promoCode?.length > 0 &&
                                <div className='border-rounded-8 h-[28px]  cursor-pointer md:h-[38px] border border-[#000] flex justify-between w-full max-w-[299px] md:max-w-[315px] '>
                                    <div onClick={togglePlanDropdown} className='relative fs-16 fw-medium py-[3px] md:py-[7px] px-5 uppercase text-black w-full flex justify-between items-center'> <p>  {selectedPromoCode?.promo_code?.length > 20 ? selectedPromoCode?.promo_code?.slice(0, 20) + '...' : selectedPromoCode?.promo_code}  </p>

                                        <svg className={` ${isPlanDrop && 'rotate-180'} transition-all ease-out duration-500`} width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10.75 1.625L6 6.375L1.25 1.625" stroke="#1A1A1A" stroke-width="2.16667" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>

                                        <div className={` dropdown-options plan-dropdown promo-code-bg absolute left-0 top-20 w-full bg-[#2e2e2e]   z-[99] border-rounded-8 mt-1 overflow-hidden transition-all ease-out duration-200 ${isPlanDrop ? 'promo-code-open' : 'max-h-close'}`}>
                                            {promoCode.map((item, index) => (
                                                <>
                                                    <div className="text-white px-4 py-2 hover:bg-[#1a1a1a] cursor-pointer option plan-options"
                                                        onClick={() => {
                                                            setSelectedPromoCode(item);
                                                            setIsPlanDrop(false);
                                                        }}>
                                                        {item.promo_code?.length > 28 ? item.promo_code?.slice(0, 30) + '...' : item.promo_code}
                                                    </div>
                                                </>
                                            ))}
                                            {isPlanDrop && <div onClick={() => { setIsPlanDrop(false) }} className='inset-0 w-full h-full fixed z-[-1]'></div>}
                                        </div>

                                    </div>


                                    {/* copy code icon */}
                                    <p onClick={() => {
                                        GTMLogs({
                                            'event': 'GTMevent',
                                            'event_name': 'marketplace_promo_code_copy',
                                            'partner_profile_slug': title,
                                            'event_id': '10020',
                                        }); handleCopyClick()
                                    }} title="Copy Promo Code" className='bg-[#E3E3E3] w-[50px] cursor-pointer rounded-r-[8px] border-l border-[#000] flex justify-center items-center'>
                                        {isCopied ?
                                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M4.83268 4.83342V1.50008C4.83268 1.27907 4.92048 1.06711 5.07676 0.910826C5.23304 0.754545 5.445 0.666748 5.66602 0.666748H16.4993C16.7204 0.666748 16.9323 0.754545 17.0886 0.910826C17.2449 1.06711 17.3327 1.27907 17.3327 1.50008V12.3334C17.3327 12.5544 17.2449 12.7664 17.0886 12.9227C16.9323 13.079 16.7204 13.1667 16.4993 13.1667H13.166V16.4942C13.166 16.9576 12.7918 17.3334 12.3268 17.3334H1.50518C1.39495 17.3335 1.28578 17.3119 1.18392 17.2698C1.08206 17.2276 0.989503 17.1658 0.911558 17.0879C0.833612 17.0099 0.771804 16.9174 0.72967 16.8155C0.687537 16.7137 0.665906 16.6045 0.666016 16.4942L0.668516 5.67258C0.668516 5.20925 1.04268 4.83342 1.50768 4.83342H4.83268ZM6.49935 4.83342H12.3268C12.7902 4.83342 13.166 5.20758 13.166 5.67258V11.5001H15.666V2.33341H6.49935V4.83342ZM6.08518 14.0001L10.7985 9.28592L9.62018 8.10758L6.08518 11.6434L4.31602 9.87508L3.13768 11.0534L6.08518 14.0001Z" fill="#0D0D0D" />
                                            </svg>
                                            :
                                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M4.1675 4.1675V0.8335C4.1675 0.612442 4.25532 0.400438 4.41163 0.244126C4.56794 0.0878149 4.77994 0 5.001 0H15.8365C16.0576 0 16.2696 0.0878149 16.4259 0.244126C16.5822 0.400438 16.67 0.612442 16.67 0.8335V11.669C16.67 11.8901 16.5822 12.1021 16.4259 12.2584C16.2696 12.4147 16.0576 12.5025 15.8365 12.5025H12.5025V15.8307C12.5025 16.2941 12.1283 16.67 11.6632 16.67H0.839335C0.729081 16.6701 0.619888 16.6485 0.518006 16.6063C0.416123 16.5642 0.323552 16.5024 0.245591 16.4244C0.16763 16.3464 0.105809 16.2539 0.0636675 16.152C0.0215259 16.0501 -0.000109236 15.9409 4.14716e-07 15.8307L0.00250093 5.00683C0.00250093 4.54341 0.376742 4.1675 0.841835 4.1675H4.1675ZM5.8345 4.1675H11.6632C12.1266 4.1675 12.5025 4.54174 12.5025 5.00683V10.8355H15.003V1.667H5.8345V4.1675ZM10.8355 5.8345H1.6695L1.667 15.003H10.8355V5.8345Z" fill="#1A1A1A" />
                                            </svg>

                                        }
                                    </p>
                                </div>}

                            <p className='text-[#1A1A1A] mt-2.5 fw-normal text-[14px] leading-[20px] max-w-[320px] '>
                                {selectedPromoCode?.description}
                            </p>

                            {!isPlans && isLinkEmbedded ?

                                <div onClick={() => {
                                    setShowsidebar(false); GTMLogs({
                                        'event': 'GTMevent',
                                        'event_name': 'marketplace_external_url',
                                        'event_id': '10021',
                                    })
                                }}>
                                    <SliderButton
                                        id={redeemLink}
                                        className='text-[14px] md:text-[20px] leading-[26px] h-[26px] md:h-[38px] pt-0.5 mt-4 flex items-center justify-center border-rounded-8 fw-bold w-full bg-black text-white max-w-[299px] md:max-w-[320px] mb-9'
                                    >
                                        REDEEM BENEFIT
                                    </SliderButton>
                                </div>
                                :
                                <a onClick={() => {
                                    GTMLogs({
                                        'event': 'GTMevent',
                                        'event_name': 'marketplace_external_url',
                                        'event_id': '10021',
                                    })
                                }} href={isPlans ? selectedURL : redeemLink} target='_blank' >
                                    <button className='text-[14px] md:text-[20px] leading-[26px] h-[26px] md:h-[38px] pt-0.5 mt-4 flex items-center justify-center border-rounded-8 fw-bold w-full bg-black text-white max-w-[299px] md:max-w-[320px] mb-9'>REDEEM BENEFIT</button>
                                </a>
                            }

                            <p className='text-[16px] font-medium text-[#1A1A1A] mb-9 break-words'><b>Note:</b> {inst_note}</p>
                            <a onClick={() => {
                                GTMLogs({
                                    'event': 'GTMevent',
                                    'event_name': 'marketplace_visit_website',
                                    'event_id': '10022',
                                })

                            }} href="https://support.capital.club"
                                target="_blank"
                                className='text-[12px] font-bold text-[#1A1A1A] underline leading-[25px]'>NEED HELP?</a>
                        </div>
                    </div>
                </div>


                {showsidebar &&
                    <div className='inset-0 w-full h-full bg-[#1A1A1A66] fixed z-10'></div>
                }


            </div>



        </>
    )
}
export default MKProfileBenifitsCard
