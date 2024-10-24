import React, { useState } from "react";
import Menu from "./Menu";
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";
import { Link } from "react-router-dom";


function LoginForm({ user }) {

    const [showPassword, setShowPassword] = useState(false);

    return <div>
        <form action="#" className="flex flex-col gap-2 ">


            <Menu list={user} />


            <div className="w-full">
                <p className="text-richblack-100 my-2">
                    Email Address <span className="text-pink-200">*</span>
                </p>
                <input className="focus:outline-none custom-box-shadow w-full bg-richblack-700 px-2 py-2 rounded-lg drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] border-b border-richblack-100" type="email" placeholder="Enter Email" />
            </div>

            <div className="w-full relative">
                <p className="text-richblack-100 my-2">
                    Password <span className="text-pink-200">*</span>
                </p>
                <input className="focus:outline-none custom-box-shadow w-full bg-richblack-700 px-2 py-2 rounded-lg drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] border-b border-richblack-100" type={`${showPassword ? 'text' : 'password'}`} placeholder="Enter Password" />

                <div className="" onClick={()=>{
                    setShowPassword(!showPassword)
                }}>
                    {
                        !showPassword ? <FiEye className="absolute top-[50px] right-4" /> : <FiEyeOff className="absolute top-[50px] right-4" />
                    }
                </div>

            </div>


            <div className="my-5">
                <button className="py-2 rounded-lg font-inter font-bold w-full bg-yellow-50 text-black" type="submit">Sign in</button>
                <div className="mt-2 ml-auto max-w-max text-xs text-blue-100">
                    <Link to="/forgot-password">
                        <p className="">Forgot Password</p>
                    </Link>
                </div>
            </div>
        </form>
    </div>;
}

export default LoginForm;
