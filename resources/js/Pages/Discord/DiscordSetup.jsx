import Layout from "@/Layouts/Layout";
import {Head, useForm, usePage} from "@inertiajs/react";
import {useEffect, useState} from "react";
import ReactToast from "@/Components/ReactToast.jsx";

const DiscordSetup = ({connectDiscordUrl, discordConnected, serverLink}) => {
    const auth = usePage().props.auth

    // console.log('discordStatus', discordStatus);

    // const [connectBtnText, setConnectBtnText] = useState('CONNECT YOUR DISCORD ACCOUNT');
    // const [status, setStatus] = useState(discordStatus);

    // useEffect(() => {
    //     if (status === 'none') {
    //         setConnectBtnText('CONNECT YOUR DISCORD ACCOUNT')
    //     } else if (status === 'connecting') {
    //         setConnectBtnText('CONNECTING . . . . .')
    //     } else if (status === 'connected') {
    //         setConnectBtnText('CONNECTED')
    //     }
    // }, [status])

    return (
        <>
            <Head>
                <title>Discord</title>
            </Head>
            <section className="md:mb-12 lg:mb-3  w-full">
                <div className="container mx-auto px-5 lg:px-3">
                    <div className="max-w-[525px] mx-auto">
                            <div className="grid grid-cols-1">
                                <div className="card-bg-discord box-shadow-bg border-rounded-19 padding-discord-step lg:ml-[2.6rem]">
                                    <div className="text-center">
                                        <div className="mb-[18px] flex justify-center items-center">
                                            <svg width="44" height="34" viewBox="0 0 44 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M36.5788 2.84749C33.8561 1.51725 30.9449 0.550485 27.9013 0C27.5275 0.705702 27.0908 1.65489 26.7897 2.40996C23.5543 1.90186 20.3486 1.90186 17.1727 2.40996C16.8717 1.65489 16.4251 0.705702 16.048 0C13.0011 0.550485 10.0865 1.5208 7.36384 2.85454C1.87218 11.5204 0.38348 19.971 1.12783 28.3016C4.77019 31.142 8.30007 32.8674 11.7704 33.9965C12.6272 32.7651 13.3914 31.456 14.0497 30.0764C12.7959 29.5789 11.5951 28.965 10.4604 28.2522C10.7614 28.0193 11.0558 27.7758 11.3403 27.5253C18.2611 30.9056 25.7807 30.9056 32.6188 27.5253C32.9067 27.7758 33.2011 28.0193 33.4988 28.2522C32.3608 28.9685 31.1566 29.5824 29.9028 30.08C30.5611 31.456 31.322 32.7686 32.1821 34C35.6558 32.8709 39.189 31.1455 42.8313 28.3016C43.7047 18.6443 41.3393 10.2713 36.5788 2.84749ZM14.9926 23.1783C12.915 23.1783 11.2113 21.153 11.2113 18.6866C11.2113 16.2202 12.8787 14.1914 14.9926 14.1914C17.1066 14.1914 18.8103 16.2167 18.7739 18.6866C18.7772 21.153 17.1066 23.1783 14.9926 23.1783ZM28.9666 23.1783C26.889 23.1783 25.1852 21.153 25.1852 18.6866C25.1852 16.2202 26.8526 14.1914 28.9666 14.1914C31.0805 14.1914 32.7843 16.2167 32.7479 18.6866C32.7479 21.153 31.0805 23.1783 28.9666 23.1783Z" fill="white"/>
                                            </svg>
                                        </div>
                                        <h3 className="fw-bold mb-10 text-30">JOIN OUR <br/> COMMUNITY</h3>
                                        <p className="text-[13px] fw-semibold mb-[21px] md:mb-7 leading-[17px]">Click the button below to join our Discord community.
                                            <br className="sm-d-none md-d-none"/> Only available for Capital Club Members.</p>
                                            <button onClick={() => {
                                            if (!discordConnected) {
                                                window.location.href = connectDiscordUrl;
                                            }
                                        }}
                                                disabled={discordConnected}
                                                className={`${discordConnected && 'disable'} button primary discord-btn rounded-full w-full pt-0.5`}>
                                            {discordConnected ? 'CONNECTED' : 'JOIN NOW'}
                                        </button>

                                        {
                                            discordConnected &&
                                            <button onClick={() => {
                                                    window.open(serverLink, '_blank');
                                            }}
                                                    className={`button primary discord-btn rounded-full w-full pt-0.5 mt-3`}>
                                                OPEN DISCORD
                                            </button>
                                        }
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
            </section>
        </>
    );
}

DiscordSetup.layout = (page) => <Layout children={page}/>;
export default DiscordSetup;
