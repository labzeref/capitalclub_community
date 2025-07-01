import { useForm } from '@inertiajs/react';
import React, { useState } from 'react'
import logo from "../../../assets/svg/logo.svg";
import Toast from "@/Components/Toast/Toast.jsx";

const LandingPassword = () => {
    const [show, setShow] = useState(false);
    const { data, setData, post, processing, errors } = useForm({
        password: "",
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        post(route('site-lock.store'));
    }
    return (
        <div>
            <Toast />
            <div className='flex justify-center'>
                <div className="mt-5 mb-6 lg:mb-[70px] flex justify-center lg:justify-start">
                    <img
                        className="max-h-[30px] lg:max-h-[40px]"
                        src={logo}
                        alt=""
                    />
                </div>
            </div>
            <div className='h-[90vh] w-full flex justify-center items-center'>
                <div className='p-10 inset-border noise-10 min-w-[300px] max-w-[500px] border-rounded-8  w-[50%]'>
                    <div className="col-span-12 lg:col-span-6">
                        <form onSubmit={(event) => handleSubmit(event)}>
                            <div className="relative">
                                <input
                                    type="password"

                                    className=" input-text  w-full "
                                    placeholder="Password *"
                                    name="password"
                                    value={data.password}
                                    onChange={(e) =>
                                        setData(
                                            "password",
                                            e.target.value
                                        )
                                    }
                                />
                            </div>
                            {errors?.password && (
                                <p className="fs-tiny fw-regular mt-3 ml-5 danger-color ">
                                    {errors?.password}{" "}
                                </p>
                            )}
                            <button className="button primary w-full border-rounded-8 mt-4">
                                <div className="button_container glitch uppercase">
                                    Submit
                                </div>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LandingPassword
