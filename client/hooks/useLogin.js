import { useDispatch } from "react-redux";
import { useBackend } from "./useBackend";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {  setUser } from "@/redux/userSlice";
import { toast } from "sonner";
import { setOrderData, setSaveCart, setSaveItems } from "@/redux/itemSlice";
import axios from "axios";

export const useLogin = () => {
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

  return {
    handleSubmit,
    login,
    setName,
    name,
    setEmail,
    email,
    setPassword,
    password,
    isLoading,
    setLogin,
  };
};
