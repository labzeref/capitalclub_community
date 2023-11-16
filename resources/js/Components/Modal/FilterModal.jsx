import React, { useMemo, useState, useEffect } from "react";
import cross from "../../../assets/cross.png";
import enola from "../../../assets/img/enola.png";
import design2 from "../../../assets/img/design2.png";
import emily from "../../../assets/img/emily.png";
import design3 from "../../../assets/img/design3.png";
import plus from "../../../assets/svg/Plus.svg";
import OwlCarousel from "react-owl-carousel";
import Button from "../../Components/Button";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useForm } from "@inertiajs/react";
// import { ReactComponent as Plus } from "../../../assets/svg/Plus.svg";
import { ReactComponent as Continuebtn } from "../../../assets/svg/countinuebtn.svg";
import axios from "axios";
const FilterModal = ({ categories, setCategory_ids, setSelectedInstructor, selectedInstructor }) => {
    useEffect(() => {
        AOS.init();
    }, [])

    const [showModal, setShowModal] = useState(false);
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

    const [selectedCategories, setSelectedCategories] = useState([]);
    // category selected list function
    const handleCheckboxChange = (e, categoryId) => {
        const { checked } = e.target;
        setCategory_ids((prevCategoryIds) => {
            if (checked) {
                // Add category ID if it's checked
                return [...prevCategoryIds, categoryId];
            } else {
                // Remove category ID if it's unchecked
                return prevCategoryIds.filter((id) => id !== categoryId);
            }
        });
    };



    const onSubmit = (formData) => {
        // Handle form submission here
        formData.selectedCategories = selectedCategories;
        console.log(formData);
    };


    //   instructor name search
    const handleInstrucotrName = async (e) => {
        setSearchInstructor(e.target.value);

    };

    useEffect(() => {
    handleInstrucotrName()
    }, [])

    const [searchInstructor, setSearchInstructor] = useState('');
    const [instructors, setInstructors] = useState([]);
    const [timer, setTimer] = useState(null);
    const handleInstructorName = (e) => {
        setSearchInstructor(e.target.value);
    };

    const instApiFun = async () => {

        if (timer) {
            clearTimeout(timer);
        }

        setTimer(
            setTimeout(async () => {
                try {
                    const response = await axios.get(route('search.instructors', { query: searchInstructor }), { query: searchInstructor });
                    setInstructors(response.data?.payload);
                } catch (error) {
                    console.error('Error:', error);
                }

            }, 1000)
        );

    };

    // useEffect(() => {
    //     if (searchInstructor) {
    //         instApiFun();
    //     }
    // }, [searchInstructor]);



    // ***********instructor selection **************

    const handleInstructorClick = (instructorId) => {
        setSelectedInstructor((prevSelectedInstructors) => {
            // Check if the instructor is already selected
            const isSelected = prevSelectedInstructors.includes(instructorId);

            // If already selected, remove from the selection
            if (isSelected) {
                return prevSelectedInstructors.filter((id) => id !== instructorId);
            }
            // If not selected, add to the selection
            else {
                return [...prevSelectedInstructors, instructorId];
            }
        });
    };

    return (
        <div>
            {/* <!-- Modal toggle --> */}
            <div
                onClick={() => {
                    setShowModal(true);
                }}
            >

                <Button
                    className={
                        "secondary uppercase ml-[14px] w-[150px] lg:w-[170px] my-2 md:my-4"
                    } 
                >
                    Add Filter
                </Button>
            </div>

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
                    } relative w-full max-w-[51rem] max-h-full z-50 `}>
                    {/* <!-- Modal content --> */}
                    <div className="relative rounded-md px-3 mx-2 shadow bg-black  my-[4rem]">
                        {/* <!-- Modal header --> */}
                        <div data-aos="fade-in" data-aos-delay="100" data-aos-easing="ease" data-aos-duration="300" className="flex items-start justify-between p-5 border-b border-gray-800 ">
                            <p className="fw-medium fs-x-large">Add Filter</p>

                            <button
                                className="p-1 ml-auto     float-right  "
                                onClick={() => { setShowModal(false); setSearchInstructor(null) }}
                            >
                                <img src={cross} className="   h-6 w-6  " />
                            </button>
                        </div>
                        {/* <!-- Modal body --> */}
                        <div className="p-6  md:space-y-6">
                            <div className="mt-6">
                                <h5>Category</h5>
                                <div className="grid grid-cols-12 gap-y-8 mt-4">
                                    {categories?.map((item, index) => (
                                        <div
                                            className="col-span-6 lg:col-span-3"
                                            key={item.id}
                                        >
                                            <div className="flex items-center gap-2">
                                                <div className="flex items-center">
                                                    <input
                                                        id={`checkbox-${item.id}`}
                                                        type="checkbox"
                                                        value=""

                                                        className={`w-5 h-5 rounded-[2px] text-[#fff] bg-[#fff] ${data?.[item.id]
                                                            ? "border-[2px] border-[#ffffff] ring-[2px] checkbox-bg bg-white ring-[#ffffff] focus:outline-none"
                                                            : "border-[2px] border-[#999999]    ring-transparent focus:outline-transparent"
                                                        }   focus:shadow-none focus:ring-transparent checkbox-bg bg-white`}
 
                                                        onChange={(e) =>
                                                            handleCheckboxChange(
                                                                e,
                                                                item.id
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <p
                                                    className={`fs-small fw-regular ${data?.[item.id]
                                                        ? "text-white"
                                                        : "text-[#ffffff] opacity-50"
                                                        }`}
                                                >
                                                    {item?.name}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* <div className="mt-12">
                                <div className="text-start mb-4">
                                    <h5>Course Length</h5>
                                </div>
                                <div className="flex items-center gap-3 lg:gap-4">
                                    <input
                                        type="text"
                                        className="w-full input-text"
                                        placeholder="Min"
                                        name="min"
                                        onChange={handleInputChange}
                                    />
                                    <input
                                        type="text"
                                        className="w-full input-text"
                                        placeholder="Max"
                                        name="max"
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div> */}

                            <div className="mt-12">
                                <div className="text-start mb-4">
                                    <h5>Search Instructor</h5>
                                </div>
                                <div className="relative">
                                    <span className="absolute left-3  top-3.5">
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <g
                                                opacity="1"
                                                clipPath="url(#clip0_1857_83466)"
                                            >
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
                                                    d="M15.8027 15.8027L20.9993 20.9993"
                                                    stroke="white"
                                                    strokeWidth="1.2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_1857_83466">
                                                    <rect
                                                        width="24"
                                                        height="24"
                                                        fill="white"
                                                    />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </span>
                                    <input
                                        type="text"
                                        className="input-text w-full left-icon"
                                        placeholder="Type to search"
                                        name="instructorName"
                                        onKeyUp={() => instApiFun()}
                                        onChange={handleInstrucotrName}
                                    />
                                </div>
                            </div>
                            {/* instructors slider list   */}
                            <div className="flex   items-center gap-4 mt-6 overflow-x-scroll  w-full">


                                {/* <OwlCarousel
                                    className="owl-theme relative"
                                    margin={10}
                                    autoWidth={true}
                                    animateIn={"fadeIn"}
                                    animateOut={"fadeOut"}
                                    nav={false}
                                    dots={false}
                                >
                                    <div className="instructorImg">
                                        <img
                                            className="max-w-[60px] cursor-pointer group-hover:opacity-100 opacity-50 h-[60px] rounded-full object-cover object-center"
                                            src={enola}
                                            alt=""
                                        />

                                        <div
                                            id="tooltip-bottom"
                                            role="tooltip"
                                            className="absolute -ml-8  z-10 tooltip  px-3 py-2 text-sm font-medium text-black bg-gray-100   shadow-sm  mt-3  "
                                        >
                                            Madeleine Albright
                                            <div className="w-3 h-3 absolute top-0 left-14 -mt-1 rotate-45 bg-white"></div>
                                        </div>
                                    </div>
 
                                    {onlineUser?.map((data, index) => (
                                            <div className="text-center">
                                                <img
                                                    className="h-14 max-w-[56px] object-cover object-center rounded-full border-[1px] border-[#ffffff1a]"
                                                    src={data?.img}
                                                    alt=""
                                                />
                                                <p className="fs-tiny fw-regular opacity-50 mt-3">
                                                    {data?.name}
                                                </p>
                                            </div>
                                        ))}
                                </OwlCarousel> */}


                                {instructors?.map((data, index) => (
                                    <div key={index + 1} className="group">
                                        <img
                                            className={`w-[60px] h-[60px] rounded-full object-cover object-center cursor-pointer ${selectedInstructor.includes(data?.id) ? 'opacity-100' : 'opacity-50'
                                                }`}
                                            src={data?.dp?.small?.url}
                                            alt=""
                                            onClick={() => handleInstructorClick(data?.id)}
                                        />

                                        <div
                                            id="tooltip-bottom"
                                            role="tooltip"
                                            className="absolute -ml-8 z-10 hidden group-hover:block px-3 py-2 text-sm font-medium text-black bg-gray-100 shadow-sm mt-3"
                                        >
                                            {data?.full_name}
                                            <div className="w-3 h-3 absolute top-0 left-14 -mt-1 rotate-45 bg-white"></div>
                                        </div>
                                    </div>
                                ))}

                                {/* <div className="group">
                                    <img
                                        className="max-w-[60px] cursor-pointer group-hover:opacity-100 opacity-50 h-[60px] rounded-full object-cover object-center"
                                        src={design3}
                                        alt=""
                                    />

                                    <div
                                        id="tooltip-bottom"
                                        role="tooltip"
                                        className="absolute -ml-8 z-10 hidden group-hover:block  px-3 py-2 text-sm font-medium text-black bg-gray-100   shadow-sm  mt-3  "
                                    >
                                        Madeleine Albright
                                        <div className="w-3 h-3 absolute top-0 left-14 -mt-1 rotate-45 bg-white"></div>
                                    </div>
                                </div>
                                
 
                               
                                
                                
                               
                             
                           
                                </div> */}
                            </div>

                            <div className="  md:mt-8 flex justify-end -mt-2">

                                <Button
                                    onClick={() => {
                                        setShowModal(false);
                                    }}
                                    // icon={<Continuebtn />}
                                    className={"primary my-[8px] font-bold "}
                                >
                                    Apply
                                </Button>
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

export default FilterModal;
