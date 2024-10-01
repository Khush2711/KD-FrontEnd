import React from "react";
import HighlightText from "../core/HomePage/HighlightText";

function heading() {
    return <div>
        {/* Heading */}
        <div className="text-center text-4xl font-semibold mt-7" data-aos="slide-left">
            Empower Your Future with
            <HighlightText text={"Coding Skills"} />
        </div>

        {/* Subheading */}
        <div className="mt-5 wt-[90%] text-center text-lg font-bold text-richblack-300 below-md:text-justify below-md:hyphens-auto" data-aos="slide-right">
            With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
        </div>
    </div>;
}

export default heading;
