import React, { useEffect, useState } from "react";
import profilepic from "../../../assets/img/profilepic.png";
import enola from "../../../assets/img/enola.png";
import siyan from "../../../assets/img/siyan.png";
import leaf from "../../../assets/svg/leaf.svg";
import Chatty from "../../../assets/svg/chatty.svg";
import top50 from "../../../assets/svg/top50.svg";
import Layout from "@/Layouts/Layout";
import { Link, usePage } from "@inertiajs/react";
import Button from "../../Components/Button";
import { ReactComponent as Chat } from "../../../assets/svg/chat.svg";
import { ReactComponent as Plus } from "../../../assets/svg/Plus.svg";
import SessionLayout from "@/Layouts/SessionLayout";
import axios from "axios";
import AOS from 'aos';
import 'aos/dist/aos.css';
import ReactToast from "@/Components/ReactToast";
import IconButton from "@/Components/IconButton";
import TabButton from "@/Components/TabButton";
import TopRankMembers from "@/Components/TopRankMembers";
const Discussion = ({ course, topRankMembers }) => {
    const auth = usePage()
    const user = auth?.props?.auth?.user;
    useEffect(() => {
        AOS.init();
    }, [])
    // console.log('topRankMembers');
    // console.log(topRankMembers);


    const [apiNewThreads, setApiNewThreads] = useState([])
    const [nextPage, setNextPage] = useState(null);
 const [callAllThread , setCallAllThread] = useState(false)
 const [isFollowedThread , setIsFollowedThread] = useState(false)
    const [showNewDiscussion, setShowNewDiscussion] = useState(false)
    const [newDiscussionData, setNewDiscussionData] = useState('')
 

// **************getting all thread API's **************
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    route("courses.threads", course?.id)
                );
                // console.log('get new threads ', response?.data?.payload)
                setNextPage(response?.data?.payload?.next_page_url)
                setApiNewThreads(response.data?.payload?.data);
            } catch (error) {
                console.error("Error:", error);
            }
        };
        fetchData();
    }, [callAllThread]);

 


    const loadMore = async () => {
        try {
            const response = await axios.get(nextPage);
            // console.log("fetching more comments successfully:", response?.data?.payload?.data);

            setApiNewThreads(apiNewThreads.concat(response?.data?.payload?.data))
            setNextPage(response?.data?.payload?.next_page_url)
        } catch (error) {
            ReactToast('error', error?.response?.data?.payload)
        }
    }


    // const [followdTab, setFollowedTab] = useState(false)
    // const [followedThreadsData, setFollowedThreadsData] = useState([])

    // ********GETTING FOLLOWED THREADS ONLY****************
    const handleGetFollowedThread = async () => {
        try {
            const response = await axios.get( route("courses.threads", {course: course?.id, following: true}) );
            // console.log("got followed threads successfully:", response.data);
            setApiNewThreads(response.data?.payload?.data);
            // setFollowedThreadsData(response?.data?.payload);
        } catch (error) {
            ReactToast('error', error?.response?.data?.payload)
            console.error("Error while followed threads:", error);
        }
    }


    // CREATE NEW THREAD
    const handleNewDiscussion = async () => {
        try {
            const response = await axios.post(route("courses.threads.store", course?.id), {
                title: newDiscussionData,
            });
            // console.log("new thread created successfully:", response.data);
            // setApiNewThreads(response?.data?.payload);
            // apiNewThreads.unshift(response?.data?.payload);
            setApiNewThreads([...apiNewThreads , response?.data?.payload])
            setIsFollowedThread(false)
            setCallAllThread(!callAllThread)
            setNewDiscussionData("");
            setShowNewDiscussion(false)
        } catch (error) {
            ReactToast('error', error?.response?.data?.payload)
            console.error("Error while creating new thread:", error);
        }
    }

    //    ********* Follow Threads **********

    const handleFollowThread = async (thread_id, index) => {
        try {
            const response = await axios.post(route("toggle-follow.threads", thread_id));
            // console.log("Follow thread successfully:", response);
            if (response?.status === 200) {
                ReactToast('success', response?.data?.payload)
                setApiNewThreads((prevPosts) => {
                    const updatedPosts = [...prevPosts];
                    if (updatedPosts[index]) {
                        updatedPosts[index].has_followed = !updatedPosts[index].has_followed;
                    }
                    return updatedPosts;
                });
            }
        } catch (error) {
            ReactToast('error', error?.response?.data?.payload)
            console.error("Error while following thread:", error);
        }
    };


    const { url } = usePage();
    function goBack() {
        window.history.back();
    }
    return (
        <div className="paddingSectionLarge">
            <section className="  paddingSectionSmall">
                <div className="md:container mx-auto md:px-5 xl:px-0">
                    <div data-aos="fade-in" data-aos-delay="100" data-aos-easing="ease" data-aos-duration="300" className="grid grid-cols-12 lg:gap-y-12 gap-y-5 lg:gap-x-14">
                        <div className="col-span-12 lg:col-span-3 px-5 md:mx-0">
                            <div className="sticky top-2">
                                <div className="text-start mb-[30px] ">
                                    <Link href={route('courses.play', course?.id)}
                                        className="text-[15px] cursor-pointer text-[#FFFFFF] font-normal opacity-50 flex items-center"
                                    >
                                        <span className="mr-2">
                                            <svg
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <g clipPath="url(#clip0_227_18640)">
                                                    <path
                                                        opacity="0.2"
                                                        d="M10.5 5.25L3.75 12L10.5 18.75L10.5 5.25Z"
                                                        fill="currentColor"
                                                    ></path>
                                                    <path
                                                        d="M10.5 5.25L3.75 12L10.5 18.75L10.5 5.25Z"
                                                        stroke="currentColor"
                                                        strokeOpacity="0.6"
                                                        strokeWidth="1.2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    ></path>
                                                    <path
                                                        d="M20.25 12L10.5 12"
                                                        stroke="currentColor"
                                                        strokeOpacity="0.6"
                                                        strokeWidth="1.2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    ></path>
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_227_18640">
                                                        <rect
                                                            width="24"
                                                            height="24"
                                                            fill="currentColor"
                                                            transform="translate(24) rotate(90)"
                                                        ></rect>
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                        </span>

                                        Back to lesson
                                    </Link>
                                </div>
                                <h3 className="mb-[24px] break-words">{course?.title}</h3>
                                <Link href={route('instructors.show', course?.default_instructor?.id)}>
                                    <div className="profile profile-lg">
                                        <img src={course?.default_instructor?.dp?.medium?.url} alt="" />
                                        <div>
                                            <h4>{course?.default_instructor?.full_name}</h4>
                                            <p>{course?.default_instructor?.category?.name}</p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div className="col-span-12 lg:col-span-6 lg:order-1 order-2  px-5 md:mx-0">
                            <div className="md:flex items-center justify-between   gap-y-5">
                                <h3>Discussion Form</h3> 
                                <div className="w-full md:w-[40%]  flex justify-end ">
                                    <button onClick={() => { setShowNewDiscussion(!showNewDiscussion) }} className="button primary px-3 md:px-1  mt-2">
                                        <div className="button_container glitch">
                                            New discussion
                                        </div>
                                    </button>
                                </div>
                            </div>


                            {/* *********NEW DISCUSSION FORM ********** */}

                            {/* main thread  reply */}
                            <div
                                className={`poll-container ${showNewDiscussion ? "show" : ""
                                    }`}
                            >
                                {showNewDiscussion && (
                                    <div className="reply-div px-3 pb-2">
                                        <div className="mt-6 flex gap-x-2 justify-between">
                                            <img
                                                className="w-10 h-10 rounded-full object-cover object-center"
                                                src={user?.dp?.small?.url}
                                                alt=""
                                            />

                                            <div className=" 2xl:w-[93%] w-[90%] ">
                                                <textarea
                                                    rows="3"
                                                    value={newDiscussionData}
                                                    onChange={(e) => {
                                                        setNewDiscussionData(
                                                            e.target.value
                                                        );
                                                    }}
                                                    onKeyDown={(e) => {
                                                        if (e.key === "Enter" && !e.shiftKey) {
                                                            e.preventDefault();
                                                            handleNewDiscussion()
                                                        }
                                                    }}
                                                    className="noise-10 border-rounded-10 inset-border border-[#ffffff1a] w-full px-[24px] py-[8px] fs-regular fw-regular outline-0 opacity-50  focus:outline-none focus:ring-0 focus:border-[#ffffff]  "
                                                    placeholder="What’s on your mind?"
                                                ></textarea>
                                                <div className="w-full flex justify-end">
                                                    <div
                                                        onClick={
                                                            handleNewDiscussion
                                                        }
                                                    >
                                                        <Button
                                                            className={
                                                                "secondary noise-10 mt-[10px] uppercase"
                                                            }
                                                        >
                                                            Post
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            {/* main thread reply end  */}

                            {/* ********NEW DISCUSSION FORM END *********** */}

                            <div className="flex items-center overflow-x-scroll lg:overflow-x-hidden mt-8">
                                {/* <div onClick={()=>{setCallAllThread(callAllThread+1)} }
                                    className="py-3 px-6 text-base text-[#FFFFFF] font-normal flex items-center bg-[#ffffff1a] border-b-[2px] border-b-[#FFFFFF]"
                                >

                                    All Threads
                                </div>  */}
                                <TabButton onClick={()=>{setCallAllThread(!callAllThread) ; setIsFollowedThread(false) }} className={`mx-4 ${!isFollowedThread && 'active'} glitch`} activeBottom={` ${!isFollowedThread && 'active-tab-block'} `} > All Threads  </TabButton>
                                <TabButton  onClick={()=>{handleGetFollowedThread() ; setIsFollowedThread(true)  }}  className={`mx-4 ${isFollowedThread && 'active'} glitch`} activeBottom={` ${isFollowedThread && 'active-tab-block'} `} >   Following  </TabButton>
                                {/* <div onClick={()=>{handleGetFollowedThread()}  } className="py-3 px-6 text-base text-[#FFFFFF] font-normal flex items-center hover:bg-[#ffffff1a] border-b-[2px] border-b-[#000] hover:border-b-[2px] hover:border-b-[#FFFFFF] transition duration-300">

                                    Following
                                </div> */}
                            </div>
                            <div className="my-[1rem]"></div>
                            {apiNewThreads?.length > 0 ?
                                <>
                                    {apiNewThreads?.map((data, index) => (


                                            <div key={index + 2} className="discussion-card relative ">
                                                <div className="my-[8px] discussion-card ">
                                                    <Link
                                                        href={route("threads.view", data?.id)}
                                                    >
                                                        {" "}
                                                        <div className=" thread-inset-border   top-left-border">
                                                        <div className="p-4 md:p-6 noise-10 border-rounded-10 ">
                                                            <div className="flex items-center justify-between">
                                                                <div className="profile profile-sm">
                                                                    <div className="min-w-[8%]">
                                                                        <img
                                                                            src={data?.user?.dp?.small?.url}
                                                                            alt=""
                                                                        />
                                                                    </div>
                                                                    <div>
                                                                        <h4>{data?.user?.full_name}</h4>
                                                                        <p>
                                                                            about {data?.created_at}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                                {data?.user?.badges?.length > 0 && <>
                                                                <div className="flex items-center gap-2">
                                                                    {data?.user?.badges?.map((badge , index)=>(
                                                                    <img

                                                                        className="w-[24px] md:w-[32px] h-[24px] md:h-[32px]"
                                                                        src={`data:image/svg+xml;utf8,${encodeURIComponent(badge?.svg)}`}
                                                                        alt=""
                                                                    />
                                                                    ))}

                                                                </div>
                                                                </>}
                                                            </div>

                                                            <div className="flex  ">
                                                                <div className=" min-w-[55px] "></div>
                                                                <div className=" w-full ">
                                                                    <p className="fs-regular fs-regular mt-4">
                                                                        {data?.title}

                                                                    </p>

                                                                    <div className="flex justify-between mt-[1rem] ">
                                                                        <div>
                                                                        {data?.followers?.length > 0 &&  <div className="flex items-center mb-5">
                                                                        { data?.followers[0] &&    <img
                                                                                    className="w-[32px]  h-[32px] border-[2px] object-cover border-black  rounded-full overflow-hidden"
                                                                                    src={data?.followers[0]?.dp?.small?.url}
                                                                                    alt=""
                                                                                />
                                                                        }

                                                                                { data?.followers[1] &&    <img
                                                                                    className="w-[32px] h-[32px] border-[2px] border-black rounded-full overflow-hidden -ml-[1rem]"
                                                                                    src={data?.followers[1]?.dp?.small?.url}
                                                                                    alt=""
                                                                                />
}
                                                                            { data?.followers[2] &&    <img
                                                                                    className="w-[32px] h-[32px] border-[2px] border-black rounded-full overflow-hidden -ml-[1rem]"
                                                                                    src={data?.followers[2]?.dp?.small?.url}
                                                                                    alt=""
                                                                                />
                                                                            }
                                                                          { data?.followers?.length > 3 &&      <p className="fw-medium fs-tiny w-[32px] h-[32px] border-[2px] border-black rounded-full overflow-hidden -ml-[1rem] backdrop-blur-md bg-white/60  py-[6px] text-center  ">

                                                                                {data?.followers?.length} +
                                                                                </p>
}
                                                                            </div> }
                                                                        </div>


                                                                        <div className="flex justify-between md:space-x-[1.5rem] space-x-[0.5rem]">
                                                                            <div className="flex space-x-2">
                                                                                <div className="icon-div">
                                                                                    <svg
                                                                                        width="24"
                                                                                        height="24"
                                                                                        viewBox="0 0 24 24"
                                                                                        fill="none"
                                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                                    >
                                                                                        <g
                                                                                            opacity="0.6"
                                                                                            clipPath="url(#clip0_1107_69831)"
                                                                                        >
                                                                                            <path
                                                                                                opacity="0.4"
                                                                                                d="M12 5.25C4.5 5.25 1.5 12 1.5 12C1.5 12 4.5 18.75 12 18.75C19.5 18.75 22.5 12 22.5 12C22.5 12 19.5 5.25 12 5.25ZM12 15.75C11.2583 15.75 10.5333 15.5301 9.91661 15.118C9.29993 14.706 8.81928 14.1203 8.53545 13.4351C8.25162 12.7498 8.17736 11.9958 8.32205 11.2684C8.46675 10.541 8.8239 9.8728 9.34835 9.34835C9.8728 8.8239 10.541 8.46675 11.2684 8.32205C11.9958 8.17736 12.7498 8.25162 13.4351 8.53545C14.1203 8.81928 14.706 9.29993 15.118 9.91661C15.5301 10.5333 15.75 11.2583 15.75 12C15.75 12.9946 15.3549 13.9484 14.6517 14.6517C13.9484 15.3549 12.9946 15.75 12 15.75Z"
                                                                                                fill="white"
                                                                                            />
                                                                                            <path
                                                                                                d="M12 5.25C4.5 5.25 1.5 12 1.5 12C1.5 12 4.5 18.75 12 18.75C19.5 18.75 22.5 12 22.5 12C22.5 12 19.5 5.25 12 5.25Z"
                                                                                                stroke="white"
                                                                                                strokeOpacity="0.6"
                                                                                                strokeWidth="1.2"
                                                                                                strokeLinecap="round"
                                                                                                strokeLinejoin="round"
                                                                                            />
                                                                                            <path
                                                                                                d="M12 15.75C14.0711 15.75 15.75 14.0711 15.75 12C15.75 9.92893 14.0711 8.25 12 8.25C9.92893 8.25 8.25 9.92893 8.25 12C8.25 14.0711 9.92893 15.75 12 15.75Z"
                                                                                                stroke="white"
                                                                                                strokeOpacity="0.6"
                                                                                                strokeWidth="1.2"
                                                                                                strokeLinecap="round"
                                                                                                strokeLinejoin="round"
                                                                                            />
                                                                                        </g>
                                                                                        <defs>
                                                                                            <clipPath id="clip0_1107_69831">
                                                                                                <rect
                                                                                                    width="24"
                                                                                                    height="24"
                                                                                                    fill="white"
                                                                                                />
                                                                                            </clipPath>
                                                                                        </defs>
                                                                                    </svg>
                                                                                </div>
                                                                                <p className="fw-regular fs-regular opacity-50 pt-[3px]">
                                                                                    {data?.followers_count}
                                                                                </p>
                                                                            </div>


                                                                            <div className="flex space-x-2">
                                                                                <div className="icon-div">
                                                                                    <svg
                                                                                        width="24"
                                                                                        height="24"
                                                                                        viewBox="0 0 24 24"
                                                                                        fill="none"
                                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                                    >
                                                                                        <g
                                                                                            opacity="0.6"
                                                                                            clipPath="url(#clip0_1107_69804)"
                                                                                        >
                                                                                            <path
                                                                                                opacity="0.4"
                                                                                                d="M7.49258 19.7916C9.38308 20.8857 11.607 21.255 13.7496 20.8305C15.8923 20.4061 17.8075 19.2169 19.1381 17.4847C20.4687 15.7525 21.124 13.5955 20.9817 11.4158C20.8394 9.23617 19.9093 7.18265 18.3648 5.63813C16.8202 4.0936 14.7667 3.16349 12.5871 3.0212C10.4074 2.87892 8.2504 3.53417 6.51819 4.8648C4.78597 6.19543 3.59679 8.1106 3.17235 10.2533C2.74792 12.3959 3.11719 14.6198 4.21133 16.5103L3.03852 20.0119C2.99445 20.144 2.98806 20.2858 3.02005 20.4214C3.05205 20.557 3.12117 20.681 3.21967 20.7795C3.31817 20.878 3.44216 20.9471 3.57774 20.9791C3.71331 21.0111 3.85512 21.0047 3.98727 20.9606L7.49258 19.7916Z"
                                                                                                fill="white"
                                                                                            />
                                                                                            <path
                                                                                                d="M7.49258 19.7916C9.38308 20.8857 11.607 21.255 13.7496 20.8305C15.8923 20.4061 17.8075 19.2169 19.1381 17.4847C20.4687 15.7525 21.124 13.5955 20.9817 11.4158C20.8394 9.23617 19.9093 7.18265 18.3648 5.63813C16.8202 4.0936 14.7667 3.16349 12.5871 3.0212C10.4074 2.87892 8.2504 3.53417 6.51819 4.8648C4.78597 6.19543 3.59679 8.1106 3.17235 10.2533C2.74792 12.3959 3.11719 14.6198 4.21133 16.5103L3.03852 20.0119C2.99445 20.144 2.98806 20.2858 3.02005 20.4214C3.05205 20.557 3.12117 20.681 3.21967 20.7795C3.31817 20.878 3.44216 20.9471 3.57774 20.9791C3.71331 21.0111 3.85512 21.0047 3.98727 20.9606L7.49258 19.7916Z"
                                                                                                stroke="white"
                                                                                                strokeOpacity="0.6"
                                                                                                strokeWidth="1.2"
                                                                                                strokeLinecap="round"
                                                                                                strokeLinejoin="round"
                                                                                            />
                                                                                        </g>
                                                                                        <defs>
                                                                                            <clipPath id="clip0_1107_69804">
                                                                                                <rect
                                                                                                    width="24"
                                                                                                    height="24"
                                                                                                    fill="white"
                                                                                                />
                                                                                            </clipPath>
                                                                                        </defs>
                                                                                    </svg>
                                                                                </div>
                                                                                <p className="fw-regular fs-regular opacity-50 pt-[3px]">
                                                                                    {data?.comments_count}
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                    <div className=" to-wrapper  mt-4 h-[50px] ">
                                                        <div className="reply-to-thread  pb-2">
                                                            <div className="flex items-center justify-evenly mt-5  ">
                                                                <div className="flex items-center gap-4">



                                                                    <div>
                                                                        <Link
                                                                            href={route("threads.view", data?.id)}
                                                                        >
                                                                            <div className="block md:hidden">
                                                                                <IconButton
                                                                                    className={" secondary icon_button"}
                                                                                    icon={<Chat />}
                                                                                ></IconButton>
                                                                            </div>
                                                                            <div className="md:block hidden">


                                                                                <Button
                                                                                    // icon={<Chat />}
                                                                                    className={` ${data?.has_followed
                                                                                        ? "secondary"
                                                                                        : "secondary"
                                                                                        }   icon_button  glitch uppercase md:px-4`}
                                                                                >
                                                                                    Reply to thread

                                                                                </Button>
                                                                            </div>
                                                                        </Link>
                                                                    </div>
                                                                    {user?.id != data?.user?.id &&
                                                                        <div onClick={() => handleFollowThread(data?.id, index)}>
                                                                            <div className="block md:hidden">
                                                                                <IconButton
                                                                                    className={`${data?.has_followed ? "primary" : "secondary"}     icon_button`}
                                                                                    icon={<Plus />}
                                                                                ></IconButton>
                                                                            </div>
                                                                            <div className="md:block hidden">
                                                                                <Button
                                                                                    // icon={<Plus />}
                                                                                    className={` ${data?.has_followed
                                                                                        ? "primary"
                                                                                        : "secondary"
                                                                                        }   icon_button  glitch uppercase md:px-4`}
                                                                                >
                                                                                 {data?.has_followed ?   <p className="fw-regular fs-small hidden lg:block">  Following</p>
                                                                                    : <p className="fw-regular fs-small hidden lg:block">  Follow</p> }

                                                                                </Button>
                                                                            </div>

                                                                        </div>}

                                                                </div>
                                                                <p className="fw-regular fs-regular opacity-50 px-3">
                                                                    {data?.comments_count} Replies
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>



                                    ))}

                                </> :
                                <>
                                    <p className="opacity-50 text-center pt-10"> No Discussion</p>
                                </>}

                    { nextPage &&
                <div className="grid grid-cols-12">
                <div className="col-span-12">
                    <div className="flex items-center justify-center md:pt-[4rem] ">
                        <button className="button secondary"
                        onClick={() => loadMore()}
                        >
                            <div className="button_container glitch uppercase">

                                Load more
                            </div>
                        </button>
                    </div>
                </div>
            </div>
            }




                        </div>
                        <div className="col-span-12 lg:col-span-3 order-1 lg:order-2 ">
                        <div className="grid grid-cols-12  gap-x-4 px-5 lg:px-3 sticky pt-3 top-0">
                          <TopRankMembers topRankMembers={topRankMembers} />
                        </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

Discussion.layout = (page) => <SessionLayout children={page} title="" />;
export default Discussion;
