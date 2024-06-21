import React, { useState } from "react";
import { HomePageExplore } from "../../../data/homepage-explore";
import HighlightText from "./HighlightText";
import CourseCard from "./CourseCard";

const ExploreMore = () => {
  const [currentTab, setCurrentTab] = useState(HomePageExplore[0].tag);
  const [courses, setCourses] = useState(HomePageExplore[0].courses);
  const [currentCard, setCurrentCard] = useState(
    HomePageExplore[0].courses[0].heading
  );
  const setMyCards = (value) => {
    setCurrentTab(value);
    const result = HomePageExplore.filter((course) => course.tag === value);
    setCourses(result[0].courses);
    setCurrentCard(result[0].courses[0].heading);
  };

  return (
    <div className=" flex flex-col gap-4 font-inter translate-y-24">
      <div className=" text-4xl font-semibold text-center leading-[2.75rem]">
        Unlock the <HighlightText text={"Power of Code"} />
      </div>
      <p className=" text-center text-richblack-300 text-base mx-auto flex flex-col font-medium">
        Learn to build anything you can imagine
      </p>

      <div className=" flex flex-wrap justify-center rounded-3xl border-richblack-100 bg-richblack-700 mb-10 mx-auto px-1 py-1 sm:flex-row">
        {HomePageExplore.map((item, index) => {
          return (
            <div
              className={`text-[16px] flex items-center gap-2 ${
                currentTab == item.tag
                  ? "bg-richblack-900 text-richblack-5 font-medium"
                  : " text-white"
              } rounded-full transition-all duration-200 cursor-pointer hover:text-richblack-100 px-7 py-2`}
              key={index}
              onClick={() => setMyCards(item.tag)}
            >
              {item.tag}
            </div>
          );
        })}
      </div>

      <div className="flex flex-col items-center gap-9 justify-center px-14 md:flex-row">
        {courses.map((course, index) => {
          return (
            <CourseCard
              key={index}
              cardData={course}
              currentCard={currentCard}
              setCurrentCard={setCurrentCard}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ExploreMore;
