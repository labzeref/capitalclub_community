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
import uncheck from "../../../assets/img/uncheck.png";
import clickSound from "../../../assets/clickSound.wav";
import check from "../../../assets/img/CheckCircle.png";
import IconButton from "@/Components/IconButton";
import ReactToast from "@/Components/ReactToast";
import PreferencesLayout from "@/Layouts/PreferencesLayout";
import { useRef } from "react";
import { motion } from "framer-motion"
const TopInterest = ({ categories , setData  , data}) => {
    useEffect(() => {
        AOS.init();
    }, [])
    const { auth } = usePage().props;

    const [topicData, setTopicData] = useState([]);

    const topics = (e) => {
        setTopicData(e)
    }

    const [selectedCards, setSelectedCards] = useState([]);

    useEffect(() => {
        topics(selectedCards)
    }, [selectedCards])

    const handleCardClick = (id) => {
        if (selectedCards.includes(id)) {
            //  playAudio()
            setData('top_interests', selectedCards.filter(card => card !== id));
            setSelectedCards(selectedCards.filter(card => card !== id));
        } else {
            if (selectedCards.length < 3) {
                //  playAudio()
                setData('top_interests', [...selectedCards, id]);
                setSelectedCards([...selectedCards, id]);
            }
        }
    };





    // const { data, setData, post, processing, errors } = useForm({
    //   top_interests: [],
    // });

    const handleSubmit = () => {

        if (data?.top_interests?.length < 0 ) {
            ReactToast('error', 'Please select an interest');
        }else{

        }

        setTimeout(() => {
            post(route("preference.top-interest-store"), {
                preserveScroll: true,
                onBefore: () => {
                    if (data?.top_interests?.length > 0) {
                        setFadeOut(true)}
                }
            });

        }, 300);
    };

    // useEffect(() => {
    //   if (errors.top_interests) {
    //     ReactToast('error', errors.top_interests);
    //   }
    // }, [errors]);


    const [fadeOut, setFadeOut] = useState(false);

    // useEffect(() => {
    //   if (data?.top_interests?.length === 3) {
    //     setFadeOut(true)
    //     setTimeout(() => {
    //       handleSubmit()
    //     }, 100);
    //   }
    // }, [data])
    const divRef = useRef(null);

    const scrollToDefault = () => {
        if (divRef.current) {
          divRef.current.scrollTop = 20;
        }
      };

    React.useEffect(() => {
        scrollToDefault();
      }, []);
    

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
        // <PreferencesLayout progress="20" backPAth='' farwordPath="" handleSubmit={handleSubmit} isLast={false} isShowButton={true} >
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="w-full"
        >
            <p className="prefrence-heading text-center heading-padding  padding-prefrence-xs mb-6">
                SELECT THREE
                INTERESTS

            </p>
            <div onContextMenu={handleContextMenu} className={`w-full card-bg input-shadow border-rounded-15 ${fadeOut && 'fade-out-animation'} `}>

                <section className="flex justify-center items-center"  >
                    <div className="container mx-auto p-2 relative"  >

                        <div className={`interests-shadow top ${showTopShadow ? '' : 'shadow-off'}`}></div>
                        <div className={`interests-shadow bottom ${showBottomShadow ? '' : 'shadow-off'}`}></div>

                        <div ref={divRef} className="mx-auto relative interest-h  border-rounded-10 " onScroll={handleScroll}   >
                            
                            <div   className="grid  grid-cols-2 interest-choice-gap  ">
                                {categories.map((card, index) => (
                                    <div
                                        key={card?.id}
                                        onClick={() =>{ handleCardClick(card?.id) }}
                                        className={`${selectedCards.includes(card.id)
                                            ? "bg-[#c8c8c8]     "
                                            : " bg-[#191919]"
                                        } lg:cursor-pointer input-shadow   border-rounded-10  padding-top-interest  industries-width   flex items-center justify-center `}
                                    >
                                        <div className='w-full'>
                                            <div className="w-full flex justify-center "> 
                                                <div className=" ">
                                                    <img
                                                        className={`choice-icon `}
                                                        src={`data:image/svg+xml;utf8,${encodeURIComponent(card?.icon)}`}
                                                        alt=""
                                                        style={{ filter: `brightness(0) invert( ${selectedCards.includes(card.id) ? 0.2 : 0.4})` }}
                                                    />
                                                </div>
                                            </div>
                                            <p className={` ${selectedCards.includes(card?.id) ? 'text-[#1b1b1b]' : 'text-[#fff]'} interest-text fw-medium text-center pt-2 md:pt-2`}>{card?.name} </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>
                </section>
            </div>
        </motion.div>

        // </PreferencesLayout>

    );
};
;
export default TopInterest;
