import Navbar from "../Components/Nav-Footer/Navbar";
import Footer from "@/Components/Nav-Footer/Footer.jsx";
import bg from '../../assets/svg/academyshadow.svg';
import Toast from "@/Components/Toast/Toast";
import { useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import AppLayout from "./AppLayout";
import ToastNotification from "@/Components/ToastNotification";
import Layout from "./Layout";
const SessionLayout = ({ children, courseId }) => {
    useEffect(() => {
        AOS.init();
    }, [])

    const handleContextMenu = (e) => {
        e.preventDefault(); 
      };
    return (
        <div onContextMenu={handleContextMenu} >
            <Toast />
            <ToastNotification  />
            {/* <div className="academy-bg">

                <img src={bg} className="light-spot" />
            </div> */}

            <Navbar courseId={courseId} />

            <div className="min-h-[80vh]  ">
                {children}
            </div>


        </div>
    );

}
SessionLayout.layout = (page) => <Layout children={page} title="" />;
export default SessionLayout;
