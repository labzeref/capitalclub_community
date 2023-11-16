import React, { useState, useEffect } from "react";

import { useForm } from "@inertiajs/react";
import Draggable from 'react-draggable';
import Xmark from "@/Components/Xmark";
import axios from 'axios';

const Notes = ({ setShow, studyMoodOn, course, lesson, currentVideoIndex, currentVideoId, hideCloseButton, openStudyNotes, setOpenStudyNotes }) => {
    const [checkboxChecked, setCheckboxChecked] = useState(false);
    const handleCheckboxChange = () => {
        setCheckboxChecked(!checkboxChecked);
    };


    //   const mappedNotes = checkboxChecked
    //   ? allNotes.map(note =>(<></>)  )
    //   : currentLessonNotes.map(note =>  (<></>));





    const allNotes = course
        .filter((item) => !item.locked)
        .map((item) => ({
            id: item.id,
            note: item.note,
            title: item?.title,
            locked: item?.locked,
        }));




    const [data, setData] = useState("");

    
    const [timer, setTimer] = useState(null);


    const handleKeyUp = (e, id) => {
        const content = e.target.innerHTML;  
        setData(content);
    
        if (timer) {
            clearTimeout(timer);
        }
    
        setTimer(
            setTimeout(() => {
                axios.post(route("lessons.notes.store", id), {
                    content: content
                });
            }, 1000)
        );
    };
    

    useEffect(() => {
        return () => {
            clearTimeout(timer);
        };
    }, []);



    // const [draggingEnabled, setDraggingEnabled] = useState(false);

    // const handleMouseDown = (e) => {
    //   const isHeaderClicked = e.target.classList.contains('notes-header');
    //   if (isHeaderClicked) {
    //     setDraggingEnabled(true);
    //   }
    // };

    // const handleStart = (e, ui) => {
    //   if (!draggingEnabled) {
    //     // Prevent the drag operation if it's not enabled.
    //     e.preventDefault();
    //   }
    // };

    // const handleDrag = (e, ui) => {
    //   // This function is called continuously while dragging.
    //   console.log('Dragging:',e ,  ui.deltaX, ui.deltaY);
    // };

    // const handleStop = () => {
    //   setDraggingEnabled(false);
    // };
 
    return (

        <div className={`${studyMoodOn && 'relative z-[999999] '} notes-vh notes-header `}>



            <div className="card-bg border-rounded-15 overflow-x-hidden h-full input-shadow notes-bg  ">

                <div className={`   ${!hideCloseButton && 'cursor-pointer'} px-6 py-4 bg-1a notes-top-radius-15 notes-header flex items-center justify-between `}>
                    <p className="choice-text-options uppercase">Notes</p>

                    <div onClick={() => { setShow(false), setOpenStudyNotes(false) }} >
                        <div className={` cursor-pointer  notes-cross-button ${!openStudyNotes && 'notes-cross-button-hidden'}`} >
                            <Xmark />

                        </div>
                    </div>
                </div>
                {allNotes?.map((data, index) => (
                    <div
                        key={index + 1}
                        className={`mt-2 h-[90%] play-notes-p  overflow-y-auto ${!checkboxChecked && data?.id === lesson?.id ? 'block' : checkboxChecked ? 'block' : 'hidden'}`}
                    >
                        <div
                            contentEditable
                            onKeyUp={(e) => handleKeyUp(e, data?.id)}
                            dangerouslySetInnerHTML={{ __html: data?.note  }}
                            onChange={(e) => setData(e.target.value)}
                            className="w-full h-[97%] notes-scroll fw-medium card-bg pr-5 fs-tiny pl-0 focus:outline-none focus:ring-0 focus:border-transparent border-transparent notes-placeholder"
                            data-placeholder="Start typing..."
                        />
                        {/* <textarea
                            defaultValue={data?.note}
                            onKeyUp={(e) => handleKeyUp(e, data?.id)}
                            onChange={(e) => setData(e.target.value)}
                            className="w-full h-[97%] notes-scroll fw-medium card-bg pr-5  fs-tiny pl-0 focus:outline-none focus:ring-0 focus:border-transparent border-transparent notes-placeholder"
                            placeholder="Start typing..."
                            id=""
                            rows={checkboxChecked ? 5 : 20}
                        ></textarea> */}

                    </div>
                ))}
            </div>


            <div className={`interests-shadow notes-bottom -mb-1`}></div>


        </div>
    );
};

export default Notes;
