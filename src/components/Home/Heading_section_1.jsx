import React from "react";
import HighlightText from "../core/HomePage/HighlightText";
import "./css.css"

function Heading_section_1() {
    return <div className="text-white">

        {/* Heading */}
        <div className="bg-blue-500 text-white px-4 py-2 rounded transition duration-300 ease-in-out hover:bg-blue-700 text-center text-4xl font-semibold mt-7 desai " data="slide-left">
            Empower Your Future with
            <HighlightText text={"Coding Skills"} />
        </div>

        {/* Subheading */}
        <div className="mt-5 wt-[90%] text-center text-lg font-bold text-richblack-300 below-md:text-justify below-md:hyphens-auto desai " >
            With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
        </div>
    </div>;
}

export default Heading_section_1;
