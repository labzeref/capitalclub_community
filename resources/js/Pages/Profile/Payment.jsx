import React, {useState} from "react";
import dots from "../../../assets/VDots.png";
import PaymentModal from "../../Components/Modal/PaymentModal";
import Button from "../../Components/Button";
import {ReactComponent as Plus} from "../../../assets/svg/Plus.svg";
import ProfileLayout from "@/Layouts/ProfileLayout";
import SessionLayout from "@/Layouts/SessionLayout";
import AddNewCard from "@/Components/Modal/AddNewCard";
import axios from 'axios';

const Payment = ({invoices, chargeBeeSite, chargeBeePublicKey}) => {
    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);

    const paymentMethod = null;

    window.Chargebee.init({
        site: chargeBeeSite,
        embed: true,
        enableGTMTracking: true,
        publishableKey: chargeBeePublicKey
    });
    const createPortalSession = async () => {
        let cbInstance = await window.Chargebee.getInstance();

        await cbInstance.setPortalSession(async function(){
            return await axios.post(route('profile.payment.create-portal-session'))
                .then((response) => {
                    return response.data
                });
        });

        let cbPortal = cbInstance.createChargebeePortal();
        cbPortal.open({
            close() {
                //close callbacks
            }
        });
    }

    const openChargebeePortal = (url) => {
        // Open the Chargebee portal in a new window
        const popup = window.open(url, '_blank', 'width=1000,height=600');
        if (!popup || popup.closed || typeof popup.closed === 'undefined') {
            // Popup blocked, handle it gracefully (e.g., show a message to the user)
            alert('Popup blocked. Please enable popups and try again.');
        }
    };

    return (
        <div>
            <div>
                <div data-aos="fade-in" data-aos-delay="100" data-aos-easing="ease" data-aos-duration="300"
                     className=" paddingSectionMedium containerMedium">
                    <div className="grid grid-cols-12 gap-4 px-5 lg:px-0">
                        <div className="col-span-0 md:col-span-2 hidden md:block"></div>
                        <div className="col-span-12 md:col-span-10">
                            <div className="col-span-10 md:col-span-10">
                                <div className="flex justify-center md:justify-start  ">
                                    <h3 className="    ">Payment Method</h3>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-12 gap-4 mt-3 md:mt-[44px]   px-5 lg:px-0">
                        <div className="col-span-12 md:col-span-2  px-6 md:px-0">
                            <p className="md:py-6  pb-4 pt-6   fs-regular fw-medium"> Card</p>
                        </div>

                        <div className="col-span-12 md:col-span-10 px-5 lg:px-0">
                            <div className="grid grid-cols-12 gap-4">
<div className="col-span-12 flex justify-end"> <button onClick={() => createPortalSession()} className={'mt-10'}>Manage Subscription</button></div>
                                <div className="col-span-12 md:col-span-12">
                                    <div
                                        className="payment-shadow rounded-[20px] noise-20   innerBorderLinkSelected60  flex justify-between   px-[20px] py-[12px] cursor-pointer">
                                        <div className="flex">
                                            <svg className="mt-1" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path opacity="0.2"
                                                      d="M2.25 9H21.75V18C21.75 18.1989 21.671 18.3897 21.5303 18.5303C21.3897 18.671 21.1989 18.75 21 18.75H3C2.80109 18.75 2.61032 18.671 2.46967 18.5303C2.32902 18.3897 2.25 18.1989 2.25 18V9Z"
                                                      fill="#FAFAFA"/>
                                                <path
                                                    d="M21 5.25H3C2.58579 5.25 2.25 5.58579 2.25 6V18C2.25 18.4142 2.58579 18.75 3 18.75H21C21.4142 18.75 21.75 18.4142 21.75 18V6C21.75 5.58579 21.4142 5.25 21 5.25Z"
                                                    stroke="#E0E0E0" strokeWidth="1.2" strokeLinecap="round"
                                                    strokeLinejoin="round"/>
                                                <path d="M2.25 9H21.75" stroke="#E0E0E0" strokeWidth="1.2"
                                                      strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>

                                            <p className=" fw-regular fs-medium  px-[13px] py-[4px] ">
                                                {paymentMethod?.masked_number}
                                            </p>
                                        </div>
                                        <div>
                                            {/* <div
                                                className={` ${show &&
                                                " border border-gray-900 bg-black bg-[#ffffff1a] "
                                                }  w-[2rem] h-[2rem] flex justify-center items-center `}
                                            >
                                                <img
                                                    onClick={() => {
                                                        setShow(!show);
                                                    }}
                                                    src={dots}
                                                    alt="Discord"
                                                    className=" w-[24px] h-[24px] "
                                                />
                                            </div> */}


                                            {/* <div
                                                id="dropdown"
                                                className={` ${show ? ' block ' : 'hidden'}    -ml-24 lg:ml-8 -mt-1 z-10 absolute bg-[#1A1A1A] inset-border divide-y divide-gray-100 shadow w-[9rem]  `}
                                            >
                                                <ul

                                                    className="  text-sm text-black  "
                                                    aria-labelledby="dropdownDefaultButton"
                                                >
                                                    <li className=" inset-border">
                                                        <p className="px-4 py-2 text-white hover:text-black hover:bg-gray-100  fw-regular ">
                                                            Edit
                                                        </p>
                                                    </li>
                                                    <li className=" inset-border">
                                                        <p className="px-4 py-2 text-white hover:text-black hover:bg-gray-100  fw-regular ">
                                                            Active
                                                        </p>
                                                    </li>
                                                    <li className="">
                                                        <p className="px-4 py-2 text-white hover:text-black hover:bg-gray-100  fw-regular ">
                                                            Delete
                                                        </p>
                                                    </li>
                                                </ul>
                                                <div
                                                    onClick={() => {
                                                        setShow(false);
                                                    }}
                                                    className=" fixed inset-0 -z-10  "
                                                ></div>
                                            </div> */}

                                        </div>
                                    </div>
                                </div>




                            </div>
                        </div>
                    </div>

                    {/*table*/}

                    <div className="grid grid-cols-12 gap-4 lg:mt-[48px] mt-[44px] lg:paddingSectionLarge px-5 lg:px-0">
                        <div className="col-span-12 md:col-span-2">
                            <p className="fs-regular fw-medium py-3  ">
                                {" "}
                                Billing History
                            </p>
                        </div>

                        <div className="col-span-12 md:col-span-10">
                            <div className="grid grid-cols-12 gap-4">
                                <div className="col-span-12 md:col-span-12">
                                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                                        <table className="w-full text-sm text-left text-gray-500 ">
                                            <thead className="regular normal text-white   border-b border-gray-700 ">
                                            <tr>
                                                <th
                                                    scope="col"
                                                    className="px-1 py-3"
                                                >
                                                    Date
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3"
                                                >
                                                    Type
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3"
                                                >
                                                    Price
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3"
                                                ></th>
                                            </tr>

                                            </thead>
                                            <tbody>
                                            {invoices?.map((data, index) => (<tr className="  ">
                                                <th
                                                    scope="row"
                                                    className="px-1 py-4 font-medium  whitespace-nowrap  "
                                                >
                                                    {data?.paid_at}
                                                </th>
                                                <td className="px-6 py-4">
                                                    {data?.period_unit} Subscription
                                                </td>
                                                <td className="px-6 py-4">
                                                    ${data?.amount_paid}
                                                </td>

                                                <td className="px-6 py-4 text-right">
                                                    <PaymentModal invoices={data}/>
                                                </td>
                                            </tr>))}

                                            </tbody>

                                        </table>
                                       {invoices?.length < 1 && <div className="flex justify-center pt-5 opacity-50">No Data</div> }
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
        <ProfileLayout children={page} pageTitle={""}/>
    </SessionLayout>
);

export default Payment;
