import React, { useEffect } from "react";
import dissProfile from "../../../assets/img/discussion-profile-pic.jpg";
import certificate1 from "../../../assets/img/certi1.jpg";
import certificate2 from "../../../assets/img/certi2.jpg";
import certificate3 from "../../../assets/img/certi3.jpg";
import certificate4 from "../../../assets/img/certi4.jpg";
import leaf from "../../../assets/svg/leaf.svg";
import Chatty from "../../../assets/svg/chatty.svg";
import top50 from "../../../assets/svg/top50.svg";
import Layout from "@/Layouts/Layout";
import Button from "../../Components/Button";
import AOS from 'aos';
import 'aos/dist/aos.css';

import { ReactComponent as Pencil } from "../../../assets/svg/pencil.svg";
import { ReactComponent as Chat } from "../../../assets/svg/chat.svg";
import { ReactComponent as Plus } from "../../../assets/svg/Plus.svg";
import { ReactComponent as Flag } from "../../../assets/svg/Flag.svg";
import { Link, usePage } from "@inertiajs/react";
import IconButton from "@/Components/IconButton";
import axios from "axios";

import ReactCountryFlag from "react-country-flag"
import ReactToast from "@/Components/ReactToast";
import { useState } from "react";
const UserPublicProfile = ({ profile }) => {
    useEffect(() => {
        AOS.init();
    }, [])
    const auth = usePage()
    // console.log('profile')
    // console.log(profile)
    // console.log('auth')
    // console.log(auth?.props?.auth?.user)
    const user = auth?.props?.auth?.user;

    const [hasFollowed, setHasFollowed] = useState(profile.has_followed);

    //    ********* Follow Threads **********

    const [isDisableButton, setIsDisableButton] = useState(false)

    const handleFollowUser = async () => {
        setIsDisableButton(true)
        let timeOut = setTimeout(async () => {
            try {
                const response = await axios.post(route("toggle-follow.users", profile?.id));
                console.log("Follow user successfully:", response);
                setIsDisableButton(false)
                ReactToast('success', response?.data?.payload)

                setHasFollowed((previous) => { return !previous });


            } catch (error) {
                setIsDisableButton(false)
                ReactToast('error', error?.response?.data?.payload)
                console.error("Error while following user:", error);
            }
            clearTimeout(timeOut);

        }, 500)
    }; 

    return (
        <div className="pt-[4rem]">
            <section className="  paddingSectionSmall">
                <div className="container mx-auto px-5 xl:px-0">
                    <div data-aos="fade-in" data-aos-delay="100" data-aos-easing="ease" data-aos-duration="300" className="max-w-7xl mx-auto ">
                        <div className="grid grid-cols-12 gap-y-6">
                            <div className="col-span-6 lg:col-span-5">
                                <div className="flex items-start gap-2 md:gap-5">
                                    <img
                                        className="h-[92px] md:h-[211px] border-rounded-10 w-[96px] min-w-[96px] md:w-[220px] object-cover object-center border-[1px] border-[#ffffff1a]"
                                        src={profile?.dp?.medium?.url}
                                        alt=""
                                    />
                                    <div className="text-start flex justify-between flex-col">
                                        <div className="min-w-[150px]">
                                            <h4 className="mb-1">{profile?.full_name}</h4>
                                            {/* <p className="fw-regular fs-regular text-[#9E9E9E] mb-4">
                                                Film and Television
                                            </p> */}
                                            <p className="my-7 fw-regular fs-tiny w-24 bg-white text-[#000000] pt-[5px] pb-[3px] text-center rounded-3xl">
                                                Glitch #
                                                {profile?.id}
                                            </p>
                                        </div>
                                        <div className="hidden md:block mt-8 lg:mt-12">
                                            <p className="fs-regular fs-medium mb-2">
                                                Rank Badges
                                            </p>
                                            {/* desktop  */}
                                            <div className="flex items-center gap-2">
                                                {profile?.badges?.map((badge, index) => (
                                                    <div key={index + 4} className="flex items-center gap-1">
                                                        <img
                                                            className="h-6 w-6"
                                                            src={`data:image/svg+xml;utf8,${encodeURIComponent(badge?.svg)}`}
                                                            alt=""
                                                        />
                                                        <p className="fw-regular fs-tiny">
                                                            {badge?.weight}
                                                        </p>
                                                    </div>
                                                ))}


                                            </div>
                                        </div>
                                    </div>


                                </div>
                                <div className="md:hidden  block mt-4 lg:mt-12">
                                    {/* mobile  */}
                                    <p className="fs-regular fs-medium mb-2">
                                        Rank Badges
                                    </p>

                                    <div className="flex items-center gap-2">
                                        {profile?.badges?.map((badge, index) => (
                                            <div key={index + 3} className="flex items-center gap-1">
                                                <img
                                                    className="h-6 w-6"
                                                    src={`data:image/svg+xml;utf8,${encodeURIComponent(badge?.svg)}`}
                                                    alt=""
                                                />
                                                <p className="fw-regular fs-tiny">
                                                    {badge?.weight}
                                                </p>
                                            </div>
                                        ))}

                                    </div>
                                </div>
                            </div>

                            <div className="col-span-6 lg:col-span-7 flex justify-between flex-col ">
                                <div className="flex items-center justify-end flex-wrap gap-2">
                                    {profile?.id === user?.id &&


                                        <Link href={route('profile.personal')} >
                                            <div className="hidden lg:block"> <Button
                                                icon={<Pencil />}
                                                className={"secondary   "}
                                            >
                                                Edit Profile
                                            </Button>
                                            </div>
                                        </Link>
                                    }
                                    {profile?.id !== user?.id && <div className="hidden lg:block">
                                        <Button
                                            disabled={isDisableButton}
                                            onClick={() => handleFollowUser()}
                                            // icon={<Plus />}
                                            className={` ${hasFollowed ? 'primary' : 'secondary'}   hidden md:block `}
                                        >
                                            {hasFollowed ? 'Following' : 'Follow'}                                    </Button>
                                    </div>
                                    }
                                    {profile?.id !== user?.id &&

                                        <Link href={route('users.message', profile?.id)}>
                                            <div>
                                                <div className="block md:hidden">
                                                    <IconButton
                                                        className={" secondary icon_button"}
                                                        icon={<Chat />}
                                                    ></IconButton>
                                                </div>
                                                <div className=" md:block hidden ">

                                                    <Button
                                                        icon={<Chat />}
                                                        className={"secondary md:px-9 lg:px-0 "}
                                                    >
                                                        Message
                                                    </Button>
                                                </div>
                                            </div>

                                        </Link>
                                    }
                                    {/* <IconButton
                                        icon={<Flag />}
                                        className={"secondary  icon_button"}
                                    ></IconButton> */}
                                    <ReactCountryFlag style={{
                                        fontSize: '2em',
                                    }} countryCode={profile?.country_iso} />
                                </div>

                                <div className="  lg:mt-24 flex   justify-center md:justify-end   ">
                                    <div className="max-w-2xl lg:ml-auto relative  ">
                                        <p className="fs-regular fw-medium mb-2  text-start">
                                            Social
                                        </p>
                                        <div className="flex items-center gap-4 -mb-1">
                                            {profile?.socialMedia?.discord &&
                                                <Link

                                                    href={profile?.socialMedia?.discord} target='_blank'
                                                >
                                                    <button className="">
                                                        <div className="glitch uppercase">
                                                            <svg className="w-5 md:w-6 h-5 md:h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <g opacity="0.6" clipPath="url(#clip0_1107_75320)">
                                                                    <path opacity="0.4" d="M13.7804 17.1619C13.1885 17.2209 12.594 17.2503 11.9992 17.25C11.4043 17.2503 10.8098 17.2209 10.2179 17.1619L9.25697 19.7559C9.22022 19.8539 9.16373 19.9434 9.09099 20.0186C9.01826 20.0939 8.93083 20.1534 8.83414 20.1935C8.73744 20.2336 8.63354 20.2534 8.52888 20.2517C8.42422 20.2499 8.32103 20.2267 8.22572 20.1834L1.94447 17.3991C1.78275 17.328 1.65128 17.2022 1.57325 17.0437C1.49521 16.8852 1.47562 16.7043 1.51791 16.5328L4.2901 5.625C4.32625 5.48163 4.40356 5.35198 4.51251 5.25203C4.62146 5.15208 4.75728 5.08619 4.90322 5.0625L8.28385 4.5075C8.47213 4.4755 8.66556 4.51562 8.82558 4.61987C8.9856 4.72412 9.10047 4.88484 9.14728 5.07L9.61603 6.91031C11.199 6.69906 12.8031 6.69906 14.386 6.91031L14.8548 5.07C14.9016 4.88484 15.0165 4.72412 15.1765 4.61987C15.3365 4.51562 15.5299 4.4755 15.7182 4.5075L19.0951 5.0625C19.241 5.08619 19.3769 5.15208 19.4858 5.25203C19.5948 5.35198 19.6721 5.48163 19.7082 5.625L22.4767 16.5347C22.519 16.7062 22.4994 16.8871 22.4213 17.0456C22.3433 17.2041 22.2118 17.3299 22.0501 17.4009L15.7688 20.1853C15.6735 20.2286 15.5703 20.2518 15.4657 20.2535C15.361 20.2553 15.2571 20.2355 15.1604 20.1954C15.0637 20.1553 14.9763 20.0958 14.9036 20.0205C14.8308 19.9452 14.7743 19.8558 14.7376 19.7578L13.7804 17.1619Z" fill="white" />
                                                                    <path d="M8.625 14.25C9.24632 14.25 9.75 13.7463 9.75 13.125C9.75 12.5037 9.24632 12 8.625 12C8.00368 12 7.5 12.5037 7.5 13.125C7.5 13.7463 8.00368 14.25 8.625 14.25Z" fill="white" />
                                                                    <path d="M15.375 14.25C15.9963 14.25 16.5 13.7463 16.5 13.125C16.5 12.5037 15.9963 12 15.375 12C14.7537 12 14.25 12.5037 14.25 13.125C14.25 13.7463 14.7537 14.25 15.375 14.25Z" fill="white" />
                                                                    <path d="M14.385 6.90844L14.8538 5.06812C14.9006 4.88297 15.0154 4.72225 15.1755 4.618C15.3355 4.51375 15.5289 4.47363 15.7172 4.50562L19.0959 5.0625C19.2419 5.08619 19.3777 5.15208 19.4866 5.25203C19.5956 5.35198 19.6729 5.48163 19.7091 5.625L22.4775 16.5347C22.5198 16.7062 22.5002 16.8871 22.4222 17.0456C22.3441 17.2041 22.2127 17.3299 22.0509 17.4009L15.7697 20.1853C15.6744 20.2286 15.5712 20.2518 15.4665 20.2535C15.3619 20.2553 15.258 20.2355 15.1613 20.1954C15.0646 20.1553 14.9772 20.0958 14.9044 20.0205C14.8317 19.9452 14.7752 19.8558 14.7384 19.7578L13.7812 17.1619" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                                                    <path d="M9.61432 6.90844L9.14557 5.06812C9.09875 4.88297 8.98389 4.72225 8.82386 4.618C8.66384 4.51375 8.47041 4.47363 8.28213 4.50562L4.90338 5.0625C4.75744 5.08619 4.62162 5.15208 4.51267 5.25203C4.40372 5.35198 4.3264 5.48163 4.29025 5.625L1.52182 16.5328C1.47952 16.7043 1.49912 16.8852 1.57715 17.0437C1.65519 17.2022 1.78665 17.328 1.94838 17.3991L8.22963 20.1834C8.32494 20.2267 8.42813 20.2499 8.53279 20.2517C8.63745 20.2534 8.74135 20.2336 8.83804 20.1935C8.93474 20.1534 9.02216 20.0939 9.0949 20.0186C9.16764 19.9434 9.22413 19.8539 9.26088 19.7559L10.2181 17.1619" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                                                    <path d="M7.5 7.34156C8.96628 6.94143 10.4801 6.74242 12 6.75C13.5199 6.74242 15.0337 6.94143 16.5 7.34156" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                                                    <path d="M16.5 16.6584C15.0337 17.0586 13.5199 17.2576 12 17.25C10.4801 17.2576 8.96628 17.0586 7.5 16.6584" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                                                </g>
                                                                <defs>
                                                                    <clipPath id="clip0_1107_75320">
                                                                        <rect width="24" height="24" fill="white" />
                                                                    </clipPath>
                                                                </defs>
                                                            </svg>

                                                        </div>
                                                    </button> </Link>
                                            }

                                            {profile?.socialMedia?.twitter &&
                                                <Link

                                                    href={profile?.socialMedia?.twitter} target='_blank'
                                                >
                                                    <button className="">
                                                        <div className="glitch uppercase">
                                                            <svg className="w-5 md:w-6 h-5 md:h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <g opacity="0.6" clipPath="url(#clip0_1107_75321)">
                                                                    <path opacity="0.4" d="M8.25 16.5C8.25 16.5 3.07969 13.5 3.82312 5.25C3.82312 5.25 7.54125 9 12 9.75V8.25C12 6.1875 13.6875 4.47469 15.75 4.5C16.4779 4.50845 17.1882 4.72473 17.7972 5.12335C18.4063 5.52198 18.8888 6.08635 19.1878 6.75H22.5L19.5 9.75C19.1006 16.0163 13.8675 21 7.5 21C4.5 21 3.75 19.875 3.75 19.875C3.75 19.875 6.75 18.75 8.25 16.5Z" fill="white" />
                                                                    <path d="M8.25 16.5C8.25 16.5 3.07969 13.5 3.82312 5.25C3.82312 5.25 7.54125 9 12 9.75V8.25C12 6.1875 13.6875 4.47469 15.75 4.5C16.4779 4.50845 17.1882 4.72473 17.7972 5.12335C18.4063 5.52198 18.8888 6.08635 19.1878 6.75H22.5L19.5 9.75C19.1006 16.0163 13.8675 21 7.5 21C4.5 21 3.75 19.875 3.75 19.875C3.75 19.875 6.75 18.75 8.25 16.5Z" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                                                </g>
                                                                <defs>
                                                                    <clipPath id="clip0_1107_75321">
                                                                        <rect width="24" height="24" fill="white" />
                                                                    </clipPath>
                                                                </defs>
                                                            </svg>

                                                        </div>
                                                    </button></Link>}

                                            {profile?.socialMedia?.linkedin &&
                                                <Link
                                                    href={profile?.socialMedia?.linkedin} target='_blank'
                                                >
                                                    <button className="">
                                                        <div className="glitch uppercase">
                                                            <svg className="w-5 md:w-6 h-5 md:h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <g opacity="0.6" clipPath="url(#clip0_1107_75322)">
                                                                    <path opacity="0.4" d="M20.25 3H3.75C3.33579 3 3 3.33579 3 3.75V20.25C3 20.6642 3.33579 21 3.75 21H20.25C20.6642 21 21 20.6642 21 20.25V3.75C21 3.33579 20.6642 3 20.25 3Z" fill="white" />
                                                                    <path d="M20.25 3H3.75C3.33579 3 3 3.33579 3 3.75V20.25C3 20.6642 3.33579 21 3.75 21H20.25C20.6642 21 21 20.6642 21 20.25V3.75C21 3.33579 20.6642 3 20.25 3Z" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                                                    <path d="M11.25 10.5V16.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                                                    <path d="M8.25 10.5V16.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                                                    <path d="M11.25 13.125C11.25 12.4288 11.5266 11.7611 12.0188 11.2688C12.5111 10.7766 13.1788 10.5 13.875 10.5C14.5712 10.5 15.2389 10.7766 15.7312 11.2688C16.2234 11.7611 16.5 12.4288 16.5 13.125V16.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                                                    <path d="M8.25 9C8.87132 9 9.375 8.49632 9.375 7.875C9.375 7.25368 8.87132 6.75 8.25 6.75C7.62868 6.75 7.125 7.25368 7.125 7.875C7.125 8.49632 7.62868 9 8.25 9Z" fill="white" />
                                                                </g>
                                                                <defs>
                                                                    <clipPath id="clip0_1107_75322">
                                                                        <rect width="24" height="24" fill="white" />
                                                                    </clipPath>
                                                                </defs>
                                                            </svg>

                                                        </div>
                                                    </button></Link>
                                            }

                                            {profile?.socialMedia?.instagram &&
                                                <Link
                                                    href={profile?.socialMedia?.instagram} target='_blank'
                                                >
                                                    <button className="">
                                                        <div className="glitch uppercase">
                                                            <svg className="w-5 md:w-6 h-5 md:h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <g opacity="0.6" clipPath="url(#clip0_1107_75323)">
                                                                    <path opacity="0.4" d="M16.5 3H7.5C6.30653 3 5.16193 3.47411 4.31802 4.31802C3.47411 5.16193 3 6.30653 3 7.5V16.5C3 17.6935 3.47411 18.8381 4.31802 19.682C5.16193 20.5259 6.30653 21 7.5 21H16.5C17.6935 21 18.8381 20.5259 19.682 19.682C20.5259 18.8381 21 17.6935 21 16.5V7.5C21 6.30653 20.5259 5.16193 19.682 4.31802C18.8381 3.47411 17.6935 3 16.5 3ZM12 15.75C11.2583 15.75 10.5333 15.5301 9.91661 15.118C9.29993 14.706 8.81928 14.1203 8.53545 13.4351C8.25162 12.7498 8.17736 11.9958 8.32205 11.2684C8.46675 10.541 8.8239 9.8728 9.34835 9.34835C9.8728 8.8239 10.541 8.46675 11.2684 8.32205C11.9958 8.17736 12.7498 8.25162 13.4351 8.53545C14.1203 8.81928 14.706 9.29993 15.118 9.91661C15.5301 10.5333 15.75 11.2583 15.75 12C15.75 12.9946 15.3549 13.9484 14.6517 14.6517C13.9484 15.3549 12.9946 15.75 12 15.75Z" fill="white" />
                                                                    <path d="M16.5 3H7.5C5.01472 3 3 5.01472 3 7.5V16.5C3 18.9853 5.01472 21 7.5 21H16.5C18.9853 21 21 18.9853 21 16.5V7.5C21 5.01472 18.9853 3 16.5 3Z" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                                                    <path d="M12 15.75C14.0711 15.75 15.75 14.0711 15.75 12C15.75 9.92893 14.0711 8.25 12 8.25C9.92893 8.25 8.25 9.92893 8.25 12C8.25 14.0711 9.92893 15.75 12 15.75Z" stroke="white" strokeWidth="1.2" strokeMiterlimit="10" />
                                                                    <path d="M16.875 8.25C17.4963 8.25 18 7.74632 18 7.125C18 6.50368 17.4963 6 16.875 6C16.2537 6 15.75 6.50368 15.75 7.125C15.75 7.74632 16.2537 8.25 16.875 8.25Z" fill="white" />
                                                                </g>
                                                                <defs>
                                                                    <clipPath id="clip0_1107_75323">
                                                                        <rect width="24" height="24" fill="white" />
                                                                    </clipPath>
                                                                </defs>
                                                            </svg>

                                                        </div>
                                                    </button>
                                                </Link>
                                            }{profile?.socialMedia?.youtube &&
                                                <Link
                                                    href={profile?.socialMedia?.youtube} target='_blank'
                                                >
                                                    <button className="">
                                                        <div className="glitch uppercase">
                                                            <svg className="w-5 md:w-6 h-5 md:h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <g opacity="0.6" clipPath="url(#clip0_1107_75324)">
                                                                    <path opacity="0.4" d="M21.2428 6.70594C21.1851 6.47468 21.0731 6.26051 20.9161 6.08117C20.7591 5.90183 20.5616 5.76249 20.34 5.67469C17.2013 4.46719 12 4.5 12 4.5C12 4.5 6.79875 4.46719 3.65625 5.67937C3.43466 5.76717 3.23718 5.90652 3.08017 6.08585C2.92317 6.26519 2.81116 6.47937 2.75344 6.71062C2.53781 7.55062 2.25 9.19594 2.25 12C2.25 14.8041 2.53781 16.4494 2.75719 17.2941C2.8152 17.5241 2.92694 17.737 3.08322 17.9155C3.23951 18.094 3.43589 18.2328 3.65625 18.3206C6.79875 19.5328 12 19.5 12 19.5C12 19.5 17.2013 19.5328 20.3438 18.3206C20.5648 18.2333 20.7619 18.0947 20.9189 17.9162C21.0759 17.7377 21.1882 17.5245 21.2466 17.2941C21.4659 16.4503 21.7537 14.8041 21.7537 12C21.7537 9.19594 21.4622 7.55062 21.2428 6.70594ZM10.5 15V9L15 12L10.5 15Z" fill="white" />
                                                                    <path d="M15 12L10.5 9V15L15 12Z" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                                                    <path d="M2.25 12C2.25 14.8041 2.53781 16.4484 2.75719 17.2941C2.8152 17.5241 2.92694 17.737 3.08322 17.9155C3.23951 18.094 3.43589 18.2328 3.65625 18.3206C6.79875 19.5328 12 19.5 12 19.5C12 19.5 17.2012 19.5328 20.3438 18.3206C20.5648 18.2333 20.7619 18.0947 20.9189 17.9162C21.0759 17.7377 21.1882 17.5245 21.2466 17.2941C21.4659 16.4503 21.7537 14.8041 21.7537 12C21.7537 9.19594 21.4659 7.55156 21.2466 6.70594C21.1888 6.47468 21.0768 6.26051 20.9198 6.08117C20.7628 5.90183 20.5653 5.76249 20.3438 5.67469C17.2012 4.46719 12 4.5 12 4.5C12 4.5 6.79875 4.46719 3.65625 5.67937C3.43466 5.76717 3.23718 5.90652 3.08017 6.08585C2.92317 6.26519 2.81116 6.47937 2.75344 6.71062C2.53781 7.55062 2.25 9.19594 2.25 12Z" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                                                </g>
                                                                <defs>
                                                                    <clipPath id="clip0_1107_75324">
                                                                        <rect width="24" height="24" fill="white" />
                                                                    </clipPath>
                                                                </defs>
                                                            </svg>

                                                        </div>
                                                    </button></Link>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <hr
                            className="my-12"
                            style={{
                                border: "1px solid #FFFFFF",
                                opacity: 0.1,
                            }}
                        />
                        <div className="grid grid-cols-12">
                            <div className="col-span-12">
                                <div className="max-w-6xl">
                                    <div className="text-start">
                                        <h3 className="mb-4">About</h3>
                                        <p className="fs-medium fw-regular mb-5">
                                            {profile?.about}.
                                        </p>
                                        {/* <p className="fs-medium fw-regular mb-5">
                                            The Ultimate Drawing Course will
                                            show you how to create advanced art
                                            that will stand up as professional
                                            work. This course will enhance or
                                            give you skills in the world of
                                            drawing - or your money back The
                                            course is your track to obtaining
                                            drawing skills like you always knew
                                            you should have! Whether for your
                                            own projects or to draw for other
                                            people.
                                        </p>
                                        <p className="fs-medium fw-regular mb-5">
                                            This course will take you from
                                            having little knowledge in drawing
                                            to creating advanced art and having
                                            a deep understanding of drawing
                                            fundamentals.
                                        </p> */}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* <hr
                            className=" mt-6 mb-6 md:mb-12 mt lg:my-12"
                            style={{
                                border: "1px solid #FFFFFF",
                                opacity: 0.1,
                            }}
                        /> */}
                        {/* <div className="grid grid-cols-12">
                            <div className="col-span-12">
                                <div className="max-w-6xl">
                                    <div className="text-start">
                                        <h3 className="mb-8">Interests</h3>
                                        <div className="flex items-center flex-wrap gap-2">
                                            <button className="button secondary">
                                                <div className="button_container glitch  capitalize">
                                                    <svg
                                                        width="32"
                                                        height="32"
                                                        viewBox="0 0 32 32"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <g clipPath="url(#clip0_829_46909)">
                                                            <path
                                                                opacity="0.2"
                                                                d="M26 21H19C19 21 19 8 26 5V21Z"
                                                                fill="white"
                                                            />
                                                            <path
                                                                d="M10 5V11"
                                                                stroke="white"
                                                                strokeWidth="1.2"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            />
                                                            <path
                                                                d="M10 16V28"
                                                                stroke="white"
                                                                strokeWidth="1.2"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            />
                                                            <path
                                                                d="M26 21H19C19 21 19 8 26 5V28"
                                                                stroke="white"
                                                                strokeWidth="1.2"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            />
                                                            <path
                                                                d="M6 5L5 11C5 12.3261 5.52678 13.5979 6.46447 14.5355C7.40215 15.4732 8.67392 16 10 16C11.3261 16 12.5979 15.4732 13.5355 14.5355C14.4732 13.5979 15 12.3261 15 11L14 5"
                                                                stroke="white"
                                                                strokeWidth="1.2"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            />
                                                        </g>
                                                        <defs>
                                                            <clipPath id="clip0_829_46909">
                                                                <rect
                                                                    width="32"
                                                                    height="32"
                                                                    fill="white"
                                                                />
                                                            </clipPath>
                                                        </defs>
                                                    </svg>
                                                    Food
                                                </div>
                                            </button>
                                            <button className="button secondary">
                                                <div className="button_container glitch capitalize">
                                                    <svg
                                                        width="32"
                                                        height="32"
                                                        viewBox="0 0 32 32"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <g clipPath="url(#clip0_829_46919)">
                                                            <path
                                                                opacity="0.2"
                                                                d="M20.67 15.3813C24.045 12.4288 28 8.10125 28 4C23.8987 4 19.5712 7.955 16.625 11.33C18.321 12.2817 19.7209 13.6838 20.67 15.3813Z"
                                                                fill="white"
                                                            />
                                                            <path
                                                                d="M2 27H11.5C12.7856 27 14.0423 26.6188 15.1112 25.9046C16.1801 25.1903 17.0132 24.1752 17.5052 22.9874C17.9972 21.7997 18.1259 20.4928 17.8751 19.2319C17.6243 17.971 17.0052 16.8128 16.0962 15.9038C15.1872 14.9948 14.029 14.3757 12.7681 14.1249C11.5072 13.8741 10.2003 14.0028 9.01256 14.4948C7.82484 14.9868 6.80968 15.8199 6.09545 16.8888C5.38122 17.9577 5 19.2144 5 20.5C5 25 2 27 2 27Z"
                                                                stroke="white"
                                                                strokeWidth="1.2"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            />
                                                            <path
                                                                d="M14.0508 14.52C16.4495 11.2862 22.432 4 27.9995 4C27.9995 9.5675 20.7133 15.55 17.4795 17.9487"
                                                                stroke="white"
                                                                strokeWidth="1.2"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            />
                                                            <path
                                                                d="M16.625 11.3301C18.3233 12.2809 19.7254 13.683 20.6763 15.3813"
                                                                stroke="white"
                                                                strokeWidth="1.2"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            />
                                                        </g>
                                                        <defs>
                                                            <clipPath id="clip0_829_46919">
                                                                <rect
                                                                    width="32"
                                                                    height="32"
                                                                    fill="white"
                                                                />
                                                            </clipPath>
                                                        </defs>
                                                    </svg>
                                                    Art & Entertainment
                                                </div>
                                            </button>
                                            <button className="button secondary">
                                                <div className="button_container glitch capitalize">
                                                    <svg
                                                        width="32"
                                                        height="32"
                                                        viewBox="0 0 32 32"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <g clipPath="url(#clip0_829_46928)">
                                                            <path
                                                                opacity="0.2"
                                                                d="M22.5 25C24.433 25 26 23.433 26 21.5C26 19.567 24.433 18 22.5 18C20.567 18 19 19.567 19 21.5C19 23.433 20.567 25 22.5 25Z"
                                                                fill="white"
                                                            />
                                                            <path
                                                                opacity="0.2"
                                                                d="M6.5 29C8.433 29 10 27.433 10 25.5C10 23.567 8.433 22 6.5 22C4.567 22 3 23.567 3 25.5C3 27.433 4.567 29 6.5 29Z"
                                                                fill="white"
                                                            />
                                                            <path
                                                                d="M22.5 25C24.433 25 26 23.433 26 21.5C26 19.567 24.433 18 22.5 18C20.567 18 19 19.567 19 21.5C19 23.433 20.567 25 22.5 25Z"
                                                                stroke="white"
                                                                strokeWidth="1.2"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            />
                                                            <path
                                                                d="M6.5 29C8.433 29 10 27.433 10 25.5C10 23.567 8.433 22 6.5 22C4.567 22 3 23.567 3 25.5C3 27.433 4.567 29 6.5 29Z"
                                                                stroke="white"
                                                                strokeWidth="1.2"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            />
                                                            <path
                                                                d="M26 10L10 14"
                                                                stroke="white"
                                                                strokeWidth="1.2"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            />
                                                            <path
                                                                d="M10 25.5V8L26 4V21.5"
                                                                stroke="white"
                                                                strokeWidth="1.2"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            />
                                                        </g>
                                                        <defs>
                                                            <clipPath id="clip0_829_46928">
                                                                <rect
                                                                    width="32"
                                                                    height="32"
                                                                    fill="white"
                                                                />
                                                            </clipPath>
                                                        </defs>
                                                    </svg>
                                                    Music
                                                </div>
                                            </button>
                                            <button className="button secondary">
                                                <div className="button_container glitch capitalize">
                                                    <svg
                                                        width="32"
                                                        height="32"
                                                        viewBox="0 0 32 32"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <g clipPath="url(#clip0_829_46939)">
                                                            <path
                                                                opacity="0.2"
                                                                d="M4.17969 18.1816C4.59469 15.0266 5.80469 11.5566 8.67969 8.68164C11.5547 5.80664 15.0234 4.59539 18.1797 4.18164L27.8172 13.8191C27.4022 16.9741 26.1922 20.4441 23.3172 23.3191C20.4422 26.1941 16.9734 27.4054 13.8172 27.8191L4.17969 18.1816Z"
                                                                fill="white"
                                                            />
                                                            <path
                                                                d="M23.3179 23.3179C17.9429 28.6929 10.4854 28.2617 6.89919 27.6542C6.26137 27.5464 5.67292 27.2428 5.21552 26.7854C4.75812 26.328 4.45446 25.7395 4.34669 25.1017C3.73919 21.5154 3.31044 14.0554 8.68294 8.68294C14.0554 3.31044 21.5154 3.73919 25.1017 4.34669C25.7395 4.45446 26.328 4.75812 26.7854 5.21552C27.2428 5.67292 27.5464 6.26137 27.6542 6.89919C28.2617 10.4854 28.6904 17.9454 23.3179 23.3179Z"
                                                                stroke="white"
                                                                strokeWidth="1.2"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            />
                                                            <path
                                                                d="M13 16L16 19"
                                                                stroke="white"
                                                                strokeWidth="1.2"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            />
                                                            <path
                                                                d="M16 13L19 16"
                                                                stroke="white"
                                                                strokeWidth="1.2"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            />
                                                            <path
                                                                d="M20 12L12 20"
                                                                stroke="white"
                                                                strokeWidth="1.2"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            />
                                                            <path
                                                                d="M18.1797 4.18164L27.8172 13.8191"
                                                                stroke="white"
                                                                strokeWidth="1.2"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            />
                                                            <path
                                                                d="M4.17969 18.1816L13.8172 27.8191"
                                                                stroke="white"
                                                                strokeWidth="1.2"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            />
                                                        </g>
                                                        <defs>
                                                            <clipPath id="clip0_829_46939">
                                                                <rect
                                                                    width="32"
                                                                    height="32"
                                                                    fill="white"
                                                                />
                                                            </clipPath>
                                                        </defs>
                                                    </svg>
                                                    Sports & Gaming
                                                </div>
                                            </button>
                                            <button className="button secondary">
                                                <div className="button_container glitch capitalize">
                                                    <svg
                                                        width="32"
                                                        height="32"
                                                        viewBox="0 0 32 32"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <g opacity="0.6">
                                                            <g clipPath="url(#clip0_829_46951)">
                                                                <path
                                                                    opacity="0.4"
                                                                    d="M16 18.0001C11.7869 18.0068 7.64702 16.8994 4 14.7901V25.0001C4 25.2653 4.10536 25.5196 4.29289 25.7072C4.48043 25.8947 4.73478 26.0001 5 26.0001H27C27.2652 26.0001 27.5196 25.8947 27.7071 25.7072C27.8946 25.5196 28 25.2653 28 25.0001V14.7888C24.3532 16.8989 20.2132 18.0068 16 18.0001Z"
                                                                    fill="white"
                                                                />
                                                                <path
                                                                    d="M14 14H18"
                                                                    stroke="white"
                                                                    strokeWidth="1.2"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                />
                                                                <path
                                                                    d="M27 8H5C4.44772 8 4 8.44772 4 9V25C4 25.5523 4.44772 26 5 26H27C27.5523 26 28 25.5523 28 25V9C28 8.44772 27.5523 8 27 8Z"
                                                                    stroke="white"
                                                                    strokeWidth="1.2"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                />
                                                                <path
                                                                    d="M21 8V6C21 5.46957 20.7893 4.96086 20.4142 4.58579C20.0391 4.21071 19.5304 4 19 4H13C12.4696 4 11.9609 4.21071 11.5858 4.58579C11.2107 4.96086 11 5.46957 11 6V8"
                                                                    stroke="white"
                                                                    strokeWidth="1.2"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                />
                                                                <path
                                                                    d="M28 14.7888C24.3532 16.8988 20.2132 18.0067 16 18.0001C11.7869 18.0068 7.64702 16.8994 4 14.7901"
                                                                    stroke="white"
                                                                    strokeWidth="1.2"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                />
                                                            </g>
                                                        </g>
                                                        <defs>
                                                            <clipPath id="clip0_829_46951">
                                                                <rect
                                                                    width="32"
                                                                    height="32"
                                                                    fill="white"
                                                                />
                                                            </clipPath>
                                                        </defs>
                                                    </svg>
                                                    Business
                                                </div>
                                            </button>
                                            <button className="button secondary">
                                                <div className="button_container glitch capitalize">
                                                    <svg
                                                        width="32"
                                                        height="32"
                                                        viewBox="0 0 32 32"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <g opacity="0.6">
                                                            <g clipPath="url(#clip0_829_46956)">
                                                                <path
                                                                    opacity="0.4"
                                                                    d="M26.2814 26.2823C28.4356 24.128 25.5785 17.7782 19.8998 12.0995C14.2211 6.42076 7.87121 3.5636 5.71698 5.71783C3.56275 7.87206 6.41991 14.2219 12.0986 19.9006C17.7773 25.5793 24.1272 28.4365 26.2814 26.2823Z"
                                                                    fill="white"
                                                                />
                                                                <path
                                                                    d="M26.2814 26.2823C28.4356 24.128 25.5785 17.7782 19.8998 12.0995C14.2211 6.42076 7.87121 3.5636 5.71698 5.71783C3.56275 7.87206 6.41991 14.2219 12.0986 19.9006C17.7773 25.5793 24.1272 28.4365 26.2814 26.2823Z"
                                                                    stroke="white"
                                                                    strokeWidth="1.2"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                />
                                                                <path
                                                                    d="M19.8998 19.9005C25.5785 14.2218 28.4356 7.87196 26.2814 5.71773C24.1272 3.5635 17.7773 6.42066 12.0986 12.0994C6.41991 17.7781 3.56275 24.1279 5.71698 26.2822C7.87121 28.4364 14.2211 25.5792 19.8998 19.9005Z"
                                                                    stroke="white"
                                                                    strokeWidth="1.2"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                />
                                                                <path
                                                                    d="M16 17.5C16.8284 17.5 17.5 16.8284 17.5 16C17.5 15.1716 16.8284 14.5 16 14.5C15.1716 14.5 14.5 15.1716 14.5 16C14.5 16.8284 15.1716 17.5 16 17.5Z"
                                                                    fill="white"
                                                                />
                                                            </g>
                                                        </g>
                                                        <defs>
                                                            <clipPath id="clip0_829_46956">
                                                                <rect
                                                                    width="32"
                                                                    height="32"
                                                                    fill="white"
                                                                />
                                                            </clipPath>
                                                        </defs>
                                                    </svg>
                                                    Science &Tech
                                                </div>
                                            </button>
                                            <button className="button secondary">
                                                <div className="button_container glitch capitalize">
                                                    <svg
                                                        width="32"
                                                        height="32"
                                                        viewBox="0 0 32 32"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <g opacity="0.6">
                                                            <g clipPath="url(#clip0_829_46960)">
                                                                <path
                                                                    opacity="0.4"
                                                                    d="M19 26V20C19 19.7348 18.8946 19.4804 18.7071 19.2929C18.5196 19.1053 18.2652 19 18 19H14C13.7348 19 13.4804 19.1053 13.2929 19.2929C13.1054 19.4804 13 19.7348 13 20V26C13 26.2652 12.8946 26.5196 12.7071 26.7071C12.5196 26.8946 12.2652 27 12 27H6C5.73478 27 5.48043 26.8946 5.29289 26.7071C5.10536 26.5196 5 26.2652 5 26V14.4425C5.00001 14.3031 5.02915 14.1653 5.08555 14.0379C5.14195 13.9104 5.22436 13.7962 5.3275 13.7025L15.3275 4.25998C15.5116 4.09239 15.7516 3.99951 16.0006 3.99951C16.2496 3.99951 16.4896 4.09239 16.6737 4.25998L26.6737 13.7025C26.7769 13.7962 26.8593 13.9104 26.9157 14.0379C26.9721 14.1653 27.0012 14.3031 27.0012 14.4425V26C27.0012 26.2652 26.8959 26.5196 26.7084 26.7071C26.5208 26.8946 26.2665 27 26.0012 27H20C19.7348 27 19.4804 26.8946 19.2929 26.7071C19.1054 26.5196 19 26.2652 19 26Z"
                                                                    fill="white"
                                                                />
                                                                <path
                                                                    d="M19 26V20C19 19.7348 18.8946 19.4804 18.7071 19.2929C18.5196 19.1053 18.2652 19 18 19H14C13.7348 19 13.4804 19.1053 13.2929 19.2929C13.1054 19.4804 13 19.7348 13 20V26C13 26.2652 12.8946 26.5196 12.7071 26.7071C12.5196 26.8946 12.2652 27 12 27H6C5.73478 27 5.48043 26.8946 5.29289 26.7071C5.10536 26.5196 5 26.2652 5 26V14.4425C5.00001 14.3031 5.02915 14.1653 5.08555 14.0379C5.14195 13.9104 5.22436 13.7962 5.3275 13.7025L15.3275 4.25998C15.5116 4.09239 15.7516 3.99951 16.0006 3.99951C16.2496 3.99951 16.4896 4.09239 16.6737 4.25998L26.6737 13.7025C26.7769 13.7962 26.8593 13.9104 26.9157 14.0379C26.9721 14.1653 27.0012 14.3031 27.0012 14.4425V26C27.0012 26.2652 26.8959 26.5196 26.7084 26.7071C26.5208 26.8946 26.2665 27 26.0012 27H20C19.7348 27 19.4804 26.8946 19.2929 26.7071C19.1054 26.5196 19 26.2652 19 26Z"
                                                                    stroke="white"
                                                                    strokeWidth="1.2"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                />
                                                            </g>
                                                        </g>
                                                        <defs>
                                                            <clipPath id="clip0_829_46960">
                                                                <rect
                                                                    width="32"
                                                                    height="32"
                                                                    fill="white"
                                                                />
                                                            </clipPath>
                                                        </defs>
                                                    </svg>
                                                    Home & Lifestyle
                                                </div>
                                            </button>
                                            <button className="button  secondary">
                                                <div className="button_container glitch capitalize">
                                                    <svg
                                                        width="32"
                                                        height="32"
                                                        viewBox="0 0 32 32"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <g opacity="0.6">
                                                            <g clipPath="url(#clip0_829_46964)">
                                                                <path
                                                                    opacity="0.4"
                                                                    d="M16 13C17.6569 13 19 11.6569 19 10C19 8.34315 17.6569 7 16 7C14.3431 7 13 8.34315 13 10C13 11.6569 14.3431 13 16 13Z"
                                                                    fill="white"
                                                                />
                                                                <path
                                                                    opacity="0.4"
                                                                    d="M5 25C6.65685 25 8 23.6569 8 22C8 20.3431 6.65685 19 5 19C3.34315 19 2 20.3431 2 22C2 23.6569 3.34315 25 5 25Z"
                                                                    fill="white"
                                                                />
                                                                <path
                                                                    opacity="0.4"
                                                                    d="M27 25C28.6569 25 30 23.6569 30 22C30 20.3431 28.6569 19 27 19C25.3431 19 24 20.3431 24 22C24 23.6569 25.3431 25 27 25Z"
                                                                    fill="white"
                                                                />
                                                                <path
                                                                    d="M2 10H13"
                                                                    stroke="white"
                                                                    strokeWidth="1.2"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                />
                                                                <path
                                                                    d="M19 10H30"
                                                                    stroke="white"
                                                                    strokeWidth="1.2"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                />
                                                                <path
                                                                    d="M16 13C17.6569 13 19 11.6569 19 10C19 8.34315 17.6569 7 16 7C14.3431 7 13 8.34315 13 10C13 11.6569 14.3431 13 16 13Z"
                                                                    stroke="white"
                                                                    strokeWidth="1.2"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                />
                                                                <path
                                                                    d="M5 25C6.65685 25 8 23.6569 8 22C8 20.3431 6.65685 19 5 19C3.34315 19 2 20.3431 2 22C2 23.6569 3.34315 25 5 25Z"
                                                                    stroke="white"
                                                                    strokeWidth="1.2"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                />
                                                                <path
                                                                    d="M27 25C28.6569 25 30 23.6569 30 22C30 20.3431 28.6569 19 27 19C25.3431 19 24 20.3431 24 22C24 23.6569 25.3431 25 27 25Z"
                                                                    stroke="white"
                                                                    strokeWidth="2"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                />
                                                                <path
                                                                    d="M18.9727 10.4062C20.9534 10.9637 22.7385 12.0647 24.1255 13.5847C25.5124 15.1047 26.4459 16.9829 26.8202 19.0062"
                                                                    stroke="white"
                                                                    strokeWidth="1.2"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                />
                                                                <path
                                                                    d="M5.17969 19.0062C5.55403 16.9829 6.48758 15.1049 7.87456 13.5849C9.26153 12.0649 11.0465 10.9638 13.0272 10.4062"
                                                                    stroke="white"
                                                                    strokeWidth="1.2"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                />
                                                            </g>
                                                        </g>
                                                        <defs>
                                                            <clipPath id="clip0_829_46964">
                                                                <rect
                                                                    width="32"
                                                                    height="32"
                                                                    fill="white"
                                                                />
                                                            </clipPath>
                                                        </defs>
                                                    </svg>
                                                    Design & Style
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <hr
                            className="my-12"
                            style={{
                                border: "1px solid #FFFFFF",
                                opacity: 0.1,
                            }}
                        /> */}
                        {/* <div className="grid grid-cols-12">
                            <div className="col-span-12">
                                <div className="max-w-6xl">
                                    <div className="text-start">
                                        <h3 className="mb-8">Certificates</h3>
                                        <div className="flex items-center gap-4 overflow-x-auto">
                                            <img
                                                className="h-[167px] w-[130px] object-cover object-center"
                                                src={certificate1}
                                                alt=""
                                            />
                                            <img
                                                className="h-[167px] w-[130px] object-cover object-center"
                                                src={certificate2}
                                                alt=""
                                            />
                                            <img
                                                className="h-[167px] w-[130px] object-cover object-center"
                                                src={certificate3}
                                                alt=""
                                            />
                                            <img
                                                className="h-[167px] w-[130px] object-cover object-center"
                                                src={certificate4}
                                                alt=""
                                            />
                                            <img
                                                className="h-[167px] w-[130px] object-cover object-center"
                                                src={certificate3}
                                                alt=""
                                            />
                                            <img
                                                className="h-[167px] w-[130px] object-cover object-center"
                                                src={certificate4}
                                                alt=""
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </section>
        </div>
    );
};
UserPublicProfile.layout = (page) => <Layout children={page} title="" />;
export default UserPublicProfile;
