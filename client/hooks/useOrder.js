import { useDispatch, useSelector } from "react-redux";
import { useBackend } from "./useBackend";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { setOrderData } from "@/redux/itemSlice";

export const useOrder = () => {
  const saveCart = useSelector((store) => store?.items?.saveCart);
  const { backendUrl } = useBackend();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await axios.post(
        `${backendUrl}/api/order/send`,
        {
          firstname,
          lastname,
          email,
          street,
          city,
          state,
          pincode,
          country,
          phone,
        },
        { withCredentials: true }
      );

      console.log(res);
      if (res?.data?.success) {
        toast.success(res?.data?.message);
        dispatch(setOrderData(res?.data?.user));
        navigate("/yourorders");
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleOrderSubmit,
    firstname,
    setFirstname,
    setLastName,
    lastname,
    setEmail,
    email,
    setStreet,
    street,
    setState,
    state,
    setPincode,
    pincode,
    setCountry,
    country,
    setCity,
    city,
    setPhone,
    phone,
    saveCart,
    isLoading,
  };
};
