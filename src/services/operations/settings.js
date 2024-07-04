import toast from "react-hot-toast";
import { setLoading, setUser } from "../../slices/profileSlice";
import { apiConnector } from "../apiConnector";
import { settingsEndpoints } from "../api";
import {Logout} from './authApi'

export function updateDisplayPicture(token, formData) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    setLoading(true);

    try {
      const response = await apiConnector(
        "PUT",
        settingsEndpoints.UPDATE_DISPLAY_PICTURE_API,
        formData,
        {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        }
      );
      // console.log(response)
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Display Picture Updated Successfully ");
      dispatch(setUser(response.data.data));
    } catch (err) {
      toast.error("Could not update display picture");
    }
    toast.dismiss(toastId);
    setLoading(false);
  };
}

export function updateProfile(token, formData) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    setLoading(true);
    try {
      const response = await apiConnector(
        "PUT",
        settingsEndpoints.UPDATE_PROFILE_API,
        formData,
        {
          Authorization: `Bearer ${token}`,
        }
      );
      // console.log(response)
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      const userImage = response.data.data.image
        ? response.data.data.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.data.firstName} ${response.data.data.lastName}`;
      response.data.data.image = userImage;
      toast.success("Profile Updated Successfully");
      dispatch(setUser(response.data.data));
    } catch (err) {
      toast.error("Could not update Profile");
    }
    toast.dismiss(toastId);
    setLoading(false);
  };
}


export async function changePassword(formData, token) {
  setLoading(true)
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", settingsEndpoints.CHANGE_PASSWORD_API, formData, {
      Authorization: `Bearer ${token}`,
    })
    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    toast.success("Password Changed Successfully")
  } catch (error) {
    toast.error(error.response.data.message)
  }
  setLoading(false)
  toast.dismiss(toastId)
}


export function deleteProfile(token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    setLoading(true)
    try {
      const response = await apiConnector("DELETE", settingsEndpoints.DELETE_PROFILE_API, null, {
        Authorization: `Bearer ${token}`,
      })
      
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Profile Deleted Succesfully.")
      dispatch(Logout(navigate))
    } catch (error) {
      
      toast.error(error.response.data.message)
    }
    setLoading(false)
    toast.dismiss(toastId)
  }
}