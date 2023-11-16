import React, { useEffect } from 'react'
import Layout from '@/Layouts/Layout'
import market1 from "../../../assets/svg/Marketplace1.svg";


// import desktop from "../../../assets/img/MARKETPLACE_DESK.png";
import desktop from "../../../assets/img/marketplace_2_desktop.svg";
// import mobile from "../../../assets/img/MARKETPLACE_MOBILE.png";
import mobile from "../../../assets/img/marketplace_2_mobile.svg";

import tetris from "../../../assets/svg/tetris-game.svg";


import { Head, Link } from '@inertiajs/react';
import axios from 'axios';
import { useState } from 'react';
import ReactToast from '@/Components/ReactToast';
import AcademyText from '../../Components/MARKETPLACE_LOTTIE_ANIMATION2.json';
import Lottie from 'react-lottie-player';


const Marketplace = () => {

    return (
        <div>
            <Head title="Marketplace" />
            <section data-aos="fade-in" data-aos-delay="100" data-aos-easing="ease" data-aos-duration="300" className="">
                <div className="container mx-auto px-5 xl:px-3">
                    <div className="grid grid-cols-12">
                        <div className="col-span-12  flex items-center justify-center  ">
                            <div className='w-full'>


                                {/* <img src={desktop} alt='coming soon' className='w-full hide-sm-img border-rounded-10 input-shadow' />
                                <img src={mobile} alt='coming soon' className='w-full hide-md-img border-rounded-10 input-shadow' /> */}
                                <Lottie
                                loop
                                animationData={AcademyText}
                                play
                                className='marketplace-lottie'
                            // style={{ width: 'auto', height: 'auto' }}
                            />


                            </div>
                        </div>
                    </div>

                    {/* <div className='  p-4 w-full max-w-[390px] lg:max-w-[500px]  mt-[2rem] md:my-[5rem]  mx-auto   '>

                        <img src={tetris} className='cursor-pointer' />

                        <button className='button primary uppercase rounded-full w-full mt-[1rem]   '> play  </button>
                    </div> */}
                </div>
            </section>
        </div>
    )
}
Marketplace.layout = page => <Layout children={page} title="" />
export default Marketplace
