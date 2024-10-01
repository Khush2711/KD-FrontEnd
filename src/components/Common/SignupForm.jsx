import React from "react";
import Menu from "./Menu";
import { FiEye } from "react-icons/fi";

function SignupForm({ user }) {
    return <form action="#" className="flex flex-col gap-2">


        <Menu list={user} />

        <div className="flex gap-4 ">
            <div className="w-full">
                <p className="text-richblack-100 my-2">
                    First Name <span className="text-pink-200">*</span>
                </p>
                <input className="w-full focus:outline-none custom-box-shadow bg-richblack-700 px-2 py-2 rounded-lg drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] border-b border-richblack-100" type="text" placeholder="Enter First Name" />
            </div>
            <div className="w-full">
                <p className="text-richblack-100 my-2">
                    Last Name <span className="text-pink-200">*</span>
                </p>
                <input className="w-full focus:outline-none custom-box-shadow bg-richblack-700 px-2 py-2 rounded-lg drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] border-b border-richblack-100" type="text" placeholder="Enter Last Name" />

            </div>
        </div>

        <div className="w-full">
            <p className="text-richblack-100 my-2">
                Email Address <span className="text-pink-200">*</span>
            </p>
            <input className="focus:outline-none custom-box-shadow w-full bg-richblack-700 px-2 py-2 rounded-lg drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] border-b border-richblack-100" type="text" placeholder="Enter Email Address" />
        </div>

        <div className="flex gap-4 below-md:flex-col custom:flex-row">
            <div className="w-full relative">
                <p className="text-richblack-100 my-2 relative">
                    Create Password <span className="text-pink-200">*</span>
                    <input className="w-full focus:outline-none custom-box-shadow bg-richblack-700 px-2 py-2 rounded-lg drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] border-b border-richblack-100" type="text" placeholder="Enter Password" />
                    <FiEye className="absolute top-9 right-4" />
                </p>


            </div>
            <div className="w-full relative">
                <p className="text-richblack-100 my-2 relative">
                    Confirm Password <span className="text-pink-200">*</span>
                    <input className="w-full focus:outline-none custom-box-shadow bg-richblack-700 px-2 py-2 rounded-lg drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] border-b border-richblack-100" type="text" placeholder="Confirm Password" />
                    <FiEye className="absolute top-9 right-4" />
                </p>
            </div>
        </div>


        <div className="my-5">
            <button className="py-2 rounded-lg font-inter font-bold w-full bg-yellow-50 text-black" type="submit">Create Account</button>
        </div>

    </form>;
}

export default SignupForm;
