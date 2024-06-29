import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OTPInput, { ResendOTP } from "otp-input-react";
import AuthButton from "../components/core/auth/AuthButton";
import { Link, useNavigate } from "react-router-dom";
import { sendOtp, signUp } from "../services/operations/authApi";
import { MdOutlineKeyboardBackspace } from "react-icons/md";

const VerifyEmail = () => {
  const { loading, signupData } = useSelector((state) => state.auth);
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!signupData) {
      navigate("/signup");
    }
  });

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const {
      accountType,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    } = signupData;
    dispatch(
      signUp(
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
        navigate
      )
    );
  };

  return (
    <div className=" flex h-screen flex-col items-center justify-center p-8">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className=" flex w-[30rem] flex-col justify-start gap-6 p-2">
          <h1 className=" text-3xl font-semibold text-richblack-5">Verify Email</h1>
          <p className=" text-lg font-normal text-richblack-100">A verification code has been sent to you. Enter the code below.</p>

          <form className=" flex flex-col gap-9" onSubmit={handleOnSubmit}>
            <OTPInput
              value={otp}
              onChange={setOtp}
              autoFocus
              OTPLength={6}
              otpType="number"
              disabled={false}
              placeholder={["-", "-", "-", "-", "-", "-"]}
              inputClassName=" bg-richblack-700 text-richblack-100 font-medium text-2xl py-7 px-3 min-w-[50px] rounded-lg focus:outline-none focus:ring-offset-2 focus:ring-offset-richblack-800" className=" texty outline-[#ffd60a]"
            />

            <AuthButton classN="w-full">Verify Email</AuthButton>
          </form>
          <ResendOTP
            onResendClick={() => sendOtp(signupData.email, navigate)} className="rounded-lg bg-richblack-700 p-3 text-richblack-5"
          />
          <div className=" flex justify-between">
          <Link
            to={"/login"}
            className=" flex items-center gap-2 text-base font-medium text-richblack-5"
          >
            <MdOutlineKeyboardBackspace className=" text-2xl" />
            Back to login
          </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
