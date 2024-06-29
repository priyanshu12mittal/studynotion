import React from "react";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthButton from '../components/core/auth/AuthButton'
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { resetPassword } from "../services/operations/authApi";

const UpdatePassword = () => {
  const { loading } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const { password, confirmPassword } = formData;

  const handleOnChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const token = location.pathname.split("/").at(-1);
    dispatch(resetPassword(password, confirmPassword, token, navigate));
  };

  return (
    <div className=" flex h-screen flex-col items-center justify-center p-8">
      {loading ? (
        <div>Loading ...</div>
      ) : (
        <div className=" flex w-[30rem] flex-col justify-normal gap-6 p-2">
          <h1 className=" text-3xl font-semibold text-richblack-5">Choose new password</h1>
          <p className=" text-lg font-normal text-richblack-100">Almost done. Enter your new password and your are all set.</p>
          <form onSubmit={handleOnSubmit} className=" flex flex-col gap-5">
            <label className=" relative">
              <p className=" mb-1 text-sm leading-5 text-richblack-5">
                New Password <sup className=" text-pink-200">*</sup>
              </p>
              <input
                type={showPassword ? "text" : "password"}
                required
                name="password"
                value={password}
                onChange={handleOnChange}
                placeholder="Enter New Password"
                className=" w-full rounded-md bg-richblack-800 p-3 pr-10 text-richblack-5"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}/>
              <span onClick={()=>setShowPassword((prev)=>!prev)} className=" absolute right-3 top-[52%] z-[10] cursor-pointer">
                {showPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
            </label>

            <label className=" relative">
              <p className=" mb-1 text-sm leading-5 text-richblack-5">
                Confirm New Password <sup className=" text-pink-200">*</sup>
              </p>
              <input
                type={showConfirmPassword ? "text" : "password"}
                required
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleOnChange}
                placeholder="Enter Confirm Password"
                className=" w-full rounded-md bg-richblack-800 p-3 pr-10 text-richblack-5"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
              />
              <span onClick={()=>setShowConfirmPassword((prev)=>!prev)} className=" absolute right-3 top-[52%] z-[10] cursor-pointer">
                {showConfirmPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
            </label>

            <AuthButton classN='w-full' type='submit'>
                Reset Password
            </AuthButton>
          </form>
          <Link to={'/login'} className=" flex items-center gap-2 text-base font-medium text-richblack-5">
                <MdOutlineKeyboardBackspace className=" text-2xl" />
                Back to login
          </Link>
        </div>
      )}
    </div>
  );
};

export default UpdatePassword;
