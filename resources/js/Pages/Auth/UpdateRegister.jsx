import React, { useEffect, useState } from "react";
import logo from "../../../assets/svg/logo.svg";
import { Link, useForm, usePage } from "@inertiajs/react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { ToastContainer, toast } from "react-toastify";
import Toast from "@/Components/Toast/Toast.jsx";
import Timer from "@/Components/Timer";
import intlTelInput from 'intl-tel-input';
import 'intl-tel-input/build/css/intlTelInput.css';
import { useRef } from "react";
import CheckoutLayout from "@/Layouts/CheckoutLayout";
import ReactToast from "@/Components/ReactToast";
import Recaptcha from "@/Components/Recaptcha";
import axios from "axios";
import { motion } from "framer-motion"
const UpdateRegister = ({ countries, billingAddress, user, userData, setUserData, countryCode, recaptchaKey, update = true, setUpdateBillingPage = '', invite_code }) => {

    useEffect(() => {
        AOS.init();
    }, [])
    // const [recaptchaState, setRecaptchaState] = useState(0);



    //   const handleGetUser = async () => {
    //     try {
    //         const response = await axios.get(route("get-auth-user" ));
    //         setUserData(response.data?.payload)
    //         console.log("user data reveived*********************** :", response );
    //     } catch (error) {
    //         console.error("Error while getting user   :", error);
    //     }
    // };

    // console.log( 'user data : ' ,  userData)

    //  const [userData , setUserData] = useState(user)




    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        email: userData?.email ? userData?.email : user?.email,
        first_name: userData?.first_name ? userData?.first_name : user?.first_name,
        last_name: userData?.last_name ? userData?.last_name : user?.last_name,
        invite_code: invite_code,
        phone_number: userData?.billingAddress?.phone_number ? userData?.billingAddress?.phone_number : billingAddress?.phone_number,
        street_address: userData?.billingAddress?.street_address ? userData?.billingAddress?.street_address : billingAddress?.street_address,
        city: userData?.billingAddress?.city ? userData?.billingAddress?.city : billingAddress?.city,
        zip_code: userData?.billingAddress?.zip_code ? userData?.billingAddress?.zip_code : billingAddress?.zip_code,
        state: userData?.billingAddress?.state ? userData?.billingAddress?.state : billingAddress?.state,
        country_iso: userData?.billingAddress?.country_iso ? userData?.billingAddress?.country_iso : billingAddress?.country_iso,
        // recaptcha: null,
        // recaptcha_version: null
    });



    const [toastMessage, setToastMessage] = useState();
    const [error, setError] = useState({})
    const [phoneError, setPhoneError] = useState(false)
    const [process, setProcess] = useState(false)

    const [toastStatus, setToastStatus] = useState([])

    const submitUpdatedData = async (e) => {
        e.preventDefault()

        if (!isValidPhone) {

            if (update) {
                setProcess(true)
                try {
                    const response = await axios.post(route("register.update"), {
                        _method: 'PUT',
                        first_name: data?.first_name,
                        last_name: data?.last_name,
                        invite_code: data?.invite_code,
                        phone_number: data?.phone_number,
                        street_address: data?.street_address,
                        city: data?.city,
                        zip_code: data?.zip_code,
                        state: data?.state,
                        email: data?.email,
                        country_iso: data?.country_iso,
                    });

                    setUserData(response?.data?.payload)

                    // console.log("Data posted successfully:", response.data);
                    // setToastStatus(['success',response.data?.metadata?.message])
                    // setToastMessage(response.data?.metadata?.message)
                    ReactToast('success', response.data?.metadata?.message)
                    setUpdateBillingPage('payment')
                    setProcess(false)
                    // setPostData("");
                } catch (error) {
                    console.error("Error while posting data:", error);
                    ReactToast('error', error.response.data?.metadata?.message)

                    if (error?.response?.status === 401) {
                        window.location.href = '/checkout';
                    }
                    setProcess(false)
                    setError(error?.response?.data?.errors)
                }
            } else {

                post(route("register.store"), {
                    replace: true,
                    // onFinish: () => setRecaptchaState(previous => previous + 1)
                });
            }
        } else {
            setPhoneError(true)
        }



    };


    if (!update) {

        const dataJSON = JSON.stringify(data);
        // Store the JSON string in localStorage
        localStorage.setItem("user", dataJSON);
    }




    // const handleSubmit = (event) => {

    //     event.preventDefault();

    //     put(route("register.store"), {
    //         replace: true,
    //         // onFinish: () => setRecaptchaState(previous => previous + 1)
    //     });
    // };

    useEffect(() => {
        if (errors?.recaptcha) {
            // console.log('siteKey', recaptchaKey);
            ReactToast('error', errors?.recaptcha);
            clearErrors('recaptcha');
        }
    }, [errors?.recaptcha])







    const [isValidPhone, setIsValidPhone] = useState(false)

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
        clearErrors('phone_number');
        if (phoneInput) {
            const phoneNumber = phoneInput.value;
            //   console.log(phoneNumber)
            const intlTelInputInstance = window.intlTelInputGlobals.getInstance(phoneInput);


            if (intlTelInputInstance.isValidNumber()) {
                setIsValidPhone(false);
                // setDisableButton(false);

                // Get the formatted phone number with the country code
                const formattedPhoneNumber = intlTelInputInstance.getNumber();

                // console.log('Formatted phone number:', formattedPhoneNumber);
                setData('phone_number', formattedPhoneNumber);
            } else {
                // console.log('correct phone')
                // setDisableButton(true);
                setIsValidPhone(true);
                // console.log('Invalid phone number:', phoneNumber);
            }
        }
    };

    const handleContextMenu = (e) => {
        e.preventDefault();
    };

    return (
        <>

            {toastMessage && <ReactToast message={toastMessage} status={'success'} />}



            <div onContextMenu={handleContextMenu} >
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                >

                    {/* Personal Information */}
                    <div   >
                        {/* email  */}
                        <div className=" card-bg border-rounded-15 px-2 p-card-checkout mb-7vw">

                            <p className="register-input-heading-2"> {update ? 'UPDATE' : 'ENTER'} YOUR EMAIL</p>
                            <div>
                                <div className="col-span-12">
                                    <div className="relative">
                                        <input
                                            type="email"
                                            name="email"
                                            value={data.email}
                                            defaultValue={data?.email}
                                            onChange={(e) => {
                                                clearErrors('email');
                                                setData("email", e.target.value)
                                            }}
                                            className=" input-text w-full  text-center  "
                                            placeholder="Email "
                                        />
                                    </div>
                                    {error?.email && (
                                        <p className="font-12 fw-regular mt-[3px] ml-5 text-center danger-color ">
                                            {error?.email}{" "}
                                        </p>
                                    )}
                                    {errors?.email && (
                                        <p className="font-12 fw-regular mt-[3px] ml-5 text-center danger-color ">
                                            {errors?.email}{" "}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>


                        <form onSubmit={submitUpdatedData}>
                            <div className="col-span-12  card-bg border-rounded-15 px-2 p-card-billing">
                                <p className="register-input-heading-2">{update ? 'UPDATE' : 'ENTER'} YOUR BILLING ADDRESS</p>
                                <div className="grid grid-cols-12">

                                    <div className="col-span-6 lg:col-span-6 mr-[0.7vw] md:mr-[3.95px]">
                                        <div className="relative">
                                            <input
                                                type="text"
                                                name="first_name"
                                                value={data?.first_name}
                                                onChange={(e) => { clearErrors('first_name'); setData("first_name", e.target.value) }}
                                                className="input-text  w-full text-center"
                                                placeholder="First Name "
                                            />

                                        </div>
                                        {error?.first_name && (
                                            <p className="font-12 fw-regular text-center danger-color ">
                                                {error?.first_name}{" "}
                                            </p>
                                        )}
                                        {errors?.first_name && (
                                            <p className="font-12 fw-regular   text-center danger-color ">
                                                {errors?.first_name}{" "}
                                            </p>
                                        )}
                                    </div>

                                    <div className="col-span-6 lg:col-span-6 ml-[0.7vw] md:ml-[3.95px]">
                                        <div className="relative">
                                            <input
                                                type="text"
                                                name="last_name"
                                                value={data.last_name}
                                                onChange={(e) => { clearErrors('last_name'); setData("last_name", e.target.value) }}
                                                className=" input-text w-full text-center  "
                                                placeholder="Last Name "
                                            />

                                        </div>
                                        {error?.last_name && (
                                            <p className="font-12 fw-regular   text-center danger-color ">
                                                {error?.last_name}{" "}
                                            </p>
                                        )}
                                        {errors?.last_name && (
                                            <p className="font-12 fw-regular   text-center danger-color ">
                                                {errors?.last_name}{" "}
                                            </p>
                                        )}
                                    </div>

                                    <div className="col-span-12 hidden">
                                        <div className="relative">
                                            <input
                                                type="text"
                                                name="invite_code"
                                                value={data.invite_code}
                                                onChange={(e) => { clearErrors('invite_code'); setData("invite_code", e.target.value) }}
                                                className=" input-text w-full text-center  "
                                                placeholder="Invitation code"
                                            />

                                        </div>
                                        {error?.invite_code && (
                                            <p className="font-12 fw-regular   text-center danger-color ">
                                                {error?.invite_code}{" "}
                                            </p>
                                        )}
                                        {errors?.invite_code && (
                                            <p className="font-12 fw-regular   text-center danger-color ">
                                                {errors?.invite_code}{" "}
                                            </p>
                                        )}
                                    </div>

                                    <div className="col-span-12">
                                        <div className="relative">


                                            <input
                                                ref={phoneInputRef}
                                                className={'phone-input'}
                                                // className={'input-text w-full'}
                                                type="tel"
                                                id="phone"
                                                defaultValue={userData?.billingAddress?.phone_number ? userData?.billingAddress?.phone_number : user?.phone_number}
                                                onChange={handlePhoneInputChange}
                                            />

                                        </div>
                                        {phoneError && (
                                            <p className="font-12 fw-regular  text-center danger-color ">
                                                Invalid Cell Phone
                                            </p>
                                        )}
                                        {error?.phone_number && (
                                            <p className="font-12 fw-regular  text-center danger-color ">
                                                {error?.phone_number}{" "}
                                            </p>
                                        )}
                                        {errors?.phone_number && (
                                            <p className="font-12 fw-regular text-center danger-color ">
                                                {errors?.phone_number}{" "}
                                            </p>
                                        )}
                                    </div>

                                    <div className="col-span-12">
                                        <div className="relative">
                                            <input
                                                type="text"
                                                name="street"
                                                value={data.street_address}
                                                onChange={(e) => {
                                                    clearErrors('street_address'); setData(
                                                        "street_address",
                                                        e.target.value
                                                    )
                                                }
                                                }
                                                className=" input-text w-full  text-center  "
                                                placeholder="Street Address "
                                            />

                                        </div>
                                        {error?.street_address && (
                                            <p className="font-12 fw-regular   text-center danger-color ">
                                                {error?.street_address}{" "}
                                            </p>
                                        )}
                                        {errors?.street_address && (
                                            <p className="font-12 fw-regular   text-center danger-color ">
                                                {errors?.street_address}{" "}
                                            </p>
                                        )}
                                    </div>

                                    <div className="col-span-6 lg:col-span-6 mr-[0.7vw] md:mr-[3.95px]">
                                        <div className="relative">
                                            <input
                                                type="text"
                                                className=" input-text  w-full "
                                                placeholder="City "
                                                name="city"
                                                value={data.city}
                                                onChange={(e) => {
                                                    clearErrors('city'); setData(
                                                        "city",
                                                        e.target.value
                                                    )
                                                }
                                                }
                                            />

                                        </div>
                                        {error?.city && (
                                            <p className="font-12 fw-regular text-center danger-color ">
                                                {error?.city}
                                            </p>
                                        )}
                                        {errors?.city && (
                                            <p className="font-12 fw-regular text-center danger-color ">
                                                {errors?.city}
                                            </p>
                                        )}
                                    </div>

                                    <div className="col-span-6 lg:col-span-6 ml-[0.7vw] md:ml-[3.95px]">
                                        <div className="relative">
                                            <input
                                                type="text"
                                                className=" input-text  w-full "
                                                placeholder="Zip Code "
                                                name="zip"
                                                value={data.zip_code}
                                                onChange={(e) => {
                                                    clearErrors('zip_code'); setData(
                                                        "zip_code",
                                                        e.target.value
                                                    )
                                                }
                                                }
                                            />

                                        </div>
                                        {error?.zip_code && (
                                            <p className="font-12 fw-regular text-center danger-color ">
                                                {error?.zip_code}{" "}
                                            </p>
                                        )}
                                        {errors?.zip_code && (
                                            <p className="font-12 fw-regular text-center danger-color ">
                                                {errors?.zip_code}{" "}
                                            </p>
                                        )}
                                    </div>

                                    <div className="col-span-6  lg:col-span-6 mr-[0.7vw] md:mr-[3.95px]">

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
                                                <div className="absolute country-dropdown right-5 w-fit mt-1 md:mt-0 ">

                                                    <svg className="h-1.5 w-1.5 md:h-2.5 md:w-2.5  " viewBox="0 0 5 3" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M0.371094 0.14209L2.68158 2.25358L4.99206 0.14209H0.371094Z" fill="#909090" />
                                                    </svg>
                                                </div>
                                                <select
                                                    name="selectedOption"
                                                    value={data?.country_iso || ''}
                                                    onChange={(e) => { clearErrors('country_iso'); setData("country_iso", e.target.value) }}
                                                    className="appearance-none w-full text-center text-gray-50 border-rounded-8 border-0  text-10  font-normal bg-[#1A1A1A] outline-none register-country-height px-6   focus:shadow-none focus:ring-transparent focus:border focus:border-[#0000001a]"
                                                    id="frm-whatever">
                                                    <option value="" disabled className="text-center">
                                                        Country
                                                    </option>
                                                    {countries.map(
                                                        (item, index) => (
                                                            <React.Fragment key={index + 3}>
                                                                <option
                                                                    className="hover:bg-white"
                                                                    value={item?.iso}
                                                                >
                                                                    {item?.name}
                                                                </option>
                                                            </React.Fragment>
                                                        )
                                                    )}
                                                </select>
                                                <div
                                                    className="pointer-events-none absolute right-0 top-0 bottom-0 flex items-center text-base text-[#FFFFFF] font-normal bg-transparent outline-none">

                                                </div>
                                            </div>
                                        </fieldset>
                                        {error?.country_iso && (
                                            <p className="fs-tiny fw-regular text-center danger-color ">
                                                {error?.country_iso}
                                            </p>
                                        )}
                                        {errors?.country_iso && (
                                            <p className="fs-tiny fw-regular text-center danger-color ">
                                                {errors?.country_iso}
                                            </p>
                                        )}
                                    </div>

                                    <div className="col-span-6 lg:col-span-6  ml-[0.7vw] md:ml-[3.95px]">
                                        <input
                                            type="text"
                                            name="state"
                                            value={data.state}
                                            onChange={(e) => {
                                                clearErrors('state'); setData(
                                                    "state",
                                                    e.target.value
                                                )
                                            }
                                            }
                                            className="input-text w-full   "
                                            placeholder="State "
                                        />
                                        {error?.state && (
                                            <p className="fs-tiny danger-color fw-regular  text-center">
                                                {error?.state}
                                            </p>
                                        )}
                                        {errors?.state && (
                                            <p className="fs-tiny danger-color fw-regular  text-center ">
                                                {errors?.state}
                                            </p>
                                        )}
                                    </div>

                                </div>

                            </div>
                            <div className="col-span-12 mt-[7.9px] md:mt-[1.4vw]">
                                <button type={"submit"}
                                    disabled={processing}
                                    className={` ${processing && 'disable'} button primary rounded-full w-full mx-auto register-button`}>
                                    <div className="button_container glitch uppercase">

                                        <div className="flex items-center gap-x-2">
                                            {processing &&
                                                // <div className="spinner-5 -mt-[3px] md:-mt-[5px]"></div>

                                                <div class="loader" id="loader-6">
                                                    <span></span>
                                                    <span></span>
                                                    <span></span>
                                                    <span></span>
                                                </div>
                                            }
                                            <span className="-mt-[2px]"> {processing ? 'Please Wait' : 'Continue'} </span>
                                        </div>



                                    </div>
                                </button>


                                {/* <small className="opacity-20 pt-1">
                                This site is protected by reCAPTCHA Enterprise and the Google
                                <a href="https://policies.google.com/privacy">Privacy Policy</a> and
                                <a href="https://policies.google.com/terms">Terms of Service</a> apply.
                            </small> */}
                                {/* <Recaptcha
                                className={'mt-4'}
                                recaptchaKey={recaptchaKey}
                                recaptchaKeyV2={recaptchaKeyV2}
                                state={recaptchaState}
                                setData={setData}
                                recaptchaVersion={data?.recaptcha_version}
                                recaptchaError={errors?.recaptcha}
                            /> */}
                            </div>
                        </form>

                    </div>


                </motion.div>

            </div>
        </>
    );
};

;

export default UpdateRegister;
