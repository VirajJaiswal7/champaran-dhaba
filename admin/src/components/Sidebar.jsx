import { LuCirclePlus } from "react-icons/lu";
import { GiFishBucket } from "react-icons/gi";
import { GiFoodTruck } from "react-icons/gi";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sm:w-[250px] w-[60px] min-h-[90vh] max-h-full border-r border-r-gray-300">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `flex items-center gap-2 border-b border-b-gray-300 py-3 justify-center cursor-pointer ${
            isActive ? "bg-orange-200" : "hover:bg-orange-50"
          }`
        }
      >
        <LuCirclePlus className="w-8 h-8 text-orange-700" />
        <p className="text-lg hidden sm:block">Add Items</p>
      </NavLink>
      <NavLink
        to="/allitems"
        className={({ isActive }) =>
          `flex items-center gap-2  border-b border-b-gray-300 py-3 justify-center cursor-pointer ${
            isActive ? "bg-orange-200" : "hover:bg-orange-50"
          }`
        }
      >
        <GiFishBucket className="w-8 h-8 text-orange-700" />
        <p className="text-lg hidden sm:block ">All Items</p>
      </NavLink>
      <NavLink
        to="/orders"
        className={({ isActive }) =>
          `flex items-center gap-2 border-b border-b-gray-300 py-3 justify-center cursor-pointer ${
            isActive ? "bg-orange-200" : "hover:bg-orange-50 "
          }`
        }
      >
        <GiFoodTruck className="w-8 h-8 text-orange-700" />
        <p className="text-lg hidden sm:block">Orders</p>
      </NavLink>
    </div>
  );
};

export default Sidebar;
