import React, { useEffect } from "react";
import marketplacebg from "../../../assets/img/marketplace.jpg";
import Noise10 from "../../../assets/img/Noise10.webp";
import Marketplace3 from "../../../assets/svg/Marketplace3.svg";

import Arrowlink from "../../../assets/svg/arrowLink.svg";
import Layout from "@/Layouts/Layout";
import Button from "../../Components/Button";

import { ReactComponent as ArrowLink } from "../../../assets/svg/arrowLink.svg";
import { Link } from "@inertiajs/react";
import { useState } from "react";

const MarketProfile = ({ partnerProfile }) => {


    // console.log('partnerProfile')
    // console.log(partnerProfile)
    const [imageLoaded, setImageLoaded] = useState(false);
    return (
        <div>
            <section className="paddingSectionLarge mt-12">
                <div className="container mx-auto px-5 xl:px-0">
                    <div data-aos="fade-in" data-aos-delay="100" data-aos-easing="ease" data-aos-duration="300" className="grid grid-cols-12 gap-y-6 lg:gap-x-14">
                        <div className="col-span-12 lg:col-span-3">
                            <div className="noise-10  inset-border border-rounded-10 border-[1px] border-[#ffffff1a]">
                                <div className="p-8 text-center justify-center items-center flex flex-col">
                                    <img
                                        className="mb-4 w-[96px] h-24 rounded-full object-cover object-center border-[1px] border-[#ffffff1a]"
                                        src={partnerProfile?.dp?.small?.url}
                                        alt=""
                                    />
                                    <h4 className="mb-1">{partnerProfile?.name}</h4>


                                    <div className="flex justify-center flex-wrap gap-x-1 mx-auto w-[80%] ">
                                        {partnerProfile?.head_offices?.map((data, index) => (
                                            <p key={index + 1} className=" my-1 border-rounded-20 fs-tiny fw-regular px-4 py-2 inset-border">
                                                {data}
                                            </p>
                                        ))}
                                    </div>
                                    {/* <p className="fs-regular fw-regular text-[#9E9E9E]">
                                       { partnerProfile?.head_offices[0]?.[0]}
                                    </p> */}
                                </div>

                                <div className="py-4  border-t-[1px] border-t-[#ffffff1a]">
                                    <p className="flex items-center justify-center  gap-2 fs-regular fw-regular text-[#fff]">
                                        <span>
                                        <svg className='-mt-1' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M21.9842 10.7232L17.7561 14.4132L19.0226 19.9069C19.0897 20.1941 19.0705 20.4947 18.9677 20.7711C18.8648 21.0475 18.6827 21.2874 18.4442 21.4609C18.2057 21.6344 17.9214 21.7337 17.6267 21.7464C17.3321 21.7592 17.0402 21.6848 16.7876 21.5326L11.9961 18.6263L7.21482 21.5326C6.96223 21.6848 6.67038 21.7592 6.37574 21.7464C6.0811 21.7337 5.79676 21.6344 5.55826 21.4609C5.31976 21.2874 5.13769 21.0475 5.03481 20.7711C4.93193 20.4947 4.9128 20.1941 4.97982 19.9069L6.24451 14.4188L2.01545 10.7232C1.79177 10.5303 1.63003 10.2756 1.5505 9.99113C1.47098 9.70666 1.47721 9.40504 1.56842 9.1241C1.65964 8.84315 1.83176 8.59539 2.06322 8.41188C2.29468 8.22838 2.57517 8.11729 2.86951 8.09256L8.44389 7.60974L10.6198 2.41974C10.7335 2.14742 10.9251 1.9148 11.1707 1.75117C11.4163 1.58755 11.7047 1.50024 11.9998 1.50024C12.2949 1.50024 12.5834 1.58755 12.829 1.75117C13.0745 1.9148 13.2662 2.14742 13.3798 2.41974L15.5623 7.60974L21.1348 8.09256C21.4292 8.11729 21.7097 8.22838 21.9411 8.41188C22.1726 8.59539 22.3447 8.84315 22.4359 9.1241C22.5271 9.40504 22.5334 9.70666 22.4538 9.99113C22.3743 10.2756 22.2126 10.5303 21.9889 10.7232H21.9842Z" fill="#BA3E17"/>
</svg>

                                        </span>
                                        4.9 (14 reviews)
                                    </p>
                                </div>
                            </div>
                            <Link href={route('users.message', partnerProfile?.id)}>
                            <button className="button primary w-full mt-4">
                                <div className="button_container glitch uppercase">
                                   
                                    Message
                                </div>
                            </button>
                            </Link>
                            <a href={partnerProfile?.website} target="_blank" >
                                <Button
                                    icon={<ArrowLink />}
                                    className={"secondary w-full mt-4 uppercase"}
                                >
                                    visit Website
                                </Button>
                            </a>
                            <div
                                className=" border-rounded-10 mt-6 p-6 noise-10  inset-border  border-[#ffffff1a]"
                                // style="background-image: url('{{ asset('assets/Noise20.webp') }}')"
                                style={{ backgroundImage: `url(${Noise10}) ` }}
                            >
                                <h6 className="text-center">Industry specialties</h6>
                                <div className="flex items-center justify-center flex-wrap gap-2 mt-6">
                                    {partnerProfile?.industries?.map((data, index) => (
                                        <p key={index + 1} className="fs-tiny border-rounded-20 fw-regular px-4 py-2 border-[1px] border-[#ffffff1a]">
                                            {data}
                                        </p>
                                    ))}
                                    {/* <p className="fs-tiny fw-regular px-4 py-2 border-[1px] border-[#ffffff1a]">
                                        Real Estate
                                    </p>
                                    <p className="fs-tiny fw-regular px-4 py-2 border-[1px] border-[#ffffff1a]">
                                        Software
                                    </p> */}
                                </div>
                            </div>
                        </div>
                        <div className="col-span-12 lg:col-span-9">
                            <div className="text-start">
                                <img
                                onLoad={()=>{setImageLoaded(true)}}
                                    className="min-h-[251px] border-rounded-10 max-h-[711px] w-full object-center object-contain lg:object-cover"
                                  
                                    src={imageLoaded ? partnerProfile?.cover?.original?.url : partnerProfile?.cover?.small?.url}
                                    alt=""
                                />
                                <div   className="mt-8 lg:mt-12">
                                    <h3 className="mb-4">About</h3>
                                    <p className="fs-medium fw-regular mb-5">
                                        {partnerProfile?.overview}
                                    </p>
                                    {/* <p className="fs-medium fw-regular mb-5">
                                        The Ultimate Drawing Course will show
                                        you how to create advanced art that will
                                        stand up as professional work. This
                                        course will enhance or give you skills
                                        in the world of drawing - or your money
                                        back The course is your track to
                                        obtaining drawing skills like you always
                                        knew you should have! Whether for your
                                        own projects or to draw for other
                                        people.
                                    </p>
                                    <p className="fs-medium fw-regular mb-5">
                                        This course will take you from having
                                        little knowledge in drawing to creating
                                        advanced art and having a deep
                                        understanding of drawing fundamentals.
                                    </p> */}
                                </div>
                                {/*   <div>
                    <h3 className="mt-24 mb-8">Collaboration</h3>
                        <div className="flex items-center justify-between flex-wrap">
                            <img className="h-14" src="{{ asset('assets/img/webflow.svg') }}" alt=""/>
                            <img className="h-14" src="{{ asset('assets/img/relume.svg') }}" alt=""/>
                            <img className="h-14" src="{{ asset('assets/img/webflow.svg') }}" alt=""/>
                            <img className="h-14" src="{{ asset('assets/img/relume.svg') }}" alt=""/>
                            <img className="h-14" src="{{ asset('assets/img/webflow.svg') }}" alt=""/>
                        </div>
                    </div>*/}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

MarketProfile.layout = (page) => <Layout children={page} title="" />;
export default MarketProfile;
