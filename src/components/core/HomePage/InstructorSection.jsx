import React from "react";
import instructor from "../../../assets/Images/Instructor.png";
import HighlightText from "./HighlightText";
import CTAButton from "./CTAButton";
import { FaArrowRight } from "react-icons/fa";

const InstructorSection = () => {
  return (
    <div className="">
      <div className=" flex gap-20 items-center flex-col md1:flex-row">
        <div className=" w-[50%]">
          <img src={instructor} alt="" className=" shadow-white" />
        </div>
        <div className=" w-[50%] flex flex-col gap-10">
          <div className=" text-4xl font-semibold w-[50%]">
            Become an <HighlightText text={"instructor"} />
          </div>
          <div className=" font-medium text-[16px] w-[60%] text-richblack-300">
            Instructors from around the world teach millions of students on
            StudyNotion. We provide the tools and skills to teach what you love.
          </div>

          <CTAButton active={true} linkto={"/signup"}>
            <div className=" flex items-center gap-3">
              Start Teaching Today
              <FaArrowRight className=" w-4 h-4" />
            </div>
          </CTAButton>
        </div>
      </div>
    </div>
  );
};

export default InstructorSection;
