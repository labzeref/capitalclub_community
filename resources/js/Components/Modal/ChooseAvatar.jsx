import React, { useState, useEffect } from "react";
import cross from "../../../assets/cross.png";
import AOS from 'aos';
import 'aos/dist/aos.css';
export default function ChooseAvatar({ avatars ,setData , setUpdateAvatar }) {

    const [showModal, setShowModal] = useState();
    const [selectedAvatar, setselectedAvatar] = useState();

    const handleSelectAvatar=() => {
        setUpdateAvatar(avatars?.data?.find(avatar => avatar?.id === selectedAvatar))
        setData('avatar_id' , selectedAvatar)
    } 
  
    useEffect(() => {
        if (showModal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [showModal]);

    useEffect(() => {
        AOS.init();
    }, [])

    return (
        <>

            <button onClick={() => setShowModal(true)} className="button icon primary rounded-full px-7 w-full lg:px-10 uppercase">

            CHANGE GLITCH

            </button>

            {/* <button onClick={() => setShowModal(true)} className="px-4 py-2 button primary text-white hover:text-black hover:bg-gray-100  fw-regular ">
                Select Avatar
            </button> */}

            {showModal ? (
                <>
                    <div
                        data-aos="fade-in" data-aos-delay="100" data-aos-easing="ease" data-aos-duration="300"
                        id="defaultModal"
                        tabIndex="-1"
                        aria-hidden="true"
                        className={` ${showModal
                            ? " transition-all duration-300 ease-out"
                            : "-translate-y-[1000rem] transition-all duration-300 ease-out"
                            } justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[99999] h-[calc(100%)] max-h-full`}>
                        <div className="relative   my-6 mx-auto  w-[95%] max-w-[680px] ">
                            {/*content*/}
                            <div className=" border-rounded-10   shadow-lg md:px-[13px] relative flex flex-col w-full bg-[#0d0d0d] z-[99999] outline-none focus:outline-none  my-[4rem]">
                                {/*header*/}
                                <div>
                                    <div className="flex items-start justify-between p-4  ">
                                        <h4 > Select Avatar</h4>
                                        <button
                                            className="p-1 ml-auto     float-right  "
                                            onClick={() => setShowModal(false)}
                                        >
                                            <img
                                                src={cross}
                                                className="   h-6 w-6  "
                                            />
                                        </button>
                                    </div>
                                </div>
                                {/*body*/}
                                <div className="relative p-3 md:p-6 flex-auto">

                                    <div className="max-w-[420px] md:max-w-[620px] lg:max-w-[830px] mx-auto paddingSectionXSmall">
                                        <div className="">
                                            <div className="flex justify-center items-center md:gap-x-4 rounded-full gap-x-2 mt-5">

                                                {avatars?.data?.map((avatar, index) => (
                                                    <div key={index + 3} onClick={() => { setselectedAvatar(avatar?.id) }} className={` ${selectedAvatar == avatar?.id && 'selected-avatar' } rounded-full avatar-animation `}>
                                                        <img src={avatar?.image?.url} alt="Avatar" className=" h-[2.5rem] md:h-[4.5rem]" />
                                                    </div>
                                                ))}
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                {/*footer*/}
                                <div className="md:flex items-center justify-center p-3  md:p-6  md:space-x-3 space-y-3 md:space-y-0">
                                    <button onClick={(e)=>{handleSelectAvatar(e) ; setShowModal(false)}} className="button primary rounded-full w-full">
                                        <div className="button_container glitch uppercase">

                                            Set Avatar
                                        </div>
                                    </button>


                                </div>
                            </div>
                        </div>

                        <div className="backdrop-blur-lg bg-black/30 fixed inset-0   noise-10  "></div>
                    </div>
                </>
            ) : null}
        </>
    );
}
