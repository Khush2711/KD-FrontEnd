import React from "react";
import { useSelector } from "react-redux";
import { FaCheck } from "react-icons/fa";
import CourseInformationForm from "./Course Information/CourseInformationForm";
import CourseBuilderForm from "./Course Information/CourseBuilderForm";
import CoursePublishForm from "./Course Information/CoursePublishForm";

function RenderSteps() {

  const { step } = useSelector((state) => state.course);

  const steps = [
    {
      id: 1,
      title: "Confirmation Information"
    },
    {
      id: 2,
      title: "Course Builder"
    },
    {
      id: 3,
      title: "Publish"
    }
  ]

  return <div>

    {
      steps.map((item, idx) => (
        <>
          <div className="">

            <div className={`${step === item.id ? "bg-yellow-900 border-yellow-50 text-yellow-50" :
              "bg-richblack-800 border-richblack-700 text-richblack-300"}`}>
              {
                step > item.id ? (<FaCheck />) : (item.id)
              }
            </div>

          </div>

          {/* TODO: ADD DASHES */}
          {/* {
            item.id !== step
          } */}
        </>
      ))
    }

    <div className="">
      {
        steps.map((item) => (
          <>
            <p>{item.title}</p>
          </>
        ))
      }
    </div>

    { step === 1 && <CourseInformationForm/> }
    { step === 2 && <CourseBuilderForm/> }
    { step === 3 && <CoursePublishForm/> }

  </div>;
}

export default RenderSteps;
