import React from "react";
import ReactStars from 'react-stars'
import { useDispatch, useSelector } from "react-redux";
import { FaStar } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { removeFromCart } from "../../../../Slice/cartSlice";


function RenderCartCourses() {

  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return <div>
    {
      cart.map((course, key) => (
        <div className="">
          <div className="">
            <img src={course?.thumbnail} alt="" />
            <div className="">
              <p>{course?.courseName}</p>
              <p>{course?.category?.name}</p>
              <div className="">
                <span>4.8</span>
                <ReactStars
                  count={5}
                  size={20}
                  edit={false}
                  activeColor="#ffd700"
                  emptyIcon={<FaStar />}
                  fullIcon={<FaStar />}
                />
                <span>{course?.ratingAndReviews?.length} Ratings</span>

              </div>
            </div>

          </div>

          <div className="">
            <button
            onClick={()=>{
              dispatch(removeFromCart(course._id))
            }}>
              <MdDelete />
              <span>Remove</span>
            </button>
            <p>Price : {course?.price}</p>
          </div>
        </div>
      ))
    }
  </div>;
}

export default RenderCartCourses;
