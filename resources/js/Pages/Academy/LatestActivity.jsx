import React from "react";
import Layout from "@/Layouts/Layout";
import profilepic from "../../../assets/img/profilepic.png";
import enola from "../../../assets/img/enola.png";
import emily from "../../../assets/img/emily.png";
import leaf from "../../../assets/svg/leaf.svg";
import SessionLayout from "@/Layouts/SessionLayout";
import { motion } from "framer-motion"
import ProfileLayout from "@/Layouts/ProfileLayout.jsx";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Activity from "@/Components/Activity";
const LatestActivity = () => {
    const [nextPage, setNextPage] = useState(null);
    const [allActivities, setAllActivities] = useState([]);
 
    const handleThreadComments = async () => {
        try {
            const response = await axios.get(route("profile.activity.list"));
            // console.log("fetching all activites successfully:", response.data?.payload);
            setAllActivities(response?.data?.payload?.data)
            setNextPage(response?.data?.payload?.next_page_url)
        } catch (error) {
            // ReactToast('error', error?.response?.data?.payload)
            console.error("Error while   activities:", error);
        }
    };

    useEffect(() => {
        handleThreadComments()
    }, [])

    const loadMore = async () => {
        try {
            const response = await axios.get(nextPage);
            // console.log("fetching more activites successfully:", response?.data?.payload?.data);


            setAllActivities((prevActivities) => prevActivities.concat(response?.data?.payload?.data));
            setNextPage(response?.data?.payload?.next_page_url)
        } catch (error) {
            console.error("Error while load more activities:", error);
        }
    }



    return (
        <div>
            <section className="paddingSectionLarge    ">
                <div data-aos="fade-in" data-aos-delay="100" data-aos-easing="ease" data-aos-duration="300" className="container mx-auto px-5 xl:px-0">
                    <div className="max-w-4xl mx-auto">
                        <div className="grid grid-cols-12">
                            <div className="col-span-12">
                                <div className="text-start">
                                    <p className="font-medium text-[24px]   md:pb-4">
                                        Latest Activity
                                    </p>
                                    <hr className="hidden md:block border-b border-b-[#FFFFFF1a] opacity-10" />
                                </div>
                                {allActivities?.map((data, index) => (
 
                                     <div key={index + 4}>
                                            {allActivities[index - 1]?.created_at !== data?.created_at ? (
                                                <div  >
                                                    <h5 className="paddingSection24">{data?.created_at}</h5>
                                                    <div>
                                                        <Activity classname={allActivities[index + 1]?.created_at == data?.created_at ? 'activity-shadow-start' : 'activity-shadow-start-end'} data={data} />
                                                    </div>
                                                </div>
                                            ) :
                                                <Activity classname={allActivities[index + 1]?.created_at == data?.created_at ? 'activity-shadow' : 'activity-shadow-end'} data={data} />
                                            }
                                        </div> 
                                ))}
                            </div>
                            {
                                nextPage &&

                                <div className="col-span-12">
                                    <div className="flex items-center justify-center md:pt-[4rem] ">
                                        <button className="button secondary" onClick={() => loadMore()}>
                                            <div className="button_container glitch uppercase">
                                                {/* <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <g clipPath="url(#clip0_829_47187)">
                                        <path
                                            opacity="0.2"
                                            d="M10.2266 17.1602C14.3687 17.1602 17.7266 13.8023 17.7266 9.66016C17.7266 5.51802 14.3687 2.16016 10.2266 2.16016C6.08443 2.16016 2.72656 5.51802 2.72656 9.66016C2.72656 13.8023 6.08443 17.1602 10.2266 17.1602Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M13.125 3.46484C14.4334 4.07505 15.5402 5.04627 16.3153 6.26423C17.0903 7.48219 17.5014 8.89619 17.5 10.3398C17.5 12.329 16.7098 14.2366 15.3033 15.6431C13.8968 17.0497 11.9891 17.8398 10 17.8398C8.01088 17.8398 6.10323 17.0497 4.6967 15.6431C3.29018 14.2366 2.5 12.329 2.5 10.3398C2.49865 8.89619 2.90969 7.48219 3.68475 6.26423C4.45982 5.04627 5.56665 4.07505 6.875 3.46484"
                                            stroke="white"
                                            strokeOpacity="0.6"
                                            strokeWidth="1.2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_829_47187">
                                            <rect
                                                width="20"
                                                height="20"
                                                fill="white"
                                            />
                                        </clipPath>
                                    </defs>
                                </svg> */}
                                                Load more
                                            </div>
                                        </button>
                                    </div>
                                </div>

                            }
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
LatestActivity.layout = (page) => (
    <SessionLayout>
        <ProfileLayout children={page} pageTitle={""} />
    </SessionLayout>
);
export default LatestActivity;
