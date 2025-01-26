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

    <div className="flex justify-evenly m-2">
      {
        steps.map((item, idx) => (
          <>

            <div className={`text-white flex justify-evenly gap-x-5`}>
              {
                step > item.id ? (

                  <>
                    <div className="flex flex-col text-white justify-evenly w-48 items-center z-[5] relative">
                      <p className="w-11 h-11 rounded-full bg-yellow-25 flex justify-center items-center z-[5]">
                        <FaCheck className="text-black"/>
                      </p>
                      <p className="text-[12px]">{item.title}</p>
                      {
                        item.id < 3 && (
                          <div className={`border border-dashed w-52 top-5 -right-24 absolute z-[2] ${item.id < step && 'border-yellow-25'} `}></div>
                        )
                      }
                    </div>

                  </>
                ) : (
                  <>
                    <div className="flex flex-col text-white justify-evenly w-48 items-center relative z-[5]">
                      <p className={`w-11 h-11 rounded-full bg-richblack-700 flex justify-center items-center z-[5] ${step === item.id &&  "border-2 border-yellow-100 bg-yellow-800 text-yellow-25"}`}>{item.id}</p>
                      <p className="text-[12px]">{item.title}</p>
                      {
                        item.id < 3 && (
                          <div className={`border border-dashed w-52 top-5 -right-24 absolute z-[2] ${item.id < step && 'border-yellow-25'} `}></div>
                        )
                      }
                    </div>
                  </>
                )
              }
            </div>
          </>
        ))
      }
    </div>

    {step === 1 && <CourseInformationForm />}
    {step === 2 && <CourseBuilderForm />}
    {step === 3 && <CoursePublishForm />}

  </div>;
}

export default RenderSteps;
