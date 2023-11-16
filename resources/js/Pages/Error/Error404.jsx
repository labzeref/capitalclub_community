import ErrorLayout from "@/Layouts/ErrorLayout";
import React from "react";
const Error404 = () => {
    return (
        <div className=" text-center  flex flex-col justify-center items-center">
            <div className="flex space-x-[24px] ">

                <p className="error-code">
                    404
                </p>
            </div>
            <p className="fs-30">
            The link you are trying to load doesn’t exist.<br /> But don’t worry, you can easily go back to <br /> the homepage by pressing the link below.
             
            </p>
        </div>
    );
};
Error404.layout = (page) => <ErrorLayout children={page} refresh={false}  goHome={true} goSupport={false} />;
export default Error404;
