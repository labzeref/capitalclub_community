import ErrorLayout from "@/Layouts/ErrorLayout";
import React from "react";
const Error429 = () => {
    return (
        <div className=" text-center  flex flex-col justify-center items-center">
            <div className="flex space-x-[24px] ">
                <p className="error-code">
                    429
                </p>
            </div>
            <p className=" fs-30 max-w-[43rem] mx-auto">
            You’ve tried the same action too many times. Please wait 20 minutes and try again, or contact our Support Team for assistance.
            </p>
        </div>
    );
};
Error429.layout = (page) => <ErrorLayout children={page} refresh={false}  goHome={false} goSupport={true} />;
export default Error429;
