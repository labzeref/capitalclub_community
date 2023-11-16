import React, {useState} from 'react'
import logo from "../../../assets/logo.svg"
import {Link} from "@inertiajs/react";

const Footer = () => {

    const [isTopShadowVisible, setIsTopShadowVisible] = useState(false);
    const [isBottomShadowVisible, setIsBottomShadowVisible] = useState(false);


    const handleScroll = (event) => {
        const { scrollTop, scrollHeight, clientHeight } = event.target;
        console.log('scroll top is ...:' , clientHeight  , 'scrolTop....:' , scrollTop )


        setIsTopShadowVisible(scrollTop);
        setIsBottomShadowVisible(scrollTop + clientHeight < scrollHeight);
      };

  return (
    <div onScroll={handleScroll} className="
    containerXLarge ">
        <footer className="mt-[60px] md:mt-[80px] lg:mt-[100px] relative xl:px-[4.5rem] 2xl:px-0 ">
            {/* <div className="footer-light-container">
                <div className="footer-light-1"></div>
                <div className="footer-light-2"></div>
                <div className="footer-light-blur"></div>
            </div> */}
            <div className="mx-auto px-5 xl:px-0 relative">
                <div className="grid grid-cols-12 gap-y-8">
                    <div className="col-span-12 lg:col-span-6">
                        <div className="text-start">
                            <img className="h-8 lg:h-10" src={logo} alt=""/>
                        </div>
                    </div>
                    <div className="col-span-4 lg:col-span-2">
                        <div className="text-start ">
                            <p className="fs-tiny fw-regular uppercase">Explore</p>
                            <ul className="mt-6 lg:mt-8">
                                <li className="mb-6">
                                    <Link href={route('academy')} className="text-base text-[#FFFFFF] font-normal opacity-50">Academy</Link>
                                </li>
                                <li className="mb-6">
                                    <Link href={route("live-training.index")} className="text-base text-[#FFFFFF] font-normal opacity-50">Live Training</Link>
                                </li>
                                <li className="mb-6">
                                    <Link href={route('discussion')} className="text-base text-[#FFFFFF] font-normal opacity-50">Discussion</Link>
                                </li>
                                <li className="mb-6">
                                    <Link href={route('marketplace.index')} className="text-base text-[#FFFFFF] font-normal opacity-50">Marketplace</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-span-4 lg:col-span-2">
                        <div className="text-start">
                            <p className="fs-tiny fw-regular  uppercase">Company</p>
                            <ul className="mt-6 lg:mt-8">
                                <li className="mb-6">
                                    <div className="text-base text-[#FFFFFF] font-normal opacity-50">About</div>
                                </li>
                                <li className="mb-6">
                                    <div className="text-base text-[#FFFFFF] font-normal opacity-50">Contact Us</div>
                                </li>
                                <li className="mb-6">
                                    <div className="text-base text-[#FFFFFF] font-normal opacity-50">Careers</div>
                                </li>
                                <li className="mb-6">
                                    <div className="text-base text-[#FFFFFF] font-normal opacity-50">Security</div>
                                </li>
                                <li className="mb-6">
                                    <div className="text-base text-[#FFFFFF] font-normal opacity-50">Privacy</div>
                                </li>
                                <li className="mb-6">
                                    <div className="text-base text-[#FFFFFF] font-normal opacity-50">Terms</div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-span-4 lg:col-span-2">
                        <div className="text-start">
                            <p className="fs-tiny fw-regular  uppercase">Social</p>
                            <ul className="mt-6 lg:mt-8">
                                <li className="mb-6">
                                    <div className="flex items-center text-base text-[#FFFFFF] font-normal opacity-50">
                                        <span className="mr-2">
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g clipPath="url(#clip0_610_260)">
                                                <path opacity="0.2" d="M10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 5.85786 14.1421 2.5 10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5Z" fill="white"/>
                                                <path d="M10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 5.85786 14.1421 2.5 10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5Z" stroke="white" strokeOpacity="0.6" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                                                <path d="M13.125 6.875H11.875C11.3777 6.875 10.9008 7.07254 10.5492 7.42417C10.1975 7.77581 10 8.25272 10 8.75V17.5" stroke="white" strokeOpacity="0.6" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                                                <path d="M7.5 11.25H12.5" stroke="white" strokeOpacity="0.6" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                                                </g>
                                                <defs>
                                                <clipPath id="clip0_610_260">
                                                <rect width="20" height="20" fill="white"/>
                                                </clipPath>
                                                </defs>
                                            </svg>
                                        </span>
                                        Facebook
                                    </div>
                                </li>
                                <li className="mb-6">
                                    <div className="flex item-center text-base text-[#FFFFFF] font-normal opacity-50">
                                        <span className="mr-2">
                                            <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g clipPath="url(#clip0_610_267)">
                                                <path opacity="0.2" d="M6.875 13.9143C6.875 13.9143 2.56641 11.4143 3.18594 4.53929C3.18594 4.53929 6.28437 7.66429 10 8.28929V7.03929C10 5.32054 11.4062 3.8932 13.125 3.91429C13.7316 3.92134 14.3235 4.10157 14.831 4.43375C15.3386 4.76594 15.7406 5.23625 15.9898 5.78929H18.75L16.25 8.28929C15.9172 13.5112 11.5562 17.6643 6.25 17.6643C3.75 17.6643 3.125 16.7268 3.125 16.7268C3.125 16.7268 5.625 15.7893 6.875 13.9143Z" fill="white"/>
                                                <path d="M6.875 13.9143C6.875 13.9143 2.56641 11.4143 3.18594 4.53929C3.18594 4.53929 6.28437 7.66429 10 8.28929V7.03929C10 5.32054 11.4062 3.8932 13.125 3.91429C13.7316 3.92134 14.3235 4.10157 14.831 4.43375C15.3386 4.76594 15.7406 5.23625 15.9898 5.78929H18.75L16.25 8.28929C15.9172 13.5112 11.5562 17.6643 6.25 17.6643C3.75 17.6643 3.125 16.7268 3.125 16.7268C3.125 16.7268 5.625 15.7893 6.875 13.9143Z" stroke="white" strokeOpacity="0.6" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                                                </g>
                                                <defs>
                                                <clipPath id="clip0_610_267">
                                                <rect width="20" height="20" fill="white" transform="translate(0 0.164062)"/>
                                                </clipPath>
                                                </defs>
                                            </svg>
                                        </span>
                                        Twitter
                                    </div>
                                </li>
                                <li className="mb-6">
                                    <div className="flex item-center text-base text-[#FFFFFF] font-normal opacity-50">
                                        <span className="mr-2">
                                            <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g clipPath="url(#clip0_610_273)">
                                                <path opacity="0.2" d="M13.75 2.82812H6.25C5.25544 2.82813 4.30161 3.22321 3.59835 3.92647C2.89509 4.62974 2.5 5.58356 2.5 6.57812V14.0781C2.5 15.0727 2.89509 16.0265 3.59835 16.7298C4.30161 17.433 5.25544 17.8281 6.25 17.8281H13.75C14.7446 17.8281 15.6984 17.433 16.4017 16.7298C17.1049 16.0265 17.5 15.0727 17.5 14.0781V6.57812C17.5 5.58356 17.1049 4.62974 16.4017 3.92647C15.6984 3.22321 14.7446 2.82813 13.75 2.82812ZM10 13.4531C9.38193 13.4531 8.77775 13.2698 8.26384 12.9265C7.74994 12.5831 7.3494 12.095 7.11288 11.524C6.87635 10.953 6.81447 10.3247 6.93505 9.71847C7.05562 9.11228 7.35325 8.55546 7.79029 8.11842C8.22733 7.68138 8.78415 7.38375 9.39034 7.26317C9.99653 7.14259 10.6249 7.20448 11.1959 7.441C11.7669 7.67753 12.255 8.07806 12.5983 8.59197C12.9417 9.10587 13.125 9.71006 13.125 10.3281C13.125 11.1569 12.7958 11.9518 12.2097 12.5378C11.6237 13.1239 10.8288 13.4531 10 13.4531Z" fill="white"/>
                                                <path d="M13.75 2.82812H6.25C4.17893 2.82812 2.5 4.50706 2.5 6.57812V14.0781C2.5 16.1492 4.17893 17.8281 6.25 17.8281H13.75C15.8211 17.8281 17.5 16.1492 17.5 14.0781V6.57812C17.5 4.50706 15.8211 2.82812 13.75 2.82812Z" stroke="white" strokeOpacity="0.6" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                                                <path d="M10 13.4531C11.7259 13.4531 13.125 12.054 13.125 10.3281C13.125 8.60224 11.7259 7.20312 10 7.20312C8.27411 7.20312 6.875 8.60224 6.875 10.3281C6.875 12.054 8.27411 13.4531 10 13.4531Z" stroke="white" strokeOpacity="0.6" strokeWidth="1.2" strokeMiterlimit="10"/>
                                                <path opacity="0.6" d="M14.0625 7.20312C14.5803 7.20312 15 6.78339 15 6.26562C15 5.74786 14.5803 5.32812 14.0625 5.32812C13.5447 5.32812 13.125 5.74786 13.125 6.26562C13.125 6.78339 13.5447 7.20312 14.0625 7.20312Z" fill="white"/>
                                                </g>
                                                <defs>
                                                <clipPath id="clip0_610_273">
                                                <rect width="20" height="20" fill="white" transform="translate(0 0.328125)"/>
                                                </clipPath>
                                                </defs>
                                            </svg>
                                        </span>
                                        Instagram
                                    </div>
                                </li>
                                <li className="mb-6">
                                    <div className="flex item-center text-base text-[#FFFFFF] font-normal opacity-50">
                                        <span className="mr-2">
                                            <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g clipPath="url(#clip0_610_282)">
                                                <path opacity="0.2" d="M17.7023 5.91648C17.6542 5.72376 17.5609 5.54529 17.4301 5.39584C17.2992 5.24639 17.1347 5.13027 16.95 5.0571C14.3344 4.05085 10 4.0782 10 4.0782C10 4.0782 5.66563 4.05085 3.04688 5.06101C2.86221 5.13418 2.69765 5.25029 2.56681 5.39974C2.43597 5.54919 2.34264 5.72767 2.29453 5.92039C2.11484 6.62039 1.875 7.99148 1.875 10.3282C1.875 12.6649 2.11484 14.036 2.29766 14.7399C2.346 14.9316 2.43911 15.1091 2.56935 15.2578C2.69959 15.4065 2.86325 15.5222 3.04688 15.5954C5.66563 16.6055 10 16.5782 10 16.5782C10 16.5782 14.3344 16.6055 16.9531 15.5954C17.1373 15.5226 17.3016 15.4071 17.4324 15.2583C17.5632 15.1096 17.6568 14.9319 17.7055 14.7399C17.8883 14.0368 18.1281 12.6649 18.1281 10.3282C18.1281 7.99148 17.8852 6.62038 17.7023 5.91648ZM8.75 12.8282V7.8282L12.5 10.3282L8.75 12.8282Z" fill="white"/>
                                                <path d="M12.5 10.3281L8.75 7.82812V12.8281L12.5 10.3281Z" stroke="white" strokeOpacity="0.6" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                                                <path d="M1.875 10.3282C1.875 12.6649 2.11484 14.0352 2.29766 14.7399C2.346 14.9316 2.43911 15.1091 2.56935 15.2578C2.69959 15.4065 2.86325 15.5222 3.04688 15.5954C5.66563 16.6055 10 16.5782 10 16.5782C10 16.5782 14.3344 16.6055 16.9531 15.5954C17.1373 15.5226 17.3016 15.4071 17.4324 15.2583C17.5632 15.1096 17.6568 14.9319 17.7055 14.7399C17.8883 14.0368 18.1281 12.6649 18.1281 10.3282C18.1281 7.99148 17.8883 6.62117 17.7055 5.91648C17.6574 5.72376 17.564 5.54529 17.4332 5.39584C17.3024 5.24639 17.1378 5.13027 16.9531 5.0571C14.3344 4.05085 10 4.0782 10 4.0782C10 4.0782 5.66563 4.05085 3.04688 5.06101C2.86221 5.13418 2.69765 5.25029 2.56681 5.39974C2.43597 5.54919 2.34264 5.72767 2.29453 5.92039C2.11484 6.62039 1.875 7.99148 1.875 10.3282Z" stroke="white" strokeOpacity="0.6" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                                                </g>
                                                <defs>
                                                <clipPath id="clip0_610_282">
                                                <rect width="20" height="20" fill="white" transform="translate(0 0.328125)"/>
                                                </clipPath>
                                                </defs>
                                            </svg>
                                        </span>
                                        Youtube
                                    </div>
                                </li>
                                <li className="mb-6">
                                    <div className="flex item-center text-base text-[#FFFFFF] font-normal opacity-50">
                                        <span className="mr-2">
                                            <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g clipPath="url(#clip0_610_289)">
                                                <path opacity="0.2" d="M16.875 2.82812H3.125C2.77982 2.82812 2.5 3.10795 2.5 3.45312V17.2031C2.5 17.5483 2.77982 17.8281 3.125 17.8281H16.875C17.2202 17.8281 17.5 17.5483 17.5 17.2031V3.45312C17.5 3.10795 17.2202 2.82812 16.875 2.82812Z" fill="white"/>
                                                <path d="M16.875 2.82812H3.125C2.77982 2.82812 2.5 3.10795 2.5 3.45312V17.2031C2.5 17.5483 2.77982 17.8281 3.125 17.8281H16.875C17.2202 17.8281 17.5 17.5483 17.5 17.2031V3.45312C17.5 3.10795 17.2202 2.82812 16.875 2.82812Z" stroke="white" strokeOpacity="0.6" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                                                <path d="M9.375 9.07812V14.0781" stroke="white" strokeOpacity="0.6" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                                                <path d="M6.875 9.07812V14.0781" stroke="white" strokeOpacity="0.6" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                                                <path d="M9.375 11.2656C9.375 10.6855 9.60547 10.1291 10.0157 9.71883C10.4259 9.30859 10.9823 9.07813 11.5625 9.07812C12.1427 9.07812 12.6991 9.30859 13.1093 9.71883C13.5195 10.1291 13.75 10.6855 13.75 11.2656V14.0781" stroke="white" strokeOpacity="0.6" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                                                <path opacity="0.6" d="M6.875 7.82812C7.39277 7.82812 7.8125 7.40839 7.8125 6.89062C7.8125 6.37286 7.39277 5.95312 6.875 5.95312C6.35723 5.95312 5.9375 6.37286 5.9375 6.89062C5.9375 7.40839 6.35723 7.82812 6.875 7.82812Z" fill="white"/>
                                                </g>
                                                <defs>
                                                <clipPath id="clip0_610_289">
                                                <rect width="20" height="20" fill="white" transform="translate(0 0.328125)"/>
                                                </clipPath>
                                                </defs>
                                            </svg>
                                        </span>
                                        Linkedin
                                    </div>
                                </li>
                                <li className="mb-6">
                                    <div className="flex item-center text-base text-[#FFFFFF] font-normal opacity-50">
                                        <span className="mr-2">
                                            <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g clipPath="url(#clip0_610_299)">
                                                <path opacity="0.2" d="M11.4845 14.6304C10.9912 14.6796 10.4958 14.7041 10.0001 14.7039C9.50441 14.7041 9.009 14.6796 8.51574 14.6304L7.71496 16.7922C7.68433 16.8738 7.63726 16.9483 7.57664 17.0111C7.51603 17.0738 7.44317 17.1234 7.36259 17.1568C7.28201 17.1902 7.19543 17.2067 7.10822 17.2053C7.021 17.2038 6.93501 17.1845 6.85558 17.1484L1.62121 14.8281C1.48643 14.7689 1.37688 14.664 1.31185 14.532C1.24682 14.3999 1.23049 14.2491 1.26574 14.1062L3.57589 5.01637C3.60602 4.8969 3.67045 4.78885 3.76124 4.70556C3.85203 4.62227 3.96521 4.56736 4.08683 4.54762L6.90402 4.08512C7.06092 4.05845 7.22211 4.09189 7.35547 4.17876C7.48882 4.26564 7.58454 4.39957 7.62355 4.55387L8.01418 6.08746C9.33333 5.91142 10.67 5.91142 11.9892 6.08746L12.3798 4.55387C12.4188 4.39957 12.5145 4.26564 12.6479 4.17876C12.7812 4.09189 12.9424 4.05845 13.0993 4.08512L15.9134 4.54762C16.035 4.56736 16.1482 4.62227 16.239 4.70556C16.3298 4.78885 16.3942 4.8969 16.4243 5.01637L18.7314 14.1078C18.7666 14.2507 18.7503 14.4015 18.6852 14.5335C18.6202 14.6656 18.5107 14.7705 18.3759 14.8297L13.1415 17.15C13.0621 17.186 12.9761 17.2054 12.8889 17.2068C12.8017 17.2083 12.7151 17.1918 12.6345 17.1584C12.5539 17.125 12.4811 17.0754 12.4205 17.0126C12.3598 16.9499 12.3128 16.8754 12.2821 16.7937L11.4845 14.6304Z" fill="white"/>
                                                <path opacity="0.6" d="M7.1875 12.2031C7.70527 12.2031 8.125 11.7834 8.125 11.2656C8.125 10.7479 7.70527 10.3281 7.1875 10.3281C6.66973 10.3281 6.25 10.7479 6.25 11.2656C6.25 11.7834 6.66973 12.2031 7.1875 12.2031Z" fill="white"/>
                                                <path opacity="0.6" d="M12.8125 12.2031C13.3303 12.2031 13.75 11.7834 13.75 11.2656C13.75 10.7479 13.3303 10.3281 12.8125 10.3281C12.2947 10.3281 11.875 10.7479 11.875 11.2656C11.875 11.7834 12.2947 12.2031 12.8125 12.2031Z" fill="white"/>
                                                <path d="M11.9875 6.08551L12.3781 4.55192C12.4171 4.39762 12.5129 4.26369 12.6462 4.17681C12.7796 4.08994 12.9408 4.0565 13.0977 4.08317L15.9133 4.54723C16.0349 4.56697 16.1481 4.62188 16.2389 4.70517C16.3297 4.78846 16.3941 4.89651 16.4242 5.01598L18.7312 14.1074C18.7665 14.2503 18.7502 14.4011 18.6851 14.5331C18.6201 14.6652 18.5106 14.7701 18.3758 14.8293L13.1414 17.1496C13.062 17.1856 12.976 17.205 12.8888 17.2064C12.8016 17.2079 12.715 17.1914 12.6344 17.158C12.5538 17.1246 12.481 17.075 12.4203 17.0122C12.3597 16.9495 12.3127 16.875 12.282 16.7933L11.4844 14.63" stroke="white" strokeOpacity="0.6" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                                                <path d="M8.01242 6.08551L7.62179 4.55192C7.58278 4.39762 7.48706 4.26369 7.35371 4.17681C7.22036 4.08994 7.05917 4.0565 6.90226 4.08317L4.08664 4.54723C3.96502 4.56697 3.85184 4.62188 3.76105 4.70517C3.67026 4.78846 3.60583 4.89651 3.5757 5.01598L1.26867 14.1058C1.23342 14.2487 1.24975 14.3995 1.31478 14.5316C1.37981 14.6636 1.48936 14.7685 1.62414 14.8277L6.85851 17.148C6.93794 17.1841 7.02393 17.2034 7.11115 17.2049C7.19836 17.2063 7.28495 17.1898 7.36552 17.1564C7.4461 17.123 7.51896 17.0734 7.57957 17.0107C7.64019 16.9479 7.68727 16.8734 7.71789 16.7918L8.51554 14.63" stroke="white" strokeOpacity="0.6" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                                                <path d="M6.25 6.44627C7.4719 6.11283 8.73344 5.94699 10 5.9533C11.2666 5.94699 12.5281 6.11283 13.75 6.44627" stroke="white" strokeOpacity="0.6" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                                                <path d="M13.75 14.2109C12.5281 14.5444 11.2666 14.7102 10 14.7039C8.73344 14.7102 7.4719 14.5444 6.25 14.2109" stroke="white" strokeOpacity="0.6" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                                                </g>
                                                <defs>
                                                <clipPath id="clip0_610_299">
                                                <rect width="20" height="20" fill="white" transform="translate(0 0.328125)"/>
                                                </clipPath>
                                                </defs>
                                            </svg>
                                        </span>
                                        Discord
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-12 gap-y-8 py-6 md:py-12">
                    <div className=" col-span-6">
                        <div className=" text-start">
                            <p className="text-xs lg:text-sm text-[#FFFFFF] font-normal">Copyright Capital Club 2023. All Rights Reserved.</p>
                        </div>
                    </div>
                    <div className=" col-span-6">
                        <div className=" text-end flex justify-end">
                            <div className="text-xs lg:text-base text-[#FFFFFF] font-normal flex items-center">
                                <span className="mr-4">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clipPath="url(#clip0_216_18882)">
                                        <path opacity="0.2" d="M19.5 8.25H4.5C4.08579 8.25 3.75 8.58579 3.75 9V19.5C3.75 19.9142 4.08579 20.25 4.5 20.25H19.5C19.9142 20.25 20.25 19.9142 20.25 19.5V9C20.25 8.58579 19.9142 8.25 19.5 8.25Z" fill="white"/>
                                        <path d="M19.5 8.25H4.5C4.08579 8.25 3.75 8.58579 3.75 9V19.5C3.75 19.9142 4.08579 20.25 4.5 20.25H19.5C19.9142 20.25 20.25 19.9142 20.25 19.5V9C20.25 8.58579 19.9142 8.25 19.5 8.25Z" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M8.25 8.25V5.25C8.25 4.25544 8.64509 3.30161 9.34835 2.59835C10.0516 1.89509 11.0054 1.5 12 1.5C12.9946 1.5 13.9484 1.89509 14.6517 2.59835C15.3549 3.30161 15.75 4.25544 15.75 5.25V8.25" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </g>
                                        <defs>
                                        <clipPath id="clip0_216_18882">
                                        <rect width="24" height="24" fill="white"/>
                                        </clipPath>
                                        </defs>
                                    </svg>
                                </span>
                                Secure with SSL
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </footer>
    </div>
  )
}

export default Footer
