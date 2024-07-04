import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconBtn from "../../../common/IconButton";
import { updateProfile } from "../../../../services/operations/settings";

const inputStyle =
  "rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none";
const labelStyle = "text-[14px] text-richblack-5";
const errorStyle = "-mt-1 text-[12px] text-yellow-100";
const genders = ["Male", "Female", "Other"];

const EditProfile = () => {
  const { user, loading } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
//   console.log(user);

  const editProfile = (formData)=>{
    // console.log(formData)
    dispatch(updateProfile(token, formData))
  }

  return (
    <form className=" flex w-full flex-col gap-5" onSubmit={handleSubmit(editProfile)}>
      <div className=" flex flex-col gap-5 rounded-lg border border-richblack-700 bg-richblack-800 p-6">
        <h2 className=" text-lg font-semibold text-richblack-5">
          Profile Information
        </h2>
        {/* first and last name */}
        <div className=" flex w-full flex-col gap-6 md1:flex-row">
          <div className=" flex flex-col gap-2 lg:w-[48%]">
            <label htmlFor="firstName" className={`${labelStyle}`}>
              {" "}
              First name{" "}
            </label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              placeholder="Enter first Name"
              defaultValue={user?.firstName}
              {...register("firstName", { required: true })}
              className={`${inputStyle}`}
            />
            {errors.firstName && <span className={`${errorStyle}`}>Please Enter your First Name</span>}
          </div>

          <div className=" flex flex-col gap-2 lg:w-[48%]">
            <label htmlFor="lastName" className={`${labelStyle}`}>
              {" "}
              Last name{" "}
            </label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Enter Last Name"
              defaultValue={user?.lastName}
              {...register("lastName", { required: true })}
              className={`${inputStyle}`}
            />
            {errors.lastName && <span className={`${errorStyle}`}>Please Enter your Last Name</span>}
          </div>
        </div>

        {/* DOB and Gender */}

        <div className=" flex w-full flex-col gap-6 md1:flex-row">
          <div className=" flex flex-col gap-2 lg:w-[48%]">
            <label htmlFor="dateOfBirth" className={`${labelStyle}`}>
              {" "}
              Date of Birth{" "}
            </label>
            <input
              type="date"
              name="dateOfBirth"
              id="dateOfBirth"
              placeholder="Enter your DOB"
              defaultValue={user?.additionalDetails?.DateOfBirth}
              {...register("dateOfBirth", {
                required: {
                  value: true,
                  message: "Please enter your date of birth",
                },
                max: {
                  value: new Date().toISOString().split("T")[0],
                  message: "Date of birth cannot be in future.",
                },
              })}
              className={`${inputStyle}`}
            />
            {errors.dateOfBirth && <span className={`${errorStyle}`}>{errors.dateOfBirth.message}</span>}
          </div>

          <div className=" flex flex-col gap-2 lg:w-[]">
            <label htmlFor="gender" className={`${labelStyle}`}>
              Gender
            </label>
            <select
              type="text"
              name="gender"
              id="gender"
              defaultValue={user?.additionalDetails?.gender}
              {...register("gender", { required: true })}
              className={`${inputStyle}`}
            >
              {genders.map((item, idx) => {
                return (
                  <option value={item} key={idx}>
                    {item}
                  </option>
                );
              })}
            </select>
            {errors.gender && <span className={`${errorStyle}`}>Please Select a gender</span>}
          </div>
        </div>

        {/* contact details and about */}

        <div className=" flex w-full flex-col gap-6 md1:flex-row">
          <div className=" flex flex-col gap-2 lg:w-[48%]">
            <label htmlFor="contactNumber" className={`${labelStyle}`}>
              {" "}
              Contact Number{" "}
            </label>
            <input
              type="tel"
              name="contactNumber"
              id="contactNumber"
              placeholder="Enter Contact Number"
              defaultValue={user?.additionalDetails?.contactNumber}
              {...register("contactNumber", {
                required: {
                  value: true,
                  message: "Please Enter Your Contact Number",
                },
                maxLength: {
                  value: 12,
                  message: "invalid Contact Number",
                },
                minLength: {
                  value: 10,
                  message: "Invalid Contact Number",
                },
              })}
              className={`${inputStyle}`}
            />
            {errors.contactNumber && (
              <span className={`${errorStyle}`}>{errors.contactNumber.message}</span>
            )}
          </div>

          <div className=" flex flex-col gap-2 lg:w-[48%]">
            <label htmlFor="about" className={`${labelStyle}`}>
              {" "}
              About{" "}
            </label>
            <input
              type="text"
              name="about"
              id="about"
              placeholder="Enter Bio Details"
              defaultValue={user?.additionalDetails?.about}
              {...register("about")}
              className={`${inputStyle}`}
            />
            {errors.about && <span className={`${errorStyle}`}>{errors.about.message}</span>}
          </div>
        </div>
      </div>

      {/* submit button */}

      <div className=" flex justify-end gap-5">
        <button onClick={()=>{
            navigate("/dashboard/my-profile")
        }} disabled={loading} className=" w-fit rounded-lg bg-richblack-800 px-5 py-3 text-center text-base font-medium text-richblue-5">
            Cancel
        </button>
        <IconBtn type={"submit"} text={"Save"} customClasses={"w-fit"}/>
      </div>
    </form>
  );
};

export default EditProfile;
