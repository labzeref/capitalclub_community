import {Link, useForm} from '@inertiajs/react';
import React, {useEffect, useRef, useState} from 'react'
import logo from "../../../assets/svg/logo.svg";
import Fingerprint from "../../../assets/svg/Fingerprint.svg";
import {CardComponent, CardCVV, CardExpiry, CardNumber} from "@chargebee/chargebee-js-react-wrapper";
import Toast from "@/Components/Toast/Toast.jsx";
import ReactToast from "@/Components/ReactToast.jsx";

const Subscription = ({chargeBeeSite, chargeBeePublicKey}) => {
    window.Chargebee.init({
        site: chargeBeeSite,
        embed: false,
        publishableKey: chargeBeePublicKey
    })
    const CardRef = useRef(null);

    const {data, setData, post, processing, errors} = useForm({
        token: "",
    });

const [isDisable , setIsDisable] = useState(true)

    const [isPosted, setIsPosted] = useState(false);

    useEffect(() => {
        if (isPosted) {
            // Call the API endpoint
            post(route('subscription.store'));
            setIsPosted(false)
        }
    }, [isPosted]);

    const submit = () => {
        if (CardRef.current) {
            CardRef.current.tokenize().then(async response => {
                await setData('token', response.token);
                setIsPosted(true);
            }).catch(error => {
                ReactToast('error', 'Invalid card information please check with your bank.')
            });
        }
    };


    return (
        <div>
            <Toast/>
            <div className="static z-[99999999] flex justify-between col-span-12 p-6   ">
                <Link href={route('welcome')}>
                    <img className="h-7  lg:h-10 object-cover md:ml-10" src={logo} alt=""/>
                </Link>
                <Link href={route('logout')} method={'post'}
                      className=" static z-[99999999] flex items-center justify-end md:mr-10">
                    <img className="h-6 w-6 object-cover " src={Fingerprint} alt=""/>
                    <span className="text-base text-[#FFFFFF] font-normal uppercase ml-3">
                           Logout
                        </span>
                </Link>
            </div>
            <div className='w-full h-[90vh] flex justify-center items-center'>

                <div className="grid grid-cols-12 gap-y-7">
                    <div className="col-span-3 lg:col-span-3 mt-[1rem] mx-auto"></div>
                    <div className="col-span-6 lg:col-span-6 mt-[1rem] mx-auto">
                        <div className="grid grid-cols-12 ">
                            <div className="col-span-12 lg:col-span-12 mt-[1rem]">
                                <CardComponent
                                    style={{color: '#fff'}}
                                    ref={CardRef}
                                    styles={{
                                        base: {
                                            color: '#fff',
                                            fontWeight: 600,
                                            fontFamily: 'Quicksand, Open Sans, Segoe UI, sans-serif',
                                            fontSize: '16px',
                                            fontSmoothing: 'antialiased',

                                            ':focus': {
                                                color: 'white',
                                            },

                                            '::placeholder': {
                                                color: '#9BACC8',
                                            },

                                            ':focus::placeholder': {
                                                color: '#CFD7DF',
                                            },
                                        },
                                        invalid: {
                                            color: '#fff',
                                            ':focus': {
                                                color: '#FA755A',
                                            },
                                            '::placeholder': {
                                                color: '#FFCCA5',
                                            },
                                        }
                                    }}
                                    className="text-[#fff]"
                                >
                                    <CardNumber className="input-text text-[#fff]  w-full"/>
                                    <div className="flex">
                                        <CardExpiry className="input-text text-[#fff] my-[1rem] w-full"/>
                                        <CardCVV className="input-text text-[#fff] my-[1rem] ms-[1rem] w-full"/>
                                    </div>
                                </CardComponent>
                                <div className='col-span-12 lg:col-span-12 mt-[2rem] flex justify-center'>
                                    <div className='w-full'>

                                        <p className='fs-x-large fw-regular text-center'> $369/year </p>
                                        <p className='fs-regular fw-regular text-center text-[#fff] opacity-50 pt-2'> billed
                                            yearly </p>
                                    </div>
                                </div>
                                <div className="col-span-12 mt-[3rem]">
                                    <button className="button primary w-full" onClick={() => submit()}>
                                        <div className="button_container glitch uppercase">
                                            pay now $369
                                        </div>
                                    </button>
                                </div>
                            </div>

                            <div
                                className="col-span-6 lg:col-span-6 lg:ml-[1rem] mt-[1rem] flex items-center gap-2 mt-6">
                                <input
                                    id="default-checkbox"
                                    type="checkbox"
                                    className={`w-5 h-5 rounded-[2px] text-[#3d3d3d] bg-[#3d3d3d] border-[2px] border-[#999999] ring-transparent focus:outline-transparent focus:shadow-none focus:ring-transparent`}
                                />
                                <div className="flex items-center">
                                    <p className="fs-regular fw-regular text-[#949494]">
                                        I agree to the
                                    </p>
                                    <p className="fs-regular fw-regular underline underline-offset-4 px-1">
                                        Terms and Conditions
                                    </p>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-3 lg:col-span-3 mt-[1rem] mx-auto"></div>
                </div>
            </div>
        </div>
    )
}

export default Subscription
