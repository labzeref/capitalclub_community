import React, { useEffect } from "react";
import logo from "../../../assets/svg/logo.svg";
import lander from "../../../assets/svg/glitch.svg";
import Button from "@/Components/Button";
import { ReactComponent as WELCOMEARROW } from "../../../assets/svg/WELCOMEARROW.svg";
import { Link, useForm, usePage } from "@inertiajs/react";
import InterestLayout from "@/Layouts/InterestLayout";
import AOS from 'aos';
import 'aos/dist/aos.css';
import IconButton from "@/Components/IconButton";
import check from "../../../assets/img/CheckCircle.png";
import { useState } from "react";
import ReactToast from "@/Components/ReactToast";
import PreferencesLayout from "@/Layouts/PreferencesLayout";
import CheckFields from "@/Components/CheckFields";




const BusinessIndustry = ({ industries, setData, data, fadeOut }) => {
    useEffect(() => {
        AOS.init();
    }, [])
    const { auth } = usePage().props;


    const [selectedIndustry, setSelectedIndustry] = useState([]);
    const handleCardClick = (id) => {
        if (selectedIndustry.includes(id)) {
            setData('industries', selectedIndustry.filter(industry => industry !== id))
            setSelectedIndustry(selectedIndustry.filter(industry => industry !== id));

        } else if (selectedIndustry.length < 3) {
            setData('industries', [...selectedIndustry, id])
            setSelectedIndustry([...selectedIndustry, id]);

        }
    };

    // const { data, setData, post, processing, errors } = useForm({
    //     industries: [],
    // })
    const handleSubmit = (e) => {



        setTimeout(() => {

            post(route('preference.business-industry-store'), {
                preserveScroll: true,
                onBefore: () => {
                    // if (data?.industry) {
                    //   setFadeOut(true)
                    // }
                }
            });

        }, 300);
    }
    // useEffect(() => {
    //     if (errors.industries) {
    //         ReactToast('error', errors.industries);
    //     }
    // }, [errors]);




    // const [fadeOut, setFadeOut] = useState(false);
    // useEffect(() => {
    //     if (data?.industry !== '') {
    //         setFadeOut(true)
    //         setTimeout(() => {
    //             handleSubmit()
    //         }, 100);
    //     }
    // }, [data])







    const [visibleItems, setVisibleItems] = useState([]);
    const itemsPerPage = 12;
    const scrollThreshold = 100;

    useEffect(() => {
        function handleScroll() {
            if (
                window.innerHeight + window.scrollY >=
                document.body.offsetHeight - scrollThreshold
            ) {
                const nextItems = industries.slice(0, visibleItems.length + itemsPerPage);
                setVisibleItems(nextItems);
            }
        }
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [visibleItems, industries]);

    useEffect(() => {
        setVisibleItems(industries.slice(0, itemsPerPage));
    }, [industries]);








    const [showTopShadow, setShowTopShadow] = useState(false);
    const [showBottomShadow, setShowBottomShadow] = useState(true);

    const handleScroll = (event) => {
        const { scrollTop, scrollHeight, clientHeight } = event.target;

        // Calculate the remaining space at the top and bottom
        const remainingTopSpace = scrollTop;
        const remainingBottomSpace = scrollHeight - scrollTop - clientHeight;

        // Set the state to show/hide the top and bottom shadows based on the remaining space
        setShowTopShadow(remainingTopSpace >= 20);
        setShowBottomShadow(remainingBottomSpace >= 20);
    };


    const handleContextMenu = (e) => {
        e.preventDefault(); 
      };

    return (
        // <PreferencesLayout progress="60" backPAth='' farwordPath="" handleSubmit={handleSubmit} isLast={false} isShowButton={false} >
        <div onContextMenu={handleContextMenu} className={` ${fadeOut && 'fade-out-animation'} w-full `} >
            <div className=" padding-industry-text mb-[9px] md:mb-7">
                <h3 className="prefrence-heading text-center">
                    WHAT INDUSTRY ARE YOU IN?
                </h3>

                <p className="text-[0.5rem] md:text-[0.6rem] pt-[4px] text-center ">
                    SELECT UP TO THREE
                </p>
            </div>

            <div className="max-w-xl mx-auto card-bg input-shadow border-rounded-15 mt-1   ">

                <section className="  w-full    flex md:justify-center items-center">
                    <div className="container mx-auto padding-onboard relative">


                        {/*  <!-- Component Start -->*/}


                        <div className={`interests-shadow top ${showTopShadow ? '' : 'shadow-off'}`}></div>
                        <div className={`interests-shadow bottom ${showBottomShadow ? '' : 'shadow-off'}`}></div>
                        {/* <div className={`lessons-shadow top ${showTopShadow ? '' : 'none'}`}></div> */}
                        <div onScroll={handleScroll} className="grid business-industry-height border-rounded-10 industry-scroll overflow-y-auto  gap-y-2 md:gap-[10px]">
                            {industries.map((card, index) => (
                                <React.Fragment key={index+3}>
                                    <React.Fragment key={card?.id}>
                                        <div onClick={() => handleCardClick(card?.id)}>
                                            <CheckFields
                                                name={card?.name}
                                                bgClass={selectedIndustry.includes(card?.id) ? "bg-[#c8c8c8]" : "bg-[#191919]"}
                                                textClass={selectedIndustry.includes(card?.id) ? 'text-[#1b1b1b]' : 'text-[#fff]'}
                                            > </CheckFields>
                                        </div>
                                    </React.Fragment>
                                </React.Fragment>
                            ))}
                        </div>

                        {/*  <!-- Component End  -->*/}


                    </div>
                    {/*  <!-- container End -->*/}

                </section>
            </div>



        </div>
        // </PreferencesLayout>
    );
};

export default BusinessIndustry;
