import React from 'react'

const TopRankMembers = ({topRankMembers}) => {
  return (
    <div className="col-span-12  card-background   inset-border p-4 border-rounded-10  border-[#ffffff1a] sticky top-0">
    <div className="flex items-center justify-between">
        <p className="fw-medium fs-regular">
            Top Rank
        </p>
        <p className="fw-regular fs-tiny opacity-50">
            {topRankMembers?.length} Members
        </p>
    </div>


    <div className="flex lg:block overflow-x-auto lg:overflow-clip">

      
    {topRankMembers?.map((data , index)=>(    
<div key={index+2} className="lg:flex flex-none w-[180px]    md:mx-0 items-center gap-2 mt-5">
        <img
            className="w-10 h-10 rounded-full object-cover object-center"
            src={data?.dp?.small?.url}
            alt=""
        />
        <div>
            <p className="fs-small fw-medium py-[0.5rem]">
               {data?.full_name}
            </p>
            <div className="flex  items-center gap-2 md:gap-3  ">
{data?.badges?.length > 0 && <>

              {data?.badges?.map((badge , idx)=>(  
                  <div key={idx+4} className="flex items-center gap-1">
                    <img
                        className="h-6 w-6"
                        src={`data:image/svg+xml;utf8,${encodeURIComponent(badge?.svg)}`}
                        alt=""
                        />
                    <p className="fw-regular fs-tiny">
                        {badge?.weight}
                    </p>
                </div>
                ))}
                </>}
               

            </div>
        </div>
    </div>
    ))}
     
   
        
    </div>

</div>
  )
}

export default TopRankMembers