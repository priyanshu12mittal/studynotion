import React, { useState } from "react";
import { sidebarLinks } from "../../../data/dashboard-links";
import { Logout } from "../../../services/operations/authApi";
import { useDispatch, useSelector } from "react-redux";
import SidebarLink from "../dashboard/SidebarLink";
import { useNavigate } from "react-router-dom";
import { VscSignOut } from "react-icons/vsc";
import ConfirmationModal from "../../common/ConfirmationModal";

const Sidebar = () => {
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [confirmationModal, setConfirmationModal] = useState(null);

  return (
    <div>
      <div className=" flex min-w-[180px] h-[calc(100vh-3.5rem)] flex-col border-r border-r-richblack-700 bg-richblack-800 py-10">
        <div className=" flex flex-col text-richblack-200 gap-2">
          {sidebarLinks.map((item, index) => {
            if (item.type && user?.accountType !== item.type) {
              // console.log("user type",user.accountType)
              return null;
            } else {
              return <SidebarLink item={item} key={item.id} />;
            }
          })}
        </div>

        <div className=" h-px mx-auto my-5 mb-6 w-[90%] bg-richblack-600" />

        <div className=" flex flex-col gap-2 text-richblack-200">
          <SidebarLink
            item={{
              name: "Settings",
              path: "/dashboard/settings",
              icon: "VscSettingsGear",
            }}
          />

          <button
            onClick={() =>
              setConfirmationModal({
                text1: "Are you sure?",
                text2: "You will be logged out of your Account",
                btn1Text: "Logout",
                btn2Text: "Cancel",
                btn1Handler: () => dispatch(Logout(navigate)),
                btn2Handler: () => setConfirmationModal(null),
              })
            }
            className=" text-sm font-medium text-richblack-300 px-8 py-2"
          >
            <div className=" flex items-center gap-x-2">
              <VscSignOut className=" text-lg" />
              <span>Logout</span>
            </div>
          </button>
        </div>
      </div>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
};

export default Sidebar;
