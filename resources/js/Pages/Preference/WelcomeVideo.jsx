import React from 'react'
import preimg from '../../../assets/img/pre-img.png';
import { ReactComponent as WELCOMEARROW } from "../../../assets/svg/WELCOMEARROW.svg";
import { useRef } from 'react';

import logo from "../../../assets/svg/logo.svg";
import IconButton from '@/Components/IconButton';
const WelcomeVideo = () => {



    const video_Ref_2 = useRef(null); 

    useEffect(() => {
        if (video_Ref_2.current) {
            video_Ref_2.current.play().catch(error => {
                console.error("Autoplay error:", error);
            });
        }

    }, []);
    const handleContextMenu = (e) => {
        e.preventDefault(); 
      };
  return (
    <div onContextMenu={handleContextMenu}> 
       <div  >
                    {/*  ********* intro video ***********8  */}
                    <div className=" absolute w-full z-[999999] mt-5    flex justify-center">
                        <div className='w-full absolute  z-70 flex justify-center'>

                            <Link href={route('welcome')}>     <img
                                className="max-h-[30px] lg:max-h-[40px]"
                                src={logo}
                                alt=""
                            />
                            </Link>
                        </div>
                    </div>
                    <div style={{ width: '100vw', height: '100vh', maxHeight:'-webkit-fill-available',  position: 'fixed' }}>

                        <div className='absolute z-[9999]   bottom-[20%] md:bottom-[10%]  flex justify-center w-full '>
                            <Link href={route('register')} className='absolute z-[9999]   bottom-[10%]  flex justify-center w-full '>
                            <IconButton
                                    disabled={processing}
                                    // onClick={(e) => { handleSubmit(e) }}
                                    icon={<WELCOMEARROW />}
                                    className={"primary icon md:mt-[32px] mt-[20px] uppercase"}
                                >

                                </IconButton>
                            </Link>
                        </div>

                        <video
                            ref={video_Ref_2}
                            preload='auto'
                            playsInline
                            loop
                            defaultmuted={'true'}
                            muted={showVideo2}
                            className=' background-video video tag intro'
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            poster={preimg}
                        >
                            <source src={preimg} type="image/png" />
                            <source src={video2} type="video/mp4" />

                        </video>
                    </div>
                </div>
                <div className="bg-white h-[10px] md:h-[20px]  mt-3 absolute bottom-0 z-[9999] w-[15%] "></div>
    </div>
  )
}

export default WelcomeVideo
