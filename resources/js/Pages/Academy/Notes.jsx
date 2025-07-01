import React, { useState, useEffect } from "react";
import Xmark from "@/Components/Xmark";
import axios from 'axios';
import { toast } from "react-toastify";
import ReactToast from "@/Components/ReactToast";

const Notes = ({
    setShow,
    studyMoodOn,
    course,
    lesson,
    currentVideoIndex,
    currentVideoId,
    hideCloseButton,
    openStudyNotes,
    setOpenStudyNotes
}) => {
    const [timer, setTimer] = useState(null);
    const [lessonNote, setLessonNote] = useState("");


    const [noteContent, setNoteContent] = useState(lessonNote);


    const [isLoading, setIsLoading] = useState(false);
    const [isContentChanged, setIsContentChanged] = useState(false);
    const [isSaved, setIsSaved] = useState(false);



    const handleInput = (event) => {
        setNoteContent(event.target.innerHTML);
        setIsContentChanged(true);
    };





    const handleSaveNotes = async (e, id) => {
        setIsLoading(true);
        e.preventDefault();
        try {
            const response = await axios.post(route("lessons.notes.store", id), {
                content: noteContent
            });
            setIsLoading(false);
            setIsSaved(true);
            ReactToast('success', `${response?.data?.metadata?.message}`);
            setTimeout(() => {
                setIsSaved(false);
            }, 4000);

            setTimeout(() => {
                setIsContentChanged(false)
            }, 3000);

        } catch (error) {
            console.log('err : ', error);
            ReactToast('error', `${error.message ? error.message : 'Unknown error'}`);
            setIsLoading(false);
        }
    };


    const [isTab, setIsTab] = useState(window.innerWidth < 1024);

    // Function to handle screen size changes
    const handleResize = () => {
        setIsTab(window.innerWidth < 1024);
    };

    useEffect(() => {
        // Event listener for window resize
        window.addEventListener("resize", handleResize);

        // Cleanup function to remove the event listener when component unmounts
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);



    useEffect(() => {
        axios.get(route('lessons.get-note', lesson.id)).then(response => {
            setLessonNote(response.data.payload.content);
            setNoteContent(response.data.payload.content)
        })
    }, []);


    useEffect(() => {
        axios.get(route('lessons.get-note', lesson.id)).then(response => {
            setLessonNote(response.data.payload.content);
            setNoteContent(response.data.payload.content)
        })
    }, [isTab]);



    return (

        <div className={`${studyMoodOn && 'relative z-[999999] '} notes-vh notes-header `}>
            <div className="card-bg border-rounded-15 overflow-hidden h-full input-shadow notes-bg  ">
                <div
                    className={`${!hideCloseButton && 'cursor-pointer'} px-6 py-4 bg-1a notes-top-radius-15 notes-header flex items-center justify-between `}>
                    <p className="choice-text-options uppercase">Notes</p>

                    <div className={`fade-container-note ${isContentChanged ? 'active' : ''}`}>
                        <button
                            disabled={isLoading}
                            onClick={(e) => { handleSaveNotes(e, lesson?.id) }}
                            className={`profile-buttons saveNote button primary max-w-[80px] mx-auto `}
                        >
                            <div className="button_container glitch uppercase save-notes-p">
                                {isLoading && <div id="Notesloading"></div>}

                                {isSaved ? 'SAVED' : 'SAVE'}
                            </div>
                        </button>
                    </div>



                    {/* <div onClick={() => {
                        setShow(false), setOpenStudyNotes(false)
                    }}>

                    </div> */}
                </div>
                <div className={`mt-2 h-[90%] play-notes-p  overflow-y-auto block`} >

                    {/* <textarea
                        placeholder="Start typing..."
                        value={lessonNote}
                        onChange={(e) => handleKeyUp(e, lesson?.id)}
                        className="w-full h-[97%] notes-scroll fw-medium card-bg pr-5 fs-tiny pl-0 focus:outline-none focus:ring-0 focus:border-transparent border-transparent notes-placeholder"

                    ></textarea> */}

                    <div
                        contentEditable
                        onInput={handleInput}
                        dangerouslySetInnerHTML={{ __html: lessonNote }}
                        className="w-full h-[95%] overflow-y-auto notes-scroll fw-medium card-bg pr-5 fs-tiny pl-0 focus:outline-none focus:ring-0 focus:border-transparent border-transparent notes-placeholder"
                        data-placeholder="Start typing..."
                    />
                </div>
            </div>

            <div className={`bg-[#121212] notes-bottom -mb-1`}></div>
        </div >
    );
};

export default Notes;
