import React, { useEffect, useState } from "react"; 
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

const Topic = ({topics}) => {
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

useEffect(()=>{
  topics(selectedCards)
},[selectedCards])

  const handleCardClick = (id) => {
   
    if (selectedCards.includes(id)) {
      setSelectedCards(selectedCards.filter(card => card !== id));
    } else {
      setSelectedCards([...selectedCards, id]);
    }
  };

  
  return (
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
  );
};

export default Topic;
