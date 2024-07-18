import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserEnrolledCourses } from "../../../services/operations/courseDetailsAPI";
import {convertSecondstoTime} from '../../../utils/timeDurationFormatter'
import ProgressBar from "@ramonak/react-progress-bar";

const EnrolledCourses = () => {
  const { token } = useSelector((state) => state.auth);
  const [enrolledCourses, setEnrolledCourses] = useState(null);
  const [courseProg, setCourseProg] = useState(null)
  const getEnrolledCourses = async () => {
    try {
      const response = await getUserEnrolledCourses(token);
      setEnrolledCourses(response);
      const map = new Map()
    } catch (err) {
      console.log("Unable to fetch enrolled courses");
    }
  };
  useEffect(() => {
    getEnrolledCourses();
  }, []);

  return (
    <div>
      <div className=" text-3xl text-richblack-300">Enrolled Courses</div>
      {!enrolledCourses ? (
        <div>Loading...</div>
      ) : !enrolledCourses.length ? (
        <p className=" grid h-[10vh] w-full place-content-center text-richblack-5">You have not enrolled in any course yet</p>
      ) : (
        <div>
          <div className="flex justify-between rounded-t-lg bg-richblack-500 ">
            <p className="w-[50%] px-5 py-3">Course Name</p>
            <p className="w-1/4 px-2 py-3">Duration</p>
            <p className="w-1/5 flex-1 px-2 py-3">Progress</p>
          </div>

          {enrolledCourses.map((course, idx) => (
            <div>
              <div>
                <img src={course.thumbnail} alt="" />
                <div className="flex max-w-sm flex-col gap-2">
                  <p className="font-semibold">{course.courseName}</p>
                  <p className="hidden sm1:block text-xs text-richblack-300">
                    {course.description.length > 50
                      ? `${course.description.slice(0, 90)}...`
                      : course.description}
                  </p>
                </div>
              </div>
              <div>
                {convertSecondstoTime(course.duration)}
              </div>
              <div>
                <p>
                  Progrss :{Math.round(courseProg.get(course._id) || 0)} % 
                </p>
                <ProgressBar />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EnrolledCourses;
