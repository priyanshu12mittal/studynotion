import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ContactButton from "../core/AboutPage/ContactButton";
import contactMailSender from "../../services/operations/contactApi";
import CountryCode from "../../data/countrycode.json";

const ContactForm = ({ width }) => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        firstName: "",
        lastName: "",
        message: "",
        phoneNo: "",
      });
    }
  }, [reset, isSubmitSuccessful]);

  const submitContactForm = async (data) => {
    // console.log("logging data", data)
    contactMailSender(data, setLoading);
  };

  return (
    <form
      onSubmit={handleSubmit(submitContactForm)}
      className={` flex flex-col gap-7 ${width}`}
    >
      {/* first and last name */}
      <div className=" flex flex-col gap-5 lg:flex-row">
        <div className=" flex flex-col gap-2">
          <label htmlFor="firstName" className=" mb-1 text-sm leading-5">
            First Name :
          </label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            placeholder="Enter first Name"
            {...register("firstName", { required: true })}
            className=" rounded-lg bg-richblack-800 p-3 text-richblack-5"
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
          />
          {errors.firstName && (
            <span className=" -mt-1 text-sm text-yellow-100">
              Please Enter first Name
            </span>
          )}
        </div>

        <div className=" flex flex-col gap-2">
          <label htmlFor="lastName" className=" mb-1 text-sm leading-5">
            Last Name :
          </label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            placeholder="Enter last Name"
            {...register("lastName")}
            className=" rounded-lg bg-richblack-800 p-3 text-richblack-5"
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
          />
        </div>
      </div>

      {/* email */}
      <div className=" flex flex-col gap-2">
        <label htmlFor="email" className=" mb-1 text-sm leading-5">
          Email
        </label>
        <input
          type="text"
          name="email"
          id="email"
          placeholder="Enter your email"
          {...register("email", { required: true })}
          className=" rounded-lg bg-richblack-800 p-3 text-richblack-5"
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
        />
        {errors.email && (
          <span className=" -mt-1 text-sm text-yellow-100">
            Please Enter your email address
          </span>
        )}
      </div>

      {/* phone number */}
      <div className=" flex flex-col gap-2">
        <label htmlFor="phonenumber" className=" mb-1 text-sm leading-5">
          Phone Number
        </label>
        <div className=" flex items-center gap-5">
          <div className=" flex w-[150px] flex-col gap-2">
            <select
              name="countryCode"
              id="countryCode"
              placeholder="Country Code"
              defaultValue={"+91"}
              className=" w-full rounded-lg bg-richblack-800 p-3 text-richblack-5"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }} {...register("countryCode", {required:true})}
            >
              {CountryCode.map((item, idx) => {
                return (
                  <option value={item.code} key={idx}>
                    {item.code} - {item.country}
                  </option>
                );
              })}
            </select>
          </div>

          <div className=" flex w-[clac(100%-100px)] flex-col gap-2">
            <input
              type="number"
              name="phonenumber"
              id="phonenumber"
              placeholder="1234567890"
              className=" w-full rounded-lg bg-richblack-800 p-3 text-richblack-5"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }} {...register("phoneNo",{
                required:{
                    value:true,
                    message:"Please enter your phone number"
                },
                maxLength:{
                    value:12, message:"Invalid Phone Number"
                },
                minLength:{
                    value:9,message:"Invalid Phone Number"
                }
              })}
            />
          </div>
        </div>
        {errors.phoneNo && <span className=" -mt-1 text-sm text-yellow-100">{errors.phoneNo.message}</span>}
      </div>

      {/* message box */}
      <div className=" flex flex-col gap-2">
        <label htmlFor="message" className=" mb-1 text-sm leading-5">
          Message
        </label>
        <textarea
          name="message"
          id="message"
          cols={30}
          rows={5}
          placeholder="Enter your message"
          {...register("message", { required: true })}
          className=" w-full rounded-lg bg-richblack-800 p-3 text-richblack-5"
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
        />
        {errors.message && (
          <span className=" -mt-1 text-sm text-yellow-100">
            Please Enter your message
          </span>
        )}
      </div>

      <ContactButton>Send Message</ContactButton>
    </form>
  );
};

export default ContactForm;
