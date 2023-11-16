import React, { useEffect } from "react";
import ErrorLayout from "@/Layouts/ErrorLayout";

const Error500 = () => {
    return (

        <div className=" text-center  flex flex-col justify-center items-center">
            <div className="flex space-x-[24px] ">
                <p className="error-code">
                    500
                </p>
            </div>
            <p className="fs-30 max-w-[34rem] mx-auto">
                Something is not working as it should.
                We are working on resolving this issue.
                Please reach out to our support
                team for assistance.
            </p>
        </div>
    );
};

Error500.layout = (page) => <ErrorLayout children={page} refresh={false}  goHome={false} goSupport={true} />;
export default Error500;
