import React, {useEffect} from 'react'
import {toast, ToastContainer} from 'react-toastify';
import {usePage} from "@inertiajs/react";

const Toast = () => {
    const {toastMessage} = usePage().props;

    useEffect(() => {
        if (toastMessage) {
            console.log('toasting')
            toast[toastMessage?.type](`${toastMessage?.message}`, {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });

        }
    }, [toastMessage]);

    return (
        <div>
            <ToastContainer/>
        </div>
    )
}

export default Toast
