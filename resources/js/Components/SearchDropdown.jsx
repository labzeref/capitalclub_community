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
const SearchDropdown = ({ setOpenSearchDropDown, openSearchDropDown }) => {






  useEffect(() => {
    if (openSearchDropDown) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [openSearchDropDown]);
  return (
    <>
      <AnimatePresence>
        {openSearchDropDown &&
          <div className={` w-[26rem] absolute z-[99999] } `}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >

              <div className="   flex justify-center">


                <div className="fixed md:absolute right-0 -mt-10 md:-mt-6 lg:-mt-8 md:-mr-3 lg:-mr-3 bg-[#121212] border-rounded-17 shadow-lg overflow-hidden z-20 w-full  pt-[7px] pb-[20px] px-2"  >
                  <div className=" ">

                    <div className="   flex flex-col text-left   w-full text-base cursor-pointer ">

                      <div className="flex justify-between">
                        <p className="fw-bold text-[13px] leading-[25px] uppercase pt-[22px] text-center w-full">SEARCH</p>
                        <div onClick={() => {
                          setOpenMobileMenu(false)
                        }} className="  fw-regular text-[#fff] flex">

                          <span onClick={() => { setOpenSearchDropDown(false) }} >
                            <Xmark />

                          </span>
                        </div>
                      </div>

                    </div>



                    <div className='flex items-center bg-[#1A1A1A] rounded-full w-full input-shadow py-3 px-4 mt-5'>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.1276 9.87919H10.4693L10.2359 9.65419C11.0526 8.70419 11.5443 7.47086 11.5443 6.12919C11.5443 3.13752 9.11927 0.712524 6.1276 0.712524C3.13594 0.712524 0.710938 3.13752 0.710938 6.12919C0.710938 9.12086 3.13594 11.5459 6.1276 11.5459C7.46927 11.5459 8.7026 11.0542 9.6526 10.2375L9.8776 10.4709V11.1292L14.0443 15.2875L15.2859 14.0459L11.1276 9.87919ZM6.1276 9.87919C4.0526 9.87919 2.3776 8.20419 2.3776 6.12919C2.3776 4.05419 4.0526 2.37919 6.1276 2.37919C8.2026 2.37919 9.8776 4.05419 9.8776 6.12919C9.8776 8.20419 8.2026 9.87919 6.1276 9.87919Z" fill="white" />
                      </svg>

                      <input type="text" className='w-full border-0 bg-transparent h-4 academy-search fw-medium text-[10px] leadding-[10px]' placeholder='Search Courses, Series, Topics, Experts and more' />

                    </div>


                  </div>

                </div>

              </div>

            </motion.div>
          </div>
        }
      </AnimatePresence>


      <AnimatePresence>
        {openSearchDropDown &&
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="backdrop-blur-[2px] bg-black/10  fixed inset-0  z-[999]"
          >
            <div onClick={() => { setOpenSearchDropDown(false) }} className="fixed inset-0     "></div>
          </motion.div>
        }
      </AnimatePresence>
    </>
  )
}

export default SearchDropdown
