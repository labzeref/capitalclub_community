import Layout from '@/Layouts/Layout'
import React from 'react'
import mkProfile from "../../../assets/img/mkProfile.jpg";
import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import axios from 'axios';
import IconButton from '@/Components/IconButton';
import { ReactComponent as Star } from "../../../assets/svg/star.svg";

import marketplace1 from "../../../assets/svg/Marketplace1.svg";
import marketplace2 from "../../../assets/svg/Marketplace2.svg";
import marketplace3 from "../../../assets/svg/Marketplace3.svg";
import marketplace5 from "../../../assets/svg/Marketplace5.svg";
import MarketplaceCard from './MarketplaceCard';

const MarketplaceProfile = () => {

    const [lessonBookmark, setLessonBookmark] = useState(true)
    const { post, processing } = useForm();
    const handleBookmarkToggle = () => {
        setLessonBookmark(!lessonBookmark)
        axios.post(route("bookmark-toggle.lessons", lesson?.id)).then(() => {
        });

    };

    const companies = [
        {
            companyName: "Solutions Corporation",
            logo: marketplace1,
            description: "A leading provider of innovative solutions. A leading provider of innovative solutions. A leading provider of innovative solutions.",
            link: "https://www.abc-corp.com",
        },
        {
            companyName: "Tech Group Industries",
            logo: marketplace2,
            description: "Specializing in cutting-edge technology and services.",
            link: "https://www.xyz-industries.com",
        },
        {
            companyName: "Services Innovators Ltd.",
            logo: marketplace3,
            description: "Pioneering breakthroughs in the tech industry.",
            link: "https://www.tech-innovators.com",
        }
    ];


    return (
        <div className='container mx-auto px-5 xl:px-3'>

            <div className="grid  grid-cols-12  md:gap-5 mt-4">

                <div className="col-span-12 lg:col-span-4 h-full ">
                    <img src={mkProfile} alt='company profile' className='border-rounded-20 h-full object-fill object-center' />
                </div>

                <div className="col-span-12 lg:col-span-8">
                    <div className='market-profile-des'>

                        {/* Name and FAVORITE */}
                        <div className='flex justify-between items-center'>
                            <p className='fs-16 fw-semibold'> CATEGORY NAME HERE</p>
                            <div>
                                <IconButton
                                    onClick={handleBookmarkToggle}
                                    icon={<Star />}
                                    className={` ${lessonBookmark ? 'primary' : 'secondary '}     icon_button`}
                                ></IconButton>
                            </div>
                        </div>

                        {/* Logo  */}
                        <img src={marketplace5} alt='company logo' className='mt-5 md:mt-7 h-9 md:h-12 ' />
                        {/* descriptions  */}
                        <div className='mk-text-color ' >
                            <p className='fs-18 fw-regular mt-[1.5rem] leading-[27px] '>
                                Join over 450,000 learning student and start gaining the drawing skills you've always wanted.
                                The Ultimate Drawing Course will show you how to create advanced art that will stand up as professional work.
                                This course will enhance or give you skills in the world of drawing advanced art that will stand up as professional work.
                                This course will enhance or give you skills in the world of drawing advanced art that will stand up as professional work.
                                This course will enhance or give you skills in the world of drawing
                                This course will enhance or give you skills in the world of drawing advanced art that will stand up as professional work.
                                This course will enhance or give you skills in the world of drawing:
                            </p>
                            {/* points */}
                            <ul className='list-disc ml-4 mt-4'>
                                <li>Lorem ipsum dolor sit amet </li>
                                <li>Lorem ipsum dolor sit amet </li>
                                <li>Lorem ipsum dolor sit amet </li>
                                <li>Lorem ipsum dolor sit amet </li>
                            </ul>
                        </div>
                    </div>

                    <div className="grid  grid-cols-12  md:gap-5 mt-5">

                        <div className="col-span-12 lg:col-span-6 mk-social ">

                            <div className='flex  gap-x-3 xl:gap-x-5  '>
                                <div className='mk-single-link '>
                                    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M17.0288 3.47852C9.54155 3.47852 3.47852 9.55511 3.47852 17.0423C3.47852 24.5296 9.54155 30.6062 17.0288 30.6062C24.5296 30.6062 30.6062 24.5296 30.6062 17.0423C30.6062 9.55511 24.5296 3.47852 17.0288 3.47852ZM26.4285 11.6168H22.4272C21.9931 9.92133 21.3692 8.29368 20.5554 6.78809C23.0511 7.64261 25.1264 9.37878 26.4285 11.6168ZM17.0423 6.24554C18.1681 7.8732 19.0498 9.67719 19.633 11.6168H14.4517C15.0349 9.67719 15.9165 7.8732 17.0423 6.24554ZM6.54394 19.7551C6.32692 18.887 6.19128 17.9782 6.19128 17.0423C6.19128 16.1064 6.32692 15.1977 6.54394 14.3296H11.1285C11.02 15.2248 10.9386 16.12 10.9386 17.0423C10.9386 17.9647 11.02 18.8599 11.1285 19.7551H6.54394ZM7.65618 22.4679H11.6575C12.0915 24.1634 12.7155 25.791 13.5293 27.2966C11.0336 26.4421 8.9583 24.7195 7.65618 22.4679ZM11.6575 11.6168H7.65618C8.9583 9.36522 11.0336 7.64261 13.5293 6.78809C12.7155 8.29368 12.0915 9.92133 11.6575 11.6168ZM17.0423 27.8392C15.9165 26.2115 15.0349 24.4075 14.4517 22.4679H19.633C19.0498 24.4075 18.1681 26.2115 17.0423 27.8392ZM20.2163 19.7551H13.8684C13.7463 18.8599 13.6514 17.9647 13.6514 17.0423C13.6514 16.12 13.7463 15.2112 13.8684 14.3296H20.2163C20.3384 15.2112 20.4333 16.12 20.4333 17.0423C20.4333 17.9647 20.3384 18.8599 20.2163 19.7551ZM20.5554 27.2966C21.3692 25.791 21.9931 24.1634 22.4272 22.4679H26.4285C25.1264 24.7059 23.0511 26.4421 20.5554 27.2966ZM22.9562 19.7551C23.0647 18.8599 23.1461 17.9647 23.1461 17.0423C23.1461 16.12 23.0647 15.2248 22.9562 14.3296H27.5407C27.7578 15.1977 27.8934 16.1064 27.8934 17.0423C27.8934 17.9782 27.7578 18.887 27.5407 19.7551H22.9562Z" fill="white" />
                                    </svg>
                                </div>

                                <div className='mk-single-link '>
                                    <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.6598 13.0271C6.6673 15.3539 4.67481 17.5649 2.81087 19.8787C2.12957 20.7272 1.4097 20.9971 0.304189 20.7529C0.934074 20.0073 1.53825 19.3003 2.15528 18.5804C3.90353 16.5365 5.65178 14.4926 7.42574 12.4615C7.78567 12.0502 7.84994 11.7802 7.50287 11.2789C5.21472 8.03948 2.96513 4.7358 0.702687 1.45783C0.57414 1.27786 0.458447 1.08504 0.265625 0.776527C2.19384 0.776527 3.99351 0.750817 5.79318 0.802236C6.02457 0.802236 6.29452 1.11075 6.44877 1.34214C8.0042 3.56602 9.53392 5.8156 11.1279 8.11661C12.4905 6.53547 13.8146 5.00575 15.1515 3.46318C15.6271 2.91042 16.1413 2.39623 16.5526 1.80491C17.1697 0.917929 17.9281 0.545141 19.0979 0.89222C16.7069 3.68171 14.3288 6.45834 11.9121 9.26069C14.5473 13.0914 17.1697 16.8964 19.882 20.8428C17.9024 20.8428 16.0899 20.8557 14.2645 20.8171C14.0845 20.8171 13.8531 20.5343 13.7246 20.3415C12.2077 18.1562 10.6909 15.958 9.18684 13.7599C9.04544 13.5542 8.89118 13.3357 8.67265 13.04L8.6598 13.0271ZM17.2982 19.4802C16.5269 18.349 15.8585 17.3721 15.1772 16.3951C12.0406 11.8316 8.90404 7.26819 5.74176 2.70474C5.57465 2.47336 5.31755 2.1777 5.07331 2.15199C4.39201 2.07486 3.69785 2.12628 2.92656 2.12628C3.00369 2.3191 3.01655 2.42194 3.06797 2.49907C6.88584 8.03948 10.6909 13.5927 14.5216 19.1332C14.6501 19.3131 14.9329 19.4545 15.1515 19.4674C15.7942 19.5059 16.4369 19.4802 17.2725 19.4802H17.2982Z" fill="white" />
                                    </svg>
                                </div>

                                <div className='mk-single-link '>
                                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M11.1018 0.848792C12.8114 0.900211 14.5211 0.913066 16.218 1.02876C19.0846 1.23444 21.2827 3.34262 21.3984 6.19638C21.527 9.61576 21.527 13.0608 21.3984 16.4802C21.2956 19.3083 19.0846 21.5064 16.2565 21.6093C12.8372 21.7378 9.39207 21.7378 5.9727 21.6093C3.14465 21.5064 0.933624 19.3083 0.830786 16.4802C0.702238 13.0608 0.702238 9.61576 0.830786 6.19638C0.933624 3.32977 3.13179 1.22158 5.99841 1.0159C7.69524 0.887357 9.40493 0.887357 11.1146 0.835938L11.1018 0.848792ZM11.1018 19.8225C12.67 19.8225 14.2512 19.8739 15.8195 19.8096C18.0562 19.7068 19.5216 18.2927 19.5731 16.0431C19.6502 12.9323 19.663 9.82143 19.5731 6.72343C19.5088 4.35815 18.0948 2.94412 15.7295 2.87985C12.6186 2.80272 9.50776 2.80272 6.40976 2.87985C4.17303 2.93127 2.70758 4.39671 2.65616 6.63345C2.57903 9.7443 2.57903 12.8552 2.65616 15.9532C2.72044 18.3184 4.13446 19.6939 6.49974 19.8096C8.02946 19.8867 9.57203 19.8225 11.1018 19.8225Z" fill="white" />
                                        <path d="M11.0663 16.7125C8.12259 16.6996 5.71875 14.2958 5.71875 11.352C5.71875 8.39542 8.16116 5.95301 11.1178 5.97872C14.0744 6.00443 16.4653 8.39542 16.4653 11.3392C16.4653 14.2958 14.0358 16.7382 11.0663 16.7125ZM14.5757 11.3392C14.5757 9.4238 13.0331 7.86837 11.1178 7.85552C9.17669 7.84266 7.6084 9.39809 7.59555 11.3392C7.59555 13.2545 9.13812 14.81 11.0535 14.8228C12.9946 14.8357 14.5628 13.2802 14.5757 11.3392Z" fill="white" />
                                        <path d="M16.6872 6.99172C15.993 6.99172 15.466 6.47752 15.4531 5.78337C15.4531 5.05064 15.9673 4.51074 16.6872 4.51074C17.3813 4.51074 17.9084 5.02493 17.9212 5.71909C17.9341 6.43896 17.4071 6.97886 16.6872 6.97886V6.99172Z" fill="white" />
                                    </svg>
                                </div>

                                <div className='mk-single-link '>
                                    <svg width="28" height="20" viewBox="0 0 28 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M14.0039 0.770753C17.3204 0.745043 20.5341 0.937865 23.7478 1.32351C25.8303 1.5806 26.8201 2.57042 27.1672 4.62719C27.5657 6.9539 27.4757 9.30632 27.4757 11.6459C27.4757 13.3427 27.4114 15.0396 27.0258 16.6978C26.6787 18.2018 25.5346 19.1788 24.0049 19.3588C19.57 19.8987 15.1094 20.0658 10.6488 19.8858C8.33491 19.7958 6.02104 19.5516 3.70718 19.3331C2.37029 19.2045 1.18765 18.1376 0.943413 16.7492C0.686318 15.2709 0.519198 13.7541 0.493488 12.2629C0.454924 10.0648 0.544911 7.85373 0.647749 5.65557C0.686313 4.94855 0.840573 4.22869 1.07196 3.54738C1.49617 2.30047 2.42171 1.52918 3.72004 1.37493C7.15227 0.95072 10.6102 0.719334 13.991 0.770753H14.0039ZM11.0344 10.3733C11.0344 11.4402 11.0344 12.5072 11.0344 13.5741C11.0473 14.5382 11.4843 14.821 12.307 14.3711C14.3509 13.2785 16.3949 12.1858 18.4259 11.0674C18.683 10.926 18.9658 10.6561 19.0301 10.3861C19.1329 9.97477 18.7216 9.80766 18.4259 9.64055C16.4077 8.54789 14.3895 7.45524 12.3713 6.37544C11.4972 5.91266 11.0601 6.16976 11.0473 7.17243C11.0344 8.23938 11.0473 9.30632 11.0473 10.3733H11.0344Z" fill="white" />
                                    </svg>
                                </div>

                                <div className='mk-single-link '>
                                    <svg width="26" height="20" viewBox="0 0 26 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M16.3451 0.691406C16.4351 0.691406 16.5379 0.691406 16.6279 0.691406C18.1062 1.15418 19.5974 1.6041 21.0757 2.09258C21.2685 2.15685 21.4613 2.32396 21.577 2.49108C22.7211 4.17505 23.5952 5.97472 24.2251 7.90294C24.765 9.56121 24.9964 11.2709 25.1506 12.9934V14.9859C25.2406 15.9372 24.6493 16.4 23.9166 16.8499C22.3612 17.814 20.7158 18.5467 18.9932 19.1509H18.8004C18.3633 18.4567 17.9263 17.7626 17.4892 17.0684C18.2348 16.7085 18.8647 16.4 19.546 16.0657C19.1218 15.6672 19.1218 15.6672 18.7233 15.8343C14.8668 17.4283 11.0104 17.4412 7.15395 15.8343C6.78116 15.6801 6.58834 15.7572 6.33125 16.0914C7.01255 16.4257 7.66815 16.7342 8.38802 17.0684C7.9381 17.7754 7.51389 18.4696 7.07683 19.1509H6.884C5.13575 18.5467 3.46464 17.8011 1.89635 16.7985C1.27932 16.4 0.649437 16.0529 0.73942 15.1659C0.73942 15.1016 0.739417 15.0373 0.726562 14.9859C0.726562 14.2918 0.726562 13.5976 0.726562 12.9035C0.752272 12.7492 0.777986 12.5949 0.79084 12.4407C1.03508 8.81563 2.26914 5.53766 4.26163 2.52964C4.37732 2.34967 4.583 2.16971 4.78868 2.09258C6.26698 1.6041 7.75813 1.15418 9.23643 0.691406C9.32642 0.691406 9.42925 0.691406 9.51924 0.691406C9.72491 1.11561 9.94344 1.52697 10.1106 1.87405H15.7281C15.9081 1.52697 16.1137 1.11561 16.3323 0.691406H16.3451ZM11.049 10.821C11.049 9.62548 10.2777 8.60995 9.22357 8.4557C8.02808 8.27573 7.03827 9.03416 6.76832 10.3325C6.51122 11.5794 7.23108 12.8649 8.36231 13.1734C9.75062 13.5462 11.049 12.4021 11.049 10.821ZM14.8154 10.911C14.8154 10.9881 14.8154 11.1552 14.854 11.3095C15.0468 12.6078 16.2809 13.4948 17.4764 13.1863C18.4533 12.9292 19.1346 11.9908 19.1603 10.8852C19.186 9.79259 18.5304 8.80277 17.5663 8.50711C16.178 8.08291 14.8154 9.23984 14.8283 10.911H14.8154Z" fill="white" />
                                    </svg>
                                </div>
                            </div>

                        </div>

                        <div className="col-span-12 lg:col-span-6 mk-discount-card ">
                            <p className='fs-20 fw-semibold text-center mk-text-color'>
                                40% IN SAVINGS
                            </p>

                            <button className="button isLogin primary rounded-full max-w-[319px] w-full mx-auto mt-3 ">
                                <div className="button_container glitch uppercase">
                                    REDEEM BENEFIT
                                </div>
                            </button>
                        </div>
                    </div>

                </div>
            </div>

            {/* Related Companies */}
            <p className='fs-20 fw-semibold text-center mt-[4rem] md:mt-[8rem]'>EXPLORE OTHER BENEFITS</p>

            <div className="grid  grid-cols-12 gap-5 md:gap-12 relative my-[2.5rem] md:my-[3.8rem]">
                {companies.map((company, index) => (
                    <div key={index + 3} className="col-span-12 md:col-span-6 lg:col-span-4 bg-[#1A1A1A] marketplace-card">
                        <MarketplaceCard company={company} />
                    </div>
                ))}
            </div>
        </div>
    )
}

MarketplaceProfile.layout = page => <Layout children={page} title="" />
export default MarketplaceProfile
