import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addCourseDetails, editCourseDetails, fetchCourseCategories } from "../../../../../services/operations/courseDetailsAPI";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import RequirementField from "./RequirementField";
import { setCourse, setStep } from "../../../../../Slice/course";
import { COURSE_STATUS } from "../../../../../utils/constants";
import Iconbtn from "../../../../Common/IconBtn";
import toast from "react-hot-toast";

function CourseInformationForm() {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const { course, editCoure } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [courseCategory, setCourseCategory] = useState([]);

  const getCategory = async () => {
    try {
      setLoading(true);
      const result = await fetchCourseCategories();
      if (result.length > 0) {
        setCourseCategory(result);
      }
    } catch (error) {
      toast.error("Failed to fetch categories. Please try again later.");
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategory();

    if (editCoure) {
      setValue("courseTitle", course.courseName);
      setValue("courseDescription", course.courseDescription);
      setValue("coursePrice", course.price);
      setValue("courseTags", course.tag);
      setValue("courseBenefits", course.whatYouWillLearn);
      setValue("courseCategory", course.category._id);
      setValue("courseRequirements", course.instructions);
      setValue("courseImage", course.thumbnail);
    }
  }, [editCoure, course, setValue]);

  const isFormUpdated = () => {
    const currentValues = getValues();
    return (
      currentValues.courseTitle !== course.courseName ||
      currentValues.courseDescription !== course.courseDescription ||
      currentValues.coursePrice !== course.price ||
      currentValues.courseTags?.toString() !== course.tag?.toString() ||
      currentValues.courseBenefits !== course.whatYouWillLearn ||
      currentValues.courseCategory !== course.category._id ||
      currentValues.courseRequirements?.toString() !==
        course.instructions?.toString() ||
      currentValues.courseImage !== course.thumbnail
    );
  };

  const onSubmit = async (data) => {
    if (editCoure) {
      if (isFormUpdated()) {
        const formData = new FormData();
        formData.append("course_id", course._id);

        if (data.courseTitle !== course.courseName) {
          formData.append("courseName", data.courseTitle);
        }
        if (data.courseDescription !== course.courseDescription) {
          formData.append("courseDescription", data.courseDescription);
        }
        if (data.coursePrice !== course.price) {
          formData.append("coursePrice", data.coursePrice);
        }
        if (data.courseCategory !== course.category._id) {
          formData.append("category", data.courseCategory);
        }
        if (
          data.courseRequirements?.toString() !==
          course.instructions?.toString()
        ) {
          formData.append(
            "instructions",
            JSON.stringify(data.courseRequirements)
          );
        }

        setLoading(true);
        const result = await editCourseDetails(formData, token);
        setLoading(false);

        if (result) {
          toast.success("Course updated successfully!");
          dispatch(setCourse(result));
          dispatch(setStep(2));
        }
      } else {
        toast.error("No changes made to the form.");
      }
      return;
    }

    const formData = new FormData();
    formData.append("courseName", data.courseTitle);
    formData.append("courseDescription", data.courseDescription);
    formData.append("price", data.coursePrice);
    formData.append("whatYouWillLearn", data.courseBenefits);
    formData.append("category", data.courseCategory);
    formData.append("instructions", JSON.stringify(data.courseRequirements));
    formData.append("status", COURSE_STATUS.DRAFT);

    setLoading(true);
    const result = await addCourseDetails(formData, token);
    setLoading(false);

    if (result) {
      toast.success("Course created successfully!");
      dispatch(setCourse(result));
      dispatch(setStep(2));
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-md border-richblack-700 bg-richblack-800 p-6 space-y-8"
    >
      <div>
        <label htmlFor="courseTitle">
          Course Title<sup>*</sup>
        </label>
        <input
          type="text"
          id="courseTitle"
          placeholder="Enter Course Title"
          className="w-full"
          {...register("courseTitle", { required: true })}
        />
        {errors.courseTitle && (
          <span className="text-red-500 text-sm">Course Title is required.</span>
        )}
      </div>

      <div>
        <label htmlFor="courseDescription">
          Course Short Description<sup>*</sup>
        </label>
        <textarea
          id="courseDescription"
          placeholder="Enter Course Description"
          className="min-h-[140px] w-full"
          {...register("courseDescription", { required: true })}
        ></textarea>
        {errors.courseDescription && (
          <span className="text-red-500 text-sm">
            Course Description is required.
          </span>
        )}
      </div>

      <div className="relative">
        <label htmlFor="coursePrice">
          Course Price<sup>*</sup>
        </label>
        <input
          type="number"
          id="coursePrice"
          placeholder="Enter Price"
          className="w-full pl-8"
          {...register("coursePrice", { required: true })}
        />
        <HiOutlineCurrencyRupee className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
        {errors.coursePrice && (
          <span className="text-red-500 text-sm">Course Price is required.</span>
        )}
      </div>

      <div>
        <label htmlFor="courseCategory">
          Course Category<sup>*</sup>
        </label>
        <select
          id="courseCategory"
          defaultValue={editCoure ? course.category._id : ""}
          {...register("courseCategory", { required: true })}
        >
          <option value="" disabled>
            Choose a Category
          </option>
          {!loading &&
            courseCategory.map((item) => (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
        </select>
        {errors.courseCategory && (
          <span className="text-red-500 text-sm">
            Course Category is required.
          </span>
        )}
      </div>

      <div>
        <label htmlFor="courseBenefits">
          Benefits of the Course<sup>*</sup>
        </label>
        <textarea
          id="courseBenefits"
          placeholder="Enter Benefits of the Course"
          className="min-h-[130px] w-full"
          {...register("courseBenefits", { required: true })}
        ></textarea>
        {errors.courseBenefits && (
          <span className="text-red-500 text-sm">
            Course Benefits is required.
          </span>
        )}
      </div>

      <RequirementField
        name="courseRequirements"
        label="Requirements/Instructions"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
      />

      {editCoure && (
        <button
          type="button"
          className="flex items-center gap-x-2 bg-richblack-300"
          onClick={() => dispatch(setStep(2))}
        >
          Continue Without Saving
        </button>
      )}

      <Iconbtn
        text={editCoure ? "Save Changes" : "Next"}
        disabled={loading}
      />
    </form>
  );
}

export default CourseInformationForm;
