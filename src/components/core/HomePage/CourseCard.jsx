import { data } from "autoprefixer";
import React from "react";
import { HiUsers } from "react-icons/hi";
import { PiGitForkFill } from "react-icons/pi";

const CourseCard = ({ currentCard, cardData, setCurrentCard }) => {
  return (
    <div
      className={`${
        currentCard === cardData.heading ? " bg-white" : " bg-richblack-800"
      } flex flex-col justify-between md:h-[430px] md:w-[250px] lg:h-[330px] lg:w-[300px]`}
      style={{
        boxShadow: `${
          currentCard === cardData.heading ? "15px 15px 0px 0px #ffd60a" : ""
        }`,
      }}
      onClick={() => setCurrentCard(cardData.heading)}
    >
      <div className=" flex flex-col gap-3 px-6 py-8">
        <p
          className={`${
            currentCard === cardData.heading
              ? " text-richblack-800"
              : " text-richblack-25"
          } font-inter text-xl font-semibold`}
        >
          {cardData.heading}
        </p>
        <p
          className={`${
            currentCard === cardData.heading
              ? " text-richblack-500"
              : " text-richblack-300"
          } font-inter text-balance font-normal`}
        >
          {cardData.description}
        </p>
      </div>

      {/* bottom part */}
      <div className="mt-14 flex flex-col  justify-between gap-2 border-t-2 border-dashed border-richblack-300 px-4   pb-6 pt-2 sm:flex-row lg:flex-row ">
        <div className=" flex items-center gap-2">
          <HiUsers
            className={`${
              currentCard === cardData.heading
                ? " text-blue-300 "
                : " text-richblack-400 "
            } text-xl`}
          />
          <p
            className={`${
              currentCard === cardData.heading
                ? " text-blue-500 "
                : " text-richblack-300 "
            } font-inter text-base font-normal`}
          >
            {cardData.level}
          </p>
        </div>
        <div className="flex items-center justify-end gap-2">
          <PiGitForkFill
            className={`${
              currentCard === cardData.heading
                ? " text-blue-300 "
                : " text-richblack-400 "
            } rotate-180 font-inter text-2xl font-normal `}
          />

          <p
            className={`${
              currentCard === cardData.heading
                ? " text-blue-500 "
                : " text-richblack-300 "
            } font-inter text-base font-normal `}
          >
            {cardData.lessionNumber} Lessons
          </p>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
