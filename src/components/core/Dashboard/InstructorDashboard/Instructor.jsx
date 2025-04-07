import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getInstructorData } from "../../../../services/operations/profileAPI";
import { fetchInstructorCourses } from "../../../../services/operations/courseDetailsAPI";
import Loader from "../../../Common/Loader";
import { Link } from "react-router-dom";
import InstructorChart from "./InstructorChart";

function Instructor() {
    const [loading, setLoading] = useState(false);
    const [instructorData, setInstructorData] = useState(null);
    const [courseData, setCourseData] = useState(null);
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);

    const getCourseDataWithStats = async () => {
        setLoading(true);

        const instructorApiData = await getInstructorData(token);
        const result = await fetchInstructorCourses(token);

        console.log(instructorApiData);

        if (instructorApiData?.length) {
            setInstructorData(instructorApiData);
        }
        if (result?.data?.courses) {
            setCourseData(result.data.courses);
        }

        setLoading(false); // Fix loading state
    };

    useEffect(() => {
        getCourseDataWithStats();
    }, []);

    const totalAmount = instructorData?.reduce((acc, curr) => acc + curr.totalAmountGenerated, 0) || 0;
    const totalStudents = instructorData?.reduce((acc, curr) => acc + curr.totalStudentsEnrolled, 0) || 0;

    return (
        <div className="text-white">
            <div>
                <p>Hi {user?.firstName} 👋</p>
                <p>Let's start something new</p>
            </div>

            {loading ? (
                <Loader />
            ) : courseData?.length > 0 ? (
                <div>
                    <div>
                        <InstructorChart courses={instructorData} />
                        <div>
                            <p>Statistics</p>
                            <div>
                                <p>Total Courses</p>
                                <p>{courseData.length}</p>
                            </div>

                            <div>
                                <p>Total Students</p>
                                <p>{totalStudents}</p>
                            </div>

                            <div>
                                <p>Total Income</p>
                                <p>Rs. {totalAmount}</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <p>Your Courses</p>
                        <Link to="/dashboard/my-courses">
                            <p>View all</p>
                        </Link>
                    </div>

                    <div>
                        {courseData.slice(0, 3).map((course) => (
                            <div key={course._id}>
                                <img src={course?.thumbnail} alt="Course Image" />

                                <div>
                                    <p>{course?.courseName}</p>

                                    <div>
                                        <p>{course?.totalStudentsEnrolled} Students</p>
                                        <p>|</p>
                                        <p>Rs. {course?.totalAmountGenerated}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div>
                    <p>You have not created any courses yet</p>
                    <Link to={"/dashboard/addCourse"}>Create a course</Link>
                </div>
            )}
        </div>
    );
}

export default Instructor;
