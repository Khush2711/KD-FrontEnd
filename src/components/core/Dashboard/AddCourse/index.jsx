import RenderSteps from "./RenderSteps"

export default function AddCourse() {

    return (
        <>
            <div className="text-richblack-5">
                <div className="">

                    <h1>
                        Add Course
                    </h1>

                    <div className="">
                        <RenderSteps />
                    </div>

                    <div className="">
                        <p>Code Upload Tips</p>
                        <ul>
                            <li>Set the course Price option or make it free.</li>
                            <li>Standard size for the course thumbnail is 1024x576.</li>
                            <li>Video Section controls the course overview video.</li>
                            <li>Course Builder is where you can create & organize a course.</li>
                            <li>Add topics in course builder section to create lesson, quizzes, and assignments.</li>
                            <li>Information from the additional data section shows up on the course single page.</li>
                            <li>Make annoucement to notify any important.</li>
                            <li>Notes to all enrolled students at once.</li>
                        </ul>
                    </div>

                </div>
            </div>
        </>
    )
}