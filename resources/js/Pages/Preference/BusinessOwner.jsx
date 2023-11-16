import React, { useEffect } from "react";
import logo from "../../../assets/svg/logo.svg";
import lander from "../../../assets/svg/glitch.svg";
import Button from "@/Components/Button";
import { ReactComponent as WELCOMEARROW } from "../../../assets/svg/WELCOMEARROW.svg";
import { Link, useForm, usePage } from "@inertiajs/react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useState } from "react";
import uncheck from "../../../assets/img/uncheck.png";
import check from "../../../assets/img/CheckCircle.png";
import IconButton from "@/Components/IconButton";
import ReactToast from "@/Components/ReactToast";
import PreferencesLayout from "@/Layouts/PreferencesLayout";
import CheckFields from "@/Components/CheckFields";
const BusinessOwner = ({ setData, data }) => {
    useEffect(() => {
        AOS.init();
    }, [])
    const { auth } = usePage().props;
    // console.log('auth from use................' , auth)






    const slides = [
        {
            id: 0,
            name: "YES",
        },
        {
            id: 1,
            name: "NO",
        }

    ];

    useEffect(() => {
        document.addEventListener('aos:in', ({ detail }) => {
            // console.log('animated in', detail);
        });
    }, [])


    const [selectedBusinessType, setSelectedBusinessType] = useState('');

    const handleCardClick = (name) => {
        if (selectedBusinessType === name) {
            setData('business_owner', null)
            setSelectedBusinessType(null); // Deselect the option
        } else {
            setData('business_owner', name)
            setSelectedBusinessType(name); // Select the option
        }
    };




    // const { data, setData, post, processing, errors } = useForm({
    //     business_owner: '',
    // });





    // const handleSubmit = (event) => {

    //     post(route("preference.business-owner-store"), {
    //         preserveScroll: true,
    //         onBefore: () => {
    //             if (data?.business_owner) {
    //               setFadeOut(true)}
    //           }

    //     });
    // };


    // useEffect(() => {
    //     if (errors.business_owner) {
    //         ReactToast('error', errors.business_owner);
    //     }
    // }, [errors]);


    const [fadeOut, setFadeOut] = useState(false);

    // useEffect(() => {
    //     if (data?.business_owner!=='') {
    //         setFadeOut(true)
    //         setTimeout(() => {
    //         //   handleSubmit()
    //           }, 100);
    //     }
    // }, [data])

    const handleContextMenu = (e) => {
        e.preventDefault(); 
      };

    return (
        // <PreferencesLayout  progress="40" backPAth='' farwordPath="" handleSubmit={handleSubmit} isLast={false} isShowButton={false}>
        <div onContextMenu={handleContextMenu} className={` ${fadeOut && 'fade-out-animation'}  w-full  flex flex-col justify-center `} >





            <h3 className="prefrence-heading text-center  padding-industry-text mb-[9px] md:mb-7">
                DO YOU OWN
                A BUSINESS?
            </h3>

            {/* <h1 className=" pref-sub-heading pt-1">
                                        Do you have a business
                                    </h1> */}


                    <div className=" border-rounded-15">
            <section className=" w-full   flex justify-center items-center">
                <div className="container mx-auto px-0 xl:px-0 max-w-xl ">
                    <div className="grid grid-cols-12 flex items-center card-bg input-shadow padding-onboard rounded-[10px]">
                        <div className="col-span-12">
                            <div className=" mx-auto">


                                    <div className="flex flex-col items-center justify-center">

                                        {/*  <!-- Component Start -->*/}
                                        <form
                                            className="w-full"
                                            action="">
                                            <div>


                                                <div className="grid gap-y-2 md:gap-y-2.5">
                                                    {slides.map((card, index) => (
                                                        <React.Fragment key={card?.id}>
                                                            <div onClick={() => handleCardClick(card?.name)}>

                                                                <CheckFields

                                                                    name={card?.name}
                                                                    bgClass={selectedBusinessType == card?.name ? "bg-[#c8c8c8]" : "bg-[#191919]"}
                                                                    textClass={selectedBusinessType == card?.name ? 'text-[#1b1b1b]' : 'text-[#fff]'}
                                                                > </CheckFields>
                                                            </div>
                                                        </React.Fragment>
                                                        // <div
                                                        //     key={card?.id}
                                                        //     onClick={() => handleCardClick(card?.name)}
                                                        //     className={`${selectedBusinessType == card?.name
                                                        //         ? " bg-[#c8c8c8]      "
                                                        //         : "bg-[#191919] "
                                                        //         } lg:cursor-pointer input-shadow border-rounded-10 w-full choice-height-options flex justify-center items-center `}
                                                        // >
                                                        //     <h6 className={` ${selectedBusinessType == card?.name ? 'text-[#1b1b1b]' : 'text-[#fff]'} choice-text-options pt-[2px] text-center   `}>{card?.name} </h6>

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

export default BusinessOwner;
