import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Common/Loader";
import OTPInput from "react-otp-input";
import { Link, useNavigate } from "react-router-dom";
import { getPasswordResetToken, Signup } from "../services/operations/authAPI";


function VerifyEmail() {

    const [otp, setOTP] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const inputStyle = {
        width: "3rem",
        height: "3rem",
        fontSize: "1.5rem",
        borderRadius: "8px",
        border: "1px solid #ccc",
        textAlign: "center",
        color: "black",
    };

    const separatorStyle = {
        margin: "0 0.3rem",
        fontSize: "1.5rem",
        color: "#fff",
    };

    const { loading, signupData } = useSelector((state) => state.auth);

    const handleOnSubmit = (e) => {
        e.prevantDefault();
        const {
            accountType,
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            otp
        } = signupData;

        dispatch(Signup(accountType,firstName,lastName,email,password,confirmPassword,otp,navigate));
    }

    // useEffect(()=>{
    //     if(!signupData)
    //     {
    //         navigate('/signup');
    //     }
    // },[])

    return <div className="flex items-center justify-center h-[85vh]">
        {
            loading ? (
                <Loader />
            ) : (
                <div className="text-richblack-100 flex flex-col gap-4">
                    <h1 className="text-white font-bold text-2xl">
                        Verify Email
                    </h1>
                    <p className="text-richblack-100 text-sm">
                        A verification code has been sent to you. Enter the code below
                    </p>

                    <form onSubmit={handleOnSubmit}>
                        <div className="flex justify-center">

                            <OTPInput
                                value={otp}
                                onChange={setOTP}
                                numInputs={6}
                                renderSeparator={<span style={separatorStyle}>-</span>}
                                renderInput={(props) => <input {...props} />}
                                inputStyle={inputStyle}
                            />
                        </div>
                        <div className="">
                            <button type="submit" className="py-2 rounded-lg font-inter font-bold w-full bg-yellow-50 text-black my-5">
                                Verify Email
                            </button>


                            <button className="py-2 rounded-lg font-inter font-bold w-full bg-yellow-50 text-black "
                                onClick={()=>{
                                    dispatch(getPasswordResetToken(signupData.email));
                                }}>
                                Resend It
                            </button>

                            <div className="">
                                <Link to="/login">
                                    <p className="flex items-center gap-2"><span>←</span> Back To Login</p>
                                </Link>
                            </div>
                        </div>
                    </form>


                </div>
            )
        }
    </div>;
}

export default VerifyEmail;
