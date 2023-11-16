import React from "react";
import Layout from "@/Layouts/Layout.jsx";
import ProfileLayout from "@/Layouts/ProfileLayout";
import SessionLayout from "@/Layouts/SessionLayout";

const Privacy = () => {
    return (
        <div>
            <div>
                <div data-aos="fade-in" data-aos-delay="100" data-aos-easing="ease" data-aos-duration="300" className=" pt-[3rem] containerMedium">
                    <div className="grid grid-cols-12 gap-4 px-5 lg:px-0">
                        <div className="col-span-0 md:col-span-2 hidden md:block"> </div>
                        <div className="col-span-12 md:col-span-10">
                            <div className="col-span-12 md:col-span-10">
                                <div className="flex justify-center md:justify-start  ">
                                    <h3 className="    ">Privacy  </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-12 gap-4 mt-4 md:mt-[45px] px-5 lg:px-0">
                        <div className="col-span-12 md:col-span-2">
                            <p className="py-3 fs-regular fw-medium"> Your Activity</p>
                        </div>

                        <div className="col-span-12 md:col-span-10">
                            <div className="grid grid-cols-12 gap-4 border-b border-[#ffffff10] pb-2">
                                <div className="col-span-8 lg:col-span-8">
                                    {" "}
                                    <p className=" fs-medium fw-regular  opacity-50	 ">
                                        {" "}
                                        Who can see your future posts?{" "}
                                    </p>
                                </div>
                                <div className="col-span-2 lg:col-span-2">
                                    {" "}
                                    <p className=" fs-regular fw-regular cursor-pointer"> Public </p>
                                </div>
                                <div className="col-span-2 lg:col-span-2">
                                    {" "}
                                    <p className=" fs-regular fw-regular cursor-pointer"> Edit</p>
                                </div>
                            </div>
                            <div className="col-span-10 lg:col-span-10 paddingSectionXSmall">
                                <div className="grid grid-cols-12 gap-4 border-b border-[#ffffff10] tableRowSpaceY2">
                                    <div className="col-span-8 lg:col-span-8">
                                        {" "}
                                        <p className="fs-medium fw-regular opacity-50 paddingSectionXSmall ">
                                            {" "}
                                            Who can follow you?{" "}
                                        </p>

                                    </div>
                                    <div className="col-span-2 lg:col-span-2 paddingSectionXSmall" >
                                        {" "}
                                        <p className=" fs-regular fw-regular cursor-pointer"> Public </p>
                                    </div>
                                    <div className="col-span-2 lg:col-span-2 paddingSectionXSmall">
                                        {" "}
                                        <p className=" fs-regular fw-regular cursor-pointer"> Edit</p>
                                    </div>
                                    <div className="col-span-10 lg:col-span-8">

                                        <p className="small normal opacity-50">
                                            Remember, your friends control who can see their friendships
                                            on their own Timelines. If people can see your friendship on
                                            another timeline, they'll be able to see it in News Feed,
                                            search and other places on Facebook. If you set this to Only
                                            me, only you will be able to see your full friends list on
                                            your timeline. Other people will see only mutual friends.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-12 gap-4   tableRowSpaceY2">
                                <div className="col-span-8 lg:col-span-8">
                                    {" "}
                                    <p className="fs-medium fw-regular opacity-50">
                                        {" "}
                                        Who can see your future posts?
                                    </p>
                                </div>
                                <div className="col-span-2 lg:col-span-2">
                                    {" "}
                                    <p className=" fs-regular fw-regular cursor-pointer"> Public </p>
                                </div>
                                <div className="col-span-2 lg:col-span-2">
                                    {" "}
                                    <p className=" fs-regular fw-regular cursor-pointer"> Edit</p>
                                </div>
                            </div>


                        </div>


                    </div>
                </div>
            </div>
        </div>
    );
};

Privacy.layout = page => (
    <SessionLayout>
        <ProfileLayout children={page} pageTitle={''} />
    </SessionLayout>
)

export default Privacy;
