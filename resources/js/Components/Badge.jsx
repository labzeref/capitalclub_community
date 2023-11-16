import React, { useEffect, useState, useMemo } from "react";

export default function Badge({ className = '', children, ...props }) {
 
    return (
        <div className={'badge uppercase absolute top-2 left-2 '+ className}>
            {children}
        </div>
    );
}
