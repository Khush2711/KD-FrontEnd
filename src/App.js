import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./Pages/Home";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Navbar from "./components/Common/Navbar";
import "aos/dist/aos.css";
import { useEffect } from "react";
import ForgotPassword from "./Pages/ForgotPassword";
import UpdatePassword from "./Pages/UpdatePassword";
import VerifyEmail from "./Pages/VerifyEmail";
import { useDispatch } from "react-redux";
import { clearUserData, setToken, setUserData } from "./Slice/authSlice";
import About from "./Pages/About";
import Footer from "./components/Common/Footer";
import Dashboard from "./Pages/Dashboard";
import ErrorPage from "./Pages/ErrorPage";
import { decryptData } from "./utils/encryptionUtils";
import { initializeUser, setUser } from "./Slice/profileSlice";
import MyProfile from "./components/core/Dashboard/MyProfile";

function App() {



  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(initializeUser()); // Initialize user data from localStorage
  }, [dispatch]);

 
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/forgot-password" element={<ForgotPassword />}></Route>
        <Route path="/update-password/:token" element={<UpdatePassword />}></Route>
        <Route path="/verify" element={<VerifyEmail />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="/dashboard/my-profile" element={<MyProfile />}></Route>
        </Route>

        <Route path="*" element={<ErrorPage />}></Route>

      </Routes>

      <Footer />
    </div>
  );
}

export default App;
