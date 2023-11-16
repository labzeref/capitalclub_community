import React, { useEffect } from "react";
import error1 from "../../../assets/svg/error1.svg";
import line419 from "../../../assets/svg/line419.svg";
import ErrorLayout from "@/Layouts/ErrorLayout";
const Error419 = () => {
    return (
        <div className=" ">
            <div className="text-center  flex flex-col justify-center items-center">
                <div className="flex space-x-[24px] ">
                    <p className="error-code">
                        419
                    </p>

                </div>
                <p className="fs-30">
                    This link is valid but its already expired. <br />
                    Here are some options for you to resolve this: <br /> <br />

                    A. Refresh the page if you were idle for too long. <br /> <br />

                    B. Generate a new link to access this page.

                </p>
            </div>
        </div>
    );
};
Error419.layout = (page) => <ErrorLayout children={page} refresh={true}  goHome={true} goSupport={false} />;
export default Error419;
