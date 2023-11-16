import React, { useEffect } from "react";
import logo from "../../../assets/svg/logo.svg";
import lander from "../../../assets/svg/glitch.svg";
import Button from "@/Components/Button";
import { ReactComponent as ContinueButton } from "../../../assets/svg/countinuebtn.svg";
import { Link, usePage } from "@inertiajs/react";
import InterestLayout from "@/Layouts/InterestLayout";
import AOS from 'aos';
import 'aos/dist/aos.css';
const GlitchId = () => {
    useEffect(() => {
        AOS.init();
    }, [])
    const { auth } = usePage().props;
    // console.log('auth from use................' , auth)
    return (
        <div>


            <section className="md:my-4 lg:my-0">
                <div className="container mx-auto px-5 xl:p-0">
                    <div className="grid grid-cols-12">
                        <div className="col-span-12">
                            <div className="min-h-[90vh]  h-full flex flex-col items-center justify-center">
                                <img
                                    className="h-56 xl:h-72 mb-3 md:mb-10"
                                    src={lander}
                                    alt=""
                                />
                                <h1 className="text-[#FFFFFF] font-normal text-3xl lg:text-[48px] uppercase">
                                    Now you are
                                </h1>
                                <h1 className="text-[#FFFFFF] text-[48px] lg:text-[64px] uppercase font-bold mt-2 md:mt-0">
                                    Glitch #{auth.user.id}
                                </h1>
                                <p className="text-xl text-[#FFFFFF] font-normal mt-2 md:mt-0 ">
                                    Welcome to capital club
                                </p>
                                <Link href={route('academy')}>
                                    <Button
                                        icon={<ContinueButton />}
                                        className={"primary icon md:mt-[32px] mt-[20px] uppercase"}
                                    >
                                        Continue
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
GlitchId.layout = (page) => <InterestLayout children={page} title="" />;
export default GlitchId;
