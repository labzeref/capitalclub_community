import React, { useState , useEffect } from "react";
import Topic from "../Interests/Topic";
import InterestCommunity from "../Interests/InterestCommunity";
import Upload from "../Interests/Upload";
import InterestLayout from "@/Layouts/InterestLayout";

import user from "../../../assets/img/user.png"
import uploadicon from "../../../assets/img/uploadicon.png";
import Button from "../../Components/Button";
import { ReactComponent as Discord } from "../../../assets/svg/Discord.svg";
import { ReactComponent as Countinuebtn } from "../../../assets/svg/countinuebtn.svg";


const Interests = () => {

  const [steper , setSteper] = useState(0)
  // Topic page state
  const [topicData, setTopicData] = useState([]);

  const [selectedCommunity, setSelectedCommunity] = useState([]);

  const [incre , setIncre] =useState(0)

  const topics =(e)=>{
    console.log('data from topics ....: ' , e)
    setTopicData(e)
  }

  const commun =(e)=>{
    console.log('data from community ....: ' , e)
    setSelectedCommunity(e)
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

  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setSelectedImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
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
              <h3 className="text-center ">Set up your presence</h3>
            </div>
            <div className="containerSmall paddingSection24 mx-auto ">
              <div className="flex justify-center">

                <div className="flex justify-center w-[60%] ">
                  <img  src={selectedImage || user} alt="user" className="h-[6rem] w-[6rem]  rounded-full" />

                  <button className="button icon secondary  px-4  ml-[24px] my-6">
                  <label  for="uploadimg" className="flex uppercase" >



                    <img
                      src={uploadicon}
                      alt="upload img"
                      className="w-[20px] h-[20px] mr-[12px]  "
                    />
                    Upload Image

                  <input onChange={handleImageChange}
                                        type="file"
                                        className="hidden"
                                        id="uploadimg"
                                        accept="image/png, image/jpeg" />
                  </label>
                  </button>
                </div>
              </div>
              <div className="mx-auto paddingSectionSmall w-[60%]">
                <form>
                  <textarea
                    id="comment"
                    rows="8"
                    className="textarea-bg inset-border w-full px-[24px] py-[16px] text-[15px] outline-0 text-white opacity-50 uppercase"
                    placeholder="About"
                    required
                  ></textarea>
                </form>
              </div>
              <div className="  mx-auto w-[60%]">
              <p className="  opacity-50">Connect Discord</p>
            </div>

            <div className="w-[60%] mx-auto  paddingSectionXS">
            <Button
          icon={<Discord />}
          className={"secondary discord icon mt-[10px] w-full discord-blue-shadow"}
      >
      Connect with Discord
      </Button>

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
