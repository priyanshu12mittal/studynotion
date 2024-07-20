import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/common/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";
import MyProfile from "./components/core/dashboard/MyProfile";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/core/auth/PrivateRoute";
import Settings from "./components/core/dashboard/Settings";
import EnrolledCourses from "./components/core/dashboard/EnrolledCourses";
import Cart from "./components/core/dashboard/Cart";
import { useSelector } from "react-redux";
import { ACCOUNT_TYPE } from "./utils/constants";
import {OpenRoute} from "./components/core/auth/OpenRoute";
import AddCourse from "./components/core/dashboard/AddCourse";
import MyCourses from "./components/core/dashboard/MyCourses";
import Catalog from "./pages/Catalog";
import CourseDetails from './pages/CourseDetails'
import ViewCourse from "./pages/ViewCourse";

function App() {
  const { user } = useSelector((state) => state.profile);

  return (
    <div className=" w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/catalog/:categoryName" element={<Catalog />}></Route>
        <Route
          path="/courses/:courseId"
          element={
            <CourseDetails
              isStudent={user?.accountType === ACCOUNT_TYPE.STUDENT}
            />
          }
        ></Route>
        {user?.accountType === ACCOUNT_TYPE.STUDENT && (
          <Route path="/view-course/:courseId" element={<ViewCourse />}></Route>
        )}
        <Route
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path="/dashboard/my-profile" element={<MyProfile />} />
          <Route path="/dashboard/settings" element={<Settings />} />
          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route
                path="/dashboard/enrolled-courses"
                element={<EnrolledCourses />}
              />
              <Route path="/dashboard/my-wishlist" element={<Cart />} />
            </>
          )}
          {
            user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
              <>
                <Route path="/dashboard/add-course" element={<AddCourse/>} />
                <Route path="/dashboard/my-courses" element={<MyCourses />}/>
              </>
            )
          }
        </Route>
        <Route
          path="/login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        />
        <Route
          path="/update-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
        />
        <Route
          path="/verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
