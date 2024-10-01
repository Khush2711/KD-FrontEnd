import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from "../../data/navbar-links";


function Navbar() {

    const location = useLocation();

    const matchRoute = (route) => { return route === location.pathname };


    return <div className="flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700">
        <div className="w-11/12 max-w-maxContent flex items-center justify-between mx-auto">

            <Link to="/">
                <img className="" width={160} height={42} src={logo} alt="logo" />
            </Link>

            {/* Nav */}
            <nav>
                <ul className="flex gap-x-6">
                    {
                        NavbarLinks.map((ele, i) => (
                            <li key={i}>
                                {
                                    ele.title === "Catalog" ?
                                        (
                                            <></>
                                        )
                                        :
                                        (
                                            <Link to={ele?.path}>
                                                <p className={`${matchRoute(ele?.path) ? 'text-yellow-5' : 'text-richblack-25'} `}>
                                                    {ele?.title}
                                                </p>
                                            </Link>
                                        )
                                }
                            </li>
                        ))
                    }
                </ul>
            </nav>



        </div>
    </div>;
}

export default Navbar;
