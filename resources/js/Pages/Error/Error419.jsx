import React, { useEffect } from "react";
import error1 from "../../../assets/svg/error1.svg";
import logo from "../../../assets/svg/logo.svg";
import Button from "../../Components/Button";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { ReactComponent as Usericon } from "../../../assets/svg/countinuebtn.svg";
const Error419 = () => {
    useEffect(() => {
        AOS.init();
    }, [])
    return (
        <div className="mybg">
            <section data-aos="fade-in" data-aos-delay="100" data-aos-easing="ease" data-aos-duration="300" className="noise-20">
                <div className="container mx-auto px-5 xl:px-0">
                    <div className="grid grid-cols-12">
                        <div className="col-span-12">
                            <div className=" flex justify-between h-[100vh] flex-col">
                                <img
                                    className="mx-auto my-5"
                                    src={logo}
                                    alt=""
                                />
                                <div className="h-[100vh] text-center flex flex-col justify-center items-center">
                                    <div className="flex space-x-[24px] ">
                                        {" "}
                                        <h6 className=" text-[8.688rem] md:text-[10.688rem] lg:text-[14.688rem] ">
                                            4
                                        </h6>{" "}
                                        <img src={error1} className="h-[8rem] md:h-[10rem] lg:h-[14rem]  " />{" "}
                                        <h6 className=" text-[8.688rem] md:text-[10.688rem] lg:text-[14.688rem] ">9</h6>
                                    </div>{" "}
                                    <p className="-mt-8 fs-large fw-regular text-[#ffffff80]">
                                        Sorry your session has been expired .Please
                                        refresh and try again.{" "}
                                    </p>
                                </div>


                                <div className="flex justify-center w-full py-[3rem] ">
                                    <Button
                                        icon={<Usericon />}
                                        className={"secondary icon mt-[50px] uppercase"}
                                    >
                                        Go To Home
                                    </Button>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Error419;
