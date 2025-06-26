import axios from "axios";
import { useBackend } from "../../hooks/useBackend";
import { MdLocalDining } from "react-icons/md";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setIsAuth } from "../../redux/userSlice";

const Navbar = () => {
  const { backendUrl } = useBackend();
  const dispatch = useDispatch()
  const handleLogout = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/user/adminlogout`);
      if(res?.data?.success){
        toast.success(res?.data?.message)
        dispatch(setIsAuth(false))
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };
  return (
    <div className="flex justify-between md:px-16 px-4 py-2 border border-b-gray-300">
      <div className="flex items-center cursor-pointer">
        <MdLocalDining className="w-12 h-12 text-orange-500" />
        <h1 className="text-3xl font-bold text-orange-500 hidden sm:block">Champaran</h1>
      </div>
      <button
        onClick={handleLogout}
        className="bg-orange-500 px-6 py-2 text-sm rounded-full text-white"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
