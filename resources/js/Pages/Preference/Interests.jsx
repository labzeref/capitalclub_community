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

const Interests = ({categories}) => {
    console.log( 'interest......' ,categories)
  const [steper , setSteper] = useState(0)
  // Topic page state
  const [topicData, setTopicData] = useState([]);

  const [selectedCommunity, setSelectedCommunity] = useState([]);

  const [incre , setIncre] =useState(0)





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
      image: fork,
      name: "Food",
    },
    {
      id: 1,
      image: brush,
      name: "Art & Entertainment",
    },
    {
      id: 2,
      image: Music,
      name: "Music",
    },
    {
      id: 3,
      image: Football,
      name: "Sports & Gaming",
    },
    {
      id: 4,
      image: Bcase,
      name: "Business",
    },
    {
      id: 5,
      image: atom,
      name: "Science & Tech",
    },
    {
      id: 6,
      image: House,
      name: "Home & Lifestyle",
    },
    {
      id: 7,
      image: life,
      name: "Design & Style",
    },
  ];



  const [selectedCards, setSelectedCards] = useState([]);




    const handleCardClick = (id) => {

      if (selectedCards.includes(id)) {
        setSelectedCards(selectedCards.filter(card => card !== id));
      } else {
        setSelectedCards([...selectedCards, id]);
      }
    };


  return (
    <div className="min-h-[90vh] flex flex-col justify-between">


      <div className="   ">
      <section className="mt-14 lg:mt-28 flex justify-center items-center">
      <div className="container mx-auto px-5 xl:px-0">
        <div className="grid grid-cols-12 flex items-center">
          <div className="col-span-12">
            <div className="">
              <h3 className="text-center ">
                What topics do you find interesting?
              </h3>
              <p className="fs-regular fw-regular text-center opacity-50 mt-[3rem]">
                Choose as many you like
              </p>
            </div>
            <div className="containerLarge paddingSectionSmall">
              <div className="max-w-[420px] md:max-w-[620px] lg:max-w-[830px] mx-auto">
                <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-[8px]">
                  {slides.map((card, index) => (
                    <div
                    key={card?.id}
                    onClick={() => handleCardClick(card?.id)}
                      className={`${
                        selectedCards.includes(card.id)
                        ? "noise-20  innerBorderLinkSelected innerBorderLinkSelectedbg"
                          :" "
                      } lg:cursor-pointer  noise-10 md:w-[180px] md:w-[200px] h-[129px]  inset-border  p-[11px] flex `}
                    >
                    <div className='absolute'>
                   {selectedCards.includes(card.id) ?<img
                      src={check}
                        className="w-[1.125rem]  h-[1.125rem]"
                        alt="uncheck"
                      /> :  <div className='h-[18px] w-[18px] rounded-full innerBorder'></div> }
                      </div>
                      <div className='w-full'>
                      <div className="w-full flex justify-center ">
                        <img
                          src={card?.image}
                          className={`w-[48px]  ${selectedCards.includes(card.id) ? 'opacity-100' :'opacity-50'}  h-[48px] `}
                          alt="uncheck"
                        />

                      </div>
                      <p className='fs-regular fw-regular text-center pt-[22px]'>{card?.name} </p>
                    </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
