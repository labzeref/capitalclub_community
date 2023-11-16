import React, { useEffect } from "react";
import logo from "../../../assets/svg/logo.svg";
import alian from "../../../assets/alian.png";
import Button from "@/Components/Button";
import { ReactComponent as WELCOMEARROW } from "../../../assets/svg/WELCOMEARROW.svg";
import { Link, useForm, usePage } from "@inertiajs/react";
import InterestLayout from "@/Layouts/InterestLayout";
import AOS from 'aos';
import 'aos/dist/aos.css';
import IconButton from "@/Components/IconButton";
import ReactToast from "@/Components/ReactToast";
import { useState } from "react";
import PreferencesLayout from "@/Layouts/PreferencesLayout";
const Identity = ({ avatars, setData, data }) => {
    useEffect(() => {
        AOS.init();
    }, [])
    const { auth } = usePage().props;
 

    const [selectedAvatar, setSelectedAvatar] = useState()

    // const { data, setData, post, processing, errors } = useForm({
    //     avatar_id: 3,
    // });

    // const handleSubmit = (event) => {
    //     setTimeout(() => {
    //         post(route("preference.identity-store"), {
    //             preserveScroll: true,
    //             onBefore: () => {
    //                 if (data?.avatar_id) {
    //                   setFadeOut(true)}
    //               }
    //         });
    //     }, 100);
    // };

    // useEffect(() => {
    //     if (errors.avatar_id) {
    //         ReactToast('error', errors.avatar_id);
    //     }
    // }, [errors]);


    const [fadeOut, setFadeOut] = useState(false);

    // useEffect(() => {
    //     if (data?.avatar_id!=='') {
    //         setFadeOut(true)
    //   setTimeout(() => {
    //     handleSubmit()
    //     }, 100);
    //     }
    // }, [data])

    return (
        // <PreferencesLayout progress="100" backPAth='' farwordPath="" handleSubmit={handleSubmit} isLast={false} isShowButton={false} >
        <div className={` ${fadeOut && 'fade-out-animation'}`} >

            <div className="w-full flex flex-col items-center justify-between  ">

                <h3 className="prefrence-heading heading-padding pt-9 md:pt-6 mb-6 md:mb-7 ">
                    <span className="danger-color mr-1">*</span> SELECT YOUR   GLITCH
                </h3>
                <div className="flex items-center md:gap-x-3 rounded-full gap-x-2">

                    {avatars?.map((avatar, index) => (
                        <div key={index + 3} onClick={() => { setData('avatar_id', avatar?.id) }} className={` ${data?.avatar_id == avatar?.id && 'selected-avatar'} rounded-full avatar-animation `}>
                            <img src={avatar?.image?.url} alt="Avatar" className=" h-[2.1rem] md:h-[3.5rem]" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
        // </PreferencesLayout>
    );
};
;
export default Identity;
