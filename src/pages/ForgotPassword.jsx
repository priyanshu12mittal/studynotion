import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPasswordResetToken } from "../services/operations/authApi";
import AuthButton from "../components/core/auth/AuthButton";
import { MdOutlineKeyboardBackspace } from "react-icons/md";

const ForgotPassword = () => {
  const { loading } = useSelector((state) => state.auth);
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState("");
  const dispatch = useDispatch()

  const handleOnSubmit = (e)=>{
    e.preventDefault()
    dispatch(getPasswordResetToken(email,setEmailSent))
  }

  return (
    <div className=" flex h-screen flex-col items-center justify-center p-8">
      {loading ? (
        <div>Loading ...</div>
      ) : (
        <div className=" flex w-[30rem] flex-col justify-start gap-9 p-2">
          <h1 className=" text-3xl font-semibold text-richblack-5">
            {!emailSent ? "Reset your Password" : "Check your Email"}
          </h1>
          <p className=" text-lg font-normal text-richblack-100">
            {!emailSent
              ? "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
              : `We have sent the reset email to ${email}`}
          </p>
          <form className=" flex flex-col gap-5" onSubmit={handleOnSubmit}>
            {!emailSent && (
              <label className=" w-full">
                <p className=" mb-1 text-sm leading-5 text-richblack-5">
                  Email Address <sup className=" text-pink-200">*</sup>
                </p>
                <input
                  required
                  type="text"
                  typeof="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your Email Address"
                  className=" w-full rounded-lg bg-richblack-800 p-3 text-richblack-5"
                />
              </label>
            )}
            <AuthButton classN=" w-full" type="submit">
              {!emailSent ? "Reset password" : "Resend Email"}
            </AuthButton>
          </form>
          <div>
            <Link to={"/login"} className=" flex items-center gap-2 text-base font-medium text-richblack-5">
                <MdOutlineKeyboardBackspace className=" text-2xl" />
              <p>Back to Login</p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
