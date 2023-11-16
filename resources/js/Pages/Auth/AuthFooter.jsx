import React, { useState } from 'react'
import logo from "../../../assets/logo.svg"
import { Link, usePage } from "@inertiajs/react";

const AuthFooter = () => {

    const currentPathname = window.location.pathname;
    const segments = currentPathname.split('/');

    // Get the last segment
    const currentPage = segments[segments.length - 1];

    const discordUrl = usePage().props.discordUrl
    return (
        <div className="
    containerXLarge  ">
            <div className='  auth-fotoer'>
              
                <footer className="    relative xl:px-[4.5rem] 2xl:px-0 ">
                    <div className="mx-auto px-5 xl:px-0 relative">

                        <div className="grid grid-cols-12 gap-y-8 pb-3">
                            <div className="col-span-12">
                                <div className="  flex justify-center  w-full">



                                    {/* {currentPage === 'academy' && ( */}
                                    <div className=" flex justify-center ">
                                        <div className="hidden md:block md:flex gap-x-[3rem]  ">
                                        <a href={discordUrl}>   <p>
                                                <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M16.3058 1.30315C15.0597 0.694365 13.7274 0.251928 12.3345 0C12.1635 0.322962 11.9636 0.757354 11.8258 1.10291C10.3452 0.870381 8.87809 0.870381 7.42464 1.10291C7.28688 0.757354 7.08249 0.322962 6.90989 0C5.5155 0.251928 4.18166 0.695991 2.93563 1.30637C0.42239 5.27227 -0.258909 9.13966 0.0817416 12.9521C1.74866 14.252 3.3641 15.0417 4.95228 15.5584C5.34441 14.9948 5.69413 14.3958 5.99542 13.7644C5.42161 13.5367 4.87204 13.2557 4.35275 12.9295C4.49051 12.823 4.62527 12.7115 4.75546 12.5969C7.92274 14.1439 11.3641 14.1439 14.4935 12.5969C14.6252 12.7115 14.76 12.823 14.8962 12.9295C14.3754 13.2573 13.8243 13.5383 13.2505 13.766C13.5518 14.3958 13.9 14.9965 14.2937 15.56C15.8834 15.0433 17.5003 14.2537 19.1672 12.9521C19.5669 8.53251 18.4844 4.70063 16.3058 1.30315ZM6.42692 10.6075C5.47613 10.6075 4.69641 9.68061 4.69641 8.55188C4.69641 7.42315 5.45948 6.49466 6.42692 6.49466C7.39438 6.49466 8.17407 7.42152 8.15742 8.55188C8.15893 9.68061 7.39438 10.6075 6.42692 10.6075ZM12.8221 10.6075C11.8713 10.6075 11.0916 9.68061 11.0916 8.55188C11.0916 7.42315 11.8546 6.49466 12.8221 6.49466C13.7895 6.49466 14.5692 7.42152 14.5526 8.55188C14.5526 9.68061 13.7895 10.6075 12.8221 10.6075Z" fill="white" />
                                                </svg>

                                            </p> </a>
                                            <a href='terms-and-conditions'  className="fw-semibold font-14 flex  " >  <p >TERMS & CONDITIONS</p> </a>
                                            <a href='privacy-policy'   >   <p className="fw-semibold font-14 flex  ">PRIVACY POLICY</p> </a>
                                            <a
                                                href="https://support.capital.club"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="fw-semibold font-14 flex order-0 md:order-3"
                                            >
                                                SUPPORT
                                            </a>
                                        </div>
                                        {/* ***mobile** */}
                                        <div className="md block md:hidden flex justify-center   ">
                                        <img className="h-5 lg:h-10" src={logo} alt="" />
                                    </div>
                                    </div>


                                </div>
                            </div>
                        </div>

                    </div>
                </footer>
            </div>
        </div>
    )
}

export default AuthFooter
