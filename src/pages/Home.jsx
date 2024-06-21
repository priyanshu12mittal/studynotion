import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import HighlightText from "../components/core/HomePage/HighlightText";
import CTAButton from "../components/core/HomePage/CTAButton";
import banner from "../assets/Images/banner.mp4";
import CodeBlocks from "../components/core/HomePage/CodeBlocks";
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection";
import TimelineSection from "../components/core/HomePage/TimelineSection";
import InstructorSection from "../components/core/HomePage/InstructorSection";
import ExploreMore from "../components/core/HomePage/ExploreMore";
import Footer from "../components/common/Footer";

const Home = () => {
  return (
    <div>
      {/* section 1  */}
      <div className=" mx-auto flex flex-col w-11/12 items-center text-white">
        <div className=" mt-16 inline-flex w-[65%] flex-col items-center gap-9">
          <Link to={"/signup"}>
            <div
              className=" group gap-[0.375rem] mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 w-fit"
              style={{
                boxShadow: "0px -1px 0px 0px rgba(255, 255, 255, 0.18) inset",
              }}
            >
              <div className="flex items-center gap-[0.625rem] px-[1.125rem] py-[0.375rem] group-hover:bg-richblack-900">
                <p className=" text-center leading-6 font-medium">
                  Become an Instructor
                </p>
                <FaArrowRight className=" h-4 w-4" />
              </div>
            </div>
          </Link>

          <div className=" flex flex-col items-center gap-4">
            <div className=" first-letter text-center text-4xl font-semibold leading-[2.75rem]">
              Empower Your Future with <HighlightText text={"Coding Skills"} />
            </div>

            <div className=" text-center font-medium text-richblack-300 self-stretch font-inter text-base">
              With our online coding courses, you can learn at your own pace,
              from anywhere in the world, and get access to a wealth of
              resources, including hands-on projects, quizzes, and personalized
              feedback from instructors.
            </div>
          </div>

          <div className=" flex flex-col md:flex-row gap-6">
            <CTAButton linkto={"/signup"} active={true}>
              Learn More
            </CTAButton>
            <CTAButton linkto={"/login"} active={false}>
              Book a Demo
            </CTAButton>
          </div>
        </div>

        <div
          className=" mx-3 my-16 w-5/6"
          style={{
            boxShadow: "20px 20px 0px 0px #f5f5f5",
          }}
        >
          <video src={banner} muted loop autoPlay />
        </div>

        {/* code section 1 */}
        <div>
          <CodeBlocks
            position={"md:flex-row flex-col"}
            heading={
              <div className=" text-4xl font-semibold">
                Unlock your <HighlightText text={"coding potential"} /> with our
                online course
              </div>
            }
            subHeading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            }
            ctabtn1={{
              btnText: "Try it Yourself",
              linkto: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "Learn More",
              linkto: "/login",
              active: false,
            }}
            codeblock={`<!DOCTYPE html>\n
                    <html>\n
                    <head><title>Example</title>\n
                    <link rel="stylesheet"href="styles.css">\n
                    </head>\n
                    <body>\n
                    <h1><a href="/"> Hello 😀 learn HTML </h1>\n
                    <h1><a href="/"> from 🙂 zero </h1>\n
                    <h1><a href="/"> to 😎 hero </h1>\n
                    </body>
`}
            codeColor={"#ffffff"}
            bg={
              "linear-gradient(144deg, #8A2BE2 0%, #FFA500 50%, #F8F8FF 100%)"
            }
          />
        </div>

        {/* code section 2 */}
        <div>
          <CodeBlocks
            position={"md:flex-row-reverse flex-col"}
            heading={
              <div className=" text-4xl font-semibold">
                Start <HighlightText text={"coding in seconds"} />
              </div>
            }
            subHeading={
              "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson.."
            }
            ctabtn1={{
              btnText: "Continue Lesson",
              linkto: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "Learn More",
              linkto: "/login",
              active: false,
            }}
            codeblock={`<!DOCTYPE html>\n
                  <html>\n
                  <head><title>Example</title>\n
                  <link rel="stylesheet"href="styles.css">\n
                  </head>\n
                  <body>\n
                  <h1><a href="/"> Hello 😀 learn HTML </h1>\n
                  <h1><a href="/"> from  🙂 zero </h1>\n
                  <h1><a href="/"> to    😎 hero </h1>\n
                  </body>
`}
            codeColor={"#3ee4ec"}
            bg={
              "linear-gradient(138deg, #1FA2FF 0%, #12D8FA 50%, #A6FFCB 100%)"
            }
          />
        </div>
        <ExploreMore />
      </div>

      {/* section 2 */}
      <div className=" bg-pure-greys-5 text-richblack-700 pb-20">
        <div className=" homepage_bg pb-12 pt-40">
          <div className=" w-11/12 h-40 max-w-maxContent flex flex-col items-center gap-6 mx-auto justify-center">
            <div className=" flex gap-7 text-white">
              <CTAButton active={true} linkto={"/signup"}>
                <div className=" flex items-center gap-2">
                  Explore Full Catalog
                  <FaArrowRight className=" w-4 h-4" />
                </div>
              </CTAButton>
              <CTAButton active={false}>Learn More</CTAButton>
            </div>
          </div>
        </div>

        <div className=" mx-auto w-11/12 flex flex-col gap-14 items-center justify-between">
          <div className=" flex flex-col items-center gap-3 justify-between p-3 sm:flex-row lg1:px-28 lg1:py-24">
            <div className=" font-inter text-4xl font-semibold not-italic leading-[2.75rem] sm:w-[45%]">
              Get the skills you need for a{" "}
              <HighlightText text={"job that is in demand."} />
            </div>
            <div className=" sm:w-[45%]">
              <div className=" self-stretch font-inter text-base font-medium text-richblack-500">
                The modern StudyNotion is the dictates its own terms. Today, to
                be a competitive specialist requires more than professional
                skills.
              </div>
              <CTAButton
                active={true}
                linkto={"/signup"}
                className={"mt-9 w-fit"}
              >
                Learn More
              </CTAButton>
            </div>
          </div>

          <TimelineSection />
          <LearningLanguageSection />
        </div>
      </div>

      {/* section 3 */}
      <div className=" w-11/12 mx-auto max-w-maxContent flex flex-col justify-center items-center gap-8 bg-richblack-900 text-white mt-20 pb-20">
        <InstructorSection />
        {/* review slider */}
      </div>

      {/* footer */}
      <Footer />
    </div>
  );
};

export default Home;
