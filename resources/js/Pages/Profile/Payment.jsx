import React, { useState } from "react";
import dots from "../../../assets/VDots.png";
import PaymentModal from "../../Components/Modal/PaymentModal";
import Button from "../../Components/Button";
import { ReactComponent as Plus } from "../../../assets/svg/Plus.svg";
import ProfileLayout from "@/Layouts/ProfileLayout";
import SessionLayout from "@/Layouts/SessionLayout";
import axios from 'axios';
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import UpdateCard from "@/Components/Modal/UpdateCard";

const Payment = ({ orders, cards, order, card }) => {


    const user = usePage().props.auth.user;

    const {
        data: renewData,
        setData: setRenewData,
        post: renewPost,
        processing: renewProcessing,
        errors: renewErrors
    } = useForm({});

    const handleSubmitRenew = (e) => {
        e.preventDefault();
        renewPost(route('checkout-champ.renew-order'));
    };
    // window.Chargebee.init({
    //     site: chargeBeeSite,
    //     embed: true,
    //     enableGTMTracking: true,
    //     domain: 'https://billing.capital.club',
    //     publishableKey: chargeBeePublicKey
    // });
    // const createPortalSession = async () => {
    //     let cbInstance = await window.Chargebee.getInstance();
    //
    //     await cbInstance.setPortalSession(async function () {
    //         return await axios.post(route('profile.payment.create-portal-session'))
    //             .then((response) => {
    //                 return response.data
    //             });
    //     });
    //
    //     let cbPortal = cbInstance.createChargebeePortal();
    //     cbPortal.open({
    //         close() {
    //             //close callbacks
    //         }
    //     });
    // }

    // const openChargebeePortal = (url) => {
    //     // Open the Chargebee portal in a new window
    //     const popup = window.open(url, '_blank', 'width=1000,height=600');
    //     if (!popup || popup.closed || typeof popup.closed === 'undefined') {
    //         // Popup blocked, handle it gracefully (e.g., show a message to the user)
    //         alert('Popup blocked. Please enable popups and try again.');
    //     }
    // };

    const { data, setData, post, processing, errors } = useForm({
        number: '',
        month: '',
        year: '',
        cvv: '',
    })

    const handleCardAdd = (e) => {
        e.preventDefault();
        post(route('profile.payment.add-card'));
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

    const validateYear = (year) => {
        const currentYear = new Date().getFullYear();
        return year >= currentYear && year <= currentYear + 20 && year.length === 4;
    }

    const validateCVV = (cvc) => {
        const regex = /^[0-9]{3,4}$/;
        return regex.test(cvv);
    }

    const handleInputChange = (setter, value) => {
        setter(value); // Set the state to the input value directly
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const newErrors = {};

        // Validate all fields and collect errors
        if (!validateCardNumber(cardNumber)) {
            newErrors.cardNumber = 'Invalid card number';
        }
        if (!validateMonth(month)) {
            newErrors.month = 'Invalid month';
        }
        if (!validateYear(year)) {
            newErrors.year = 'Invalid year';
        }
        if (!validateCVV(cvv)) {
            newErrors.cvv = 'Invalid CVV';
        }

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



    return (
        <div>
            <Head>
                <title>Settings</title>
            </Head>
            <div>
                <div data-aos="fade-in" data-aos-delay="100" data-aos-easing="ease" data-aos-duration="300"
                    className=" page-paddeing containerMedium">
                    {/* <div className="grid grid-cols-12 gap-4 px-5 lg:px-0">
                        <div className="col-span-0 md:col-span-2 hidden md:block"></div>
                        <div className="col-span-12 md:col-span-10">
                            <div className="col-span-10 md:col-span-10">
                                <div className="flex justify-center md:justify-start  ">
                                    <h3 className="    ">Payment Method</h3>
                                </div>
                            </div>
                        </div>
                    </div> */}


                    {/*table*/}

                    {/* <div className="card-bg dp-card-paddeing border-rounded-15 px-2 mx-[1rem] ">
                        <div className="text-center">
                            <p className="personal-info-text uppercase">
                                {" "}
                                Cards
                            </p>
                        </div>

                        <div className="grid grid-cols-12 gap-4 lg:mt-[28px] mt-6   px-2  lg:px-0">
                            <div className="col-span-12  ">
                                <div className="grid grid-cols-12 gap-4">
                                    <div className="col-span-12 ">
                                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                                            <table className="w-full text-sm text-left text-gray-500 ">
                                                <thead className="regular normal text-white     ">
                                                    <tr>
                                                        <th
                                                            scope="col"
                                                            className="  text-center py-3 text-[10px] md:text-[0.75rem] fw-medium"
                                                        >
                                                            PRIMARY
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="  py-3 text-[10px] md:text-[0.75rem] text-center  fw-medium"
                                                        >
                                                            TYPE
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="  py-3 text-[10px] md:text-[0.75rem] text-center  fw-medium"
                                                        >
                                                            YEAR
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="  py-3 text-[10px] md:text-[0.75rem] text-center  fw-medium"
                                                        >
                                                            MONTH
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="  py-3 text-[10px] md:text-[0.75rem] text-center  fw-medium"
                                                        >
                                                            EXPIRY
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="  py-3 text-[10px] md:text-[0.75rem] text-center  fw-medium"
                                                        >
                                                            NUMBER
                                                        </th>
                                                    </tr>

                                                </thead>
                                                <tbody>
                                                    {cards?.map((data, index) => (
                                                        <tr className="  bg-[#141414] overflow-hidden">
                                                            <th
                                                                scope="row"
                                                                className="px-1 py-2 rounded-l-full text-center  text-[#797979] text-[10px] md:text-[11px] fw-medium  "
                                                            >
                                                                {data?.is_primary ? 'YES' : 'NO'}
                                                            </th>
                                                            <td className="px-2 py-2 text-center text-[#797979] text-[10px] md:text-[11px] fw-medium  ">
                                                                {data?.type}
                                                            </td>
                                                            <td className="px-2 py-2 text-center text-[#797979] text-[10px] md:text-[11px] fw-medium  ">
                                                                {data?.year}
                                                            </td>
                                                            <td className="px-2 py-2 text-center text-[#797979] text-[10px] md:text-[11px] fw-medium  ">
                                                                {data?.month}
                                                            </td>
                                                            <td className="px-2 py-2 text-center text-[#797979] text-[10px] md:text-[11px] fw-medium  ">
                                                                ${data?.expiry_date}
                                                            </td>
                                                            <td className="px-2 py-2 text-center text-[#797979] text-[10px] md:text-[11px] fw-medium  ">
                                                                {data?.last_4}
                                                            </td>
                                                        </tr>))}

                                                </tbody>

                                            </table>
                                            {orders?.length < 1 &&
                                                <div className="flex justify-center pt-5 opacity-50">No Data</div>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}





                    <div className="card-bg dp-card-paddeing border-rounded-15 px-2 mx-[1rem] ">
                        <div className="text-center">
                            {
                                order?.active === false &&
                                <p className="px-2 py-3 text-[14px] md:text-[16px] leading-[18px] bg-[#FF555566] border-[1px] border-[#FF5555FF] bg-opacity-50 mx-3 mb-4  rounded-[10px]">
                                    Subscription has ended please renew below
                                </p>
                            }
                            {
                                (order?.active === true && order.status === 'CANCELLED') &&
                                <p className="px-2 py-3 bg-[#FF555566] border-[1px] border-[#FF5555FF] bg-opacity-50 mx-3 mb-4  rounded-[10px]">
                                    Your Subscription will be canceled on {order.end_at}
                                </p>
                            }
                            <p className="personal-info-text uppercase">
                                Subscription Status
                            </p>
                        </div>

                        {user.checkout_champ_id ?

                            <div className="lg:mt-[28px] mt-6 px-2 lg:px-0">

                                <div className="relative w-full overflow-x-auto shadow-md sm:rounded-lg">
                                    <table className="w-[90%] md:w-[70%] mx-auto text-sm   text-gray-500">
                                        <tbody>
                                        <tr>

                                            <td className="px-2 py-2 text-left text-[#fff] text-[12px] fw-medium uppercase">
                                                Start date
                                            </td>
                                            <td className="px-2 py-2 text-end text-[#797979] text-[10px] md:text-[11px] fw-medium  ">
                                                {order?.start_at ? order?.start_at : '_ _'}
                                            </td>
                                        </tr>

                                        <tr>

                                            <td className="px-2 py-2 text-left text-[#fff] text-[12px] fw-semibold uppercase">
                                                plan
                                            </td>
                                            <td className="px-2 py-2 text-end text-[#797979] text-[10px] md:text-[11px] fw-medium  ">
                                                {order?.product?.name ? order?.product?.name : '_ _'}
                                            </td>
                                        </tr>

                                        <tr>

                                            <td className="px-2 py-2 text-left text-[#fff] text-[12px] fw-semibold  uppercase">
                                                Renewal Date
                                            </td>
                                            <td className="px-2 py-2 text-end text-[#797979] text-[10px] md:text-[11px] fw-medium  ">
                                                {order?.end_at ? order?.end_at : '_ _'}
                                            </td>
                                        </tr>

                                        </tbody>

                                    </table>
                                    {order.last_success_retry &&
                                        <p className={'px-2 py-4 bg-opacity-50 mx-3 mb-4  rounded-[10px]  w-full text-center  max-w-[390px] mx-auto'}>Your payment is in process please check your email and refresh this page in few minutes</p>
                                    }
                                    <div className="flex justify-center w-full">

                                        <div className="w-full max-w-[390px] mx-auto">
                                            {order ? (
                                                order.active === false && !order.last_success_retry &&
                                                        <button
                                                            onClick={handleSubmitRenew}
                                                            disabled={renewProcessing}
                                                            className="profile-buttons bg-[#fff] text-black button primary"
                                                        >
                                                            <div className="button_container glitch uppercase">
                                                                RENEW SUBSCRIPTION
                                                            </div>
                                                        </button>
                                            ) : (


                                                <button
                                                    className="profile-buttons bg-[#ccc] text-black button primary disable"
                                                    disabled>
                                                    <div className="button_container glitch uppercase disable">
                                                        NO SUBSCRIPTION
                                                    </div>
                                                </button>

                                            )}
                                        </div>
                                    </div>
                                </div>

                            </div>
                            :
                            <div className="d-flex justify-content-center lg:mt-[28px] mt-6 px-2 lg:px-4">
                                <p className={'text-center'}>
                                    <span className={'mr-1'}>To cancel your membership please email us at <u><b><a
                                        href="mailto:hello@capital.club">hello@capital.club</a></b></u> so we can manually process your cancellation. Thank you.</span>

                                </p>
                            </div>
                        }
                    </div>


                    {/* <div className="card-bg border-rounded-15 px-2 lg:px-4 dp-card-paddeing mt-[0.75rem] mx-[1rem] ">
                        <div className="text-center">
                            <p className="personal-info-text ">
                                {" "}
                                YOUR BILLING
                            </p>
                        </div>

                        <div className="  flex justify-center mt-0">
                                            <Link href={route('checkout-champ.cancel-order')} method={'POST'} as={'button'}>
                                <button className=" profile-buttons  bg-[#fff] text-black button primary ">
                                    <div className="button_container glitch uppercase">
                                        CANCEL SUBSCRIPTION
                                    </div>
                                </button>
                            </Link>
                       </div>
                    </div> */}

                    {user.checkout_champ_id &&
                        <div
                            className="card-bg border-rounded-15 px-2 lg:px-4 dp-card-paddeing mt-[0.75rem] mx-[1rem] ">
                            <div className="text-center">
                                <p className="personal-info-text ">
                                    PAYMENT METHOD
                                </p>
                            </div>

                            {card && <table className="w-[90%] md:w-[70%] mx-auto text-sm   text-gray-500">
                                <tbody>
                                <tr>
                                    <td className="px-2 py-2 text-left text-[#fff] text-[12px] fw-semibold  ">
                                        EXPIRY
                                    </td>
                                    <td className="px-2 py-2 text-end text-[#797979] text-[10px] md:text-[11px] fw-medium  ">
                                        {card?.expiry ? card?.expiry : '_ _'}
                                    </td>
                                </tr>


                                <tr>
                                    <td className="px-2 py-2 text-left text-[#fff] text-[12px] fw-semibold  ">
                                        NUMBER
                                    </td>
                                    <td className="px-2 py-2 text-end text-[#797979] text-[10px] md:text-[11px] fw-medium  ">
                                        {card?.last_4 ? card?.last_4 : '_ _'}
                                    </td>
                                </tr>

                                </tbody>

                            </table>}
                            <UpdateCard text={card ? "Update" : "Add Card"}/>
                        </div>
                    }
                    {/* Billing history card  */}
                    <div className="card-bg dp-card-paddeing border-rounded-15 px-2 mx-[1rem] mt-[0.75rem]">
                        <div className="text-center">
                            <p className="personal-info-text uppercase">
                                {" "}
                                Billing History
                            </p>
                        </div>

                        <div className="grid grid-cols-12 gap-4 lg:mt-[28px] mt-6   px-2  lg:px-0">

                            <div className="col-span-12  ">
                                <div className="grid grid-cols-12 gap-4">
                                    <div className="col-span-12 ">
                                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                                            <table className="w-full text-sm text-left text-gray-500 ">
                                                <thead className="regular normal text-white     ">
                                                <tr>
                                                        <th
                                                            scope="col"
                                                            className="  text-center py-3 text-[10px] md:text-[0.75rem] fw-medium uppercase"
                                                        >
                                                            Payment Date
                                                        </th>
                                                        {/* <th
                                                            scope="col"
                                                            className="  py-3 text-[10px] md:text-[0.75rem] text-center  fw-medium"
                                                        >
                                                            END AT
                                                        </th> */}
                                                        <th
                                                            scope="col"
                                                            className="  py-3 text-[10px] md:text-[0.75rem] text-center  fw-medium"
                                                        >
                                                            PLAN
                                                        </th>
                                                        {/* <th
                                                            scope="col"
                                                            className="  py-3 text-[10px] md:text-[0.75rem] text-center  fw-medium"
                                                        >
                                                            CARD
                                                        </th> */}
                                                        <th
                                                            scope="col"
                                                            className="  py-3 text-[10px] md:text-[0.75rem] text-center  fw-medium"
                                                        >
                                                            AMOUNT
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="  py-3 text-[10px] md:text-[0.75rem] text-center  fw-medium uppercase"
                                                        >
                                                            Invoice
                                                        </th>
                                                    </tr>

                                                </thead>
                                                <tbody>
                                                    {orders?.map((data, index) => (
                                                        <tr className="  bg-[#141414] overflow-hidden">
                                                            <th
                                                                scope="row"
                                                                className="px-1 py-2 rounded-l-full text-center  text-[#797979] text-[10px] md:text-[11px] fw-medium  "
                                                            >
                                                                {data?.start_at}
                                                            </th>
                                                            {/* <td className="px-2 py-2 text-center text-[#797979] text-[10px] md:text-[11px] fw-medium  ">
                                                                {data?.end_at}
                                                            </td> */}
                                                            <td className="px-2 py-2 text-center text-[#797979] text-[10px] md:text-[11px] fw-medium  ">
                                                                {data?.product?.name}
                                                            </td>
                                                            {/* <td className="px-2 py-2 text-center text-[#797979] text-[10px] md:text-[11px] fw-medium  ">
                                                                {data?.card?.last_4}
                                                            </td> */}
                                                            <td className="px-2 py-2 text-center text-[#797979] text-[10px] md:text-[11px] fw-medium  ">
                                                                ${data?.amount}
                                                            </td>
                                                            <td className="px-2 py-2 text-center text-[#797979] text-[10px] md:text-[11px] fw-medium  ">
                                                                {data?.status}
                                                            </td>
                                                        </tr>))}

                                                </tbody>

                                            </table>
                                            {orders?.length < 1 &&
                                                <div className="flex justify-center pt-5 opacity-50">No Data</div>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>



                </div>
            </div>
        </div>
    );
};

Payment.layout = (page) => (
    <SessionLayout>
        <ProfileLayout children={page} pageTitle={""} />
    </SessionLayout>
);

export default Payment;
