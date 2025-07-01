import React, { useEffect, useState, useMemo } from "react";

export default function Badge({ className = '', children, ...props }) {

    return (
        <div className={'badge uppercase gap-x-1 ' + className}>
            <svg className="-mt-0.5 w-2 h-2  md:w-3 md:h-3" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="5.5" cy="5.5" r="5.5" fill="white" />
            </svg>
            {children}
        </div>
    );
}
