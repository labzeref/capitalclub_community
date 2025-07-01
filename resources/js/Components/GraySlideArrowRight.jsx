import React from 'react'

const GraySlideArrowRight = () => {
    return (
        <button className='cursor-pointer z-inded-for-arrow  '>
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_4872_60802)">
                    <g filter="url(#filter0_d_4872_60802)">
                        <path d="M23.8307 13C23.8307 7.01996 18.9774 2.16663 12.9974 2.16663C7.0174 2.16663 2.16406 7.01996 2.16406 13C2.16406 18.98 7.0174 23.8333 12.9974 23.8333C18.9774 23.8333 23.8307 18.98 23.8307 13ZM4.33073 13C4.33073 8.21163 8.20906 4.33329 12.9974 4.33329C17.7857 4.33329 21.6641 8.21163 21.6641 13C21.6641 17.7883 17.7857 21.6666 12.9974 21.6666C8.20906 21.6666 4.33073 17.7883 4.33073 13ZM17.3307 13L12.9974 17.3333L11.4699 15.8058L13.1816 14.0833L8.66406 14.0833L8.66406 11.9166L13.1816 11.9166L11.4591 10.1941L12.9974 8.66663L17.3307 13Z" fill="#5E5E5E" />
                    </g>
                </g>
                <defs>
                    <filter id="filter0_d_4872_60802" x="-13.8359" y="-13.8334" width="53.6641" height="53.6666" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                        <feOffset />
                        <feGaussianBlur stdDeviation="8" />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.6 0" />
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_4872_60802" />
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_4872_60802" result="shape" />
                    </filter>
                    <clipPath id="clip0_4872_60802">
                        <rect width="26" height="26" fill="white" />
                    </clipPath>
                </defs>
            </svg>


        </button>
    )
}

export default GraySlideArrowRight
