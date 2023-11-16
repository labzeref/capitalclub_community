import React from "react";
import house from "../../../assets/House.png";
import life from "../../../assets/BezierCurve.png";
import music from "../../../assets/Music.png";
import cross from "../../../assets/cross.png";
import check from "../../../assets/img/CheckCircle.png";
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
const Interests = ({ categories, profile, user, interests }) => {
    // console.log("categories");
    // console.log(categories);
    // console.log("profile");
    // console.log(profile);

    // console.log("user");
    // console.log(user);

    // console.log("interests");
    // console.log(interests);


    const { delete: deleteRequest } = useForm();

    const handleSubmit = (e, id) => {
        e.preventDefault();
        deleteRequest(route('profile.interests.delete', id));
    };


    return (
        <div>
            <div data-aos="fade-in" data-aos-delay="100" data-aos-easing="ease" data-aos-duration="300" className=" md:px-6 lg:px-0    containerMedium">
                <div className="grid grid-cols-12 gap-4 px-5 lg:px-0">



                </div>
                <div className=" xl:min-h-[65vh] 2xl:min-h-[70vh] flex flex-col justify-between">
                    <div>
                        <div className="  w-full ">
                            <p className="  text-center  w-full md:pt-[4rem] fs-x-large fw-medium px-6 lg:px-0 ">

                                INTERESTS
                            </p>
                        </div>
                        <div className="   py-4 lg:py-6">

                            <div className=" w-[70%]  flex justify-center  mx-auto px-4 lg:px-0">

                              <div className="flex flex-col md:flex-row justify-center">

                                    {user?.interests?.map((item, index) => (

                                     <div key={index+3} className="relative m-4 border-rounded-10 bg-[#1a1a1a] isIcon flex justify-center  items-center  inset-border h-[129px] w-[163px] md:h-[136px] md:w-[200px]   ">
                                         <div className=" absolute    left-2   top-2">
                                             <img
                                                 src={check}
                                                 alt="home"
                                                 className="w-5 h-5   md:mr-3 mx-auto md:mx-0 mb-2 md:mb-0"
                                             />
                                         </div>
                                         <div className="flex-col flex justify-center  items-center  text-center">
                                         {/* <img
                                   className="md:w-10 md:h-10 w-12 h-12   mx-auto md:mx-0 mb-2 md:mb-0"
                                    src={`data:image/svg+xml;utf8,${encodeURIComponent(item?.icon)}`}
                                    alt=""
                                    style={{ filter: `brightness(0) invert(1})` }}
                                  /> */}


                                             <img
                                    className={` w-[30px] h-[30px] md:w-[40px] md:h-[40px] `}
                                    src={`data:image/svg+xml;utf8,${encodeURIComponent(item?.icon)}`}
                                    alt=""
                                    style={{ filter: `brightness(0) invert( 0.6 )` }}
                                  />


                                             <p className=" fs-regular fw-regular pt-3  ">

                                                 {item?.name}
                                             </p>
                                         </div>
                                     </div>

                             ))}

                                 </div>
                            </div>
                        </div>


                        {user?.business_owner &&
                            <div className="flex justify-center w-full">
                                <div className="md:flex  w-full md:w-auto gap-7 my-[16px] ">
                                    <div className="  text-center  md:text-end   ">
                                        <p className="py-3 fs-x-large fw-medium">   BUSINESS </p>
                                    </div>
                                    <div className="   flex justify-center px-4 md:px-0">
                                        <div className=" w-[100%] max-w-[300px] md:w-[280px] flex bg-[#1a1a1a] border-rounded-10 p-6 gap-4 fs-regular fw-regular">
                                            <img
                                                src={check}
                                                className="w-[1.125rem] mt-[2px]  h-[1.125rem]"
                                                alt="uncheck"
                                            /> {user?.business_owner}</div>
                                    </div>
                                </div>
                            </div>
                        }
                        {user?.industry &&
                            <div className="flex justify-center w-full">
                                <div className="md:flex  w-full md:w-auto gap-7 my-[16px] ">
                                    <div className="  text-center  md:text-end w-full md:w-[50%] ">
                                        <p className="py-3 fs-x-large fw-medium"> INDUSTRY  </p>
                                    </div>
                                    <div className="   flex justify-center px-4 md:px-0">
                                        <div className=" w-[100%] max-w-[300px] md:w-[280px] flex bg-[#1a1a1a] border-rounded-10 p-6 gap-4 fs-regular fw-regular">
                                            <img
                                                src={check}
                                                className="w-[1.125rem] mt-[2px]  h-[1.125rem]"
                                                alt="uncheck"
                                            /> {user?.industry} </div>


                                    </div>
                                </div>
                            </div>
                        }
                        {user?.annual_revenue &&
                            <div className="flex justify-center w-full">
                                <div className="md:flex  w-full md:w-auto gap-7 my-[16px] ">
                                    <div className="  text-center  md:text-end w-full md:w-[50%] ">
                                        <p className="py-3 fs-x-large fw-medium">   REVENUE</p>
                                    </div>
                                    <div className="   flex justify-center px-4 md:px-0">
                                        <div className=" w-[100%] max-w-[300px] md:w-[280px] flex bg-[#1a1a1a] border-rounded-10 p-6 gap-4 fs-regular fw-regular">
                                            <img
                                                src={check}
                                                className="w-[1.125rem] mt-[2px]  h-[1.125rem]"
                                                alt="uncheck"
                                            /> {user?.annual_revenue}</div>


                                    </div>
                                </div>
                            </div>

                        }

                        {user?.objective &&
                           <div className="flex justify-center w-full">
                           <div className="md:flex  w-full md:w-auto   my-[16px] ">
                               <div className="  text-center  md:text-start w-full md:w-[50%] ">
                                    <p className="py-3 fs-x-large fw-medium md:-ml-8">   OBJECTIVES</p>
                                </div>
                                <div className="md:ml-8 flex justify-center px-4 md:px-0">
                                        <div className=" w-[100%] max-w-[300px] md:w-[280px] flex bg-[#1a1a1a] border-rounded-10 p-6 gap-4 fs-regular fw-regular">
                                        <img
                                            src={check}
                                            className="w-[1.125rem] mt-[2px]  h-[1.125rem]"
                                            alt="uncheck"
                                        /> {user?.objective}</div>


                                </div>
                                </div>
                                </div>
                        }







                    </div>
                </div>
                {/* <div className="flex space-x-[24px] lg:space-x-[8px] px-6 lg:px-0 "> */}
                <div className="grid grid-cols-12 gap-4 ">
                    <div className="md:col-span-2 col-span-0   hidden md:block md:px-4 lg:px-0">

                    </div>
                    <div className=" flex col-span-10 md:col-span-10 gap-3 px-4 lg:px-0">
                        {/*
                        <Button
                            onClick={() => setShowModal(false)}
                            icon={<Check />}
                            className={"primary mt-[10px] uppercase"}
                        >
                            Save Interests
                        </Button> */}
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
