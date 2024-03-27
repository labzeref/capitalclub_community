import React, { useState, useEffect } from "react";
import passicon from "../../../assets/passicon.svg";
import Button from "../../Components/Button";
import { ReactComponent as Check } from "../../../assets/svg/Check.svg";
import Layout from "@/Layouts/Layout.jsx";
import ProfileLayout from "@/Layouts/ProfileLayout";
import SessionLayout from "@/Layouts/SessionLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import ConfirmationModal from "@/Components/Modal/ConfirmationModal";

/**
 * current_password
 * password
 * password_confirmation
 *
 * route('profile.account.update)
 * route('profile.account.delete)
 */
const Security = () => {

    const [show, setShow] = useState(false);

    const { data, setData, delete: deleteRequest, put, processing, errors } = useForm({
        current_password: "",
        password: "",
        password_confirmation: "",
    });

    const [passwrodMatched, setPasswrodMatched] = useState(false);
    useEffect(() => {
        if (data?.password != data?.password_confirmation) {
            setPasswrodMatched(false);
        } else {
            setPasswrodMatched(true);
        }
    }, [data?.password_confirmation]);

    const handleSubmit = (event) => {
        event.preventDefault();

        put(route('profile.account.update'), {
            preserveScroll: true,
            onSuccess: () => {
                setShow(false);
            },
        });
    };



    const handleDeactivate = (event) => {
        event.preventDefault();
        if (!processing) {

            deleteRequest(route('profile.account.deactivate'));
        }
    };


    return (
        <div>
            <Head>
                <title>Settings</title>
            </Head>
            <div data-aos="fade-in" data-aos-delay="100" data-aos-easing="ease" data-aos-duration="300" className=" containerMedium">
                <div className="  page-paddeing  ">
                    <div className="  ">

                        <div className="card-bg profile-card-paddeing border-rounded-15 px-0   mx-[1rem] ">


                            <div className=" px-5 lg:px-0">
                                <div className="flex justify-center   ">
                                    <p className="personal-info-text  "> ACCOUNT SECURITY</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-12 gap-4 mt-[25px] px-2 lg:px-4 lg:px-0">
                                {/* <div className="col-span-2 md:col-span-2 hidden md:block">
                                    <p className="paddingSectionXS fs-regular fw-medium">
                                        {" "}
                                        Password
                                    </p>
                                </div> */}

                                <div className="col-span-12 md:col-span-12">
                                    <div className="grid grid-cols-12 gap-4">
                                        <div className="col-span-12 md:col-span-12">
                                            {" "}
                                            <div className="col-span-12">
                                                <span className="relative">
                                                    <input
                                                    disabled={!show}
                                                        type="password"
                                                        className="input-text   w-full  "
                                                        placeholder="Current Password"
                                                        name="password"
                                                        value={data.current_password}
                                                        onChange={(e) =>
                                                            setData(
                                                                "current_password",
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                </span>
                                                {errors?.current_password && (
                                                    <p className="fs-tiny fw-regular   danger-color ">
                                                        {errors?.current_password}{" "}
                                                    </p>
                                                )}

                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-12 gap-y-1.5 gap-x-3 mt-1.5">
                                        <div className="col-span-12 md:col-span-6">
                                            <span className="relative">
                                                <input
                                                disabled={!show}
                                                    type="password"
                                                    className=" w-full input-text "
                                                    placeholder="New Password"
                                                    name="password"
                                                    value={data?.password}
                                                    onChange={(e) =>
                                                        setData(
                                                            "password",
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </span>
                                            {errors?.password && (
                                                <p className="fs-tiny fw-regular  danger-color ">
                                                    {errors?.password}{" "}
                                                </p>
                                            )
                                                //  : (
                                                //     <p className="fs-tiny fw-regular mt-3 text-center opacity-50">
                                                //         Must be at least 8 characters
                                                //     </p>
                                                // )
                                            }
                                        </div>

                                        <div className="col-span-12 md:col-span-6">
                                            <input
                                            disabled={!show}
                                                type="password"
                                                className="  w-full input-text"
                                                placeholder="Confirm Password"
                                                name="confirmPassword"
                                                value={data.password_confirmation}
                                                onChange={(e) =>
                                                    setData(
                                                        "password_confirmation",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            {/* {passwrodMatched && */}
                                            {passwrodMatched &&
                                                data?.password_confirmation !=
                                                "" && (
                                                    <p className="fs-tiny fw-regular text-center ">
                                                        Password Matches
                                                    </p>
                                                )}
                                            {/* }   */}
                                        </div>
                                    </div>


                                    <div className=" pt-3 md:pt-[10px]  gap-x-[12px] flex   ">

                                        {show ?
                                            <>
                                                <button
                                                onClick={() => setShow(false)}
                                                    disabled={processing}
                                                    className={"profile-buttons bg-[#7E0606] text-white pt-[2px]"}>
                                                    Cancel
                                                </button>



                                                <button
                                                    onClick={(e) => { handleSubmit(e) }}
                                                    disabled={processing}
                                                    className={
                                                        " profile-buttons bg-[#ffffff] text-black pt-[2px]"
                                                    }
                                                >
                                                    {processing ? "Updating..." : "CHANGE PASSWORD"}
                                                </button>

                                            </>
                                            :


                                            <button onClick={() => setShow(true)}
                                                disabled={processing}
                                                className={"profile-buttons bg-[#ffffff] text-black button primary pt-[2px]"}>
                                                UPDATE PASSWORD
                                            </button>
                                        }
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>



                    {/* <div className="flex justify-end mx-[1rem] px-2 lg:px-4 mt-[2.2rem] ">
<Link href={route("password.request")}  className={
                            " fw-bold text-[10px] md:text-[1rem] py-2.5 flex justify-center bg-[#fff] text-black mt-[10px] rounded-full  w-[49%] uppercase px-3"
                        }  >
                    <button>
                        FORGOT PASSWORD
                    </button>
                    </Link>
                        </div> */}


                    <div className="hidden">

                        <div className="  containerMedium">
                            <div className="grid grid-cols-12 gap-4  px-5 lg:px-0">
                                <div className="col-span-3 lg:col-span-2">
                                    <p className="py-7 fs-regular fw-medium">
                                        {" "}
                                        Deactivate
                                    </p>
                                </div>

                                <div className="col-span-9 lg:col-span-10">
                                    <div className="grid grid-cols-12 gap-4">
                                        <div className="col-span-12 lg:col-span-12">
                                            <div className="tableRowSpaceY2">
                                                <ConfirmationModal handleAction={handleDeactivate} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

Security.layout = (page) => (
    <SessionLayout>
        <ProfileLayout children={page} pageTitle={""} />
    </SessionLayout>
);

export default Security;
