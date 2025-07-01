import React, { useState } from "react";
import user from "../../../assets/user.png";
import Button from "../../Components/Button";
import ProfileLayout from "@/Layouts/ProfileLayout.jsx";
import SessionLayout from "@/Layouts/SessionLayout";
import { Head, useForm, usePage } from "@inertiajs/react";

import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import { useRef } from "react";
import CropModal from "@/Components/Modal/CropModal";
import { useEffect } from "react";
import ChooseAvatar from "@/Components/Modal/ChooseAvatar";
import intlTelInput from 'intl-tel-input';
import 'intl-tel-input/build/css/intlTelInput.css';

const Personal = ({ profile, countries, avatars, phoneNumber }) => {
    const [isValidPhone, setIsValidPhone] = useState(true)
    const [phoneError, setPhoneError] = useState(false)
    const user = usePage()?.props?.auth?.user;


    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        avatar_id: '',
        first_name: profile?.first_name,
        last_name: profile?.last_name,
        country_iso: profile?.country_iso,
        phone_number: phoneNumber,
        // about: profile?.about,
        // instagram: profile?.socialMedia?.instagram,
        // linkedin: profile?.socialMedia?.linkedin,
        // twitter: profile?.socialMedia?.twitter,
        // youtube: profile?.socialMedia?.youtube,
    });

    // console.log('phone Number : ' , phoneNumber)
    const handleSubmit = (event) => {
        event.preventDefault();
        if (isValidPhone) {
            if (!processing) {
                post(route("profile.personal.update"), {
                    preserveScroll: true,
                    onSuccess: () => {
                        setShowButtons(true);
                    },
                });
            }

        }
    };

    const [updateAvatar, setUpdateAvatar] = useState('')

    // const updateAvatar = avatars?.data?.find(avatar => avatar?.id === data?.avatar_id);


    const MAX_CHARACTERS = 500;


    // const [closeModal , setCloseModal] = useState(false)

    // const [cropedThumbnail, setCropedThumbnail] = useState('')
    // const [inputKey, setInputKey] = useState(0);

    // const handleImageChange = (event) => {
    //     const file = event.target.files[0];
    //     const reader = new FileReader();

    //     reader.onloadend = () => {
    //         const imageDataUrl = reader.result;
    //         setImage(imageDataUrl)
    //         setCloseModal(true)
    //         setInputKey(prevKey => prevKey + 1);
    //         // setData((prevState) => ({
    //         //     ...prevState,
    //         //     profile_image: imageDataUrl,
    //         // }));
    //     };

    //     if (file) {
    //         reader.readAsDataURL(file);
    //     }
    // };



    // useEffect(() => {
    //     setData('profile_image', cropedThumbnail)
    // }, [cropedThumbnail])

    const [showButtons, setShowButtons] = useState(true)


    const [wordStop, setWordStop] = useState(false);
    const [truncatedText, setTruncatedText] = useState(data?.about);
    const [charCount, setCharCount] = useState(truncatedText?.length || 0);
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


    // *********phone number ************

    const phoneInputRef = useRef(null);

    let phoneInput;


    useEffect(() => {
        const fetchCountryCode = async () => {
            try {
                initializePhoneInput(countryCode);
            } catch (error) {
                initializePhoneInput('us');
            }
        };

        fetchCountryCode();
    }, []);



    const initializePhoneInput = (countryCode) => {
        phoneInput = intlTelInput(phoneInputRef.current, {
            initialCountry: countryCode,
            utilsScript: 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js',
            onlyCountries: countries.map(item => item.iso)
        });
    };

    const handlePhoneInputChange = () => {
        const phoneInput = phoneInputRef.current;
        setPhoneError(false)
        if (phoneInput) {
            const phoneNumber = phoneInput.value;
            //   console.log(phoneNumber)
            const intlTelInputInstance = window.intlTelInputGlobals.getInstance(phoneInput);


            if (intlTelInputInstance.isValidNumber()) {
                setIsValidPhone(true);
                setPhoneError(false)
                // Get the formatted phone number with the country code
                const formattedPhoneNumber = intlTelInputInstance.getNumber();



                // console.log('Formatted phone number:', formattedPhoneNumber);
                setData('phone_number', formattedPhoneNumber);
            } else {
                setIsValidPhone(false);
                setPhoneError(true)
                // console.log('Invalid phone number:', phoneNumber);
            }
        }
    };


    return (
        <div data-aos="fade-in" data-aos-delay="100" data-aos-easing="ease" data-aos-duration="300"
            className="   lg:px-0 page-paddeing containerMedium">
            <Head>
                <title>Settings</title>
            </Head>
            {/* {image &&  <CropModal  setImage={setImage} image={image} closeModal={closeModal} setCloseModal={setCloseModal} setCropedThumbnail={setCropedThumbnail} />  } */}
            <div className="bg-animation"></div>
            <div className="grid grid-cols-12 gap-4 px-5 md:px-0">



                {/*
            <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {src && (
        <Cropper
          ref={cropperRef}
          src={src}
          style={{ height: 400, width: '100%' }}
          aspectRatio={1}
          guides={true}
        />
      )}
      <button onClick={handleCrop}>Crop</button>
    </div> */}






                <div className="col-span-0 md:col-span-2 hidden md:block">
                    {" "}
                </div>
                {/* <div className="col-span-12 md:col-span-10">
                    <div className="col-span-10 md:col-span-10">
                        <div className="flex justify-center md:justify-start  ">
                            <h3 className="    ">Personal Information</h3>
                        </div>
                    </div>
                </div> */}
            </div>
            <div className="card-bg border-rounded-15 mx-3 px-5  py-5 md:py-[30px] " >

                <div className="  px-1 lg:px-0">

                    <div>
                        <div className="flex justify-center">
                            <div className="avatar rounded-full">

                                <img
                                    src={updateAvatar?.image?.url || profile?.dp?.original?.url}
                                    alt="user"
                                    className=" object-cover "
                                />
                            </div>
                        </div>
                        {/* <p className="text-center glitch-id uppercase ">glitch #{profile?.id.toString().padStart(4, '0')}</p>
                        <ChooseAvatar avatars={avatars} setData={setData} setUpdateAvatar={setUpdateAvatar} /> */}
                        <p className="text-center glitch-text-profile mt-3.5 uppercase">glitch #{user.id.toString().padStart(4, '0')} </p>

                        {/* <button className="button icon secondary   px-7  lg:px-10  ml-[24px] my-6">
                                <label
                                    for="uploadimg"
                                    className="flex uppercase "
                                >
                                    Upload Image
                                    <input
                                    key={inputKey}

                                        onChange={handleImageChange}
                                        type="file"
                                        className="hidden"
                                        id="uploadimg"
                                        accept="image/png, image/jpeg"
                                    />
                                </label>
                            </button> */}

                    </div>
                </div>
            </div>







            <div className="card-bg pt-6 pb-7 border-rounded-15 px-0 md:px-4   mx-3 mt-3.5">

                <p className="personal-info-text   pb-3.5  ">PERSONAL INFORMATION</p>
                <div className="grid grid-cols-12 gap-4   mx-auto px-2 md:px-0 lg:px-0">
                    {/* <div className="col-span-2 md:col-span-2 hidden md:block">
                        <p className="py-3 fs-regular fw-medium"> Your Name </p>
                    </div> */}

                    <div className="col-span-12 mx-0 md:mx-0 md:col-span-12">
                        <div className="grid grid-cols-12 gap-y-4 mb-4 gap-x-3">
                            <div className="col-span-12 md:col-span-6 ">
                                <span className="relative">
                                    <input
                                        type="text"

                                        className="input-text w-full mb-0"
                                        placeholder="First Name"
                                        name="first_name"
                                        disabled={showButtons}
                                        value={data?.first_name}
                                        onChange={(e) =>
                                            setData("first_name", e.target.value)
                                        }
                                    />
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
                                        className="input-text w-full mb-0"
                                        placeholder="Last Name"
                                        name="lastName"
                                        disabled={showButtons}
                                        value={data.last_name}
                                        onChange={(e) =>
                                            setData("last_name", e.target.value)
                                        }
                                    />
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

                {/* <div className="grid grid-cols-12 gap-4"> */}
                {/* <div className="col-span-2 md:col-span-2 hidden md:block ">
                        <p className="py-3 fs-regular fw-medium"> Email</p>
                    </div> */}

                {/* <div className="col-span-12 md:col-span-12 px-2 md:px-0"> */}
                <div className="grid grid-cols-12 mb-4">
                    <div className="col-span-12 md:col-span-12">
                        <span className="relative">
                            <input
                                type="email"
                                disabled
                                className="input-text w-[96%]  md:w-full mb-0 margin-0"
                                placeholder="Email"
                                name="email"
                                value={profile?.email}
                            />
                        </span>
                    </div>
                </div>
                {/* </div> */}
                {/* </div> */}



                <div className="grid grid-cols-12 gap-4  mb-2">
                    {/* <div className="col-span-2 md:col-span-2 hidden md:block ">
                        <p className="py-3 fs-regular fw-medium"> Cell Phone</p>
                    </div> */}

                    <div className="col-span-12 md:col-span-12 px-2 md:px-0">
                        <div className="grid grid-cols-12 gap-4   ">
                            <div className="col-span-12 md:col-span-12">
                                <div className="relative">
                                    <input
                                        ref={phoneInputRef}
                                        type="tel"
                                        id="phone"
                                        disabled={showButtons}
                                        className={'phone-input mb-0'}
                                        defaultValue={data?.phone_number}
                                        onChange={handlePhoneInputChange}
                                    />
                                </div>
                                {phoneError && (
                                    <p className="fs-tiny fw-regular mt-[3px]   text-center danger-color ">
                                        Invalid Cell Phone
                                    </p>
                                )}
                                {errors?.phone_number && (
                                    <p className="fs-tiny fw-regular mt-[3px]  text-center danger-color ">
                                        {errors?.phone_number}{" "}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>


                <div className="grid grid-cols-12 gap-4  ">
                    {/* <div className="col-span-2 md:col-span-2 hidden md:block">
                        <p className="py-3 fs-regular fw-medium "> Country</p>
                    </div> */}

                    <div className="col-span-12 md:col-span-12 px-2 md:px-0 ">
                        <div className="grid grid-cols-12 gap-4">
                            <div className="col-span-12 md:col-span-12">
                                <div className="country">
                                </div>
                                <fieldset>
                                    <div className="relative ">
                                        <label
                                            htmlFor="frm-whatever"
                                            className="sr-only"
                                        >
                                            My field
                                        </label>
                                        <div className="absolute country-dropdown right-5 w-fit ">

                                            <svg className="h-1.5 w-1.5 md:h-2.5 md:w-2.5 md:mt-0 mt-1 " viewBox="0 0 5 3" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M0.371094 0.14209L2.68158 2.25358L4.99206 0.14209H0.371094Z" fill="#909090" />
                                            </svg>
                                        </div>
                                        <select
                                            name="selectedOption"
                                            disabled={showButtons}
                                            value={data?.country_iso || ''} // Use an empty string if data?.country_iso is undefined
                                            onChange={(e) => setData("country_iso", e.target.value)}
                                            className="border-rounded-8 text-center appearance-none w-full input-shadow register-country-height  px-2 border-0  focus:border-[#ffffff] focus:shadow-none focus:ring-transparent focus:border regular text-[#FFFFFF] font-normal bg-transparent outline-none px-6"
                                            id="frm-whatever"
                                        >
                                            <option disabled value="">
                                                Country
                                            </option>
                                            {countries.map((country, index) => (
                                                <option
                                                    value={country?.iso}
                                                    key={index + 3}
                                                >
                                                    {country?.name}
                                                </option>
                                            ))}
                                        </select>

                                        {/* <div
                                            className="pointer-events-none absolute right-0 top-0 bottom-0 flex items-center px-2 regular text-[#FFFFFF] font-normal bg-transparent outline-none">
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
                                        </div> */}
                                    </div>
                                </fieldset>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-12 gap-4 my-[16px] hidden">
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
                                        onChange={(e) => {
                                            setData("about", e.target.value);
                                            handleChange(e)
                                        }}
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
                <div className="grid grid-cols-12 gap-4 mt-[32px] form-fields-mt hidden">
                    <div className="col-span-2 md:col-span-2 hidden md:block">
                        <p className="py-3  fs-regular fw-medium "> Social</p>
                    </div>

                    <div className="col-span-12 md:col-span-10 px-5 md:px-0">
                        <div className="grid grid-cols-12 gap-4">
                            <div className="col-span-12 lg:col-span-12  ">
                                <div className="grid grid-cols-12 gap-4">
                                    <div className="col-span-12 lg:col-span-6">
                                        <span className="relative">
                                            <input
                                                type="text"
                                                className="input-text   w-full "
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
                                            <input
                                                type="text"
                                                className="input-text   w-full "
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



                <div className="grid grid-cols-12 gap-4">
                    {/* <div className="col-span-0 md:col-span-2 hidden md:block">
                        {" "}
                    </div> */}
                    <div className="col-span-12 md:col-span-12">
                        <div className="col-span-10 md:col-span-10 px-2 md:px-0">

                            <div className={` ${!showButtons && 'hidden'}  w-full pt-2.5`}>


                                <button
                                    onClick={() => { setShowButtons(false) }}
                                    disabled={processing}
                                    className={" profile-buttons  bg-[#fff] text-black button primary pt-[2px]"
                                    }
                                >
                                    UPDATE PERSONAL INFO
                                </button>

                            </div>

                            <div className={` ${showButtons && 'hidden'} pt-2.5  gap-x-[12px] flex `}>
                                <button onClick={() => setShowButtons(true)}
                                    className={"profile-buttons bg-[#7E0606] text-white pt-[2px]"
                                    }>Cancel</button>



                                <button
                                    onClick={(e) => { handleSubmit(e) }}
                                    disabled={processing}
                                    className={" profile-buttons  bg-[#fff] text-black pt-[2px]"
                                    }
                                >
                                    {processing ? "Updating..." : "SAVE UPDATES"}
                                </button>
                            </div>















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
