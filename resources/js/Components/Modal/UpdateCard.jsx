import React, { useState, useEffect } from "react";
import cross from "../../../assets/cross.png";
import copypage from "../../../assets/copypage.png";
import VimeoPlayer from '@vimeo/player';
import download from "../../../assets/download.png";
import Button from "../Button";
import { ReactComponent as Download } from "../../../assets/svg/Download.svg";
import { ReactComponent as DownloadWhite } from "../../../assets/svg/DownloadWhite.svg";
import axios from "axios";
import ReactToast from "../ReactToast";
import AcademyButton from "../AcademyButton";
import { AnimatePresence, motion } from "framer-motion"
import Xmark from "../Xmark";
import { useRef } from "react";
import { useForm } from "@inertiajs/react";
export default function UpdateCard({text}) {
    const [showModal, setShowModal] = useState(false);

    const [tenYears, setTenYears] = useState([]);
    useEffect(() => {
        const currentYear = new Date().getFullYear();
        setTenYears(Array.from({ length: 11 }, (_, index) => currentYear + index));
    }, []);

    const months = Array.from({ length: 12 }, (_, index) => String(index + 1).padStart(2, '0'));
    const currentMonth = String(new Date().getMonth() + 1).padStart(2, '0');

    const { data, setData, post, processing, errors, reset } = useForm({
        number: '',
        month: currentMonth,
        year: tenYears.length > 0 ? tenYears[0] : new Date().getFullYear(),
        cvv: '',
    });


    const handleCardAdd = (e) => {
        e.preventDefault();

        post(route('profile.payment.add-card'), {
            preserveScroll: true,
            onSuccess: () => {
                setShowModal(false);
                reset()
            },
        });
    }

    const [cardNumber, setCardNumber] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [cvv, setCvv] = useState('');
    const [error, setError] = useState({});

    const validateCardNumber = (number) => {
        const regex = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9]{2})[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9]) [0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;
        return regex.test(number);
    }

    const validateMonth = (month) => {
        return month >= 1 && month <= 12 && month.length === 2;
    }

    const isDateNotLessThanCurrent = (month, year) => {
        const currentDate = new Date();
        const givenDate = new Date(year, month - 1);

        return givenDate >= new Date(currentDate.getFullYear(), currentDate.getMonth());
    };

    const validateYear = (year) => {

        const currentYear = new Date().getFullYear();
        return year >= currentYear && year <= currentYear + 20 && year.length === 4;
    }

    const validateCVV = (cvv) => {
        const regex = /^[0-9]{3,4}$/;
        return regex.test(cvv);
    }

    const handleInputChange = (setter, value) => {
        setter(value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const newErrors = {};

        // Validate all fields and collect errors
        // if (!validateCardNumber(cardNumber)) {
        //     newErrors.cardNumber = 'Invalid card number';
        // }


        // if (!isDateNotLessThanCurrent(data?.month, data?.year)) {
        //     newErrors.month = 'The given date is in the past.';
        // }

        // if (!validateCVV(cvv)) {
        //     newErrors.cvv = 'Invalid CVV';
        // }

        if (Object.keys(newErrors).length === 0) {
            // Submit form if no errors
            handleCardAdd(event)
            setError({});
            // console.log("Form is valid, submit it here.");
        } else {
            // Update error state to display messages
            setError(newErrors);
        }
    };





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
    return (
        <>
            <div className="w-full max-w-[390px] mx-auto">
                <button onClick={() => setShowModal(true)} className=" profile-buttons  bg-[#fff] text-black button primary ">
                    <div className="button_container glitch uppercase">
                        {text ?? 'Update'}
                    </div>
                </button>
            </div>

            <AnimatePresence>
                {showModal && (
                    <>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >

                            <div
                                id="defaultModal"
                                tabIndex="-1"
                                aria-hidden="true"
                                className={` ${showModal
                                    ? " transition-all duration-300 ease-out"
                                    : "-translate-y-[1000rem] transition-all duration-300 ease-out"
                                    } justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[99999] h-[calc(100%)] max-h-full`}>
                                <div className="relative   my-6 mx-auto  w-[95%] max-w-[550px] ">
                                    {/*content*/}
                                    <div className="  border-rounded-10  shadow-lg md:px-[13px] relative flex flex-col w-full bg-black z-[99999] outline-none focus:outline-none  my-[4rem]">
                                        {/*header*/}
                                        <div>
                                            <div className="flex items-center  justify-between px-1 pt-4 w-full ">
                                                <p className="fw-bold font-size-16">    </p>
                                                <div onClick={() => setShowModal(false)}>
                                                    <Xmark />
                                                </div>

                                            </div>
                                        </div>
                                        {/*body*/}
                                        <div className="relative p-3   flex-auto">

                                            <div className="  mx-auto paddingSectionXSmall    ">


                                                <form
                                                    onSubmit={handleSubmit}
                                                    //  onSubmit={handleCardAdd}
                                                    className="flex-col justify-center mt-0 text-black">
                                                    <div className={'w-full'}>
                                                        <label className={'text-white fw-semibold text-[12px]'} htmlFor="card_number"> NUMBER</label>
                                                        <input
                                                            type="text"
                                                            value={cardNumber}
                                                            onChange={(e) => { handleInputChange(setCardNumber, e.target.value); setData('number', e.target.value) }}
                                                            id={'card_number'}
                                                            className={'w-full input-text'}
                                                            placeholder="Number" />
                                                        {error.cardNumber && <div className="fs-tiny danger-color">{error.cardNumber}</div>}
                                                    </div>

                                                    <div className={'flex gap-3 mt-3'}>
                                                        <div className="w-full">
                                                            <label className="text-white fw-semibold text-[12px]" htmlFor="card_year">EXPIRY</label>
                                                            <select
                                                                className="w-full input-text"
                                                                value={data?.month}
                                                                onChange={(e) => {
                                                                    setData('month', e.target.value)
                                                                }}
                                                                id="card_year"
                                                            >
                                                                <option disabled>Month</option>
                                                                {months.map((month) => (
                                                                    <option key={month} value={month}>{month}</option>
                                                                ))}
                                                            </select>
                                                            {error.month && <div className="fs-tiny danger-color">{error.month}</div>}
                                                        </div>

                                                        <div className="w-full">
                                                            <label className="text-white fw-semibold text-[12px] invisible" htmlFor="card_year">YEAR</label>
                                                            <select
                                                                className="w-full input-text"
                                                                value={data?.year}
                                                                onChange={(e) => {
                                                                    setData('year', e.target.value)
                                                                }}
                                                                id="card_year"
                                                            >
                                                                <option disabled>Year</option>
                                                                {tenYears.map((yearOption) => (
                                                                    <option key={yearOption} value={yearOption}>{yearOption}</option>
                                                                ))}
                                                            </select>
                                                            {error.year && <div className="fs-tiny danger-color">{error.year}</div>}
                                                        </div>

                                                        <div className={'w-full'}>
                                                            <label className={'text-white fw-semibold text-[12px]'} htmlFor="card_cvv">CVV</label>
                                                            <input type="text"
                                                                className="w-full input-text"
                                                                value={cvv}
                                                                onChange={(e) => { handleInputChange(setCvv, e.target.value); setData('cvv', e.target.value) }}
                                                                id={'card_cvv'} placeholder="CVV" />
                                                            {error.cvv && <div className="fs-tiny danger-color">{error.cvv}</div>}

                                                        </div>
                                                    </div>



                                                    <button type={'submit'} disabled={processing} className=" profile-buttons  bg-[#fff] text-black button primary ">
                                                        <div className="button_container glitch uppercase">
                                                            {processing ? 'processing...' : text ?? 'update card'}
                                                        </div>
                                                    </button>
                                                </form>

                                            </div>
                                        </div>
                                        <div className="md:flex items-center justify-center p-3   ">

                                        </div>
                                    </div>
                                </div>

                                <AnimatePresence>
                                    {showModal &&
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                            className="backdrop-blur-[2px] bg-black/10  fixed inset-0  "
                                        >
                                            <div className="  fixed inset-0   z-[999]  "></div>
                                        </motion.div>
                                    }
                                </AnimatePresence>

                            </div>

                        </motion.div>


                    </>
                )}
            </AnimatePresence>
        </>
    );
}
