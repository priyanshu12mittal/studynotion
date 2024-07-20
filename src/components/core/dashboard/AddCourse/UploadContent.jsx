import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { VscCloudUpload } from "react-icons/vsc";
import { Player } from "video-react";
import 'video-react/dist/video-react.css';

const UploadContent = ({
  name,
  label,
  register,
  setValue,
  errors,
  video = false,
  viewData = false,
  editData = null,
}) => {
  const [confile, setConfile] = useState(null);
  const [previewSourse, setPreviewSource] = useState(
    editData ? editData : null
  );

  useEffect(() => {
    register(name, { required: editData ? false : true });
  }, [register]);

  useEffect(() => {
    setValue(name, confile);
  }, [confile, setValue]);

  const handlePreview = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setConfile(file);
    handlePreview(file);
  }, []);

  const { getInputProps, getRootProps } = useDropzone({
    onDrop,
    accept: !video
      ? { "image/*": [".jpeg", ".jpg", ".png"] }
      : { "video/*": [".mp4"] },
  });

  return (
    <>
      <label htmlFor="courseBenefits" className="labelStyle">
        {label} <sup className="text-pink-200">*</sup>{" "}
      </label>
      <div className="rounded-lg border-4 border-dashed border-richblack-600 bg-richblack-700 p-2  placeholder:text-richblack-400 focus:outline-none">
        {previewSourse === null ? (
          <div
            className="flex w-full flex-col items-center p-6 "
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            <div className="grid aspect-square w-14 place-items-center rounded-full bg-pure-greys-800">
              <VscCloudUpload className="text-2xl text-yellow-50" />
            </div>
            <p className="m-2 mt-2 max-w-[200px] text-center text-sm text-richblack-200">
              Drag and drop {!video ? "an image" : "a video"}, or click to{" "}
              <span className="font-semibold text-yellow-50">Browse</span> a
              file
            </p>
            <ul className="mt-10 flex list-disc flex-row justify-between space-x-12 text-center text-xs text-richblack-200">
              <li>Aspect ratio 16:9</li>
              <li>Recommended size 1024x576</li>
            </ul>
          </div>
        ) : (
          <>
            {video ? (
              <Player aspectRatio="16:9" playsInline>
                <source src={previewSourse} />
              </Player>
            ) : (
              <img
                src={previewSourse}
                alt="preview"
                className="aspect-video h-full w-full rounded-md object-cover"
              />
            )}

            {!viewData && (
              <button
                className="w-full text-center text-lg text-yellow-50"
                onClick={() => {
                  setPreviewSource(null);
                  setConfile(file);
                }}
              >
                Cancel
              </button>
            )}
          </>
        )}
      </div>
      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-yellow-100">
          {label} is required
        </span>
      )}
      {!viewData && editData && !video && (
        <div>
          <p className="text-pink-200 ">Please Note :</p>
          <p className="text-yellow-50 ">
            1. If you dont want above image as thumbnail only then change it.
          </p>
          <p className="text-yellow-50">
            2. Make sure that after removing prev image, you add new one because
            if you don't then previous image will be displayed as a thumbnail.
          </p>
        </div>
      )}
      {!viewData && editData && video && (
        <div>
          <p className="text-pink-200 ">Please Note :</p>
          <p className="text-yellow-50 ">
            1. If you dont want above video as lecture only then change it.
          </p>
          <p className="text-yellow-50">
            2. Make sure that after removing prev video, you add new one because
            if you don't then previous video will be played as a lecture.
          </p>
        </div>
      )}
    </>
  );
};

export default UploadContent;
