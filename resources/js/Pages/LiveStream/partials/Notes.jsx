import React, { useState, useEffect } from "react";
import Xmark from "@/Components/Xmark";
import axios from 'axios';
import ReactToast from "@/Components/ReactToast";

const Notes = ({
    liveStream,
}) => {


    const [timer, setTimer] = useState(null);
    const [noteContent, setNoteContent] = useState(liveStream?.note);

    const [isLoading, setIsLoading] = useState(false);
    const [isContentChanged, setIsContentChanged] = useState(false);
    const [isSaved, setIsSaved] = useState(false);

    const handleInput = (e) => {
        setNoteContent(e.target.value)
        setIsContentChanged(true);

    };


    const handleSaveNotes = async (e) => {
        setIsLoading(true)
        e.preventDefault();
        try {
            const response = await axios.post(route("livestream.store-note", liveStream?.id), {
                content: noteContent
            });
            setIsLoading(false)
            setIsSaved(true);
            ReactToast('success', `${response?.data?.metadata?.message}`)
            setTimeout(() => {
                setIsSaved(false);
            }, 4000);

            setTimeout(() => {
                setIsContentChanged(false)
            }, 3000);
        } catch (error) {
            console.log('err : ', error)
            ReactToast('error', `${error.message ? error.message : 'Unknown error'}`)
            setIsLoading(false)
        }
    };

    return (

        <div className={`relative w-full live-notes-sm-h notes-header `} >
            <div
                className={`px-6 py-4 bg-1a rounded-tr-[15px] rounded-tl-[15px]  md:rounded-tr-[0px] notes-header flex items-center justify-between `}>
                <p className="choice-text-options uppercase">Notes</p>




                <div className={`fade-container-note ${isContentChanged ? 'active' : ''}`}>
                    <button
                        disabled={isLoading}
                        onClick={(e) => { handleSaveNotes(e) }}
                        className={`profile-buttons saveNote button primary max-w-[80px] mx-auto `}
                    >
                        <div className="button_container glitch uppercase save-notes-p">
                            {isLoading && <div id="Notesloading"></div>}

                            {isSaved ? 'SAVED' : 'SAVE'}
                        </div>
                    </button>
                </div>

            </div>
            <div className="card-bg  rounded-b-[15px] rounded-bl-[15px] overflow-hidden h-full input-shadow live-notes-head  ">

                <div className={`mt-2 h-full play-notes-p    block`} >
                    <textarea
                        placeholder="Start typing..."
                        value={noteContent}
                        onChange={(e) => handleInput(e)}
                        className="w-full h-[74vh] overflow-y-auto notes-scroll fw-regular card-bg pr-5 text-[14px] pl-0 focus:outline-none focus:ring-0 focus:border-transparent border-transparent notes-placeholder"

                    ></textarea>
                </div>
            </div>


            {/* <div className={`interests-shadow notes-bottom -mb-1`}></div> */}
        </div>
    );
};

export default Notes;
