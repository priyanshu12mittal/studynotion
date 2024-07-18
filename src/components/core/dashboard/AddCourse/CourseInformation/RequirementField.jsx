import React, { useEffect, useState } from "react";

const RequirementField = ({
  register,
  errors,
  name,
  setValue,
  getValues,
  label,
  placeholder,
}) => {
  const [requirement, setRequirement] = useState("");
  const [requirementList, setRequirementList] = useState([]);

  useEffect(()=>{
    register(name,{
      required:true,
      validate:(value)=>value.length > 0
    })
    if (getValues(name)) {
      setRequirementList(getValues(name))
    }
  },[])

  useEffect(() => {
    setValue(name, requirementList)
  }, [requirementList])


  const handleAddReq = () => {
    if (requirement) {
      setRequirementList([...requirementList, requirement]);
      setRequirement("");
    }
  };

  const handleRemoveReq = (index) => {
    const updatedReqList = [...requirementList];
    updatedReqList.splice(index, 1);
    setRequirementList(updatedReqList);
  };

  console.log(requirementList);

  return (
    <div>
      <label htmlFor={name} className="labelStyle">
        {label}
        <sup className="text-pink-200">*</sup>{" "}
      </label>
      <div>
        <input
          id={name}
          type="text"
          onChange={(e) => setRequirement(e.target.value)}
          value={requirement}
          autoComplete="off"
          placeholder={placeholder}
          className="inputStyle w-full"
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            handleAddReq();
          }}
          className="text text-base font-bold text-yellow-50 "
        >
          Add
        </button>
      </div>
      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-yellow-100">
          {label} is required
        </span>
      )}

      {requirementList.length > 0 && (
        <ul>
          {requirementList.map((ele, ind) => (
            <li key={ind} className="m-2 w-fit ">
              <span>{ele}</span>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleRemoveReq(ind);
                }}
                className="mx-2 rounded-md bg-richblack-500 px-1 text-yellow-25"
              >
                Clear
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RequirementField;
