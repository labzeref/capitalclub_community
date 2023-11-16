import { Link } from '@inertiajs/react';
import React from 'react'
import IconButton from '../IconButton';
import ReportModal from '../Modal/ReportModal';
import PlyrComponent from '../PlyrComponent';
import { ReactComponent as BookMark } from "../../../assets/svg/Bookmark.svg";
import emojis from '../../Components/Emojis.json'
import { motion } from "framer-motion"
import leaf from "../../../assets/svg/leaf.svg";
import check from "../../../assets/checked.png";
import uncheck from "../../../assets/uncheck.png";
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import ReactToast from '../ReactToast';
import CommunityModal from '../Modal/CommunityModal';
import { PostsContext } from '../../Store/PostsProvider';
import { useContext } from 'react';
import ReactionsModal from '../Modal/ReactionsModal';
const PostCard = ({allPosts , profile , setAllPosts , setPostTab }) => {
    const { contextPosts, updatePosts , handleEmojiClick  } = useContext(PostsContext);
    const [showIndex, setShowIndex] = useState(null);
    const [status, setStatus] = useState()
    // console.log('allPosts')
    // console.log(allPosts)
    // **** Delete Post ****
    const deletePost = async (post_id) => {
        try {
            const response = await axios.delete(route('posts.destroy', post_id));
            if (response?.status === 200) { 
                const indexToRemove = allPosts.findIndex(post => post.id === post_id); 
                if (indexToRemove !== -1) {
                    allPosts.splice(indexToRemove, 1);
                } 
                setShowIndex(null)
            }
            setStatus(response?.status) 
        } catch (error) {
            console.error("Error while deleting post:", error);
        }
    };

    // **** Bookmark Post ****  

        const bookmarkPost = async (post_id) => {
            try {
                const response = await axios.post(route("bookmark-toggle.posts", post_id));
                if (response?.status == 200) {
                    ReactToast('success', response?.data?.metadata?.message)
                }
    
                // console.log('response of bookmark post.....', response?.data?.metadata?.message)
            } catch (error) {
                console.error("Error while bookmark post:", error);
            }
        };

// **** poll post selection **** 


const handleChoiceSelect = async (voted, quiz_id, post_id, index) => {
 
    if (voted) {
        try {
            const response = await axios.post(route('posts.select-choice', post_id), {
                choice_id: quiz_id
            }); 
            allPosts[index] = response.data?.payload;
 
            setAllPosts((prevPosts) => {
                const updatedPosts = [...prevPosts];
                return updatedPosts;
            });
            setStatus(3);
        } catch (error) {
            console.error("Error while poll answer:", error);
        }
    }
};


// **** Post Emoji Reaction ****  

// const [selectedEmojis, setSelectedEmojis] = useState({});
// const handleEmojiClick = async (emoji, postId, index) => {
//     try {
//         const response = await axios.post(route('toggle-reaction.posts', postId), {
//             reaction: emoji?.name,
//         });
//         console.log('Emoji posted successfully:', response.data);
//         setAllPosts((prevPosts) => {
//             const updatedPosts = [...prevPosts];
//             updatedPosts[index] = response.data?.payload;
//             return updatedPosts;
//         });
//     } catch (error) {
//         console.error('Error while emoji API hitting:', error);
//     }

//     setSelectedEmojis((prevSelectedEmojis) => ({
//         ...prevSelectedEmojis,
//         [postId]: emoji,
//     }));
// };

const [ openReactionModal , setOpenReactionModal] = useState(false)


    useEffect(() => { 
        setShowIndex(null)
    }, [status])


        // handle modal
        const [openModal, setOpenModal] = useState(false);
        const [indexforModal, setIndexforModal] = useState()
        const [data, setData] = useState()
    const handleOpenCommentsModal = () => { 
        setOpenModal(true) 

    }
    const [ postType , setPostType] = useState('')

  return (
    <div>
           {openModal &&
                            <CommunityModal
                            modalPostData={data}
                                indexforModal={indexforModal}

                                user={profile}
                                handleEmojiMain={handleEmojiClick}
                                // selectedEmojis={selectedEmojis}
                                // setSelectedEmojis={setSelectedEmojis}

                                handleChoiceSelect={handleChoiceSelect}
                                openModal={openModal}
                                setOpenModal={setOpenModal}
                                bookmarkPost={bookmarkPost}
                                deletePost={deletePost} 
                            />

                        }


{openReactionModal && 
    <ReactionsModal postId={data} openReactionModal={openReactionModal} setOpenReactionModal={setOpenReactionModal} type={postType}  /> 
}


         {contextPosts?.map((data, index) => (
            
                                <div   key={data?.id} className="px-6 pt-6 pb-3 border-rounded-10 main-post  inset-border   mt-5">
                                    <div className=" flex">
                                        <div className=" w-10  ">
                                            <div>
                                                <Link href={route('users.profile', data?.user?.id)}  >
                                                    <div>
                                                        <img
                                                            className="h-10 w-10 object-cover object-center rounded-full"
                                                            src={data?.user?.dp?.small?.url}
                                                            alt=""
                                                        />
                                                      {data?.user?.badges?.length > 0 &&  
                                                           <div>
                                                            <img
                                                               src={`data:image/svg+xml;utf8,${encodeURIComponent( data?.user?.badges[0]?.svg)}`}
                                                                alt=""
                                                                className="-mt-3 ml-1"
                                                            />
                                                            <p className="fs-tiny text-center w-10">
                                                               {data?.user?.badges[0]?.weight}
                                                            </p>
                                                        </div> 
                                                        }
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="ml-4 w-full">
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <p className="fs-small fw-medium mb-1">
                                                        {data?.user?.full_name}
                                                    </p>
                                                    <p className="fs-tiny -z-50 fw-regular opacity-50">
                                                        about {data?.created_at}
                                                    </p>
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    <div className="flex">
                                               
                                                        {data?.bookmarked &&
                                                            <IconButton
                                                                icon={<BookMark />}
                                                                className={` primary    `}
                                                            ></IconButton>
                                                         }

                                                        {/* <p className="fs-tiny fw-regular uppercase">
                                                            Pin post
                                                        </p> */}
                                                    </div>
                                                    <div>
                                                        <div
                                                            onClick={() => {
                                                                setShowIndex(index === showIndex ? -1 : index);
                                                            }}
                                                            className="cursor-pointer"
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

                                                        {showIndex === index && (
                                                             <motion.div
                                                             initial={{y: -10 , zIndex:999,}}
                                                             animate={{
                                                                 y: 0,  
                                                             }}
                                                             >
                                                            <div
                                                                id="dropdown"
                                                                className={` -ml-[7rem] lg:ml-1  z-10 absolute bg-[#1A1A1A] border-rounded-10   shadow ${data?.bookmarked ? 'w-[11rem]' : 'w-[8rem]'}`}
                                                            >
                                                                <ul
                                                                    className="  text-sm text-black  "
                                                                    aria-labelledby="dropdownDefaultButton"
                                                                >
                                                                    {/* {profile?.id === data?.user?.id && <li className=" inset-border">
                                                                        <p className="px-4 py-2 text-white hover:text-black hover:bg-gray-100  fw-regular ">
                                                                            <EditPost data={data} /> Edit
                                                                        </p>
                                                                    </li>
                                                                    } */}
                                                                  
                                                                    <li onClick={() => { bookmarkPost(data?.id); setShowIndex(-1) }} className="">
                                                                        <p className=" rounded-t-[10px] px-4 py-2 text-white hover:text-black hover:bg-gray-100 border-y border-[#292929] fw-regular ">
                                                                           {data?.bookmarked ? 'Remove Bookmark' : 'Bookmark'}
                                                                        </p>
                                                                    </li>
                                                                    {profile?.id === data?.user?.id && <li onClick={() => { deletePost(data?.id); setShowIndex(-1) }} className="">
                                                                        <p className="px-4 py-2 rounded-b-[10px] text-white hover:text-black hover:bg-gray-100  fw-regular ">
                                                                            Delete
                                                                        </p>
                                                                    </li>}
                                                                    {profile?.id !== data?.user?.id && <li className="">

                                                                        <ReportModal id={data?.id} type={'post'} />

                                                                    </li>}
                                                                </ul>
                                                                <div
                                                                    onClick={() => setShowIndex(-1)}
                                                                    className=" fixed inset-0 -z-10  "
                                                                ></div>
                                                            </div>
                                                            </motion.div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            <p className="fs-regular fw-regular my-4">
                                                {data?.title}
                                            </p>



                                            {data?.type === 'poll' &&

                                                <>

                                                    {data?.choices?.map((choice, idx) => (
                                                        <div
                                                            key={choice?.id}
                                                            onClick={() =>
                                                                handleChoiceSelect(!data?.my_choice_id ? [true, choice?.id] : false, choice?.id, data?.id, index)
                                                            }

                                                            className={`${data?.my_choice_id === choice?.id

                                                                ? " noise-20 bg-[#ffffff60]  innerBorderLinkSelectedbg"
                                                                : " noise-10  bg-[#ffffff10]"
                                                                } lg:cursor-pointer my-[8px] flex justify-start border-rounded-20 inset-border secondary px-[24px] py-[8px] relative `}
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
                                                                            <img src={check}  className="w-[1.125rem] mt-[2px] h-[1.125rem]"  alt="check" /> 
                                                                        </>
                                                                    ) : (
                                                                        <> 
                                                                        <img src={uncheck}
                                                                          className="w-[1.125rem] mt-[2px]  h-[1.125rem]"
                                                                           alt="uncheck" />
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

                                            {data?.type === 'image' && <img
                                                className="w-full h-auto border-rounded-10 object-cover object-center"
                                                src={data?.image}
                                                alt=""
                                            />
                                            }



                                            {data?.type === 'video' &&
                                                <PlyrComponent source={data?.video} thumbnail={data?.thumbnail} />
                                                // <video controls preload="none" poster="" className=" "  >
                                                //     <source
                                                //         src={data?.media?.url}
                                                //         type="video/mp4"
                                                //     />
                                                //     Your browser
                                                //     does not support
                                                //     the video tag.
                                                // </video>
                                            }


                                            <hr className="my-2 border-[1px] border-[#ffffff1a]" />
                                            <div className='flex justify-between'>

                                            <div onClick={()=>{setOpenReactionModal(true) ; setPostType('post') ; setData(data?.id) }} className='pt-1 cursor-pointer flex gap-x-2'>

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
                                                         {data?.comments_count }
                                                        </p>
                                                        <p className="fw-regular fs-small pt-[4px]">
                                                         Comments   
                                                        </p>
                                                    </div> }
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






                                                <div onClick={() => { handleOpenCommentsModal(data, index);   setIndexforModal(index), setData(data?.id) }} className="flex items-center gap-3">
                                                    <div className="flex items-center gap-2 cursor-pointer"  >
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
                                                        <p className="fs-regular fw-regular opacity-50   uppercase">
                                                            COMMENT
                                                        </p>
                                                    </div>

                                                    {/* {data?.comments_count > 0 && <div className="bg-[#000000] px-3 rounded-3xl border-[1px]  border-[#ffffff1a] flex items-center justify-center gap-1 w-[50px] h-6">
                                                        <p className="fw-regular fs-small pt-[4px]">
                                                            {data?.comments_count }
                                                        </p>
                                                    </div> } */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
    </div>
  )
}

export default PostCard
