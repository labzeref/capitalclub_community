import React, { useState, useEffect } from "react";

import { useForm } from "@inertiajs/react";

const Notes = ({ course, lesson, currentVideoIndex, currentVideoId }) => {
    const [checkboxChecked, setCheckboxChecked] = useState(false);
    const handleCheckboxChange = () => {
        setCheckboxChecked(!checkboxChecked);
    };


    //   const mappedNotes = checkboxChecked
    //   ? allNotes.map(note =>(<></>)  )
    //   : currentLessonNotes.map(note =>  (<></>));

    // console.log('course....:', course)

    // console.log(' current Lesson Id......', currentVideoId)

    // console.log(' props all Notes', course[currentVideoId]?.note)

    // console.log('current Lesson Index....', currentVideoIndex)



    const allNotes = course
        .filter((item) => !item.locked)
        .map((item) => ({
            id: item.id,
            note: item.note,
            title: item?.title,
            locked: item?.locked,
        }));




    const { data, setData, post, processing, errors } = useForm({
        defaultValues: {
            content: "",
        }
    });
    console.log('data :', data)
    const [timer, setTimer] = useState(null);


    const handleKeyUp = (e, id) => { 
         if (timer) {
            clearTimeout(timer);
        }
        setTimer(
            setTimeout(() => {
                post(route("lessons.notes.store", id), {
                    preserveScroll: true
                });
            }, 1000)
        );
    };

    useEffect(() => {
        return () => {
            clearTimeout(timer);
        };
    }, []);



    return (
        <div className="">



            <div className="bg-[#FFFFFF] border-rounded-10 p-6 overflow-y-auto h-[33.5rem]">
                <div className="flex items-center justify-between">
                    <h4 className="text-[#000000]">Notes</h4>
                    <div className="flex items-center gap-2">
                        <div className="flex items-center  ">
                            <input
                                id="default-checkbox"
                                type="checkbox"
                                value=""
                                checked={checkboxChecked}
                                onChange={(e) => { handleCheckboxChange() }}
                                className="w-5 h-5 text-black bg-black   border-[1.2px] border-gray-100  focus:shadow-transparent focus:ring-transparent"
                            />
                        </div>
                        <p className="fs-tiny fw-regular text-[#000000]">
                            Show all notes
                        </p>
                    </div>
                </div>
                {/* {checkboxChecked ?
     <> */}
                {allNotes?.map((data, index) => (
                    <div
                        key={index + 1}
                        className={`mt-5 ${!checkboxChecked && data?.id === lesson?.id ? 'block' : checkboxChecked ? 'block' : 'hidden'}`}
                    >
                        <p className="fs-tiny fw-regular text-[#000000] opacity-50 mb-2">
                            Lesson {index + 1}
                        </p>
                        <hr
                            className="opacity-20 border-none mb-3"
                            style={{ borderTop: "1px solid #000000" }}

                        />
                        <p className="text-[#000000] fs-small fw-medium mb-3">
                            {index + 1} . {data?.title}
                        </p>
                        <textarea
                            defaultValue={data?.note}
                            onKeyUp={(e) => handleKeyUp(e, data?.id)}
                            onChange={(e) => setData("content", e.target.value)}
                            className="w-full text-[#000000] focus:outline-none focus:ring-0 focus:border-transparent border-transparent"
                            placeholder="start writing.."
                            id=""
                            rows={checkboxChecked ? 5 : 14}
                        ></textarea>

                    </div>
                ))}
                {/* </>
     : <div className="mt-5">
            <p className="fs-tiny fw-regular text-[#000000] opacity-50 mb-2">
                Lesson {currentVideoIndex+1}
            </p>
            <hr
                className="opacity-20 border-none mb-3"
                style={{ borderTop: "1px solid #000000" }}

            />
            <p className="text-[#000000] fs-small fw-medium mb-3">
            {currentVideoIndex+1} . {course[currentVideoIndex]?.title}
            </p>
            <textarea
            defaultValue={course[currentVideoIndex]?.note}
               onKeyUp={handleKeyUp}
               onChange={(e)=> {setData("content", e.target.value)}}
                className="w-full  text-[#000000] focus:outline-none focus:ring-0 focus:border-transparent border-transparent "
                placeholder="start writing.."
                id=""
                rows="5"
            ></textarea>
        </div> }    */}
                {/* <div className="mt-6">
            <p className="fs-tiny fw-regular text-[#000000] opacity-50 mb-2">
                Lesson 2
            </p>
            <hr
                className="opacity-20 border-none mb-3"
                style={{ borderTop: "1px solid #000000" }}

            />
            <p className="text-[#000000] fs-small fw-medium mb-3">
                2. Sources of Inspiration
            </p>
            <textarea
                className="w-full  text-[#000000] focus:outline-none focus:ring-0 focus:border-transparent border-transparent "
                placeholder="Type your message here..."
                id=""
                rows="4"
            ></textarea>
        </div> */}


            </div>





        </div>
    );
};

export default Notes;
