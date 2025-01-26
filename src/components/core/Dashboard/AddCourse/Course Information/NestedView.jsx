import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RxDropdownMenu } from "react-icons/rx";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiSolidDownArrow } from "react-icons/bi";
import { FaPlus } from "react-icons/fa";
import SubSectionModal from "./SubSectionModal";
import { deleteSection, deleteSubSection } from "../../../../../services/operations/courseDetailsAPI";
import { setCourse } from "../../../../../Slice/course";
import ConfirmationModal from "../../../../Common/confirmationModal";




function NestedView({ handleChangeEditSectionName }) {
    const { course } = useSelector((state) => state.course);
    const { token } = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    const [addSubSection, setAddSubSection] = useState(null);
    const [viewSubSection, setViewSubSection] = useState(null);
    const [editSubSection, setEditSubSection] = useState(null);

    const [confirmationModal, setConfirmationModal] = useState(null);

    const handleDeleteSection = async (sectionId) => {
        const result = await deleteSection(
            {
                sectionId,
                courseid: course._id,
            },
            token
        )

        if (result) {
            console.log("Nested View Delete Section : ", result);
            dispatch(setCourse(result));
        }
        setConfirmationModal(null);
    }

    const handleDeleteSubSection = async (subsectionId, sectionId) => {
        const result = await deleteSubSection({ sectionId, subsectionId }, token);
        if (result) {
            const updatedCourseContent = course.courseContent.map((section) => section._id === sectionId ? result : section);
            const updatedCourse = { ...course, courseContent : updatedCourseContent };
            console.log("Nested View Delete SubSection : ", result);
            dispatch(setCourse(updatedCourse));
        }
        setConfirmationModal(null);
    }


    return (
        <div className="rounded-lg bg-richblack-700 p-6 px-8 text-richblack-5">
            {course?.courseContent.map((section) => (
                <details key={section._id} className="text-richblack-5">
                    <summary className="flex items-center justify-between gap-x-3 border-b-2">
                        <div className="flex items-center gap-x-3">
                            <RxDropdownMenu />
                            <p className="">{section.sectionName}</p>
                        </div>

                        <div className="flex items-center gap-x-3">
                            <button
                                onClick={() => { handleChangeEditSectionName(section._id, section.sectionName) }}>
                                <MdEdit />
                            </button>

                            <button
                                onClick={() => {
                                    setConfirmationModal({
                                        text1: "Delete this section?",
                                        text2: "All the Lecture in this section will be deleted",
                                        btn1Text: "Delete",
                                        btn2Text: "Cancel",
                                        btn1Handler: () => handleDeleteSection(section._id),
                                        btn2Handler: () => { setConfirmationModal(null) }
                                    })
                                }}>
                                <RiDeleteBin6Line />
                            </button>
                            <span>|</span>

                            <button>
                                <BiSolidDownArrow className="text-xl text-richblack-300" />
                            </button>
                        </div>

                    </summary>

                    <div className="">
                        {
                            section.subSection.map((data) => {
                                <div key={data._id}
                                    className="flex items-center justify-center gap-x-3 border-b-2"
                                    onClick={() => { setViewSubSection() }}>
                                    <div className="flex items-center gap-x-3">
                                        <RxDropdownMenu />
                                        <p className="">{data.title}</p>
                                    </div>

                                    <div className="flex items-center gap-x-3">
                                        <button
                                            onClick={() => { setEditSubSection({ ...data, sectionId: section._id }) }}>
                                            <MdEdit />
                                        </button>

                                        <button
                                            onClick={() => {
                                                setConfirmationModal({
                                                    text1: "Delete this Sub section?",
                                                    text2: "selected lecture will be deleted",
                                                    btn1Text: "Delete",
                                                    btn2Text: "Cancel",
                                                    btn1Handler: () => handleDeleteSubSection(data._id, section._id),
                                                    btn2Handler: setConfirmationModal(null)
                                                })
                                            }}>
                                            <RiDeleteBin6Line />
                                        </button>
                                    </div>
                                </div>
                            })
                        }
                        <button
                            onClick={() => { setAddSubSection(section._id) }}
                            className="mt-4 flex items-center gap-x-2 text-yellow-50">
                            <FaPlus />
                            <p>Add Lecture</p>
                        </button>
                    </div>

                </details>
            ))}

            {
                addSubSection ? (
                    <SubSectionModal
                        modalData={addSubSection}
                        setModalData={setAddSubSection}
                        add={true} />
                )
                    : viewSubSection ? (
                        <SubSectionModal
                            modalData={addSubSection}
                            setModalData={setViewSubSection}
                            add={true} />
                    )
                        : editSubSection ? (
                            <SubSectionModal
                                modalData={addSubSection}
                                setModalData={setEditSubSection}
                                add={true} />
                        )
                            : (<></>)
            }

            {
                confirmationModal ? (
                    <ConfirmationModal modalData={confirmationModal} />
                )
                    :
                    (
                        <></>
                    )
            }

        </div>
    );
}

export default NestedView;
