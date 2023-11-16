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
import UpdateRegister from "./UpdateRegister";

const Register = ({ countries, price, timeDifferenceInSeconds, countryCode, recaptchaKey, invite_code }) => {
    useEffect(() => {
        AOS.init();
    }, [])

    // const recaptchaKeyV2 = '6LduHewnAAAAAGvkhf0M9ltlLzia1CGOxDCzyCeC'
    // const [recaptchaState, setRecaptchaState] = useState(0);



    const userJSON = localStorage.getItem("user");

    // Convert the JSON string back to an object
    const user = JSON.parse(userJSON);


    const { data, setData, post, processing, errors, clearErrors } = useForm({
        first_name: user?.first_name,
        last_name: user?.last_name,
        invite_code: invite_code,
        phone_number: user?.phone_number,
        street_address: user?.street_address,
        city: user?.city,
        zip_code: user?.zip_code,
        state: user?.state,
        email: user?.email,
        password: "",
        password_confirmation: "",
        country_iso: countryCode,
        // recaptcha: null,
        // recaptcha_version: null
    });





    useEffect(() => {
        if (errors?.recaptcha) {
            // console.log('siteKey', recaptchaKey);
            ReactToast('error', errors?.recaptcha);
            clearErrors('recaptcha');
        }
    }, [errors?.recaptcha])


    const [hours, setHours] = useState(48);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        const countdown = setInterval(() => {
            if (hours === 0 && minutes === 0 && seconds === 0) {
                clearInterval(countdown);
            } else {
                if (seconds > 0) {
                    setSeconds(seconds - 1);
                } else {
                    if (minutes > 0) {
                        setMinutes(minutes - 1);
                        setSeconds(59);
                    } else {
                        setHours(hours - 1);
                        setMinutes(59);
                        setSeconds(59);
                    }
                }
            }
        }, 1000);

        return () => {
            clearInterval(countdown);
        };
    }, [hours, minutes, seconds]);

    const handleKeyPress = (e) => {
        const keyCode = e.which || e.keyCode;
        const isValidKey =
            (keyCode >= 48 && keyCode <= 57) || keyCode === 8 || keyCode === 9;
        if (!isValidKey) {
            e.preventDefault();
        }
    };


    const [disableButton, setDisableButton] = useState(true)

    const [isValidPhone, setIsValidPhone] = useState(false)

    const phoneInputRef = useRef(null);
    let phoneInput;

    useEffect(() => {
        const fetchCountryCode = async () => {
            try {
                initializePhoneInput('pk');
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

        if (phoneInput) {
            const phoneNumber = phoneInput.value;
            //   console.log(phoneNumber)
            const intlTelInputInstance = window.intlTelInputGlobals.getInstance(phoneInput);


            if (intlTelInputInstance.isValidNumber()) {
                setIsValidPhone(false);
                setDisableButton(false);

                // Get the formatted phone number with the country code
                const formattedPhoneNumber = intlTelInputInstance.getNumber();



                // console.log('Formatted phone number:', formattedPhoneNumber);
                setData('phone_number', formattedPhoneNumber);
            } else {
                setDisableButton(true);
                setIsValidPhone(true);
                // console.log('Invalid phone number:', phoneNumber);
            }
        }
    };



    const handleContextMenu = (e) => {
        e.preventDefault(); 
      };



    return (
        <div onContextMenu={handleContextMenu} >
        <CheckoutLayout timeEnd={timeDifferenceInSeconds} price={price} >

            <UpdateRegister billingAddress={data} user={user} countries={countries} countryCode={countryCode}  update={false} invite_code={invite_code} />

        </CheckoutLayout>
        </div>
    );
};

;

export default Register;
