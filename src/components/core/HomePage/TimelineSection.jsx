import React from "react";
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg";
import timelineImage from "../../../assets/Images/TimelineImage.png";
import { TfiLineDotted } from "react-icons/tfi";

const timeline = [
  {
    logo: Logo1,
    heading: "Leadership",
    description: "Fully commited to the success company",
  },
  {
    logo: Logo2,
    heading: "Responsibility",
    description: "Students will always be our top priority",
  },
  {
    logo: Logo3,
    heading: "Flexibility",
    description: "The ability to switch is an important skills",
  },
  {
    logo: Logo4,
    heading: "Solve the problem",
    description: "Code your way to a solution",
  },
];

const TimelineSection = () => {
  return (
    <div>
      <div className="  flex gap-[6%] justify-center items-center md:flex-row flex-col">
        {/* left part */}
        <div className="  mr-10 flex flex-col gap-5">
          {timeline.map((item, index) => {
            return (
              <div
                className=" relative flex gap-6 items-center px-3 py-4"
                key={index}
              >
                <div className=" w-12 h-12 bg-white flex items-center justify-center rounded-full">
                  <img src={item.logo} alt="" />
                </div>
                <div className=" flex flex-col">
                  <h2 className=" font-semibold text-lg">{item.heading}</h2>
                  <p className=" text-base">{item.description}</p>
                </div>
                <TfiLineDotted className=" absolute -bottom-9 left-[4.5%] h-10 w-10 text-richblack-100 rotate-90" />
              </div>
            );
          })}
        </div>
        {/* right part */}
        <div className=" relative flex flex-col items-center lg1:w-[50%] ">
          <img src={timelineImage} alt="timeline image" />
          <div className=" bg-caribbeangreen-700 flex w-fit text-white uppercase lg:p-8 p-5 translate-y-[-50%] gap-14">
            <div className=" flex gap-5 items-center justify-between">
              <div className=" text-3xl font-bold">10</div>
              <div className="flex flex-col text-caribbeangreen-300">
                <p>YEARS</p>
                <p>EXPERIENCE</p>
              </div>
            </div>
            <div className=" w-[0.0625rem] bg-[#037957]" />
            <div className="flex items-center justify-between gap-5 ">
              <div className="text-3xl font-bold text-white ">250</div>
              <div className="flex flex-col text-caribbeangreen-300">
                <p>TYPES OF</p>
                <p>COURSES</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineSection;
