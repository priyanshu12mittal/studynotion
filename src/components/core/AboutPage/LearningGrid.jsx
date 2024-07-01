import React from "react";
import { LearningGridData } from "../../../data/aboutPageData";
import HighlightText from "../HomePage/HighlightText";
import CTAButton from "../HomePage/CTAButton";

const LearningGrid = () => {
  return (
    <div className=" mb-10 grid min-w-[160px] grid-cols-1 py-24 lg:w-auto lg:grid-cols-4 lg:px-32 bg-richblack-900">
      {LearningGridData.map((item, idx) => {
        return (
          <div
            key={idx}
            className={` mx-auto w-[50%] lg:w-full ${
              idx === 0 && "lg:col-span-2"
            } ${
              item.order % 2 === 1 ? " bg-richblack-700" : " bg-richblack-800"
            } ${item.order === 3 && "lg:col-start-2"}`}
          >
            {item.order < 0 ? (
              <div className="  mx-auto flex flex-col gap-6 bg-richblack-900 pb-10 lg:min-w-fit lg:translate-x-0 lg1:pb-0 lg1:pr-12">
                <h2 className=" text-4xl font-semibold leading-10">
                  {item.heading}
                  <HighlightText text={item.highlightText} />
                </h2>
                <p>{item.description}</p>
                <CTAButton active={true} linkto={item.BtnLink}>
                  {item.BtnText}
                </CTAButton>
              </div>
            ) : (
              <div className=" mx-auto flex min-h-[250px] flex-col gap-8 p-8 lg:w-fit">
                <h2 className=" text-lg font-semibold ring-richblack-5">
                  {item.heading}
                </h2>
                <p className=" text-sm font-normal ring-richblack-100">
                  {item.description}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default LearningGrid;
