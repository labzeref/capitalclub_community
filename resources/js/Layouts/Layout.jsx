import Navbar from "../Components/Nav-Footer/Navbar";
import Footer from "@/Components/Nav-Footer/Footer.jsx";
import bg from '../../assets/svg/academyshadow.svg';
import Toast from "@/Components/Toast/Toast.jsx";
import React, { useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { usePage } from "@inertiajs/react";
import AppLayout from "./AppLayout";
import { PostsContext } from '../Store/PostsProvider';
import { useContext } from "react";
import ToastNotification from "@/Components/ToastNotification";
const Layout = ({ children }) => {
    useEffect(() => {
        AOS.init();
    }, [])
    const { contextNotify } = useContext(PostsContext);
useEffect(() => {
//    console.log("notificatoin in   layout ****" , contextNotify)
}, [contextNotify])
   
    return (
        <div>
            <ToastNotification  />  
            <div className="academy-bg  ">
                <img src={bg} className="light-spot" />
            </div>

            <Navbar />
            <Toast />

            <div className="min-h-[83vh]">
                {children}
            </div>

            <Footer />
        </div>
    );

}

Layout.layout = (page) => <AppLayout children={page} title="" />;
export default Layout;
