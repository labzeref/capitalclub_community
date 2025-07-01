import Footer from "@/Components/Nav-Footer/Footer.jsx";
import Toast from "@/Components/Toast/Toast.jsx";
import ToastNotification from "@/Components/ToastNotification";
import 'aos/dist/aos.css';
import { Suspense } from 'react';
import Navbar from "../Components/Nav-Footer/Navbar";
import AppLayout from "./AppLayout";
import { Link } from "@inertiajs/react";
import { AsyncImage } from "loadable-image";
import { useState } from "react";
import { useContext } from "react";
import { PostsContext } from '../Store/PostsProvider';
import LiveSwitchButtons from "@/Pages/LiveStream/partials/LiveSwitchButtons";

const LiveStreamLayout = ({ children, streamPage }) => {
    const { featuredLiveStream } = useContext(PostsContext);
    const handleContextMenu = (e) => {
        e.preventDefault();
    };
    return (
        <div onContextMenu={handleContextMenu}>
            <ToastNotification />
            <div className="flex justify-between flex-col h-[98vh]">
                <div>

                    <Navbar />
                    <Toast />

                    {/* live stream heder slider  */}
                    <div className="  live-container mx-auto lg:px-3  px-[15px]">

                        {featuredLiveStream &&
                            <div className='mt-7 md:mt-12 '>
                                {!featuredLiveStream.disabled ?
                                    <Link href={route('livestream.show', featuredLiveStream?.id)} >

                                        <div className="block md:block lg:hidden">
                                            <AsyncImage
                                                src={featuredLiveStream?.mobileBanner}
                                                className={`rounded-[25px] input-shadow `}
                                                style={{ height: "auto", width: "100%", aspectRatio: 343 / 432, objectFit: "contain" }}
                                                // Transition={props => <Blur radius={10} {...props} />}
                                                loader={<div style={{ background: '#1A1A1A' }} />}
                                                error={<div style={{ background: '#1A1A1A' }} />} />
                                        </div>
                                        <div className="hidden md:hidden lg:block">
                                            <AsyncImage
                                                src={featuredLiveStream?.banner}
                                                className={`rounded-[25px] input-shadow`}
                                                style={{ height: "auto", width: "100%", aspectRatio: 768 / 317, objectFit: "contain" }}
                                                // Transition={props => <Blur radius={10} {...props} />}
                                                loader={<div style={{ background: '#1A1A1A' }} />}
                                                error={<div style={{ background: '#1A1A1A' }} />} />
                                        </div>
                                    </Link>
                                    :
                                    <>

                                        <div className="block md:block lg:hidden">
                                            <AsyncImage
                                                src={featuredLiveStream?.mobileBanner}
                                                className={`rounded-[25px] input-shadow `}
                                                style={{ height: "auto", width: "100%", aspectRatio: 343 / 432, objectFit: "contain" }}
                                                // Transition={props => <Blur radius={10} {...props} />}
                                                loader={<div style={{ background: '#1A1A1A' }} />}
                                                error={<div style={{ background: '#1A1A1A' }} />} />
                                        </div>
                                        <div className="hidden md:hidden lg:block">
                                            <AsyncImage
                                                src={featuredLiveStream?.banner}
                                                className={`rounded-[25px] input-shadow`}
                                                style={{ height: "auto", width: "100%", aspectRatio: 768 / 317, objectFit: "contain" }}
                                                // Transition={props => <Blur radius={10} {...props} />}
                                                loader={<div style={{ background: '#1A1A1A' }} />}
                                                error={<div style={{ background: '#1A1A1A' }} />} />
                                        </div>

                                    </>
                                }
                            </div>
                        }

                        <LiveSwitchButtons />

                    </div>
                    <Suspense>
                        {children}
                    </Suspense>

                </div>
                <Footer /> :


            </div>
        </div>
    );

}

LiveStreamLayout.layout = (page) => <AppLayout children={page} title="" />;
export default LiveStreamLayout;
