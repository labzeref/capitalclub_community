import React, { useEffect, useState, useMemo } from "react";
import headerImage from "../../../assets/img/header.jpg";
import Badge from "@/Components/Badge.jsx";
import { Link } from "@inertiajs/react";
import Button from "../../Components/Button";
import NotesModal from "../Modal/NotesModal";

export default function NotesCard({
    className = "",
    image,
    title,
    detail,
    notes,
    ...props
}) {


    
    return (
        <div className={className}>
            <div className=" Progress-Notes-card " >
                <div className="card-img  notes-card-img rounded-t-[10px]"  >
                <div className="academy-top-inst-img top-instructor-overlay absolute top-0 left-0 w-full"></div>
                <img className="card-img notes-card-img" src={`${image}`} alt="" />
                </div>
                <div className="card-bg  rounded-b-[10px] top-[160px] h-[20px] w-full ">
                    {/* <div className="h-[140px]">
                    <p className="fs-x-large fw-medium">{title}</p>
                    <p className="fs-medium fw-regular">{detail}</p>
                    </div> */}
                    <div>
                        <NotesModal notes={notes} />
                    </div>
                </div>

            </div>
        </div>
    );
}
