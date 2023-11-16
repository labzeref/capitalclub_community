import React, { useState, useEffect } from "react";
import passicon from "../../../assets/passicon.svg";
import Button from "../../Components/Button";
import { ReactComponent as Check } from "../../../assets/svg/Check.svg";
import Layout from "@/Layouts/Layout.jsx";
import ProfileLayout from "@/Layouts/ProfileLayout";
import SessionLayout from "@/Layouts/SessionLayout";
import { useForm } from "@inertiajs/react";
import ConfirmationModal from "@/Components/Modal/ConfirmationModal";

/**
 * current_password
 * password
 * password_confirmation
 *
 * route('profile.account.update)
 * route('profile.account.delete)
 */
const Account = () => {
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

        put(route('profile.account.update'));
    };



    const handleDeactivate = (event) => {
        event.preventDefault();
if (!processing) {
    
    deleteRequest(route('profile.account.deactivate'));
}
    };


    return (
        <div>
            <div data-aos="fade-in" data-aos-delay="100" data-aos-easing="ease" data-aos-duration="300" className=" containerMedium">
                <div className="min-h-[80vh] 2xl:min-h-[80vh] flex flex-col justify-between">
                    <div className=" paddingSectionMedium  ">
                        <div className="grid grid-cols-12 gap-4 px-5 lg:px-0">
                            <div className="col-span-0 md:col-span-2 hidden md:block"> </div>
                            <div className="col-span-12 md:col-span-10">
                                <div className="col-span-10 md:col-span-10">
                                    <div className="flex justify-center md:justify-start  ">
                                        <h3 className="    ">Account</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-12 gap-4 mt-6 md:mt-[44px] px-5 lg:px-0">
                            <div className="col-span-2 md:col-span-2 hidden md:block">
                                <p className="paddingSectionXS fs-regular fw-medium">
                                    {" "}
                                    Password
                                </p>
                            </div>

                            <div className="col-span-12 md:col-span-10 ">
                                <div className="grid grid-cols-12 gap-4">
                                    <div className="col-span-12 md:col-span-12">
                                        {" "}
                                        <div className="col-span-12">
                                            <span className="relative">
                                                <input
                                                    type="password"
                                                    className="input-text   w-full  "
                                                    placeholder="Old Password"
                                                    name="password"
                                                    value={data.current_password}
                                                    onChange={(e) =>
                                                        setData(
                                                            "current_password",
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                                {/* <img
                                                    onClick={() => {
                                                        setShow(!show);
                                                    }}
                                                    className="w-5 h-5 absolute right-5 top-0"
                                                    src={passicon}
                                                    alt=""
                                                /> */}
                                            </span>
                                            {errors?.current_password && (
                                                <p className="fs-tiny fw-regular mt-3   danger-color ">
                                                    {errors?.current_password}{" "}
                                                </p>
                                            )}

                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-12 gap-4 mt-4 lg:mt-[1rem]">
                                    <div className="col-span-12 md:col-span-6">
                                        <span className="relative">
                                            <input
                                                type="password"
                                                className=" w-full input-text "
                                                placeholder="Password"
                                                name="password"
                                                value={data?.password}
                                                onChange={(e) =>
                                                    setData(
                                                        "password",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            {/* <img
                                                onClick={() => {
                                                    setShow(!show);
                                                }}
                                                className="w-5 h-5 absolute right-5 top-0"
                                                src={passicon}
                                                alt=""
                                            /> */}
                                        </span>
                                        {errors?.password ? (
                                            <p className="fs-tiny fw-regular mt-3   danger-color ">
                                                {errors?.password}{" "}
                                            </p>
                                        ) : (
                                            <p className="fs-tiny fw-regular mt-3 text-center opacity-50">
                                                Must be at least 8 characters
                                            </p>
                                        )}
                                    </div>

                                    <div className="col-span-12 md:col-span-6">
                                        <input
                                            type={show ? "text" : "password"}
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
                                                <p className="fs-tiny fw-regular text-center mt-3 ">
                                                    Password is Matched
                                                </p>
                                            )}
                                        {/* }   */}
                                    </div>
                                </div>
                                <div className="paddingSection24 lg:paddingSectionMedium flex justify-center md:justify-start">
                                    <div onClick={(e) => { handleSubmit(e) }} className="" >
                                        <Button
disabled={processing}
                                            icon={<Check />}
                                            className={
                                                "primary mt-[10px] uppercase px-3"
                                            }
                                        >
                                           {processing? "Updating..." : "Change"}
                                        </Button>
                                    </div> 
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        {/* <div className="  containerMedium">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-2 lg:col-span-2"> </div>
          <div className="col-span-10 lg:col-span-10">
            <div className="col-span-10 lg:col-span-10">
            <div className="tableRowSpaceY2">
            <div className="paddingSectionXSmall flex border-dashed border border-[#FF55554D] px-[14px] ">
            <div>
              <svg
                width="35"
                height="34"
                viewBox=" 0 0 35 34"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  opacity="0.3"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M17.6025 30.4332C25.6091 30.4332 32.0996 24.2991 32.0996 16.7322C32.0996 9.16539 25.6091 3.03125 17.6025 3.03125C9.59603 3.03125 3.10547 9.16539 3.10547 16.7322C3.10547 24.2991 9.59603 30.4332 17.6025 30.4332Z"
                  fill="#F89C47"
                />
                <rect
                  x="16.1523"
                  y="9.88281"
                  width="2.89941"
                  height="10.9608"
                  rx="1"
                  fill="#F89C47"
                />
                <rect
                  x="16.1523"
                  y="22.2148"
                  width="2.89941"
                  height="2.7402"
                  rx="1"
                  fill="#F89C47"
                />
              </svg>
              </div>
              <div>
              <h5>You are deactivatiing your account</h5>
              <p className="small normal">For extra security, this requires you to confirm your email or phone number when you reset your password. Learn more</p>
              </div>
            </div>
            </div>
            </div>
          </div>
        </div>
        </div> */}

                        <div className="  containerMedium">
                            <div className="grid grid-cols-12 gap-4  px-5 lg:px-0">
                                <div className="col-span-3 lg:col-span-2">
                                    <p className="py-7 fs-regular fw-medium">
                                        {" "}
                                        Delete
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

Account.layout = (page) => (
    <SessionLayout>
        <ProfileLayout children={page} pageTitle={""} />
    </SessionLayout>
);

export default Account;
