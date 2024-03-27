import React, { useRef } from "react";
import Layout from "@/Layouts/Layout.jsx";
import Button from "../../Components/Button";
import OwlCarousel from "react-owl-carousel";

import { ReactComponent as WatchSvg } from "../../../assets/svg/watch.svg";
import { ReactComponent as ArrowRight } from "../../../assets/svg/ArrowRight.svg";
import { ReactComponent as ArrowLeft } from "../../../assets/svg/ArrowLeft.svg";



import liveplace from "../../../assets/liveplace.png";






import LiveBadge from "@/Components/LiveBadge";
import { Head, Link } from "@inertiajs/react";
import IconButton from "@/Components/IconButton";
import AcademySmallCard from "@/Components/Course/AcademySmallCard";
import AcademyLargeCard from "@/Components/Course/AcademyLargeCard";
import { useState } from "react";
import PlyrComponent from "@/Components/PlyrComponent";

const RestreamLink = ({ singleLiveStream }) => {

    const handleContextMenu = (e) => {
        e.preventDefault();
    };

    return (
        <div onContextMenu={handleContextMenu} className="mt-[2rem] lg:mt-[4rem] ">
            <Head title="Live" />
            <div data-aos="fade-in" data-aos-delay="100" data-aos-easing="ease" data-aos-duration="300" className=" px-5 md:px-3 container mx-auto  ">

                <div className="container mx-auto">
                    {/* ******************************************** New Large card LIVE NOW ************************ */}
                    <div>
                        <h1 className="text-50 text-center   ">{singleLiveStream?.title}</h1>
                    </div>



                    <div className="mt-[20px] md:mt-[40px]">
                        <>
                            <div style={{padding: "56.25% 0 0 0", position: "relative"}}>
                                <iframe src={singleLiveStream?.restream_link}
                                        allow="autoplay" allowFullScreen frameBorder="0" style={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    width: "100%",
                                    height: "100%"
                                }}>
                                </iframe>
                            </div>
                        </>
                    </div>
                </div>
            </div>
        </div>


    );
};
RestreamLink.layout = (page) => <Layout children={page}/>;
export default RestreamLink;
