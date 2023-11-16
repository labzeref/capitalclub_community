import React from "react";
import house from "../../../assets/House.png";
import life from "../../../assets/BezierCurve.png";
import music from "../../../assets/Music.png";
import cross from "../../../assets/cross.png";
import IntrestModal from "../../Components/Modal/IntrestModal";
import Button from "../../Components/Button";
import { ReactComponent as Check } from "../../../assets/svg/Check.svg";
import Layout from "@/Layouts/Layout.jsx";
import ProfileLayout from "@/Layouts/ProfileLayout";
import SessionLayout from "@/Layouts/SessionLayout";
import { useForm } from "@inertiajs/react";

/**
 * interests_ids
 * route('profile.interests.update')
 */
const Interests = ({ categories, profile }) => {
    console.log("categories");
    console.log(categories);
    console.log("profile");
    console.log(profile);

    const { delete: deleteRequest } = useForm();

    const handleSubmit = (e, id) => {
        console.log('id is ............................', id)
        e.preventDefault();
        deleteRequest(route('profile.interests.delete', id));
    };


    return (
        <div>
            <div data-aos="fade-in" data-aos-delay="100" data-aos-easing="ease" data-aos-duration="300" className=" paddingSectionMedium containerMedium">
                <div className="grid grid-cols-12 gap-4 px-5 lg:px-0">
                    <div className="col-span-2 lg:col-span-2 hidden lg:block">
                        {" "}
                    </div>

                    <div className="col-span-12 lg:col-span-10">
                        <div className="flex justify-between  items-center">
                            <h3 className="    ">Intrested</h3>
                            <IntrestModal categories={categories} profile={profile} />
                        </div>
                    </div>
                </div>
                <div className=" xl:min-h-[65vh] 2xl:min-h-[70vh] flex flex-col justify-between">
                    <div>
                        <div className="grid grid-cols-12 gap-4 py-4 lg:py-12">
                            <div className="col-span-12 md:col-span-2 ">
                                <p className="py-2 lg:py-6 fs-regular fw-medium px-6 lg:px-0 ">
                                    {" "}
                                    Industries
                                </p>
                            </div>
                            <div className="col-span-12 md:col-span-10 px-4 lg:px-0">
                                <div className="grid grid-cols-12 gap-4">
                                    {" "}
                                    {profile?.interests?.map((item, index) => (
                                        <div className="col-span-6 md:col-span-4">
                                            <div className="relative  isIcon noise-10 inset-border h-[129px] w-[163px] md:h-auto md:w-auto p-[20px] ">
                                                <div onClick={(e) => { handleSubmit(e, item?.id) }} className=" absolute    right-1   top-1">
                                                    <svg
                                                        width="20"
                                                        height="20"
                                                        viewBox="0 0 20 20"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <g
                                                            opacity="0.6"
                                                            clipPath="url(#clip0_1371_78706)"
                                                        >
                                                            <path
                                                                opacity="0.4"
                                                                d="M10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 5.85786 14.1421 2.5 10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5Z"
                                                                fill="white"
                                                            />
                                                            <path
                                                                d="M12.5 7.5L7.5 12.5"
                                                                stroke="white"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            />
                                                            <path
                                                                d="M7.5 7.5L12.5 12.5"
                                                                stroke="white"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            />
                                                            <path
                                                                d="M10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 5.85786 14.1421 2.5 10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5Z"
                                                                stroke="white"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            />
                                                        </g>
                                                        <defs>
                                                            <clipPath id="clip0_1371_78706">
                                                                <rect
                                                                    width="20"
                                                                    height="20"
                                                                    fill="white"
                                                                />
                                                            </clipPath>
                                                        </defs>
                                                    </svg>
                                                </div>
                                                <div className="md:flex justify-center md:justify-start items-center md:items-start md:text-start text-center">
                                                    {" "}
                                                    <img
                                                        src={item?.icon?.url}
                                                        alt="home"
                                                        className="md:w-5 md:h-5 w-12 h-12 md:mr-3 mx-auto md:mx-0 mb-2 md:mb-0"
                                                    />{" "}
                                                    <p className=" fs-regular fw-regular   ">
                                                        {" "}
                                                        {item?.name}{" "}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="flex space-x-[24px] lg:space-x-[8px] px-6 lg:px-0 "> */}
                <div className="grid grid-cols-12 gap-4 ">
                    <div className="md:col-span-2 col-span-0   hidden md:block md:px-4 lg:px-0">

                    </div>
                    <div className=" flex col-span-10 md:col-span-10 gap-3 px-4 lg:px-0">
                        <Button
                            onClick={() => setShowModal(false)}
                            className={"secondary mt-[10px] uppercase"}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={() => setShowModal(false)}
                            icon={<Check />}
                            className={"primary mt-[10px] uppercase"}
                        >
                            Save Interests
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

Interests.layout = (page) => (
    <SessionLayout>
        <ProfileLayout children={page} pageTitle={""} />
    </SessionLayout>
);

export default Interests;
