import React from 'react'

const CheckFields = ({name , textClass , bgClass}) => {
    return (
        <div>
            <div className={`${bgClass} lg:cursor-pointer input-shadow border-rounded-10 w-full choice-height-options flex justify-center items-center `}
            >
                <h6 className={`  ${textClass} choice-text-options pt-[2px] text-center   `}>{name} </h6>

            </div>
        </div>
    )
}

export default CheckFields
