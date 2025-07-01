import React, { useState } from "react";
import glitch from "../../../assets/svg/glitch.svg";
import logo from "../../../assets/svg/logo.svg";
import { Link, useForm, usePage } from "@inertiajs/react";
import { ToastContainer, toast } from "react-toastify";
import Toast from "@/Components/Toast/Toast";
import Footer from "@/Components/Nav-Footer/Footer";
const PrivacyPolicy = () => {
    const { get } = useForm();

    function goBack(e) {
        e.preventDefault();


        get(route('academy'));
    }

    const handleContextMenu = (e) => {
        e.preventDefault();
    };

    return (
        <div onContextMenu={handleContextMenu}>
            <Toast />
            <section className="">
                <div className="container mx-auto px-5 lg:px-0">
                    <div className="">



                        <div className="relative max-w-[1300px]   mx-auto  px-6">


                            <div className="opacity-40 left-0 top-9 flex absolute w-full cursor-pointer">
                                <div onClick={(e) => goBack(e)} className="flex">

                                    <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8 4.05838V1.49938C7.99968 1.30176 7.94087 1.10865 7.83098 0.944396C7.72109 0.780141 7.56504 0.652089 7.3825 0.576377C7.19996 0.500664 6.99909 0.480679 6.8052 0.51894C6.61132 0.557201 6.4331 0.651996 6.293 0.791378L0 6.99938L6.293 13.2064C6.38565 13.2996 6.49581 13.3735 6.61715 13.424C6.73848 13.4744 6.86859 13.5004 7 13.5004C7.13141 13.5004 7.26152 13.4744 7.38285 13.424C7.50419 13.3735 7.61435 13.2996 7.707 13.2064C7.79991 13.1136 7.87361 13.0034 7.92389 12.882C7.97416 12.7607 8.00003 12.6307 8 12.4994V10.0104C10.75 10.0784 13.755 10.5764 16 13.9994V12.9994C16 8.36638 12.5 4.55638 8 4.05838Z" fill="white" />
                                    </svg> <span className="hidden md:block -mt-[2px] mx-1 "> Previous Page</span>
                                </div>

                            </div>



                            <Link href={route('welcome')} className="flex justify-center w-full ">
                                <img
                                    className="flex justify-center w-full mt-6  max-h-[40px] mx-[4rem] "
                                    src={logo}
                                    alt=""
                                />
                            </Link>


                            <h2 className="text-[2rem] lg:text-[2.8125rem] fw-bold text-center pt-10 lg:pt-16 pb-2  md:pb-5">PRIVACY POLICY</h2>
                        </div>

                        {/* <div className="border-b-[1px] border-b-[#FFFFFF] opacity-20   "></div> */}

                        <div className="max-w-[1300px] mx-auto  lg:p-6 text-start">
                            <p className="terms-text-size">Effective Date: September 11th, 2023</p>
                            <p className="terms-heading-size">1. INTRODUCTION</p>
                            <p className="terms-text-size">Welcome to CC International Limited ("we", "us" or "our"). We are committed to protecting your privacy and the security of your information. This Privacy Policy outlines how we collect, use, disclose, and protect your information when you use our Platform. Terms used but not defined in this Privacy Policy can be found in our Terms of Service.</p>
                            <p className="terms-heading-size">2. INFORMATION WE COLLECT</p>
                            <p className="terms-text-size">The categories of information listed below will collectively be referred to as “Information”:</p>
                            <ul className="terms-text-size privacy-ul">
                                <li><span className="fw-bold">2.1&nbsp;&nbsp;&nbsp; &nbsp; Personal Information: </span>&nbsp; We may collect personal information, including but not limited to your name, email address, mailing address, phone number and location when you register for an account (collectively referred to as “Personal Information”).</li>
                                <li><span className="fw-bold">2.2&nbsp;&nbsp;&nbsp; &nbsp; Technical Information: </span>&nbsp; We may collect technical information, including your IP address, browser type, operating system, and device information when you use our Platform. We use cookies and similar technologies to collect this information. Cookies are small pieces of text sent by your web browser by a website you visit. A cookie file is stored in your web browser and allows the website or a third-party to recognize you and make your next visit easier and the website more useful to you. Essentially, cookies are a user’s identification card for the Company’s servers.</li>
                                <li><span className="fw-bold">2.3&nbsp;&nbsp;&nbsp; &nbsp;  Courses:  </span>&nbsp; We collect data on your course selections, course progress, including completion status, grades, and assessments submitted.</li>
                                <li><span className="fw-bold">2.4&nbsp;&nbsp;&nbsp; &nbsp;   Communication:  </span>&nbsp; We may collect information related to your communication with us, including emails and chat messages.</li>
                                <li><span className="fw-bold">2.5&nbsp;&nbsp;&nbsp; &nbsp;    Networking Events and Meet Ups:  </span>&nbsp; We may collect information regarding the networking events and meet ups that are set up with other members/users of the Platform, including to but not limited to date and time, location of the event and number of users attending the event.</li>
                                <li><span className="fw-bold">2.6&nbsp;&nbsp;&nbsp; &nbsp;     Purchases:  </span>&nbsp; We may collect information regarding your purchases on the Platform including the items purchased, their quantity and discounts availed.</li>
                            </ul>
                            <p className="terms-text-size">The Company provides you with the ability to pay for our Services using a credit card or other methods through a third-party payment processing service provider. Please note that our service provider – not the Company – collects and processes your financial information.</p>
                            <p className="terms-heading-size">3. HOW WE USE YOUR INFORMATION</p>
                            <ul className="terms-text-size privacy-ul">
                                <li><span className="fw-bold">3.1&nbsp;&nbsp;&nbsp; &nbsp; PROVIDE SERVICES: </span>&nbsp;  We use your Information to provide you access to courses, deliver
                                    course materials, recommend related courses, allow you and others users to network with
                                    each other, process payments, and recommend relevant items that are being sold on the
                                    Platform.</li>
                                <li><span className="fw-bold">3.2&nbsp;&nbsp;&nbsp; &nbsp;  PERSONALIZATION: </span>&nbsp;  We may use your information to personalize your learning experience
                                    by recommending relevant courses based on your interests and preferences,
                                    recommending users on the Platform that you may want to network with and recommending
                                    relevant items currently being sold on the Platform.</li>
                                <li><span className="fw-bold">3.3&nbsp;&nbsp;&nbsp; &nbsp;  COMMUNICATION:  </span>&nbsp;  We may use your information to communicate with you about your
                                    course, upcoming networking events or meet ups, promotions, and other important notices.</li>
                                <li><span className="fw-bold">3.4&nbsp;&nbsp;&nbsp; &nbsp;   ANALYTICS:  </span>&nbsp;  We may use aggregated and anonymized data for analytics to improve our
                                    courses and Services. We also reserve the right to share the anonymized data with third
                                    party analytics service providers.</li>
                                <li><span className="fw-bold">3.5&nbsp;&nbsp;&nbsp; &nbsp;    MOBILE AND MESSAGING:  </span>&nbsp;  We don't share, sell, or distribute your mobile number. Expect
                                    1-4 texts/notifications weekly. This may change without prior notice. Message and data rates
                                    might apply.</li>
                            </ul>

                            <p className="terms-heading-size">4. DISCLOSURE OF YOUR INFORMATION</p>
                            <ul className="terms-text-size privacy-ul">
                                <li><span className="fw-bold">4.1&nbsp;&nbsp;&nbsp; &nbsp;     SERVICE PROVIDERS:  </span>&nbsp; We may share your Information (but only to the extent necessary
                                    and relevant) with third-party service providers who assist us in delivering our Services,
                                    such as payment processors, hosting providers, and communication tools.</li>
                                <li ><span className="fw-bold">4.2&nbsp;&nbsp;&nbsp; &nbsp; LEGAL REQUIREMENTS:  </span>&nbsp; We may disclose your information as required by law, such as to
                                    comply with a subpoena, legal process, or government request.</li>
                                <li><span className="fw-bold">4.3&nbsp;&nbsp;&nbsp; &nbsp; BUSINESS TRANSFERS:  </span>&nbsp; In the event of a merger, acquisition, or sale of all or part of our
                                    assets, your Information may be transferred as part of the transaction.</li>
                            </ul>

                            <p className="terms-heading-size">5. YOUR CHOICES</p>
                            <p className="terms-text-size">You have the following rights regarding your Personal Information:</p>
                            <ul className="terms-text-size privacy-ul">
                                <li><span className="fw-bold">5.1&nbsp;&nbsp;&nbsp; &nbsp;  ACCESS:  </span>&nbsp; You can request access to the Personal Information we hold about you at any
                                    time.</li>
                                <li><span className="fw-bold">5.2&nbsp;&nbsp;&nbsp; &nbsp; CORRECTION:  </span>&nbsp; You can request corrections to inaccurate or incomplete Personal
                                    Information.</li>
                                <li><span className="fw-bold">5.3&nbsp;&nbsp;&nbsp; &nbsp;  DELETION:  </span>&nbsp; You can request the deletion of your Personal Information, subject to legal
                                    limitations.</li>
                            </ul>
                            <p className="terms-heading-size">6. EXTERNAL LINKS</p>
                            <p className="terms-text-size">We may provide links to sites operated by organizations other than the Company ("Third Party
                                Sites") that we believe may be of interest to you. We do not endorse and are not responsible for the
                                privacy practices of these Third Party Sites. If you choose to click on a link to these Third Party Sites,
                                you should review the privacy policy posted on them to understand how such Third Party Sites collect
                                and use your Personal Information.</p>
                            <p className="terms-heading-size">7. SECURITY</p>
                            <p className="terms-text-size">We implement appropriate technical and organizational measures to protect your Information.
                                However, no data transmission over the internet is completely secure, and we cannot guarantee the
                                security of your information.</p>
                            <p className="terms-heading-size">8. RETENTION OF PERSONAL INFORMATION</p>
                            <p className="terms-text-size">We keep your Personal Information for no longer than necessary for the purposes for which the
                                Personal Information is collected and processed. The length of time we retain your Personal
                                Information, depends on the purposes for which we collect and use it and/or as required to comply
                                with applicable laws and to establish, exercise, or defend our legal rights.</p>
                            <p className="terms-heading-size">9. CHANGES TO THIS PRIVACY POLICY</p>
                            <p className="terms-text-size">We may update this Privacy Policy from time to time to reflect changes in our practices, and to comply
                                with changing applicable laws and regulations. We will notify you of any material changes by posting
                                the updated Privacy Policy on our Platform.</p>
                            <p className="terms-heading-size">10. CONTACT US</p>
                            {/* <p className="terms-text-size"></p> */}
                            <p className="terms-text-size">If you have any questions or concerns about this Privacy Policy or our data retention practices, please
                                contact us at <a href="mailto:hello@capital.club" target="_blank">hello@capital.club.</a></p>
                            {/* <a href="mailto:hello@capital.club" className="button primary border-rounded-20 w-fit px-16 pt-2.5 pb-2 mt-8">CONTACT US</a> */}
                            <Link onClick={() => window.location = 'mailto:hello@capital.club'} className="button primary border-rounded-8 w-fit px-16 pt-2.5 pb-2 mt-8">CONTACT US</Link>




                        </div>
                        <div className="flex justify-center  my-6 md:my-10 ">

                            <svg className='w-6 h-6 md:w-10 md:h-10 ' width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20.4996 0C9.19581 0 0 9.06026 0 20.1974C0 28.9825 5.72373 36.4715 13.6888 39.2444C14.5923 39.5589 15.5238 39.8145 16.4808 40.0025C16.4991 40.0064 16.5183 40.0087 16.5374 40.0127C17.4482 40.1888 18.3796 40.3068 19.3295 40.3595V6.25355C18.6478 6.25355 17.4354 6.45094 16.5374 6.70731C16.5183 6.71282 16.4999 6.71754 16.4808 6.72304C15.503 7.00694 14.5675 7.38756 13.6888 7.86098C10.4873 9.58323 8.02728 12.4804 6.90743 15.9595C6.61769 16.8599 6.31279 17.9027 6.31598 18.7662H13.9474V15.9595H9.93572C10.7275 14.0508 12.0341 12.4025 13.6888 11.1859C14.5364 10.5623 15.4751 10.0543 16.4808 9.67995V37.1289C15.5182 36.9071 14.5843 36.6114 13.6888 36.241C7.32727 33.6097 2.8479 27.4104 2.8479 20.1982C2.8479 10.6087 10.7658 2.80671 20.4996 2.80671C30.2334 2.80671 38.1513 10.6087 38.1513 20.1982C38.1513 27.3271 33.7733 33.465 27.5284 36.1475C26.628 36.5344 25.6886 36.8482 24.718 37.0841V9.75702C25.7348 10.1573 26.6791 10.6976 27.5284 11.3534C29.0784 12.5519 30.3076 14.1358 31.0635 15.9595H27.2697V18.7662H34.6816C34.684 17.9255 34.4063 16.76 34.1165 15.8604C33.0222 12.4607 30.6229 9.72006 27.5292 7.98445C26.6464 7.48901 25.7061 7.08086 24.7188 6.77888C24.706 6.77495 24.6932 6.7718 24.6805 6.76787C23.7785 6.49498 22.523 6.25198 21.8701 6.25277V40.3445C22.8255 40.2824 23.7649 40.159 24.6805 39.971C24.6932 39.9686 24.706 39.9647 24.7188 39.9623C25.6814 39.7634 26.6208 39.4992 27.5292 39.1712C35.3816 36.3386 41 28.9022 41 20.1974C40.9992 9.06026 31.8034 0 20.4996 0Z" fill="white" />
                                <path d="M27.2695 29.0422V32.412C30.8071 30.8116 33.1337 27.6675 34.1826 24.1358C34.4499 23.2337 34.6774 22.1493 34.6814 21.3228L31.8503 21.3298H27.2695V24.1365H31.1846C30.6267 26.0515 29.0902 27.8759 27.2695 29.0438V29.0422Z" fill="white" />
                                <path d="M13.9478 21.3275H9.14914L6.31641 21.3228C6.34913 22.2633 6.54947 23.2322 6.81686 24.1334C7.88961 27.7462 10.3089 30.7306 13.9478 32.5339V29.2089C11.6355 27.7312 10.5906 26.1702 9.81482 24.1342H13.9478V21.3275Z" fill="white" />
                            </svg>
                        </div>

                        {/* <p className="text-[14px] text-center fw-regular mb-6">Copyright Capital Club 2023. All Rights Reserved.</p> */}

                    </div>
                </div>
            </section>
        </div>
    );
};

export default PrivacyPolicy;
