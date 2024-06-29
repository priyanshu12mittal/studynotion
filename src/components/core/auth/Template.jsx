import React from "react";
import frameImg from "../../../assets/Images/frame.png";
import SignUpForm from "./SignUpForm";
import LoginForm from "./LoginForm";

const Template = ({ title, desc1, desc2, image, formType }) => {
  return (
    <div className=" grid min-h-[calc(100vh-3.5rem)] place-items-center">
      <div className=" mx-auto flex w-11/12 max-w-maxContent flex-col-reverse justify-between gap-y-12 py-12 md:flex-row md:gap-x-12 md:gap-y-0">
        <div className=" mx-auto w-11/12 max-w-[450px] md:mx-0">
          <h1 className=" text-[1.875rem] font-semibold leading-9 text-richblack-5">
            {title}
          </h1>
          <p className=" mt-4 text-lg leading-7">
            <span className=" text-richblack-100">{desc1}</span>{" "}
            <span className=" font-edu-sa font-bold italic text-blue-100">
              {desc2}
            </span>
          </p>
          {formType === "signup" ? <SignUpForm /> : <LoginForm />}
        </div>
        <div className=" relative mx-auto w-11/12 max-w-[450px] md:mx-0">
          <img src={frameImg} alt="" width={558} height={504} />
          <img
            src={image}
            alt=""
            width={558}
            height={504}
            className=" absolute -top-4 right-4 z-10"
          />
        </div>
      </div>
    </div>
  );
};

export default Template;
