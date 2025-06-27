import { IoSearch } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
// import { IoSunnyOutline, IoMoonOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { IoReorderThree } from "react-icons/io5";
import { MdLocalDining } from "react-icons/md";
import { HiShoppingBag } from "react-icons/hi2";
import { FaHeart } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { useBackend } from "../../hooks/useBackend";
import { resetApp, setOpenSearch } from "@/redux/userSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { backendUrl } = useBackend();
  // const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const isAuth = useSelector((store) => store?.user?.isAuth);
  const saveCart = useSelector((store) => store?.items?.saveCart);
  const openSearch = useSelector((store) => store?.user?.openSearch);

  const handleLogout = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/user/logout`, {
        withCredentials: true,
      });
      if (res?.data?.success) {
        toast.success(res?.data?.message);
        dispatch(resetApp());
        setOpen(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-2 md:px-4">
      <div className="flex justify-between items-center py-2">
        <div
          className="flex items-center cursor-pointer"
          onClick={() => navigate("/")}
        >
          <MdLocalDining className="w-12 h-12 text-orange-500" />
          <h1 className="text-3xl font-bold text-orange-500 hidden sm:block">
            Champaran
          </h1>
        </div>
        <ul className="gap-12 hidden lg:flex">
          <li className="text-[18px] cursor-pointer text-gray-800">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `relative group text-[18px] text-gray-800 cursor-pointer pb-1 ${
                  isActive
                    ? "after:w-full text-orange-500"
                    : "hover:text-orange-500"
                } after:content-[''] after:absolute after:left-0 after:-bottom-[2px] after:h-[2px] after:bg-orange-500 after:transition-all after:duration-300 after:w-0 group-hover:after:w-full`
              }
            >
              Home
            </NavLink>
          </li>
          <li className="text-[18px] cursor-pointer text-gray-800">
            <NavLink
              to="/items"
              className={({ isActive }) =>
                `relative group text-[18px] text-gray-800 cursor-pointer pb-1 ${
                  isActive
                    ? "after:w-full text-orange-500"
                    : "hover:text-orange-500"
                } after:content-[''] after:absolute after:left-0 after:-bottom-[2px] after:h-[2px] after:bg-orange-500 after:transition-all after:duration-300 after:w-0 group-hover:after:w-full`
              }
            >
              Items
            </NavLink>
          </li>
          <li className="text-[18px] cursor-pointer text-gray-800">
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `relative group text-[18px] text-gray-800 cursor-pointer pb-1 ${
                  isActive
                    ? "after:w-full text-orange-500"
                    : "hover:text-orange-500"
                } after:content-[''] after:absolute after:left-0 after:-bottom-[2px] after:h-[2px] after:bg-orange-500 after:transition-all after:duration-300 after:w-0 group-hover:after:w-full`
              }
            >
              About
            </NavLink>
          </li>
          <li className="text-[18px] cursor-pointer text-gray-800">
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `relative group text-[18px] text-gray-800 cursor-pointer pb-1 ${
                  isActive
                    ? "after:w-full text-orange-500"
                    : "hover:text-orange-500"
                } after:content-[''] after:absolute after:left-0 after:-bottom-[2px] after:h-[2px] after:bg-orange-500 after:transition-all after:duration-300 after:w-0 group-hover:after:w-full`
              }
            >
              Contact
            </NavLink>
          </li>
        </ul>
        <div className="flex gap-4 sm:gap-6 items-center">
          <IoSearch
            onClick={() => dispatch(setOpenSearch(!openSearch))}
            className="w-6 h-6 text-gray-700 cursor-pointer"
          />
          <div className="relative" onClick={() => navigate("/addcart")}>
            <HiShoppingBag className="w-6 h-6 text-gray-700 cursor-pointer" />
            <p className="absolute text-center bg-black -mt-2 rounded-full w-3 h-3">
              <p className="-mt-2 text-white">{saveCart?.length}</p>
            </p>
          </div>
          <FaHeart
            className="hidden sm:block w-6 h-6 text-gray-700 cursor-pointer"
            onClick={() => navigate(`/saveditem`)}
          />
          {/* {darkMode ? (
            <IoMoonOutline
              className="w-6 h-6 text-gray-700 cursor-pointer"
              onClick={() => setDarkMode(false)}
            />
          ) : (
            <IoSunnyOutline
              className="w-6 h-6 text-gray-700 cursor-pointer"
              onClick={() => setDarkMode(true)}
            />
          )} */}
          <div className="relative">
            {isAuth ? (
              <FaRegUser
                className="w-5 h-5 text-gray-700 cursor-pointer"
                onClick={() => setOpen(!open)}
              />
            ) : (
              <FaRegUser
                className="w-5 h-5 text-gray-700 cursor-pointer"
                onClick={() => navigate("/login")}
              />
            )}
            <div
              className={`absolute bg-orange-100 right-0 top-8 rounded-md  z-50 w-[100px] transition-all duration-200`}
            >
              {open && (
                <div className="space-y-1 p-2">
                  <p
                    onClick={() => navigate("/yourorders")}
                    className="bg-orange-400 hover:bg-orange-500 text-white rounded-sm p-1 text-sm text-center cursor-pointer"
                  >
                    My Orders
                  </p>
                  <p
                    onClick={handleLogout}
                    className="bg-orange-400 hover:bg-orange-500 text-white rounded-sm p-1 text-sm text-center cursor-pointer"
                  >
                    Logout
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="flex lg:hidden">
            <IoReorderThree
              onClick={() => setSidebarOpen(true)}
              className="w-8 h-8 text-gray-700 cursor-pointer"
            />
            <div
              className={`fixed top-0 right-0 bg-white w-[100%] sm:w-[300px] h-screen z-50 ${
                sidebarOpen ? "translate-x-0" : "translate-x-full"
              } transition-all duration-300 py-4`}
            >
              <div className="flex justify-end px-2">
                <RxCross2
                  onClick={() => setSidebarOpen(false)}
                  className="w-8 h-8"
                />
              </div>
              <ul className="flex flex-col gap-2">
                <NavLink
                  onClick={() => setSidebarOpen(false)}
                  to="/"
                  className={({ isActive }) =>
                    `${
                      isActive
                        ? "bg-orange-400 text-white"
                        : "hover:bg-orange-100 text-black"
                    } px-3 py-3`
                  }
                >
                  Home
                </NavLink>
                <NavLink
                  onClick={() => setSidebarOpen(false)}
                  to="/items"
                  className={({ isActive }) =>
                    `${
                      isActive
                        ? "bg-orange-400 text-white"
                        : "hover:bg-orange-100 text-black"
                    } px-3 py-3`
                  }
                >
                  Items
                </NavLink>
                <NavLink
                  onClick={() => setSidebarOpen(false)}
                  to="/about"
                  className={({ isActive }) =>
                    `${
                      isActive
                        ? "bg-orange-400 text-white"
                        : "hover:bg-orange-100 text-black"
                    } px-3 py-3`
                  }
                >
                  About
                </NavLink>
                <NavLink
                  onClick={() => setSidebarOpen(false)}
                  to="/contact"
                  className={({ isActive }) =>
                    `${
                      isActive
                        ? "bg-orange-400 text-white"
                        : "hover:bg-orange-100 text-black"
                    } px-3 py-3`
                  }
                >
                  Contact
                </NavLink>
                <NavLink
                  onClick={() => setSidebarOpen(false)}
                  to="/saveditem"
                  className={({ isActive }) =>
                    `${
                      isActive
                        ? "bg-orange-400 text-white"
                        : "hover:bg-orange-100 text-black"
                    } px-3 py-3`
                  }
                >
                  Saved
                </NavLink>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
