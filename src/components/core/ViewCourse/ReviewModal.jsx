import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createRating } from "../../../services/operations/courseDetailsAPI";
import { useForm } from "react-hook-form";
import { Rating } from "react-custom-rating-component";
import IconBtn from "../../common/IconButton";

const ReviewModal = ({ modalData }) => {
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const { courseId } = useParams();
  const onSubmitHandler = (currentValues) => {
    setLoading(true);
    //console.log({ ...currentValues, rating, courseId })
    const success = createRating({ ...currentValues, rating, courseId }, token);
    if (success) modalData.btn2Handler();
    setLoading(false);
  };

  const {
    register,
    //  setValue,
    //  getValues,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className="flex w-11/12 max-w-[350px] flex-col gap-5 rounded-lg border border-richblack-400 bg-richblack-800 p-6"
      >
        <p className="text-2xl font-semibold text-richblack-5">
          Please Give Youre Feedback
        </p>
        <div className="App">
          <Rating
            defaultValue={0}
            precision={0.5}
            size="30px"
            spacing="8px"
            activeColor="rgb(255 214 10 / var(--tw-bg-opacity)"
            onChange={(newRating) => {
              setRating(newRating);
            }}
          />
        </div>
        <div>
          <label htmlFor="lectureDescription" className="labelStyle">
            Review <sup className="text-pink-200">*</sup>{" "}
          </label>
          <textarea
            id="review"
            name="review"
            placeholder="Add Review"
            {...register("review", { required: true })}
            className="inputStyle min-h-[140px] w-full"
          />
          {errors.review && (
            <span className="mt-2 text-[12px] text-yellow-100">
              This field is required.
            </span>
          )}
        </div>
        <div className="flex items-center gap-x-4">
          <IconBtn type={"submit"} text={"Add Review"} disabled={loading} />
          <button
            className="cursor-pointer rounded-md bg-richblack-200 px-[20px] py-[8px] text-richblack-900"
            onClick={modalData?.btn2Handler}
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewModal;
