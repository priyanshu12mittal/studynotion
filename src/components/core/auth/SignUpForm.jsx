import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import {ACCOUNT_TYPE} from '../../../utils/constants'
import Tab from "../../common/Tab";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSignupData } from "../../../slices/authSlice";
import { sendOtp } from "../../../services/operations/authApi";

const SignUpForm = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()


  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT)
  const tabData = [
    {
      id:1,
      tabName:"Student",
      type:ACCOUNT_TYPE.STUDENT
    },
    {
      id:2,
      tabName:"Instructor",
      type:ACCOUNT_TYPE.INSTRUCTOR
    }
  ]

  const { firstName, lastName, email, password, confirmPassword } = formData;

  const handleOnChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  // console.log(formData);

  const handleOnSubmit = (e)=>{
    e.preventDefault()
    console.log(formData)
    if (password !== confirmPassword){
      toast.error("Passwords does not match")
      return 
    }
    const signupData = {
      ...formData,accountType
    }

    dispatch(setSignupData(signupData))
    dispatch(sendOtp(formData.email, navigate))

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    })

    setAccountType(ACCOUNT_TYPE.STUDENT)
    
  }

  return (
    <div>

      <Tab tabData={tabData} field={accountType} setField={setAccountType} />

      <form className=" flex w-full flex-col gap-y-4" onSubmit={handleOnSubmit}>
        <div className=" flex gap-x-4">
          <label>
            <p className=" mb-1 text-sm leading-5 text-richblack-5">
              First Name <sup className=" text-pink-200">*</sup>
            </p>
            <input
              required
              type="text"
              name="firstName"
              placeholder="Enter First Name"
              value={firstName}
              onChange={handleOnChange}
              className=" w-full rounded-lg bg-richblack-800 p-3 text-richblack-5"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
            />
          </label>
          <label>
            <p className=" mb-1 text-sm leading-5 text-richblack-5">
              Last Name <sup className=" text-pink-200">*</sup>
            </p>
            <input
              required
              type="text"
              name="lastName"
              placeholder="Enter last Name"
              value={lastName}
              onChange={handleOnChange}
              className=" w-full rounded-lg bg-richblack-800 p-3 text-richblack-5"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
            />
          </label>
        </div>
        <label>
          <p className=" mb-1 text-sm leading-5 text-richblack-5">
            Email Address <sup className=" text-pink-200">*</sup>
          </p>
          <input
            required
            type="text"
            name="email"
            placeholder="Enter Email Address"
            value={email}
            onChange={handleOnChange}
            className=" w-full rounded-lg bg-richblack-800 p-3 text-richblack-5"
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
          />
        </label>
        <div className=" flex gap-x-4">
          <label className=" relative">
            <p className=" mb-1 text-sm leading-5 text-richblack-5">
              Create Password <sup className=" text-pink-200">*</sup>
            </p>
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter Password"
              value={password}
              onChange={handleOnChange}
              className=" w-full rounded-lg bg-richblack-800 p-3 text-richblack-5 pr-10"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
            />
            <span
              className=" absolute right-3 top-10 z-[10] cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#afb2fb" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#afb2fb" />
              )}
            </span>
          </label>
          <label className=" relative">
            <p className=" mb-1 text-sm leading-5 text-richblack-5">
              Confirm Password <sup className=" text-pink-200">*</sup>
            </p>
            <input
              required
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={handleOnChange}
              className=" w-full rounded-lg bg-richblack-800 p-3 pr-10 text-richblack-5"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
            />
            <span
              className=" absolute right-3 top-10 z-[10] cursor-pointer"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#afb2fb" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#afb2fb" />
              )}
            </span>
          </label>
        </div>
        <button
          type="submit"
          className=" mt-6 rounded-lg bg-yellow-50 px-3 py-2 font-medium text-richblack-900"
        >
          Create Account
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
