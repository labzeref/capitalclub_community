import { useEffect, useState } from "react";
import axios from "axios";
import { router } from '@inertiajs/react'
import Lottie from "react-lottie-player";
import LOADING from "@/Components/LOADING.json";
const CheckRegistration = ({ orderId }) => {
    const [registrationCheckCount, setRegistrationCheckCount] = useState(0);
    useEffect(() => {
        const checkRegistration = async (tries = 1) => {
            try {
                const res = await axios.post(route('checkout-champ.register.store'), {
                    order_id: orderId,
                    try_count: tries,
                });
                // console.log('res : ', res)
                if (res?.data?.payload?.showError) {
                    router.visit(route('error-404'));
                    return;
                }

                router.visit(route('academy'));

            } catch (error) {
                console.error(`Attempt ${tries} failed. Error:`, error);
                if (tries < 41) {
                    setTimeout(() => {
                        setRegistrationCheckCount(previous => previous + 1)
                        checkRegistration(tries + 1);
                    }, 5000);
                } else {
                    console.error('Max tries reached. Unable to proceed.');
                }
            }
        };
        setTimeout(() => {
            checkRegistration();
        }, 5000)
    }, []);
    return (
        <div className={'w-screen h-screen flex flex-col justify-center items-center px-3 text-center'}>
            <Lottie
                loop
                animationData={LOADING}
                play
                className='h-[20px]  md:h-[50px]'
            />
            <p className="pt-4 pb-2 text-[1.5rem] fw-bold ">Verifying payment !</p>
            <p>We are verifying your payment. Please wait a couple of minutes.</p>
        </div>
    );
}
export default CheckRegistration;
