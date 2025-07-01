import Navbar from "../Components/Nav-Footer/Navbar";
import Footer from "@/Components/Nav-Footer/Footer.jsx";
import bg from '../../assets/svg/academyshadow.svg';
import Toast from "@/Components/Toast/Toast.jsx";
import React, { lazy, Suspense, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import AppLayout from "./AppLayout";
import { PostsContext } from '../Store/PostsProvider';
import { useContext } from "react";
import ToastNotification from "@/Components/ToastNotification";
import { useRef } from "react";
import { GTMLogs } from "@/utils/GTMLogs";
import axios from "axios";
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

    const currentUrl = window.location.href;
    const extractMarketplaceSegment = (url) => {
        const parsedUrl = new URL(url);
        const pathname = parsedUrl.pathname;
        const segments = pathname.split('/');
        const marketplaceIndex = segments.findIndex(segment => segment.toLowerCase() === 'marketplace');
        if (marketplaceIndex !== -1) {
            return segments[marketplaceIndex];
        } else {
            return null;
        }
    };

    const marketplaceSegment = extractMarketplaceSegment(currentUrl);



    const topElementRef = useRef(null);
    useEffect(() => {
        if (topElementRef.current) {
            topElementRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, []);
    const handleContextMenu = (e) => {
        e.preventDefault();
    };

    useEffect(() => {
        axios.get(route('get-auth-user'))
            .then((response) => {
                const user = response?.data?.payload;
                GTMLogs(
                    {
                        'email': user?.email,
                        'phone_number': user?.phone_number,
                        'customer_id': user?.id,
                        'country': user?.country_iso,
                    }
                )
            })
    }, [currentPage])


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
                {currentPage == 'academy' || currentPage == 'livestream' || marketplaceSegment == 'marketplace' ?
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
