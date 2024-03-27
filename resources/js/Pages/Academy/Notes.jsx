import React, {useState, useEffect} from "react";
import Xmark from "@/Components/Xmark";
import axios from 'axios';

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

    const handleKeyUp = (e, id) => {
        const content = e.target.innerHTML;

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
        axios.get(route('lessons.get-note', lesson.id)).then(response => {
            setLessonNote(response.data.payload.content);
        })

        return () => {
            clearTimeout(timer);
        };
    }, []);

    return (

        <div className={`${studyMoodOn && 'relative z-[999999] '} notes-vh notes-header `}>
            <div className="card-bg border-rounded-15 overflow-x-hidden h-full input-shadow notes-bg  ">
                <div
                    className={`${!hideCloseButton && 'cursor-pointer'} px-6 py-4 bg-1a notes-top-radius-15 notes-header flex items-center justify-between `}>
                    <p className="choice-text-options uppercase">Notes</p>

                    <div onClick={() => {
                        setShow(false), setOpenStudyNotes(false)
                    }}>
                        <div
                            className={` cursor-pointer  notes-cross-button ${!openStudyNotes && 'notes-cross-button-hidden'}`}>
                            <Xmark/>
                        </div>
                    </div>
                </div>
                <div
                    className={`mt-2 h-[90%] play-notes-p  overflow-y-auto block`}
                >
                    <div
                        contentEditable
                        onKeyUp={(e) => handleKeyUp(e, lesson?.id)}
                        dangerouslySetInnerHTML={{__html: lessonNote}}
                        className="w-full h-[97%] notes-scroll fw-medium card-bg pr-5 fs-tiny pl-0 focus:outline-none focus:ring-0 focus:border-transparent border-transparent notes-placeholder"
                        data-placeholder="Start typing..."
                    />
                </div>
            </div>

            <div className={`interests-shadow notes-bottom -mb-1`}></div>
        </div>
    );
};

export default Notes;
