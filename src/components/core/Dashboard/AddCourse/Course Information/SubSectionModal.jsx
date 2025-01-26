import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSubSection, updateSubSection } from "../../../../../services/operations/courseDetailsAPI";
import { setCourse } from "../../../../../Slice/course";
import { RxCross1 } from "react-icons/rx";
import Iconbtn from "../../../../Common/IconBtn";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";


function SubSectionModal({
  modalData,
  setModalData,
  add = false,
  view = false,
  edit = false
}) {

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors }
  } = useForm();

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (view || edit) {
      setValue("lectureTitle", modalData.title);
      setValue("lectureDesc", modalData.description);
      setValue("lectureVideo", modalData.videoUrl);
    }
  }, []);

  const isFormUpdated = () => {
    const currentValues = getValues();
    if (currentValues.lectureTitle !== modalData.title
      || currentValues.lectureDesc !== modalData.description
      || currentValues.lectureVideo !== modalData.videoUrl) {
      return true;
    }
    else {
      return false;
    }
  }

  const handleEditSubSection = async () => {
    const currentValues = getValues();
    const formData = new formData();

    formData.append("sectionId", modalData.sectionId);
    formData.append("subSectionId", modalData._id);


    if (currentValues.lectureTitle !== modalData.title) {
      formData.append("title", currentValues.lectureTitle);
    }

    if (currentValues.lectureDesc !== modalData.description) {
      formData.append("description", currentValues.lectureDesc);
    }

    if (currentValues.lectureVideo !== modalData.videoUrl) {
      formData.append("video", currentValues.lectureVideo);
    }

    setLoading(true);

    const result = await updateSubSection();

    if (result) {
      const updatedCourseContent = course.courseContent.map((section) => section._id === modalData.sectionId ? result : section);
      const updatedCourse = { ...course, courseContent: updatedCourseContent };
      console.log("Nested View Delete SubSection : ", result);
      dispatch(setCourse(updatedCourse));
    }

    setModalData(null);
    setLoading(false);
  }

  const onSubmit = async (data) => {
    if (view) return;
    if (edit) {
      if (!isFormUpdated) {
        toast.error("No changes made the to the form");
      }
      else {
        handleEditSubSection();
      }
      return;
    }

    const formData = new FormData();
    formData.append("sectionId", modalData);
    formData.append("title", data.lectureTitle);
    formData.append("description", data.lectureDesc);
    formData.append("video", data.lectureVideo);
    setLoading(true);

    const result = await createSubSection(formData, token);

    if (result) {
      const updatedCourseContent = course.courseContent.map((section) => section._id === modalData.sectionId ? result : section);
      const updatedCourse = { ...course, courseContent: updatedCourseContent };
      console.log("Nested View Delete SubSection : ", result);
      dispatch(setCourse(updatedCourse));
    }
    setModalData(null);
  }

  return <div>
    <div className="">
      <div className="">
        <p>{view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture</p>
        <button onClick={() => (!loading ? setModalData(null) : {})}>
          <RxCross1 />
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* <Upload
          name="LectureVideo"
          label="Lecture Video"
          register={register}
          setValue={setValue}
          error={errors}
          video={true}
          viewData={view ? modalData.videoUrl : null}
          editData={edit ? modalData.videoUrl : null}
        /> */}

        <div className="">
          <label htmlFor="lectuteTitle">Lecture Title</label>
          <input
            type="text"
            id="lectuteTitle"
            placeholder="Enter Lecture Title"
            {...register("lectureTitle", { required: true })}
            className="w-full"
          />
          {errors.lectureTitle && (<span>Lecture Title is required</span>)}
        </div>


        <div className="">
          <label htmlFor="lectureDesc">Lecture Description</label>
          <textarea
            id="lectureDesc"
            placeholder="Enter Lecture Description"
            {...register("lectureDesc", { required: true })}
            className="w-full min-h-[130px]"
          ></textarea>
          {
            errors.lectureDesc && (<span>Lecture Description is required</span>)
          }
        </div>

        {
          !view && <div className="">
            <Iconbtn
              text={loading ? "Loading..." : edit ? "Save Changes" : "Save"}
            />
          </div>
        }

      </form>

    </div>
  </div>;
}

export default SubSectionModal;
