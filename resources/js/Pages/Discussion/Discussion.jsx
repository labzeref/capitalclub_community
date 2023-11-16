import React, { useEffect } from 'react'
import Layout from '@/Layouts/Layout' 


import desktop from "../../../assets/img/MARKETPLACE_DESK.png";
import mobile from "../../../assets/img/MARKETPLACE_MOBILE.png";

import { Head, Link } from '@inertiajs/react'; 


const Marketplace = () => {

    return (
        <div>
            <Head title="Discussion" />
            <section data-aos="fade-in" data-aos-delay="100" data-aos-easing="ease" data-aos-duration="300" className=" mt-[5rem] md:mt-[6rem]">
                <div className="container mx-auto px-5 xl:px-0">
                    <div className="grid grid-cols-12">
                        <div className="col-span-12  flex items-center justify-center  ">
                            <div className='w-full  h-[500px] min-h-[70vh] bg-[#282828] border-rounded-20 flex justify-center items-center p-4 '>
 
<h2>COMING SOON...</h2>


                            </div>
                        </div>
                    </div>


                </div>
            </section>
        </div>
    )
}
Marketplace.layout = page => <Layout children={page} title="" />
export default Marketplace
