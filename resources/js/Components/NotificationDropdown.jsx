import React from 'react'
import { Head, Link, usePage } from '@inertiajs/react';
import ToastNotification from './ToastNotification';
import { useState } from 'react';
import axios from 'axios';
import { PostsContext } from '../Store/PostsProvider';
import { useContext } from 'react';
import ReactToast from './ReactToast';
import { useEffect } from 'react';
import { AnimatePresence, motion } from "framer-motion"
import Xmark from './Xmark';
const NotificationDropdown = ({ setOpenDropDownNotification, openDropDownNotification , setShowBlink , showBlink }) => {
  const { toastNotify } = useContext(PostsContext);

  // notifications.index

  const { auth } = usePage().props;
  useEffect(() => {


    Echo.private(`App.Models.User.${auth.user.id}`)
      .notification((notification) => {
        // console.log("notification")
        // console.log(notification)
        // ReactToast('success', notification?.title)
        setShowBlink(true)
        refreshNotificationList()
        // toastNotify(notification)
      })
      
    }, [])
 
 
    const [allNotificatios, setAllNotifications] = useState([])
    
  useEffect(() => {
    refreshNotificationList() 
  }, [])

  useEffect(() => {
    
    const unreadNotification = allNotificatios.find((data)=>data?.read == null )
 if (unreadNotification) {
  setShowBlink(true)
 } else {
  setShowBlink(false)
 } 
  }, [allNotificatios])

  const refreshNotificationList = async () => {
    try {
      const response = await axios.get(route("notifications.index"));
      // console.log(" getting all notifications successfully:", response.data?.payload);
      setAllNotifications(response.data?.payload)
    } catch (error) {
      console.error("Error while getting notifications:", error);
    }
  };




  const clearNotificationList = async () => {
    try {
      const response = await axios.post(route("notifications.clear"));
      setShowBlink(false)
      refreshNotificationList();

    } catch (error) {
      console.error("Error while getting notifications:", error);
    }
  };



 

  const [openMobileMenu, setOpenMobileMenu] = useState(false)
  // console.log("listner", `App.Models.User.${auth.user.id}`)

  useEffect(() => {
    if (openDropDownNotification) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [openDropDownNotification]);
  return (
    <>





      {/* <div
                                className={` fixed top-0   w-full bg-[#121212] border-rounded-15       ${openMobileMenu ? 'right-0     z-40  ' : ' right-full  opacity-0'}
                 transition-all duration-300 z-[100] `}>
                                <ul className="flex flex-col text-left   w-full text-base cursor-pointer px-5 py-5 ">
                                  </ul></div> */}

      <AnimatePresence>
        {openDropDownNotification &&
          <div className={` w-[26rem] absolute z-[99999] } `}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >


              <div className="   flex justify-center">


                <div className="fixed md:absolute right-0 -mt-10 md:-mt-6 lg:-mt-8 md:-mr-3 lg:-mr-3 bg-[#121212] border-rounded-17 shadow-lg overflow-hidden z-20 w-full  pt-[8px] pb-[14px] px-[12px]"  >
                  <div className=" ">

                    <ul className="   flex flex-col text-left   w-full text-base cursor-pointer ">
                      <li className="pb-2 ">
                        <div className="flex justify-between">
                          <p className="fw-bold text-18 uppercase pt-1">NOTIFICATIONS</p>
                          <div onClick={() => {
                            setOpenMobileMenu(false)
                          }}
                            className="text-[1.25rem] fw-regular text-[#fff] flex items-center"
                          >

                            <span onClick={() => { setOpenDropDownNotification(false) }} className="ml-2">
                              <Xmark />

                            </span>
                          </div>
                        </div>
                      </li>
                    </ul>



                    <div className='max-h-[17rem] overflow-y-auto '>

                      {allNotificatios?.length > 0 ? <>
                        {allNotificatios?.map((data, index) => (
                          <React.Fragment key={index + 3}>
                            <li className="notification-click pr-1.5 pl-4 flex justify-between  items-center mt-1 mb-2 bg-[#1A1A1A] dropdown-shadow border-rounded-10 py-[9px] uppercase w-full text-center text-10 fw-semibold ">
                              <div className='flex gap-x-2.5'>

                                <img className="h-[22px] w-[22px]   object-cover mx-1" src={data?.iconUrl} alt="avatar" />

                                <p className='font-size-10 fw-semibold py-1'>{data?.title}</p>
                              </div>
                             
                             <a href={data?.link} target='_blank' > <svg width="24" height="24" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20 10C20 4.48 15.52 0 10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10ZM10 12.79V11H7C6.45 11 6 10.55 6 10C6 9.45 6.45 9 7 9H10V7.21C10 6.76 10.54 6.54 10.85 6.86L13.64 9.65C13.84 9.85 13.84 10.16 13.64 10.36L10.85 13.15C10.54 13.46 10 13.24 10 12.79Z" fill="#EBEBEB" />
                              </svg></a>
                            </li>
                          </React.Fragment>
                        ))}
                      </>
                        :
                        <p className='font-size-14 text-center py-4 opacity-50'>No Notifications</p>
                      }

                    </div>

                    {allNotificatios?.length > 0 && <>

                      <div>
                        <div onClick={() => { clearNotificationList() }} className="  cursor-pointer   w-full text-center  mt-[10%] ">
                          <p className="notification-btn flex justify-center border-rounded-10 bg-white text-black py-3 font-size-12 fw-bold uppercase" >    CLEAR NOTIFICATIONS
                          </p>
                        </div>
                      </div>
                    </>
                    }
                  </div>

                </div>

              </div>

            </motion.div>
          </div>
        }
      </AnimatePresence>


      <AnimatePresence>
        {openDropDownNotification &&
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="backdrop-blur-[2px] bg-black/10  fixed inset-0  z-[999]"
          >
            <div onClick={() => { setOpenDropDownNotification(false) }} className="fixed inset-0     "></div>
          </motion.div>
        }
      </AnimatePresence>
    </>
  )
}

export default NotificationDropdown
