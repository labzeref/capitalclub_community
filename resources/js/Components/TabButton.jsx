import React, { useEffect, useState, useMemo } from "react";

export default function TabButton({ className = '', activeBottom, disabled, icon = '', children, ...props }) {

    return (
        <div className="" style={{ display: 'flex' }}>
            <button type="submit" {...props} className={'  tabs ' + className} disabled={disabled}>


                {/* {icon} */}
                {children}

                <div  className={`  ${activeBottom} active-tab   `}></div>
            </button>
        </div>
    );
}
