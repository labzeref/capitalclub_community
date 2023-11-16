import React, { useEffect } from "react";
import logo from "../../../assets/svg/logo.svg";
import lander from "../../../assets/svg/glitch.svg";
import Button from "@/Components/Button";
import { ReactComponent as WELCOMEARROW } from "../../../assets/svg/WELCOMEARROW.svg";
import { Link, useForm, usePage } from "@inertiajs/react";
import InterestLayout from "@/Layouts/InterestLayout";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useState } from "react";
import IconButton from "@/Components/IconButton";
import check from "../../../assets/img/CheckCircle.png";
import ReactToast from "@/Components/ReactToast";
import PreferencesLayout from "@/Layouts/PreferencesLayout";
const BusinessRevenue = () => {
    useEffect(() => {
        AOS.init();
    }, [])
    const { auth } = usePage().props;




    const slides = [
        {
            id: 0,
            name: " NETWORKING ",
        },
        {
            id: 1,
            name: "BUILD PERSONAL BRAND",
        },
        {
            id: 2,
            name: "ATTEND CC EVENTS",
        },
        {
            id: 3,
            name: "GAIN NEW DATA SETS",
        },
        {
            id: 4,
            name: "START A BUSINESS",
        },
        {
            id: 5,
            name: "GROW MY BUSINESS",
        },
    ];

 


    const [selectedObjective, setSelectedObjective] = useState(null);

    const handleCardClick = (name) => {
        if (selectedObjective === name) {
            setData('objective', null)
            setSelectedObjective(null); // Deselect the option
        } else {
            setData('objective', name)
            setSelectedObjective(name); // Select the option
        }
    };


    const { data, setData, post, processing, errors } = useForm({
        objective: '',
    })

    const handleSubmit = (e) => { 

        post(route('preference.objective-store'), {
            preserveScroll: true,
            onBefore:()=>{

 

 
            }
        })

    }

    useEffect(() => {
        if (errors.objective) {
            ReactToast('error', errors.objective);
        }
    }, [errors]);


    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        if (data?.objective!=='') {
           setFadeOut(true)
      setTimeout(() => {
        handleSubmit()
        }, 100);
        }
    }, [data])


 

    return (
        <PreferencesLayout progress="86" backPAth='' farwordPath="" handleSubmit={handleSubmit} isLast={false} isShowButton={false} >
            <div className={ fadeOut && 'fade-out-animation' } data-aos="fade-in" data-aos-delay="100" data-aos-easing="ease" data-aos-duration="300">

                <div className="w-full flex flex-col items-center justify-between  ">

                    {/* <h3 className="text-[#FFFFFF]  pt-[4rem] md:pt-[6rem] text-center font-semibold lg:text-[25px] text-[20px] uppercase">
                        Let's set up your club profile
                    </h3> */}


                    <h3 className="text-[#FFFFFF]  pt-[4rem] md:pt-[6rem]  text-center font-semibold lg:text-[25px] text-[20px] uppercase">
                        SELECT YOUR MAIN OBJECTIVES <br/> BY JOINING  CAPITAL CLUB
                    </h3>

                    {/* <h1 className="text-[#FFFFFF] text-center font-normal text-[16px] md:text-[20px] uppercase  pt-1">
                        SELECT YOUR MAIN OBJECTIVES BY JOINING  CAPITAL CLUB
                    </h1> */}
                     <div className="card-bg border-rounded-15 mt-5"> 
                    <section className="  w-full      flex justify-center items-center">
                        <div className="container mx-auto p-5 ">
                            <div className="grid grid-cols-12 flex items-center">
                                <div className="col-span-12">
                                    <div className=" mx-auto">


                                        <div className="flex flex-col items-center justify-center">

                                            {/*  <!-- Component Start -->*/}
                                            <form
                                                className="w-full    "
                                                action="">
                                                <div>


                                                    <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3     gap-[8px]">
                                                        {slides.map((card, index) => (
                                                            <div
                                                                key={card?.id}
                                                                onClick={() => handleCardClick(card?.name)}
                                                                className={`${selectedObjective == card?.name
                                                                    ? " bg-[#1a1a1a]  innerBorderLinkSelected  "
                                                                    : " bg-[#191919] "
                                                                    } lg:cursor-pointer rounded-[10px]  w-full h-[2.3rem] md:h-[4rem] md:mx-2 px-5 flex justify-center items-center `}
                                                            >
                                                                {/* {selectedObjective == card?.name ? <img
                                                                    src={check}
                                                                    className="w-[1.125rem]  h-[1.125rem]"
                                                                    alt="uncheck"
                                                                />
                                                                    : <div className='h-[18px] w-[18px] rounded-full innerBorder'></div>} */}



                                                                <h6 className={` ${selectedObjective == card?.name ? 'text-[#1b1b1b]' : 'text-[#fff]' } fw-semibold text-[14px] text-center pt-[2px] pl-[16px] `}>{card?.name} </h6>

                                                            </div>
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






            </div>
        </PreferencesLayout>
    );
};
;
export default BusinessRevenue;
