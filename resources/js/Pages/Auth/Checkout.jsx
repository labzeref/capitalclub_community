import { Link, useForm } from '@inertiajs/react';
import React from 'react'
import logo from "../../../assets/svg/logo.svg";
import Fingerprint from "../../../assets/svg/Fingerprint.svg";
const Checkout = () => {
    const { data, setData, post, processing, errors } = useForm({
        card_holder_name: "",
        card: "",
        cvc: "",
        expiry: "",
 
    });

  return (
                                            <div>
                                                    <div className="static z-[99999999] flex justify-between col-span-12 p-6   ">
                    <Link href={route('welcome')}>
                        <img className="h-7  lg:h-10 object-cover md:ml-10" src={logo} alt="" />
                    </Link>
                   <Link href={route('login')} className=" static z-[99999999] flex items-center justify-end md:mr-10">
                        <img className="h-6 w-6 object-cover " src={Fingerprint} alt="" />
                        <span className="text-base text-[#FFFFFF] font-normal uppercase ml-3">
                           Logout
                        </span>
                    </Link> 
                </div>
                                        <div className='w-full h-[90vh] flex justify-center items-center'>
                                            <h1>Subscribe Now</h1>

                                        <div className="grid grid-cols-12 gap-y-7">
                                        <div className="col-span-3 lg:col-span-3 mt-[1rem] mx-auto"> </div>
                                        <div className="col-span-6 lg:col-span-6 mt-[1rem] mx-auto">
                                        <div className="grid grid-cols-12 ">
                         
                                     
                                        <div className="col-span-12 lg:col-span-12 mt-[1rem]">
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    className=" input-text  w-full "
                                                    placeholder="Card holder name "
                                                    name="card_holder_name"
                                                    value={data.card_holder_name}
                                                    onChange={(e) =>
                                                        setData(
                                                            "card_holder_name",
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                                
                                            </div>
                                            {errors?.card_holder_name && (
                                                <p className="fs-tiny fw-regular mt-3 ml-5 danger-color ">
                                                    {errors?.card_holder_name} 
                                                </p>
                                            )}
                                        </div>

                                        <div className="col-span-12 lg:col-span-12   mt-[1rem]  ">
                                            <input
                                                type="text"
                                                name="card"
                                                value={data.card}
                                                onChange={(e) =>
                                                    setData(
                                                        "card",
                                                        e.target.value
                                                    )
                                                }
                                                className="input-text w-full   "
                                                placeholder="Card"
                                            />
                                            {  errors?.card   && (
                                                    <p className="fs-tiny fw-regular mt-2 lg:mt-3 text-center lg:ml-5">
                                                       {errors?.card}
                                                    </p>
                                                )}
                                        </div>


                                        <div className="col-span-6 lg:col-span-6  mt-[1rem]  ">
                                            <input
                                                type="text"
                                                name="cvc"
                                                value={data.cvc}
                                                onChange={(e) =>
                                                    setData(
                                                        "cvc",
                                                        e.target.value
                                                    )
                                                }
                                                className="input-text w-full   "
                                                placeholder="CVC"
                                            />
                                            {errors?.cvc && (
                                                    <p className="fs-tiny fw-regular mt-2 lg:mt-3 text-center lg:ml-5">
                                                       {errors?.cvc}
                                                    </p>
                                                )}
                                        </div>
                                        <div className="col-span-6 lg:col-span-6 lg:ml-[1rem] mt-[1rem]  ">
                                            <input
                                                type="text"
                                                name="expiry"
                                                value={data.expiry}
                                                onChange={(e) =>
                                                    setData(
                                                        "expiry",
                                                        e.target.value
                                                    )
                                                }
                                                className="input-text w-full   "
                                                placeholder="Expiry  "
                                            />
                                            {errors?.expiry && (
                                                    <p className="fs-tiny fw-regular mt-2 lg:mt-3 text-center lg:ml-5">
                                                       {errors?.expiry}
                                                    </p>
                                                )}
                                        </div>

                                        <div className="col-span-6 lg:col-span-6 lg:ml-[1rem] mt-[1rem] flex items-center gap-2 mt-6">
                                        <input
                                            id="default-checkbox"
                                            type="checkbox"
                                            checked={data.remember}
                                            value={data.remember}
                                            onChange={(e) => setData("remember", e.target.checked)}
                                            className={`w-5 h-5 rounded-[2px] text-[#3d3d3d] bg-[#3d3d3d] ${data?.remember
                                                ? "border-[2px] border-[#ffffff] ring-[2px] ring-[#ffffff] focus:outline-none"
                                                : "border-[2px] border-[#999999] ring-transparent focus:outline-transparent"
                                                }  focus:shadow-none focus:ring-transparent`}
                                        />

<div className="flex items-center">
                                        <p className="fs-regular fw-regular text-[#949494]">
                                        I agree to the   
                                        </p>
                                         
                                            <p className="fs-regular fw-regular underline underline-offset-4 px-1">
                                            Terms and Conditions
                                            </p>
                                        
                                    </div>
                                    </div>

                                        <div  className='col-span-12 lg:col-span-12 mt-[2rem] flex justify-center'>
                                            <div className='w-full'>

                                            <p className='fs-x-large fw-regular text-center'> $369/year </p>
                                            <p className='fs-regular fw-regular text-center text-[#fff] opacity-50 pt-2'> billed yearly </p>
                                            </div>
                                            
                                        </div>
                                        <div className="col-span-12 mt-[3rem]">
                                            <button className="button primary w-full">
                                                <div className="button_container glitch uppercase">
                                                    
                                                   pay now
                                                </div>
                                            </button>
                                        </div>
        
                                        </div>
                                        </div>
                                        <div className="col-span-3 lg:col-span-3 mt-[1rem] mx-auto"> </div>
                                         </div>
                                        </div>
                                        </div>
  )
}

export default Checkout