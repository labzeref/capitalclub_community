import React, { useState } from "react";
import glitch from "../../../assets/svg/glitch.svg";
import logo from "../../../assets/svg/logo.svg";
import { Link, useForm, usePage } from "@inertiajs/react";
import { ToastContainer, toast } from "react-toastify";
import Toast from "@/Components/Toast/Toast";
import Footer from "@/Components/Nav-Footer/Footer";
const TermsConditions = () => {
    const { get } = useForm();

    function goBack(e) {
        e.preventDefault();


        get(route('academy'));
    }

    const handleContextMenu = (e) => {
        e.preventDefault();
    };

    return (
        <div onContextMenu={handleContextMenu} >
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


                            <h2 className="text-[2rem] lg:text-[2.8125rem] fw-bold text-center pt-10 lg:pt-16 pb-2  md:pb-5">TERMS OF SERVICE</h2>
                        </div>

                        {/* <div className="border-b-[1px] border-b-[#FFFFFF] opacity-20   "></div> */}

                        <div className="max-w-[1300px] mx-auto  lg:p-6 text-start">
                            <p className="terms-text-size">Effective Date: September 11th, 2023</p>
                            <p className="terms-text-size">Welcome to the CC International Limited Limited ("we", "us", or "our") platform, available at
                                <a href="https://www.capital.club/" target="_blank">https://www.capital.club/</a>("Website") and on mobile applications (on the Android and iOS mobile
                                platforms) and desktop applications (on the Windows and MacOS platforms) (“Applications”)
                                (hereinafter along with the Website collectively referred to as “Platform”). These Terms of Service
                                ("Terms") govern your use of the Platform, so please read them carefully.</p>
                            <p className="terms-heading-size">1.&nbsp;&nbsp; ACCEPTANCE OF TERMS</p>
                            <p className="terms-text-size">By accessing and using the Platform for its services (“Services”), you acknowledge that you have
                                read, understood, and agree to be fully bound by these Terms, as well as our Privacy Policy, which is
                                incorporated by reference.</p>
                            <p className="terms-heading-size">2.&nbsp;&nbsp; REGISTRATION</p>
                            <p className="terms-text-size">To access the Services on the Platform, you are required to create an account by providing true and
                                accurate personal information. You are responsible for maintaining the confidentiality of your account
                                information and for all activities that occur under your account. You agree to notify us immediately of
                                any unauthorized use of your account or any other breach of security.</p>
                            <p className="terms-heading-size">3.&nbsp;&nbsp; PROVISION OF SERVICES</p>
                            <p className="terms-text-size">You must be above 18 years of age (if younger than 18 years of age please access the Platform
                                under the supervision of a parent/guardian), and in any case not below 13 years of age, to register on
                                the Platform and apply for the annual membership of the Company (renewable automatically annually
                                but cancellable at your option) in order to access and use the Services. Further, the Company
                                reserves the right, without prior notice and at its sole discretion, to restrict access to or use of certain
                                Services (or any features within the Services).</p>
                            <ul className="terms-text-size privacy-ul">
                                <li><span className="mr-3">3.1</span> In case you avail Services while accessing the Platform, that may be supported and/or
                                    provided by third party service provider(s), for all such services the Company disclaims all
                                    liability for any claims that may arise pursuant to your use of services provided by such third
                                    party service provider(s).</li>
                                <li><span className="mr-3">3.2</span> You agree and confirm that any Services provided to you by the Company are on best
                                    efforts basis and the Company may engage services of third party service provider(s) to
                                    facilitate such Services to you. We shall not in any manner be liable to you for failure or
                                    delay in providing the Services or for any temporary disablement, permanent discontinuance
                                    of the Services by us or for any consequences resulting from such actions or reasons that are beyond our reasonable control.</li>
                            </ul>
                            <p className="terms-text-size">Our Services shall not be provided to any Office of Foreign Assets Control (OFAC) sanctioned
                                countries pursuant to US laws and those of other applicable countries</p>
                            <p className="terms-heading-size">4.&nbsp;&nbsp; INTELLECTUAL PROPERTY</p>
                            <p className="terms-text-size">All content, course materials, logos, and materials on the Platform, including but not limited to text,
                                graphics, videos, software, and the arrangement thereof, are the property of the Company and are
                                protected by applicable intellectual property laws. You may only use course materials for personal,
                                non-commercial educational purposes and may not reproduce, modify, distribute, or display any of the
                                content without our prior express written consent.</p>
                            <p className="terms-heading-size">5.&nbsp;&nbsp; USER CONTENT</p>
                            <p className="terms-heading-size">You may be able to submit, upload, or post content, including comments and reviews, related to
                                courses or networking events hosted by us on the Platform. By doing so, you grant us a
                                non-exclusive, worldwide, royalty-free license to use, reproduce, distribute, and display your content
                                in connection with the Platform and its promotion.</p>
                            <p className="terms-heading-size">6.&nbsp;&nbsp; PAYMENTS AND REFUNDS</p>
                            <p className="terms-heading-size">Membership fees are specified on the Platform. Payment processing is handled by a third-party
                                payment processor. The Company is not liable in any way for any issues arising out of the payment
                                processing services provided by such party payment processor. You have the option of getting a full
                                refund for the membership fee paid within 14 days of registering and completing the payment of the
                                membership fee on the Platform. In case you would like to request for a refund, please contact
                                <span className="fw-bold">hello@capital.club</span></p>
                            <p className="terms-heading-size">7.&nbsp;&nbsp; TERMINATION</p>
                            <p className="terms-text-size">We reserve the right to terminate or suspend your access to the Platform and courses at our sole
                                discretion, without notice, for any or no reason, including, but not limited to, a breach of Clause 8
                                (User Code of Conduct) of the Terms.</p>
                            <p className="terms-heading-size">8.&nbsp;&nbsp; USER CODE OF CONDUCT</p>
                            <p className="terms-heading-size">You shall not display, upload, publish or share any information which:</p>
                            <ul className="terms-text-size privacy-ul">
                                <li><span className="fw-bold mr-3">8.1</span> promotes illegal activities or conduct that is abusive, threatening, obscene, defamatory or
                                    libelous;</li>
                                <li><span className="fw-bold mr-3">8.2</span> is patently offensive to the online community of the Platform;</li>
                                <li><span className="fw-bold mr-3">8.3</span> harasses or advocates harassment of any member(s) of the Platform; or</li>
                                <li><span className="fw-bold mr-3">8.4</span> belongs to another person and to which you do not have any rights.</li>
                            </ul>
                            <p className="terms-heading-size">9.&nbsp;&nbsp; CHANGES TO TERMS</p>
                            <p className="terms-text-size">We may modify these Terms at any time without prior notice. It is your responsibility to review these
                                Terms periodically for changes if any. By continuing to use the Platform after any modifications, you
                                agree to be bound by the revised Terms.</p>
                            <p className="terms-heading-size">10.&nbsp;&nbsp; DISCLAIMER</p>
                            <p className="terms-heading-size">Course content is provided for informational/educational purposes only and does not constitute
                                professional advice. We do not guarantee the accuracy, completeness, or suitability of any course
                                content or any information displayed in the Platform. Your use of the Platform and courses is at your
                                own risk</p>
                            <p className="terms-heading-size">11.&nbsp;&nbsp; LIMITATION OF LIABILITY</p>
                            <p className="terms-heading-size">o the maximum extent permitted by law, the Company shall not be liable for any direct, indirect,
                                incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether
                                incurred directly or indirectly, or any loss of data, use, goodwill, or other tangible or intangible losses,
                                resulting from: (a) your access to or use of, or inability to access or use of, the Services; (b) any
                                conduct or content of any party (including, those stemming from third-party impersonators, scams,
                                hackings, etc.) other than the Company, including without limitation, any defamatory, offensive, or
                                illegal conduct; or (c) unauthorized access, use, or alteration of your content or information</p>
                            <p className="terms-heading-size">12.&nbsp;&nbsp; GOVERNING LAW</p>
                            <p className="terms-heading-size">These Terms are governed by and construed in accordance with the laws of Delaware for those
                                residing in the US and Hong Kong for those residing outside of the US. Any legal action or proceeding
                                arising out of or related to these Terms, will be submitted to the personal jurisdiction of and the
                                exclusive venue of the courts located in Delaware for those residing in the US and Hong Kong for
                                those residing outside of the US.</p>
                            <p className="terms-heading-size">13.&nbsp;&nbsp; CONTACT US</p>
                            <p className="terms-text-size">If you have any questions or concerns about these Terms, please contact us at <a href="mailto:hello@capital.club" target="_blank" className="fw-bold">hello@capital.club.</a></p>
                            <Link onClick={() => window.location = 'mailto:hello@capital.club'} className="button primary border-rounded-8 w-fit px-16 pt-2.5 pb-2 mt-8">CONTACT US</Link>
                            {/* <a onClick={()=> window.location.href='mailto:hello@capital.club'} className="button primary border-rounded-20 w-fit px-16 pt-2.5 pb-2 mt-8">CONTACT US DDD</a> */}


                            {/* <p className="terms-text-size"></p> */}



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

export default TermsConditions;
