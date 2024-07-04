import React, { useRef, useState } from "react";
import IconBtn from "../../../common/IconButton";
import { useDispatch, useSelector } from "react-redux";
import { FiUpload } from "react-icons/fi";
import toast from "react-hot-toast";
import { updateDisplayPicture } from "../../../../services/operations/settings";

const ChangeProfilePicture = () => {
  const { user, loading } = useSelector((state) => state.profile);
  const {token} = useSelector((state)=>state.auth)
  const dispatch = useDispatch()
  const [previewImage, setPreviewImage] = useState(null);
  const [imageFile, setImageFile] = useState(null)
  const fileInputRef = useRef();

  const onClickHandler = () => {
    fileInputRef.current.click();
  };
  const setPreviewSource = (file)=>{
    const reader = new FileReader()
    console.log(reader)
    reader.readAsDataURL(file)
    reader.onloadend = ()=>{
        setPreviewImage(reader.result)
    }
  }
  const onChangeHandler = (e)=>{
    const file = e.target.files[0]
    console.log(file)
    setImageFile(file)
    setPreviewSource(file)
  }
  const onSubmitHandler = (e)=>{
    e.preventDefault()
    if (!imageFile){
        toast.error("please select Profile Picture.")
        return
    }
    dispatch(updateDisplayPicture(token,{displayPicture:imageFile}))
  }
//   console.log(fileInputRef);


  return (
    <div className=" flex flex-col gap-5 rounded-lg border border-richblack-700 bg-richblack-800 p-6 md1:flex-row">
      <img
        src={previewImage || user?.image}
        alt={`${user.firstName}_${user.lastName}_Picture`}
        className=" aspect-square w-[78px] rounded-full object-cover"
      />
      <div className=" flex flex-col gap-3">
        <p className=" text-base font-medium text-richblack-25">
          Change profile Picture
        </p>
        <div className=" flex gap-3">
          <button
            className=" cursor-pointer rounded-md bg-richblack-700 px-5 py-2 font-semibold text-richblack-50"
            disabled={loading}
            onClick={onClickHandler}
          >
            Select
          </button>
          <form onSubmit={onSubmitHandler}>
            <input type="file" className=" hidden" ref={fileInputRef} onChange={onChangeHandler} accept="image/png, image/gif, image/jpeg" />
            <IconBtn type={"submit"}
              text={loading ? "Uploading..." : "Upload"}
              customClasses={"flex items-center"}
              disabled={loading}
            >
              {!loading && <FiUpload className=" text-lg text-richblack-900" />}
            </IconBtn>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangeProfilePicture;
