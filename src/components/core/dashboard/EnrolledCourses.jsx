import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserEnrolledCourses } from "../../../services/operations/courseDetailsAPI";
import {convertSecondstoTime} from '../../../utils/timeDurationFormatter'
import ProgressBar from "@ramonak/react-progress-bar";
import { useNavigate } from "react-router-dom";

const EnrolledCourses = () => {
  const { token } = useSelector((state) => state.auth);
  const [enrolledCourses, setEnrolledCourses] = useState(null);
  const [courseProg, setCourseProg] = useState(null)
  const navigate = useNavigate()
  const getEnrolledCourses = async () => {
    try {
      const response = await getUserEnrolledCourses(token);
      setEnrolledCourses(response.courses);
      const map = new Map()
      for (let ele of response.courseProgress) {
        map.set(
          ele.course,
          (ele.completedVideos.length / ele.totalVideos) * 100
        )
      }
      setCourseProg(map)
    } catch (err) {
      console.log("Unable to fetch enrolled courses");
    }
  };
  useEffect(() => {
    getEnrolledCourses();
  }, []);
  console.log("enrolledCourses",enrolledCourses)

  return (
    <div>
      <div className=" text-3xl text-richblack-300">Enrolled Courses</div>
      {!enrolledCourses ? (
        <div>Loading...</div>
      ) : !enrolledCourses.length ? (
        <p className=" grid h-[10vh] w-full place-content-center text-richblack-5">You have not enrolled in any course yet</p>
      ) : (
        <div className="my-8 text-richblack-5 min-w-[360px]">
          {/* Headings */}
          <div className="flex justify-between rounded-t-lg bg-richblack-500 ">
            <p className="w-[50%] px-5 py-3">Course Name</p>
            <p className="w-1/4 px-2 py-3">Duration</p>
            <p className="w-1/5 flex-1 px-2 py-3">Progress</p>
          </div>
          {/* Course Names */}
          {enrolledCourses.map((course, i, arr) => (
            <div
              className={`flex items-center justify-between border border-richblack-700 ${
                i === arr.length - 1 ? "rounded-b-lg" : "rounded-none"
              }`}
              key={i}
            >
              <div
                className="flex  flex-col sm1:flex-row w-[50%] px-5 cursor-pointer items-center gap-4 py-3"
                onClick={() => {
                  navigate(
                    //   `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                    `/view-course/${course?._id}`
                  )
                }}
              >
                <img
                  src={course.thumbnail}
                  alt="course_img"
                  className="h-14 w-14 rounded-lg object-cover"
                />
                <div className="flex max-w-sm flex-col gap-2">
                  <p className="font-semibold">{course.courseName}</p>
                  <p className="hidden sm1:block text-xs text-richblack-300">
                    {course.description.length > 50
                      ? `${course.description.slice(0, 90)}...`
                      : course.description}
                  </p>
                </div>
              </div>
              <div className="w-1/4 px-2 py-3">
                {convertSecondstoTime(course.duration)}
              </div>
              <div className="flex-1 w-1/5 px-2 flex-col gap-2 py-3">
                <p>Progress: {Math.round(courseProg.get(course._id)) || 0}%</p>
                <ProgressBar
                  completed={courseProg.get(course._id) || 0}
                  height="8px"
                  isLabelVisible={false}
                  // bgColor="radial-gradient( circle farthest-corner at 12.3% 19.3%,  rgba(85,88,218,1) 0%, rgba(95,209,249,1) 100.2% )"
                  // bgColor="linear-gradient(to right, #00f260, #0575e6)"
                  //  bgColor="linear-gradient(to right, #f12711, #f5af19)"
                  bgColor="linear-gradient(to right, #ee0979, #ff6a00)"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EnrolledCourses;
