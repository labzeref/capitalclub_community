
import { Link } from "@inertiajs/react";
import logo from "../../assets/svg/logo.svg";
import AppLayout from "./AppLayout";
import AOS from 'aos';
import { useEffect } from "react";
import Button from "@/Components/Button";
import errorsvg from '../../assets/svg/errorsvg.svg'


const ErrorLayout = ({ children, refresh = '', goHome = '', goSupport = '' }) => {
    useEffect(() => {
        AOS.init();
    }, []) 

    const handleContextMenu = (e) => {
        e.preventDefault(); 
      };
    return (

        <div onContextMenu={handleContextMenu} data-aos="fade-in" data-aos-delay="100" data-aos-easing="ease" data-aos-duration="300" className="flex justify-center pt-[4rem] md:pt-[6.4rem] h-[100vh]  ">
            <div className="flex justify-between items-center flex-col h-[85vh]">

                <div className="text-center flex justify-center">
                    <div>
                        <Link href={route('welcome')}>   <img className="h-9 object-cover" src={logo} alt="" /> </Link>
                    </div>
                </div>
                <div>

 
                    <img src={errorsvg} className="mx-auto h-[1.7rem] md:h-[2.2rem] mb-2" />
         
                    <section className="page container mx-auto px-5 xl:px-0">
                        {children}
                    </section>
                </div>
                <div className="w-full">
                    {refresh && <button onClick={() => window.location.reload()} className={" profile-buttons mx-auto bg-[#fff] text-black button primary pt-[2px] w-full max-w-[280px] md:max-w-[350px]"}>
                        REFRESH PAGE
                    </button>
                    }
                    {goSupport && <a
                        href="https://capitalclub1498.zendesk.com/hc/en-us"
                        target="_blank"
                        rel="noopener noreferrer"

                        className="flex justify-center w-full  ">
                        <button className={" profile-buttons  bg-[#fff] text-black button primary pt-[2px] w-full max-w-[280px] md:max-w-[350px]"}>
                        CONTACT SUPPORT
                        </button>
                    </a>
                    }
                    {goHome && <Link href={route('academy')} className="flex justify-center w-full  py-[0.45rem] ">
                        <button className={" profile-buttons  bg-[#fff] text-black button primary pt-[2px] w-full max-w-[280px] md:max-w-[350px] font-bold"}>
                            HOMEPAGE
                        </button>
                    </Link>
                    }

                </div>
            </div>
        </div>

    );

}
ErrorLayout.layout = (page) => <AppLayout children={page} title="" />;
export default ErrorLayout;
