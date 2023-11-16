import Navbar from "../Components/Nav-Footer/Navbar";
import Footer from "@/Components/Nav-Footer/Footer.jsx";
import logo from "../../assets/svg/logo.svg";
import Fingerprint from "../../assets/svg/Fingerprint.svg";
import { Link } from "@inertiajs/react";
import Toast from "@/Components/Toast/Toast.jsx";
import React, { useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import AppLayout from "./AppLayout";
const AuthLayout = ({ children, login = true }) => {
    useEffect(() => {
        AOS.init();
    }, [])
    return (
        <>
            <div className="welcome mybg">
                <Toast />

                <div className="static z-[99999999] flex justify-between col-span-12 p-6   ">
                    <Link href={route('welcome')}>
                        <img className="h-7  lg:h-10 object-cover md:ml-10" src={logo} alt="" />
                    </Link>
                    {login && <Link href={route('login')} className=" static z-[99999999] flex items-center justify-end md:mr-10">
                        <img className="h-6 w-6 object-cover " src={Fingerprint} alt="" />
                        <span className="text-base text-[#FFFFFF] font-normal uppercase ml-3">
                            login
                        </span>
                    </Link>}
                </div>
                <section className="page">
                    {children}
                </section>
            </div>
        </>
    );

}
AuthLayout.layout = (page) => <AppLayout children={page} title="" />;
export default AuthLayout;
