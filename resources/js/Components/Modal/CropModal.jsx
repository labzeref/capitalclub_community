import React, { useState, useEffect } from "react";
import cross from "../../../assets/cross.png";
import AOS from 'aos';
import 'aos/dist/aos.css';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import { useRef } from "react";

export default function CropModal({ setImage, image, closeModal, setCloseModal , setCropedThumbnail }) { 




    const cropperRef = useRef(null);
    const [src, setSrc] = useState(null);
    const [croppedImageFile, setCroppedImageFile] = useState(null);
    const [croppedImageBase64, setCroppedImageBase64] = useState(null);

    // console.log(croppedImageFile)



    const handleCrop = () => {
        if (cropperRef.current) {
            const croppedCanvas = cropperRef.current.cropper.getCroppedCanvas();
            // Convert canvas to Blob
            croppedCanvas.toBlob((blob) => {
                // Create a File from the Blob
                const croppedFile = new File([blob], 'cropped-image.jpg', { type: 'image/jpeg' });

                // Set both the File and base64
                setCroppedImageFile(croppedFile);

                setCropedThumbnail(croppedFile);


                // setData((prevState) => ({
                //     ...prevState,
                //     profile_image: croppedFile,
                // }));



                setCroppedImageBase64(croppedCanvas.toDataURL());

                setImage(croppedCanvas.toDataURL())
            }, 'image/jpeg', 0.8); // MIME type and quality
        }
    };











    useEffect(() => {
        if (closeModal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [closeModal]);

    useEffect(() => {
        AOS.init();
    }, [])

    return (
        <>



            {closeModal ? (
                <>
                    <div
                        data-aos="fade-in" data-aos-delay="100" data-aos-easing="ease" data-aos-duration="300"
                        id="defaultModal"
                        tabIndex="-1"
                        aria-hidden="true"
                        className={` ${closeModal
                            ? " transition-all duration-300 ease-out"
                            : "-translate-y-[1000rem] transition-all duration-300 ease-out"
                            } justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[99999] h-[calc(100%)] max-h-full`}>
                        <div className="relative   my-6 mx-auto  w-[95%] max-w-[620px] ">
                            {/*content*/}
                            <div className=" border-rounded-10   shadow-lg md:px-[13px] relative flex flex-col w-full bg-black z-[99999] outline-none focus:outline-none  my-[4rem]">
                                {/*header*/}
                                <div>
                                    <div className="flex items-start justify-between p-4  ">
                                        <h4 > Crop Profile Image</h4>
                                        <button
                                            className="p-1 ml-auto     float-right  "
                                            onClick={() => setCloseModal(false)}
                                        >
                                            <img
                                                src={cross}
                                                className="   h-6 w-6  "
                                            />
                                        </button>
                                    </div>
                                </div>
                                {/*body*/}
                                <div className="relative p-3 md:p-6 flex-auto">
                                    <div className="flex justify-center py-3">

                                    </div>
                                    <div className="max-w-[420px] md:max-w-[620px] lg:max-w-[830px] mx-auto paddingSectionXSmall">
                                        <div>


                                            <Cropper
                                                ref={cropperRef}
                                                src={image}
                                                style={{ height: 400, width: '100%' }}
                                                aspectRatio={1}
                                                guides={true}
                                            />

                                             
                                        </div>
                                    </div>
                                </div>
                                {/*footer*/}
                                <div className="md:flex items-center justify-center p-3  md:p-6  md:space-x-3 space-y-3 md:space-y-0">


                                    <button onClick={(e)=> {handleCrop() ; setCloseModal(false) }} className="button primary w-full">
                                        <div className="button_container glitch uppercase">

                                            Crop
                                        </div>
                                    </button>


                                </div>
                            </div>
                        </div>

                        <div className="backdrop-blur-lg bg-black/30 fixed inset-0   noise-10  "></div>
                    </div>
                </>
            ) : null}
        </>
    );
}
