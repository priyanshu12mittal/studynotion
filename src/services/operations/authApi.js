import toast from "react-hot-toast";
import { setLoading, setSignupData, setToken } from "../../slices/authSlice";
import { apiConnector } from "../apiConnector";
import { endpoints } from "../api";
import { setUser } from "../../slices/profileSlice";

export function sendOtp(email, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector("POST", endpoints.SENDOTP_API, {
        email,
        checkUserPresent: true,
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("OPT Sent Successfully");
      navigate("/verify-email");
    } catch (err) {
      toast.error(err.response.data.message);
    }

    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function Login(email, password, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector("POST", endpoints.LOGIN_API, {
        email,
        password,
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Login Successfull");
      dispatch(setToken(response.data.token));

      console.log(response);

      const userImage = response.data?.user?.image
        ? response.data.user.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`;

      response.data.user.image = userImage;
      dispatch(setUser(response.data.user));

      localStorage.setItem("token", JSON.stringify(response.data.token));
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/dashboard/my-profile");
    } catch (err) {
      toast.error(err?.data?.message || "Could not login try again");
    }
    toast.dismiss(toastId);
    dispatch(setLoading(false));
  };
}

export function getPasswordResetToken(email, setEmailSent) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector(
        "POST",
        endpoints.RESETPASSTOKEN_API,
        {
          email,
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      console.log(response);

      toast.success("Reset Email Sent");
      setEmailSent(true);
    } catch (err) {
      toast.error(err.response.data.message);
      // toast.error("failed")
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function resetPassword(password, confirmPassword, token, navigate) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector("POST", endpoints.RESETPASSWORD_API, {
        password,
        confirmPassword,
        token,
      });
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      // console.log(response)
      toast.success("Password Updated Successfully");
      navigate("/login");
    } catch (err) {
      toast.error(err.response.data.message);
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function signUp(
  accountType,
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  otp,
  navigate
) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector("POST", endpoints.SIGNUP_API, {
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      dispatch(setSignupData(null));
      toast.success("Signed up successfully");
      navigate("/login");
    } catch (err) {
      toast.error(err.response.data.message);
      if (err.response.data.invalidOtp !== true) {
        navigate("/login");
      }
    }

    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function Logout(navigate){
  console.log("called")
  return (dispatch)=>{
    dispatch(setToken(null))
    dispatch(setUser(null))
    // TODO:dispatch(resetCart())
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    toast.success("Logged out")
    navigate("/")
  }
}