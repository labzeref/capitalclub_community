import React, { useEffect, useState, useMemo } from "react";

export default function Badge({ className = '', children, ...props }) {

    return (
        <div className={'badge uppercase absolute top-4 left-5 '+className}>
            {children}
        </div>
    );
}
