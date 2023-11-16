import React, { useEffect, useState } from "react";
import user from "../../../assets/user.png";
import uploadicon from "../../../assets/uploadicon.png";
import fname from "../../../assets/fname.svg";
import envolpe from "../../../assets/envolpe.svg";
import Discord from "../../../assets/Discord.png";
import cross from "../../../assets/cross.png";
import twitter from "../../../assets/Twitter.png";
import linkedin from "../../../assets/linkedin.png";
import insta from "../../../assets/insta.png";
import youtube from "../../../assets/Youtube.png";
import profilePic from "../../../assets/img/enola.png";
import Button from "../../Components/Button";

import { ReactComponent as Usericon } from "../../../assets/svg/usericon.svg";
import ProfileLayout from "@/Layouts/ProfileLayout.jsx";
import Layout from "@/Layouts/Layout.jsx";
import CommunityModal from "@/Components/Modal/CommunityModal";
import SessionLayout from "@/Layouts/SessionLayout";
import { useForm } from "@inertiajs/react";
import Toast from "@/Components/Toast/Toast";
import Select from 'react-select';


/**
 * profile_image
 * 'country_id'
 * 'first_name'
 * 'last_name'
 * 'about'
 * 'twitter_link'
 * 'linkedin_link'
 * 'instagram_link'
 * 'youtube_link'
 *
 * route('profile.personal.update')
 */
const Personal = ({ profile, countries }) => {
    // const [selectedOption, setSelectedOption] = useState(profile?.country_iso);
    const { data, setData, put, processing, errors } = useForm({
        profile_image: '',
        first_name: profile?.first_name,
        last_name: profile?.last_name,
        country_iso: profile?.country_iso,
        about: profile?.about,
        instagram: profile?.socialMedia?.instagram,
        linkedin: profile?.socialMedia?.linkedin,
        twitter: profile?.socialMedia?.twitter,
        youtube: profile?.socialMedia?.youtube,
    });

const [disableButton , setDisableButton] = useState(true)

    // useEffect(() => {
    //     if (processing) {
    //         setDisableButton(true)
    //     }
    // }, [processing]) 

    const handleSubmit = (event) => {

        console.log('object ' , event )
        event.preventDefault();
        if (!processing) {
            put(route("profile.personal.update")); 
        }
       
    };

    // console.log("profile");
    // console.log(profile);
    // console.log("countries");
    // console.log(countries);

    const MAX_CHARACTERS = 500;
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            const imageDataUrl = reader.result;
            setData((prevState) => ({
                ...prevState,
                profile_image: imageDataUrl,
            }));
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const [wordStop, setWordStop] = useState(false);
  const [truncatedText, setTruncatedText] = useState(data?.about);
  const [charCount, setCharCount] = useState(truncatedText?.length || 0);
console.log(charCount)
const handleChange = (event) => {
    const { value } = event.target;
    setCharCount(value.length);
    if (value.length > MAX_CHARACTERS) {
      setWordStop(true);
      setTruncatedText(value.substring(0, MAX_CHARACTERS));
    } else {
      setWordStop(false);
      setTruncatedText(value);
    }
  };

  const handleKeyPress = (event) => {
    const { value } = event.target;
    if (value.length >= MAX_CHARACTERS) {
      event.preventDefault();
    }
  };

    // useEffect(() => {
    //     const inputText = data?.about;
    //     const trimmedText = inputText.trim();
    //     const words = trimmedText.split(/\s+/);

    //     if (words.length > MAX_WORDS) {
    //         setTruncatedText(words.slice(0, MAX_WORDS).join(" "));
    //         setWordCount(MAX_WORDS);
    //     } else {
    //         setTruncatedText(trimmedText);
    //         setWordCount(words.length);
    //     }
    // }, []);

   
    // const options = countries.map((country) => ({
    //     country_iso: country?.iso,
    //     label: country?.name,
    // }));
    // const colourStyles = {
    //     control: styles => ({ ...styles, border: '1px solid #ffffff10', height: '50px', borderRadius: '0px', backgroundColor: '#ffffff10' }),
    //     option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    //         // const color = chroma(data.color);
    //         return {
    //             ...styles,
    //             backgroundColor: isDisabled ? 'red' : 'black',
    //             color: 'white',
    //             cursor: isDisabled ? 'not-allowed' : 'default',

    //         };
    //     },

    // };
    return (
        <div data-aos="fade-in" data-aos-delay="100" data-aos-easing="ease" data-aos-duration="300" className="  md:px-6 lg:px-0 paddingSectionMedium containerMedium">
            <div className="bg-animation"></div>
            <div className="grid grid-cols-12 gap-4 px-5 md:px-0">

                <div className="col-span-0 md:col-span-2 hidden md:block">
                    {" "}
                </div>
                <div className="col-span-12 md:col-span-10">
                    <div className="col-span-10 md:col-span-10">
                        <div className="flex justify-center md:justify-start  ">
                            <h3 className="    ">Personal Information</h3>
                        </div>
                    </div>
                </div>
            </div>
            <div className=" flex justify-between paddingSection24 lg:paddingSectionMedium">
                <div className="w-[25%] hidden md:block">
                    <p className="fs-regular fw-medium py-9"> Profile Image </p>
                </div>
                <div className="w-[90%] px-5 lg:px-0">
                    <div className="flex  ">
                        <div className="flex  ">
                            <img
                                src={data.profile_image || profile?.dp?.small?.url || user}
                                alt="user"
                                className="h-[6rem] w-[6rem]  rounded-full object-cover "
                            />
                            <button className="button icon secondary   px-7  lg:px-10  ml-[24px] my-6">
                                <label
                                    for="uploadimg"
                                    className="flex uppercase "
                                >
                                    {/* <img
                                        src={uploadicon}
                                        alt="upload img"
                                        className="w-[24px] mx-2 -mt-1 lg:mt-[2px] h-[24px] object-cover "
                                    /> */}
                                    Upload Image
                                    <input
                                        onChange={handleImageChange}
                                        type="file"
                                        className="hidden"
                                        id="uploadimg"
                                        accept="image/png, image/jpeg"
                                    />
                                </label>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-4 my-[8px] mx-auto">
                <div className="col-span-2 md:col-span-2 hidden md:block">
                    <p className="py-3 fs-regular fw-medium"> Your Name </p>
                </div>

                <div className="col-span-12 mx-4 md:mx-0 md:col-span-10  ">
                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-12 md:col-span-6">
                            <span className="relative">
                                <input
                                    type="text"
                                    autoFocus
                                    className="input-text w-full  "
                                    placeholder="First Name"
                                    name="first_name"
                                    value={data?.first_name}
                                    onChange={(e) =>
                                        setData("first_name", e.target.value)
                                    }
                                />
                                {/* <img
                                    className="w-5 h-5 absolute right-5 top-0"
                                    src={fname}
                                    alt=""
                                /> */}
                            </span>
                            {errors?.first_name && (
                                <p className="fs-tiny fw-regular mt-2 text-center danger-color ">
                                    {errors?.first_name}{" "}
                                </p>
                            )}
                        </div>
                        <div className="col-span-12 md:col-span-6">
                            <span className="relative">
                                <input
                                    type="text"
                                    className="input-text w-full "
                                    placeholder="Last Name"
                                    name="lastName"
                                    value={data.last_name}
                                    onChange={(e) =>
                                        setData("last_name", e.target.value)
                                    }
                                />
                                {/* <img
                                    className="w-5 h-5 absolute right-5 top-0"
                                    src={fname}
                                    alt=""
                                /> */}
                            </span>
                            {errors?.last_name && (
                                <p className="fs-tiny fw-regular mt-2 text-center danger-color ">
                                    {errors?.last_name}{" "}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-4 my-[16px] ">
                <div className="col-span-2 md:col-span-2 hidden md:block ">
                    <p className="py-3 fs-regular fw-medium"> Email</p>
                </div>

                <div className="col-span-12 md:col-span-10 px-4 md:px-0">
                    <div className="grid grid-cols-12 gap-4   ">
                        <div className="col-span-12 md:col-span-12">
                            <span className="relative">
                                <input
                                    type="email"
                                    disabled
                                    className="input-text w-full "
                                    placeholder="Email"
                                    name="email"
                                    value={profile?.email}
                                />
                                {/* <img
                                    className="w-5 h-5 absolute right-5 top-0"
                                    src={envolpe}
                                    alt=""
                                /> */}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-4  md:mt-[48px]">
                <div className="col-span-2 md:col-span-2 hidden md:block">
                    <p className="py-3 fs-regular fw-medium "> Country</p>
                </div>

                <div className="col-span-12 md:col-span-10 px-4 md:px-0 ">
                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-12 md:col-span-12">
                            <div className="country">
                                {/* <Select
                                    defaultValue={selectedOption}
                                    onChange={setSelectedOption}
                                    options={options}
                                    styles={colourStyles}
                                /> */}
                            </div>
                            <fieldset>
                                <div className="relative ">
                                    <label
                                        htmlFor="frm-whatever"
                                        className="sr-only"
                                    >
                                        My field
                                    </label>
                                    <select
                                        name="selectedOption"
                                        value={data?.country_iso}
                                        onChange={(e) =>
                                            setData(
                                                "country_iso",
                                                e.target.value
                                            )
                                        }
                                        className=" rounded-[20px] appearance-none w-full py-1 px-2   border-0 input-noise-10 focus:border-[#ffffff] focus:shadow-none focus:ring-transparent focus:border   regular text-[#FFFFFF] font-normal bg-transparent outline-none h-12 px-6"
                                        id="frm-whatever"
                                    >
                                        <option disabled value="">
                                            Country
                                        </option>
                                        {countries.map((country) => (
                                            <option
                                                value={country?.iso}
                                                key={country?.id}
                                                selected={
                                                    country?.iso ===
                                                    profile?.country?.iso
                                                }
                                            >
                                                {country?.name}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="pointer-events-none absolute right-0 top-0 bottom-0 flex items-center px-2 regular text-[#FFFFFF] font-normal bg-transparent outline-none">
                                        <svg
                                            width="21"
                                            height="22"
                                            viewBox="0 0 21 22"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <g clipPath="url(#clip0_216_18759)">
                                                <path
                                                    opacity="0.2"
                                                    d="M17.0625 8.375L10.5 14.9375L3.9375 8.375H17.0625Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M17.0625 8.375L10.5 14.9375L3.9375 8.375H17.0625Z"
                                                    stroke="white"
                                                    strokeOpacity="0.6"
                                                    strokeWidth="1.2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_216_18759">
                                                    <rect
                                                        width="21"
                                                        height="21"
                                                        fill="white"
                                                        transform="translate(0 0.5)"
                                                    />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-4 my-[16px]">
                <div className="col-span-2 md:col-span-2 hidden md:block ">
                    <p className="py-3 fs-regular fw-medium "> About</p>
                </div>

                <div className="col-span-12 md:col-span-10 px-4 md:px-0">
                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-12 md:col-span-12">
                            <div>
                                <textarea
                                    onKeyPress={handleKeyPress}
                                    id="about"
                                    value={data?.about}
                                    onChange={(e) => { setData("about", e.target.value); handleChange(e) }
                                    }
                                    rows="8"
                                    className="bg-[#1a1a1a] border-0 rounded-[20px]  focus:border-[#ffffff] focus:shadow-none focus:ring-transparent focus:border   w-full px-[24px] py-[16px] text-[15px] outline-0 text-white                 "
                                    placeholder="About"
                                    required
                                ></textarea>
                                <div className="w-full flex justify-between">
                                    <div>
                                {errors?.about && (
                                <p className="fs-tiny fw-regular mt-2 text-center danger-color ">
                                    {errors?.about}  
                                </p>
                            )}
                            </div>
                                    <p className="fs-tiny opacity-50">
                                        {charCount}/500
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* social media  */}
            <div className="grid grid-cols-12 gap-4 mt-[32px] md:mt-[48px]">
                <div className="col-span-2 md:col-span-2 hidden md:block">
                    <p className="py-3  fs-regular fw-medium "> Social</p>
                </div>

                <div className="col-span-12 md:col-span-10 px-5 md:px-0">
                    <div className="grid grid-cols-12 gap-4">
                        {/* Discord  */}
                        {/* <div className="col-span-12 md:col-span-12">
                            <div className="bg-discord rounded-[20px]  border-0  flex items-center justify-between  px-[20px] py-[14px] cursor-pointer">
                                <div className="flex">
                                    <img
                                        src={Discord}
                                        alt="Discord"
                                        className="w-[24px] h-[24px] "
                                    />
                                    <p className="fs-regular fw-regular text-white px-[13px] py-[3px] ">
                                        Connected with Discord
                                    </p>
                                </div>
                                <span>
                                    <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <g
                                            opacity="1"
                                            clipPath="url(#clip0_1107_75914)"
                                        >
                                            <path
                                                opacity="0.4"
                                                d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
                                                fill="white"
                                            />
                                            <path
                                                d="M15 9L9 15"
                                                stroke="white"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M9 9L15 15"
                                                stroke="white"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
                                                stroke="white"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_1107_75914">
                                                <rect
                                                    width="24"
                                                    height="24"
                                                    fill="white"
                                                />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </span>
                            </div>
                        </div> */}
                        {/* twitter  */}
                        <div className="col-span-12 lg:col-span-12  ">
                            <div className="grid grid-cols-12 gap-4">
                                <div className="col-span-12 lg:col-span-6">
                                    <span className="relative">
                                        <input
                                            type="text"
                                            className="input-text   w-full  "
                                            placeholder="twitter"
                                            name="twitter"
                                            value={data.twitter}
                                            onChange={(e) =>
                                                setData(
                                                    "twitter",
                                                    e.target.value
                                                )
                                            }
                                        />

                                        {/* <div className="absolute left-3 top-0 -mt-1 ">
                                            <svg
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <g
                                                    opacity="0.6"
                                                    clipPath="url(#clip0_1107_75917)"
                                                >
                                                    <path
                                                        opacity="0.4"
                                                        d="M8.25 16.5C8.25 16.5 3.07969 13.5 3.82312 5.24997C3.82312 5.24997 7.54125 8.99997 12 9.74997V8.24997C12 6.18747 13.6875 4.47466 15.75 4.49997C16.4779 4.50843 17.1882 4.7247 17.7972 5.12333C18.4063 5.52195 18.8888 6.08632 19.1878 6.74997H22.5L19.5 9.74997C19.1006 16.0162 13.8675 21 7.5 21C4.5 21 3.75 19.875 3.75 19.875C3.75 19.875 6.75 18.75 8.25 16.5Z"
                                                        fill="white"
                                                    />
                                                    <path
                                                        d="M8.25 16.5C8.25 16.5 3.07969 13.5 3.82312 5.24997C3.82312 5.24997 7.54125 8.99997 12 9.74997V8.24997C12 6.18747 13.6875 4.47466 15.75 4.49997C16.4779 4.50843 17.1882 4.7247 17.7972 5.12333C18.4063 5.52195 18.8888 6.08632 19.1878 6.74997H22.5L19.5 9.74997C19.1006 16.0162 13.8675 21 7.5 21C4.5 21 3.75 19.875 3.75 19.875C3.75 19.875 6.75 18.75 8.25 16.5Z"
                                                        stroke="white"
                                                        strokeWidth="1.2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_1107_75917">
                                                        <rect
                                                            width="24"
                                                            height="24"
                                                            fill="white"
                                                        />
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                        </div> */}
                                    </span>
                                    {errors?.twitter && (
                                        <p className="fs-tiny fw-regular mt-2 danger-color ">
                                            {errors?.twitter}{" "}
                                        </p>
                                    )}
                                </div>
                                {/* linkedin  */}
                                <div className="col-span-12 lg:col-span-6">
                                    <span className="relative">
                                        {/* <div className="absolute left-3 top-0 -mt-1 ">
                                            <svg
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <g
                                                    opacity="0.6"
                                                    clipPath="url(#clip0_1107_75925)"
                                                >
                                                    <path
                                                        opacity="0.4"
                                                        d="M20.25 3H3.75C3.33579 3 3 3.33579 3 3.75V20.25C3 20.6642 3.33579 21 3.75 21H20.25C20.6642 21 21 20.6642 21 20.25V3.75C21 3.33579 20.6642 3 20.25 3Z"
                                                        fill="white"
                                                    />
                                                    <path
                                                        d="M20.25 3H3.75C3.33579 3 3 3.33579 3 3.75V20.25C3 20.6642 3.33579 21 3.75 21H20.25C20.6642 21 21 20.6642 21 20.25V3.75C21 3.33579 20.6642 3 20.25 3Z"
                                                        stroke="white"
                                                        strokeWidth="1.2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                    <path
                                                        d="M11.25 10.5V16.5"
                                                        stroke="white"
                                                        strokeWidth="1.2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                    <path
                                                        d="M8.25 10.5V16.5"
                                                        stroke="white"
                                                        strokeWidth="1.2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                    <path
                                                        d="M11.25 13.125C11.25 12.4288 11.5266 11.7611 12.0188 11.2688C12.5111 10.7766 13.1788 10.5 13.875 10.5C14.5712 10.5 15.2389 10.7766 15.7312 11.2688C16.2234 11.7611 16.5 12.4288 16.5 13.125V16.5"
                                                        stroke="white"
                                                        strokeWidth="1.2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                    <path
                                                        d="M8.25 9C8.87132 9 9.375 8.49632 9.375 7.875C9.375 7.25368 8.87132 6.75 8.25 6.75C7.62868 6.75 7.125 7.25368 7.125 7.875C7.125 8.49632 7.62868 9 8.25 9Z"
                                                        fill="white"
                                                    />
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_1107_75925">
                                                        <rect
                                                            width="24"
                                                            height="24"
                                                            fill="white"
                                                        />
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                        </div> */}
                                        <input
                                            type="text"
                                            className="input-text   w-full    "
                                            placeholder="linkedin"
                                            value={data.linkedin}
                                            onChange={(e) =>
                                                setData(
                                                    "linkedin",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </span>
                                    {errors?.linkedin && (
                                        <p className="fs-tiny fw-regular mt-2 danger-color ">
                                            {errors?.linkedin}{" "}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                        {/* instagram  */}
                        <div className="col-span-12 lg:col-span-12">
                            <div className="grid grid-cols-12 gap-4">
                                <div className="col-span-12 lg:col-span-6">
                                    <span className="relative">
                                        <input
                                            type="text"
                                            className="input-text   w-full "
                                            placeholder="instagram"
                                            name="twitter"
                                            value={data.instagram}
                                            onChange={(e) =>
                                                setData(
                                                    "instagram",
                                                    e.target.value
                                                )
                                            }
                                        />

                                        {/* <div className="absolute left-3 top-0 -mt-1 ">
                                            <svg
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <g
                                                    opacity="0.6"
                                                    clipPath="url(#clip0_1107_75921)"
                                                >
                                                    <path
                                                        opacity="0.4"
                                                        d="M16.5 3H7.5C6.30653 3 5.16193 3.47411 4.31802 4.31802C3.47411 5.16193 3 6.30653 3 7.5V16.5C3 17.6935 3.47411 18.8381 4.31802 19.682C5.16193 20.5259 6.30653 21 7.5 21H16.5C17.6935 21 18.8381 20.5259 19.682 19.682C20.5259 18.8381 21 17.6935 21 16.5V7.5C21 6.30653 20.5259 5.16193 19.682 4.31802C18.8381 3.47411 17.6935 3 16.5 3ZM12 15.75C11.2583 15.75 10.5333 15.5301 9.91661 15.118C9.29993 14.706 8.81928 14.1203 8.53545 13.4351C8.25162 12.7498 8.17736 11.9958 8.32205 11.2684C8.46675 10.541 8.8239 9.8728 9.34835 9.34835C9.8728 8.8239 10.541 8.46675 11.2684 8.32205C11.9958 8.17736 12.7498 8.25162 13.4351 8.53545C14.1203 8.81928 14.706 9.29993 15.118 9.91661C15.5301 10.5333 15.75 11.2583 15.75 12C15.75 12.9946 15.3549 13.9484 14.6517 14.6517C13.9484 15.3549 12.9946 15.75 12 15.75Z"
                                                        fill="white"
                                                    />
                                                    <path
                                                        d="M16.5 3H7.5C5.01472 3 3 5.01472 3 7.5V16.5C3 18.9853 5.01472 21 7.5 21H16.5C18.9853 21 21 18.9853 21 16.5V7.5C21 5.01472 18.9853 3 16.5 3Z"
                                                        stroke="white"
                                                        strokeWidth="1.2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                    <path
                                                        d="M12 15.75C14.0711 15.75 15.75 14.0711 15.75 12C15.75 9.92893 14.0711 8.25 12 8.25C9.92893 8.25 8.25 9.92893 8.25 12C8.25 14.0711 9.92893 15.75 12 15.75Z"
                                                        stroke="white"
                                                        strokeWidth="1.2"
                                                        strokeMiterlimit="10"
                                                    />
                                                    <path
                                                        d="M16.875 8.25C17.4963 8.25 18 7.74632 18 7.125C18 6.50368 17.4963 6 16.875 6C16.2537 6 15.75 6.50368 15.75 7.125C15.75 7.74632 16.2537 8.25 16.875 8.25Z"
                                                        fill="white"
                                                    />
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_1107_75921">
                                                        <rect
                                                            width="24"
                                                            height="24"
                                                            fill="white"
                                                        />
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                        </div> */}
                                    </span>
                                    {errors?.instagram && (
                                        <p className="fs-tiny fw-regular mt-2 danger-color ">
                                            {errors?.instagram}{" "}
                                        </p>
                                    )}
                                </div>
                                {/* youtube  */}
                                <div className="col-span-12 lg:col-span-6">
                                    <span className="relative">
                                        {/* <div className="absolute left-3 top-0 -mt-1 ">
                                            <svg
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <g
                                                    opacity="0.6"
                                                    clipPath="url(#clip0_1107_75929)"
                                                >
                                                    <path
                                                        opacity="0.4"
                                                        d="M21.2428 6.70596C21.1851 6.47471 21.0731 6.26053 20.9161 6.08119C20.7591 5.90185 20.5616 5.76251 20.34 5.67471C17.2013 4.46721 12 4.50003 12 4.50003C12 4.50003 6.79875 4.46721 3.65625 5.6794C3.43466 5.7672 3.23718 5.90654 3.08017 6.08588C2.92317 6.26522 2.81116 6.47939 2.75344 6.71065C2.53781 7.55065 2.25 9.19596 2.25 12C2.25 14.8041 2.53781 16.4494 2.75719 17.2941C2.8152 17.5241 2.92694 17.7371 3.08322 17.9155C3.23951 18.094 3.43589 18.2328 3.65625 18.3207C6.79875 19.5328 12 19.5 12 19.5C12 19.5 17.2013 19.5328 20.3438 18.3207C20.5648 18.2333 20.7619 18.0947 20.9189 17.9162C21.0759 17.7377 21.1882 17.5245 21.2466 17.2941C21.4659 16.4503 21.7537 14.8041 21.7537 12C21.7537 9.19596 21.4622 7.55065 21.2428 6.70596ZM10.5 15V9.00003L15 12L10.5 15Z"
                                                        fill="white"
                                                    />
                                                    <path
                                                        d="M15 12L10.5 9V15L15 12Z"
                                                        stroke="white"
                                                        strokeWidth="1.2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                    <path
                                                        d="M2.25 12C2.25 14.8041 2.53781 16.4485 2.75719 17.2941C2.8152 17.5241 2.92694 17.7371 3.08322 17.9155C3.23951 18.094 3.43589 18.2328 3.65625 18.3207C6.79875 19.5328 12 19.5 12 19.5C12 19.5 17.2012 19.5328 20.3438 18.3207C20.5648 18.2333 20.7619 18.0947 20.9189 17.9162C21.0759 17.7377 21.1882 17.5245 21.2466 17.2941C21.4659 16.4503 21.7537 14.8041 21.7537 12C21.7537 9.19596 21.4659 7.55159 21.2466 6.70596C21.1888 6.47471 21.0768 6.26053 20.9198 6.08119C20.7628 5.90185 20.5653 5.76251 20.3438 5.67471C17.2012 4.46721 12 4.50003 12 4.50003C12 4.50003 6.79875 4.46721 3.65625 5.6794C3.43466 5.7672 3.23718 5.90654 3.08017 6.08588C2.92317 6.26522 2.81116 6.47939 2.75344 6.71065C2.53781 7.55065 2.25 9.19596 2.25 12Z"
                                                        stroke="white"
                                                        strokeWidth="1.2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_1107_75929">
                                                        <rect
                                                            width="24"
                                                            height="24"
                                                            fill="white"
                                                        />
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                        </div> */}
                                        <input
                                            type="text"
                                            className="input-text   w-full "
                                            placeholder="youtube"
                                            value={data.youtube}
                                            onChange={(e) =>
                                                setData(
                                                    "youtube",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </span>
                                    {errors?.youtube && (
                                        <p className="fs-tiny fw-regular mt-2 danger-color ">
                                            {errors?.youtube}{" "}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>









            {/* button  */}

            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-0 md:col-span-2 hidden md:block">
                    {" "}
                </div>
                <div className="col-span-12 md:col-span-10">
                    <div className="col-span-10 md:col-span-10 px-5 md:px-0">
                        <div className="flex justify-center md:justify-start " >
                            <Button
                            onClick={handleSubmit}
                            disabled={processing}
                                // icon={<Usericon />}
                                className={"primary icon mt-[1rem] md:mt-[4rem] uppercase"}
                            >
                               {processing ? 'Saving...' : ' Save Profile'  }
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

Personal.layout = (page) => (
    <SessionLayout>
        <ProfileLayout children={page} pageTitle={""} />
    </SessionLayout>
);
export default Personal;
