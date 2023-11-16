import React, { useEffect, useState, useMemo } from "react";

export default function PrimaryButton({ className = '', disabled, icon = '', children, ...props }) {

    return (
        <div className="" style={{ display: 'flex' }}>
            <button type="submit" {...props} className={'button ' + className} disabled={disabled}>
                <div className="button_container glitch">

                    {/* {icon} */}
                    {children}
                </div>
                <div></div>
            </button>
        </div>
    );
}
