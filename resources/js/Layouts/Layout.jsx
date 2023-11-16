import Navbar from "../Components/Nav-Footer/Navbar";
import Footer from "@/Components/Nav-Footer/Footer.jsx";
import bg from '../../assets/svg/academyshadow.svg';
import Toast from "@/Components/Toast/Toast.jsx";
import React, { lazy, Suspense, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { usePage } from "@inertiajs/react";
import AppLayout from "./AppLayout";
import { PostsContext } from '../Store/PostsProvider';
import { useContext } from "react";
import ToastNotification from "@/Components/ToastNotification";
import logo from "../../assets/logo.svg";
import { useRef } from "react";
const Layout = ({ children }) => {
    useEffect(() => {
        AOS.init();
        
    }, [])
  
    const { contextNotify, studymode } = useContext(PostsContext);

    useEffect(() => {
        //    console.log("notificatoin in   layout ****" , contextNotify)
    }, [contextNotify])


    const currentPathname = window.location.pathname;
    const segments = currentPathname.split('/');

    // Get the last segment
    const currentPage = segments[segments.length - 1];



    const topElementRef = useRef(null);
    useEffect(() => {
        if (topElementRef.current) {
            topElementRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, []);
    const handleContextMenu = (e) => {
        e.preventDefault(); 
      };
    return (
        <div onContextMenu={handleContextMenu}> 
            <ToastNotification />
            <div ref={topElementRef} className="flex justify-between flex-col h-[98vh]">
                <div>

                    <Navbar />
                    <Toast />

                    <div className="min-h-[65vh]">
                        <Suspense>
                            {children}
                        </Suspense>
                    </div>
                </div>
                {currentPage == 'academy' ?
                    <Footer /> :
                    <>
                        {currentPage == 'play' && studymode ?
                            null
                            :
                            null
                            // <>

                            //     <div className="hidden md:block">
                            //         <Footer />
                            //     </div>

                            //     <div className=" md:hidden     w-full flex justify-center  py-[1.25rem] ">
                            //         <img src={logo} className="lg:h-[40px] h-[27px] " alt="" />
                            //     </div>
                            // </>
                        }
                    </>
                }
            </div>
        </div>
    );

}

Layout.layout = (page) => <AppLayout children={page} title="" />;
export default Layout;
