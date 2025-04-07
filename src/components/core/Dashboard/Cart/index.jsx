import { useSelector } from "react-redux";
import RenderCartCourses from "./RenderCartCourses";
import RenderTotalAmount from "./RenderTotalAmount";



export default function Cart() {
    const { total, totalItem } = useSelector((state) => state.cart);

    return (
        <div className="text-richblack-5">
            <h1>Your Cart</h1>
            <p>{totalItem} courses in your cart</p>

            {
                total > 0 ? (
                    <div className="">
                        <RenderCartCourses />
                        <RenderTotalAmount />
                    </div>
                )
                    :
                    (
                        <div className="">
                            <p>
                                Your Cart Is Empty...
                            </p>
                        </div>
                    )
            }
        </div>
    )
}