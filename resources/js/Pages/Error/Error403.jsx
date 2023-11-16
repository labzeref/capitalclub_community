import ErrorLayout from "@/Layouts/ErrorLayout";
import React from "react";
const Error403 = () => {
    return (
        <div className=" text-center  flex flex-col justify-center items-center">
            <div className="flex space-x-[24px] ">

                <p className="error-code">
                    403
                </p>
            </div>
            <p className="fs-30">
            It seems you don’t have access to this link. <br />
If you believe you should have access, <br />
contact our support team. <br />
Otherwise simply go back to the homepage.
            </p>
        </div>
    );
};
Error403.layout = (page) => <ErrorLayout children={page} refresh={false}  goHome={false} goSupport={true} />;
export default Error403;
