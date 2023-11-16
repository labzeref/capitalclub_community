import { usePage } from '@inertiajs/react';
import React from 'react';
import leaf from "../../assets/svg/leaf.svg";

const Activity = ({classname,data}) => {

const auth = usePage()
const user = auth?.props?.auth?.user;
// console.log('data' , data)
  return (
    <div >
        <div className={classname}>
            <div className='py-3 hover:bg-[#1a1a1a] border-rounded-10  p-3  '>
                <div className="flex items-start gap-4">
                    <div className="relative">
                        <img
                            className="h-10 w-[40px] rounded-full object-cover object-center"
                            src={user.dp.small.url}
                            alt=""
                        />
                        <div className="-mt-4 ml-1">
                            <img
                                className="h-8 w-8"
                                src={leaf}
                                alt=""
                            />
                            <p className="fw-medium fs-tiny text-center mr-1">
                                9
                            </p>
                        </div>
                        {/* <div className="reply-left "></div> */}
                    </div>
                    <div className="w-full">
                        <div className='flex justify-between'>

                        <p className="fw-medium fs-small mb-2">
                            {user?.full_name}
                        </p>
                        <p className="fw-regular fs-tiny opacity-50 ">
                            { data?.time}
                             
                        </p>
                        </div>
                        <div className="fw-regular fs-tiny">
                            {/* {data?.description} */}
                            <div dangerouslySetInnerHTML={{__html: data?.description}} />
                        </div>
                        {/* <hr className="hidden md:block border-b border-b-[#FFFFFF1a] opacity-10 mt-4" /> */}
                    </div>
                </div>

            </div>
        </div>
    </div>
  )
}

export default Activity
