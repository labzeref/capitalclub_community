import React from 'react'

const LiveBadge = ({LiveClass}) => {
  return (
    <div>
      <div className={` ${LiveClass} live-badge pt-[1px]`}>
        <div className='dot hidden md:block'></div> 
        <p className='text-[10px] md:text-[12px] px-2 tracking-[0.04em] uppercase'>Live Training </p>
      </div>
    </div>
  )
}

export default LiveBadge
 