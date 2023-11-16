
import logo from "../../../assets/svg/logo.svg";
import AppLayout from "../../Layouts/AppLayout";
import Toast from "@/Components/Toast/Toast";
import LOADING from "@/Components/LOADING.json";
// import Button from "..//Components/Button";
// import IconButton from "@/Components/IconButton";
// import { ReactComponent as WELCOMEARROW } from "../../assets/svg/WELCOMEARROW.svg";
import { Head, Link, useForm, usePage } from "@inertiajs/react";

// import clickSound from "../../assets/clickSound.wav";
// import TabButton from "@/Components/TabButton";
import { useRef } from "react";
import { motion } from "framer-motion"
import { useEffect } from "react";
import { useState } from "react";
import TopInterest from "@/Pages/Preference/TopInterests";
import BusinessOwner from "./BusinessOwner";
import BusinessIndustry from "./businessIndustry";
import BusinessRevenue from "./BusinessRevenue";
import Identity from "./Identity";
import ReactToast from "@/Components/ReactToast";
import Lottie from "react-lottie-player";

const PreferencesLayout = ({ categories, industries, avatars, children, progress = "", backPAth = '', farwordPath = "", isLast, isShowButton = '' }) => {
    const { auth } = usePage().props;
    const [fadeOut, setFadeOut] = useState(false);
    const { data, setData, post, processing, errors } = useForm({
        top_interests: [],
        business_owner: '',
        industries: [],
        annual_revenue: '',
        avatar_id: 3,

    });


    // const [showGlitchScreen , setGlitchScreen] = useState(false)


    const handleSubmit = (e) => {
        post(route('preference.store'), {
            preserveScroll: true,
            onBefore: () => {

            }
        })
    }


    // *** current Page ***
    const [currentPage, setCurrentPage] = useState(1)
    const [currentPageName, setCurrentPageName] = useState('interests')



    useEffect(() => {
        if (data?.business_owner != '') {
            if (data?.business_owner == 'YES') {
                setCurrentPage(currentPage)
                setCurrentPageName('businessIndustries')
            } else {
                setCurrentPage(4)
                setCurrentPageName('avatar')
            }
        }
    }, [data?.business_owner])


    const handleNextPage = (page) => {

        switch (page) {
            case 1:
                setCurrentPageName('interests')
                break;
            case 2:
                if (data?.top_interests.length > 0) {
                    setCurrentPage(page)
                    setCurrentPageName('businessOwner')
                } else {
                    // console.log('false')
                    ReactToast('error', 'Please select an interest');
                }
                break;
            case 3:
                if (data?.industries.length > 0) {
                    setCurrentPage(page)
                    setCurrentPageName('revenue')
                    // setCurrentPageName('businessOwner')
                } else {
                    // console.log('false')
                    ReactToast('error', 'Please select an industry');
                }
                break;
            case 4:
                if (data?.annual_revenue != '') {
                    setCurrentPage(page)
                    setCurrentPageName('avatar')
                    // setCurrentPageName('businessOwner')
                } else {
                    // console.log('false')
                    ReactToast('error', 'Please select revenue');
                }
                break;
            case 5:
                if (data?.avatar_id != '') {
                    handleSubmit()
                    //    setCurrentPage(page)
                    //     setCurrentPageName('avatar')
                } else {
                    // console.log('false')
                    ReactToast('error', 'Please select your Glitch');
                }
                break;


            default:
                break;
        }

    }

    // console.log(currentPage)
     // -----------------------------SCALE APPLY FOR HEIGHT RESIZE-------------------------------------------------------
     const [scaleFactor, setScaleFactor] = useState(1);

     useEffect(() => {


       const handleResize = () => {
           const desiredCardHeight = document.getElementById('checkout-container').offsetHeight +50;
         const screenHeight = window.innerHeight;
         const newScaleFactor = screenHeight < desiredCardHeight ? screenHeight / desiredCardHeight : 1;
         setScaleFactor(newScaleFactor);
       };

       // Initial calculation
       handleResize();

       window.addEventListener('resize', handleResize);

       return () => {
         window.removeEventListener('resize', handleResize);
       };
     }, []);

     const cardContainerStyle = {
       transform: `scale(${scaleFactor})`,
       transformOrigin: 'top center',
       height: `${100 * scaleFactor}%`,
     };
       // ----------------------------------SCALE APPLY FOR HEIGHT RESIZE------------------------------------------------------------

       const handleContextMenu = (e) => {
        e.preventDefault(); 
      };
      
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >

<Head>
    <title>On-Boarding</title>
</Head>


            <div onContextMenu={handleContextMenu} className="prefrence-layout-scroll" style={{ width: '100vw', transition: 'opacity 0.3s ease-in-out', }}>
                <Toast />
                <div>
                    {processing &&
                        <div className='  flex justify-center items-center' style={{ width: '100vw', height: '100vh', position: 'fixed' }}>
                            <Lottie
                                loop
                                animationData={LOADING}
                                play
                                className='h-[20px]  md:h-[50px]'
                            />
                        </div>
                    }

                    {!processing &&
                        <section className="md:my-4 lg:my-0 ">
                            <div className=" flex flex-col  min-h-[400px]   fixed w-full prefrence-layout-scroll" style={{ maxHeight: '-webkit-fill-available', justifyContent: 'space-between' }}>
                                <div id={'checkout-container'} style={cardContainerStyle}>
                                <div  className="w-full max-w-[600px] mx-auto" >







                                    <div className=" prefrerence-layout-mt  w-full flex justify-center">
                                        <Link href={route('welcome')}>   <img className="onboarding-logo object-cover" src={logo} alt="" /> </Link>
                                    </div>

                                    <div className="w-full flex flex-col items-center justify-between  ">

                                        <p className="welcome-text    welcome-paddeing " > WELCOME</p>

                                        <div className="flex text-center  font-40 uppercase font-bold mt-1">
                                            Glitch
                                            <svg className={'ml-3 mr-1 h-25vw mt-10vw'}  viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M12.3089 0.161621H16.7522V19.8788H12.3089V0.161621Z" fill="white"/>
                                                    <path d="M3.42232 0.161621H7.86563V19.8788H3.42232V0.161621Z" fill="white"/>
                                                    <path d="M19.807 11.8253V15.4355L0.0898438 15.4355L0.0898439 11.8253L19.807 11.8253Z" fill="white"/>
                                                    <path d="M19.807 4.04951V7.6597L0.0898438 7.6597L0.0898439 4.04951L19.807 4.04951Z" fill="white"/>
                                                </svg>
                                            {auth.user.id.toString().padStart(4, '0')}
                                        </div>
                                    </div>

                                    {/* ********* children ******** */}
                                    <section className="w-full flex justify-center items-start children mb-8 md:mb-7 preference-height-xs px-4" style={{ overflowY: 'hidden' }}>
                                        {/* {children} */}
                                        {currentPageName == 'interests' &&
                                            <TopInterest categories={categories} setData={setData} data={data} fadeOut={fadeOut} />
                                        }
                                        {currentPageName == 'businessOwner' &&
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ duration: 0.5 }}
                                                className="w-full flex justify-center"
                                            >
                                                <BusinessOwner setData={setData} data={data} fadeOut={fadeOut} />
                                            </motion.div>
                                        }
                                        {currentPageName == 'businessIndustries' &&
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ duration: 0.5 }}
                                                className="w-full flex justify-center"
                                            >
                                                <BusinessIndustry industries={industries} setData={setData} data={data} fadeOut={fadeOut} />
                                            </motion.div>
                                        }
                                        {currentPageName == 'revenue' &&
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ duration: 0.5 }}
                                                className="w-full flex justify-center"
                                            >
                                                <BusinessRevenue setData={setData} data={data} fadeOut={fadeOut} />
                                            </motion.div>
                                        }
                                        {currentPageName == 'avatar' &&
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ duration: 0.5 }}
                                                className="w-full flex justify-center"
                                            >
                                                <Identity avatars={avatars} setData={setData} data={data} fadeOut={fadeOut} />
                                            </motion.div>
                                        }




                                    </section>
                                </div>

                                <div className=" w-full ">
                                    <div className="container mx-auto  ">
                                        <div className="flex justify-center mb-[5vh] md:mb-[9vh] cursor-pointer ">

                                            <>
                                                {/* {Next Arrow Button */}
                                                {currentPageName != 'businessOwner' &&
                                                    <svg className={`  cursor-pointer mb-[1rem] w-[28px] md:w-[34px]`}
                                                        onClick={() => { handleNextPage(currentPage + 1) }} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <circle cx="14" cy="14" r="14" fill="white" />
                                                        <path d="M7 13.75H21.5" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M14.25 6.5L21.5 13.75L14.25 21" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                    // <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    // <circle cx="17" cy="17" r="17" fill="white"/>
                                                    // <path d="M8.5 16.6963H26.1072" stroke="black" strokeWidth="4" stroke-linecap="round" strokeLinejoin="round"/>
                                                    // <path d="M17.3027 7.89282L26.1063 16.6964L17.3027 25.5" stroke="black" strokeWidth="4" stroke-linecap="round" strokeLinejoin="round"/>
                                                    // </svg>
                                                    
                                                }
                                            </>


                                        </div>
                                    </div>
                                </div>


                                </div>


                            </div>
                        </section>
                    }

                    {/* <div className={` bg-white h-[10px] md:h-[20px]  mt-3 fixed bottom-0 z-[9999] `} style={{ width: progress + '%' }} ></div> */}
                </div>
            </div>




        </motion.div>
    );

}
PreferencesLayout.layout = (page) => <AppLayout children={page} title="" />;
export default PreferencesLayout;
