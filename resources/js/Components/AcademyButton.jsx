import React, { useEffect, useState, useMemo } from "react";

export default function AcademyButton({ className = '', disabled, icon = '', children, ...props }) {

    return (
        <div className="" style={{ display: 'flex' }}>
            <button type="submit" {...props} className={'academy-button bg-academy-resource h-30' + className} disabled={disabled}>
                <div className="button_container glitch lesson-btn-notes">

                    {/* {icon} */}
                    {children}
                </div>
                <div></div>
            </button>
        </div>
    );
}
