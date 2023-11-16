import React from 'react'
import Layout from '@/Layouts/Layout'

import Button from "../../Components/Button";
import { ReactComponent as Countinuebtn } from "../../../assets/svg/countinuebtn.svg";
import SessionLayout from '@/Layouts/SessionLayout';
const Poll = () => {

  return (
    <div>
    <div>
    <section className="mt-14 lg:mt-28 flex justify-center items-center">
      <div className="container mx-auto px-5 xl:px-0">
        <div className="min-h-[80vh] flex flex-col justify-between">
          <div className="grid grid-cols-12 flex items-center  ">
            <div className="col-span-12">
              <div className="text-center">
                <h1 className=" mb-8 lg:mb-8">Impactful Giving</h1>
              </div>
              <div className="text-center">
              <p className=" fw-regular fs-medium  text-[#FFFFFF]  mb-8 lg:mb-4">Quiz #1</p>
              </div>

              <div className="text-center containerSmall">
                <h3 className="    mb-8 lg:mb-6">
                  Which are the problem behaviours the child exhibit?
                </h3>
              </div>

              <div className="containerMedium mx-auto">
                <div className="text-center w-full">
                <p className="fs-regular fw-regular opacity-50 mb-6">
                    Result based on Community 372 votes
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center">
                  {/*  <!-- Component Start -->*/}
                  <form
                    className="w-full containerMedium mx-12 space-y-3 mb-5"
                    action=""
                  >
                    <div className="grid grid-cols-1 space-y-[24px] ">
                      <div className="flex w-full">
                      <div className="mb-2  fs-large fw-medium  ">50%</div>
                        <div className="w-full ml-[21px] ">
                          <div className="mb-2  fs-regular fw-regular  ">To learn some new</div>
                          <div className="w-full bg-[#ffffff10]  h-2 mb-4  ">
                            <div className="bg-white  h-2 w-[50%]"></div>
                          </div>{" "}
                        </div>
                      </div>
                      <div className="flex w-full">
                      <div className="mb-2  fs-large fw-medium  ">27%</div>
                        <div className="w-full ml-[21px] ">
                           <div className="mb-2  fs-regular fw-regular  ">To get better at something I do</div>
                          <div className="w-full bg-[#ffffff10]   h-2 mb-4  ">
                            <div className="bg-white  h-2 w-[27%]"></div>
                          </div>{" "}
                        </div>
                      </div>
                      <div className="flex w-full">
                      <div className="mb-2  fs-large fw-medium  ">23%</div>
                        <div className="w-full ml-[21px] ">
                           <div className="mb-2  fs-regular fw-regular  ">To brwse aroung!</div>
                          <div className="w-full bg-[#ffffff10]    h-2 mb-4  ">
                            <div className="bg-white  h-2 w-[23%]"></div>
                          </div>{" "}
                        </div>
                      </div>
                    </div>
                  </form>
                  {/*  <!-- Component End  -->*/}
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-4 justify-center flex pt-[3rem] ">
          <Button
          icon={<Countinuebtn />}
          className={"primary icon mt-[10px] uppercase "}
      >
          continue
      </Button>
          </div>
        </div>
      </div>
      {/*  <!-- container End -->*/}
    </section>


                {/* footer  */}
                <section className={'lesson-footer'}>
                <div className="grid grid-cols-12">
                    <div className="col-span-12">
                        <div className="flex items-center overflow-x-scroll lg:overflow-x-hidden pb-3 lg:pb-0">
                            <button className="bg-white h-[33px] w-full  px-4 flex items-center justify-center">
                                <p className="fw-medium text-[#000000] fs-tiny">
                                    Lesson 1
                                </p>
                            </button>
                            <button className="h-[33px] w-full px-4 flex items-center justify-center bg-[#1A1A1A]">
                                <p className="fw-medium fs-tiny">Lesson 2</p>
                            </button>
                            <button className="h-[33px] w-full px-4 flex items-center justify-center bg-black border-r-[1px] border-r-[#525252]">
                                <p className="fw-medium fs-tiny">Lesson 3</p>
                            </button>
                            <button className="h-[33px] w-full px-4 flex items-center justify-center bg-black border-r-[1px] border-r-[#525252]">
                                <p className="fw-medium fs-tiny">Lesson 4</p>
                            </button>
                            <button className="h-[33px] w-full px-4 flex items-center justify-center bg-black border-r-[1px] border-r-[#525252]">
                                <p className="fw-medium fs-tiny">Lesson 5</p>
                            </button>
                            <button className="h-[33px] w-full px-4 flex items-center justify-center bg-black border-r-[1px] border-r-[#525252]">
                                <p className="fw-medium fs-tiny">Lesson 6</p>
                            </button>

                            <button className="bg-white w-full h-[33px] px-4 flex items-center justify-center">
                                <p className="fw-medium text-[#000000] fs-tiny flex items-center gap-2">
                                    <span className="mt-1">
                                        <svg
                                            width="11"
                                            height="12"
                                            viewBox="0 0 11 12"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <g clipPath="url(#clip0_706_27378)">
                                                <path
                                                    opacity="0.2"
                                                    d="M5.625 8.75C7.90317 8.75 9.75 6.90317 9.75 4.625C9.75 2.34683 7.90317 0.5 5.625 0.5C3.34683 0.5 1.5 2.34683 1.5 4.625C1.5 6.90317 3.34683 8.75 5.625 8.75Z"
                                                    fill="black"
                                                />
                                                <path
                                                    d="M7.21875 1.21875C7.93835 1.55436 8.54711 2.08854 8.97339 2.75841C9.39967 3.42829 9.62575 4.20599 9.625 5C9.625 6.09402 9.1904 7.14323 8.41682 7.91682C7.64323 8.6904 6.59402 9.125 5.5 9.125C4.40598 9.125 3.35677 8.6904 2.58319 7.91682C1.8096 7.14323 1.375 6.09402 1.375 5C1.37426 4.20599 1.60033 3.42829 2.02661 2.75841C2.4529 2.08854 3.06166 1.55436 3.78125 1.21875"
                                                    stroke="black"
                                                    strokeOpacity="0.6"
                                                    strokeWidth="1.2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_706_27378">
                                                    <rect
                                                        width="11"
                                                        height="11"
                                                        fill="white"
                                                        transform="translate(0 0.5)"
                                                    />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </span>
                                    Customise progress
                                </p>
                            </button>
                        </div>
                    </div>
                </div>
            </section>
  </div>
    </div>
  )
}
Poll.layout = page => <SessionLayout children={page} title="" />
export default Poll
