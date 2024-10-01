import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import CTAButtton from "./Button";
import { TypeAnimation } from "react-type-animation";
import "./css/CodeBlocks.css"

function CodeBlocks({ position, heading, subheading, ctabtn1, ctabtn2, codeBlock, textColor,backgroundColor}) {
  return <div className={`below-md:flex-col flex ${position} my-20 justify-between gap-12 items-center`}>

    {/* section 1 */}
    <div className="below-md:w-[100%] w-[60%] flex flex-col gap-12">

      <div className="text-4xl  below-md:text-center below-md:hyphens-auto">
        {heading}
      </div>

      <div className="text-richblack-300 font-bold">
        {subheading}
      </div>

      <div className="flex gap-10">
        <CTAButtton active={ctabtn1.active} link={ctabtn1.link}>
          <div className="flex gap-2 items-center">
            {ctabtn1.btnText}
            <FaArrowRightLong />
          </div>
        </CTAButtton>

        <CTAButtton active={ctabtn2.active} link={ctabtn2.link}>
          {ctabtn1.btnText}
        </CTAButtton>
      </div>

    </div>

    {/* section 2 */}

    <div className="h-fit flex text-base below-md:w-full w-[50%] py-4 border-2 code-border border-richblack-400 relative">
      {/* TODO: Gradient */}
      <div className={`absolute ${backgroundColor}  h-[60%] w-[60%] rounded-[100%]`}></div>
      <div className="text-center flex flex-col md:w-[10%] text-richblack-400 font-inter font-bold relative">
        <p>1</p>
        <p>2</p>
        <p>3</p>
        <p>4</p>
        <p>5</p>
        <p>6</p>
        <p>7</p>
        <p>8</p>
        <p>9</p>
        <p>10</p>
        <p>11</p>
        <p>12</p>
      </div>

      <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono pr-2 ${textColor} relative`}>
        <TypeAnimation
          sequence={[codeBlock, 5000, ""]}
          repeat={Infinity}
          style={{
            whiteSpace: "pre-line"
          }}
          omitDeletionAnimation={true}
        />
      </div>

    </div>

  </div>;
}

export default CodeBlocks;