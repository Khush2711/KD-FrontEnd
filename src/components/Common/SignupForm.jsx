import Menu from "./Menu";
import { FiEyeOff, FiEye } from "react-icons/fi";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendOTP, Signup } from "../../services/operations/authAPI";
import { useNavigate } from "react-router-dom";
import { setSignupData } from "../../Slice/authSlice";

function SignupForm({ user }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [passwordVisibility, setPasswordVisibility] = useState({
        password: false,
        confirmPassword: false,
    });

    const handlePasswordVisibility = (field) => {
        setPasswordVisibility((prev) => ({
            ...prev,
            [field]: !prev[field],
        }));
    };

    const { loading } = useSelector((state) => state.auth);
    const [currentTab, setCurrentTab] = useState(user[0]);

    const tabHandler = (ele) => {
        setCurrentTab(ele);
    };

    const [userData, setUserData] = useState({
        accountType: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleOnChange = (e) => {
        setUserData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value, // Change from [e.target.value] to e.target.value
        }));
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission
    
        const { accountType, firstName, lastName, email, password, confirmPassword } = userData;
    
        // Dispatch the signup data to the store
        dispatch(setSignupData({ accountType: currentTab, firstName, lastName, email, password, confirmPassword }));
    
        // Call sendOTP and handle the navigation within a promise
        try {
            await sendOTP(email); // Assuming sendOTP returns a promise
            navigate('/verify'); // Only navigate if the OTP was sent successfully
        } catch (error) {
            console.error("Error sending OTP:", error);
        }
    };
    

    return (
        <form className="flex flex-col gap-2" onSubmit={handleOnSubmit}>
            <div className="text-richblack-200 flex gap-5 my-5 below-md:mx-auto bg-richblack-800 w-max below-md:w-full p-1 rounded-full font-medium drop-shadow-[0_1.5px_rgba(255,255,255,0.25)]">
                {user.map((ele, i) => (
                    <p
                        className={`px-6 py-1 ${currentTab === ele ? 'bg-richblack-900 text-richblack-5 rounded-full' : ''}`}
                        key={i}
                        onClick={() => tabHandler(ele)}
                    >
                        {ele}
                    </p>
                ))}
            </div>

            <div className="flex gap-4">
                <div className="w-full">
                    <p className="text-richblack-100 my-2">
                        First Name <span className="text-pink-200">*</span>
                    </p>
                    <input
                        className="w-full focus:outline-none custom-box-shadow bg-richblack-700 px-2 py-2 rounded-lg drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] border-b border-richblack-100"
                        value={userData.firstName} // Bind value to userData
                        name='firstName'
                        type="text"
                        placeholder="Enter First Name"
                        onChange={handleOnChange} // Use onChange prop
                    />
                </div>
                <div className="w-full">
                    <p className="text-richblack-100 my-2">
                        Last Name <span className="text-pink-200">*</span>
                    </p>
                    <input
                        className="w-full focus:outline-none custom-box-shadow bg-richblack-700 px-2 py-2 rounded-lg drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] border-b border-richblack-100"
                        value={userData.lastName} // Bind value to userData
                        name="lastName"
                        type="text"
                        placeholder="Enter Last Name"
                        onChange={handleOnChange} // Use onChange prop
                    />
                </div>
            </div>

            <div className="w-full">
                <p className="text-richblack-100 my-2">
                    Email Address <span className="text-pink-200">*</span>
                </p>
                <input
                    className="focus:outline-none custom-box-shadow w-full bg-richblack-700 px-2 py-2 rounded-lg drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] border-b border-richblack-100"
                    name="email"
                    value={userData.email} // Bind value to userData
                    type="email"
                    placeholder="Enter Email Address"
                    onChange={handleOnChange} // Use onChange prop
                />
            </div>

            <div className="flex gap-4 below-md:flex-col custom:flex-row">
                <div className="w-full relative">
                    <p className="text-richblack-100 my-2 relative">
                        Create Password <span className="text-pink-200">*</span>
                        <input
                            className="w-full focus:outline-none custom-box-shadow bg-richblack-700 px-2 py-2 rounded-lg drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] border-b border-richblack-100"
                            type={passwordVisibility.password ? 'text' : 'password'}
                            placeholder="Enter Password"
                            name="password"
                            value={userData.password} // Bind value to userData
                            onChange={handleOnChange} // Use onChange prop
                        />
                        <div onClick={() => handlePasswordVisibility("password")}>
                            {!passwordVisibility.password ? <FiEye className="absolute top-9 right-4" /> : <FiEyeOff className="absolute top-9 right-4" />}
                        </div>
                    </p>
                </div>
                <div className="w-full relative">
                    <p className="text-richblack-100 my-2 relative">
                        Confirm Password <span className="text-pink-200">*</span>
                        <input
                            className="w-full focus:outline-none custom-box-shadow bg-richblack-700 px-2 py-2 rounded-lg drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] border-b border-richblack-100"
                            type={passwordVisibility.confirmPassword ? 'text' : 'password'}
                            placeholder="Confirm Password"
                            name="confirmPassword"
                            value={userData.confirmPassword} // Bind value to userData
                            onChange={handleOnChange} // Use onChange prop
                        />
                        <div onClick={() => handlePasswordVisibility("confirmPassword")}>
                            {!passwordVisibility.confirmPassword ? <FiEye className="absolute top-9 right-4" /> : <FiEyeOff className="absolute top-9 right-4" />}
                        </div>
                    </p>
                </div>
            </div>

            <div className="my-5">
                <button className="py-2 rounded-lg font-inter font-bold w-full bg-yellow-50 text-black" type="submit">Create Account</button>
            </div>
        </form>
    );
}

export default SignupForm;
