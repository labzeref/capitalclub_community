import React, { useEffect, useState, useMemo } from "react";

export default function IconButton({ className = '', disabled, icon = '', children, ...props }) {

    return (
        <div className="" style={{ display: 'flex' }}>

<button type="submit" {...props} className={'new-button-icon ' + className} disabled={disabled}>
{icon}
</button>

            {/* <button type="submit" {...props} className={'new-button-icon ' + className} disabled={disabled}>
                <div className="button_container glitch">

                    {icon}
                    {children}
                </div>
            </button> */}
        </div>
    );
}
