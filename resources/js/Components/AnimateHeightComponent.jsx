import React, { useRef, useState, useEffect } from 'react';
import AnimateHeight, { Height } from 'react-animate-height';

const AnimateHeightComponent = ({ children, ...props }) => {
    const [height, setHeight] = useState<Height>('auto');
    const contentDiv = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const element = contentDiv.current;

        const resizeObserver = new ResizeObserver(() => {
            setHeight(element.clientHeight);
        });

        resizeObserver.observe(element);

        return () => resizeObserver.disconnect();
    }, []);

    return (
        <AnimateHeight
            {...props}
            height={height}
            contentClassName="auto-content"
            contentRef={contentDiv}
            disableDisplayNone
        >
            {children}
        </AnimateHeight>
    );
};

export default AnimateHeightComponent;
