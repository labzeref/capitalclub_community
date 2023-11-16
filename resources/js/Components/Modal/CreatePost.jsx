import React, {useState, useEffect} from "react";
import cross from "../../../assets/cross.png";
import enola from "../../../assets/img/enola.png";
import design2 from "../../../assets/img/design2.png";
import dissProfile from "../../../assets/img/discussion-profile-pic.jpg";
import Button from "../../Components/Button";
import check from "../../../assets/checked.png";
import uncheck from "../../../assets/uncheck.png";
import {ReactComponent as Plus} from "../../../assets/svg/Plus.svg";
import {ReactComponent as Timer} from "../../../assets/svg/Timer.svg";
import {ToastContainer, toast} from "react-toastify";
import axios from "axios";
import AOS from 'aos';
import 'aos/dist/aos.css';
import Toast from "../Toast/Toast";
import PlyrComponent from "../PlyrComponent";


// Import React FilePond
import {FilePond, registerPlugin} from "react-filepond";
// Import FilePond styles
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

import FilePondPluginImageCrop from 'filepond-plugin-image-crop';
// import FilePondPluginImageResize from 'filepond-plugin-image-resize';
// import FilePondPluginImageTransform from 'filepond-plugin-image-transform';
// import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size'
// @ts-ignore
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import {usePage} from "@inertiajs/react";
import ReactToast from "../ReactToast";
import {useRef} from "react";
// Register the plugins

const CreatePost = ({profile, postPollDurations, postResponse, chunkSize}) => {

    const [loading, setLoading] = useState(false)
    const pondRef = useRef();
    const handleFileUploadComplete = (file) => {
        // File upload complete logic
        console.log('File upload complete:', file);
    };
    // console.log('post is loading :'  , loading)
    useEffect(() => {
        AOS.init();
    }, []) 
    registerPlugin(
        FilePondPluginFileValidateType,
        FilePondPluginImageExifOrientation,
        FilePondPluginImagePreview,
        FilePondPluginImageCrop,
        // FilePondPluginImageResize,
        // FilePondPluginImageTransform
    );
    // modal show state
    const [showModal, setShowModal] = useState(false);
    const [postLoading, setPostLoading] = useState(false);

    // console.log('post loading is ***' , postLoading)

    // background scrolling prevent
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

    // upload img for new post

    const [imagePost, setImagePost] = useState();
    const [backendImagePost, setBackendImagePost] = useState();
    const [myResponse, setMyResponse] = useState()
    const [selectedFile, setSelectedFile] = useState(null);
    const [files, setFiles] = useState([])
    // console.log( 'when choose media :' ,  files[0]?.file)
    const handleImageChange = (e) => {

        const file = e.target.files[0];
        setBackendImagePost(files[0]?.file);
        setImagePost(URL.createObjectURL(file));
        // console.log(files[0].file)
        // setBackendImagePost(files[0].file);

        // const file = event.target.files[0];
        // console.log("files",file)

        //     event.target.value = null; // Clear the input value

        //     if (file === backendImagePost) {
        //         return;
        //     }


        //     // Validate aspect ratio
        //     const img = new Image();
        //     img.src = URL.createObjectURL(file);
        //     img.onload = () => {
        //         const imageWidth = img.width;
        //   const imageHeight = img.height;
        //   const imageRatio = imageWidth / imageHeight;
        //   const maxRatio = 16 / 9;

        //         console.log('target Aspect Ratio is  >>>>>>>>>>>>>>', maxRatio)
        //         console.log('img ration is  >>>>>>>>>>>>>>', aspectRatio    )

        //         if (imageRatio < maxRatio) {
        //             setBackendImagePost(file);
        //             setImagePost(URL.createObjectURL(file));
        //             setSelectedFile(null); // Clear selected file if aspect ratio is incorrect
        //             alert('Aspect ratio of 9:16.');
        //         }
        //         else{
        //             alert('invalid ratio of 9:16.');
        //         }
        //     };

    };
    const [aspectRatio, setAspectRatio] = useState(null);
    const handleImageLoad = (event) => {
        const {naturalWidth, naturalHeight} = event.target;
        const imageAspectRatio = naturalWidth / naturalHeight;
        setAspectRatio(imageAspectRatio);
        // console.log('img width and height', naturalWidth, naturalHeight)
    };
    // upload video for new post
    const [videoPost, setVideoPost] = useState();
    const [backendVideoPost, setBackendVideoPost] = useState();

    const handleVideoChange = (event) => {
        const file = event.target.files[0];
        event.target.value = null;
        // Check if the same file is selected
        if (file === backendVideoPost) {
            return;
        }

        setBackendVideoPost(file);
        setVideoPost(URL.createObjectURL(file));
    };


    const [mainScreen, setMainScreen] = useState(0);

    //  **** creating poll ****

    const [pollTime, setPollTime] = useState("");
    // const [pollQuestion, setPollQuestion] = useState("");
    const [options, setOptions] = useState([
        {id: 1, value: ""},
        {id: 2, value: ""},
    ]);
    // console.log("***options............:", options);
    const handleAddOption = () => {
        if (options.length < 4) {
            const newOption = {
                id: options.length + 1,
                value: "",
            };
            setOptions((prevOptions) => [...prevOptions, newOption]);
        }
    };

    const handleOptionChange = (id, value) => {
        const updatedOptions = options.map((option) =>
            option.id === id ? {...option, value} : option
        );
        setOptions(updatedOptions);
    };

    const handleRemoveOption = (id) => {
        if (options.length > 2) {
            const updatedOptions = options.filter((option) => option.id !== id);
            const updatedOptionsWithNewIds = updatedOptions.map(
                (option, index) => ({
                    ...option,
                    id: index + 1,
                })
            );
            setOptions(updatedOptionsWithNewIds);
        }
    };
    // poll validation
    const [pollDurationError, setPollDurationError] = useState(false);
    const [optionsError, setOptionsError] = useState(false);
    const pollValidation = () => {
        let hasError = false;
        if (!pollTime) {
            setPollDurationError(true);
            hasError = true;
        } else {
            setPollDurationError(false);
        }

        options.forEach((option) => {
            if (!option.value) {
                setOptionsError(true);
                hasError = true;
            }
        });

        if (!hasError) {
            setMainScreen(0);
        }
    };
    // creating poll function  end

    // schedual post
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");
    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };
    const handleTimeChange = (event) => {
        setSelectedTime(event.target.value);
    };
    const [schedualTime, setSchedualTime] = useState();
    const handleSchedulePost = () => {
        const currentDate = new Date();
        const [hours, minutes] = selectedTime.split(":");
        const selectedDateTime = new Date(selectedDate);
        selectedDateTime.setHours(hours);
        selectedDateTime.setMinutes(minutes);


        if (selectedDateTime < currentDate || !selectedTime || !selectedDate) {
            toast.warn("Date and Time can't be in the past!", {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        } else {
            const selectedDateTime = new Date(
                `${selectedDate}T${selectedTime}`
            );
            setSchedualTime(
                selectedTime ? selectedDate + " " + selectedTime : null
            );
            setMainScreen(0);
        }
    };

    const [postCaption, setPostCaption] = useState("");
    /**
     * This is the key of temporary media uploads which is provided by filepond
     */
    const [mediaKey, setMediaKey] = useState("");

    // const [postData, setPostData] = useState("");

    // Function to reset the textarea data
    const resetTextareaData = () => {
        setPostCaption("");
    };

    // show poll post when created
    const [selectedChoices, setSelectedChoices] = useState([]);

    const handleChoiceSelect = (quiz_id) => {
        setSelectedChoices((prevSelectedChoices) => {
            const isSelected = prevSelectedChoices.some(
                (choice) => choice.quiz_id === quiz_id
            );
            if (isSelected) {
                return [];
            }
            return [{quiz_id}];
        });
    };

    const [error, setError] = useState()

    const typeImages = files.filter((file) => file.fileType.includes('image/'));
    const typeVideo = files.filter((file) => file.fileType.includes('video/'));
//  console.log('img  type:' , typeImages?.length > 0 && 'image')
//  console.log('video  type:' , typeVideo?.length > 0 && 'video' )
    // Image Function to post data to the server
    const postWithImage = async () => {
        setPostLoading(true)
        const formData = new FormData();
        {postCaption && formData.append('title', postCaption);}
        { schedualTime && formData.append('schedule_at', schedualTime); }
        {mediaKey && formData.append('media_key', mediaKey);
        }
        formData.append('type', 'image');

        // for (const entry of formData.entries()) {
        //     console.log('form data *********** ', entry[0], entry[1]);
        // }

        try {
            const response = await axios.post(route("posts.store"), formData);
            // console.log("image Data posted successfully:", response.data?.metadata?.message);
            clearAll()
            if (response?.data?.payload?.length === 0) {
                ReactToast('success', response?.data?.metadata?.message)
            } else {
                postResponse(response?.data?.payload, schedualTime);
            }
        } catch (error) {
            setPostLoading(false)
            setError(error?.response?.data?.payload[0])
            console.error("Error while posting data:", error);
        }
    };

    // Video Function to post data to the server
    const postWithVideo = async () => {
        setPostLoading(true)
        const formData = new FormData();
        {
            postCaption && formData.append('title', postCaption);
        }
        {
            schedualTime && formData.append('schedule_at', schedualTime);
        }
        {
            mediaKey && formData.append('media_key', mediaKey);
        }
        formData.append('type', 'video');

        try {
            const response = await axios.post(route("posts.store"), formData
            );
            // console.log("video Data posted successfully:", response.data );
            clearAll()
            if (response?.data?.payload?.length === 0) {
                ReactToast('success', response?.data?.metadata?.message)
            } else {
                postResponse(response?.data?.payload, schedualTime);
            }

        } catch (error) {
            setPostLoading(false)
            setError(error?.response?.data?.payload[0])
            console.error("Error while posting data:", error);
        }
    };

    // Poll Function to post data to the server
    const postWithPoll = async () => {
        setPostLoading(true)
        try {
            const valuesArray = options.map((option) => option.value);
            const response = await axios.post(route("posts.store"), {
                title: postCaption,
                poll_choices: valuesArray,
                poll_duration_name: pollTime,
                schedule_at: schedualTime,
                type: "poll",
            });
            // console.log("Data posted successfully:", response.data);
            clearAll()
            postResponse(response?.data?.payload, schedualTime);
            setOptions([
                {id: 1, value: ""},
                {id: 2, value: ""},
            ]);

        } catch (error) {
            setPostLoading(false)
            setError(error?.response?.data?.payload[0])
            console.error("Error while posting data:", error);
        }
    };

    // Call API function
    const handlePostData = async () => {
        if (typeImages?.length > 0) {
            postWithImage();
        } else if (typeVideo?.length > 0) {
            postWithVideo();
        } else if (
            // pollQuestion
            // &&
            options[0]?.value !== '') {
            postWithPoll();
        } else {
            setPostLoading(true)
            try {
                const response = await axios.post(route("posts.store"), {
                    title: postCaption,
                    schedule_at: schedualTime,
                    type: "text",
                    media_key: mediaKey
                });
                setPostCaption("");
                clearAll()
                // console.log("Data posted successfully:", response.data);
                if (response?.status == 200) {

                    postResponse(response?.data?.payload, schedualTime);

                }
            } catch (error) {
                setPostLoading(false)
                setError(error?.response?.data?.payload[0])
                console.error("Error while posting data:", error);
            }
        }
    };

    // console.log("  error....:", error);

    const clearAll = () => {
        // console.log('all clear start ')
        setFiles([])
        setMediaKey(null)
        setPostCaption("");
        setImagePost('');
        setVideoPost('');
        setPostLoading(false)
        setBackendVideoPost(null)
        setBackendImagePost(null)
        setShowModal(false);
        setOptions([
            {id: 1, value: ""},
            {id: 2, value: ""},
        ]);
        setError('')
        setSelectedDate("")
        setMainScreen(0)
        // console.log('all clear end ')
    }


    // console.log("img......:", imagePost);


    const {csrf_token} = usePage().props;

    // console.log('csrf token', csrf_token)


    return (
        <div>
            {/* <!-- Modal toggle --> */}
            <div
                onClick={() => {
                    setShowModal(true);
                }}
                className="px-6 pt-6  rounded-[10px] md:p-6 noise-10  inset-border   mt-4 cursor-pointer"
            >
                <div className="flex items-start gap-4">
                    <img
                        className="w-[40px] h-[40px] rounded-full object-cover object-center"
                        src={profile?.dp?.small?.url}
                        alt=""
                    />
                    <div className="relative w-full  ">
                        <input
                            type="text"
                            disabled
                            className="w-full h-11 border-rounded-20 noise-10   border-0 text-base font-normal outline-0"
                            placeholder="What’s on your mind?"
                        />

                        <div
                            className=" mt-4 flex items-center justify-between overflow-x-scroll lg:overflow-x-hidden ">
                            <label
                                // htmlFor="img"
                                className="flex  w-full cursor-pointer"
                            >
                                <div
                                    className="border-rounded-20 w-full py-2 px-6 flex justify-center  gap-2 items-center  hover:bg-[#ffffff1a] hover:border-[1px] hover:border-[#ffffff1a] group ">
                                    <div
                                        className="absolute  hidden group-hover:block  px-3 py-2 text-sm font-medium text-white bg-[#333333] border-rounded-10 shadow-sm  -mt-[6rem]  ">
                                        Image
                                        {/* <div className="w-3 h-3 absolute   left-7  rotate-45 bg-white"></div> */}
                                    </div>
                                    <span>
                                        <svg
                                            width="21"
                                            height="20"
                                            viewBox="0 0 21 20"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <g
                                                opacity="0.6"
                                                clipPath="url(#clip0_1107_73131)"
                                            >
                                                <path
                                                    opacity="0.4"
                                                    d="M3.91602 3.1875H16.416C16.5652 3.1875 16.7083 3.24676 16.8138 3.35225C16.9193 3.45774 16.9785 3.60082 16.9785 3.75V11.153L14.0899 8.26364C14.0899 8.26364 14.0899 8.26363 14.0899 8.26362C14.0261 8.19971 13.9502 8.14901 13.8668 8.11441C13.7833 8.07982 13.6939 8.06201 13.6035 8.06201C13.5132 8.06201 13.4237 8.07982 13.3402 8.11441C13.2568 8.14901 13.181 8.19971 13.1171 8.26362C13.1171 8.26363 13.1171 8.26364 13.1171 8.26364L4.56903 16.8125H3.91602C3.76683 16.8125 3.62376 16.7532 3.51827 16.6477C3.41278 16.5423 3.35352 16.3992 3.35352 16.25V3.75C3.35352 3.60082 3.41278 3.45774 3.51827 3.35225C3.62376 3.24676 3.76683 3.1875 3.91602 3.1875ZM6.93683 8.5913C7.15267 8.73552 7.40643 8.8125 7.66602 8.8125C8.01411 8.8125 8.34795 8.67422 8.59409 8.42808C8.84023 8.18194 8.97852 7.8481 8.97852 7.5C8.97852 7.24041 8.90154 6.98665 8.75732 6.77081C8.6131 6.55497 8.40812 6.38675 8.16829 6.28741C7.92846 6.18807 7.66456 6.16208 7.40996 6.21272C7.15536 6.26336 6.92149 6.38837 6.73794 6.57192C6.55438 6.75548 6.42938 6.98934 6.37873 7.24394C6.32809 7.49854 6.35408 7.76244 6.45342 8.00227C6.55276 8.2421 6.72099 8.44708 6.93683 8.5913Z"
                                                    fill="white"
                                                    stroke="white"
                                                    strokeWidth="0.125"
                                                />
                                                <path
                                                    d="M16.416 3.125H3.91602C3.57084 3.125 3.29102 3.40482 3.29102 3.75V16.25C3.29102 16.5952 3.57084 16.875 3.91602 16.875H16.416C16.7612 16.875 17.041 16.5952 17.041 16.25V3.75C17.041 3.40482 16.7612 3.125 16.416 3.125Z"
                                                    stroke="white"
                                                    strokeWidth="1.2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                                <path
                                                    d="M7.66602 8.75C8.35637 8.75 8.91602 8.19036 8.91602 7.5C8.91602 6.80964 8.35637 6.25 7.66602 6.25C6.97566 6.25 6.41602 6.80964 6.41602 7.5C6.41602 8.19036 6.97566 8.75 7.66602 8.75Z"
                                                    stroke="white"
                                                    strokeWidth="1.2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                                <path
                                                    d="M4.5957 16.8755L13.1621 8.3083C13.2202 8.25019 13.2891 8.20409 13.365 8.17264C13.4408 8.14119 13.5222 8.125 13.6043 8.125C13.6864 8.125 13.7678 8.14119 13.8436 8.17264C13.9195 8.20409 13.9884 8.25019 14.0465 8.3083L17.0418 11.3044"
                                                    stroke="white"
                                                    strokeWidth="1.2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_1107_73131">
                                                    <rect
                                                        width="20"
                                                        height="20"
                                                        fill="white"
                                                        transform="translate(0.166016)"
                                                    />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </span>
                                    <p className="hidden md:block fs-tiny fw-regular mt-1 uppercase">
                                        image
                                    </p>
                                </div>
                                {/* <input
                                    type="file"
                                    accept="image/png, image/jpeg"
                                    id="img"
                                    name="img"
                                    className="hidden"
                                    onChange={
                                        handleImageChange
                                    }
                                /> */}

                            </label>
                            <label
                                // htmlFor="video"
                                className=" flex w-full cursor-pointer  "
                            >
                                <div
                                    className="border-rounded-20 w-full py-2 px-6 flex justify-center   gap-2 items-center border-[1px] border-transparent group  hover:bg-[#ffffff1a] hover:border-[1px] hover:border-[#ffffff1a]">
                                    <div
                                        className="absolute   hidden   group-hover:block  px-3 py-2 text-sm font-medium text-white bg-[#333333] border-rounded-10  shadow-sm  -mt-[6rem]  ">
                                        Video
                                        {/* <div className="w-3 h-3 absolute   left-6  rotate-45 bg-white"></div> */}
                                    </div>
                                    <span>
                                        <svg
                                            width="20"
                                            height="20"
                                            viewBox="0 0 20 20"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <g
                                                opacity="0.6"
                                                clipPath="url(#clip0_1107_73135)"
                                            >
                                                <path
                                                    opacity="0.4"
                                                    d="M17.7023 5.58828C17.6542 5.39557 17.5609 5.21709 17.4301 5.06764C17.2992 4.91819 17.1347 4.80207 16.95 4.72891C14.3344 3.72266 10 3.75 10 3.75C10 3.75 5.66563 3.72266 3.04688 4.73281C2.86221 4.80598 2.69765 4.9221 2.56681 5.07155C2.43597 5.221 2.34264 5.39947 2.29453 5.59219C2.11484 6.29219 1.875 7.66328 1.875 10C1.875 12.3367 2.11484 13.7078 2.29766 14.4117C2.346 14.6034 2.43911 14.7809 2.56935 14.9296C2.69959 15.0783 2.86325 15.194 3.04688 15.2672C5.66563 16.2773 10 16.25 10 16.25C10 16.25 14.3344 16.2773 16.9531 15.2672C17.1373 15.1944 17.3016 15.0789 17.4324 14.9301C17.5632 14.7814 17.6568 14.6037 17.7055 14.4117C17.8883 13.7086 18.1281 12.3367 18.1281 10C18.1281 7.66328 17.8852 6.29219 17.7023 5.58828ZM8.75 12.5V7.5L12.5 10L8.75 12.5Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M12.5 10L8.75 7.5V12.5L12.5 10Z"
                                                    stroke="white"
                                                    strokeWidth="1.2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                                <path
                                                    d="M1.875 10C1.875 12.3367 2.11484 13.707 2.29766 14.4117C2.346 14.6034 2.43911 14.7809 2.56935 14.9296C2.69959 15.0783 2.86325 15.194 3.04688 15.2672C5.66563 16.2773 10 16.25 10 16.25C10 16.25 14.3344 16.2773 16.9531 15.2672C17.1373 15.1944 17.3016 15.0789 17.4324 14.9301C17.5632 14.7814 17.6568 14.6037 17.7055 14.4117C17.8883 13.7086 18.1281 12.3367 18.1281 10C18.1281 7.66328 17.8883 6.29297 17.7055 5.58828C17.6574 5.39557 17.564 5.21709 17.4332 5.06764C17.3024 4.91819 17.1378 4.80207 16.9531 4.72891C14.3344 3.72266 10 3.75 10 3.75C10 3.75 5.66563 3.72266 3.04688 4.73281C2.86221 4.80598 2.69765 4.9221 2.56681 5.07155C2.43597 5.221 2.34264 5.39947 2.29453 5.59219C2.11484 6.29219 1.875 7.66328 1.875 10Z"
                                                    stroke="white"
                                                    strokeWidth="1.2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_1107_73135">
                                                    <rect
                                                        width="20"
                                                        height="20"
                                                        fill="white"
                                                    />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </span>
                                    <p className="hidden md:block fs-tiny fw-regular mt-1 uppercase">
                                        Video
                                    </p>
                                </div>
                                {/* <input
                                    type="file"
                                    accept="video/*"
                                    id="video"
                                    name="video"
                                    className="hidden"
                                    onChange={
                                        handleVideoChange
                                    }
                                /> */}
                            </label>
                            <div onClick={() => {
                                setMainScreen(
                                    1
                                );
                            }}
                                 className=" border-rounded-20 w-full py-2 px-6 flex group justify-center  gap-2 items-center border-[1px] border-transparent hover:bg-[#ffffff1a] hover:border-[1px] hover:border-[#ffffff1a]">
                                <div
                                    className="absolute   hidden   group-hover:block  px-3 py-2 text-sm font-medium text-white bg-[#333333] border-rounded-10  shadow-sm  -mt-[6rem]  ">
                                    Poll
                                    {/* <div className="w-3 h-3 absolute   left-5  rotate-45 bg-white"></div> */}
                                </div>
                                <span>
                                    <svg
                                        width="21"
                                        height="20"
                                        viewBox="0 0 21 20"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <g
                                            opacity="0.6"
                                            clipPath="url(#clip0_1107_73143)"
                                        >
                                            <path
                                                opacity="0.4"
                                                d="M10.2695 1.9375L10.2695 5.5625L5.39453 5.5625L5.39453 1.9375L10.2695 1.9375Z"
                                                fill="white"
                                                stroke="white"
                                                strokeWidth="0.125"
                                            />
                                            <path
                                                opacity="0.4"
                                                d="M7.76953 8.1875L7.76953 11.8125L5.39453 11.8125L5.39453 8.1875L7.76953 8.1875Z"
                                                fill="white"
                                                stroke="white"
                                                strokeWidth="0.125"
                                            />
                                            <path
                                                opacity="0.4"
                                                d="M12.7695 14.4375L12.7695 18.0625L5.39453 18.0625L5.39453 14.4375L12.7695 14.4375Z"
                                                fill="white"
                                                stroke="white"
                                                strokeWidth="0.125"
                                            />
                                            <path
                                                d="M5.05664 1.875L5.05664 5.625"
                                                stroke="white"
                                                strokeWidth="1.2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M5.05664 8.125L5.05664 11.875"
                                                stroke="white"
                                                strokeWidth="1.2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M5.05664 14.375L5.05664 18.125"
                                                stroke="white"
                                                strokeWidth="1.2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M12.207 5.625L12.207 1.875L7.20703 1.875L7.20703 5.625L12.207 5.625Z"
                                                stroke="white"
                                                strokeWidth="1.2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M9.70703 11.875L9.70703 8.125L7.20703 8.125L7.20703 11.875L9.70703 11.875Z"
                                                stroke="white"
                                                strokeWidth="1.2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M14.707 18.125L14.707 14.375L7.20703 14.375L7.20703 18.125L14.707 18.125Z"
                                                stroke="white"
                                                strokeWidth="1.2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_1107_73143">
                                                <rect
                                                    width="20"
                                                    height="20"
                                                    fill="white"
                                                    transform="translate(20.332) rotate(90)"
                                                />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </span>
                                <p className="hidden md:block fs-tiny fw-regular mt-1 uppercase">
                                    Poll
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <!-- Main modal --> */}
            <div
                id="defaultModal"
                tabIndex="-1"
                aria-hidden="true"
                className={` ${showModal
                    ? "block transition-all duration-300 ease-out"
                    : " hidden transition-all duration-300 ease-out"
                } justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[999999] h-[calc(100%)] max-h-full`}
            >
                <div
                    className={`${showModal
                        ? "-translate-y-0 translate-x-0 transition-all duration-300 ease-out"
                        : "-translate-y-[1000rem] transition-all duration-300 ease-out"
                    } relative w-[90%]  lg:w-[60%] max-w-[750px] max-h-full z-50 `}
                >
                    <ToastContainer/>
                    {/* <!-- Modal content --> */}
                    <div className="relative  border-rounded-10 px-3 shadow bg-black mt-2">
                        <Toast/>
                        {/* <!-- Modal header --> */}
                        <div className="flex items-start justify-between py-2 md:p-4 border-b border-[#1a1a1a] ">
                            <p className="fw-medium fs-large p-1">
                                {mainScreen === 0
                                    ? "Create a Post"
                                    : mainScreen == 1
                                        ? "Create a Poll"
                                        : mainScreen === 3 && "Schedule Post"}
                            </p>
                            <button
                                className="p-1 ml-auto     float-right  "
                                onClick={() => {
                                    setPostCaption(null)
                                    clearAll()
                                }}
                            >
                                <img src={cross} className="   h-6 w-6  "/>
                            </button>
                        </div>
                        {/* <!-- Modal body --> */}

                        {/* post main screen  */}
                        {mainScreen === 0 && (
                            <div data-aos="fade-in" data-aos-delay="100" data-aos-easing="ease" data-aos-duration="300">
                                <div data-aos="fade-in" data-aos-delay="100" data-aos-easing="ease"
                                     data-aos-duration="300" className="p-2 md:p-6 space-y-6">
                                    <form>
                                        <div className="mt-6 flex justify-between gap-x-2">
                                            <img
                                                className="w-10 h-10 rounded-full object-cover object-center"
                                                src={profile?.dp?.small?.url}
                                                alt=""
                                            />

                                            <div className="w-[95%] ">
                                                <textarea
                                                    autoFocus
                                                    rows="2"
                                                    value={postCaption}
                                                    onChange={(e) => {
                                                        setPostCaption(e.target.value);
                                                    }}
                                                    className=" border-rounded-10 bg-[#ffffff10] focus:border-[#ffffff] focus:shadow-none focus:ring-transparent focus:border   border-0 w-full px-[24px] py-[16px] text-[15px] outline-0 text-white                 "
                                                    placeholder="What’s on your mind?"
                                                ></textarea>
                                                {error && (
                                                    <p className="fs-tiny fw-regular mt-1   danger-color ">
                                                        {error}
                                                    </p>
                                                )}
                                                {/* post type selection  */}

                                                {imagePost ||
                                                videoPost ||
                                                options[0]?.value !== ''
                                                    // ||
                                                    // pollQuestion
                                                    ? (
                                                        <div className=" relative w-full   min-h-[13rem] pt-5">
                                                            {options[0]?.value == '' && (
                                                                <div
                                                                    onClick={() => {
                                                                        setImagePost(null);
                                                                        setVideoPost(null);
                                                                    }}
                                                                    className="absolute z-50 right-2 top-6"
                                                                >
                                                                    <svg
                                                                        width="20"
                                                                        height="20"
                                                                        viewBox="0 0 20 20"
                                                                        fill="none"
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                    >
                                                                        <g
                                                                            opacity="0.6"
                                                                            clipPath="url(#clip0_1392_81977)"
                                                                        >
                                                                            <path
                                                                                opacity="0.4"
                                                                                d="M10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 5.85786 14.1421 2.5 10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5Z"
                                                                                fill="white"
                                                                            />
                                                                            <path
                                                                                d="M12.5 7.5L7.5 12.5"
                                                                                stroke="white"
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                            />
                                                                            <path
                                                                                d="M7.5 7.5L12.5 12.5"
                                                                                stroke="white"
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                            />
                                                                            <path
                                                                                d="M10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 5.85786 14.1421 2.5 10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5Z"
                                                                                stroke="white"
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                            />
                                                                        </g>
                                                                        <defs>
                                                                            <clipPath id="clip0_1392_81977">
                                                                                <rect
                                                                                    width="20"
                                                                                    height="20"
                                                                                    fill="white"
                                                                                />
                                                                            </clipPath>
                                                                        </defs>
                                                                    </svg>
                                                                </div>
                                                            )}
                                                            {imagePost && (
                                                                <img
                                                                    src={imagePost}
                                                                    onLoad={handleImageLoad}
                                                                    alt=" img post"
                                                                    className="w-full min-h-[12rem] "
                                                                />
                                                            )}

                                                            {videoPost && (
                                                                <PlyrComponent source={videoPost}
                                                                               thumbnail={videoPost}/>
                                                                // <video
                                                                //     controls
                                                                //     className=" "
                                                                // >
                                                                //     <source
                                                                //         src={
                                                                //             videoPost
                                                                //         }
                                                                //         type="video/mp4"
                                                                //     />
                                                                //     Your browser
                                                                //     does not support
                                                                //     the video tag.
                                                                // </video>
                                                            )}

                                                            {options[0]?.value !== '' && (
                                                                <div
                                                                    className="w-full noise-10 inset-border p-4 border-rounded-10">
                                                                    <div className="flex justify-between">
                                                                        <div className="questions">
                                                                            <p className="opacity-50">
                                                                                You
                                                                                can
                                                                                see
                                                                                how
                                                                                people
                                                                                vote.
                                                                            </p>
                                                                            {/* <p className=" fs-x-large">
                                                                                {
                                                                                    pollQuestion
                                                                                }
                                                                            </p> */}
                                                                        </div>
                                                                        {/* heading  */}
                                                                        <div className="buttons flex gap-3">
                                                                            {/* edit button  */}
                                                                            <div
                                                                                onClick={() => {
                                                                                    setMainScreen(
                                                                                        1
                                                                                    );
                                                                                }}
                                                                                className="noise-20 rounded-[6px] inset-border w-[32px] h-[32px] p-[6px]"
                                                                            >
                                                                                <svg
                                                                                    width="20"
                                                                                    height="20"
                                                                                    viewBox="0 0 20 20"
                                                                                    fill="none"
                                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                                >
                                                                                    <g
                                                                                        opacity="0.6"
                                                                                        clipPath="url(#clip0_1392_81975)"
                                                                                    >
                                                                                        <path
                                                                                            opacity="0.4"
                                                                                            d="M15 9.3751L10.625 5.0001L12.9422 2.68291C13.0594 2.56579 13.2183 2.5 13.384 2.5C13.5497 2.5 13.7086 2.56579 13.8258 2.68291L17.3172 6.17198C17.4343 6.28917 17.5001 6.44808 17.5001 6.61377C17.5001 6.77946 17.4343 6.93837 17.3172 7.05557L15 9.3751Z"
                                                                                            fill="white"
                                                                                        />
                                                                                        <path
                                                                                            d="M7.24141 16.8751H3.75C3.58424 16.8751 3.42527 16.8093 3.30806 16.692C3.19085 16.5748 3.125 16.4159 3.125 16.2501V12.7587C3.12508 12.5932 3.19082 12.4344 3.30781 12.3173L12.9422 2.68291C13.0594 2.56579 13.2183 2.5 13.384 2.5C13.5497 2.5 13.7086 2.56579 13.8258 2.68291L17.3172 6.17198C17.4343 6.28917 17.5001 6.44808 17.5001 6.61377C17.5001 6.77946 17.4343 6.93837 17.3172 7.05557L7.68281 16.6923C7.56569 16.8093 7.40695 16.875 7.24141 16.8751Z"
                                                                                            stroke="white"
                                                                                            strokeWidth="1.2"
                                                                                            strokeLinecap="round"
                                                                                            strokeLinejoin="round"
                                                                                        />
                                                                                        <path
                                                                                            d="M10.625 5L15 9.375"
                                                                                            stroke="white"
                                                                                            strokeWidth="1.2"
                                                                                            strokeLinecap="round"
                                                                                            strokeLinejoin="round"
                                                                                        />
                                                                                    </g>
                                                                                    <defs>
                                                                                        <clipPath id="clip0_1392_81975">
                                                                                            <rect
                                                                                                width="20"
                                                                                                height="20"
                                                                                                fill="white"
                                                                                            />
                                                                                        </clipPath>
                                                                                    </defs>
                                                                                </svg>
                                                                            </div>
                                                                            {/* close button  */}
                                                                            <div
                                                                                onClick={() => {
                                                                                    setMainScreen(0);
                                                                                    setOptions(
                                                                                        [{id: 1, value: "",},
                                                                                            {id: 2, value: "",},]
                                                                                    );

                                                                                    // setPollQuestion("");
                                                                                }}
                                                                                className="noise-20 rounded-[6px] inset-border w-[32px] h-[32px] p-[6px]"
                                                                            >
                                                                                <svg
                                                                                    width="20"
                                                                                    height="20"
                                                                                    viewBox="0 0 20 20"
                                                                                    fill="none"
                                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                                >
                                                                                    <g
                                                                                        opacity="0.6"
                                                                                        clipPath="url(#clip0_1392_81977)"
                                                                                    >
                                                                                        <path
                                                                                            opacity="0.4"
                                                                                            d="M10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 5.85786 14.1421 2.5 10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5Z"
                                                                                            fill="white"
                                                                                        />
                                                                                        <path
                                                                                            d="M12.5 7.5L7.5 12.5"
                                                                                            stroke="white"
                                                                                            strokeLinecap="round"
                                                                                            strokeLinejoin="round"
                                                                                        />
                                                                                        <path
                                                                                            d="M7.5 7.5L12.5 12.5"
                                                                                            stroke="white"
                                                                                            strokeLinecap="round"
                                                                                            strokeLinejoin="round"
                                                                                        />
                                                                                        <path
                                                                                            d="M10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 5.85786 14.1421 2.5 10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5Z"
                                                                                            stroke="white"
                                                                                            strokeLinecap="round"
                                                                                            strokeLinejoin="round"
                                                                                        />
                                                                                    </g>
                                                                                    <defs>
                                                                                        <clipPath id="clip0_1392_81977">
                                                                                            <rect
                                                                                                width="20"
                                                                                                height="20"
                                                                                                fill="white"
                                                                                            />
                                                                                        </clipPath>
                                                                                    </defs>
                                                                                </svg>
                                                                            </div>
                                                                        </div>
                                                                        {/* poll options  */}
                                                                    </div>
                                                                    <div
                                                                        className="grid grid-cols-1 md:grid-cols-2  gap-3 mt-3">
                                                                        {options?.map(
                                                                            (choice, index) => (
                                                                                <div key={choice?.id}
                                                                                    // onClick={() => {handleCardClick(  choice?.id ) }  }
                                                                                     onClick={() => handleChoiceSelect(choice?.id)}
                                                                                     className={`${selectedChoices?.find(
                                                                                         (selectedChoice) =>
                                                                                             selectedChoice?.quiz_id === choice?.id)
                                                                                         ? "noise-20  innerBorderLinkSelected innerBorderLinkSelectedbg"
                                                                                         : " noise-10 "
                                                                                     } lg:cursor-pointer     border-rounded-10   flex justify-start  inset-border secondary px-[24px] py-[14.5px] `}
                                                                                >
                                                                                    {selectedChoices.find(
                                                                                        (
                                                                                            selectedChoice
                                                                                        ) =>
                                                                                            selectedChoice?.quiz_id ===
                                                                                            choice?.id
                                                                                    ) ? (
                                                                                        <img
                                                                                            src={
                                                                                                check
                                                                                            }
                                                                                            className="w-[1.125rem]  h-[1.125rem]"
                                                                                            alt="uncheck"
                                                                                        />
                                                                                    ) : (
                                                                                        <img
                                                                                            src={
                                                                                                uncheck
                                                                                            }
                                                                                            className="w-[1.125rem]  h-[1.125rem]"
                                                                                            alt="uncheck"
                                                                                        />
                                                                                    )}

                                                                                    <p className="fw-regular fs-regular text-center pl-[22px]">
                                                                                        {
                                                                                            choice.value
                                                                                        }
                                                                                    </p>
                                                                                </div>
                                                                            )
                                                                        )}
                                                                    </div>
                                                                    <div className="flex mt-3 ">
                                                                        <p className="fs-regular-sm pr-2">
                                                                            0
                                                                            Vote
                                                                        </p>{" "}
                                                                        <div
                                                                            className="bg-white opacity-50 rounded-full h-[3px] w-[3px] mt-2 mx-2  "></div>
                                                                        {" "}
                                                                        <p className="fs-regular-sm opacity-50">
                                                                            {
                                                                                pollTime
                                                                            }
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    ) : (
                                                        <>
                                                            {/* image, video and poll create  */}
                                                            <div className="container mt-4">
                                                                <div className="filepond-container">
                                                                    <FilePond
                                                                        ref={pondRef}
                                                                        allowImageCrop
                                                                        // stylePanelAspectRatio="4:3"
                                                                        imageCropAspectRatio="4:3"
                                                                        imageCropGuides="true"
                                                                        imageCropMode="contain"
                                                                        files={files}
                                                                        onupdatefiles={setFiles}
                                                                        chunkUploads={true}
                                                                        chunkSize={chunkSize}
                                                                        allowFileTypeValidation={true} 
                                                                        acceptedFileTypes={['image/*', 'video/*']}
                                                                        allowMultiple={false}
                                                                        allowReorder={true}
                                                                        instantUpload={false}
                                                                        maxParallelUploads={5}
                                                                        onprocessfile={(error,) => {

                                                                            if (!error) {
                                                                                setLoading(false)
                                                                            }
                                                                        }}
                                                                        onremovefile={(file) => {
                                                                            // console.log('file removed');
                                                                            setLoading(false);
                                                                        }}
                                                                        onaddfile={() => setLoading(true)}
                                                                        server={{
                                                                            url: '/filepond/process',
                                                                            process: {
                                                                                url: '',
                                                                                method: 'POST',
                                                                                headers: {
                                                                                    'X-CSRF-TOKEN': csrf_token,
                                                                                },
                                                                                onload: response => {
                                                                                    setMyResponse(response)
                                                                                    let key = response.response ?? response;
                                                                                    key = JSON.parse(key);
                                                                                    setMediaKey(key);
                                                                                    return key;
                                                                                }
                                                                            },
                                                                            revert: {
                                                                                url: '',
                                                                                method: 'DELETE',
                                                                                headers: {
                                                                                    'X-CSRF-TOKEN': csrf_token,
                                                                                },
                                                                                onload: response => {
                                                                                    setMediaKey(null);
                                                                                }
                                                                            },
                                                                            patch: "?key=",
                                                                            headers: {
                                                                                'X-CSRF-TOKEN': csrf_token,
                                                                            },
                                                                        }}
                                                                        dropOnPage
                                                                        name="file"
                                                                        dropValidation/>
                                                                </div>
                                                            </div>
                                                            <div className="mt-3 flex justify-between">
                                                                {/* <label
                                                                    htmlFor="img"
                                                                    className="flex w-full cursor-pointer "
                                                                >
                                                                    {" "}
                                                                    <span
                                                                        className="border-rounded-20 flex justify-center uppercase hover:inset-border hover:bg-[#ffffff1a] py-[10px]   w-full">
                                                                        <svg
                                                                            className=" "
                                                                            width="21"
                                                                            height="20"
                                                                            viewBox="0 0 21 20"
                                                                            fill="none"
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                        >
                                                                            <g
                                                                                opacity="0.6"
                                                                                clipPath="url(#clip0_1102_66783)"
                                                                            >
                                                                                <path
                                                                                    opacity="0.4"
                                                                                    d="M4.625 3.1875H17.125C17.2742 3.1875 17.4173 3.24676 17.5227 3.35225C17.6282 3.45774 17.6875 3.60082 17.6875 3.75V11.153L14.7989 8.26364C14.7989 8.26364 14.7989 8.26363 14.7989 8.26362C14.735 8.19971 14.6592 8.14901 14.5758 8.11441C14.4923 8.07982 14.4028 8.06201 14.3125 8.06201C14.2222 8.06201 14.1327 8.07982 14.0492 8.11441C13.9658 8.14901 13.89 8.19971 13.8261 8.26362C13.8261 8.26363 13.8261 8.26363 13.8261 8.26364L5.27802 16.8125H4.625C4.47582 16.8125 4.33274 16.7532 4.22725 16.6477C4.12176 16.5423 4.0625 16.3992 4.0625 16.25V3.75C4.0625 3.60082 4.12176 3.45774 4.22725 3.35225C4.33274 3.24676 4.47582 3.1875 4.625 3.1875ZM7.64581 8.5913C7.86165 8.73552 8.11541 8.8125 8.375 8.8125C8.7231 8.8125 9.05694 8.67422 9.30308 8.42808C9.54922 8.18194 9.6875 7.8481 9.6875 7.5C9.6875 7.24041 9.61052 6.98665 9.4663 6.77081C9.32208 6.55497 9.1171 6.38675 8.87727 6.28741C8.63744 6.18807 8.37354 6.16208 8.11894 6.21272C7.86434 6.26336 7.63048 6.38837 7.44692 6.57192C7.26337 6.75548 7.13836 6.98934 7.08772 7.24394C7.03708 7.49854 7.06307 7.76244 7.16241 8.00227C7.26175 8.2421 7.42997 8.44708 7.64581 8.5913Z"
                                                                                    fill="white"
                                                                                    stroke="white"
                                                                                    strokeWidth="0.125"
                                                                                />
                                                                                <path
                                                                                    d="M17.125 3.125H4.625C4.27982 3.125 4 3.40482 4 3.75V16.25C4 16.5952 4.27982 16.875 4.625 16.875H17.125C17.4702 16.875 17.75 16.5952 17.75 16.25V3.75C17.75 3.40482 17.4702 3.125 17.125 3.125Z"
                                                                                    stroke="white"
                                                                                    strokeWidth="1.2"
                                                                                    strokeLinecap="round"
                                                                                    strokeLinejoin="round"
                                                                                />
                                                                                <path
                                                                                    d="M8.375 8.75C9.06536 8.75 9.625 8.19036 9.625 7.5C9.625 6.80964 9.06536 6.25 8.375 6.25C7.68464 6.25 7.125 6.80964 7.125 7.5C7.125 8.19036 7.68464 8.75 8.375 8.75Z"
                                                                                    stroke="white"
                                                                                    strokeWidth="1.2"
                                                                                    strokeLinecap="round"
                                                                                    strokeLinejoin="round"
                                                                                />
                                                                                <path
                                                                                    d="M5.30469 16.8755L13.8711 8.3083C13.9291 8.25019 13.9981 8.20409 14.0739 8.17264C14.1498 8.14119 14.2311 8.125 14.3133 8.125C14.3954 8.125 14.4767 8.14119 14.5526 8.17264C14.6285 8.20409 14.6974 8.25019 14.7555 8.3083L17.7508 11.3044"
                                                                                    stroke="white"
                                                                                    strokeWidth="1.2"
                                                                                    strokeLinecap="round"
                                                                                    strokeLinejoin="round"
                                                                                />
                                                                            </g>
                                                                            <defs>
                                                                                <clipPath id="clip0_1102_66783">
                                                                                    <rect
                                                                                        width="20"
                                                                                        height="20"
                                                                                        fill="white"
                                                                                        transform="translate(0.875)"
                                                                                    />
                                                                                </clipPath>
                                                                            </defs>
                                                                        </svg>
                                                                        <span className="px-2 fw-regular fs-tiny">
                                                                            image
                                                                        </span>
                                                                    </span>
                                                                    <input
                                                                        type="file"
                                                                        accept="image/png, image/jpeg"
                                                                        id="img"
                                                                        name="img"
                                                                        className="hidden"
                                                                        onChange={
                                                                            handleImageChange
                                                                        }
                                                                    />
                                                                </label> */}

                                                                {/* <label
                                                                    htmlFor="video"
                                                                    className="flex w-full cursor-pointer"
                                                                >
                                                                    {" "}
                                                                    <span
                                                                        className="border-rounded-20 flex justify-center uppercase hover:inset-border hover:bg-[#ffffff1a] py-[10px]   w-full">
                                                                        <svg
                                                                            width="21"
                                                                            height="20"
                                                                            viewBox="0 0 21 20"
                                                                            fill="none"
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                        >
                                                                            <g
                                                                                opacity="0.6"
                                                                                clipPath="url(#clip0_1102_66787)"
                                                                            >
                                                                                <path
                                                                                    opacity="0.4"
                                                                                    d="M17.8273 5.58835C17.7792 5.39564 17.6859 5.21716 17.5551 5.06771C17.4242 4.91826 17.2597 4.80214 17.075 4.72898C14.4594 3.72273 10.125 3.75007 10.125 3.75007C10.125 3.75007 5.79063 3.72273 3.17188 4.73289C2.98721 4.80605 2.82265 4.92217 2.69181 5.07162C2.56097 5.22107 2.46764 5.39955 2.41953 5.59226C2.23984 6.29226 2 7.66335 2 10.0001C2 12.3368 2.23984 13.7079 2.42266 14.4118C2.471 14.6035 2.56411 14.7809 2.69435 14.9297C2.82459 15.0784 2.98825 15.1941 3.17188 15.2673C5.79063 16.2774 10.125 16.2501 10.125 16.2501C10.125 16.2501 14.4594 16.2774 17.0781 15.2673C17.2623 15.1945 17.4266 15.079 17.5574 14.9302C17.6882 14.7815 17.7818 14.6038 17.8305 14.4118C18.0133 13.7087 18.2531 12.3368 18.2531 10.0001C18.2531 7.66335 18.0102 6.29226 17.8273 5.58835ZM8.875 12.5001V7.50007L12.625 10.0001L8.875 12.5001Z"
                                                                                    fill="white"
                                                                                />
                                                                                <path
                                                                                    d="M12.625 10L8.875 7.5V12.5L12.625 10Z"
                                                                                    stroke="white"
                                                                                    strokeWidth="1.2"
                                                                                    strokeLinecap="round"
                                                                                    strokeLinejoin="round"
                                                                                />
                                                                                <path
                                                                                    d="M2 10.0001C2 12.3368 2.23984 13.7071 2.42266 14.4118C2.471 14.6035 2.56411 14.7809 2.69435 14.9297C2.82459 15.0784 2.98825 15.1941 3.17188 15.2673C5.79063 16.2774 10.125 16.2501 10.125 16.2501C10.125 16.2501 14.4594 16.2774 17.0781 15.2673C17.2623 15.1945 17.4266 15.079 17.5574 14.9302C17.6882 14.7815 17.7818 14.6038 17.8305 14.4118C18.0133 13.7087 18.2531 12.3368 18.2531 10.0001C18.2531 7.66335 18.0133 6.29304 17.8305 5.58835C17.7824 5.39564 17.689 5.21716 17.5582 5.06771C17.4274 4.91826 17.2628 4.80214 17.0781 4.72898C14.4594 3.72273 10.125 3.75007 10.125 3.75007C10.125 3.75007 5.79063 3.72273 3.17188 4.73289C2.98721 4.80605 2.82265 4.92217 2.69181 5.07162C2.56097 5.22107 2.46764 5.39955 2.41953 5.59226C2.23984 6.29226 2 7.66335 2 10.0001Z"
                                                                                    stroke="white"
                                                                                    strokeWidth="1.2"
                                                                                    strokeLinecap="round"
                                                                                    strokeLinejoin="round"
                                                                                />
                                                                            </g>
                                                                            <defs>
                                                                                <clipPath id="clip0_1102_66787">
                                                                                    <rect
                                                                                        width="20"
                                                                                        height="20"
                                                                                        fill="white"
                                                                                        transform="translate(0.125)"
                                                                                    />
                                                                                </clipPath>
                                                                            </defs>
                                                                        </svg>
                                                                        <span className="px-2 fw-regular fs-tiny">
                                                                            Video
                                                                        </span>
                                                                    </span>
                                                                    <input
                                                                        type="file"
                                                                        accept="video/*"
                                                                        id="video"
                                                                        name="video"
                                                                        className="hidden"
                                                                        onChange={
                                                                            handleVideoChange
                                                                        }
                                                                    />
                                                                </label> */}

                                                                {!files?.length > 0 && <button
                                                                    onClick={() => {
                                                                        setMainScreen(
                                                                            1
                                                                        );
                                                                    }}
                                                                    //    style={{boxShadow:"inset 0 0 0 1px white"}}
                                                                    className="border-rounded-10 flex justify-center uppercase  inset-border-hover bg-[#ffffff1a] py-[10px]   w-full"
                                                                >
                                                                    <svg
                                                                        width="21"
                                                                        height="20"
                                                                        viewBox="0 0 21 20"
                                                                        fill="none"
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                    >
                                                                        <g
                                                                            opacity="0.6"
                                                                            clipPath="url(#clip0_1102_66795)"
                                                                        >
                                                                            <path
                                                                                opacity="0.4"
                                                                                d="M5.6875 1.9375L10.5625 1.9375L10.5625 5.5625L5.6875 5.5625L5.6875 1.9375Z"
                                                                                fill="white"
                                                                                stroke="white"
                                                                                strokeWidth="0.125"
                                                                            />
                                                                            <path
                                                                                opacity="0.4"
                                                                                d="M5.6875 8.1875L8.0625 8.1875L8.0625 11.8125L5.6875 11.8125L5.6875 8.1875Z"
                                                                                fill="white"
                                                                                stroke="white"
                                                                                strokeWidth="0.125"
                                                                            />
                                                                            <path
                                                                                opacity="0.4"
                                                                                d="M5.6875 14.4375L13.0625 14.4375L13.0625 18.0625L5.6875 18.0625L5.6875 14.4375Z"
                                                                                fill="white"
                                                                                stroke="white"
                                                                                strokeWidth="0.125"
                                                                            />
                                                                            <path
                                                                                d="M5.34961 1.875L5.34961 5.625"
                                                                                stroke="white"
                                                                                strokeWidth="1.2"
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                            />
                                                                            <path
                                                                                d="M5.34961 8.125L5.34961 11.875"
                                                                                stroke="white"
                                                                                strokeWidth="1.2"
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                            />
                                                                            <path
                                                                                d="M5.34961 14.375L5.34961 18.125"
                                                                                stroke="white"
                                                                                strokeWidth="1.2"
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                            />
                                                                            <path
                                                                                d="M12.5 5.625L12.5 1.875L7.5 1.875L7.5 5.625L12.5 5.625Z"
                                                                                stroke="white"
                                                                                strokeWidth="1.2"
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                            />
                                                                            <path
                                                                                d="M10 11.875L10 8.125L7.5 8.125L7.5 11.875L10 11.875Z"
                                                                                stroke="white"
                                                                                strokeWidth="1.2"
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                            />
                                                                            <path
                                                                                d="M15 18.125L15 14.375L7.5 14.375L7.5 18.125L15 18.125Z"
                                                                                stroke="white"
                                                                                strokeWidth="1.2"
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                            />
                                                                        </g>
                                                                        <defs>
                                                                            <clipPath id="clip0_1102_66795">
                                                                                <rect
                                                                                    width="20"
                                                                                    height="20"
                                                                                    fill="white"
                                                                                    transform="translate(20.625) rotate(90)"
                                                                                />
                                                                            </clipPath>
                                                                        </defs>
                                                                    </svg>
                                                                    <span className="px-2 fw-regular fs-tiny">
                                                                        Poll
                                                                    </span>
                                                                </button>}
                                                            </div>
                                                        </>
                                                    )}
                                            </div>
                                        </div>
                                    </form>

                                    <div className="  flex justify-end   ">
                                        {/* <div
                                            onClick={() => {
                                                setMainScreen(3);
                                            }}
                                        >
                                            <Button
                                                icon={<Timer />}
                                                className={
                                                    "secondary icon my-[8px] noise-10"
                                                }
                                            >
                                                SCHEDULE
                                            </Button>
                                        </div> */}
                                        <div

                                        >
                                            <Button
                                                onClick={() => {
                                                    handlePostData();
                                                }}
                                                disabled={postLoading || loading}
                                                className={
                                                    "primary my-[8px] -mt-2 md:-mt-0 uppercase"
                                                }
                                            >
                                                {postLoading &&
                                                    <div className="text-left">
                                                        <div role="status">
                                                            <svg aria-hidden="true"
                                                                 className="inline w-8 h-8 mr-2 text-gray-100 animate-spin dark:text-gray-600 fill-gray-900"
                                                                 viewBox="0 0 100 101" fill="none"
                                                                 xmlns="http://www.w3.org/2000/svg">
                                                                <path
                                                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                                                    fill="currentColor"/>
                                                                <path
                                                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                                                    fill="currentFill"/>
                                                            </svg>
                                                            <span className="sr-only">Loading...</span>
                                                        </div>
                                                    </div>
                                                }

                                                Post
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Schedual post screen  */}

                        {mainScreen === 3 && (
                            <div data-aos="fade-in" data-aos-delay="100" data-aos-easing="ease" data-aos-duration="300">
                                <div className="p-2 md:p-6 space-y-6">
                                    <form>
                                        <div className="mt-6 ">
                                            <div className=" ">
                                                <div className="grid grid-cols-12 gap-x-4 mt-6 md:mt-[48px]">
                                                    <div className=" col-span-3   ">
                                                        <p className="fs-regular fw-medium  ">
                                                            Date
                                                        </p>
                                                    </div>
                                                    <div className=" col-span-9   ">
                                                        <div className="relative">
                                                            <input
                                                                type="date"
                                                                className="noise-10 inset-border border-[#ffffff1a] w-full px-4 py-2 text-white opacity-50 focus:opacity-100 bg-transparent"
                                                                placeholder="Schedule Post"
                                                                value={
                                                                    selectedDate
                                                                }
                                                                min={
                                                                    new Date()
                                                                        .toISOString()
                                                                        .split(
                                                                            "T"
                                                                        )[0]
                                                                }
                                                                onChange={(e) =>
                                                                    handleDateChange(
                                                                        e
                                                                    )
                                                                }
                                                                required
                                                            />
                                                            <div
                                                                className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                                                <svg
                                                                    width="25"
                                                                    height="24"
                                                                    viewBox="0 0 25 24"
                                                                    fill="none"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                >
                                                                    <g
                                                                        opacity="0.6"
                                                                        clipPath="url(#clip0_2748_18384)"
                                                                    >
                                                                        <path
                                                                            opacity="0.4"
                                                                            d="M4.16992 8.25H20.6699V4.5C20.6699 4.30109 20.5909 4.11032 20.4503 3.96967C20.3096 3.82902 20.1188 3.75 19.9199 3.75H4.91992C4.72101 3.75 4.53024 3.82902 4.38959 3.96967C4.24894 4.11032 4.16992 4.30109 4.16992 4.5V8.25Z"
                                                                            fill="white"
                                                                        />
                                                                        <path
                                                                            d="M19.9199 3.75H4.91992C4.50571 3.75 4.16992 4.08579 4.16992 4.5V19.5C4.16992 19.9142 4.50571 20.25 4.91992 20.25H19.9199C20.3341 20.25 20.6699 19.9142 20.6699 19.5V4.5C20.6699 4.08579 20.3341 3.75 19.9199 3.75Z"
                                                                            stroke="white"
                                                                            strokeWidth="1.2"
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                        />
                                                                        <path
                                                                            d="M16.9199 2.25V5.25"
                                                                            stroke="white"
                                                                            strokeWidth="1.2"
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                        />
                                                                        <path
                                                                            d="M7.91992 2.25V5.25"
                                                                            stroke="white"
                                                                            strokeWidth="1.2"
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                        />
                                                                        <path
                                                                            d="M4.16992 8.25H20.6699"
                                                                            stroke="white"
                                                                            strokeWidth="1.2"
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                        />
                                                                        <path
                                                                            d="M8.66992 12L10.1699 11.25V17.25"
                                                                            stroke="white"
                                                                            strokeWidth="1.2"
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                        />
                                                                        <path
                                                                            d="M13.3705 12.0001C13.4732 11.8234 13.6108 11.6695 13.7751 11.5479C13.9393 11.4263 14.1267 11.3395 14.3257 11.2929C14.5247 11.2463 14.7311 11.2409 14.9322 11.2769C15.1334 11.313 15.325 11.3897 15.4955 11.5025C15.6659 11.6153 15.8115 11.7617 15.9233 11.9328C16.0351 12.1039 16.1107 12.296 16.1456 12.4973C16.1805 12.6987 16.1739 12.9051 16.1262 13.1038C16.0784 13.3025 15.9906 13.4893 15.868 13.6529L13.1699 17.2501H16.1699"
                                                                            stroke="white"
                                                                            strokeWidth="1.2"
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                        />
                                                                    </g>
                                                                    <defs>
                                                                        <clipPath id="clip0_2748_18384">
                                                                            <rect
                                                                                width="24"
                                                                                height="24"
                                                                                fill="white"
                                                                                transform="translate(0.419922)"
                                                                            />
                                                                        </clipPath>
                                                                    </defs>
                                                                </svg>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-12 gap-x-4 mt-4 md:mt-[48px]">
                                                    <div className=" col-span-3   ">
                                                        <p className="fs-regular fw-medium  ">
                                                            Time
                                                        </p>
                                                    </div>
                                                    <div className=" col-span-9   ">
                                                        <div className="relative">
                                                            <select
                                                                id="hoursSelect"
                                                                onChange={(e) =>
                                                                    handleTimeChange(
                                                                        e
                                                                    )
                                                                }
                                                                className="noise-10 inset-border border-[#ffffff1a] w-full px-4 py-2 text-white opacity-50 focus:opacity-100 bg-transparent"
                                                            >
                                                                <option value="">
                                                                    Select hours
                                                                </option>
                                                                <option value="01:00">
                                                                    01:00
                                                                </option>
                                                                <option value="02:00">
                                                                    02:00
                                                                </option>
                                                                <option value="03:00">
                                                                    03:00
                                                                </option>
                                                                <option value="04:00">
                                                                    04:00
                                                                </option>
                                                                <option value="05:00">
                                                                    05:00
                                                                </option>
                                                                <option value="06:00">
                                                                    06:00
                                                                </option>
                                                                <option value="07:00">
                                                                    07:00
                                                                </option>
                                                                <option value="08:00">
                                                                    08:00
                                                                </option>
                                                                <option value="09:00">
                                                                    09:00
                                                                </option>
                                                                <option value="10:00">
                                                                    10:00
                                                                </option>
                                                                <option value="11:00">
                                                                    11:00
                                                                </option>
                                                                <option value="12:00">
                                                                    12:00
                                                                </option>
                                                                <option value="13:00">
                                                                    13:00
                                                                </option>
                                                                <option value="14:00">
                                                                    14:00
                                                                </option>
                                                                <option value="15:00">
                                                                    15:00
                                                                </option>
                                                                <option value="16:00">
                                                                    16:00
                                                                </option>
                                                                <option value="17:00">
                                                                    17:00
                                                                </option>
                                                                <option value="18:00">
                                                                    18:00
                                                                </option>
                                                                <option value="19:00">
                                                                    19:00
                                                                </option>
                                                                <option value="20:00">
                                                                    20:00
                                                                </option>
                                                                <option value="21:00">
                                                                    21:00
                                                                </option>
                                                                <option value="22:00">
                                                                    22:00
                                                                </option>
                                                                <option value="23:00">
                                                                    23:00
                                                                </option>
                                                            </select>
                                                            <div
                                                                className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                                                <svg
                                                                    width="25"
                                                                    height="24"
                                                                    viewBox="0 0 25 24"
                                                                    fill="none"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                >
                                                                    <g
                                                                        opacity="0.6"
                                                                        clipPath="url(#clip0_2748_7850)"
                                                                    >
                                                                        <path
                                                                            opacity="0.4"
                                                                            d="M12.4199 21C16.9763 21 20.6699 17.3063 20.6699 12.75C20.6699 8.19365 16.9763 4.5 12.4199 4.5C7.86357 4.5 4.16992 8.19365 4.16992 12.75C4.16992 17.3063 7.86357 21 12.4199 21Z"
                                                                            fill="white"
                                                                        />
                                                                        <path
                                                                            d="M12.4199 21C16.9763 21 20.6699 17.3063 20.6699 12.75C20.6699 8.19365 16.9763 4.5 12.4199 4.5C7.86357 4.5 4.16992 8.19365 4.16992 12.75C4.16992 17.3063 7.86357 21 12.4199 21Z"
                                                                            stroke="white"
                                                                            strokeWidth="1.2"
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                        />
                                                                        <path
                                                                            d="M12.4199 12.75L16.1699 9"
                                                                            stroke="white"
                                                                            strokeWidth="1.2"
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                        />
                                                                        <path
                                                                            d="M10.1699 1.5H14.6699"
                                                                            stroke="black"
                                                                            strokeWidth="1.2"
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                        />
                                                                    </g>
                                                                    <defs>
                                                                        <clipPath id="clip0_2748_7850">
                                                                            <rect
                                                                                width="24"
                                                                                height="24"
                                                                                fill="white"
                                                                                transform="translate(0.419922)"
                                                                            />
                                                                        </clipPath>
                                                                    </defs>
                                                                </svg>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex py-7">
                                                    <svg
                                                        width="32"
                                                        height="32"
                                                        viewBox="0 0 32 32"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <g
                                                            opacity="0.6"
                                                            clipPath="url(#clip0_1102_66803)"
                                                        >
                                                            <path
                                                                opacity="0.4"
                                                                d="M16 28C22.0751 28 27 23.0751 27 17C27 10.9249 22.0751 6 16 6C9.92487 6 5 10.9249 5 17C5 23.0751 9.92487 28 16 28Z"
                                                                fill="white"
                                                            />
                                                            <path
                                                                d="M16 28C22.0751 28 27 23.0751 27 17C27 10.9249 22.0751 6 16 6C9.92487 6 5 10.9249 5 17C5 23.0751 9.92487 28 16 28Z"
                                                                stroke="white"
                                                                strokeWidth="1.2"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            />
                                                            <path
                                                                d="M16 17L21 12"
                                                                stroke="white"
                                                                strokeWidth="1.2"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            />
                                                            <path
                                                                d="M13 2H19"
                                                                stroke="white"
                                                                strokeWidth="1.2"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            />
                                                        </g>
                                                        <defs>
                                                            <clipPath id="clip0_1102_66803">
                                                                <rect
                                                                    width="32"
                                                                    height="32"
                                                                    fill="white"
                                                                />
                                                            </clipPath>
                                                        </defs>
                                                    </svg>
                                                    <p className="fs-small fw-regular px-3 opacity-50 py-2">
                                                        View All Scheduled Posts
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </form>

                                    <div className="mt-8 flex justify-end  space-x-3">
                                        <div
                                            onClick={() => {
                                                setMainScreen(0);
                                            }}
                                        >
                                            <Button
                                                className={
                                                    "secondary   my-[8px]"
                                                }
                                            >
                                                Back
                                            </Button>
                                        </div>
                                        <div onClick={handleSchedulePost}>
                                            <Button
                                                className={"primary my-[8px] "}
                                            >
                                                Done
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* create a poll screen */}

                        {mainScreen === 1 && (
                            <div data-aos="fade-in" data-aos-delay="100" data-aos-easing="ease" data-aos-duration="300">
                                <div className="p-2 md:p-6 space-y-6">
                                    <form>
                                        <div className="mt-6 ">
                                            {/* <div className="grid grid-cols-12 gap-x-4  md:mt-[48px]">
                                                <div className="col-span-4 md:col-span-3   ">
                                                    <p className="fs-regular fw-medium">
                                                        Your Question
                                                    </p>
                                                </div>
                                                <div className="col-span-8 md:col-span-9   ">
                                                    <input
                                                        type="text"
                                                        className=" w-full input-text"
                                                        placeholder="e.g, How do you commute to work?"
                                                        value={pollQuestion}
                                                        onChange={(e) =>
                                                            setPollQuestion(
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                    {questonError && (
                                                        <p className="fs-tiny fw-regular mt-2  danger-color ">
                                                            Question is required
                                                        </p>
                                                    )}
                                                </div>
                                            </div> */}


                                            <div className="grid grid-cols-12 gap-x-4 mt-4  md:mt-[48px]">
                                                {options.map(
                                                    (option, index) => (
                                                        <React.Fragment
                                                            key={option.id}
                                                        >
                                                            <div className="col-span-4 md:col-span-3 my-4 md:my-5">
                                                                <p className="fs-regular fw-medium">
                                                                    Option{" "}
                                                                    {option.id}
                                                                </p>
                                                            </div>
                                                            <div className="col-span-8 md:col-span-9">
                                                                <div>
                                                                    <div className="relative">
                                                                        <input
                                                                            autoFocus={index === 0}
                                                                            type="text"
                                                                            className="w-full input-text"
                                                                            placeholder="E.g., Public Transportation"
                                                                            value={
                                                                                option.value
                                                                            }
                                                                            onChange={(
                                                                                event
                                                                            ) =>
                                                                                handleOptionChange(
                                                                                    option.id,
                                                                                    event
                                                                                        .target
                                                                                        .value
                                                                                )
                                                                            }
                                                                            required
                                                                        />
                                                                        {option.id ===
                                                                            index +
                                                                            1 &&
                                                                            optionsError &&
                                                                            !option.value && (
                                                                                <p className="fs-tiny fw-regular mt-2 danger-color">
                                                                                    Option{" "}
                                                                                    {
                                                                                        option.id
                                                                                    }{" "}
                                                                                    is
                                                                                    required
                                                                                </p>
                                                                            )}
                                                                        {/*  ***Remove option***  */}
                                                                        <div className="absolute top-3 right-3">
                                                                            {options.length >
                                                                                2 && (
                                                                                    <div
                                                                                        className="remove-option"
                                                                                        onClick={() =>
                                                                                            handleRemoveOption(
                                                                                                option.id
                                                                                            )
                                                                                        }
                                                                                    >
                                                                                        <img
                                                                                            src={
                                                                                                cross
                                                                                            }
                                                                                            className="h-6 w-6"
                                                                                            alt="Remove"
                                                                                        />
                                                                                    </div>
                                                                                )}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </React.Fragment>
                                                    )
                                                )}
                                            </div>
                                            <div className="flex justify-end md:mt-3">
                                                {options.length < 4 && (
                                                    <Button
                                                        className="secondary my-[8px] noise-10"
                                                        onClick={
                                                            handleAddOption
                                                        }
                                                    >
                                                        Add More Option
                                                    </Button>
                                                )}
                                            </div>

                                            <div className="grid grid-cols-12 gap-x-4 mt-4 md:mt-[48px]">
                                                <div className="col-span-4 md:col-span-3   ">
                                                    <p className="fs-regular fw-medium py-3">
                                                        Poll Duration
                                                    </p>
                                                </div>
                                                <div className="col-span-8 md:col-span-9   ">
                                                    <fieldset>
                                                        <div className="relative ">
                                                            <label
                                                                htmlFor={
                                                                    "frm-whatever"
                                                                }
                                                                className="sr-only"
                                                            >
                                                                My field
                                                            </label>
                                                            <select
                                                                name="selectedOption"
                                                                value={pollTime}
                                                                onChange={(e) =>
                                                                    setPollTime(
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                className=" border-rounded-20 noise-10 inset-border opacity-50 appearance-none w-full py-1 px-2 border-[1px]   text-base   font-normal bg-transparent outline-none h-11 px-6"
                                                                id="frm-whatever"
                                                            >
                                                                <option
                                                                    className=""
                                                                    value=""
                                                                >
                                                                    Please
                                                                    choose&hellip;
                                                                </option>
                                                                {postPollDurations?.map(
                                                                    (
                                                                        data,
                                                                        index
                                                                    ) => (
                                                                        <option
                                                                            value={
                                                                                data
                                                                            }
                                                                        >
                                                                            {
                                                                                data
                                                                            }
                                                                        </option>
                                                                    )
                                                                )}
                                                            </select>
                                                            <div
                                                                className="pointer-events-none absolute right-0 top-0 bottom-0 flex items-center px-2 text-base text-[#FFFFFF] font-normal bg-transparent outline-none">
                                                                <svg
                                                                    width="21"
                                                                    height="22"
                                                                    viewBox="0 0 21 22"
                                                                    fill="none"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                >
                                                                    <g clipPath="url(#clip0_216_18759)">
                                                                        <path
                                                                            opacity="0.2"
                                                                            d="M17.0625 8.375L10.5 14.9375L3.9375 8.375H17.0625Z"
                                                                            fill="white"
                                                                        />
                                                                        <path
                                                                            d="M17.0625 8.375L10.5 14.9375L3.9375 8.375H17.0625Z"
                                                                            stroke="white"
                                                                            strokeOpacity="0.6"
                                                                            strokeWidth="1.2"
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                        />
                                                                    </g>
                                                                    <defs>
                                                                        <clipPath id="clip0_216_18759">
                                                                            <rect
                                                                                width="21"
                                                                                height="21"
                                                                                fill="white"
                                                                                transform="translate(0 0.5)"
                                                                            />
                                                                        </clipPath>
                                                                    </defs>
                                                                </svg>
                                                            </div>
                                                        </div>
                                                    </fieldset>
                                                    {pollDurationError && (
                                                        <p className="fs-tiny fw-regular mt-2  danger-color ">
                                                            Poll Duration is
                                                            required
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </form>

                                    <div className="mt-8 flex justify-end  space-x-3">
                                        <div
                                            onClick={() => {
                                                setMainScreen(0);
                                                setOptions([
                                                    {id: 1, value: ""},
                                                    {id: 2, value: ""},
                                                ]);
                                            }}
                                            className=""
                                        >
                                            <Button
                                                className={
                                                    "secondary my-[8px] noise-10 uppercase"
                                                }
                                            >
                                                Back
                                            </Button>
                                        </div>
                                        <div
                                            onClick={() => {
                                                pollValidation();
                                            }}
                                        >
                                            <Button
                                                className={
                                                    "primary my-[8px] uppercase"
                                                }
                                            >
                                                Done
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* <!-- Modal footer --> */}
                    </div>
                </div>
                <div data-aos="fade-up" data-aos-delay="100" data-aos-easing="ease" data-aos-duration="300"
                     className="backdrop-blur-lg bg-black/30 fixed inset-0 z-40 noise-10 "></div>
            </div>
        </div>
    );
};

export default CreatePost;
