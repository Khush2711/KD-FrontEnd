import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Navbar from "./components/Common/Navbar";
import "aos/dist/aos.css";
import { useEffect } from "react";
import ForgotPassword from "./Pages/ForgotPassword";
import UpdatePassword from "./Pages/UpdatePassword";
import VerifyEmail from "./Pages/VerifyEmail";

function App() {

  

  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
        <Navbar/>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/forgot-password" element={<ForgotPassword/>}></Route>
        <Route path="/update-password/:token" element={<UpdatePassword/>}></Route>
        <Route path="/verify" element={<VerifyEmail/>}></Route>
      </Routes>

    </div>
  );
}

export default App;
