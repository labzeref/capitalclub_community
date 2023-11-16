import React , {useState , useEffect} from "react";
import plus from "../../../assets/Plus.png";
import cross from "../../../assets/cross.png";

import fork from "../../../assets/fork.png";
import brush from "../../../assets/brush.png";
import Music from "../../../assets/Music.png";
import Football from "../../../assets/Football.png";
import Bcase from "../../../assets/case.png";
import atom from "../../../assets/Atom.png";
import House from "../../../assets/House.png";
import life from "../../../assets/BezierCurve.png";
import uncheck from "../../../assets/uncheck.png";
import check from "../../../assets/checked.png";
import Button from '../../Components/Button'
import {ReactComponent as Plus} from "../../../assets/svg/Plus.svg";
import { useForm } from "@inertiajs/react";

export default function IntrestModal({categories , profile }) {
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showModal]);

  const { data, setData, put, processing, errors } = useForm({
    interests_ids: profile?.interests?.map((interest) => interest.id) || [],
  });

  console.log('data......:', data);

  const handleSubmit = (event) => {
    event.preventDefault();
    put(route('profile.interests.update'));
  };

  const [selectedCards, setSelectedCards] = useState(data?.interests_ids || []);

  const handleCardClick = (id) => {
    if (selectedCards.includes(id)) {
      const updatedInterests = selectedCards.filter((card) => card !== id);
      setSelectedCards(updatedInterests);
      setData('interests_ids', updatedInterests);
    } else {
      const updatedInterests = [...selectedCards, id];
      setSelectedCards(updatedInterests);
      setData('interests_ids', updatedInterests);
    }
  };

  return (
    <>
   
  <Button    onClick={() => setShowModal(true)} icon={<Plus/>} className={'secondary  '}>
  Add
</Button>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-[70%] ">
              {/*content*/}
              <div className="border border-gray-700 shadow-lg px-[23px] relative flex flex-col w-full bg-black outline-none focus:outline-none">
                {/*header*/}
                <div>
                <div className="flex items-start justify-between px-5 pt-5   ">
                  <p className="fw-medium fs-x-large">
                  Add More your Favourites Topics
                  </p>

                  
                  <button
                    className="p-1 ml-auto     float-right  "
                    onClick={() => setShowModal(false)}
                  >
                    <img src={cross} className="   h-6 w-6  "/>
                  </button>
                </div>
                </div>
                {/*body*/}
                <div className="relative px-6  flex-auto">
                <div className="max-w-[420px] md:max-w-[620px] lg:max-w-[830px] mx-auto">
                <p className="fs-regular fw-regular text-center opacity-50 mt-[2rem] mb-[1.5rem]">
                Choose as many you like
              </p>
                <div className="grid grid-cols-12 gap-[8px]">
                {categories.map((card, index) => (
                   <div className="col-span-6 md:col-span-4 lg:col-span-3   ">
          <div
            key={card?.id}
            onClick={() => handleCardClick(card?.id)}
            className={`${
              selectedCards.includes(card.id)
                ? 'intrestuncheck innerBorderLinkSelected innerBorderLinkSelectedbg'
                : ''
            } lg:cursor-pointer intrestuncheck  md:w-[160px] h-[129px] p-[11px] flex`}
          >
            <div className="absolute">
              {selectedCards.includes(card.id) ? (
                <img src={check} className="w-[1.125rem] h-[1.125rem]" alt="uncheck" />
              ) : (
                <div className="h-[18px] w-[18px] rounded-full innerBorder"></div>
              )}
            </div>
            <div className="w-full">
              <div className="w-full flex justify-center">
                <img
                  src={card?.icon?.url}
                  className={`w-[48px] ${selectedCards.includes(card.id) ? 'opacity-100' : 'opacity-50'} h-[48px]`}
                  alt="uncheck"
                />
              </div>
              <p className="fw-regular text-center pt-[22px]">{card?.name}</p>
            </div>
          </div>
          </div>
        ))}
                </div>
              </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end px-6 pb-6 space-x-3 ">
              

                

                  <Button   onClick={() => setShowModal(false)} className={'secondary mt-[50px] uppercase'}>
                  Cancel
              </Button>
<div onClick={handleSubmit}>
                  <Button    className={'primary mt-[50px] uppercase'}>
                  Save
              </Button>
              </div>
                 
                </div>
              </div>
            </div>
          </div>
          <div className="   backdrop-blur-lg  bg-black/30 fixed inset-0 z-40 noise-10"></div>
        </>
      ) : null}
    </>
  );
}