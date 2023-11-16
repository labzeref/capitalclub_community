import React, { useEffect, useState } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import emojis from '../../Components/Emojis.json';
import Button from "../../Components/Button";
import bg from '../../../assets/svg/academyshadow.svg';
import profilepic from "../../../assets/img/profilepic.png";
import enola from "../../../assets/img/enola.png";
import emily from "../../../assets/img/emily.png";
import leaf from "../../../assets/svg/leaf.svg";
import top50 from "../../../assets/svg/top50.svg";
import closearrow from "../../../assets/svg/closearrow.svg";
import chatLogo from "../../../assets/img/chat-logo.svg";
import flag from "../../../assets/img/flag.svg";
import { ReactComponent as BookMark } from "../../../assets/svg/Bookmark.svg";
import { ReactComponent as Export } from "../../../assets/svg/Export.svg";
import { ReactComponent as ShareFat } from "../../../assets/svg/ShareFat.svg";
import SessionLayout from "@/Layouts/SessionLayout";
import IconButton from "@/Components/IconButton";
import axios from "axios";
import { motion } from "framer-motion"
import { Link, useForm } from "@inertiajs/react";
import { useRef } from "react";
import CommentReport from "@/Components/Modal/CommentReport";
import PlyrComponent from "@/Components/PlyrComponent";


// steaming Embed Embed Embed
// <div style="padding:56.25% 0 0 0;position:relative;">
//     <iframe src="https://player.restream.io/?token=e67d6bfbb7ff488082ab504b46e6b6c3&vwrs=1" allow="autoplay"
//             allowFullScreen frameBorder="0" style="position:absolute;top:0;left:0;width:100%;height:100%;"></iframe>
// </div>


const LiveSession = ({ liveTraining, liveSeries, liveStream, liveTrainingGroup, streamChat }) => {

    // console.log('liveTrainingGroup') live-training
    // console.log(liveTrainingGroup)
    // console.log('streamChat', streamChat)

    // console.log('liveTraining')
    // console.log(liveTraining)
    // console.log('liveSeries')
    // console.log(liveSeries)
    console.log('liveStream')
    console.log(liveStream)

    const [openDrawer, serOpenDrawer] = useState(true)


    useEffect(() => {
        AOS.init();
    }, [])

    const { post } = useForm();
    const handleLiveTrainingBookmarkToggle = () => {
        post(route('bookmark-toggle.live-training', liveTraining?.id), {
            preserveScroll: true
        });
    }

    const handleLiveStreamBookmarkToggle = () => {
        post(route('bookmark-toggle.live-stream', liveStream?.id), {
            preserveScroll: true
        });
    }




    const [showLiveChat, setShowLiveChat] = useState(true)
    const [inputValue, setInputValue] = useState('');
    const [replyId, setReplyId] = useState();
    const MAX_CHARACTERS = 140;
    const [wordStop, setWordStop] = useState(false);
  const [truncatedText, setTruncatedText] = useState(inputValue);
  const [charCount, setCharCount] = useState(truncatedText?.length || 0);
console.log(charCount)
  const handleChange = (event) => {
    const { value } = event.target;
    setCharCount(value.length);
    if (value.length > MAX_CHARACTERS) {
      setWordStop(true);
      setTruncatedText(value.substring(0, MAX_CHARACTERS));
    } else {
      setWordStop(false);
      setTruncatedText(value);
    }
  };

  const handleKeyPress = (event) => {
    const { value } = event.target;
    if (value.length >= MAX_CHARACTERS) {
      event.preventDefault();
    }
  };


    // console.log('input Value***' , inputValue)

    const [message, setMessage] = useState(streamChat);
    const [errors , setErrors ] = useState(false)
const [errorMsg , setErrorMsg] = useState('')


    const handleSendMessages = async (id) => {
        if (id?.type == 'training') {
            try {
                const response = await axios.post(
                    route("live-training.chat", id?.id),
                    {
                        value: inputValue,
                        mentioned_message_id: replyId,
                    }
                );
                setReplyId(null)
                setInputValue('')
                const newMessage = response?.data?.payload;
                setMessage(prevMessages => [newMessage, ...prevMessages]);
                setErrors(false)
                // console.log("Message sent successfully:", newMessage);
            } catch (error) {
                setErrors(true)
                setErrorMsg(error?.response?.data?.payload[0])
                console.error("Error while sending messages:", error);
            }
        } else {
            try {
                const response = await axios.post(
                    route("live-stream.chat", id?.id),
                    {
                        value: inputValue,
                        mentioned_message_id: replyId,
                    }
                );
                setReplyId(null)
                setInputValue('')
                const newMessage = response?.data?.payload;
                setMessage(prevMessages => [newMessage, ...prevMessages]);
                setErrors(false)
                // console.log("Message sent successfully:", newMessage);
            } catch (error) {
                setErrors(true)
                setErrorMsg(error?.response?.data?.payload[0])
                console.error("Error while sending messages:", error?.response?.data?.payload[0]);
            }
        }


    };



    const [allParticipant, setAllParticipant] = useState([])

    // console.log('allParticipant' , allParticipant)

    useEffect(() => {
        if (liveTraining) {
            const channel = Echo.join(`live-training.${liveTraining?.id}`)
            channel.here((users) => {
                setAllParticipant(users)
                // console.log('Currently subscribed users***********************************:', users);
            });

            channel.joining((user) => {
                setAllParticipant((prevParticipants) => {
                    const updatedParticipants = [...prevParticipants];
                    updatedParticipants.push(user);
                    return updatedParticipants;
                });
                // console.log('User joined***********************************:', user);
            });

            channel.leaving((user) => {
                const updatedParticipants = allParticipant.filter((participant) => participant.id !== user?.id);
                setAllParticipant(updatedParticipants);
                console.log('User left:', user);
            });
            channel.listen('.live-training', (event) => {
                const newMessage = event.message;
                setMessage(prevMessages => [newMessage, ...prevMessages]);
                console.log('Event message:', event.message);
            });
        }

        if (liveStream) {

            const channel = Echo.join(`live-stream.${liveStream?.id}`)
            channel.here((users) => {
                setAllParticipant(users)
                // console.log('Currently subscribed users***********************************:', users);
            });

            channel.joining((user) => {
                setAllParticipant((prevParticipants) => {
                    const updatedParticipants = [...prevParticipants];
                    updatedParticipants.push(user);
                    return updatedParticipants;
                });
                console.log('User joined at live stream ***********************************:', user);
            });

            channel.leaving((user) => {
                const updatedParticipants = allParticipant.filter((participant) => participant.id !== user?.id);
                setAllParticipant(updatedParticipants);
                console.log('User left:', user);
            });
            channel.listen('.live-stream', (event) => {
                const newMessage = event.message;
                setMessage(prevMessages => [newMessage, ...prevMessages]);
                console.log('Event message:', event.message);
            });

        }



    }, []);


    // ************* emojis reactions **************

    // const [commentReactions, setCommentReactions] = useState(postComments);

    const handleCommentReaction = async (msgId, emojiName, index) => {
        try {
            const response = await axios.post(route("toggle-reaction.post-comments", msgId), {
                reaction: emojiName
            });
            setMessage((prevPosts) => {
                const updatedMsgs = [...prevPosts];
                updatedMsgs[index] = response.data?.payload;
                return updatedMsgs;
            });

            console.log("messages reaction   successfully:", response.data?.payload);
        } catch (error) {
            console.error("Error while emoji API hitting:", error);
        }
    };


    const [selectedEmoji, setSelectedEmoji] = useState(null);

    const handleEmojiClick = (emoji) => {
        setSelectedEmoji(emoji);
    };
    const handleScroll = (event) => {
        const { scrollTop, scrollHeight, clientHeight } = event.target;

        setIsTopShadowVisible(scrollTop > 0);
        setIsBottomShadowVisible(scrollTop + clientHeight < scrollHeight);
    };


    const scrollToRef = useRef(null);

    const handleReplyClick = (repliedMessageId) => {
        const element = document.getElementById(repliedMessageId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    useEffect(() => {
        if (scrollToRef.current) {
            scrollToRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
    }, [message]);


    return (
        <div>
            <section data-aos="fade-in" data-aos-delay="100" data-aos-easing="ease" data-aos-duration="300" className="  ">
                <div className="academy-bg  ">

                    <img src={bg} className="light-spot" />
                </div>
                <div className="container  mx-auto ">
                    <div className="grid grid-cols-1 mt-4 mb-6 px-5 lg:px-3">
                        {liveTraining ?
                            <Link href={route("live-training.preview", liveTraining?.id)} >
                                <img className="h-6" src={chatLogo} alt="" />
                            </Link>
                            :
                            <Link href={route("live-series.preview", liveStream?.id)} >
                                <img className="h-6" src={chatLogo} alt="" />
                            </Link>
                        }

                    </div>
                    <div className="grid grid-cols-12 px-5 lg:px-3">

                        <div className="col-span-12">
                            <div className="flex relative items-center justify-between flex-wrap gap-y-2">


                                <h1 className="uppercase mb-2 -z-10">
                                    {liveTraining ? liveTraining?.title : liveStream?.live_series?.live_series?.title}
                                </h1>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-12 gap-y-8 lg:gap-x-6 mt-6 px-5 lg:px-3">

                        <div className={` col-span-12 ${openDrawer ? 'lg:col-span-8' : 'lg:col-span-12' } `}>
                            <div className="flex items-center  justify-between mb-7 gap-x-6 gap-y-6">
                            <Link href={route('instructors.show', liveStream?.live_series?.default_instructor?.id)}>
                                <div className="flex items-center gap-4">
                                    <img
                                        className="w-14 h-14 rounded-full object-cover object-center"
                                        src={liveTraining ? liveTraining?.default_instructor?.dp?.small?.url : liveStream?.live_series?.default_instructor?.dp?.small?.url}
                                        alt=""
                                    />
                                    <div>
                                        <h4>{liveTraining ? liveTraining?.default_instructor?.full_name : liveStream?.live_series?.default_instructor?.full_name}</h4>
                                        <p className="opacity-60"> {liveTraining ? liveTraining?.default_instructor?.category?.name : liveStream?.live_series?.default_instructor?.category?.name} </p>
                                    </div>
                                </div>
                                 </Link>

                                <div className="flex items-center gap-4">
                                    {liveTraining ?
                                        <IconButton
                                            onClick={handleLiveTrainingBookmarkToggle}
                                            icon={<BookMark />}
                                            className={` ${liveTraining?.bookmarked ? 'primary' : 'secondary'}  icon_button `}
                                        ></IconButton>
                                        : <IconButton
                                            onClick={handleLiveStreamBookmarkToggle}
                                            icon={<BookMark />}
                                            className={` ${liveStream?.bookmarked ? 'primary' : 'secondary'}  icon_button `}
                                        ></IconButton>}


                                    {liveTraining ? <Link href={route("live-training.preview", liveTraining?.id)} >
                                        <IconButton
                                            icon={<ShareFat />}
                                            className={"secondary  icon_button"}
                                        ></IconButton>
                                    </Link>
                                        :
                                        <Link href={route("live-series.preview", liveStream?.id)} >
                                            <IconButton
                                                icon={<ShareFat />}
                                                className={"secondary  icon_button"}
                                            ></IconButton>
                                        </Link>
                                    }




                                    {/* <IconButton
                                        icon={<ShareFat />}
                                        className={"secondary  icon_button"}
                                    ></IconButton> */}
                                </div>
                            </div>
                            <div className="text-start relative">

                            {liveStream?.video ?
                             <PlyrComponent source={liveStream?.video?.url} thumbnail={liveStream?.live_series?.thumbnail?.medium?.url} />
                            :
                            <div style={{ padding: "56.25% 0 0 0", position: "relative" }}  >
                            <iframe src={liveTraining ? liveTraining?.embed_url : liveStream?.embed_url}
                            allow="autoplay" allowFullScreen frameBorder="0" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}  >
                            </iframe>
                            </div>
                            }

                                {/* <style>
                                    {`
          .codegena {
            position: relative;
            width: 100%;
            height: 0;
            padding-bottom: 56.27198%;
          }

          .codegena iframe {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
          }
        `}
                                </style>
                                <div className="codegena">
                                    <iframe
                                        width="500px"
                                        height="294px"
                                        src="https://player.vimeo.com/video/806035189?&title=0&byline=0&portrait=0"
                                    ></iframe>
                                </div> */}
                            </div>
                            <div className="text-start mt-8">
                                <p className="fs-large fw-regular">
                                    {liveTraining ? liveTraining?.description : liveStream?.description}
                                </p>
                            </div>
                        </div>


                        {/* sidebar live chat  */}



                        {/*shadow top*/}
                        {/* <div
                                        className={"lessons-shadow top "}
                                    ></div> */}





                        {/* live chat end  */}

                    </div>
                    {/* ------------------  */}

                    <div className={`pb-4 lg:pb-2 lg:absolute right-0 top-0 z-50   transition-all duration-500 transform ${openDrawer ? 'translate-x-0 ' : 'translate-x-full'}     bg-[#161616]  w-full lg:w-[26rem]   `}>

                        <div className="hidden lg:block live-chat-shadow right   z-50"></div>
                        <img onClick={() => { serOpenDrawer(!openDrawer) }} src={closearrow} alt="" className={` ${!openDrawer ? 'rotate-180  -ml-6 ' : '-ml-2'} hidden lg:block mt-3  z-[9999999]  absolute `} />

                        <div >

                            <div className="flex items-center">
                                <button onClick={() => { setShowLiveChat(true) }} className={`py-[1.125rem] ${!showLiveChat && 'noise-10'} secondary w-full`}>
                                    <div className="button_container flex items-center justify-center gap-3 glitch uppercase">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g opacity="0.6" clipPath="url(#clip0_1107_72840)">
                                                <path opacity="0.4" d="M7.49258 19.7916C9.38308 20.8857 11.607 21.255 13.7496 20.8305C15.8923 20.4061 17.8075 19.2169 19.1381 17.4847C20.4687 15.7525 21.124 13.5955 20.9817 11.4158C20.8394 9.23617 19.9093 7.18265 18.3648 5.63813C16.8202 4.0936 14.7667 3.16349 12.5871 3.0212C10.4074 2.87892 8.2504 3.53417 6.51819 4.8648C4.78597 6.19543 3.59679 8.1106 3.17235 10.2533C2.74792 12.3959 3.11719 14.6198 4.21133 16.5103L3.03852 20.0119C2.99445 20.144 2.98806 20.2858 3.02005 20.4214C3.05205 20.557 3.12117 20.681 3.21967 20.7795C3.31817 20.878 3.44216 20.9471 3.57774 20.9791C3.71331 21.0111 3.85512 21.0047 3.98727 20.9606L7.49258 19.7916Z" fill="white" />
                                                <path d="M7.49258 19.7916C9.38308 20.8857 11.607 21.255 13.7496 20.8305C15.8923 20.4061 17.8075 19.2169 19.1381 17.4847C20.4687 15.7525 21.124 13.5955 20.9817 11.4158C20.8394 9.23617 19.9093 7.18265 18.3648 5.63813C16.8202 4.0936 14.7667 3.16349 12.5871 3.0212C10.4074 2.87892 8.2504 3.53417 6.51819 4.8648C4.78597 6.19543 3.59679 8.1106 3.17235 10.2533C2.74792 12.3959 3.11719 14.6198 4.21133 16.5103L3.03852 20.0119C2.99445 20.144 2.98806 20.2858 3.02005 20.4214C3.05205 20.557 3.12117 20.681 3.21967 20.7795C3.31817 20.878 3.44216 20.9471 3.57774 20.9791C3.71331 21.0111 3.85512 21.0047 3.98727 20.9606L7.49258 19.7916Z" stroke="white" strokeOpacity="0.6" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_1107_72840">
                                                    <rect width="24" height="24" fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                        Live chat
                                    </div>
                                </button>



                                <button onClick={() => { setShowLiveChat(false) }} className={`py-[1.125rem] ${showLiveChat && 'noise-10'}  secondary w-full`}>
                                    <div className="button_container gap-3 flex justify-center items-center glitch uppercase">
                                        <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g opacity="0.6" clipPath="url(#clip0_1107_72844)">
                                                <path opacity="0.4" d="M12.5 17.25C14.5711 17.25 16.25 15.5711 16.25 13.5C16.25 11.4289 14.5711 9.75 12.5 9.75C10.4289 9.75 8.75 11.4289 8.75 13.5C8.75 15.5711 10.4289 17.25 12.5 17.25Z" fill="white" />
                                                <path opacity="0.4" d="M6.5 11.25C8.15685 11.25 9.5 9.90685 9.5 8.25C9.5 6.59315 8.15685 5.25 6.5 5.25C4.84315 5.25 3.5 6.59315 3.5 8.25C3.5 9.90685 4.84315 11.25 6.5 11.25Z" fill="white" />
                                                <path opacity="0.4" d="M18.5 11.25C20.1569 11.25 21.5 9.90685 21.5 8.25C21.5 6.59315 20.1569 5.25 18.5 5.25C16.8431 5.25 15.5 6.59315 15.5 8.25C15.5 9.90685 16.8431 11.25 18.5 11.25Z" fill="white" />
                                                <path d="M18.5 11.25C19.3734 11.2493 20.2349 11.4524 21.016 11.843C21.7972 12.2335 22.4765 12.8009 23 13.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M2 13.5C2.5235 12.8009 3.20281 12.2335 3.98398 11.843C4.76514 11.4524 5.62663 11.2493 6.5 11.25" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M12.5 17.25C14.5711 17.25 16.25 15.5711 16.25 13.5C16.25 11.4289 14.5711 9.75 12.5 9.75C10.4289 9.75 8.75 11.4289 8.75 13.5C8.75 15.5711 10.4289 17.25 12.5 17.25Z" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M7.25 20.25C7.7884 19.3364 8.5559 18.579 9.47665 18.0529C10.3974 17.5267 11.4395 17.25 12.5 17.25C13.5605 17.25 14.6026 17.5267 15.5233 18.0529C16.4441 18.579 17.2116 19.3364 17.75 20.25" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M15.5938 7.5C15.734 6.95678 16.0238 6.46377 16.4302 6.07697C16.8366 5.69017 17.3433 5.42508 17.8927 5.31179C18.4422 5.19851 19.0125 5.24158 19.5387 5.43611C20.0649 5.63064 20.5261 5.96883 20.8697 6.41229C21.2134 6.85574 21.4258 7.38668 21.4829 7.9448C21.54 8.50293 21.4394 9.06587 21.1926 9.56971C20.9458 10.0735 20.5627 10.4981 20.0867 10.7951C19.6108 11.0921 19.061 11.2497 18.5 11.25" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M6.50044 11.25C5.93941 11.2497 5.38969 11.0921 4.91373 10.7951C4.43776 10.4981 4.05462 10.0735 3.80782 9.56971C3.56102 9.06587 3.46044 8.50293 3.51752 7.9448C3.5746 7.38668 3.78703 6.85574 4.13071 6.41229C4.47438 5.96883 4.93552 5.63064 5.46176 5.43611C5.98799 5.24158 6.55822 5.19851 7.10771 5.31179C7.65719 5.42508 8.16389 5.69017 8.57027 6.07697C8.97666 6.46377 9.26643 6.95678 9.40669 7.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_1107_72844">
                                                    <rect width="24" height="24" fill="white" transform="translate(0.5)" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                        Participants
                                    </div>
                                </button>
                            </div>

                            <div className="flex items-center justify-between p-6">
                                {showLiveChat ? <h5>Live Chat</h5> : <h5>Participants</h5>}
                                <div>
                                    {/* <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g opacity="0.6" clipPath="url(#clip0_1107_72837)">
                                            <path opacity="0.4" d="M12 14.25C13.2426 14.25 14.25 13.2426 14.25 12C14.25 10.7574 13.2426 9.75 12 9.75C10.7574 9.75 9.75 10.7574 9.75 12C9.75 13.2426 10.7574 14.25 12 14.25Z" fill="white" />
                                            <path opacity="0.4" d="M12 6.75C13.2426 6.75 14.25 5.74264 14.25 4.5C14.25 3.25736 13.2426 2.25 12 2.25C10.7574 2.25 9.75 3.25736 9.75 4.5C9.75 5.74264 10.7574 6.75 12 6.75Z" fill="white" />
                                            <path opacity="0.4" d="M12 21.75C13.2426 21.75 14.25 20.7426 14.25 19.5C14.25 18.2574 13.2426 17.25 12 17.25C10.7574 17.25 9.75 18.2574 9.75 19.5C9.75 20.7426 10.7574 21.75 12 21.75Z" fill="white" />
                                            <path d="M12 14.25C13.2426 14.25 14.25 13.2426 14.25 12C14.25 10.7574 13.2426 9.75 12 9.75C10.7574 9.75 9.75 10.7574 9.75 12C9.75 13.2426 10.7574 14.25 12 14.25Z" stroke="white" strokeWidth="1.2" strokeMiterlimit="10" />
                                            <path d="M12 6.75C13.2426 6.75 14.25 5.74264 14.25 4.5C14.25 3.25736 13.2426 2.25 12 2.25C10.7574 2.25 9.75 3.25736 9.75 4.5C9.75 5.74264 10.7574 6.75 12 6.75Z" stroke="white" strokeWidth="1.2" strokeMiterlimit="10" />
                                            <path d="M12 21.75C13.2426 21.75 14.25 20.7426 14.25 19.5C14.25 18.2574 13.2426 17.25 12 17.25C10.7574 17.25 9.75 18.2574 9.75 19.5C9.75 20.7426 10.7574 21.75 12 21.75Z" stroke="white" strokeWidth="1.2" strokeMiterlimit="10" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_1107_72837">
                                                <rect width="24" height="24" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg> */}
                                </div>
                            </div>

                            {/* <div className="relative w-full px-6">
                                <input type="search" className="input-text left-icon h-12 py-3 w-full  "
                                    placeholder="Type to search" />
                                <span className="absolute left-45 top-3">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g opacity="0.6" clipPath="url(#clip0_1107_72850)">
                                            <path opacity="0.4" d="M10.5 18C14.6421 18 18 14.6421 18 10.5C18 6.35786 14.6421 3 10.5 3C6.35786 3 3 6.35786 3 10.5C3 14.6421 6.35786 18 10.5 18Z" fill="white" />
                                            <path d="M10.5 18C14.6421 18 18 14.6421 18 10.5C18 6.35786 14.6421 3 10.5 3C6.35786 3 3 6.35786 3 10.5C3 14.6421 6.35786 18 10.5 18Z" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M15.8027 15.8027L20.9993 20.9993" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_1107_72850">
                                                <rect width="24" height="24" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </span>
                            </div> */}


                        </div>

                        {showLiveChat ?
                            <motion.div
                                initial={{ x: 100 }}
                                animate={{

                                    x: 0,
                                    y: -2,
                                    scale: 1,
                                    rotate: 0,
                                }}
                            >    <div className="live chat-here">

                                    <div className="relative  ">
                                        <div className={"lessons-shadow top "}  ></div>
                                        <div className="overflow-y-auto flex flex-col-reverse pr-0    lg:pb-[3.5rem] min-h-[800px] h-[88vh]">



                                            {message?.map((msg, index) => (
                                                <div key={index + 4} id="{msg?.mentioned_message?.id}" className="px-6 pt-4 hover:bg-[#ffffff1a]">
                                                    <div className="w-full flex items-start justify-between">
                                                        <div className="w-full flex items-start gap-4">
                                                            <a href={route('users.profile', msg?.user?.id)} target="_blank">
                                                                <div className="w-10 h-10 rounded-full">
                                                                    <img className="w-10 h-10 rounded-full cursor-pointer object-cover object-center" src={msg?.user?.dp?.small?.url} alt="" />
                                                                </div>
                                                            </a>

                                                            <div className="w-full">
                                                                <div className=" flex items-center justify-between mb-2">
                                                                    <a href={route('users.profile', msg?.user?.id)} target="_blank"
                                                                    >   <div className="flex items-center gap-2">
                                                                            <p className="fs-small fw-medium">{msg?.user?.full_name}</p>
                                                                            <img className="h-4 w-4" src={top50} alt="" />
                                                                        </div>
                                                                    </a>
                                                                    <p className="fs-tiny fw-regular opacity-50">{msg?.send_at}</p>
                                                                </div>
                                                                {msg?.mentioned_message?.value &&
                                                                    <p className="fs-small fs-regular cursor-pointer  bg-[#303030] rounded-[5px]  border-l border-white inset-border py-1 px-2">
                                                                        @<span className="text-white">{msg?.mentioned_message?.user?.full_name}</span>
                                                                        <span className="opacity-40">  {msg?.mentioned_message?.value?.length > 20 ? msg?.mentioned_message?.value?.substring(0, 20) + "..." : msg?.mentioned_message?.value} </span>
                                                                    </p>}
                                                                <p className="fs-small fs-regular">{msg?.value}</p>

                                                                <div className="flex items-center justify-between py-3">
                                                                    <div className="flex items-center gap-1">
                                                                        {/* <div className="bg-[#000000] px-3 rounded-3xl border-[1px] border-[#ffffff1a] flex items-center justify-center gap-1 w-[50px] h-6">
                                                                            <p className="fw-regular fs-tiny">  {emojis.find((emoji) => emoji.name === msg?.my_reaction)?.emoji}</p>
                                                                            <p className="fw-regular fs-small">1</p>
                                                                        </div> */}
                                                                        {/* <div className="group relative cursor-pointer bg-[#000000]  rounded-3xl border-[1px] border-[#ffffff1a] flex items-center justify-center  w-6 h-6">
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

                                                                            <div className="hidden group-hover:block  absolute  ">
                                                                                <div className="p-2 absolute -ml-[2rem] -mt-[3rem] inset-border w-[170px] h-[40px] bg-white rounded-full flex justify-between">
                                                                                    {emojis.map((emoji) => (
                                                                                        <div
                                                                                        onClick={() => handleCommentReaction(msg.id, emoji?.name, index)}

                                                                                            key={emoji.id}
                                                                                            className="rounded-full hover:scale-125 transition-all ease-in-out delay-3000 cursor-pointer bg-white"
                                                                                        >
                                                                                            {emoji.emoji}
                                                                                        </div>
                                                                                    ))}
                                                                                </div>
                                                                            </div>
                                                                        </div> */}
                                                                        <div
                                                                            onClick={() => {
                                                                                setReplyId(msg?.id);
                                                                                handleReplyClick(msg?.mentioned_message?.id);
                                                                                setInputValue(msg?.user?.full_name)
                                                                            }}
                                                                            className="cursor-pointer   w-[70px] px-2 py-[2px]   rounded-full flex items-center justify-center gap-2 bg-[#000000] border-[1px] border-[#ffffff1a] uppercase fs-tiny  "
                                                                        >
                                                                            Reply
                                                                        </div>
                                                                    </div>

                                                                    {/* <img src={flag} alt="" /> */}
<CommentReport id={msg?.id} />
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}







                                            {/*
                                <div className="px-6 py-4 hover:bg-[#ffffff1a]">
                                    <div className="w-full flex items-start justify-between">
                                        <div className="w-full flex items-start gap-4">
                                            <img className="w-10 h-10 rounded-full object-cover object-center" src={profilepic} alt="" />
                                            <div className="w-full">
                                                <div className="flex items-center justify-between mb-2">
                                                    <div className="flex items-center gap-2">
                                                        <p className="fs-small fw-medium">Aaron Sorkin</p>
                                                        <img className="h-4 w-4" src={top50} alt="" />
                                                    </div>
                                                    <p className="fs-tiny fw-regular opacity-50">1 min ago</p>
                                                </div>
                                                <p className="fs-small fs-regular">The Ultimate Drawing Course will show you.</p>

                                            </div>
                                        </div>
                                    </div>
                                </div> */}




                                        </div>
                                    </div>
                                    <div className="px-6 py-3 lg:absolute bg-[#161616] bottom-0 w-full">
                                        <form
                                            action=""
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter" && !e.shiftKey) {
                                                    e.preventDefault();
                                                    handleSendMessages(liveTraining ? { id: liveTraining?.id, type: 'training' } : { id: liveStream?.id, type: 'stream' });
                                                }
                                            }}
                                            onSubmit={(e) => {
                                                e.preventDefault();
                                                handleSendMessages(liveTraining ? { id: liveTraining?.id, type: 'training' } : { id: liveStream?.id, type: 'stream' })
                                            }}
                                        >
                                            <div ref={scrollToRef}></div>
                                            <div className="relative">
                                                <textarea value={inputValue}
                                                  onKeyPress={handleKeyPress}
                                                autoFocus
                                                    onChange={(e)=> { setInputValue(e.target.value) ; handleChange(e)} }

                                                    name="comment" id="comment" placeholder="Send a message to everyone" className="w-full border-rounded-20 pl-12 pr-16  bg-[#000] outline-none inset-border fs-small text-[#FFFFFF] font-normal  focus:shadow-none focus:ring-transparent focus:border focus:border-[#ffffff1a]" rows="1"></textarea>

                                                <div className="flex items-center justify-between px-3 mt-[-2.7rem]">

                                                    <div>
                                                        <svg
                                                         width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <g opacity="0.6" clipPath="url(#clip0_1107_72821)">
                                                                <path opacity="0.4" d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" fill="white" />
                                                                <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                                                <path d="M8.625 11.25C9.24632 11.25 9.75 10.7463 9.75 10.125C9.75 9.50368 9.24632 9 8.625 9C8.00368 9 7.5 9.50368 7.5 10.125C7.5 10.7463 8.00368 11.25 8.625 11.25Z" fill="white" />
                                                                <path d="M15.375 11.25C15.9963 11.25 16.5 10.7463 16.5 10.125C16.5 9.50368 15.9963 9 15.375 9C14.7537 9 14.25 9.50368 14.25 10.125C14.25 10.7463 14.7537 11.25 15.375 11.25Z" fill="white" />
                                                                <path d="M15.75 14.25C14.9719 15.5953 13.6659 16.5 12 16.5C10.3341 16.5 9.02813 15.5953 8.25 14.25" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                                            </g>
                                                            <defs>
                                                                <clipPath id="clip0_1107_72821">
                                                                    <rect width="24" height="24" fill="white" />
                                                                </clipPath>
                                                            </defs>
                                                        </svg>
                                                    </div>

                                                    <div className="flex items-center gap-3 pt-1">
                                                        <p className="fs-tiny fw-regular opacity-50 pt-1">{charCount}/140</p>
                                                        <p>
                                                            <svg onClick={(e) => {
                                                                e.preventDefault();
                                                                handleSendMessages(liveTraining ? { id: liveTraining?.id, type: 'training' } : { id: liveStream?.id, type: 'stream' })
                                                            }} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <g opacity="0.6" clipPath="url(#clip0_1107_72825)">
                                                                    <path opacity="0.4" d="M6.70555 11.7366C6.76464 11.8995 6.76464 12.078 6.70555 12.241L3.7993 20.745C3.74734 20.8886 3.74044 21.0446 3.7795 21.1922C3.81857 21.3398 3.90175 21.4719 4.01793 21.571C4.1341 21.67 4.27774 21.7313 4.42966 21.7465C4.58157 21.7617 4.73451 21.7303 4.86805 21.6563L20.618 12.6478C20.7353 12.583 20.833 12.4879 20.901 12.3725C20.9691 12.2571 21.005 12.1256 21.005 11.9916C21.005 11.8576 20.9691 11.7261 20.901 11.6107C20.833 11.4953 20.7353 11.4002 20.618 11.3353L4.86805 2.34939C4.73484 2.27489 4.58207 2.2428 4.43014 2.25741C4.27821 2.27203 4.13435 2.33265 4.01779 2.43118C3.90122 2.52971 3.81749 2.66146 3.77778 2.80884C3.73807 2.95621 3.74427 3.11219 3.79555 3.25595L6.70555 11.7366Z" fill="white" />
                                                                    <path d="M6.70555 11.7366C6.76464 11.8995 6.76464 12.078 6.70555 12.241L3.7993 20.745C3.74734 20.8886 3.74044 21.0446 3.7795 21.1922C3.81857 21.3398 3.90175 21.4719 4.01793 21.571C4.1341 21.67 4.27774 21.7313 4.42966 21.7465C4.58157 21.7617 4.73451 21.7303 4.86805 21.6563L20.618 12.6478C20.7353 12.583 20.833 12.4879 20.901 12.3725C20.9691 12.2571 21.005 12.1256 21.005 11.9916C21.005 11.8576 20.9691 11.7261 20.901 11.6107C20.833 11.4953 20.7353 11.4002 20.618 11.3353L4.86805 2.34939C4.73484 2.27489 4.58207 2.2428 4.43014 2.25741C4.27821 2.27203 4.13435 2.33265 4.01779 2.43118C3.90122 2.52971 3.81749 2.66146 3.77778 2.80884C3.73807 2.95621 3.74427 3.11219 3.79555 3.25595L6.70555 11.7366Z" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                                                    <path d="M12.75 12H6.75" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                                                </g>
                                                                <defs>
                                                                    <clipPath id="clip0_1107_72825">
                                                                        <rect width="24" height="24" fill="white" />
                                                                    </clipPath>
                                                                </defs>
                                                            </svg>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            {errors  && (
                                        <p className="fs-tiny fw-regular mt-2 danger-color ">
                                            {errorMsg}
                                        </p>
                                    )}
                                        </form>

                                    </div>

                                </div>
                            </motion.div>
                            :
                            <div className="participent">
                                <div className="overflow-y-auto   pr-0  px-6  lg:pb-6 min-h-[750px] h-[84vh]">
                                    {allParticipant?.map((participant, index) => (
                                        <motion.div
                                            initial={{ x: 100 }}
                                            animate={{

                                                x: 0,
                                                y: -2,
                                                scale: 1,
                                                rotate: 0,
                                            }}
                                        >
                                            <div key={index + 4} id="{msg?.mentioned_message?.id}" className="px-6 pt-4 hover:bg-[#ffffff1a]">


                                                <a href={route('users.profile', participant.id)} className="flex" target="_blank" >


                                                    <div className="w-10 h-10 rounded-full">
                                                        <img className="w-10 h-10 rounded-full cursor-pointer object-cover object-center" src={participant?.dp?.original} alt="" />
                                                    </div>


                                                    <div className="w-full">
                                                        <div className="flex w-full items-center justify-between gap-2 ml-2">
                                                            <div className="flex pt-[0.7rem] gap-x-3">
                                                                <p className="fs-small fw-medium">{participant?.full_name}</p>
                                                                <img className="h-4 w-4" src={top50} alt="" />
                                                            </div>
                                                            <img src={flag} alt="" />
                                                        </div>
                                                        <div className=" flex items-center   mb-2 w-full">
                                                        </div>

                                                        <div className="flex items-center justify-between py-3">


                                                        </div>

                                                    </div>

                                                </a>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>}
                    </div>
                    {/* -------------------  */}
                </div>
            </section>
        </div>
    );
};
export default LiveSession;
