import React, { useState } from "react";
import user from "../../../assets/img/user.png"
import uploadicon from "../../../assets/img/uploadicon.png"; 

import Button from "../../Components/Button"; 
import { ReactComponent as Discord } from "../../../assets/svg/Discord.svg";

const Upload = () => {
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
  );
};

export default Upload;
