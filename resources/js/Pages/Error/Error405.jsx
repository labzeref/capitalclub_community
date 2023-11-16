import ErrorLayout from "@/Layouts/ErrorLayout";
import React from "react";
const Error405 = () => {
    return (
        <div className=" text-center  flex flex-col justify-center items-center">
            <div className="flex space-x-[24px] ">
                <p className="error-code ">
                    405
                </p>
            </div>
            <p className=" fs-30 max-w-[43rem] mx-auto">
            What you are trying to do is not currently allowed by the system. Please try this another way or contact our Support Team for assistance.
            </p>
        </div>
    );
};
Error405.layout = (page) => <ErrorLayout children={page} refresh={false}  goHome={false} goSupport={true} />;
export default Error405;
