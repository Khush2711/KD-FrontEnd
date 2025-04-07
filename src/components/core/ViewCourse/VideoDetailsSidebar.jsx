import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Iconbtn from "../../Common/IconBtn";

const VideoDetailsSidebar = ({ setReviewModal }) => {
  const [activeStatus, setActiveStatus] = useState(null);
  const [videoBarActive, setVideoBarActive] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { sectionId, subSectionId } = useParams();

  const {
    courseSectionData = [],
    courseEntireData,
    totalNoOfLectures,
    completedLectures,
  } = useSelector((state) => state.viewCourse);

  useEffect(() => {
    console.log("completedLectures......................",completedLectures);
    
    if (!courseSectionData.length || !sectionId || !subSectionId) return;

    const currentSection = courseSectionData.find((sec) => sec._id === sectionId);
    if (!currentSection) return;

    const currentSubSection = currentSection.subSection.find((sub) => sub._id === subSectionId);
    if (!currentSubSection) return;

    setActiveStatus(currentSection._id);
    setVideoBarActive(currentSubSection._id);
  }, [courseSectionData, sectionId, subSectionId, location.pathname]);

  return (
    <div className="text-richblack-5 p-4">
      {/* Top Section: Buttons & Course Info */}
      <div className="mb-4">
        <div className="flex justify-between items-center">
          <button
            onClick={() => navigate("/dashboard/enrolled-courses")}
            className="bg-gray-700 text-white px-3 py-1 rounded-md hover:bg-gray-600"
          >
            Back
          </button>

          <Iconbtn text="Add Review" onClick={() => setReviewModal(true)} />
        </div>

        <div className="mt-3">
          <p className="text-lg font-semibold">{courseEntireData?.courseName}</p>
          <p className="text-sm text-gray-300">
            {completedLectures?.length} / {totalNoOfLectures} Lectures Completed
          </p>
        </div>
      </div>

      {/* Course Sections & Subsections */}
      <div>
        {courseSectionData.map((course) => (
          <div key={course._id} className="mb-2">
            {/* Section Header */}
            <div
              className="bg-gray-800 p-2 flex justify-between items-center cursor-pointer"
              onClick={() => setActiveStatus((prev) => (prev === course._id ? null : course._id))}
            >
              <span className="text-white font-medium">{course.sectionName}</span>
            </div>

            {/* Subsections */}
            {activeStatus === course._id && (
              <div className="ml-4 mt-2">
                {course.subSection.map((topic) => (
                  <div
                    key={topic._id}
                    className={`flex items-center gap-3 p-2 rounded-md cursor-pointer transition-all duration-200 ${
                      videoBarActive === topic._id
                        ? "bg-yellow-200 text-richblack-900"
                        : "bg-richblack-900 text-white"
                    }`}
                    onClick={() => {
                      navigate(
                        `/view-course/${courseEntireData?._id}/section/${course._id}/sub-section/${topic._id}`
                      );
                      setVideoBarActive(topic._id);
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={completedLectures?.includes(topic._id)}
                      readOnly
                      className="cursor-pointer"
                    />
                    <span>{topic.title}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoDetailsSidebar;
