import React from "react";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Iconbtn from '../../Common/IconBtn';
import Loader from "../../Common/Loader";

function MyProfile() {

    // const { user } = useSelector((state) => state.profile);
    const navigate = useNavigate();
    const user = useSelector((state) => state.profile.user);

    // Safely render user data or fallback
    if (!user) {
      return <Loader/> // Show loading state while data is being fetched
    }

    return <div className="text-white w-full">


        <h1 className="mb-14 text-3xl font-medium text-richblack-5">
            My Profile
        </h1>

        {/* Section 1 */}
        <div className="flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-3 md:p-8 md:px-12">
            <div className="flex items-center gap-x-4">
                <img
                    src={`${user.image}`}
                    alt="check your internet"
                    className="aspect-square w-[78px] rounded-full object-cover"
                />
                <div className="flex flex-col gap-1">
                    <p className="text-richblack-5 font-bold capitalize text-xl">{user?.firstName} {user?.lastName}</p>
                    <p className="text-richblack-400 text-sm">{user?.email}</p>
                </div>

            </div>
            <Iconbtn
                text="Edit"
                onclick={() => {
                    navigate("/dashboard/settings")
                }}
            />
        </div>

        {/* Section 2 */}
        <div className="flex flex-col justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-3 md:p-8 md:px-12 my-10">

            <div className="flex justify-between">
                <p className="text-richblack-5 font-bold capitalize text-xl">About</p>
                <Iconbtn
                    text="Edit"
                    onclick={() => {
                        navigate("/dashboard/settings")
                    }}
                />
            </div>

            <div className="">
                <p className="text-richblack-400 text-sm">
                    { user.additionalDetails?.about ?? "Write Something about your self"}
                    </p>
            </div>

        </div>

    </div>;
}

export default MyProfile;
