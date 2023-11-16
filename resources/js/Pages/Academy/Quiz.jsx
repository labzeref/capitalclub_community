import React, { useEffect, useState } from "react";
import check from "../../../assets/checked.png";
import uncheck from "../../../assets/uncheck.png";

import Layout from "@/Layouts/Layout";
import Button from "../../Components/Button";
import { ReactComponent as Countinuebtn } from "../../../assets/svg/countinuebtn.svg";
import SessionLayout from "@/Layouts/SessionLayout";
import { Link, useForm } from "@inertiajs/react";
import 'aos/dist/aos.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { motion } from 'framer-motion';

const Quiz = ({ quiz, lesson, lessonNumber }) => {
    // console.log("quiz");
    // console.log(quiz);
    // console.log('lesson');
    // console.log(lesson);
    // console.log('lessonNumber');
    // console.log(lessonNumber);
    useEffect(() => {
        AOS.init();
    }, [])
    const { data, setData, post, processing, errors } = useForm({
        quiz_answers: null,

    });

    const [showPoll, setShowPoll] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedChoices, setSelectedChoices] = useState([]);

    const handleChoiceSelect = (quiz_id, answer_id) => {
        if (quiz[currentQuestion]?.type?.name === "poll") {
            setShowPoll(true);
        }
        setSelectedChoices((prevSelectedChoices) => {
            // Remove the selected choices for the current question
            const updatedSelectedChoices = prevSelectedChoices?.filter(
                (choice) => choice?.quiz_id !== quiz_id
            );

            // Add the newly selected choice
            return [...updatedSelectedChoices, { quiz_id, answer_id }];
        });
    };
    const isQuizCompleted = selectedChoices?.length === quiz?.length;

    // console.log('selected Choices ....:', selectedChoices?.length)
    // console.log('quiz.length....:', quiz?.length)
    // console.log(isQuizCompleted)


    useEffect(() => {
        setData('quiz_answers', selectedChoices);
    }, [selectedChoices])

    const handleNextQuestion = () => {
        // console.log('data for API.....:', data)
        // console.log(
        //     "next question handle ...:",
        //     quiz[currentQuestion]?.type?.name
        // );

        // if (quiz[currentQuestion]?.type?.name === "poll") {
        //     setShowPoll(true);
        // } else {
        if (
            selectedChoices.find(
                (choice) => choice?.quiz_id === quiz[currentQuestion]?.id
            )
        ) {
            if (isQuizCompleted) {
                // console.log('quiz ready for send to server...........................................................')


                post(route('lessons.submit-quiz', lesson?.id));


                // console.log('selected Choices in....:', selectedChoices)

                // console.log('after complete data for API.....:', data)

            } else {
                setCurrentQuestion((prevQuestion) => prevQuestion + 1);
            }
        }
        // }

        if (showPoll) {
            setShowPoll(false);
        }
    };

    const handleFinishQuiz = () => {
        setShowPoll(false);
        if (isQuizCompleted) {
            alert("api submit");
        } else {
            setCurrentQuestion((prevQuestion) => prevQuestion + 1);
        }
    };


    // console.log('last console.....:', data)

    return (
        <div>
            <div>
                <section className="mt-24 lg:mt-[8.5rem] flex justify-center items-center">
                    <div data-aos="fade-in" data-aos-delay="100" data-aos-easing="ease" data-aos-duration="300" className="container mx-auto px-5 md:px-7 xl:px-0">
                        <div className="  flex flex-col justify-between h-[85vh]">
                            <div className="grid grid-cols-12 flex items-center  ">
                                <div className="col-span-12">
                                    <div className=" relative text-center">
                                        <h1 className=" mt-5 mb-8 ">
                                            {lesson?.title}
                                        </h1>
                                        

                                    </div>
                                    <div className="text-center">
                                        <p className=" fw-regular fs-medium    mb-4 ">
                                            Quiz #{lessonNumber}
                                        </p>
                                    </div>

                                    <div className="text-center containerSmall">
                                        <h3 className="   semibold   mb-8 lg:mb-[1.5rem]">
                                            {quiz[currentQuestion]?.question}
                                        </h3>
                                    </div>
                                    {/* multiple_choice  */}
                                    {/* {showPoll ? ( */}
                                    <>
                                        {/* <div className={` ${showPoll  ?  'block' : 'hidden' } `}>
                                            <div className="containerMedium mx-auto">
                                                <div className="text-center w-full">
                                                    <p className="fs-regular fw-regular opacity-50 mb-6">
                                                        Result based on
                                                        Community 372 votes
                                                    </p>
                                                </div>
                                                <div className="flex flex-col items-center justify-center">

                                                    <form
                                                        className="w-full containerMedium mx-12 space-y-3 mb-5"
                                                        action=""
                                                    >
                                                        <div className="grid grid-cols-1 space-y-[24px] ">
                                                        {quiz[currentQuestion]?.answers?.map((data, index) => (
  <div className="flex w-full" key={index}>
    {quiz[currentQuestion]?.polls
      .filter((item) => item.pollerable_id === data?.id)
      .map((filteredItem, index) => (
        <div className="mb-2 fs-large fw-medium" key={index}>
          {filteredItem?.poll}%
        </div>
      ))}
    <div className="w-full ml-[21px]">
      <div className="mb-2 fs-regular fw-regular">{data?.value}</div>
      <div className="w-full bg-[#ffffff10] h-2 mb-4">
  {quiz[currentQuestion]?.polls
    .filter((item) => item.pollerable_id === data?.id)
    .map((filteredItem, index) => (
      <div
        className="bg-white h-2 transition-width ease-in-out duration-500"
        style={{ width: `${filteredItem?.poll}%` }}
        key={index}
      ></div>
    ))}
</div>

    </div>
  </div>
))}



                                                        </div>
                                                    </form>

                                                </div>
                                            </div>

                                            </div> */}
                                    </>
                                    {/* // poll component end */}
                                    {/* ) : ( */}
                                    {/* // quize component start */}
                                    <>
                                        <div>
                                            <div className="containerMedium mx-auto">
                                                {/* <div className="text-center w-full">
                                                    <p className="fs-regular fw-regular opacity-50 mb-6">
                                                        Choose as many you like
                                                    </p>
                                                </div> */}
                                                <div className="flex flex-col items-center justify-center">
                                                    {/*  <!-- Component Start -->*/}
                                                    <form
                                                        className="w-full containerMedium mx-12 space-y-2 mb-5 "
                                                        action=""
                                                    >
                                                        <div className="grid grid-cols-1 md:grid-cols-2  gap-3 ">
                                                            {quiz?.slice(0, quiz?.length)
                                                            [currentQuestion]?.answers.map(
                                                                (choice) => (
                                                                    
                                                                  
                                                                 
                                                                    <div 
                                                                        key={choice?.id}
                                                                    >

                                                                    <motion.div
                                                                    initial={{ opacity: 0, scale: 0.5 }}
                                                                    animate={{ opacity: 1, scale: 1 }}
                                                                    transition={{ duration: 0.2 }}
                                                                  >
                                                                        <div
                                                                            key={choice?.id}
                                                                            // onClick={() => {handleCardClick(  choice?.id ) }  }
                                                                            onClick={() =>
                                                                                handleChoiceSelect(
                                                                                    quiz[currentQuestion].id, choice.id
                                                                                )
                                                                            }
                                                                            className={`${selectedChoices?.find(
                                                                                (selectedChoice) => selectedChoice?.quiz_id ===
                                                                                    quiz[currentQuestion].id && selectedChoice?.answer_id === choice?.id
                                                                            )
                                                                                ? "noise-20  innerBorderLinkSelected innerBorderLinkSelectedbg"
                                                                                : " noise-10 "
                                                                                } lg:cursor-pointer  border-rounded-20 flex justify-start  inset-border secondary px-[24px] pb-[14px] pt-[16px] `}
                                                                        >
                                                                            {selectedChoices.find(
                                                                                (selectedChoice) => selectedChoice?.quiz_id === quiz[currentQuestion]
                                                                                    ?.id && selectedChoice?.answer_id === choice.id) ? (
                                                                                <img
                                                                                    src={check}
                                                                                    className="w-[1.125rem]  h-[1.125rem]"
                                                                                    alt="uncheck"
                                                                                />
                                                                            ) : (
                                                                                <img src={uncheck}
                                                                                    className="w-[1.125rem]  h-[1.125rem]"
                                                                                    alt="uncheck"
                                                                                />
                                                                            )}

                                                                            <p className="fw-regular fs-regular text-center pl-[22px]">
                                                                                {choice.value}
                                                                            </p>
                                                                        </div>
                                                                        </motion.div>

                                                                        <div
                                                                            className={`poll-container ${showPoll
                                                                                ? "show"
                                                                                : ""
                                                                                }`}
                                                                        >
                                                                            {showPoll && (
                                                                                <>
                                                                                    {quiz?.[currentQuestion]?.polls?.filter(
                                                                                        (item) => item.pollerable_id === choice?.id).map(
                                                                                            (item, index) => (
                                                                                                <div className="flex w-full mt-2 ">
                                                                                                    <div key={index + 1} className="mb-2  fs-large fw-medium  "
                                                                                                    >
                                                                                                        {item?.poll}%
                                                                                                    </div>
                                                                                                    <div className="w-full ml-[21px] ">
                                                                                                        {/* <div className="mb-2  fs-regular fw-regular  ">To get better at something I do</div> */}
                                                                                                        <div className="w-full noise-20 bg-[#ffffff10]  border-rounded-10 h-2  mt-[6px] md:mt-[10px]  ">
                                                                                                            <div
                                                                                                                className="bg-white  h-2 transition-width ease-in-out duration-500"
                                                                                                                style={{
                                                                                                                    width: `${item?.poll}%`,
                                                                                                                }}
                                                                                                            ></div>
                                                                                                        </div>{" "}
                                                                                                    </div>
                                                                                                </div>
                                                                                            )
                                                                                        )}
                                                                                </>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                   
                                                                )
                                                            )}
                                                        </div>
                                                    </form>
                                                    {/*  <!-- Component End  -->*/}
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                    {/* )} */}
                                </div>
                            </div>
                            {/* {showPoll ?
                       <div className="col-span-4 justify-center flex py-[3rem] ">
                                                <div
                                                    onClick={handleContinuePoll}

                                                >
                                                    <Button
                                                        icon={<Countinuebtn />}
                                                        className={
                                                            "primary icon mt-[10px] uppercase"
                                                        }
                                                    >
                                                        continue
                                                    </Button>
                                                </div>
                                            </div>  : */}

                            <div className="col-span-4 justify-center flex py-[3rem] relative">


                            {lesson?.quiz_skipable &&   <div className="  mt-5 absolute right-0">
                             <Link href={route('lessons.skip-quiz', lesson?.id)}>
                                            <div className=" cursor-pointer text-[15px]   text-[#FFFFFF] font-normal opacity-50  flex items-center justify-end">
                                                Skip Quiz
                                               
                                            </div>
                                        </Link> 
                                        </div> }
                             
                                <div
                                    onClick={handleNextQuestion}
                                    disabled={
                                        !selectedChoices.find(
                                            (choice) =>
                                                choice.quiz_id ===
                                                quiz[currentQuestion]?.id
                                        )
                                    }
                                >
                                    <Button
                                        // icon={<Countinuebtn />}
                                        className={
                                            "primary icon mt-[10px] uppercase"
                                        }
                                    >
                                        {currentQuestion === quiz?.length - 1
                                            ? "Finish"
                                            : isQuizCompleted
                                                ? "Back to lesson"
                                                : "continue"}
                                    </Button>
                                </div>
                            </div>
                            {/* //  } */}
                        </div>
                    </div>
                    {/*  <!-- container End -->*/}
                </section>

                {/* footer  */}
                {/* <section className={"lesson-footer"}>
                    <div className="grid grid-cols-12">
                        <div className="col-span-12">
                            <div className="flex items-center  whitespace-nowrap overflow-x-scroll lg:overflow-x-hidden pb-3 lg:pb-0">
                                <button className="bg-white h-[33px] w-full  px-4 flex items-center justify-center">
                                    <p className="fw-medium text-[#000000] fs-tiny">
                                        Lesson 1
                                    </p>
                                </button>
                                <button className="h-[33px] w-full px-4 flex items-center justify-center bg-[#1A1A1A]">
                                    <p className="fw-medium fs-tiny">
                                        Lesson 2
                                    </p>
                                </button>
                                <button className="h-[33px] w-full px-4 flex items-center justify-center bg-black border-r-[1px] border-r-[#525252]">
                                    <p className="fw-medium fs-tiny">
                                        Lesson 3
                                    </p>
                                </button>
                                <button className="h-[33px] w-full px-4 flex items-center justify-center bg-black border-r-[1px] border-r-[#525252]">
                                    <p className="fw-medium fs-tiny">
                                        Lesson 4
                                    </p>
                                </button>
                                <button className="h-[33px] w-full px-4 flex items-center justify-center bg-black border-r-[1px] border-r-[#525252]">
                                    <p className="fw-medium fs-tiny">
                                        Lesson 5
                                    </p>
                                </button>
                                <button className="h-[33px] w-full px-4 flex items-center justify-center bg-black border-r-[1px] border-r-[#525252]">
                                    <p className="fw-medium fs-tiny">
                                        Lesson 6
                                    </p>
                                </button>

                                <button className="bg-white w-full h-[33px] px-4 flex items-center justify-center">
                                    <p className="fw-medium text-[#000000] fs-tiny flex items-center gap-2">
                                        <span className="mt-1">
                                            <svg
                                                width="11"
                                                height="12"
                                                viewBox="0 0 11 12"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <g clipPath="url(#clip0_706_27378)">
                                                    <path
                                                        opacity="0.2"
                                                        d="M5.625 8.75C7.90317 8.75 9.75 6.90317 9.75 4.625C9.75 2.34683 7.90317 0.5 5.625 0.5C3.34683 0.5 1.5 2.34683 1.5 4.625C1.5 6.90317 3.34683 8.75 5.625 8.75Z"
                                                        fill="black"
                                                    />
                                                    <path
                                                        d="M7.21875 1.21875C7.93835 1.55436 8.54711 2.08854 8.97339 2.75841C9.39967 3.42829 9.62575 4.20599 9.625 5C9.625 6.09402 9.1904 7.14323 8.41682 7.91682C7.64323 8.6904 6.59402 9.125 5.5 9.125C4.40598 9.125 3.35677 8.6904 2.58319 7.91682C1.8096 7.14323 1.375 6.09402 1.375 5C1.37426 4.20599 1.60033 3.42829 2.02661 2.75841C2.4529 2.08854 3.06166 1.55436 3.78125 1.21875"
                                                        stroke="black"
                                                        strokeOpacity="0.6"
                                                        strokeWidth="1.2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_706_27378">
                                                        <rect
                                                            width="11"
                                                            height="11"
                                                            fill="white"
                                                            transform="translate(0 0.5)"
                                                        />
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                        </span>
                                        Customise progress
                                    </p>
                                </button>
                            </div>
                        </div>
                    </div>
                </section> */}
            </div>
        </div>
    );
};

Quiz.layout = (page) => <SessionLayout children={page} title="" />;

export default Quiz;
