import React, { useRef, useEffect, useState } from 'react'
import moment from 'moment';
import 'moment-timezone';

const LiveStreamCard = ({ isUpcoming, training }) => {


    // const handleConvertTimeZone = (date) => {
    //     const parsedDateTime = moment.utc(date).tz('America/New_York');
    //     const month = parsedDateTime.format('MMMM');
    //     const day = parsedDateTime.format('D');
    //     let daysuffix = parsedDateTime.format('Do');
    //     daysuffix = daysuffix.replace(day, '')
    //     let time = parsedDateTime.format('h A') + ' UTC';
    //     const formattedDateTime = parsedDateTime.format('MMMM Do | h A') + ' EST';


    //     return {
    //         month,
    //         day,
    //         daysuffix,
    //         time
    //     };
    // }

    const handleConvertTimeZone = (date) => {
        const parsedDateTime = moment(date);
        const datePart = parsedDateTime.format(' MMM D');
        const timePart = parsedDateTime.format('h:mm A');
        return { datePart, timePart };
    };


    function truncateText(text, maxWords) {
        if (!text) return '';
        const words = text.split(' ');
        if (words.length <= maxWords) {
            return text;
        }
        return `${words.slice(0, maxWords).join(' ')} ...`;
    }

    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
    };

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const [isOverflowed, setIsOverflowed] = useState(false);
    const descriptionRef = useRef(null);

    useEffect(() => {
        if (descriptionRef?.current) {
            const element = descriptionRef?.current;
            const maxLines = 3; // Max lines to display
            const lineHeight = parseInt(window.getComputedStyle(element)?.lineHeight);
            const maxHeight = lineHeight * maxLines;

            if (element?.clientHeight < element?.scrollHeight || element?.scrollHeight > maxHeight) {
                setIsOverflowed(true);
            }
        }
    }, [training?.description]);

    function convertNewlinesToBreaks(text) {
        if (!text) return '';
        return text
            .replace(/ /g, ' ')   // Convert spaces to &nbsp;
            .replace(/\n/g, '<br />');
    }

    const descriptionWithBreaks = convertNewlinesToBreaks(training?.description);


    return (
        <div className='rounded-[15px] relative'>
            <div className='relative'>

                <div className={'flex justify-center md:justify-start'}>
                    {/* {isUpcoming && */}
                    <div className='bg-white absolute left-1 md:left-2 top-1 md:top-2  w-fit flex items-center gap-x-0.5 md:gap-x-1.5 text-black border-rounded-8 h-9 px-[12px] md:px-[18px] fw-semibold text-[12px] md:text-[14px] lg:text-[16px]  leading-[22px] py-0'>
                        {handleConvertTimeZone(training?.live_at).datePart}
                        <span><svg width="6" height="4" viewBox="0 0 6 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <ellipse cx="2.89583" cy="2" rx="2.20833" ry="2" fill="black" />
                        </svg>
                        </span>

                        {handleConvertTimeZone(training?.live_at).timePart}
                        <div className={'hidden md:flex  items-center gap-x-0.5 md:gap-x-1.5'}>
                            <span><svg width="6" height="4" viewBox="0 0 6 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <ellipse cx="2.89583" cy="2" rx="2.20833" ry="2" fill="black" />
                            </svg>
                            </span>
                            {training?.timezone}
                        </div>


                    </div>
                    {/* } */}
                </div>

                {/* {isUpcoming && <div className='bg-[#191919] cursor-pointer absolute bottom-3 right-3 w-fit flex items-center gap-x-[5px] text-white border-rounded-8 h-[38px] px-[1rem] fw-bold text-[12px] leading-[13px]'>
                    <span>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_3395_1207)">
                                <path d="M10 8.5H11V9.5H1V8.5H2V5C2 3.93913 2.42143 2.92172 3.17157 2.17157C3.92172 1.42143 4.93913 1 6 1C7.06087 1 8.07828 1.42143 8.82843 2.17157C9.57857 2.92172 10 3.93913 10 5V8.5ZM9 8.5V5C9 4.20435 8.68393 3.44129 8.12132 2.87868C7.55871 2.31607 6.79565 2 6 2C5.20435 2 4.44129 2.31607 3.87868 2.87868C3.31607 3.44129 3 4.20435 3 5V8.5H9ZM4.5 10.5H7.5V11.5H4.5V10.5Z" fill="#F9F9F9" />
                            </g>
                            <defs>
                                <clipPath id="clip0_3395_1207">
                                    <rect width="12" height="12" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>

                    </span>
                    <p className='pt-0.5 uppercase'>
                        Remind Me
                    </p>
                </div>
                } */}



                <img src={training?.thumbnail} className='h-full w-full rounded-[15px] hidden md:block lg:block' />
                <img src={training?.mobileBanner} className='h-full w-full rounded-[15px] block md:hidden lg:hidden' />

            </div>
            <p className='fw-semibold text-[16px] md:text-[20px] leading-[25px] mt-3'>{training?.title}</p>
            {/* <p className='fw-regular text-[14px] leading-[25px] '>{training?.description?.slice(0, 48)}</p> */}
            <div ref={descriptionRef} dangerouslySetInnerHTML={{ __html: isOverflowed ? descriptionWithBreaks + ' ...' : descriptionWithBreaks }} className={`fw-regular break-words text-[14px] leading-[18px] md:leading-[25px] mt-1 description-card-view-live `} />

            {/*<div className='fw-semibold pt-[1px] text-[14px] text-[#B4B4B4] leading-[25px] rounded-[6px] px-[9px] bg-[#1a1a1a] mt-1 w-fit h-[25px]'>{training?.category?.name}</div>*/}

        </div>
    )
}

export default LiveStreamCard
