import React, { useRef, useState } from "react";
import { AiOutlineCaretDown } from "react-icons/ai";
import { VscDashboard, VscSignOut } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import useOnClickOutside from '../../../hooks/useOnClickOutside'
import { Logout } from "../../../services/operations/authApi";

const ProfileDropDown = () => {
  const { user } = useSelector((state) => state.profile);
  // console.log(user)
  if (!user) {
    return null;
  }
  const [open, setOpen] = useState(true);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const ref = useRef(null)
  useOnClickOutside(ref, ()=>setOpen(false))

  return (
    <button className="relative" onClick={() => setOpen(true)}>
      <div className=" flex items-center gap-x-1">
        <img
          src={user?.image}
          alt={`profile-${user?.firstName}`}
          className=" w-8 h-8 aspect-square rounded-full object-cover"
        />
        <AiOutlineCaretDown className=" text-sm text-richblack-100" />
      </div>

      {open && (
        <div className=" absolute right-0 top-[118%] z-[1000] divide-y-[1px] border-richblack-700 bg-richblack-800 overflow-hidden rounded-md" ref={ref} onClick={(e)=>e.stopPropagation()}>
          <Link to={"/dashboard/my-profile"} onClick={()=>setOpen(false)}>
            <div className=" flex w-full items-center gap-x-1 px-3 py-2 text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25">
              <VscDashboard className=" text-lg" />
              Dashboard
            </div>
          </Link>
          <div className=" flex w-full items-center gap-x-1 px-3 py-2 text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25" onClick={()=>{
            dispatch(Logout(navigate))
            setOpen(false)
          }}>
            <VscSignOut className=" text-lg" />
            Logout
          </div>
        </div>
      )}
    </button>
  );
};

export default ProfileDropDown;
