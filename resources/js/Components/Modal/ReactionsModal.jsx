import React, { useMemo, useState, useEffect } from "react";
import cross from "../../../assets/cross.png";
import enola from "../../../assets/img/enola.png";
import design2 from "../../../assets/img/design2.png";
import emily from "../../../assets/img/emily.png";
import design3 from "../../../assets/img/design3.png";
import plus from "../../../assets/svg/Plus.svg";
import OwlCarousel from "react-owl-carousel";
import Button from "../../Components/Button";
import emojis from '../../Components/Emojis.json'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useForm } from "@inertiajs/react";
// import { ReactComponent as Plus } from "../../../assets/svg/Plus.svg";
import { ReactComponent as Continuebtn } from "../../../assets/svg/countinuebtn.svg";
import axios from "axios";
const ReactionsModal = ({ postId, openReactionModal, setOpenReactionModal ,type }) => {
    useEffect(() => {
        AOS.init();
    }, [])
// console.log( 'postId',  postId)
    const [showModal, setShowModal] = useState(true);
    const [tabSwitch, setTabSwitch] = useState(0);

    const [userReactionData, setUserReactionData] = useState([])

    const [allReactions, setAllReactions] = useState([])
 
    const getReactionUsers = async () => {
        try {
            if (type=='post') {
                const response = await axios.get(route("posts.reactions", postId));
                setAllReactions(response.data?.payload)
                // console.log("fetching all reaction successfully:", response.data?.payload);
                setUserReactionData(response.data?.payload) 
            } else if(type=='threadComment') {
                const response = await axios.get(route("thread-comments.reactions", postId));
                setAllReactions(response.data?.payload)
                // console.log("fetching all reaction successfully:", response.data?.payload);
                setUserReactionData(response.data?.payload) 
            }else if(type== 'postComment' ){
                const response = await axios.get(route("post-comments.reactions", postId));
                setAllReactions(response.data?.payload)
                // console.log("fetching all reaction successfully:", response.data?.payload);
                setUserReactionData(response.data?.payload) 
            }
           
        } catch (error) {   
            // ReactToast('error', error?.response?.data?.payload)
            console.error("Error while   reactions:", error);
        }
    };

    const thumbup = allReactions.filter(item => item.value === "thumbs-up")
    const redHeart = allReactions.filter(item => item.value === "red-heart")
    const clappingHands = allReactions.filter(item => item.value === "clapping-hands")
    const lightBulb = allReactions.filter(item => item.value === "light-bulb")
    const smilingFaceWithWunglasses = allReactions.filter(item => item.value === "smiling-face-with-sunglasses") 

    useEffect(() => {
        getReactionUsers()
    }, [])


    //  const tabData=()=>{
    //  if (tabSwitch==0) {
    //     setUserReactionData(userReactionData)
    //  }
    //    else if (tabSwitch==1) {
    //         setUserReactionData(userReactionData.filter(item => item.value === "red-heart"))
    //     } else if(tabSwitch==2) {
    //         setUserReactionData
    //     }
    //  }

 

    useEffect(() => {
        switch (tabSwitch) {
            case 0:
                setUserReactionData(allReactions);
                break;
            case 1:
                setUserReactionData(allReactions.filter(item => item.value === "thumbs-up"));
                break;
            case 2:
                setUserReactionData(allReactions.filter(item => item.value === "red-heart"));
                break;
            case 3:
                setUserReactionData(allReactions.filter(item => item.value === "clapping-hands"));
                break;
            case 4:
                setUserReactionData(allReactions.filter(item => item.value === "light-bulb"));
                break;
            case 5:
                setUserReactionData(allReactions.filter(item => item.value === "smiling-face-with-sunglasses"));
                break;

            default:
                // If tabSwitch doesn't match any case, set userReactionData to an empty array
                getReactionUsers()
                break;
        }
    }, [tabSwitch])




    useEffect(() => {
        if (showModal) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [showModal]);
    const { data, setData, handleSubmit, errors } = useForm({
        category: [],
    });








    return (
        <div>
            {/* <!-- Modal toggle --> */}
            {/* <div
                onClick={() => {
                    setShowModal(true);
                }}
            >
                reactions

            </div> */}

            {/* <!-- Main modal --> */}
            <div
                id="defaultModal"
                tabIndex="-1"
                aria-hidden="true"

                className={` ${showModal
                    ? " block"
                    : "hidden transition-all duration-300 ease-out"
                    } justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[999999] h-[calc(100%)] max-h-full`}
            >
                <div className={` ${showModal
                    ? " transition-all duration-300 ease-out"
                    : "-translate-y-[1000rem] transition-all duration-300 ease-out"
                    } relative w-full max-w-[40rem] max-h-full z-50 `}>
                    {/* <!-- Modal content --> */}
                    <div className="relative rounded-md px-3 mx-2 shadow bg-black  my-[4rem]">
                        {/* <!-- Modal header --> */}
                        <div data-aos="fade-in" data-aos-delay="100" data-aos-easing="ease" data-aos-duration="300" className="flex items-start justify-between pt-5 px-5  ">
                            {/* <p className="fw-medium fs-x-large">Add Filter</p> */}

                            <button
                                className="p-1 ml-auto     float-right  "
                                onClick={() => { setOpenReactionModal(false) }}
                            >
                                <img src={cross} className="   h-6 w-6  " />
                            </button>
                        </div>
                        {/* <!-- Modal body --> */}
                        <div className="px-6 pb-6  md:space-y-6">
                            <div className=" ">

                                <div className="flex gap-x-[0.75rem]  md:gap-x-[1.3rem] ">
                                    <button onClick={() => { setTabSwitch(0) }} className={` ${tabSwitch == 0 && 'active'} reactions-tab  gap-x-[0.5rem]`}> <p>All {allReactions?.length}</p> </button>
                                    <button onClick={() => { setTabSwitch(1) }} className={` ${tabSwitch == 1 && 'active'} reactions-tab  gap-x-[0.5rem] `}>{emojis[0]?.emoji} <p  > {thumbup?.length}</p> </button>
                                    <button onClick={() => { setTabSwitch(2) }} className={` ${tabSwitch == 2 && 'active'} reactions-tab  gap-x-[0.5rem] `}>{emojis[1]?.emoji} <p  > {redHeart?.length}</p></button>
                                    <button onClick={() => { setTabSwitch(3) }} className={` ${tabSwitch == 3 && 'active'} reactions-tab  gap-x-[0.5rem] `}>{emojis[2]?.emoji} <p  > {clappingHands?.length}</p></button>
                                    <button onClick={() => { setTabSwitch(4) }} className={` ${tabSwitch == 4 && 'active'} reactions-tab  gap-x-[0.5rem] `}>{emojis[3]?.emoji} <p  > {lightBulb?.length}</p></button>
                                    <button onClick={() => { setTabSwitch(5) }} className={` ${tabSwitch == 5 && 'active'} reactions-tab  gap-x-[0.5rem] `}>{emojis[4]?.emoji} <p  > {smilingFaceWithWunglasses?.length}</p></button>

                                </div>

                            </div>
                            <div className="">


                                {userReactionData?.map((data, index) => (
                                    <div className='py-3 hover:bg-[#1a1a1a] border-rounded-10  p-3  '>
                                        <div className="flex items-start gap-4">
                                            <div className="relative">
                                                <img
                                                    className="h-10 w-[40px] rounded-full object-cover object-center"
                                                    src={data?.user?.dp}
                                                    alt=""
                                                />
                                                <div className="-mt-4 ml-1">
                                                    {/* <img
                                                    className="h-8 w-8"
                                                    src={leaf}
                                                    alt=""
                                                /> */}
                                                    {/* <p className="fw-medium fs-tiny text-center mr-1">
                                                    9
                                                </p> */}
                                                </div>
                                            </div>
                                            <div className="w-full">
                                                <div className='flex justify-between'>

                                                    <p className="fw-medium fs-small mb-2">
                                                        {data?.user?.full_name}

                                                    </p>
                                                </div>
                                                <div className="fw-regular fs-tiny">
                                                    <p className="fw-regular fs-tiny opacity-50 ">
                                                        {/* {data?.time} */}
                                                        10 hours ago

                                                    </p>
                                                </div>
                                                {/* <hr className="hidden md:block border-b border-b-[#FFFFFF1a] opacity-10 mt-4" /> */}
                                            </div>
                                        </div>

                                    </div>
                                ))}


                            </div>
                        </div>
                        {/* <!-- Modal footer --> */}
                    </div>
                </div>
                <div data-aos="fade-in" data-aos-delay="100" data-aos-easing="ease" data-aos-duration="300" className="backdrop-blur-lg bg-black/30 fixed inset-0 z-40 textarea-bg"></div>
            </div>
        </div>
    );
};

export default ReactionsModal;
