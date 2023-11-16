import React , {useEffect, useState} from 'react'  
import check from "../../../assets/img/checked.png"
const InterestCommunity = ({commun}) => {
    const slides = [
        {
          id: 0, 
          name: "Inspiration and entertainment",
        },
        {
          id: 1, 
          name: "To learn some new",
        },
        {
          id: 2, 
          name: "To get better at something I do",
        },
        {
          id: 3, 
          name: "To browse aroung!!",
        },
        {
          id: 4, 
          name: "All of the above",
        },
        
      ];
    


    const [selectedCommunity, setSelectedCommunity] = useState([]);

useEffect(()=>{
  commun(selectedCommunity)
},[selectedCommunity])

const handleCardClick = (id) => {
  if (id === 4) {
    if (selectedCommunity.length === slides.length) {
      setSelectedCommunity([]);
    } else {
      setSelectedCommunity(slides.map(card => card.id));
    }
  } else {
    if (selectedCommunity.includes(id)) {
      setSelectedCommunity(selectedCommunity.filter(cardId => cardId !== id));
      setSelectedCommunity(prevSelected => prevSelected.filter(cardId => cardId !== 4));
    } else {
      setSelectedCommunity([...selectedCommunity, id]);
      if (selectedCommunity.length + 1 === slides.length) {
        setSelectedCommunity([...selectedCommunity, id, 4]);
      }
    }
  }
};

  return (
    <div>
   
<section className="mt-14 lg:mt-28 flex justify-center items-center">
    <div className="container mx-auto px-5 xl:px-0">
        <div className="grid grid-cols-12 flex items-center">
            <div className="col-span-12">
                <div className="text-center">
                    <h3 className="  mb-8 lg:mb-12">Which community brings you to Capital Club today?</h3>
                </div>
                <div className="max-w-sm mx-auto">
                    <p className="text-start fs-regular fw-regular opacity-50 mb-6">Choose as many you like</p>
                   
                    <div className="flex flex-col items-center justify-center">

                       {/*  <!-- Component Start -->*/}
                        <form
                              className="w-full max-w-screen-sm space-y-3 mb-5"
                              action="">
                            <div>
                                 
                               
                            <div className="space-y-[8px] ">
                            {slides.map((card, index) => (
                              <div
                              key={card?.id}
                              onClick={() => handleCardClick(card?.id)}
                                className={`${
                                  selectedCommunity.includes(card.id)
                                    ? "noise-20  innerBorderLinkSelected innerBorderLinkSelectedbg"
                                    :" " 
                                } lg:cursor-pointer noise-10 w-[22.625rem] h-[4.5rem]  inset-border  p-[24px] flex `}
                              >
                              {selectedCommunity.includes(card.id) ?  <img
                                src={check}
                                  className="w-[1.125rem]  h-[1.125rem]"
                                  alt="uncheck"
                                />
                                :   <div className='h-[18px] w-[18px] rounded-full innerBorder'></div>  }
                                
                               
                                
                                <h6 className='regular text-center pl-[22px]'>{card?.name} </h6>
                              
                              </div>
                            ))}
                          </div>
                                    
                            </div>
                             
                             
                            
                        </form>
                      {/*  <!-- Component End  -->*/}
                    
                    </div>
                   
                </div>
            </div>
           
        </div>
    </div>
     {/*  <!-- container End -->*/}
  
</section>
    </div>
  )
}

export default InterestCommunity
