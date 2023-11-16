import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import AOS from 'aos';
import 'aos/dist/aos.css';
import cross from "../../../assets/cross.png";
import siyan from "../../../assets/img/siyan.png";
import leaf from "../../../assets/svg/leaf.svg";

import Button from "../../Components/Button";
import check from "../../../assets/checked.png";
import uncheck from "../../../assets/uncheck.png";
import enola from "../../../assets/img/enola.png";
import discussionMain from "../../../assets/img/dicussion-main.jpg";
import dissProfile from "../../../assets/img/discussion-profile-pic.jpg";
import emojis from '../Emojis.json'
import { motion } from "framer-motion"
import profilepic from "../../../assets/img/profilepic.png";
import { post } from "jquery";
import { Link } from "@inertiajs/react";
import Toast from "../Toast/Toast";
import PlyrComponent from "../PlyrComponent";
import ReportModal from "./ReportModal";
import { PostsContext } from '../../Store/PostsProvider';
import ReactionsModal from "./ReactionsModal";


const CommunityModal = ({ layoutid, user, modalPostData, indexforModal, handleEmojiMain, selectedEmojis, handleChoiceSelect, openModal, setOpenModal, bookmarkPost, deletePost }) => {

    const [postingComment, setPostingComment] = useState(false);

    useEffect(() => {
        AOS.init();
    }, [])
    const { contextPosts, updatePosts, handleEmojiClick } = useContext(PostsContext);
    const [showModal, setShowModal] = useState(false);
    const [mainCommentInput, setMainCommentInput] = useState(true);
    const [showDropdown, setShowDropdown] = useState(false);
    const [clicked, setClicked] = useState(0)
    const [modalReactionCount, setModalReactionCount] = useState(0)
    const [showCommentInput, setShowCommentInput] = useState(-1);
    const [commentData, setCommentData] = useState({
        comment: "",
        reply: "",
    });
    const [postComments, setPostComments] = useState(null);
    // console.log('single post from context :' , singlePost)
    const idData = contextPosts?.find((post) => post?.id === modalPostData)

    const [data, setData] = useState(idData);
// console.log('data' , data)
    useEffect(() => {
        setData(idData)
    }, [idData])

    const findCommentIndexById = (commentId) => {
        const commentIndex = postComments.findIndex((comment) => comment?.id == commentId)

        return commentIndex;
    }

    const findReplyIndexById = (commentId, replyId) => {
        const commentIndex = postComments.findIndex((comment) => comment?.id == commentId)

        const replyIndex = postComments[commentIndex].replies.findIndex(reply => reply?.id == replyId);

        return [commentIndex, replyIndex];
    }

    // GET REQUEST FOR CURRENT POST OPEN

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    route("posts.comments", data?.id)
                );
                setPostComments(response.data?.payload?.data);
            } catch (error) {
                console.error("Error:", error);
            }
        };
        fetchData();
    }, [clicked]);
    //  END GET REQUEST

    //comment Function
    const postComment = async (post_id = "", comment_id = "") => {

        if (post_id) {
            try {
                if(postingComment) {
                    return;
                }
                setPostingComment(true)
                const response = await axios.post(route("post-comments.store"), {
                    comment: commentData?.comment,
                    post_id,
                }).then(response => {
                    setPostingComment(false)
                });
                // console.log("comment posted successfully:", response.data);
                setCommentData((prevState) => ({
                    // ...prevState,
                    comment: "",
                }));
                setMainCommentInput(false)
                setClicked(clicked + 1)
            } catch (error) {
                setPostingComment(false)
                console.error("Error while posting data:", error);
            }
        } else {
            try {
                if(postingComment) {
                    return;
                }
                setPostingComment(true)
                const response = await axios.post(route("post-comments.store"), {
                    comment: commentData?.reply,
                    parent_comment_id: comment_id,
                }).then(response => {
                    setPostingComment(false)
                });
                // console.log("reply posted successfully:", response.data);
                setCommentData((prevState) => ({
                    // ...prevState,
                    reply: "",
                }));
                setShowCommentInput(-1)
                setClicked(clicked + 1)
            } catch (error) {
                setPostingComment(false)
                console.error("Error while posting data:", error);
            }
        }
    };

    // ************* post emoji ****************


    // const [selectedEmojis, setSelectedEmojis] = useState({});
    // const handleEmojiClick = async (emoji, postId ) => {

    //     try {
    //         const response = await axios.post(route('toggle-reaction.posts', postId), {
    //             reaction: emoji?.name,
    //         });
    //         // setAllPostsProps(!allPostsProps)
    //         // console.log('Emoji posted successfully:', response.data);
    //         setData(response.data?.payload );

    //     } catch (error) {
    //         console.error('Error while emoji API hitting:', error);
    //     }

    //     // setSelectedEmojis((prevSelectedEmojis) => ({
    //     //     ...prevSelectedEmojis,
    //     //     [postId]: emoji,
    //     // }));
    // };




    // ****comments reactins *****
    const [commentReactions, setCommentReactions] = useState(postComments);

    const handleCommentReaction = async (commentId, emojiName, index) => {
        try {
            const response = await axios.post(route("toggle-reaction.post-comments", commentId), {
                reaction: emojiName
            });


            setPostComments((prevPosts) => {
                const updatedPosts = [...prevPosts];
                updatedPosts[index] = response.data?.payload;
                return updatedPosts;
            });

            // console.log("comment reaction posted successfully:", response.data);
        } catch (error) {
            console.error("Error while emoji API hitting:", error);
        }
    };

    // ****Reply reactins *****

    const handleReplyReactions = async (commentId, replyId, emojiName, index, idx) => {
        try {
            const response = await axios.post(route("toggle-reaction.post-comments", replyId), {
                reaction: emojiName
            });

            setPostComments((prevPosts) => {
                const updatedPosts = [...prevPosts];
                if (updatedPosts[index]?.replies && updatedPosts[index].replies[idx]) {
                    updatedPosts[index].replies[idx] = response.data?.payload;
                }
                return updatedPosts;
            });

            // console.log("Reply reaction posted successfully:", response.data?.payload);
        } catch (error) {
            console.error("Error while hitting emoji API:", error);
        }
    };



    const modalDeletePost = (id) => {
        setOpenModal(false)
        setTimeout(() => {
            deletePost(id)
        }, 100)
    }


    // prevent background scrolling while modal is open
    useEffect(() => {
        if (openModal) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [openModal]);

    const [openReactionModal, setOpenReactionModal] = useState(false)

    const [postType, setPostType] = useState('')

    const [postId, setpostId] = useState()

    const [commentId, setCommentId] = useState()

    const [replyId, setReplyId] = useState()

    return (
        <div>
            {/* <!-- Modal toggle --> */}
            <div
                onClick={() => {
                    setShowModal(true);
                }}
                className="flex items-center gap-2 cursor-pointer"
            >
                <span>
                    <svg
                        className="opacity-60"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g clipPath="url(#clip0_829_45823)">
                            <path
                                opacity="0.4"
                                d="M7.49258 19.7917C9.38308 20.8858 11.607 21.2551 13.7496 20.8307C15.8923 20.4062 17.8075 19.217 19.1381 17.4848C20.4687 15.7526 21.124 13.5956 20.9817 11.4159C20.8394 9.2363 19.9093 7.18278 18.3648 5.63825C16.8202 4.09372 14.7667 3.16361 12.5871 3.02132C10.4074 2.87904 8.2504 3.53429 6.51819 4.86492C4.78597 6.19555 3.59679 8.11072 3.17235 10.2534C2.74792 12.396 3.11719 14.6199 4.21133 16.5104L3.03852 20.012C2.99445 20.1441 2.98806 20.286 3.02005 20.4215C3.05205 20.5571 3.12117 20.6811 3.21967 20.7796C3.31817 20.8781 3.44216 20.9472 3.57774 20.9792C3.71331 21.0112 3.85512 21.0048 3.98727 20.9607L7.49258 19.7917Z"
                                fill="white"
                            />
                            <path
                                d="M7.49258 19.7917C9.38308 20.8858 11.607 21.2551 13.7496 20.8307C15.8923 20.4062 17.8075 19.217 19.1381 17.4848C20.4687 15.7526 21.124 13.5956 20.9817 11.4159C20.8394 9.2363 19.9093 7.18277 18.3648 5.63825C16.8202 4.09372 14.7667 3.16361 12.5871 3.02132C10.4074 2.87904 8.2504 3.53429 6.51819 4.86492C4.78597 6.19555 3.59679 8.11072 3.17235 10.2534C2.74792 12.396 3.11719 14.6199 4.21133 16.5104L3.03852 20.012C2.99445 20.1441 2.98806 20.286 3.02005 20.4215C3.05205 20.5571 3.12117 20.6811 3.21967 20.7796C3.31817 20.8781 3.44216 20.9472 3.57774 20.9792C3.71331 21.0112 3.85512 21.0048 3.98727 20.9607L7.49258 19.7917Z"
                                stroke="white"
                                strokeOpacity="0.6"
                                strokeWidth="1.2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </g>
                        <defs>
                            <clipPath id="clip0_829_45823">
                                <rect width="24" height="24" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                </span>
                <p className="fs-regular fw-regular opacity-50 uppercase">
                    COMMENT
                </p>
            </div>

            {/* <!-- Main modal --> */}
            <div
                layoutid={modalPostData}
                id="defaultModal"
                tabIndex="-1"
                aria-hidden="true"
                data-aos="fade-in" data-aos-delay="100" data-aos-easing="ease" data-aos-duration="300"
                className={` ${showModal
                    ? "  "
                    : "  transition-all duration-300 ease-out"
                    } justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[999999] h-[calc(100%)]  max-h-full`}
            >
                <div data-aos="fade-in" data-aos-delay="100" data-aos-easing="ease" data-aos-duration="300" className="relative w-[90%]  lg:w-[60%] max-w-[790px] overflow-y-auto      max-h-full z-50  ">
                    {/* <!-- Modal content --> */}


                    {openReactionModal &&
                        <ReactionsModal postId={postId ? postId : commentId } openReactionModal={openReactionModal} setOpenReactionModal={setOpenReactionModal} type={postType} />}



                    <div className="relative rounded-lg shadow bg-black  my-[4rem]  ">
                        {/* <!-- Modal header --> */}
                        <div className="flex items-start justify-between mx-5 py-4 border-b border-[#1a1a1a] ">
                            <p className="fw-medium fs-x-large">Discussion</p>

                            <button
                                className="p-1 ml-auto     float-right  "
                                onClick={() => setOpenModal(false)}
                            >
                                <img src={cross} className="   h-6 w-6  " />
                            </button>
                        </div>
                        {/* <!-- Modal body --> */}
                        <div className="px-3 md:px-6 py-4  space-y-3  ">
                            <div className="grid grid-cols-12">
                                <Toast />
                                <div className="col-span-12 lg:col-span-12 noise-10 p-3 inset-border border-rounded-10 main-post ">
                                    <div className="flex justify-between items-center">
                                        <div className="flex gap-3">
                                            <Link
                                                href={route('users.profile', data?.user?.id)}
                                            >
                                                <div>
                                                    <img
                                                        className="h-10 w-10 object-cover object-center rounded-full"
                                                        src={
                                                            data?.user?.dp?.small
                                                                ?.url
                                                        }
                                                        alt=""
                                                    />
                                                    <div>
                                                        <img
                                                            src={leaf}
                                                            alt="tag"
                                                            className="-mt-3 ml-1"
                                                        />
                                                        <p className="fs-tiny text-center w-10">
                                                            9{" "}
                                                        </p>
                                                    </div>
                                                </div>
                                            </Link>
                                            <div className="py-2">
                                                <p className="fs-small fw-medium mb-1">
                                                    {data?.user?.full_name}
                                                </p>
                                                <p className="fs-tiny -z-50 fw-regular opacity-50">
                                                    about {data?.created_at}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {/* <p className="fs-tiny fw-regular uppercase">
Pin post
</p> */}
                                            <div>
                                                <div
                                                    onClick={() => {
                                                        setShowDropdown(
                                                            !showDropdown
                                                        );
                                                    }}
                                                >
                                                    <svg
                                                        width="24"
                                                        height="24"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <g clipPath="url(#clip0_829_45814)">
                                                            <path
                                                                opacity="0.4"
                                                                d="M12 14.25C13.2426 14.25 14.25 13.2426 14.25 12C14.25 10.7574 13.2426 9.75 12 9.75C10.7574 9.75 9.75 10.7574 9.75 12C9.75 13.2426 10.7574 14.25 12 14.25Z"
                                                                fill="white"
                                                            />
                                                            <path
                                                                opacity="0.4"
                                                                d="M12 6.75C13.2426 6.75 14.25 5.74264 14.25 4.5C14.25 3.25736 13.2426 2.25 12 2.25C10.7574 2.25 9.75 3.25736 9.75 4.5C9.75 5.74264 10.7574 6.75 12 6.75Z"
                                                                fill="white"
                                                            />
                                                            <path
                                                                opacity="0.4"
                                                                d="M12 21.75C13.2426 21.75 14.25 20.7426 14.25 19.5C14.25 18.2574 13.2426 17.25 12 17.25C10.7574 17.25 9.75 18.2574 9.75 19.5C9.75 20.7426 10.7574 21.75 12 21.75Z"
                                                                fill="white"
                                                            />
                                                            <path
                                                                d="M12 14.25C13.2426 14.25 14.25 13.2426 14.25 12C14.25 10.7574 13.2426 9.75 12 9.75C10.7574 9.75 9.75 10.7574 9.75 12C9.75 13.2426 10.7574 14.25 12 14.25Z"
                                                                stroke="white"
                                                                strokeWidth="1.2"
                                                                strokeMiterlimit="10"
                                                            />
                                                            <path
                                                                d="M12 6.75C13.2426 6.75 14.25 5.74264 14.25 4.5C14.25 3.25736 13.2426 2.25 12 2.25C10.7574 2.25 9.75 3.25736 9.75 4.5C9.75 5.74264 10.7574 6.75 12 6.75Z"
                                                                stroke="white"
                                                                strokeWidth="1.2"
                                                                strokeMiterlimit="10"
                                                            />
                                                            <path
                                                                d="M12 21.75C13.2426 21.75 14.25 20.7426 14.25 19.5C14.25 18.2574 13.2426 17.25 12 17.25C10.7574 17.25 9.75 18.2574 9.75 19.5C9.75 20.7426 10.7574 21.75 12 21.75Z"
                                                                stroke="white"
                                                                strokeWidth="1.2"
                                                                strokeMiterlimit="10"
                                                            />
                                                        </g>
                                                        <defs>
                                                            <clipPath id="clip0_829_45814">
                                                                <rect
                                                                    width="24"
                                                                    height="24"
                                                                    fill="white"
                                                                />
                                                            </clipPath>
                                                        </defs>
                                                    </svg>
                                                </div>

                                                {showDropdown && (
                                                    <motion.div
                                                        initial={{ y: -10, zIndex: 999, }}
                                                        animate={{

                                                            x: 0,
                                                            y: 0,
                                                            scale: 1,
                                                            rotate: 0,
                                                        }}
                                                    >
                                                        <div
                                                            id="dropdown"
                                                            className={` -ml-[8rem]  border-rounded-10   z-10 absolute bg-[#1A1A1A] inset-border shadow ${data?.bookmarked ? 'w-[11rem]' : 'w-[8rem]'}  `}
                                                        >
                                                            <ul
                                                                className="  text-sm text-black  "
                                                                aria-labelledby="dropdownDefaultButton"
                                                            >
                                                                <li onClick={() => { bookmarkPost(data?.id) }} className="">
                                                                    <p className="px-4 py-2 text-white rounded-t-[10px] hover:text-black hover:bg-gray-100  fw-regular ">
                                                                        {data?.bookmarked ? 'Remove Bookmark' : 'Bookmark'}
                                                                    </p>
                                                                </li>
                                                                {data?.user?.id != user?.id && <li className="">
                                                                    <ReportModal id={data?.id} type={'post'} />
                                                                </li>}
                                                                {data?.user?.id == user?.id && <li onClick={() => { modalDeletePost(data?.id); }} className="">
                                                                    <p className="px-4 py-2 rounded-b-[10px] text-white hover:text-black hover:bg-gray-100  fw-regular ">
                                                                        Delete
                                                                    </p>
                                                                </li>}
                                                            </ul>
                                                            <div
                                                                onClick={() => setShowDropdown(false)}
                                                                className=" fixed inset-0 -z-10  "
                                                            ></div>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="  relative">
                                        <div className="post-side-shadow ml-4 absolute h-full "></div>
                                        <div className="flex justify-end">
                                            <div className="  w-[90%] md:w-[94%]">
                                                <p className=" pl-6 md:pl-0 fs-regular fw-regular mb-4">
                                                    {data?.title}
                                                </p>



                                                {/* ****  POLL **** */}
                                                {data?.type === 'poll' &&
                                                    <>

                                                        {data?.choices?.map((choice, index) => (
                                                            <div
                                                                key={choice?.id}
                                                                onClick={() => handleChoiceSelect(!data?.my_choice_id ? choice?.id : data?.my_choice_id, data?.id)}
                                                                className={`${data?.my_choice_id === choice?.id

                                                                    ? " noise-20 bg-[#ffffff60] innerBorderLinkSelectedbg"
                                                                    : " noise-10   bg-[#ffffff10]"
                                                                    } lg:cursor-pointer border-rounded-20 my-[8px] flex justify-start  inset-border secondary px-[24px] py-[8px] relative `}
                                                            >

                                                                {data?.my_choice_id && <>
                                                                    <div className="bg-white absolute noise-10 left-0 top-0 fs-regular fw-regular h-full  flex items-center "
                                                                        style={{ width: choice?.poll_percentage + '%' }} >

                                                                    </div>

                                                                    <p className="fs-regular fw-regular absolute right-5 ">
                                                                        {choice?.poll_percentage}%
                                                                    </p> </>}

                                                                {!data?.my_choice_id &&
                                                                    <>
                                                                        {data?.my_choice_id ? (
                                                                            <>
                                                                                <img src={check}
                                                                                    className="w-[1.125rem] mt-[2px] h-[1.125rem]" alt="check" />
                                                                            </>
                                                                        ) : (
                                                                            <>  <img src={uncheck}
                                                                                className="w-[1.125rem] mt-[2px]  h-[1.125rem]" alt="uncheck" />
                                                                            </>
                                                                        )}
                                                                    </>
                                                                }
                                                                <p className={`fw-regular fs-regular text-center ${data?.my_choice_id ? '' : 'pl-[22px]'}  `}>
                                                                    {choice.value}
                                                                </p>

                                                            </div>

                                                        ))}


                                                    </>
                                                }
                                                {/* ****  IMAGES **** */}
                                                {data?.type === "image" && (
                                                    <img
                                                        className="w-full h-auto border-rounded-10 object-cover object-center"
                                                        src={data?.image}
                                                        alt=""
                                                    />
                                                )}
                                                {/* ****  VIDEO **** */}
                                                {data?.type === "video" && (
                                                    <PlyrComponent source={data?.video} thumbnail={data?.thumbnail} />
                                                    // <video
                                                    //     controls
                                                    //     className=" "
                                                    // >
                                                    //     <source
                                                    //         src={
                                                    //             data?.media?.url
                                                    //         }
                                                    //         type="video/mp4"
                                                    //     />
                                                    //     Your browser does not
                                                    //     support the video tag.
                                                    // </video>
                                                )}

                                                <hr className="my-2 border-[1px] border-[#ffffff1a]" />
                                                <div className='flex justify-between'>

                                                    <div onClick={() => { setOpenReactionModal(true); setPostType('post'); setpostId(modalPostData) }} className='pt-1 cursor-pointer flex gap-x-2'>

                                                        <p className="fw-regular fs-tiny">
                                                            {data?.reactions?.map((reaction, index) => (
                                                                emojis.find((emoji) => emoji.name === reaction)?.emoji
                                                            ))}
                                                        </p>
                                                        <p className="fw-regular fs-small">
                                                            {data?.reactions_count}
                                                        </p>
                                                    </div>
                                                    {data?.comments_count > 0 &&
                                                        <div className="bg-[#000000]  px-3 rounded-3xl border-[1px]  border-[#ffffff1a] flex items-center justify-center gap-1   ">
                                                            <p className="fw-regular fs-small pt-[4px]">
                                                                {data?.comments_count}
                                                            </p>
                                                            <p className="fw-regular fs-small pt-[4px]">
                                                                Comments
                                                            </p>
                                                        </div>}
                                                </div>
                                                <hr className="my-2 border-[1px] border-[#ffffff1a]" />




                                                <div className="flex items-center justify-between">




                                                    <div className="flex items-center gap-1">
                                                        {/* {data?.reactions_count > 0 &&

                                                    <div className="bg-[#000000]  px-3 rounded-3xl border-[1px] border-[#ffffff1a] flex items-center justify-center gap-1 w-[50px] pt-[3px] h-6">
                                                      <p className="fw-regular fs-tiny">
                                                     {emojis.find((emoji) => emoji.name === data?.my_reaction)?.emoji}</p>

                                                    </div>
                                                    } */}





                                                        <div className="icon relative cursor-pointer     "
                                                        >
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


                                                            <div className="reactions    ">
                                                                <div className="p-2 absolute -ml-[2rem] -mt-[58px] inset-border w-[170px] h-[40px] bg-white rounded-full flex justify-between">
                                                                    {emojis.map((emoji) => (
                                                                        <div
                                                                            onClick={() => { handleEmojiClick(emoji, data.id, indexforModal) }}
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
















                                                    {/* <div className="flex gap-2">
                                                        {data?.reactions_count > 0 &&
                                                            <motion.div
                                                                initial={{ scale: 0.5 }}
                                                                animate={{ scale: 1,}}
                                                            >
                                                                <div className="bg-[#000000] px-3 rounded-3xl border-[1px] border-[#ffffff1a] flex items-center justify-center gap-1 w-[50px] h-6">
                                                                    <p className="fw-regular fs-tiny pt-[2px]">

                                                                        {emojis.find((emoji) => emoji.name === data?.my_reaction)?.emoji}

                                                                    </p>
                                                                    <p className="fw-regular fs-small pt-[2px] ">
                                                                        {data?.reactions_count}
                                                                    </p>
                                                                </div>
                                                            </motion.div>
                                                        }
                                                        <div className="group relative cursor-pointer bg-[#000000]   rounded-full border-[1px] border-[#ffffff1a] flex items-center justify-center   w-6 h-6">
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
                                                                <div className="p-2 absolute -ml-[2rem] -mt-[50px] inset-border w-[170px] h-[40px] bg-white rounded-full flex justify-between">
                                                                    {emojis.map((emoji) => (
                                                                        <div
                                                                            onClick={() => { handleEmojiClick(emoji, data.id, indexforModal) }}
                                                                            key={emoji.id}
                                                                            className="rounded-full hover:scale-125 transition-all ease-in-out delay-3000 cursor-pointer bg-white"
                                                                        >
                                                                            {emoji.emoji}
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div> */}

                                                    <div className="flex items-center gap-3">
                                                        <div onClick={() => { setMainCommentInput(!mainCommentInput); setShowCommentInput(-1) }} className="flex items-center gap-2 cursor-pointer">
                                                            <span>
                                                                <svg
                                                                    width="24"
                                                                    height="24"
                                                                    viewBox="0 0 24 24"
                                                                    fill="none"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                >
                                                                    <g clipPath="url(#clip0_829_45823)">
                                                                        <path
                                                                            opacity="0.4"
                                                                            d="M7.49258 19.7917C9.38308 20.8858 11.607 21.2551 13.7496 20.8307C15.8923 20.4062 17.8075 19.217 19.1381 17.4848C20.4687 15.7526 21.124 13.5956 20.9817 11.4159C20.8394 9.2363 19.9093 7.18278 18.3648 5.63825C16.8202 4.09372 14.7667 3.16361 12.5871 3.02132C10.4074 2.87904 8.2504 3.53429 6.51819 4.86492C4.78597 6.19555 3.59679 8.11072 3.17235 10.2534C2.74792 12.396 3.11719 14.6199 4.21133 16.5104L3.03852 20.012C2.99445 20.1441 2.98806 20.286 3.02005 20.4215C3.05205 20.5571 3.12117 20.6811 3.21967 20.7796C3.31817 20.8781 3.44216 20.9472 3.57774 20.9792C3.71331 21.0112 3.85512 21.0048 3.98727 20.9607L7.49258 19.7917Z"
                                                                            fill="white"
                                                                        />
                                                                        <path
                                                                            d="M7.49258 19.7917C9.38308 20.8858 11.607 21.2551 13.7496 20.8307C15.8923 20.4062 17.8075 19.217 19.1381 17.4848C20.4687 15.7526 21.124 13.5956 20.9817 11.4159C20.8394 9.2363 19.9093 7.18277 18.3648 5.63825C16.8202 4.09372 14.7667 3.16361 12.5871 3.02132C10.4074 2.87904 8.2504 3.53429 6.51819 4.86492C4.78597 6.19555 3.59679 8.11072 3.17235 10.2534C2.74792 12.396 3.11719 14.6199 4.21133 16.5104L3.03852 20.012C2.99445 20.1441 2.98806 20.286 3.02005 20.4215C3.05205 20.5571 3.12117 20.6811 3.21967 20.7796C3.31817 20.8781 3.44216 20.9472 3.57774 20.9792C3.71331 21.0112 3.85512 21.0048 3.98727 20.9607L7.49258 19.7917Z"
                                                                            stroke="white"
                                                                            strokeOpacity="0.6"
                                                                            strokeWidth="1.2"
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                        />
                                                                    </g>
                                                                    <defs>
                                                                        <clipPath id="clip0_829_45823">
                                                                            <rect
                                                                                width="24"
                                                                                height="24"
                                                                                fill="white"
                                                                            />
                                                                        </clipPath>
                                                                    </defs>
                                                                </svg>
                                                            </span>
                                                            <p className="fs-regular fw-regular opacity-50 mt-1 uppercase">
                                                                Comments
                                                            </p>
                                                        </div>
                                                        {/* {  postComments?.length > 0 &&  <div className="bg-[#000000] px-3 rounded-3xl border-[1px]   border-[#ffffff1a] flex items-center justify-center gap-1 w-[50px] h-6">
                                                            <p className="fw-regular fs-small pt-[2px]">
                                                                {  postComments?.length  }
                                                            </p>
                                                        </div> } */}
                                                    </div>
                                                </div>

                                                <hr className=" my-2 border-[1px] border-[#ffffff1a]" />

                                                <div
                                                    className={`poll-container ${mainCommentInput
                                                        ? "show"
                                                        : ""
                                                        }`}
                                                >
                                                    {mainCommentInput && (
                                                        <form onSubmit={(e) => {
                                                            e.preventDefault();
                                                            postComment(data?.id, null);
                                                        }}>
                                                            <div className="mt-4 mb-2 flex gap-x-2 justify-between">
                                                                <img
                                                                    className="w-10 h-10 rounded-full object-cover object-center"
                                                                    src={user?.dp?.small?.url}
                                                                    alt=""
                                                                />

                                                                <div className="2xl:w-[93%] w-[90%]">
                                                                    <textarea
                                                                        autoFocus
                                                                        value={commentData?.comment}
                                                                        onChange={(e) => {
                                                                            setCommentData((prevState) => ({
                                                                                ...prevState,
                                                                                comment: e.target.value,
                                                                            }));
                                                                        }}
                                                                        onKeyDown={(e) => {
                                                                            if (e.key === "Enter" && !e.shiftKey) {
                                                                                e.preventDefault();
                                                                                postComment(data?.id, null);
                                                                            }
                                                                        }}
                                                                        rows="1"
                                                                        className="noise-10 border-rounded-20 inset-border border-[#ffffff1a] w-full px-[24px] py-[8px] fs-regular fw-regular outline-0 opacity-50 focus:outline-none focus:ring-0 focus:border-[#ffffff]"
                                                                        placeholder="What’s on your mind?"
                                                                    ></textarea>
                                                                    <div className="block md:hidden">
                                                                        <div className="w-full flex justify-end  ">
                                                                            <div className="onclick" onClick={() => postComment(data?.id, null)}>
                                                                                <Button className="secondary noise-10 mt-[10px] uppercase px-3">
                                                                                    Post
                                                                                </Button>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </form>

                                                    )}

                                                </div>
                                                {/* <hr className="my-4 border-[1px] border-[#ffffff1a]" /> */}
                                            </div>
                                        </div>
                                    </div>
                                    {/* activity live end  */}

                                    {/*   comments on post  */}
                                    {postComments?.map((item, index) => (
                                        <div key={index}>
                                            <div className="flex items-start gap-4">
                                                <Link
                                                    href={route('users.profile', item?.user?.id)}
                                                >
                                                    <div className="relative mt-2 ">
                                                        <img
                                                            className="h-10 w-[40px] rounded-full object-cover object-center"
                                                            src={item?.user?.dp?.medium?.url}
                                                            alt=""
                                                        />
                                                        <div className="-mt-4 ml-1">
                                                            <img className="h-8 w-8" src={leaf} alt="" />
                                                            <p className="fw-medium fs-tiny text-center mr-1">
                                                                9
                                                            </p>
                                                        </div>
                                                        <div className="post-side-shadow "></div>
                                                        {/* <div className="bottom-left-reply-shadow"></div> */}
                                                        {item?.replies?.length > 0 && <div className=" ml-[11px]">
                                                            <svg
                                                                className="w-[45px] h-[140%] md:h-[140%] absolute" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 37 122" fill="none">
                                                                <path d="M1 0V121H37" stroke="url(#paint0_radial_3362_114304)" />
                                                                <defs>
                                                                    <radialGradient id="paint0_radial_3362_114304" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(1.75668 119.952) rotate(-90.2792) scale(155.301 35.2444)">
                                                                        <stop stopColor="white" />
                                                                        <stop offset="1" stopColor="white" stopOpacity="0" />
                                                                    </radialGradient>
                                                                </defs>
                                                            </svg>
                                                        </div>
                                                        }

                                                    </div></Link>
                                                <div className="w-full">
                                                    {/* <hr className="mb-4 mt-2 border-[1px] border-[#ffffff1a]" /> */}
                                                    <div className=" w-full flex justify-between mt-2">
                                                        <div>
                                                            <p className="fw-medium fs-small mb-2">
                                                                {item?.user?.full_name}
                                                            </p>
                                                            <p className="fw-regular fs-tiny opacity-50">
                                                                about{" "}
                                                                {item?.created_at}
                                                            </p>
                                                        </div>
                                                        {/* <div className="icon">

                                                            <div >
                                                                <svg
                                                                    width="24"
                                                                    height="24"
                                                                    viewBox="0 0 24 24"
                                                                    fill="none"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                >
                                                                    <g clipPath="url(#clip0_1107_73889)">
                                                                        <path
                                                                            opacity="0.2"
                                                                            d="M12 14.25C13.2426 14.25 14.25 13.2426 14.25 12C14.25 10.7574 13.2426 9.75 12 9.75C10.7574 9.75 9.75 10.7574 9.75 12C9.75 13.2426 10.7574 14.25 12 14.25Z"
                                                                            fill="white"
                                                                        />
                                                                        <path
                                                                            opacity="0.2"
                                                                            d="M12 6.75C13.2426 6.75 14.25 5.74264 14.25 4.5C14.25 3.25736 13.2426 2.25 12 2.25C10.7574 2.25 9.75 3.25736 9.75 4.5C9.75 5.74264 10.7574 6.75 12 6.75Z"
                                                                            fill="white"
                                                                        />
                                                                        <path
                                                                            opacity="0.2"
                                                                            d="M12 21.75C13.2426 21.75 14.25 20.7426 14.25 19.5C14.25 18.2574 13.2426 17.25 12 17.25C10.7574 17.25 9.75 18.2574 9.75 19.5C9.75 20.7426 10.7574 21.75 12 21.75Z"
                                                                            fill="white"
                                                                        />
                                                                        <path
                                                                            opacity="0.6"
                                                                            d="M12 14.25C13.2426 14.25 14.25 13.2426 14.25 12C14.25 10.7574 13.2426 9.75 12 9.75C10.7574 9.75 9.75 10.7574 9.75 12C9.75 13.2426 10.7574 14.25 12 14.25Z"
                                                                            stroke="white"
                                                                            strokeWidth="1.2"
                                                                            strokeMiterlimit="10"
                                                                        />
                                                                        <path
                                                                            opacity="0.6"
                                                                            d="M12 6.75C13.2426 6.75 14.25 5.74264 14.25 4.5C14.25 3.25736 13.2426 2.25 12 2.25C10.7574 2.25 9.75 3.25736 9.75 4.5C9.75 5.74264 10.7574 6.75 12 6.75Z"
                                                                            stroke="white"
                                                                            strokeWidth="1.2"
                                                                            strokeMiterlimit="10"
                                                                        />
                                                                        <path
                                                                            opacity="0.6"
                                                                            d="M12 21.75C13.2426 21.75 14.25 20.7426 14.25 19.5C14.25 18.2574 13.2426 17.25 12 17.25C10.7574 17.25 9.75 18.2574 9.75 19.5C9.75 20.7426 10.7574 21.75 12 21.75Z"
                                                                            stroke="white"
                                                                            strokeWidth="1.2"
                                                                            strokeMiterlimit="10"
                                                                        />
                                                                    </g>
                                                                    <defs>
                                                                        <clipPath id="clip0_1107_73889">
                                                                            <rect
                                                                                width="24"
                                                                                height="24"
                                                                                fill="white"
                                                                            />
                                                                        </clipPath>
                                                                    </defs>
                                                                </svg>
                                                            </div>
                                                            <div

                                                                className="my-menu  -ml-[7rem]  border-rounded-10   z-10 absolute bg-[#1A1A1A] inset-border   shadow w-[8rem]  "
                                                            >
                                                                <ul
                                                                    className="   text-sm text-black  "   >
                                                                    {data?.user?.id != user?.id && <li className="">
                                                                        <ReportModal id={item?.id} type={'comment'} />
                                                                    </li>}
                                                                    {data?.user?.id == user?.id && <li className="">
                                                                        <p className="px-4 py-2 text-white border-rounded-10 hover:text-black hover:bg-gray-100  fw-regular ">
                                                                            Delete
                                                                        </p>
                                                                    </li>}
                                                                </ul>

                                                            </div>
                                                        </div> */}

                                                    </div>

                                                    <div className={` -ml-9 ${item?.replies?.length < 1 ? ' post-side-shadow ' : 'pl-[40px]'}  `}>

                                                        <p className="fs-regular fw-regular my-4">
                                                            {item?.value}.
                                                        </p>
                                                        {/* {emojis.map(emoji => (
<button
key={emoji.id}
onClick={() => handleCommentReaction(item.id, emoji.name)}
className={item.my_reaction === emoji.name ? "selected" : ""}
>
{emoji.emoji}
</button>
))} */}
                                                        <div className="pt-2 md:pt-0 flex  items-center justify-between gap-y-2 ">
                                                            <div className="flex gap-2 order-1 md:order-2 w-full md:w-auto">

                                                                {item?.reactions_count > 0 &&
                                                                    <div onClick={() => { setOpenReactionModal(true); setPostType('postComment'); setCommentId(item?.id) }} className="cursor-pointer bg-[#000000] px-3 rounded-3xl border-[1px] border-[#ffffff1a] pt-[2px] flex items-center justify-center gap-1   h-6">
                                                                        <p className="fw-regular fs-tiny  ">
                                                                            {item?.reactions?.map((reaction, index) => (
                                                                                emojis.find((emoji) => emoji.name === reaction)?.emoji
                                                                            ))}

                                                                        </p>
                                                                        <p className="fw-regular fs-small">
                                                                            {item?.reactions_count && item?.reactions_count}
                                                                        </p>
                                                                    </div>
                                                                }
                                                                <div className="group relative cursor-pointer bg-[#000000]   rounded-full border-[1px] border-[#ffffff1a] flex items-center justify-center   w-6 h-6">
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
                                                                    {/* ***********COMMENTS REACTION ********** */}
                                                                    <div className="hidden group-hover:block    ">
                                                                        <div className="p-2 absolute -ml-[2rem] -mt-[50px] inset-border w-[170px] h-[40px] bg-white rounded-full flex justify-between">
                                                                            {emojis.map((emoji) => (
                                                                                <div onClick={() => handleCommentReaction(item.id, emoji.name, index)}
                                                                                    key={emoji.id}
                                                                                    className="rounded-full hover:scale-125 transition-all ease-in-out delay-3000 cursor-pointer bg-white"
                                                                                >
                                                                                    {emoji.emoji}
                                                                                </div>
                                                                            )
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>



                                                            <div className="order-3 flex items-center gap-3">
                                                                <div
                                                                    onClick={() => { setShowCommentInput(showCommentInput < 0 ?  index : -1 ); }}
                                                                    className="flex items-center gap-2 cursor-pointer"
                                                                >
                                                                    <span>
                                                                        <svg
                                                                            width="24"
                                                                            height="24"
                                                                            viewBox="0 0 24 24"
                                                                            fill="none"
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                        >
                                                                            <g clipPath="url(#clip0_829_45823)">
                                                                                <path
                                                                                    opacity="0.4"
                                                                                    d="M7.49258 19.7917C9.38308 20.8858 11.607 21.2551 13.7496 20.8307C15.8923 20.4062 17.8075 19.217 19.1381 17.4848C20.4687 15.7526 21.124 13.5956 20.9817 11.4159C20.8394 9.2363 19.9093 7.18278 18.3648 5.63825C16.8202 4.09372 14.7667 3.16361 12.5871 3.02132C10.4074 2.87904 8.2504 3.53429 6.51819 4.86492C4.78597 6.19555 3.59679 8.11072 3.17235 10.2534C2.74792 12.396 3.11719 14.6199 4.21133 16.5104L3.03852 20.012C2.99445 20.1441 2.98806 20.286 3.02005 20.4215C3.05205 20.5571 3.12117 20.6811 3.21967 20.7796C3.31817 20.8781 3.44216 20.9472 3.57774 20.9792C3.71331 21.0112 3.85512 21.0048 3.98727 20.9607L7.49258 19.7917Z"
                                                                                    fill="white"
                                                                                />
                                                                                <path
                                                                                    d="M7.49258 19.7917C9.38308 20.8858 11.607 21.2551 13.7496 20.8307C15.8923 20.4062 17.8075 19.217 19.1381 17.4848C20.4687 15.7526 21.124 13.5956 20.9817 11.4159C20.8394 9.2363 19.9093 7.18277 18.3648 5.63825C16.8202 4.09372 14.7667 3.16361 12.5871 3.02132C10.4074 2.87904 8.2504 3.53429 6.51819 4.86492C4.78597 6.19555 3.59679 8.11072 3.17235 10.2534C2.74792 12.396 3.11719 14.6199 4.21133 16.5104L3.03852 20.012C2.99445 20.1441 2.98806 20.286 3.02005 20.4215C3.05205 20.5571 3.12117 20.6811 3.21967 20.7796C3.31817 20.8781 3.44216 20.9472 3.57774 20.9792C3.71331 21.0112 3.85512 21.0048 3.98727 20.9607L7.49258 19.7917Z"
                                                                                    stroke="white"
                                                                                    strokeOpacity="0.6"
                                                                                    strokeWidth="1.2"
                                                                                    strokeLinecap="round"
                                                                                    strokeLinejoin="round"
                                                                                />
                                                                            </g>
                                                                            <defs>
                                                                                <clipPath id="clip0_829_45823">
                                                                                    <rect
                                                                                        width="24"
                                                                                        height="24"
                                                                                        fill="white"
                                                                                    />
                                                                                </clipPath>
                                                                            </defs>
                                                                        </svg>
                                                                    </span>
                                                                    <p className="fs-regular fw-regular opacity-50  uppercase ">
                                                                        reply
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>



                                                        <hr className="my-4 border-[1px] border-[#ffffff1a]" />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* ***********REPLIES************ */}

                                            {item?.replies?.map((reply, idx) => (
                                                <div key={idx + 1} className="ml-11  ">
                                                    <div className="px-3  ">
                                                        <div className="grid grid-cols-12">

                                                            <div className="col-span-2 md:col-span-1">
                                                                <Link
                                                                    href={route('users.profile', reply?.user?.id)}
                                                                >

                                                                    <div className="relative">
                                                                        <img
                                                                            className="h-10 w-[40px] rounded-full object-cover object-center"
                                                                            src={reply?.user?.dp?.small?.url}
                                                                            alt="" />
                                                                        <div className="-mt-4 ml-1">
                                                                            <img className="h-8 w-8" src={leaf} alt="" />
                                                                            <p className="fw-medium fs-tiny text-star ml-3">
                                                                                9
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </Link>
                                                                {/* reply shadow */}
                                                                {item?.replies?.length - 1 != idx && <div className="ml-5  w-[1px] h-[40%] post-side-shadow "></div>}
                                                            </div>

                                                            <div className="col-span-10 lg:col-span-11">
                                                                <div className="flex justify-between items-center">
                                                                    <div className="ml-2 md:ml-0 ">
                                                                        <p className="fs-small fw-medium mb-1">
                                                                            {reply?.user?.full_name}
                                                                        </p>
                                                                        <p className="fs-tiny fw-regular opacity-50">
                                                                            {reply?.created_at}
                                                                        </p>
                                                                    </div>
                                                                    {/* <div className="flex items-center gap-2">

                                                                        <div className="icon">
                                                                            <div >
                                                                                <svg
                                                                                    width="24"
                                                                                    height="24"
                                                                                    viewBox="0 0 24 24"
                                                                                    fill="none"
                                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                                >
                                                                                    <g clipPath="url(#clip0_1107_73889)">
                                                                                        <path
                                                                                            opacity="0.2"
                                                                                            d="M12 14.25C13.2426 14.25 14.25 13.2426 14.25 12C14.25 10.7574 13.2426 9.75 12 9.75C10.7574 9.75 9.75 10.7574 9.75 12C9.75 13.2426 10.7574 14.25 12 14.25Z"
                                                                                            fill="white"
                                                                                        />
                                                                                        <path
                                                                                            opacity="0.2"
                                                                                            d="M12 6.75C13.2426 6.75 14.25 5.74264 14.25 4.5C14.25 3.25736 13.2426 2.25 12 2.25C10.7574 2.25 9.75 3.25736 9.75 4.5C9.75 5.74264 10.7574 6.75 12 6.75Z"
                                                                                            fill="white"
                                                                                        />
                                                                                        <path
                                                                                            opacity="0.2"
                                                                                            d="M12 21.75C13.2426 21.75 14.25 20.7426 14.25 19.5C14.25 18.2574 13.2426 17.25 12 17.25C10.7574 17.25 9.75 18.2574 9.75 19.5C9.75 20.7426 10.7574 21.75 12 21.75Z"
                                                                                            fill="white"
                                                                                        />
                                                                                        <path
                                                                                            opacity="0.6"
                                                                                            d="M12 14.25C13.2426 14.25 14.25 13.2426 14.25 12C14.25 10.7574 13.2426 9.75 12 9.75C10.7574 9.75 9.75 10.7574 9.75 12C9.75 13.2426 10.7574 14.25 12 14.25Z"
                                                                                            stroke="white"
                                                                                            strokeWidth="1.2"
                                                                                            strokeMiterlimit="10"
                                                                                        />
                                                                                        <path
                                                                                            opacity="0.6"
                                                                                            d="M12 6.75C13.2426 6.75 14.25 5.74264 14.25 4.5C14.25 3.25736 13.2426 2.25 12 2.25C10.7574 2.25 9.75 3.25736 9.75 4.5C9.75 5.74264 10.7574 6.75 12 6.75Z"
                                                                                            stroke="white"
                                                                                            strokeWidth="1.2"
                                                                                            strokeMiterlimit="10"
                                                                                        />
                                                                                        <path
                                                                                            opacity="0.6"
                                                                                            d="M12 21.75C13.2426 21.75 14.25 20.7426 14.25 19.5C14.25 18.2574 13.2426 17.25 12 17.25C10.7574 17.25 9.75 18.2574 9.75 19.5C9.75 20.7426 10.7574 21.75 12 21.75Z"
                                                                                            stroke="white"
                                                                                            strokeWidth="1.2"
                                                                                            strokeMiterlimit="10"
                                                                                        />
                                                                                    </g>
                                                                                    <defs>
                                                                                        <clipPath id="clip0_1107_73889">
                                                                                            <rect
                                                                                                width="24"
                                                                                                height="24"
                                                                                                fill="white"
                                                                                            />
                                                                                        </clipPath>
                                                                                    </defs>
                                                                                </svg>
                                                                            </div>

                                                                            <div

                                                                                className="my-menu  -ml-[7rem]     z-10 absolute noise-10 inset-border divide-y divide-gray-100 shadow w-[8rem]  "
                                                                            >
                                                                                <ul
                                                                                    className="  text-sm text-black  "   >
                                                                                    {data?.user?.id != user?.id && <li className="">
                                                                                        <ReportModal id={reply?.id} type={'comment'} />
                                                                                    </li>}
                                                                                    {data?.user?.id == user?.id && <li className="">
                                                                                        <p className="px-4 py-2 text-white hover:text-black hover:bg-gray-100  fw-regular ">
                                                                                            Delete
                                                                                        </p>
                                                                                    </li>}
                                                                                </ul>

                                                                            </div>
                                                                        </div>
                                                                    </div> */}
                                                                </div>

                                                                <p className="fs-regular fw-regular my-4">
                                                                    {reply?.value}
                                                                    .
                                                                </p>

                                                                <div className="pt-2 md:pt-0  flex  items-center justify-between gap-y-2 ">
                                                                    <div className="flex gap-2 order-1 md:order-2 w-full md:w-auto">
                                                                        {reply?.reactions_count > 0 &&
                                                                            <div onClick={() => { setOpenReactionModal(true); setPostType('postComment'); setCommentId(reply?.id) }} className="cursor-pointer bg-[#000000] px-3 rounded-3xl border-[1px] border-[#ffffff1a] pt-[2px] flex items-center justify-center gap-1   h-6">
                                                                                <p className="fw-regular fs-tiny">

                                                                                        {reply?.reactions?.map((reaction, index) => (
                                                                                            emojis.find((emoji) => emoji.name === reaction)?.emoji
                                                                                        ))}


                                                                                </p>
                                                                                <p className="fw-regular fs-small">
                                                                                    {reply?.reactions_count && reply?.reactions_count}
                                                                                </p>
                                                                            </div>
                                                                        }
                                                                        <div className="group relative cursor-pointer bg-[#000000]   rounded-full border-[1px] border-[#ffffff1a] flex items-center justify-center   w-6 h-6">
                                                                            {
                                                                                emojis.find((emoji) => emoji.name === reply?.my_reaction)?.emoji
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
                                                                                <div className="p-2 absolute -ml-[2rem] -mt-[50px] inset-border w-[170px] h-[40px] bg-white rounded-full flex justify-between">
                                                                                    {emojis.map(emoji => (
                                                                                        <div onClick={() => handleReplyReactions(item.id, reply.id, emoji.name, index, idx)}
                                                                                            key={emoji.id}
                                                                                            className="rounded-full hover:scale-125 transition-all ease-in-out delay-3000 cursor-pointer bg-white">
                                                                                            {emoji?.emoji}
                                                                                        </div>
                                                                                    ))}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>



                                                                    <div className="order-3 flex items-center gap-3"><div className="order-3 flex items-center gap-3">
                                                                        <div
                                                                            onClick={() => {
                                                                                setShowCommentInput(showCommentInput < 0  ? index :-1 ); setMainCommentInput(false)
                                                                            }}
                                                                            className="flex items-center gap-2 cursor-pointer"
                                                                        >
                                                                            <span>
                                                                                <svg
                                                                                    width="24"
                                                                                    height="24"
                                                                                    viewBox="0 0 24 24"
                                                                                    fill="none"
                                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                                >
                                                                                    <g clipPath="url(#clip0_829_45823)">
                                                                                        <path
                                                                                            opacity="0.4"
                                                                                            d="M7.49258 19.7917C9.38308 20.8858 11.607 21.2551 13.7496 20.8307C15.8923 20.4062 17.8075 19.217 19.1381 17.4848C20.4687 15.7526 21.124 13.5956 20.9817 11.4159C20.8394 9.2363 19.9093 7.18278 18.3648 5.63825C16.8202 4.09372 14.7667 3.16361 12.5871 3.02132C10.4074 2.87904 8.2504 3.53429 6.51819 4.86492C4.78597 6.19555 3.59679 8.11072 3.17235 10.2534C2.74792 12.396 3.11719 14.6199 4.21133 16.5104L3.03852 20.012C2.99445 20.1441 2.98806 20.286 3.02005 20.4215C3.05205 20.5571 3.12117 20.6811 3.21967 20.7796C3.31817 20.8781 3.44216 20.9472 3.57774 20.9792C3.71331 21.0112 3.85512 21.0048 3.98727 20.9607L7.49258 19.7917Z"
                                                                                            fill="white"
                                                                                        />
                                                                                        <path
                                                                                            d="M7.49258 19.7917C9.38308 20.8858 11.607 21.2551 13.7496 20.8307C15.8923 20.4062 17.8075 19.217 19.1381 17.4848C20.4687 15.7526 21.124 13.5956 20.9817 11.4159C20.8394 9.2363 19.9093 7.18277 18.3648 5.63825C16.8202 4.09372 14.7667 3.16361 12.5871 3.02132C10.4074 2.87904 8.2504 3.53429 6.51819 4.86492C4.78597 6.19555 3.59679 8.11072 3.17235 10.2534C2.74792 12.396 3.11719 14.6199 4.21133 16.5104L3.03852 20.012C2.99445 20.1441 2.98806 20.286 3.02005 20.4215C3.05205 20.5571 3.12117 20.6811 3.21967 20.7796C3.31817 20.8781 3.44216 20.9472 3.57774 20.9792C3.71331 21.0112 3.85512 21.0048 3.98727 20.9607L7.49258 19.7917Z"
                                                                                            stroke="white"
                                                                                            strokeOpacity="0.6"
                                                                                            strokeWidth="1.2"
                                                                                            strokeLinecap="round"
                                                                                            strokeLinejoin="round"
                                                                                        />
                                                                                    </g>
                                                                                    <defs>
                                                                                        <clipPath id="clip0_829_45823">
                                                                                            <rect
                                                                                                width="24"
                                                                                                height="24"
                                                                                                fill="white"
                                                                                            />
                                                                                        </clipPath>
                                                                                    </defs>
                                                                                </svg>
                                                                            </span>
                                                                            <p className="fs-regular fw-regular opacity-50  uppercase ">
                                                                                reply
                                                                            </p>
                                                                        </div>
                                                                    </div></div>
                                                                </div>
                                                                <hr className="my-4 border-[1px] border-[#ffffff1a]" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                            )}

                                            {/* ********** Reply Input ******* */}
                                            <div
                                                className={`poll-container ${showCommentInput == index ? "show" : ""}`}
                                            >
                                                {showCommentInput ==
                                                    index && (
                                                        <form onSubmit={(e) => {
                                                            e.preventDefault()
                                                            postComment(null, item?.id);
                                                        }}>
                                                            <div className="reply-div px-3 pb-2">
                                                                {/* <hr className="my-4 border-[1px] border-[#ffffff1a]" /> */}
                                                                <div className="mt-6 flex gap-x-2 justify-between">
                                                                    <Link href={route('users.profile', user?.id)}>
                                                                        <img
                                                                            className="w-10 h-10 rounded-full object-cover object-center"
                                                                            src={user?.dp?.small?.url}
                                                                            alt=""
                                                                        />
                                                                    </Link>
                                                                    <div className=" 2xl:w-[93%] w-[90%] ">
                                                                        {/* ******* / Reply ********** */}
                                                                        <textarea
                                                                            autoFocus
                                                                            rows="1"
                                                                            value={commentData?.reply}
                                                                            onChange={(e) => { setCommentData((prevState) => ({ ...prevState, reply: e.target.value, })); }}
                                                                            onKeyDown={(e) => {
                                                                                if (e.key === "Enter" && !e.shiftKey) {
                                                                                    e.preventDefault();
                                                                                    postComment(null, item?.id);
                                                                                }
                                                                            }}
                                                                            className="noise-10 border-rounded-20 inset-border border-[#ffffff1a] w-full px-[24px] py-[8px] fs-regular fw-regular outline-0 opacity-50  focus:outline-none focus:ring-0 focus:border-[#ffffff]  "
                                                                            placeholder="What’s on your mind?"
                                                                        ></textarea>
                                                                        <div className="block md:hidden">
                                                                            <div onClick={() => {
                                                                                postComment(
                                                                                    null, item?.id);
                                                                            }}
                                                                                className="w-full flex justify-end"
                                                                            >
                                                                                <Button className={"secondary noise-10 mt-[10px] uppercase px-3"}>
                                                                                    Post
                                                                                </Button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    )}
                                            </div>

                                            {/* reply input end  */}
                                        </div>
                                    )
                                    )}
                                </div>
                            </div>
                        </div>
                        {/* <!-- Modal footer --> */}
                    </div>
                </div>
                <div data-aos="fade-in" data-aos-delay="100" data-aos-easing="ease" data-aos-duration="300" className="backdrop-blur-lg bg-black/30 fixed inset-0 z-40 noise-10  "></div>
            </div>
        </div >
    );
};

export default CommunityModal;
