import React, { useState, useEffect } from "react";
import cross from "../../../assets/cross.png";
import art2 from "../../../assets/img/art2.jpg"
import Button from "../../Components/Button";
import { Link, useForm } from "@inertiajs/react";

export default function NotesModal({notes}) {
    const [showModal, setShowModal] = useState(false);
    useEffect(() => {
        if (showModal) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };

    }, [showModal]);
   


    const { data, setData, post, processing, errors } = useForm({
        defaultValues: {
          content: "",
        }
      });

      const [timer, setTimer] = useState(null);


      const handleKeyUp = ( id) => {

        console.log( 'id,................' , id)

        if (timer) {
          clearTimeout(timer);
        }

        setTimer(
          setTimeout(() => {
            post(route("lessons.notes.store" , id));
          }, 1000)
        );
      };

      useEffect(() => {
        return () => {
          clearTimeout(timer);
        };
      }, []);





    return (
        <>
            <div onClick={() => setShowModal(true)} className="">
                <Button
                    onClick={() => setShowModal(false)}
                    className={"primary mt-[18px] w-full uppercase"}
                >
                    View Notes
                </Button>
            </div>

            {showModal ? (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[999999] h-[calc(100%)] max-h-full">
                        <div className="relative   my-6 mx-auto  w-[95%] max-w-[740px] ">
                            {/*content*/}
                            <div className="  border-rounded-10  shadow-lg px-[13px] relative flex flex-col w-full bg-black outline-none focus:outline-none">
                                {/*header*/}
                                <div>
                                    <div className="flex items-start justify-between p-3 border-b border-gray-800 ">
                                        <p className="fw-medium fs-x-large">
                                            My Notes
                                        </p>

                                        <button
                                            className="p-1 ml-auto     float-right  "
                                            onClick={() => setShowModal(false)}
                                        >
                                            <img
                                                src={cross}
                                                className="   h-6 w-6  "
                                            />
                                        </button>
                                    </div>
                                </div>
                                {/*body*/}


                                <div className="relative pb-6 px-3 flex-auto">
                                <Link href={route('instructors.show',notes?.instructor?.id)}> <div className="modal-card px-3 paddingSectionXS">
                                    <div className="modal-img">
                                        <img src={notes?.instructor?.dp?.small?.url} className="border-rounded-10 w-[9rem] h-[6rem] object-cover   " alt='lesson video' />
                                    </div>
                                    <div className="py-3 md:py-5 ">
                                        <h5 className="px-2">
                                           {notes?.title}
                                        </h5>
                                        <p className="px-2">{notes?.instructor?.full_name}</p>
                                    </div>
                                </div> </Link>

                                    <div className="">
                                        <div className="bg-[#FFFFFF] border-rounded-10 p-6 overflow-y-auto h-[33.5rem]">
                                            {notes?.lessons?.map((data, index)=>(


                                            <div className="">
                                                <hr
                                                    className="opacity-20 border-none my-3"
                                                    style={{
                                                        borderTop:
                                                            "1px solid #000000",
                                                    }}
                                                />
                                                <div className="flex justify-between">
                                                    {/* <p className="fs-tiny fw-regular text-[#000000] opacity-50  ">
                                                    {index+1}. {data?.title}
                                                    </p> */}
                                                    <p className="text-[#000000] fs-small fw-medium mb-2 opacity-50">
                                                    {index+1}. {data?.title}
                                                </p>

                                                    <Link href={route('lessons.play',data?.id )}> 
                                                    <div className="flex cursor-pointer">
                                                        <p className="fs-tiny fw-regular text-[#000000] px-1 opacity-50 mb-1">
                                                            Play Lesson
                                                        </p>
                                                        <svg
                                                            width="16"
                                                            height="16"
                                                            viewBox="0 0 16 16"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <g clipPath="url(#clip0_829_49681)">
                                                                <path
                                                                    opacity="0.4"
                                                                    d="M4.5 2.49267V13.5077C4.50163 13.5956 4.52641 13.6815 4.57184 13.7567C4.61727 13.832 4.68174 13.894 4.75875 13.9364C4.83576 13.9788 4.92259 14.0001 5.01048 13.9983C5.09837 13.9964 5.18422 13.9714 5.25938 13.9258L14.2644 8.41829C14.3363 8.37476 14.3958 8.3134 14.4371 8.24015C14.4784 8.16691 14.5 8.08425 14.5 8.00017C14.5 7.91609 14.4784 7.83343 14.4371 7.76018C14.3958 7.68694 14.3363 7.62558 14.2644 7.58204L5.25938 2.07454C5.18422 2.02892 5.09837 2.00392 5.01048 2.00206C4.92259 2.00021 4.83576 2.02156 4.75875 2.06396C4.68174 2.10636 4.61727 2.16832 4.57184 2.24359C4.52641 2.31886 4.50163 2.40477 4.5 2.49267Z"
                                                                    fill="black"
                                                                />
                                                                <path
                                                                    d="M4.5 2.49267V13.5077C4.50163 13.5956 4.52641 13.6815 4.57184 13.7567C4.61727 13.832 4.68174 13.894 4.75875 13.9364C4.83576 13.9788 4.92259 14.0001 5.01048 13.9983C5.09837 13.9964 5.18422 13.9714 5.25938 13.9258L14.2644 8.41829C14.3363 8.37476 14.3958 8.3134 14.4371 8.24015C14.4784 8.16691 14.5 8.08425 14.5 8.00017C14.5 7.91609 14.4784 7.83343 14.4371 7.76018C14.3958 7.68694 14.3363 7.62558 14.2644 7.58204L5.25938 2.07454C5.18422 2.02892 5.09837 2.00392 5.01048 2.00206C4.92259 2.00021 4.83576 2.02156 4.75875 2.06396C4.68174 2.10636 4.61727 2.16832 4.57184 2.24359C4.52641 2.31886 4.50163 2.40477 4.5 2.49267Z"
                                                                    stroke="black"
                                                                    strokeWidth="1.2"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                />
                                                            </g>
                                                            <defs>
                                                                <clipPath id="clip0_829_49681">
                                                                    <rect
                                                                        width="16"
                                                                        height="16"
                                                                        fill="white"
                                                                    />
                                                                </clipPath>
                                                            </defs>
                                                        </svg>
                                                    </div>
                                                    </Link>

                                                </div>
                                                <hr
                                                    className="opacity-20 border-none mb-1"
                                                    style={{
                                                        borderTop:
                                                            "1px solid #000000",
                                                    }}
                                                />
                                                {/* <p className="text-[#000000] fs-small fw-medium mb-3">
                                                    {index+1}. {data?.title}
                                                </p> */}
                                                <textarea
                                               defaultValue={data?.note}
                                               onKeyUp={()=>handleKeyUp(data?.id)}
                                               onChange={(e)=> {setData("content", e.target.value )}}
                                                    className="w-full outline-none text-[#000000] border-0 outline-0 focus:outline-none focus:ring-0 focus:border-transparent border-transparent"
                                                    placeholder="Start writing..."
                                                    id=""
                                                    rows="5"
                                                ></textarea>
                                            </div>

))}
                                            {/* <div className="mt-6">
                                                <div className="flex justify-between">
                                                    <p className="fs-tiny fw-regular text-[#000000] opacity-50">
                                                        Lesson 2
                                                    </p>
                                                    <div className="flex cursor-pointer">
                                                        <p className="fs-tiny fw-regular text-[#000000] px-1 opacity-50 mb-1">
                                                            Play Lesson
                                                        </p>
                                                        <svg
                                                            width="16"
                                                            height="16"
                                                            viewBox="0 0 16 16"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <g clipPath="url(#clip0_829_49681)">
                                                                <path
                                                                    opacity="0.4"
                                                                    d="M4.5 2.49267V13.5077C4.50163 13.5956 4.52641 13.6815 4.57184 13.7567C4.61727 13.832 4.68174 13.894 4.75875 13.9364C4.83576 13.9788 4.92259 14.0001 5.01048 13.9983C5.09837 13.9964 5.18422 13.9714 5.25938 13.9258L14.2644 8.41829C14.3363 8.37476 14.3958 8.3134 14.4371 8.24015C14.4784 8.16691 14.5 8.08425 14.5 8.00017C14.5 7.91609 14.4784 7.83343 14.4371 7.76018C14.3958 7.68694 14.3363 7.62558 14.2644 7.58204L5.25938 2.07454C5.18422 2.02892 5.09837 2.00392 5.01048 2.00206C4.92259 2.00021 4.83576 2.02156 4.75875 2.06396C4.68174 2.10636 4.61727 2.16832 4.57184 2.24359C4.52641 2.31886 4.50163 2.40477 4.5 2.49267Z"
                                                                    fill="black"
                                                                />
                                                                <path
                                                                    d="M4.5 2.49267V13.5077C4.50163 13.5956 4.52641 13.6815 4.57184 13.7567C4.61727 13.832 4.68174 13.894 4.75875 13.9364C4.83576 13.9788 4.92259 14.0001 5.01048 13.9983C5.09837 13.9964 5.18422 13.9714 5.25938 13.9258L14.2644 8.41829C14.3363 8.37476 14.3958 8.3134 14.4371 8.24015C14.4784 8.16691 14.5 8.08425 14.5 8.00017C14.5 7.91609 14.4784 7.83343 14.4371 7.76018C14.3958 7.68694 14.3363 7.62558 14.2644 7.58204L5.25938 2.07454C5.18422 2.02892 5.09837 2.00392 5.01048 2.00206C4.92259 2.00021 4.83576 2.02156 4.75875 2.06396C4.68174 2.10636 4.61727 2.16832 4.57184 2.24359C4.52641 2.31886 4.50163 2.40477 4.5 2.49267Z"
                                                                    stroke="black"
                                                                    strokeWidth="1.2"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                />
                                                            </g>
                                                            <defs>
                                                                <clipPath id="clip0_829_49681">
                                                                    <rect
                                                                        width="16"
                                                                        height="16"
                                                                        fill="white"
                                                                    />
                                                                </clipPath>
                                                            </defs>
                                                        </svg>
                                                    </div>
                                                </div>
                                                <hr
                                                    className="opacity-20 border-none mb-3"
                                                    style={{
                                                        borderTop:
                                                            "1px solid #000000",
                                                    }}
                                                />
                                                <p className="text-[#000000] fs-small fw-medium mb-3">
                                                    2. Impactful Giving
                                                </p>
                                                <textarea
                                                    className="w-full outline-none text-[#000000] border-0 outline-0 focus:outline-none focus:ring-0 focus:border-transparent border-transparent"
                                                    placeholder="Start writing..."
                                                    id=""
                                                    rows="5"
                                                ></textarea>
                                            </div> */}
                                            {/* <div className="mt-6">
                                                <div className="flex justify-between">
                                                    <p className="fs-tiny fw-regular text-[#000000] opacity-50">
                                                        Lesson 3
                                                    </p>
                                                    <div className="flex cursor-pointer">
                                                        <p className="fs-tiny fw-regular text-[#000000] px-1 opacity-50 mb-1">
                                                            Play Lesson
                                                        </p>
                                                        <svg
                                                            width="16"
                                                            height="16"
                                                            viewBox="0 0 16 16"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <g clipPath="url(#clip0_829_49681)">
                                                                <path
                                                                    opacity="0.4"
                                                                    d="M4.5 2.49267V13.5077C4.50163 13.5956 4.52641 13.6815 4.57184 13.7567C4.61727 13.832 4.68174 13.894 4.75875 13.9364C4.83576 13.9788 4.92259 14.0001 5.01048 13.9983C5.09837 13.9964 5.18422 13.9714 5.25938 13.9258L14.2644 8.41829C14.3363 8.37476 14.3958 8.3134 14.4371 8.24015C14.4784 8.16691 14.5 8.08425 14.5 8.00017C14.5 7.91609 14.4784 7.83343 14.4371 7.76018C14.3958 7.68694 14.3363 7.62558 14.2644 7.58204L5.25938 2.07454C5.18422 2.02892 5.09837 2.00392 5.01048 2.00206C4.92259 2.00021 4.83576 2.02156 4.75875 2.06396C4.68174 2.10636 4.61727 2.16832 4.57184 2.24359C4.52641 2.31886 4.50163 2.40477 4.5 2.49267Z"
                                                                    fill="black"
                                                                />
                                                                <path
                                                                    d="M4.5 2.49267V13.5077C4.50163 13.5956 4.52641 13.6815 4.57184 13.7567C4.61727 13.832 4.68174 13.894 4.75875 13.9364C4.83576 13.9788 4.92259 14.0001 5.01048 13.9983C5.09837 13.9964 5.18422 13.9714 5.25938 13.9258L14.2644 8.41829C14.3363 8.37476 14.3958 8.3134 14.4371 8.24015C14.4784 8.16691 14.5 8.08425 14.5 8.00017C14.5 7.91609 14.4784 7.83343 14.4371 7.76018C14.3958 7.68694 14.3363 7.62558 14.2644 7.58204L5.25938 2.07454C5.18422 2.02892 5.09837 2.00392 5.01048 2.00206C4.92259 2.00021 4.83576 2.02156 4.75875 2.06396C4.68174 2.10636 4.61727 2.16832 4.57184 2.24359C4.52641 2.31886 4.50163 2.40477 4.5 2.49267Z"
                                                                    stroke="black"
                                                                    strokeWidth="1.2"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                />
                                                            </g>
                                                            <defs>
                                                                <clipPath id="clip0_829_49681">
                                                                    <rect
                                                                        width="16"
                                                                        height="16"
                                                                        fill="white"
                                                                    />
                                                                </clipPath>
                                                            </defs>
                                                        </svg>
                                                    </div>
                                                </div>
                                                <hr
                                                    className="opacity-20 border-none mb-3"
                                                    style={{
                                                        borderTop:
                                                            "1px solid #000000",
                                                    }}
                                                />
                                                <p className="text-[#000000] fs-small fw-medium mb-3">
                                                    3. Sources of Inspiration
                                                </p>
                                                <textarea
                                                    className="w-full outline-none text-[#000000] border-0 outline-0 focus:outline-none focus:ring-0 focus:border-transparent border-transparent"
                                                    placeholder="Start writing..."
                                                    id=""
                                                    rows="5"
                                                ></textarea>
                                            </div> */}

                                        </div>
                                    </div>
                                </div>
                                {/*footer*/}
                                {/* <div className="flex items-center justify-center p-6 space-x-3 ">

                </div> */}
                            </div>
                        </div>
                    </div>
                    <div className="backdrop-blur-lg bg-black/30 fixed inset-0 z-40 noise-10 "></div>
                </>
            ) : null}
        </>
    );
}
