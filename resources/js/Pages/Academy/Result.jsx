import React from 'react'
import Button from "../../Components/Button";
import { ReactComponent as Countinuebtn } from "../../../assets/svg/countinuebtn.svg";
import SessionLayout from '@/Layouts/SessionLayout';
import { Link } from "@inertiajs/react";

const Result = ({ success, totalQuiz, correctAnswers, backToLessonUrl }) => {
    // console.log('success')
    // console.log(success)
    // console.log('totalQuiz')
    // console.log(totalQuiz)
    // console.log('correctAnswers')
    // console.log(correctAnswers)
    // console.log('backToLessonUrl')
    // console.log(backToLessonUrl)

    return (
        <div data-aos="fade-in" data-aos-delay="100" data-aos-easing="ease" data-aos-duration="300">
            {/* celebration animation  */}
            <div className={` ${!success && 'hidden'}`}>
                <div className="confetti">
                    <div className="confetti-piece"></div>
                    <div className="confetti-piece"></div>
                    <div className="confetti-piece"></div>
                    <div className="confetti-piece"></div>
                    <div className="confetti-piece"></div>
                    <div className="confetti-piece"></div>
                    <div className="confetti-piece"></div>
                    <div className="confetti-piece"></div>
                    <div className="confetti-piece"></div>
                    <div className="confetti-piece"></div>
                    <div className="confetti-piece"></div>
                    <div className="confetti-piece"></div>
                    <div className="confetti-piece"></div>
                </div>
            </div>
            <div className='h-[80vh] flex justify-between flex-col mt-[4rem] '>
                <div className='flex flex-col justify-center items-center h-[60vh]'>
                    <h3> Quiz completed!</h3>
                    <div className='p-[4rem] my-5 border-rounded-10 noise-10 inset-border'><h3> Your score : {correctAnswers} / {totalQuiz}</h3></div>
                </div>

                <div className='flex justify-center'>
                    <Link href={backToLessonUrl}>
                        <Button
                            // icon={<Countinuebtn />}
                            className={"primary icon mt-[10px] uppercase"}
                        >
                            Back to lesson
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
Result.layout = (page) => <SessionLayout children={page} title="" />;
export default Result
