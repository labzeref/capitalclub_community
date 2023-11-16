import React, { useState, useEffect, useRef } from "react";
import Layout from "@/Layouts/Layout";
import Noise20 from "../../../assets/Noise200.webp";
import Noise10 from "../../../assets/Noise10.webp";

import OwlCarousel from "react-owl-carousel";
import profilepic from "../../../assets/img/profilepic.png"; emptyChat
import enola from "../../../assets/img/enola.png";
import siyan from "../../../assets/img/siyan.png";
import emily from "../../../assets/img/emily.png";
import top50 from "../../../assets/svg/top50.svg";
import SessionLayout from "@/Layouts/SessionLayout";
import emojis from '../../Components/Emojis.json';
import emptyChat from "../../../assets/svg/emptyChat.svg";
import { motion } from "framer-motion"
import {Head, Link, usePage} from "@inertiajs/react";
import EmojiPicker, {
    EmojiStyle,

    Emoji,

} from "emoji-picker-react";
import axios from "axios";
const Chat = ({activeConversationId, activeConversation}) => {
    const auth = usePage()
    const user = auth?.props?.auth?.user;

 

const [previousAllChats , setPreviousAllChats ] = useState([])
// console.log( 'previousAllChats' , previousAllChats)
    const handleGetAllChats = async () => {
        try {
            const response = await axios.get(route("conversations.index"));
            setPreviousAllChats(response.data?.payload.data)

        } catch (error) {
            console.error("error user all chats :", error);
        }
    };
useEffect(()=>{
    handleGetAllChats()
    handleGetSingleUserMessages()
    // getConversationData();
    // handleGetSingleUserChat()
},[ ])

const [singleUserChats , setSingleUserChats ] = useState({})

const handleGetSingleUserChat = async () => {
    try {
        const response = await axios.post(route("conversations.store"),{
            user_id : 2,
        });
        setSingleUserChats(response.data?.payload?.data)

    } catch (error) {
        console.error("Error single user chat   :", error);
    }
};



const [currentSelectedUser, setCurrentSelectedUser] = useState(null);
const [currentConversation, setcurrentConversation] = useState(null);
const [singleUserMessages , setSingleUserMessages ] = useState([])
const lastIndex = singleUserMessages?.length -1 ;
// console.log('singleUserMessages' , singleUserMessages)
const handleGetSingleUserMessages = async () => {
    try {
        const response = await axios.get(route("conversations.messages.index",activeConversationId));
        setSingleUserMessages(response.data?.payload?.data)
        setCurrentSelectedUser(response.data?.payload?.data)
    } catch (error) {
        console.error("Error while getting single user messages   :", error);
    }
};
// const getConversationData = async () => {
//     try {
//         const response = await axios.post(route("conversation.data"),{conversation_id:activeConversationId});
//         setCurrentSelectedUser(response.data?.payload?.opponent)
//         setcurrentConversation(response.data?.payload?.conversation)
//     } catch (error) {
//         console.error("Error while getting single user messages   :", error);
//     }
// };




const [message, setMessage] = useState("");

const handleSendMessages = async () => {
    try {
      const response = await axios.post(
        route("conversations.messages.store", activeConversationId),
        {value: message}
      );
      const newMessage = response?.data?.payload;
      setSingleUserMessages((prevMessages) => [...prevMessages, newMessage]);
      console.log("Message sent successfully:", response?.data);
    } catch (error) {
      console.error("Error while sending messages:", error);
    }
  };

    // console.log('currentSelectedUser' , currentSelectedUser)

// console.log('single User Message   ***************' , singleUserMessages)

const [newMsg , setNewMsg] = useState()

useEffect(()=>{
    Echo.private(`message-sent.${user.id}`)
        .listen('.message-sent', (event) => {
            console.log("event", event);
            setNewMsg(event.message)
            handleGetAllChats()
            // console.log('event.message' , event.message)
            // console.log( 'event echo is ******************',event.message);
            // console.log('old singleUserMessages is  **************** ' , singleUserMessages )

        })
},[])

useEffect(() => {
    if(newMsg?.conversation_id === activeConversation?.id){

        setSingleUserMessages(prevMessages => [...prevMessages, newMsg]);
       }
}, [newMsg])

    // console.log('new singleUserMessages is  **************** ' , singleUserMessages )

    const onlineUser = [
        {
            id: 1,
            img: emily,
            name: "Emily",
        },
        {
            id: 2,
            img: enola,
            name: "Enola",
        },
        {
            id: 3,
            img: siyan,
            name: "Siyan",
        },

        {
            id: 4,
            img: profilepic,
            name: "Arik",
        },
        {
            id: 5,
            img: emily,
            name: "Green",
        },
        {
            id: 6,
            img: enola,
            name: "Enola",
        },
        {
            id: 7,
            img: siyan,
            name: "Siyan",
        },
        {
            id: 8,
            img: siyan,
            name: "Siyan",
        },
    ];

    // const [currentUser, setCurrentUser] = useState(null);
    // const [selectedUser, setSelectedUser] = useState(null);




  const [selectedEmoji, setSelectedEmoji] = useState(null);

    const handleEmojiClick = (emoji) => {
        setSelectedEmoji(emoji);
    };
    return (
        <div>
            <section className="pt-[5rem] md:pt-[6.7rem] ">
            <Head title="Chat"/>
                <div   className="  container mx-auto md:px-4 lg:px-0">
                    <div className="grid grid-cols-12 md:mx-2 inset-border border-rounded-10">
                        <div className="col-span-12 lg:col-span-3  ">
                            <div
                                className={`  lg:border-r-[1px] rounded-l-[10px] border-[#ffffff1a] h-full noise-10   `}
                            >
                                <div
                                    className={` ${currentSelectedUser
                                        ? "hidden md:block"
                                        : " block "
                                        } `}
                                >
                                    <div
                                        className={` flex  items-center justify-between py-6 px-4 `}
                                    >
                                        <h5>Message</h5>
                                        <div>
                                            <svg
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <g clipPath="url(#clip0_829_48764)">
                                                    <path
                                                        opacity="0.4"
                                                        d="M10.5 18C14.6421 18 18 14.6421 18 10.5C18 6.35786 14.6421 3 10.5 3C6.35786 3 3 6.35786 3 10.5C3 14.6421 6.35786 18 10.5 18Z"
                                                        fill="white"
                                                    />
                                                    <path
                                                        d="M10.5 18C14.6421 18 18 14.6421 18 10.5C18 6.35786 14.6421 3 10.5 3C6.35786 3 3 6.35786 3 10.5C3 14.6421 6.35786 18 10.5 18Z"
                                                        stroke="white"
                                                        strokeWidth="1.2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                    <path
                                                        d="M15.8047 15.8027L21.0012 20.9993"
                                                        stroke="white"
                                                        strokeWidth="1.2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_829_48764">
                                                        <rect
                                                            width="24"
                                                            height="24"
                                                            fill="white"
                                                        />
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div

                                    className={` ${currentSelectedUser
                                        ? "hidden md:block  "
                                        : " block "
                                        } flex items-center gap-4 overflow-x-scroll scroll-width pl-6 mt-3`}
                                >
                                    <OwlCarousel
                                        className="owl-theme relative"
                                        margin={10}
                                        autoWidth={true}
                                        animateIn={"fadeIn"}
                                        animateOut={"fadeOut"}
                                        nav={false}
                                        dots={false}
                                    >
                                        {onlineUser?.map((data, index) => (
                                            <div key={index+2} className="text-center">
                                                <img
                                                    className="h-14  w-[56px] object-cover object-center rounded-full border-[1px] border-[#ffffff1a]"
                                                    src={data?.img}
                                                    alt=""
                                                />
                                                <p className="fs-tiny fw-regular opacity-50 mt-3">
                                                    {data?.name}
                                                </p>
                                            </div>
                                        ))}
                                    </OwlCarousel>
                                </div>
                                <div
                                    className={` ${currentSelectedUser
                                        ? "hidden lg:block"
                                        : " block "
                                        } overflow-y-auto h-[70vh] `}
                                >
                                    {/* <div className=" scroll-width pt-6 pb-3 cursor-pointer hover:bg-[#ffffff0d]">
                                        <div className="flex items-start gap-4 px-6">
                                            <img
                                                className="h-10 max-w-[40px] object-cover object-center rounded-full border-[1px] border-[#ffffff1a]"
                                                src={siyan}
                                                alt=""
                                            />
                                            <div className="w-full">
                                                <div className="flex items-center justify-between gap-3 mb-1">
                                                    <div className="flex items-center gap-3">
                                                        <p className="fs-small fw-medium">
                                                            Kelly Wearstler
                                                        </p>
                                                        <img
                                                            className="max-w-[20px] h-5"
                                                            src={top50}
                                                            alt=""
                                                        />
                                                    </div>
                                                    <p className="fs-tiny fw-regular opacity-50">
                                                        1 min ago
                                                    </p>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <p className="fs-small fw-regular  ">
                                                        I was able to keep it
                                                        from getting{" "}
                                                    </p>
                                                    <p className="rounded-3xl fs-tiny fw-regular bg-[#FF5555] pb-0.5 pt-1 px-2">
                                                        2
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div> */}

                                    {previousAllChats?.map((data, index) => (
                                        <Link href={route('chat.index', data.encrypted_id)} key={index+2} >
                                            <div
                                                key={data?.id}
                                                className={` scroll-width pt-6 pb-3 cursor-pointer ${data?.id ==
                                                    activeConversation?.id &&
                                                "bg-[#ffffff0d]"
                                                }   hover:bg-[#ffffff0d]`}
                                            >
                                                <div className="flex items-start  gap-3 px-5">

                                                    <img
                                                        className="h-[2.5rem] w-[2.5rem] object-cover object-center rounded-full border-[1px] border-[#ffffff1a]"
                                                        src={data?.opponent?.dp.small.url}
                                                        alt=""
                                                    />
                                                    <div className="w-full">
                                                        <div className="flex items-center justify-between gap-3 mb-2">
                                                            <div className="flex items-center gap-3">
                                                                <p className="fs-small fw-medium">
                                                                    {data?.opponent?.full_name}
                                                                </p>
                                                                <span>
                                                                    <svg
                                                                        width="8"
                                                                        height="8"
                                                                        viewBox="0 0 8 8"
                                                                        fill="none"
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                    >
                                                                        <path
                                                                            d="M8 4C8 6.20914 6.20914 8 4 8C1.79086 8 0 6.20914 0 4C0 1.79086 1.79086 0 4 0C6.20914 0 8 1.79086 8 4Z"
                                                                            fill="#47D624"
                                                                        />
                                                                    </svg>
                                                                </span>
                                                                <img
                                                                    className="max-w-[20px] h-5"
                                                                    src={top50}
                                                                    alt=""
                                                                />
                                                            </div>
                                                            <p className="fs-tiny fw-regular opacity-50">
                                                                {data?.last_updated}
                                                            </p>
                                                        </div>
                                                        <div className="flex items-center gap-3">
                                                            <p className="fs-small fw-regular opacity-50">
                                                                {data?.last_message && (
                                                                    <>
                                                                        {data?.last_message.slice( 0, 25)}
                                                                        {data?.last_message.length >25 && "..."}
                                                                    </>
                                                                )}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}

                                    {/* <div className=" scroll-width pt-6 pb-3 cursor-pointer hover:bg-[#ffffff0d]">
                                        <div className="flex items-start gap-4 px-6">
                                            <img
                                                className="h-10 max-w-[40px] object-cover object-center rounded-full border-[1px] border-[#ffffff1a]"
                                                src={emily}
                                                alt=""
                                            />
                                            <div className="w-full">
                                                <div className="flex items-center justify-between gap-3 mb-2">
                                                    <div className="flex items-center gap-3">
                                                        <p className="fs-small fw-medium">
                                                            Condoleezza Rice
                                                        </p>
                                                        <img
                                                            className="max-w-[20px] h-5"
                                                            src={top50}
                                                            alt=""
                                                        />
                                                    </div>
                                                    <p className="fs-tiny fw-regular opacity-50">
                                                        11 min ago
                                                    </p>
                                                </div>
                                                <p className="fs-small fw-regular opacity-50">
                                                    Typing
                                                </p>
                                            </div>
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                        <div
                            className={`col-span-12 lg:col-span-9  ${currentSelectedUser ? "block" : " hidden lg:block "
                                } `}
                        >
                            <div className="h-full bg-[#ffffff10] noise-10 border-l-0 rounded-r-[10px]  border-[#ffffff1a]">
                                <div className="   border-b-[1px]  border-[#ffffff1a] p-6 ">
                                    <div className="flex items-center justify-between">
                                        <div>
                                        {currentSelectedUser &&  
                                        <div className="flex items-center">
                                            <div
                                                onClick={() =>
                                                    setCurrentSelectedUser(null)
                                                }
                                                className="pr-3 lg:hidden"
                                            >
                                                <svg
                                                    className="opacity-60"
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <g clipPath="url(#clip0_615_29645)">
                                                        <path
                                                            opacity="0.2"
                                                            d="M10.5 5.25L3.75 12L10.5 18.75V5.25Z"
                                                            fill="white"
                                                        />
                                                        <path
                                                            d="M20.25 12H10.5"
                                                            stroke="white"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                        <path
                                                            d="M10.5 5.25L3.75 12L10.5 18.75V5.25Z"
                                                            stroke="white"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_615_29645">
                                                            <rect
                                                                width="24"
                                                                height="24"
                                                                fill="white"
                                                                transform="matrix(-1 0 0 1 24 0)"
                                                            />
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                            </div>
                                            <img
                                                    className=" w-[56px] h-14 rounded-full object-cover mr-2 object-center border-[1px] border-[#ffffff1a]"
                                                    src={activeConversation.opponent?.dp.small.url}
                                                    alt=""
                                                />
                                            <div className="">
                                                <div className="flex items-center gap-x-3 mb-1">
                                                    <div className="flex items-center gap-1">
                                                        <h5>
                                                            {activeConversation?.opponent?.full_name}
                                                        </h5>
                                                        <img
                                                            className="w-[20px] mx-1 h-5"
                                                            src={top50}
                                                            alt=""
                                                        />
                                                        <span>
                                                            <svg
                                                                width="8"
                                                                height="8"
                                                                viewBox="0 0 8 8"
                                                                fill="none"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path
                                                                    d="M8 4C8 6.20914 6.20914 8 4 8C1.79086 8 0 6.20914 0 4C0 1.79086 1.79086 0 4 0C6.20914 0 8 1.79086 8 4Z"
                                                                    fill="#47D624"
                                                                />
                                                            </svg>
                                                        </span>
                                                    </div>
                                                    {/* <p className="fs-regular fw-regul;ar text-[#9E9E9E]">
                                                        Film and Television
                                                    </p> */}
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <p className="fs-tiny fw-regul;ar text-[#9E9E9E]">
                                                        Last online 5 min ago
                                                    </p>
                                                    <p className="fs-tiny fw-regul;ar text-[#9E9E9E]">
                                                        4:25 AM MST
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        }
                                        </div>
                                        <div>
                                        {/* <svg
                                         width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path opacity="0.2" d="M12 14.25C13.2426 14.25 14.25 13.2426 14.25 12C14.25 10.7574 13.2426 9.75 12 9.75C10.7574 9.75 9.75 10.7574 9.75 12C9.75 13.2426 10.7574 14.25 12 14.25Z" fill="#FAFAFA"/>
<path opacity="0.2" d="M12 6.75C13.2426 6.75 14.25 5.74264 14.25 4.5C14.25 3.25736 13.2426 2.25 12 2.25C10.7574 2.25 9.75 3.25736 9.75 4.5C9.75 5.74264 10.7574 6.75 12 6.75Z" fill="#FAFAFA"/>
<path opacity="0.2" d="M12 21.75C13.2426 21.75 14.25 20.7426 14.25 19.5C14.25 18.2574 13.2426 17.25 12 17.25C10.7574 17.25 9.75 18.2574 9.75 19.5C9.75 20.7426 10.7574 21.75 12 21.75Z" fill="#FAFAFA"/>
<path d="M12 14.25C13.2426 14.25 14.25 13.2426 14.25 12C14.25 10.7574 13.2426 9.75 12 9.75C10.7574 9.75 9.75 10.7574 9.75 12C9.75 13.2426 10.7574 14.25 12 14.25Z" stroke="#E0E0E0" strokeWidth="1.2" strokeMiterlimit="10"/>
<path d="M12 6.75C13.2426 6.75 14.25 5.74264 14.25 4.5C14.25 3.25736 13.2426 2.25 12 2.25C10.7574 2.25 9.75 3.25736 9.75 4.5C9.75 5.74264 10.7574 6.75 12 6.75Z" stroke="#E0E0E0" strokeWidth="1.2" strokeMiterlimit="10"/>
<path d="M12 21.75C13.2426 21.75 14.25 20.7426 14.25 19.5C14.25 18.2574 13.2426 17.25 12 17.25C10.7574 17.25 9.75 18.2574 9.75 19.5C9.75 20.7426 10.7574 21.75 12 21.75Z" stroke="#E0E0E0" strokeWidth="1.2" strokeMiterlimit="10"/>
                                        </svg> */}

                                        </div>
                                    </div>
                                </div>

                                <div
                                    className=" py-2 px-2 md:px-6 "
                                    // style={{
                                    //     backgroundImage: `url(${Noise10}) `,
                                    // }}
                                >
                                    <div className="flex flex-col-reverse overflow-y-auto h-[65vh] md:min-h-[60vh] relative">

                                    {!currentSelectedUser  &&
                                        <div className="w-ful h-[50vh] flex gap-y-2 opacity-40 flex-col justify-center items-center ">
                                            <img src={emptyChat}  alt="no chat available" />
                                            Select chat to start conversacion
                                        </div>
                                    }

                                        <ul>
                                            {/* my messages */}
                                            {singleUserMessages?.length > 0 && <>
                                            {singleUserMessages?.map((data, index) => (
                                                <div key={index+2}>

                                                {/* incomming messages  */}
                                                {activeConversation &&  <>
                                           {activeConversation.opponent?.id === data?.user_id &&
                                            <motion.div
                                            initial={{x: -100}}
                                            animate={{
                                            
                                                x: 0, 
                                                rotate: 0,
                                            }}
                                            >
                                                <div   className="pt-3 pb-3">
                                            <div className="flex items-start gap-4">
                                                 
                                            {/* {lastIndex === index &&   */}
                                              {/* <img
                                                    className=" w-[56px] h-14 rounded-full object-cover object-center border-[1px] border-[#ffffff1a]"
                                                    src={activeConversation.opponent?.dp.small.url}
                                                    alt=""
                                                /> */}
                                            {/* } */}

                                                <div className="w-full">
                                                    <div className="flex items-center gap-2 mb-3">
                                                        {/* <p className="fs-small fw-medium">
                                                            {activeConversation.opponent?.full_name}
                                                        </p> */}
                                                       
                                                        <p className="fs-tiny fw-regular opacity-50">
                                                        {data?.created_at}
                                                        </p>
                                                    </div>
                                                    <div className="flex">
                                                        <p className="fs-regular fw-regular border-[1px] border-[#ffffff1a] bg-[#ffffff0d] p-4 rounded-tr-lg rounded-b-lg max-w-[85%] relative">
                                                        {data?.value}
                                                            {/* {selectedEmoji?.emoji &&
                                                            <div className="right-0 -mr-3 absolute w-[1.5rem] h-[1.5rem] flex justify-center items-center bg-black rounded-full">
                                                                <div className="h-[1.2rem]">
                                                                {selectedEmoji?.emoji || emojis[0]?.emoji}
                                                            </div>
                                                            </div>
                                                            } */}
                                                        </p>
                                                        {/* <div className="  flex items-center ml-2">
                                                            <div className=" group absolute cursor-pointer bg-[#000000]  rounded-3xl border-[1px] border-[#ffffff1a] flex items-center justify-center   w-6 h-6">
                                                                <svg
                                                                    width="16"
                                                                    height="17"
                                                                    viewBox="0 0 16 17"
                                                                    fill="none"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                >
                                                                    <g clipPath="url(#clip0_829_48328)">
                                                                        <path
                                                                            opacity="0.2"
                                                                            d="M8 14.5C11.3137 14.5 14 11.8137 14 8.5C14 5.18629 11.3137 2.5 8 2.5C4.68629 2.5 2 5.18629 2 8.5C2 11.8137 4.68629 14.5 8 14.5Z"
                                                                            fill="white"
                                                                        />
                                                                        <path
                                                                            d="M5.75 8C6.16421 8 6.5 7.66421 6.5 7.25C6.5 6.83579 6.16421 6.5 5.75 6.5C5.33579 6.5 5 6.83579 5 7.25C5 7.66421 5.33579 8 5.75 8Z"
                                                                            fill="white"
                                                                        />
                                                                        <path
                                                                            d="M10.25 8C10.6642 8 11 7.66421 11 7.25C11 6.83579 10.6642 6.5 10.25 6.5C9.83579 6.5 9.5 6.83579 9.5 7.25C9.5 7.66421 9.83579 8 10.25 8Z"
                                                                            fill="white"
                                                                        />
                                                                        <path
                                                                            d="M10.5 10C9.98125 10.8969 9.11063 11.5 8 11.5C6.88937 11.5 6.01875 10.8969 5.5 10"
                                                                            stroke="white"
                                                                            strokeWidth="1.2"
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                        />
                                                                        <path
                                                                            d="M11 4H14"
                                                                            stroke="white"
                                                                            strokeWidth="1.2"
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                        />
                                                                        <path
                                                                            d="M12.5 2.5V5.5"
                                                                            stroke="white"
                                                                            strokeWidth="1.2"
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                        />
                                                                        <path
                                                                            d="M13.9166 7.50003C14.1276 8.75337 13.9347 10.0413 13.3659 11.1779C12.7971 12.3145 11.8819 13.2409 10.7522 13.8234C9.62257 14.4059 8.33705 14.6142 7.08125 14.4184C5.82545 14.2227 4.66438 13.6328 3.76567 12.7341C2.86696 11.8354 2.27712 10.6743 2.08133 9.41853C1.88554 8.16273 2.09393 6.8772 2.6764 5.74756C3.25887 4.61792 4.18528 3.70263 5.32187 3.13384C6.45846 2.56506 7.74641 2.37221 8.99975 2.58315"
                                                                            stroke="white"
                                                                            strokeWidth="1.2"
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                        />
                                                                    </g>
                                                                    <defs>
                                                                        <clipPath id="clip0_829_48328">
                                                                            <rect
                                                                                width="16"
                                                                                height="16"
                                                                                fill="white"
                                                                                transform="translate(0 0.5)"
                                                                            />
                                                                        </clipPath>
                                                                    </defs>
                                                                </svg>

                                                                <div className="hidden group-hover:block    ">
                                                                    <div className="p-2 absolute   -mt-[43px] inset-border w-[170px] h-[40px] bg-white rounded-full flex justify-between">
                                                                        {emojis.map((emoji) => (
                                                                                <div
                                                                                    onClick={() =>handleEmojiClick( emoji )}
                                                                                    key={emoji.id }
                                                                                    className="  rounded-full hover:scale-125 transition-all ease-in-out delay-3000 cursor-pointer bg-white"
                                                                                >
                                                                                    {emoji.emoji}
                                                                                </div>
                                                                            )
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        </motion.div>
                                        }
</>}

                                            {/* sent messages  */}
                                                    {data?.user_id  === user?.id &&     <li>
                                                            <div data-aos="fade-up" data-aos-delay="100" data-aos-easing="ease" data-aos-duration="300" className="pt-3  pb-3 flex justify-end   right-0 ">
                                                                <div className="flex items-start gap-4 justify-end">
                                                                    <div className="w-full">
                                                                        <div className="flex items-center justify-end gap-2 mb-3">
                                                                            <p className="fs-tiny fw-regular opacity-50">
                                                                              {data?.created_at}
                                                                            </p>
                                                                            <p className="fs-small fw-medium">
                                                                                You
                                                                            </p>
                                                                            <img
                                                                                className="max-w-[20px] h-5"
                                                                                src={ top50  }  alt=""
                                                                                />
                                                                        </div>
                                                                        <p className="fs-regular fw-regular border-[1px] border-[#ffffff1a] bg-[#ffffff0d] p-4 rounded-lg  max-w-2xl">
                                                                            {  data?.value  }
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                        }
                                                                                </div>
                                                    )
                                            )}
                                            </> }
                                        </ul>



                                        {/* <div className="text-center mt-10">
                                        {selectedEmoji ? (
          <Emoji
            unified={selectedEmoji}
            emojiStyle={EmojiStyle.APPLE}
            size={22}
          />
        ) : null}
                                            <p className="fw-regular fs-tiny opacity-50">
                                                Today 12:06
                                            </p>
                                        </div> */}
                                    </div>
{currentSelectedUser &&
                                    <div
                                        style={{
                                            backgroundImage: `url(${Noise10}) `,
                                        }}
                                        className="bg-[#000] border-rounded-10 border-[1px] border-[#ffffff1a] mt-2"
                                    >
                                        <form
                                            action=""
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter" && !e.shiftKey) {
                                                    e.preventDefault();
                                                    handleSendMessages();
                                                    setMessage([]);
                                                }
                                            }}
                                            onSubmit={(e) => {
                                                e.preventDefault();
                                                handleSendMessages()
                                                // submitMessage(
                                                //     currentUser?.name,
                                                //     message
                                                // );
                                                setMessage([]);
                                            }}
                                        >
                                            <div className="w-full">
                                                <textarea
                                                    autoFocus
                                                    value={message}
                                                    onChange={(e) => setMessage(e.target.value)  }
                                                    type="text"
                                                    className="px-4 fs-small fw-reguler bg-transparent w-full h-[48px] outline-none border-0    focus:shadow-none focus:border-transparent focus:ring-transparent"
                                                    placeholder="Type your message"
                                                />

                                                <div className="relative flex items-center justify-between  p-4">
                                                    <div className="flex items-center gap-3">
                                                        {/* <div>
                                                           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path opacity="0.2" d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" fill="#FAFAFA"/>
<path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke="#E0E0E0" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M8.625 11.25C9.24632 11.25 9.75 10.7463 9.75 10.125C9.75 9.50368 9.24632 9 8.625 9C8.00368 9 7.5 9.50368 7.5 10.125C7.5 10.7463 8.00368 11.25 8.625 11.25Z" fill="#E0E0E0"/>
<path d="M15.375 11.25C15.9963 11.25 16.5 10.7463 16.5 10.125C16.5 9.50368 15.9963 9 15.375 9C14.7537 9 14.25 9.50368 14.25 10.125C14.25 10.7463 14.7537 11.25 15.375 11.25Z" fill="#E0E0E0"/>
<path d="M15.75 14.25C14.9719 15.5953 13.6659 16.5 12 16.5C10.3341 16.5 9.02813 15.5953 8.25 14.25" stroke="#E0E0E0" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

                                                        </div>
                                                        <div>
                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path opacity="0.2" d="M15.75 6C15.75 3.92893 14.0711 2.25 12 2.25C9.92893 2.25 8.25 3.92893 8.25 6V12C8.25 14.0711 9.92893 15.75 12 15.75C14.0711 15.75 15.75 14.0711 15.75 12V6Z" fill="#FAFAFA"/>
<path d="M15.75 6C15.75 3.92893 14.0711 2.25 12 2.25C9.92893 2.25 8.25 3.92893 8.25 6V12C8.25 14.0711 9.92893 15.75 12 15.75C14.0711 15.75 15.75 14.0711 15.75 12V6Z" stroke="#E0E0E0" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M12 18.75V21.75" stroke="#E0E0E0" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M18.75 12C18.75 13.7902 18.0388 15.5071 16.773 16.773C15.5071 18.0388 13.7902 18.75 12 18.75C10.2098 18.75 8.4929 18.0388 7.22703 16.773C5.96116 15.5071 5.25 13.7902 5.25 12" stroke="#E0E0E0" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

                                                        </div> */}
                                                        <div className="absolute bottom-0 hidden">
                                                            {/* <EmojiPicker onEmojiClick={onClick} /> */}
                                                        </div>
                                                        {/* <div>
                                                            <svg
                                                                width="24"
                                                                height="24"
                                                                viewBox="0 0 24 24"
                                                                fill="none"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <g
                                                                    opacity="0.6"
                                                                    clipPath="url(#clip0_748_43487)"
                                                                >
                                                                    <path
                                                                        opacity="0.4"
                                                                        d="M18.6215 8.12142C19.1842 7.55874 19.5003 6.79559 19.5003 5.99985C19.5003 5.20411 19.1842 4.44096 18.6215 3.87829C18.0589 3.31562 17.2957 2.99951 16.5 2.99951C15.7042 2.99951 14.9411 3.31562 14.3784 3.87829L5.06809 13.318C4.23553 14.1642 3.77108 15.3051 3.77592 16.4923C3.78075 17.6794 4.25447 18.8165 5.0939 19.6559C5.93332 20.4953 7.07044 20.9691 8.25756 20.9739C9.44467 20.9787 10.5856 20.5143 11.4318 19.6817L19.125 11.9999L16.9453 9.82017L18.6215 8.12142Z"
                                                                        fill="white"
                                                                    />
                                                                    <path
                                                                        d="M15 7.49985L7.18965 15.4395C6.9152 15.7223 6.76301 16.1016 6.76597 16.4956C6.76894 16.8897 6.92682 17.2667 7.20551 17.5452C7.48419 17.8238 7.86128 17.9815 8.2553 17.9843C8.64932 17.9871 9.02861 17.8347 9.31122 17.5602L18.6215 8.12142C19.1842 7.55874 19.5003 6.79559 19.5003 5.99985C19.5003 5.20411 19.1842 4.44096 18.6215 3.87829C18.0589 3.31562 17.2957 2.99951 16.5 2.99951C15.7042 2.99951 14.9411 3.31562 14.3784 3.87829L5.06809 13.318C4.23553 14.1642 3.77108 15.3051 3.77592 16.4923C3.78075 17.6794 4.25447 18.8165 5.0939 19.6559C5.93332 20.4953 7.07044 20.9691 8.25756 20.9739C9.44467 20.9787 10.5856 20.5143 11.4318 19.6817L19.125 11.9999"
                                                                        stroke="white"
                                                                        strokeWidth="1.2"
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                    />
                                                                </g>
                                                                <defs>
                                                                    <clipPath id="clip0_748_43487">
                                                                        <rect
                                                                            width="24"
                                                                            height="24"
                                                                            fill="white"
                                                                        />
                                                                    </clipPath>
                                                                </defs>
                                                            </svg>
                                                        </div> */}
                                                    </div>
                                                    <button>
                                                        <svg
                                                            width="24"
                                                            height="24"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <g
                                                                opacity="1"
                                                                clipPath="url(#clip0_748_43488)"
                                                            >
                                                                <path
                                                                    opacity="0.4"
                                                                    d="M6.70604 11.7365C6.76513 11.8994 6.76513 12.078 6.70604 12.2409L3.79979 20.745C3.74783 20.8885 3.74093 21.0445 3.77999 21.1921C3.81906 21.3397 3.90224 21.4718 4.01842 21.5709C4.13459 21.67 4.27823 21.7312 4.43014 21.7464C4.58205 21.7617 4.735 21.7302 4.86854 21.6562L20.6185 12.6478C20.7358 12.5829 20.8335 12.4878 20.9015 12.3724C20.9696 12.257 21.0054 12.1255 21.0054 11.9915C21.0054 11.8575 20.9696 11.726 20.9015 11.6106C20.8335 11.4952 20.7358 11.4001 20.6185 11.3353L4.86854 2.34933C4.73533 2.27483 4.58256 2.24274 4.43063 2.25735C4.2787 2.27197 4.13484 2.33259 4.01828 2.43112C3.90171 2.52965 3.81798 2.6614 3.77827 2.80878C3.73856 2.95615 3.74476 3.11213 3.79604 3.25589L6.70604 11.7365Z"
                                                                    fill="white"
                                                                />
                                                                <path
                                                                    d="M6.70604 11.7365C6.76513 11.8994 6.76513 12.078 6.70604 12.2409L3.79979 20.745C3.74783 20.8885 3.74093 21.0445 3.77999 21.1921C3.81906 21.3397 3.90224 21.4718 4.01842 21.5709C4.13459 21.67 4.27823 21.7312 4.43014 21.7464C4.58205 21.7617 4.735 21.7302 4.86854 21.6562L20.6185 12.6478C20.7358 12.5829 20.8335 12.4878 20.9015 12.3724C20.9696 12.257 21.0054 12.1255 21.0054 11.9915C21.0054 11.8575 20.9696 11.726 20.9015 11.6106C20.8335 11.4952 20.7358 11.4001 20.6185 11.3353L4.86854 2.34933C4.73533 2.27483 4.58256 2.24274 4.43063 2.25735C4.2787 2.27197 4.13484 2.33259 4.01828 2.43112C3.90171 2.52965 3.81798 2.6614 3.77827 2.80878C3.73856 2.95615 3.74476 3.11213 3.79604 3.25589L6.70604 11.7365Z"
                                                                    stroke="white"
                                                                    strokeWidth="1.2"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                />
                                                                <path
                                                                    d="M12.75 12H6.75"
                                                                    stroke="white"
                                                                    strokeWidth="1.2"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                />
                                                            </g>
                                                            <defs>
                                                                <clipPath id="clip0_748_43488">
                                                                    <rect
                                                                        width="24"
                                                                        height="24"
                                                                        fill="white"
                                                                    />
                                                                </clipPath>
                                                            </defs>
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
Chat.layout = (page) => <SessionLayout children={page} title="" />;
export default Chat;
