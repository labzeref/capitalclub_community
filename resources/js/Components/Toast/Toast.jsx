import React, {useEffect} from 'react'
import {toast, ToastContainer} from 'react-toastify';
import {usePage} from "@inertiajs/react";

const Toast = () => {
    const {toastMessage} = usePage().props;

    useEffect(() => {
        if (toastMessage) {

            toast[toastMessage?.type](
                <div>
                    <p className="fw-regular choice-text">
                        <div
                            dangerouslySetInnerHTML={{ __html: toastMessage?.message  }}
                        />
                    </p>

                </div>,
                {
                    position: "bottom-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                }
            );

        }
    }, [toastMessage]);

    return (
        <div>
            <ToastContainer/>
        </div>
    )
}

export default Toast
