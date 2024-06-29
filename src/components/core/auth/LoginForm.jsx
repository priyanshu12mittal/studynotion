import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Login } from "../../../services/operations/authApi";

const loginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;
  const [showPassword, setShowPassword] = useState(false);

  const handleOnChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(Login(email, password, navigate));
  };
  return (
    <form
      className=" mt-6 flex w-full flex-col gap-y-4"
      onSubmit={handleOnSubmit}
    >
      <label className=" w-full">
        <p className=" mb-1 text-sm leading-5 text-richblack-5">
          Email Address <sup className=" text-pink-200">*</sup>
        </p>
        <input
          type="text"
          name="email"
          placeholder="Enter email Address"
          value={email}
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255,255,0.18)",
          }}
          className=" w-full rounded-lg bg-richblack-800 p-3 text-richblack-5"
          onChange={handleOnChange}
          required
        />
      </label>
      <label className=" relative">
        <p className=" mb-1 text-sm leading-5 text-richblack-5">
          Password <sup className=" text-pink-200">*</sup>
        </p>
        <input
          required
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Enter Password"
          value={password}
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255,255,0.18)",
          }}
          className=" w-full rounded-lg bg-richblack-800 p-3 text-richblack-5"
          onChange={handleOnChange}
        />
        <span
          className=" absolute right-3 top-10 z-[10] cursor-pointer"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? (
            <AiOutlineEyeInvisible fontSize={24} fill="#afb2bf" />
          ) : (
            <AiOutlineEye fontSize={24} fill="#afb2bf" />
          )}
        </span>
        <Link to={"/forgot-password"}>
          <p className=" ml-auto mt-1 max-w-max text-xs text-blue-200">
            Forgot Password ?
          </p>
        </Link>
      </label>
      <button
        type="submit"
        className=" mt-6 rounded-lg bg-yellow-50 p-3 py-2 font-medium text-richblack-900"
      >
        Log In
      </button>
    </form>
  );
};

export default loginForm;
