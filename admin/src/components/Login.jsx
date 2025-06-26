import axios from "axios";
import { useBackend } from "../../hooks/useBackend";
import React, { useState } from "react";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setIsAuth } from "../../redux/userSlice";

const Login = () => {
  const { backendUrl } = useBackend();
  const dispatch = useDispatch()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${backendUrl}/api/user/adminlogin`,
        { email, password },
        { withCredentials: true }
      );
      if (res?.data?.success) {
        toast.success(res?.data?.message);
        dispatch(setIsAuth(true))
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };
  return (
    <div className="flex items-center justify-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="w-[400px] border border-gray-200 rounded-xl shadow-md p-8 space-y-12"
      >
        <h1 className="text-3xl font-semibold text-orange-700 text-center">
          Only Admin Login
        </h1>
        <div className="flex flex-col space-y-6">
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Enter email"
            className="outline-none focus:ring-2 focus:ring-orange-500 border border-gray-300 py-2 px-3 rounded-md"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Enter password"
            className="outline-none focus:ring-2 focus:ring-orange-500 border border-gray-300 py-2 px-3 rounded-md"
          />
        </div>
        <button
          type="submit"
          className="bg-orange-500 w-full py-3 rounded-md text-white"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
