import React, { useState } from "react";
import dots from "../../../assets/VDots.png";
import PaymentModal from "../../Components/Modal/PaymentModal";
import Button from "../../Components/Button";
import { ReactComponent as Plus } from "../../../assets/svg/Plus.svg";
import ProfileLayout from "@/Layouts/ProfileLayout";
import SessionLayout from "@/Layouts/SessionLayout";
import axios from 'axios';
import { Head } from "@inertiajs/react";

const Payment = ({ invoices, chargeBeeSite, chargeBeePublicKey }) => {

    window.Chargebee.init({
        site: chargeBeeSite,
        embed: true,
        enableGTMTracking: true,
        domain: 'https://billing.capital.club',
        publishableKey: chargeBeePublicKey
    });
    const createPortalSession = async () => {
        let cbInstance = await window.Chargebee.getInstance();

        await cbInstance.setPortalSession(async function () {
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

                    <div className="card-bg dp-card-paddeing border-rounded-15 px-2 mx-[1rem] ">
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
                                                            className="  text-center py-3 text-[10px] md:text-[0.75rem] fw-medium"
                                                        >
                                                            DATE
                                                        </th>
                                                        {/* <th
                                                            scope="col"
                                                            className="  py-3 text-[10px] md:text-[0.75rem] text-center  fw-medium"
                                                        >
                                                            DESCRIPTION
                                                        </th> */}
                                                        <th
                                                            scope="col"
                                                            className="  py-3 text-[10px] md:text-[0.75rem] text-center  fw-medium"
                                                        >
                                                            AMOUNT
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="  py-3 text-[10px] md:text-[0.75rem] text-center  fw-medium"
                                                        >INVOICE</th>
                                                    </tr>

                                                </thead>
                                                <tbody>
                                                    {invoices?.map((data, index) => (
                                                    <tr className="  bg-[#141414] overflow-hidden">
                                                        <th
                                                            scope="row"
                                                            className="px-1 py-2 rounded-l-full text-center  text-[#797979] text-[10px] md:text-[11px] fw-medium  "
                                                        >
                                                            {data?.paid_at}
                                                        </th>
                                                        {/* <td className="px-2 py-2 text-center text-[#797979] text-[10px] md:text-[11px] fw-medium ">
                                                            {data?.period_unit} Subscription
                                                        </td> */}
                                                        <td className="px-2 py-2 text-center text-[#797979] text-[10px] md:text-[11px] fw-medium  ">
                                                            ${data?.amount_paid}
                                                        </td>

                                                        <td className="px-1 py-2 text-right rounded-r-full">
                                                            <PaymentModal invoices={data} />
                                                        </td>
                                                    </tr>))}

                                                </tbody>

                                            </table>
                                            {invoices?.length < 1 && <div className="flex justify-center pt-5 opacity-50">No Data</div>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>




                    <div className="card-bg border-rounded-15 px-2 lg:px-4 dp-card-paddeing mt-[0.75rem] mx-[1rem] ">
                        <div className="text-center">
                            <p className="personal-info-text ">
                                {" "}
                                YOUR BILLING
                            </p>
                        </div>




                        <div className="  flex justify-center mt-0">
                            <button className=" profile-buttons  bg-[#fff] text-black button primary " onClick={() => createPortalSession()} >
                                <div className="button_container glitch uppercase">
                                MANAGE SUBSCRIPTION
                                </div>
                            </button>


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
