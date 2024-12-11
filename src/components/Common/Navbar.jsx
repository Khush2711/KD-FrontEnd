import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/Logo/KD Logo.png";
import { NavbarLinks } from "../../data/navbar-links";
import { useDispatch, useSelector } from "react-redux";
import { IoCartOutline } from "react-icons/io5";
import ProfileDropDown from "../core/Auth/ProfileDropDown";
import { useEffect, useState } from "react";
import { apiConnector } from "../../services/apiconnector";
import { categories } from "../../services/apis";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { decryptData } from "../../utils/encryptionUtils";
import { clearUserData, setUserData } from "../../Slice/authSlice";

function Navbar() {
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItem } = useSelector((state) => state.cart);

  const [subLinks, setSubLinks] = useState([]);

  const fetchSublinks = async () => {
    try {
      const result = await apiConnector("GET", categories.CATEGORIES_API);
      setSubLinks(result?.data?.allCategories);
    } catch (error) {
      console.log(`Could not fetch category list`);
    }
  };

  useEffect(() => {
    fetchSublinks();
  }, []);

  const location = useLocation();
  const matchRoute = (route) => location.pathname === route;

  const handleCatalogHover = () => {
    setIsCatalogOpen(true); // Open the catalog on hover
  };

  const handleCatalogLeave = () => {
    setIsCatalogOpen(false); // Close the catalog when leaving
  };

  return (
    <div className="flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700">
      <div className="w-11/12 max-w-maxContent flex items-center justify-between mx-auto">
        <Link to="/">
          <img className="" width={160} height={10} src={logo} alt="logo" />
        </Link>

        {/* Nav */}
        <nav>
          <ul className="flex gap-x-6">
            {NavbarLinks.map((ele, i) => (
              <li key={i}>
                {ele.title === "Catalog" ? (
                  <div
                    className="text-richblack-25 flex gap-x-1 items-center group relative cursor-pointer"
                    onMouseEnter={handleCatalogHover}
                    onMouseLeave={handleCatalogLeave}
                  >
                    <p>{ele.title}</p>
                    <MdOutlineKeyboardArrowDown />

                    {isCatalogOpen && (
                      <div
                        className="absolute left-[50%] top-[50%] flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900 opacity-100 transition-all duration-200 w-[300px] -translate-x-[50%] translate-y-[20%] z-10"
                      >
                        <div className="absolute left-[50%] top-0 h-6 w-6 bg-richblack-5 rotate-45 rounded-md -translate-y-[40%] translate-x-[80%]"></div>

                        {subLinks.length ? (
                          subLinks.map((link, index) => (
                            <Link to={`/${link.name}`} key={index}>
                              {link.name}
                            </Link>
                          ))
                        ) : (
                          <p>No categories available</p>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link to={ele?.path}>
                    <p
                      className={`${matchRoute(ele?.path) ? "text-yellow-5" : "text-richblack-25"}`}
                    >
                      {ele?.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Flex / signup / dashboard */}
        <div className="flex gap-x-4 items-center">
          {/* TODO : Remove string use constant file and instructor in that. */}
          {user && user.accountType !== "Instructor" ? (
            <Link to="/dashboard/cart" className="relative">
              <IoCartOutline />

              {totalItem > 0 ? (
                <span>{totalItem}</span>
              ) : (
                <></>
              )}
            </Link>
          ) : (
            <>
            </>
          )}

          {token === null ? (
            <Link to="/login">
              <button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md">
                Log In
              </button>
            </Link>
          ) : (
            <></>
          )}

          {token === null ? (
            <Link to="/signup">
              <button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md">
                Sign Up
              </button>
            </Link>
          ) : (
            <></>
          )}

          {token !== null ? <ProfileDropDown /> : <></>}
        </div>
      </div>
    </div>
  );
}

export default Navbar;