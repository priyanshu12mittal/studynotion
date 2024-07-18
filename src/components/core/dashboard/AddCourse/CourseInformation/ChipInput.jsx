import React, { useEffect, useState } from "react";
import { VscChromeClose } from "react-icons/vsc";

const ChipInput = ({
  register,
  errors,
  name,
  setValue,
  getValues,
  placeholder,
  label,
}) => {

  const [tag, setTag] = useState("")
  const [taglist, setTaglist] = useState([])

  useEffect(() => {
    register(name, {
      required: true,
      validate: (value) => value.length > 0,
    })
    if (getValues(name)) {
      setTaglist(getValues(name))
    }

  }, [])


  useEffect(() => {
    setValue(name, taglist)
  }, [taglist])

  const handleOnChange = (tag) => {
    if (tag.length === 1 && tag.at(-1) === ",") {
      setTag("")
    } else if (tag.at(-1) === ",") {
      setTaglist([...taglist, tag.substr(0, tag.length - 1)])
      setTag("")
    } else {
      setTag(tag)
    }
  }

  const removeTag = (idx)=>{
    let temp = [...taglist]
    temp.splice(idx,1)
    setTaglist(temp)
  }
  console.log(tag)

  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="labelStyle">
        {label}
      </label>
      <div className="my-2 flex flex-wrap gap-1">
        {taglist.length > 0 &&
          taglist.map((ele, ind) => {
            return (
              <div
                key={ind}
                className="mx-[1px] flex items-center justify-between gap-1 rounded-md bg-richblack-700  px-1 py-[2px]"
              >
                <span>{ele}</span>
                <VscChromeClose
                  className="text-base font-extrabold text-yellow-100 hover:cursor-pointer"
                  onClick={() => removeTag(ind)}
                />
              </div>
            )
          })}
      </div>
      <input
        name={name}
        id={name}
        type="text"
        placeholder={placeholder}
        onChange={(e) => {
          handleOnChange(e.target.value)
        }}
        value={tag}
        className="inputStyle"
      />
      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-yellow-100">
          {label} is required
        </span>
      )}
    </div>
  )
};

export default ChipInput;
