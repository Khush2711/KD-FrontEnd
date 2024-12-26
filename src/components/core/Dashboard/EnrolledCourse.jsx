import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserEnrolledCourses } from "../../../services/operations/profileAPI";
import ProgressBar from "@ramonak/react-progress-bar";
import Loader from "../../Common/Loader";

function EnrolledCourse() {

    const { token } = useSelector((state) => state.auth);
    const [enrolledCourses, setEnrolledCourses] = useState(null);

    const dispatch = useDispatch();

    const getEnrolledCourseData = async () => {
        try {
            let data = await getUserEnrolledCourses(token);
            setEnrolledCourses(data);
            console.log(data);
        } catch (error) {
            console.log("Error while using Enrolled course api of profileAPI File : ", error);
        }
    }

    useEffect(() => {
        getEnrolledCourseData();
    }, [])

    return <div className="text-richblack-5">
        {
            !enrolledCourses ?
                (
                    <div className="h-[70vh] flex justify-center items-center">
                        <Loader />
                    </div>
                )
                :
                (<>
                    <h2>Enrolled Courses</h2>

                    {
                        !enrolledCourses.length ?
                            (
                                <p>You are not enrolled in any courses.</p>
                            )
                            :
                            (
                                <div>
                                    <table>
                                        <tr>
                                            <th colSpan={2}>Course Name</th>
                                            <th>Durations</th>
                                            <th>Progress</th>
                                        </tr>
                                        {
                                            enrolledCourses.map((key, idx) => (
                                                <tr>
                                                    <td className="flex items-center gap-x-5">
                                                        <div className="">
                                                            <img src={enrolledCourses?.[idx]?.thumbnail} alt="" className="w-[50px] h-[50px] -sm" />
                                                        </div>
                                                        <div className="flex flex-col gap-3">
                                                            <p>{enrolledCourses?.[idx]?.courseName}</p>
                                                            <p>{enrolledCourses?.[idx]?.description}</p>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <p>{enrolledCourses?.[idx]?.totalDuration}</p>
                                                    </td>
                                                    <td>
                                                        <p>Progress : {"course.progressPercentage" || 0}%</p>
                                                        <ProgressBar
                                                            completed={"course.progressPercentage" || 0}
                                                            height="8px"
                                                            isLabelVisible={false}
                                                        />
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </table>
                                </div>
                            )
                    }
                </>
                )
        }
    </div>;
}

export default EnrolledCourse;
