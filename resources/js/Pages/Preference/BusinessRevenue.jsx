import React, { useEffect } from "react";
import logo from "../../../assets/svg/logo.svg";
import lander from "../../../assets/svg/glitch.svg";
import Button from "@/Components/Button";
import { ReactComponent as WELCOMEARROW } from "../../../assets/svg/WELCOMEARROW.svg";
import { Link, useForm, usePage } from "@inertiajs/react";
import InterestLayout from "@/Layouts/InterestLayout";
import AOS from 'aos';
import 'aos/dist/aos.css';
import check from "../../../assets/img/CheckCircle.png";
import { useState } from "react";
import IconButton from "@/Components/IconButton";
import cashSound from "../../../assets/cashSound.mp3";
import ReactToast from "@/Components/ReactToast";
import PreferencesLayout from "@/Layouts/PreferencesLayout";
import { useRef } from "react";
import CheckFields from "@/Components/CheckFields";
const BusinessRevenue = ({setData , data}) => {
    useEffect(() => {
        AOS.init();
    }, [])
    const { auth } = usePage().props;




    const slides = [
        {
            id: 0,
            name: "$0 - $100k",
        },
        {
            id: 1,
            name: "$100k - $500k",
        },
        {
            id: 2,
            name: "$500k - $1M",
        },
        {
            id: 3,
            name: "$1M - $5M",
        },
        {
            id: 4,
            name: "$5M - $10M",
        },
        {
            id: 5,
            name: "$10M  - $50M",
        },
        {
            id: 6,
            name: "$50M+",
        },
    ];



    const [selectedRevenue, setSelectedRevenue] = useState(null);

    const handleCardClick = (name) => {
        // playAudio()
        if (selectedRevenue === name) {
            setData('annual_revenue', null)
            setSelectedRevenue(null); // Deselect the option
        } else {
            setData('annual_revenue', name)
            setSelectedRevenue(name); // Select the option
        }
    };




    // const { data, setData, post, processing, errors } = useForm({
    //     annual_revenue: '',
    // })

    const handleSubmit = (e) => {



        // setTimeout(() => {

        //     post(route('preference.business-revenue-store'), {
        //         preserveScroll: true,
        //         onBefore: () => {
        //             if (data?.annual_revenue) {
        //               setFadeOut(true)}
        //           }
        //     })
        // }, 300);

    }

    // useEffect(() => {
    //     if (errors.annual_revenue) {
    //         ReactToast('error', errors.annual_revenue);
    //     }
    // }, [errors]);


    const [fadeOut, setFadeOut] = useState(false);

    // useEffect(() => {
    //     if (data?.annual_revenue !== '') {
    //         setFadeOut(true)
    //         setTimeout(() => {
    //             handleSubmit()
    //         }, 100);
    //     }
    // }, [data])




    return (
        // <PreferencesLayout progress="80" backPAth='' farwordPath="" handleSubmit={handleSubmit} isLast={false} isShowButton={false} >
            <div className={` ${fadeOut && 'fade-out-animation'} w-[100%] `}>


                <h3 className="prefrence-heading text-center heading-padding pt-9 md:pt-6 pb-[11px] md:pb-7">
                    WHAT’S YOUR BUSINESS
                    ANNUAL REVENUE?
                </h3>

                <div className="max-w-xl mx-auto card-bg input-shadow border-rounded-15 ">
                <section className="  w-full    flex justify-center items-center">
                    <div className="container mx-auto padding-onboard">
                        <div className="grid grid-cols-12 flex items-center">
                            <div className="col-span-12">
                                <div className=" mx-auto">


                                    <div className="flex flex-col items-center justify-center">

                                        {/*  <!-- Component Start -->*/}
                                        <form
                                            className="w-full"
                                            action="">
                                            <div>
                                                <div className="grid grid-cols-1     gap-y-2 md:gap-[10px]">
                                                    {slides.map((card, index) => (
                                                         <React.Fragment key={card?.id}>
                                                         <div onClick={() => handleCardClick(card?.name)}>
 
                                                             <CheckFields
 
                                                                 name={card?.name}
                                                                 bgClass={selectedRevenue == card?.name ? "bg-[#c8c8c8]" : "bg-[#191919]"}
                                                                 textClass={selectedRevenue == card?.name ? 'text-[#1b1b1b]' : 'text-[#fff]'}
                                                             > </CheckFields>
                                                         </div>
                                                     </React.Fragment>
                                                        // <div
                                                        //     key={card?.id}
                                                        //     onClick={() => handleCardClick(card?.name)}
                                                        //     className={`${selectedRevenue == card?.name
                                                        //         ? " bg-[#c8c8c8]    "
                                                        //         : "bg-[#191919] "
                                                        //         } lg:cursor-pointer rounded-[10px] input-shadow w-full choice-height-options  px-5 flex justify-center items-center `}
                                                        // >  <h6 className={` ${selectedRevenue == card?.name ? 'text-[#1b1b1b]' : 'text-[#fff]' } industries-text-options text-center pt-[2px] `}>{card?.name} </h6>

                                                        // </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </form>
                                        {/*  <!-- Component End  -->*/}

                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                    {/*  <!-- container End -->*/}

                </section>
                </div>

            </div>


        // </PreferencesLayout>
    );
};
;
export default BusinessRevenue;
