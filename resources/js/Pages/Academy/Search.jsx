import React, { useEffect, useState } from "react";
import search1 from "../../../assets/img/search1.jpg";
import search2 from "../../../assets/img/search2.jpg";
import search3 from "../../../assets/img/search3.jpg";
import search4 from "../../../assets/img/search4.jpg";
import Magnify from "../../../assets/svg/Magnify.svg";
import cross from "../../../assets/svg/cross.svg";
import Button from "../../Components/Button";
import { ReactComponent as SearchIcon } from "../../../assets/svg/search.svg";
import Layout from "@/Layouts/Layout";
import FilterModal from "@/Components/Modal/FilterModal";
import CourseCard from "@/Components/Course/CourseCard";
import { Head, Link, useForm } from "@inertiajs/react";
import AcademyLargeCard from "@/Components/Course/AcademyLargeCard";
import AcademySmallCard from "@/Components/Course/AcademySmallCard";
import axios from "axios";

const Search = ({ courses, categories }) => {

    // post api name is search.data
    // console.log('courses')
    // console.log(courses)
    // console.log('categories')
    // console.log(categories)
    const [searchData, setSearchData] = useState(courses)
    const [selectedInstructor, setSelectedInstructor] = useState([])
    const [category_ids, setCategory_ids] = useState([])
 


    const [type, setType] = useState('academy');

    const handleSelectChange = (event) => {
        const selectedValue = event.target.value;
        setType(selectedValue);
    };



    const [query, setQuery] = useState('');

    console.log('data :', query)

    // ********GETTING FOLLOWED THREADS ONLY****************
    const handleSearch = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(route("search.data"),
                {
                    type,
                    query ,
                    category_ids: category_ids,
                    instructor_ids: selectedInstructor,
                }
            );
            console.log("got followed threads successfully:", response.data);
            setSearchData(response.data?.payload?.data);
        } catch (error) {
            // ReactToast('error', error?.response?.data?.payload)
            console.error("Error while followed threads:", error);
        }
    }




    // useEffect(() => {
    //     setData('instructor_ids', selectedInstructor)
    // }, [selectedInstructor])

    // useEffect(() => {
    //     setData('category_ids', category_ids)
    // }, [category_ids])


    // console.log('category ids **********', category_ids)
    // console.log('selected Instructor **********', selectedInstructor)
 

    // console.log('search  Query', searchQuery)


    // const search = () => {
    //     // console.log(123)

    //         get(route('search.index'), {
    //             preserveState: true
    //         })


    // }
    // console.log('data***', data)

    const handleInputChange = (e) => {
        const { value } = e.target;
        setData((prevData) => ({ ...prevData, query: value }));
    };

    return (
        <div className=" ">
            <Head title="Search" />
            <div data-aos="fade-in" data-aos-delay="100" data-aos-easing="ease" data-aos-duration="300" className=" ">
                <section className=" mt-[6.8rem] lg:mt-[8.5rem] ">
                    <div className="container mx-auto px-5 lg:px-3 ">
                        <div className="grid grid-cols-12">
                            <div className="col-span-12">
                                <h1 className="uppercase mb-2">Search</h1>
                                <p className="fs-regular  fw-regular opacity-60">
                                    Search in courses, live training, community
                                    and marketplace.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className=" ">
                    <div className="container mx-auto px-5 lg:px-3">
                        <div className="grid grid-cols-12">
                            <div className="col-span-12">
                                <div className="col-span-12">

                                    <form className="w-full md:flex " onKeyDown={(e) => {
                                        if (e.key === "Enter" && !e.shiftKey) {
                                            e.preventDefault();
                                            handleSearch(e)
                                        }
                                    }}>


                                        <div className="relative mt-[1rem] w-full ">
                                            <input
                                                type="text"
                                                className=" search-input  rounded-[20px] left-icon h-12  px-12 inset-border  w-full bg-transparent outline-none border-[1px] border-[#ffffff00] text-[12px]  md:text-center md:text-base text-[#FFFFFF] font-normal"
                                                placeholder="Type to search"
                                                id='query'
                                                value={ query}
                                                onChange={(e)=>{setQuery(e.target.value)}}
                                            />

                                            <svg
                                                className="w-6 h-6 absolute top-0 left-4   my-3"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <g
                                                    opacity="1.0"
                                                    clipPath="url(#clip0_1107_66501)"
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
                                                    <clipPath id="clip0_1107_66501">
                                                        <rect
                                                            width="24"
                                                            height="24"
                                                            fill="white"
                                                        />
                                                    </clipPath>
                                                </defs>
                                            </svg>

                                            <div className="text-white rounded inline-flex items-center absolute top-1 right-5 ">
                                                <select id="mySelect" className="bg-black" onChange={handleSelectChange}>
                                                    <option value="academy">Academy</option>
                                                    <option value="live-training">Live Training</option>
                                                </select>
                                                {/* <svg
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <g clipPath="url(#clip0_720_1670)">
                                                        <path
                                                            opacity="0.2"
                                                            d="M19.5 9L12 16.5L4.5 9H19.5Z"
                                                            fill="white"
                                                        />
                                                        <path
                                                            d="M19.5 9L12 16.5L4.5 9H19.5Z"
                                                            stroke="white"
                                                            strokeWidth="1.2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_720_1670">
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

                                        <div  >
                                            <Button
                                                onClick={(e) => { handleSearch(e) }}
                                                // icon={<SearchIcon />}
                                                className={"primary md:ml-4  mt-[1rem] uppercase"}
                                            >
                                                Search
                                            </Button>
                                        </div>
                                    </form>

                                </div>
                                <div className="col-span-12">
                                    <div className="flex justify-between">
                                        <div className="flex space-x-3 flex-wrap w-[50%] md:w-[80%] mt-[1rem]">
                                            <p className="text-base text-[#FFFFFF] font-normal opacity-60 pt-3">
                                                {searchData?.length} Classes
                                            </p>
                                        </div>

                                        <div className="mt-2 flex ">

                                            <FilterModal categories={categories} setCategory_ids={setCategory_ids} selectedInstructor={selectedInstructor} setSelectedInstructor={setSelectedInstructor} />
                                        </div>{" "}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="pt-[1rem] ">
                    <div className="container mx-auto px-5 lg:px-3">
                        {/* filter search result  */}
                        <div className="grid grid-cols-3 mb-8">
                            <div className="col-span-12">
                                <div className="text-start flex items-center justify-between">
                                    {/* <div></div> */}
                                    {/* <h3 className="font-medium">Food</h3> */}
                                    {/* <p className="text-base text-[#FFFFFF] font-normal opacity-60">
                                        {searchData?.length} Classes
                                    </p> */}
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-12 gap-y-8 gap-x-2 lg:gap-x-6">

                            {searchData?.map((data, index) => (




                                <div key={index + 1} className="col-span-6 lg:col-span-4   ">
                                    <Link
                                        href={route("courses.preview", data?.id)}
                                    >
                                        <AcademySmallCard
                                            className={'academy-small-card feature-card'}
                                            title={data?.title}
                                            instructor={
                                                data?.instructor
                                                    ?.full_name
                                            }
                                            duration={"5 hr 40 min"}
                                            lessons={data?.lessons_count}
                                            original_image={data?.thumbnail?.medium?.url}
                                            medium_image={data?.thumbnail?.small?.url}
                                            badge={"primary"}
                                            badge_text={""}
                                            live={false} />
                                    </Link>
                                </div>






                                // <div key={index + 1} className="col-span-6  lg:col-span-3">
                                //     <img
                                //         className="w-[161px] h-[112px] md:h-[217px]  md:w-[381px] lg:w-[307]   object-cover object-center rounded-[9px] md:mb-7 mb-2"
                                //         src={data?.thumbnail?.medium?.url}
                                //         alt=""
                                //     />
                                //     <div className="flex items-center gap-2 md:gap-6 md:mb-4 mb-2 ">
                                //         <div className="  flex item-center">
                                //             <span className=" mt-[3px] md:mt-0 mr-[5px] md:mr-[10px]">
                                //                 <svg
                                //                     className=" w-[14px] h-[12px]  md:w-6 md:h-6 "
                                //                     viewBox="0 0 24 24"
                                //                     fill="none"
                                //                     xmlns="http://www.w3.org/2000/svg"
                                //                 >
                                //                     <path
                                //                         d="M18 20H6"
                                //                         stroke="white"
                                //                         strokeOpacity="0.6"
                                //                         strokeWidth="1.2"
                                //                         strokeLinecap="round"
                                //                         strokeLinejoin="round"
                                //                     />
                                //                     <path
                                //                         d="M22 4H2V16H22V4Z"
                                //                         fill="white"
                                //                         fillOpacity="0.2"
                                //                         stroke="white"
                                //                         strokeOpacity="0.6"
                                //                         strokeWidth="1.2"
                                //                         strokeLinecap="round"
                                //                         strokeLinejoin="round"
                                //                     />
                                //                 </svg>
                                //             </span>
                                //             <span className="opacity-60 text-[12px] md:text-[16px] font-normal md:captilize">
                                //                 2 hr 10 min
                                //             </span>
                                //         </div>
                                //         <div className="regular text-[#FFFFFF] font-normal flex item-center">
                                //             <span className="mt-[3px] md:mt-0 mr-[5px] md:mr-[10px]">
                                //                 <svg
                                //                     className=" w-[14px] h-[12px]  md:w-6 md:h-6 "
                                //                     viewBox="0 0 24 24"
                                //                     fill="none"
                                //                     xmlns="http://www.w3.org/2000/svg"
                                //                 >
                                //                     <path
                                //                         fillRule="evenodd"
                                //                         clipRule="evenodd"
                                //                         d="M3 21H12H21C21.55 21 22 20.55 22 20V4C22 3.45 21.55 3 21 3H12H3C2.45 3 2 3.45 2 4V20C2 20.55 2.45 21 3 21Z"
                                //                         fill="white"
                                //                         fillOpacity="0.2"
                                //                     />
                                //                     <path
                                //                         d="M4 12H10"
                                //                         stroke="white"
                                //                         strokeOpacity="0.6"
                                //                         strokeWidth="1.2"
                                //                         strokeMiterlimit="10"
                                //                     />
                                //                     <path
                                //                         d="M4 8H10"
                                //                         stroke="white"
                                //                         strokeOpacity="0.6"
                                //                         strokeWidth="1.2"
                                //                         strokeMiterlimit="10"
                                //                     />
                                //                     <path
                                //                         d="M4 16H10"
                                //                         stroke="white"
                                //                         strokeOpacity="0.6"
                                //                         strokeWidth="1.2"
                                //                         strokeMiterlimit="10"
                                //                     />
                                //                     <path
                                //                         d="M14 12H20"
                                //                         stroke="white"
                                //                         strokeOpacity="0.6"
                                //                         strokeWidth="1.2"
                                //                         strokeMiterlimit="10"
                                //                     />
                                //                     <path
                                //                         d="M14 8H20"
                                //                         stroke="white"
                                //                         strokeOpacity="0.6"
                                //                         strokeWidth="1.2"
                                //                         strokeMiterlimit="10"
                                //                     />
                                //                 </svg>
                                //             </span>
                                //             <span className="opacity-60 text-[12px] md:text-[16px] font-normal md:uppercase">
                                //                 {data?.lessons_count} Lessons
                                //             </span>
                                //         </div>
                                //     </div>
                                //     <p className="course-card-title mb-2  ">
                                //         {data?.title}
                                //     </p>
                                //     <p className="course-card-instructor">
                                //         {data?.instructor?.full_name}
                                //     </p>
                                // </div>
                            ))}



                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

Search.layout = (page) => <Layout children={page} title="Search" />;

export default Search;
