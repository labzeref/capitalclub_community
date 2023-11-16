import React, { useEffect, useState } from "react";
import profilepic from "../../../assets/img/profilepic.png";
import enola from "../../../assets/img/enola.png";
import siyan from "../../../assets/img/siyan.png";
import leaf from "../../../assets/svg/leaf.svg";
import Chatty from "../../../assets/svg/chatty.svg";
import top50 from "../../../assets/svg/top50.svg";
import Layout from "@/Layouts/Layout";
import Button from "../../Components/Button";
import { ReactComponent as Plus } from "../../../assets/svg/Plus.svg";
import { motion } from "framer-motion"
import emojis from '../../Components/Emojis.json'
import axios from "axios";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link, usePage } from "@inertiajs/react";
import ReactToast from "@/Components/ReactToast";
import TopRankMembers from "@/Components/TopRankMembers";
import ReactionsModal from "@/Components/Modal/ReactionsModal";
const Thread = ({ thread, course, topRankMembers }) => {
    useEffect(() => {
        AOS.init();
    }, [])
    function goBack() {
        window.history.back();
    }
    const auth = usePage()
    const user = auth?.props?.auth?.user;
    // console.log('auth ********* :', auth?.props?.auth?.user?.dp?.medium?.url)
    // console.log("thread");
    // console.log(thread);
    // console.log("course");
    // console.log(course);
    const [render, setRender] = useState(0);
    //  ************ Reply to Main Thread    API's function *********

    const [showMainReply, setShowMainReply] = useState(false);
    const [nextPage, setNextPage] = useState(null);
    const [mainReplyData, setMainReplyData] = useState("");
    const [clicked, setClicked] = useState(0)


    //**************** */ Fetching ALL comments on threads ************

    const handleThreadComments = async () => {
        try {
            const response = await axios.get(route("threads.comments", thread?.id));
            // console.log("fetching all comments on thread successfully:", response.data);
            setAllComments(response?.data?.payload?.data)
            setNextPage(response?.data?.payload?.next_page_url)
            setThreadReplyData("");
        } catch (error) {
            ReactToast('error', error?.response?.data?.payload)
            // console.error("Error while posting data:", error);
        }
    };

    const loadMore = async () => {
        try {
            const response = await axios.get(nextPage);
            // console.log("fetching more comments successfully:", response?.data?.payload?.data);

            setAllComments(allComments.concat(response?.data?.payload?.data))
            setNextPage(response?.data?.payload?.next_page_url)
        } catch (error) {
            ReactToast('error', error?.response?.data?.payload)
        }
    }

    useEffect(() => {
        handleThreadComments()
    }, [])




    const handleMainThread = async () => {
        try {
            const response = await axios.post(route("thread-comments.store"), {
                comment: mainReplyData,
                thread_id: thread?.id
            });
            // console.log("hendle main thread successfully:", response.data);

            setShowMainReply(false)
            // setRender(render+1)
            // setAllComments([...allComments, response?.data?.payload]);
            allComments.push(response?.data?.payload)

            setAllComments(allComments)

            setMainReplyData('');

        } catch (error) {
            ReactToast('error', error?.response?.data?.payload)
            // console.error("Error while posting comment:", error);
        }
    };

    useEffect(() => {
        setAllComments(allComments)
    }, [render])





    //*********** */ POST Thread Reply API's function *******

    const [showReply, setShowReply] = useState(-1);
    console.log('show reply ' , showReply)
    const [threadReplyData, setThreadReplyData] = useState("");
    const handleThreadReply = async (comment_id, index) => {
        try {
            const response = await axios.post(route("thread-comments.store"), {
                comment: threadReplyData,
                parent_comment_id: comment_id,
            });
            setShowReply(-1)
            // console.log("Reply posted successfully:", response.data);
            setAllComments((prevPosts) => {
                const updatedPosts = [...prevPosts];
                if (updatedPosts[index] && updatedPosts[index].replies) {
                    updatedPosts[index].replies = [...updatedPosts[index].replies, response.data?.payload];
                }
                return updatedPosts;
            });
            setRender(render + 1)
            setThreadReplyData("");
        } catch (error) {
            ReactToast('error', error?.response?.data?.payload)
            // console.error("Error while post a reply :", error);
        }
    };

    // ************ Emojis Reactions on comments *****


    const handleEmojiClick = async (emoji, postId, index) => {
        try {
            const response = await axios.post(route('toggle-reaction.thread-comments', postId), {
                reaction: emoji?.name,
            });
            console.log('Emoji comment posted successfully:', response.data);
            setAllComments((prevPosts) => {
                const updatedPosts = [...prevPosts];
                updatedPosts[index] = response.data?.payload;
                return updatedPosts;
            });


        } catch (error) {
            ReactToast('error', error?.response?.data?.payload)
            // console.error('Error while emoji API hitting:', error);
        }
    };




    // *********** Reply Emojis Reactions on comments *****


    const handleEmojiReplyClick = async (emoji, reply_id, index, idx) => {
        try {
            const response = await axios.post(route('toggle-reaction.thread-comments', reply_id), {
                reaction: emoji?.name,
            });
            // console.log('Reply Emoji posted successfully:', response.data?.payload);

            setAllComments((prevPosts) => {
                const updatedPosts = [...prevPosts];
                if (updatedPosts[index]?.replies && updatedPosts[index].replies[idx]) {
                    updatedPosts[index].replies[idx] = response.data?.payload;
                }
                return updatedPosts;
            });
        } catch (error) {
            ReactToast('error', error?.response?.data?.payload)
            // console.error('Error while hitting emoji API:', error);
        }
    };

    // ********** Follow Thread  **********
    const [threadData, setThreadData] = useState(thread)
    const handleFollowThread = async (thread_id) => {

        try {
            const response = await axios.post(route("toggle-follow.threads", thread_id));
            console.log("Follow thread successfully:", response);
            if (response?.status === 200) {
                ReactToast('success', response?.data?.payload)
                thread.has_followed = !thread.has_followed;
                setThreadData({ ...thread }); // Pass the updated thread object to setThreadData
            }
        } catch (error) {
            ReactToast('error', error?.response?.data?.payload)
            // console.error("Error while following thread:", error);
        }
    };


    // console.log('follow *********************', threadData)
    const [allComments, setAllComments] = useState([])

    // console.log('all Comments api   *******: ', allComments)

    const [openReactionModal, setOpenReactionModal] = useState(false)
    const [postType, setPostType] = useState('')
    const [commentId, setCommentId] = useState()
    const [replyId, setReplyId] = useState()


    return (
        <div className="pt-[5rem] md:pt-[4rem]">
            <section className="  paddingSectionSmall">
                {openReactionModal &&
                    <ReactionsModal postId={commentId ? commentId : replyId} setOpenReactionModal={setOpenReactionModal} type={postType} />}
                <div className="md:container mx-auto md:px-5 xl:px-0  ">
                    <div data-aos="fade-in" data-aos-delay="100" data-aos-easing="ease" data-aos-duration="300" className="grid grid-cols-12 gap-y-4 md:gap-y-14 lg:gap-x-10">
                        <div className="col-span-12 lg:col-span-3 px-5 md:mx-0 ">
                            <div className="sticky top-2">
                                <div className="text-start mb-[30px]">
                                    <div
                                        onClick={goBack}
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
                                    </div>
                                </div>
                                <h3 className="mb-[18px] md:mb-[24px] break-words">
                                    {course?.title}
                                </h3>
                                <Link href={route('instructors.show', course?.default_instructor?.id)}>
                                    <div className="profile profile-lg">
                                        <img src={course?.default_instructor?.dp?.small?.url} alt="" />
                                        <div>
                                            <h4>{course?.default_instructor?.full_name}</h4>
                                            <p>{course?.default_instructor?.category?.name}</p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>

                        <div className="col-span-12 lg:col-span-6 order-1 lg:order-none px-5 md:mx-0">
                            <div className="mt-4  ">
                                <div className=" thread-inset-border   top-left-border">
                                    <div className="p-4 md:p-6 noise-10 border-rounded-10 ">
                                        <div className="flex items-center justify-between">
                                            <Link
                                                href={route('users.profile', thread?.user?.id)}
                                            >
                                                <div className="profile profile-sm cursor-pointer">
                                                    <img src={thread?.user?.dp?.small?.url} alt="" />
                                                    <div>
                                                        <h4>{thread?.user?.full_name}</h4>
                                                        <p>about {thread?.created_at}</p>
                                                    </div>
                                                </div>
                                            </Link>
                                            <div className="flex items-center gap-2">
                                                <img
                                                    className="w-[24px] md:w-[32px] h-[24px] md:h-[32px]"
                                                    src={leaf}
                                                    alt=""
                                                />
                                                <img
                                                    className="w-[24px] md:w-[32px] h-[24px] md:h-[32px]"
                                                    src={Chatty}
                                                    alt=""
                                                />
                                                <img
                                                    className="w-[24px] md:w-[32px] h-[24px] md:h-[32px]"
                                                    src={top50}
                                                    alt=""
                                                />
                                            </div>
                                        </div>
                                        <div className="flex">
                                            <div className=" min-w-[55px]  "></div>
                                            <div className="max-w-full ">
                                                <p className="fs-regular fs-regular mt-4">
                                                    {thread?.title}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="md:flex items-center   justify-between mt-5">
                                    <div className="flex items-center gap-4">
                                        <button
                                            title="Reply"
                                            onClick={() => {
                                                setShowMainReply(
                                                    !showMainReply
                                                );
                                            }}
                                            className="button primary icon_button md:px-4"
                                        >
                                            <div className="button_container  glitch uppercase">

                                                Reply to thread
                                            </div>
                                        </button>
                                        {user?.id != thread?.user?.id &&
                                            <div onClick={() => { handleFollowThread(thread?.id) }}  >
                                                <Button
                                                    // icon={<Plus />}
                                                    className={` ${threadData?.has_followed
                                                        ? "primary"
                                                        : "secondary"
                                                        }   icon_button  glitch uppercase md:px-4`}
                                                >
                                                    {!threadData?.has_followed ? ' Follow' : 'Following'}

                                                </Button>
                                            </div>}

                                    </div>
                                    <div className="w-full md:w-auto flex justify-end">
                                        <p className="mt-3 md:mt-0 fw-regular fs-regular opacity-50">
                                            {allComments?.length} Replies
                                        </p>
                                    </div>
                                </div>
                                {/* INPUT main thread  reply */}
                                <div
                                    className={`poll-container ${showMainReply ? "show" : ""
                                        }`}
                                >
                                    {showMainReply && (
                                        <div className="reply-div px-3 pb-2">
                                            <div className="mt-6 flex gap-x-2 justify-between">
                                                <img
                                                    className="w-10 h-10 rounded-full object-cover object-center"
                                                    src={user?.dp?.small?.url}
                                                    alt=""
                                                />

                                                <div className=" 2xl:w-[93%] w-[90%] ">
                                                    <textarea
                                                        autoFocus
                                                        rows="1"
                                                        value={mainReplyData}
                                                        onChange={(e) => { setMainReplyData(e.target.value) }}
                                                        onKeyDown={(e) => {
                                                            if (e.key === "Enter" && !e.shiftKey) {
                                                                e.preventDefault();
                                                                handleMainThread();
                                                            }
                                                        }}
                                                        className="noise-10 border-rounded-20 inset-border border-[#ffffff1a] w-full px-[24px] py-[8px] fs-regular fw-regular outline-0 opacity-50  focus:outline-none focus:ring-0 focus:border-[#ffffff]  "
                                                        placeholder="What’s on your mind?"
                                                    ></textarea>
                                                    <div className="w-full flex justify-end">
                                                        <div
                                                            onClick={() => { handleMainThread(); }} >
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

                                {/* ****  Comments Map****  */}

                                {allComments?.map((data, index) => (
                                    <div key={index + 4}>
                                        <motion.div
                                            initial={{ y: -30 }}
                                            animate={{

                                                x: 0,
                                                y: 0,
                                            }}
                                        >
                                            <div className={` ${data?.replies?.length > 0 && 'bottom-left-thread-shadow '} `}>
                                                <div className="relative">
                                                    <div className="noise-10 border-rounded-10 inset-border px-4 pt-4 pb-5 mt-8 mb-5 relative">
                                                        <div className="flex items-center gap-4">
                                                            <Link
                                                                href={route('users.profile', data?.user?.id)}
                                                            >
                                                                <div className="relative">
                                                                    <img
                                                                        className="h-10  w-[40px] rounded-full object-cover object-center"
                                                                        src={data?.user?.dp?.small?.url}
                                                                        alt=""
                                                                    />
                                                                    <img
                                                                        className="h-8 w-8 absolute -bottom-4 left-1"
                                                                        src={leaf}
                                                                        alt=""
                                                                    />
                                                                </div>
                                                            </Link>
                                                            <div>
                                                                <div className="flex items-center gap-2 mb-[6px]">
                                                                    <p className="fw-medium fs-small">
                                                                        {data?.user?.full_name}
                                                                    </p>
                                                                    <p className="opacity-50 fw-regular fs-tiny">
                                                                        {data?.created_at}
                                                                    </p>
                                                                </div>
                                                                <p className="fw-regular fs-tiny">
                                                                    {data?.value}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div
                                                        onClick={() => {
                                                            setShowReply(  showReply < 0 ? index :  -1 );
                                                        }}
                                                        className="cursor-pointer absolute right-10 -bottom-4 w-[90px] px-3 py-1 rounded-3xl flex items-center justify-center gap-2 bg-[#000000] border-[1px] border-[#ffffff1a] uppercase fs-small  "
                                                    >
                                                        Reply
                                                    </div>
                                                    <div className="absolute left-16 -bottom-3">
                                                        <div className="flex items-center gap-1">
                                                            {data?.reactions_count > 0 &&
                                                                <div onClick={() => { setOpenReactionModal(true); setPostType('threadComment'); setCommentId(data?.id) }} className="cursor-pointer bg-[#000000] px-3 rounded-3xl border-[1px] border-[#ffffff1a] pt-[2px] flex items-center justify-center gap-1   h-6">
                                                                    <p className="fw-regular fs-tiny  ">
                                                                        {data?.reactions?.map((reaction, index) => (
                                                                            emojis.find((emoji) => emoji.name === reaction)?.emoji
                                                                        ))}

                                                                    </p>
                                                                    <p className="fw-regular fs-small">
                                                                        {data?.reactions_count && data?.reactions_count}
                                                                    </p>
                                                                </div>
                                                            }
                                                            <div className="group relative cursor-pointer bg-[#000000]  rounded-3xl border-[1px] border-[#ffffff1a] flex items-center justify-center   w-6 h-6">
                                                                {
                                                                    emojis.find((emoji) => emoji.name === data?.my_reaction)?.emoji
                                                                    ??
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
                                                                }

                                                                <div className="hidden group-hover:block    ">
                                                                    <div className="p-2 absolute -ml-[2rem] -mt-[3rem] inset-border w-[170px] h-[40px] bg-white rounded-full flex justify-between">
                                                                        {emojis.map((emoji) => (
                                                                            <div
                                                                                onClick={() => { handleEmojiClick(emoji, data.id, index) }}
                                                                                key={emoji.id}
                                                                                className="rounded-full hover:scale-125 transition-all ease-in-out delay-3000 cursor-pointer bg-white"
                                                                            >
                                                                                {emoji.emoji}
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* reply input  */}
                                                <div className={`poll-container ${showReply == index ? "show" : ""}`}  >
                                                    {showReply == index && (
                                                        <div className="reply-div px-3 pb-2">
                                                            <div className="mt-6 flex gap-x-2 justify-between">
                                                                <img
                                                                    className="w-10 h-10 rounded-full object-cover object-center"
                                                                    src={user?.dp?.small?.url}
                                                                    alt=""
                                                                />

                                                                <div className=" 2xl:w-[93%] w-[90%] ">
                                                                    <textarea
                                                                        autoFocus
                                                                        rows="1"
                                                                        value={threadReplyData}
                                                                        onChange={(e) => {
                                                                            setThreadReplyData(
                                                                                e.target.value
                                                                            );
                                                                        }}
                                                                        onKeyDown={(e) => {
                                                                            if (e.key === "Enter" && !e.shiftKey) {
                                                                                e.preventDefault();
                                                                                handleThreadReply(data?.id, index)
                                                                            }
                                                                        }}
                                                                        className="noise-10 border-rounded-20 inset-border border-[#ffffff1a] w-full px-[24px] py-[8px] fs-regular fw-regular outline-0 opacity-50  focus:outline-none focus:ring-0 focus:border-[#ffffff]  "
                                                                        placeholder="What’s on your mind?"
                                                                    ></textarea>
                                                                    <div className="w-full flex justify-end">
                                                                        <div
                                                                            onClick={() => handleThreadReply(data?.id, index)}  >
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
                                                {/* reply input end  */}
                                            </div>

                                        </motion.div>
                                        {/* *************** Reply map section *********  */}
                                        {data?.replies?.map((item, idx) => (
                                            <motion.div
                                                initial={{ y: -50 }}
                                                animate={{

                                                    y: 0,
                                                }}
                                            >
                                                <div key={idx + 4} className="relative">
                                                    <div className="noise-10 border-rounded-10 inset-border px-4 pt-4 pb-5  mb-5 relative ml-12">
                                                        <div className="flex items-center gap-4">
                                                            <Link
                                                                href={route('users.profile', item?.user?.id)}
                                                            >
                                                                <div className="relative">
                                                                    <img
                                                                        className="h-10  w-[40px] rounded-full object-cover object-center"
                                                                        src={item?.user?.dp?.small?.url}
                                                                        alt=""
                                                                    />
                                                                    <img
                                                                        className="h-8 w-8 absolute -bottom-4 left-1"
                                                                        src={Chatty}
                                                                        alt=""
                                                                    />
                                                                </div>
                                                            </Link>
                                                            <div>
                                                                <div className="flex items-center gap-2 mb-[6px]">
                                                                    <p className="fw-medium fs-small">
                                                                        {item?.user?.full_name}
                                                                    </p>
                                                                    <p className="opacity-50 fw-regular fs-tiny">
                                                                        {item?.created_at}
                                                                    </p>
                                                                </div>
                                                                <p className="fw-regular fs-tiny">
                                                                    {item?.value}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="absolute left-[8rem] -bottom-3">
                                                        <div className="flex items-center gap-1">
                                                            {item?.reactions_count > 0 &&
                                                                <div onClick={() => { setOpenReactionModal(true); setPostType('threadComment'); setReplyId(item?.id) }} className="cursor-pointer bg-[#000000] px-3 rounded-3xl border-[1px] border-[#ffffff1a] pt-[2px] flex items-center justify-center gap-1   h-6">
                                                                    <p className="fw-regular fs-tiny">

                                                                        {item?.reactions?.map((reaction, index) => (
                                                                            emojis.find((emoji) => emoji.name === reaction)?.emoji
                                                                        ))}


                                                                    </p>
                                                                    <p className="fw-regular fs-small">
                                                                        {item?.reactions_count && item?.reactions_count}
                                                                    </p>
                                                                </div>
                                                            }
                                                            <div className="group relative cursor-pointer bg-[#000000]  rounded-3xl border-[1px] border-[#ffffff1a] flex items-center justify-center   w-6 h-6">
                                                                {
                                                                    emojis.find((emoji) => emoji.name === item?.my_reaction)?.emoji
                                                                    ??
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
                                                                }

                                                                <div className="hidden group-hover:block    ">
                                                                    <div className="p-2 absolute -ml-[2rem] -mt-[3rem] inset-border w-[170px] h-[40px] bg-white rounded-full flex justify-between">
                                                                        {emojis.map((emoji) => (
                                                                            <div
                                                                                onClick={() => { handleEmojiReplyClick(emoji, item.id, index, idx) }}
                                                                                key={emoji.id}
                                                                                className="rounded-full hover:scale-125 transition-all ease-in-out delay-3000 cursor-pointer bg-white"
                                                                            >
                                                                                {emoji.emoji}
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </motion.div>
                                        ))}




                                    </div>
                                ))}






                            </div>
                        </div>















                        {/* *********** TOP RANK MEMBERS**********  */}
                        <div  className="col-span-12 lg:col-span-3 order-2 lg:order-3  ">
                            <motion.div
                                initial={{ y: 100 }}
                                animate={{
                                    y: 0,


                                }}
                            >               <div className="grid grid-cols-12  gap-x-4 px-5 lg:px-3 sticky pt-3 top-0">

                                    <TopRankMembers topRankMembers={topRankMembers} />

                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>


            {/* *********** Load more button************  */}
            {
                nextPage &&
                <div className="grid grid-cols-12">
                    <div className="col-span-12">
                        <div className="flex items-center justify-center md:pt-[4rem] ">
                            <button className="button secondary" onClick={() => loadMore()}>
                                <div className="button_container glitch uppercase">
                                    {/* <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <g clipPath="url(#clip0_829_47187)">
                                        <path
                                            opacity="0.2"
                                            d="M10.2266 17.1602C14.3687 17.1602 17.7266 13.8023 17.7266 9.66016C17.7266 5.51802 14.3687 2.16016 10.2266 2.16016C6.08443 2.16016 2.72656 5.51802 2.72656 9.66016C2.72656 13.8023 6.08443 17.1602 10.2266 17.1602Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M13.125 3.46484C14.4334 4.07505 15.5402 5.04627 16.3153 6.26423C17.0903 7.48219 17.5014 8.89619 17.5 10.3398C17.5 12.329 16.7098 14.2366 15.3033 15.6431C13.8968 17.0497 11.9891 17.8398 10 17.8398C8.01088 17.8398 6.10323 17.0497 4.6967 15.6431C3.29018 14.2366 2.5 12.329 2.5 10.3398C2.49865 8.89619 2.90969 7.48219 3.68475 6.26423C4.45982 5.04627 5.56665 4.07505 6.875 3.46484"
                                            stroke="white"
                                            strokeOpacity="0.6"
                                            strokeWidth="1.2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_829_47187">
                                            <rect
                                                width="20"
                                                height="20"
                                                fill="white"
                                            />
                                        </clipPath>
                                    </defs>
                                </svg> */}
                                    Load more
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

Thread.layout = (page) => <Layout children={page} title="" />;
export default Thread;
