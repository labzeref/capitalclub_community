import React, { useContext, useEffect, useState } from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import dissProfile from "../../../assets/img/discussion-profile-pic.jpg";
import dicussionMain from "../../../assets/img/dicussion-main.jpg";
import siyan from "../../../assets/img/siyan.png";
import enola from "../../../assets/img/enola.png";
import leaf from "../../../assets/svg/leaf.svg";
import Chatty from "../../../assets/svg/chatty.svg";
import top50 from "../../../assets/svg/top50.svg";
import check from "../../../assets/checked.png";
import uncheck from "../../../assets/uncheck.png";
import Layout from "@/Layouts/Layout";
import CommunityModal from "@/Components/Modal/CommunityModal";
import CreatePost from "@/Components/Modal/CreatePost";
import SessionLayout from "@/Layouts/SessionLayout";
import EditPost from "@/Components/Modal/EditPost";
import emojis from '../../Components/Emojis.json'
import axios from "axios";
import Button from "../../Components/Button";
import { ReactComponent as BookMark } from "../../../assets/svg/Bookmark.svg";
import PlyrComponent from "@/Components/PlyrComponent";
import ReactToast from "@/Components/ReactToast";
import ReportModal from "@/Components/Modal/ReportModal";
import TabButton from "@/Components/TabButton";
import IconButton from "@/Components/IconButton";
import NewIconButton from "@/Components/NewIconButton";
import TopRankMembers from "@/Components/TopRankMembers";
import ReactCountryFlag from "react-country-flag"
import { PostsContext } from '../../Store/PostsProvider';
import PostCard from "@/Components/DiscussionComponents/PostCard";
const Discussion = ({ postPollDurations, profile, topRankMembers, chunkSize}) => {
    useEffect(() => {
        AOS.init();
    }, [])
    const {   contextPosts, setCurrentPage , getAllPost , getFollowingPost, getBookmarkPost , updatePosts  } = useContext(PostsContext);
    // console.log('contextFollowingPosts')
    // console.log(contextFollowingPosts)
 
 

    // console.log('postPollDurations')
    // console.log(postPollDurations)
    // console.log('profile')
    // console.log(profile)

    // console.log('contextPosts  ')
    // console.log(contextPosts)

    useEffect(() => {
    setCurrentPage('discussion')
    }, [])

    const [postTab , setPostTab] = useState(1)
    const [allPosts, setAllPosts] = useState(contextPosts)
    useEffect(() => {
        // if (postTab===1) {
            setAllPosts(contextPosts);
            
            setLoader(false)
        // } else if(postTab===2) {
        //     setAllPosts(contextFollowingPosts);
        // } else if(postTab===3){
        //     setAllPosts(contextBookmarkPosts);
        // }
       
      }, [contextPosts ,  postTab  ]);

//     useEffect(() => {
//             setAllPosts(contextPosts)
//     }, [ ])

    // const [posts, setPosts] = useState(contextPosts)
    const [loader, setLoader] = useState(true)

    // const getAllPost = async () => {
    //     try {
    //         const response = await axios.get(route("posts.index"));
    //         // setPosts(response?.data?.payload?.data)
    //         setAllPosts(response?.data?.payload?.data)
    //         setLoader(false)
    //         // updatePosts(response?.data?.payload?.data)
    //         // console.log('getting all post successfully.....', response?.data?.payload?.data)
    //     } catch (error) {
    //         console.error("error getting all  post:", error);
    //     }
    // };


    // const getFollowingPost = async () => {
    //     try {
    //         const response = await axios.get(route("posts.index",{ following:true }));
    //         // setPosts(response?.data?.payload?.data)
    //         setAllPosts(response?.data?.payload?.data)
    //         setLoader(false)
    //         // updatePosts(response?.data?.payload?.data)
    //         // console.log('getting all post successfully. ....', response?.data?.payload?.data)
    //     } catch (error) {
    //         console.error("error getting all  post:", error);
    //     }
    // };

    // const getBookmarkPost = async () => {
    //     try {
    //         const response = await axios.get(route("posts.index", { bookmarked:true }));
    //         // setPosts(response?.data?.payload?.data)
    //         setAllPosts(response?.data?.payload?.data)
    //         setLoader(false)
    //         // updatePosts(response?.data?.payload?.data)
    //         // console.log(' get bookmark post  successfully .....', response?.data?.payload?.data)
    //     } catch (error) {
    //         console.error("error getting all  post:", error);
    //     }
    // };


    
    // useEffect(() => {
    //     getAllPost()
    // }, [ ])


   


    const [newPost, setNewPost] = useState({})

    const postResponse = (e, time) => {
        if (!time) {
            // console.log('post appending in discussion page', e )
            allPosts.unshift(e);
            setNewPost(e)
        }
    }


    // find post

    const findPostIndexById = (postId) => {
        return allPosts.findIndex((post) => post?.id == postId)
    }

    // console.log('all Posts state *************** * : ', allPosts)

    const { auth } = usePage().props;


    const [selectedEmojis, setSelectedEmojis] = useState({});



    const handleEmojiClick = async (emoji, postId, index) => {
        try {
            const response = await axios.post(route('toggle-reaction.posts', postId), {
                reaction: emoji?.name,
            }); 
            setAllPosts((prevPosts) => {
                const updatedPosts = [...prevPosts];
                updatedPosts[index] = response.data?.payload;
                return updatedPosts;
            });


        } catch (error) {
            console.error('Error while emoji API hitting:', error);
        }

        setSelectedEmojis((prevSelectedEmojis) => ({
            ...prevSelectedEmojis,
            [postId]: emoji,
        }));
    };


    // console.log('selected emoji************************:' , selectedEmojis)


    //BOOKMARK Function TO the server

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
 

    //DELETE Function TO the server

    const [status, setStatus] = useState()

    const deletePost = async (post_id) => {
        try {
            const response = await axios.delete(route('posts.destroy', post_id));
            if (response?.status === 200) {
                // Filter the posts array to exclude the post with the specified post_id
                const indexToRemove = allPosts.findIndex(post => post.id === post_id);
                // console.log('new array after deletion ,,,,,,,,,,,,,,,,,,,,,,,' , indexToRemove)
                if (indexToRemove !== -1) {
                    allPosts.splice(indexToRemove, 1);
                }
                // setAllPosts(posts);
                setShowIndex(null)
            }
            setStatus(response?.status)
            // console.log('Response of delete post:', response);
        } catch (error) {
            console.error("Error while deleting post:", error);
        }
    };

    useEffect(() => {
        // setAllPosts(posts)
        setShowIndex(null)
    }, [status])


    // ******** POLL ************


    // route('posts.select-choice', 12)

    const handleChoiceSelect = async (voted, quiz_id, post_id, index) => {
        console.log('my choice id ***', voted)
        if (voted) {
            try {
                const response = await axios.post(route('posts.select-choice', post_id), {
                    choice_id: quiz_id
                });

                // console.log('Response of poll:', response?.data?.payload);

                //   setAllPosts((prevPosts) => {
                // const updatedPosts = [...prevPosts];
                allPosts[index] = response.data?.payload;
                // return updatedPosts;
                //   });

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



    const [indexofPost, setIndexofPost] = useState(0)
    const [totalCount, setTotalCount] = useState(0)
    const handleReacttions = (index) => {
        setIndexofPost(index)
        setTotalCount(allPosts[index]?.reactions_count + 1)
    }

    const [showIndex, setShowIndex] = useState(null);


    // handle modal
    const [openModal, setOpenModal] = useState(false);
    const [indexforModal, setIndexforModal] = useState()
    const [data, setData] = useState({})



    const handleOpenCommentsModal = () => {
        // setIndexforModal(index)
        setOpenModal(true)
        // setData(data)
        // posts[index]

    }

const [ updateModal ,  setUpdateModal] = useState(0)
useEffect(()=>{
    setData(allPosts[indexforModal])
},[updateModal])

// console.log( 'profile **************************' , profile)

    return (
        <div className="paddingSectionLarge">
            <Head title="Discussion"/>
            <section data-aos="fade-in" data-aos-delay="100" data-aos-easing="ease" data-aos-duration="300" className="  paddingSectionSmall">
                <div className="md:container mx-auto md:px-5 xl:px-0">
                    <div className="grid grid-cols-12 gap-y-4   lg:gap-x-12">
                        <div  className="col-span-12 md:col-span-12 lg:col-span-3 order-1  md:mx-0 ">
                            <div className="grid grid-cols-12  gap-x-4 px-5 md:px-0 sticky pt-3 top-0">
                                <div className="col-span-12 md:col-span-6  lg:col-span-12  ">
                                    <div className=" sticky top-0">
                                    {/* <motion.div
                style={{
                    width: 150,
                    height: 150,
                    borderRadius: 30,
                    backgroundColor: "#fff",
                    opacity: 0.7,
                }}
                drag
                whileHover={{ opacity: 1 }}
                whileTap={{
                    opacity: 1,
                    scale: 1.05,
                    boxShadow: "0px 5px 8px #222",
                }}
                whileDrag={{ scale: 1.1, boxShadow: "0px 10px 16px #222" }}
                transition={{ duration: 0.6 }}
            > */}

                                        <div
                                            className=" noise-10   inset-border border-rounded-10  bg-cover"

                                        // style="background-image: url({{ asset('assets/img/Noise20.webp') }});"
                                        >
                                            <div className="relative image-wrapper">
                                                <div className="absolute right-4 top-4">
                                                    <div className="p-1  rounded-[5px] bg-white">
                                                    <ReactCountryFlag  style={{
                    fontSize: '2em', 
                }} countryCode={profile?.country_iso}/>
                                                        {/* <svg
                                                            className="h-5 w-5 md:h-6 md:w-6"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <g clipPath="url(#clip0_829_46176)">
                                                                <path
                                                                    opacity="0.4"
                                                                    d="M3.75 15.75C9.75 10.5534 14.25 20.9466 20.25 15.75V4.5C14.25 9.69656 9.75 -0.696567 3.75 4.5V15.75Z"
                                                                    fill="black"
                                                                />
                                                                <path
                                                                    d="M3.75 20.25V4.5"
                                                                    stroke="black"
                                                                    strokeWidth="1.2"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                />
                                                                <path
                                                                    d="M3.75 15.75C9.75 10.5534 14.25 20.9466 20.25 15.75V4.5C14.25 9.69656 9.75 -0.696567 3.75 4.5"
                                                                    stroke="black"
                                                                    strokeWidth="1.2"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                />
                                                            </g>
                                                            <defs>
                                                                <clipPath id="clip0_829_46176">
                                                                    <rect
                                                                        width="24"
                                                                        height="24"
                                                                        fill="white"
                                                                    />
                                                                </clipPath>
                                                            </defs>
                                                        </svg> */}
                                                    </div>
                                                </div>
                                                <Link
                                                    href={route('users.profile', profile?.id)}
                                                >
                                                    <div>
                                                        <img
                                                            className="h-[211px] w-full bg-cover object-fit object-center"
                                                            src={profile?.dp?.original?.url }alt="" />
                                                    </div>
                                                </Link>
                                            </div>
                                            <div className="mt-6  text-center flex flex-col justify-center items-center">
                                                <p className="mb-4 fw-regular fs-tiny w-24 bg-white text-[#000000] pt-[2px] text-center rounded-3xl">
                                                    Glitch #{auth?.user?.id}
                                                </p>
                                                <Link
                                                    href={route('users.profile', profile?.id)}
                                                >
                                                    <div>
                                                        {" "}
                                                        <h4 className="mb-1    break-words ">
                                                            {
                                                                profile?.full_name
                                                            }
                                                        </h4>{" "}
                                                    </div>
                                                </Link>
                                                <p className="fw-regular fs-regular text-[#9E9E9E]">
                                                    Members Since July, 2020
                                                </p>
                                            </div>

                                            <div className="mt-6  text-center flex flex-col justify-center items-center">
                                                <p className="fw-regular fs-regular">
                                                    Rank Badges
                                                </p>
                                                <div className="flex items-center gap-3">

                                                    {profile?.badges?.map((badge, index) => (
                                                        <div key={index+2} className="flex items-center gap-1">

                                                            <img
                                                                className="h-6 w-6"
                                                                src={`data:image/svg+xml;utf8,${encodeURIComponent(badge?.svg)}`}
                                                                alt=""
                                                            />
                                                            <p className="fw-regular fs-tiny">
                                                                {badge?.weight}
                                                            </p>
                                                        </div>
                                                    ))}
                                                  
                                                </div>
                                            </div>

                                            <div className="my-6 text-center flex flex-col justify-center items-center">
                                                <p className="fw-medium fs-regular mb-2">
                                                    Social
                                                </p>
                                                <div className="flex items-center gap-4">
                                                    {profile?.socialMedia?.discord && <div>

                                                        <a href={profile?.socialMedia?.discord} target="_blank" >
                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path opacity="0.2" d="M13.7814 17.1618C13.1895 17.2208 12.595 17.2502 12.0001 17.2499C11.4053 17.2502 10.8108 17.2208 10.2189 17.1618L9.25795 19.7559C9.2212 19.8539 9.16471 19.9433 9.09197 20.0186C9.01923 20.0939 8.93181 20.1534 8.83511 20.1935C8.73842 20.2335 8.63452 20.2533 8.52986 20.2516C8.4252 20.2499 8.32201 20.2266 8.2267 20.1834L1.94545 17.399C1.78372 17.328 1.65226 17.2021 1.57422 17.0437C1.49619 16.8852 1.47659 16.7043 1.51889 16.5328L4.29107 5.62494C4.32722 5.48158 4.40454 5.35192 4.51349 5.25197C4.62244 5.15202 4.75826 5.08613 4.9042 5.06244L8.28482 4.50744C8.47311 4.47544 8.66654 4.51557 8.82656 4.61981C8.98658 4.72406 9.10145 4.88478 9.14826 5.06994L9.61701 6.91025C11.2 6.699 12.804 6.699 14.387 6.91025L14.8558 5.06994C14.9026 4.88478 15.0174 4.72406 15.1775 4.61981C15.3375 4.51557 15.5309 4.47544 15.7192 4.50744L19.0961 5.06244C19.242 5.08613 19.3778 5.15202 19.4868 5.25197C19.5957 5.35192 19.673 5.48158 19.7092 5.62494L22.4776 16.5346C22.5199 16.7061 22.5003 16.8871 22.4223 17.0455C22.3443 17.204 22.2128 17.3298 22.0511 17.4009L15.7698 20.1853C15.6745 20.2285 15.5713 20.2517 15.4667 20.2535C15.362 20.2552 15.2581 20.2354 15.1614 20.1953C15.0647 20.1553 14.9773 20.0957 14.9046 20.0205C14.8318 19.9452 14.7753 19.8558 14.7386 19.7578L13.7814 17.1618Z" fill="#FAFAFA"/>
<path d="M8.625 14.25C9.24632 14.25 9.75 13.7463 9.75 13.125C9.75 12.5037 9.24632 12 8.625 12C8.00368 12 7.5 12.5037 7.5 13.125C7.5 13.7463 8.00368 14.25 8.625 14.25Z" fill="#E0E0E0"/>
<path d="M15.375 14.25C15.9963 14.25 16.5 13.7463 16.5 13.125C16.5 12.5037 15.9963 12 15.375 12C14.7537 12 14.25 12.5037 14.25 13.125C14.25 13.7463 14.7537 14.25 15.375 14.25Z" fill="#E0E0E0"/>
<path d="M14.385 6.90842L14.8538 5.06811C14.9006 4.88295 15.0154 4.72223 15.1755 4.61798C15.3355 4.51373 15.5289 4.47361 15.7172 4.50561L19.0959 5.06248C19.2419 5.08618 19.3777 5.15206 19.4866 5.25201C19.5956 5.35197 19.6729 5.48162 19.7091 5.62498L22.4775 16.5347C22.5198 16.7062 22.5002 16.8871 22.4222 17.0456C22.3441 17.204 22.2127 17.3299 22.0509 17.4009L15.7697 20.1853C15.6744 20.2286 15.5712 20.2518 15.4665 20.2535C15.3619 20.2553 15.258 20.2355 15.1613 20.1954C15.0646 20.1553 14.9772 20.0958 14.9044 20.0205C14.8317 19.9452 14.7752 19.8558 14.7384 19.7578L13.7812 17.1619" stroke="#E0E0E0" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M9.61529 6.90842L9.14654 5.06811C9.09973 4.88295 8.98486 4.72223 8.82484 4.61798C8.66482 4.51373 8.47139 4.47361 8.28311 4.50561L4.90436 5.06248C4.75841 5.08618 4.62259 5.15206 4.51365 5.25201C4.4047 5.35197 4.32738 5.48162 4.29123 5.62498L1.52279 16.5328C1.4805 16.7043 1.5001 16.8852 1.57813 17.0437C1.65616 17.2022 1.78763 17.328 1.94936 17.399L8.23061 20.1834C8.32592 20.2267 8.42911 20.2499 8.53377 20.2516C8.63842 20.2534 8.74232 20.2336 8.83902 20.1935C8.93571 20.1534 9.02314 20.0939 9.09588 20.0186C9.16861 19.9433 9.22511 19.8539 9.26186 19.7559L10.219 17.1619" stroke="#E0E0E0" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M7.5 7.34153C8.96628 6.9414 10.4801 6.74239 12 6.74996C13.5199 6.74239 15.0337 6.9414 16.5 7.34153" stroke="#E0E0E0" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M16.5 16.6584C15.0337 17.0586 13.5199 17.2576 12 17.25C10.4801 17.2576 8.96628 17.0586 7.5 16.6584" stroke="#E0E0E0" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

                                                        </a>

                                                    </div>}
                                                    {profile?.socialMedia?.twitter && <div>

                                                        <a href={profile?.socialMedia?.twitter} target="_blank" >
                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path opacity="0.2" d="M8.25 16.5C8.25 16.5 3.07969 13.5 3.82312 5.25003C3.82312 5.25003 7.54125 9.00003 12 9.75003V8.25003C12 6.18753 13.6875 4.47472 15.75 4.50003C16.4779 4.50849 17.1882 4.72476 17.7972 5.12339C18.4063 5.52201 18.8888 6.08638 19.1878 6.75003H22.5L19.5 9.75003C19.1006 16.0163 13.8675 21 7.5 21C4.5 21 3.75 19.875 3.75 19.875C3.75 19.875 6.75 18.75 8.25 16.5Z" fill="#FAFAFA"/>
<path d="M8.25 16.5C8.25 16.5 3.07969 13.5 3.82312 5.25003C3.82312 5.25003 7.54125 9.00003 12 9.75003V8.25003C12 6.18753 13.6875 4.47472 15.75 4.50003C16.4779 4.50849 17.1882 4.72476 17.7972 5.12339C18.4063 5.52201 18.8888 6.08638 19.1878 6.75003H22.5L19.5 9.75003C19.1006 16.0163 13.8675 21 7.5 21C4.5 21 3.75 19.875 3.75 19.875C3.75 19.875 6.75 18.75 8.25 16.5Z" stroke="#E0E0E0" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

                                                        </a>

                                                    </div>}
                                                    {profile?.socialMedia?.linkedin && <div>

                                                        <a href={profile?.socialMedia?.linkedin} target="_blank" >
                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path opacity="0.2" d="M20.25 3H3.75C3.33579 3 3 3.33579 3 3.75V20.25C3 20.6642 3.33579 21 3.75 21H20.25C20.6642 21 21 20.6642 21 20.25V3.75C21 3.33579 20.6642 3 20.25 3Z" fill="#FAFAFA"/>
<path d="M20.25 3H3.75C3.33579 3 3 3.33579 3 3.75V20.25C3 20.6642 3.33579 21 3.75 21H20.25C20.6642 21 21 20.6642 21 20.25V3.75C21 3.33579 20.6642 3 20.25 3Z" stroke="#E0E0E0" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M11.25 10.5V16.5" stroke="#E0E0E0" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M8.25 10.5V16.5" stroke="#E0E0E0" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M11.25 13.125C11.25 12.4288 11.5266 11.7611 12.0188 11.2688C12.5111 10.7766 13.1788 10.5 13.875 10.5C14.5712 10.5 15.2389 10.7766 15.7312 11.2688C16.2234 11.7611 16.5 12.4288 16.5 13.125V16.5" stroke="#E0E0E0" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M8.775 7.875C8.775 8.16495 8.53995 8.4 8.25 8.4C7.96005 8.4 7.725 8.16495 7.725 7.875C7.725 7.58505 7.96005 7.35 8.25 7.35C8.53995 7.35 8.775 7.58505 8.775 7.875Z" fill="#E0E0E0" stroke="#E0E0E0" strokeWidth="1.2"/>
</svg>

                                                        </a>

                                                    </div>}
                                                    {profile?.socialMedia?.instagram && <div>

                                                        <a href={profile?.socialMedia?.instagram} target="_blank" >
                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path opacity="0.2" d="M16.5 3H7.5C6.30653 3 5.16193 3.47411 4.31802 4.31802C3.47411 5.16193 3 6.30653 3 7.5V16.5C3 17.6935 3.47411 18.8381 4.31802 19.682C5.16193 20.5259 6.30653 21 7.5 21H16.5C17.6935 21 18.8381 20.5259 19.682 19.682C20.5259 18.8381 21 17.6935 21 16.5V7.5C21 6.30653 20.5259 5.16193 19.682 4.31802C18.8381 3.47411 17.6935 3 16.5 3ZM12 15.75C11.2583 15.75 10.5333 15.5301 9.91661 15.118C9.29993 14.706 8.81928 14.1203 8.53545 13.4351C8.25162 12.7498 8.17736 11.9958 8.32205 11.2684C8.46675 10.541 8.8239 9.8728 9.34835 9.34835C9.8728 8.8239 10.541 8.46675 11.2684 8.32205C11.9958 8.17736 12.7498 8.25162 13.4351 8.53545C14.1203 8.81928 14.706 9.29993 15.118 9.91661C15.5301 10.5333 15.75 11.2583 15.75 12C15.75 12.9946 15.3549 13.9484 14.6517 14.6517C13.9484 15.3549 12.9946 15.75 12 15.75Z" fill="#FAFAFA"/>
<path d="M16.5 3H7.5C5.01472 3 3 5.01472 3 7.5V16.5C3 18.9853 5.01472 21 7.5 21H16.5C18.9853 21 21 18.9853 21 16.5V7.5C21 5.01472 18.9853 3 16.5 3Z" stroke="#E0E0E0" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M12 15.75C14.0711 15.75 15.75 14.0711 15.75 12C15.75 9.92893 14.0711 8.25 12 8.25C9.92893 8.25 8.25 9.92893 8.25 12C8.25 14.0711 9.92893 15.75 12 15.75Z" stroke="#E0E0E0" strokeWidth="1.2" strokeMiterlimit="10"/>
<path d="M16.875 8.25C17.4963 8.25 18 7.74632 18 7.125C18 6.50368 17.4963 6 16.875 6C16.2537 6 15.75 6.50368 15.75 7.125C15.75 7.74632 16.2537 8.25 16.875 8.25Z" fill="#E0E0E0"/>
</svg>

                                                        </a>

                                                    </div>}
                                                    {profile?.socialMedia?.youtube && <div>

                                                        <a href={profile?.socialMedia?.youtube} target="_blank" >
                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path opacity="0.2" d="M21.2428 6.7059C21.1851 6.47464 21.0731 6.26047 20.9161 6.08113C20.7591 5.90179 20.5616 5.76245 20.34 5.67465C17.2013 4.46715 12 4.49997 12 4.49997C12 4.49997 6.79875 4.46715 3.65625 5.67934C3.43466 5.76714 3.23718 5.90648 3.08017 6.08582C2.92317 6.26516 2.81116 6.47933 2.75344 6.71059C2.53781 7.55059 2.25 9.1959 2.25 12C2.25 14.804 2.53781 16.4493 2.75719 17.294C2.8152 17.524 2.92694 17.737 3.08322 17.9155C3.23951 18.0939 3.43589 18.2328 3.65625 18.3206C6.79875 19.5328 12 19.5 12 19.5C12 19.5 17.2012 19.5328 20.3438 18.3206C20.5648 18.2332 20.7619 18.0946 20.9189 17.9161C21.0759 17.7377 21.1882 17.5244 21.2466 17.294C21.4659 16.4503 21.7537 14.804 21.7537 12C21.7537 9.1959 21.4622 7.55059 21.2428 6.7059ZM10.5 15V8.99996L15 12L10.5 15Z" fill="#FAFAFA"/>
<path d="M15 12L10.5 9V15L15 12Z" stroke="#E0E0E0" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M2.25 12C2.25 14.804 2.53781 16.4484 2.75719 17.294C2.8152 17.524 2.92694 17.737 3.08322 17.9155C3.23951 18.0939 3.43589 18.2328 3.65625 18.3206C6.79875 19.5328 12 19.5 12 19.5C12 19.5 17.2012 19.5328 20.3438 18.3206C20.5648 18.2332 20.7619 18.0946 20.9189 17.9161C21.0759 17.7377 21.1882 17.5244 21.2466 17.294C21.4659 16.4503 21.7537 14.804 21.7537 12C21.7537 9.1959 21.4659 7.55153 21.2466 6.7059C21.1888 6.47464 21.0768 6.26047 20.9198 6.08113C20.7628 5.90179 20.5653 5.76245 20.3438 5.67465C17.2012 4.46715 12 4.49997 12 4.49997C12 4.49997 6.79875 4.46715 3.65625 5.67934C3.43466 5.76714 3.23718 5.90648 3.08017 6.08582C2.92317 6.26516 2.81116 6.47933 2.75344 6.71059C2.53781 7.55059 2.25 9.1959 2.25 12Z" stroke="#E0E0E0" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

                                                        </a>

                                                    </div>}
                                                </div>
                                            </div>
                                        </div>

                                        {/* </motion.div> */}

                                    </div>
                                </div>
                                <div className="col-span-12 md:col-span-6 lg:col-span-12  ">
                                    <div
                                        className="mt-4 md:mt-0 lg:mt-4 noise-10 border-rounded-10 inset-border md:h-full bg-cover"

                                    // style="background-image: url({{ asset('assets/img/Noise20.webp') }});"
                                    >
                                        <div className="flex items-center justify-between p-4">
                                            <h6>Followed Hashtag</h6>
                                            <div>
                                                <svg
                                                    width="16"
                                                    height="16"
                                                    viewBox="0 0 16 16"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <g clipPath="url(#clip0_829_46181)">
                                                        <path
                                                            opacity="0.4"
                                                            d="M12 7.50008L8.5 4.00008L10.3538 2.14633C10.4475 2.05263 10.5746 2 10.7072 2C10.8397 2 10.9669 2.05263 11.0606 2.14633L13.8538 4.93758C13.9474 5.03134 14.0001 5.15847 14.0001 5.29102C14.0001 5.42357 13.9474 5.5507 13.8538 5.64446L12 7.50008Z"
                                                            fill="white"
                                                        />
                                                        <path
                                                            d="M5.79313 13.5001H3C2.86739 13.5001 2.74021 13.4474 2.64645 13.3536C2.55268 13.2599 2.5 13.1327 2.5 13.0001V10.207C2.50006 10.0745 2.55266 9.94753 2.64625 9.85383L10.3538 2.14633C10.4475 2.05263 10.5746 2 10.7072 2C10.8397 2 10.9669 2.05263 11.0606 2.14633L13.8538 4.93758C13.9474 5.03134 14.0001 5.15847 14.0001 5.29102C14.0001 5.42357 13.9474 5.5507 13.8538 5.64446L6.14625 13.3538C6.05255 13.4474 5.92556 13.5 5.79313 13.5001Z"
                                                            stroke="white"
                                                            strokeWidth="1.2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                        <path
                                                            d="M8.5 4L12 7.5"
                                                            stroke="white"
                                                            strokeWidth="1.2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_829_46181">
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

                                        <div className=" hover:bg-[#ffffff1a] p-1 mb-3">
                                            <a
                                                href="#"
                                                className="flex items-center gap-4 px-4"
                                            >
                                                <p className="fs-small fw-medium">
                                                    #
                                                </p>
                                                <p className="fs-small fw-regular">
                                                    Food
                                                </p>
                                            </a>
                                        </div>

                                        <div className=" hover:bg-[#ffffff1a] p-1 mb-3">
                                            <a
                                                href="#"
                                                className="flex items-center gap-4 px-4"
                                            >
                                                <p className="fs-small fw-medium">
                                                    #
                                                </p>
                                                <p className="fs-small fw-regular">
                                                    Art & Entertainment
                                                </p>
                                            </a>
                                        </div>

                                        <div className=" hover:bg-[#ffffff1a] p-1 mb-3">
                                            <a
                                                href="#"
                                                className="flex items-center gap-4 px-4"
                                            >
                                                <p className="fs-small fw-medium">
                                                    #
                                                </p>
                                                <p className="fs-small fw-regular">
                                                    Sports & Gaming
                                                </p>
                                            </a>
                                        </div>

                                        <div className=" hover:bg-[#ffffff1a] p-1 mb-3">
                                            <a
                                                href="#"
                                                className="flex items-center gap-4 px-4"
                                            >
                                                <p className="fs-small fw-medium">
                                                    #
                                                </p>
                                                <p className="fs-small fw-regular">
                                                    Business
                                                </p>
                                            </a>
                                        </div>

                                        <div className=" hover:bg-[#ffffff1a] p-1 mb-3">
                                            <a
                                                href="#"
                                                className="flex items-center gap-4 px-4"
                                            >
                                                <p className="fs-small fw-medium">
                                                    #
                                                </p>
                                                <p className="fs-small fw-regular">
                                                    Science & Tech
                                                </p>
                                            </a>
                                        </div>

                                        <div className=" hover:bg-[#ffffff1a] p-1 mb-3">
                                            <a
                                                href="#"
                                                className="flex items-center gap-4 px-4"
                                            >
                                                <p className="fs-small fw-medium">
                                                    #
                                                </p>
                                                <p className="fs-small fw-regular">
                                                    Home & Lifestyle
                                                </p>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
{/* 
                        {openModal &&
                            <CommunityModal
                            modalPostData={data}
                                indexforModal={indexforModal}

                                user={profile}
                                handleEmojiMain={handleEmojiClick}
                                selectedEmojis={selectedEmojis}
                                setSelectedEmojis={setSelectedEmojis}

                                handleChoiceSelect={handleChoiceSelect}
                                openModal={openModal}
                                setOpenModal={setOpenModal}
                                bookmarkPost={bookmarkPost}
                                deletePost={deletePost}
                                setUpdateModal={setUpdateModal}
                                updateModal={updateModal}
                            />

                        } */}
                        {/* *********POSTS*********** */}

                        <div  className="  col-span-12 lg:col-span-6 lg:order-2 order-3 px-5 md:px-0 md:mx-0 mt-[3rem] md:mt-[2rem] lg:mt-0">
                            <div className="text-start">
                                <h3>Discussion</h3>
                            </div>

                            <div className="mt-8 w-full flex items-center justify-between overflow-x-scroll lg:overflow-x-hidden overflow-whitewrap">
                                <TabButton
                                onClick={()=>{setPostTab(1) ; getAllPost()}  }
                                    className={` ${postTab==1 && 'active ' } glitch uppercase text-[#fff] w-full`}
                                    activeBottom={postTab==1 && 'active-tab-block'}
                                >
                                    For you

                                </TabButton>
                                <TabButton
                                onClick={()=>{setPostTab(2) ; getFollowingPost()}}
                                className={` ${postTab==2 && 'active ' } glitch uppercase text-[#fff] w-full`}
                                activeBottom={postTab==2 && 'active-tab-block'}
                                >
                                    Following
                                </TabButton>
                                <TabButton
                                onClick={()=>{setPostTab(3) ; getBookmarkPost() }}
                                className={` ${postTab==3 && 'active ' } glitch uppercase text-[#fff] w-full`}
                                activeBottom={postTab==3 && 'active-tab-block'}
                                >
                                    Bookmark
                                </TabButton>
                            </div>
                            {/* <div className="border-b-[1px]  border-b-[#FFFFFF] opacity-20"></div> */}

                            <CreatePost postPollDurations={postPollDurations} profile={profile} postResponse={postResponse} chunkSize={chunkSize} setPostTab={setPostTab} />

                            {/* posts */}
                            {loader &&
                                // <div className='pt-[4rem] '>
                                //     <div className="multi-spinner-container">
                                //         <div className="multi-spinner">
                                //             <div className="multi-spinner">
                                //                 <div className="multi-spinner">
                                //                     <div className="multi-spinner">
                                //                         <div className="multi-spinner">
                                //                             <div className="multi-spinner">
                                //                             </div>
                                //                         </div>
                                //                     </div>
                                //                 </div>
                                //             </div>
                                //         </div>
                                //     </div>
                                // </div>
                                <div className="col-sm-6 text-center pt-[4rem] ">
                                    <div className="loader1">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                </div>
                            }




                            {/* ***********************POST MAP**********************************  */}

<PostCard allPosts={allPosts} setAllPosts={setAllPosts} profile={profile} />



                            {/* {allPosts?.map((data, index) => (
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
                                                            <div
                                                                id="dropdown"
                                                                className="-ml-[7rem] lg:ml-1  z-10 absolute bg-[#1A1A1A] border-rounded-10 divide-y divide-gray-100 shadow w-[8rem]  "
                                                            >
                                                                <ul
                                                                    className="  text-sm text-black  "
                                                                    aria-labelledby="dropdownDefaultButton"
                                                                > 
                                                                  
                                                                    <li onClick={() => { bookmarkPost(data?.id); setShowIndex(-1) }} className="">
                                                                        <p className=" rounded-t-[10px] px-4 py-2 text-white hover:text-black hover:bg-gray-100 border-y border-[#292929] fw-regular ">
                                                                            Bookmark
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
                                                                            <img src={check}
                                                                                className="w-[1.125rem] mt-[2px] h-[1.125rem]"
                                                                                alt="check" />

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
                                                                {
                                                                    choice.value
                                                                }
                                                            </p>

                                                        </div>

                                                    ))}


                                                </>


                                            }

                                            {data?.type === 'image' && <img
                                                className="w-full h-auto border-rounded-10 object-cover object-center"
                                                src={data?.media?.url}
                                                alt=""
                                            />
                                            }



                                            {data?.type === 'video' &&
                                                <PlyrComponent source={data?.media?.url} thumbnail={data?.thumbnail?.url} />
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


                                            <hr className="my-3 border-[1px] border-[#ffffff1a]" />
                                            <div className="flex items-center justify-between">

                                                <div className="flex items-center gap-1">
                                                    {data?.reactions_count > 0 && <div className="bg-[#000000]  px-3 rounded-3xl border-[1px] border-[#ffffff1a] flex items-center justify-center gap-1 w-[50px] pt-[3px] h-6">
                                                        <p className="fw-regular fs-tiny">
                                                            {emojis.find((emoji) => emoji.name === data?.my_reaction)?.emoji}
                                                        </p>
                                                        <p className="fw-regular fs-small">
                                                            {data?.reactions_count}
                                                        </p>
                                                    </div>
                                                    }

                                                    <div className="icon relative cursor-pointer bg-[#000000] pt-[2px] pl-[3px]  rounded-full border-[1px] border-[#ffffff1a] flex items-center justify-center   w-6 h-6"
                                                    >
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






                                                <div onClick={() => { handleOpenCommentsModal(data, index); setIndexforModal(index), setData(data) }} className="flex items-center gap-3">
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

                                                    <div className="bg-[#000000] px-3 rounded-3xl border-[1px]  border-[#ffffff1a] flex items-center justify-center gap-1 w-[50px] h-6">
                                                        <p className="fw-regular fs-small pt-[4px]">
                                                            {data?.comments_count ? data?.comments_count : 0}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))} */}

                            {/* ***********************POST MAP END **********************************  */}





                        </div>

                        {/* top rank  */}
                        <div data-aos="fade-in" data-aos-delay="100" data-aos-easing="ease" data-aos-duration="300" className="col-span-12 lg:col-span-3 order-2 lg:order-3  ">
                            <div className="grid grid-cols-12 -z-10 gap-x-4 px-5 md:px-0 sticky pt-3 top-0">
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
