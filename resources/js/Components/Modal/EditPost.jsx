import React, { useState, useEffect } from "react";
import cross from "../../../assets/cross.png";
import art2 from "../../../assets/img/art2.jpg";
import Button from "../../Components/Button";
import { Link, useForm } from "@inertiajs/react";

export default function EditPost({ data }) {
    const [showModal, setShowModal] = useState(false);
    // edit post data
    const [editPostData, setEditPostData] = useState({
        title: data?.title,
        id: data?.id,
        media: '',
    });

console.log( 'edit post data**********' , editPostData)
// get img for update post
const [imagePost, setImagePost] = useState();
const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
        setImagePost(reader.result);
    };

    if (file) {
        reader.readAsDataURL(file);
    }
};

console.log( 'img post update****************', imagePost)

    // Edit post Function
    const editPost = async () => {
        try {
            const response = await axios.post(route("posts.store"), {
                id: editPostData?.id,
                title: editPostData?.title,
                media: editPostData?.media,
            });
            console.log("Data posted successfully:", response.data);
        } catch (error) {
            console.error("Error while posting data:", error);
        }
    };

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
    console.log("data in edit post modal....:", data);

    return (
        <>
            <div onClick={() => setShowModal(true)} className="">
                Edit
            </div>

            {showModal ? (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative   my-6 mx-auto  w-[95%] max-w-[740px] ">
                            {/*content*/}
                            <div className="    shadow-lg px-[13px] relative flex flex-col w-full bg-black outline-none focus:outline-none">
                                {/*header*/}
                                <div>
                                    <div className="flex items-start justify-between p-3 border-b border-gray-800 ">
                                        <p className="text-[#fff] py-2 fw-medium fs-x-large">
                                            Edit Post
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
                                    <div className="">
                                        <div className="bg-[#000] md:p-6 overflow-y-auto min-h-[5rem] max-h-[33.5rem]">
                                            <div className="">
                                                <hr
                                                    className="opacity-20 border-none mb-3"
                                                    style={{
                                                        borderTop:
                                                            "1px solid #000000",
                                                    }}
                                                />
                                                <form>
                                                    <div className="mt-2 lg:mt-6 flex justify-between gap-x-2">
                                                        <img
                                                            className="w-10 h-10 rounded-full object-cover object-center"
                                                            src={
                                                                data?.user?.dp
                                                                    ?.medium
                                                                    ?.url
                                                            }
                                                            alt=""
                                                        />

                                                        <div className="w-[95%] ">
                                                            <textarea
                                                                rows="5"
                                                                value={
                                                                    editPostData?.title
                                                                }
                                                                onChange={(
                                                                    e
                                                                ) => {
                                                                    setEditPostData(
                                                                        e.target
                                                                            .value
                                                                    );
                                                                }}
                                                                className="  bg-[#ffffff10] focus:border-[#ffffff] focus:shadow-none focus:ring-transparent focus:border inset-border border-[#ffffff1a] w-full px-[24px] py-[16px] text-[15px] outline-0 text-white                 "
                                                                placeholder="What’s on your mind?"
                                                            ></textarea>
                                                            {/* post type selection  */}
                                                            {editPostData?.media && (
                                                                <>
                                                                    <img
                                                                        src={imagePost }
                                                                        alt="post"
                                                                        className="w-full min-h-[12rem] "
                                                                    />
                                                                </>
                                                            )}
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                        <div className="flex justify-end md:p-6" >


                                        <label
                                            htmlFor="img"
                                            className="flex w-[93%] cursor-pointer noise-10"
                                        >
                                            {" "}
                                            <span className="flex justify-center uppercase hover:inset-border hover:bg-[#ffffff1a] py-[10px]   w-full">
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
                                                <span className=" text-[#fff] px-2 fw-regular fs-tiny">
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
                                        </label>
                                        </div>
                                    </div>

                                    <div className="mt-4 lg:mt-8 flex justify-end  space-x-3">
                                        <div
                                            onClick={() => {
                                                editPost();
                                            }}
                                        >
                                            <Button
                                                className={
                                                    "primary my-[8px] uppercase"
                                                }
                                            >
                                                Update
                                            </Button>
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
