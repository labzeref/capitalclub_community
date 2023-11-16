import React, { useState , useEffect } from "react";
import Topic from "../Interests/Topic";
import InterestCommunity from "../Interests/InterestCommunity";
import Upload from "../Interests/Upload";
import InterestLayout from "@/Layouts/InterestLayout";
import Button from "../../Components/Button";
import { ReactComponent as Countinuebtn } from "../../../assets/svg/countinuebtn.svg";



import fork from "../../../assets/img/fork.png";
import brush from "../../../assets/img/brush.png";
import Music from "../../../assets/img/Music.png";
import Football from "../../../assets/img/Football.png";
import Bcase from "../../../assets/img/case.png";
import atom from "../../../assets/img/Atom.png";
import House from "../../../assets/img/House.png";
import life from "../../../assets/img/BezierCurve.png";
import uncheck from "../../../assets/img/uncheck.png";
import check from "../../../assets/img/checked.png";




const Interests = () => {
  const [steper , setSteper] = useState(0)
  // Topic page state
  const [topicData, setTopicData] = useState([]);



  const [incre , setIncre] =useState(0)

  const topics =(e)=>{
    console.log('data from topics ....: ' , e)
    setTopicData(e)
  }




  const handleNext =()=>{
    if(steper==0 && topicData?.length > 0){
      setSteper(steper<=1 && steper+1)
      console.log('one')
    }

    if (steper==1 && selectedCommunity?.length > 0) {
      console.log('')
      setSteper(steper<=1 && steper+1)
    }

  }
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
    <div className="min-h-[90vh] flex flex-col justify-between">

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

      {/* pagination main page */}
      <div className=" px-5">
      <div className="col-span-12  py-[3rem] container mx-auto ">
        <div className="text-center py-[24px]">
          <p className="text-base text-[#FFFFFF] font-normal opacity-50"> {steper+1}/3</p>
        </div>
        <div className="grid grid-cols-12 gap-3 flex items-center mt-6 mb-12 containerLarge">
          <div className="col-span-4">
            <button
            onClick={()=>{setSteper(steper<=2 && !steper==0 && steper-1 )  }}
              className="text-[15px] text-[#FFFFFF] font-normal opacity-50 flex items-center"
            >
              <span className="mr-2">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_227_18640)">
                    <path
                      opacity="0.2"
                      d="M10.5 5.25L3.75 12L10.5 18.75L10.5 5.25Z"
                      fill="white"
                    />
                    <path
                      d="M10.5 5.25L3.75 12L10.5 18.75L10.5 5.25Z"
                      stroke="white"
                      strokeOpacity="0.6"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M20.25 12L10.5 12"
                      stroke="white"
                      strokeOpacity="0.6"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_227_18640">
                      <rect
                        width="24"
                        height="24"
                        fill="white"
                        transform="translate(24) rotate(90)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </span>
              Back
            </button>
          </div>
          <div className="col-span-4 justify-center flex">
<div onClick={()=>{handleNext() ; setIncre(+1)}}>
          <Button
          icon={<Countinuebtn />}
          className={"primary icon mt-[10px] uppercase"}
      >
      Next
      </Button>
      </div>

          </div>
        </div>
        </div>
        </div>

    </div>
  );
};
Interests.layout = (page) => <InterestLayout children={page} title="" />;
export default Interests;
