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
import { useRef } from "react";
const LessonLayout = ({ children }) => {
    useEffect(() => {
        AOS.init();        
    }, [])
  
    const { contextNotify, studymode } = useContext(PostsContext);
    useEffect(() => {
        //    console.log("notificatoin in   layout ****" , contextNotify)
    }, [contextNotify]) 
    
    const topElementRef = useRef(null);
    useEffect(() => {
        if (topElementRef.current) {
            topElementRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, []);

    return (
        <div>
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
                 
            </div>
        </div>
    );

}

// LessonLayout.layout = (page) => <AppLayout children={page} title="" />;
export default LessonLayout;
