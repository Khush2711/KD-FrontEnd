import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
import { COURSE_STATUS } from "../../../../utils/constants";
import ConfirmationModal from "../../../Common/confirmationModal";
import { deleteCourse, fetchInstructorCourses } from "../../../../services/operations/courseDetailsAPI";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { useNavigate } from "react-router-dom";

function CourseTable({ courses, setCourses }) {
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);
    const [confirmationModal, setConfirmationModal] = useState(null);
    const navigate = useNavigate();

    // Pagination States
    const [currentPage, setCurrentPage] = useState(1);
    const coursesPerPage = 5;

    // Calculate total pages
    const totalPages = Math.ceil(courses.length / coursesPerPage);

    // Get courses for the current page
    const indexOfLastCourse = currentPage * coursesPerPage;
    const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
    const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);

    const fetchCourses = async () => {
        const result = await fetchInstructorCourses(token);
        if (result) {
            setCourses(result.data.courses);
        }
    };

    const handleCourseDelete = async (courseId) => {
        setLoading(true);
        await deleteCourse({ courseId }, token);
        fetchCourses();
        setConfirmationModal(null);
        setLoading(false);
    };

    return (
        <div className="text-richblack-5 my-10">
            <Table>
                <Thead className="border border-richblack-800">
                    <Tr className="m-[20px] richblack-800 p-8">
                        <Th className="border border-richblack-800 p-2">Courses</Th>
                        <Th className="border border-richblack-800 p-2">Duration</Th>
                        <Th className="border border-richblack-800 p-2">Price</Th>
                        <Th className="border border-richblack-800 p-2">Actions</Th>
                    </Tr>
                </Thead>

                <Tbody>
                    {currentCourses.length === 0 ? (
                        <Tr className="border border-richblack-800 p-8 m-2">
                            <Td colSpan="4" className="text-center p-8">No Courses Found</Td>
                        </Tr>
                    ) : (
                        currentCourses.map((course) => (
                            <Tr key={course._id} className="border border-richblack-800 text-center">
                                <Td className="m-[20px] flex gap-x-2 items-center border-richblack-800 richblack-800 p-8">
                                    <img
                                        src={course?.thumbnail}
                                        alt="course"
                                        className="h-[120px] w-[220px] rounded-lg object-contain"
                                    />
                                    <div className="flex flex-col">
                                        <p>{course?.courseName}</p>
                                        <p>{course?.CourseDescription}</p>
                                        <p>Created {new Date(course?.createdAt).toLocaleDateString()}</p>
                                        {course.status === COURSE_STATUS.DRAFT ? (
                                            <p className="text-pink-50">DRAFT</p>
                                        ) : (
                                            <p className="text-yellow-50">PUBLISHED</p>
                                        )}
                                    </div>
                                </Td>

                                <Td className="border border-richblack-800 px-5">2hr 30min</Td>
                                <Td className="border border-richblack-800 px-5">
                                    <p>${course.price}</p>
                                </Td>

                                <Td className="border border-richblack-800">
                                    <button
                                        disabled={loading}
                                        onClick={() => navigate(`/dashboard/edit-course/${course._id}`)}
                                        className="mx-10"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        disabled={loading}
                                        className="mr-4"
                                        onClick={() =>
                                            setConfirmationModal({
                                                text1: "Do you want to delete this course?",
                                                text2: "All the data related to this course will be deleted",
                                                btn1Text: "Delete",
                                                btn2Text: "Cancel",
                                                btn1Handler: !loading
                                                    ? () => handleCourseDelete(course._id)
                                                    : () => {},
                                                btn2Handler: () => setConfirmationModal(null),
                                            })
                                        }
                                    >
                                        Delete
                                    </button>
                                </Td>
                            </Tr>
                        ))
                    )}
                </Tbody>
            </Table>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex justify-between mt-4 gap-4 items-center">
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50"
                    >
                        Previous
                    </button>

                    <span className="text-white">
                        Page {currentPage} of {totalPages}
                    </span>

                    <button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            )}

            {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
        </div>
    );
}

export default CourseTable;
