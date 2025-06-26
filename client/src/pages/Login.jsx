import axios from "axios";
import { useBackend } from "../../hooks/useBackend";
import { useState } from "react";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setIsAuth, setUser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { setOrderData, setSaveCart, setSaveItems } from "@/redux/itemSlice";

const Login = () => {
  const { backendUrl } = useBackend();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [login, setLogin] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (login) {
      try {
        setIsLoading(true);
        const res = await axios.post(
          `${backendUrl}/api/user/login`,
          { email, password },
          { withCredentials: true }
        );

        if (res?.data?.success) {
          toast.success(res?.data?.message);
          dispatch(setUser(res?.data?.user));
          dispatch(setIsAuth(true));
          navigate("/");
        }
      } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message);
      } finally {
        setIsLoading(false);
      }
    } else {
      try {
        setIsLoading(true);
        const res = await axios.post(
          `${backendUrl}/api/user/register`,
          { name, email, password },
          { withCredentials: true }
        );

        if (res?.data?.success) {
          toast.success(res?.data?.message);
          dispatch(setUser(res?.data?.user));
          dispatch(setIsAuth(true));
          navigate("/");
          dispatch(setSaveItems([]));
          dispatch(setOrderData([]));
          dispatch(setSaveCart([]));
        }
      } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message);
      } finally {
        setIsLoading(false);
      }
    }
  };
  return (
    <div className="max-w-7xl mx-auto flex items-center justify-center h-[90vh] px-2 md:px-4">
      <form
        onSubmit={handleSubmit}
        className="w-[400px] border p-8 space-y-6 rounded-xl border-gray-300"
      >
        <h1 className="font-semibold text-4xl text-center text-orange-700">
          {login ? "Log In" : "Sign UP"}
        </h1>
        <p className="text-gray-700 text-lg">
          You {login ? "Login" : "Signup"} to Champaran new customer
        </p>
        <div className="flex flex-col gap-4">
          {!login && (
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              placeholder="Enter your name"
              className="outline-none focus:ring-2 focus:ring-orange-500 rounded-md border border-gray-300 py-2 px-6"
            />
          )}
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Enter your email"
            className="outline-none focus:ring-2 focus:ring-orange-500 rounded-md border border-gray-300 py-2 px-6"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Enter your password"
            className="outline-none focus:ring-2 focus:ring-orange-500 rounded-md border border-gray-300 py-2 px-6"
          />
        </div>
        <button
          type="submit"
          className="bg-orange-500 w-full rounded-md py-3 text-white"
        >
          {login ? (
            isLoading ? (
              <div className="flex justify-center items-center">
                <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              "Log in"
            )
          ) : isLoading ? (
            <div className="flex justify-center items-center">
              <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            "Sign up"
          )}
        </button>
        <p className="text-sm text-gray-700">
          {login ? "Not" : "Already"} have an account?{" "}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => setLogin(!login)}
          >
            {login ? "Signup" : "Login"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
